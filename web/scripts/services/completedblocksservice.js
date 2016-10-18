'use strict';

/**
 * @ngdoc service
 * @name gridlerWebClientApp.CompletedBlocksService
 * @description
 * # CompletedBlocksService
 * Service in the gridlerWebClientApp.
 */
angular.module('gridlerWebClientApp')
    .service('CompletedBlocksService', function () {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var WHITE = "white";
        var BLACK = "black";
        var UNDEFINED = "";

        /**
         * return an array of possible blocks (length, startIndex)
         * @param colorsArray
         */
        function getPossibleCompletedBlocks(colorsArray) {
            var possibleBlocks = [];
            var found = false;
            var validBlockStart = false;
            var startIndex = 0;
            for (var i = 0; i < colorsArray.length; i++) {

                var color = colorsArray[i];
                //start of a block
                if (i == 0 || color == WHITE) {
                    validBlockStart = true;
                }
                if (color == UNDEFINED) {
                    validBlockStart = false;
                }

                //if valid start and black then found!
                if (validBlockStart && color == BLACK && !found) {
                    startIndex = i;
                    found = true;
                }
                else if (found && color == WHITE) {
                    //when found if
                    found = false;
                    possibleBlocks.push({length:i - startIndex,startIndex:startIndex});
                }
                else if (found && color == UNDEFINED) {
                    found = false;
                }
            }
            //if valid black in the end
            if (found) {
                possibleBlocks.push({length:colorsArray.length - startIndex,startIndex:startIndex});
            }

            if (possibleBlocks.length>0 ) {
                //console.log("found " + possibleBlocks.length);
            }

            return possibleBlocks;
        }

        /**
         * GEt an array of cells and blocks,
         * return for array of "true" for each possible block
         * @param slices
         * @param colorsArray
         */
        this.getCompletedBlocks = function (slices, colorsArray) {
            var result = [];
            //first create a false array
            //we'll call evry number possible
            //and start iterating over the array
            var possibleCompletedBlock = getPossibleCompletedBlocks(colorsArray);

            for (var i = 0; i < slices.length; i++) {

                var blockLength = slices[i];

                if (i < possibleCompletedBlock.length) {
                    result.push(blockLength == possibleCompletedBlock[i].length);
                }
                else {
                    result.push(false);
                }
            }
            return result;
        }
    });
