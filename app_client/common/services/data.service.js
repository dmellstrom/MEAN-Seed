(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http'];
  function meanData ($http) {

    var getProfile = function () {
      return $http.get('/api/profile')
        .then(function(response){
          return response.data;
        });
    };

    return {
      getProfile : getProfile
    };
  }

})();