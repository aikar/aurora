/**
 * Runtime loader
 */
var fs   = require('fs'),
    path = require('path'),
    mod  = require('module');


var processed = [];
function register() {
  if (mod._load.aurora) return;
  var aurora = require('./aurora');
  var project = aurora.getProject();
  var origLoad = mod._load;
  mod._load = function(file, parent) {
    var dot = file.lastIndexOf('.');
    var slash = file.lastIndexOf('/');
    
    if (dot <= 0 || dot <= slash) {
      dot = file.length;
    }
    
    var baseFile = file.substr(0, dot);
    var auroraFile = baseFile + project.extension;
    
    if (processed.indexOf(auroraFile) === -1) {
      processed.push(auroraFile);
      try {
        var files = mod._resolveFilename(auroraFile, parent);
        var compiled = aurora.compileFile(files[0], project);
        if (compiled) {
          file = compiled[0];
        }
      } catch (e) {
        
      }
    }
    
    return origLoad.call(this, file, parent);
  }
  mod._load.aurora = true;
  registered = true;
}

module.exports = {
  register: register
}
