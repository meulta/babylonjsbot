"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const DocumentationAPI_1 = require('../APIs/DocumentationAPI');
const builder = require('botbuilder');
var DocumentationDialog;
(function (DocumentationDialog) {
    function add(bot, intents) {
        intents.matches('GetDocumentation', function (session, args) {
            return __awaiter(this, void 0, void 0, function* () {
                session.send("Get documentation");
                var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');
                if (frameworkElement) {
                    var result = yield DocumentationAPI_1.DocumentationAPI.search(frameworkElement.entity);
                    session.send("Found this:" + result.url);
                }
                else {
                    session.send("didnt get that.");
                }
                session.endDialog();
            });
        });
    }
    DocumentationDialog.add = add;
})(DocumentationDialog = exports.DocumentationDialog || (exports.DocumentationDialog = {}));
