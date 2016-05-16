/**
 * Created by Lyle Denman on 5/14/16.
 * With lots of help from: www.simonsarris.com/blog/510-making-html5-canvas-useful
 */

(function(){
  /************************/
  /***** Square class *****/
  /************************/
  function Square(x, y, w, h, fillColor) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fillColor = fillColor || "#FF0000";
  }

  Square.prototype.draw = function(ctx) {
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  /************************/
  /*** CanvasState class **/
  /************************/
  function CanvasState(canvas) {
    var myState = this; //@lyle: using 'var myState = this; allows me to use

    // 1. Track object drawn to the canvas
    myState.shapes = [];

    // 2. Detect events
    canvas.addEventListener('mousedown', function(e) {
      var mouse = myState.getMouse(e);
      var mx = mouse.x;
      var my = mouse.y;

      var shape = myState.contains(mx, my);
      if (shape != -1) {
        myState.mirrorAction(mx, my);
        myState.flipColor(myState.shapes[shape]);
        drawSquares();
      }
    });
  }

  CanvasState.prototype.contains = function(x, y) {
    for (var i = 0; i < myState.shapes.length; i++) {
      if (myState.shapes[i] !== undefined) {
        if (x >= myState.shapes[i].x && x < myState.shapes[i].x + gridSize) {
          if (y >= myState.shapes[i].y && y < myState.shapes[i].y + gridSize) {
            return i;
          }
        }
      }
    }
    return -1; // Error: no shape found
  };

  CanvasState.prototype.getMouse = function(e) {
    return {x: e.offsetX, y: e.offsetY};
  };

  CanvasState.prototype.flipColor = function(shape) {
    if (shape.fillColor == "#000000") {
      shape.fillColor = "#ffffff";
    } else {
      shape.fillColor = "#000000";
    }
  };

  CanvasState.prototype.mirrorAction = function(x, y) {
    // Detect change on any object, find its "mirror" object across the y-axis
    // and affect the change there as well.
    var diff = ((canvas.width / 2)) - x;
    var mirrorX = (canvas.width / 2) + (diff - 1); // (diff -1 ) keeps mirrorX in bounds
    var mirrorShape = myState.contains(mirrorX, y);
    if (mirrorShape != -1) {
      myState.flipColor(myState.shapes[mirrorShape]);
    }
  };

  function createSquares() {
    var count = 0;
    for (var i = 0; i < canvasDim ; i+=gridSize) {
      for (var j = 0; j < canvasDim; j+=gridSize) {
        ctx.fillStyle = "#ffffff";
        myState.shapes[count] = new Square(i, j, gridSize, gridSize, ctx.fillStyle);
        count++;
      }
      count++;
    }
  }

  function drawSquares() {
    for (var i = 0; i < myState.shapes.length; i++) {
      if (myState.shapes[i] !== undefined) {
        myState.shapes[i].draw(ctx);
      }
    }
  }

  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
  }
  var canvasDim = canvas.width;
  var gridSize = canvas.width/20;
  var myState = new CanvasState(canvas);
  createSquares();
  drawSquares();
})();
