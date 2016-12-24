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

    MHgame.prototype._init = function() {

      var myElement = this.el;

      $(myElement).html(this.options.myName);

    }

  MHgame.prototype.options = {

    myName : "my fave color is orange"

  }



  MHgame.prototype.stage = function() {

    var _self = this;
    
    var Door = function(){};
    Door.prototype.prize = false;
    Door.prototype.userPicked = false;
    Door.prototype.hostOpened = false;
    Door.prototype.userOpened = false;

    _self.buildStage = function() {

      _self.doors = [];

      for (var i = 0; i < _self.options.doorCount; i++) {
        _self.doors[i] = new Door;

      }

    }


  }


  MHgame.prototype.init = function() {

    // build stage
    //

    this.stage.buildStage();

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