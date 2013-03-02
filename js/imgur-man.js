var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var Pacmagurian;
(function (Pacmagurian) {
    'use strict';
    var scale = 20;
    var offset = scale / 2;
    var scaleUp = function (input) {
        return input * scale + offset;
    };
    var createImage = function (id, options) {
        var imgElement = document.getElementById(id);
        return new fabric.Image(imgElement, options);
    };
    var backgroundColor = '#222';
    var mazeSource = [
        '############################', 
        '#............##............#', 
        '#o####.#####.##.#####.####o#', 
        '#.####.#####.##.#####.####.#', 
        '#.####.#####.##.#####.####.#', 
        '#..........................#', 
        '#.####.##.########.##.####.#', 
        '#.####.##.########.##.####.#', 
        '#......##....##....##......#', 
        '######.##### ## #####.######', 
        '     #.##### ## #####.#     ', 
        '     #.##     T    ##.#     ', 
        '     #.## ######## ##.#     ', 
        '######.## #      # ##.######', 
        '      .   #      #   .      ', 
        '######.## #      # ##.######', 
        '     #.## ######## ##.#     ', 
        '     #.##          ##.#     ', 
        '     #.## ######## ##.#     ', 
        '######.## ######## ##.######', 
        '#............##............#', 
        '#.####.#####.##.#####.####.#', 
        '#.####.#####.##.#####.####.#', 
        '#o..##....... P.......##..o#', 
        '###.##.##.########.##.##.###', 
        '###.##.##.########.##.##.###', 
        '#......##....##....##......#', 
        '#.##########.##.##########.#', 
        '#.##########.##.##########.#', 
        '#..........................#', 
        '############################'
    ];
    var Cell;
    (function (Cell) {
        Cell._map = [];
        Cell._map[0] = "Empty";
        Cell.Empty = 0;
        Cell._map[1] = "Wall";
        Cell.Wall = 1;
        Cell._map[2] = "Food";
        Cell.Food = 2;
        Cell._map[3] = "Powerup";
        Cell.Powerup = 3;
        Cell._map[4] = "Enemy";
        Cell.Enemy = 4;
        Cell._map[5] = "Tard";
        Cell.Tard = 5;
        Cell._map[6] = "Player";
        Cell.Player = 6;
    })(Cell || (Cell = {}));

    var Board = (function () {
        function Board(source) {
            this.source = source;
            this.heightInBlocks = source.length;
            this.widthInBlocks = source[0].length;
        }
        Board.prototype.getCell = function (row, column) {
            var cell = this.source[row][column];
            switch(cell) {
                case ' ': {
                    return Cell.Empty;

                }
                case '#': {
                    return Cell.Wall;

                }
                case '.': {
                    return Cell.Food;

                }
                case 'o': {
                    return Cell.Powerup;

                }
                case 'e': {
                    return Cell.Enemy;

                }
                case 'T': {
                    return Cell.Tard;

                }
                case 'P': {
                    return Cell.Player;

                }
                default: {
                    throw '"' + cell + '" is not a valid maze element.';

                }
            }
        };
        return Board;
    })();    
    var Game = (function () {
        function Game(canvas, board, foods, characters) {
            this.canvas = canvas;
            this.board = board;
            this.foods = foods;
            this.characters = characters;
        }
        Game.prototype.initialize = function () {
            var counter;
            for(counter = 0; counter < this.foods.length; counter++) {
                var food = this.foods[counter];
                this.canvas.add(food.image);
            }
            for(counter = 0; counter < this.characters.length; counter++) {
                var character = this.characters[counter];
                this.canvas.add(character.image);
            }
            this.canvas.renderAll();
        };
        Game.prototype.tick = function () {
            var counter;
            for(counter = 0; counter < this.characters.length; counter++) {
                var character = this.characters[counter];
                character.move();
            }
            this.canvas.renderAll();
        };
        return Game;
    })();    
    var Position = (function () {
        function Position(row, column) {
            this.row = row;
            this.column = column;
        }
        return Position;
    })();    
    var Item = (function () {
        function Item(position, image) {
            this.position = position;
            this.image = image;
        }
        return Item;
    })();    
    var Food = (function (_super) {
        __extends(Food, _super);
        function Food(position, image) {
                _super.call(this, position, image || new fabric.Circle({
        radius: 4,
        top: scaleUp(position.row),
        left: scaleUp(position.column),
        fill: '#0f0'
    }));
        }
        return Food;
    })(Item);    
    var Powerup = (function (_super) {
        __extends(Powerup, _super);
        function Powerup(position) {
            var image = createImage('downvote', {
                top: scaleUp(position.row),
                left: scaleUp(position.column),
                flipX: true
            });
                _super.call(this, position, image);
        }
        return Powerup;
    })(Food);    
    var Character = (function (_super) {
        __extends(Character, _super);
        function Character() {
            _super.apply(this, arguments);

            this.xSpeed = 0;
            this.ySpeed = 0;
        }
        Character.prototype.move = function () {
            this.position = new Position(this.position.row + this.ySpeed, this.position.column + this.xSpeed);
            this.image.set({
                top: scaleUp(this.position.row),
                left: scaleUp(this.position.column)
            });
        };
        return Character;
    })(Item);    
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(position, image) {
                _super.call(this, position, image || new fabric.Circle({
        radius: 9,
        top: scaleUp(position.row),
        left: scaleUp(position.column),
        fill: '#bbb'
    }));
        }
        return Enemy;
    })(Character);    
    var Tard = (function (_super) {
        __extends(Tard, _super);
        function Tard(position) {
            var imgElement = document.getElementById('pactard');
            var imgInstance = new fabric.Image(imgElement, {
                top: scaleUp(position.row),
                left: scaleUp(position.column),
                flipX: true
            });
                _super.call(this, position, imgInstance);
        }
        return Tard;
    })(Enemy);    
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(position) {
            var imgElement = document.getElementById('pacmagurian');
            var imgInstance = new fabric.Image(imgElement, {
                top: scaleUp(position.row),
                left: scaleUp(position.column),
                flipX: true
            });
                _super.call(this, position, imgInstance);
        }
        return Player;
    })(Character);    
    var Factory = (function () {
        function Factory() { }
        Factory.prototype.createGame = function () {
            var board = new Board(mazeSource);
            var foods = this.createFoods(board);
            var characters = this.createCharacters(board);
            var canvas = new fabric.StaticCanvas('canvas', {
                backgroundColor: backgroundColor
            });
            canvas.setWidth(board.widthInBlocks * scale);
            canvas.setHeight(board.heightInBlocks * scale);
            var imgElement = document.getElementById('maze');
            var imgInstance = new fabric.Image(imgElement, {
                top: board.heightInBlocks * scale / 2,
                left: board.widthInBlocks * scale / 2
            });
            canvas.add(imgInstance);
            return new Game(canvas, board, foods, characters);
        };
        Factory.prototype.createCharacters = function (board) {
            var characters = [];
            var row;
            var column;
            for(row = 0; row < board.heightInBlocks; row++) {
                for(column = 0; column < board.widthInBlocks; column++) {
                    var cell = board.getCell(row, column);
                    var position = new Position(row, column);
                    switch(cell) {
                        case Cell.Player: {
                            characters.push(new Player(position));
                            break;

                        }
                        case Cell.Enemy: {
                            characters.push(new Enemy(position));
                            break;

                        }
                        case Cell.Tard: {
                            characters.push(new Tard(position));
                            break;

                        }
                    }
                }
            }
            return characters;
        };
        Factory.prototype.createFoods = function (board) {
            var foods = [];
            var row;
            var column;
            for(row = 0; row < board.heightInBlocks; row++) {
                for(column = 0; column < board.widthInBlocks; column++) {
                    var cell = board.getCell(row, column);
                    switch(cell) {
                        case Cell.Food: {
                            foods.push(new Food(new Position(row, column)));
                            break;

                        }
                        case Cell.Powerup: {
                            foods.push(new Powerup(new Position(row, column)));
                            break;

                        }
                    }
                }
            }
            return foods;
        };
        return Factory;
    })();
    Pacmagurian.Factory = Factory;    
})(Pacmagurian || (Pacmagurian = {}));

(function () {
    'use strict';
    var factory = new Pacmagurian.Factory();
    var game = factory.createGame();
    game.initialize();
    window.setInterval(function () {
        return game.tick();
    }, 50);
})();
