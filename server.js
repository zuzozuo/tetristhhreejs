var http = require("http");
var http = require("http");
var Datastore = require('nedb');
var qs = require("querystring");
var fs = require("fs");
var path = require("path");
var db = new Datastore({
    filename: 'data/database.db'
});
var socketio = require("socket.io")

db.loadDatabase(function(err) { // Callback is optional
    // Now commands will be executed
});



var server = http.createServer(function(req, res) {
    console.log(req.url)
    var url = req.url,
        ext = path.extname(url),
        contentType;

    if (ext == ".js") {
        contentType = "application/javascript";
    } else if (ext == ".css") {
        contentType = "text/css";
    } else if (ext == ".html") {
        contentType = "text/html";
    } else if (ext == ".jpg") {
        contentType = "image/jpeg";
    } else if (ext == ".png") {
        contentType = "image/png";
    } else if (ext == ".woff") {
        contentType = "application/font-woff";
    } else if (ext == ".gif") {
        contentType = "image/gif";
    }

    if (url == "/") {
        fs.readFile("static/index.html", function(error, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        })
    } else {
        fs.readFile("static" + url, function(error, data) {
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.write(data);
            res.end();
        })
    }
})

server.listen(3000, function() {
    console.log("serwer wystartował na porcie 3000")
});

var io = socketio.listen(server)