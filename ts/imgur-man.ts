///<reference path="fabricjs.d.ts"/>

(function () {
	'use strict';

	// Initialize canvas:
	// create a wrapper around native canvas element (with id="canvas")
	var canvas = new fabric.StaticCanvas('canvas', { backgroundColor: '#000' });

	var width = canvas.getWidth();
	var height = canvas.getHeight();

	for(var i = 0; i < width; i += 20) {
		var dot = new fabric.Circle({
			top: 20,
			left: i,
			radius: 5,
			fill: '#ff0'
		});
		canvas.add(dot);
	}

	canvas.renderAll();

})();