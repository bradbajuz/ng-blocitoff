var taskList = {
  items: [
    {title: 'Learn Haskell', days: '7', complete: 'o'},
    {title: 'Take out trash', days: '3', complete: 'o'},
    {title: 'Get beer', days: '1', complete: 'o'}
  ]
};

blocitoff = angular.module('Blocitoff', ['ui.router']);

blocitoff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('landing', {
    url: '/',
    controller: 'Landing.controller',
    templateUrl: '/app/assets/templates/landing.html'
  });
}]);

blocitoff.controller('Landing.controller', ['$scope', function($scope) {
  $scope.header = "A self-destructing todo list.";
  
  $scope.todo = angular.copy(taskList);

}]);