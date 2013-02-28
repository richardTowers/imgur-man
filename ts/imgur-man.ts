///<reference path="fabricjs.d.ts"/>

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
	    '|----|.||  ------  ||.|----|',
	    '      .    |eee |    .      ',
	    '      .    ------    .      ',
        '|----|.||          ||.|----|',
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

    var heightInBlocks = board.length;
    var widthInBlocks = board[0].length;

    window.console.log('height: ' + heightInBlocks);
    window.console.log('width: ' + widthInBlocks);

	// Initialize canvas:
	var canvas = new fabric.StaticCanvas('canvas', { backgroundColor: '#000' });

	var width = canvas.getWidth();
	var height = canvas.getHeight();

	for(var i = 0; i < width; i += 20) {
		var dot = new fabric.Circle({
			top: height/2,
			left: i,
			radius: 5,
			fill: '#0f0'
		});
		canvas.add(dot);
	}

	var img;
	var leftPos = width - 20;
	fabric.Image.fromURL('img/Pacmagurian-full-open.png', function(oImg) {
		img = oImg;
		canvas.add(img);
	}, {
		top: height/2,
		left: leftPos,
		flipX: true,
		scaleX: 0.1,
		scaleY: 0.1
	});

	window.setInterval(function () {
		leftPos = leftPos < 0 ? width - 20 : leftPos - 20;
		img.set('left', leftPos);
		canvas.renderAll();
	}, 500);


})();