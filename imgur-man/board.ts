module board {

	export class Board {

		private source: string[];

		heightInBlocks: number;
		widthInBlocks: number;

		constructor(source: string[]) {
			this.source = source;
			this.heightInBlocks = source.length;
			this.widthInBlocks = source[0].length;
		}

		getCell(row: number, column: number): string {
			return this.source[row][column];
		}
	}

}