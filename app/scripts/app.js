blocitoff = angular.module('Blocitoff', ['ui.router']);

blocitoff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('landing', {
    url: '/',
    controller: 'Landing.controller',
    templateUrl: '/app/assets/templates/landing.html'
  });
}]);

blocitoff.controller('Landing.controller', ['$scope', 'TaskService', function($scope, TaskService) {
  $scope.header = "A self-destructing todo list.";
  
  TaskService.all(function(data){
    $scope.items = data;
  });

  $scope.addTodo = function () {
    var newItem = {item: $scope.todoTitle, complete: false};
    $scope.items.push(newItem);
    $scope.todoTitle = "";
    TaskService.save(newItem);
  }

  $scope.expiredTodo = function (item) {
    var deadline = (new Date(item.created_at).getTime() + 604800000);
    return deadline < Date.now();
  }
    
}]);

blocitoff.filter('formatDay', function () {
  return function (timeDay) {
    var result = new Date(timeDay.created_at).getTime();
    return result;
  };
});

blocitoff.factory('TaskService', ['$http', function($http) {

  return {
    all: function(callback){
      $http.get('http://127.0.0.1:8080/tasks.json').success(callback);
    },

    save: function(item){
      $http.post('http://127.0.0.1:8080/tasks.json', item);
    }
  };

}]);