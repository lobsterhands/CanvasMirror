/**
 * Created by Lyle Denman on 5/14/16.
 * With lots of help from: www.simonsarris.com/blog/510-making-html5-canvas-useful
 */
// import name from './Square';
import CanvasState from './CanvasData';
(function(){
  /************************/
  /****   MAIN EVENT   ****/
  /************************/
  var canvas = document.getElementById('canvas');
  var canvasDim = canvas.width;
  // Update canvas dimensions for pixel-perfection
  var numRows = 9;
  while (canvasDim % numRows !== 0) {
    canvasDim++;
  }
  canvas.width = canvas.height = canvasDim;

  var squareDim = canvasDim/numRows; // Set dimensions of the square

  var drawingBoard = new CanvasState(canvas, numRows, squareDim);
  drawingBoard.createSquares();
  drawingBoard.drawSquares();
})();
