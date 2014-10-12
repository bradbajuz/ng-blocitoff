blocitoff = angular.module('Blocitoff', ['ui.router']);

blocitoff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('landing', {
    url: '/',
    controller: 'Landing.controller',
    templareUrl: '/templates/landing.html'
  });
}]);

blocitoff.controller('Landing.controller', ['$scope', function($scope) {

}]);