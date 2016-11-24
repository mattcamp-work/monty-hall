/*


*/

$(document).ready(function(){

    var Matt = "cool";

    var MontyHall = MontyHall || {};

    MontyHall._settings = {

        doorCount: 13
        prizeCount: 2,
        goatDoors: [],
        hostPickCount: 1,
        doorOpenCount:1

    }

    var Utils = Utils || {};


    MontyHall._getRandUniq = function(randScope,randCount) {


        var randNumArray = []
        while(randNumArray.length < randCount){
            var randNum = Math.floor(Math.random()*randScope)
            if(randNumArray.indexOf(randNum) > -1) continue;
            randNumArray[randNumArray.length] = randNum;
        }

        return randNumArray;

    }

    

    MontyHall._reset = function() {

        this._settings.goatDoors = [];

        $(".stage-wrap").html("");
    }


    MontyHall._hostPicksDoor = function() {

        var hostPicks = this._getRandUniq(this._settings.goatDoors.length,this._settings.hostPickCount);

        //debugger;

        var _self = this;

        $(hostPicks).each(function(_key,_var){

            $("li.door").eq(_self._settings.goatDoors[hostPicks[_key]]).css({"border":"10px solid silver"}).addClass("hostPicked");

        });
    }


    MontyHall._makeDoors = function(){


        var doorMarkup = "";


        var prizeArray = this._getRandUniq(this._settings.doorCount,this._settings.prizeCount);
       // debugger;

        //this._reset();


        var door = $("<li></li>").addClass("door");

        var stage = $("<ul></ul>").addClass("stage");


        for (var i = 0; i < this._settings.doorCount; i++) {

            var newDoor = $(door).clone().addClass("door--"+i);

            if(prizeArray.indexOf(i) > -1) {
                $(newDoor).addClass("prize prize--"+prizeArray.indexOf(i));
            } else {

                this._settings.goatDoors.push(i)
            }

            $(stage).append(newDoor);            
        }


        $(".stage-wrap").append(stage);
    }



MontyHall._makeDoors();



window.setTimeout(function(){

    MontyHall._hostPicksDoor();

},1000);
   

});