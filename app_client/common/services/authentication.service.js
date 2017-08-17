(function () {

  angular
    .module('meanApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveClaim = function (claim) {
      $window.localStorage['mean-claim'] = JSON.stringify(claim);
    };

    var getClaim = function () {
      if ($window.localStorage['mean-claim']) {
        return JSON.parse($window.localStorage['mean-claim']);
      }
      return false;
    };

    var isLoggedIn = function() {
      var claim = getClaim();

      if(claim){
        return claim.exp > Date.now() / 1000;
      }
      return false;
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var claim = getClaim();
        return {
          email : claim.email,
          name : claim.name
        };
      }
      return false;
    };

    var register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveClaim(data.claim);
      });
    };

    var login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveClaim(data.claim);
      });
    };

    var logout = function() {
      return $http.post('/api/logout').success(function() {
        $window.localStorage.removeItem('mean-claim');
      });
    };

    return {
      isLoggedIn : isLoggedIn,
      currentUser : currentUser,
      register : register,
      login : login,
      logout : logout
    };
  }

})();