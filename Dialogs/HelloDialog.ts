import { DocumentationAPI } from '../APIs/DocumentationAPI'
import builder = require('botbuilder');

export module HelloDialog {
    export function add(bot:builder.UniversalBot, intents:builder.IntentDialog): void {
        intents.matches('Hello', '/Hello');

        bot.dialog('/Hello', function (session) {
            session.send("Hello I am the **Babylon.js bot**! \n\n I can talk to you about 3D ! Ask me how to create 'lights', for exemple.");
            session.endDialog();
        });
    }
}

