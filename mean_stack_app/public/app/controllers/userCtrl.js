console.log("initializing user Controller!")

angular.module ('userCtrl', ['userService'])

//Inject USER factory
.controller ('userController', function (User) {
	
	
	
	var vm = this;
	vm.processing = true;
	
	//get all users from the userFactory
	User.all()
		.success(function(data) { //on success, bind data to controller
			vm.processing = false;
			console.log("DATA: " + JSON.stringify(data));
			vm.users = data;
		});
	
	
	
});


