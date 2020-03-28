/* global AFRAME */

/**
 * Component that builds arrays of shapes based on algorithms
 */
AFRAME.registerComponent('builder01', {
  schema: {
    host: {type: 'string'},
    label: {type: 'string'},
    target: {type: 'string'},
    number: {type: 'number'},
    algoType: {type: 'number'}, // the builder algo is chosen by if statement
    color: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    width: {type: 'number', default: 1},
    depth: {type: 'number', default: 1},
    xSpacing: {type: 'number', default: 1},
    ySpacing: {type: 'number', default: 1},
    zSpacing: {type: 'number', default: 1}
  },

  init: function () {
    
    // Color array
    var colors = ['red','white','yellow','blue','black','green'];
    
    // Initialize variables and select DOM elements
    var data = this.data;
    var el = this.el;
    
    this.sceneEl = document.querySelector('a-scene');
    this.canvasEl = this.sceneEl.querySelector(data.host);
    console.log("Algotype: " + data.algoType);
    
    // *Place if statement for selecting builder algos before the FOR loop
    // Option 1: Start centered horizontal builder FOR loop
    if (data.algoType == 1) {    
      
      for (var j = 0; j < data.number; j++) {
      
      
        for (var i = 0; i < data.number; i++) {

          // Create entity and give it unique id
          var label = data.label + "1_1_" + j.toString() + i.toString();
          var entityEl = document.createElement('a-entity');
          entityEl.id = label;

          // Set entity attributes (geometry and color)
          entityEl.setAttribute('geometry', {
            primitive: 'box',
            height: data.height,
            width: data.width,
            depth: data.depth
          });
          entityEl.setAttribute('material','color',colors[data.color]);

          // Position the looped boxes based on below algorithm
          // {Boxes will appear stacked equally in front of camera}
          if (i < data.number / 2) {
          entityEl.setAttribute('position', {x: i/data.xSpacing, y: i / data.xSpacing + j / data.ySpacing, z: i/data.xSpacing});
          } else {
          var iBack = data.number/2 - i;
          entityEl.setAttribute('position', {x: iBack/data.xSpacing, y: i / data.xSpacing + j / data.ySpacing, z: i/data.xSpacing});  
          }

          // Initialize the entity by attaching it to the canvas element
          this.canvasEl.appendChild(entityEl);
          console.log(data.host);
        }
      }
    } 
    
    //Option 2: Start centered horizontal builder FOR loop
    else if (data.algoType == 2) {
      for (var i = 0; i < data.number; i++) {

        // Create entity and give it unique id
        var label = data.label + "1_2_" + i.toString();
        var entityEl = document.createElement('a-entity');
        entityEl.id = label;

        // Set entity attributes (geometry and color)
        entityEl.setAttribute('geometry', {
          primitive: 'box',
          height: data.height,
          width: data.width
        });
        entityEl.setAttribute('material','color',colors[data.color]);

        // Position the looped boxes based on below algorithm
        // {Boxes will appear stacked to the right of camera}
        
        entityEl.setAttribute('position', {x: i/data.xSpacing, y: 0, z: 0});
        

        // Initialize the entity by attaching it to the canvas element
        this.canvasEl.appendChild(entityEl);
        console.log(data.number);
      }
    }
    
    //Option 3: Multiple shape builder chaser FOR loop
    else if (data.algoType == 3) {
      
      for (var j = 0; j < data.number; j++) {
      
        for (var i = 0; i < data.number; i++) {

          // Create entity and give it unique id
          var label = data.label + "1_3_" + j.toString() + i.toString();
          var entityEl = document.createElement('a-entity');
          entityEl.id = label;

          // Set entity attributes (geometry and color)
          if (i % 2 == 0) {
            entityEl.setAttribute('geometry', {
              primitive: 'octahedron',
              radius: data.height,
            });
            entityEl.setAttribute('material','color',colors[data.color]);
            entityEl.setAttribute('position', {x: i/data.xSpacing, y: 0, z: 0});
          } else {
            entityEl.setAttribute('geometry', {
              primitive: 'torus',
              radius: data.height,
              radiusTubular: data.width
            });
            entityEl.setAttribute('material','color', colors[data.color + 1]);
            //entityEl.setAttribute('position', {x: i, y: -1, z:-5})
            entityEl.object3D.position.set((i-1)/data.xSpacing, i / data.xSpacing + j / data.ySpacing, 0);
            entityEl.object3D.rotation.set(
              THREE.Math.degToRad(90),
              THREE.Math.degToRad(0),
              THREE.Math.degToRad(0)
            );
          }
          var target = data.target + j.toString() + i.toString();
          //entityEl.setAttribute('follow', {target: target, speed: 0.75})
          // Initialize the entity by attaching it to the canvas element
          this.canvasEl.appendChild(entityEl);
          console.log('target = ' + target);
        }
      }
    }
    
     // Option 1: Start centered horizontal builder FOR loop
    else if (data.algoType > 3) {    
      
      for (var j = 0; j < data.number; j++) {
      
        for (var i = 0; i < data.number; i++) {

          // Create entity and give it unique id
          var label = data.label + "1_4_" + j.toString() + i.toString();
          var entityEl = document.createElement('a-entity');
          entityEl.id = label;

          // Set entity attributes (geometry and color)
          entityEl.setAttribute('geometry', {
            primitive: 'torus',
            radius: data.height,
            radiusTubular: data.width
          });
          entityEl.setAttribute('material','color',colors[data.color]);

          // Position the looped boxes based on below algorithm
          // {Boxes will appear stacked equally in front of camera}
          if (i < data.number / 2) {
          entityEl.setAttribute('position', {x: i/data.xSpacing, y: i / data.xSpacing + j / data.ySpacing, z: i/data.xSpacing});
          } else {
          var iBack = data.number/2 - i;
          entityEl.setAttribute('position', {x: iBack/data.xSpacing, y: i / data.xSpacing + j / data.ySpacing, z: i/data.xSpacing});  
          }

          // Initialize the entity by attaching it to the canvas element
          this.canvasEl.appendChild(entityEl);
          console.log(data.host);
        }
      }
    } 
    
  },

  tick: function () {
    
  }
});