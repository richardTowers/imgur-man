///<reference path="qunit/qunit.d.ts"/>

'use strict';

import types = module ('../src/types');
import board = module('../src/Board/board');
import mapBuilder = module('../src/Board/mapBuilder');

QUnit.module('Board');

class MockCharacter implements types.ICharacter {

    constructor() {
        this.position = new types.Position(0,0);
    }

    move(allowedDirections: types.Vector[]){
        this.moved = true;
    }
    currentDirection : types.Vector;
    position : types.Position;

    moved : bool = false;

}

QUnit.test(
    'When update is called `move` should be called on each of the characters.',
    (assert) => {

        var map = mapBuilder.buildMap([
            '###',
            '#.#',
            '###'
        ]);

        var player = new MockCharacter();
        var enemies = [
            new MockCharacter(),
            new MockCharacter(),
            new MockCharacter(),
            new MockCharacter()
        ];

        var testBoard = new board.Board(map, 20, player, enemies);

        testBoard.update();

        assert.ok(player.moved, 'Player should have moved');
        assert.ok(
            enemies[0].moved &&
            enemies[1].moved &&
            enemies[2].moved &&
            enemies[3].moved,
            'All the enemies should have moved.'
        );

    }
);

QUnit.test(
    'When the player is on the same tile as some food, the player should eat the food.',
    (assert) => {

        assert.equal(1, 2);

    }
);

QUnit.test(
    'When the player is on the same tile as an enemy in normal game state, the player should die.',
    (assert) => {

        assert.equal(1, 2);

    }
);


QUnit.test(
    'When the player is on the same tile as an enemy in powerup game state, the enemy should die.',
    (assert) => {

        assert.equal(1, 2);

    }
);