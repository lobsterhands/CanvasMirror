/**
 * Created by Lyle Denman on 5/14/16.
 * With lots of help from: www.simonsarris.com/blog/510-making-html5-canvas-useful
 */

(function(){
  /************************/
  /***** Square class *****/
  /************************/
  function Square(x, y, w, h, fillColor) {
    this.x = x || 0; // default to 0 if no x provided
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fillColor = fillColor || "#FFFFFF";
  }

  Square.prototype.draw = function(ctx) {
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  /************************/
  /*** CanvasState class **/
  /************************/
  function CanvasState(canvas) {
    var myState = this;

    // Track object drawn to the canvas
    myState.shapes = [];

    // Detect events
    canvas.addEventListener('mousedown', function(e) {
      var mouse = myState.getMouse(e);
      var mx = mouse.x;
      var my = mouse.y;

      var shape = myState.getShapeIndexAt(mx, my);
      if (shape != -1) {
        var mirrorShape = myState.getMirror(shape, sqRoot);
        if (mirrorShape != shape) {
          // if board is odd-numbered, a shape in the center column has itself as a mirror
          myState.flipColor(myState.shapes[mirrorShape]);
        }
        myState.flipColor(myState.shapes[shape]);
        ctx.clearRect(0, 0, canvasDim, canvasDim); // clear board
        drawSquares(); // draw board
      }
    });
  }

  CanvasState.prototype.getShapeIndexAt = function(x, y) {
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

  CanvasState.prototype.getMirror = function(index, n) {
    // Return a given square's mirrored square (across the y-axis)
    if (index === 0) {
      return Math.floor(n * (n-1));
    }

    var nOrZero = (index % n === 0) ? n : 0;
    return n*n - (n * (Math.ceil(index / n))) + (index % n) - nOrZero;
  };

  CanvasState.prototype.createSquares = function() {
    var count = 0;
    for (var i = 0; i < canvasDim ; i+=gridSize) {
      for (var j = 0; j < canvasDim; j+=gridSize) {
        ctx.fillStyle = "#ffffff";
        myState.shapes[count] = new Square(i, j, gridSize, gridSize, ctx.fillStyle);
        count++;
      }
    }
  };

  /************************/
  /*****   Helpers    *****/
  /************************/
  function drawSquares() {
    for (var i = 0; i < myState.shapes.length; i++) {
      if (myState.shapes[i] !== undefined) {
        myState.shapes[i].draw(ctx);
      }
    }
  }

  /************************/
  /****   MAIN EVENT   ****/
  /************************/
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
  }
  var sqRoot = 16;
  var canvasDim = canvas.width;

  // ensure dimensions align for pixel-perfection
  while (canvasDim % sqRoot !== 0) {
    canvasDim++;
  }
  canvas.width = canvas.height = canvasDim;

  var gridSize = canvas.width/sqRoot;
  var myState = new CanvasState(canvas);
  myState.createSquares();
  drawSquares();
})();
