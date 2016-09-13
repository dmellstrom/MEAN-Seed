(function() {
  
  angular
  .module('meanApp')
  .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['authentication'];
  function homeCtrl(authentication) {
    var vm = this;

    vm.currentUser = authentication.currentUser();
    
    console.log('Home controller');
  }

})();