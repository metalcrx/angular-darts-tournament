describe('Test ionicDarts Players', function() {
	
	var startGame = element(by.css('.btn.btn-success.btn-lg'));
	var input_player = element(by.css('.input-group'));

	beforeEach(function() {
    startGame.click();
  });

  it('should have a input', function() {
	  expect(input_player.isPresent()).toBe(true);
	});
});
