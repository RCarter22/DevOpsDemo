function Doclinks (){
	// Class inheritance
    Mbo.apply(this, arguments);    
}

Doclinks.prototype.toggleRequest  = function(){
	this.REQUESTED = (this.REQUESTED === '1') ? '0' : '1';
	this.mbo.toBeSaved(true);
}


Doclinks.prototype.isRequested  = function(){
	return this.REQUESTED === '1';
}


Doclinks.prototype.isDownloaded  = function(){
	return this.DOWNLOADED === '1';
}

