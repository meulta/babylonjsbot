import { Helpers } from '../Common/Helpers'
import { DialogHandlers } from './DialogHandlers'
import builder = require('botbuilder');

export module AnotherOneDialog {
    export function add(bot:builder.UniversalBot, intents:builder.IntentDialog): void {
        intents.matches('OtherContent', [
            async function (session, args, next) {
                if(session.privateConversationData.lastSearchType != undefined){
                    switch(session.privateConversationData.lastSearchType){
                        case Helpers.SearchType.code:
                                DialogHandlers.sendCode(session);
                            break;
                    }
                }
                else {
                    session.endDialog("other-content-noprevious");
                }
            }
        ]);
    }
}