
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
	difficultyManager.updateDifficulty(currentScore);//TODO: only update on success?
	currentRobotId = 1+Math.round(Math.random()*(numberOfRobots-1));
	levelCoordinates = difficultyManager.getLevelCoordinates();
	oddImageId = Math.round(Math.random()*(levelCoordinates.length-1));
	oddAsset = getOddAsset();
	currentAlpha = 0;
	drawWithAlpha();
	// var numberOfImages = levelCoordinates.length;
	// var coordinates;
	// ctx.clearRect(80,100,690,440);
	// for(var i = 0; i < numberOfImages; i++){
	// 	coordinates = levelCoordinates[i];
	// 	if(i == oddImageId){
	// 		correctImageCoordinates = coordinates;
	// 		drawImage(getOddAsset(),correctImageCoordinates[0],correctImageCoordinates[1]);
	// 	}
	// 	else{
	// 		drawImage(assetManager.getAsset("img/Robot"+currentRobotId+"Good.jpg"),coordinates[0],coordinates[1]);
	// 	}
	// }
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
	var halfWidth = imageToDraw.width/2;
	var halfHeight = imageToDraw.height/2;
	var imageRotation = difficultyManager.canImagesRotate()? Math.random()*6.28 : 0;
	imageX = imageX + halfWidth;
	imageY = imageY + halfHeight;
	ctx.globalAlpha = currentAlpha;
	ctx.translate(imageX,imageY);
	ctx.rotate(imageRotation);
	ctx.drawImage(imageToDraw,-halfWidth,-halfHeight);	
	ctx.rotate(-imageRotation);
	ctx.translate(-imageX,-imageY);
	ctx.globalAlpha = 1;
}

function drawWithAlpha()
{
	currentAlpha += 0.1;
	redrawImages();
	if(currentAlpha <= 1)
	{
		setTimeout(drawWithAlpha,10);
	}
}

/*
	Randomly chooses which of the odd images to use.
	TODO:  Move to difficulty manager?
*/
function getOddAsset(){
	var oddAssets = ["img/Robot"+currentRobotId+"BadEasy.jpg","img/Robot"+currentRobotId+"BadMedium.jpg","img/Robot"+currentRobotId+"BadHard.jpg"];
	return assetManager.getAsset(oddAssets[Math.round(Math.random()*2)]);
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
	if(event.clientX  >= correctX && event.clientX <= correctX+correctWidth){
		if(event.clientY >= correctY && event.clientY <= correctY + correctHeight){
			success = true;
		}
	}
	if(success){
		soundManager.playSound("sounds/correct");
		currentScore += 100;
	}
	else{
		soundManager.playSound("sounds/wrong");
		currentScore -= 100;	
	}

	hud.updateHUD(currentScore,timeLimit);
	createLevel();
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