//require('dotenv').config()
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var argument = process.argv;

var movieName = "";
var fileData = [];
fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }
    //console.log(data);
    fileData = data.split(",");                                 //get data from random.txt

    if (argument[2] === "do-what-it-says") {                    //get commands from file
        argument[2] = fileData[0];
        argument[3] = fileData[1];

        //error handling to ensure argument[4,5,6..] is empty incase user types more than one command.           
        for (i = 4; i < argument.length; i++) {
            argument[i] = "";
        }
    }

    // checks which command has been given?
    switch (argument[2]) {
        case "my-tweets":                                       //prints last 20 tweets of user, unless less than 20 tweets exist
            var params = { screen_name: 'ozzysworld3' };
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (error) throw error;
                var numberOfTweets = 20;
                if (tweets.length < 20) {
                    numberOfTweets = tweets.length;
                    console.log("you have less than 20 tweets, here are all your tweets: \n")
                }
                for (var i = 0; i < numberOfTweets; i++) {
                    if (!error) {
                        console.log(tweets[i].text + "\n");
                    }
                }

            });
            break;

        case "spotify-this-song":                               //gives information about song 
            var songName = "";
            for (var i = 3; i < argument.length; i++) {         //ensures entire name of song is captrued
                songName += argument[i] + " ";
            }
            if (songName === "") {                              //default song if nothing is requested
                songName = "the sign by ace of base";
            }
            spotify.search({ type: 'track', query: songName }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                var songData = data.tracks.items[0];
                console.log(" " +songData.album.artists[0].name + "\n", songData.name + "\n", songData.href + "\n", songData.album.name);
            });
            break;

        case "movie-this":

            for (var i = 3; i < argument.length; i++) {         //ensures entire name of movie is captured
                movieName += " " + argument[i];
            }
            if (argument[3] === "") {                           //default movie if nothing is requested
                movieName = "Mr. Nobody";
            }
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

            request(queryUrl, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    console.log("Movie Title: " + JSON.parse(body).Title);
                    console.log("Release Year:  " + JSON.parse(body).Year);
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("Country movie was made: " + JSON.parse(body).Country);
                    console.log("Languages: " + JSON.parse(body).Language);
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("Actors: " + JSON.parse(body).Actors)
                        ;
                }

            });
            break;
        default:                                                  //proper command was not typed
            console.log("please type in one of the following commands: \n my-tweets \n spotify-this-song <song name> \n movie-this  <movie name> \n do-what-it-says");
    }
});