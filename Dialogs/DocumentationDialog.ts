import { Helpers } from '../Common/Helpers'
import { DialogHandlers } from './DialogHandlers'
import builder = require('botbuilder');

export module DocumentationDialog {
    export function add(bot:builder.UniversalBot, intents:builder.IntentDialog): void {
        intents.matches('GetDocumentation', [async function (session, args) {
            var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');

            if(frameworkElement){
                DialogHandlers.sendDocumentation(session, frameworkElement.entity);
            }
            else {
                DialogHandlers.sendDocumentation(session);
            }
                
            session.endDialog();
        }, async function (session, results) {
                if (results.response) {
                    DialogHandlers.sendCode(session, results.response);
                }
                session.endDialog();
            }
        ]);
    }
}

