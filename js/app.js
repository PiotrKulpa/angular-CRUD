var app = angular.module('Application', ['ngRoute', 'ngSanitize']);

//Prosta kontrola ścieżek
app.config(['$routeProvider', function($routeProvider) 
{
  $routeProvider.
      when('/', {templateUrl: 'pages/lists.html', controller: 'CustomerListControler'}).
      when('/NewCustomer', {templateUrl: 'pages/new.html', controller: 'CustomerAddControler'}).
      when('/UpdateCustomer/:id', {templateUrl: 'pages/edit.html', controller: 'CustomerEditControler'});
      
}]);

//Zdefiniowanie kontrolerów!

//READ + CREATE
app.controller ('CustomerListControler',[
  '$scope','$http',
  function ($scope, $http) 
  {
		$http({
		method: 'GET',
		url: 'api/index.php/customerlist'
		}).then(function successCallback(response) {
		$scope.customers = response.data.records;
		$scope.msg = '';
		}, function errorCallback(response) {
		$scope.msg = 'Problem with server! Try again later!';
		$scope.msgcss = 'alert alert-danger';
		});
		
  }    
]),
app.controller ('CustomerAddControler',[
  '$scope','$http','$location', '$window', '$sanitize', function ($scope, $http, $location, $window, $sanitize) 
  {
      $scope.master = {};
      $scope.activePath = null;


      $scope.New_Customer = function(customer, AddNewForm) 
	  {
			//sanitize function before POST data
			$scope.customer.Username = $sanitize($scope.customer.Username);
			$scope.customer.First_Name = $sanitize($scope.customer.First_Name);
			$scope.customer.Last_Name = $sanitize($scope.customer.Last_Name);
			$scope.customer.Status = $sanitize($scope.customer.Status);

			//POST
			$http({
				  method: 'POST',
				  url: 'api/index.php',
				  data: customer,
				  headers: {'Content-Type': 'application/json'}
			}).then(function successCallback(response) {
				$window.location = "/testphp/angularcrud";
				$scope.reset();
				$scope.msg = '';
			}, function errorCallback(response) {
				$scope.msg = 'Something went wrong when adding! Try again!';
				$scope.msgcss = 'alert alert-danger';
			});
			  
			$scope.reset = function() {
				$scope.customer = angular.copy($scope.master);
			};

			console.log(customer);
			$scope.reset();
			
			/*
			deprecieted method > 1.4 v
			$http.post('api/index.php', customer).success(function(){
				$window.location = "/testphp/angularcrud";
				$scope.reset();
				$scope.msg = 'Succes! Customer added to database';
			});
			
			$scope.reset = function() {
		  
				$scope.customer = angular.copy($scope.master);
		  
			};
			$scope.reset();
			$scope.msg = 'Failed! Try again!';
			$scope.msgcss = 'alert alert-danger';
			*/
			
      };

  }
]),





//UPDATE + DELETE
app.controller('CustomerEditControler',[
  '$scope','$http','$location','$routeParams',
  function ($scope, $http, $location, $routeParams) 
  {

      //Pobieramy id Klienta
	  //metoda dolaczona do ngRoute
      var id = $routeParams.id;
      $scope.activePath = null;
	  
	  
      //Pobieramy szczegółowe dane Klienta do $scope.CustomerDetail
	  $http({
		method: 'GET',
		url: 'api/index.php/customeredit/'+id,
		}).then(function successCallback(response) {
		$scope.CustomerDetail = response.data.records;
		$scope.msg = '';
		}, function errorCallback(response) {
		$scope.msg = 'Problem with server! Try again later!';
		$scope.msgcss = 'alert alert-danger';
		});
	  

      //Uaktualnienie Klienta
      $scope.Update_Customer = function(customer) 
	  {
			
			$http({
				  method: 'PUT',
				  url: 'api/index.php/customerupdate/'+id,
				  data: customer,
				  headers: {'Content-Type': 'application/json'}
			}).then(function successCallback(response) {
				$scope.CustomerDetail = response.data;
				$scope.activePath = $location.path('/');
			}, function errorCallback(response) {
				$scope.msg = 'Something went wrong when adding! Try again!';
				$scope.msgcss = 'alert alert-danger';
			});
			
			
			/*
			$http.put('api/index.php/customerupdate/'+id, customer).success(function(data) 
			{
				$scope.CustomerDetail = data;
				$scope.activePath = $location.path('/');
				//$location zwraca bieżący adres url
				//$routeParams zwraca parametry url
			});
			*/
      };

      //Kasowanie
      $scope.Delete_Customer = function(customer) 
	  {
			//console.log(customer);
			//var deleteCustomer = confirm('Are you absolutely sure you want to delete?');
			//if (deleteCustomer) {
			$http.delete('api/index.php/customerdelete/'+customer.id);
			$scope.activePath = $location.path('/');
			//}        
      };

  }
]);