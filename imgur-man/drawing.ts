///<reference path="lib/fabricjs.d.ts" />
///<reference path="game.ts" />

module drawing {

	export interface state {
		canvas: fabric.ICanvas;
		hero: fabric.IImage;
		food: fabric.ICircle[];
	}

	function scale(input: number): number {
		return 10 + input * 20;
	}

	export function initialise(width: number, height: number, state: game.state): state {

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

		var food = Object.keys(state.food).map(x => {
			var foodItem = state.food[x];
			return new fabric.Circle(
				{
					top: scale(foodItem.top),
					left: scale(foodItem.left),
					radius: 5,
					fill: '#0f0'
				});
		});

		food.forEach(x => canvas.add(x));

		// Load our hero:
		var heroImg = <HTMLImageElement>document.getElementById('pacmagurian');
		var hero = new fabric.Image(heroImg, { flipX: true });
		canvas.add(hero);

		return {
			canvas: canvas,
			hero: hero,
			food: food
		};
	}

	export function draw(drawing: state, state: game.state): state {

		drawing.hero.left = scale(state.hero.left);
		drawing.hero.top = scale(state.hero.top);

		// Render the canvas:
		drawing.canvas.renderAll();

		return drawing;
	}

}