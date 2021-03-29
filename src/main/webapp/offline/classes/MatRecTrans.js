// Class constructor
function MatRecTrans (){
	// Class inheritance
    Mbo.apply(this, arguments);
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('MATRECTRANSID');
    
    this.QUANTITY = Math.abs(Number.getNumber(this.QUANTITY)).toString();
	this.mbo.extend({
		_frombinData : null,
		_tobinData : null
	});
}

MatRecTrans.prototype.createNew = function(obj){
	// Set Default Values
	this.LINETYPE = 'ITEM';
	this.ISSUETYPE = 'TRANSFER';
	this.TRANSDATE = new Date();
	this.QUANTITY = 1;
	this.CONVERSION = 1;
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
}

//Custom automation scripts for readonly fields
/* Is Read Only */
MatRecTrans.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
        LINETYPE: function(){
        	if (!self.mbo.isNew())
        		return true;
        	else
        		return false;
        },
        ITEMNUM: function(){
        	if (!self.mbo.isNew())
        		return true;
        	else
        		return false;
        },
        TOSTORELOC: function(){
        	if (self.mbo.isNew()) {
        		if(self.TRANSFERINOUT == "OUT" && self.NEWSITE!=null && self.NEWSITE!="")
        			return false;
        		else
        			return true;
        	}
        	else
        		return true;
        },
        FROMSTORELOC: function(){
        	if (self.mbo.isNew()){
        		if(self.TRANSFERINOUT == "IN" && self.FROMSITEID!=null && self.FROMSITEID!="")
        			return false;
        		else
        			return true;
        	}
        	else
        		return true;
        },
        QUANTITY: function(){
        	if (self.mbo.isNew()) {
        		if(self.mbo._frombinData && self.mbo._frombinData.ROTATING == "1")
        			return true;
        		else
        			return false;
        	} else
        		return true;
        },
        FROMBIN: function(){
        	if (self.mbo.isNew())
        		return false;
        	else
        		return true;
        },
        TOBIN: function(){
        	if (self.mbo.isNew())
        		return false;
        	else
        		return true;
        },
        CONVERSION: function(){
        	if (self.mbo.isNew()) {
        		if(self.mbo._frombinData && self.mbo._frombinData.ROTATING == "1")
        			return true;
        		else
        			return false;
        	} else
        		return true;
        },
        FROMSITEID: function(){
        	if (self.mbo.isNew())
        		return false;
        	else
        		return true;
        },
        NEWSITE: function(){
        	if (self.mbo.isNew())
        		return false;
        	else
        		return true;
        },
        ROTASSETNUM: function(){
        	if (self.mbo.isNew()) {
        		if(self.mbo._frombinData && self.mbo._frombinData.ROTATING == "1")
        			return false;
        		return true;
        	} else
        		return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Is Required */
MatRecTrans.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
        LINETYPE: function(){
        	return true;
        },
        ITEMNUM: function(){
        	return true;
        },
        DESCRIPTION: function(){
        	return self.LINETYPE == 'ITEM' ? false : true;
        },        
        STORELOC: function(){
        	return self.LINETYPE == 'ITEM' ? true : false;
        },
        TOSTORELOC: function(){
        	return true;
        },
        FROMSTORELOC: function(){
        	return true;
        },
        QUANTITY : function(){
        	return true;
        },
        NEWSITE : function(){
        	return true;
        },
        FROMSITEID : function(){
        	return true;
        },
        FROMSITEID : function(){
        	if (self.TRANSFERINOUT == "OUT")
        		return false;
        	return true;
        },
        ROTASSETNUM: function(){
        	if (self.mbo._frombinData && self.mbo._frombinData.ROTATING == "1")
    			return true;
    		return false;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Lookup Criteria */
MatRecTrans.prototype.lookup = function(attr, options){
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
				domain.addCustomItem(["TOOL", "TOOL"], ["LINETYPE", "DESCRIPTION"]);
				return domain;
			},
			ITEMNUM: function(opt){
				if (self.ISSUETYPE == 'TRANSFER') {
					var where = "SITEID='" + self.SITEID + "' AND ITEMTYPE='" + self.LINETYPE + "'";
					if (self.FROMSTORELOC) {
						where += " AND LOCATION='" + self.FROMSTORELOC + "'";
					}

					var o = {
						field : "ITEMNUM",
						source : "ITEMNUM",
						crossovers : "INVBALANCESID, DESCRIPTION, LOCATION, BINNUM, ROTATING, CURBAL",
						searchFields : "ITEMNUM,DESCRIPTION,LOCATION",
						table : "INVBALANCES",
						where : where				
					};
					
					$.extend(o, opt);   
					return new Domain(o);
				}
			},
			FROMSTORELOC: function(opt){
				if(self.ITEMNUM){
					var where = "SITEID = '" + self.FROMSITEID + "' AND ITEMTYPE = '" 
								+ self.LINETYPE + "' AND ITEMNUM = '" + self.ITEMNUM + "'";
		
					var o = {
						field : "FROMSTORELOC",
						source : "LOCATION",
						crossovers : "INVBALANCESID,BINNUM,CURBAL",
						searchFields : "LOCATION",
						table : "INVBALANCES",
						where : where
					};
				}
				else{
					var o = {
						display : "LOCATION,DESCRIPTION",
						field : "FROMSTORELOC",
						source : "LOCATION",
						crossovers : "SITEID",
						table : "STOREROOM",
						searchFields : "LOCATION,DESCRIPTION",
						where : "SITEID = '" + self.FROMSITEID + "'"
					};
				}
				
				$.extend(o, opt);    
				return new Domain(o);
			},
			TOSTORELOC: function(opt){
				var where = "1=1";
				if (self.NEWSITE) {
					where = "SITEID = '" + self.NEWSITE + "'";
				}
				
				var o = {
					display : "LOCATION,DESCRIPTION",
					field : "TOSTORELOC",
					source : "LOCATION",
					crossovers : "SITEID",
					table : "STOREROOM",
					searchFields : "LOCATION,DESCRIPTION",
					where : where
					};

				$.extend(o, opt);    
				return new Domain(o);
			},
			FROMBIN: function(opt){
				var where = "ITEMTYPE = '" + self.LINETYPE + "' AND SITEID='" + self.SITEID + "' AND ITEMNUM='" + self.ITEMNUM + 
							"' AND LOCATION='" + self.FROMSTORELOC + "'";
				
				var o = {
					field : "FROMBIN",
					source : "BINNUM",
					crossovers : "INVBALANCESID, CURBAL",
					searchFields : "BINNUM",
					table : "INVBALANCES",
					where : where
				};
				
				$.extend(o, opt);
				return new Domain(o);
			},
			TOBIN: function(opt){
				var where = "ITEMTYPE = '" + self.LINETYPE + "' AND SITEID='" + self.SITEID + "' AND ITEMNUM='" + self.ITEMNUM + 
							"' AND LOCATION='" + self.TOSTORELOC + "'";
				
				var o = {
					field : "TOBIN",
					source : "BINNUM",
					crossovers : "INVBALANCESID, CURBAL",
					searchFields : "BINNUM",
					table : "INVBALANCES",
					where : where
				};
				
				$.extend(o, opt);
				return new Domain(o);
			},
			NEWSITE : function(opt){
				var o = {
					display : "SITEID,DESCRIPTION",
					field : "NEWSITE",
					source : "SITEID",
					table : "SITE",
					searchFields : "SITEID,DESCRIPTION"
				};
				$.extend(o, opt);    
				return new Domain(o);
			},
			FROMSITEID : function(opt){
				var o = {
					display : "SITEID,DESCRIPTION",
					field : "FROMSITEID",
					source : "SITEID",
					table : "SITE",
					searchFields : "SITEID,DESCRIPTION"
				};
				$.extend(o, opt);    
				return new Domain(o);
			},
			ROTASSETNUM : function(opt){
				var where = "ITEMNUM ='" + self.ITEMNUM + "' AND SITEID='" + self.SITEID + "'";
				if (self.FROMSTORELOC) 
					where += " AND LOCATION = '" + self.FROMSTORELOC + "'";
				var o = {
					display : "ASSETNUM,DESCRIPTION",
					field : "ROTASSETNUM",
					source : "ASSETNUM",
					table : "ASSET",
					searchFields : "ASSETNUM,DESCRIPTION",
					where : where

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
MatRecTrans.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	var fields = [];
	if (self.mbo.isRequired('LINETYPE') && !self.LINETYPE)
		fields.push(getText('MATRECTRANS.LINETYPE', null, 'Line Type'));
	if (self.mbo.isRequired('ITEMNUM') && !self.ITEMNUM)
		fields.push(getText('MATRECTRANS.ITEMNUM', null, 'Item'));
	if (self.mbo.isRequired('FROMSTORELOC') && !self.FROMSTORELOC)
		fields.push(getText('MATRECTRANS.FROMSTORELOC', null, 'From Storeroom'));
	if (self.mbo.isRequired('TOSTORELOC') && !self.TOSTORELOC)
		fields.push(getText('MATRECTRANS.TOSTORELOC', null, 'To Storeroom'));
	if (self.mbo.isRequired('QUANTITY') && !self.QUANTITY)
		fields.push(getText('MATRECTRANS.QUANTITY', null, 'Quantity'));
	if (self.mbo.isRequired('NEWSITE') && !self.NEWSITE)
		fields.push(getText('MATRECTRANS.NEWSITE', null, 'To Site'));
	if (self.mbo.isRequired('FROMSITEID') && !self.FROMSITEID)
		fields.push(getText('MATRECTRANS.FROMSITEID', null, 'From Site'));
	if (self.mbo.isRequired('ROTASSETNUM') && !self.ROTASSETNUM)
		fields.push(getText('MATRECTRANS.ROTASSETNUM', null, 'Rotating Asset'));
	
	if(fields.length>0){
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
		return validated;
	}

	if (!Number.isNumber(self.QUANTITY)){
		validated = false;
		self.mbo.message(getText('EMMOF1004W', [getText('MATRECTRANS.QUANTITY')], 'Quantity must be a number'));
		return validated;
	} else if (self.QUANTITY<=0){
		validated = false;
		self.mbo.message(getText('EMMOF1009W', [getText('MATRECTRANS.QUANTITY')], 'Please specify a quantity greater than zero'));
		return validated;
	}
	
	if(self.FROMSTORELOC == self.TOSTORELOC && self.TOBIN == self.FROMBIN){
		validated = false;
		self.mbo.message(getText('EMMOF1014W', [getText('MATRECTRANS.QUANTITY')], 'Cannot transfer when locations, binnums and siteids are all identical'));
		return validated;
	}
		
	// Return true if the object is valid
	return validated;
};


/* On Change */
MatRecTrans.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
    	LINETYPE: function(){
    		self.ITEMNUM = null;
    		self.DESCRIPTION = null;
    		self.QUANTITY = 1;
    		self.CONVERSION = 1;
    		self.TOBIN = null;
    		self.FROMBIN = null;
    		self.ROTASSETNUM = null;
    		self.mbo._tobinData = null;
			self.mbo._frombinData = null;
        	return true;
        },
    	ITEMNUM: function() {
    		if (crossovers) {
    			self.DESCRIPTION = crossovers.DESCRIPTION;
    			self.FROMSTORELOC = crossovers.LOCATION;
				self.FROMBIN = crossovers.BINNUM;
				self.mbo._frombinData = {
					INVBALANCESID : crossovers.INVBALANCESID,
					CURBAL : crossovers.CURBAL,
					ROTATING : crossovers.ROTATING
				}
				if (crossovers.ROTATING == '1') {
					self.QUANTITY = 1;
					self.CONVERSION = 1;
				}
    		} else {
    			self.DESCRIPTION = null;
    			self.FROMSTORELOC = null;
				self.FROMBIN = null;
				self.mbo._frombinData = null;
    		}
    		
    		self.mbo._tobinData = null;
			self.TOBIN = null;
    		self.ROTASSETNUM = null;
    		
        	return true;
        },
        FROMBIN: function(){
    		if (crossovers) {
    			self.mbo._frombinData = {
					INVBALANCESID : crossovers.INVBALANCESID,
					CURBAL : crossovers.CURBAL
    			}
    		} else {
    			self.mbo._frombinData = null;
    		}
    			
        	return true;
        },
        TOBIN: function(){
    		if (crossovers) {
    			self.mbo._tobinData = {
					INVBALANCESID : crossovers.INVBALANCESID,
					CURBAL : crossovers.CURBAL
    			}
    		} else {
    			self.mbo._tobinData = null;
    		}
        	return true;
        },
        FROMSTORELOC : function(){
        	if(crossovers){
        		self.FROMBIN = crossovers.BINNUM;
        		self.mbo._frombinData = {
					INVBALANCESID : crossovers.INVBALANCESID,
					CURBAL : crossovers.CURBAL
    			}
        	}else {
        		self.FROMBIN = null;
        		self.mbo._frombinData = null;
        	}
        	return true;
        },
        TOSTORELOC : function(){
    		self.TOBIN = null;
    		self.mbo._tobinData = null;
        		
        	return true;
        },
        NEWSITE : function(){
        	self.TOSTORELOC = null;
        	self.TOBIN = null;
        	self.mbo._tobinData = null;
        	return true;
        },
        FROMSITEID : function(){
        	self.FROMSTORELOC = null;
        	self.FROMBIN = null;
        	self.mbo._frombinData = null;
        	return true;
        }

    }
    return attributes[attr] ? attributes[attr]() : false;	
};


MatRecTrans.prototype.setValue = function(obj){
    var self = this;
    self.session.cache();

	if (self.mbo._frombinData && self.QUANTITY) {
		if( (+self.QUANTITY)>self.mbo._frombinData.CURBAL){
			throw new EMMInputException(obj, getText('EMMOF1013W'), EMMConstants.WARNING);			
		} 
	}
}	