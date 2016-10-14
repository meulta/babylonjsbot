"use strict";
var Helpers;
(function (Helpers) {
    var API = (function () {
        function API() {
        }
        API.DownloadJson = function (url, done) {
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                try {
                    done(xhr.responseText);
                }
                catch (e) {
                    console.log("Error downloading file: " + e.message);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        };
        return API;
    }());
    Helpers.API = API;
})(Helpers = exports.Helpers || (exports.Helpers = {}));
