/**
 * Created by Lyle Denman on 5/14/16.
 * With lots of help from: www.simonsarris.com/blog/510-making-html5-canvas-useful
 */

(function(){
  var debug = true;
  // var debug = false;

  function log(arg) {
    if (debug)
      console.log(arg);
  }

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
    /*
        CanvasState will need to do the following:
          1. Track objects drawn to the canvas
          2. Detect mousedown and mouseup events
            2a. get mouseclick information -- find object in that location
            2b. switch object color (black->white || white->black)
          3. Part 2 will need to make up for offsets to give proper click coords
     */
    var myState = this; //@lyle: what is this really doing?
    var mx, my;

    // 1. Track object drawn to the canvas
    myState.shapes = [];

    // 2. Detect events
    canvas.addEventListener('mousedown', function(e) {
      var mouse = myState.getMouse(e);
      mx = mouse.x;
      my = mouse.y;
      var shape = myState.contains(mx, my);
      if (shape) {
        myState.flipColor(myState.shapes[shape]);
        drawSquares();
      }
    });
  }

  CanvasState.prototype.contains = function(x, y) {
    for (var i = 0; i < myState.shapes.length; i++) {
      if (myState.shapes[i] !== undefined) {
        if (x >= myState.shapes[i].x && x < myState.shapes[i].x + 40) {
          if (y >= myState.shapes[i].y && y < myState.shapes[i].y + 40) {
            return i;
          }
        }
      }
    }
    return false;
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

  function createSquares() {
    var n = canvas.height;
    var d = 10;
    var m = n / d;
    var blackFill = "rgb(0,0,0)";
    var whiteFill = "rgb(255, 255, 255)";
    var count = 0;
    for (var i = 0; i < n; i+=m) {
      for (var j = 0; j < n; j+=m) {
        ctx.fillStyle = (count % 2 == 0) ? blackFill : whiteFill;
        myState.shapes[count] = new Square(i, j, m, m, ctx.fillStyle);
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
  var myState = new CanvasState(canvas);
  createSquares();
  drawSquares();
})();
