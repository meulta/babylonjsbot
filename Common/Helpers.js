"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var Helpers;
(function (Helpers) {
    class API {
        static DownloadJson(url, post = false, options = undefined) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise(resolve => {
                    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        try {
                            resolve(xhr.responseText);
                        }
                        catch (e) {
                            console.log("Error while calling api: " + e.message);
                        }
                    };
                    xhr.open(options ? "POST" : "GET", url, true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(options));
                });
            });
        }
    }
    Helpers.API = API;
})(Helpers = exports.Helpers || (exports.Helpers = {}));
