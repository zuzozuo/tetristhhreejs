function Game() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height(), 0.1, 10000);
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    var axes = new THREE.AxesHelper(1000);
    var map = new Map(scene);
    var player = new Player(map);
    var sLight = new THREE.SpotLight(0xffffff, 2, 1000, 0.50);
    var lightContainer = new THREE.Object3D();
    var lightCont2;


    ///DO USUNIECIA POTEM TE ORBIT CONTROLSY!
    /*var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    });*/

    // console.log(blocks.allBlocks)
    this.init = function () {
        $("#root").append(renderer.domElement);
        renderer.setClearColor(0x000000);
        renderer.setSize(window.innerWidth, window.innerHeight);
        map.clear();              //inicjalizacja pustej mapy
        map.container.position.set(-30, -100, 0);
        lightContainer.position.set(0, -200, -400)
        lightContainer.add(sLight)
        lightCont2 = lightContainer.clone();
        lightCont2.position.set(0, -100, -300)

        //  scene.add(axes)
        scene.add(map.container)
        scene.add(lightContainer)
        // scene.add(lightCont2);
        camera.position.set(0, -200, -400)
        camera.lookAt(scene.position)

        $(document).keyup(function (event) {
            if (isGameOver == GLOBAL_STATE_PLAY) {
                switch (event.keyCode) {
                    case KEY_UP:
                        player.rotate(1);
                        break;
                    case KEY_DOWN:
                        player.goDownFaster();
                        break;
                    case KEY_LEFT:
                        player.move(1)
                        break;
                    case KEY_RIGHT:
                        player.move(-1)
                        break;
                }
            }

        })
    }

    this.render = function () {
        player.render(scene)
        map.render(scene);
        renderer.render(scene, camera)
    }

    this.update = function () {
        player.update();
    }


}