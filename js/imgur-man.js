var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var Pacmagurian;
(function (Pacmagurian) {
    var xScale = 22;
    var yScale = 22;
    var Factory = (function () {
        function Factory() { }
        Factory.prototype.createGame = function (board) {
            var heightInBlocks = board.length;
            var widthInBlocks = board[0].length;
            return new Game(null, [], []);
        };
        return Factory;
    })();
    Pacmagurian.Factory = Factory;    
    var Game = (function () {
        function Game(maze, foods, characters) {
            this.maze = maze;
            this.foods = foods;
            this.characters = characters;
        }
        return Game;
    })();    
    var Position = (function () {
        function Position(row, column) {
            this.row = row;
            this.column = column;
        }
        return Position;
    })();    
    var Maze = (function () {
        function Maze() { }
        Maze.prototype.isWall = function (position) {
            return this.cells[position.row][position.column];
        };
        return Maze;
    })();    
    var Item = (function () {
        function Item(position) {
            this.position = position;
        }
        return Item;
    })();    
    var Food = (function (_super) {
        __extends(Food, _super);
        function Food() {
            _super.apply(this, arguments);

        }
        return Food;
    })(Item);    
    var Character = (function (_super) {
        __extends(Character, _super);
        function Character() {
            _super.apply(this, arguments);

        }
        return Character;
    })(Item);    
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.apply(this, arguments);

        }
        return Player;
    })(Character);    
})(Pacmagurian || (Pacmagurian = {}));

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
    var factory = new Pacmagurian.Factory();
    factory.createGame(board);
    var heightInBlocks = board.length;
    var widthInBlocks = board[0].length;
    var xScale = 22;
    var yScale = 22;
    var height = heightInBlocks * yScale;
    var width = widthInBlocks * xScale;
    var canvas = new fabric.StaticCanvas('canvas', {
        backgroundColor: '#222'
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
                        stroke: '#222',
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
