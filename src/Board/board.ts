'use strict';

import types = module('../types');

var possibleDirections = [
    new types.Vector( 0,  1), // North
    new types.Vector( 1,  0), // East
    new types.Vector( 0, -1), // South
    new types.Vector(-1,  0)  // West
];

/**
 * Holds information about the locations of the characters, the walls and the food.
 */
export class Board {

    map : types.Tile[][];
    width : number;
    height : number;
    scale : number;
    player : types.Player;
    enemies : types.Enemy[];

    constructor (
        map: types.Tile[][],
        scale: number,
        player: types.Player,
        enemies: types.Enemy[]) {

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

    /**
     * Move all the characters and handle any collisions.
     */
    update () {
        var allowedDirections = this.getAllowedDirections(this.player);

        this.player.move(allowedDirections);

        for (var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i];
            allowedDirections = this.getAllowedDirections(enemy);

            this.enemies[i].move(allowedDirections, this.player.position);
        }
    }

    /**
     * Get an array of vectors representing the directions a character can move in without
     * colliding with a wall.
     *
     * @param character
     * @returns {types.Vector[]}
     */
    private getAllowedDirections(character: types.ICharacter) : types.Vector[] {

        var boardPosition = this.convertFromAbsoluteToBoardPosition(character.position);

        var directions : types.Vector[] = [];

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
    }

    /**
     * Wraps a position so that it is in the allowed range.
     *
     * @param position
     * @returns {Position}
     */
    private wrapOutOfBoundsPosition(position : types.Position) : types.Position {
        var xPos : number = this.wrap(position.x, this.width);
        var yPos : number = this.wrap(position.y, this.height);
        return new types.Position(xPos, yPos);
    }

    /**
     * Returns a value between 0 and `limit` by wrapping any values less than `0`
     * to `limit - 1` and any values greater than or equal to `limit` to `0`.
     *
     * @param value
     * @param limit
     * @returns {number}
     */
    private wrap(value : number, limit : number) {
        if(value < 0) { return limit - 1; }
        else if (value >= limit) { return 0; }
        else { return value;}
    }

    /**
     * Scales a position for its absolute value (in pixels) to the index of a tile in the map.
     * @param position
     * @returns {Position}
     */
    private convertFromAbsoluteToBoardPosition(position : types.Position) : types.Position {
        var xPos : number = Math.floor((position.x / this.scale) + 0.5);
        var yPos : number = Math.floor((position.y / this.scale) + 0.5);

        return new types.Position(xPos, yPos);
    }

    private getTile(position : types.Position) : types.Tile {
        return this.map[position.y][position.x];
    }
}