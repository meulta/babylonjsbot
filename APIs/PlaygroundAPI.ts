import { Helpers } from '../Common/Helpers'
import { SearchResults } from './SearchResults'

export module PlaygroundAPI {
    export async function search(what: string): Promise<SearchResults.SearchResult> {
        var options = {
                    search: what,
                    page: 0,
                    pageSize: 1,
                    includePayload: true,
                    skipPreviousSnippetVersions: true
                };

        var jsonAsString = await Helpers.API.DownloadJson(`http://localhost:41760/api/search`, true, options);
        var searchResults = new SearchResults.SearchResult();
        var results = JSON.parse(jsonAsString);

        //avoid duplicate (multiple versions in the search results)
        if(results.snippets && results.snippets.length > 0){
            var snippet = results.snippets[0];
            var code = snippet.JsonPayload.replace(/\\\"/g, "\"")
                                                .replace(/\\r\\n/g, "\r\n")
                                                .replace(/\\t/g, "\t")
                                                .match(new RegExp("((\\r\\n)((?!\\r\\n).)*){2}" + what + "(((?!\\r\\n).)*(\\r\\n)){2}", "g"));
            
            var res = new SearchResults.SearchResult();
            searchResults.name = "Snippet " + snippet.Id;
            searchResults.url = "http://www.babylonjs-playground.com/#" + snippet.Id;
            searchResults.code = code && code.length > 0 ? code[0].replace(/\r\n/g, "\n\n").replace(/  +/g, ' ') : null;
        }

        return new Promise<SearchResults.SearchResult>(resolve => {
            resolve(searchResults);
        });
    }
}