import { Helpers } from './Helpers'
import { SearchResults } from './SearchResults'

export module PlaygroundAPI {
    export function search(what: string, done: (jsonResult:SearchResults.SearchResult[]) => any): void {
        var options = {
                    search: what,
                    page: 0,
                    pageSize: 20,
                    includePayload: false
                };

        Helpers.API.DownloadJson(`http://babylonjs-api.azurewebsites.net/api/search`, (results:any) => {
            var searchResults:SearchResults.SearchResult[] = [];
            results = JSON.parse(results);

            //avoid duplicate (multiple versions in the search results)
            var lastSnippetId:string = "";
            for(var snippet of results.snippets){
                if(snippet.Id !== lastSnippetId){
                    var res = new SearchResults.SearchResult();
                    res.name = "Snippet " + snippet.Id;
                    res.url = "https://www.babylonjs-playground.com/#" + snippet.Id,
                    searchResults.push(res);
                    lastSnippetId = snippet.Id;
                }
            }

            done(searchResults);
        }, true, options);
    }
}