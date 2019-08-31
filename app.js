var bandsintown = require('bandsintown');
var spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var axios = require('axios');
var moment = require('moment');
var fs= require('fs');
// var spotify = new Spotify({
//     id: ce5052f7728d467f9b3fb4343229a04a,
//     secret: b5990f73f941484bbb1ec9baaee60970
// });

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
                        if (response.data.Title === undefined) {
                            console.log("If you haven't watched Mr. Nobody then you should: http://www.imdb.com/title/tt0485947/");
                            console.log("It's on Netflix");
                        }
                        else {
                            console.log('Title:' + response.data.Title);
                            console.log('Released In:' + response.data.Year);
                            console.log('IMDB Rates This Movie At:' + response.data.Ratings[0].Value);
                            console.log('Rotten Tomatoes Rates This Movies At:' + response.data.Ratings[1].Value);
                            console.log('This Movie Was Produced In:' + response.data.Country);
                            console.log('This Movie Is In:' + response.data.Language);
                            console.log('This Movies Plot Is:' + response.data.Plot);
                            console.log('Actors Appearing In This Movie Are:' + response.data.Actors);
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
        else if(inquirerResponse.option==='Do What It Says'){
            fs.readFile('random.txt','UTF8',function(err,data){
                if(err){
                    console.log(err);
                }
                console.log(data);
            })

        }
        // else if (inquirerResponse.option === 'Song') {
        //     inquirer.prompt([
        //         {
        //             type: 'input',
        //             message: 'What song would you like information on?',
        //             name: 'songName'
        //         }
        //     ])
        //         .then(function (songResponse) {
        //             var songQueryUrl = 'https://api.spotify.com/v1/search'
        //         });
        // };
    });
