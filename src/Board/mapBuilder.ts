'use strict';

import types = module('../types');

export function buildMap(source: string[]) : types.Tile[][] {

    var rowIndex : number,
        columnIndex : number,
        map : types.Tile[][] = [],
        row : string,
        outputRow : types.Tile[],
        sourceCell : string,
        outputCell : types.Tile;

    for(rowIndex = 0; rowIndex < source.length; rowIndex++) {
        row = source[rowIndex];

        outputRow = [];
        for(columnIndex = 0; columnIndex < row.length; columnIndex++) {
            sourceCell = row[columnIndex];

            outputCell : types.Tile;
            switch(sourceCell) {
                case ' ':
                    outputCell = new types.Tile(false, false, []);
                    break;
                case '#':
                    outputCell = new types.Tile(true, false, []);
                    break;
                case '.':
                    outputCell = new types.Tile(false, true, []);
                    break;
                default:
                    throw '"' + sourceCell + '" is not an allowed cell type.';
            }

            outputRow.push(outputCell);
        }

        map.push(outputRow);
    }

    return map;
}