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