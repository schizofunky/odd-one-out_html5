function SoundManager(){
	var audio = new Audio();
	this.extension = ".mp3";
	this.muted = false;
	if(audio.canPlayType('audio/mpeg') == "")
	{	
		this.extension = ".wav";
	}
	this.soundDictionary = {};	
}

SoundManager.prototype.addSound = function(soundFile) {
	var snd = new Audio(soundFile+this.extension);
	this.soundDictionary[soundFile] = snd; 
}

SoundManager.prototype.playSound = function(soundFile) {
	if(!this.muted)
	{
		var snd = this.soundDictionary[soundFile];
		snd.pause();
		snd.currentTime = 0;
		snd.play();
	}
}

SoundManager.prototype.playMusic = function(soundFile) {
	if(!this.muted)
	{
		var snd = this.soundDictionary[soundFile];
		snd.loop = true;
		snd.pause();
		snd.currentTime = 0;
		snd.play();
	}
}

SoundManager.prototype.mute = function(){
	this.muted = true;
}