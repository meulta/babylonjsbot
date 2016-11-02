import restify = require('restify');
import builder = require('botbuilder');
import { DocumentationDialog } from './Dialogs/DocumentationDialog';
import { CodeDialog } from './Dialogs/CodeDialog';
import { HelloDialog } from './Dialogs/HelloDialog';
import { AnotherOneDialog } from './Dialogs/AnotherOneDialog';
import { SearchResults } from './APIS/SearchResults';

//=========================================================
// Vorlon.js
//=========================================================

var vorlonWrapper = require("vorlon-node-wrapper");
vorlonWrapper.start("http://localhost:1337","default", false);

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
}); 
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector,{
    localizerSettings: { 
        defaultLocale: "en" 
    }
});

server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var babylonRecognizer = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=4d3859ca-4a7f-4a4f-b8fb-8b7139e21b88&subscription-key=59c06c78bbdb4167b5b08f789da05255');
var intents = new builder.IntentDialog({ recognizers: [babylonRecognizer] });
bot.dialog('/', intents);

DocumentationDialog.add(bot, intents);
CodeDialog.add(bot, intents);
HelloDialog.add(bot, intents);
AnotherOneDialog.add(bot, intents);