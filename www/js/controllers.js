angular.module('darts.controllers', [])

.controller('TabsCtrl', function($scope) {
  localStorage.setItem('players', JSON.stringify($scope.players));
})

.controller('HomeCtrl', function($scope) {})

.controller('PlayersCtrl', function($scope) {
  //Array che conterrà i vari oggetti giocatori
  $scope.players = [];

  //Array che conterrà i vari oggetti giocatori "permanenti"
  $scope.storagePlayers = [];

  // Serve per salvarci temporalmente l'ultimo giocatore inserito
  var currentPlayerSaved = {};

  $scope.saved = localStorage.getItem('players');
  $scope.savedStorage = localStorage.getItem('storagePlayers');

  // se sono presenti dei giocatori abituali, li carico
  if (localStorage.getItem('storagePlayers') !== null) {
    $scope.storagePlayers = JSON.parse($scope.savedStorage);
  }

  //$scope.storagePlayers = []; //debug -> elimino tutto

  localStorage.setItem('players', JSON.stringify($scope.players));
  localStorage.setItem('storagePlayers', JSON.stringify($scope.storagePlayers));


  // Aggiunge un giocatore tramite l'input e inizializza il punteggio, creando un array di oggetti in player
  $scope.addPlayer = function() {
    $scope.players.push({ 
      'name':$scope.players.name,
      'totScore':201
    });
      $scope.players.name = ''; //pulisce l'input
      currentPlayerSaved = $scope.players[$scope.players.length-1]; 
      $scope.storagePlayers.push(currentPlayerSaved); //inserisco il giocatore nella lista dei giocatori abituali
      localStorage.setItem('players', JSON.stringify($scope.players));
      localStorage.setItem('storagePlayers', JSON.stringify($scope.storagePlayers));
  };


  //Cancella tutti i giocatori inseriti nell'input
  $scope.removePlayer = function() {
    $scope.players = [];
    localStorage.setItem('players', JSON.stringify($scope.players));
  }

  //Cancella tutti i giocatori inseriti nella tabella
  $scope.removeAllPlayersVip = function() {
    $scope.storagePlayers = [];
    localStorage.setItem('storagePlayers', JSON.stringify($scope.storagePlayers));
  }

  // rimuove solo il giocatore "selezionato" nella tabella dei giocatori abituali
  $scope.removePlayerStorage = function(friend) {
    var index = $scope.storagePlayers.indexOf(friend);
    $scope.storagePlayers.splice(index, 1);
    localStorage.setItem('storagePlayers', JSON.stringify($scope.storagePlayers));
  }

  //inserisce il giocatore della tabella dei giocatori abituali nella lista dei giocatori "pronti" ad iniziare
  $scope.addPlayerInList = function(friend) {
    $scope.players.push(friend);
    localStorage.setItem('players', JSON.stringify($scope.players));
  }
})


.controller('RoundsCtrl', function($scope, $timeout) {
  $scope.saved = localStorage.getItem('players');
  $scope.players = JSON.parse($scope.saved);

  // Inizializzo il round a 1, e poi viene incrementato
  $scope.rounds = 1;

  // Calcolo il numero di giocatori che stanno giocando
  $scope.totPlayers = $scope.players.length;
  var i = $scope.totPlayers - 1;

  // Inizializza la schermata con l'ultimo giocatore aggiunto
  $scope.currentPlayer = $scope.players[i].name;

  // Inizializzo il punteggio con quello dell'ultimo giocatore (perchè sarà il primo a giocare)
  $scope.currentScore = $scope.players[i].totScore;

  // Serve per fermare il gioco in caso di vittoria
  $scope.win = false;

  //serve per salvare ad ogni round il punteggio di tutti i giocatori e vedere se c'è una differenza di 60 punti
  $scope.arrayScore = [];

  //viariabili che contengono rispettivamente il punteggio del round e il punteggio corrente di ogni lancio
  $scope.scoreRound = 0;

  $scope.darts = [0,0,0];

  /*
    ad ogni click sul pulsante avanti un altro:
    - i pulsanti + vengono attivati
    - il punteggio tot del giocatore viene aggiornato e salvato
  */
  $scope.loadRound = function() {
    $scope.currentScore -= $scope.scoreRound;
    $scope.scoreRound = 0;
    $scope.darts = [0,0,0];
    $scope.multiplierFlag = [
      [false, false],
      [false, false],
      [false, false]
    ];
    $scope.scoreMultiplier = [1,1,1];

    $scope.players[i].totScore = $scope.currentScore;
    localStorage.setItem('players', JSON.stringify($scope.players));

    /*
      confronto i punteggi dei vari giocatori, e in caso di una diffenza di 60 punti, mando una notifica su slack
    */ 
    if ($scope.arrayScore.length >= $scope.totPlayers) {
      $scope.arrayScore = [];
    }
    else{
      $scope.arrayScore.push($scope.currentScore);
      $scope.arrayScore.sort();
      if ($scope.arrayScore[$scope.arrayScore.length-1] - $scope.arrayScore[0] >= 60) {
    
     // $.post("https://hooks.slack.com/services/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" ,{
     //   'payload' : '{"text": "I\'m winning :P"}'
     // });
    
      }
    }

    /*
    ad ogni click aggiorno il nome e punteggio del giocatore, quando tutti i giocatori hanno lanciato,
    aggiorno il anche il numero del round
    */

    if(i != 0) {
      i--;
      $scope.currentPlayer = $scope.players[i].name;
      $scope.currentScore = $scope.players[i].totScore;
    }
    else {
      $scope.rounds += 1;
      i = $scope.totPlayers - 1;
      $scope.currentPlayer = $scope.players[i].name;
      $scope.currentScore = $scope.players[i].totScore;
    }
  }

  $scope.scoreMultiplier = [1,1,1];

  $scope.multiplierFlag = [
    [false, false],
    [false, false],
    [false, false]
  ];

  $scope.setSelected = function(flagRow, flagColumn) {
    if (flagColumn === 0) {
      $scope.multiplierFlag[flagRow][1] = false;
    }
    else if (flagColumn === 1){
      $scope.multiplierFlag[flagRow][0] = false;
    }

    if($scope.multiplierFlag[flagRow][0]) {
      $scope.scoreMultiplier[flagRow] = 2;
    }
    else if ($scope.multiplierFlag[flagRow][1]) {
      $scope.scoreMultiplier[flagRow] = 3;
    }
    else {
      $scope.scoreMultiplier[flagRow] = 1;
    }

    $scope.addScore();
  };


  $scope.addScore = function() {

    $scope.scoreRound = ($scope.darts[0]*$scope.scoreMultiplier[0] || 0) + 
      ($scope.darts[1]*$scope.scoreMultiplier[1] || 0) + 
      ($scope.darts[2]*$scope.scoreMultiplier[2] || 0);

    if ($scope.currentScore - $scope.scoreRound < 0) {
      $scope.scoreRound = 0;
    }

    if ($scope.currentScore - $scope.scoreRound == 0) { 
    //  $.post("https://hooks.slack.com/services/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" ,{
    //    'payload' : '{"text": "I won :)"}'
    //  });
      $scope.win = true;
      $scope.congratulations = "Complimenti sei il vincitore!!!";
    }
  }
});
