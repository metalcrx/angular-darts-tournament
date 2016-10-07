'use strict';

angular.module('app.player')

.controller('playerCtrl', function(player, round) {
  var vm = this;
  var minNumPlayersForTournament = 2; // minimum number of players to start a tournament
  
  vm.addPlayer = addPlayer;
  vm.addPlayerButtonClicked = addPlayerButtonClicked;
  vm.togglePlayer = togglePlayer;
  vm.startTournament = startTournament;
  
  player.deselectAllPlayer(); //svuota la lista dei giocatori selezionati al caricamento del modulo
  player.initVipPlayer(); //initialize the vip player list (selected property to false end scores to [201])

  vm.vipPlayersList = player.vipPlayerList; // load the VIP players in the table
  vm.selectedPlayers = player.selectedPlayers; // array with selected players
  vm.isAddPlayerButtonVisible = true; // addButton is initially visibile
  vm.isStartButtonVisible = false; //controls the shown of start button
  
  /* add player with a name, initial score and state (selected or not) */
  function addPlayer(name) {
    player.addPlayerWithName(name);
    vm.name = ''; // clear input
    vm.isAddPlayerButtonVisible = true; // when a player has been added, addPlayerButton has to be visibile
  }

  /* sets the value of isAddButtonClicked on true when addButton is clicked */
  function addPlayerButtonClicked() {
    vm.isAddPlayerButtonVisible = false;
  }

  /* put or remove the vip player in the list of selected player */
  function togglePlayer(friend) {
    player.togglePlayer(friend);
    friend.selected = !friend.selected;
    vm.isStartButtonVisible = false;
    if (vm.selectedPlayers.length >= minNumPlayersForTournament)
      vm.isStartButtonVisible = true;
  }

  /* brings back to false the state (selected or not) of the selected players 
     and intialize the first round */
  function startTournament() {
    player.initVipPlayer();
    player.setIndexCurrentPlayer(0);
    round.init();
  }
});
