angular.module('AirplaneApp', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  // $urlRouterProvider.otherwise('/404');

  $stateProvider
  .state('airplanes', {
    url: '/',
    templateUrl: 'views/airplanes.html',
    controller: 'AirplaneCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'views/404.html'
  });

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');
}])

.controller('AirplaneCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.airplane = {
    manufacturer: '',
    model: '',
    engines: null
  };

 $http.get('/api/airplanes').then(function success(res) {
    // console.log(res);
    $scope.airplanes = res.data;
  }, function error(res) {
    console.log(res);
  });

  $scope.delete = function(id, idx) {
    // console.log(id);
    $http.delete('/api/airplanes/' + id).then(function success(res) {
      $scope.airplanes.splice(idx, 1);
    }, function error(res) {
      alert('fail');
    });
  }

  $scope.add = function () {
    // sends as json, not url encoded data
    $http.post('/api/airplanes', $scope.airplane).then(function success(res) {
      $scope.airplanes.push(res.data);
      $scope.airplane.manufacturer = '';
      $scope.airplane.model = '';
      $scope.airplane.engines = null;
    }, function error(res) {
      alert('fail');
      console.log(res);
    });
  }

}]);
