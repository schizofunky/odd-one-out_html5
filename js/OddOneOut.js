//create the global elements
var assetManager = new AssetManager();
var soundManager = new SoundManager();
const numberOfRobots = 3;

function init(){

	//load all of the sounds for the game
	soundManager.addSound("sounds/bgm");
	soundManager.addSound("sounds/button-click");
	soundManager.addSound("sounds/correct");
	soundManager.addSound("sounds/gameover");
	soundManager.addSound("sounds/wrong");

	//specify all of the images we want the asset manager to load
	assetManager.addFileToLoad("img/Logo.jpg");
	assetManager.addFileToLoad("img/ButtonOrange.jpg");
	assetManager.addFileToLoad("img/ButtonPurple.jpg");
	assetManager.addFileToLoad("img/PlayGameTxtOrange.png");
	assetManager.addFileToLoad("img/PlayGameTxtPurple.png");
	assetManager.addFileToLoad("img/MainMenuTxtOrange.png");
	assetManager.addFileToLoad("img/MainMenuTxtPurple.png");
	assetManager.addFileToLoad("img/GameFrame.png");
	assetManager.addFileToLoad("img/TimeBar.png");
	assetManager.addFileToLoad("img/ScoreBar.png");
	assetManager.addFileToLoad("img/MuteOff.png");
	assetManager.addFileToLoad("img/MuteOn.png");
	assetManager.addFileToLoad("img/GameOverScreen.png");

	//all of the robot assets use the same naming structure allowing more to be added just by chnaging the counter value
	for(var robotCounter = 1; robotCounter <= numberOfRobots; robotCounter++)
	{
		assetManager.addFileToLoad("img/Robot"+robotCounter+"Good.jpg");
		assetManager.addFileToLoad("img/Robot"+robotCounter+"BadEasy.jpg");
		assetManager.addFileToLoad("img/Robot"+robotCounter+"BadMedium.jpg");
		assetManager.addFileToLoad("img/Robot"+robotCounter+"BadHard.jpg");	
	}	

	//load all of the assets and call 'switchView' when complete
	assetManager.downloadAssets(onLoadComplete,updateLoadProgress);
}

//flips between the different view states of the game
function switchView(viewId){
	switch(viewId)
	{
		case "Level":
			LevelView();	
			break;
		case "GameOver":
			GameOverView();
			break;
		default:
			MainMenuView();
	}	
}

function onLoadComplete(){
	ctx.fillStyle="#00CCFF";
	ctx.fillRect(0,0,850,600);
	switchView();
}

function updateLoadProgress(loadProgress){
	ctx.fillStyle="#00CCFF";
	ctx.fillRect(275,280,300,18);
	ctx.strokeStyle = "black";
	ctx.strokeRect(275,280,300,18);	
	//set the color of the progress bar we are going to draw
	ctx.fillStyle="#FFFFFF";
	//create a rectangle with width based on the progress loaded
	ctx.fillRect(275,280,3*loadProgress,18);
	ctx.fillStyle="#000000";
	ctx.font="18px Arial";
	ctx.fillText("loading",390,294);
}

//call the init function to setup the game
 init();