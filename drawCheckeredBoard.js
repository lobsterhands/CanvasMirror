/**
 * Created by Lyle Denman on 5/15/16.
 */
function createSquares() {
  var blackFill = "rgb(0,0,0)";
  var whiteFill = "rgb(255, 255, 255)";
  var count = 0;
  for (var i = 0; i < canvasDim ; i+=gridSize) {
    for (var j = 0; j < canvasDim; j+=gridSize) {
      ctx.fillStyle = (count % 2 == 0) ? blackFill : whiteFill;
      myState.shapes[count] = new Square(i, j, gridSize, gridSize, ctx.fillStyle);
      count++;
    }
    count++;
  }
}
