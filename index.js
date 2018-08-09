/* 
*
* Assignment 1 of Node Master Class by Agi-Tuedor Oke
* Create a simple "Hello World" RESTful API
* This app responds to POST request on route "/home"
* Other requests returns a 404.
* 
*
*/

const http = require("http");
const url = require("url");

// defines an empty Handler object
let Handlers = {}

// Adds a "home" method to the Handler object
Handlers.home = (data, callback) => {

    // Tests if the method if POST, else call Handlers.notFound

    data.method === "POST" ? callback(200, "Hello World, from Pirple!") : Handlers.notFound(data, callback);

};

// Adds a "notFound" method to the Handler object
Handlers.notFound =(data, callback) => {

    callback (404, "404 Not Found");
};


// Defines a "Router" object and add a "home" key mapping to "handlers.home" method defined above
let Router = {
    "home": Handlers.home
}


// defines a server callback, this get called for every request
let serverCallback = (req, res ) => {

    // Get the URL parsed in the request
    let parsedUrl = url.parse(req.url, true);

    // Extract the pathname of the parsed URL
    let pathname = parsedUrl.pathname;

    // Trim the pathname to remove starting and ending forward slashes (/)
    let trimmedUrl = pathname.replace(/^\/+|\/+$/g, '');

    // Get the request method and convert to upper case
    let method = req.method.toUpperCase();

    // Get all request data we need into a "data" object
    let data = {
        "method": method,
        "trimmedUrl": trimmedUrl
    };

    // Define a generic callback for the "Handler" method, this returns a response with a string passed
    let callback = (statusCode, responseString) => {

            res.writeHead(statusCode);
            res.end(responseString);
    };

    // Get the base
    let chosenHandler =  typeof(Router[data.trimmedUrl]) === "function"  ? Router[data.trimmedUrl] : Handlers.notFound;

    chosenHandler(data, callback);

};

// creates an http server object
let server = http.createServer((req, res) => {
    serverCallback(req, res);
});

// starts server at port 3000
server.listen(3000,() =>{
    console.log("Server started at post 3000")
});