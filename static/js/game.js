function Game() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height(), 0.1, 10000);
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    var axes = new THREE.AxesHelper(1000);
    var map = new Map(scene);
    //var blocks = new Blocks();
    var player = new Player(map);



    ///DO USUNIECIA POTEM TE ORBIT CONTROLSY!
    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    });

    // console.log(blocks.allBlocks)

    this.init = function () {
        $("#root").append(renderer.domElement);
        renderer.setClearColor(0xffffff, 0);
        renderer.setSize(window.innerWidth, window.innerHeight);

        map.clear();              //inicjalizacja pustej mapy
        map.container.position.set(0, 0, 0)


        scene.add(axes)
        scene.add(map.container)
        camera.position.set(0, 0, -1000)
        camera.lookAt(scene.position)
    }



    this.render = function () {
        player.update();
        player.render(scene)
        map.render(scene);
        renderer.render(scene, camera)
    }

    this.update = function () {

    }
}