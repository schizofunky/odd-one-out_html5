function AssetManager(){
	this.successCount = 0;
	this.errorCount = 0;
	this.assetsToLoad = [];
	this.assetDictionary = {};
}

AssetManager.prototype.addFileToLoad = function(filePath){
this.assetsToLoad.push(filePath);
}

AssetManager.prototype.getAsset = function(filePath) {
	return this.assetDictionary[filePath];
}

AssetManager.prototype.downloadAssets = function(onAllAssetsDownloaded,onDownloadProgress){
	if(this.assetsToLoad.length == 0){
		onAllAssetsDownloaded();
	}
	for(var i = 0; i < this.assetsToLoad.length; i++){
		var path = this.assetsToLoad[i];
		var img = new Image();
		var that = this;
		img.addEventListener("load", function(){
			that.successCount+= 1;
			if(that.isDownloadComplete()){
				onAllAssetsDownloaded();
			}
		},false);
		img.addEventListener("error", function(){
			that.errorCount+= 1;
			if(that.isDownloadComplete()){
				onAllAssetsDownloaded();
			}
		},false);
		img.src = path;
		this.assetDictionary[path] = img;
	}
}

AssetManager.prototype.isDownloadComplete = function(){
	return (this.assetsToLoad.length == this.successCount + this.errorCount);
}