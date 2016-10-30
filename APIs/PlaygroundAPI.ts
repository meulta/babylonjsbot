import { Helpers } from './Helpers'
import { SearchResults } from './SearchResults'

export module PlaygroundAPI {
    export function search(what: string, done: (jsonResult:SearchResults.SearchResult[]) => any): void {
        var options = {
                    search: what,
                    page: 0,
                    pageSize: 80,
                    includePayload: true
                };

        Helpers.API.DownloadJson(`http://babylonjs-api.azurewebsites.net/api/search`, (results:any) => {
            var searchResults:SearchResults.SearchResult[] = [];
            results = JSON.parse(results);

            //avoid duplicate (multiple versions in the search results)
            var lastSnippetId:string = "";
            for(var snippet of results.snippets){
                
                var code = snippet.JsonPayload.replace(/\\\"/g, "\"")
                                                    .replace(/\\r\\n/g, "\r\n")
                                                    .replace(/\\t/g, "\t")
                                                    .match(new RegExp("((\\r\\n)((?!\\r\\n).)*){2}" + what + "(((?!\\r\\n).)*(\\r\\n)){2}", "g"));
                
                if(snippet.Id !== lastSnippetId){
                    var res = new SearchResults.SearchResult();
                    res.name = "Snippet " + snippet.Id;
                    res.url = "http://www.babylonjs-playground.com/#" + snippet.Id;
                    res.code = code && code.length > 0 ? code[0].replace(/\r\n/g, "\n\n").replace(/  +/g, ' ') : null;
                    searchResults.push(res);
                    lastSnippetId = snippet.Id;
                }
            }

            done(searchResults);
        }, true, options);
    }
}