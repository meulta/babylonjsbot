import { Helpers } from '../Common/Helpers'
import { SearchResults } from './SearchResults'  

export module DocumentationAPI {
    export async function search(what: string, page: number = 1): Promise<SearchResults.SearchResult> {
        var resultJson = await Helpers.API.DownloadJson(`http://doc.babylonjs.com/search/?q=${what}&page=${page}&max=${1}&renderType=json`);
        var searchResult:SearchResults.SearchResult = new SearchResults.SearchResult();
        var response = JSON.parse(resultJson);

        if(response.results && response.results.length > 0){
            var res = new SearchResults.SearchResult();
            searchResult.name = response.results[0].name;
            searchResult.url = response.results[0].url.replace("http", "https");
        }

        return new Promise<SearchResults.SearchResult>(resolve => {
            resolve(searchResult);            
        });
    }
}

