describe('ionicDarts app', function() {

  it('should have a title', function() {
    browser.get('http://localhost:8100/#/tab/dash');
    expect(browser.getTitle()).toEqual('Homepage');
  });
  
});