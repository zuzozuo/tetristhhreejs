var isGameOver = GLOBAL_STATE_PLAY;
$(document).ready(function () {
    var client = new io();
    var game = new Game();
    var userNick, canIstop = false;

    $("button").click(function () { //pobranie nicka z inputa
        if ($("#getUsersNick").val().length > 0) {
            userNick = $("#getUsersNick").val();
            client.emit("getNick", {
                nick: userNick
            })

            $(".nick").html(userNick)
        } else {
            alert("Nie podano nicku! :( ")
        }
    })

    client.on("waitingForPlayers", function (data) { //odpalenie eventu z oczekiawniem na uzytkownika
        $("#loading").css('display', 'block');
    })

    client.on("allUsersInGame", function (data) { //odebranie eventu z info że wszyscy są w grze
        $("#getPlayers").css("display", 'none');
        $("#enemyName").html(data.enemyNick);
        game.init(); //jeśli wszyscy są w grze to wtedy odpalamy gre
        mainLoop();

    })



    client.on("infoAboutFinish", function (data) {
        $("#lose").css("display", "block")
        $("#losersNick").html(data.loser)
        isGameOver = GLOBAL_STATE_STOP;
        console.log("Info od serwera infoAboutFInish")
    })


    function mainLoop() {
        if (isGameOver == GLOBAL_STATE_PLAY) {
            game.update();
            if (isGameOver == GLOBAL_STATE_LOSE) {
                client.emit("weKnowLoser", {
                    loser: userNick
                })
            }
        }
        game.render();
        window.requestAnimationFrame(mainLoop);

    }
})