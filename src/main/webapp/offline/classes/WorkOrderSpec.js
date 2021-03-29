//Author:Gagan
function WorkOrderSpec (){
	// Class inheritance
    Mbo.apply(this, arguments);    
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('WORKORDERSPECID');

   
};

WorkOrderSpec.prototype.createNew = function(obj){	

	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	this.ISACTIVE = '1';
	this.CHANGEDATE = new Date();
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);	
};

WorkOrderSpec.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
			NUMVALUE: function(opt){
				var o = {
						field : "NUMVALUE",
						source : "VALUE",
						table : "SPECDOMAIN",
						searchFields : "VALUE,DESCRIPTION",
						where : "DOMAINID = '" + self.DOMAINID + "'",
						orderby : null
				}
				$.extend(o, opt);			
				return new Domain(o);
			},		
			ALNVALUE: function(opt){
				var o = {
						field : "ALNVALUE",
						source : "VALUE",
						table : "SPECDOMAIN",
						searchFields : "VALUE,DESCRIPTION",
						where : "DOMAINID = '" + self.DOMAINID + "'",
						orderby : null
				}
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

/* Is Required*/
WorkOrderSpec.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
    	NUMVALUE: function(){
    		if (self.MANDATORY == "1")
    			return true;
    		else
    			return false;    		
    	},
    	ALNVALUE: function(){
    		if (self.MANDATORY == "1")
    			return true;
    		else
    			return false;    		
    	}
    };
    return attributes[attr] ? attributes[attr]() : false;
};

WorkOrderSpec.prototype.validate = function(){
	// Any validation logic goes here
	var self = this, validated = true;
	if(self.DATATYPE == "NUMERIC"){
		if(!String.isNullOrEmpty(self.NUMVALUE) && !$.isNumeric(self.NUMVALUE)){
			validated = false;
			self.mbo.message(self.ASSETATTRID + " must be numeric");
		}
		if(String.isNullOrEmpty(self.NUMVALUE) && self.mbo.isRequired('NUMVALUE'))
		{
			validated = false;
			self.mbo.message(self.ASSETATTRID + " is required");
		}
	}
	if(self.DATATYPE == "ALN"){
		if(String.isNullOrEmpty(self.ALNVALUE) && self.mbo.isRequired('ALNVALUE'))
		{
			validated = false;
			self.mbo.message(self.ASSETATTRID + " is required");
		}
	}
	// Return true if the object is valid
	return validated;
};