import { CodeAPI } from '../APIs/CodeAPI'
import { Helpers } from '../Common/Helpers'
import { DialogHandlers } from './DialogHandlers'
import builder = require('botbuilder');

export module CodeDialog {
    export function add(bot:builder.UniversalBot, intents:builder.IntentDialog): void {
        intents.matches('GetCodeSample', [
            async function (session, args, next) {
                var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');

                if(frameworkElement){
                    DialogHandlers.sendCode(session, frameworkElement.entity);
                }
                else {
                    DialogHandlers.sendCode(session);
                }
            },
            async function (session, results) {
                if (results.response) {
                    DialogHandlers.sendCode(session, results.response);
                }
                session.endDialog();
            }
        ]);
    }
}