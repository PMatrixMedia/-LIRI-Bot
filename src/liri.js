require('dotenv').config();

// Vars needed
var importKeys = require('./keys');
// Load the fs package to read and write
var fs = require("fs");
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(importKeys.spotify);
var twitter = new Twitter(importKeys.twitter);

// get command fro user
var liriCmd = process.argv[2];



    // Logic for commands
    function runCommands() {
        if(liriCmd === 'my-tweets') {
            console.log('my tweets');
        }
        else if(liriCmd === 'spotify-this-song') {
            console.log('spotify my song');
            spotifyRequest();
         
        }
        else if(liriCmd === 'movie-this') {
            console.log('OMDB my movie');
            omdbRequest();
        }
        else if(liriCmd === 'do-what-it-says') {
            console.log('obey my command');
        }
        else{
            console.log('sorry I dont register that as a command. Please try again');
        }

        }
        runCommands();


// OMDB Request Function
    function omdbRequest() {
        var omdbRequest = require("request");
        var movieTitle = process.argv[3];
        var omdbApiKey = 'ebd97e72';
        var fullRequest = `http://www.omdbapi.com/?t=${movieTitle}&y=&plot=short&apikey=${omdbApiKey}`;

        omdbRequest(fullRequest, function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            console.log("The movie's rating is: " + JSON.parse(body).Genre);
        }
        });
    }

    // Spotify Request Function
    function spotifyRequest() {
        var songRequest = process.argv[3];
           
          spotify.search({ 
              type: 'track', 
              query: songRequest,
              limit: 10 
            
            }, 
              
        function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
        //   console.log(JSON.stringify(data)); 
        //   console.log(data.tracks.items[0].artists);
          for (let i = 0; i < 10; i++) {
              var songData = data.tracks.items;
            //   var songUrl = songData[i].preview_url;
              var artistName = songData[i].album.artists[0].name;
              var albumTitle = songData[i].album.name;
              var songUrl = '';

           if (songUrl === null) {
               songUrl = 'No preview URL available. sorry.';
           }
           else {
                songUrl = songData[i].preview_url;
               console.log('******************************');
               console.log(`Artist Name: ${artistName}`);
               console.log(`Album Title: ${albumTitle}`);
               console.log(`Preview URL: ${songUrl}`);
           }
    
          }

          });

       
    }


  



 

    