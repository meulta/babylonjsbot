"use strict";
var Helpers_1 = require('./Helpers');
var DocumentationAPI;
(function (DocumentationAPI) {
    function search(what, done) {
        Helpers_1.Helpers.API.DownloadJson("http://doc.babylonjs.com/search/?q=" + what + "&renderType=json", function (result) {
            done(result);
        });
        return "";
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
