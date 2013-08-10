var currentButtonId,clickCallback,overButton;

function OneButtonView(buttonId, onClickCallback){
	overButton = false; //represents if the mouse is hovering over the image area
	currentButtonId = buttonId; //the id of the asset that sits on top of the button, this game expects there to be a Purple and Orange version of each of these assets
	clickCallback = onClickCallback; // the callback function for when the button is clicked

	//sets up the liteners for when the mouse moves and is clicked
	c.onmousedown = onMouseClick;	
	c.onmousemove = onMouseMove;
}


function onMouseMove(event){

	//hard coded locations of the button and i's dimensions, quite hacky but it's a small game
	var correctX = 350;
	var correctY = 400;
	var correctWidth = 200;
	var correctHeight = 120;

	//a flag representing if the mouse is currently over the button
	var currentlyOver = false;

	//classic rectangular collision detection
	if(event.clientX  >= correctX && event.clientX <= correctX+correctWidth){
		if(event.clientY >= correctY && event.clientY <= correctY + correctHeight){
			currentlyOver = true;
		}
	}
	//if the mouse position is over the button...
	if(currentlyOver){	
		//if the mouse wasnot previously over the button
		if(!overButton){
			//set that the mouse is over the button
			overButton = true;
			//change the button images - background and text to the over state
			ctx.drawImage(assetManager.getAsset("img/ButtonOrange.jpg"),correctX,correctY);
			ctx.drawImage(assetManager.getAsset("img/"+currentButtonId+"Purple.png"),correctX,correctY);
		}
	}
	else{
		//the mouse is not currently over the button, but if it previously was...
		if(overButton){
			//set that the mouse is not over the button
			overButton = false;
			//change the button images - background and text to the out state
			ctx.drawImage(assetManager.getAsset("img/ButtonPurple.jpg"),correctX,correctY);
			ctx.drawImage(assetManager.getAsset("img/"+currentButtonId+"Orange.png"),correctX,correctY);	
		}
	}
}

function onMouseClick(){
	//check that the mouse is being clicked whilst hovering over the button
	if(overButton){
		//play a nice sfx for feedback
		soundManager.playSound("sounds/button-click");

		//remove the mouse listeners
		c.onmousedown = null;	
		c.onmousemove = null;	

		//perform the callback function to whatever initiated this 
		clickCallback();
	}
}