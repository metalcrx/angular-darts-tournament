'use strict';

angular.module('app.player', [
  'ngRoute',
  'ngStorage'
])

.service('player', function($localStorage) { 
  this.vipPlayerList = $localStorage.storagePlayers || [];

  this.initVipPlayer = function() {
    for (var i in this.vipPlayerList) {
      this.vipPlayerList[i].scores = [201];
      this.vipPlayerList[i].selected = false;
    }
  };

  this.addPlayerWithName = function(name) { 
    this.vipPlayerList.push({ 
      'name':name,
      'scores':[201],
      'selected':false
    }); 
  };

  this.selectedPlayers = $localStorage.selectedPlayers || [];
  
  this.deselectAllPlayer = function() {
    this.selectedPlayers = [];
  };

  this.togglePlayer = function(friend) {
    var index = this.selectedPlayers.indexOf(friend);
    if (index == -1)  // select
      this.selectedPlayers.push(friend);
    else  // deselect
      this.selectedPlayers.splice(index, 1);
    $localStorage.selectedPlayers = this.selectedPlayers;
  };

  this.indexCurrentPlayer = 0;

  this.setIndexCurrentPlayer = function(index) {
    this.indexCurrentPlayer = index;
  };
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/player', {
    templateUrl: 'player/player.view.html',
    controller: 'playerCtrl',
    controllerAs: 'vm'
  });
}]);