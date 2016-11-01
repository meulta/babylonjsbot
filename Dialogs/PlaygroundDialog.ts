import { PlaygroundAPI } from '../APIs/PlaygroundAPI'
import { Helpers } from '../Common/Helpers'
import builder = require('botbuilder');

export module PlaygroundDialog {
    export function add(bot:builder.UniversalBot, intents:builder.IntentDialog): void {
        intents.matches('GetCodeSample', '/GetCodeSample');

        bot.dialog('/GetCodeSample', [
            async function (session, args, next) {
                session.sendTyping();
                var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');

                if(frameworkElement){
                    var result = await PlaygroundAPI.search(frameworkElement.entity);
                    if(result) {
                        session.send("playground-foundthis");
                        session.send(result.code);
                        session.send("playground-fullsample", result.name, result.url);
                    }
                    else {
                        session.send("all-idontknow");
                    }
                    session.endDialog();
                }
                else {
                    builder.Prompts.text(session, "playground-entitynotfound");
                }
            },
            async function (session, results) {
                if (results.response) {
                    var result = await PlaygroundAPI.search(results.response);
                    if(result)
                            session.send(results[0].code);
                }
                session.endDialog();
            }
        ]);
    }
}