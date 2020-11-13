var camera = {
	positionX: 0,
	positionY: 0,
	positionZ: 0,
	rotationX: 0,
	rotationY: 0,
	rotationZ: 0
};
var threed = false;
const scale = 50;

function createXZPlane(maxX, maxY, maxZ, xPos, yPos, zPos) {
	var plane = document.createElement("div");
	plane.classList.add("horizontalPlane");
	plane.style.width = (maxX * scale) + 'px';
	plane.style.height = (maxZ * scale) + 'px';
	plane.style.transform = 'translate3d(' + (xPos) * scale + 'px, ' + (yPos) * scale + 'px, ' + (zPos) * scale + 'px)';
	plane.innerHTML = '&#160;'
	return plane;
}

function createXYPlane(maxX, maxY, maxZ, xPos, yPos, zPos) {
	var plane = document.createElement("div");
	plane.classList.add("verticalPlane");
	plane.style.width = (maxX * scale) + 'px';
	plane.style.height = (maxY * scale) + 'px';
	plane.style.transform = 'translate3d(' + (xPos) * scale + 'px, ' + ((-maxY / 2) + yPos) * scale + 'px, ' + ((maxY / 2) + zPos) * scale + 'px) rotateX(-90deg)';
	plane.innerHTML = '&#160;'
	return plane;
}

function createYZPlane(maxX, maxY, maxZ, xPos, yPos, zPos) {
	var plane = document.createElement("div");
	plane.classList.add("verticalPlane");
	plane.style.width = (maxZ * scale) + 'px';
	plane.style.height = (maxY * scale) + 'px';
	plane.style.transform = 'rotateX(-90deg) rotateY(90deg) translate3d(' + (((maxY - maxZ) / 2) + yPos) * scale + 'px, -' + ((maxY / 2) + zPos) * scale + 'px, ' + (xPos - (maxZ / 2)) * scale + 'px)';
	plane.innerHTML = '&#160;'
	return plane;
}

function createTerrain(maxX, maxY, maxZ, xPos, yPos, zPos, type) {
	var cube = document.createElement("div");
	cube.classList.add("assembly");
	var side1 = document.createElement("div");
	var side2 = document.createElement("div");
	var side3 = document.createElement("div");
	var side4 = document.createElement("div");
	var top = document.createElement("div");
	var height = 2;
	side1.classList.add("plane", "dirt", "side1", "verticalPlane");
	side1.style.width = (maxY * scale) + 'px';
	side1.style.height = (height * scale) + 'px';
	side2.classList.add("plane", "dirt", "side2", "verticalPlane");
	side2.style.width = (maxY * scale) + 'px';
	side2.style.height = (height * scale) + 'px';
	side3.classList.add("plane", "dirt", "side3", "verticalPlane");
	side3.style.width = (maxX * scale) + 'px';
	side3.style.height = (height * scale) + 'px';
	side4.classList.add("plane", "dirt", "side4", "verticalPlane");
	side4.style.width = (maxX * scale) + 'px';
	side4.style.height = (height * scale) + 'px';
	top.classList.add("plane", type, "horizontalPlane");
	top.style.width = (maxX * scale) + 'px';
	top.style.height = (maxY * scale) + 'px';

	// top.style.transform = 'translate3d(0px, 0px, 0px)';

	side1.style.transform = 'rotateX(-90deg) rotateY(-90deg) translate3d(' + ((maxY - height) / 2) * scale + 'px, ' + (height / 2) * scale + 'px, ' + (maxY / 2) * scale + 'px)';
	side2.style.transform = 'rotateX(-90deg) rotateY(90deg) translate3d(' + ((maxY - height) / 2) * -scale + 'px, ' + (height / 2) * scale + 'px, ' + (maxX - maxY / 2) * scale + 'px)';
	side3.style.transform = 'rotateX(-90deg) translate3d(0px, ' + ((height / 2) * scale) + 'px, ' + (maxY - height / 2) * scale + 'px)';
	side4.style.transform = 'rotateX(90deg) translate3d(0px, ' + ((height / 2) * -scale) + 'px, ' + (height / 2) * scale + 'px)';
	cube.appendChild(top);
	cube.appendChild(side1);
	cube.appendChild(side2);
	cube.appendChild(side3);
	cube.appendChild(side4);
	cube.style.transform = 'translate3d(' + (xPos) * scale + 'px, ' + (yPos) * scale + 'px, ' + (zPos) * scale + 'px)';
	cube.classList.add('Terrain');
	cube.setAttribute('positionX', xPos);
	cube.setAttribute('positionY', yPos);
	cube.setAttribute('positionZ', zPos);
	return cube;
}

function createCuboid(maxX, maxY, maxZ, xPos, yPos, zPos) {
	var cube = document.createElement("div");
	cube.classList.add("assembly");
	var side1 = document.createElement("div");
	var side2 = document.createElement("div");
	var side3 = document.createElement("div");
	var side4 = document.createElement("div");
	var top = document.createElement("div");
	var flat = document.createElement("div");
	// var bottom = document.createElement("div");
	side1.classList.add("plane");
	side1.classList.add("verticalPlane");
	side1.classList.add("eastFace");
	side1.style.width = (maxY * scale) + 'px';
	side1.style.height = (maxZ * scale) + 'px';
	side2.classList.add("plane");
	side2.classList.add("verticalPlane");
	side2.classList.add("westFace");
	side2.style.width = (maxY * scale) + 'px';
	side2.style.height = (maxZ * scale) + 'px';
	side3.classList.add("plane");
	side3.classList.add("verticalPlane");
	side3.classList.add("northFace");
	side3.style.width = (maxX * scale) + 'px';
	side3.style.height = (maxZ * scale) + 'px';
	side4.classList.add("plane");
	side4.classList.add("verticalPlane");
	side4.classList.add("southFace");
	side4.style.width = (maxX * scale) + 'px';
	side4.style.height = (maxZ * scale) + 'px';
	top.classList.add("plane");
	top.style.width = (maxX * scale) + 'px';
	top.style.height = (maxY * scale) + 'px';
	flat.classList.add("flat");
	flat.style.backgroundColor = 'red';
	flat.style.width = (maxX * scale) + 'px';
	flat.style.height = (maxY * scale) + 'px';


	var door = document.createElement("div");
	door.classList.add("door");
	side3.appendChild(door);

	// bottom.classList.add("plane");
	// bottom.style.width = (maxX * scale) + 'px';
	// bottom.style.height = (maxY * scale) + 'px';


	top.style.transform = 'translate3d(' + (maxX / 2) * -scale + 'px, ' + (maxY / 2) * -scale + 'px, ' + maxZ * scale + 'px)';
	top.classList.add("castleWall");
	flat.style.transform = 'translate(' + (maxX / 2) * -scale + 'px, ' + (maxY / 2) * -scale + 'px)';
	side1.classList.add("castleWall");
	side2.classList.add("castleWall");
	side3.classList.add("castleWall");
	side4.classList.add("castleWall");

	// bottom.style.transform = 'rotateX(180deg) translate3d(' + ((maxX / 2) * scale) + 'px, 0px, 0px)';

	side1.style.transform = 'rotateX(-90deg) rotateY(-90deg) translate3d(' + (maxZ / 2) * -scale + 'px, ' + (maxZ / 2) * -scale + 'px, ' + ((maxX + maxY) / 2) * scale + 'px)';
	side2.style.transform = 'rotateX(-90deg) rotateY(90deg) translate3d(' + (maxZ / 2) * scale + 'px, ' + (maxZ / 2) * -scale + 'px, ' + ((maxX - maxY) / 2) * scale + 'px)';
	side3.style.transform = 'rotateX(-90deg) translate3d(' + ((maxX / 2) * -scale) + 'px, ' + (maxZ / 2) * -scale + 'px, ' + ((maxY - maxZ) / 2) * scale + 'px)';
	side4.style.transform = 'rotateX(90deg) translate3d(' + ((maxX / 2) * -scale) + 'px, ' + (maxZ / 2) * scale + 'px, ' + ((maxY + maxZ) / 2) * scale + 'px)';

	cube.appendChild(top);
	cube.appendChild(flat);
	// cube.appendChild(bottom);
	cube.appendChild(side1);
	cube.appendChild(side2);
	cube.appendChild(side3);
	cube.appendChild(side4);
	cube.style.transform = 'translate3d(' + (xPos + (maxX / 2)) * scale + 'px, ' + (yPos + (maxY / 2)) * scale + 'px, ' + (zPos) * scale + 'px)';
	cube.classList.add('Cuboid');
	cube.setAttribute('positionX', xPos + (maxX / 2));
	cube.setAttribute('positionY', yPos + (maxY / 2));
	cube.setAttribute('positionZ', zPos);
	return cube;
}

function createSkybox(maxX, maxY, maxZ, xPos, yPos, zPos) {
	var cube = document.createElement("div");
	cube.id = "Skybox";
	var side1 = document.createElement("div");
	var side2 = document.createElement("div");
	var side3 = document.createElement("div");
	var side4 = document.createElement("div");
	var top = document.createElement("div");
	var bottom = document.createElement("div");
	var flat = document.createElement("div");
	var width = Math.max(maxX, maxZ);
	var height = maxY;
	side1.classList.add("plane");
	side1.classList.add("sky");
	side1.classList.add("eastFace");
	side1.style.width = (width * scale * 2) + 'px';
	side1.style.height = (height * scale * 2) + 'px';
	side2.classList.add("plane");
	side2.classList.add("sky");
	side2.classList.add("westFace");
	side2.style.width = (width * scale * 2) + 'px';
	side2.style.height = (height * scale * 2) + 'px';
	side3.classList.add("plane");
	side3.classList.add("sky");
	side3.classList.add("northFace");
	side3.style.width = (width * scale * 2) + 'px';
	side3.style.height = (height * scale * 2) + 'px';
	side4.classList.add("plane");
	side4.classList.add("sky");
	side4.classList.add("southFace");
	side4.style.width = (width * scale * 2) + 'px';
	side4.style.height = (height * scale * 2) + 'px';
	top.classList.add("plane");
	top.classList.add("sky");
	top.style.width = (width * scale * 2) + 'px';
	top.style.height = (width * scale * 2) + 'px';
	bottom.classList.add("plane");
	bottom.classList.add("ocean");
	bottom.style.width = (width * scale * 2) + 'px';
	bottom.style.height = (width * scale * 2) + 'px';
	flat.classList.add("flat");
	flat.classList.add("ocean");
	flat.style.width = (width * scale * 2) + 'px';
	flat.style.height = (width * scale * 2) + 'px';


	top.style.transform = 'translate3d(' + ((width + maxX / 2) * -scale) + 'px, ' + ((width * 2 - maxZ) * -scale) + 'px, ' + (maxY * 2 - 2) * scale + 'px) rotateX(180deg)';
	bottom.style.transform = 'translate3d(' + ((width + maxX / 2) * -scale) + 'px, ' + ((width * 2 - maxZ) * -scale) + 'px, ' + 2 * -scale + 'px)';
	flat.style.transform = 'translate(' + ((width + maxX / 2) * -scale) + 'px, ' + ((width * 2 - maxZ) * -scale) + 'px)';

	side1.style.transform = 'rotateX(-90deg) rotateY(-90deg) translate3d(' + (width - maxZ / 2) * -scale + 'px, ' + (maxY - 2) * -scale + 'px, ' + (width - maxX / 2) * scale + 'px)';
	side2.style.transform = 'rotateX(-90deg) rotateY(90deg) translate3d(' + (width - maxZ / 2) * scale + 'px, ' + (maxY - 2) * -scale + 'px, ' + (width * 2 + maxX / 2) * -scale + 'px)';
	side3.style.transform = 'rotateX(-90deg) translate3d(' + ((width + maxX / 2) * -scale) + 'px, ' + (maxY - 2) * -scale + 'px, ' + ((width * 2 - maxZ / 2) * -scale) + 'px)';
	side4.style.transform = 'rotateX(90deg) translate3d(' + ((width + maxX / 2) * -scale) + 'px, ' + (maxY - 2) * scale + 'px, ' + ((maxZ / 2) * -scale) + 'px)';

	cube.appendChild(top);
	cube.appendChild(bottom);
	cube.appendChild(flat);
	cube.appendChild(side1);
	cube.appendChild(side2);
	cube.appendChild(side3);
	cube.appendChild(side4);
	cube.style.left = (xPos + maxX) * scale + 'px';
	cube.style.top = (zPos + maxZ) * scale + 'px';
	cube.style.transform = 'translate3d(' + (xPos + maxX) * scale + 'px, ' + (zPos + maxZ) * scale + 'px, ' + (yPos) * scale + 'px)';
	cube.classList.add('Cuboid');
	cube.setAttribute('positionX', xPos + maxX);
	cube.setAttribute('positionY', zPos + maxZ);
	cube.setAttribute('positionZ', yPos);
	return cube;
}
var cursorPos = {
	x: -1,
	y: -1
};
var frameLoop;
var pause = false;
var windowActive = true;
$(document).ready(function () {
	// Initialization

	$("map-terrain").each(function () {
		var type = this.getAttribute("type")
		var size = this.getAttribute("size").split(",");
		var maxX = parseInt(size[0]);
		var maxY = parseInt(size[1]);
		var maxZ = parseInt(size[2]);

		var position = this.getAttribute("position").replace("(", "").replace(")", "").split(",");
		var xPos = parseInt(position[0]);
		var yPos = parseInt(position[1]);
		var zPos = parseInt(position[2]);
		this.appendChild(createTerrain(maxX, maxY, maxZ, xPos, yPos, zPos, type));
	})

	$("map-building").each(function () {
		var size = this.getAttribute("size").split(",");
		var maxX = parseFloat(size[0]);
		var maxY = parseFloat(size[1]);
		var maxZ = parseFloat(size[2]);

		var position = this.getAttribute("position").replace("(", "").replace(")", "").split(",");
		var xPos = parseFloat(position[0]);
		var yPos = parseFloat(position[1]);
		var zPos = parseFloat(position[2]);
		this.appendChild(createCuboid(maxX, maxY, maxZ, xPos, yPos, zPos));
	})
	$("map-person").each(function () {
		var img = document.createElement('img');
		img.alt = "Person";
		img.src = "res/images/male_human.png";
		img.style.width = "100%";
		img.style.height = "100%";
		img.classList.add('sprite');

		this.appendChild(img);

		img.addEventListener('click', () => {
			alert("Hullo thur.");
		});
	})
	$("map-player").each(function () {
		var img = document.createElement('img');
		img.alt = "Player";
		img.src = "res/images/male_human.png";
		img.style.width = "100%";
		img.style.height = "100%";
		img.classList.add('sprite');

		this.appendChild(img);

		img.addEventListener('click', () => {
			alert("I'm a people.");
		});
	})



	// End Initialization

	frameLoop = setInterval(requestAnimationFrame, 0040);
	$(window).focus(function () {
		windowActive = true;
	})
	$(window).blur(function () {
		windowActive = false;
	})
	$(document).keydown(function (e) {
		const speed = 15;
		const radZ = parseFloat(camera.rotationZ) * (Math.PI / 180);
		var code = e.keyCode || e.which;
		if (code == 27) {
			pause = !pause;
			$("#pause").toggle();
		}
		if (pause == false && windowActive == true) {
			if (threed) {
				if (code == 37 || code == 65) {
					//left arrow
					camera.positionX = parseInt(camera.positionX) + (speed * Math.cos(radZ));
					camera.positionY = parseInt(camera.positionY) - (speed * Math.sin(radZ));
				} else if (code == 39 || code == 68) {
					//right arrow
					camera.positionX = parseInt(camera.positionX) - (speed * Math.cos(radZ));
					camera.positionY = parseInt(camera.positionY) + (speed * Math.sin(radZ));
				}
				if (code == 38 || code == 87) {
					//top arrow
					camera.positionX = parseInt(camera.positionX) + (speed * Math.sin(radZ));
					camera.positionY = parseInt(camera.positionY) + (speed * Math.cos(radZ));
				} else if (code == 40 || code == 83) {
					//bottom arrow
					camera.positionX = parseInt(camera.positionX) - (speed * Math.sin(radZ));
					camera.positionY = parseInt(camera.positionY) - (speed * Math.cos(radZ));
				} else if (code == 187) {
					camera.positionZ = parseInt(camera.positionZ) - 1;
				} else if (code == 189) {
					camera.positionZ = parseInt(camera.positionZ) + 1;
				}
			} else {
				if (code == 37 || code == 65) {
					//left arrow
					camera.positionX = parseInt(camera.positionX) + speed;
				} else if (code == 39 || code == 68) {
					//right arrow
					camera.positionX = parseInt(camera.positionX) - speed;
				}
				if (code == 38 || code == 87) {
					//top arrow
					camera.positionY = parseInt(camera.positionY) + speed;
				} else if (code == 40 || code == 83) {
					//bottom arrow
					camera.positionY = parseInt(camera.positionY) - speed;
				} else if (code == 187) {
					camera.positionZ = parseInt(camera.positionZ) + 1;
				} else if (code == 189) {
					camera.positionZ = parseInt(camera.positionZ) - 1;
				}
			}
		}
	})
	$(".menuButton").click(function () {
		$(".slideMenu").toggle(100, 'linear');
	})
	$(document).on('click', "#setView", function () {
		$("#setView").toggleClass("depressed");
		$("#Camera").toggleClass("twod");
		threed = !threed;
		if (threed) {
			$('.Cuboid').each(function () {
				var translateX = Math.round(parseFloat($(this).attr('positionX')) * scale);
				var translateY = Math.round(parseFloat($(this).attr('positionY')) * scale);
				var translateZ = Math.round(parseFloat($(this).attr('positionZ')) * scale);
				$(this).css('transform', 'translate3d(' + translateX + 'px, ' + translateY + 'px, ' + translateZ + 'px)');
			});
			$(".Cuboid>*").show();
			$(".Cuboid>.flat").hide();
		} else {
			$('.Cuboid').each(function () {
				var translateX = Math.round(parseFloat($(this).attr('positionX')) * scale);
				var translateY = Math.round(parseFloat($(this).attr('positionY')) * scale);
				$(this).css('transform', 'translate(' + translateX + 'px, ' + translateY + 'px)');
			});
			$(".Cuboid>*").hide();
			$(".Cuboid>.flat").show();
			camera.rotationX = 0;
			camera.rotationY = 0;
			camera.rotationZ = 0;
		}
	})
	$(document).mousemove(function (e) {
		cursorPos.x = (e.clientX / window.innerWidth) * 100;
		cursorPos.y = (e.clientY / window.innerHeight) * 100;
	})
})

function drawCamera() {
	var rotateX = camera.rotationX;
	var rotateY = camera.rotationY;
	var rotateZ = camera.rotationZ;
	if (parseFloat(camera.positionZ) > 2) camera.positionZ = 2;

	const radZ = rotateZ * (Math.PI / 180);
	if (threed) {
		if (rotateX < 0) {
			rotateX = 0;
			camera.rotationX = 0;
		}
		if (rotateX > 95) {
			rotateX = 95;
			camera.rotationX = 95;
		}
		camera.rotationY = rotateY;
		$("#Viewport").css('transform', 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotateZ(' + rotateZ + 'deg) translate3d(' + camera.positionX + 'px, ' + camera.positionY + 'px, ' + camera.positionZ * scale + 'px)');
		$("#Camera").css('transform', 'translate3d(0px, 0px, 0px)');
		$(".sprite").each(function () {
			var xTranslation = (-parseInt($(this).css("width")) / 2) + 'px, ';
			var yTranslation = (-parseInt($(this).css("height")) / 2) + 'px, ';
			var zTranslation = (parseInt($(this).css("height")) / 2) + 'px';
			$(this).css('transform', 'translate3d(' + xTranslation + yTranslation + zTranslation + ') rotateZ(' + -rotateZ + 'deg) rotateY(0deg) rotateX(' + -(rotateX) + 'deg)');
		})

		$("#Skybox").css('transform', 'translate3d(' + -camera.positionX + 'px, ' + -camera.positionY + 'px, 0px)');
	} else {
		if (rotateX < 0) {
			rotateX = 0;
			camera.rotationX = 0;
		}
		if (rotateX > 95) {
			rotateX = 95;
			camera.rotationX = 95;
		}
		camera.rotationY = rotateY;
		$("#Viewport").css('transform', 'rotate(0deg) translate(' + camera.positionX + 'px, ' + camera.positionY + 'px) scale(' + Math.abs(1 - (camera.positionZ * 0.1)) + ')');
		// $("#Viewport").css('transform', 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotateZ(' + rotateZ + 'deg) translate3d(' + camera.positionX + 'px, ' + camera.positionY + 'px, ' + camera.positionZ + 'px)');
		$("#Camera").css('transform', 'translate(0px, 0px)');
		$(".sprite").each(function () {
			var xTranslation = (-parseInt($(this).css("width")) / 2) + 'px';
			var yTranslation = (-parseInt($(this).css("height")) / 2) + 'px';
			$(this).css('transform', 'translateX(' + xTranslation + ') translateY(' + yTranslation + ')');
		})
		$(".name").text(camera.positionZ + ' Z');

		$("#Skybox").css('transform', 'translate3d(' + -camera.positionX + 'px, ' + -camera.positionY + 'px, 0px)');
	}
}

function requestAnimationFrame() {
	if (pause == false && windowActive == true) {
		var rotX = parseFloat(camera.rotationX);
		var rotY = parseFloat(camera.rotationY);
		var rotZ = parseFloat(camera.rotationZ);
		var refresh = false;

		if (threed) {
			if (cursorPos.x < 20) {
				camera.rotationZ = rotZ + ((20 - cursorPos.x) * 0.1);
				refresh = true;
			} else if (cursorPos.x > 80) {
				camera.rotationZ = rotZ - ((cursorPos.x - 80) * 0.1);
				refresh = true;
			}

			if (cursorPos.y < 20) {
				camera.rotationX = rotX + ((20 - cursorPos.y) * 0.1);
				refresh = true;
			} else if (cursorPos.y > 80) {
				camera.rotationX = rotX - ((cursorPos.y - 80) * 0.1);
				refresh = true;
			}
		} else {
			if (cursorPos.x < 20) {
				// camera.positionX += ((20 - cursorPos.x) * 0.02 * scale);
				camera.positionX += ((20 - cursorPos.x) * (1 - Math.round(parseInt(camera.positionZ) / 8)));
				refresh = true;
			} else if (cursorPos.x > 80) {
				// camera.positionX -= ((cursorPos.x - 80) * 0.02 * scale);
				camera.positionX -= ((cursorPos.x - 80) * (1 - Math.round(parseInt(camera.positionZ) / 8)));
				refresh = true;
			}

			if (cursorPos.y < 20) {
				// camera.positionY += ((20 - cursorPos.y) * 0.02 * scale);
				camera.positionY += ((20 - cursorPos.y) * (1 - Math.round(parseInt(camera.positionZ) / 8)));
				refresh = true;
			} else if (cursorPos.y > 80) {
				// camera.positionY -= ((cursorPos.y - 80) * 0.02 * scale);
				camera.positionY -= ((cursorPos.y - 80) * (1 - Math.round(parseInt(camera.positionZ) / 8)));
				refresh = true;
			}
		}
		drawCamera();
	}
}

function npc(name, level, gender, loc) {
	this.make = make;
	this.level = level;
	this.gender = gender;
	this.location = loc;
}

function planarLocation(x, y, z, d) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.d = d;
	this.plane = d;
}

function roll(max) {
	Math.floor(Math.random() * parseInt(max));
}

class mapPerson extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
	}
}
// Define the new element
customElements.define('map-person', mapPerson);


class mapPlayer extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
	}
}
// Define the new element
customElements.define('map-player', mapPlayer);

class mapBuilding extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
	}
}
// Define the new element
customElements.define('map-building', mapBuilding);

class mapTerrain extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
	}
}
// Define the new element
customElements.define('map-terrain', mapTerrain);




var get = function (el) {
	if (typeof el === 'string') {
		return document.querySelector(el);
	}
	return el;
};
var draggable = function (parentEl, dragEl) {
	var parent = $('#World');
	var target = $(dragEl);
	var drag = false;
	offsetX = 0;
	offsetY = 0;
	var mousemoveTemp = null;

	if (target) {
		var mouseX = function (e) {
			if (e.pageX) {
				return e.pageX;
			}
			if (e.clientX) {
				return e.clientX + (document.documentElement.scrollLeft ?
					document.documentElement.scrollLeft :
					document.body.scrollLeft);
			}
			return null;
		};

		var mouseY = function (e) {
			if (e.pageY) {
				return e.pageY;
			}
			if (e.clientY) {
				return e.clientY + (document.documentElement.scrollTop ?
					document.documentElement.scrollTop :
					document.body.scrollTop);
			}
			return null;
		};

		var move = function (x, y) {
			var xPos = parseInt(target.style.left) || 0;
			var yPos = parseInt(target.style.top) || 0;

			target.style.left = (xPos + x) + 'px';
			target.style.top = (yPos + y) + 'px';
		};

		var mouseMoveHandler = function (e) {
			e = e || window.event;
			if (!drag) {
				return true
			};

			var x = mouseX(e);
			var y = mouseY(e);
			if (x != offsetX || y != offsetY) {
				move(x - offsetX, y - offsetY);
				offsetX = x;
				offsetY = y;
			}
			return false;
		};

		var start_drag = function (e) {
			e = e || window.event;

			offsetX = mouseX(e);
			offsetY = mouseY(e);
			drag = true; // basically we're using this to detect dragging

			// save any previous mousemove event handler:
			if (target.onmousemove) {
				mousemoveTemp = target.onmousemove;
			}
			target.onmousemove = mouseMoveHandler;
			return false;
		};

		var stop_drag = function () {
			drag = false;

			// restore previous mousemove event handler if necessary:
			if (mousemoveTemp) {
				target.onmousemove = mousemoveTemp;
				mousemoveTemp = null;
			}
			return false;
		};

		target.onmousedown = start_drag;
		target.onmouseup = stop_drag;
	}
}

draggable('#World', 'map-player');