'use strict';

/*jshint camelcase: false */

angular.module('risevision.displaysApp.services')
  .service('display', ['$q', '$log',
    'coreAPILoader', 'userState',
    function ($q, $log, coreAPILoader, userState) {

      var service = {
        list: function (search, cursor) {
          var deferred = $q.defer();

          var query = search.query ? 'name: ~\'' + search.query + '\'' :
            'companyId: ' +
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
            return coreApi.display.list(obj);
          })
            .then(function (resp) {
              deferred.resolve(resp.result);
            })
            .then(null, function (e) {
              $log.error('Failed to get list of displays.', e);
              deferred.reject(e);
            });

          return deferred.promise;
        }
      };

      return service;
    }
  ]);
