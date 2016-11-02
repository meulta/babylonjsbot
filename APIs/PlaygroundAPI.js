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
const SearchResults_1 = require('./SearchResults');
var PlaygroundAPI;
(function (PlaygroundAPI) {
    function search(what, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            var options = {
                search: what,
                page: page,
                pageSize: 1,
                includePayload: true,
                skipPreviousSnippetVersions: true
            };
            var jsonAsString = yield Helpers_1.Helpers.API.DownloadJson(`http://babylonjs-api.azurewebsites.net/api/search`, true, options);
            var searchResults = new SearchResults_1.SearchResults.SearchResult();
            var results = JSON.parse(jsonAsString);
            //avoid duplicate (multiple versions in the search results)
            if (results.snippets && results.snippets.length > 0) {
                var snippet = results.snippets[0];
                var code = snippet.JsonPayload.replace(/\\\"/g, "\"")
                    .replace(/\\r\\n/g, "\r\n")
                    .replace(/\\t/g, "\t")
                    .match(new RegExp("((\\r\\n)((?!\\r\\n).)*){2}" + what + "(((?!\\r\\n).)*(\\r\\n)){2}", "g"));
                var res = new SearchResults_1.SearchResults.SearchResult();
                searchResults.name = "Snippet " + snippet.Id;
                searchResults.url = "http://www.babylonjs-playground.com/#" + snippet.Id;
                searchResults.code = code && code.length > 0 ? code[0].replace(/\r\n/g, "\n\n").replace(/  +/g, ' ') : null;
                searchResults.nextPage = page <= results.pageCount ? page + 1 : 0;
            }
            return new Promise(resolve => {
                resolve(searchResults);
            });
        });
    }
    PlaygroundAPI.search = search;
})(PlaygroundAPI = exports.PlaygroundAPI || (exports.PlaygroundAPI = {}));
