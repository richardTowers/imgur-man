///<reference path="lib/fabricjs.d.ts" />
///<reference path="game.ts" />

module drawing {

	export interface food extends fabric.ICircle {
		key: string;
	}

	export interface state {
		canvas: fabric.ICanvas;
		hero: fabric.IImage;
		food: food[];
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
			var item = <food>new fabric.Circle(
				{
					top: scale(foodItem.top),
					left: scale(foodItem.left),
					radius: 5,
					fill: '#0f0'
				});
			item.key = x;
			return item;
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
		
		drawing.hero.flipX = (state.hero.leftSpeed > 0);
		if (state.hero.upSpeed === 0) {
			drawing.hero.rotate(0);
		}
		else if (state.hero.upSpeed > 0) {
			drawing.hero.rotate(-90);
		}
		else if (state.hero.upSpeed < 0) {
			drawing.hero.rotate(90);
		}

		var toRemove: food[] = [],
			remainder: food[] = [];
		
		drawing.food.forEach(x => {
			if (state.food.hasOwnProperty(x.key)) {
				remainder.push(x);
			}
			else {
				toRemove.push(x);
			}
		});
		
		toRemove.forEach(x => drawing.canvas.remove(x));
		
		drawing.food = remainder;

		// Render the canvas:
		drawing.canvas.renderAll();

		return drawing;
	}

}