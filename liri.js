
// require .env file
require("dotenv").config()

// require request
let request = require("request")

// require moment 
let moment = require("moment")

let fs = require("fs")

// link to key file
let keys = require("./keys.js")

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


function concertThis(userQuery) {
    console.log(`\n ...\n\nLOADING... ${userQuery}'s next show...`);
    request('https://rest.bandsintown.com/artists/' + userQuery + '/events?app_id=codingbootcamp',
    //request(userQuery),
        function (error, response, body) {
            if (error) console.log(error);
            let result = JSON.parse(body)[0];
            if (!error && response.statusCode === 200) {
                let userBand = JSON.parse(body)[0];
        

                console.log(`\n<<<GREAT>>>\n\nArtists: ${userBand.lineup}\nVenue: ${userBand.venue.name}
                                      \nCity: ${userBand.venue.city},${userBand.venue.country}`)

                let concertDate = moment(userBand.datetime).format("MM/DD/YYYY");
                console.log(`Date: ${concertDate}\n\n....`);
            }
        })
}

function spotifiyThisSong(userQuery) {
    console.log(`\n...LOADING..."${userQuery}"`);

    if (!userQuery) { userQuery = "the sign ace of base" };

    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (error, data) {
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


    function movieThis(userQuery) {
        console.log(`\n...\n\nLOADING"${userQuery}"`);
        if (!userQuery) { userQuery = "mr nobody"; };

        var axios = require("axios");
        // Then run a request with axios to the OMDB API with the movie specified
        axios.get("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("Title: " + response.data.Title + "\nActors: " + response.data.Actors + "\nReleased: " + response.data.Year + "\nRating: "
                    + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: "
                    + response.data.Language + "\nPlot: " + response.data.Plot);
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
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
    };

    function doThis() {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            let dataArr = data.split(",");

            userInput = dataArr[0];
            userQuery = dataArr[1];

            userCommand(userInput, userQuery);

        });
    };
