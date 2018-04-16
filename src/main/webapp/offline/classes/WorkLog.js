// Class constructor
function WorkLog (){
	// Class inheritance
    Mbo.apply(this, arguments);
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('WORKLOGID');    
}

WorkLog.prototype.createNew = function(obj){
	// Set Default Values
	this.LOGTYPE = 'WORK';
	this.CREATEDATE = new Date();
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
}

//Custom automation scripts for readonly fields
/* Is Read Only */
WorkLog.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
    	LOGTYPE: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	DESCRIPTION: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	LONGDESCRIPTION: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;
    	}
    };
    return attributes[attr] ? attributes[attr]() : false;
};

WorkLog.prototype.isRequired = function(attr){
	var self = this;
	var attributes = {
		LOGTYPE : function(){
			return true;
		},
		DESCRIPTION : function(){
			return true;
		}
	};
	return attributes[attr] ? attributes[attr]() : false;
}

/* Lookup Criteria */
WorkLog.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
			LOGTYPE: function(opt){
				var o = {
					display : "VALUE,DESCRIPTION",
					field : "LOGTYPE",
					source : "VALUE",
					table : "DOMAIN",
					searchFields : "VALUE,DESCRIPTION",
					where : "DOMAINID = 'LOGTYPE'",
					orderby : null
				}
				$.extend(o, opt);
				return new Domain(o);
			}
	}
	
	if (attributes[attr]){
		return attributes[attr](options);
	} else if (options != undefined && options != null){
		return new Domain(options);		
	}
	
	return null;
}

/* Validate */
WorkLog.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	if (self.mbo.isNew()){
		var fields = [];
		if (self.mbo.isRequired('DESCRIPTION') && !self.DESCRIPTION)
			fields.push(getText('WORKLOG.DESCRIPTION', null, 'Description'));
		if (self.mbo.isRequired('LOGTYPE') && !self.LOGTYPE)
			fields.push(getText('WORKLOG.LOGTYPE', null, 'Type'));
		if(fields.length>0){
			validated = false;
			self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
		}
	}
	
	// Return true if the object is valid
	return validated;
};