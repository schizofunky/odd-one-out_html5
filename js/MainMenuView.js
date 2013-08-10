var animationProgress;
function MainMenuView(){
	//clear the current screen
	ctx.clearRect(0,0,850,600);	

	//draw the assets to display the menu
	ctx.drawImage(assetManager.getAsset("img/GameFrame.png"),0,0);				
	animationProgress = 0;
	setTimeout(animateIntro,1);
}

function onPlayClick(event){
		//change the current view to show the game screen
		switchView("Level");
}

/*
	This animates the logo and play button onto the screen
*/

function animateIntro(){
	ctx.clearRect(200,80.3,500,300);	
	ctx.drawImage(assetManager.getAsset("img/Logo.png"),200,-100+2*animationProgress);
	ctx.drawImage(assetManager.getAsset("img/GameFrame.png"),0,0);	

	ctx.globalAlpha = 0.01*animationProgress;
	var buttonImage = assetManager.getAsset("img/ButtonPurple.jpg");
	var textImage = assetManager.getAsset("img/PlayGameTxtOrange.png");
	var scaledWidth = animationProgress*buttonImage.width/100; 
	var scaledHeight = animationProgress*buttonImage.height/100; 
	ctx.drawImage(buttonImage,350+(buttonImage.width-scaledWidth)/2,400+(buttonImage.height-scaledHeight)/2,scaledWidth,scaledHeight);
	ctx.drawImage(textImage,350+(buttonImage.width-scaledWidth)/2,400+(buttonImage.height-scaledHeight)/2,scaledWidth,scaledHeight);
	ctx.globalAlpha = 1;

	if(animationProgress < 100)
	{
		animationProgress += 5;
		setTimeout(animateIntro,1);	
	}
	else
	{
		//add s controller for the images to act as a button and react to roll overs and clicks
		OneButtonView("PlayGameTxt",onPlayClick);
	}
}