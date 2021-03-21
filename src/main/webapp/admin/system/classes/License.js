function License(){
}

License.prototype.getLicenseType = function(){
	var self = this;
	switch(self.licenseType){
		case "TRIAL":
			return "Trial";
			break;
		case "PROD":
			return "Production";
			break;
		case "PROD_SS":
			return "Production (Self-Service)";
			break;
		case "CONCURRENT":
			return "Production (Concurrent)";			
		case "SITE":
			return "Enterprise";
			break;
		default:
			return self.licenseType;
	}
}

License.prototype.getOrgs = function(){
	return (this.orgIds||[]).split(',');
}

License.prototype.showLicenseCount = function(){
	return this.licenseType != "SITE" && this.licenseType != "CONCURRENT";
} 

License.prototype.getTrialRemainder = function(){
	var self = this;
	var todayms = new Date().getTime();
	if(self.trialExpireDate){
		var expireDateParts = self.trialExpireDate.split("-");
		if(expireDateParts.length == 3){
			var expireUTCms = new Date(self.trialExpireDate).getTime();
			var difference = expireUTCms - todayms;
			if(difference < 0)
				return 0;
			return Math.ceil(difference / (1000 * 3600 * 24)) - 1;
		}
	}
	return 0;
	
}
License.prototype.init = function(licenseInfo) {
	var self = this;
	$.extend(self, licenseInfo);
}