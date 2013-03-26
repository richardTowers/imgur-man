var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", '../src/types', '../src/Board/board', '../src/Board/mapBuilder'], function(require, exports, __types__, __board__, __mapBuilder__) {
    'use strict';
    var types = __types__;

    var board = __board__;

    var mapBuilder = __mapBuilder__;

    var MockPlayer = (function (_super) {
        __extends(MockPlayer, _super);
        function MockPlayer(xPos, yPos) {
                _super.call(this);
            this.position = new types.Position(xPos, yPos);
        }
        MockPlayer.prototype.move = function (allowedDirections) {
        };
        return MockPlayer;
    })(types.Player);    
    var MockEnemy = (function (_super) {
        __extends(MockEnemy, _super);
        function MockEnemy(xPos, yPos) {
                _super.call(this);
            this.position = new types.Position(xPos, yPos);
        }
        MockEnemy.prototype.move = function (allowedDirections, target) {
        };
        return MockEnemy;
    })(types.Enemy);    
    QUnit.module('Board');
    QUnit.test('When update is called `move` should be called on each of the characters.', function (assert) {
        var map = mapBuilder.buildMap([
            '###', 
            '#.#', 
            '###'
        ]);
        var player = new MockPlayer(1, 1);
        var spyPlayer = sinon.spy(player, 'move');
        var enemies = [
            [
                1, 
                1
            ], 
            [
                1, 
                1
            ], 
            [
                1, 
                1
            ], 
            [
                1, 
                1
            ]
        ].map(function (x) {
            return new MockEnemy(x[0], x[1]);
        });
        var spyEnemies = enemies.map(function (x) {
            return sinon.spy(x, 'move');
        });
        var testBoard = new board.Board(map, 20, player, enemies);
        testBoard.update();
        assert.ok(spyPlayer.calledOnce, 'Player should have moved.');
        assert.ok(spyEnemies.every(function (x) {
            return x.calledOnce;
        }), 'All enemies should have moved.');
    });
})

//@ sourceMappingURL=boardTests.js.map
