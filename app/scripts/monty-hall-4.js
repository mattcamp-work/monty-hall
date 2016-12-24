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




window.MHgame = MHgame;

})(window);