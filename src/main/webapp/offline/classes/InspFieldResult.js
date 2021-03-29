function InspFieldResult(data){

	// Class inheritance
    Mbo.apply(this, arguments);    
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('INSPFIELDRESULTID');    
    this.mbo.toBeSaved(false);
}


InspFieldResult.prototype.createNew = function(obj)
{	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
};

InspFieldResult.prototype.Format = function()
{	
	//Parse for Input as number type
	if (this.NUMRESPONSE) {
		this.NUMRESPONSE = parseFloat(this.NUMRESPONSE);
	}

	if (this.SIGNATURE!= null && this.SIGNATURE != "") {
		var data = this.SIGNATURE;
		if (data.indexOf("data:image") != 0 )
			this.SIGNATURE = "data:{0};base64, {1}".format('image/png', data);
	} 
	if (this.ROLLOVERFLAG = 1) 
		this.ROLLOVERFLAG = true;
};



