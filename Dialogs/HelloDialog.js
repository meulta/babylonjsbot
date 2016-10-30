"use strict";
var HelloDialog;
(function (HelloDialog) {
    function add(bot, intents) {
        intents.matches('Hello', '/Hello');
        bot.dialog('/Hello', function (session) {
            session.send("Hello I am the **Babylon.js bot**! \n\n I can talk to you about 3D ! Ask me how to create 'lights', for exemple.");
            session.endDialog();
        });
    }
    HelloDialog.add = add;
})(HelloDialog = exports.HelloDialog || (exports.HelloDialog = {}));
