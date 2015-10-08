//inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ngRoute'])

//configure routes
.config(function($routeProvider, $locationProvider) {
	
	//apply routes to the route provider object
	$routeProvider
	
		.when('/',{
			templateUrl : 'views/pages/home.html',
			controller : 'homeController',
			controllerAs: 'home'
		})
	
		//about template
		.when('/about',{
			templateUrl : 'views/pages/about.html',
			controller : 'aboutController',
			controllerAs: 'about'
		})
		
		//contact template
		.when('/contact',{
			templateUrl : 'views/pages/contact.html',
			controller : 'contactController',
			controllerAs: 'contact'
		});
		
		//set our app up to have pretty URLS
		$locationProvider.html5Mode(true);
		
});