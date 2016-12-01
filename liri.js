"use strict";

/************ 
PSEUDOCODE
- Import code from keys
- store keys in variables
- Create Commands
  - my-tweets
    - limit tweets to min 20
  - spotify this song
    - output spotify song info by user entry
    - if no input run default song
  - movie this
    - output movie info off user input
    - else output Mr. Nobody info
  -do what it says
    -output text from random.txt (can edit text for testing)
*************/

// Retreiving the twitter keys
var twitterKeys = require('./keys');


// Gets all the keys
var keyList = twitterKeys.twitterKeys;

var params = { screen_name: 'user_id' };


// loop through Key List and print all keys
for (var key in keyList) {
    console.log("The " + key + " is " + keyList[key] + ".");
}



/*

var fs = require("fs");

function readFileResult(err, data) {

    if (err) {
        console.log(err);
        return;
    }

    var output = data.split(", ");

    for (var i = 0; i < output.length; i++) {
        // console.log(items[i]);
        console.log(output[i]);
    }
}

fs.readFile("random.txt", "utf8", readFileResult);

*/