import { Engine } from '../../../sf/res/js/engine.js';
import * as THREE from '../../../node_modules/three/src/Three.js';
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { CharactersModular } from '../../../sf/res/js/characters-modular.js';
import { THREEx } from '../../../sf/res/js/threex.js';
var camera, controls, renderer, scene, time = 0, newChar;
Engine.Initialize("Viewer");
var main = Engine.main;
var clock = new THREE.Clock();
var objects = [];
function init() {
    // main.Scene = new THREE.Scene();
    scene = main.Scene;
    main.Sky.hemiLight.intensity = 0;
    main.Sky.sun.light.intensity = 0;
    renderer = main.renderer;
    main.Scene.background = new THREE.Color(0x11aaff);
    // main.Scene.add(main.Light);
    var container = document.getElementById('container');
    if (container) {
        camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    }
    getMenu("#container");
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
        // people.add(newChar);
        main.MainStage.Entities.AddMesh(newChar);
        // people.add(getPC("Jasper", -1, 0, 0));
        people.traverse(function (node) {
            objects.push(node);
        });
        for (let i = 0; i < newChar.animations.length; i++) {
            const anim = newChar.animations[i];
            $("#Animation-Select").append($("<option value=\"" + anim.name + "\">" + anim.name + "</option>"));
        }
        CharactersModular.hairOptions.sort();
        for (let i = 0; i < CharactersModular.hairOptions.length; i++) {
            const hairs = CharactersModular.hairOptions[i];
            $("#Hair-Style-Select").append($("<option value=\"" + hairs + "\">" + hairs + "</option>"));
        }
        for (let i = 0; i < CharactersModular.bodyPartOptions.arms.length; i++) {
            const item = CharactersModular.bodyPartOptions.arms[i];
            $("#Arms-Select").append($("<option value=\"" + item + "\">" + item + "</option>"));
        }
        for (let i = 0; i < CharactersModular.bodyPartOptions.head.length; i++) {
            const item = CharactersModular.bodyPartOptions.head[i];
            $("#Head-Select").append($("<option value=\"" + item + "\">" + item + "</option>"));
        }
        setTimeout(function () {
            $("#Hair-Style-Select").val(newChar.userData.hairStyle);
            $("#Hair-Color-Select").val("#" + newChar.userData.hairColor.toString(16));
            updateSliders();
        }, 100);
    });
    scene.add(people);
    // create geometric objects
    var plane = getPlane(100, 100, main);
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
    winResize.trigger();
    main.hideCompass();
    $("#spells").hide();
}
function getMenu(canvasElementID = "#container") {
    let menuElement = $(`
		<div id="character-creation-menu" style="position:absolute; width:30%; max-height:100vh; border-left:2px solid black; background:#020314; z-index:80; top:0; right:0; overflow:auto;">
		</div>
	`);
    let speciesSection = createSection("Species");
    let animationSection = createSection("Animation");
    let genderSection = createSection("Gender");
    let hairSection = createSection("Hair");
    let bodyPartsSection = createSection("Parts");
    let bodySection = createSection("Body");
    let speciesSelect = createSelect("Species", "Species");
    speciesSelect.find("select").append($(`
			<option value="aarakocra">Aarakocra</option>
			<option value="aasimar">Aasimar</option>
			<option value="dwarf">Dwarf</option>
			<option value="elf">Elf</option>
			<option value="halfling">Halfing</option>
			<option value="halforc">Half-Orc</option>
			<option value="human" selected="selected">Human</option>
			<option value="grung">Grung</option>
			<option value="tiefling">Tiefling</option>
		`));
    speciesSection.append(speciesSelect);
    animationSection.append(createSelect("Animation", "Animation"));
    genderSection.append($(`
		<div class="option">
			Female: <input type="radio" name="Gender-Select" value="f" />
			Male: <input type="radio" name="Gender-Select" value="m" checked="checked" />
		</div>
	`));
    hairSection.append(createSelect("Hair-Style", "Style"));
    hairSection.append($(`
		<div>
			<label for="Hair-Color-Select">Color:</label>
			<input type="color" id="Hair-Color-Select" />
		</div>
	`));
    let partSelects = [];
    partSelects.push(createSelect("Head", "Head"));
    partSelects.push(createSelect("Arms", "Arms"));
    partSelects.forEach(stuff => {
        stuff.find("select").addClass("part-select");
        bodyPartsSection.append(stuff);
    });
    bodySection.append(createSlider("Weight"));
    bodySection.append(createSlider("Caboose"));
    bodySection.append(createSlider("LadyChest", "Chest", 0, 2, 0.1));
    bodySection.append(createSlider("Waist", "Waist", 0, 2, 0.1));
    bodySection.append(createSlider("Chin_Height", "Chin", 0, 2, 0.1));
    bodySection.append(createSlider("Pants", "Pants", 0, 2, 0.1));
    bodySection.append(createSlider("Headless", "Headless", 0, 2, 0.1));
    bodySection.append(createSlider("BirdHead", "BirdHead", 0, 2, 0.1));
    menuElement.append(speciesSection);
    menuElement.append(animationSection);
    menuElement.append(genderSection);
    menuElement.append(hairSection);
    menuElement.append(bodyPartsSection);
    menuElement.append(bodySection);
    $(`${canvasElementID}`).append(menuElement);
}
;
function getPlane(w, h, main) {
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
    main.Collidable.push(rectLightGrid);
    tronGrid.add(rectLightGrid);
    return tronGrid;
}
function update() {
    // main.update();
    main.renderer.render(main.Scene, camera);
    controls.update();
    time++;
    let mixTime = clock.getDelta();
    main.MainStage.Entities.members.forEach(person => {
        if (person._Model.userData.mixer != undefined) {
            person._Model.userData.mixer.update(mixTime);
        }
    });
    setTimeout(function () {
        requestAnimationFrame(update);
    }, 1000 / 40);
}
function createSection(name) {
    return $(`<div class="section" id="${name}-Section">
			<h1>${name}:</h1>
		</div>`);
}
function createSlider(id, name, min = 0, max = 3, step = 0.1) {
    if (!name) {
        name = id;
    }
    return $(`<div>
			<label for="${id}-slider">${name}:</label>
			<input type="range" min="${min}" max="${max}" step="${step}" class="morph-slider" id="${id}-Slider" />
		</div>`);
}
function createSelect(id, name) {
    if (name) {
        return $(`
			<div>
				<label for="${id}-Select">${name}:</label>
				<select id="${id}-Select"></select>
			</div>
		`);
    }
    else {
        return $(`
			<select id="${id}-Select"></select>
		`);
    }
}
function updateMorph(slider, key) {
    let newVal = $(slider).val();
    let skeletonContainer = newChar.getObjectByName("Skeleton");
    skeletonContainer.traverse(function (node0) {
        let node = node0;
        if (node.type == "SkinnedMesh") {
            let mtd = node.morphTargetDictionary;
            let mti = node.morphTargetInfluences;
            if (mtd && mti) {
                if (mtd.hasOwnProperty(key)) {
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
        for (var prop in mtd) {
            if (Object.prototype.hasOwnProperty.call(mtd, prop)) {
                let slider = $(`#${prop}-Slider`);
                if (slider.length > 0) {
                    slider.val(vals[mtd[prop]]);
                }
            }
        }
    }
    // Head
    node = newChar.getObjectByName("Head");
    if (node) {
        vals = node.morphTargetInfluences;
        mtd = node.morphTargetDictionary;
        if (mtd) {
            for (var prop in mtd) {
                if (Object.prototype.hasOwnProperty.call(mtd, prop)) {
                    let slider = $(`#${prop}-Slider`);
                    if (slider.length > 0) {
                        slider.val(vals[mtd[prop]]);
                    }
                }
            }
        }
    }
}
$(document).ready(function () {
    $(document.body).on("change", "#Species-Select", function () {
        newChar.setRace($(this).val());
        updateSliders();
    });
    $(document.body).on("change", "input[name='Gender-Select']", function () {
        var newGender = $("input[name='Gender-Select']:checked").val();
        newChar.userData.texture = undefined;
        newChar.gender = newGender;
        updateSliders();
    });
    $(document.body).on("change", "#Hair-Style-Select", function () {
        newChar.setHair($(this).val());
    });
    $(document.body).on("change", "#Hair-Color-Select", function () {
        newChar.setHair($("#Hair-Style-Select").val(), $(this).val());
    });
    $(document.body).on("change", "#Animation-Select", function () {
        const clip = THREE.AnimationClip.findByName(newChar.animations, $(this).val());
        newChar.userData.mixer.stopAllAction();
        newChar.userData.mixer.clipAction(clip).play();
    });
    $(document.body).on("change", ".part-select", function () {
        let id = $(this).attr("id");
        if (id) {
            id = id.substring(0, id.lastIndexOf("-Select"));
            CharactersModular.changePart(newChar, id, $(this).val());
        }
    });
    $(document.body).on("change", ".morph-slider", function () {
        let id = $(this).attr("id");
        if (id) {
            id = id.substring(0, id.lastIndexOf("-Slider"));
            updateMorph(this, id);
        }
    });
    init();
});
//# sourceMappingURL=modular-charactercreation.js.map