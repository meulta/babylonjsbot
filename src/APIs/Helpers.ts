export namespace Helpers {
    export class API{ 
        public static DownloadJson(url:string, done: (jsonResult:string) => any){  
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

            xhr.open("POST", url, true);
            xhr.send();
        }
    }
}