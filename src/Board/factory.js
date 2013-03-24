define(["require", "exports", 'mapBuilder', 'board'], function(require, exports, __mapBuilder__, __board__) {
    'use strict';
    
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
        return {
        };
    }
    function buildEnemies() {
        return [];
    }
    function buildBoard() {
        var map = buildMap();
        var player = buildPlayer();
        var enemies = buildEnemies();
        return new board.Board(map, player, enemies);
    }
    exports.buildBoard = buildBoard;
})

//@ sourceMappingURL=factory.js.map
