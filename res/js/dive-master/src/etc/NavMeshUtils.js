import { LineSegments, Line, Mesh, Group } from 'three';
import { MeshBasicMaterial, LineBasicMaterial } from 'three';
import { BufferGeometry, Float32BufferAttribute, IcosahedronBufferGeometry } from 'three';
import { Color, VertexColors } from 'three';

/**
* Class with various helpers in context of navigation meshes.
*
* @author {@link https://github.com/Mugen87|Mugen87}
*/
class NavMeshUtils {

	/**
	* Creates a helper that visualizes the convex regions of
	* a navigation mesh.
	*
	* @param {NavMesh} navMesh - The nav mesh.
	* @return {Mesh} The helper.
	*/
	static createConvexRegionHelper( navMesh ) {

		const regions = navMesh.regions;

		const geometry = new BufferGeometry();
		const material = new MeshBasicMaterial( { vertexColors: VertexColors, depthWrite: false, polygonOffset: true, polygonOffsetFactor: - 4 } );

		const mesh = new Mesh( geometry, material );
		mesh.matrixAutoUpdate = false;
		mesh.visible = false;

		const positions = [];
		const colors = [];

		const color = new Color();

		for ( let region of regions ) {

			// one color for each convex region

			color.setHex( Math.random() * 0xffffff );

			// count edges

			let edge = region.edge;
			const edges = [];

			do {

				edges.push( edge );

				edge = edge.next;

			} while ( edge !== region.edge );

			// triangulate

			const triangleCount = ( edges.length - 2 );

			for ( let i = 1, l = triangleCount; i <= l; i ++ ) {

				const v1 = edges[ 0 ].vertex;
				const v2 = edges[ i + 0 ].vertex;
				const v3 = edges[ i + 1 ].vertex;

				positions.push( v1.x, v1.y, v1.z );
				positions.push( v2.x, v2.y, v2.z );
				positions.push( v3.x, v3.y, v3.z );

				colors.push( color.r, color.g, color.b );
				colors.push( color.r, color.g, color.b );
				colors.push( color.r, color.g, color.b );

			}

		}

		geometry.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
		geometry.setAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

		return mesh;

	}

	/**
	* Creates a helper that visualizes the navigation path of a game entity.
	* Note that the actual geometry is created at a later point since an instance
	* of this helper is reused for all paths of a game entity.
	*
	* @return {Line} The helper.
	*/
	static createPathHelper() {

		const pathHelper = new Line( new BufferGeometry(), new LineBasicMaterial( { color: 0xff0000 } ) );
		pathHelper.matrixAutoUpdate = false;
		pathHelper.visible = false;
		return pathHelper;

	}

	/**
	* Creates a helper that visualizes the navigation graph of a navigation mesh.
	*
	* @param {Graph} graph - The navigation graph.
	* @param {Number} nodeSize - The size of the visualized nodes.
	* @param {Number} nodeColor - The color of the visualized nodes.
	* @param {Number} edgeColor - The color of the visualized edges.
	* @return {Group} The helper.
	*/
	static createGraphHelper( graph, nodeSize = 1, nodeColor = 0x4e84c4, edgeColor = 0xffffff ) {

		const group = new Group();
		group.visible = false;

		// nodes

		const nodeMaterial = new MeshBasicMaterial( { color: nodeColor } );
		const nodeGeometry = new IcosahedronBufferGeometry( nodeSize, 2 );

		const nodes = [];

		graph.getNodes( nodes );

		for ( let node of nodes ) {

			const nodeMesh = new Mesh( nodeGeometry, nodeMaterial );
			nodeMesh.position.copy( node.position );
			nodeMesh.userData.nodeIndex = node.index;

			nodeMesh.matrixAutoUpdate = false;
			nodeMesh.updateMatrix();

			group.add( nodeMesh );

		}

		// edges

		const edgesGeometry = new BufferGeometry();
		const position = [];

		const edgesMaterial = new LineBasicMaterial( { color: edgeColor } );

		const edges = [];

		for ( let node of nodes ) {

			graph.getEdgesOfNode( node.index, edges );

			for ( let edge of edges ) {

				const fromNode = graph.getNode( edge.from );
				const toNode = graph.getNode( edge.to );

				position.push( fromNode.position.x, fromNode.position.y, fromNode.position.z );
				position.push( toNode.position.x, toNode.position.y, toNode.position.z );

			}

		}

		edgesGeometry.setAttribute( 'position', new Float32BufferAttribute( position, 3 ) );

		const lines = new LineSegments( edgesGeometry, edgesMaterial );
		lines.matrixAutoUpdate = false;

		group.add( lines );

		return group;

	}

	/**
	* Creates a helper that visualizes the spatial index of a navigation mesh.
	*
	* @param {CellSpacePartitioning} spatialIndex - The spatial index.
	* @return {LineSegments} The helper.
	*/
	static createCellSpaceHelper( spatialIndex ) {

		const cells = spatialIndex.cells;

		const geometry = new BufferGeometry();
		const material = new LineBasicMaterial( { color: 0xff0000 } );

		const lines = new LineSegments( geometry, material );
		lines.visible = false;
		lines.matrixAutoUpdate = false;

		const positions = [];

		for ( let i = 0, l = cells.length; i < l; i ++ ) {

			const cell = cells[ i ];
			const min = cell.aabb.min;
			const max = cell.aabb.max;

			// generate data for twelve lines segments

			// bottom lines

			positions.push( min.x, min.y, min.z, 	max.x, min.y, min.z );
			positions.push( min.x, min.y, min.z, 	min.x, min.y, max.z );
			positions.push( max.x, min.y, max.z, 	max.x, min.y, min.z );
			positions.push( max.x, min.y, max.z, 	min.x, min.y, max.z );

			// top lines

			positions.push( min.x, max.y, min.z, 	max.x, max.y, min.z );
			positions.push( min.x, max.y, min.z, 	min.x, max.y, max.z );
			positions.push( max.x, max.y, max.z, 	max.x, max.y, min.z );
			positions.push( max.x, max.y, max.z, 	min.x, max.y, max.z );

			// torso lines

			positions.push( min.x, min.y, min.z, 	min.x, max.y, min.z );
			positions.push( max.x, min.y, min.z, 	max.x, max.y, min.z );
			positions.push( max.x, min.y, max.z, 	max.x, max.y, max.z );
			positions.push( min.x, min.y, max.z, 	min.x, max.y, max.z );

		}

		geometry.setAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );

		return lines;

	}

}


export { NavMeshUtils };
