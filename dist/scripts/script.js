"use strict";angular.module("app.home",["ngRoute","ngStorage"]).config(["$routeProvider",function(r){r.when("/",{templateUrl:"home/home.view.html",controller:"homeCtrl"})}]),angular.module("app.player",["ngRoute","ngStorage"]).config(["$routeProvider",function(r){r.when("/player",{templateUrl:"player/player.view.html",controller:"playerCtrl",controllerAs:"vm"})}]),angular.module("app.round",["ngRoute","ngStorage"]).config(["$routeProvider",function(r){r.when("/round",{templateUrl:"round/round.view.html",controller:"roundCtrl",controllerAs:"vm"})}]),angular.module("app.home").controller("homeCtrl",function(){}),angular.module("app.player").controller("playerCtrl",["$localStorage",function(r){var e=this;e.players=[],e.storagePlayers=[],e.savedStorage=r.getItem("storagePlayers"),null!==r.getItem("storagePlayers")&&(e.storagePlayers=JSON.parse(e.savedStorage)),r.setItem("players",JSON.stringify(e.players)),r.setItem("storagePlayers",JSON.stringify(e.storagePlayers)),e.addPlayer=function(){e.players.push({name:e.name,totScore:501}),e.name="";var o={};o=e.players[e.players.length-1],e.storagePlayers.push(o),r.setItem("players",JSON.stringify(e.players)),r.setItem("storagePlayers",JSON.stringify(e.storagePlayers))},e.removeAllPlayers=function(){e.players=[],r.setItem("players",JSON.stringify(e.players))},e.removePlayerStorage=function(o){var t=e.storagePlayers.indexOf(o);e.storagePlayers.splice(t,1),r.setItem("storagePlayers",JSON.stringify(e.storagePlayers))},e.addPlayerInList=function(o){e.buttonAddPlayerTable=!0,e.players.push(o),r.setItem("players",JSON.stringify(e.players))}}]),angular.module("app.round").controller("roundCtrl",["$localStorage",function(r){var e=this;e.players=JSON.parse(r.getItem("players")),e.currentRound=1;var o=e.players.length,t=o-1;e.currentPlayer=e.players[t].name,e.currentScore=e.players[t].totScore,e.win=!1,e.arrayScore=[],e.scoreRound=0;var a=0;e.loadRound=function(){e.scoreRound=0,n(),e.buttonClicked1=!1,e.buttonClicked2=!1,e.buttonClicked3=!1,e.players[t].totScore=e.currentScore,r.setItem("players",JSON.stringify(e.players)),e.arrayScore.length>=o?e.arrayScore=[]:(e.arrayScore.push(e.currentScore),e.arrayScore.sort(),e.arrayScore[e.arrayScore.length-1]-e.arrayScore[0]>=60&&$.post("https://hooks.slack.com/services/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",{payload:'{"text": "I\'m winning :P"}'})),0!=t?(t--,e.currentPlayer=e.players[t].name,e.currentScore=e.players[t].totScore):(e.currentRound+=1,t=o-1,e.currentPlayer=e.players[t].name,e.currentScore=e.players[t].totScore)},e.addScore1=function(){a=0,e.buttonClicked1=!0,e.scoreRound+=parseInt(e.fShot),a=parseInt(e.fShot),e.currentScore-=a,0==e.currentScore&&($.post("https://hooks.slack.com/services/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",{payload:'{"text": "I won :)"}'}),e.win=!0,e.congratulations="Complimenti sei il vincitore!!!"),e.currentScore<0&&(e.currentScore+=a,e.scoreRound=0,e.buttonClicked2=!0,e.buttonClicked3=!0)},e.addScore2=function(){a=0,e.buttonClicked2=!0,e.scoreRound+=parseInt(e.sShot),a=parseInt(e.sShot),e.currentScore-=a,0==e.currentScore&&($.post("https://hooks.slack.com/services/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",{payload:'{"text": "I won :)"}'}),e.win=!0,e.congratulations="Complimenti sei il vincitore!!!"),e.currentScore<0&&(e.currentScore+=a,e.scoreRound=0,e.buttonClicked3=!0)},e.addScore3=function(){a=0,e.buttonClicked3=!0,e.scoreRound+=parseInt(e.tShot),a=parseInt(e.tShot),e.currentScore-=a,0==e.currentScore&&($.post("https://hooks.slack.com/services/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",{payload:'{"text": "I won :)"}'}),e.win=!0,e.congratulations="Complimenti sei il vincitore!!!"),e.currentScore<0&&(e.currentScore+=a,e.scoreRound=0)};var n=function(){e.fShot="",e.sShot="",e.tShot=""}}]),angular.module("app",["ngRoute","ngStorage","app.home","app.player","app.round"]).config(["$locationProvider","$routeProvider",function(r,e){r.hashPrefix("!"),e.otherwise({redirectTo:"/"})}]);