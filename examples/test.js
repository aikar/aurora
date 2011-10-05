
var __g=typeof global!=='undefined'?global:window;__g=(__g.__streamline||(__g.__streamline={}));__g.setEF=__g.setEF||function(e,f){e.__frame = e.__frame||f};var __srcName='undefined_.js';
function __func(_, __this, __arguments, fn, index, frame, body){ if (!_) { return __future.call(__this, fn, __arguments, index); } frame.file = __srcName; frame.prev = __g.frame; __g.frame = frame; try { body(); } catch (e) { __g.setEF(e, frame.prev); __propagate(_, e); } finally { __g.frame = frame.prev; } }
function __cb(_, frame, offset, col, fn){ frame.offset = offset; frame.col = col; var ctx = __g.context; return function ___(err, result){ var oldFrame = __g.frame; __g.frame = frame; __g.context = ctx; try { if (err) { __g.setEF(err, frame); return _(err); } return fn(null, result); } catch (ex) { __g.setEF(ex, frame); return __propagate(_, ex); } finally { __g.frame = oldFrame; } } }
function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function ___(e, r){ cb(e, r); }; fn.apply(this, args); return function ___(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); }
function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } }
function __trap(err){ if (err) { if (__g.context && __g.context.errorHandler) __g.context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } }
            (function main(_) {
              var fs, test;
/*     3 */   function test(_, file) {
                var content;
                var __frame = {
                  name: "test",
                  line: 3
                };
                return __func(_, this, arguments, test, 0, __frame, function __$test() {
/*     4 */       return fs.readFile(file, __cb(_, __frame, 1, 16, function ___(__0, __1) {
/*     4 */         content = __1.toString();
/*     5 */         console.error(content.substr(0, 100));
/*     6 */         return _(null, content);
                  }));
                });
              };
              var __frame = {
                name: "main",
                line: 1
              };
              return __func(_, this, arguments, main, 0, __frame, function __$main() {
/*     2 */     fs = require("fs");
/*     8 */     return test(__cb(_, __frame, 7, 11, function ___(__0, __1) {
                  test = __1;
/*     9 */       console.log(test.length);
                  _();
/*     8 */     }), "/etc/passwd");
              });
            }).call(this, __trap);
