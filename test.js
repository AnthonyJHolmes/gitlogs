var exec = require('child_process').exec;

function getCurrentBuild(){
	execute("git describe --tags --abbrev=0", function(tag){
		console.log(tag);
      	execute('git log '+tag.replace("\n", "")+'..head --grep="DONE" --pretty=format:%s > log.txt', function(logfile){
      		console.log("stuff");
      	});
    });
}
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ 
    	return stdout
    });
};
getCurrentBuild();
