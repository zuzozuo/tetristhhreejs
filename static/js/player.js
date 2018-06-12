function Player(map, scene) { //klasa z graczem

    var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x220e38 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    var blocks = new Blocks();
    var container = new THREE.Object3D();
    var randomBlock = [];
    var playerX = 0;
    var playerY = MAP_HEIGHT;
    var playerZ = -5;
    var timeout = FALLING_SPEED;
    var mapTab = map.map;
    var playerState = STATE_GET_RANDOM_BLOCK;



    this.update = function () {

        switch (playerState) {      //zmiana stanu gracza
            case STATE_GET_RANDOM_BLOCK:
                var random = Math.floor(Math.random() * blocks.allBlocks.length); //losowanie randomowego klocka
                for (var i = 0; i < blocks.allBlocks[random].length; i++) {
                    randomBlock.push(blocks.allBlocks[random][i])
                }

                playerX = (MAP_WIDTH - randomBlock[0].length) / 2;
                playerY = MAP_HEIGHT;
                playerState = STATE_FALLING_BLOCK;

                break;
            case STATE_FALLING_BLOCK:
                fallingDown();

                break;
            case STATE_FALLEN_BLOCK:

                break;
            case STATE_GAME_OVER:
                break;

        }

    }


    this.render = function (scene) {
        if (randomBlock != []) {
            for (var y = 0; y < randomBlock.length; y++) {
                for (var x = 0; x < randomBlock[y].length; x++) {
                    if (randomBlock[y][x] != 0) {
                        var cubeClone = cube.clone();
                        cubeClone.position.set(10 * x, 10 * y, 0);
                        container.add(cubeClone);
                    }

                }
            }

            container.position.set(playerX * 10, (playerY - randomBlock.length) * 10, playerZ);
            scene.add(container);

        }
    }

    function fallingDown() {
        timeout -= 1;
        if (timeout == 0) {
            playerY -= 1;
            timeout = FALLING_SPEED;
            console.log(playerY)
            if (collide(map)) {
                playerState = STATE_GET_RANDOM_BLOCK;
            }

        }
    }

    function collide(map) { //sprawdza czy klocek sie styka z innymi klockami które są już na mapie
        for (var y = 0; y < randomBlock.length; y++) {
            for (var x = 0; x < randomBlock[y].length; x++) {
                if (randomBlock[y][x] != 0 && (map[y + playerY] && map[y + playerY][x + playerX] != 0)) {
                    return true;
                }
            }
        }

        return false;
    }
}