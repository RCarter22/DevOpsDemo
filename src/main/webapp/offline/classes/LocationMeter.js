function LocationMeter (){
	// Class inheritance
    Mbo.apply(this, arguments);    
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('LOCATIONMETERID');
}

LocationMeter.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
        METERNAME: function(){
        	return true;
        },
        METERTYPE: function(){
        	return true;
        },
        READINGTYPE: function(){
        	return true;
        },        
        LOCATION: function(){
        	return true;
        },
        LOCATIONMETERID: function(){
        	return true;
        },
        LASTREADING: function(){
        	return true;
        },
        LASTREADINGDATE: function(){
        	return true;
        },
        MEASUREUNITID: function(){
        	return true;
        },
        SINCEINSTALL: function(){
        	return true;
        },
        SINCELASTOVERHAUL: function(){
        	return true;
        },
        SINCELASTINSPEC: function(){
        	return true;
        },
        SINCELASTREPAIR: function(){
        	return true;
        },
        SITEID: function(){
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

LocationMeter.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
        READING: function(){
        	return true;
        },
        READINGDATE: function(){
        	return true;
        }        
    };
    return attributes[attr] ? attributes[attr]() : false;
};
LocationMeter.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		READING: function(opt){
			var o = {
					field : "READING",
					source : "VALUE",
					table : "DOMAIN",
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

/* Validate */
LocationMeter.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;	
	
	// Return true if the object is valid
	return validated;
};

/* On Change */
LocationMeter.prototype.onChange = function(attr, crossovers, parentObj){
	var self = this;
	self.session.cache();
    var attributes = {
		REMARKS : function(){
			parentObj.mbo.toBeSaved(true);
        	return true;
        }                
    };
    return attributes[attr] ? attributes[attr]() : false;	
};

/* setValue */
LocationMeter.prototype.setValue = function(evt, attr, measurePoints){
    var self = this;
    self.session.cache();
    var attributes = {
    	READING: function(){
    		//first make sure the input is valid (i.e. numeric input for a gauge meter)
    		if(String.isNullOrEmpty(self.DOMAINID)){
    			if(!String.isNullOrEmpty(self.READING)){
	    			var isNumeric =  /^\d+(\.\d+)?$/.test(self.READING);
	    			if(!isNumeric){
	    				self.READING = null;
	    	    		throw new EMMInputException(evt, 'Invalid numeric input value!', EMMConstants.ERROR); // EMMConstants.ERROR or EMMConstants.WARNING, EMMConstants.INFO
	    			}
	    		}
    		}
    		
    		var measurePoint = $.grep(measurePoints, function (e) {
    			return (e.METERNAME == self.METERNAME && e.LOCATION == self.LOCATION && e.SITEID == self.SITEID);
    		});
    		
    		if (measurePoint[0]) {
    			var lowerWarning = measurePoint[0].LOWERWARNING;
    			var upperWarning = measurePoint[0].UPPERWARNING;

    			if (self.READING.toNumber() < lowerWarning.toNumber()) {
    	    		throw new EMMInputException(evt, 'The input value is below the lower warning limit.', EMMConstants.WARNING); // EMMConstants.ERROR or EMMConstants.WARNING, EMMConstants.INFO
    			} else if (self.READING.toNumber() > upperWarning.toNumber()) {
    	    		throw new EMMInputException(evt, 'The input value is over the upper warning limit.', EMMConstants.WARNING); // EMMConstants.ERROR or EMMConstants.WARNING, EMMConstants.INFO
    			}
    		}
        }
    }
    return attributes[attr] ? attributes[attr]() : false;
}