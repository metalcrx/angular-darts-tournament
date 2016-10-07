'use strict';

describe('player service', function() {
  
  var service;
  beforeEach(function() {
    module('app.player');
    inject(function(player) {
      service = player;           
    });
  });

  describe('selectedPlayers', function() {
    it('Should be 0 players in selectedPlayers', function() {           
      expect(0).toBe(service.selectedPlayers.length);

    });

    it('When addPlayerWithName, vipPlayerList length should increse by one', function() {
      var vipPlayersLength = service.vipPlayerList.length;
      service.addPlayerWithName("pippo");   
      expect(vipPlayersLength + 1).toBe(service.vipPlayerList.length);
    });

    it('When togglePlayer, selectedPlayers length should increse by one', function() {
      var selectedPlayersLength = service.selectedPlayers.length;
      var friend = ({ 
        'name':'pippo',
        'scores':[201],
        'selected':false
      });
      service.togglePlayer(friend);   
      expect(selectedPlayersLength + 1).toBe(service.selectedPlayers.length);
    });
    
    it('When deselectAllPlayer, selectedPlayers length should be zero', function() {
      var friend = ({ 
        'name':'pippo',
        'scores':[201],
        'selected':false
      });
      service.togglePlayer(friend); 
      service.deselectAllPlayer();  
      expect(0).toBe(service.selectedPlayers.length);
    });

    it('indexCurrentPlayer should initially be zero', function() {    
      expect(0).toBe(service.indexCurrentPlayer);
    });

    it('When setIndexCurrentPlayer(index), indexCurrentPlayer should be index', function() { 
      service.setIndexCurrentPlayer(5);  
      expect(5).toBe(service.indexCurrentPlayer);
    });
  });
});
