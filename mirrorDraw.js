/**
 * Created by Lyle Denman on 5/14/16.
 */

(function(){
  var debug = true;
  // var debug = false;

  function log(arg) {
    if (debug)
      console.log(arg);
  }

  function Shape(x, y, w, h, fillColor) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fillColor = fillColor || "#FF0000";
  }

  Shape.prototype.draw = function(ctx) {
    ctx.fillStyle = (count % 2 == 0) ? blackFill : whiteFill;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  };

  /* Algo idea: I want to separate the canvas into squares, like a chess board.
      This will require (given a canvas with nxn dimensions) dividing n by divisor d
      to have mxm dimensions of each square.
      (if n = 100 and i = 10, n/i gives a 10X10 square)
   */
  function drawSquares() {
    var n = canvas.height;
    var d = 10;
    var m = n / d;
    var blackFill = "rgb(0,0,0)";
    var whiteFill = "rgb(255, 255, 255)";
    var count = 0;
    var message;
    // for (var i = 0; i < n; i+=m*3) { THIS is cool! stretches the pattern
    for (var i = 0; i < n; i+=m) {
      for (var j = 0; j < n; j+=m) {
        message = i + "," + j + ": " + ctx.fillStyle;
        log(message);
        ctx.fillStyle = (count % 2 == 0) ? blackFill : whiteFill;

        // fillRect(x, y, width, height);
        ctx.fillRect(i, j, m, m);
        count++;

      }
      count++;
    }
  }

  /* Now I want to click on a spot on the game board and it to tell me the fill color
      of that area.
      To do this, I must store the grid data as I drawSquares().
   */


  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
  }
  canvas.onclick = function() { alert('cclick'); };
  drawSquares();

})();
