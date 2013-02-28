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
        '|----|.|| -------- ||.|----|', 
        '      .   | eee  |   .      ', 
        '|----|.|| -------- ||.|----|', 
        '     |.||          ||.|     ', 
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
    var xScale = 25;
    var yScale = 25;
    var height = heightInBlocks * yScale;
    var width = widthInBlocks * xScale;
    var canvas = new fabric.StaticCanvas('canvas', {
        backgroundColor: '#000'
    });
    canvas.setWidth(width);
    canvas.setHeight(height);
    var row;
    var column;
    for(row = 0; row < heightInBlocks; row++) {
        for(column = 0; column < widthInBlocks; column++) {
            var pacmagurian;
            switch(board[row][column]) {
                case '|':
                case '-': {
                    canvas.add(new fabric.Rect({
                        strokeWidth: 5,
                        stroke: '#000',
                        width: xScale,
                        height: yScale,
                        top: yScale / 2 + row * yScale,
                        left: xScale / 2 + column * xScale,
                        fill: '#800080'
                    }));
                    break;

                }
                case '.':
                case 'o': {
                    canvas.add(new fabric.Circle({
                        radius: 4,
                        top: yScale / 2 + row * yScale,
                        left: xScale / 2 + column * xScale,
                        fill: '#0f0'
                    }));
                    break;

                }
                case 'P': {
                    fabric.Image.fromURL('img/opt/pacmagurian-open.png', function (oImg) {
                        pacmagurian = oImg;
                        canvas.add(oImg);
                    }, {
                        flipX: true,
                        top: yScale / 2 + row * yScale,
                        left: xScale / 2 + column * xScale
                    });
                    break;

                }
            }
        }
    }
    var tick = widthInBlocks / 2;
    var interval = window.setInterval(function () {
        pacmagurian.set('left', xScale / 2 + tick * xScale);
        canvas.renderAll();
        tick--;
        if(tick < 6) {
            window.clearInterval(interval);
        }
    }, 200);
    canvas.renderAll();
})();
