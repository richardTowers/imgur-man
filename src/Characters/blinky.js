var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", '../types'], function(require, exports, __types__) {
    var types = __types__;

    var Blinky = (function (_super) {
        __extends(Blinky, _super);
        function Blinky(currentDirection, position) {
                _super.call(this);
            this.currentDirection = currentDirection;
            this.position = position;
        }
        Blinky.prototype.move = function (allowedDirections, targetTile) {
            var minDistance = 1000000000;
            var direction;

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
        };
        return Blinky;
    })(types.Enemy);
    exports.Blinky = Blinky;    
})

//@ sourceMappingURL=blinky.js.map
