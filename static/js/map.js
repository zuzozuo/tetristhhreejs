function Map() {
    var planeGeometry = new THREE.PlaneGeometry(10, 10);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide, wireframe: true });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //------------------------------------
    this.map = [];
    this.container = new THREE.Object3D();
    //-------------------------------------

    this.clear = function () {                  //czyszczenie mapy
        for (var y = 0; y < MAP_HEIGHT; y++) {
            this.map.push([]);
            for (var x = 0; x < MAP_WIDTH; x++) {
                this.map[y].push(0);
            }
        }
    }

    this.render = function (scene) {

        for (var y = 0; y < MAP_HEIGHT; y++) {
            for (var x = 0; x < MAP_WIDTH; x++) {
                var clonedPlane = plane.clone();
                clonedPlane.position.set(10 * x, 10 * y, 0)
                this.container.add(clonedPlane)
            }
        }
    }
}