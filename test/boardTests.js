define(["require", "exports", '../src/types', '../src/Board/board', '../src/Board/mapBuilder'], function(require, exports, __types__, __board__, __mapBuilder__) {
    'use strict';
    var types = __types__;

    var board = __board__;

    var mapBuilder = __mapBuilder__;

    QUnit.module('Board');
    var MockCharacter = (function () {
        function MockCharacter() {
            this.moved = false;
            this.position = new types.Position(0, 0);
        }
        MockCharacter.prototype.move = function (allowedDirections) {
            this.moved = true;
        };
        return MockCharacter;
    })();    
    QUnit.test('When update is called `move` should be called on each of the characters.', function (assert) {
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
        assert.ok(enemies[0].moved && enemies[1].moved && enemies[2].moved && enemies[3].moved, 'All the enemies should have moved.');
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
