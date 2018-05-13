// Class constructor
function NonStock (){
	// Class inheritance
    Mbo.apply(this, arguments);
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('SERVRECTRANSID');    
}


//Custom automation scripts for readonly fields
/* Is Read Only */
NonStock.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
        DESCRIPTION: function(){    	
    		return true;
        },
       PLUSTHASWARRANTY: function() {  	
        	return true;
        },
        QUANTITY: function() {      	
        	return true;
        },
        UNITCOST: function() {     	      	
    		return true;
        },         
        LOADEDCOST: function() {     	  	
    		return true;
        }  
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Is Required 
NonStock.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
        LABORHRS: function(){
    		return true;
        },
        QUANTITY: function() {
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};
*/

/*
 Validate 
NonStock.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	if(self.QUANTITY) {
		if (!Number.isNumber(self.QUANTITY)){
			validated = false;
			self.mbo.message(getText('EMMOF1004W', [getText('WPLABOR.QUANTITY')], 'Quantity must be a number'));
			return validated;
		}
	}
	
	if(self.LABORHRS) {
		if (!Number.isNumber(self.LABORHRS)){
			validated = false;
			self.mbo.message(getText('EMMOF1004W', [getText('WPLABOR.REGULARHRS')], 'Regular hours must be a number'));
			return validated;
		}
	}
	
	var fields = [];
	if (self.mbo.isRequired('QUANTITY') && !self.QUANTITY)
		fields.push(getText('WPLABOR.QUANTITY', null, 'Quantity'));
	if (self.mbo.isRequired('LABORHRS') && Number.getNumber(self.LABORHRS) == null)
		fields.push(getText('WPLABOR.LABORHRS', null, 'Regular Hrs'));
	if (self.mbo.isRequired('LABORCODE') && !self.LABORCODE)
		fields.push(getText('WORKORDER.LABORCODE', null, 'Labor Code'));
	
	if(fields.length>0){	
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
	}		
	
	if (String.isNullOrEmpty(self.CRAFT) && String.isNullOrEmpty(self.LABORCODE) && String.isNullOrEmpty(self.AMCREW)){
		validated = false;
		fields.push(getText('WPLABOR.CRAFT', null, 'Craft'));
		fields.push(getText('WPLABOR.LABORCODE', null, 'Labor Code'));
		fields.push(getText('WPLABOR.AMCREW', null, 'Crew'));
		self.mbo.message(getText('EMMOF1005W', [fields.join(' or ')], 'Missing required fields'));		
	} 
	
	// Return true if the object is valid
	return validated;
};*/