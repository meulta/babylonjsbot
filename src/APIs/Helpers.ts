export namespace Helpers {
    export class API{ 
        public static DownloadJson(url:string, done: (jsonResult:string) => any, post:boolean=false, options:any=undefined){  
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();

            xhr.onload = function (){
                try {
                    done(xhr.responseText);
                }
                catch(e){
                    console.log("Error downloading file: " + e.message);
                }
            };

            xhr.open(options ? "POST" : "GET", url, true);
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify(options));
        }
    }
}