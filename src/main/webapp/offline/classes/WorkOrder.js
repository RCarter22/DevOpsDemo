// Class constructor
function WorkOrder (){
	// Class inheritance
    Mbo.apply(this, arguments);    
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('WORKORDERID');

    // Do not add any properties to 'this' scope
    
    // You can extend certain properties such as 'mbo' using the extend() function
    this.mbo.extend({
    	_isFailureUpdated : false,
    	isFailureUpdated : function(val){
            if (typeof(val) === 'boolean')
                this._isFailureUpdated = val;
            else
                return this._isFailureUpdated;  
    	},
        _isClassificationUpdated : false,
        isClassificationUpdated : function(val){
            if (typeof(val) === 'boolean')
                this._isClassificationUpdated = val;
            else
                return this._isClassificationUpdated;  
        },
        _woStatusMaxValue : null,
        woStatusMaxValue : function(val){
            if (typeof(val) === 'string')
                this._woStatusMaxValue = val;
            else
                return this._woStatusMaxValue;  
        },
    });
}

WorkOrder.prototype.createNew = function(obj){
	if((obj && (!obj.ISADVANCED || obj.ISADVANCED != '1')) || !obj){
		var now = new Date();
		
		// Set Default Values
		this.STATUS = 'INPRG';
		this.STATUSDATE = now;
		this.REPORTDATE = now;
		this.REPAIRFACILITY = EMMServer.DB.getUserInfo().extFields.REPAIRFACILITY;
		this.REPORTEDBY = EMMServer.DB.getUserInfo().personId;
	}
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);	
};

// Custom automation scripts for readonly fields
/* Is Read Only */
WorkOrder.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
        WONUM: function(){
        	return true;
        },
        DESCRIPTION: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        LONGDESCRIPTION: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        PARENT: function(){
        	return true;
        },
        TASKID: function(){
        	return true;
        },
        SITEID: function(){
        	return true;
        },
        SUPERVISOR: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        STATUS: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        REPAIRFACILITY: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        WORKTYPE: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        WOPRIORITY: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        FAILURECODE: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        PROBLEMCODE: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        TARGSTARTDATE: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        TARGCOMPDATE: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        SCHEDSTART: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        SCHEDFINISH: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        ACTSTART: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        ACTFINISH: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        AMCREW: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        OWNER: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        OWNERGROUP: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        LEAD: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        PERSONGROUP: function(){
        	if (self.isInHistory())
        		return true;
        	return false;
        },
        REPORTEDBY: function(){
        	return true;
        },
        GLACCOUNT: function(){
        	return true;
        },
        LOCATION: function(){
        	if (($.inArray(self.mbo.maxStatusValue(), ['INPRG', 'COMP']) > -1) || (self.isInHistory()))
        		return true;
        	return false;
        },
        ASSETNUM: function(){
        	if (($.inArray(self.mbo.maxStatusValue(), ['INPRG', 'COMP']) > -1)|| (self.isInHistory()))
        		return true;
        	return false;
        },
        AEPUSINGDEPARTMENT: function(){
            if (($.inArray(self.mbo.maxStatusValue(), ['INPRG', 'COMP']) > -1)|| (self.isInHistory()))
                return true;
            return false;
        },
        ALIAS: function(){
            return true;
        },
        MEASUREMENTVALUE: function(){
        	if(($.inArray(self.mbo._woStatusMaxValue, ['CAN', 'COMP']) > -1)|| (self.isInHistory()))
        		return true;
        	return false;
        },
        OBSERVATION: function(){
        	if(($.inArray(self.mbo._woStatusMaxValue, ['CAN', 'COMP']) > -1)|| (self.isInHistory()))
        		return true;
        	return false;
        }
    };
    
    if(self.ISADVANCED && self.ISADVANCED == '1')
    	return false;
    else
    	return attributes[attr] ? attributes[attr]() : false;
};

/* Is Required */
WorkOrder.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
        WONUM: function(){
        	return true;
        },
        TASKID: function(){
        	return true;
        },
        AEPUSINGDEPARTMENT: function(){
        	if(self.ISTASK == 0)
        	return true;
        },
        DESCRIPTION: function(){
        	if(self.ISTASK == 1){
        		return false;
        	}
        	return true;
        }        
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Lookup Criteria */
WorkOrder.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		STATUS: function(opt){
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1'){
                var o = {
                        field : "STATUS",
                        source : "VALUE",
                        table : "DOMAIN",
                        searchFields : "VALUE,DESCRIPTION",
                        where : "DOMAINID = 'WOSTATUS'",
                        orderby : null,
                        isDistinct : true,
                      };
                $.extend(o, opt);       
                return new Domain(o);
			}
			else{
                var statusList = {
                    WAPPR: ['WAPPR', 'APPR', 'INPRG', 'COMP', 'WMATL', 'WSCH'],
                    APPR: ['APPR', 'WAPPR', 'INPRG', 'COMP'],
                    INPRG : ['INPRG', 'WAPPR', 'COMP', 'WMATL'],
                    WMATL : ['WMATL', 'WAPPR', 'INPRG', 'COMP'],
                    WSCH : ['WSCH', 'WAPPR', 'APPR', 'INPRG', 'WMATL', 'COMP'],
                    COMP : ['COMP']
                };

				var o = {
                    field : "STATUS",
                    source : "VALUE",
                    table : "DOMAIN",
                    searchFields : "VALUE,DESCRIPTION",
                    where : self.mbo.getChangeStatusWhere('WOSTATUS', statusList),
                    orderby : null
                };
	            $.extend(o, opt);	    
	            return new Domain(o);
			}
		},		
		WORKTYPE: function(opt){
			var o = {
				field : "WORKTYPE",
				source : "WORKTYPE",
				table : "WORKTYPE",
				where : "1=1 AND ORGID = '" + self.ORGID + "'",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		REPAIRFACILITY: function(opt){
			var o = {
				field : "REPAIRFACILITY",
				display : "LOCATION,DESCRIPTION,TYPE,SITEID",
				source : "LOCATION",
				table : "LOCATIONS",
				searchFields : "LOCATION,DESCRIPTION",
				where: "TYPE = 'REPAIR'",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},	
		ALIAS: function(opt){
            var where = "SITEID = '" + self.SITEID + "'";
            
            
            var o = {
                field : "ALIAS",
                display : "ALIAS,DESCRIPTION,LOCATION,ASSETNUM",
                source : "ALIAS",
                table : "PLUSTASSETALIAS",
                searchFields : "ALIAS,DESCRIPTION",
                //where: "1=1",
                orderby : null
            };
            
            if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1')
                where = "1=1";                
            else
                o.crossovers = "LOCATION,ASSETNUM,CUSTOMER";
            
            o.where = where;
            $.extend(o, opt);
            return new Domain(o);
        },
        ASSETNUM: function(opt){
            var where = "SITEID = '" + self.SITEID + "'";
                        
            if(self.PLUSPCUSTOMER)
                where += " AND PLUSPCUSTOMER = '" + self.PLUSPCUSTOMER + "'";
                        
            var o = {
                    display: "ASSETNUM, DESCRIPTION, LOCATION,ALIAS",
                    field: "ASSETNUM",
                    source: "ASSETNUM",
                    searchFields : "ASSETNUM,ALIAS,DESCRIPTION,LOCATION,DEFAULTREPFAC,LICENSENUM,SERIALNUM",
                    table: "ASSET",
                    orderby: null
            };
                        
            if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1')
                where = "1=1";                
            else
                o.crossovers = "LOCATION,PLUSPCUSTOMER,ALIAS,CUSTOMER";
            
            o.where = where;
            $.extend(o, opt);
            return new Domain(o);
        },
        AEPUSINGDEPARTMENT: function(opt){        
        
            var o = {
                field : "AEPUSINGDEPARTMENT",
                display : "CUSTOMER,NAME",
                source : "CUSTOMER",
                table : "PLUSPCUSTOMER",
                searchFields : "CUSTOMER,NAME",
                orderby : null
            };

            $.extend(o, opt);
            return new Domain(o);
        },

		PLUSTACCOMP: function(opt){
			var o = {
				field : "PLUSTACCOMP",
				source : "VALUE",
				table : "DOMAIN",
				searchFields : "VALUE,DESCRIPTION",
				where : "DOMAINID = 'PLUSTACCOMPLISHED'",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		PLUSTCOMP: function(opt){
			var o = {
				field : "PLUSTCOMP",
				display:"COMPONENT,DESCRIPTION",
				source : "COMPONENT",
				table : "PLUSTCOMP",
				searchFields : "COMPONENT,DESCRIPTION",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		PLUSTREASON: function(opt){
			var o = {
				field : "PLUSTREASON",
				source : "VALUE",
				table : "DOMAIN",
				searchFields : "VALUE,DESCRIPTION",
				where : "DOMAINID = 'PLUSTREASON'",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		AMCREW: function(opt){
			var o = {
				field : "AMCREW",
				source : "AMCREW",
				table : "AMCREW",
				searchFields : "AMCREW,DESCRIPTION,AMCREWTYPE,ORGID",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		FAILURECODE: function(opt){
			var o = {
				field : "FAILURECODE",
				source : "FAILURECODE",
				table : "FAILURECODE",
				searchFields : "FAILURECODE,DESCRIPTION",
				where : "(PARENT IS NULL OR PARENT = '')",
				orderby : null
			};
			$.extend(o, opt);	
			return new Domain(o);
		},
		PROBLEMCODE: function(opt){			
			var where = " PARENT IN (SELECT FL2.FAILURELIST FROM FAILURECODE FL2 WHERE (FL2.PARENT IS NULL OR FL2.PARENT = '') "
				+ "AND FL2.ORGID = '" + self.ORGID + "' AND FL2.FAILURECODE = '" + self.FAILURECODE + "')";
			
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1')
				where = "(PARENT IS NOT NULL OR PARENT != '')";
			
			var o = {
				field : "PROBLEMCODE",
				source : "FAILURECODE",
				table : "FAILURECODE",
				searchFields : "FAILURECODE,DESCRIPTION",
				where : where,
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		LOCATION: function(opt){
			var where = "SITEID = '" + self.SITEID + "'";
			
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1')
				where = "1=1";
			
			var o = {
				display : "LOCATION,DESCRIPTION,TYPE,SYSTEMID",
				field : "LOCATION",
				source : "LOCATION",
				table: "LOCATIONS",
				searchFields : "LOCATION,DESCRIPTION",
				where: where,
				crossovers: "PLUSPCUSTOMER",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		SUPERVISOR: function(opt){
			var o = {
				display : "PERSONID,DISPLAYNAME",
				field : "SUPERVISOR",
				source : "PERSONID",
				table: "PERSON",
				searchFields : "PERSONID,FIRSTNAME,LASTNAME",
				where: "1=1",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
        LEAD: function(opt){
            var where = "1=1";
            if(self.PERSONGROUP)
            	where = "PERSONID IN (SELECT RESPPARTYGROUP FROM PERSONGROUPTEAM WHERE PERSONGROUP = '" + self.PERSONGROUP + "')";
            
            var o = {
	            display : "PERSONID,DISPLAYNAME",
	            field : "LEAD",
	            source : "PERSONID",
	            table: "PERSON",
	            searchFields : "PERSONID,FIRSTNAME,LASTNAME",
	            where: where,
	            orderby : null
            };
            $.extend(o, opt);
            return new Domain(o);
        },	
		PERSONGROUP: function(opt){
			var o = {
				display : "PERSONGROUP,DESCRIPTION",
				field : "PERSONGROUP",
				source : "PERSONGROUP",
				table: "PERSONGROUP",
				searchFields : "PERSONGROUP,DESCRIPTION",
				where: "1=1",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		CLASSSTRUCTUREID: function(opt){
			var whereclause = "OBJECTVALUE = 'WORKORDER' AND (SITEID = '" + self.SITEID + "' OR SITEID IS NULL)";
			
			if(self.PLUSPCUSTOMER){
				whereclause += " and ( exists (select 1 from pluspcustomer,pluspcustassoc where pluspcustomer.customer = '" + self.PLUSPCUSTOMER + "'";
				whereclause += " and (pluspcustomer.customer = pluspcustassoc.customer or pluspcustomer.parent = pluspcustassoc.customer)";
				whereclause += " and pluspcustassoc.ownertable = 'CLASSSTRUCTURE' and pluspcustassoc.ownerid = classstructure.classstructureuid ))";
			}
			
			var o = {
					display: "CLASSIFICATIONID, DESCRIPTION, CLASSSTRUCTUREID",
					field: "CLASSSTRUCTUREID",
					source: "CLASSSTRUCTUREID",
					table: "CLASSSTRUCTURE",
					searchFields : "CLASSIFICATIONID, DESCRIPTION, CLASSSTRUCTUREID",
					where: whereclause,
					orderby: null
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
WorkOrder.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	if(self.ISTASK == '1' && self.MEASUREMENTVALUE) {
		if(!(Number.isNumber(self.MEASUREMENTVALUE) && isFinite(Number.getNumber(self.MEASUREMENTVALUE)))){
			validated = false;
			self.mbo.message(getText('EMMOF1004W', [getText('WORKORDER.MEASUREMENTVALUE')], 'Measurement value must be a number'));
		}	
	}
	
	if(!String.isNullOrEmpty(self.WOPRIORITY) && !Number.isNumber(self.WOPRIORITY)){
		validated = false;
		self.mbo.message(getText('EMMOF1004W', [getText('WORKORDER.WOPRIORITY')], 'Priority must be a number'));
	}	
	
	var fields = [];
	if (self.mbo.isRequired('DESCRIPTION') && String.isNullOrEmpty(self.DESCRIPTION))
		fields.push(getText('WORKORDER.DESCRIPTION', null, 'Description'));
	if (self.mbo.isRequired('AEPUSINGDEPARTMENT') && String.isNullOrEmpty(self.AEPUSINGDEPARTMENT))
		fields.push(getText('WORKORDER.AEPUSINGDEPARTMENT', null, 'Using Department'));
	if(fields.length>0){
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
	}	
	
	// Return true if the object is valid
	return validated;
};

/* On Change */
WorkOrder.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
    	FAILURECODE: function(){
    		self.PROBLEMCODE = null;
    		self.mbo.isFailureUpdated(true);
        	return true;
        },
        PROBLEMCODE: function(){        	
    		self.mbo.isFailureUpdated(true);
        	return true;
        },
        ASSETNUM : function(){
            if(crossovers){
                self.LOCATION = crossovers.LOCATION;
                self.PLUSPCUSTOMER = crossovers.PLUSPCUSTOMER;
                self.ALIAS = crossovers.ALIAS;
                self.AEPUSINGDEPARTMENT = crossovers.CUSTOMER;

            }
            return true;
        },
        ALIAS : function(){
            if(crossovers){
                self.LOCATION = crossovers.LOCATION;
                self.PLUSPCUSTOMER = crossovers.PLUSPCUSTOMER;
                self.ASSETNUM = crossovers.ASSETNUM;
                self.AEPUSINGDEPARTMENT = crossovers.CUSTOMER;

            }
            return true;
        },

        LOCATION : function(){
        	self.ASSETNUM = null;
        	self.ALIAS = null;
        	self.AEPUSINGDEPARTMENT = null;
        	if(crossovers){
        		self.PLUSPCUSTOMER = crossovers.PLUSPCUSTOMER;
        	}
        	return true;
        },
        PERSONGROUP : function(){
        	self.LEAD = null;
        	return true;
        },        
        OWNER : function(){
        	self.OWNERGROUP = null;
        	return true;
        },
        OWNERGROUP : function(){
        	self.OWNER = null;
        	return true;
        },
        SCHEDSTART : function(){  
        	if (self.SCHEDSTART && self.SCHEDFINISH && self.SCHEDSTART.toDate().isAfter(self.SCHEDFINISH.toDate())){
        		self.SCHEDSTART = null;
        		var start = getText('WORKORDER.SCHEDSTART', null, 'Scheduled Start');
        		var finish = getText('WORKORDER.SCHEDFINISH', null, 'Scheduled Finish');
        		var msg = getText('EMMGB1012I', [start, finish], 'Scheduled Start must occur before Scheduled Finish');
        		alert(msg);
        	}
        	return true;
        },
        SCHEDFINISH : function(){
        	if (self.SCHEDSTART && self.SCHEDFINISH && self.SCHEDSTART.toDate().isAfter(self.SCHEDFINISH.toDate())){
        		self.SCHEDFINISH = null;
        		var start = getText('WORKORDER.SCHEDSTART', null, 'Scheduled Start');
        		var finish = getText('WORKORDER.SCHEDFINISH', null, 'Scheduled Finish');
        		var msg = getText('EMMGB1013I', [finish, start], 'Scheduled Finish must occur after Scheduled Start');
        		alert(msg);
        	}
        	return true;        	
        },
        TARGSTARTDATE: function(){        	
        	if (self.TARGSTARTDATE && self.TARGCOMPDATE && self.TARGSTARTDATE.toDate().isAfter(self.TARGCOMPDATE.toDate())){
        		self.TARGSTARTDATE = null;
        		var start = getText('WORKORDER.TARGSTARTDATE', null, 'Target Start');
        		var finish = getText('WORKORDER.TARGCOMPDATE', null, 'Target Finish');
        		var msg = getText('EMMGB1012I', [start, finish], 'Target Start must occur before Target Finish');
        		alert(msg);
        	}
        	return true;        	
        },
        TARGCOMPDATE: function(){        	
        	if (self.TARGSTARTDATE && self.TARGCOMPDATE && self.TARGSTARTDATE.toDate().isAfter(self.TARGCOMPDATE.toDate())){
        		self.TARGCOMPDATE = null;
        		var start = getText('WORKORDER.TARGSTARTDATE', null, 'Target Start');
        		var finish = getText('WORKORDER.TARGCOMPDATE', null, 'Target Finish');
        		var msg = getText('EMMGB1013I', [finish, start], 'Target Finish must occur after Target Start');
        		alert(msg);
        		return false;
        	}
        	return true;     	
        },
        ACTSTART: function(){        	
        	if (self.ACTSTART && self.ACTSTART.toDate().isAfter(new Date())){
        		self.ACTSTART = null;
        		var start = getText('WORKORDER.ACTSTART', null, 'Actual Start');
        		alert(getText('EMMGB1014I', [start], 'Actual Start must occur in the past'));
        		return true;
        	}
        	if (self.ACTSTART && self.ACTFINISH && self.ACTSTART.toDate().isAfter(self.ACTFINISH.toDate())){
        		self.ACTSTART = null;
        		var start = getText('WORKORDER.ACTSTART', null, 'Actual Start');
        		var finish = getText('WORKORDER.ACTFINISH', null, 'Actual Finish');
        		var msg = getText('EMMGB1012I', [start, finish], 'Actual Start must occur before Actual Finish');
        		alert(msg);
        	}
        	return true;          	
        },
        ACTFINISH: function(){
        	if (self.ACTFINISH && self.ACTFINISH.toDate().isAfter(new Date())){
        		self.ACTFINISH = null;
        		var finish = getText('WORKORDER.ACTFINISH', null, 'Actual Finish');
        		alert(getText('EMMGB1014I', [finish], 'Actual Finish must occur in the past'));
        		return true;
        	}
        	if (self.ACTSTART && self.ACTFINISH && self.ACTSTART.toDate().isAfter(self.ACTFINISH.toDate())){
        		self.ACTFINISH = null;
        		var start = getText('WORKORDER.ACTSTART', null, 'Actual Start');
        		var finish = getText('WORKORDER.ACTFINISH', null, 'Actual Finish');
        		var msg = getText('EMMGB1013I', [finish, start], 'Actual Finish must occur before Actual Start');
        		alert(msg);
        	}
        	return true;           	
        }
    };
    return attributes[attr] ? attributes[attr]() : false;	
};

WorkOrder.prototype.canAddActuals = function(){
	// Can add labor/materials
	if(($.inArray(this.mbo.maxStatusValue(), ['WAPPR']) > -1))
		return false;
	return true;
}
WorkOrder.prototype.canAddPlans = function(){
	// Can add labor/materials
	if($.inArray(this.mbo.maxStatusValue(), ['APPR', 'INPRG', 'COMP', 'WMATL', 'WSCH']) > -1)
		return false;
	return true;
}
WorkOrder.prototype.isInHistory = function(){
	// Determine if a work order is in History Mode
	if (this.HISTORYFLAG == 1)
		return true;
	return false;
}