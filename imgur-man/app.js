///<reference path="lib/fabricjs.d.ts"/>
window.onload = function () {
    // Initialize canvas:
    var canvas = new fabric.StaticCanvas('canvas');
    // Load the background image:
    var mazeImg = document.getElementById('maze');
    var maze = new fabric.Image(mazeImg, {
        top: 310,
        left: 280
    });
    canvas.add(maze);
    // Load our hero:
    var heroImg = document.getElementById('pacmagurian');
    var hero = new fabric.Image(heroImg, {
        top: 470,
        left: 280,
        flipX: true
    });
    canvas.add(hero);
    // Render the canvas:
    canvas.renderAll();
};
//@ sourceMappingURL=app.js.map
