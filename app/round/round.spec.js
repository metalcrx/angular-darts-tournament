'use strict';

describe('Unit: round', function() {

  var ctrl;
  // Include Modules
  beforeEach(module('app.round'));

  beforeEach(function() {
    localStorage.players = '[{"name":"asd", "totScore":123}]';
  });

  it('Should have round to equal one', inject(function($controller) {
    ctrl = $controller('roundCtrl', {}, {});
    expect(ctrl.rounds).toEqual(1);
  }));

  it('Should have an arrayScore array', inject(function($controller) {
    ctrl = $controller('roundCtrl', {}, {});
    expect(ctrl.arrayScore).toBeDefined();
  }));

  it('Should have a scoreRound to equal zero', inject(function($controller) {
    ctrl = $controller('roundCtrl', {}, {});
    expect(ctrl.scoreRound).toEqual(0);
  }));
});
