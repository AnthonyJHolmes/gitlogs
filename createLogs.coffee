exec = require('child_process').exec
argv = require('yargs').argv
prefixArgs = ''
currentArg = ''

getBuildLogs = (prfx) ->
  execute 'git describe --tags --abbrev=0', (tag) ->
    execute 'git log ' + tag.replace('\n', '') + '..head ' + prfx + '--pretty=format:%s > log.txt', (logfile) ->
    return
  return

parsePrefix = ->
  lengtharray = process.argv.length
  firstArg = 2
  while firstArg < lengtharray
    currentArg = '--grep="' + process.argv[firstArg] + '" '
    prefixArgs += currentArg
    firstArg++
  getBuildLogs prefixArgs
  return

execute = (command, callback) ->
  exec command, (error, stdout, stderr) ->
    callback stdout
    return
  return

parsePrefix()

# ---
# generated by js2coffee 2.0.4