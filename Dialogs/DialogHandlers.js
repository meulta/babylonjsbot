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
const Helpers_1 = require('../Common/Helpers');
var DialogHandlers;
(function (DialogHandlers) {
    function sendCode(session, text = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            var introSentence;
            if (text == undefined) {
                if (session.privateConversationData.lastSearchText) {
                    text = session.privateConversationData.lastSearchText;
                    introSentence = "other-content-letmesee";
                }
                else {
                    session.endDialog("other-content-noprevious");
                }
            }
            var searchPage = 0;
            if (session.privateConversationData.lastSearchText && session.privateConversationData.lastSearchText === text) {
                searchPage = session.privateConversationData.lastSearchPage || 0;
            }
            if (!introSentence)
                introSentence = searchPage == 0 ? "playground-foundthis" : "playground-alreadysearched-foundthis";
            session.sendTyping();
            var result = yield PlaygroundAPI_1.PlaygroundAPI.search(text, searchPage);
            if (result) {
                session.send(introSentence);
                session.send(result.code);
                session.send("playground-fullsample", result.name, result.url);
                session.privateConversationData.lastSearchType = Helpers_1.Helpers.SearchType.code;
                session.privateConversationData.lastSearchText = text;
                session.privateConversationData.lastSearchPage = result.nextPage;
            }
            else {
                session.send("all-idontknow");
            }
            session.endDialog();
        });
    }
    DialogHandlers.sendCode = sendCode;
})(DialogHandlers = exports.DialogHandlers || (exports.DialogHandlers = {}));
