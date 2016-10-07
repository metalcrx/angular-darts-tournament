'use strict';

angular.module('app.score')

.controller('scoreCtrl', function(player, round) {
  var vm = this;
  vm.selectedPlayers = player.selectedPlayers; // load selected players
  vm.rounds = round.rounds; // load the list of the rounds
  vm.indexCurrentPlayer = player.indexCurrentPlayer; // load the index of the next player
});
