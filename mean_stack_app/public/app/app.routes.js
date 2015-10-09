angular.module('app.routes', ['ngRoute']) 

.config(function($routeProvider, $locationProvider){
	
	//apply routes to $routeProvider
	$routeProvider
	
		//no need to declare controller
		//explicitely writtin html directive
		.when('/', { 
			templateUrl: 'app/views/pages/home.html'
		})
		
		//login page
		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'mainController',
			controllerAs: 'login'
		})
		
		//users page
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})
		
		//create users page
		.when('/users/create',{
			templateUrl: 'app/views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		});
		
	
	//clean up url string
	$locationProvider.html5Mode(true);
	
});