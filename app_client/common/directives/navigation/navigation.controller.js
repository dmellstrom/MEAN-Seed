(function () {

  angular
    .module('meanApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$rootScope', '$location', '$route', 'authentication'];
  function navigationCtrl($rootScope, $location, $route, authentication) {
    var vm = this;

    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
        authentication.logout();
        if ($rootScope.protected.indexOf($location.path()) != -1) {
          $location.path('/');
        } else {
          $route.reload();
        }
    }
  }

})();