import { DocumentationAPI } from '../APIs/DocumentationAPI'
import { Helpers } from '../Common/Helpers'
import builder = require('botbuilder');

export module DocumentationDialog {
    export function add(bot:builder.UniversalBot, intents:builder.IntentDialog): void {
        intents.matches('GetDocumentation', '/GetDocumentation');

        bot.dialog('/GetDocumentation', async function (session, args) {
            session.send("Get documentation");
            var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');

            if(frameworkElement){
                var result = await DocumentationAPI.search(frameworkElement.entity);
                session.send("Found this:" + result.url);
                
            }
            else {
                session.send("didnt get that.")
            }

            session.endDialog();
        });
    }
}

