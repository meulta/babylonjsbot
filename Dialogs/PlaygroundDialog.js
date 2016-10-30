"use strict";
var PlaygroundAPI_1 = require('../APIs/PlaygroundAPI');
var builder = require('botbuilder');
var PlaygroundDialog;
(function (PlaygroundDialog) {
    function add(bot, intents) {
        intents.matches('GetCodeSample', '/GetCodeSample');
        bot.dialog('/GetCodeSample', [
            function (session, args, next) {
                session.sendTyping();
                var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');
                if (frameworkElement) {
                    PlaygroundAPI_1.PlaygroundAPI.search(frameworkElement.entity, function (results) {
                        if (results && results.length > 0) {
                            session.send("I found these lines that someone wrote:");
                            session.send(results[0].code);
                            session.send("If you want to take a look at the full sample : [" + results[0].name + "](" + results[0].url + ")");
                        }
                        else {
                            session.send("I do not know that...");
                        }
                    });
                    session.endDialog();
                }
                else {
                    builder.Prompts.text(session, "I understood you want a code sample, can you tell me on which subject?");
                }
            },
            function (session, results) {
                if (results.response) {
                    PlaygroundAPI_1.PlaygroundAPI.search(results.response, function (res) {
                        if (results && results.length)
                            session.send(results[0].code);
                    });
                }
                session.endDialog();
            }
        ]);
    }
    PlaygroundDialog.add = add;
})(PlaygroundDialog = exports.PlaygroundDialog || (exports.PlaygroundDialog = {}));
