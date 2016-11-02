import builder = require('botbuilder');

export module Helpers {
    export class API { 
        public static async DownloadJson(url:string, post:boolean=false, options:any=undefined): Promise<string>{  
            return new Promise<string>(resolve => {
                var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                var xhr = new XMLHttpRequest();
                        
                xhr.onload = function (){
                    try {
                        resolve(xhr.responseText);
                    }
                    catch(e){
                        console.log("Error while calling api: " + e.message);
                    }
                };

                xhr.open(options ? "POST" : "GET", url, true);
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify(options));
            });
        }
    }

    export enum SearchType { "code", "documentation" };

    
}