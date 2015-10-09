angular.module('app.routes', ['ngRoute']) 

.config(function($routeProvider, $locationProvider){
	
	//apply routes to $routeProvider
	$routeProvider
	
		//no need to declare controller
		//explicitely writtin html directive
		.when('/', { 
			templateUrl: 'app/views/pages/home.html'
		});
	
	//clean up url string
	$locationProvider.html5Mode(true);
	
});