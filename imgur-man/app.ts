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

		window.onkeyup = (event) => {
			
			switch (event.keyCode) {
				case 38: // Up
					gameState.hero.upspeed = 0x1 / 0x8;
					gameState.hero.leftspeed = 0;
					break;
				case 40: // Down
					gameState.hero.upspeed = - 0x1 / 0x8;
					gameState.hero.leftspeed = 0;
					break;
				case 37: // Left
					gameState.hero.upspeed = 0;
					gameState.hero.leftspeed = 0x1 / 0x8;
					break;
				case 39: // Right
					gameState.hero.upspeed = 0;
					gameState.hero.leftspeed = - 0x1 / 0x8;
					break;
			}
		
		};

		window.setInterval(update, 25);

	};

})();