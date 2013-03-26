///<reference path="lib/qunit.d.ts"/>

'use strict';

import types = module ('../src/types');
import board = module('../src/Board/board');
import mapBuilder = module('../src/Board/mapBuilder');

QUnit.module('Map Builder');

QUnit.test(
    'Should build a properly typed map from the source string.',
    (assert) => {

        var map = mapBuilder.buildMap([
            '####',
            '#. #',
            '####'
        ]);

        assert.equal(map.length, 3, 'Expected three rows.');
        assert.equal(map[0].length, 4, 'Expected four columns.');
        assert.ok(map[0][0].isWall, 'Top left cell should be wall.');
        assert.ok(map[2][3].isWall, 'Bottom right cell should be wall.');
        assert.ok(!map[1][1].isWall, 'Left middle cell should not be wall.');
        assert.ok(map[1][1].containsFood, 'Left middle cell should contain food.');
        assert.ok(!map[2][1].containsFood, 'Right middle cell should not contain food.');
    }
);