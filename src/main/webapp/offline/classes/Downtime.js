// Class constructor
function Downtime (){
	// Class inheritance
    Mbo.apply(this, arguments);    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('DOWNTIMEID');
}

Downtime.prototype.createNew = function(obj)
{		
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);		
};

/*Is Read Only*/
Downtime.prototype.isReadOnly = function(attr){
    var self = this;
    var attributes = {
		ASSETNUM : function(){
			return true;
		},
		ISRUNNING : function(){
			return true;
		}
    };
    return attributes[attr] ? attributes[attr]() : false;
};

/*Is Required*/
Downtime.prototype.isRequired = function(attr){
    var self = this;
    var attributes = {
    	STATUSCHANGEDATE : function(){
    		if(self.STARTDATE){
    			return false;
    		}else{
    			return true;
    		}
    	},
	    STARTDATE : function(){
			if(self.STATUSCHANGEDATE){
				return false;
			}else{
				return true;
			}
		},
		ENDDATE : function(){
			if(self.STATUSCHANGEDATE){
				return false;
			}else{
				return true;
			}
		},
		DOWNTIME : function(){
			if(self.STATUSCHANGEDATE){
				return false;
			}else{
				return true;
			}
		}
    };
    return attributes[attr] ? attributes[attr]() : false;
};

Downtime.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		STATUSCHANGECODE : function(opt){
			var o = {
				field : "STATUSCHANGECODE",
				source : "VALUE",
				table : "DOMAIN",
				searchFields : "VALUE,DESCRIPTION",
				where : "DOMAINID = 'DOWNCODE'",
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

Downtime.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	/*if(String.isNullOrEmpty(self.STARTDATE) && self.mbo.isRequired('STARTDATE')){
		validated = false;
		self.mbo.message(self.STARTDATE + " is Required");
	}
	if(String.isNullOrEmpty(self.ENDDATE) && self.mbo.isRequired('ENDDATE')){
		validated = false;
		self.mbo.message(self.ENDDATE + " is Required");
	}*/
	
	if(String.isNullOrEmpty(self.DOWNTIME) && self.mbo.isRequired('DOWNTIME')){
		validated = false;
		self.mbo.message("Downtime is Required");
	}
	//check for Change Status validation
	if(String.isNullOrEmpty(self.STATUSCHANGEDATE) && self.mbo.isRequired('STATUSCHANGEDATE')){		
		validated = false;
		self.mbo.message("Status Change Date is Required");
	}	
	if (self.mbo._mostRecent && self.STATUSCHANGEDATE && (self.mbo._mostRecent.CHANGEDATE > new Date(self.STATUSCHANGEDATE).getTime()) ){
		validated = false;
		self.STATUSCHANGEDATE = null;
		self.mbo.message("New asset status change date must be greater than change dates on all previous transactions for this asset.");		
	}
	if(String.isNullOrEmpty(self.STARTDATE) && self.mbo.isRequired('STARTDATE')){
		//check if it's the report downtime		
		validated = false;
		self.mbo.message("Start Date is Required");
	}
	if(String.isNullOrEmpty(self.ENDDATE) && self.mbo.isRequired('ENDDATE')){
		//check if it's the report downtime		
		validated = false;
		self.mbo.message("End Date is Required");
	}
	if(self.mbo._mostRecent && (self.mbo._mostRecent.ENDDATE > new Date(parseInt(self.STARTDATE)).getTime())){
		validated = false;
		self.mbo.message("Start Date starts before previous reported downtime");
	}
	//if (!String.isNullOrEmpty(self.STARTDATE) && !String.isNullOrEmpty(self.ENDDATE) && self.STARTDATE.toDate().isAfter(self.ENDDATE.toDate())){
	/*if (!String.isNullOrEmpty(self.STARTDATE) && !String.isNullOrEmpty(self.ENDDATE) && ( self.STARTDATE > new Date(parseInt(self.ENDDATE)).getTime())){
		self.ENDDATE = null;
		validated = false;
		self.mbo.message("End date must be after start date");
	}*/
	// Return true if the object is valid
	return validated;
};

Downtime.prototype.onChange = function(attr, crossovers){
    var self = this;
    var attributes = {
        STARTDATE : function(){
        	if (self.STARTDATE && self.ENDDATE && (new Date(self.STARTDATE).getTime() > new Date(self.ENDDATE).getTime()) ){ 
        		self.STARTDATE = null;
        		var start = getText('WORKORDER.STARTDATE', null, 'Start Date');
        		var finish = getText('WORKORDER.ENDDATE', null, 'End Date');
        		var msg = getText('EMMGB1012I', [start, finish], 'Start Date must occur before End Date');
        		alert(msg);
        	}
        	return true;
        },
        ENDDATE : function(){
        	if (self.STARTDATE && self.ENDDATE && (new Date(self.ENDDATE).getTime() < new Date(self.STARTDATE).getTime())){
        		self.ENDDATE = null;
        		var start = getText('WORKORDER.STARTDATE', null, 'Start Date');
        		var finish = getText('WORKORDER.ENDDATE', null, 'End Date');
        		var msg = getText('EMMGB1013I', [finish, start], 'End Date must occur after Start Date');
        		alert(msg);
        	}
        	return true;        	
        }
    };
    return attributes[attr] ? attributes[attr]() : false;	
};