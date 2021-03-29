function Asset (){
	// Class inheritance
    Mbo.apply(this, arguments);    
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('ASSETUID');
    
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
    });  
}

Asset.prototype.createNew = function(obj){	
	if((obj && (!obj.ISADVANCED || obj.ISADVANCED != '1')) || !obj){
		var now = new Date();
		
		// Set Default Values
		this.STATUS = 'NOT READY';
		this.STATUSDATE = now;
		this.CHANGEDATE = now;
		this.CHANGEBY = EMMServer.DB.getUserInfo().personId;
	}
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);	
};

Asset.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
        ASSETID: function(){
        	return true;
        },
        SITEID: function(){
        	return true;
        },
        ASSETNUM: function(){
        	return true;
        },
        STATUS: function(){
        	return true;
        },
        PARENT: function(){
        	return true;
        },
        LOCATION: function(){
        	return true;
        },
        GROUPNAME: function(){
        	return true;
        },
        ISRUNNING: function(){
        	return true;
        },
        STATUSDATE: function(){
        	return true;
        },
        TOTDOWNTIME: function(){
        	return true;
        },  
        PURCHASEPRICE: function(){
        	return true;
        }          
    };
    if(self.ISADVANCED && self.ISADVANCED == '1')
    	return false;
    else
    	return attributes[attr] ? attributes[attr]() : false;
};

/* Is Required */
Asset.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
        ASSETNUM: function(){
        	return true;
        },
        ISRUNNING: function(){
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/* Lookup Criteria */
Asset.prototype.lookup = function(attr, options){	
	var self = this;
	var attributes = {
		VENDOR: function(opt){
			var o = {
					display: "COMPANY,NAME,TYPE",
					field: "VENDOR",
					source: "COMPANY",
					table: "COMPANIES",
					searchFields : "COMPANY,NAME,TYPE",
					where: "1=1",
					orderby: null
			}
			$.extend(o, opt);			
			return new Domain(o);
		},
		MANUFACTURER: function(opt){
			var o = {
					display: "COMPANY,NAME,TYPE",
					field: "MANUFACTURER",
					source: "COMPANY",
					table: "COMPANIES",
					searchFields : "COMPANY,NAME,TYPE",
					where: "1=1",
					orderby: null
			}
			$.extend(o, opt);
			return new Domain(o);
		},
		ASSETTYPE: function(opt){
			var o = {
				field : "ASSETTYPE",
				source : "VALUE",
				table : "DOMAIN",
				searchFields : "VALUE,DESCRIPTION",
				where : "DOMAINID = 'ASSETTYPE'",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		AEPMAKE: function(opt){
			var o = {
				field : "AEPMAKE",
				display: "VALUE,DESCRIPTION",
				source : "VALUE",
				table : "DOMAIN",
				searchFields : "VALUE,DESCRIPTION",
				where : "DOMAINID = 'AEPMAKE'",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		PLUSTMODEL: function(opt){
			var o = {
				field : "PLUSTMODEL",
				source : "MODEL",
				display: "MODEL,MANUFACTURER,MAKE",
				table : "AEPMFGMAKEMODEL",
				searchFields : "MODEL,MANUFACTURER,MAKE",
				where : "1=1",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		DEFAULTREPFAC: function(opt){
			var o = {
				field : "DEFAULTREPFAC",
				display: "LOCATION,DESCRIPTION,TYPE,SITEID",
				source : "LOCATION",
				table : "LOCATIONS",
				searchFields : "LOCATION,DESCRIPTION",
				where : "TYPE = 'REPAIR'",
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
		LOCATION: function(opt){
			var where = "SITEID = '" + self.SITEID + "'";

			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1')
				where = "1=1";
			
			var o = {
				display : "LOCATION,DESCRIPTION,ORGID",
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
		STATUS: function(opt){
			var o = {
				field : "STATUS",
				source : "VALUE",
				table : "DOMAIN",
				searchFields : "VALUE,DESCRIPTION",
				where : "DOMAINID = 'LOCASSETSTATUS'",
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
					table: "SITE",
					searchFields : "SITEID,DESCRIPTION",
					where: "1=1",
					orderby: null
			}
			$.extend(o, opt);
			return new Domain(o);
		},		
		GROUPNAME: function(opt){
			var o = {
				field : "GROUPNAME",
				source : "GROUPNAME",
				table : "METERGROUP",
				searchFields : "GROUPNAME,DESCRIPTION",
				where : "1=1",
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},		
		PARENT: function(opt){
			var o = {
				display: "ASSETNUM, DESCRIPTION",
				field: "PARENT",
				source: "ASSETNUM",
				table: "ASSET",
				searchFields : "ASSETNUM, DESCRIPTION",
				where: "1=1",
				orderby: null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		CLASSSTRUCTUREID: function(opt){
			var whereclause = "OBJECTVALUE = 'ASSET' AND (SITEID = '" + self.SITEID + "' OR SITEID IS NULL)";
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
		},
		NEWLOCATION: function(opt){
			var where = "SITEID = '" + self.NEWSITE + "'";
			
			var o = {
				display : "LOCATION,DESCRIPTION,ORGID",
				field : "NEWLOCATION",
				source : "LOCATION",
				table: "LOCATIONS",
				searchFields : "LOCATION,DESCRIPTION",
				where: where,
				orderby : null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		NEWSITE: function(opt){
			var o = {
					display: "SITEID,DESCRIPTION",
					field: "NEWSITE",
					source: "SITEID",
					table: "SITE",
					searchFields : "SITEID,DESCRIPTION",
					where: "1=1",
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

Asset.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
    	CLASSSTRUCTUREID: function(){
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;	
};

/* Validate */
Asset.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	if(!String.isNullOrEmpty(self.PURCHASEPRICE) && !Number.isNumber(self.PURCHASEPRICE)){
		validated = false;
		self.mbo.message(getText('EMMOF1004W', [getText('ASSET.PURCHASEPRICE')], 'Purchase Price must be a number'));
	}	
	
	var fields = [];
	if (self.mbo.isRequired('ASSETNUM') && !self.ASSETNUM)
		fields.push(getText('ASSET.ASSETNUM', null, 'Asset'));
	if(fields.length>0){
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
	}	
	
	// Return true if the object is valid
	return validated;
};
Asset.prototype.isRecordClosed = function(){
	// Can add labor/materials
	if($.inArray(this.STATUS, ['DECOMISSIONED']) > -1)
		return false;
	return true;
}