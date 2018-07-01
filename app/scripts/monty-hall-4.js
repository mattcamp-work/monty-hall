/*

basic functionality works

I now need
    Figure out the correct design
        research some simple graphics
            paper cut outs
            this should be like a pop up book?
            Eric Carle? 
        Art Direction
            Should be kind of edgy
            What kind of approach to typography do I want?
        What do the controls look like?
            simple text
        Typography
        lock in the vertical height
        switch to BS4
        Animation
            door open
            win 
            loss
        Illustration
            car
            goat
    Write the article
        Outline 
        Flesh out
        Research
        Tone
        Conclusion
    Code
        go line by line and refamiliarize myself with what is happening
        I think it works pretty well, but the timing is weird
        install promises on the steps
        Sort out the app thing, the build process and gulp or whatever the fuck. Move off of code kit. 
    With all this up. What's the fastest way to get this published.
    Look into existing publishin mechanisms that might get you more reach.  


*/
'use strict';
var MHgame = function() {};
MHgame.prototype.init = function(el, options) {
    var _this = this;
    this.el = el;
    this._options = $.extend({}, this._defaultOptions, options);
    this._score = {
        wins: 0,
        games: 0,
        losses: function() {
            return this.games - this.wins
        }
    }
    this._playStep(_this.step_1)
}

MHgame.prototype.defineHTMLWrappers = function() {

}


MHgame.prototype._defaultOptions = {
    doorCount: 3,
    prizeCount: 1,
    hostDoorCount: 1,
    userDoorCount: 1,
    winThreshhold: 1,
    hostKnowsPrize: false,
    simulationMode: false,
    stepDelay: 3000,
    templates: {
        door: '#door',
        game: '#game',
        dashboard: '#dashboard',
        progress: '#progress'
    },
    check: function() {
        return (this.doorCount >= (this.hostOpenCount + this.userOpenCount)) && (this.winThreshold <= this.prizeCount);
    }
}
MHgame.prototype._buildStage = function() {
    var _self = this;
    this._buildDoorObj();
    $(_self.el).append("<ul class='stage'></ul>");
    _self.stageElement = $(_self.el).find("ul.stage");
}
MHgame.prototype._buildDoorObj = function() {
    var _self = this;
    _self.doors = [];
    var door = {
        hasPrize: false,
        userPicked: false,
        hostOpened: false,
        userOpened: false
    }
    var prizeArray = _self.utils._getRandUnique(_self._options.doorCount, _self._options.prizeCount);
    for (var i = 0; i < _self._options.doorCount; i++) {
        _self.doors[i] = $.extend({}, door);
        _self.doors[i].id = i;
        if (prizeArray.indexOf(i) > -1) {
            _self.doors[i].hasPrize = true;
        }
    }
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
            $(_self.stageElement).find("li.door-frame").unbind();
            _self._renderStage();
            _self._playStep(_self.step_3);
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
    var randomDoorList = _self.utils._getRandUnique(unpickedDoors.length, _self._options.hostDoorCount);
    for (var i = 0; i < randomDoorList.length; i++) {
        _self.doors[unpickedDoors[randomDoorList[i]].id].hostOpened = true;
    }
    _self._renderStage();
    _self._playStep(_self.step_4());
}
MHgame.prototype._userOpensDoor = function() {
    var _self = this;
    $(_self.stageElement).find("li.door-frame").on("click", function() {
        _self.doors[$(this).index()].userOpened = true;
        var userOpenCount = _.countBy(_self.doors, function(doorObj) {
            return doorObj.userOpened == true;
        })
        if (userOpenCount.true >= _self._options.userDoorCount) {
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
    //debugger
    if (typeof stepDelayOverride != 'undefined') {
        localStepDelay = stepDelayOverride;
    }
    // if simulation mode is on, skip the timeout. 
    if (_self._options.simulationMode) {
        // return _self.steps[theStep].call();
    }
    window.setTimeout(function() {
        //     console.log('fired');
        return theStep;
    }, localStepDelay);
}
MHgame.prototype._scoreTheGame = function() {
    var _self = this;
    //_self._userOpensDoor();
    var wins = _.filter(_self.doors, function(doorObj) {
        if (doorObj.hasPrize == true && doorObj.userOpened == true) {
            return doorObj
        }
    });
    if (wins.length >= _self._options.winThreshold) {
        _self._score.wins += 1;
    }
    _self._score.games += 1;
    alert(_self._score);
    window.setTimeout(function() {
        _self._reset();
    }, 3000);
}
MHgame.prototype._reset = function() {
    var _self = this;
    _self.doors = [];
    if (!_self._options.simulationMode) {
        $(_self.el).html("");
    }
    _self.step_1();
}
MHgame.prototype.setItAllUp = function() {
    this._buildStage();
    this._renderStage();
}
MHgame.prototype.step_1 = function() {
    _self.setItAllUp();
    _self._playStep(_self.step_2());
    console.log("moving to step 2");
}
MHgame.prototype.step_2 = function() {
    _self._userPicksDoor();
    console.log("moving to step 3");
}
MHgame.prototype.step_3 = function() {
    this._hostOpensDoor();
    console.log("moving to step 4");
}
MHgame.prototype.step_4 = function() {
    this._userOpensDoor();
    console.log("moving to step 5");
}
MHgame.prototype.step_5 = function() {
    this._scoreTheGame();
    console.log("game done");
}
MHgame.prototype._buildSteps = function() {
    var steps = [
        //
        (function() {
            // step 1                
            this.setItAllUp();
            console.log('moving to step 2');
        }).bind(this), (function() {
            // step 2
            this._userPicksDoor();
            console.log('moving to step 3');
        }).bind(this), (function() {
            // step 3            
            this._hostOpensDoor();
            console.log('moving to step 4');
        }).bind(this), (function() {
            // step 4
            this._userOpensDoor();
            console.log('moving to step 5');
        }).bind(this), (function() {
            // step 5            
            this._scoreTheGame();
            console.log('game done');
        }).bind(this)
    ]
    this.steps = steps;
}
MHgame.prototype.updateDashboardView = function() {
    var _self = this;
    $(parentElement).find('.dashboard-wrapper').find('input[type="text"][data-updateSettings]').each(function() {
        var thisSetting = $(this).data('data-updateSettings');
        $(this).val(_self.settings[thisSetting]);
    });
}
MHgame.prototype.setDashboardBindings = function() {
    var _self = this;
    $(parentElement).find('.dashboard-wrapper').filter('input[type="text"],input[type="number"],input[type="tel"]').on('click', '[data-updateSettings]', function(event) {
        _self.settings[$(event.target).data('data-updateSettings')] = $(this).val();
    });
    $(parentElement).find('.dashboard-wrapper').on('change', 'select[data-updateSettings]', function(event) {
        _self.settings[$(event.target).data('data-updateSettings')] = $(this).val();
    });
}

MHgame.prototype.utils = {
    _getRandUnique: function(randScope, randCount) {
        var randNumArray = []
        while (randNumArray.length < randCount) {
            var randNum = Math.floor(Math.random() * randScope)
            if (randNumArray.indexOf(randNum) > -1) continue;
            //randNumArray[randNumArray.length] = randNum;
            randNumArray.push(randNum);
        }
        return randNumArray;
    }
}


