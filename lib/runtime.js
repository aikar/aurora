/**:Compiled with Aurora v0.2.0 with Streamline and Traceur Compilers. --DO NOT EDIT THIS FILE!!! Edit runtime_.js instead and recompile with Aurora! :*/ var __g=typeof global!=='undefined'?global:window;__g=(__g.__streamline||(__g.__streamline={}));__g.setEF=__g.setEF||function(e,f){e.__frame = e.__frame||f};var __srcName='undefined_.js'; var fs = require("fs"), path = require("path"), mod = require("module");

var registered = false;
var processed = [];
function register() {
 if (registered) { return };
 var aurora = require("./aurora");
 var project = aurora.getProject();
 var origLoad = mod._load;
 mod._load = function(file, parent) {
 var dot = file.lastIndexOf(".");
 var slash = file.lastIndexOf("/");
 if (((dot <= 0) || (dot <= slash))) {
 dot = file.length; } ;

 var baseFile = file.substr(0, dot);
 var auroraFile = (baseFile + project.extension);
 if ((processed.indexOf(auroraFile) === -1)) {
 processed.push(auroraFile);
 try {
 var files = mod._resolveFilename(auroraFile, parent);
 var compiled = aurora.compileFile(files[0], project);
 if (compiled) {
 file = compiled[0]; } ;

 } catch (e) {  }; } ;

 return origLoad.call(this, file, parent); };

 registered = true;};

function test() {
 register();
 require("../examples/test.js");};

test();
module.exports = { register: register};