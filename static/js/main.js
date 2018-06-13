var isGameOver = GLOBAL_STATE_PLAY;
$(document).ready(function () {
    var client = new io();
    var game = new Game();

    //oczekiwanie na drugirgo użytkownika


    game.init();

    function mainLoop() {
        game.update();
        game.render();
        window.requestAnimationFrame(mainLoop);
    }

    mainLoop();

})