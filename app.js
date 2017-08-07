var request = require('request');
var keys = require('./config/keys.js')
var options = { method: 'GET',
  url: `https://api.trello.com/1/boards/${keys.trello.boardId}/lists/?&lists=open&key=${keys.trello.key}&token=${keys.trello.token}` };

request(options, (error, response, body) => {
  if(error) {
    throw new Error(error);
  }
  console.log(body);
});
