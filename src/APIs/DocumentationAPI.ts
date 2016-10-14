import { Helpers } from './Helpers'

export module DocumentationAPI {
    export function search(what: string): string{
            Helpers.API.DownloadJson(`http://doc.babylonjs.com/search/?q=${what}&renderType=json`, (result) => {
            console.log(result);
        });
        return "";
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