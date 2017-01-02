app.controller('LoginCtrl', ['$scope','authService', '$state', function($scope, authService, $state){
  $scope.user = {};

  $scope.login = function() {
    console.log('about to login from the controller');
    authService.loginUser($scope.user).then(function(){
      console.log('about to change states to home from the controller');
      $state.go('home');
     });

    $scope.user = '';
    $scope.password = '';

  };

}]);