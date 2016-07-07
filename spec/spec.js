describe('ionicDarts app', function() {

	describe('Test ionicDarts Homepage', function() {
		beforeEach(function() {
    		browser.get('http://localhost:8100/#/tab/dash');
  		});

		it('should have a title', function() {    	
	    	expect(browser.getTitle()).toEqual('Homepage');
	  	});

	  	it('should have a button', function() {
	  		var home_button = element(by.css('.btn'));
	    	expect(home_button.isPresent()).toBe(true);
	  	});
	});

	describe('Test ionicDarts Players', function() {
		beforeEach(function() {
    		browser.get('http://localhost:8100/#/tab/chats');
  		});

		var addPlayer = element(by.model('players.name'));
		var button_addPlayer = element(by.css('.btn-default'));
		var button_remove_player = element(by.css('.btn-warning'));

  		function add(stringName){
  			addPlayer.sendKeys(stringName);
  			button_addPlayer.click();
  		}

		it('should have a title', function() {    	
	    	expect(browser.getTitle()).toEqual('Players');
	  	});

	  	it('should have a input', function() {
	  		var input_player = element(by.css('.form-control'));
	    	expect(input_player.isPresent()).toBe(true);
	  	});

	  	it('should have a button', function() {
	    	expect(button_addPlayer.isPresent()).toBe(true);
	  	});

	  	it('should add 3 players', function() {
			add("Topolino");
			add("Paperino");
			add("Pippo");
			var players = element.all(by.repeater('player in players'));
			expect(players.count()).toEqual(3);
	  	});
	});
	
});