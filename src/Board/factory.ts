'use strict';

import types = module('../types');
import blinky = module('../Characters/blinky');
import mapBuilder = module('mapBuilder');
import board = module('board');

function buildMap() : types.Tile[][] {

    var mazeSource = [
        '############################',
        '#............##............#',
        '#o####.#####.##.#####.####o#',
        '#.####.#####.##.#####.####.#',
        '#.####.#####.##.#####.####.#',
        '#..........................#',
        '#.####.##.########.##.####.#',
        '#.####.##.########.##.####.#',
        '#......##....##....##......#',
        '######.##### ## #####.######',
        '     #.##### ## #####.#     ',
        '     #.##     T    ##.#     ',
        '     #.## ######## ##.#     ',
        '######.## #      # ##.######',
        '      .   #      #   .      ',
        '######.## #      # ##.######',
        '     #.## ######## ##.#     ',
        '     #.##          ##.#     ',
        '     #.## ######## ##.#     ',
        '######.## ######## ##.######',
        '#............##............#',
        '#.####.#####.##.#####.####.#',
        '#.####.#####.##.#####.####.#',
        '#o..##....... P.......##..o#',
        '###.##.##.########.##.##.###',
        '###.##.##.########.##.##.###',
        '#......##....##....##......#',
        '#.##########.##.##########.#',
        '#.##########.##.##########.#',
        '#..........................#',
        '############################'
    ];

    return mapBuilder.buildMap(mazeSource);
}

function buildPlayer() : types.Player {
    return new types.Player();
}

function buildEnemies() : types.Enemy[] {
    return [
        new blinky.Blinky()
    ];
}


export function buildBoard() : board.Board {
    var map = buildMap();
    var player = buildPlayer();
    var enemies = buildEnemies();

    return new board.Board(map, 20, player, enemies);
}