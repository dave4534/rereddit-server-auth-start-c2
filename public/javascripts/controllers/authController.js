app.controller('AuthCtrl', ['$scope', 'authService', '$state', function($scope, authService, $state){
  // wouldnt this typically be tied to a string variable?
  $scope.user = {};

  $scope.register = function () {
    console.log('authController register invoked');
    authService.register($scope.user);
      console.log('User is registered! Controller forwarding to home $state');
      $state.go('home');

  };
}]);