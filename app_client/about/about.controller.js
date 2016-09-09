(function() {
  
  angular
  .module('meanApp')
  .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;

    console.log('About controller');
  }

})();