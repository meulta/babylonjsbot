import { Helpers } from './Helpers'
import { SearchResults } from './SearchResults'

export module DocumentationAPI {
    export function search(what: string, done: (jsonResult:SearchResults.SearchResult[]) => any): void {
        Helpers.API.DownloadJson(`http://babylonjs-api.azurewebsites.net/api/`, (results:any) => {
            var searchResults:SearchResults.SearchResult[] = [];
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