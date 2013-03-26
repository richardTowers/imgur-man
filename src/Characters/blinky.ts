import types = module('../types');

export class Blinky extends types.Enemy {

    currentDirection : types.Vector;
    position : types.Position;

    constructor (currentDirection : types.Vector, position : types.Position) {
        super();
        this.currentDirection = currentDirection;
        this.position = position;
    }

    /**
     * Blinky should pick the direction that brings it closest to the target tile
     *
     * @param allowedDirections
     * @param targetTile
     */
    move(allowedDirections : types.Vector[], targetTile : types.Position) : void {

        var minDistance = 1e9, direction;
        for(var i = 0; i < allowedDirections.length; i++) {

            var candidateDirection = allowedDirections[i];

            var newPosition = this.position.add(candidateDirection);

            var distance = newPosition.squareDistanceTo(targetTile);

            if(distance < minDistance) {
                minDistance = distance;
                direction = candidateDirection;
            }

        }

        this.position = this.position.add(direction);
    }
}