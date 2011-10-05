
var __g=typeof global!=='undefined'?global:window;__g=(__g.__streamline||(__g.__streamline={}));__g.setEF=__g.setEF||function(e,f){e.__frame = e.__frame||f};var __srcName='undefined_.js';
function __func(_, __this, __arguments, fn, index, frame, body){ if (!_) { return __future.call(__this, fn, __arguments, index); } frame.file = __srcName; frame.prev = __g.frame; __g.frame = frame; try { body(); } catch (e) { __g.setEF(e, frame.prev); __propagate(_, e); } finally { __g.frame = frame.prev; } }
function __cb(_, frame, offset, col, fn){ frame.offset = offset; frame.col = col; var ctx = __g.context; return function ___(err, result){ var oldFrame = __g.frame; __g.frame = frame; __g.context = ctx; try { if (err) { __g.setEF(err, frame); return _(err); } return fn(null, result); } catch (ex) { __g.setEF(ex, frame); return __propagate(_, ex); } finally { __g.frame = oldFrame; } } }
function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function ___(e, r){ cb(e, r); }; fn.apply(this, args); return function ___(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); }
function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } }
function __trap(err){ if (err) { if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } }
/*     1 */ var fs = require("fs"), traceur = require("traceur/lib/transform.js"), streamline = require("streamline/lib/compiler/transform.js"), exec = require("child_process").exec;
/*     3 */ var directoryIgnoreList = ["CVS",".svn",".git",".hg",".bzr",];
/*     4 */ function transformFile(input, output, options, _) {
              var content;
              var __frame = {
                name: "transformFile",
                line: 4
              };
              return __func(_, this, arguments, transformFile, 3, __frame, function __$transformFile() {
/*     5 */     return fs.readFile(input, __cb(_, __frame, 1, 16, function ___(__0, __1) {
                  content = __1;
/*     6 */       content = traceur(content, input);
/*     7 */       content = streamline.transform(content, (options || {
                  }));
/*     8 */       return fs.writeFile(output, content, __cb(_, __frame, 4, 2, function __$transformFile() {
/*     9 */         console.error("Successfully transformed", input, "to", output);
/*    10 */         return _(null, content);
                  }));
                }));
              });
            };
/*    12 */ function compileProject(_) {
              var base, projectjson, project, dirs;
              var __frame = {
                name: "compileProject",
                line: 12
              };
              return __func(_, this, arguments, compileProject, 0, __frame, function __$compileProject() {
/*    13 */     base = process.cwd();
/*    14 */     return fs.readFile((base + "/aurora.json"), __cb(_, __frame, 2, 20, function ___(__0, __1) {
                  projectjson = __1;
/*    15 */       project = JSON.parse(projectjson);
/*    16 */       project.extension = (project.extension || "_.js");
/*    17 */       if (project.dirs) {
/*    18 */         dirs = [];
/*    19 */         project.dirs.forEach(function(file) {
/*    20 */           compileDir(((process.cwd() + "/") + file), project, errstub, dirs);
                    });
                  }
/*    22 */        else {
/*    23 */         return _(new Error("aurora.json needs a minimum of a dirs key (array of directories to scan/compile)"));
                  }
                ;
                  _();
                }));
              });
            };
/*    26 */ function compileDir(dir, project, _, dirs) {
              var realdir, files;
              var __frame = {
                name: "compileDir",
                line: 26
              };
              return __func(_, this, arguments, compileDir, 2, __frame, function __$compileDir() {
/*    27 */     dirs = (dirs || []);
/*    28 */     return fs.realpath(dir, __cb(_, __frame, 2, 16, function ___(__0, __1) {
                  realdir = __1;
                  return (function __$compileDir(__then) {
/*    29 */         if ((dirs.indexOf(realdir) == -1)) {
/*    30 */           dirs.push(realdir);
/*    31 */           return fs.readdir(realdir, __cb(_, __frame, 5, 16, function ___(__0, __2) {
                        files = __2;
/*    32 */             files.forEach(function(file) {
/*    33 */               (function __1(_) {
                            var full, stat, output;
                            var __frame = {
                              name: "__1",
                              line: 33
                            };
                            return __func(_, this, arguments, __1, 0, __frame, function __$__1() {
/*    34 */                   full = ((realdir + "/") + file);
/*    35 */                   return fs.stat(full, __cb(_, __frame, 2, 19, function ___(__0, __1) {
                                stat = __1;
                                return (function __$__1(__then) {
/*    36 */                       if ((stat.isDirectory() && (((project.directoryIgnorelist || directoryIgnoreList)).indexOf(file) == -1))) {
/*    37 */                         return compileDir(((realdir + "/") + file), project, __cb(_, __frame, 4, 10, __then), dirs);
                                  }
                                   else {
                                    return (function __$__1(__then) {
/*    38 */                           if (stat.isFile()) {
                                        return (function __$__1(__then) {
/*    39 */                               if ((file.substr((file.length - project.extension.length)) === project.extension)) {
/*    40 */                                 output = (full.substr(0, (full.length - project.extension.length)) + ".js");
/*    41 */                                 return transformFile(full, output, project.streamlineoptions, __cb(_, __frame, 8, 12, __then));
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
/*    44 */               })(errstub);
                        });
/*    46 */             return _(null, files);
                      }));
                    }
                     else {
                      __then();
                    }
                  ;
                  })(function __$compileDir() {
/*    48 */         return _(null, []);
                  });
                }));
              });
            };
/*    50 */ function errstub(err) {
/*    51 */   if (err) {
/*    51 */     throw err
              };
            };
/*    53 */ module.exports = {
/*    53 */   compileProject: compileProject
            };
