'use strict';

angular.module('app.round')

.controller('roundCtrl', function($localStorage, player, round) {
  var vm = this;
  
  vm.addShotScore = addShotScore;
  vm.deleteShotScore = deleteShotScore;
  vm.winCheck = winCheck;

  vm.selectedPlayers = player.selectedPlayers; // load selected players
  vm.rounds = round.rounds; // load the list of the rounds
  vm.indexCurrentPlayer = player.indexCurrentPlayer; // load the index of the current player
  var shotNumber = 0; //load a value, previously initialized to zero, used to track the number of the shot in the round
  vm.shotsScores = ['-', '-', '-']; // initialize the 3-length array which contains the score of each shot per round (every player has 3 shot each round)
  vm.totalScoreOfRound = 0; // the value of the sum of the 3 shots each round (initialized to 0)
  var bonus = 1; // used to double points and triple points 
  
  /*initializes the list of buttons of points. Each button has 2 properties: value, the integer value of the points done, and disabled, 
  true if the button is disabled false otherwise*/
  vm.buttonList = round.buttonList();
  
  /*called every shot*/
  function nextShot() {
    shotNumber++;
    if (resetScoreIfNegative() || shotNumber > 2) { //tiri finiti, prossimo giocatore (prima aggiungo il punteggo totale del round, e riporto a 0 lo shotNumber)
      var oldScore = vm.selectedPlayers[player.indexCurrentPlayer].scores.pop();
      vm.selectedPlayers[player.indexCurrentPlayer].scores.push(oldScore);
      vm.selectedPlayers[player.indexCurrentPlayer].scores.push(oldScore - vm.totalScoreOfRound);
      shotNumber = 0;
      nextPlayer();
    } 
    else { //ancora tiri disponibili
      bonus = 1;
      setButtonDisabledProperty(false);
      window.location = '#!/round';
    }
  }

  /*called when a player ends his shots*/
  function nextPlayer() {
    player.setIndexCurrentPlayer(player.indexCurrentPlayer + 1);
    if (player.indexCurrentPlayer >= vm.selectedPlayers.length) { //giocatori finiti, prossimo turno
      player.setIndexCurrentPlayer(0);
      nextRound();
    } 
    else { //ci sono giocatori che devono finire il turno corrente
      setButtonDisabledProperty(false);
      window.location = '#!/score';
    }
  }

  /*called when each player ends his round (when the last player in the selctedPlayers list ends his shots)*/
  function nextRound() {
    round.pushRound('Round ' + vm.rounds.length);
    window.location = '#!/score';
  }

  /* Add the score of single shot. index is the index of the clicked button in buttonList */
  function addShotScore(score, index) {
    if (!vm.buttonList[index].disabled) {
      setButtonDisabledProperty(true);
      vm.shotsScores[shotNumber] = bonus * score;
      vm.totalScoreOfRound += score;
      bonus++;
      if (bonus <= 3 && score <= 20) //25 e 50 non possono essere ne doppi ne tripli
        vm.buttonList[index].disabled = false;
      else 
        vm.buttonList[index].disabled = true;
    }
  }

  /*deletes the last shot score and enables all buttons */
  function deleteShotScore() {
    if (vm.shotsScores[shotNumber] != '-') { //se non era stato pigiato nessun tasto, non fa niente!
      vm.totalScoreOfRound -= vm.shotsScores[shotNumber];
      vm.shotsScores[shotNumber] = '-';
      setButtonDisabledProperty(false);
      bonus = 1;
    }
  }

  /*Enables or disables all the button in buttonList*/
  function setButtonDisabledProperty(boolFlag) {
    var i;
    for (i in vm.buttonList)
      vm.buttonList[i].disabled = boolFlag;
  }

  /*cancel the last round of the player who is gone under zero*/
  function resetScoreIfNegative() {
    var oldScore = vm.selectedPlayers[player.indexCurrentPlayer].scores.pop();
    vm.selectedPlayers[player.indexCurrentPlayer].scores.push(oldScore);
    var flag = false;
    if ((oldScore - vm.totalScoreOfRound) < 0) {
      vm.totalScoreOfRound = 0;
      flag = true;
    }
    return flag;
  }

  /*check if someone won the tournament*/
  function winCheck() {
    var oldScore = vm.selectedPlayers[player.indexCurrentPlayer].scores.pop();
    vm.selectedPlayers[vm.indexCurrentPlayer].scores.push(oldScore);
    if ((oldScore - vm.totalScoreOfRound) == 0) {
      window.location = '#!/win';
    }
    else {
      nextShot();
    }
  }

});
