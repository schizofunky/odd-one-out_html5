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
	this.music = this.soundDictionary[soundFile];
	this.music.loop = true;
	this.music.pause();
	this.music.currentTime = 0;
	this.music.play();
	this.music.volume = this.muted ? 0 : 1;		
}

SoundManager.prototype.stopMusic = function(){
	if(this.music)
	{
		this.music.pause();
		this.music.currentTime = 0;
	}	
}

SoundManager.prototype.mute = function(){
	this.muted = !this.muted;
	if(this.music)
	{
		this.music.volume = this.muted ? 0 : 1;	
	}
}

SoundManager.prototype.getMuteStatus = function(){
	return this.muted ? "On" : "Off";
}