"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/************************/
/***** Square class *****/
/************************/

var Square = function () {
  function Square(x, y, w, fillColor) {
    _classCallCheck(this, Square);

    this.x = x || 0; // Default to 0 if no x provided, etc
    this.y = y || 0;
    this.width = w || 1;
    this.height = w || 1;
    this.fillColor = fillColor || "#FFFFFF";
  }

  _createClass(Square, [{
    key: "draw",
    value: function draw(ctx) {
      // Draw square to canvas
      ctx.fillStyle = this.fillColor;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }]);

  return Square;
}();

exports.default = Square;

//# sourceMappingURL=Square-compiled.js.map