/**
 * Created by Lyle Denman on 5/20/16.
 */
/************************/
/*** CanvasState class **/
/************************/
import Square from './Square';
export default class CanvasState {
  constructor(canvas, numRows, squareDim) {
    this.canvas = canvas;
    this.numRows = numRows;
    this.squareDim = squareDim;
    this.shapes = []; // Store the shapes drawn to the canvas
    this.listenMousedown();
    this.ctx = canvas.getContext('2d');
  }

  listenMousedown() {
    this.canvas.addEventListener('mousedown', (e) => {
      var mouse = CanvasState.getMouse(e);
      var mx = mouse.x;
      var my = mouse.y;

      var shapeIndex = this.getShapeIndexAt(mx, my);
      if (shapeIndex != -1) {
        var mirrorIndex = CanvasState.getMirror(shapeIndex, this.numRows);

        if (mirrorIndex != shapeIndex) {
          // If numRows is odd, a shape in the center column has itself as a mirror
          // So no need to flipColor() twice
          CanvasState.flipColor(this.shapes[mirrorIndex]);
        }
        CanvasState.flipColor(this.shapes[shapeIndex]);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
        this.drawSquares(); // draw board
      }
    });
  }

  createSquares () {
    var count = 0;
    for (var x = 0; x < this.canvas.width; x+=this.squareDim) {
      for (var y = 0; y < this.canvas.height; y+=this.squareDim) {
        this.shapes[count] = new Square(x, y, this.squareDim);
        count++;
      }
    }
  }

  drawSquares() {
    for (var i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i] !== undefined) {
        this.shapes[i].draw(this.ctx);
      }
    }
  }

  getShapeIndexAt(x, y) {
    for (var i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i] !== undefined) {
        if (x >= this.shapes[i].x && x < this.shapes[i].x + this.squareDim) {
          if (y >= this.shapes[i].y && y < this.shapes[i].y + this.squareDim) {
            return i;
          }
        }
      }
    }
    return -1; // Error: no shape found
  }

}

/************************/
/***** CanvasState ******/
/*** Static Functions ***/
/************************/
CanvasState.getMouse = function(e) {
  return {x: e.offsetX, y: e.offsetY};
};

CanvasState.flipColor = function(shape) {
  if (shape.fillColor == "#000000") {
    shape.fillColor = "#FFFFFF";
  } else {
    shape.fillColor = "#000000";
  }
};

CanvasState.getMirror = function(index, numRows) {
  // Return a given square's mirrored square (across the y-axis)
  if (index === 0) {
    return Math.floor(numRows * (numRows-1));
  }

  var nOrZero = (index % numRows === 0) ? numRows : 0;
  return numRows*numRows - (numRows * (Math.ceil(index / numRows))) +
      (index % numRows) - nOrZero;
};
