/************************/
/***** Square class *****/
/************************/
export default class Square{
  constructor(x, y, w, fillColor) {
    this.x = x || 0; // Default to 0 if no x provided, etc
    this.y = y || 0;
    this.width = w || 1;
    this.height = w || 1;
    this.fillColor = fillColor || "#FFFFFF";
  }

  draw(ctx) { // Draw square to canvas
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
