var exec = require('child_process').exec;
var argv = require('yargs')
    .usage('Usage: $0 -p [email address which you want it sent too] ')
    .example('$0  -p "done" ')
    .options({   
     'p':{
       alias: 'prefix',
       demand:false,
       describe:'Refine log searches with prefix\'s',
       //type:'string'
      }  
    })
    .help('h')
	.alias('h', 'help')
	.showHelpOnFail(false, "Specify --help for available options")
	.epilogue('For more information check out our manual at http://mynicewebsite.com/mygulpplugin')
	.argv;

var prefixArgs = "";
var currentArg = "";

function getBuildLogs(prfx){
	console.log(prfx);
	execute("git describe --tags --abbrev=0", function(tag){		
      	execute('git log '+tag.replace("\n", "")+'..head '+prfx+'--pretty=format:%s > log.txt', function(logfile){     		
      	});
    });
}
function parsePrefix(){
	var lengtharray = process.argv.length;
	//var currentArg = "";
	console.log(lengtharray);
	for(firstArg = 2; firstArg < lengtharray; firstArg++){
		currentArg = '--grep="'+process.argv[firstArg]+'" ';
		prefixArgs += currentArg;
		console.log(currentArg);
	}
	getBuildLogs(prefixArgs);
	
}
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ 
    	callback(stdout);
    });
};
parsePrefix();
