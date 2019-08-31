// var ticketMaster = require('ticketmaster');
// var spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var axios = require('axios');

inquirer.prompt([{
    type: 'list',
    message: 'Would you like information on a movie, concert, or song',
    choices: ['Movie', 'Concert', 'Song'],
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
                        console.log('Title:'+response.data.Title);
                        console.log('Released In:'+response.data.Year);
                        console.log('IMDB Rates This Movie At:'+response.data.Ratings[0].Value);
                        console.log('Rotten Tomatoes Rates This Movies At:'+response.data.Ratings[1].Value);
                        console.log('This Movie Was Produced In:'+response.data.Country);
                        console.log('This Movie Is In:'+response.data.Language);
                        console.log('This Movies Plot Is:'+response.data.Plot);
                        console.log('Actors Appearing In This Movie Are:'+response.data.Actors);
                        

                    })
                })
        }
        // else if (inquirerResponse.option === 'Concert') {
        //     inquirer.prompt([
        //         {
        //             type: 'input',
        //             message: 'What concert would you like information on?',
        //             name: 'concertName'
        //         }
        //     ])
        //         .then(function (concertResponse) {
        //             // Get Concert information from TicketMaster
        //         })
        // }
        // else{
        //     inquirer.prompt([
        //         {
        //             type:'input',
        //             message:'What song would you like information on?',
        //             name:'songName'
        //         }
        //     ])
        //     .then(function(songResponse){
        //         // Get Song Infomration from Spotify
        //     })
        // }
    }
    )