///<reference path="lib/qunit.d.ts"/>
///<reference path="lib/sinon.d.ts"/>

'use strict';

import types = module ('../src/types');
import board = module('../src/Board/board');
import mapBuilder = module('../src/Board/mapBuilder');

class MockPlayer extends types.Player {
    constructor(xPos: number, yPos: number) {
        super();
        this.position = new types.Position(xPos, yPos);
    }
    move(allowedDirections: types.Vector[]) : void { }
}
class MockEnemy extends types.Enemy {
    constructor(xPos: number, yPos: number) {
        super();
        this.position = new types.Position(xPos, yPos);
    }
    move(allowedDirections: types.Vector[], target: types.Position) : void { }
}

QUnit.module('Board');

QUnit.test(
    'When update is called `move` should be called on each of the characters.',
    (assert) => {

        var map = mapBuilder.buildMap([
            '###',
            '#.#',
            '###'
        ]);

        // Create a player on the middle tile:
        var player = new MockPlayer(1,1);
        var spyPlayer = sinon.spy(player, 'move');

        // Stick four enemies on the middle tile:
        var enemies = [[1,1],[1,1],[1,1],[1,1]].map(x => new MockEnemy(x[0], x[1]));
        var spyEnemies = enemies.map(x => sinon.spy(x, 'move'));

        var testBoard = new board.Board(map, 20, player, enemies);

        testBoard.update();

        assert.ok(spyPlayer.calledOnce, 'Player should have moved.');
        assert.ok(spyEnemies.every(x => x.calledOnce), 'All enemies should have moved.');
    }
);