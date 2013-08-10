var timeDecaySpeed, levelId,imagesCanRotate, imagesCanScale,imagesCanFlip, assetDifficulties;
function DifficultyManager(){
	//initialise all of the values to control the difficulty of the game.
	levelId = 0; //refers to the number of images that will appear and their x,y co-ordinates
	timeDecaySpeed = 0.2; //how fast the time bar decreases
	imagesCanRotate = false; 
	imagesCanScale = false;
	imagesCanFlip = false;
	assetDifficulties = ["Easy"]; // Each Robot has three difficulty images	
}
DifficultyManager.prototype.getLevelCoordinates = function(){
	//get the array of all of the x,y coordinates based on the current progress level
	return getLevelData(levelId);
}

DifficultyManager.prototype.updateDifficulty = function(score){
	//uses the players current score to activate and increase difficulty values
	if(score > 1800){
		assetDifficulties = ["Easy","Medium","Hard"];
		this.makeImagesRotate();
		this.increaseDecaySpeed(0.01);
		levelId = 3;
	}
	else if(score > 1500){
		assetDifficulties = ["Hard"];
		this.increaseDecaySpeed(0.025);
		levelId = 3;
	}
	else if(score > 800){
		assetDifficulties = ["Medium"];
		this.increaseDecaySpeed(0.05);
		levelId = 2;	
	}
	else if(score > 300){
		assetDifficulties = ["Easy"];
		this.increaseDecaySpeed(0.1);
		levelId = 1;	
	}
} 

/*
	Randomly chooses which of the odd images to use.
*/
DifficultyManager.prototype.getOddAsset = function(robotId){
	
	return assetManager.getAsset("img/Robot"+robotId+"Bad"+assetDifficulties[Math.round(Math.random()*(assetDifficulties.length-1))]+".jpg");
}

DifficultyManager.prototype.getTimeDecaySpeed = function(){
	return timeDecaySpeed;
}

DifficultyManager.prototype.increaseDecaySpeed = function(amount){
	timeDecaySpeed += amount;
}

DifficultyManager.prototype.canImagesRotate = function(){
	return imagesCanRotate;
}

DifficultyManager.prototype.canImagesScale = function(){
	return imagesCanScale;
}

DifficultyManager.prototype.canImagesFlip = function(){
	return imagesCanFlip;
}

DifficultyManager.prototype.makeImagesRotate = function(){
	imagesCanRotate = true;
}

DifficultyManager.prototype.makeImagesScale = function(){
	imagesCanScale = true;
}

DifficultyManager.prototype.canImagesFlip = function(){
	imagesCanFlip = true;
}

