'use strict';

/**
 * @ngdoc directive
 * @name gridlerWebClientApp.directive:gameRoom
 * @description
 * # gameRoom
 */
angular.module('gridlerWebClientApp')
  .directive('gameRoom', function () {
    return {
      templateUrl: 'views/gameroom.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
        scope.columnSlices = GameData.columnSlices;
        scope.rowSlices = GameData.rowSlices;
        scope.grid = CreateGrid(GameData);

        scope.onCellClicked = function(cell) {
          console.log(cell);
          cell.selected = !cell.selected;
        };

        /**
         * Toggle all of the selected grid row according to its first item
         * @param rowIndex
         */
        scope.selectRow = function (rowIndex) {
          var targetToToggleFrom = this.grid[rowIndex][0].selected;
          for (var i = 0; i < GameData.dimensions[1]; i++) {
            this.grid[rowIndex][i].selected = !targetToToggleFrom;
          }
          console.log("row selected", rowIndex);
        };

        /**
         * Toggle selection of all the selected column according to its first itme
         * @param columnIndex
         */
        scope.selectColumn = function (columnIndex) {
          var targetToToggleFrom = this.grid[0][columnIndex].selected;
          for (var i = 0; i < GameData.dimensions[0]; i++) {
            this.grid[i][columnIndex].selected = !targetToToggleFrom;
          }
          console.log("column selected", columnIndex);
        };

        /**
         *  Color all of the selected cells with 'color' param
         * @param color
         * @constructor
         */
        scope.ColorSelection = function (color) {
          scope.grid.forEach(function (row) {
            row.forEach(function(cell){
              if (cell.selected) {
                cell.color = color;
                cell.selected = false;
              }
            });
          });
        };


        function CreateGrid(GameData) {
          var resultGrid = [];

          for (var y = 0; y < GameData.dimensions[1]; y++) {
            var row = [];
            for (var x = 0; x < GameData.dimensions[0]; x++) {
              var cell = new Cell(x, y);
              row.push(cell);
            }
            resultGrid.push(row);
          }

          return resultGrid;
        };
      }
    };
  });
