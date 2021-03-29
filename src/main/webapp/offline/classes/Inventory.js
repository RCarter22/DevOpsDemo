//Class constructor
function Inventory (){
	//Class inheritance
	Mbo.apply(this, arguments);
	
	this.setUniqueIdentifier('INVENTORYID');
	
}

Inventory.prototype.lookup = function(attr, options){
	var self = this;
	var attributes = {
		ITEMNUM: function(opt){
			var o = {
					display: "ITEMNUM,DESCRIPTION",
					field: "ITEMNUM",
					source: "ITEMNUM",
					table: "INVENTORY",
					searchFields : "ITENUM,DESCRIPTION",
					where: "1=1",
					orderby: null
			}
			$.extend(o, opt);			
			return new Domain(o);
		},
		VENDOR: function(opt){
			var o = {
					display: "COMPANY,NAME",
					field: "VENDOR",
					source: "COMPANY",
					table: "COMPANIES",
					searchFields : "COMPANY,NAME",
					where: "1=1",
					orderby: null
			}
			$.extend(o, opt);			
			return new Domain(o);
		},
		MANUFACTURER: function(opt){
			var o = {
					display: "COMPANY,NAME",
					field: "MANUFACTURER",
					source: "COMPANY",
					table: "COMPANIES",
					searchFields : "COMPANY,NAME",
					where: "1=1",
					orderby: null
			}
			$.extend(o, opt);
			return new Domain(o);
		},
		STOREROOM: function(opt){
			var o = {
					display: "LOCATION,DESCRIPTION",
					field: "STOREROOM",
					source: "LOCATION",
					table: "STOREROOM",
					searchFields : "LOCATION,DESCRIPTION",
					where: "1=1",
					orderby: null
			}
			$.extend(o, opt);
			return new Domain(o);
		},
		CATEGORY: function(opt){
			var o = {
					display: "VALUE,DESCRIPTION",
					field: "CATEGORY",
					source: "VALUE",
					table: "DOMAIN",
					searchFields : "VALUE,DESCRIPTION",
					where: "DOMAINID = 'CATEGORY'",
					orderby: null
			}
			$.extend(o, opt);
			return new Domain(o);
		},
		
	};
	
	if (attributes[attr]){
		return attributes[attr](options);
	} else if (options != undefined && options != null){
		return new Domain(options);		
	}
	
	return null;
};

Inventory.prototype.validate = function(){
	// Any validation logic goes here.
	var self = this, validated = true;
	
	// Example
	/*
	if (self.WORKTYPE === 'CM'){
		validated = false;
		self.mbo.message('Work Type cannot be CM');
	}
	*/
	
	// Return true if the object is valid
	return validated;
};

