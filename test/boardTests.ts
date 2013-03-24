///<reference path="qunit/qunit.d.ts"/>

(function () {
    'use strict';

    QUnit.module('Board');

    QUnit.test(
        'When update is called `move` should be called on each of the characters.',
        (assert) => {

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


}) ();