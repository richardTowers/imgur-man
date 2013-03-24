define(["require", "exports", '../src/Board/board', '../src/Board/mapBuilder'], function(require, exports, __board__, __mapBuilder__) {
    'use strict';
    
    var board = __board__;

    var mapBuilder = __mapBuilder__;

    QUnit.module('Board');
    QUnit.test('When update is called `move` should be called on each of the characters.', function (assert) {
        var map = mapBuilder.buildMap([
            '###', 
            '#.#', 
            '###'
        ]);
        var player = {
        };
        var enemies = [
            {
            }, 
            {
            }, 
            {
            }, 
            {
            }
        ];
        var testBoard = new board.Board(map, player, enemies);
        testBoard.update();
        assert.equal(1, 2);
    });
    QUnit.test('When the player is on the same tile as some food, the player should eat the food.', function (assert) {
        assert.equal(1, 2);
    });
    QUnit.test('When the player is on the same tile as an enemy in normal game state, the player should die.', function (assert) {
        assert.equal(1, 2);
    });
    QUnit.test('When the player is on the same tile as an enemy in powerup game state, the enemy should die.', function (assert) {
        assert.equal(1, 2);
    });
})

//@ sourceMappingURL=boardTests.js.map
