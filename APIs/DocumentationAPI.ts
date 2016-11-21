import { Helpers } from '../Common/Helpers'
import { SearchResults } from './SearchResults'  

export module DocumentationAPI {
    export async function search(what: string, page: number = 1): Promise<SearchResults.SearchResult> {
        var resultJson = await Helpers.API.DownloadJson(`http://doc.babylonjs.com/search/?q=${what}&page=${page}&max=${1}&renderType=json&includeAbstracts=true`);
        var searchResult:SearchResults.SearchResult = new SearchResults.SearchResult();
        var response = JSON.parse(resultJson);

        if(response.results && response.results.length > 0){
            var res = new SearchResults.SearchResult();
            var result = response.results[0];
            searchResult.name = result.name;
            searchResult.url = result.url.replace("http", "https");
            searchResult.abstract = result.abstract;
            searchResult.nextPage = page < response.filteredCount ? page + 1 : 1;
        }

        return new Promise<SearchResults.SearchResult>(resolve => {
            resolve(searchResult);            
        });
    }
}

