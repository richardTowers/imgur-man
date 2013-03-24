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
        function Board(map, player, enemies) {
            this.map = map;
            this.player = player;
            this.enemies = enemies;
        }
        Board.prototype.update = function () {
            var allowedDirections = this.getAllowedDirections(this.player);
            this.player.move(allowedDirections);
            for(var i = 0; i < this.enemies.length; i++) {
                var enemy = this.enemies[i];
                allowedDirections = this.getAllowedDirections(enemy);
                this.enemies[i].move(allowedDirections);
            }
        };
        Board.prototype.getAllowedDirections = function (character) {
            var boardPosition = this.getBoardPosition(character);
            var directions = [];
            for(var i = 0; i < possibleDirections.length; i++) {
                var direction = possibleDirections[i];
                var nextPosition = boardPosition.add(direction);
                var nextTile = this.getTile(nextPosition);
                if(!nextTile.isWall) {
                    directions.push(direction);
                }
            }
            return directions;
        };
        Board.prototype.getBoardPosition = function (character) {
            var xpos = character.position.x / 20;
            var ypos = character.position.y / 20;
            return new types.Position(xpos, ypos);
        };
        Board.prototype.getTile = function (position) {
            return this.map[position.y][position.x];
        };
        return Board;
    })();
    exports.Board = Board;    
})

//@ sourceMappingURL=board.js.map
