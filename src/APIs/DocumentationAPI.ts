import { Helpers } from './Helpers'
import { SearchResults } from './SearchResults'
type SearchResult = SearchResults.SearchResult;


export module DocumentationAPI {
    export function search(what: string, done: (jsonResult:SearchResult[]) => any): void {
        Helpers.API.DownloadJson(`http://doc.babylonjs.com/search/?q=${what}&renderType=json`, (results:any) => {
            var searchResults:SearchResult[] = [];
            results = JSON.parse(results);

            for(var result of results.results){
                var res = new SearchResults.SearchResult();
                res.name = result.name;
                res.url = result.url
                searchResults.push(res);
            }

            done(searchResults);
        });
    }

    export class DocumentationResults
    {
        searchTerm:string
        resultsCount:number;
        filteredCount:number;
        resultMax:number;
        results:Result[];
        page:number;
        availableFilters:Availablefilter[];
    }

    export class Result
    {
        src:string;
        url:string;
        name:string;
        version:string;
        occurrences:number;
    }

    export class Availablefilter
    {
        category:string;
        occurrences:number;
        enabled:boolean;
    }
}