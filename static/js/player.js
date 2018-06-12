function Player(map, scene) { //klasa z graczem

    var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x220e38 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    var blocks = new Blocks();
    var container = new THREE.Object3D();
    var playerX = 0;
    var playerY = 0;
    var playerZ = -5;
    var timeout = FALLING_SPEED;
    var mapTab = map.map;
    var playerState = STATE_GET_RANDOM_BLOCK;

    this.randomBlock = [];

    this.update = function() {

        switch (playerState) { //zmiana stanu gracza
            case STATE_GET_RANDOM_BLOCK:
                var random = Math.floor(Math.random() * blocks.allBlocks.length); //losowanie randomowego klocka
                for (var i = 0; i < blocks.allBlocks[random].length; i++) {
                    this.randomBlock.push(blocks.allBlocks[random][i])
                }

                playerX = (MAP_WIDTH - this.randomBlock[0].length) / 2;
                playerY = 0;
                playerState = STATE_FALLING_BLOCK;

                break;
            case STATE_FALLING_BLOCK:
                fallingDown(this.randomBlock);

                break;
            case STATE_FALLEN_BLOCK:

                break;
            case STATE_GAME_OVER:
                break;

        }

    }


    this.render = function(scene) {
        drawPiece(this.randomBlock, scene);

    }

    function drawPiece(randomBlock, scene) {
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

            container.position.set(playerX * 10, (playerY) * 10, playerZ);
            scene.add(container);

        }
    }

    function fallingDown(randomBlock) { //spadanie klocka
        timeout -= 1;
        if (timeout == 0) {
            playerY += 1;

            if (collide(mapTab, randomBlock)) {
                playerY -= 1;
                //merge(mapTab, randomBlock)
                //playerY = MAP_HEIGHT;
                playerState = STATE_GET_RANDOM_BLOCK;
            }

            timeout = FALLING_SPEED;
        }
    }

    function collide(map, block) { //sprawdza czy klocek sie styka z innymi klockami które są już na mapie
        // jeśli wartość jakiegoś klocuszka w randomowym klocku != 0 to sprawdzamy czy na mapie na pozycji x, y istnieją jakieś klocki
        //jeśli istnieją to mamy kolizję klocków, jeśli któryś z warunków jest nie spełniony to nie mamy kolizji
        for (var y = 0; y < block.length; y++) {
            for (var x = 0; x < block[y].length; x++) {
                if (block[y][x] != 0 && (map[y + playerY] != 0 && map[y + playerY][x + playerX] != 0)) {
                    return true;
                }

            }
        }
        return false;
    }

    function merge(map, block) { //łączenie klocka z mapą
        for (var y = 0; y < block.length; y++) {
            for (var x = 0; x < block[y].length; x++) {
                if (block[y][x] !== 0) {
                    map[y + playerY][x + playerX] = block[y][x];
                }
            }
        }
    }
}