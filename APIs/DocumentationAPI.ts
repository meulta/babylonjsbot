import { Helpers } from '../Common/Helpers'
import { SearchResults } from './SearchResults'  

export module DocumentationAPI {
    export async function search(what: string): Promise<SearchResults.SearchResult> {
        var resultJson = await Helpers.API.DownloadJson(`http://doc.babylonjs.com/search/?q=${what}&renderType=json`);
        var searchResult:SearchResults.SearchResult = new SearchResults.SearchResult();
        var results = JSON.parse(resultJson);

        if(results && results.length > 0){
            var res = new SearchResults.SearchResult();
            searchResult.name = searchResult.name;
            searchResult.url = searchResult.url.replace("http", "https");
        }
        return new Promise<SearchResults.SearchResult>(resolve => {
            resolve(searchResult);            
        });
    }
}

