var request = require('request');
let fs = require('fs');
var keys = require('./config/keys.js')
let sampleLists = require('./sample_data/lists.js');
let sampleCards = require('./sample_data/cards.js');
let listIds = '';
let showBrainstorming = true;

var options = { 
    method: 'GET',
    url: `https://api.trello.com/1/boards/${keys.trello.boardId}/lists/?&lists=open&key=${keys.trello.key}&token=${keys.trello.token}` 
};


 //Gets the JSON for the Trello lists
 //request(options, (error, response, body) => {
   //if(error) {
     //throw new Error(error);
   //}
   //console.log(body);
 //});


let trelloLists = [];

// Up until < - 1 because the last list is not needed
console.log("Getting Trello lists...");
for (let i = (showBrainstorming) ? (0) : (1); i < sampleLists['trelloList'].length - 1; i++) {
    trelloLists.push({
        'name': sampleLists['trelloList'][i].name,
        'listId': sampleLists['trelloList'][i].id,
        'cards': [],
    });
}

let cardIndex = 0;
let listIndex = 0;
console.log("Getting Trello cards...");
// iterating through cards to assign them to a list
for (let c = 0; c < sampleCards.length; c++) {
    if (trelloLists[listIndex] == undefined) { break };

    if (trelloLists[listIndex].listId == sampleCards[c].idList) {
        trelloLists[listIndex].cards.push({
            'name': sampleCards[c].name,
            'id': sampleCards[c].id,
            'url': sampleCards[c].shortUrl,
            'members': [],
            'description': sampleCards[c].desc,
            'dateLastActive': sampleCards[c].dateLastActivity,
            'dueDate': sampleCards[c].due,
        });
        
        // TODO:
        // iterating through members on a card
        //console.log("---Group---");
        //let members = [];
        //for (let m = 0; m < sampleCards[c].members.length; m++) {
            //console.log(sampleCards[c].members[m].fullName);
            
            //members.push({
                //'name': sampleCards[c].members[m].fullName,
            //});
            ////trelloLists[listIndex].cards[c].members.push({
                ////'name': sampleCards[c].members[m].fullName,
            ////});
        //}
        //trelloLists[listIndex].cards[c].members = members;
    }
    else {
        listIndex++;
    }
}

let filePath = "./export.txt";

for (let i = 0; i < trelloLists.length; i++) {
    fs.appendFile(filePath, '# ' + trelloLists[i].name + '\n', (error) => {
        if (error) console.log("Error when writing card data");
    });

    for (let c = 0; c < trelloLists[i].cards.length; c++) {
        fs.appendFile(filePath,
            '## ' + trelloLists[i].cards[c].name + ':\n' +
            '* Members Assigned: ' + trelloLists[i].cards[c].members + '\n' +
            '* Description: ' + trelloLists[i].cards[c].description + '\n' +
            '* Due Date: ' + trelloLists[i].cards[c].dueDate + '\n\n' 
            , (error) => {
                if (error) console.log("Error when writing card data");
        });
    }
}
