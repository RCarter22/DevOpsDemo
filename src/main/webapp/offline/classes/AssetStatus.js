// Class constructor
function AssetStatus (){
	// Class inheritance
    Mbo.apply(this, arguments);    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('ASSETSTATUSID');
}

AssetStatus.prototype.createNew = function(obj)
{		
	// Set flags
	this.mbo.toBeSaved(true);
	this.mbo.isNew(true);
	
	// Combine these default fields with the data being passed in
	// The data passed in will overwrite any default values
	this.setDefaultValues(obj);		
};