///<reference path="lib/qunit.d.ts"/>
///<reference path="lib/sinon.d.ts"/>

'use strict';

import types = module ('../src/types');
import board = module('../src/Board/board');
import mapBuilder = module('../src/Board/mapBuilder');

QUnit.module('Board');

class MockCharacter implements types.ICharacter {
    constructor(xPos: number, yPos: number) {
        this.position = new types.Position(xPos, yPos);
    }
    move(allowedDirections: types.Vector[]) { }
    currentDirection : types.Vector;
    position : types.Position;
}

QUnit.test(
    'When update is called `move` should be called on each of the characters.',
    (assert) => {

        var map = mapBuilder.buildMap([
            '###',
            '#.#',
            '###'
        ]);

        var player = new MockCharacter(1,1);
        var spyPlayer = sinon.spy(player, 'move');
        var enemies = [
            new MockCharacter(1,1),
            new MockCharacter(1,1),
            new MockCharacter(1,1),
            new MockCharacter(1,1)
        ];
        var spyEnemies = [
            sinon.spy(enemies[0], 'move'),
            sinon.spy(enemies[1], 'move'),
            sinon.spy(enemies[2], 'move'),
            sinon.spy(enemies[3], 'move')
        ];

        var testBoard = new board.Board(map, 20, player, enemies);

        testBoard.update();

        assert.ok(spyPlayer.calledOnce, 'Player should have moved.');
        assert.ok(spyEnemies.every(x => x.calledOnce), 'All enemies should have moved.');
    }
);