var board;
(function (board) {
    var Board = (function () {
        function Board(source) {
            this.source = source;
            this.heightInBlocks = source.length;
            this.widthInBlocks = source[0].length;
        }
        Board.prototype.getCell = function (row, column) {
            return this.source[row][column];
        };
        return Board;
    })();
    board.Board = Board;
})(board || (board = {}));
//@ sourceMappingURL=board.js.map
