var bandsintown = require('bandsintown');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var random = require('./random.txt');
// var db = require('./.env');
require('dotenv').config();


inquirer.prompt([{
    type: 'list',
    message: 'Would you like information on a movie, concert, or song',
    choices: ['Movie', 'Concert', 'Song', 'Do What It Says'],
    name: 'option'
}
])
    .then(function (inquirerResponse) {
        if (inquirerResponse.option === 'Movie') {
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What movie would you like information on?',
                    name: 'movieName'
                }
            ])
                .then(function (movieResponse) {
                    var movieQueryUrl = "http://www.omdbapi.com/?t=" + movieResponse.movieName + "&apikey=trilogy";
                    axios.get(movieQueryUrl).then(function (response) {
                        let movieInfo=`Title:${response.data.Title}
                        \nReleased In:${response.data.Year}
                        \nIMDB Rates This Movie At:${response.data.Ratings[0].Value}
                        \nRotten Tomatoes Rates This Movie At: ${response.data.Ratings[1].Value}
                        \nThis Movie Was Produced In: ${response.data.Country}
                        \nThis Movie Is In:${response.data.Language}
                        \nThe Movie Plot Is:${response.data.Plot}
                        \nActors Appearing In This Movie Are:${response.data.Actors}`;

                        if (movieResponse.movieName == '') {
                            console.log("If you haven't watched Mr. Nobody then you should: http://www.imdb.com/title/tt0485947/");
                            console.log("It's on Netflix");
                        }
                        else {
                            console.log(movieInfo);
                            fs.appendFile('movieLog.txt',movieInfo,(err)=>{
                                if(err){throw err};
                                console.log('Inquiry Appended To Log');
                            })
                        }
                    })
                })
        }
        else if (inquirerResponse.option === 'Concert') {
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What concert would you like information on?',
                    name: 'concertName'
                }
            ])
                .then(function (concertResponse) {
                    var concertQueryUrl = 'https://rest.bandsintown.com/artists/' + concertResponse.concertName + '/events?app_id=codingbootcamp';
                    axios.get(concertQueryUrl).then(function (response) {
                        console.log('This Concert Is At:' + response.data[0].venue.name);
                        console.log('This Venue Is In:' + response.data[0].venue.city + ',' + response.data[0].venue.region);
                        console.log('This Concert Is On:' + moment(response.data[0].datetime).format('MMM D YYYY'));

                    })
                })
        }
        else if (inquirerResponse.option === 'Do What It Says') {
            // fs.readFile('./random.txt', 'UTF8', function (err, data) {
            //     if (err) {
            //         console.log(err);
            //     }
            //     console.log(data);
            random('This is Connected');
        }
        else if (inquirerResponse.option === 'Song') {
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What song would you like information on?',
                    name: 'songName'
                }
            ])
                .then(function (songResponse) {
                    var spotify = new Spotify({
                        id: process.env.SPOTIFY_ID,
                        secret: process.env.SPOTIFY_SECRET
                    });
                    spotify
                        .search({ type: 'track', query: songResponse.songName, limit: 3 })
                        .then(function (response) {
                            // console.log(response.tracks.items[0].name);
                            // console.log(response.tracks.items[0].album.name);
                            // console.log(response.tracks.items[0].artists[0].name);
                            console.log(response.tracks.items[0].preview_url);
                        })
                        .catch(function (err) {
                            console.log(err);
                        });

                })

        };
    });
