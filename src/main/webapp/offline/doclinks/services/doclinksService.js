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
		if(!options.appName)
			throw Error('Missing app name')
		
		EMMServer.Session.setItem('DOCLINKS_DATA', {
			returnPage : options.returnPage,
			entityName : options.entityName,
			entityId : options.entityId,
			docType : options.docType
		});
		
		EMMServer.DB.Select()
			.addDoclinksQuery("DOCLINKS", options.entityName, options.entityId)
			.addDownloadableDoclinksQuery("DOWNLOADABLE", options.entityName, options.entityId, options.appName)
			.addQuery("APPDOCTYPE", "SELECT * FROM APPDOCTYPE WHERE APP = '" + options.appName + "' ORDER BY DOCTYPE ASC")
			.submit("offline/doclinks/main.htm", true);
	}
	
	PUBLIC.save = function (doclinks){
		if (!doclinks)
			return;
		
		//EMMServer.Attachments.addRequests(doclinks).submit('callback');
		
		EMMServer.Attachments.addRequests(doclinks)
			.submit().then(function(data){
				var requests = data.requests;
				var message = getText('RECORDSAVED', null, 'Record Saved');
				
				if( requests.length > 0)
					message = "Attachment(s) on request";
				
				EMMServer.DB.Select()
					.addMessage(message)
					.go("offline/doclinks/main.htm");
			});
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