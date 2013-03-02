///<reference path="fabricjs.d.ts"/>

module Pacmagurian {
	'use strict';

	// Let's go with a 20px by 20px grid.
	// Todo: perhaps we should calculate the scale based on the size of the user's screen?
	var scale = 20;
	var offset = scale / 2;

	// Dark grey background
	var backgroundColor = '#222';

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

	enum Cell {
		Empty,
		Wall,
		Food,
		Powerup,
		Enemy,
		Tard,
		Player,
	}

	class Board {

		private source : string[];

		heightInBlocks : number;
		widthInBlocks : number;

		constructor(source : string[]) {
			this.source = source;

			this.heightInBlocks = source.length;
			this.widthInBlocks = source[0].length;
		}

		getCell(row : number, column : number) : Cell {
			var cell = this.source[row][column];
			switch(cell) {
				case ' ': return Cell.Empty;
				case '#': return Cell.Wall;
				case '.': return Cell.Food;
				case 'o': return Cell.Powerup;
				case 'e': return Cell.Enemy;
				case 'T': return Cell.Tard;
				case 'P': return Cell.Player;
				default: throw '"' + cell + '" is not a valid maze element.';
			}
		}
	}

	class Game {

		private canvas: fabric.IStaticCanvas;
		private board: Board;
		private foods: Food[];
		private characters: Character[];

		constructor(
			canvas: fabric.IStaticCanvas,
			board: Board,
			foods: Food[],
			characters: Character[])
		{
			this.canvas = canvas;
			this.board = board;
			this.foods = foods;
			this.characters = characters;
		}

		initialize() {

			var counter : number;

			// Add the food to the canvas
			for(counter = 0; counter < this.foods.length; counter++) {
				var food = this.foods[counter];
				this.canvas.add(food.image);
			}

			// Add the characters to the canvas
			for(counter = 0; counter < this.characters.length; counter++) {
				var character = this.characters[counter];
				this.canvas.add(character.image);
			}

			this.canvas.renderAll();
		}

		tick() {

			var counter : number;
			// Calculate the new character positions.
			for(counter = 0; counter < this.characters.length; counter++) {
				var character = this.characters[counter];
				character.move();
			}

			// Handle any collisions.

			// Render the canvas:
			this.canvas.renderAll();
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

	class Item {

		position : Position;
		image : fabric.IObject;

		constructor(position: Position, image? : fabric.IObject) {
			this.position = position;
			this.image = image;
		}

	}

	class Food extends Item {

		image : fabric.ICircle;


		constructor(position: Position) {
			super(
				position,
				new fabric.Circle({
					radius: 4,
					top: position.row * scale + offset,
					left: position.column * scale + offset,
					fill: '#0f0'
				})
			);
		}

	}

	class Powerup extends Food {
		constructor(position: Position) {
			super(position);
			this.image.set('fill', '#f00');
		}
	}

	class Character extends Item {
		
		xSpeed : number = 0;
		ySpeed : number = 0;

		move() {
			this.position = new Position(this.position.row + this.ySpeed, this.position.column + this.xSpeed);
			this.image.set({
				top: this.position.row * scale + offset,
				left: this.position.column * scale + offset,
			});
		}

	}

	class Enemy extends Character {
		constructor(position: Position, image? : fabric.IObject) {
			super(
				position,
				image || new fabric.Circle({
					radius: 9,
					top: position.row * scale + offset,
					left: position.column * scale + offset,
					fill: '#bbb'
				})
			);
		}
	}

	class Tard extends Enemy {
		constructor(position: Position) {
			super(
				position,
				new fabric.Circle({
					radius: 9,
					top: position.row * scale + offset,
					left: position.column * scale + offset,
					fill: '#fff'
				})
			);
		}
	}

	class Player extends Character {
		constructor(position: Position) {
			var imgElement = <HTMLImageElement>document.getElementById('pacmagurian');
			var imgInstance = new fabric.Image(imgElement, {
				top: position.row * scale + offset,
				left: position.column * scale + offset,
				flipX: true
			});
			super(position, imgInstance);
		}
	}

	export class Factory {

		createGame(): Game {

			// Get the board
			var board = new Board(mazeSource);

			// Creat the foods
			var foods = this.createFoods(board);

			// Create the characters
			var characters = this.createCharacters(board);

			// Initialize canvas:
			var canvas = new fabric.StaticCanvas('canvas', { backgroundColor: backgroundColor });
			canvas.setWidth(board.widthInBlocks * scale);
			canvas.setHeight(board.heightInBlocks * scale);

			var imgElement = <HTMLImageElement>document.getElementById('maze');
			var imgInstance = new fabric.Image(imgElement, {
					top: board.heightInBlocks * scale / 2,
					left: board.widthInBlocks * scale / 2,
				});

			canvas.add(imgInstance);

			return new Game(canvas, board, foods, characters);

		}

		createCharacters(board : Board) : Character[] {

			var characters : Character[] = [];

			var row : number;
			var column : number;
			for(row = 0; row < board.heightInBlocks; row++) {
				for(column = 0; column < board.widthInBlocks; column++) {
					var cell = board.getCell(row, column);
					var position = new Position(row, column);
					switch(cell) {
						case Cell.Player:
							characters.push(new Player(position));
							break;
						case Cell.Enemy:
							characters.push(new Enemy(position));
							break;
						case Cell.Tard:
							characters.push(new Tard(position));
							break;
					}
				}
			}
			return characters;
		}

		createFoods(board : Board) : Food[] {

			var foods : Food[] = [];

			var row : number;
			var column : number;
			for(row = 0; row < board.heightInBlocks; row++) {
				for(column = 0; column < board.widthInBlocks; column++) {
					var cell = board.getCell(row, column);
					switch(cell) {
						case Cell.Food:
							foods.push(new Food(new Position(row, column)));
							break;
						case Cell.Powerup:
							foods.push(new Powerup(new Position(row, column)));
							break;
					}
				}
			}

			return foods;
		}

	}
}

// *********** MAIN ***********

(function () {
	'use strict';
	var factory = new Pacmagurian.Factory();
	var game = factory.createGame();
	game.initialize();
	window.setInterval(() => game.tick(), 50);
})();