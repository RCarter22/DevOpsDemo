function InspectionResult(data){

	// Class inheritance
    Mbo.apply(this, arguments);    
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('INSPECTIONRESULTID'); 
 
}

// Unscheduled Inspection
InspectionResult.prototype.createNew = function(obj)
{	
	if((obj && (!obj.ISADVANCED || obj.ISADVANCED != '1')) || !obj){
		var now = new Date();
		
		// Set Default Values
		this.STATUS = 'PENDING';
		this.CREATEDATE = now;
	}
	
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);
};

