'use strict';

//load the google api client lib for the storage api
angular.module('risevision.displaysApp.services')
  .factory('storageApiLoader', ['STORAGE_API_ROOT', 'gapiClientLoaderGenerator',
    function (STORAGE_API_ROOT, gapiClientLoaderGenerator) {
      return gapiClientLoaderGenerator('storage', 'v0.01', STORAGE_API_ROOT);
    }
  ]);
