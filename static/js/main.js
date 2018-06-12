$(document).ready(function () {
    var game = new Game();

    game.init();

    function mainLoop() {
        game.update();
        game.render();
        window.requestAnimationFrame(mainLoop);
    }

    mainLoop();

})