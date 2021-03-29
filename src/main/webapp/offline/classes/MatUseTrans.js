// Class constructor
function MatUseTrans (){
	// Class inheritance
    Mbo.apply(this, arguments);
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('MATUSETRANSID');
    
    this.QUANTITY = Math.abs(Number.getNumber(this.QUANTITY)).toString();
	this.mbo.extend({
		//extend object to store the inventory balance data
		_invData : null,
		_isInvIssue : false
	});
}

MatUseTrans.prototype.createNew = function(obj){
	// Set Default Values
	this.LINETYPE = 'MATERIAL';
	this.ISSUETYPE = 'ISSUE';
	this.TRANSDATE = new Date();
	this.QUANTITY = 1;
	this.UNITCOST = 0;
	this.STORELOC = EMMServer.DB.getUserInfo().extFields.DEFSTOREROOM;
	

	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
	
}

//Custom automation scripts for readonly fields
/* Is Read Only */
MatUseTrans.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
        LINETYPE: function(){
        	if (!self.mbo.isNew())
        		return true;
        	else
        		return false;
        },
        ITEMNUM: function(){
        	if (self.mbo.isNew())
        		return self.LINETYPE == 'MATERIAL' ? true : false;
        	else
        		return true;
        },
        DESCRIPTION: function(){
        	if (self.mbo.isNew())        	
        		return self.LINETYPE == 'MATERIAL' ? false : true;
        	else
        		return true;
        },        
        STORELOC: function(){
        	if (self.mbo.isNew())
        		return self.LINETYPE == 'MATERIAL' ? true : false;
        	else
        		return true;
        },
        BINNUM: function(){
        	if (self.mbo.isNew())
        	{
        		if(self.ITEMNUM == null || self.ITEMNUM == "")
        			return true;
        		else
        			return false;
        	}else
        		return true;
        },
        QUANTITY: function(){
        	if (self.mbo.isNew()) {
        		if(self.mbo._invData && self.mbo._invData.ROTATING == "1")
        			return true;
        		else 
        			return false;
        	}else
        		return true;
        },
        UNITCOST: function(){
        	if (self.mbo.isNew())
        		return self.LINETYPE == 'MATERIAL' ? false : true;
        	else
        		return true;
        },
        WONUM: function(){
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
        ISSUETO: function(){
        	if (self.mbo.isNew())
        		return false;
        	else
        		return true;
        },
        ASSETNUM: function(){
        	if (self.mbo.isNew())
        		return false;
        	else
        		return true;
        },
        ISSUETYPE: function(){
        	if (self.mbo.isNew())
        		return false;
        	else
        		return true;
        },
        SITEID: function(){
        	return true;
        },
        ROTASSETNUM: function(){
        	if (self.mbo.isNew()) {
        		if(self.mbo._invData && self.mbo._invData.ROTATING == "1")
        			return false;
        		else 
        			return true;
        	} else
        		return true;
        }
        
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Is Required */
MatUseTrans.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
        LINETYPE: function(){
        	return true;
        },
        ITEMNUM: function(){
        	return self.LINETYPE == 'MATERIAL' ? false : true;
        },
        DESCRIPTION: function(){
        	return self.LINETYPE == 'MATERIAL' ? true : false;
        },        
        STORELOC: function(){
        	return self.LINETYPE == 'MATERIAL' ? false : true;
        },
        QUANTITY : function(){
        	return true;
        },
        UNITCOST: function(){
        	return self.LINETYPE == 'MATERIAL' ? true : false;
        },
        ROTASSETNUM: function(){
        	if (self.mbo._invData && self.mbo._invData.ROTATING == "1")
    			return true;
    		return false;
        },
        ISSUETO: function () {
        	return self.LINETYPE == 'TOOL' ? true : false;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Lookup Criteria */
MatUseTrans.prototype.lookup = function(attr, options){
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
				if (self.mbo._isInvIssue == false)
					domain.addCustomItem(["MATERIAL", getText('MATUSETRANS.DESCRIPTION', null, "Material")], ["LINETYPE", "DESCRIPTION"]);
				else
					domain.addCustomItem(["TOOL", getText('MATUSETRANS.DESCRIPTION', null, "Tool")], ["LINETYPE", "DESCRIPTION"]);
				return domain;
			},
			ITEMNUM: function(opt){
				var where = "SITEID='" + self.SITEID + "' AND ITEMTYPE='" + self.LINETYPE + "'";
				
				if (self.STORELOC!=null && self.STORELOC != "") {
					where += " AND LOCATION='" + self.STORELOC + "'";
				}

				var o = {
					field : "ITEMNUM",
					source : "ITEMNUM",
					crossovers : "INVBALANCESID,DESCRIPTION,LOCATION,BINNUM,ROTATING,CURBAL",
					searchFields : "ITEMNUM,DESCRIPTION,LOCATION",
					table : "INVBALANCES",
					where : where				
				};
				
				$.extend(o, opt);    
				return new Domain(o);
			},
			STORELOC: function(opt){
				if(self.ITEMNUM){
					var where = "SITEID = '" + self.SITEID + "' AND ITEMTYPE = '" 
								+ self.LINETYPE + "' AND ITEMNUM = '" + self.ITEMNUM + "'";

					var o = {
						field : "STORELOC",
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
						field : "STORELOC",
						source : "LOCATION",
						table : "STOREROOM",
						searchFields : "LOCATION,DESCRIPTION",
						where : "SITEID = '" + self.SITEID + "'"
					};
				}
				
				$.extend(o, opt);    
				return new Domain(o);
			},
			TASKID : function(opt){
				var where = "ISTASK='1' AND STATUS NOT IN ('CAN') AND WORKORDERID = '" + self.WORKORDERID + "'";

				var o = {
					field : "TASKID",
					source : "TASKID",
					table : "WORKORDER",
					display : "TASKID,DESCRIPTION,SITEID",
					searchFields : "TASKID",
					where:where
				}; 
				$.extend(o, opt);
				return new Domain(o);
			},
			BINNUM: function(opt){
				var where = "ITEMTYPE = '" + self.LINETYPE + "' AND SITEID='" + self.SITEID + "' AND ITEMNUM='" + self.ITEMNUM + "'";
				if (self.STORELOC != null && self.STORELOC != "")
					where += " AND LOCATION='" + self.STORELOC + "'";
				
				var o = {
					field : "BINNUM",
					source : "BINNUM",
					crossovers : "INVBALANCESID, CURBAL",
					searchFields : "BINNUM",
					table : "INVBALANCES",
					where : where
				};
				
				$.extend(o, opt);
				return new Domain(o);
			},
			ISSUETYPE: function(opt){
				var o = {
					display : "ISSUETYPE,DESCRIPTION",
					field : "ISSUETYPE",
					source : "ISSUETYPE",
					table : "ISSUETYPE"
				};
				$.extend(o, opt);             
				var domain = new Domain(o);
				domain.addCustomItem(["ISSUE", "ISSUE"], ["ISSUETYPE", "DESCRIPTION"]);
				domain.addCustomItem(["RETURN", "RETURN"], ["ISSUETYPE", "DESCRIPTION"]);
				return domain;
			},
			ISSUETO: function(opt){
				var where = "1=1";
				var o = {
					field : "ISSUETO",
					source : "PERSONID",
					table : "PERSON",
					searchFields : "PERSONID,FIRSTNAME,LASTNAME",
					orderby: null
				};
				o.where = where;
				$.extend(o, opt);
				return new Domain(o);
			},
			LOCATION: function(opt){
				var where = "SITEID = '" + self.SITEID + "'";
				var o = {
					display : "LOCATION,DESCRIPTION,SYSTEMID",
					field : "LOCATION",
					source : "LOCATION",
					table: "LOCATIONS",
					searchFields : "LOCATION,DESCRIPTION",
					where: where
				};

				$.extend(o, opt);
				return new Domain(o);
			},
			ASSETNUM: function(opt){
				var where = "SITEID = '" + self.SITEID + "'";
				var o = {
					display: "ASSETNUM,DESCRIPTION,LOCATION",
					field: "ASSETNUM",
					source: "ASSETNUM",
					crossovers : "LOCATION",
					searchFields : "ASSETNUM,DESCRIPTION,LOCATION",
					table: "ASSET",
					where : where
				};

				$.extend(o, opt);
				return new Domain(o);
			},
			WONUM: function(opt){
				var where = "ISTASK='0' AND STATUS NOT IN ('WAPPR') AND SITEID = '" + self.SITEID + "'";
				var o = {
					display: "WONUM,DESCRIPTION,ASSETNUM,LOCATION",
					field: "WONUM",
					source: "WONUM",
					crossovers : "LOCATION,ASSETNUM,WORKORDERID",
					searchFields : "WONUM,DESCRIPTION,ASSETNUM,LOCATION",
					table: "WORKORDER",
					where : where
				};

				$.extend(o, opt);
				return new Domain(o);
			},
			ROTASSETNUM : function(opt){
				var where = "ITEMNUM ='" + self.ITEMNUM + "' AND SITEID='" + self.SITEID + "'";
				if (self.STORELOC) 
					where += " AND LOCATION = '" + self.STORELOC + "'";
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
MatUseTrans.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	var fields = [];
	if (self.mbo.isRequired('LINETYPE') && !self.LINETYPE)
		fields.push(getText('MATUSETRANS.LINETYPE', null, 'Line Type'));
	if (self.mbo.isRequired('ITEMNUM') && !self.ITEMNUM)
		fields.push(getText('MATUSETRANS.ITEMNUM', null, 'Item'));
	if (self.mbo.isRequired('STORELOC') && !self.STORELOC)
		fields.push(getText('MATUSETRANS.STORELOC', null, 'Storeroom'));
	if (self.mbo.isRequired('QUANTITY') && !self.QUANTITY)
		fields.push(getText('MATUSETRANS.QUANTITY', null, 'Quantity'));		
	if (self.mbo.isRequired('ROTASSETNUM') && !self.ROTASSETNUM)
		fields.push(getText('MATUSETRANS.ROTASSETNUM', null, 'Rotating Asset'));
	if (self.mbo.isRequired('ISSUETO') && !self.ISSUETO)
		fields.push(getText('MATUSETRANS.ISSUETO', null, 'Issued To'));
	if (self.mbo.isRequired('DESCRIPTION') && !self.DESCRIPTION)
		fields.push(getText('MATUSETRANS.DESCRIPTION', null, 'Description'));
	if (self.mbo.isRequired('UNITCOST') && !self.UNITCOST)
		fields.push(getText('MATUSETRANS.UNITCOST', null, 'Unit Cost'));		
	
	if(fields.length>0){
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
		return validated;
	}
	
	if (!Number.isNumber(self.QUANTITY)){
		validated = false;
		self.mbo.message(getText('EMMOF1004W', [getText('MATUSETRANS.QUANTITY')], 'Quantity must be a number'));
		return validated;
	} else if (self.QUANTITY<=0){
		validated = false;
		self.mbo.message(getText('EMMOF1009W', [getText('MATUSETRANS.QUANTITY')], 'Please specify a quantity greater than zero'));
		return validated;
	}
	
	if (self.LINETYPE) {
		if (self.LINETYPE == 'ITEM' || self.LINETYPE == 'TOOL'){			
			if (self.LINETYPE == 'ITEM' && (!self.WONUM || self.WONUM === '') && (!self.LOCATION || self.LOCATION === '') && (!self.ASSETNUM || self.ASSETNUM === '')) {
				validated = false;
				self.mbo.message(getText('EMMOF1005W', [getText('MATUSETRANS.WORKORDER') + ', ' + getText('MATUSETRANS.ASSET') + ', or ' + getText('MATUSETRANS.LOCATION')], 'Missing required fields: Work order, Asset, or Location'));
				return validated;
			}
			
		} else if (self.LINETYPE == 'MATERIAL'){
			if (!Number.isNumber(self.UNITCOST)){
				validated = false;
				self.mbo.message(getText('EMMOF1004W', [getText('MATUSETRANS.UNITCOST')], 'Unit cost must be a number'));
				return validated;
			}			
		}
	}
	
	// Return true if the object is valid
	return validated;
};

/* On Change */
MatUseTrans.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
    	LINETYPE: function(){
    		self.ITEMNUM = null;
    		self.DESCRIPTION = null;
    		self.BINNUM = null;
    		self.QUANTITY = 1;
    		self.UNITCOST = 0;
    		self.mbo._invData = null;
        	return true;
        },
    	ITEMNUM: function(){
    		if (crossovers) {
    			self.DESCRIPTION = crossovers.DESCRIPTION;
    			self.STORELOC = crossovers.LOCATION;
    			self.BINNUM = crossovers.BINNUM;
    			self.mbo._invData = {
        			INVBALANCESID : crossovers.INVBALANCESID,
        			CURBAL : crossovers.CURBAL,
        			ROTATING : crossovers.ROTATING
            	}
    			
    			if (crossovers.ROTATING == '1')
    				self.QUANTITY = 1;
    		}else {
    			self.DESCRIPTION =  null;
    			self.STORELOC =  null;
    			self.BINNUM = null;
    			self.mbo._invData = null;
    		}
			
    		self.ROTASSETNUM = null;
        	return true;
        },
        STORELOC : function(){
        	self.mbo._invData = null;
        	self.BINNUM = null;
        	if (crossovers) {
    			self.BINNUM = crossovers.BINNUM;
    			self.mbo._invData = {
    				INVBALANCESID : crossovers.INVBALANCESID,
    				CURBAL : crossovers.CURBAL
        		}
			}		
        	return true;
        },
    	BINNUM: function(){
    		self.mbo._invData = null;
    		if (crossovers) {
    			self.mbo._invData = {
        			INVBALANCESID : crossovers.INVBALANCESID,
        			CURBAL : crossovers.CURBAL
            	} 
			}
    		return true;
    	},
        ASSETNUM : function(){
        	if(crossovers){
        		self.LOCATION = crossovers.LOCATION;
        	}
        	return true;
        },
        WONUM : function(){
        	if(crossovers){
        		self.LOCATION = crossovers.LOCATION;
        		self.ASSETNUM = crossovers.ASSETNUM;
        		self.WORKORDERID = crossovers.WORKORDERID;
        	}
        	return true;
        }
    }
    return attributes[attr] ? attributes[attr]() : false;	
}

MatUseTrans.prototype.setValue = function(obj){
    var self = this;
    self.session.cache();

    if (self.ISSUETYPE=='ISSUE' && self.mbo._invData) {
		if( (+self.QUANTITY)>self.mbo._invData.CURBAL){
			throw new EMMInputException(obj, getText('EMMOF1013W'), EMMConstants.WARNING);		
		} 
	}
}