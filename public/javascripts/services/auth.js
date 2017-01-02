
// how do you know what needs to be injected into a service?
// $http needs to be injected because this is where the http requests are being made from
app.factory('authService', ['$http', '$window', function ($http, $window) {
 var authService = {};

     // saveToken saves a JWT into localstorage
     authService.saveToken = function (token) {
      // rereddit-jwt is what you are naming your localStorage token
      $window.localStorage['rereddit-jwt'] = token;
    };

    authService.getToken = function (){
     return $window.localStorage['rereddit-jwt'];
   };

   authService.register = function (user){
     // Your auth.register method should send a post request to /register with our user, 
     // and when it's done, invoke auth.saveToken to actually save our JWT into localStorage.
     return $http.post('/register', user).success(function(data){
      console.log('Service POST request successful, responding to client with this data: ' + data.token);
      authService.saveToken(data.token);
    });
   };

   authService.isLoggedIn = function(){
     var token = authService.getToken();

     if(token){
       return true;
     } else {
       return false;
     }
   };

   authService.currentUser = function(){
     if(authService.isLoggedIn()){
       var token = authService.getToken();
       var decodedToken = JSON.parse($window.atob(token.split('.')[1]));

       return decodedToken.username;
     }
   };

   authService.logOut = function(){
     $window.localStorage.removeItem('rereddit-jwt');
   };

    authService.loginUser = function(user) {
      return $http.post('/login', user).then(function(data){
        console.log(data.data.token);
        authService.saveToken(data.data.token);
      });
   };

   return authService;
 }]);