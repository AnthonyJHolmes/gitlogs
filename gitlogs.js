/*
 * An application that displays a random 5-card poker hand, by "dealing out"
 * five random cards from a deck.  This is a very sloppy script that we will 
 * refactor later to use modules.
 */

// Create a deck of cards sorted by suit then rank.  The first card (at index
// 0) is the ace of spades (A♠), and the last (at index #51) is the king of 
// clubs (K♣).
var deck = [];
"♠♡♢♣".split("").forEach(function (suit) {
    "A 2 3 4 5 6 7 8 9 10 J Q K".split(" ").forEach(function (rank) {
        deck.push(rank + suit);
    });
});

// Create a hand by successively removing a random card from the deck 
// and adding it to the hand. 
var hand = [];
for (var i = 0; i < 5; i += 1) {
    hand.push(deck.splice(Math.floor(Math.random() * deck.length), 1));
}

// Display the hand.
console.log(hand.join(" "));

/*var gutil = require('gulp-util');
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


function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};
function getCurrentTag() {
  execute("git describe --tags --abbrev=0", function(tag){
} 
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
 };*/