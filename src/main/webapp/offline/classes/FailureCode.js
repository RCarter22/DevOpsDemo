// Class constructor
function FailureCode (){
	// Class inheritance
    Mbo.apply(this, arguments);
    
    this.setUniqueIdentifier('WORKORDERID');
}

/* On Change */
FailureCode.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
    	FAILURECODE: function(){
    		self.PROBLEMCODE = null;
    		self.CAUSECODE = null;
    		self.REMEDYCODE = null;
    		if(crossovers){     		
        		self.FAILURECODE_FAILURELIST = crossovers.FAILURELIST;
        	}       		
        	return true;
        },
    	PROBLEMCODE: function(){
    		self.CAUSECODE = null;
    		self.REMEDYCODE = null;
    		if(crossovers){     		
        		self.PROBLEMCODE_FAILURELIST = crossovers.FAILURELIST;
        	}        		
        	return true;
    	},
    	CAUSECODE: function(){
    		self.REMEDYCODE = null;
    		if(crossovers){     		
        		self.CAUSECODE_FAILURELIST = crossovers.FAILURELIST;
        	}   
        	return true;
        }
    }
    return attributes[attr] ? attributes[attr]() : false;	
}

/* Lookup Criteria */
FailureCode.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		FAILURECODE: function(opt){
			var o = {
				display : "FAILURECODE,DESCRIPTION",
				field : "FAILURECODE",
				source : "FAILURECODE",
				table : "FAILURECODE",
				searchFields : "FAILURECODE,DESCRIPTION",
				crossovers: "FAILURELIST",
				where : "(PARENT IS NULL OR PARENT = '') AND ORGID = '" + self.ORGID + "'",
				orderby : null
			}
			$.extend(o, opt);	
			return new Domain(o);
		},
		PROBLEMCODE: function(opt){			
			var where = " PARENT = '" + self.FAILURECODE_FAILURELIST + "' AND ORGID = '" + self.ORGID + "' AND TYPE='PROBLEM'";
			
			var o = {
				display : "FAILURECODE,DESCRIPTION",
				field : "PROBLEMCODE",
				source : "FAILURECODE",
				table : "FAILURECODE",
				searchFields : "FAILURECODE,DESCRIPTION",
				crossovers: "FAILURELIST",
				where : where,
				orderby : null
			}
			$.extend(o, opt);
			return new Domain(o);
		},
		CAUSECODE: function(opt){				
			var where = " PARENT = '" + self.PROBLEMCODE_FAILURELIST + "' AND ORGID = '" + self.ORGID + "' AND TYPE='CAUSE'";
			
			var o = {
				display : "FAILURECODE,DESCRIPTION",
				field : "CAUSECODE",
				source : "FAILURECODE",
				table : "FAILURECODE",
				searchFields : "FAILURECODE,DESCRIPTION",
				crossovers: "FAILURELIST",
				where : where,
				orderby : null
			}
			$.extend(o, opt);
			return new Domain(o);
		},
		REMEDYCODE: function(opt){		
			var where = " PARENT = '" + self.CAUSECODE_FAILURELIST + "' AND ORGID = '" + self.ORGID + "' AND TYPE='REMEDY'";
			
			var o = {
				display : "FAILURECODE,DESCRIPTION",
				field : "REMEDYCODE",
				source : "FAILURECODE",
				table : "FAILURECODE",
				searchFields : "FAILURECODE,DESCRIPTION",
				where : where,
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
FailureCode.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	if (validated === true){
		delete self.FAILURECODE_FAILURELIST;
		delete self.PROBLEMCODE_FAILURELIST;
		delete self.CAUSECODE_FAILURELIST;
	}
	
	// Return true if the object is valid
	return validated;
};