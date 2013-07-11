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
    var hero = { top: 23, left: 13.5 };

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

function scale(input) {
    return 10 + input * 20;
}

function initialiseDrawing(width, height, state) {
    // Initialize canvas:
    var canvas = new fabric.StaticCanvas('canvas');

    // Load the background image:
    var mazeImg = document.getElementById('maze');
    var maze = new fabric.Image(mazeImg, {
        top: height / 2,
        left: width / 2
    });
    canvas.add(maze);

    var food = Object.keys(state.food).map(function (x) {
        var foodItem = state.food[x];
        return new fabric.Circle({
            top: scale(foodItem.top),
            left: scale(foodItem.left),
            radius: 5,
            fill: '#0f0'
        });
    });

    food.forEach(function (x) {
        return canvas.add(x);
    });

    // Load our hero:
    var heroImg = document.getElementById('pacmagurian');
    var hero = new fabric.Image(heroImg, { flipX: true });
    canvas.add(hero);

    return {
        canvas: canvas,
        hero: hero,
        food: food
    };
}

function tick(state, clock) {
    state.hero.left -= 0.125;

    if (state.hero.left <= 0) {
        state.hero.left = 27;
    }

    return state;
}

function draw(drawing, state) {
    drawing.hero.left = scale(state.hero.left);
    drawing.hero.top = scale(state.hero.top);

    // Render the canvas:
    drawing.canvas.renderAll();

    return drawing;
}

(function main() {
    var width = 560;
    var height = 620;

    var clock = 0;

    window.onload = function () {
        var gameState = initialiseState();
        var drawingState = initialiseDrawing(width, height, gameState);

        var update = function () {
            gameState = tick(gameState, clock++);
            drawingState = draw(drawingState, gameState);
        };

        window.setInterval(update, 25);
    };
})();
//@ sourceMappingURL=app.js.map
