angular.module('starter.controllers', [])

.controller('TabsCtrl', function($scope) {
  localStorage.setItem('players', JSON.stringify($scope.players));
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope) {
  //Array che conterrà i vari oggetti giocatori
  $scope.players = [];
  //Array che conterrà i vari oggetti giocatori "permanenti"
  $scope.storagePlayers = [];

  $scope.saved = localStorage.getItem('players');
  $scope.savedStorage = localStorage.getItem('storagePlayers');

  // se sono presenti dei giocatori abituali, li carico
  if (localStorage.getItem('storagePlayers') !== null) {
    $scope.storagePlayers = JSON.parse($scope.savedStorage);
  }

  //$scope.storagePlayers = []; debug -> elimino tutto

  localStorage.setItem('players', JSON.stringify($scope.players));
  localStorage.setItem('storagePlayers', JSON.stringify($scope.storagePlayers));


  // Aggiunge un giocatore tramite l'input e inizializza il punteggio, creando un array di oggetti in player
  $scope.addPlayer = function() {
    $scope.players.push({ 
      'name':$scope.players.name,
      'totScore':501
    });
      $scope.players.name = ''; //pulisce l'input

      localStorage.setItem('players', JSON.stringify($scope.players));
      localStorage.setItem('storagePlayers', JSON.stringify($scope.storagePlayers));
  };


  //Cancella tutti i giocatori inseriti nell'input
  $scope.removePlayer = function() {
    $scope.players = [];
    localStorage.setItem('players', JSON.stringify($scope.players));
  };

})




.controller('AccountCtrl', function($scope) {
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
  var currentShot = 0;

  /*
    ad ogni click sul pulsante avanti un altro:
    - i pulsanti + vengono attivati
    - il punteggio tot del giocatore viene aggiornato e salvato
  */
  $scope.loadRound = function() {
    $scope.scoreRound = 0;
    clearInput();
    $scope.buttonClicked1 = false;
    $scope.buttonClicked2 = false;
    $scope.buttonClicked3 = false;
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
    else{
      $scope.rounds += 1;
      i = $scope.totPlayers - 1;
      $scope.currentPlayer = $scope.players[i].name;
      $scope.currentScore = $scope.players[i].totScore;
    }
  }


/*

  dovrei trasformare le 3 funzioni addScore in 1 !!!

*/

  /*
    ogni volta che si clicca il pulsante + dell'input, aggiorno il punteggio, e disattivo il pulsante
    -in caso il punteggio è 0 si vince e viene inviata la notifica su slack
    -se il punteggio del lancio è maggiore del punteggio corrente, allora il round del giocatore finisce,
    disattivando i pulsanti + attivi
  */

  $scope.addScore1 = function() {
    currentShot = 0;
    $scope.buttonClicked1 = true;
    $scope.scoreRound += parseInt($scope.fShot);
    currentShot = parseInt($scope.fShot);
    $scope.currentScore -= currentShot;
    if ($scope.currentScore == 0) {
    
    //  $.post("https://hooks.slack.com/services/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" ,{
    //    'payload' : '{"text": "I won :)"}'
    //  });
    
      $scope.win = true;
      $scope.congratulations = "Complimenti sei il vincitore!!!";
    }
    if ($scope.currentScore < 0) {
      $scope.currentScore += currentShot;
      $scope.scoreRound = 0;
      $scope.buttonClicked2 = true;
      $scope.buttonClicked3 = true;
    }

  }

  $scope.addScore2 = function() {
    currentShot = 0;
    $scope.buttonClicked2 = true;
    $scope.scoreRound += parseInt($scope.sShot);
    currentShot = parseInt($scope.sShot);
    $scope.currentScore -= currentShot;
    if ($scope.currentScore == 0) {
    
    //  $.post("https://hooks.slack.com/services/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" ,{
    //    'payload' : '{"text": "I won :)"}'
    //  });
    
      $scope.win = true;
      $scope.congratulations = "Complimenti sei il vincitore!!!";
    }
    if ($scope.currentScore < 0) {
      $scope.currentScore += currentShot;
      $scope.scoreRound = 0;
      $scope.buttonClicked3 = true;
    }

  }

  $scope.addScore3 = function() {
    currentShot = 0;
    $scope.buttonClicked3 = true;
    $scope.scoreRound += parseInt($scope.tShot);
    currentShot = parseInt($scope.tShot);
    $scope.currentScore -= currentShot;
    if ($scope.currentScore == 0) {
    
      //$.post("https://hooks.slack.com/services/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" ,{
      //  'payload' : '{"text": "I won :)"}'
      //});
    
      $scope.win = true;
      $scope.congratulations = "Complimenti sei il vincitore!!!";
    }
    if ($scope.currentScore < 0) {
      $scope.currentScore += currentShot;
      $scope.scoreRound = 0;
    }

  } 

  //Ripulisce le input dopo ogni click
  var clearInput = function() {
    $scope.fShot = '';
    $scope.sShot = '';
    $scope.tShot = '';
  };
});
