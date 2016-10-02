'use strict';

angular
  .module('app.round')
  /**
   * @ngdoc controller
   * @name app.round.controller:RoundController
   * @description
   * The controller for the summary page.
   */
  .controller('RoundController', [
    '$routeParams',
    '$location',
    'SelectedPlayers',
    'Match',
    function($routeParams, $location, SelectedPlayers, Match) {
      var vm = this;

      // Exposes public methods
      vm.addPoint = addPoint;
      vm.cancel = cancel;
      vm.confirm = confirm;
      vm.getMissingPoints = getMissingPoints;
      vm.getRoundSum = getRoundSum;
      vm.go = go;
      vm.init = init;
      vm.isButtonDisabled = isButtonDisabled;
      vm.isRoundCompleted = isRoundCompleted;

      /**
       * @ngdoc property
       * @name RoundController#numbers
       * @type {Array}
       * @propertyOf app.round.controller:RoundController
       * @description The collection of allowed numbers on the circular dartboard.
       */
      vm.numbers = [];

      /**
       * @ngdoc property
       * @name RoundController#player
       * @type {Object}
       * @propertyOf app.round.controller:RoundController
       * @description The current player.
       */
      vm.player = SelectedPlayers.getById($routeParams.playerID);

      // TODO Add docblock
      vm.shotIndex = 0;
  
      // TODO Add docblock
      vm.round = $routeParams.roundID;

      // TODO Add docblock
      vm.shots = [];

      // TODO Add docblock
      vm.button = null;

      // TODO Add docblock
      vm.blockCurrent = false;

      vm.init();

      /**
       * @ngdoc method
       * @name RoundController#init
       * @kind function
       * @methodOf app.round.controller:RoundController
       * @description
       * Initialize the properties of the controller.
       */
      function init() {
        for (var i = 0; i <= 20; i++) {
          vm.numbers.push(i);
        }
        vm.numbers.push(25);
        Match.setCurrentPlayer(vm.player);
      }

      // TODO Add docblock
      function addPoint(value) {
        vm.button = value;
        value = parseInt(value);
        switch (value) {
          case 0:
            // TODO block current button
            vm.blockCurrent = true;
            break;
          case 25:
            if (vm.shots[vm.shotIndex] == value) {
              // TODO block current button
              vm.blockCurrent = true;
            }
            break;
          default:
            if (vm.shots[vm.shotIndex] == value * 2) {
              // TODO block current button
              vm.blockCurrent = true;
            }
            break;
        }
        vm.shots[vm.shotIndex] = vm.shots[vm.shotIndex] ? vm.shots[vm.shotIndex] += value : value;
        // TODO block all other buttons
      }

      // TODO Add docblock
      function cancel() {
        alert('to implement');
      }

      // TODO Add docblock
      function isRoundCompleted() {
        return vm.shots.length == 3 && vm.button == null;
      }

      // TODO Add docblock
      function confirm() {
        vm.blockCurrent = false;
        vm.button = null;
        Match.addRound(vm.player, vm.round, vm.getRoundSum());
        if (vm.shots.length === 3) {
          return;
        }
        vm.shotIndex++;
        // TODO Enable all buttons
      }

      // TODO Add docblock
      function getMissingPoints() {
        // FIXME It should calc the made points.
        return Match.getInitialPoints() - Match.getPoints(vm.player, vm.round - 1) - vm.getRoundSum();
      }

      // TODO Add docblock
      function getRoundSum() {
        var sum = 0;
        angular.forEach(vm.shots, function(value) {
          sum += value;
        });
        return sum;
      }

      // TODO Add docblock
      function go() {
        // NOTE: Object.keys returns "$$hashKey"
        var nextRound = Object.keys(Match.getRounds()[vm.round - 1]).length - 1 < SelectedPlayers.get().length ? vm.round : parseInt(vm.round) + 1;
        $location.path('summary/round/' + nextRound + '/player/' + Match.getNextPlayer().id);
      }

      // TODO Add docblock
      function isButtonDisabled(value) {
        return vm.button != null && value != vm.button || (vm.blockCurrent && value == vm.button);
      }

    }
  ]);
