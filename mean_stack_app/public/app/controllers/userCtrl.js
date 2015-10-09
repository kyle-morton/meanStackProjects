console.log("initializing user Controller!")

angular.module ('userCtrl', ['userService'])

//Inject USER factory
.controller ('userController', function (User) {
	
	
	
	var vm = this;
	vm.processing = true;
	
	vm.loadUsers = function(){
	//get all users from the userFactory
	User.all()
		.success(function(data) { //on success, bind data to controller
			vm.processing = false;
			vm.users = data;
		});
	};
	
	//load users on init
	vm.loadUsers();
	
	
	
	
	
	
	vm.deleteUser = function(id) {
		vm.processing = true;
		
		//call User Factory to delete user
		User.delete(id)
			.success(function(data) {
				
				//user was deleted successfully
				//refetch user's list
				vm.loadUsers();
				
			});
		
	};
	

	
	
})

//controller only used for creating new users
.controller('userCreateController', function(User) {
	
	var vm = this;
	vm.type = "create";
	
	//create user
	vm.saveUser = function() {
		vm.processing = true;
		vm.message = '';
		
		//use create function of User service
		//pass the userData object that contains the 
		//3 fields already from the form input binding
		User.create(vm.userData)
			.success(function(data) {
				//set proc, userData to defaults
				vm.processing = false;
				vm.userData = {};
				
				//display message returned by API
				vm.message = data.message;
				
			});	
		
	};
	
});


