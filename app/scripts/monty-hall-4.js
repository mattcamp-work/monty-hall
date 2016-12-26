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

(function(window){


   'use strict';



    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

  function MHgame(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }



  MHgame.prototype.options = {

      myName : "my fave color is orange",
      doorCount: 3,
      prizeCount: 1,
      hostDoorCount:1,
      userDoorCount:1,
      winThreshhold:1,
      hostKnowsPrize: false,
      simulationMode:false,
      check:function() {
            return (this.doorCount >= (this.hostOpenCount+this.userOpenCount)) && (this.winThreshold<=this.prizeCount);
        }


  }



  MHgame.prototype._buildStage = function() {

    var _self = this;

    _self.doors = [];
    
    var Door = function(){};
    Door.prototype.hasPrize = false;
    Door.prototype.userPicked = false;
    Door.prototype.hostOpened = false;
    Door.prototype.userOpened = false;

    var prizeArray = _self.getRandUnique(_self.options.doorCount,_self.options.prizeCount);



      for (var i = 0; i < _self.options.doorCount; i++) {
        _self.doors[i] = new Door;

        if (prizeArray.indexOf(i) > -1) {
          _self.doors[i].hasPrize = true;
        }

      }

      console.log(_self.doors);
      
      $(_self.el).append("<ul class='stage'></ul>");

      _self.stageElement = $(_self.el).find("ul.stage");

      console.log(_self.stageElement);

  }

  MHgame.prototype._renderStage = function() {

    var _self = this;

    if (_self.options.simulationMode) {
      return;
    } 

    if ($(_self.stageElement).find("li.door-frame").length < 1) {

       _self._buildDoors();

    } else {
      _self._updateStage();
    }
  }

  MHgame.prototype._buildDoors = function() {


    var _self = this;

    var doorCode = "";

    for (var i = 0; i < _self.doors.length; i++) {
      var doorMarkup = $("<li class='door-frame'><div class='door'></div><div class='prize-container'></div></li>\n\n");

      if(_self.doors[i].hasPrize) {
          $(doorMarkup).addClass('has-prize');
      }

       $(_self.stageElement).append(doorMarkup);
    }

   

  }

  MHgame.prototype._updateStage = function() {

    var _self = this;

    $(_self.stageElement).find('li.door-frame').each(function(_key,_val){


      if (_self.doors[_key].userPicked) {
        $(this).addClass('userPicked');

      }

      if (_self.doors[_key].hostOpened) {
        $(this).addClass('hostOpened');

      }

      if (_self.doors[_key].userOpened) {
        $(this).addClass('userOpened');

      }


    });

  }

  MHgame.prototype._timeline = {

        steps: [],
        stepDelay: 1200,
        currentStep: 0,
         _playStep: function(_step,stepDelayOverride) {

             var _self = this;
  
             var localStepDelay = _self.stepDelay;

            if(typeof stepDelayOverride != 'undefined') {
                localStepDelay = stepDelayOverride;
            }

            /* if(MHgame.options.simulationMode) {
                localStepDelay = 0;
            } */


             window.setTimeout(function(){

                     _self.steps[_step].call();                 

                },localStepDelay);

        },
         _next: function(stepDelayOverride){
            var _self = this;


            if(this.currentStep+1<steps.length) {
                _self._playStep(this.currentStep+1,stepDelayOverride);
                _self.currentStep++;
            }

        },
         _back: function() {
            var _self = this;
            // not sure if I'll ever need this.
            if (this.currentStep-1>0) {
               _self._playStep(this.currentStep-1);
               _self.currentStep--;
            }
        }

  }

MHgame.prototype._userPicksDoor = function() {

  _self = this;

  $(_self.stageElement).find("li.door-frame").on("click",function(){
      _self.doors[$(this).index()].userPicked = true;
  });

  console.log(_self.doors);
  _self._renderStage();
}

MHgame.prototype._hostOpensDoor = function() {

  var _self  = this;

  var demo = _.omit(_self.doors,function(value,key){
    return (_self.doors[key].userPicked = true);
  });

  console.log("yolo: "+demo);

}

MHgame.prototype._userOpensDoor = function() {

}



MHgame.prototype._timeline.steps[0] = function(){

    this._buildStage();
    this._renderStage();

    console.log("make doors");

    this._timeline._next(300);
}

MHgame.prototype._timeline.steps[1] = function(){
    // user picks door
    this._userPicksDoor();
     this._timeline._next(300);
}

MHgame.prototype._timeline.steps[2] = function(){
  this._hostOpensDoor();
    // host opens door
}

MHgame.prototype._timeline.steps[3] = function(){
    // user opens door
}

MHgame.prototype._timeline.steps[4] = {
    // user opens door
}




  MHgame.prototype._init = function() {

    // build stage
    //

    //this._start() 

    //this._start();

    this._timeline._playStep(0,300);

  }

  MHgame.prototype.getRandUnique = function(randScope, randCount) {

        var randNumArray = []
        while (randNumArray.length < randCount) {
            var randNum = Math.floor(Math.random() * randScope)
            if (randNumArray.indexOf(randNum) > -1) continue;
            randNumArray[randNumArray.length] = randNum;
        }
        return randNumArray;

    }





window.MHgame = MHgame;

})(window);