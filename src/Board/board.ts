'use strict';

import types = module('../types');

var possibleDirections = [
    new types.Vector( 0,  1), // North
    new types.Vector( 1,  0), // East
    new types.Vector( 0, -1), // South
    new types.Vector(-1,  0)  // West
];

export class Board {

    map : types.Tile[][];
    player : types.ICharacter;
    enemies : types.ICharacter[];

    constructor (map: types.Tile[][], player: types.ICharacter, enemies: types.ICharacter[]) {
            this.map = map;
            this.player = player;
            this.enemies = enemies;
    }

    update () {
        var allowedDirections = this.getAllowedDirections(this.player);

        this.player.move(allowedDirections);

        for (var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i];
            allowedDirections = this.getAllowedDirections(enemy);

            this.enemies[i].move(allowedDirections);
        }
    }

    getAllowedDirections(character: types.ICharacter) : types.Vector[] {

        var boardPosition = this.getBoardPosition(character);

        var directions : types.Vector[] = [];

        for(var i = 0; i < possibleDirections.length; i++) {
            var direction = possibleDirections[i];
            var nextPosition = boardPosition.add(direction);
            var nextTile = this.getTile(nextPosition);

            if(!nextTile.isWall) {
                directions.push(direction);
            }
        }

        return directions;
    }

    getBoardPosition(character: types.ICharacter) : types.Position {
        var xpos = character.position.x / 20;
        var ypos = character.position.y / 20;

        return new types.Position(xpos, ypos);
    }

    private getTile(position : types.Position) : types.Tile {
        return this.map[position.y][position.x];
    }
}