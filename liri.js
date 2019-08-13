inquirer = require("inquirer");
// require .env file
require("dotenv").config();

// require request
let request = require("request");

// require moment 
let moment = require("moment");

let fs = require("fs");

// link to key file
let keys = require("./keys.js");

// starting spotifiy
let Spotify = require("node-spotify-api");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

// omdb and bands in town api
let ombd = (keys.ombd);
let bandsintown = (keys.bandsintown);

// user command and input
let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "concert-this":
            concertThis(userQuery);
            break;
        case "spotify-this":
            spotifiyThisSong(userQuery);
            break;
        case "movie-this":
            movieThis(userQuery);
            break;
        case "do-this":
            doThis(userQuery);
            break;
        default:
            console.log("Not valid");
            break;
    }
}
userCommand(userInput, userQuery);

function concertThis() {
    console.log(`\n ...\n\nLOADING... ${userQuery}'s next show...`);
    request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp')
    request(queryURL,function(error,response,body) {
        if (error) console.log (error);
        let result = JSON.parse(body)[0];
if (!error && response.statusCode === 200) {
       let userBand = JSON.parse(body)[0]; 

                console.log(`\n<<<GREAT>>>\n\nArtists: ${userBand[i].lineup[0]}\nVenue: ${userBand[i].venue.name}
                              \nCity: ${userBand[i].venue.city},${userBand[i].venue.country}`)

                let concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY");
                console.log(`Date: ${concertDate}\n\n....`);
        }
    


function spotifiyThisSong() {
    console.log(`\n...LOADING..."${userQuery}"`);

    if (!userQuery) {userQuery = "the sign ace of base"}; 

    spotify.search ({type: 'track', query: userQuery, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error occured: ' + error);
        }

        let spotifyArr = data.tracks.items;
        
        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nLOADING...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}
            \nSpotify link: ${data.tracks.items[i].external_urls.spotify}\nAlbum: ${data.tracks.items[i].album.name}\n\n.....`)
        };
    });
}

function movieThis() {
    console.log(`\n...\n\nLOADING"${userQuery}"`);
    if (!userQuery) { userQuery = "mr nobody"; }; 

    var axios = require("axios");
// Then run a request with axios to the OMDB API with the movie specified
axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

        let userMovie = JSON.parse(body); 

        let ratingsArr = userMovie.Ratings;
        if (ratingsArr.length > 2) {
        }

        if (!error && response.statusCode === 200) {
            console.log(`\nLOADING..\n\nTitle: ${userMovie.Title}\nCast: ${userMovie.Actors}\nReleased: ${userMovie.Year}
            \nIMDb Rating: ${userMovie.imdbRating}\nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}\nCountry: ${userMovie.Country}
            \nLanguage: ${userMovie.Language}\nPlot: ${useerPlot}\n\n.....`)
        }else {
            return console.log("Movie able to be found. Error:" + error)
        }
};

function doThis() {
    fs.readFile("random.txt", "utf8", function (error,data) {
        if (error) { return console.log(error); }

        let dataArr = data.split(","); 

        userInput = dataArr[0];
        userQuery[1];

        userCommand(userInput, userQuery);
    }); 
