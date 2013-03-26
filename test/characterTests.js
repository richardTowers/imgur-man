define(["require", "exports", '../src/types', '../src/Characters/blinky'], function(require, exports, __types__, __blinky__) {
    'use strict';
    var types = __types__;

    
    var blinky = __blinky__;

    QUnit.module('Characters');
    QUnit.test('Blinky should pick the direction that brings it closest to the target tile', function (assert) {
        var targetPosition = new types.Position(10, 0);
        var characterPosition = new types.Position(0, 0);
        var currentDirection = new types.Vector(-1, 0);
        var directions = [
            new types.Vector(-1, 0), 
            new types.Vector(1, 0), 
            new types.Vector(0, -1), 
            new types.Vector(0, 1)
        ];
        var character = new blinky.Blinky(currentDirection, characterPosition);
        character.move(directions, targetPosition);
        assert.ok(character.position.x > 0, 'Blinky should have moved east.');
        assert.ok(character.position.y === 0, 'Blinky should not have moved north or south.');
    });
})

//@ sourceMappingURL=characterTests.js.map
