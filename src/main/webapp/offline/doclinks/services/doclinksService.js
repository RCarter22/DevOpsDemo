module.factory('doclinksService', function($window){
	
	var options = {
			defaultPageSize: 20,
			viewName : null,
			userInfo : null
		};
	
	var PUBLIC = {};

	PUBLIC.init = function(opt){
		$.extend(options, opt);
	}

	PUBLIC.createNew = function(ownerEntity, ownerEntityId, doctype){
		EMMServer.Attachments.addDoclink(ownerEntity, ownerEntityId, doctype, 'recordSaved');
	}

	PUBLIC.toDoclinks = function(params){
		var options = $.extend({}, params);
		
		if (!options.entityName)
			throw Error('Missing entity name');
		if (!options.entityId)
			throw Error('Missing entity ID');
		if (!options.returnPage)
			throw Error('Missing return page');
		
		EMMServer.Session.setItem('DOCLINKS_DATA', {
			returnPage : options.returnPage,
			entityName : options.entityName,
			entityId : options.entityId
		});
		
		EMMServer.DB.Select()
			.addDoclinksQuery("DOCLINKS", options.entityName, options.entityId)
			.addQuery("APPDOCTYPE", "SELECT * FROM APPDOCTYPE WHERE APP = '" + options.appName + "' ORDER BY DOCTYPE ASC")
			.submit("offline/doclinks/main.htm", true);
	}
	
	PUBLIC.showDetail = function(/*Object*/ doclink){
		EMMServer.Attachments.viewDoclink(doclink);
	}		
	
	// Callback should be declared on the $window
	$window.recordSaved = function(result) {
		EMMServer.DB.Select()
			.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
			.go("offline/doclinks/main.htm");
	};
	
	return PUBLIC;
});	