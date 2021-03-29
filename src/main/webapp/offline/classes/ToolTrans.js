// Class constructor
function ToolTrans (){
	// Class inheritance
    Mbo.apply(this, arguments);
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('TOOLTRANSID');
    
    this.mbo.extend({ // persistant field for crossover
    	_toolItemDesc : null
    });
}

ToolTrans.prototype.createNew = function(obj){
	// Set Default Values
	
	this.TRANSDATE = new Date();
	this.ENTERBY = EMMServer.DB.getUserInfo().personId;
	this.ENTERDATE = new Date();
	this.TOOLQTY = 1;
	this.TOOLHRS = 1;
	this.TOOLRATE = 0.00;
	this.TOOLRATE = this.TOOLRATE.toFixed(2);
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
}

//Custom automation scripts for readonly fields
/* Is Read Only */
ToolTrans.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
        ITEMNUM: function(){
        	if (!self.mbo.isNew())
        		return true;
        	else
        		return false;
        },
        TOOLQTY: function(){
        	if (!self.mbo.isNew())
        		return true;
        	else
        		return false;
        },
        LINECOST: function(){
        	if (!self.mbo.isNew())
        		return true;
        	else
        		return false;
        },
        LOCATION: function(){
        	if (!self.mbo.isNew())
        		return true;
        	else
        		return false;
        },
        ASSETNUM: function(){
        	if (!self.mbo.isNew())
        		return true;
        	else
        		return false;
        },
        TOOLHRS : function() {
        	if (!self.mbo.isNew())
        		return true;
        	else
        		return false;
        },
        TOOLRATE : function() {
        	if (!self.mbo.isNew())
        		return true;
        	else
        		return false;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Is Required */
ToolTrans.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
        ITEMNUM: function(){
        	return true;
        },       
        TOOLQTY : function(){
        	return true;
        },
        TOOLHRS : function(){
        	return true;
        },
        TOOLRATE : function() {
        	return true;
        },
        LINECOST: function(){
        	return true;
        },
        ASSETNUM: function(){
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Lookup Criteria */
ToolTrans.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
			ITEMNUM: function(opt){
				var whereclause = "ORGID = '"+self.ORGID+"' ";
				var o = {
					display : "ITEMNUM,DESCRIPTION",
					field : "ITEMNUM",
					source : "ITEMNUM",
					searchFields : "ITEMNUM,DESCRIPTION",
					table : "TOOLITEM",
					crossovers: "DESCRIPTION,ITEMSETID,TOOLRATE",
					where : whereclause
				};
				$.extend(o, opt);             
				var domain = new Domain(o);
				
				return domain;
			},
			LOCATION: function(opt){
				var where = "1=1";
				var o = {
					display : "LOCATION,DESCRIPTION,SYSTEMID",
					field : "LOCATION",
					source : "LOCATION",
					table: "LOCATIONS",
					searchFields : "LOCATION,DESCRIPTION",
					where: where,
					orderby : null
				};
				$.extend(o, opt);
				return new Domain(o);
			},
			ASSETNUM: function(opt){
				var where = "1=1";
				var o = {
						display: "ASSETNUM, DESCRIPTION, LOCATION",
						field: "ASSETNUM",
						source: "ASSETNUM",
						searchFields : "ASSETNUM,DESCRIPTION,LOCATION",
						table: "ASSET",
						orderby: null
				};
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
ToolTrans.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	var fields = [];
	if (self.mbo.isRequired('ITEMNUM') && String.isNullOrEmpty(self.ITEMNUM))
		fields.push(getText('TOOLTRANS.ITEMNUM', null, 'Item'));
	if (self.mbo.isRequired('TOOLQTY') && String.isNullOrEmpty(self.TOOLQTY))
		fields.push(getText('TOOLTRANS.TOOLQTY', null, 'Quantity'));
	if (self.mbo.isRequired('TOOLHRS') && String.isNullOrEmpty(self.TOOLHRS))
		fields.push(getText('TOOLTRANS.TOOLHRS', null, 'Tool Hours'));
	if (self.mbo.isRequired('TOOLRATE') && String.isNullOrEmpty(self.TOOLRATE))
		fields.push(getText('TOOLTRANS.TOOLRATE', null, 'Tool Rate'));
	if (self.mbo.isRequired('LINECOST') && String.isNullOrEmpty(self.LINECOST))
		fields.push(getText('TOOLTRANS.LINECOST', null, 'Line Cost'));
	
	if(fields.length>0){
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
		return validated;
	}
	
	
	if (!Number.isNumber(self.TOOLQTY)){
		validated = false;
		self.mbo.message(getText('EMMOF1004W', [getText('TOOLTRANS.TOOLQTY')], 'Quantity must be a number'));
		return validated;
	} else if (self.TOOLQTY<=0){
		validated = false;
		self.mbo.message(getText('EMMOF1010W', [getText('TOOLTRANS.TOOLQTY')], 'Tool Quantity must be greater than zero'));
		return validated;
	}
	
	if (!Number.isNumber(self.TOOLHRS)){
		validated = false;
		self.mbo.message(getText('EMMOF1004W', [getText('TOOLTRANS.TOOLHRS')], 'Tool Hours must be a number'));
		return validated;
	} else if (self.TOOLHRS<=0){
		validated = false;
		self.mbo.message(getText('EMMOF1010W', [getText('TOOLTRANS.TOOLHRS')], 'Tool Hours must greater than zero'));
		return validated;
	}
	
	if (!Number.isNumber(self.TOOLRATE)){
		validated = false;
		self.mbo.message(getText('EMMOF1004W', [getText('TOOLTRANS.TOOLRATE')], 'Tool Rate must be a number'));
		return validated;
	} 
	if (!Number.isNumber(self.LINECOST)){
		validated = false;
		self.mbo.message(getText('EMMOF1004W', [getText('TOOLTRANS.LINECOST')], 'Line Cost must be a number'));
		return validated;
	}

	
	
	// Return true if the object is valid
	return validated;
};

/* On Change */
ToolTrans.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
    	ITEMNUM: function(){
    		if(String.isNullOrEmpty(self.TOOLQTY)){
    			self.TOOLQTY = 1;
    			
    		}
    		if(String.isNullOrEmpty(self.TOOLHRS)){
    			self.TOOLHRS  = 1;
    		}
    		if (crossovers) {
    			self.mbo._toolItemDesc = crossovers.DESCRIPTION;
    			self.ITEMSETID = crossovers.ITEMSETID;
    			self.TOOLRATE = crossovers.TOOLRATE;
    			if(!crossovers.TOOLRATE){
    				self.TOOLRATE = 0.00;
    				self.TOOLRATE = self.TOOLRATE.toFixed(2);
    			}
    			else
    				self.TOOLRATE = crossovers.TOOLRATE;
    		}
        	return true;
        },
        ASSETNUM : function(){
        	if(crossovers){
        		self.LOCATION = crossovers.LOCATION;
        	}
        	return true;
        },
        LOCATION : function(){
        	self.ASSETNUM = null;
        	return true;
        }
    }
    return attributes[attr] ? attributes[attr]() : false;	
}