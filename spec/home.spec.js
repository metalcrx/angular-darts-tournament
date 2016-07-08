describe('Test ionicDarts Homepage', function() {

	it('should have a button', function() {
	  	var home_button = element(by.css('.btn'));
	    expect(home_button.isPresent()).toBe(true);
	});
});