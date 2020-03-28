/* global AFRAME */

/**
 * Component that builds arrays of shapes based on algorithms
 */




AFRAME.registerComponent('builder03', {
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
    
    var d = [ 151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
    
    var d2 = [83,237,80,109,43,55,159,191,159,59,183,80,122,82,154,173,86,198,134,102,101,224,213,206,196,164,97,82,73,97,2,61,67,17,32,89,2,138,253,22,246,200,166,111,47,253,136,19,32,167,86,186,6,160,57,21,117,76,162,176,7,200,14,74,252,148,36,89,182,223,204,152,155,70,174,3,155,247,159,149,189,217,123,14,45,1,113,113,192,51,9,61,80,30,147,217,166,188,244,252,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86];
    
    
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
      
      var counter = 0;
      
      for (var j = 0; j < data.number; j++) {
      
      
        for (var i = 0; i < data.number; i++) {

          // Manage counter variable
          counter = j * data.number + i;
          
          // Create entity and give it unique id
          var label = data.label + "1_1_" + j.toString() + i.toString();
          var entityEl = document.createElement('a-entity');
          entityEl.id = label;

          // Set entity attributes (geometry and color)
          entityEl.setAttribute('geometry', {
            primitive: 'box',
            height: d[counter]/1000,
            width: d2[counter]/1000,
            depth: data.depth
          });
          //entityEl.setAttribute('random-color');
          entityEl.setAttribute('material', {'shader': 'grid-glitch', 'color': 'blue'});

          // Position the looped boxes based on below algorithm
          // {Boxes will appear stacked equally in front of camera}
          if (i < data.number / 2) {
          entityEl.setAttribute('position', {x: i/data.xSpacing, y: j / data.ySpacing, z: i/data.xSpacing});
          } else {
          var iBack = data.number/2 - i;
          entityEl.setAttribute('position', {x: iBack/data.xSpacing, y: j / data.ySpacing, z: i/data.xSpacing});  
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
          height: d[i]/1000,
          width: data.width
        });
        entityEl.setAttribute('random-color');

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
      
      var counter = 0;
      
      for (var j = 0; j < data.number; j++) {
      
        for (var i = 0; i < data.number; i++) {

          // Manage counter variable
          counter = j * data.number + i;
          
          // Create entity and give it unique id
          var label = data.label + "1_3_" + j.toString() + i.toString();
          var entityEl = document.createElement('a-entity');
          entityEl.id = label;

          // Set entity attributes (geometry and color)
          if (i % 2 == 0) {
            entityEl.setAttribute('geometry', {
              primitive: 'octahedron',
              radius: d[counter]/1000,
            });
            entityEl.setAttribute('random-color');
            entityEl.setAttribute('position', {x: i/data.xSpacing, y: j / data.ySpacing, z: 0});
          } else {
            entityEl.setAttribute('geometry', {
              primitive: 'torus',
              radius: d[counter]/1000,
              radiusTubular: data.width
            });
            entityEl.setAttribute('random-color');
            //entityEl.setAttribute('position', {x: i, y: -1, z:-5})
            entityEl.object3D.position.set((i-1)/data.xSpacing, j / data.ySpacing, 0);
            entityEl.object3D.rotation.set(
              THREE.Math.degToRad(90),
              THREE.Math.degToRad(0),
              THREE.Math.degToRad(0)
            );
          }
          //var target = data.target + j.toString() + i.toString();
          entityEl.setAttribute('follow', {target: data.target, speed: 0.75})
          // Initialize the entity by attaching it to the canvas element
          this.canvasEl.appendChild(entityEl);
        }
      }
    }
    
     // Option 4: Start centered horizontal builder FOR loop
    else if (data.algoType == 4) {    
      
      var counter = 0;
      
      for (var j = 0; j < data.number; j++) {
      
        for (var i = 0; i < data.number; i++) {
          
          // Manage counter variable
          counter = j * data.number + i;

          // Create entity and give it unique id
          var label = data.label + "1_4_" + j.toString() + i.toString();
          var entityEl = document.createElement('a-entity');
          entityEl.id = label;

          // Set entity attributes (geometry and color)
          entityEl.setAttribute('geometry', {
            primitive: 'torus',
            radius: d[counter]/1000,
            radiusTubular: data.width
          });
          entityEl.setAttribute('random-color');

          // Position the looped boxes based on below algorithm
          // {Boxes will appear stacked equally in front of camera}
          if (i < data.number / 2) {
          entityEl.setAttribute('position', {x: i/data.xSpacing, y: j / data.ySpacing, z: i/data.xSpacing});
          } else {
          var iBack = data.number/2 - i;
          entityEl.setAttribute('position', {x: iBack/data.xSpacing, y: j / data.ySpacing, z: i/data.xSpacing});  
          }

          // Initialize the entity by attaching it to the canvas element
          this.canvasEl.appendChild(entityEl);
          console.log(data.host);
        }
      }
    } 
    
     // Option 5: Start centered horizontal builder FOR loop
    else if (data.algoType == 5) {    
      
      var counter = 0;
      
      for (var j = 0; j < data.number; j++) {
      
        for (var i = 0; i < data.number; i++) {
          
          // Manage counter variable
          counter = j * data.number + i;

          // Create entity and give it unique id
          var label = data.label + "1_4_" + j.toString() + i.toString();
          var entityEl = document.createElement('a-entity');
          entityEl.id = label;

          // Set entity attributes (geometry and color)
          entityEl.setAttribute('geometry', {
            primitive: 'torus',
            radius: d2[counter]/1000,
            radiusTubular: data.width
          });
          entityEl.setAttribute('random-color');

          // Position the looped boxes based on below algorithm
          // {Boxes will appear stacked equally in front of camera}
          if (i < data.number / 2) {
          entityEl.setAttribute('position', {x: i/data.xSpacing, y: j / data.ySpacing, z: i/data.xSpacing});
          } else {
          var iBack = data.number/2 - i;
          entityEl.setAttribute('position', {x: iBack/data.xSpacing, y: j / data.ySpacing, z: i/data.xSpacing});  
          }

          // Initialize the entity by attaching it to the canvas element
          this.canvasEl.appendChild(entityEl);
          console.log(data.host);
        }
      }
    } 
    
    //Option 6: Multiple shape builder chaser 2 FOR loop
    else if (data.algoType >= 5) {
      
      var counter = 0;
      
      for (var j = 0; j < data.number; j++) {
      
        for (var i = 0; i < data.number; i++) {

          // Manage counter variable
          counter = j * data.number + i;
          
          // Create entity and give it unique id
          var label = data.label + "1_6_" + j.toString() + i.toString();
          var entityEl = document.createElement('a-entity');
          entityEl.id = label;

          // Set entity attributes (geometry and color)
          if (i % 2 == 0) {
            entityEl.setAttribute('geometry', {
              primitive: 'dodecahedron',
              radius: d[counter]/1000,
            });
            //entityEl.setAttribute('material','color',colors[data.color]);
            //entityEl.setAttribute('random-color');
            entityEl.setAttribute('material', {'shader': 'grid-glitch', 'color': 'blue'});
            entityEl.setAttribute('position', {x: i/data.xSpacing, y: j / data.ySpacing, z: 0});
          } else {
            entityEl.setAttribute('geometry', {
              primitive: 'cone',
              radiusBottom: d2[counter]/1000, 
              radiusTop: d[counter]/1000,
              openEnded: 'true'
            });
            //entityEl.setAttribute('material','color', colors[data.color + 1]);
            entityEl.setAttribute('random-color');
            entityEl.object3D.position.set((i-1)/data.xSpacing,j / data.ySpacing, 0);
            entityEl.object3D.rotation.set(
              THREE.Math.degToRad(counter*2),
              THREE.Math.degToRad(0),
              THREE.Math.degToRad(0)
            );
          }
          //var target = data.target + j.toString() + i.toString();
          entityEl.setAttribute('follow', {target: data.target, speed: 0.75})
          // Initialize the entity by attaching it to the canvas element
          this.canvasEl.appendChild(entityEl);
        }
      }
    }
    
  },

  tick: function () {
    
  }
});