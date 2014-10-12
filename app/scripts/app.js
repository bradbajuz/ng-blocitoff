bloccitoff = angular.module('Bloccitoff', ['ui.router']);

bloccitoff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('landing', {
    url: '/',
    controller: 'Landing.controller',
    templareUrl: '/templates/landing.html'
  });
}]);

bloccitoff.controller('Landing.controller', ['$scope', function($scope) {

}]);