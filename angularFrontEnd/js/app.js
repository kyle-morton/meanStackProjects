//name off angular app and initial declaration
angular.module('firstApp', []) //no dependecies (empty array)

	//Create and bind controller to ang module
	.controller('mainController', function() { 
		var vm = this; //use this instead of scope
		
		//define vars and functions onto THIS (use controller as data-store)
		vm.message = "Hey, What's Up?";
		
		//list of objects for display
		vm.computers = [
			{name: 'Macbook Pro', color: 'Silver', quality: 7},
			{name: 'Yoga 2 Pro', color: 'Gray', quality: 6},
			{name: 'Chromebook', color: 'Black', quality: 5}
		];
		
	});
	
//NOTE: try to keep one feature per module! 
//Adding too many different controllers to same module can get confusing quick