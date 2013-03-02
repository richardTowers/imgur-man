///<reference path="fabricjs.d.ts"/>

// *********** Types ***********

module Pacmagurian {

	// Let's go with a 22px by 22px grid.
	var xScale = 22;
	var yScale = 22;

	export class Factory {

		createGame(board : string[]): Game {

			// Get the board size
			var heightInBlocks = board.length;
    		var widthInBlocks = board[0].length;



			return new Game(null, [], []);

		}

	}

	class Game {

		private maze: Maze;
		private foods: Food[];
		private characters: Character[];

		constructor(
			maze: Maze,
			foods: Food[],
			characters: Character[])
		{
			this.maze = maze;
			this.foods = foods;
			this.characters = characters;
		}
	}

	class Position {

		row : number;
		column : number;

		constructor(row: number, column: number) {
			this.row = row;
			this.column = column;
		}

	}

	class Maze {

		private cells: bool[][];

		isWall(position: Position): bool {
			return this.cells[position.row][position.column];
		}

	}

	class Item {

		position : Position;

		constructor(position: Position) {
			this.position = position;
		}
	}

	class Food extends Item {

	}

	class Character extends Item {

	}

	class Player extends Character {

	}
}

// *********** MAIN ***********

(function () {
	'use strict';

	var board = [
        '|--------------------------|',
        '|............||............|',
        '|o----.-----.||.----.-----o|',
        '|.----.-----.||.----.-----.|',
        '|..........................|',
        '|.----.||.---||---.||.----.|',
        '|.----.||.---||---.||.----.|',
        '|......||....||....||......|',
        '|----|.||--- || ---||.|----|',
        '     |.||--- || ---||.|     ',
        '     |.||     T    ||.|     ',
        '|----|.|| -------- ||.|----|',
        '      .   | eee  |   .      ',
        '|----|.|| -------- ||.|----|',
        '     |.||          ||.|     ',
        '     |.|| -------- ||.|     ',
        '|----|.|| -------- ||.|----|',
        '|............||............|',
        '|.---|.-----.||.-----.|---.|',
        '|.--||.-----.||.-----.||--.|',
        '|o..||........P.......||..o|',
        '|--.||.||.--------.||.||.--|',
        '|--.||.||.--------.||.||.--|',
        '|......||....||....||......|',
        '|.----------.||.----------.|',
        '|.----------.||.----------.|',
        '|..........................|',
        '|--------------------------|'
    ];

	var factory = new Pacmagurian.Factory();

	factory.createGame(board);

    var heightInBlocks = board.length;
    var widthInBlocks = board[0].length;

    // Let's go with a 20px by 20px grid.
    var xScale = 22;
    var yScale = 22;

    var height = heightInBlocks * yScale;
    var width = widthInBlocks * xScale;

	// Initialize canvas:
	var canvas = new fabric.StaticCanvas('canvas', { backgroundColor: '#222' });
	canvas.setWidth(width);
	canvas.setHeight(height);

	// Loop through the rows and draw the board.
	var row;
	var column;
	for(row = 0; row < heightInBlocks; row++) {
		for(column = 0; column < widthInBlocks; column++) {
			var pacmagurian;
			switch(board[row][column]) {
				case '|':
				case '-':
					canvas.add(new fabric.Rect({
						strokeWidth: 5,
						stroke: '#222',
						width: xScale, 
						height: yScale, 
						top: yScale/2 + row * yScale, 
						left: xScale/2 + column * xScale, 
						fill: '#800080' }));
					break;
				case '.':
				case 'o':
					canvas.add(new fabric.Circle({ 
						radius: 4, 
						top: yScale/2 + row*yScale, 
						left: xScale/2 + column * xScale, 
						fill: '#0f0' }));
					break;
				case 'P':
					fabric.Image.fromURL(
						'img/opt/pacmagurian-open.png',
						function(oImg) {
							pacmagurian = oImg;
						  	canvas.add(oImg);
						}, { 
							flipX: true, 
							top: yScale/2 + row*yScale, 
							left: xScale/2 + column * xScale
						}
					);
					break;
			}
		}
	}

	var tick = widthInBlocks / 2;
	var interval = window.setInterval(function () {
		pacmagurian.set('left', xScale/2 + tick * xScale);
		canvas.renderAll();
		tick--;
		if(tick < 6) { window.clearInterval(interval); }
	}, 200);

	canvas.renderAll();
})();