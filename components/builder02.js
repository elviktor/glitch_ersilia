/* global AFRAME */

/**
 * Component that builds arrays of shapes based on algorithms
 */




AFRAME.registerComponent('builder02', {
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
    
    var d = [ 151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167];
    
    
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
            height: d[i]/100,
            width: d[i+j]/1000,
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
          height: d[i]/100,
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
              radius: d[i]/100,
            });
            entityEl.setAttribute('material','color',colors[data.color]);
            entityEl.setAttribute('position', {x: i/data.xSpacing, y: 0, z: 0});
          } else {
            entityEl.setAttribute('geometry', {
              primitive: 'torus',
              radius: d[i]/100,
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
            radius: d[i+j]/1000,
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