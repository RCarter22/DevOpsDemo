// Class constructor
function LabTrans (){
	// Class inheritance
    Mbo.apply(this, arguments);
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('LABTRANSID');    
}

LabTrans.prototype.createNew = function(obj){
	if((obj && (!obj.ISADVANCED || obj.ISADVANCED != '1')) || !obj){
/*		var d = new Date();
		d.setHours(0,0,0,0);
		this.STARTDATE = d;
*/		
		this.STARTDATE = new Date();
		this.REGULARHRS = 0;
		this.TRANSTYPE = 'WORK';
	}
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
};

//Custom automation scripts for readonly fields
/* Is Read Only */
LabTrans.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
    	LABORCODE: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	GENAPPRSERVRECEIPT:function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	CRAFT: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	LOCATION: function(){
    		if (self.mbo.isNew()) {
	        	if ($.inArray(self.TRANSTYPE, ['TRAV', 'WMATL', 'WORK']) > -1 || (self.ISADVANCED && self.ISADVANCED == '1'))
	        		return false;
    		}
    		return true;
    	},
    	ASSETNUM: function(){
    		if (self.mbo.isNew()) {
	        	if ($.inArray(self.TRANSTYPE, ['TRAV', 'WMATL', 'WORK']) > -1 || (self.ISADVANCED && self.ISADVANCED == '1'))
	        		return false;
    		}
    		return true;
    	},
    	WONUM: function(){
    		if (self.mbo.isNew()) {
	        	if ($.inArray(self.TRANSTYPE, ['TRAV', 'WMATL', 'WORK']) > -1 || (self.ISADVANCED && self.ISADVANCED == '1'))
	        		return false;
    		}
    		return true;
    	},
    	TICKETID: function(){
    		if (self.mbo.isNew()) {
	        	if ($.inArray(self.TRANSTYPE, ['TRAV', 'WMATL', 'WORK']) > -1)
	        		return false;
    		}
    		return true;
    	},
    	TICKETCLASS: function(){
    		return true;
    	},
    	TRANSTYPE: function(){
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
    	STARTTIME: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	PAYRATE: function(){
			return true;    		
    	},
    	TIMERSTATUS: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;    		
    	},
    	REGULARHRS: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;
    	},
    	PREMIUMPAYCODE: function(){
    		if (self.mbo.isNew())
    			return false;
    		else
    			return true;
    	}, 
    	PREMIUMPAYRATE: function(){
			return true;
    	},
		PREMIUMPAYHOURS: function(){
			if (self.mbo.isNew()){
				if (!self.PREMIUMPAYCODE)
					return true;
				else
					return false;
			} else {
				return true;
			}
		}
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Is Required */
LabTrans.prototype.isRequired = function(attr){
    var self = this;
   
    var attributes = {
        LABORCODE: function(){
        	return true;
        },
        CRAFT: function(){
        	return true;
        },
        TRANSTYPE: function(){
        	return true;
		},
		TASKID: function(){
        	if (self.TIMERSTATUS === 'COMPLETE')
        		return true;
        	else
        		return false;
        },
        STARTDATE: function(){
        	if (!self.TIMERSTATUS)
        		return true;
        	else
        		return false;
        },
        REGULARHRS: function(){
        	if (!self.TIMERSTATUS)
        		return true;
        	else
        		return false;
        },
        TICKETCLASS: function(){
        	if (self.TICKETID)
        		return true;
        	else
        		return false;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Lookup Criteria */
LabTrans.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		LABORCODE: function(opt){
			var o = {};
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1') {
				var where = "ORGID='" + self.ORGID + "' AND STATUS='ACTIVE'";
				
				o = {
						display : "LABORCODE,DISPLAYNAME",
						field : "LABORCODE",
						source : "LABORCODE",
						table : "LABOR",
						searchFields : "LABORCODE",
						where : where,
						orderby : null
					};
			} else {
				var where = "ORGID='" + self.ORGID + "' AND LABORCODE IN (SELECT LABORCODE FROM LABOR WHERE STATUS='ACTIVE' AND ORGID='" + self.ORGID + "')";
				if (String.isNullOrEmpty(self.ORGID))
					where = "LABORCODE IN (SELECT LABORCODE FROM LABOR WHERE STATUS='ACTIVE')";
				if (!String.isNullOrEmpty(self.LABORCODE))
					where += " AND LABORCODE = '" + self.LABORCODE + "'"; 
				if (!String.isNullOrEmpty(self.CRAFT))
					where += " AND CRAFT = '" + self.CRAFT + "'"; 
				if (!String.isNullOrEmpty(self.SKILLLEVEL))
					where += " AND SKILLLEVEL = '" + self.SKILLLEVEL + "'"; 

				o = {
						display : "LABORCODE,CRAFT,SKILLLEVEL",
						field : "LABORCODE",
						source : "LABORCODE",
						table : "LABORCRAFTRATE",
						searchFields : "LABORCODE,CRAFT,SKILLLEVEL",
						crossovers: "CRAFT,SKILLLEVEL,RATE",
						where : where,
						orderby : null
					};
			}
		
			$.extend(o, opt);
			return new Domain(o);
		},
		CRAFT: function(opt){
			var o = {};
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1') {
				o = {
						display : "CRAFT,DESCRIPTION",
						field : "CRAFT",
						source : "CRAFT",
						table : "CRAFT",
						searchFields : "CRAFT,DESCRIPTION",
						where : "ORGID = '" + self.ORGID + "'",
						orderby : null
					};
			} else {
				var where = "ORGID='" + self.ORGID + "' AND LABORCODE IN (SELECT LABORCODE FROM LABOR WHERE STATUS='ACTIVE' AND ORGID='" + self.ORGID + "')";
				if (!String.isNullOrEmpty(self.LABORCODE))
					where += " AND LABORCODE = '" + self.LABORCODE + "'"; 
				if (!String.isNullOrEmpty(self.CRAFT))
					where += " AND CRAFT = '" + self.CRAFT + "'"; 
				if (!String.isNullOrEmpty(self.SKILLLEVEL))
					where += " AND SKILLLEVEL = '" + self.SKILLLEVEL + "'"; 

				o = {
						display : "CRAFT,LABORCODE,SKILLLEVEL",
						field : "CRAFT",
						source : "CRAFT",
						table : "LABORCRAFTRATE",
						searchFields : "LABORCODE,CRAFT,SKILLLEVEL",
						crossovers: "LABORCODE,SKILLLEVEL,RATE",
						where : where,
						orderby : null
					};
			}
			
			$.extend(o, opt);
			return new Domain(o);
		},
		SKILLLEVEL: function(opt){
			var o = {};
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1') {
				o = {
						display : "VALUE, DESCRIPTION",
						field : "SKILLLEVEL",
						source : "VALUE",
						table : "DOMAIN",
						searchFields : "VALUE,DESCRIPTION",
						where : "DOMAINID = 'SKILLLEVEL'",
						orderby : null
					};
			} else {
				var where = "ORGID='" + self.ORGID + "' AND LABORCODE IN (SELECT LABORCODE FROM LABOR WHERE STATUS='ACTIVE' AND ORGID='" + self.ORGID + "')";
				if (!String.isNullOrEmpty(self.LABORCODE))
					where += " AND LABORCODE = '" + self.LABORCODE + "'"; 
				if (!String.isNullOrEmpty(self.CRAFT))
					where += " AND CRAFT = '" + self.CRAFT + "'"; 
				if (!String.isNullOrEmpty(self.SKILLLEVEL))
					where += " AND SKILLLEVEL = '" + self.SKILLLEVEL + "'"; 
			
				o = {
						display : "SKILLLEVEL,LABORCODE,CRAFT",
						field : "SKILLLEVEL",
						source : "SKILLLEVEL",
						table : "LABORCRAFTRATE",
						searchFields : "LABORCODE,CRAFT,SKILLLEVEL",
						crossovers: "LABORCODE,CRAFT,RATE",
						where : where,
						orderby : null
					};
			}
			
			$.extend(o, opt);
			return new Domain(o);
		},
		PREMIUMPAYCODE: function(opt){
			var o = {
				display : "PREMIUMPAYCODE,CRAFT",
				field : "PREMIUMPAYCODE",
				source : "PREMIUMPAYCODE",
				table : "PPCRAFTRATE",
				where : "CRAFT = '" + self.CRAFT + "' AND ORGID = '" + self.ORGID + "'",
				crossovers : "DEFAULTRATE",
				orderby : null
			};

			$.extend(o, opt);
			return new Domain(o);
		},
		TRANSTYPE: function(opt){
			var where = "DOMAINID = 'LTTYPE'";
			var o = {
				field : "TRANSTYPE",
				source : "VALUE",
				table : "DOMAIN",
				display : "VALUE,DESCRIPTION",
				searchFields : "VALUE,DESCRIPTION",
				where : where
			};
			
			$.extend(o, opt);
			return new Domain(o);
		},
		//wonum lookup for labor reporting. Do not pull up workorders that are in status wappr.
		WONUM : function(opt){
			var where = "STATUS NOT IN ('WAPPR','CLOSE') AND SITEID = '" + self.SITEID + "'";
			var o = {
				field : "WONUM",
				source : "WONUM",
				table : "WORKORDER",
				display : "WONUM,DESCRIPTION,LOCATION,SITEID",
				searchFields : "WONUM",
				crossovers: "LOCATION,ASSETNUM,WORKORDERID",
				where : where
			};
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1')
				o.crossovers = '';			
			
			$.extend(o, opt);
			return new Domain(o);
		},
		TASKID : function(opt){
			var where = "ISTASK='1' AND PARENT = '" + self.WONUM + "'";

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
		TICKETID : function(opt){
			
			var o = {
				field : "TICKETID",
				source : "TICKETID",
				table : "SR",
				display : "TICKETID,DESCRIPTION",
				searchFields : "TICKETID",
				crossovers: "CLASS,TICKETUID"
			};	
			$.extend(o, opt);
			return new Domain(o);
		},
		LOCATION: function(opt){
			var where = "1=1";
			if(!String.isNullOrEmpty(self.SITEID))
				where = "SITEID = '" + self.SITEID + "'";
			var o = {
				display : "LOCATION,DESCRIPTION,SYSTEMID",
				field : "LOCATION",
				source : "LOCATION",
				table: "LOCATIONS",
				searchFields : "LOCATION,DESCRIPTION",
				orderby : null
			};
			
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1')
				where = "1=1";
			o.where = where;
			$.extend(o, opt);
			return new Domain(o);
		},
		ASSETNUM: function(opt){
			var where = "1=1";
			if(!String.isNullOrEmpty(self.SITEID))
				where = "SITEID = '" + self.SITEID + "'";
			var o = {
					display: "ASSETNUM, DESCRIPTION, LOCATION",
					field: "ASSETNUM",
					source: "ASSETNUM",
					searchFields : "ASSETNUM,DESCRIPTION,LOCATION",
					table: "ASSET",
					orderby: null
			};
						
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1')
				where = "1=1";				
			else
				o.crossovers = "LOCATION";
			o.where = where;
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
LabTrans.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	if(self.REGULARHRS) {
		if (!Number.isNumber(self.REGULARHRS)){
			validated = false;
			self.mbo.message(getText('EMMOF1004W', [getText('LABTRANS.REGULARHRS')], 'Regular hours must be a number'));
			return validated;
		}
	}
	if(self.PREMIUMPAYHOURS) {
		if (!Number.isNumber(self.PREMIUMPAYHOURS)){
			validated = false;
			self.mbo.message(getText('EMMOF1004W', [getText('LABTRANS.PREMIUMPAYHOURS')], 'Premium pay hours must be a number'));
			return validated;
		}
	}
	
	
	var fields = [];
	if(self.mbo.isRequired('LABORCODE') && String.isNullOrEmpty(self.LABORCODE))
		fields.push(getText('LABTRANS.LABORCODE', null, 'Labor Code'));
	if(self.mbo.isRequired('TRANSTYPE') && String.isNullOrEmpty(self.TRANSTYPE))
		fields.push(getText('LABTRANS.TRANSTYPE', null, 'Type'));
	if (self.mbo.isRequired('STARTDATE') && String.isNullOrEmpty(self.STARTDATE))
		fields.push(getText('LABTRANS.STARTDATE', null, 'Start Date'));	
	if (self.mbo.isRequired('REGULARHRS') && Number.getNumber(self.REGULARHRS) == null)
		fields.push(getText('LABTRANS.REGULARHRS', null, 'Regular Hrs'));
	
	if(fields.length>0){	
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
		return validated;
	}
	
	if ((String.isNullOrEmpty(self.WONUM) || self.WONUM === '') && (String.isNullOrEmpty(self.LOCATION) || self.LOCATION === '') && (String.isNullOrEmpty(self.ASSETNUM) || self.ASSETNUM === '') && (String.isNullOrEmpty(self.TICKETID) || self.TICKETID === '')) {
		if ($.inArray(self.TRANSTYPE, ['TRAV', 'WMATL', 'WORK']) > -1) {
			validated = false;
			self.mbo.message(getText('EMMOF1005W', [getText('LABTRANS.WONUM') + ', ' + getText('LABTRANS.ASSETNUM') + ', ' + getText('LABTRANS.LOCATION') + ', or ' + getText('LABTRANS.TICKETID')], 'Missing required fields: Work order, Asset, Location, or Ticket'));
			return validated;
		}
	}
	
	//if there is no WORKORDERID we need to set to 0
	//because the "transentitykey" cannot be empty for the LABTRANS object
	if(!self.WORKORDERID)
		self.WORKORDERID = 0;
	
	// Return true if the object is valid
	return validated;
};

LabTrans.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
    	LABORCODE: function(){
    		if(crossovers) {
    			self.CRAFT = crossovers.CRAFT;
    			self.SKILLLEVEL = crossovers.SKILLLEVEL;
    			self.PAYRATE = crossovers.RATE;
    		}
    		return true;
        },
        CRAFT: function(){
    		if(crossovers) {
    			self.LABORCODE = crossovers.LABORCODE;
    			self.SKILLLEVEL = crossovers.SKILLLEVEL;
    			self.PAYRATE = crossovers.RATE;
    		}
    		return true;
        },
        SKILLLEVEL: function(){
    		if(crossovers) {
    			self.LABORCODE = crossovers.LABORCODE;
    			self.CRAFT = crossovers.CRAFT;
    			self.PAYRATE = crossovers.RATE;
    		}
    		return true;
        },        
        WONUM: function(){
    		if(crossovers) {
    			self.WORKORDERID = crossovers.WORKORDERID;
    			self.TICKETID = "";
    			self.TICKETUID = "";
    			self.TICKETCLASS = "";
    			self.TICKETUID = "";
    			self.LOCATION = crossovers.LOCATION;
    			self.ASSETNUM = crossovers.ASSETNUM;
    		}
    		return true;
        },
        TICKETID: function(){
    		if(crossovers) {
    			self.TICKETCLASS = crossovers.CLASS;
    			self.TICKETUID = crossovers.TICKETUID;
    			self.WONUM = "";
    			self.WORKORDERID = "";
    			self.LOCATION ="";
    			self.ASSETNUM = "";
    		}
    		return true;
        },
        TRANSTYPE: function(){
        	if ($.inArray(self.TRANSTYPE, ['NON-WORK', 'VAC', 'SICK', 'OT-REF']) > -1 ){
        		self.WONUM = "";
    			self.TICKETID = "";
    			self.TICKETUID = "";
    			self.TICKETCLASS = "";
    			self.TICKETUID = "";
    			self.LOCATION = "";
    			self.ASSETNUM = "";
    		}
    		return true;
        },
        ASSETNUM: function(){
    		if(crossovers) {
    			// According to Maximo, only associate the location and siteid for this selected asset when there is no wonum populated
    			if (String.isNullOrEmpty(self.WONUM)) {
        			self.LOCATION = crossovers.LOCATION;
    			}
    		}
    		return true;
        },
        PREMIUMPAYCODE: function(){
    		if(crossovers) {
    			self.PREMIUMPAYRATE = crossovers.DEFAULTRATE;
    		}
    		return true;
        },
        STARTDATE: function(){  
        	var d1 = new Date(self.STARTDATE);
        	d1.setHours(0,0,0,0);
        	var d2 = new Date(self.FINISHDATE);
        	d2.setHours(0,0,0,0);
        	if(new Date(self.STARTDATE) > Date.now() ){
        		self.STARTDATE = null;        		
        		alert('Start Date cannot be in the future.');
        	}else if(self.FINISHDATE && (d1 > d2)){
        		self.STARTDATE = null;        		
        		alert('Start Date must occur before Finish Date.');
        	}
        	self.STARTTIME = null;
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;	
};