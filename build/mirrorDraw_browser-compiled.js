"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    'use strict';

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
    }(); /**
          * Created by Lyle Denman on 5/20/16.
          */
    /************************/
    /*** CanvasState class **/
    /************************/

    var _Square = require('./Square');

    var _Square2 = _interopRequireDefault(_Square);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var CanvasState = function () {
      function CanvasState(canvas, numRows, squareDim) {
        _classCallCheck(this, CanvasState);

        this.canvas = canvas;
        this.numRows = numRows;
        this.squareDim = squareDim;
        this.shapes = []; // Store the shapes drawn to the canvas
        this.listenMousedown();
        this.ctx = canvas.getContext('2d');
      }

      _createClass(CanvasState, [{
        key: 'listenMousedown',
        value: function listenMousedown() {
          var _this = this;

          this.canvas.addEventListener('mousedown', function (e) {
            var mouse = CanvasState.getMouse(e);
            var mx = mouse.x;
            var my = mouse.y;

            var shapeIndex = _this.getShapeIndexAt(mx, my);
            if (shapeIndex != -1) {
              var mirrorIndex = CanvasState.getMirror(shapeIndex, _this.numRows);

              if (mirrorIndex != shapeIndex) {
                // If numRows is odd, a shape in the center column has itself as a mirror
                // So no need to flipColor() twice
                CanvasState.flipColor(_this.shapes[mirrorIndex]);
              }
              CanvasState.flipColor(_this.shapes[shapeIndex]);
              _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height); // clear canvas
              _this.drawSquares(); // draw board
            }
          });
        }
      }, {
        key: 'createSquares',
        value: function createSquares() {
          var count = 0;
          for (var x = 0; x < this.canvas.width; x += this.squareDim) {
            for (var y = 0; y < this.canvas.height; y += this.squareDim) {
              this.shapes[count] = new _Square2.default(x, y, this.squareDim);
              count++;
            }
          }
        }
      }, {
        key: 'drawSquares',
        value: function drawSquares() {
          for (var i = 0; i < this.shapes.length; i++) {
            if (this.shapes[i] !== undefined) {
              this.shapes[i].draw(this.ctx);
            }
          }
        }
      }, {
        key: 'getShapeIndexAt',
        value: function getShapeIndexAt(x, y) {
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
      }]);

      return CanvasState;
    }();

    /************************/
    /***** CanvasState ******/
    /*** Static Functions ***/
    /************************/

    exports.default = CanvasState;
    CanvasState.getMouse = function (e) {
      return { x: e.offsetX, y: e.offsetY };
    };

    CanvasState.flipColor = function (shape) {
      if (shape.fillColor == "#000000") {
        shape.fillColor = "#FFFFFF";
      } else {
        shape.fillColor = "#000000";
      }
    };

    CanvasState.getMirror = function (index, numRows) {
      // Return a given square's mirrored square (across the y-axis)
      if (index === 0) {
        return Math.floor(numRows * (numRows - 1));
      }

      var nOrZero = index % numRows === 0 ? numRows : 0;
      return numRows * numRows - numRows * Math.ceil(index / numRows) + index % numRows - nOrZero;
    };
  }, { "./Square": 2 }], 2: [function (require, module, exports) {
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
  }, {}], 3: [function (require, module, exports) {
    'use strict';

    var _CanvasData = require('./CanvasData');

    var _CanvasData2 = _interopRequireDefault(_CanvasData);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }

    (function () {
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

      var squareDim = canvasDim / numRows; // Set dimensions of the square

      var drawingBoard = new _CanvasData2.default(canvas, numRows, squareDim);
      drawingBoard.createSquares();
      drawingBoard.drawSquares();
    })(); /**
           * Created by Lyle Denman on 5/14/16.
           * With lots of help from: www.simonsarris.com/blog/510-making-html5-canvas-useful
           */
    // import name from './Square';
  }, { "./CanvasData": 1 }] }, {}, [3]);

//# sourceMappingURL=mirrorDraw_browser-compiled.js.map