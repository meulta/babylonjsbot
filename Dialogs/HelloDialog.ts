import { DocumentationAPI } from '../APIs/DocumentationAPI'
import builder = require('botbuilder');

export module HelloDialog {
    export function add(bot:builder.UniversalBot, intents:builder.IntentDialog): void {
        intents.matches('Hello', '/Hello');

        bot.dialog('/Hello', function (session) {
            session.endDialog("greetings");
        });
    }
}

