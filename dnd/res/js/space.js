import * as THREE from 'three';
export var SPACE;
(function (SPACE) {
    class Planet extends THREE.Mesh {
        constructor(name, texture, diameter = 1) {
            var planetMaterial = new THREE.MeshPhongMaterial();
            super(new THREE.SphereGeometry(0.5 * diameter, 32, 32), planetMaterial);
            this.position.set(0, 0, 0);
            planetMaterial.map = new THREE.TextureLoader().load(texture);
            planetMaterial.bumpScale = 0.05;
            planetMaterial.specular = new THREE.Color('grey');
            planetMaterial.needsUpdate = true;
            this.name = name;
        }
    }
    SPACE.Planet = Planet;
    class PlanetRing extends THREE.Mesh {
        constructor(innerRadius, outerRadius, lookAt = new THREE.Vector3(0.5, -4, 1)) {
            super(new _RingGeometry(innerRadius, outerRadius, 32), new THREE.MeshPhongMaterial({
                alphaMap: new THREE.TextureLoader().load('/sf/img/textures/worlds/8k_saturn_ring_alpha.png'),
                side: THREE.DoubleSide,
                transparent: true,
                alphaTest: 0.5
            }));
            this.position.set(0, 0, 0);
            this.lookAt(lookAt);
        }
    }
    SPACE.PlanetRing = PlanetRing;
    class _RingGeometry extends THREE.Geometry {
        constructor(innerRadius = 0, outerRadius = 50, thetaSegments = 8) {
            super();
            var normal = new THREE.Vector3(0, 0, 1);
            for (var i = 0; i < thetaSegments; i++) {
                var angleLo = (i / thetaSegments) * Math.PI * 2;
                var angleHi = ((i + 1) / thetaSegments) * Math.PI * 2;
                var vertex1 = new THREE.Vector3(innerRadius * Math.cos(angleLo), innerRadius * Math.sin(angleLo), 0);
                var vertex2 = new THREE.Vector3(outerRadius * Math.cos(angleLo), outerRadius * Math.sin(angleLo), 0);
                var vertex3 = new THREE.Vector3(innerRadius * Math.cos(angleHi), innerRadius * Math.sin(angleHi), 0);
                var vertex4 = new THREE.Vector3(outerRadius * Math.cos(angleHi), outerRadius * Math.sin(angleHi), 0);
                this.vertices.push(vertex1);
                this.vertices.push(vertex2);
                this.vertices.push(vertex3);
                this.vertices.push(vertex4);
                var vertexIdx = i * 4;
                // Create the first triangle
                var face = new THREE.Face3(vertexIdx + 0, vertexIdx + 1, vertexIdx + 2, normal);
                var uvs = [];
                var uv = new THREE.Vector2(0, 0);
                uvs.push(uv);
                var uv = new THREE.Vector2(1, 0);
                uvs.push(uv);
                var uv = new THREE.Vector2(0, 1);
                uvs.push(uv);
                this.faces.push(face);
                this.faceVertexUvs[0].push(uvs);
                // Create the second triangle
                var face = new THREE.Face3(vertexIdx + 2, vertexIdx + 1, vertexIdx + 3, normal);
                var uvs = [];
                var uv = new THREE.Vector2(0, 1);
                uvs.push(uv);
                var uv = new THREE.Vector2(1, 0);
                uvs.push(uv);
                var uv = new THREE.Vector2(1, 1);
                uvs.push(uv);
                this.faces.push(face);
                this.faceVertexUvs[0].push(uvs);
            }
            // this.computeCentroids();
            this.computeFaceNormals();
            this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), outerRadius);
        }
        ;
    }
})(SPACE || (SPACE = {}));
//# sourceMappingURL=space.js.map