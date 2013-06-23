///<reference path="lib/fabricjs.d.ts" />
///<reference path="board.ts" />


interface gameState {
	board: board.Board;
	hero: any;
	ghosts: any[];
	food: any[];
}

interface drawingState {
	canvas: fabric.ICanvas;
	hero: fabric.IImage;
	food: any[];
}

function initialiseState() : gameState {

	// The Maze
	var mazeSource = [
		'############################', '#............##............#', '#o####.#####.##.#####.####o#', '#.####.#####.##.#####.####.#',
		'#.####.#####.##.#####.####.#', '#..........................#', '#.####.##.########.##.####.#', '#.####.##.########.##.####.#',
		'#......##....##....##......#', '######.##### ## #####.######', '     #.##### ## #####.#     ', '     #.##          ##.#     ',
		'     #.## ######## ##.#     ', '######.## #      # ##.######', '      .   #      #   .      ', '######.## #      # ##.######',
		'     #.## ######## ##.#     ', '     #.##          ##.#     ', '     #.## ######## ##.#     ', '######.## ######## ##.######',
		'#............##............#', '#.####.#####.##.#####.####.#', '#.####.#####.##.#####.####.#', '#o..##.......  .......##..o#',
		'###.##.##.########.##.##.###', '###.##.##.########.##.##.###', '#......##....##....##......#', '#.##########.##.##########.#',
		'#.##########.##.##########.#', '#..........................#', '############################'
	];

	// Create the board:
	var theBoard = new board.Board(mazeSource);

	var ghosts = [];
	var hero = { top: 23, left: 13.5 };

	var food = [];
	for (var rowNum = 0; rowNum < mazeSource.length; rowNum++) {
		var row = mazeSource[rowNum];
		for (var colNum = 0; colNum < row.length; colNum++) {
			switch (row[colNum]) {
				case '.':
					food.push({
						top: rowNum,
						left: colNum,
						value: 10
					});
					break;
				case 'o':
					food.push({
						top: rowNum,
						left: colNum,
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

function initialiseDrawing(width: number, height: number, state: gameState) : drawingState {

	// Initialize canvas:
	var canvas = new fabric.StaticCanvas('canvas');

	// Load the background image:
	var mazeImg = <HTMLImageElement>document.getElementById('maze');
	var maze = new fabric.Image(
		mazeImg, {
			top: height / 2,
			left: width / 2
		});
	canvas.add(maze);

	var scale = x => 10 + x * 20;

	// Load our hero:
	var heroImg = <HTMLImageElement>document.getElementById('pacmagurian');
	var hero = new fabric.Image(
		heroImg, {
			top: scale(state.hero.top),
			left: scale(state.hero.left),
			flipX: true
		});
	canvas.add(hero);

	var food = state.food.map(x => new fabric.Circle({
		top: scale(x.top),
		left: scale(x.left),
		radius: 5,
		fill: '#0f0'
	}));

	food.forEach(x => canvas.add(x));

	return {
		canvas: canvas,
		hero: hero,
		food: food
	};
}

function draw(drawing: drawingState, state: gameState) {
	// Render the canvas:
	drawing.canvas.renderAll();
}

(function main () {

	var width = 560;
	var height = 620;

	window.onload = () => {
		var gameState = initialiseState();
		var drawingState = initialiseDrawing(width, height, gameState);

		draw(drawingState, gameState);
	};

})();