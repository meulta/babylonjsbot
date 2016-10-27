import { Helpers } from './Helpers'
import { SearchResults } from './SearchResults'

export module DocumentationAPI {
    export function search(what: string, done: (jsonResult:SearchResults.SearchResult[]) => any): void {
        Helpers.API.DownloadJson(`http://doc.babylonjs.com/search/?q=${what}&renderType=json`, (results:any) => {
            var searchResults:SearchResults.SearchResult[] = [];
            results = JSON.parse(results);

            for(var result of results.results){
                var res = new SearchResults.SearchResult();
                res.name = result.name;
                res.url = result.url.replace("http", "https");
                searchResults.push(res);
            }

            done(searchResults);
        });
    }
}

