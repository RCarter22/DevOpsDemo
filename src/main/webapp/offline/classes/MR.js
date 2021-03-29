// Class constructor
function MR (){
	// Class inheritance
    Mbo.apply(this, arguments);    
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('MRID');
}

MR.prototype.createNew = function(obj)
{	
	if((obj && (!obj.ISADVANCED || obj.ISADVANCED != '1')) || !obj){
		var now = new Date();
		
		// Set Default Values
		this.STATUS = 'DRAFT';
		this.STATUSDATE = now;
		this.PRIORITY = '1';
	}
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
};

/*Is Required*/
MR.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
    	MRNUM: function(){
    		return true;
    	},
    	DESCRIPTION: function(){
    		return true;
    	},
    	PRIORITY: function(){
			return true;
		}
    };
    return attributes[attr] ? attributes[attr]() : false;
};

MR.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
    		MRNUM: function(){
            	return true;
            },
            DESCRIPTION: function(){
            	if ($.inArray(self.STATUS, ['APPR']) > -1)
            		return true;
            	return false;
            },
            LONGDESCRIPTION: function(){
            	if ($.inArray(self.STATUS, ['APPR']) > -1)
            		return true;
            	return false;
            },
            REQUIREDDATE : function(){
            	if ($.inArray(self.STATUS, ['APPR']) > -1)
            		return true;
            	return false;
            },
            PRIORITY : function(){
            	if ($.inArray(self.STATUS, ['APPR']) > -1)
            		return true;
            	return false;
            },
            WONUM : function(){
            	if ($.inArray(self.STATUS, ['APPR']) > -1)
            		return true;
            	return false;
            },
            LOCATION : function(){
            	if ($.inArray(self.STATUS, ['APPR']) > -1)
            		return true;
            	return false;
            }
            
    };
    return attributes[attr] ? attributes[attr]() : false;
};

MR.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		STATUS: function(opt){
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1'){
				var o = {
						field : "STATUS",
						source : "VALUE",
						table : "DOMAIN",
						searchFields : "VALUE,DESCRIPTION",
						where : "DOMAINID = 'MRSTATUS'",
						orderby : null
					};
				$.extend(o, opt);
				return new Domain(o);
			}
			else{
				var sql = "SELECT * FROM DOMAIN WHERE DOMAINID = 'MRSTATUS' AND MAXVALUE != '" + self.STATUS + "' ";
				var statusList = {
					DRAFT : " AND MAXVALUE IN ('APPR', 'WAPPR', 'CAN')",
					WAPPR : " AND MAXVALUE IN ('APPR', 'DRAFT', 'CAN')",
					APPR : " AND MAXVALUE IN ('CAN', 'DRAFT', 'WAPPR')",
					CLOSE : " AND 1=2",
					CAN : " AND 1=2"
					
				};
				// Append condition
				if (!!statusList[self.STATUS]) // checks for predefined statuses, any maximo status not defined in 'statusList' need to be added here
					sql += statusList[self.STATUS];
				var domain = new Domain();
							
				domain.setSql(sql);
				return domain;
			}
		},						
		WONUM: function(opt){
			var o = {
				display: "WONUM,DESCRIPTION",
				field: "WONUM",
				source: "WONUM",
				table: "WORKORDER",
				crossovers: "LOCATION",
				searchFields : "WONUM,DESCRIPTION",
				where: "1=1",
				orderby: null
			};
			$.extend(o, opt);
			return new Domain(o);
		},
		LOCATION: function(opt){
			var where = "SITEID = '" + self.SITEID + "'";
			if(opt != null && opt.isAdvanced != null && opt.isAdvanced == '1')
				where = "1=1";
			
			var o = {
				display : "LOCATION,DESCRIPTION",
				field : "LOCATION",
				source : "LOCATION",
				table: "LOCATIONS",
				searchFields : "LOCATION,DESCRIPTION",
				where: where,
				orderby : null
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
MR.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	var now = new Date();
	
	var fields = [];
	if (self.mbo.isRequired('DESCRIPTION') && !self.DESCRIPTION)
		fields.push(getText('DR.DESCRIPTION', null, 'Description'));
	if (self.mbo.isRequired('PRIORITY') && String.isNullOrEmpty(self.PRIORITY))
		fields.push(getText('MR.PRIORITY', null, 'Priority'));
	if(fields.length>0){
		validated = false;
		self.mbo.message(getText('EMMOF1005W', [fields.join(', ')], 'Missing required fields'));
		return validated;
	}		
	if (!Number.isNumber(self.PRIORITY)){
		validated = false;
		self.mbo.message(getText('EMMOF1004W', [getText('MR.PRIORITY')], 'Priority must be a number'));
	}
	// Return true if the object is valid
	return validated;
};

/* On Change */
MR.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
		WONUM : function(){
        	if(crossovers){
        		self.LOCATION = crossovers.LOCATION;
        	}
        	return true;
        }
    };
    return attributes[attr] ? attributes[attr]() : false;	
};
