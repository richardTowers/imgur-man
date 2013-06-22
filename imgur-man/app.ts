///<reference path="lib/fabricjs.d.ts" />
///<reference path="board.ts" />

interface gameState {

	board: board.Board;
	characters: any[];

}

function initialiseState() : gameState {

	// The Maze
	var mazeSource = [
		'############################', '#............##............#', '#o####.#####.##.#####.####o#', '#.####.#####.##.#####.####.#',
		'#.####.#####.##.#####.####.#', '#..........................#', '#.####.##.########.##.####.#', '#.####.##.########.##.####.#',
		'#......##....##....##......#', '######.##### ## #####.######', '     #.##### ## #####.#     ', '     #.##          ##.#     ',
		'     #.## ######## ##.#     ', '######.## #      # ##.######', '      .   #      #   .      ', '######.## #      # ##.######',
		'     #.## ######## ##.#     ', '     #.##          ##.#     ', '     #.## ######## ##.#     ', '######.## ######## ##.######',
		'#............##............#', '#.####.#####.##.#####.####.#', '#.####.#####.##.#####.####.#', '#o..##....... P.......##..o#',
		'###.##.##.########.##.##.###', '###.##.##.########.##.##.###', '#......##....##....##......#', '#.##########.##.##########.#',
		'#.##########.##.##########.#', '#..........................#', '############################'
	];

	// Create the board:
	var theBoard = new board.Board(mazeSource);

	// Create the characters
	var characters = [];

	return {
		board: theBoard,
		characters: characters
	};
}

interface drawingState {
	
	canvas: fabric.ICanvas;
	hero: fabric.IImage;

}

function initializeDrawing(state: gameState) : drawingState {

	// Initialize canvas:
	var canvas = new fabric.StaticCanvas('canvas');

	// Load the background image:
	var mazeImg = <HTMLImageElement>document.getElementById('maze');
	var maze = new fabric.Image(mazeImg, { top: 310, left: 280 });
	canvas.add(maze);

	// Load our hero:
	var heroImg = <HTMLImageElement>document.getElementById('pacmagurian');
	var hero = new fabric.Image(heroImg, { top: 470, left: 280, flipX: true });
	canvas.add(hero);

	return {
		canvas: canvas,
		hero: hero
	};
}

function draw(drawing: drawingState, state: gameState) {

	// Render the canvas:
	drawing.canvas.renderAll();
}


window.onload = () => {

	var gameState = initialiseState();
	
	var drawingState = initializeDrawing(gameState);

	draw(drawingState, gameState);

	var ticker = window.setInterval(() => {
		
		// Calculate the next state:
		gameState = gameState;

		// Update the game
		draw(drawingState, gameState);

	}, 200);
};