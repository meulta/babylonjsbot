"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const CodeAPI_1 = require('../APIs/CodeAPI');
const DocumentationAPI_1 = require('../APIs/DocumentationAPI');
const Helpers_1 = require('../Common/Helpers');
var DialogHandlers;
(function (DialogHandlers) {
    function sendDocumentation(session, text = undefined) {
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
            var searchPage = 1;
            if (session.privateConversationData.lastSearchText && session.privateConversationData.lastSearchText === text) {
                searchPage = session.privateConversationData.lastSearchPage || 1;
            }
            if (!introSentence)
                introSentence = searchPage == 0 ? "doc-foundthis" : "doc-alreadysearched-foundthis";
            session.sendTyping();
            var result = yield DocumentationAPI_1.DocumentationAPI.search(text, searchPage);
            if (result) {
                session.send(introSentence);
                if (result.abstract)
                    session.send("doc-linkwithabstract", result.abstract, result.name, result.url);
                else
                    session.send("doc-link", result.name, result.url);
                session.privateConversationData.lastSearchType = Helpers_1.Helpers.SearchType.documentation;
                session.privateConversationData.lastSearchText = text;
                session.privateConversationData.lastSearchPage = result.nextPage;
            }
            else {
                session.send("all-idontknow");
            }
            session.endDialog();
        });
    }
    DialogHandlers.sendDocumentation = sendDocumentation;
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
                introSentence = searchPage == 0 ? "code-foundthis" : "code-alreadysearched-foundthis";
            session.sendTyping();
            var result = yield CodeAPI_1.CodeAPI.search(text, searchPage);
            if (result) {
                if (result.code) {
                    session.send(introSentence);
                    session.send(result.code);
                    session.send("code-fullsample", result.name, result.url);
                }
                else {
                    session.send("code-fullsamplenocode", result.name, result.url);
                }
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
