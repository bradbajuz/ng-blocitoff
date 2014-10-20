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

  $scope.items = [
    {title: 'Learn Haskell', days: 7, complete: false, expired: false},
    {title: 'Take out trash', days: 3, complete: false},
    {title: 'Get beer', days: 1, complete: false},
    {title: 'Learn to program', days: 90, complete: false, expired: true}
  ];
  
  $scope.addTodo = function () {
    $scope.items.push({title: $scope.todoTitle, days: 7, complete: false})
    $scope.todoTitle = "";
  }

  $scope.expiredTodo = function () {
    if ($scope.items.days > 7) {
      
    }
  }
    
}]);