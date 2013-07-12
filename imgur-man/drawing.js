///<reference path="lib/fabricjs.d.ts" />
///<reference path="game.ts" />
var drawing;
(function (drawing) {
    function scale(input) {
        return 10 + input * 20;
    }

    function initialise(width, height, state) {
        // Initialize canvas:
        var canvas = new fabric.StaticCanvas('canvas');

        // Load the background image:
        var mazeImg = document.getElementById('maze');
        var maze = new fabric.Image(mazeImg, {
            top: height / 2,
            left: width / 2
        });
        canvas.add(maze);

        var food = Object.keys(state.food).map(function (x) {
            var foodItem = state.food[x];
            return new fabric.Circle({
                top: scale(foodItem.top),
                left: scale(foodItem.left),
                radius: 5,
                fill: '#0f0'
            });
        });

        food.forEach(function (x) {
            return canvas.add(x);
        });

        // Load our hero:
        var heroImg = document.getElementById('pacmagurian');
        var hero = new fabric.Image(heroImg, { flipX: true });
        canvas.add(hero);

        return {
            canvas: canvas,
            hero: hero,
            food: food
        };
    }
    drawing.initialise = initialise;

    function draw(drawing, state) {
        drawing.hero.left = scale(state.hero.left);
        drawing.hero.top = scale(state.hero.top);

        drawing.hero.flipX = (state.hero.leftspeed > 0);
        if (state.hero.upspeed === 0) {
            drawing.hero.rotate(0);
        } else if (state.hero.upspeed > 0) {
            drawing.hero.rotate(-90);
        } else if (state.hero.upspeed < 0) {
            drawing.hero.rotate(90);
        }

        // Render the canvas:
        drawing.canvas.renderAll();

        return drawing;
    }
    drawing.draw = draw;
})(drawing || (drawing = {}));
//@ sourceMappingURL=drawing.js.map
