define(["require", "exports", '../types'], function(require, exports, __types__) {
    'use strict';
    var types = __types__;

    var possibleDirections = [
        new types.Vector(0, 1), 
        new types.Vector(1, 0), 
        new types.Vector(0, -1), 
        new types.Vector(-1, 0)
    ];
    var Board = (function () {
        function Board(map, scale, player, enemies) {
            this.map = map;
            this.height = map.length;
            if(this.height < 1) {
                throw 'Cannot build a Board with an empty map.';
            }
            this.width = map[0].length;
            if(this.width < 1) {
                throw 'Cannot build a Board with an empty map.';
            }
            this.scale = scale;
            this.player = player;
            this.enemies = enemies;
        }
        Board.prototype.update = function () {
            var allowedDirections = this.getAllowedDirections(this.player);
            this.player.move(allowedDirections);
            for(var i = 0; i < this.enemies.length; i++) {
                var enemy = this.enemies[i];
                allowedDirections = this.getAllowedDirections(enemy);
                this.enemies[i].move(allowedDirections, this.player.position);
            }
        };
        Board.prototype.getAllowedDirections = function (character) {
            var boardPosition = this.convertFromAbsoluteToBoardPosition(character.position);
            var directions = [];
            for(var i = 0; i < possibleDirections.length; i++) {
                var direction = possibleDirections[i];
                var nextPosition = boardPosition.add(direction);
                nextPosition = this.wrapOutOfBoundsPosition(nextPosition);
                var nextTile = this.getTile(nextPosition);
                if(!nextTile.isWall) {
                    directions.push(direction);
                }
            }
            return directions;
        };
        Board.prototype.wrapOutOfBoundsPosition = function (position) {
            var xPos = this.wrap(position.x, this.width);
            var yPos = this.wrap(position.y, this.height);
            return new types.Position(xPos, yPos);
        };
        Board.prototype.wrap = function (value, limit) {
            if(value < 0) {
                return limit - 1;
            } else {
                if(value >= limit) {
                    return 0;
                } else {
                    return value;
                }
            }
        };
        Board.prototype.convertFromAbsoluteToBoardPosition = function (position) {
            var xPos = Math.floor((position.x / this.scale) + 0.5);
            var yPos = Math.floor((position.y / this.scale) + 0.5);
            return new types.Position(xPos, yPos);
        };
        Board.prototype.getTile = function (position) {
            return this.map[position.y][position.x];
        };
        return Board;
    })();
    exports.Board = Board;    
})

//@ sourceMappingURL=board.js.map
