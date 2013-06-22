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

    var scale = function (x) {
        return 10 + x * 20;
    };

    var ghosts = [];
    var hero = { top: 470, left: 280 };

    var food = [];
    for (var rowNum = 0; rowNum < mazeSource.length; rowNum++) {
        var row = mazeSource[rowNum];
        for (var colNum = 0; colNum < row.length; colNum++) {
            switch (row[colNum]) {
                case '.':
                    food.push({
                        top: scale(rowNum),
                        left: scale(colNum),
                        value: 10
                    });
                    break;
                case 'o':
                    food.push({
                        top: scale(rowNum),
                        left: scale(colNum),
                        value: 50
                    });
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

    // Load our hero:
    var heroImg = document.getElementById('pacmagurian');
    var hero = new fabric.Image(heroImg, {
        top: state.hero.top,
        left: state.hero.left,
        flipX: true
    });
    canvas.add(hero);

    var food = state.food.map(function (x) {
        return new fabric.Circle({
            top: x.top,
            left: x.left,
            radius: 5,
            fill: '#0f0'
        });
    });

    food.forEach(function (x) {
        return canvas.add(x);
    });

    return {
        canvas: canvas,
        hero: hero,
        food: food
    };
}

function draw(drawing, state) {
    // Render the canvas:
    drawing.canvas.renderAll();
}

(function () {
    var width = 560;
    var height = 620;

    window.onload = function () {
        var gameState = initialiseState();
        var drawingState = initialiseDrawing(width, height, gameState);

        draw(drawingState, gameState);
    };
})();
//@ sourceMappingURL=app.js.map
