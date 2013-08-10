function MainMenuView(){
	//clear the current screen
	ctx.clearRect(0,0,850,600);	

	//draw the assets to display the menu
	ctx.drawImage(assetManager.getAsset("img/GameFrame.png"),0,0);				
	ctx.drawImage(assetManager.getAsset("img/Logo.jpg"),200,100);
	ctx.drawImage(assetManager.getAsset("img/ButtonPurple.jpg"),350,400);
	ctx.drawImage(assetManager.getAsset("img/PlayGameTxtOrange.png"),350,400);

	//add s controller for the images to act as a button and react to roll overs and clicks
	OneButtonView("PlayGameTxt",onPlayClick);
}

function onPlayClick(event){
		//change the current view to show the game screen
		switchView("Level");
}