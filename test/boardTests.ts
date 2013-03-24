///<reference path="qunit/qunit.d.ts"/>

'use strict';

import types = module ('../src/types');
import board = module('../src/Board/board');
import mapBuilder = module('../src/Board/mapBuilder');

QUnit.module('Board');

QUnit.test(
    'When update is called `move` should be called on each of the characters.',
    (assert) => {

        var map = mapBuilder.buildMap([
            '###',
            '#.#',
            '###'
        ]);

        var player = <types.ICharacter>{};
        var enemies = [
            <types.ICharacter>{},
            <types.ICharacter>{},
            <types.ICharacter>{},
            <types.ICharacter>{}
        ];

        var testBoard = new board.Board(map, player, enemies);

        testBoard.update();

        assert.equal(1, 2);

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