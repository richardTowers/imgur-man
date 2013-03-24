define(["require", "exports", '../types'], function(require, exports, __types__) {
    'use strict';
    var types = __types__;

    function buildMap(source) {
        var rowIndex;
        var columnIndex;
        var map = [];
        var row;
        var outputRow;
        var sourceCell;
        var outputCell;

        for(rowIndex = 0; rowIndex < source.length; rowIndex++) {
            row = source[rowIndex];
            outputRow = [];
            for(columnIndex = 0; columnIndex < row.length; columnIndex++) {
                sourceCell = row[columnIndex];
                outputCell:
types.Tile
                switch(sourceCell) {
                    case ' ': {
                        outputCell = new types.Tile(false, false);
                        break;

                    }
                    case '#': {
                        outputCell = new types.Tile(true, false);
                        break;

                    }
                    case '.': {
                        outputCell = new types.Tile(false, true);
                        break;

                    }
                    default: {
                        throw '"' + sourceCell + '" is not an allowed cell type.';

                    }
                }
                outputRow.push(outputCell);
            }
            map.push(outputRow);
        }
        return map;
    }
    exports.buildMap = buildMap;
})

//@ sourceMappingURL=mapBuilder.js.map
