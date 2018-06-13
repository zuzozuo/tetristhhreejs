var isGameOver = GLOBAL_STATE_PLAY;
$(document).ready(function () {
    var client = new io();
    var game = new Game();

    //oczekiwanie na drugirgo użytkownika
    $("button").click(function () {
        if ($("#getUsersNick").val().length > 0) {
            client.emit("getNick", {
                nick: $("#getUsersNick").val()
            })

            $(".nick").html($("#getUsersNick").val())
        } else {
            alert("Nie podano nicku! :( ")
        }
    })

    client.on("waitingForPlayers", function (data) {
        $("#loading").css('display', 'block');
    })

    client.on("allUsersInGame", function (data) {
        $("#getPlayers").css("display", 'none')
        $("#enemyName").html(data.enemyNick);
        game.init();
        mainLoop();

    })




    function mainLoop() {
        game.update();
        game.render();
        window.requestAnimationFrame(mainLoop);
    }

})