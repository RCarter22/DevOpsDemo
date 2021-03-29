// Class constructor
function WPLabor (){
	// Class inheritance
    Mbo.apply(this, arguments);
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('WPLABORUID');    
}

WPLabor.prototype.createNew = function(obj){
	// Set Default Values
	this.LABORHRS = 0;
	this.QUANTITY = 1;
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
};

//Custom automation scripts for readonly fields
/* Is Read Only */
WPLabor.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
        LABORCODE: function(){
        	if (String.isNullOrEmpty(self.CRAFT) && String.isNullOrEmpty(self.AMCREW))
        		return false;        	
    		return true;
        },
        CRAFT: function() {
        	if (String.isNullOrEmpty(self.LABORCODE) && String.isNullOrEmpty(self.AMCREW))
        		return false;        	
        	return true;
        },
        SKILLLEVEL: function() {      	
        	return true;
        },
        VENDOR: function() {     	      	
    		return true;
        },         
        AMCREW: function() {     	
        	if (String.isNullOrEmpty(self.CRAFT) && String.isNullOrEmpty(self.LABORCODE))
        		return false;        	
    		return true;
        }  
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Is Required */
WPLabor.prototype.isRequired = function(attr){
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

/* Lookup Criteria */
WPLabor.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		CRAFT: function(opt){			
			var o = {
				display : "CRAFT,SKILLLEVEL,VENDOR,STANDARDRATE",
				field : "CRAFT",
				source : "CRAFT",
				table : "CRAFTRATE",
				searchFields : "CRAFT,SKILLLEVEL,VENDOR",
				crossovers : "SKILLLEVEL,VENDOR",
				where : "1=1",
				orderby : "CRAFT"
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		LABORCODE: function(opt){
			var o = {
				display : "LABORCODE,DISPLAYNAME",
				field : "LABORCODE",
				source : "LABORCODE",
				table : "LABOR",
				searchFields : "LABORCODE,DISPLAYNAME",
				where : "1=1",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		AMCREW: function(opt){
			var o = {
				display : "AMCREW,DESCRIPTION",
				field : "AMCREW",
				source : "AMCREW",
				table : "AMCREW",
				searchFields : "AMCREW,DESCRIPTION",
				where : "1=1",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		}		
	};
	
	if (attributes[attr]){
		return attributes[attr](options);
	} else if (options != undefined && options != null){
		return new Domain(options);
	}
	
	return null;
};

/* On Change */
WPLabor.prototype.onChange = function(attr, crossovers){
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
        }      
        
    };
    return attributes[attr] ? attributes[attr]() : false;	
};

/* Validate */
WPLabor.prototype.validate = function(){
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
};