var currentButtonId,clickCallback,overButton,clickableObjects;

function OneButtonView(buttonId, onClickCallback){
	overButton = false; //represents if the mouse is hovering over the image area
	currentButtonId = buttonId; //the id of the asset that sits on top of the button, this game expects there to be a Purple and Orange version of each of these assets
	clickCallback = onClickCallback; // the callback function for when the button is clicked

	//sets up the liteners for when the mouse moves and is clicked
	c.onmousedown = onMouseClick;	
	c.onmousemove = onMouseMove;
	clickableObjects = [];
	ctx.drawImage(assetManager.getAsset("img/Mute"+soundManager.getMuteStatus()+".png"),785,-12);
	clickableObjects.push(new ClickableObject("mute-button",785,-12,50,40));
	clickableObjects.push(new ClickableObject("menu-button",350,400,200,120));
}


function onMouseMove(event){

	//hard coded locations of the button and i's dimensions, quite hacky but it's a small game
	var correctX = 350;
	var correctY = 400;
	var correctWidth = 200;
	var correctHeight = 120;
	var mouseX = event.offsetX? event.offsetX : event.layerX;
	var mouseY = event.offsetY? event.offsetY : event.layerY;

	//a flag representing if the mouse is currently over the button
	var currentlyOver = false;


	for(var i = 0; i < clickableObjects.length; i++){
		if(clickableObjects[i].isMouseOver(mouseX,mouseY)){
			switch(clickableObjects[i].getID()){
				case "menu-button":
					currentlyOver = true;
				break;
			}
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

function onMouseClick(event){
	var mouseX = event.offsetX? event.offsetX : event.layerX;
 	var mouseY = event.offsetY? event.offsetY : event.layerY;

	//check that the mouse is being clicked whilst hovering over the button
	for(var i = 0; i < clickableObjects.length; i++){
		if(clickableObjects[i].isMouseOver(mouseX,mouseY)){
			switch(clickableObjects[i].getID()){
				case "menu-button":
					//play a nice sfx for feedback
					soundManager.playSound("sounds/button-click");

					//remove the mouse listeners
					c.onmousedown = null;	
					c.onmousemove = null;	

					//perform the callback function to whatever initiated this 
					clickCallback();
				break;
				case "mute-button":
					soundManager.mute();
					ctx.drawImage(assetManager.getAsset("img/GameFrame.png"),0,0);
					ctx.drawImage(assetManager.getAsset("img/Mute"+soundManager.getMuteStatus()+".png"),785,-12);
				break;
			}
		}
	}
}