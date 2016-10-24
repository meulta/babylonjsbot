"use strict";
var Helpers;
(function (Helpers) {
    var API = (function () {
        function API() {
        }
        API.DownloadJson = function (url, done, post, options) {
            if (post === void 0) { post = false; }
            if (options === void 0) { options = undefined; }
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
            xhr.open(options ? "POST" : "GET", url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(options));
        };
        return API;
    }());
    Helpers.API = API;
})(Helpers = exports.Helpers || (exports.Helpers = {}));
