var gutil = require('gulp-util');
var exec = require('child_process').exec;
var argv = require('yargs').argv;

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};
module.exports = function (options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  if (!callback || typeof callback !== 'function') 
    callback = function () {};
  if (!options) 
    options = { };
  if (!options.log) 
    options.log = !callback;
  if (!options.cwd) 
    options.cwd = process.cwd();
  if (!options.maxBuffer) 
    options.maxBuffer = 200 * 1024; 
    //Default buffer value 
  if (!options.args) 
    options.args = ' ';

    execute("git describe --tags --abbrev=0", function(tag){
      execute('git log '+tag.replace("\n", "")+'..head ' +options.args+' --pretty=format:%s > log.txt', function(logfile){
      //callback({tag: tag.replace("\n", "")})
      });
    });
 };