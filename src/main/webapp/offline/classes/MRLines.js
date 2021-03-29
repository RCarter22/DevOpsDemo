// Class constructor
function MRLines (){
	// Class inheritance
    Mbo.apply(this, arguments);
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('MRLINEID');
}

MRLines.prototype.createNew = function(obj)
{	
	// Set Default Values
	this.LINETYPE = 'ITEM';
	this.REQUIREDDATE = new Date();
	this.QTY = 1;
	this.UNITCOST = 0;
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
};

/*Is Read Only*/
MRLines.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
    	MRLINENUM : function(){
    		return true;
    	},
    	LINETYPE: function(){
        	if (self.mbo.isNew())
        		return false;
        	else
        		return true;
        },
    	ITEMNUM: function(){
        	if (self.mbo.isNew())
        		return self.LINETYPE == 'ITEM' ? false : true;
        	else
        		return true;
        },
        DESCRIPTION: function(){
        	if (self.mbo.isNew())        	
        		return self.LINETYPE == 'ITEM' ? true : false;
        	else
        		return true;
        },
        QTY: function(){
        	if (self.mbo.isNew())
        		return false;
        	else
        		return true;
        },
        ORDERUNIT: function(){
        	if (self.mbo.isNew())
        		return false;
        	else
        		return true;
        },
        UNITCOST: function(){
        	if (self.mbo.isNew())
        		return self.LINETYPE == 'ITEM' ? true : false;
        	else
        		return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/*Is Required*/
MRLines.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
		LINETYPE: function(){
        	return true;
        },
        ITEMNUM: function(){
        	return self.LINETYPE == 'ITEM' ? true : false;
        },
        DESCRIPTION: function(){
        	return self.LINETYPE == 'ITEM' ? false : true;
        },        
        QTY : function(){
        	return true;
        },
        UNITCOST: function(){
        	return self.LINETYPE == 'ITEM' ? false : true;
        },
        ORDERUNIT: function(){
        	return true;
        },  
		
    };
    return attributes[attr] ? attributes[attr]() : false;
};

MRLines.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		LINETYPE: function(opt){
			var o = {
				display : "LINETYPE,DESCRIPTION",
				field : "LINETYPE",
				source : "LINETYPE",
				table : "LINETYPE"
			};
			$.extend(o, opt);             
			var domain = new Domain(o);
			domain.addCustomItem(["ITEM", getText('MATUSETRANS.ITEMNUM', null, "Item")], ["LINETYPE", "DESCRIPTION"]);
			domain.addCustomItem(["MATERIAL", getText('MATUSETRANS.DESCRIPTION', null, "Material")], ["LINETYPE", "DESCRIPTION"]);
			return domain;
		},
		ITEMNUM: function(opt){
			var where = "ITEMTYPE = 'ITEM' AND SITEID='" + self.SITEID + "' ";
			var o = {
				display : "ITEMNUM,DESCRIPTION",
				field : "ITEMNUM",
				source : "ITEMNUM",
				crossovers : "DESCRIPTION,LOCATION",
				searchFields : "ITEMNUM,DESCRIPTION",
				table : "INVBALANCES",
				where : where
			};
			$.extend(o, opt);    
			return new Domain(o);
		},
		ORDERUNIT: function(opt){
			var where = "SITEID IS NULL OR SITEID='" + self.SITEID + "'";
			var o = {
				display : "MEASUREUNITID,ABBREVIATION,DESCRIPTION,SITEID",
				field : "ORDERUNIT",
				source : "MEASUREUNITID",
				searchFields : "MEASUREUNITID,ABBREVIATION,DESCRIPTION",
				table : "MEASUREUNIT",
				where : where
			};
			$.extend(o, opt);    
			return new Domain(o);
		}
	};
	
	if (attributes[attr]){
		return attributes[attr](options);
	} else if (options != undefined && options != null){
		return new Domain(o);		
	}
	
	return null;
};

/* Validate */
MRLines.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	if(!String.isNullOrEmpty(self.LINETYPE)) {
		if (self.LINETYPE == 'ITEM'){
			if (!Number.isNumber(self.QTY)){
				validated = false;
				self.mbo.message(getText('EMMOF1004W', [getText('MRLINE.QTY')], 'Quantity must be a number'));
				return validated;
			} else if (self.QTY<=0){
				validated = false;
				self.mbo.message(getText('EMMOF1009W', [getText('MRLINE.QTY')], 'Please specify a quantity greater than zero'));
				return validated;
			}	
			var fields = [];
			if (self.mbo.isRequired('ITEMNUM') && String.isNullOrEmpty(self.ITEMNUM))
				fields.push(getText('MRLINE.ITEMNUM', null, 'Item'));
			if (self.mbo.isRequired('ORDERUNIT') && String.isNullOrEmpty(self.ORDERUNIT))
				fields.push(getText('MRLINE.ORDERUNIT', null, 'Order Unit'));
			if (self.mbo.isRequired('QTY') && Number.getNumber(self.QTY) == null)
				fields.push(getText('MRLINE.QTY', null, 'Quantity'));			
			if(fields.length>0){
				validated = false;
				self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
			}
		} else if (self.LINETYPE == 'MATERIAL'){
			if (!Number.isNumber(self.QTY)){
				validated = false;
				self.mbo.message(getText('EMMOF1004W', [getText('MRLINE.QTY')], 'Quantity must be a number'));
				return validated;
			} else if (self.QTY<=0){
				validated = false;
				self.mbo.message(getText('EMMOF1009W', [getText('MRLINE.QTY')], 'Please specify a quantity greater than zero'));
				return validated;
			}
			if (!Number.isNumber(self.UNITCOST)){
				validated = false;
				self.mbo.message(getText('EMMOF1004W', [getText('MRLINE.UNITCOST')], 'Unit cost must be a number'));
				return validated;
			}
			var fields = [];
			if (self.mbo.isRequired('DESCRIPTION') && String.isNullOrEmpty(self.DESCRIPTION))
				fields.push(getText('MRLINE.DESCRIPTION', null, 'Description'));
			if (self.mbo.isRequired('UNITCOST') && Number.getNumber(self.UNITCOST) == null)
				fields.push(getText('MRLINE.UNITCOST', null, 'Unit Cost'));		
			if (self.mbo.isRequired('QTY') && Number.getNumber(self.QTY) == null)
				fields.push(getText('MRLINE.QTY', null, 'Quantity'));
			if (self.mbo.isRequired('ORDERUNIT') && String.isNullOrEmpty(self.ORDERUNIT))
				fields.push(getText('MRLINE.ORDERUNIT', null, 'Order Unit'));
			if(fields.length>0){
				validated = false;
				self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
			}			
		}
	} else {
		var fields = [];
			if (self.mbo.isRequired('LINETYPE') && String.isNullOrEmpty(self.LINETYPE))
				fields.push(getText('MRLINE.LINETYPE', null, 'Line Type'));
			if(fields.length>0){
				validated = false;
				self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
			}
		validated = false;
	}
	
	// Return true if the object is valid
	return validated;
};

/* On Change */
MRLines.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
		ITEMNUM : function(){
        	if(crossovers){
        		self.DESCRIPTION = crossovers.DESCRIPTION;
        	}
        	self.QTY = 1;
    		self.UNITCOST = 0;
        	return true;
        },
        LINETYPE : function(){
        	self.ITEMNUM = null;
    		self.DESCRIPTION = null;
    		self.QTY = 1;
    		self.UNITCOST = 0;
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;	
};
