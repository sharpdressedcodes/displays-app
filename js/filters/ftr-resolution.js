'use strict';

// Status Filter
angular.module('risevision.displaysApp.filters')
  .filter('resolution', function () {
    return function (width, height) {
      if (width && height) {
        return width + 'x' + height;
      } else {
        return 'N/A';
      }
    };
  });
