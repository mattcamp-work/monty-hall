/*



doors object

doors 

	door.prize
	doors.open
	doors.userPicked




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

I can do this with classes and run everything through jquery, that's the easiest thing to do.
The model lives in the DOM. 

If I do it the other way, I'm not sure how to update the view. Unless I use that one specific pattern.

doors 
 	if 


*/