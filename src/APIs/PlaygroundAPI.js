"use strict";
var Helpers_1 = require('./Helpers');
var SearchResults_1 = require('./SearchResults');
var DocumentationAPI;
(function (DocumentationAPI) {
    function search(what, done) {
        Helpers_1.Helpers.API.DownloadJson("http://babylonjs-api.azurewebsites.net/api/", function (results) {
            var searchResults = [];
            results = JSON.parse(results);
            for (var _i = 0, _a = results.results; _i < _a.length; _i++) {
                var result = _a[_i];
                var res = new SearchResults_1.SearchResults.SearchResult();
                res.name = result.name;
                res.url = result.url;
                searchResults.push(res);
            }
            done(searchResults);
        });
    }
    DocumentationAPI.search = search;
    var DocumentationResults = (function () {
        function DocumentationResults() {
        }
        return DocumentationResults;
    }());
    DocumentationAPI.DocumentationResults = DocumentationResults;
    var Result = (function () {
        function Result() {
        }
        return Result;
    }());
    DocumentationAPI.Result = Result;
    var Availablefilter = (function () {
        function Availablefilter() {
        }
        return Availablefilter;
    }());
    DocumentationAPI.Availablefilter = Availablefilter;
})(DocumentationAPI = exports.DocumentationAPI || (exports.DocumentationAPI = {}));
