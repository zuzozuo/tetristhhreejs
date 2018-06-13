function Map(scene) {
    var planeGeometry = new THREE.PlaneGeometry(10, 10);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xab88ee });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    //------------------------------------
    this.map = [];
    this.container = new THREE.Object3D();
    this.fallenBlocksCont = new THREE.Object3D();
    //-------------------------------------

    addToContainer(this.container);


    this.clear = function () { //czyszczenie mapy
        for (var y = 0; y < MAP_HEIGHT; y++) {
            this.map.push([]);
            for (var x = 0; x < MAP_WIDTH; x++) {
                this.map[y].push(0);
            }
        }
    }

    this.render = function (scene) {
        scene.add(this.container)
        removeContainer(this.fallenBlocksCont)
        drawFallenBlocks(this.fallenBlocksCont, this.map)
        this.fallenBlocksCont.position.z = POS_Z
        scene.add(this.fallenBlocksCont)

    }

    function addToContainer(container) {
        for (var y = 0; y < MAP_HEIGHT; y++) {
            for (var x = 0; x < MAP_WIDTH; x++) {
                var clonedPlane = plane.clone();
                clonedPlane.position.set(10 * x, 10 * y, POS_Z)
                container.add(clonedPlane)
            }
        }

    }

    function drawFallenBlocks(container, map) {
        for (var y = 0; y < map.length; y++) {
            for (var x = 0; x < map[y].length; x++) {
                if (map[y][x] != 0) {
                    var clonedCube = cube.clone();
                    clonedCube.position.set(10 * x, 10 * y, POS_Z);
                    container.add(clonedCube)
                }
            }
        }
    }

    function removeContainer(container) {
        scene.remove(container)
        container.children = [];
    }
}