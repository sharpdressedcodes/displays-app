'use strict';

angular.module('risevision.displaysApp.services')
  .service('tag', ['$q', 'userState', 'storageApiLoader', '$log',
    function ($q, userState, storageApiLoader, $log) {
      var service = {};

      service.list = function () {
        var deferred = $q.defer();
        var obj = {
          companyId: userState.getSelectedCompanyId()
        };

        storageApiLoader().then(function (storageApi) {
          return storageApi.tagdef.list(obj);
        })
          .then(function (resp) {
            $log.debug('get tag list resp', resp);
            deferred.resolve(resp.result);
          })
          .then(null, function (e) {
            $log.error('Failed to get tags list.', e);
            deferred.reject(e);
          });

        return deferred.promise;

      }

      return service;
    }
  ]);
