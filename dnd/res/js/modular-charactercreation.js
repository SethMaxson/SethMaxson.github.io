import { Engine } from '../../../sf/res/js/engine.js';
import * as THREE from '../../../node_modules/three/src/Three.js';
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { CharactersModular } from '../../../sf/res/js/characters-modular.js';
import { THREEx } from '../../../sf/res/js/threex.js';
$(document).ready(function () {
    var camera, controls, renderer, scene, sky, ground, time = 0, newChar;
    Engine.Initialize("Viewer");
    var main = Engine.main;
    var clock = new THREE.Clock();
    var objects = [];
    function init() {
        main.Scene = new THREE.Scene();
        scene = main.Scene;
        renderer = main.renderer;
        main.Scene.background = new THREE.Color(0x11aaff);
        // main.Scene.add(main.Light);
        var container = document.getElementById('container');
        if (container) {
            camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
        }
        // document.getElementById('container').appendChild(renderer.domElement);
        camera.position.x = 0;
        camera.position.y = 0.8;
        camera.position.z = 3;
        camera.lookAt(new THREE.Vector3(0, 1, 0));
        controls = new OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI / 2 - 0.01;
        controls.maxDistance = 5;
        var people = new THREE.Object3D();
        CharactersModular.PersonLoader(function () {
            people.name = "PeopleGroup";
            newChar = CharactersModular.getRandom(0, 0, 0, "human", "m");
            people.add(newChar);
            // people.add(getPC("Jasper", -1, 0, 0));
            people.traverse(function (node) {
                objects.push(node);
            });
            for (let i = 0; i < newChar.animations.length; i++) {
                const anim = newChar.animations[i];
                $("#animation-select").append($("<option value=\"" + anim.name + "\">" + anim.name + "</option>"));
            }
            CharactersModular.hairOptions.sort();
            for (let i = 0; i < CharactersModular.hairOptions.length; i++) {
                const hairs = CharactersModular.hairOptions[i];
                $("#hair-select").append($("<option value=\"" + hairs + "\">" + hairs + "</option>"));
            }
            CharactersModular.bodyPartOptions.arms.sort();
            for (let i = 0; i < CharactersModular.bodyPartOptions.arms.length; i++) {
                const item = CharactersModular.bodyPartOptions.arms[i];
                $("#arm-select").append($("<option value=\"" + item + "\">" + item + "</option>"));
            }
            setTimeout(function () {
                $("#hair-select").val(newChar.userData.hairStyle);
                $("#hair-color-select").val("#" + newChar.userData.hairColor.toString(16));
                updateSliders();
            }, 100);
        });
        scene.add(people);
        // create geometric objects
        var plane = getPlane(100, 100);
        // add objects to the scene
        // sky = getSky(camera);
        // scene.add(sky);
        scene.add(plane);
        var ambLight = new THREE.HemisphereLight(0xffffff, 0x000200, 1);
        ambLight.position.set(0, 20, 0);
        scene.add(ambLight);
        scene.position.x = -0.5;
        scene.position.y = -1;
        scene.position.z = -0.5;
        update();
        var winResize = new THREEx.WindowResize(main.renderer, camera);
        //@ts-ignore
        winResize.trigger();
        //@ts-ignore
        main.hideCompass();
        $("#spells").hide();
    }
    function getPlane(w, h) {
        var tronGrid = new THREE.Group();
        var intensity = 0.01;
        var rectLight = new THREE.RectAreaLight(0xdd22ff, intensity, w, h);
        rectLight.lookAt(0, 0, 0);
        rectLight.rotation.x = -Math.PI / 2;
        tronGrid.add(rectLight);
        // rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
        // tronGrid.add( rectLightHelper );
        var rectLightMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial({ color: 0xdd22ff, }));
        rectLightMesh.scale.x = rectLight.width;
        rectLightMesh.scale.y = rectLight.height;
        rectLight.position.y = -0.5;
        rectLight.add(rectLightMesh);
        var rectLightGrid = new THREE.Mesh(new THREE.PlaneBufferGeometry(), new THREE.MeshLambertMaterial({ color: 0x110066, transparent: true, }));
        rectLightGrid.receiveShadow = true;
        rectLightGrid.scale.x = rectLight.width;
        rectLightGrid.scale.y = rectLight.height;
        let mat = rectLightGrid.material;
        mat.alphaMap = new THREE.TextureLoader().load("/img/textures/gridBump.png");
        mat.alphaMap.wrapS = THREE.RepeatWrapping;
        mat.alphaMap.wrapT = THREE.RepeatWrapping;
        mat.alphaMap.repeat.set(w, h);
        rectLightGrid.rotation.x = -Math.PI / 2;
        tronGrid.add(rectLightGrid);
        return tronGrid;
    }
    function update() {
        // renderer.render(scene, camera);
        main.renderer.render(main.Scene, camera);
        controls.update();
        time++;
        const mixTime = clock.getDelta();
        objects.forEach(person => {
            if (person.userData.mixer != undefined) {
                person.userData.mixer.update(mixTime);
            }
        });
        setTimeout(function () {
            requestAnimationFrame(update);
        }, 1000 / 40);
    }
    $("#race-select").change(function () {
        newChar.setRace($(this).val());
        updateSliders();
    });
    $("input[name='gender-select']").click(function () {
        var newGender = $("input[name='gender-select']:checked").val();
        newChar.userData.texture = undefined;
        newChar.gender = newGender;
        updateSliders();
    });
    $("#hair-select").change(function () {
        newChar.setHair($(this).val());
    });
    $("#hair-color-select").change(function () {
        newChar.setHair($("#hair-select").val(), $(this).val());
    });
    $("#animation-select").change(function () {
        const clip = THREE.AnimationClip.findByName(newChar.animations, $(this).val());
        newChar.userData.mixer.stopAllAction();
        newChar.userData.mixer.clipAction(clip).play();
    });
    $("#arm-select").change(function () {
        CharactersModular.changePart(newChar, "Arms", $(this).val());
    });
    $("#weight-slider").change(function () {
        updateMorph(this, "Weight");
    });
    $("#caboose-slider").change(function () {
        updateMorph(this, "Caboose");
    });
    $("#chest-slider").change(function () {
        updateMorph(this, "LadyChest");
    });
    $("#waist-slider").change(function () {
        updateMorph(this, "Waist");
    });
    $("#chin-slider").change(function () {
        updateMorph(this, "Chin_Height");
    });
    $("#pants-slider").change(function () {
        updateMorph(this, "Pants");
    });
    $("#headless-slider").change(function () {
        updateMorph(this, "Headless");
    });
    $("#birdhead-slider").change(function () {
        updateMorph(this, "BirdHead");
    });
    function updateMorph(slider, key) {
        let newVal = $(slider).val();
        let skeletonContainer = newChar.getObjectByName("Skeleton");
        skeletonContainer.traverse(function (node0) {
            let node = node0;
            if (node.type == "SkinnedMesh") {
                let mtd = node.morphTargetDictionary;
                let mti = node.morphTargetInfluences;
                if (mtd && mti) {
                    // for (var prop in mtd) {
                    // 	if (Object.prototype.hasOwnProperty.call(mtd, prop)) {
                    // 		console.log(`${node.name}: morphTargetDictionary key: ${prop}`);
                    // 	}
                    // }
                    if (mtd.hasOwnProperty(key)) {
                        // console.log(`${node.name}: ${key} updated. Value: ${newVal}`);
                        mti[mtd[key]] = newVal;
                    }
                }
            }
            ;
        });
    }
    function updateSliders() {
        let node = newChar.getObjectByName("Torso");
        let vals = node.morphTargetInfluences;
        let mtd = node.morphTargetDictionary;
        if (mtd) {
            $("#weight-slider").val(vals[mtd.Weight]);
            $("#caboose-slider").val(vals[mtd.Caboose]);
            $("#chest-slider").val(vals[mtd.LadyChest]);
            $("#waist-slider").val(vals[mtd.Waist]);
            $("#chin-slider").val(vals[mtd.Chin_Height]);
            $("#pants-slider").val(vals[mtd.Pants]);
            $("#headless-slider").val(vals[mtd.Headless]);
            $("#birdhead-slider").val(vals[mtd.BirdHead]);
        }
        // Head
        node = newChar.getObjectByName("Head");
        vals = node.morphTargetInfluences;
        mtd = node.morphTargetDictionary;
        if (mtd) {
            $("#weight-slider").val(vals[mtd.Weight]);
            $("#caboose-slider").val(vals[mtd.Caboose]);
            $("#chest-slider").val(vals[mtd.LadyChest]);
            $("#waist-slider").val(vals[mtd.Waist]);
            $("#chin-slider").val(vals[mtd.Chin_Height]);
            $("#pants-slider").val(vals[mtd.Pants]);
            $("#headless-slider").val(vals[mtd.Headless]);
            $("#birdhead-slider").val(vals[mtd.BirdHead]);
        }
    }
    init();
});
//# sourceMappingURL=modular-charactercreation.js.map