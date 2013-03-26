'use strict';

// Todo: split this module up into smaller modules with the correct dependencies.

export class Vector{
    dx : number;
    dy : number;

    constructor(dx : number, dy : number) {
        this.dx = dx;
        this.dy = dy;
    }
}

export class Position{
    x : number;
    y : number;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector) : Position {
        return new Position(this.x + vector.dx, this.y + vector.dy);
    }

    /**
     * The square of the distance between this position and the target position.
     * No need to root it to get the actual distance since we only need to compare.
     *
     * @param position
     * @returns {number}
     */
    squareDistanceTo(position: Position) {
        var xDist = this.x - position.x;
        var yDist = this.y - position.y;

        return xDist*xDist + yDist*yDist;
    }
}

export interface ICharacter{
    currentDirection : Vector;
    position : Position;
}

export class Player implements ICharacter {
    move(allowedDirections: Vector[]) : void { throw 'Method is abstract.'; }
    currentDirection : Vector;
    position : Position;
}

export class Enemy implements ICharacter {
    move(allowedDirections: Vector[], target: Position) : void { throw 'Method is abstract.'; }
    currentDirection : Vector;
    position : Position;
}

export class Tile {
    isWall : bool;
    containsFood : bool;

    constructor(isWall : bool, containsFood : bool) {
        this.isWall = isWall;
        this.containsFood = containsFood;
    }
}