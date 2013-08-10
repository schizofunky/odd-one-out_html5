
var correctImageCoordinates, timeLimit, currentScore, hud, difficultyManager,oddImageId,levelCoordinates,currentRobotId,oddAsset;

function LevelView(){
	soundManager.playMusic("sounds/bgm");
	timeLimit = 100;
	currentScore = 0;
	difficultyManager = new DifficultyManager();
	createLevel();
	setTimeout(updateTimer, 100);
	c.onmousedown = onGameClick;
	hud = new HUDView();
	hud.updateHUD(currentScore,timeLimit);
}
/*
	Redraws the level togetehr with the robots.  Also updates the current difficulty based on score
*/
function createLevel(){
	timeLimit = 100;
	currentRobotId = 1+Math.round(Math.random()*(numberOfRobots-1));
	levelCoordinates = difficultyManager.getLevelCoordinates();
	oddImageId = Math.round(Math.random()*(levelCoordinates.length-1));
	oddAsset = difficultyManager.getOddAsset(currentRobotId);
	animationEffect = 0;
	animatedDraw();
}

function redrawImages(){
	var numberOfImages = levelCoordinates.length;
	var coordinates;
	ctx.clearRect(80,100,690,440);
	for(var i = 0; i < numberOfImages; i++){
		coordinates = levelCoordinates[i];
		if(i == oddImageId){
			correctImageCoordinates = coordinates;
			drawImage(oddAsset,correctImageCoordinates[0],correctImageCoordinates[1]);
		}
		else{
			drawImage(assetManager.getAsset("img/Robot"+currentRobotId+"Good.jpg"),coordinates[0],coordinates[1]);
		}
	}	
}

/*
	Draws the image, and applies trandlations and rotations where necessary
*/
function drawImage(imageToDraw,imageX,imageY){
	var drawWidth = imageToDraw.width*animationEffect/2;
	var drawHeight = imageToDraw.height*animationEffect/2;
	var imageRotation = difficultyManager.canImagesRotate()? Math.random()*6.28 : 0;
	imageX = imageX + imageToDraw.width/2;
	imageY = imageY + imageToDraw.height/2;
	ctx.globalAlpha = animationEffect;
	ctx.translate(imageX,imageY);
	ctx.rotate(imageRotation);
	ctx.drawImage(imageToDraw,-drawWidth,-drawHeight,2*drawWidth,2*drawHeight);	
	ctx.rotate(-imageRotation);
	ctx.translate(-imageX,-imageY);
	ctx.globalAlpha = 1;
}

function animatedDraw()
{
	animationEffect += 0.1;
	redrawImages();
	if(animationEffect <= 1)
	{
		setTimeout(animatedDraw,10);
	}
}

/*
	The only input handler of the level, responds to the users click be it correct or incorrect
*/
function onGameClick(event){
	var correctX = correctImageCoordinates[0];
	var correctY = correctImageCoordinates[1];
	var correctWidth = 100;
	var correctHeight = 100;
	var success = false;

	var mouseX = event.offsetX? event.offsetX : event.layerX;
	var mouseY = event.offsetY? event.offsetY : event.layerY;

	var muteClicked = false;
	if(mouseX >= 785 && mouseX <= 785+50){
		if(mouseY >= -12 && mouseY <= -12 + 40){

			soundManager.mute();
			muteClicked = true;
			hud.updateHUD(currentScore,timeLimit);
		}
	}
	if(!muteClicked){
		if(mouseX  >= correctX && mouseX <= correctX+correctWidth){
			if(mouseY >= correctY && mouseY <= correctY + correctHeight){
				success = true;
			}
		}
		if(success){
			soundManager.playSound("sounds/correct");
			currentScore += 100;
			difficultyManager.updateDifficulty(currentScore);//Updates the difficulty of the game
		}
		else{
			soundManager.playSound("sounds/wrong");
			if(currentScore > 0){
				currentScore -= 100;
			}	
		}
		hud.updateHUD(currentScore,timeLimit);
		createLevel();
	}

}

/*
	Reduces the level timer, updates the HUD and checks if it's game over
*/
function updateTimer(){
	timeLimit -= difficultyManager.getTimeDecaySpeed();
	if(timeLimit > -difficultyManager.getTimeDecaySpeed()){
		hud.updateHUD(currentScore,timeLimit);
		setTimeout(updateTimer, 100);
	}
	else{
		switchView("GameOver");
	}
}