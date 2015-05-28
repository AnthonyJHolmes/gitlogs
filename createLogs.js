var exec = require('child_process').exec; //execute commands
var argv = require('yargs').argv;//arguments - might add options at a later stage for help etc.
var prefixArgs = "";//An empty string which will contain a prefix
var currentArg = "";//an empty string which will contain all prefix's concatenated,


function parsePrefix(){
	var lengtharray = process.argv.length;//find how many arguments exist
	for(firstArg = 2; firstArg < lengtharray; firstArg++){//for loop that starts at the 3rd argument, compare it to the length of the array and increment counter
		currentArg = '--grep="'+process.argv[firstArg]+'" ';//for each argument passed in, put --grep="" around the argument so it can be used as a filter
		prefixArgs += currentArg;//add the current argument to the string containing all arguments.
	}
	getBuildLogs(prefixArgs);//pass all the arguments to the function
	
}
function getBuildLogs(prfx){
  execute("git describe --tags --abbrev=0", function(tag){  //get the current/latest tag by passing it to the function @execute
    //using the arguments passed in, Filter through all the logs between the current and second most recent tag and write to a txt file
        execute('git log '+tag.replace("\n", "")+'..head '+prfx+'--pretty=format:%s \n > log.txt', function(logfile){       
        });
    });
}
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ //execute the command and send the callback.
    	callback(stdout);
    });
};
parsePrefix();
