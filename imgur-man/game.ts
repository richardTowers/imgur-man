///<reference path="board.ts" />

module game {

	export interface item {
		top: number;
		left: number;
	}

	export interface character extends item {
		upSpeed: number;
		leftSpeed: number;
	}

	export interface state {
		board: board.Board;
		hero: character;
		ghosts: item[];
		food: any;
	}

	function getHash(rowNum: number, colNum: number): string {
		return rowNum + ':' + colNum;
	}

	export function initialiseState(): game.state {

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
		var hero: character = {
			top: 23,
			left: theBoard.widthInBlocks / 2,
			upSpeed: 0,
			leftSpeed: 0x1 / 0x8
		};

		var food = {};
		for (var rowNum = 0; rowNum < mazeSource.length; rowNum++) {
			var row = mazeSource[rowNum];
			for (var colNum = 0; colNum < row.length; colNum++) {
				switch (row[colNum]) {
					case '.':
						food[getHash(rowNum, colNum)] = {
							top: rowNum,
							left: colNum,
							value: 10
						};
						break;
					case 'o':
						food[getHash(rowNum, colNum)] = {
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

	function getNextPosition(position: number, speed: number) {

		var nextPos = position - speed;

		var nextCoord;
		if (speed > 0) {
			nextCoord = Math.floor(nextPos);
		}
		else if (speed < 0) {
			nextCoord = Math.ceil(nextPos);
		}
		else {
			nextCoord = Math.round(nextPos);

			// Speed is zero in this dimension,
			// so we should be centered on this coordinate:
			nextPos = nextCoord;
		}

		return {
			position: nextPos,
			coord: nextCoord
		};
	}

	export function tick(state: game.state, clock: number): game.state {

		if (state.hero.upSpeed !== 0 && state.hero.leftSpeed !== 0) {
			throw 'No diagonals please!';
		}

		var top = getNextPosition(state.hero.top, state.hero.upSpeed);
		var left = getNextPosition(state.hero.left, state.hero.leftSpeed);

		var cell = state.board.getCell(top.coord, left.coord);

		if (cell !== '#') {

			state.hero.left = left.position;
			state.hero.top = top.position;

			if (state.hero.left <= 0) { state.hero.left = state.board.widthInBlocks; }
			if (state.hero.left > state.board.widthInBlocks) { state.hero.left = 0; }
			if (state.hero.top <= 0) { state.hero.top = state.board.heightInBlocks; }
			if (state.hero.top > state.board.heightInBlocks) { state.hero.top = 0; }

			var newFood = {};
			var hash = getHash(top.coord, left.coord);
			Object.keys(state.food)
				.filter(x => x !== hash)
				.forEach(x => newFood[x] = state.food[x]);

			state.food = newFood;
		}

		return state;

	}

	export function handleKeyPress (state : state, event : KeyboardEvent) : state {
		
		var nextUpSpeed, nextLeftSpeed;
		switch (event.keyCode) {
			case 38: // Up
				nextUpSpeed = 0x1 / 0x8;
				nextLeftSpeed = 0;
				break;
			case 40: // Down
				nextUpSpeed = - 0x1 / 0x8;
				nextLeftSpeed = 0;
				break;
			case 37: // Left
				nextUpSpeed = 0;
				nextLeftSpeed = 0x1 / 0x8;
				break;
			case 39: // Right
				nextUpSpeed = 0;
				nextLeftSpeed = - 0x1 / 0x8;
				break;
		}

		var top = getNextPosition(state.hero.top, nextUpSpeed);
		var left = getNextPosition(state.hero.left, nextLeftSpeed);

		var nextCell = state.board.getCell(top.coord, left.coord);

		if (nextCell !== '#') {
			state.hero.upSpeed = nextUpSpeed;
			state.hero.leftSpeed = nextLeftSpeed;
		}

		return state;
	
	};

}