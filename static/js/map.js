function Map(scene) {
    var planeGeometry = new THREE.PlaneGeometry(10, 10);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, wireframe: true });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    // var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xab88ee });
    var cubeMaterial = new THREE.MeshPhongMaterial({
        color: 0xab88ee,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
    })
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

    this.render = function (scene) { //render mapy
        scene.add(this.container)
        removeContainer(this.fallenBlocksCont)
        drawFallenBlocks(this.fallenBlocksCont, this.map)
        this.fallenBlocksCont.position.z = POS_Z
        scene.add(this.fallenBlocksCont)

    }

    //TODO SPRAWDZANIE LINII I ROBIENIE PUNKTACJI
    /*this.checkLines = function () {
        var howMany = 1; //TODO - mnożnik do scorów

        for (var y = this.map.length - 1; y > 0; y--) {
            for (var x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] == 0) {
                    continue;
                }
            }

            var line = this.map.splice(y, 1)[0] //wycinanie  zapełnionego wiersza
            this.map.unshift(line) //wklejenie 0 do wyciętego wiersza 
            y += 1;
        }


    }*/

    function addToContainer(container) { //dodawanie planeów do konterenra z podstawką do gry(mapą)
        for (var y = 0; y < MAP_HEIGHT; y++) {
            for (var x = 0; x < MAP_WIDTH; x++) {
                var clonedPlane = plane.clone();
                clonedPlane.position.set(10 * x, 10 * y, POS_Z)
                container.add(clonedPlane)
            }
        }

    }

    function drawFallenBlocks(container, map) { //mapa rysuje spadnięte klocki
        for (var y = 0; y < map.length; y++) {
            for (var x = 0; x < map[y].length; x++) {
                if (map[y][x] != 0) {
                    var clonedCube = cube.clone();
                    clonedCube.position.set(10 * x + MAP_POS_X, 10 * y + MAP_POS_Y, POS_Z);
                    container.add(clonedCube)
                }
            }
        }
    }

    function removeContainer(container) { //usuwanie kontenera z klockami (odświeżanie info)
        scene.remove(container)
        container.children = [];
    }
}