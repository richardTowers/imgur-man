(function () {
    'use strict';
    var canvas = new fabric.StaticCanvas('canvas', {
        backgroundColor: '#000'
    });
    var width = canvas.getWidth();
    var height = canvas.getHeight();
    for(var i = 0; i < width; i += 20) {
        var dot = new fabric.Circle({
            top: 20,
            left: i,
            radius: 5,
            fill: '#0f0'
        });
        canvas.add(dot);
    }
    canvas.renderAll();
})();
