'use strict';

angular.module('app.round', [
  'ngRoute',
  'ngStorage'
])

.service('round', function($localStorage) { 

  this.rounds = $localStorage.rounds;
  
  this.init = function() {
    this.rounds = ['Start', 'Round 1'];
    $localStorage.rounds = this.rounds;
  };

  this.pushRound = function(nameRound) {
    this.rounds.push(nameRound);
    $localStorage.rounds = this.rounds;
  };

  this.buttonList = function() {
    var buttonList = [];
    for (var buttonValue = 0; buttonValue <= 20; buttonValue++) {
      buttonList.push({  
        'value':buttonValue,  
        'disabled':false
      });
    }
    buttonList.push({
      'value':25,
      'disabled':false
    });
    buttonList.push({
      'value':50,
      'disabled':false
    });
    return buttonList;
  };
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/round', {
    templateUrl: 'round/round.view.html',
    controller: 'roundCtrl',
    controllerAs: 'vm'
  });
}])

.directive('myButtonTable', function() {
  return {
    restrict: "EA",
    templateUrl: '/app/round/myButtonTableTemplate.html'
  };
});