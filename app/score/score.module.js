'use strict';

angular
.module('app.score', [
  'ngRoute',
  'ngStorage'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/score', {
    templateUrl: 'score/score.view.html',
    controller: 'scoreCtrl',
    controllerAs: 'vm'
  });
}]);