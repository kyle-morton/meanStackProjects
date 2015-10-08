angular.module('routerApp', ['routerRoutes'])

//create controllers 

//this one will be used for entire site
.controller('mainController', function () {

	var vm = this;
	
	vm.bigMessage = 'Main Controller Is Working';

})

.controller('homeController', function() {
	var vm = this;
	
	vm.message = "Home Page!";
})

.controller('aboutController', function() {
	var vm = this;
	
	vm.message = "About Page!";
})

.controller('contactController', function() {
	var vm = this;
	
	vm.message = "Contact Page!";
});


