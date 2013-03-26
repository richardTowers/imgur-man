///<reference path="lib/qunit.d.ts"/>

'use strict';

import types = module ('../src/types');
import board = module('../src/Board/board');
import blinky = module('../src/Characters/blinky');

QUnit.module('Characters');

QUnit.test(
    'Blinky should pick the direction that brings it closest to the target tile',
    (assert) => {

        var targetPosition = new types.Position(10,0);

        var characterPosition = new types.Position(0,0);
        var currentDirection = new types.Vector(-1, 0);

        var directions = [
            new types.Vector(-1, 0),
            new types.Vector( 1, 0),
            new types.Vector( 0,-1),
            new types.Vector( 0, 1)
        ];

        var character = new blinky.Blinky(currentDirection, characterPosition);

        character.move(directions, targetPosition);

        assert.ok(character.position.x > 0, 'Blinky should have moved east.');
        assert.ok(character.position.y === 0, 'Blinky should not have moved north or south.');
    }
);