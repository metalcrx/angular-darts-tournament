describe('Test ionicDarts Players', function() {

	var addPlayer = element(by.model('players.name'));
	var button_addPlayer = element(by.css('.btn-default'));
	var button_remove_player = element(by.css('.btn-warning'));

  	function add(stringName){
  		addPlayer.sendKeys(stringName);
  		button_addPlayer.click();
  	}

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