define(["require", "exports", '../src/types', '../src/Board/board', '../src/Board/mapBuilder'], function(require, exports, __types__, __board__, __mapBuilder__) {
    'use strict';
    var types = __types__;

    var board = __board__;

    var mapBuilder = __mapBuilder__;

    QUnit.module('Board');
    var MockCharacter = (function () {
        function MockCharacter(xPos, yPos) {
            this.position = new types.Position(xPos, yPos);
        }
        MockCharacter.prototype.move = function (allowedDirections) {
        };
        return MockCharacter;
    })();    
    QUnit.test('When update is called `move` should be called on each of the characters.', function (assert) {
        var map = mapBuilder.buildMap([
            '###', 
            '#.#', 
            '###'
        ]);
        var player = new MockCharacter(1, 1);
        var spyPlayer = sinon.spy(player, 'move');
        var enemies = [
            new MockCharacter(1, 1), 
            new MockCharacter(1, 1), 
            new MockCharacter(1, 1), 
            new MockCharacter(1, 1)
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
        assert.ok(spyEnemies.every(function (x) {
            return x.calledOnce;
        }), 'All enemies should have moved.');
    });
})

//@ sourceMappingURL=boardTests.js.map
