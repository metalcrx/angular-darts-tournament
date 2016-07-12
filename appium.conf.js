var protractor = require('protractor');

exports.config = {
  
  sauceSeleniumAddress: 'ondemand.saucelabs.com:80/wd/hub',

  specs: [
    'spec/*.spec.js'
  ],

  sauceUser: "vendini-italia",
  sauceKey: "c8925b86-e7fa-49a3-b634-2afee0f4e1d4",

  multiCapabilities: [
    {
    autoWebview: true,
    browserName: '',
    platformName: 'iOS',
    platformVersion: '9.0',
    deviceName: 'iPhone 5s',
    deviceOrientation: 'portrait',
    appiumVersion: "1.5.3",
    app: "sauce-storage:ionicDarts.zip"
    }, {
    autoWebview: true,
    browserName: '',
    platformName: 'Android',
    platformVersion: '4.4',
    deviceName: 'Samsung Galaxy S4 Emulator',
    deviceOrientation: 'portrait',
    appiumVersion: "1.5.3",
    app: "sauce-storage:android-debug.apk"
    }
  ],

  onPrepare: function () {
    console.log("onPrepare()");
    var wd = require('wd'),
        protractor = require('protractor'),
        wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);
    console.log("onPrepare() done");
  }
};
