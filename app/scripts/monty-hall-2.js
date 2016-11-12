/*



doors object

doors 

	door.prize
	doors.open
	doors.userPicked
	

	utilities:
		pick unpicked and unprized doors
		



create doors

add prize to doors




doorPick(door)
adds a check mark to door


hostPickDoor
	host picks a door that doesn't have a prize and that hasn't already been picked

doorOpen(door)
opens


game.step[0]
	apply doorPick events to door

game.step[1]
	host opens door that is not picked by the user and not the prize

game.step[2]
	apply doorOpen events to remaining doors
	log win or loss


*/




/*

Just run it with jQuery, then ask how to do it with angular. 

actually look at 

I can do this with classes and run everything through jquery, that's the easiest thing to do.
The model lives in the DOM. 

If I do it the other way, I'm not sure how to update the view. Unless I use that one specific pattern.

doors 
 	if 


*/




;(function(window){


	 function MontyGame(el,options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }




    MontyGame.prototype.gameOptions {

    	doorCount: 3,
    	prizeCount: 1,
    	userPickCount: 1,
    	hostPickCount: 1,
    	doorElement: '<li class="door"></li>',
    	onStep = function(step) {
    		return false;
    	},

    	reset = function() {

    	}

    }


    MontyGame.prototype._init() {


    	this.addDoors();
    	this.addPrizes()
    	this._initEvents();
    }



    MontyGame.prototype.addDoors() {

    		var markup = "";

    	for (var i = 0; i < this.gameOptions.doorCount; i++) {
    			
    		markup += this.gameOptions.doorElement;
    	};


    }


    MontyGame.prototype.addPrizes() {

    	for (var i = 0; i < this.gameOptions.prizeCount; i++) {
    		
    	};

    }

    MontyGame.prototype.openDoor() {

    	
    }


    MontyGame.prototype.nextStep() {

    	
    }

    MontyGame.prototype.hostOpensDoors() {

    }

    MontyGame.prototype.userPicksDoors() {

    }

    MontyGame.prototype.userOpensDoors() {
    	
    }

     MontyGame.prototype._initEvents() {
    	
    }


    var gameSteps = [];

    gameSteps[0] = function() {
    	this.userPicksDoors();

    }

    gameSteps[1] = function() {
    	this.hostOpensDoors();
  	}

    gameSteps[2] = function() {
    	this.userOpensDoors();
    }


    MontyGame.prototype.gameSteps = gameSteps;





window.MontyGame = MontyGame;


})(window);