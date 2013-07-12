///<reference path="board.ts" />
var game;
(function (game) {
    function initialiseState() {
        // The Maze
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
            '     #.##          ##.#     ',
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
            '#o..##.......  .......##..o#',
            '###.##.##.########.##.##.###',
            '###.##.##.########.##.##.###',
            '#......##....##....##......#',
            '#.##########.##.##########.#',
            '#.##########.##.##########.#',
            '#..........................#',
            '############################'
        ];

        // Create the board:
        var theBoard = new board.Board(mazeSource);

        var ghosts = [];
        var hero = {
            top: 23,
            left: theBoard.widthInBlocks / 2,
            upspeed: 0,
            leftspeed: 0x1 / 0x8
        };

        var food = {};
        for (var rowNum = 0; rowNum < mazeSource.length; rowNum++) {
            var row = mazeSource[rowNum];
            for (var colNum = 0; colNum < row.length; colNum++) {
                switch (row[colNum]) {
                    case '.':
                        food['r' + rowNum + 'c' + colNum] = {
                            top: rowNum,
                            left: colNum,
                            value: 10
                        };
                        break;
                    case 'o':
                        food['r' + rowNum + 'c' + colNum] = {
                            top: rowNum,
                            left: colNum,
                            value: 50
                        };
                        break;
                }
            }
        }

        return {
            board: theBoard,
            food: food,
            ghosts: ghosts,
            hero: hero
        };
    }
    game.initialiseState = initialiseState;

    function tick(state, clock) {
        var newPos = {
            left: state.hero.left - state.hero.leftspeed,
            top: state.hero.top - state.hero.upspeed
        };

        var cell = state.board.getCell(state.hero.upspeed > 0 ? Math.floor(newPos.top) : Math.ceil(newPos.top), state.hero.leftspeed > 0 ? Math.floor(newPos.left) : Math.ceil(newPos.left));

        if (cell !== '#') {
            state.hero.left = newPos.left;
            state.hero.top = newPos.top;
        }

        if (state.hero.left <= 0) {
            state.hero.left = state.board.widthInBlocks;
        }
        if (state.hero.left > state.board.widthInBlocks) {
            state.hero.left = 0;
        }
        if (state.hero.top <= 0) {
            state.hero.top = state.board.heightInBlocks;
        }
        if (state.hero.top > state.board.heightInBlocks) {
            state.hero.top = 0;
        }

        return state;
    }
    game.tick = tick;
})(game || (game = {}));
//@ sourceMappingURL=game.js.map
