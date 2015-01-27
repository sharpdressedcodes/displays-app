'use strict';

/*jshint camelcase: false */

angular.module('risevision.displaysApp.services')
  .service('timeParser', [

    function () {
      return function (time) {
        var d = new Date();
        var hours = 0,
          minutes = 0;

        if (time) {
          var tokens = time.split(':');

          if (tokens && tokens[0] && tokens[1]) {
            hours = parseInt(tokens[0]) || 0;
            minutes = parseInt(tokens[1]) || 0;
          }
        }

        d.setHours(hours);
        d.setMinutes(minutes);
        d.setSeconds(0);

        return d;
      };
    }
  ]);
