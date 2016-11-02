import { CodeAPI } from '../APIs/CodeAPI'
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
            introSentence = searchPage == 0 ? "code-foundthis" : "code-alreadysearched-foundthis";

        session.sendTyping();
        var result = await CodeAPI.search(text, searchPage);

        if(result) {
            session.send(introSentence);
            session.send(result.code);
            session.send("code-fullsample", result.name, result.url);
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