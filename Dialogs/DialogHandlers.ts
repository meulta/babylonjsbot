import { PlaygroundAPI } from '../APIs/PlaygroundAPI'
import { Helpers } from '../Common/Helpers'
import builder = require('botbuilder');

export module DialogHandlers {
     export async function sendCode(session:builder.Session, text:string = undefined) {
         var introSentence;
        
        if(text == undefined){
            if(session.privateConversationData.lastSearchText){
                text = session.privateConversationData.lastSearchText;
                introSentence = "other-content-letmesee";
            }
            else {
                session.endDialog("other-content-noprevious");
            }
        }
        
        var searchPage = 0;
        if(session.privateConversationData.lastSearchText && session.privateConversationData.lastSearchText === text){
            searchPage = session.privateConversationData.lastSearchPage || 0;
        }
       
        if(!introSentence)
            introSentence = searchPage == 0 ? "playground-foundthis" : "playground-alreadysearched-foundthis";

        session.sendTyping();
        var result = await PlaygroundAPI.search(text, searchPage);

        if(result) {
            session.send(introSentence);
            session.send(result.code);
            session.send("playground-fullsample", result.name, result.url);
            session.privateConversationData.lastSearchType = Helpers.SearchType.code;
            session.privateConversationData.lastSearchText = text;
            session.privateConversationData.lastSearchPage = result.nextPage;
        }
        else {
            session.send("all-idontknow");
        }
        session.endDialog();
    }
}