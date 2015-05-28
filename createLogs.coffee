exec = require('child_process').exec
#execute commands
argv = require('yargs').argv
#arguments - might add options at a later stage for help etc.
prefixArgs = ''
#An empty string which will contain a prefix
currentArg = ''
#an empty string which will contain all prefix's concatenated,

parsePrefix = ->
  lengtharray = process.argv.length
  #find how many arguments exist
  firstArg = 2
  while firstArg < lengtharray
    #for loop that starts at the 3rd argument, compare it to the length of the array and increment counter
    currentArg = '--grep="' + process.argv[firstArg] + '" '
    #for each argument passed in, put --grep="" around the argument so it can be used as a filter
    prefixArgs += currentArg
    #add the current argument to the string containing all arguments.
    firstArg++
  getBuildLogs prefixArgs
  #pass all the arguments to the function
  return

getBuildLogs = (prfx) ->
  execute 'git describe --tags --abbrev=0', (tag) ->
    #get the current/latest tag by passing it to the function @execute
    #using the arguments passed in, Filter through all the logs between the current and second most recent tag and write to a txt file
    execute 'git log ' + tag.replace('\n', '') + '..head ' + prfx + '--pretty=format:%s \n > log.txt', (logfile) ->
    return
  return

execute = (command, callback) ->
  exec command, (error, stdout, stderr) ->
    #execute the command and send the callback.
    callback stdout
    return
  return

parsePrefix()