var
  fs         = require('fs'),
  traceur    = require('traceur/lib/transform.js'),
  streamline = require('streamline/lib/compiler/transform.js'),
  exec       = require('child_process').exec;
  
var directoryIgnoreList = ['CVS','.svn','.git','.hg','.bzr'];

  
function transformFile(input, output, options, _) {
  var content = fs.readFile(input, _);
  // transform Traceur
  content = traceur(content, input);
  // transform Streamline
  content = streamline.transform(content, options || {});
  
  fs.writeFile(output, content, _);
  console.error("Successfully transformed", input, "to", output);
  return content;
}

function compileProject(_) {
  var base = process.cwd();
  var projectjson = fs.readFile(base + "/aurora.json", _);
  var project = JSON.parse(projectjson);
  project.extension = project.extension || '_.js';
  if (project.dirs) {
    var dirs = []; // already scanned cache to prevent recursion.
    project.dirs.forEach(function(file) {
      compileDir(process.cwd() + '/' + file, project, errstub, dirs);
    });
  } else {
    throw new Error("aurora.json needs a minimum of a dirs key (array of directories to scan/compile)");
  }
}

function compileDir(dir, project, _, dirs) {
  dirs = dirs || []
  var realdir = fs.realpath(dir, _);
  if (dirs.indexOf(realdir) == -1) {
    dirs.push(realdir);
    
    var files = fs.readdir(realdir, _);
    files.forEach(function(file) {
      (function(_){
      var full = realdir + '/' + file;
      var stat = fs.stat(full, _);
      if (stat.isDirectory() && (project.directoryIgnorelist || directoryIgnoreList).indexOf(file) == -1) {
        compileDir(realdir + '/' + file, project, _, dirs);  
      } else if (stat.isFile()) {
        if (file.substr(file.length - project.extension.length) === project.extension) {
          var output = full.substr(0, full.length - project.extension.length) + '.js';
          transformFile(full, output, project.streamlineoptions, _);
        }
      }
      })(errstub);
    });
    return files;
  }
  return [];
}
function errstub(err) { if (err) throw err }
module.exports = {
  compileProject: compileProject
};
