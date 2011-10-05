/*class test {
    static readfile(_, file = '/etc/passwd') {*/
var fs = require('fs');
function test(_, file) {
        var content = fs.readFile(file, _).toString();
        console.error(content.substr(0,100));
        return content;
    }
//}
//var test = test.readdir(_);
var test = test(_, '/etc/passwd');
console.log(test.length);
