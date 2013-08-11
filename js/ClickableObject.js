function ClickableObject(objectID,xPosition,yPosition,width,height){
	this.objectID = objectID;
	this.objectX = xPosition;
	this.objectY = yPosition;
	this.objectWidth = width;
	this.objectHeight = height;

}

ClickableObject.prototype.getID = function(){
	return this.objectID;
}

ClickableObject.prototype.isMouseOver = function(mouseX,mouseY){
	var isOver = false;
	if(mouseX >= this.objectX && mouseX <= this.objectX+this.objectWidth){
		if(mouseY >= this.objectY && mouseY <= this.objectY + this.objectHeight){
			isOver = true;
		}
	}
	return isOver;
}