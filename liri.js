"use strict"

// twitter key
var twitter = require('twitter');

// spotify key
var spotify = require('spotify');

// request
var request = require('request');

function getCommand(commandLine) {
    if (commandLine.length < 3) {
        return "junk";
    }
    return commandLine[2];
}

function run(commandLine) {

    var command = getCommand(commandLine);

    //Switch function to determine inputs
    switch (command) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            getSong(commandLine);
            break;
        case 'movie-this':
            findMovie(commandLine);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Please enter 'node liri.js' with a 'my-tweets', 'spotify-this-song :song name:', 'movie-this :movie title:', or 'do-what-it-says' command");
    } // end switch
} // end command line



/*****************
 * TWITTER AREA
 ******************/
function myTweets() {

    // keys.js info
    var twitterKeys = require('./keys.js').twitterKeys;

    // variable holds twitter keys
    var client = new twitter(twitterKeys);

    // pulls my tweets and limit to 20
    var params = { screen_name: '@stefanbeaulieu', count: 20 };

    // produce timeline 
    client.get('statuses/user_timeline', params, function(err, tweets) {

        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        for (var i = 0; i < tweets.length; i++) {
            console.log((parseInt([i]) + 1) + '. ' + tweets[i].text);
        }
    }); // end client.get
} // end twitter area



/*****************
 * SPOTIFY AREA
 ******************/
function getSong(commandLine) {
    var parameter = "";

    if (commandLine.length < 4) {
        parameter = "the sign";
    } else {
        parameter = commandLine[3];

        for (var i = 4; i < process.argv.length; i++) {
            parameter = parameter + "+" + commandLine[i];
        }
    }


    spotify.search({ type: 'track', query: parameter }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        if (!err) {
            var artist = data.tracks.items[0].artists[0].name;
            var song = data.tracks.items[0].name;
            var link = data.tracks.items[0].external_urls.spotify;
            var album = data.tracks.items[0].album.name
            console.log(song + ", performed by " + artist + ", on the album " + album + ". Spotify: " + link);
        } // end !err
    }); // spotify.search
} // end spotify area



/*****************
 * MOVIE AREA
 ******************/
function findMovie(commandLine) {
    var movieName = "";
    if (commandLine.length < 4) {
        movieName = "Mr.+Nobody";
    } else {
        movieName = commandLine[3];

        // movies with no spaces
        for (var i = 4; i < commandLine.length; i++) {
            movieName = movieName + "+" + commandLine[i];
        }
    } // end if commandLine

    // utilize omdb 
    var queryURL = 'http://www.omdbapi.com/?t=' + movieName + '&tomatoes=true&y=&plot=short&r=json';

    request(queryURL, function omdbResult(err, resp, body) {

        if (!err && resp.statusCode === 200) {

            // log movie info
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Rated);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Movie Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
        } // end !err
    }); // end request queryURL
} // end movie area



/*****************
 * DO WHAT IT SAYS AREA
 ******************/
function doWhatItSays() {

    var fs = require('fs');

    // gets random.txt data
    fs.readFile("random.txt", "utf8", callback);

    function callback(err, data) {

        var split = data.split(',');

        var commandLine = [];
        commandLine[0] = "node";
        commandLine[1] = "liri.js";
        commandLine[2] = split[0];
        commandLine[3] = split[1];
        run(commandLine);
    } // end callback( err, data )
} // end do what it says

run(process.argv);