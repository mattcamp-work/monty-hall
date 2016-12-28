/*

Table of Contents:
  
Setup
Steps

init

Functions

user function
host function 
timeline functions
generic / utility functions


=== 

clean up timeline function
use arrays / objects instead of the dom 

*/


/*

I need a beach head. 

*/

(function(window) {


    'use strict';



    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];

            }
        }
        return a;
    }

    var MHgame = function(el, options) {
        this.el = el;
        this._options = extend({}, this._options);
        extend(this._options, options);
        this._init();
     }

    MHgame.prototype._score = {
        wins: 0,
        games: 0,
        losses: function() {
            return this.score.games - this.score.wins
        }
    }



    MHgame.prototype._options = {

        doorCount: 3,
        prizeCount: 1,
        hostDoorCount: 1,
        userDoorCount: 1,
        winThreshhold: 1,
        hostKnowsPrize: false,
        simulationMode: false,
        stepDelay: 1000,
        check: function() {
            return (this.doorCount >= (this.hostOpenCount + this.userOpenCount)) && (this.winThreshold <= this.prizeCount);
        }

    }


   

    MHgame.prototype._buildStage = function() {

        var _self = this;

        _self.doors = [];

        var Door = function() {};
        Door.prototype.hasPrize = false;
        Door.prototype.userPicked = false;
        Door.prototype.hostOpened = false;
        Door.prototype.userOpened = false;
        Door.prototype.id = 0;

        var prizeArray = _self._getRandUnique(_self._options.doorCount, _self._options.prizeCount);

        for (var i = 0; i < _self._options.doorCount; i++) {

            _self.doors[i] = new Door;
            _self.doors[i].id = i;

            if (prizeArray.indexOf(i) > -1) {
                _self.doors[i].hasPrize = true;
            }

        } 

        $(_self.el).append("<ul class='stage'></ul>");

        _self.stageElement = $(_self.el).find("ul.stage");

        console.log(_self.stageElement);

    }

    MHgame.prototype._renderStage = function() {

        var _self = this;

        if (_self._options.simulationMode) {
            return;
        }

        if ($(_self.stageElement).find("li.door-frame").length < 1) {

            _self._buildDoors();

        } else {
            _self._updateDoors();
        }
    }

    MHgame.prototype._buildDoors = function() {

        var _self = this;
        
        for (var i = 0; i < _self.doors.length; i++) {
            var doorMarkup = $("<li class='door-frame'><div class='door'></div><div class='prize-container'></div></li>\n\n");

            if (_self.doors[i].hasPrize) {
                $(doorMarkup).addClass('has-prize');
            }

            $(_self.stageElement).append(doorMarkup);
        }
    }

    MHgame.prototype._updateDoors = function() {

        var _self = this;

        if (_self._options.simulationMode) {
          return;
        }

        $(_self.stageElement).find('li.door-frame').each(function(_key, _val) {

            if (_self.doors[_key].userPicked) {
                $(this).addClass('picked');
            }

            if (_self.doors[_key].hostOpened) {
                $(this).addClass('opened');
            }

            if (_self.doors[_key].userOpened) {
                $(this).addClass('opened');
            }

        });

    }



    MHgame.prototype._userPicksDoor = function() {

        var _self = this;

        var userPickCount = {
            true: 0,
            false: 0
        }

        $(_self.stageElement).find("li.door-frame").on("click", function() {

            _self.doors[$(this).index()].userPicked = true;
          
            userPickCount = _.countBy(_self.doors, function(doorObj) {
                return doorObj.userPicked == true;
            })

            if (userPickCount.true >= _self._options.userDoorCount) {

              console.log("user has finished picking doors");

                $(_self.stageElement).find("li.door-frame").unbind();
                _self._renderStage();

                window.setTimeout(function() {
                    _self.step_3();
                }, 1500);

            }

        });



    }

    MHgame.prototype._hostOpensDoor = function() {

        var _self = this;

        var unpickedDoors = _.filter(_self.doors, function(doorObj) {
            if (doorObj.userPicked == false && doorObj.hasPrize == false) {
                return doorObj;
            };
        });


        var randomDoorList = _self._getRandUnique(unpickedDoors.length, _self._options.hostDoorCount);

        for (var i = 0; i < randomDoorList.length; i++) {

            _self.doors[unpickedDoors[randomDoorList[i]].id].hostOpened = true;

        }



        console.log("host has opened a door");

        console.table(_self.doors);

        _self._renderStage();

        window.setTimeout(function() {
            _self.step_4();
        }, 300);

    }

    MHgame.prototype._userOpensDoor = function() {

        var _self = this;

        $(_self.stageElement).find("li.door-frame").on("click", function() {

            _self.doors[$(this).index()].userOpened = true;

            console.table(_self.doors);

            var userOpenCount = {
                true: 0,
                false: 0
            }

            var userOpenCount = _.countBy(_self.doors, function(doorObj) {
                return doorObj.userOpened == true;
            })

            console.dir(userOpenCount)

            if (userOpenCount.true >= _self._options.userDoorCount) {

                console.log("user has finished opening doors");
                console.log("user door count"+_self._options.userDoorCount);

                $(_self.stageElement).find("li.door-frame").unbind("click");

                _self._renderStage();

                _self.step_5();

            }

        });

    }



    //function(theStep, stepDelayOverride)

    MHgame.prototype._playStep = function(theStep, stepDelayOverride) {

        var _self = this;

        var localStepDelay = _self._options.stepDelay;

        if (typeof stepDelayOverride != 'undefined') {
            localStepDelay = stepDelayOverride;
        }

        // if simulation mode is on, skip the timeout. 
        if (_self._options.simulationMode) {
            // return _self.steps[theStep].call();
        }

        window.setTimeout(function() {

            //_self.steps[theStep]();

            theStep;

            console.log("localStepDelay: " + localStepDelay);

        }, localStepDelay);


    }


    MHgame.prototype._scoreTheGame = function() {

      var _self = this;
        //_self._userOpensDoor();

       var wins = _.filter(_self.doors,function(doorObj){
        if(doorObj.hasPrize == true && doorObj.userOpened == true) {
          return doorObj
        }
       });

       if (wins.length >= _self._options.winThreshold) {
        _self._score.wins += 1;
       }

       _self._score.games += 1;

       console.table(_self._score);

      

       window.setTimeout(function() {

           _self._reset();

       }, 3000);
    }


    MHgame.prototype._reset = function() {

       var _self = this;

       _self.doors = [];


       if(!_self._options.simulationMode) {

           $(_self.el).html("");
       }
      

      _self.step_1();
    }




    MHgame.prototype.step_1 = function() {

        var _self = this;

        console.dir(_self);

        _self._buildStage();
        _self._renderStage();

        window.setTimeout(function() {
            _self.step_2();
        }, _self._options.stepDelay);

        console.log("playing step 2");


    }

    MHgame.prototype.step_2 = function() {

        var _self = this;
        _self._userPicksDoor();

        console.log("playing step 3");

    }


    MHgame.prototype.step_3 = function() {

        var _self = this;
        _self._hostOpensDoor();

        console.log("playing step 3");

    }

    MHgame.prototype.step_4 = function() {

        var _self = this;
        _self._userOpensDoor();

        console.log("playing step 4");

    }


    MHgame.prototype.step_5 = function() {


      console.log("playing step 5");

        var _self = this;
        //_self._userOpensDoor();

        _self._scoreTheGame();

   
    }









    MHgame.prototype._init = function() {

       var _self = this;

        _self._playStep(_self.step_1(), 300)

    }

    MHgame.prototype._getRandUnique = function(randScope, randCount) {

        var randNumArray = []
        while (randNumArray.length < randCount) {
            var randNum = Math.floor(Math.random() * randScope)
            if (randNumArray.indexOf(randNum) > -1) continue;
            //randNumArray[randNumArray.length] = randNum;
            randNumArray.push(randNum);
        }
        return randNumArray;

    }





    window.MHgame = MHgame;

})(window);