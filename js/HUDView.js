function HUDView(lives){
	//initialise animation counters for each life
	this.lifeAnimations = [];
	for (var i = 0; i < lives; i++){
		this.lifeAnimations.push(1);
	}
}

HUDView.prototype.updateHUD = function(score,time,lives){

	ctx.drawImage(assetManager.getAsset("img/GameFrame.png"),0,0);
	ctx.drawImage(assetManager.getAsset("img/Mute"+soundManager.getMuteStatus()+".png"),785,-12);
	
	//redraw the players lives
	this.drawLives(lives);
	
	//Update the number of points obtained
	this.updateScore(score);

	//Draw the timer/loading bar
	this.drawTimerBar(time);
}

HUDView.prototype.updateScore = function(score){
	ctx.drawImage(assetManager.getAsset("img/ScoreBar.png"),278,546);
	//set up the color, size, font and alignment of the text to be displayed
	ctx.fillStyle="#000000";
	ctx.font="28px Arial";
	ctx.textAlign = "center";
	//print the score text to the screen
	ctx.fillText(score,470,585);
}

HUDView.prototype.drawTimerBar = function(time){
	ctx.drawImage(assetManager.getAsset("img/TimeBar.png"),58,15);
	//set the color of the progress bar we are going to draw
	ctx.fillStyle="#00FF00";
	//create a rectangle with width based on the time elapsed
	ctx.fillRect(160,28,6.2*time,24);
}

HUDView.prototype.drawLives = function(lives){
	for (var i = 0; i < this.lifeAnimations.length; i++)	{
		if(lives - 1< i){
			//if the player has less lives than they started with, animate them out
			this.lifeAnimations[i] -= 0.2;
		}
		ctx.globalAlpha = Math.max(this.lifeAnimations[i],0);
		ctx.drawImage(assetManager.getAsset("img/Life.png"),790,500-(60*i));
		ctx.globalAlpha = 1;
	}
}