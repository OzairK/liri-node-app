//require('dotenv').config()
var key = require("./keys.js");
var Twitter = require('twitter');
// var Spotify= require('spotify');
// var spotify = new Spotify({
//     id: "0472f90d85f94d19808e8a29702f3e52",
//     secret: "56c75058a58642de8e3c70f143d9d390"
// })

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
     id: "0472f90d85f94d19808e8a29702f3e52",
    secret: "56c75058a58642de8e3c70f143d9d390"
});
var client = new Twitter(key.twitter);

var argument = process.argv;



switch(argument[2]){
case "my-tweets":
var params = { screen_name: 'ozzysworld3' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if(error) throw error;
    var numberOfTweets=20;
    if(tweets.length<20){
        numberOfTweets= tweets.length;
        console.log("you have less than 20 tweets, here are all your tweets: \n")
    }
    for (var i = 0; i < numberOfTweets; i++) {
        if (!error) {
            console.log(tweets[i].text + "\n");
        }
    }

});
break;
case "spotify-this-song":


break;

default: 
console.log("please type in one of the following commands: \n my-tweets \n spotify-this-song <song name> \n movie-this  <movie name> \n do-what-it-says");
}