var app = angular.module('Application', ['ngRoute']);

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
      $http.get('api/index.php/customerlist').success(function(data) 
	  {
		$scope.customers = data.records;  
      });
  }    
]),
app.controller ('CustomerAddControler',[
  '$scope','$http','$location', '$window', function ($scope, $http, $location, $window) 
  {
      $scope.master = {};
      $scope.activePath = null;
      $scope.New_Customer = function(customer, AddNewForm) 
	  {
			console.log(customer);
			
			$http.post('api/index.php', customer).success(function(){
				$window.location = "/testphp/angularcrud";
				$scope.reset();	
			});
			
			$scope.reset = function() {
              
				$scope.customer = angular.copy($scope.master);
			  
			};
          $scope.reset();
      };

  }
]),





//UPDATE + DELETE
app.controller('CustomerEditControler',[
  '$scope','$http','$location','$routeParams',
  function ($scope, $http, $location, $routeParams) 
  {

      //Pobieramy id Klienta
      var id = $routeParams.id;
      $scope.activePath = null;
	  
      //Pobieramy szczegółowe dane Klienta do $scope.CustomerDetail
      $http.get('api/index.php/customeredit/'+id).success(function(data) 
	  {
			$scope.CustomerDetail = data.records;
      });

      //Uaktualnienie Klienta
      $scope.Update_Customer = function(customer) 
	  {
			$http.put('api/index.php/customerupdate/'+id, customer).success(function(data) 
			{
				$scope.CustomerDetail = data;
				$scope.activePath = $location.path('/');
				//$location zwraca bieżący adres url
				//$routeParams zwraca parametry url
			});

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