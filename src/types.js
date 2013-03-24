define(["require", "exports"], function(require, exports) {
    'use strict';
    var Vector = (function () {
        function Vector(dx, dy) {
            this.dx = dx;
            this.dy = dy;
        }
        return Vector;
    })();
    exports.Vector = Vector;    
    var Position = (function () {
        function Position(x, y) {
            this.x = x;
            this.y = y;
        }
        Position.prototype.add = function (vector) {
            return new Position(this.x + vector.dx, this.y + vector.dy);
        };
        return Position;
    })();
    exports.Position = Position;    
    var Tile = (function () {
        function Tile(isWall, containsFood, occupants) {
            this.isWall = isWall;
            this.containsFood = containsFood;
            this.occupants = occupants;
        }
        return Tile;
    })();
    exports.Tile = Tile;    
})

//@ sourceMappingURL=types.js.map