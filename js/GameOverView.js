function GameOverView(){

	//clear the current screen
	ctx.clearRect(0,0,850,600);
	
	//play a losing sound effect
	soundManager.playSound("sounds/gameover");

	//draw all of the images for this screen
	ctx.drawImage(assetManager.getAsset("img/GameFrame.png"),0,0);	
	ctx.drawImage(assetManager.getAsset("img/ButtonPurple.jpg"),350,400);
	ctx.drawImage(assetManager.getAsset("img/MainMenuTxtOrange.png"),350,400);
	ctx.drawImage(assetManager.getAsset("img/GameOverScreen.png"),280,120);

	//Setup a controller for the button on the screen to manage rollovers and clicks
	OneButtonView("MainMenuTxt",switchView);
}
