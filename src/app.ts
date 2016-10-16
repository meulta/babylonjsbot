import restify = require('restify');
import builder = require('botbuilder');
import { DocumentationAPI } from './APIs/DocumentationAPI';
import { SearchResults } from './APIS/SearchResults'

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
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var babylonRecognizer = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=4d3859ca-4a7f-4a4f-b8fb-8b7139e21b88&subscription-key=59c06c78bbdb4167b5b08f789da05255');
var intents = new builder.IntentDialog({ recognizers: [babylonRecognizer] });
bot.dialog('/', intents);

intents.matches('Hello', '/Hello');
intents.matches('GetDocumentation', '/GetDocumentation');
intents.matches('GetCodeSample', '/GetCodeSample');

var buildSearchResultCard = function(session, imageUrl, title, description, results:SearchResults.SearchResult[]): builder.Message{
    var msg = new builder.Message(session).textFormat(builder.TextFormat.xml);
    var heroCard = new builder.HeroCard(session)
    msg.addAttachment(heroCard);

    if(imageUrl){
        heroCard.images([
            builder.CardImage.create(session, imageUrl)
        ]);
    }

    if(title){
        heroCard.title(title); 
    }

    if(title){
        heroCard.title(description); 
    }

    var count = 1;
    var heroCardButtons = [];
    for(var searchResult of results){
        heroCardButtons.push(builder.CardAction.openUrl(session, searchResult.url, 'Result ' + count));
        if(count++ > 2) break;
    }
    heroCard.buttons(heroCardButtons);

    return msg;
}

bot.dialog('/Hello', function (session) {
    session.send("Hello I am the **Babylon.js bot**! \n\n I can talk to you about 3D ! Ask me how to create 'lights', for exemple.");
    session.endDialog();
});

bot.dialog('/GetDocumentation', function (session, args) {
    session.send("Get documentation");
    var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');

    if(frameworkElement){
        DocumentationAPI.search(frameworkElement.entity, (results) => {
            var msg = buildSearchResultCard(session, 
                                "http://html5gamedevelopment.com/wp-content/uploads/2016/06/babylonjs.png", 
                                "Documentation",
                                "Results for :'" + frameworkElement.entity + "'",
                                results)
            session.send(msg);            
        });
    }
    else {
        session.send("didnt get that.")
    }

    session.endDialog();
});

bot.dialog('/GetCodeSample', function (session) {
    session.send("Get code sample");
    session.endDialog();
});
