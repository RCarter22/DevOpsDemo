// Class constructor
function WPMaterial (){
	// Class inheritance
    Mbo.apply(this, arguments);
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('WPITEMID');    
}

WPMaterial.prototype.createNew = function(obj){
	var now = new Date().valueOf();
	// Set Default Values
	this.ITEMQTY = 1.0;
	this.UNITCOST = 0.0;
	this.REQUIREDATE = now;
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
};

//Custom automation scripts for readonly fields
/* Is Read Only */
WPMaterial.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
    		LINETYPE: function() {
    			if (self.mbo.isNew())
    				return false;
    			else
    				return true;
    		},
    		ITEMNUM: function() {
				return self.LINETYPE == 'ITEM' ? false : true;
    		},
    		DESCRIPTION: function() {
				return self.LINETYPE == 'ITEM' ? true : false;
    		},
    		LOCATION: function() {
    			return self.LINETYPE == 'ITEM' ? false : true;
    		},
    		STORELOCSITE: function() {
    			return true;
    		},
    		RESTYPE: function() {
    			return self.LINETYPE == 'ITEM' ? false : true;
    		}
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Is Required */
WPMaterial.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
    		LINETYPE: function() {
				return true;			
    		},
    		ITEMNUM: function() {
				return self.LINETYPE == 'ITEM' ? true : false;			
    		},
    		DESCRIPTION: function() {
    			return self.LINETYPE == 'ITEM' ? false : true;
    		},
    		ITEMQTY: function() {
				return true;			
    		},
    		UNITCOST: function() {
    			return true;
    		},
    		LOCATION: function() {
    			return self.LINETYPE == 'ITEM' ? true : false;
    		},
    		STORELOCSITE: function() {
    			return self.LINETYPE == 'ITEM' ? true : false;
    		},
    		RESTYPE: function() {
    			return self.LINETYPE == 'ITEM' ? true : false;
    		},
    		REQUIREDATE: function() {
    			return self.LINETYPE == 'ITEM' ? true : false;
    		}
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Lookup Criteria */
WPMaterial.prototype.lookup = function(attr, options){
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
			if (self.LOCATION != null && self.LOCATION != "")
				where += " AND LOCATION='" + self.LOCATION + "'";
			
			var o = {
				display : "ITEMNUM,DESCRIPTION,LOCATION,SITEID",
				field : "ITEMNUM",
				source : "ITEMNUM",
				crossovers : "DESCRIPTION,LOCATION",
				searchFields : "ITEMNUM,DESCRIPTION,LOCATION",
				table : "INVBALANCES",
				where : where
			};
			$.extend(o, opt);    
			return new Domain(o);
		},
		LOCATION: function(opt){
			var where = "SITEID='" + self.SITEID + "' ";
			if (self.ITEMNUM != null && self.ITEMNUM != "")
				where += " AND LOCATION IN (SELECT LOCATION FROM INVBALANCES WHERE SITEID='" + self.SITEID + "' AND ITEMNUM='" + self.ITEMNUM + "')";
//			// if self.siteid != null, the where += "siteid= self.siteid
//			if (self.STORELOCSITE != null && self.STORELOCSITE != "")
//				where += " AND SITEID='" + self.STORELOCSITE + "'";
			var o = {
				display : "LOCATION,DESCRIPTION",
				field : "LOCATION",
				source : "LOCATION",
				table : "STOREROOM",
				searchFields : "LOCATION,DESCRIPTION",
				crossovers: "SITEID",
				where : where
			};
			$.extend(o, opt);    
			return new Domain(o);
		},
		STORELOCSITE: function(opt) {
			var where = "SITEID='" + self.SITEID + "' ";
			if (self.ITEMNUM != null && self.ITEMNUM != "")
				where += " AND LOCATION IN (SELECT LOCATION FROM INVBALANCES WHERE SITEID='" + self.SITEID + "' AND ITEMNUM='" + self.ITEMNUM + "')";
			
			var o = {
				display : "SITEID,LOCATION,DESCRIPTION",
				field : "STORELOCSITE",
				source : "SITEID",
				table : "STOREROOM",
				searchFields : "SITEID,LOCATION,DESCRIPTION",
				crossovers: "LOCATION",
				where : where,
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		RESTYPE: function(opt){
			var o = {
				field : "RESTYPE",
				source : "VALUE",
				table : "DOMAIN",
				searchFields : "VALUE",
				where : "DOMAINID = 'DISPLAYRESTYPE'"
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
WPMaterial.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
		LINETYPE : function() {
			if(self.LINETYPE == 'MATERIAL') {
				self.STORELOCSITE = '';
				self.LOCATION = '';
			}
			else {
				self.STORELOCSITE = self.SITEID;
			}
			return true;
		},
		ITEMNUM : function() {
			if(crossovers){
				self.DESCRIPTION = crossovers.DESCRIPTION;
				self.LOCATION = crossovers.LOCATION;
			}
			return true;
		},
        LOCATION : function(){
        	if(crossovers){
        		self.STORELOCSITE = crossovers.SITEID;
        	}
        	return true;
        },
        STORELOCSITE : function(){
        	if(crossovers){
        		self.LOCATION = crossovers.LOCATION;
        	}
        	return true;
        }
        
    };
    return attributes[attr] ? attributes[attr]() : false;	
};

/* Validate */
WPMaterial.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
		
	if(self.ITEMQTY) {
		if (!Number.isNumber(self.ITEMQTY)){
			validated = false;
			self.mbo.message(getText('EMMOF1004W', [getText('WPMATERIAL.ITEMQTY')], 'Quantity must be a number'));
			return validated;
		}
	}
	
	if(self.UNITCOST) {
		if (!Number.isNumber(self.UNITCOST)){
			validated = false;
			self.mbo.message(getText('EMMOF1004W', [getText('WPMATERIAL.UNITCOST')], 'Line cost must be a number'));
			return validated;
		}
	}
	
	var fields = [];
	if (self.mbo.isRequired('DESCRIPTION') && !self.DESCRIPTION)
		fields.push(getText('WPMATERIAL.DESCRIPTION', null, 'Description'));
	if (self.mbo.isRequired('ITEMQTY') && Number.getNumber(self.ITEMQTY) == null)
		fields.push(getText('WPMATERIAL.ITEMQTY', null, 'Quantity'));
	if (self.mbo.isRequired('UNITCOST') && Number.getNumber(self.UNITCOST) == null)
		fields.push(getText('WPMTAERIAL.UNITCOST', null, 'Unit Cost'));
	if (self.mbo.isRequired('LOCATION') && !self.LOCATION)
		fields.push(getText('WPMATERIAL.LOCATION', null, 'Storeroom'));
	if (self.mbo.isRequired('STORELOCSITE') && !self.STORELOCSITE)
		fields.push(getText('WPMATERIAL.STORELOCSITE', null, 'Storeroom Site'));
//	if (self.mbo.isRequired('RESTYPE') && !self.RESTYPE)
//		fields.push(getText('WPMATERIAL.RESTYPE', null, 'Reservation Type'));
	if (self.mbo.isRequired('ITEMNUM') && !self.ITEMNUM)
		fields.push(getText('WPMATERIAL.ITEMNUM', null, 'Item'));
	if (self.mbo.isRequired('LINETYPE') && !self.LINETYPE)
		fields.push(getText('WPMATERIAL.LINETYPE', null, 'Line Type'));
	if (self.mbo.isRequired('REQUIREDATE') && !self.REQUIREDATE)
		fields.push(getText('WPMATERIAL.REQUIREDATE', null, 'Required Date'));
	
	if(fields.length>0){	
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
	}	
	
	// Return true if the object is valid
	return validated;
};