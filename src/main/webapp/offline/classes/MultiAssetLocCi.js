//Class constructor
function MultiAssetLocCi (){
	// Class inheritance
	Mbo.apply(this, arguments);
	
	this.setUniqueIdentifier('MULTIID');
	
	this.mbo.extend({
		_assetDesc : null,
		_locDesc : null
	});	
}

MultiAssetLocCi.prototype.createNew = function(obj){
	// Set Default Values
	this.PROGRESS = "0";
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
};

//Custom automation scripts for readonly fields
/* Is Read Only */
MultiAssetLocCi.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
    	ASSETNUM: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	LOCATION: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	SEQUENCE: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;
    	},
    	PROGRESS: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;
    	},
    	COMMENTS: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;
    	}
    };
    return attributes[attr] ? attributes[attr]() : false;
};

MultiAssetLocCi.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		ASSETNUM: function(opt){
			var o = {
				aliascolumns: "ASSET.DESCRIPTION, LOCATIONS.DESCRIPTION",
				field: "ASSETNUM",
				source: "ASSETNUM",
				searchFields : "ASSETNUM, ASSET.DESCRIPTION, LOCATION",
				table: "ASSET LEFT JOIN LOCATIONS ON ASSET.LOCATION=LOCATIONS.LOCATION AND ASSET.SITEID = LOCATIONS.SITEID",
				crossovers : "ASSET.DESCRIPTION,LOCATION,LOCATIONS.DESCRIPTION",
				where : "ASSET.SITEID = '" + self.SITEID + "'",
				orderby: null
			};
			
			$.extend(o, opt);
			return new Domain(o);
		},
		LOCATION: function(opt){			
			var o = {
				display : "LOCATION,DESCRIPTION,SYSTEMID",
				field : "LOCATION",
				source : "LOCATION",
				table: "LOCATIONS",
				searchFields : "LOCATION,DESCRIPTION",
				where: "SITEID = '" + self.SITEID + "'",
				crossovers : "DESCRIPTION",
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
MultiAssetLocCi.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
        ASSETNUM : function(){
        	if(crossovers){
        		self.LOCATION = crossovers.LOCATION;
        		self.mbo._assetDesc = crossovers['ASSET.DESCRIPTION'];
        		self.mbo._locDesc = crossovers['LOCATIONS.DESCRIPTION'];
        	}
        	return true;
        },
        LOCATION : function(){
        	self.ASSETNUM = null;
        	self.mbo._assetDesc = null;
        	self.mbo._locDesc = crossovers.DESCRIPTION;
        	return true;
        }

    };
    return attributes[attr] ? attributes[attr]() : false;	
}; 

/* Validate */
MultiAssetLocCi.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
		
	if (self.SEQUENCE && !Number.isNumber(self.SEQUENCE)){
		validated = false;
		self.mbo.message(getText('EMMOF1004W', [getText('MULTIASSETLOCCI.SEQUENCE')], 'Sequence must be a number'));
		return validated;
	} 
	var fields = [];
	if (!self.LOCATION && !self.ASSETNUM) {
		fields.push(getText('MULTIASSETLOCCI.ASSETNUM', null, 'MultiAssetLocCi'));
		fields.push(getText('MULTIASSETLOCCI.LOCATION', null, 'MultiAssetLocCi'));
	}
		
	if(fields.length>0){
		validated = false;
		self.mbo.message(getText('EMMOF1011W', [fields.join(', or ')], 'Asset, or Location is required'));
	}

	// Return true if the object is valid
	return validated;
};

