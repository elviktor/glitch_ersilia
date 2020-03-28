/* global AFRAME */

/**
 * Component that builds a plane using THREE.js PlaneGeometry constructor
 */

AFRAME.registerComponent('plane', {
    schema: { 
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    widthSegments: {type: 'number', default: 1},
    heightSegments: {type: 'number', default: 1},
    color: {type: 'color', default: '#000'}
  },

  /**
   * Initial creation and setting of the mesh.
   */
  
  
  init: function () {
    var data = this.data;
    var el = this.el;
    
    
    
    // Initialize 2D terrain array
    for (var x = 0; x < data.width; x++){
      terrainMap[x] = [];
      for (var y = 0; y < data.length; y++){
        terrainMap[x][y] = 0; //specify a default value for now
      }
    }

     // Create geometry.
    this.geometry = new THREE.PlaneGeometry(data.width, data.height, data.widthSegments, data.heightSegments);
    // Create material.
    this.material = new THREE.MeshStandardMaterial({color: data.color, wireframe: true});
    // Create mesh.
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // Set mesh on entity.
    el.setObject3D('mesh', this.mesh); 
  }, 
  
   update: function (oldData) {
    var data = this.data;
    var el = this.el;

    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) { return; }

    // Geometry-related properties changed. Update the geometry.
    if (data.width !== oldData.width ||
        data.height !== oldData.height ||
        data.widthSegments !== oldData.widthSegments ||
        data.heightSegments !== oldData.heightSegments ) {
      el.getObject3D('mesh').geometry = new THREE.PlaneGeometry(data.width, data.height,
                                                                    data.widthSegments, data.heightSegments);
    }

    // Material-related properties changed. Update the material.
    if (data.color !== oldData.color) {
      el.getObject3D('mesh').material.color = data.color;
    }
  },
  
    function init() {
				
				var data = generateHeight( worldWidth, worldDepth );
				
				var geometry = new THREE.PlaneBufferGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
				geometry.rotateX( - Math.PI / 2 );
				var vertices = geometry.attributes.position.array;
				
        for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
					vertices[ j + 1 ] = data[ i ] * 10;
				}
				
        texture = new THREE.CanvasTexture( generateTexture( data, worldWidth, worldDepth ) );
				texture.wrapS = THREE.ClampToEdgeWrapping;
				texture.wrapT = THREE.ClampToEdgeWrapping;
				
        mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: texture } ) );
				scene.add( mesh );
				
			}
			
			function generateHeight( width, height ) {
				var size = width * height, data = new Uint8Array( size ),
					perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;
				for ( var j = 0; j < 4; j ++ ) {
					for ( var i = 0; i < size; i ++ ) {
						var x = i % width, y = ~ ~ ( i / width );
						data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
					}
					quality *= 5;
				}
				return data;
			}
			
      function generateTexture( data, width, height ) {
				var canvas, canvasScaled, context, image, imageData, vector3, sun, shade;
				
        vector3 = new THREE.Vector3( 0, 0, 0 );
				
        sun = new THREE.Vector3( 1, 1, 1 );
				sun.normalize();
				
        canvas = document.createElement( 'canvas' );
				canvas.width = width;
				canvas.height = height;
				
        context = canvas.getContext( '2d' );
				context.fillStyle = '#000';
				context.fillRect( 0, 0, width, height );
				
        image = context.getImageData( 0, 0, canvas.width, canvas.height );
				imageData = image.data;
				
        for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
					vector3.x = data[ j - 2 ] - data[ j + 2 ];
					vector3.y = 2;
					vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
					vector3.normalize();
					shade = vector3.dot( sun );
					imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
					imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
					imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
				}
				
        context.putImageData( image, 0, 0 );
				
        // Scaled 4x
				canvasScaled = document.createElement( 'canvas' );
				canvasScaled.width = width * 4;
				canvasScaled.height = height * 4;
				
        context = canvasScaled.getContext( '2d' );
				context.scale( 4, 4 );
				context.drawImage( canvas, 0, 0 );
				
        image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
				imageData = image.data;
				
        for ( var i = 0, l = imageData.length; i < l; i += 4 ) {
					var v = ~ ~ ( Math.random() * 5 );
					imageData[ i ] += v;
					imageData[ i + 1 ] += v;
					imageData[ i + 2 ] += v;
				}
				
        context.putImageData( image, 0, 0 );
				
        return canvasScaled;
			}  
});// JavaScript source code
