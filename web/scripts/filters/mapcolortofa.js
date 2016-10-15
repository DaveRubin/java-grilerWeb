'use strict';

/**
 * @ngdoc filter
 * @name gridlerWebClientApp.filter:mapColorToFA
 * @function
 * @description
 * # mapColorToFA
 * Filter in the gridlerWebClientApp.
 */
angular.module('gridlerWebClientApp')
  .filter('mapColorToFA', function () {
    return function (input) {
        var returnVal;
        if (input == 'Black') {
            returnVal = 'fa fa-circle';
        }
        else if (input == 'White') {
            returnVal = 'fa fa-circle-o';
        }
        else {
            returnVal = 'fa fa-times';
        }
      return returnVal;
    };
  });
