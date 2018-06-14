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
var users = [];

db.loadDatabase(function (err) { // Callback is optional
    // Now commands will be executed
});



var server = http.createServer(function (req, res) {
    // console.log(req.url)
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
        fs.readFile("static/index.html", function (error, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        })
    } else {
        fs.readFile("static" + url, function (error, data) {
            res.writeHead(200, {
                'Content-Type': contentType
            });
            res.write(data);
            res.end();
        })
    }
})

server.listen(3000, function () {
    console.log("serwer wystartował na porcie 3000")
});

var io = socketio.listen(server)

io.sockets.on("connection", function (client) {

    var clientsNick = client.id;

    client.on("getNick", function (data) { //odebranie eventu z nickiem
        var obj = {
            clientId: client.id,
            nick: data.nick
        }

        db.insert(obj, function (err, newDoc) { }); //dodawanie do bazy nowego usera

        users.push(obj)

        if (users.length < 2) {     //rozesłanie odpowiednich eventów w zależności od ilości użytkowników
            client.emit("waitingForPlayers", {})
        } else if (users.length == 2) {
            io.emit("allUsersInGame", {})

        } else {
            client.emit("tooMuchPlayers", {})
        }
    })

    //TODO WYŚWIETLANIE PRZEGRANEGO I WYGRANEGO

    /* client.on("gameOver", function (data) {
         var winner;
         for (var i = 0; i < users.length; i++) {
             if (users[i].nick != data.nick) {
                 winner = users[i].nick
             }
         }
         client.broadcast.emit("whoIsWinner", {
             loser: data.nick,
             winner: winner
         })
     })*/
    client.on("disconnect", function (data) {
        db.remove({ clientId: String(client.id) }, function (err, numRemoved) { }) //usuwanie usera z bazy i tablicy
        for (var i = 0; i < users.length; i++) {
            if (users[i].clientId == client.id) {
                users.splice(i, 1)
            }
        }
    })


})