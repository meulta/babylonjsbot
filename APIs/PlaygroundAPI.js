"use strict";
var Helpers_1 = require('./Helpers');
var SearchResults_1 = require('./SearchResults');
var PlaygroundAPI;
(function (PlaygroundAPI) {
    function search(what, done) {
        var options = {
            search: what,
            page: 0,
            pageSize: 80,
            includePayload: true
        };
        Helpers_1.Helpers.API.DownloadJson("http://babylonjs-api.azurewebsites.net/api/search", function (results) {
            var searchResults = [];
            results = JSON.parse(results);
            //avoid duplicate (multiple versions in the search results)
            var lastSnippetId = "";
            for (var _i = 0, _a = results.snippets; _i < _a.length; _i++) {
                var snippet = _a[_i];
                var jsonPaylod = snippet.JsonPayload.replace(/\\\"/g, "\"")
                    .replace(/\\r\\n/g, "\r\n")
                    .replace(/\\t/g, "\t")
                    .match(new RegExp("((\\r\\n)((?!\\r\\n).)*){2}" + what + "(((?!\\r\\n).)*(\\r\\n)){2}", "g"));
                if (snippet.Id !== lastSnippetId) {
                    var res = new SearchResults_1.SearchResults.SearchResult();
                    res.name = "Snippet " + snippet.Id;
                    res.url = "https://www.babylonjs-playground.com/#" + snippet.Id;
                    res.code = jsonPaylod;
                    searchResults.push(res);
                    lastSnippetId = snippet.Id;
                }
            }
            done(searchResults);
        }, true, options);
    }
    PlaygroundAPI.search = search;
})(PlaygroundAPI = exports.PlaygroundAPI || (exports.PlaygroundAPI = {}));
