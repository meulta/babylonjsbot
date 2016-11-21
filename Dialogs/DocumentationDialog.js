"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const DialogHandlers_1 = require('./DialogHandlers');
const builder = require('botbuilder');
var DocumentationDialog;
(function (DocumentationDialog) {
    function add(bot, intents) {
        intents.matches('GetDocumentation', [function (session, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');
                    if (frameworkElement) {
                        DialogHandlers_1.DialogHandlers.sendDocumentation(session, frameworkElement.entity);
                    }
                    else {
                        DialogHandlers_1.DialogHandlers.sendDocumentation(session);
                    }
                    session.endDialog();
                });
            }, function (session, results) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (results.response) {
                        DialogHandlers_1.DialogHandlers.sendCode(session, results.response);
                    }
                    session.endDialog();
                });
            }
        ]);
    }
    DocumentationDialog.add = add;
})(DocumentationDialog = exports.DocumentationDialog || (exports.DocumentationDialog = {}));
