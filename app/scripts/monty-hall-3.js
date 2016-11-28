/*


To Do:

Add in switch logic
overhaul UI
  nicer doors  
rework the reset sequence
  doors that flip around
  use bootstrap modals
  


*/

$(document).ready(function() {

    var Matt = "cool";

    var MontyHall = MontyHall || {};

    MontyHall._settings = {

        doorCount: 3,
        prizeCount: 1,
        goatDoors: [],
        hostOpenCount: 1,
        userOpenCount: 1,
        winThreshold:1,
        simulation:  true,
        simulationSwitch: false, 

        check:function() {
            return (this.doorCount >= (this.hostOpenCount+this.userOpenCount)) && (this.winThreshold<=this.prizeCount);
        }

    }




    MontyHall._score = {

        wins:0,
        games:0,
        losses: function() {
            return this.games - this.wins;
        },
        winRate: function() {
            return ((this.wins / this.games)*100).toFixed(3)+"%";
        }

    }



    MontyHall._timeline = {

        steps: [],
        stepDelay: 1200,
        currentStep: 0,
        _playStep: function(_step,stepDelayOverride) {


             var _this = this;
  
             var localStepDelay = _this.stepDelay;

            if(typeof stepDelayOverride != 'undefined') {
                localStepDelay = stepDelayOverride;
            }

             if(MontyHall._settings.simulation) {
                localStepDelay = 0;
            }


             window.setTimeout(function(){

                     _this.steps[_step].call();                 

                },localStepDelay);

        },
        _next: function(stepDelayOverride){
            var _this = this;


            if(this.currentStep+1<steps.length) {
                _this._playStep(this.currentStep+1,stepDelayOverride);
                _this.currentStep++;
            }

        },
        _back: function() {

            if (this.currentStep-1>0) {
               _this._playStep(this.currentStep-1);
               _this.currentStep--;
            }
        }
    
        

    }

 


     var steps = [];

     steps[0] = function() {

        MontyHall._makeDoors();
        console.log("make doors");

     
     }
     steps[1] = function() {
        MontyHall._userPicksDoor();
        MontyHall._userAutoPick();
        console.log("user picks a door");       
       
     }
     steps[2] = function() {
         MontyHall._hostOpensDoor();
         console.log("host opens door");
       
     }

     steps[3] = function() {
         MontyHall._userOpensDoor();
         console.log("user opens door");
        
     }

     steps[4] = function() {
        MontyHall._endGame();
     }



    MontyHall._timeline.steps = steps

    MontyHall._startGame = function() {


      if(this._score.games > 99999) {
        return;
      }

      if(this._settings.simulation ) {
        $('.stage-wrap').css({"display":"none"});
      }

       if (this._settings.check()) {
        this._reset();
        this._timeline._playStep(0,400);
    } else {
        alert("problem with settings");
    }




    }

    MontyHall._endGame = function() {


        var _this = this;

        _this._score.games++;


        var eventMessage = "sorry, try again";

        if($("li.door-frame.prize.opened").length >= this._settings.winThreshold) {
       
            _this._score.wins++;
            eventMessage = "congratulations, you won!"

        } else {
             //$("li.door-frame.prize").addClass("opened");
        }

        
        if(_this._settings.simulation ) {

            if(_this._score.games % 5 == 0) {

              $(".win-pct").html(_this._score.winRate());
              $(".losses").html(_this._score.losses());
              $(".games").html(_this._score.games);
            }
        
        } else {

           $(".win-pct").html(_this._score.winRate());
          $(".losses").html(_this._score.losses());
          $(".games").html(_this._score.games);


        }


         /*  window.setTimeout(function(){

                  var m = confirm(eventMessage);
                   if (m == true) {
                    MontyHall._startGame();
                   }


             },1500);*/


        MontyHall._startGame();

    }

    MontyHall._getRandUniq = function(randScope, randCount) {


        var randNumArray = []
        while (randNumArray.length < randCount) {
            var randNum = Math.floor(Math.random() * randScope)
            if (randNumArray.indexOf(randNum) > -1) continue;
            randNumArray[randNumArray.length] = randNum;
        }

        //debugger;

        return randNumArray;



    }



    MontyHall._reset = function() {

        this._settings.goatDoors = [];
        this._timeline.currentStep = 0;
        $(".stage-wrap ul").html("");
    }





    MontyHall._hostOpensDoor = function() {

        var _this = this;

        var availableDoors = $(".door-frame.goat:not('.picked')");

        var hostPicks = _this._getRandUniq(availableDoors.length, _this._settings.hostOpenCount);

        $(hostPicks).each(function(_key, _var) {

            $(availableDoors).eq(_var).addClass("opened");
            $(availableDoors).eq(_var).addClass("opened-by-host");

        });



       MontyHall._timeline._next(100);
    }

    MontyHall._userPicksDoor = function() {


        var _this = this;

        var increment = 1;


        $("li.door-frame").on("click", function(e) {

        

            if ($(this).is(":not('.picked')")) {

                 $(this).addClass('picked');


                if ($("li.door-frame.picked").length >= _this._settings.userOpenCount ) {

                   // $(".picked").last().removeClass('picked');
                    MontyHall._timeline._next();

                    console.log(_this._settings.userOpenCount);

                }

               

            }

            // 


         
           
         

        });


    }

    MontyHall._userOpensDoor = function() {

        var _this = this;

        $("li.door-frame").unbind('click');

        $("li.door-frame:not('.opened')").click(function(e) {
            $(this).addClass("opened");             

             if($("li.door-frame.opened:not('.opened-by-host')").length == _this._settings.userOpenCount ) {
                  MontyHall._timeline._next(500); 
             }
        });


         MontyHall._userAutoOpen();

       
    }


    MontyHall._userAutoPick = function() {

     var  _this = this;

      if (this._settings.simulation) {

            for (var i = 0; i < _this._settings.userOpenCount; i++) {
                       
               var availableDoors = $("li.door-frame:not('.picked')");

               console.log("avail length: "+availableDoors.length)

                  var rand = Math.floor(Math.random()*availableDoors.length);



                  $(availableDoors).eq(rand).trigger("click");

                  //debugger;


            };

      }
    }


    MontyHall._userAutoOpen = function() {



      var _this = this;

      if (this._settings.simulation) {

            for (var i = 0; i < _this._settings.userOpenCount; i++) {


               var availableDoors = $("li.door-frame:not('.opened,.picked')");

                  var rand = Math.floor(Math.random()*availableDoors.length);

                  $(availableDoors).eq(rand).trigger("click");

            };

      }




    }


    MontyHall._makeDoors = function() {


        var doorMarkup = "";


        var prizeArray = this._getRandUniq(this._settings.doorCount, this._settings.prizeCount);
    
        console.log("prizeArray"+prizeArray);
        //this._reset();


        var door = $("<li><div class='door'></div></li>").addClass("door-frame");

        var stage = $("<ul></ul>").addClass("stage");


        for (var i = 0; i < this._settings.doorCount; i++) {

            var newDoor = $(door).clone().addClass("door-frame--" + i);

            if (prizeArray.indexOf(i) > -1) {
                $(newDoor).addClass("prize prize--" + prizeArray.indexOf(i));
                $(newDoor).append("<div class='physical-prize fa fa-diamond'></div>")
            } else {

                $(newDoor).addClass("goat");
                $(newDoor).append("<div class='a-live-goat'></div>");
            }

            $(stage).append(newDoor);
        }


        $(".stage-wrap").append(stage);

       
        MontyHall._timeline._next(10);
    }



    MontyHall._startGame();

$("#reset").click(function(){
    MontyHall._startGame();
})





});