var app = angular.module('Application', ['ngRoute']);

//Prosta kontrola ścieżek
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'pages/lists.html', controller: 'CustomerListControler'}).
      when('/NewCustomer', {templateUrl: 'pages/new.html', controller: 'CustomerAddControler'}).
      when('/UpdateCustomer/:id', {templateUrl: 'pages/edit.html', controller: 'CustomerEditControler'});
      
}]);

//Zdefiniowanie kontrolerów!

//Odczyt danych za pomocą serwisu http
//Scieżka 'api/Customers' odwołuje się do wirtualnych scieżek Codeigniter
//Za pomocą żadania GET Przypisuje do zmiennej customers dane ze zmiennej data pobranej z Codeigniter
app.controller ('CustomerListControler',[
  '$scope','$http',
  function ($scope, $http) {
      $http.get('api/index.php/customerlist').success(function(data) {
        $scope.customers = data.records;  
      });
  }    
]),
app.controller ('CustomerAddControler',[
  '$scope','$http','$location',
  function ($scope, $http, $location, $window) {
      $scope.master = {};
      $scope.activePath = null;
      $scope.New_Customer = function(customer, AddNewForm) {
          console.log(customer);
          $http.post('/api/', customer).success(function(){
              $scope.reset();
        $scope.activePath = $location.path('/');
			  //document.location.href='http://localhost/testphp/angularcrud/api/',true;
          });
          $scope.reset = function() {
              $scope.customer = angular.copy($scope.master);
          };
          $scope.reset();
      };

  }
]),


//Kontroler obsługujący edycję Klientów jesli nastąpi przekierowanie na /UpdateCustomer/:id
//$location zwraca bieżący adres url
//$routeParams zwraca parametry url
app.controller('CustomerEditControler',[
  '$scope','$http','$location','$routeParams',
  function ($scope, $http, $location, $routeParams) {

      //Pobieramy id Klienta
      var id = $routeParams.id;
      $scope.activePath = null;
      //Pobieramy szczegółowe dane Klienta do $scope.CustomerDetail
      $http.get('api/index.php/customeredit/'+id).success(function(data) {
        $scope.CustomerDetail = data.records;
      });

      //Uaktualnienie Klienta
      $scope.Update_Customer = function(customer) {
          $http.put('api/index.php/customerupdate/'+id, customer).success(function(data) {
          $scope.CustomerDetail = data;
          $scope.activePath = $location.path('/');
        });

      };

      //Kasowanie
      $scope.Delete_Customer = function(customer) {
          //console.log(customer);
          //var deleteCustomer = confirm('Are you absolutely sure you want to delete?');
          //if (deleteCustomer) {
              $http.delete('api/Customers/'+customer.id);
              $scope.activePath = $location.path('/');
          //}        
      };

  }
]);