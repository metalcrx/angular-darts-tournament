'use strict';

angular
  .module('app.summary')
  /**
   * @ngdoc controller
   * @name app.summary.controller:SummaryController
   * @description
   * The controller for the summary page.
   */
  .controller('SummaryController', [
    '$location',
    '$routeParams',
    'SelectedPlayers',
    'Match',
    function($location, $routeParams, SelectedPlayers, Match) {
      var vm = this;

      // Exposes public methods
      vm.getPlayers = getPlayers;
      vm.getMissingPoints = getMissingPoints;
      vm.nextRound = nextRound;

      /**
       * @ngdoc property
       * @name SummaryController#match
       * @type {Object}
       * @propertyOf app.summary.controller:SummaryController
       */
      vm.match = Match;

      /**
       * @ngdoc property
       * @name SummaryController#playerID
       * @type {number}
       * @propertyOf app.summary.controller:SummaryController
       */
      vm.playerID = $routeParams.playerID;

      /**
       * @ngdoc property
       * @name SummaryController#round
       * @type {number}
       * @propertyOf app.summary.controller:SummaryController
       */
      vm.roundID = $routeParams.roundID;

      /**
       * @ngdoc method
       * @name SummaryController#getPlayers
       * @kind function
       * @methodOf app.summary.controller:SummaryController
       * @return {Array} The selected players.
       * @description
       * Returns all selected players.
       */
      function getPlayers() {
        return SelectedPlayers.getAll();
      }

      /**
       * @ngdoc method
       * @name SummaryController#getMissingPoints
       * @kind function
       * @methodOf app.summary.controller:SummaryController
       * @return {number|undefined} The missing points of the given player after selected round.
       * @description
       * Returns the missing points of the selected player after the given round.
       */
      function getMissingPoints(player, round) {
        // 0 (zero) is a defined value.
        // If player played that round then a number exists
        if (angular.isNumber(vm.match.getRound(player, round))) {
          return vm.match.getInitialPoints() - vm.match.getPointsUntilRound(player, round);
        }
        return;
      }

      /**
       * @ngdoc method
       * @name SummaryController#nextRound
       * @kind function
       * @methodOf app.summary.controller:SummaryController
       * @description
       * Go to the round view.
       */
      function nextRound() {
        $location.path('round/' + vm.roundID + '/player/' + vm.playerID);
      }

    }
  ]);