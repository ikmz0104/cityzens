const request = require("request");
require('dotenv').config();

const options = {
  method: 'GET',
  url: 'https://v3.football.api-sports.io/players',
  qs: {
    league: 39,
    season: 2021,
    team: 50,
  },
  headers: {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': process.env.rapidapi
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);
});