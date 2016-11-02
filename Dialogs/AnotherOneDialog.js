"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Helpers_1 = require('../Common/Helpers');
const DialogHandlers_1 = require('./DialogHandlers');
var AnotherOneDialog;
(function (AnotherOneDialog) {
    function add(bot, intents) {
        intents.matches('OtherContent', [
            function (session, args, next) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (session.privateConversationData.lastSearchType != undefined) {
                        switch (session.privateConversationData.lastSearchType) {
                            case Helpers_1.Helpers.SearchType.code:
                                DialogHandlers_1.DialogHandlers.sendCode(session);
                                break;
                        }
                    }
                    else {
                        session.endDialog("other-content-noprevious");
                    }
                });
            }
        ]);
    }
    AnotherOneDialog.add = add;
})(AnotherOneDialog = exports.AnotherOneDialog || (exports.AnotherOneDialog = {}));
