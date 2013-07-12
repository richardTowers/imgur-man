///<reference path="board.ts" />

module game {

	export interface item {
		top: number;
		left: number;
	}

	export interface state {
		board: board.Board;
		hero: item;
		ghosts: item[];
		food: any;
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
		var hero = { top: 23, left: theBoard.widthInBlocks / 2 };

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

	export function tick(state: game.state, clock: number): game.state {

		state.hero.left -= 0.125;
		
		if (state.hero.left <= 0) { state.hero.left = state.board.widthInBlocks; }
		if (state.hero.left > state.board.widthInBlocks) { state.hero.left = 0; }
		if (state.hero.top <= 0) { state.hero.top = state.board.heightInBlocks; }
		if (state.hero.top > state.board.heightInBlocks) { state.hero.top = 0; }

		return state;

	}

}