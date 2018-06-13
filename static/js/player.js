function Player(map, scene) { //klasa z graczem

    var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x220e38 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    var blocks = new Blocks();
    var container = new THREE.Object3D();
    var fallenBlocksContainer = new THREE.Object3D();
    var playerX = 0;
    var playerY = 0;
    var timeout = FALLING_SPEED;
    var mapTab = map.map;
    var playerState = STATE_GET_RANDOM_BLOCK;
    var delta = 0;
    var randomBlock;

    this.update = function () {

        switch (playerState) { //zmiana stanu gracza
            case STATE_GET_RANDOM_BLOCK:
                var rand = BLOCK_TYPES[Math.floor(BLOCK_TYPES.length * Math.random()) || 0]
                randomBlock = blocks.getBlock(rand)

                playerY = 0;
                playerX = parseInt((MAP_WIDTH - randomBlock[0].length) / 2);
                playerState = STATE_FALLING_BLOCK;
                break;
            case STATE_FALLING_BLOCK:
                fallingDown(randomBlock);

                break;
            case STATE_FALLEN_BLOCK:

                break;
            case STATE_GAME_OVER:
                break;

        }

    }

    this.render = function (scene) {
        removeContainer(container, scene)
        drawBlock(randomBlock, scene);

    }

    this.move = function (side) {
        playerX += side;
        if (collide(mapTab, randomBlock)) {
            playerX -= side;
        }
    }

    this.rotate = function () {
        rotateBlock(randomBlock)
    }

    function deltaTime() {
        var date = new Date();
        var milis = date.getTime();
        //console.log(milis - delta)
        delta = milis;
    }

    function removeContainer(container, scene) {
        scene.remove(container)
        container.children = [];
    }

    function drawBlock(randomBlock, scene) {
        if (randomBlock != []) {
            for (var y = 0; y < randomBlock.length; y++) {
                for (var x = 0; x < randomBlock[y].length; x++) {
                    if (randomBlock[y][x] != 0) {
                        var cubeClone = cube.clone();
                        cubeClone.position.set(10 * x, 10 * y, POS_Z);
                        container.add(cubeClone);
                    }

                }
            }

            container.position.set(playerX * 10, (playerY) * 10, POS_Z);
            scene.add(container);
        }
    }


    function fallingDown(randomBlock) { //spadanie klocka
        timeout -= 1;

        if (timeout == 0) {
            playerY += 1;
            var collision = collide(mapTab, randomBlock);

            if (collision) { //jeśli jest kolizja, to ustawia klocek na odpowiednim (wcześniejszym miejscu)
                playerY -= 1;
                merge(mapTab, randomBlock);
                playerState = STATE_GET_RANDOM_BLOCK;

            }

            timeout = FALLING_SPEED;

        }
        deltaTime();
    }

    function collide(map, block) { //sprawdza czy klocek sie styka z innymi klockami które są już na mapie
        // jeśli wartość jakiegoś klocuszka w randomowym klocku != 0 to sprawdzamy czy na mapie na pozycji x, y istnieją jakieś klocki
        //jeśli istnieją to mamy kolizję klocków, jeśli któryś z warunków jest nie spełniony to nie mamy kolizji
        for (var y = 0; y < block.length; y++) {
            for (var x = 0; x < block[y].length; x++) {
                if (block[y][x] !== 0 && (map[y + playerY] && map[y + playerY][x + playerX]) !== 0) {
                    return true;
                }
            }

        }
        return false;
    }


    function merge(map, block) { //łączenie klocka z mapą - jeśli jest kolizja wpisujemy zajęte miejsca w mapę
        for (var y = 0; y < block.length; y++) {
            for (var x = 0; x < block[y].length; x++) {
                if (block[y][x] !== 0) {
                    map[y + playerY][x + playerX] = block[y][x];
                }
            }
        }
    }

    function rotateBlock(block) {   //rotacja bloku w tablicy
        for (var y = 0; y < block.length; y++) {
            for (var x = 0; x < y; x++) {
                [
                    block[x][y],
                    block[y][x]
                ] = [
                        block[y][x],
                        block[x][y]
                    ]

            }
        }

        for (var y = 0; y < block.length; y++) {
            block[y].reverse();
        }

    }


}


