//Class constructor
function InvBalances (){
	//Class inheritance
	Mbo.apply(this, arguments);
	
	this.setUniqueIdentifier('INVBALANCESID');
	
    // You can extend certain properties such as 'mbo' using the extend() function
    this.mbo.extend({
    	_newCountDate : new Date()
    });
}

InvBalances.prototype.createNew = function(obj){
	var now = new Date();
	
	this.ITEMTYPE = 'ITEM';
	this.PHYSCNTDATE = now;
	this.SITEID = EMMServer.DB.getUserInfo().siteId;
	this.ORGID = EMMServer.DB.getUserInfo().orgId;
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
};

InvBalances.prototype.validate = function(){
	// Any validation logic goes here
	var self = this, validated = true;
	
	if(self.PHYSCNT) {
		if(!(Number.isNumber(self.PHYSCNT) && isFinite(Number.getNumber(self.PHYSCNT)) && (Number.getNumber(self.PHYSCNT) >= 0))){
			validated = false;
			self.mbo.message(getText('EMMOF1004W', [getText('INVBALANCES.PHYSCNT')], 'Physical Count must be a positive number'));
		}
	}
	// Return true if the object is valid
	return validated;
};

/*onChange*/ 
InvBalances.prototype.onChange = function(attr, crossover){
	var self = this;
    var attributes = {
        CRAFT : function(){
        	if (self.CRAFT == null){
        		self.SKILLLEVEL = null;
        		self.VENDOR = null;        		
        	} else if(crossovers){
        		self.SKILLLEVEL = crossovers.SKILLLEVEL;
        		self.VENDOR = crossovers.VENDOR;
        	}
        	return true;
        },      
        _newCountDate : function(){
        	return true;
        }
    };
	
    return attributes[attr] ? attributes[attr]() : false;	
};





