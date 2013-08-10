function HUDView(){
}

HUDView.prototype.updateHUD = function(score,time){
	//redraw the frame
	ctx.drawImage(assetManager.getAsset("img/GameFrame.png"),0,0);
	
	//Update the number of points obtained
	this.updateScore(score);

	//Draw the timer/loading bar
	this.drawTimerBar(time);
}

HUDView.prototype.updateScore = function(score){
	//set up the color, size, font and alignment of the text to be displayed
	ctx.fillStyle="#000000";
	ctx.font="28px Arial";
	ctx.textAlign = "center";
	//print the score text to the screen
	ctx.fillText(score,470,585);
}

HUDView.prototype.drawTimerBar = function(time){
	//set the color of the progress bar we are going to draw
	ctx.fillStyle="#00FF00";
	//create a rectangle with width based on the time elapsed
	ctx.fillRect(160,28,6.2*time,24);
}