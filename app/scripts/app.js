blocitoff = angular.module('Blocitoff', ['ui.router']);

blocitoff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider.state('landing', {
    url: '/',
    controller: 'Landing.controller',
    templateUrl: '/app/assets/templates/landing.html'
  });
}]);

blocitoff.controller('Landing.controller', ['$scope', 'TaskService', '$interval', function($scope, TaskService, $interval) {
  
  var loadTasks = function (){
    TaskService.all(function(data){
      $scope.items = data;
    });
  };
  
  $interval(loadTasks, 10000);

  loadTasks();

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

  $scope.toggleCompletion = function(item) {
    item.complete = !item.complete;

    TaskService.update(item);
  }

}]);

blocitoff.filter('formatDay', function () {
  return function (timeDay) {
    var oneDay = 86400000;
    var timeCreated = new Date(timeDay.created_at).getTime();
    var subtractDays = timeCreated - Date.now();
    var daysLeft = Math.round(subtractDays / oneDay + 7);
    if (daysLeft === 0) {
      return "Less than a day";
    } else if (daysLeft < 0){
      return "Expired";
    } else {
      return daysLeft;
    }
  };
});

blocitoff.factory('TaskService', ['$http', function($http) {

  return {
    all: function(callback){
      $http.get('http://127.0.0.1:8080/tasks.json').success(callback);
    },

    save: function(item){
      $http.post('http://127.0.0.1:8080/tasks.json', item).success(function(data){
        item.id = data.id;
        item.created_at = data.created_at;
      });
    },

    update: function(item){
      $http.patch('http://127.0.0.1:8080/tasks/' + item.id + '.json', item);
    }
  };

}]);