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
}

export interface ICharacter{
    move(allowedDirections: Vector[]);
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