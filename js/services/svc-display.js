'use strict';

/*jshint camelcase: false */

angular.module('risevision.displaysApp.services')
  .service('display', ['$q', '$log',
    'coreAPILoader', 'userState',
    function ($q, $log, coreAPILoader, userState) {

      var service = {
        list: function (search, cursor) {
          var deferred = $q.defer();
          
          var query = search.query ? 'name: ~\'' + search.query + '\'' : 'companyId: ' +
          userState.getSelectedCompanyId();
          
          var obj = {
            'companyId': userState.getSelectedCompanyId(),
            'search': query,
            'cursor': cursor,
            'count': search.count,
            'sort': search.sortBy + (search.reverse ? ' desc' : ' asc')
          };
          $log.debug('list displays called with', obj);
          coreAPILoader().then(function (coreApi) {
            var request = coreApi.display.list(obj);
            request.execute(function (resp) {
              $log.debug('list displays resp', resp);
              if (resp) {
                deferred.resolve(resp);
              } else {
                $log.error('Failed to get list of displays.', resp);
                deferred.reject(resp);
              }
            });
          });

          return deferred.promise;
        }
      };

      return service;
    }
  ]);
