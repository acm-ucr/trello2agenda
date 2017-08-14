const
  request = require('request'),
  fs = require('fs'),
  keys = require('./config/keys.js'),
  sampleLists = require('./sample_data/lists.js'),
  sampleCards = require('./sample_data/cards.js'),
  options = {
    method: 'GET',
    url: `https://api.trello.com/1/boards/${keys.trello.boardId}/lists/?&lists=open&key=${keys.trello.key}&token=${keys.trello.token}`,
  };

let
  listIds = '';
  showBrainstorming = true,
  trelloLists = [];

// Up until < - 1 because the last list is not needed
console.log("Getting Trello lists...");
for(let i = showBrainstorming ? 0 : 1; i < sampleLists['trelloList'].length - 1; i++) {
    trelloLists.push({
        'name': sampleLists['trelloList'][i].name,
        'listId': sampleLists['trelloList'][i].id,
        'cards': [],
    });
}

let
  cardIndex = 0,
  listIndex = 0;

console.log("Getting Trello cards...");
// iterating through cards to assign them to a list
for (let c = 0; c < sampleCards.length; c++) {
    if (trelloLists[listIndex] == undefined) { break };

    const
      card = sampleCards[c],
      matchesId = trelloLists[listIndex].listId == card.idList;

    if (matchesId) {
      trelloLists[listIndex].cards.push({
        name: card.name,
        id: card.id,
        url: card.shortUrl,
        members: [],
        description: card.desc,
        dateLastActive: card.dateLastActivity,
        dueDate: card.due,
      });
        
      // TODO:
      // iterating through members on a card
      //console.log("---Group---");
      //let members = [];
      //for (let m = 0; m < card.members.length; m++) {
          //console.log(card.members[m].fullName);
          
          //members.push({
              //'name': card.members[m].fullName,
          //});
          ////trelloLists[listIndex].cards[c].members.push({
              ////'name': card.members[m].fullName,
          ////});
      //}
      //trelloLists[listIndex].cards[c].members = members;
    } else {
        ++listIndex;
    }
}

const filePath = "./export.md";

trelloLists.forEach(list => {
  fs.appendFile(filePath, `# ${list.name}\n`, (error) => {
    if (error) console.log("Error when writing card data");
  });

  list.cards.forEach(card => {
    fs.appendFile(filePath,
      `## ${card.name}:\n` +
      `* Members Assigned: ${card.members}\n` +
      `* Description: ${card.description}\n` +
      `* Due Date: ${card.dueDate}\n\n`
      , (error) => {
          if (error) console.log("Error when writing card data");
      });
  });
});
