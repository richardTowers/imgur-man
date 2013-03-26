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
        Position.prototype.squareDistanceTo = function (position) {
            var xDist = this.x - position.x;
            var yDist = this.y - position.y;
            return xDist * xDist + yDist * yDist;
        };
        return Position;
    })();
    exports.Position = Position;    
    var Player = (function () {
        function Player() { }
        Player.prototype.move = function (allowedDirections) {
            throw 'Method is abstract.';
        };
        return Player;
    })();
    exports.Player = Player;    
    var Enemy = (function () {
        function Enemy() { }
        Enemy.prototype.move = function (allowedDirections, target) {
            throw 'Method is abstract.';
        };
        return Enemy;
    })();
    exports.Enemy = Enemy;    
    var Tile = (function () {
        function Tile(isWall, containsFood) {
            this.isWall = isWall;
            this.containsFood = containsFood;
        }
        return Tile;
    })();
    exports.Tile = Tile;    
})

//@ sourceMappingURL=types.js.map
