/*** Generated by streamline 0.1.44 - DO NOT EDIT ***/
var __g=typeof global!=='undefined'?global:window;__g=(__g.__streamline||(__g.__streamline={}));__g.setEF=__g.setEF||function(e,f){e.__frame = e.__frame||f};var __srcName='lib/aurora_.js';
function __func(_, __this, __arguments, fn, index, frame, body){ if (!_) { return __future.call(__this, fn, __arguments, index); } frame.file = __srcName; frame.prev = __g.frame; __g.frame = frame; try { body(); } catch (e) { __g.setEF(e, frame.prev); __propagate(_, e); } finally { __g.frame = frame.prev; } }
function __cb(_, frame, offset, col, fn){ frame.offset = offset; frame.col = col; var ctx = __g.context; return function ___(err, result){ var oldFrame = __g.frame; __g.frame = frame; __g.context = ctx; try { if (err) { __g.setEF(err, frame); return _(err); } return fn(null, result); } catch (ex) { __g.setEF(ex, frame); return __propagate(_, ex); } finally { __g.frame = oldFrame; } } }
function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function ___(e, r){ cb(e, r); }; fn.apply(this, args); return function ___(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); }
function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } }
function __trap(err){ if (err) { if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } }
/*     1 */ var fs = require("fs"), traceur = require("traceur/lib/transform.js"), streamline = require("streamline/lib/compiler/transform.js"), exec = require("child_process").exec;
/*     7 */ var directoryIgnoreList = ["CVS",".svn",".git",".hg",".bzr",];
/*    10 */ function transformFile(input, output, options, _) {
              var content;
              var __frame = {
                name: "transformFile",
                line: 10
              };
              return __func(_, this, arguments, transformFile, 3, __frame, function __$transformFile() {
/*    11 */     return fs.readFile(input, __cb(_, __frame, 1, 16, function ___(__0, __1) {
                  content = __1;
/*    13 */       content = traceur(content, input);
/*    15 */       content = streamline.transform(content, (options || {
                  }));
/*    17 */       return fs.writeFile(output, content, __cb(_, __frame, 7, 2, function __$transformFile() {
/*    18 */         console.error("Successfully transformed", input, "to", output);
/*    19 */         return _(null, content);
                  }));
                }));
              });
            };
/*    22 */ function compileProject(_) {
              var base, projectjson, project, dirs;
              var __frame = {
                name: "compileProject",
                line: 22
              };
              return __func(_, this, arguments, compileProject, 0, __frame, function __$compileProject() {
/*    23 */     base = process.cwd();
/*    24 */     return fs.readFile((base + "/aurora.json"), __cb(_, __frame, 2, 20, function ___(__0, __1) {
                  projectjson = __1;
/*    25 */       project = JSON.parse(projectjson);
/*    26 */       project.extension = (project.extension || "_.js");
/*    27 */       if (project.dirs) {
/*    28 */         dirs = [];
/*    29 */         project.dirs.forEach(function(file) {
/*    30 */           compileDir(((process.cwd() + "/") + file), project, errstub, dirs);
                    });
                  }
/*    32 */        else {
/*    33 */         return _(new Error("aurora.json needs a minimum of a dirs key (array of directories to scan/compile)"));
                  }
                ;
                  _();
                }));
              });
            };
/*    37 */ function compileDir(dir, project, _, dirs) {
              var realdir, files;
              var __frame = {
                name: "compileDir",
                line: 37
              };
              return __func(_, this, arguments, compileDir, 2, __frame, function __$compileDir() {
/*    38 */     dirs = (dirs || []);
/*    39 */     return fs.realpath(dir, __cb(_, __frame, 2, 16, function ___(__0, __1) {
                  realdir = __1;
                  return (function __$compileDir(__then) {
/*    40 */         if ((dirs.indexOf(realdir) == -1)) {
/*    41 */           dirs.push(realdir);
/*    43 */           return fs.readdir(realdir, __cb(_, __frame, 6, 16, function ___(__0, __2) {
                        files = __2;
/*    44 */             files.forEach(function(file) {
/*    45 */               (function __1(_) {
                            var full, stat, output;
                            var __frame = {
                              name: "__1",
                              line: 45
                            };
                            return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
/*    46 */                   full = ((realdir + "/") + file);
/*    47 */                   return fs.stat(full, __cb(_, __frame, 2, 17, function ___(__0, __1) {
                                stat = __1;
                                return (function __$__1(__then) {
/*    48 */                       if ((stat.isDirectory() && (((project.directoryIgnorelist || directoryIgnoreList)).indexOf(file) == -1))) {
/*    49 */                         return compileDir(((realdir + "/") + file), project, __cb(_, __frame, 4, 8, __then), dirs);
                                  }
                                   else {
                                    return (function __$__1(__then) {
/*    50 */                           if (stat.isFile()) {
                                        return (function __$__1(__then) {
/*    51 */                               if ((file.substr((file.length - project.extension.length)) === project.extension)) {
/*    52 */                                 output = (full.substr(0, (full.length - project.extension.length)) + ".js");
/*    53 */                                 return transformFile(full, output, project.streamlineoptions, __cb(_, __frame, 8, 10, __then));
                                          }
                                           else {
                                            __then();
                                          }
                                        ;
                                        })(__then);
                                      }
                                       else {
                                        __then();
                                      }
                                    ;
                                    })(__then);
                                  }
                                ;
                                })(_);
                              }));
                            });
/*    56 */               })(errstub);
                        });
/*    58 */             return _(null, files);
                      }));
                    }
                     else {
                      __then();
                    }
                  ;
                  })(function __$compileDir() {
/*    60 */         return _(null, []);
                  });
                }));
              });
            };
/*    62 */ function errstub(err) {
/*    62 */   if (err) {
/*    62 */     throw err
              };
            };
/*    63 */ module.exports = {
/*    64 */   compileProject: compileProject
            };