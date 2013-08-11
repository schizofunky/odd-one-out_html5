var animationProgress;
function GameOverView(){

	//clear the current screen
	ctx.clearRect(0,0,850,600);
	
	//play a losing sound effect
	soundManager.playSound("sounds/gameover");
	soundManager.stopMusic();

	//draw all of the images for this screen
	ctx.drawImage(assetManager.getAsset("img/GameFrame.png"),0,0);	
	animationProgress = 0;
	setTimeout(animateGameOverScreen,1);	

	//Setup a controller for the button on the screen to manage rollovers and clicks
	OneButtonView("MainMenuTxt",switchView);
}

function animateGameOverScreen(){
	ctx.clearRect(200,80.3,500,300);	
	ctx.drawImage(assetManager.getAsset("img/GameOverScreen.png"),280,-100+2.2*animationProgress);
	ctx.drawImage(assetManager.getAsset("img/GameFrame.png"),0,0);	

	//animate the button popping in
	ctx.globalAlpha = 0.01*animationProgress;
	var buttonImage = assetManager.getAsset("img/ButtonPurple.jpg");
	var textImage = assetManager.getAsset("img/MainMenuTxtOrange.png");
	var scaledWidth = animationProgress*buttonImage.width/100; 
	var scaledHeight = animationProgress*buttonImage.height/100; 
	ctx.drawImage(buttonImage,350+(buttonImage.width-scaledWidth)/2,400+(buttonImage.height-scaledHeight)/2,scaledWidth,scaledHeight);
	ctx.drawImage(textImage,350+(buttonImage.width-scaledWidth)/2,400+(buttonImage.height-scaledHeight)/2,scaledWidth,scaledHeight);
	ctx.globalAlpha = 1;

	if(animationProgress < 100)
	{
		animationProgress += 2;
		setTimeout(animateGameOverScreen,1);	
	}

	ctx.drawImage(assetManager.getAsset("img/ScoreBar.png"),278,546);
	//set up the color, size, font and alignment of the text to be displayed
	ctx.fillStyle="#000000";
	ctx.font="28px Arial";
	ctx.textAlign = "center";
	//print the score text to the screen
	ctx.fillText(currentScore,470,585);
}		
