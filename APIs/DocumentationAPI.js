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
var DocumentationAPI;
(function (DocumentationAPI) {
    function search(what, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            var resultJson = yield Helpers_1.Helpers.API.DownloadJson(`http://doc.babylonjs.com/search/?q=${what}&page=${page}&max=${1}&renderType=json`);
            var searchResult = new SearchResults_1.SearchResults.SearchResult();
            var response = JSON.parse(resultJson);
            if (response.results && response.results.length > 0) {
                var res = new SearchResults_1.SearchResults.SearchResult();
                searchResult.name = response.results[0].name;
                searchResult.url = response.results[0].url.replace("http", "https");
            }
            return new Promise(resolve => {
                resolve(searchResult);
            });
        });
    }
    DocumentationAPI.search = search;
})(DocumentationAPI = exports.DocumentationAPI || (exports.DocumentationAPI = {}));
