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
    var img;
    var leftPos = width - 20;
    fabric.Image.fromURL('/img/imguraffe.gif', function (oImg) {
        img = oImg;
        canvas.add(img);
    }, {
        top: 20,
        left: leftPos,
        scaleX: 0.3,
        scaleY: 0.3
    });
    window.setInterval(function () {
        leftPos = leftPos < 0 ? width - 20 : leftPos - 20;
        img.set('left', leftPos);
        canvas.renderAll();
    }, 500);
})();
