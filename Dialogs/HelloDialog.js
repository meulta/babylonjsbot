"use strict";
var HelloDialog;
(function (HelloDialog) {
    function add(bot, intents) {
        intents.matches('Hello', '/Hello');
        bot.dialog('/Hello', function (session) {
            session.endDialog("greetings");
        });
    }
    HelloDialog.add = add;
})(HelloDialog = exports.HelloDialog || (exports.HelloDialog = {}));
