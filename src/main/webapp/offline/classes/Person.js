//Class constructor
function Person (){
	// Class inheritance
	Mbo.apply(this, arguments);
	
	this.setUniqueIdentifier('PERSONID');
	
    // You can extend certain properties such as 'mbo' using the extend() function
    this.mbo.extend({
    	_isSelected : false,
    	isSelected : function(val){
            if (typeof(val) === 'boolean')
                this._isSelected = val;
            else
                return this._isSelected;  
    	}
    });	
}
