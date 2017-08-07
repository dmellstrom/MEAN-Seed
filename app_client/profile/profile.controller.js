(function() {
  
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData'];
  function profileCtrl($location, meanData) {
    var vm = this;

    vm.user = null;

    meanData.getProfile().then(function(data) {
      vm.user = data;
    }).catch(function (error) {
      console.log(error);
    });
  }

})();