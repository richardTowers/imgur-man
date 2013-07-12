///<reference path="board.ts" />
///<reference path="game.ts" />
///<reference path="drawing.ts" />

(function main() {

	var width = 560;
	var height = 620;

	var clock = 0;

	window.onload = () => {

		var gameState = game.initialiseState();
		
		var drawingState = drawing.initialise(width, height, gameState);

		var update = () => {
			gameState = game.tick(gameState, clock);
			drawingState = drawing.draw(drawingState, gameState);
			clock++;
		};

		window.setInterval(update, 25);

	};

})();