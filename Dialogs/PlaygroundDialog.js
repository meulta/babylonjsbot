"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const PlaygroundAPI_1 = require('../APIs/PlaygroundAPI');
const builder = require('botbuilder');
var PlaygroundDialog;
(function (PlaygroundDialog) {
    function add(bot, intents) {
        intents.matches('GetCodeSample', '/GetCodeSample');
        bot.dialog('/GetCodeSample', [
            function (session, args, next) {
                return __awaiter(this, void 0, void 0, function* () {
                    session.sendTyping();
                    var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');
                    if (frameworkElement) {
                        var result = yield PlaygroundAPI_1.PlaygroundAPI.search(frameworkElement.entity);
                        if (result) {
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
                });
            },
            function (session, results) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (results.response) {
                        var result = yield PlaygroundAPI_1.PlaygroundAPI.search(results.response);
                        if (result)
                            session.send(results[0].code);
                    }
                    session.endDialog();
                });
            }
        ]);
    }
    PlaygroundDialog.add = add;
})(PlaygroundDialog = exports.PlaygroundDialog || (exports.PlaygroundDialog = {}));
