function Assignment(){
	// Class inheritance
    Mbo.apply(this, arguments);    
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('ASSIGNMENTID');
}

Assignment.prototype.createNew = function(obj){
	
	this.STATUS = "ASSIGNED";
	this.STARTDATE = new Date();
	this.LABORHRS = 0;
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
};

/* Is Read Only */
Assignment.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
		STATUS : function(){
			return true
		},
    	LABORCODE: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	STARTDATE: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	LABORHRS: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;
    	}
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Is Required */
Assignment.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
        LABORCODE: function(){
        	return true;
        },
        CRAFT: function(){
        	return true;
        },
        LABORHRS: function(){
    		return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Lookup Criteria */
Assignment.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		LABORCODE: function(opt){
			var where = "DEFAULTCRAFT = '1' AND ORGID='" + self.ORGID + "' AND LABORCODE IN (SELECT LABORCODE FROM LABOR WHERE STATUS='ACTIVE' AND ORGID='" + self.ORGID + "')";
			var o = {
				display : "LABORCODE,CRAFT",
				field : "LABORCODE",
				source : "LABORCODE",
				table : "LABORCRAFTRATE",
				searchFields : "LABORCODE,CRAFT",
				crossovers: "CRAFT",
				where : where,
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		CRAFT: function(opt){
			var o = {
				display : "CRAFT,DESCRIPTION",
				field : "CRAFT",
				source : "CRAFT",
				table : "CRAFT",
				searchFields : "CRAFT,DESCRIPTION",
				where : "ORGID = '" + self.ORGID + "'",
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

/* Validate */
Assignment.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	if(self.LABORHRS) {
		if (isNaN(self.LABORHRS)){
			validated = false;
			self.mbo.message(getText('EMMOF1004W', [getText('ASSIGNMENT.LABORHRS')], 'Hours must be a number'));
			return validated;
		}
	}
	
	var fields = [];
	if(self.mbo.isRequired('LABORCODE') && String.isNullOrEmpty(self.LABORCODE))
		fields.push(getText('ASSIGNMENT.LABORCODE', null, 'Labor Code'));	
	if (self.mbo.isRequired('STARTDATE') && String.isNullOrEmpty(self.STARTDATE))
		fields.push(getText('ASSIGNMENT.STARTDATE', null, 'Start Date'));	
	if (self.mbo.isRequired('LABORHRS') && (isNaN(self.LABORHRS) || self.LABORHRS === ''))
		fields.push(getText('ASSIGNMENT.LABORHRS', null, 'Hours'));
	
	if(fields.length>0){	
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
	}		
	
	// Return true if the object is valid
	return validated;
};

Assignment.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
    	LABORCODE: function(){
    		if(crossovers) {
    			self.CRAFT = crossovers.CRAFT;
    		}
    		return true;
        },
        CRAFT: function(){
        	self.LABORCODE = null;
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;	
};

