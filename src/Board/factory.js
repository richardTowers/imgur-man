define(["require", "exports", '../types', '../Characters/blinky', 'mapBuilder', 'board'], function(require, exports, __types__, __blinky__, __mapBuilder__, __board__) {
    'use strict';
    var types = __types__;

    var blinky = __blinky__;

    var mapBuilder = __mapBuilder__;

    var board = __board__;

    function buildMap() {
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
    function buildPlayer() {
        return new types.Player();
    }
    function buildEnemies() {
        return [
            new blinky.Blinky()
        ];
    }
    function buildBoard() {
        var map = buildMap();
        var player = buildPlayer();
        var enemies = buildEnemies();
        return new board.Board(map, 20, player, enemies);
    }
    exports.buildBoard = buildBoard;
})

//@ sourceMappingURL=factory.js.map
