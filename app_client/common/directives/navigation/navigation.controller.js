(function () {

  angular
    .module('meanApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', '$route', 'authentication'];
  function navigationCtrl($location, $route, authentication) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
        authentication.logout();
        $route.reload();
    }
  }

})();