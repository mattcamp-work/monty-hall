

/*

create doors




*/

var App = App || {};


App._doorCount = 3;
App._doors = [];

App._doorRevealCount = 1;

App._doorPrizeCount = 1;

App._wins = 0;
App._losses = 0;





function makeDoors() {



	for (var i = 0; i < App._doorCount; i++) {
		$('ul.doors').append("<li class='door'></li>");
		App._doors.push(i);
	};


}


function addPrize() {


	

	if ($('ul.doors li.prize').length == App._doorPrizeCount) {
		return 
	} 

	var prize = Math.floor(Math.random()*App._doorCount);
	$('ul.doors li').eq(prize).addClass('prize');	

	addPrize();

}


function hostPicksADoor(){


	var randomLoser = Math.floor(Math.random()*$('ul.doors li:not(.prize)').length);

	$('ul.doors li:not(.prize)').eq(randomLoser).addClass('loser');




}


function updateVals() {
	
	$(".wins").html(App._wins);
	$(".losses").html(App._losses);
	
}



function userPicksADoor() {

	
}



function _reset() {

	$('ul.doors').html("");


	makeDoors();
	addPrize();

	$("li.door").click(function(event){



	if($(this).hasClass('prize')) {

		$(this).addClass("winner");

		App._wins++;
	} else {

		$(this).addClass("loser");
		App._losses++;
	}


});

}




$(document).ready(function(){


_reset()


$("body #doorPick").click(function(e){

	e.preventDefault();

	hostPicksADoor();



});


$("body #reset").click(function(e){



	_reset();

});



});