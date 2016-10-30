import { DocumentationAPI } from '../APIs/DocumentationAPI'
import builder = require('botbuilder');

export module DocumentationDialog {
    export function add(bot:builder.UniversalBot, intents:builder.IntentDialog): void {
        intents.matches('GetDocumentation', '/GetDocumentation');

        bot.dialog('/GetDocumentation', function (session, args) {
            session.send("Get documentation");
            var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');

            if(frameworkElement){
                DocumentationAPI.search(frameworkElement.entity, (results) => {
                    session.send("Found this: \n\n\n\n`" + results[0].code[0].replace(/\r\n/g, "\n\n")) + "`";
                });
            }
            else {
                session.send("didnt get that.")
            }

            session.endDialog();
        });
    }
}

