var exec = require('child_process').exec;
var argv = require('yargs')  
  .help('h')
	.alias('h', 'help')
	.showHelpOnFail(false, "Specify --help for available options")
	.epilogue('For more information check out our manual at https://github.com/AnthonyJHolmes/gitlogs')
	.argv;

var prefixArgs = "";
var currentArg = "";

function getBuildLogs(prfx){
	execute("git describe --tags --abbrev=0", function(tag){		
      	execute('git log '+tag.replace("\n", "")+'..head '+prfx+'--pretty=format:%s \n > log.txt', function(logfile){     		
      	});
    });
}
function parsePrefix(){
	var lengtharray = process.argv.length;
	for(firstArg = 2; firstArg < lengtharray; firstArg++){
		currentArg = '--grep="'+process.argv[firstArg]+'" ';
		prefixArgs += currentArg;
	}
	getBuildLogs(prefixArgs);
	
}
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ 
    	callback(stdout);
    });
};
parsePrefix();
