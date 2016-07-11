describe('Test ionicDarts Players', function() {
	
	var startGame = element(by.css('.btn.btn-success.btn-lg'));
	var addPlayer = element(by.model('players.name'));
	var button_addPlayer = element(by.css('.btn.btn-default'));
	var input_player = element(by.css('.input-group'));

	beforeEach(function() {
    startGame.click();
  });

/*
  function add(stringName){
  	addPlayer.sendKeys(stringName);
  	button_addPlayer.click();
  }
*/

  it('should have a input', function() {
	  expect(input_player.isPresent()).toBe(true);
	});

/*
	it('should add 3 players', function() {
		add("Topolino");
		add("Paperino");
		add("Pippo");
		var players = element.all(by.repeater('player in players'));
		expect(players.count()).toEqual(3);
	});
*/
});