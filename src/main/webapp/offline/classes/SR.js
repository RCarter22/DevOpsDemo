// Class constructor
function SR (){
	// Class inheritance
    Mbo.apply(this, arguments);    
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('TICKETUID');

    this.mbo.extend({
        _isClassificationUpdated : false,
        isClassificationUpdated : function(val){
            if (typeof(val) === 'boolean')
                this._isClassificationUpdated = val;
            else
                return this._isClassificationUpdated;  
        },
        _srStatusMaxValue : null,
        srStatusMaxValue : function(val){
            if (typeof(val) === 'string')
                this._srStatusMaxValue = val;
            else
                return this._srStatusMaxValue;  
        },
    });  
}

SR.prototype.createNew = function(obj)
{	
	if((obj && (!obj.ISADVANCED || obj.ISADVANCED != '1')) || !obj){
		var now = new Date();
		
		// Set Default Values
		this.STATUS = 'NEW';
		this.CLASS = 'SR';
		this.STATUSDATE = now;
		this.REPORTDATE = now;
		this.REPORTEDBY = EMMServer.DB.getUserInfo().personId;
	}
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);		
};

/*Is Read Only*/
SR.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
		TICKETID: function(){
			return true;
		},
		DESCRIPTION: function(){
			if ($.inArray(self.mbo._srStatusMaxValue, ['CLOSED']) > -1)
        		return true;
        	return false;
        },
        LONGDESCRIPTION: function(){
			if ($.inArray(self.mbo._srStatusMaxValue, ['CLOSED']) > -1)
        		return true;
        	return false;
        },
        SITEID: function(){
        	if($.inArray(self.mbo._srStatusMaxValue, ['CLOSED']) > -1)
        		return true;
        	return false;
		},
        AFFECTEDPERSON: function(){
        	if($.inArray(self.mbo._srStatusMaxValue, ['CLOSED']) > -1)
        		return true;
        	return false;
        },
		LOCATION: function(){
        	if($.inArray(self.mbo._srStatusMaxValue, ['CLOSED']) > -1)
        		return true;
        	return false;
		},
		ASSETNUM: function(){
        	if($.inArray(self.mbo._srStatusMaxValue, ['CLOSED']) > -1)
        		return true;
        	return false;
		},
		REPORTEDPRIORITY: function(){
        	if($.inArray(self.mbo._srStatusMaxValue, ['CLOSED']) > -1)
        		return true;
        	return false;
        },
		GLACCOUNT: function(){
			return true;
		},
		ASSETORGID: function(){
			return true;
		},
		ASSETSITEID : function(){
        	if($.inArray(self.mbo._srStatusMaxValue, ['CLOSED']) > -1)
        		return true;
        	return false;
        }	
    };
    
    if(self.ISADVANCED && self.ISADVANCED == '1')
    	return false;
    else
    	return attributes[attr] ? attributes[attr]() : false;
};

/*Is Required*/
SR.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
    	TICKETID: function(){
    		return true;
    	},
		DESCRIPTION: function(){
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

SR.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		STATUS: function(opt){
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1'){
				var o = {
						field : "STATUS",
						source : "VALUE",
						table : "DOMAIN",
						searchFields : "VALUE,DESCRIPTION",
						where : "DOMAINID = 'SRSTATUS'",
						orderby : null,
						isDistinct : true,
					}
				$.extend(o, opt);
				var domain = new Domain(o);
				return domain;
			}
			else{
				var statusList = {
					NEW : ['PENDING', 'INPROG', 'RESOLVED', 'NEW', 'CLOSED', 'QUEUED'],
					PENDING : ['NEW', 'INPROG', 'RESOLVED', 'PENDING', 'CLOSED', 'QUEUED'],
					INPROG : ['NEW', 'RESOLVED', 'PENDING', 'INPROG', 'CLOSED', 'QUEUED'],
					QUEUED : ['NEW', 'INPROG', 'RESOLVED', 'PENDING', 'CLOSED', 'QUEUED'],
					RESOLVED : ['CLOSED'],
					CLOSED : ['CLOSED']
				}
				var o = {
						field : "STATUS",
						source : "VALUE",
						table : "DOMAIN",
						searchFields : "VALUE,DESCRIPTION",
						where : self.mbo.getChangeStatusWhere('SRSTATUS', statusList),
						orderby : null
				};
				$.extend(o, opt);	
				return new Domain(o);	 
			}
		},						
		AFFECTEDPERSON: function(opt){
			var o = {
				display: "PERSONID,DISPLAYNAME",
				field: "AFFECTEDPERSON",
				source: "PERSONID",
				table: "PERSON",
				searchFields : "PERSONID,FIRSTNAME,LASTNAME",
				where: "1=1",
				orderby: null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		OWNER: function(opt){
			var o = {
				display: "PERSONID,DISPLAYNAME",
				field: "OWNER",
				source: "PERSONID",
				table: "PERSON",
				searchFields : "PERSONID,FIRSTNAME,LASTNAME",
				where: "1=1",
				orderby: null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		REPORTEDBY: function(opt){
			var o = {
				display: "PERSONID,DISPLAYNAME",
				field: "REPORTEDBY",
				source: "PERSONID",
				table: "PERSON",
				searchFields : "PERSONID,FIRSTNAME,LASTNAME",
				where: "1=1",
				orderby: null
			};
			$.extend(o, opt);
			return new Domain(o);
		},		
		REPORTEDPRIORITY: function(opt){
			var o = {
				display: "VALUE,DESCRIPTION",
				field: "REPORTEDPRIORITY",
				source: "VALUE",
				table: "DOMAIN",
				where: "DOMAINID = 'TICKETPRIORITY'",
				orderby: null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		ASSETSITEID: function(opt){
			var where = "1=1";
			if (self.ASSETORGID)
				where = "SITEID IN (SELECT SITEID FROM ASSET WHERE ORGID = '" + self.ASSETORGID + "')";	
			var o = {
				display: "ORGID, SITEID, DESCRIPTION",
				field: "ASSETSITEID",
				source: "SITEID",
				crossovers: "ORGID",
				table: "SITE",
				searchFields : "ORGID,SITEID,DESCRIPTION",
				where: where,
				orderby: null
			};
			$.extend(o, opt);
			return new Domain(o);
		},		
		ASSETNUM: function(opt){
			var o = {
				display: "ASSETNUM, DESCRIPTION, SITEID",
				field: "ASSETNUM",
				source: "ASSETNUM",
				crossovers: "LOCATION,SITEID,ORGID",
				searchFields : "ASSETNUM,DESCRIPTION,SITEID",
				table: "ASSET",
				where: "1=1",
				orderby: null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		LOCATION: function(opt){
			var where = "1=1";
			
			if(self.ASSETSITEID)
				where = "SITEID = '" + self.ASSETSITEID + "'";			
			
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1')
				where = "1=1";
			
			var o = {
				display : "LOCATION,DESCRIPTION,SITEID",
				field : "LOCATION",
				source : "LOCATION",
				crossovers: "SITEID,ORGID",
				searchFields : "LOCATION,DESCRIPTION,SITEID",
				table: "LOCATIONS",
				where: where,
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		SITEID: function(opt){
			var o = {
				display: "SITEID,DESCRIPTION",
				field: "SITEID",
				source: "SITEID",
				crossovers: "ORGID",
				table: "SITE",
				searchFields : "SITEID,DESCRIPTION",
				where: "1=1",
				orderby: null
			}
			$.extend(o, opt);
			return new Domain(o);
		},
		CLASSSTRUCTUREID: function(opt){
			var whereclause = "OBJECTVALUE = 'SR' AND (SITEID = '" + self.SITEID + "' OR SITEID IS NULL)";
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
		return new Domain(o);		
	}
	
	return null;
};

/* Validate */
SR.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	var fields = [];
	if (self.mbo.isRequired('DESCRIPTION') && !self.DESCRIPTION)
		fields.push(getText('SR.DESCRIPTION', null, 'Description'));
	if(fields.length>0){
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
	}		
	
	// Return true if the object is valid
	return validated;
};

/* On Change */
SR.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
		ASSETNUM : function(){
        	if(crossovers){
        		self.LOCATION = crossovers.LOCATION;
        		self.ASSETSITEID = crossovers.SITEID;
        		self.ASSETORGID = crossovers.ORGID;
        	}
        	return true;
        },
        LOCATION : function(){
        	self.ASSETNUM = null;
        	if(crossovers){
        		self.ASSETSITEID = crossovers.SITEID;
        		self.ASSETORGID = crossovers.ORGID;
        	}        	
        	return true;
        },
		ASSETSITEID: function () {
			self.ASSETNUM = null;
			self.LOCATION = null;
			if (crossovers){
				self.ASSETORGID = crossovers.ORGID;
			}
        	return true;
		},
		SITEID: function () {
			if (crossovers){
				self.ORGID = crossovers.ORGID;
			}
        	return true;
		},
        OWNER : function(){
        	self.OWNERGROUP = null;    	
        	return true;
        },
        OWNERGROUP : function(){
        	self.OWNER = null;
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;	
};

SR.prototype.canAddActuals = function(){
	// Can add labor/materials
	if($.inArray(this.mbo.maxStatusValue(), ['CLOSED']) > -1)
		return false;
	return true;
}