function rollDie(size, modifier, advantage) {
	size = size || 20;
	modifier = modifier || 0;
	advantage = advantage || 0;
	var rolledResult = Math.floor((Math.random() * size)) + 1;
	for (let index = 0; index < advantage; index++) {
		const newRoll = Math.floor((Math.random() * size)) + 1;;
		rolledResult = Math.max(rolledResult, newRoll);
	}
	rolledResult += modifier;
	return rolledResult;
}
function chance(percent) {
	percent = percent || 50;
	var rolledResult = false;
	if (Math.floor((Math.random() * 100)) < percent) {
		rolledResult = true;
	}
	return rolledResult;
}
function arrayAppend(array, item) {
	if (array !== undefined && array !== null) {
		if (array.constructor === Array) {
			array.push(item);
		}
		else
		{
			array = [array, item];
		}
		return array;
	} else {
		return [item];
	}
}

Array.prototype.append = function (item) {
	return arrayAppend(this, item);
};
Array.prototype.move = function (from, to) {
	this.splice(to, 0, this.splice(from, 1)[0]);
};

function saveJSON(json, fileName) {
	var cstring=JSON.stringify(json);
	var charblob = new Blob([cstring], {type: "application/json"});
	var url = URL.createObjectURL(charblob);

	var a = document.createElement('a');
	a.download = fileName+".json";
	a.href = url;
	a.type = "file";
	$("body").append($(a));
	// $(a).click();
	a.click();
	window.URL.revokeObjectURL(url);

	// $(a).remove();
}
function getHUD() {
	var hud = $("<div id=\"hud\">HUD</div>")
	return hud;
}

function speak(speaker, speech, callback) {
	if (speaker.constructor === Array) {

		var current_line = speech || 0;
		if (current_line < speaker.length) {
			var current_step = speaker[current_line];
			if (current_step.m !== undefined ) {
				current_line +=1;
				var dialog;
				if (current_line == speaker.length) {
					dialog = $("<div class=\"speech\"><h1>" + current_step.s + "</h1\><p>&ldquo;" + current_step.m + "&rdquo;</p>" + "<div class=\"close\" onclick=\"speechBoxClose(this)\">&#10003;</div></div>");
				} else {
					dialog = $("<div class=\"speech\"><h1>" + current_step.s + "</h1\><p>&ldquo;" + current_step.m + "&rdquo;</p>" + "<div class=\"close\" >&#10003;</div></div>");
				}

				$(document.body).append(dialog);
				$(document).on("keydown", {a1: speaker, a2: current_step.next, a3: current_line, a4: callback}, speechHandler);
			} else if (undefined !== current_step.question) {
				var dialog = $("<div class=\"speech\"><h1>" + current_step.s + "</h1\><p>&ldquo;" + current_step.question + "&rdquo;</p></div>");

				// current_step.answers.forEach(element => {
				// 	var button = $("<button>" + element.m + "</button>");
				// 	if (element.next == "exit") {
				// 		button.click(function(ev){
				// 			ev.preventDefault();
				// 			dialog.remove();
				// 		});
				// 	} else {
				// 		button.click(function(ev){
				// 			ev.preventDefault();
				// 			dialog.remove();
				// 			speak(speaker, find_label(speaker, element.next));
				// 		});
				// 	}
				// 	$(dialog).append(button);
				// });

				for (let i = 0; i < current_step.answers.length; i++) {
					const element = current_step.answers[i];
					var button = $("<button>" + element.m + "</button>");
					button.attr("index", i);
					button.attr("next", element.next);
					if (element.next == "exit") {
						button.click(function(ev){
							ev.preventDefault();
							dialog.remove();
						});
					} else {
						button.click(function(ev){
							ev.preventDefault();
							dialog.remove();
							speak(speaker, find_label(speaker, element.next));
						});
					}
					$(dialog).append(button);
				}
				$(dialog).find("button").first().addClass("selected");
				$(document.body).append(dialog);
				$(document).on("keydown", {a1: speaker, a2: current_step.next, a3: current_line, a4: callback}, speechHandler);
			} else {
				current_line += 1;
				speak(speaker, current_line, callback);
			}
		}
		else {
			if (typeof callback === "function") callback();
		}
	}
	else {
		var dialog = $("<div class=\"speech\"><h1>" + speaker + "</h1\><p>&ldquo;" + speech + "&rdquo;</p>" + "<div class=\"close\" onclick=\"speechBoxClose(this)\">&#10003;</div></div>");
		$(document.body).append(dialog);
	}
}

function speechHandler(e) {
	switch (e.keyCode) {
		case 13: // enter
			var next;
			if ($('.speech button.selected').length > 0) {
				next = $('.speech button.selected').attr("next");
			} else {
				next = e.data.a2
			}
			$(document).off("keydown", speechHandler);

			$(".speech").remove();
			if (next !== undefined && next !== "exit" && next !== "") {
				speak(e.data.a1, find_label(e.data.a1, next), e.data.a4);
			} else if (next !== "exit") {
				speak(e.data.a1, e.data.a3, e.data.a4);
			} else {
				console.log("Exit!");
				if(typeof e.data.a4 === "function") {
					e.data.a4();
				} else {
					console.log("callback() isn't registering as a function.");
				}
			}
			break;
		case 38: // up
		case 87: // w
			var index = parseInt($('.speech button.selected').attr("index"));
            if(index > 0) {
                $('.speech button.selected').removeClass('selected');
                $('.speech button[index=' + (index - 1) + ']').addClass('selected');
            }
			break;
		case 40: // down
		case 83: // s
			var selected_item = $('.speech .selected');
            if (typeof selected_item.next()[0] !== 'undefined') {
                selected_item.next().addClass('selected');
                selected_item.removeClass('selected');
            }
			break;
		default:
			break;
	}
}


function find_label(story, label) {
	for (let i = 0; i < story.length; i++) {
		const line = story[i];
		if (line.label == label) {
			return i;
		} else if (i == (story.length - 1)) {
			return story.length - 1;
		}
	}
}

function speechBox(speaker, speech, final) {
	this.speaker = speaker || "???";
	this.speech = speech || "...";
	this.final = final || true;
	// if (this.final == true) {
	// 	this.close
	// } else {

	// }

}

function speechBoxClose(target) {
	$(target).parent().remove();
}

function randomize(array, weighted) {
	weighted = weighted || false;
	if (weighted == true) {
		try {
			// check if there are the same number of weights as items
			if (array.length % 2 == 0) {
				var result;
				var totalWeight = 0;

				for (let i = 1; i <= array.length/2; i++) {
					const e = array[(i*2) - 1];
					totalWeight += e;
				}

				var rand = Math.random() * totalWeight;
				var currentWeight = 0;
				for (let i = 1; i <= array.length/2; i++) {
					const e = array[(i*2) - 1];
					currentWeight += e;
					if (rand < currentWeight) {
						result = array[(i*2) - 2];
						break;
					}
				}

				return result
			} else {
				throw console.error("Error occurred randomizing. Array is not properly weighted.");
			}
		} catch (e) {
			throw console.error("Error occurred randomizing. Input was most likely not an array.");
		}
	} else {
		try {
			var result = array[Math.floor(Math.random() * array.length)];
			return result
		} catch (e) {
			throw console.error("Error occurred randomizing. Input was most likely not an array.");
		}
	}
}

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

function statGen(modifier) {
	modifier = modifier || 0;
	var lowest = 6;
	var rolledResult = 0;
	for (let index = 0; index < 4; index++) {
		const newRoll = Math.floor((Math.random() * 6)) + 1;
		rolledResult += newRoll;
		lowest = Math.min(lowest, newRoll);
	}
	rolledResult += modifier;
	rolledResult -= lowest;
	return rolledResult;
}

function Attributes(str, dex, con, wis, int, cha) {
	this.str = str || 10;
	this.dex = dex || 10;
	this.con = con || 10;
	this.wis = wis || 10;
	this.int = int || 10;
	this.cha = cha || 10;
}

Attributes.prototype.strMod = function() {
	return Math.floor((this.str - 10) / 2);
}
Attributes.prototype.dexMod = function() {
	return Math.floor((this.dex - 10) / 2);
}
Attributes.prototype.conMod = function() {
	return Math.floor((this.con - 10) / 2);
}
Attributes.prototype.wisMod = function() {
	return Math.floor((this.wis - 10) / 2);
}
Attributes.prototype.intMod = function() {
	return Math.floor((this.int - 10) / 2);
}
Attributes.prototype.chaMod = function() {
	return Math.floor((this.cha - 10) / 2);
}

function Stats(attributes, speed, size, ac, hp) {
	this.attributes = attributes || Attributes();
	this.speed = speed || 30;
	this.size = size || "medium";
	this.ac = ac || 10 + this.attributes.dexMod;
	this.hp = hp || 6 + this.attributes.conMod;
}


/* This section courtesy of Mr. Doob. */
THREE.DragControls = function ( _objects, _camera, _domElement ) {

	if ( _objects instanceof THREE.Camera ) {

		console.warn( 'THREE.DragControls: Constructor now expects ( objects, camera, domElement )' );
		var temp = _objects; _objects = _camera; _camera = temp;

	}

	var _plane = new THREE.Plane();
	var _raycaster = new THREE.Raycaster();

	var _mouse = new THREE.Vector2();
	var _offset = new THREE.Vector3();
	var _intersection = new THREE.Vector3();
	var _startPosition = new THREE.Vector3();

	var _selected = null, _hovered = null;

	//

	var scope = this;

	function activate() {

		_domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		_domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		_domElement.addEventListener( 'mouseup', onDocumentMouseCancel, false );
		_domElement.addEventListener( 'mouseleave', onDocumentMouseCancel, false );
		_domElement.addEventListener( 'touchmove', onDocumentTouchMove, false );
		_domElement.addEventListener( 'touchstart', onDocumentTouchStart, false );
		_domElement.addEventListener( 'touchend', onDocumentTouchEnd, false );

	}

	function deactivate() {

		_domElement.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		_domElement.removeEventListener( 'mousedown', onDocumentMouseDown, false );
		_domElement.removeEventListener( 'mouseup', onDocumentMouseCancel, false );
		_domElement.removeEventListener( 'mouseleave', onDocumentMouseCancel, false );
		_domElement.removeEventListener( 'touchmove', onDocumentTouchMove, false );
		_domElement.removeEventListener( 'touchstart', onDocumentTouchStart, false );
		_domElement.removeEventListener( 'touchend', onDocumentTouchEnd, false );

	}

	function dispose() {

		deactivate();

	}

	function onDocumentMouseMove( event ) {

		event.preventDefault();

		var rect = _domElement.getBoundingClientRect();

		_mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
		_mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

		_raycaster.setFromCamera( _mouse, _camera );

		if ( _selected && scope.enabled ) {

			if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {
				var newPos = _intersection.sub( _offset );
				newPos.y = Math.max(newPos.y, 0);
				newPos.floor();
				var deltaX = Math.min(Math.abs(_startPosition.x - newPos.x), 6);
				var deltaZ = Math.min(Math.abs(_startPosition.z - newPos.z), 6);
				if (_startPosition.x > newPos.x) {
					deltaX = deltaX * -1;
				}
				if (_startPosition.z > newPos.z) {
					deltaZ = deltaZ * -1;
				}
				newPos.x = _startPosition.x + deltaX + 0.5;
				newPos.z = _startPosition.z + deltaZ + 0.5;
				if (_selected.getObjectByName("Skeleton") != undefined) {
					if (Math.abs(deltaX) > Math.abs(deltaZ)) {
						if (deltaX > 0) {
							_selected.getObjectByName("Skeleton").rotation.y = Math.PI/2;
						} else {
							_selected.getObjectByName("Skeleton").rotation.y = -Math.PI/2;
						}
					} else {
						if (deltaZ >= 0) {
							_selected.getObjectByName("Skeleton").rotation.y = 0;
						} else {
							_selected.getObjectByName("Skeleton").rotation.y = -Math.PI;
						}
					}

				}
				if (_selected.getObjectByName("deltaVector")) {
					_selected.remove(_selected.getObjectByName("deltaVector"));
				}
				_selected.add(getDeltaLine(deltaX, 0, deltaZ));
				_selected.position.copy( newPos );

			}

			scope.dispatchEvent( { type: 'drag', object: _selected } );

			return;

		}

		_raycaster.setFromCamera( _mouse, _camera );

		var intersects = _raycaster.intersectObjects( _objects );

		if ( intersects.length > 0 ) {

			var object = intersects[ 0 ].object;


			_plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

			if ( _hovered !== object ) {

				scope.dispatchEvent( { type: 'hoveron', object: object } );
				if (_hovered !== null)
				{
					var charNameObj = _hovered.getObjectByName("CharacterName");
					if (charNameObj !== undefined) {
						charNameObj.visible = false;
					}
				}

				_domElement.style.cursor = 'pointer';
				_hovered = object;

				charNameObj = _hovered.getObjectByName("CharacterName");
				const innerPivot = _hovered.getObjectByName("InnerPivot");
				if (charNameObj !== undefined) {
					var hyp1 = Math.pow(_camera.position.x, 2) + Math.pow(_camera.position.z, 2);
					var hyp2 = Math.sqrt(hyp1 + Math.pow(_camera.position.y, 2)) / 10;
					charNameObj.scale.set(hyp2 * charNameObj.userData.scaleX, hyp2 * charNameObj.userData.scaleY, hyp2 * charNameObj.userData.scaleZ);
					var rotY = Math.atan2(_camera.position.z, _camera.position.x);

					//Test
					var vector = _camera.getWorldDirection(new THREE.Vector3(0,0,0));
					var thetaY = Math.atan2(vector.x,vector.z);
					var hyp = Math.sqrt((vector.x * vector.x) + (vector.z * vector.z))
					var thetaX = Math.atan2(hyp, vector.y);

					charNameObj.rotation.y = thetaY + Math.PI;
					innerPivot.rotation.x = -thetaX + Math.PI/2;

					charNameObj.visible = true;
				}

			}

		} else {

			if ( _hovered !== null ) {

				scope.dispatchEvent( { type: 'hoveroff', object: _hovered } );

				_domElement.style.cursor = 'auto';

				var charNameObj = _hovered.getObjectByName("CharacterName");
				if (charNameObj !== undefined) {
					charNameObj.visible = false;
				}

				_hovered = null;

			}

		}

	}

	function onDocumentMouseDown( event ) {

		if (event.button == 0) {
			event.preventDefault();
			_raycaster.setFromCamera( _mouse, _camera );

			var intersects = _raycaster.intersectObjects( _objects );

			if ( intersects.length > 0 ) {

				_selected = intersects[ 0 ].object;

				if (_selected.userData.draggable == true) {
					if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {

						_offset.copy( _intersection ).sub( _selected.position );
						_startPosition.copy(_selected.position);
						_startPosition.floor();
					}

					_domElement.style.cursor = 'move';

					scope.dispatchEvent( { type: 'dragstart', object: _selected } );
				}
				else {
					_selected = null;
				}
			}
		}
		else if (event.button == 1) {
			event.preventDefault();
			_raycaster.setFromCamera( _mouse, _camera );

			var intersects = _raycaster.intersectObjects( _objects );

			if ( intersects.length > 0 ) {

				_selected = intersects[ 0 ].object;

				if (_selected.userData.draggable == true) {
					changeRace(_selected);
					changeGender(_selected);
				}
				_selected = null;
			}
		}


	}

	function onDocumentMouseCancel( event ) {
		if (event.button == 0) {

			event.preventDefault();

			if ( _selected ) {

				// setHair(_selected, undefined, _selected.userData.hairColor);
				// setTexture(_selected, "/res/models/Advanced/skin_jasper.png");

				scope.dispatchEvent( { type: 'dragend', object: _selected } );
				if (_selected.getObjectByName("deltaVector")) {
					_selected.remove(_selected.getObjectByName("deltaVector"));
				}

				_selected = null;

			}
			_domElement.style.cursor = _hovered ? 'pointer' : 'auto';
		}

	}

	function onDocumentTouchMove( event ) {

		event.preventDefault();
		event = event.changedTouches[ 0 ];

		var rect = _domElement.getBoundingClientRect();

		_mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
		_mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

		_raycaster.setFromCamera( _mouse, _camera );

		if ( _selected && scope.enabled ) {

			if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {

				_selected.position.copy( _intersection.sub( _offset ) );

			}

			scope.dispatchEvent( { type: 'drag', object: _selected } );

			return;

		}

	}

	function onDocumentTouchStart( event ) {

		event.preventDefault();
		event = event.changedTouches[ 0 ];

		var rect = _domElement.getBoundingClientRect();

		_mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
		_mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

		_raycaster.setFromCamera( _mouse, _camera );

		var intersects = _raycaster.intersectObjects( _objects );

		if ( intersects.length > 0 ) {

			_selected = intersects[ 0 ].object;

			_plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

			if ( _raycaster.ray.intersectPlane( _plane, _intersection ) ) {

				_offset.copy( _intersection ).sub( _selected.position );

			}

			_domElement.style.cursor = 'move';

			scope.dispatchEvent( { type: 'dragstart', object: _selected } );

		}


	}

	function onDocumentTouchEnd( event ) {

		event.preventDefault();

		if ( _selected ) {

			scope.dispatchEvent( { type: 'dragend', object: _selected } );

			_selected = null;

		}

		_domElement.style.cursor = 'auto';

	}

	activate();

	// API

	this.enabled = true;

	this.activate = activate;
	this.deactivate = deactivate;
	this.dispose = dispose;
};

THREE.DragControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.DragControls.prototype.constructor = THREE.DragControls;

function getDeltaLine(deltaX, deltaY, deltaZ) {
	var deltaLine = new THREE.Object3D();
	deltaLine.name = "deltaVector";

	var xLine = new THREE.Mesh(
		new THREE.BoxBufferGeometry(Math.abs(deltaX) + 0.2, 0.1, 0.1),
		new THREE.MeshToonMaterial({color:0x00ff00})
	)
	var zLine = new THREE.Mesh(
		new THREE.BoxBufferGeometry(0.1, 0.1, Math.abs(deltaZ) + 0.2),
		new THREE.MeshToonMaterial({color:0x00ff00})
	)
	// const xSign = Math.abs(deltaX)/deltaX;
	var xSign = 1;
	if (deltaX !==0 ) {
		xSign = Math.abs(deltaX)/deltaX;
	}
	const zSign = Math.abs(deltaZ)/deltaZ;
	if (Math.abs(deltaX) < Math.abs(deltaZ)) {
		xLine.position.set(-deltaX/2 + (xSign * 0.05), 0.1, 0);
		// zLine.position.set(-deltaX - (xSign * 0.1), 0.1, -deltaZ/2 - (zSign * 0.1));
		zLine.position.set(-deltaX, 0.1, -deltaZ/2 - (zSign * 0.1));
	}
	else {
		xLine.position.set(-deltaX/2 - (xSign * 0.1), 0.1, -deltaZ);
		zLine.position.set(0, 0.1, -deltaZ/2 + (zSign * 0.05));
	}

	if (Math.abs(deltaX) > 0) {
		deltaLine.add(xLine);
	}
	if (Math.abs(deltaZ) > 0) {
		deltaLine.add(zLine);
	}

	return deltaLine;
}