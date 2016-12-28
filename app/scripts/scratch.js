 MHgame.prototype._timeline = {
        steps: [],
        stepDelay: 1200,
        currentStep: 0,
        _playStep: function(theStep, stepDelayOverride) {

            var _self = this;

            var localStepDelay = _self.stepDelay;

            if (typeof stepDelayOverride != 'undefined') {
                localStepDelay = stepDelayOverride;
            }

            /* if(MHgame._options.simulationMode) {
                localStepDelay = 0;
            } */


            console.dir(_self);

            window.setTimeout(function() {

                //_self.steps[theStep].call();

            }, localStepDelay);

        },
        _next: function(stepDelayOverride) {
            var _self = this;


            if (this.currentStep + 1 < steps.length) {
                _self._playStep(this.currentStep + 1, stepDelayOverride);
                _self.currentStep++;
            }

        },
        _back: function() {
            var _self = this;
            // not sure if I'll ever need this.
            if (this.currentStep - 1 > 0) {
                _self._playStep(this.currentStep - 1);
                _self.currentStep--;
            }
        }

    }



        (function() {

        var steps = [];

        steps[0] = function() {


            var _self = this;

            _self._buildStage();
            _self._renderStage();

            console.log("make doors");

           // MHgame.prototype._timeline._next(300);
        }

        /*steps[1] = function() {
            // user picks door
            this._userPicksDoor();
            this._timeline._next(300);
        }

        steps[2] = function() {
            this._hostOpensDoor();
            // host opens door
        }

        steps[3] = function() {
            // user opens door
        }

        steps[4] = {
            // user opens door
        }

        */


        MHgame.prototype.steps = steps;


         console.log("steps made");

       // console.dir(MHgame);

    })();