"use strict";
var DocumentationAPI_1 = require('../APIs/DocumentationAPI');
var builder = require('botbuilder');
var DocumentationDialog;
(function (DocumentationDialog) {
    function add(bot, intents) {
        intents.matches('GetDocumentation', '/GetDocumentation');
        bot.dialog('/GetDocumentation', function (session, args) {
            session.send("Get documentation");
            var frameworkElement = builder.EntityRecognizer.findEntity(args.entities, 'FrameworkElement');
            if (frameworkElement) {
                DocumentationAPI_1.DocumentationAPI.search(frameworkElement.entity, function (results) {
                    session.send("Found this: \n\n\n\n`" + results[0].code[0].replace(/\r\n/g, "\n\n")) + "`";
                });
            }
            else {
                session.send("didnt get that.");
            }
            session.endDialog();
        });
    }
    DocumentationDialog.add = add;
})(DocumentationDialog = exports.DocumentationDialog || (exports.DocumentationDialog = {}));
