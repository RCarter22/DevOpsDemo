//Class constructor
function StartCenter (){
	// Class inheritance
	Mbo.apply(this, arguments);
	
	this.setUniqueIdentifier('SCCONFIGID');
}

StartCenter.prototype.getRelationship = function(relationshipName){		
	//TDOD create Relationship object
	var Relationships = {
			PORTLET : function(){
				return {
					tableName : 'PORTLET',
					className : 'Portlet',
					relationshipName : 'PORTLET',
					where : "SCCONFIGID = :SCCONFIGID ORDER BY ORDERNUM ASC",
				};
			},
	}
	
	return Relationships[relationshipName] ? Relationships[relationshipName]() : null;
	
}