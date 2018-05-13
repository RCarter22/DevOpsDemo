angular.module('emm').factory('worklogService', function(){
	
	var options = {
			defaultPageSize: 20,
			viewName : null,
			userInfo : null
		};
	
	var PUBLIC = {};

	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	PUBLIC.createNew = function(parentMbo){
		var wl = new WorkLog();
		// *Important* to set app name
		wl.mbo.appName(parentMbo.mbo.appName());
		
		var defaultData = {
				CREATEBY: options.userInfo.personId,	
				SITEID: options.userInfo.siteId,
				ORGID: options.userInfo.orgId		
			};

		if (parentMbo.mbo.appName() === 'WOTRACK' || parentMbo.mbo.appName() === 'PLUSTWO' || parentMbo.mbo.appName() === 'PLUSPWO'){
			defaultData.WORKORDERID = parentMbo.WORKORDERID;
			defaultData.WONUM = parentMbo.WONUM;
		} else if (parentMbo.mbo.appName() === 'SR' || parentMbo.mbo.appName() === 'PLUSPSR'){
			defaultData.TICKETUID = parentMbo.TICKETUID;
			defaultData.TICKETID = parentMbo.TICKETID;
		}
		
		// Create a new in memory worklog and set field defaults
		wl.createNew(defaultData);
		
		// Save to the cache
		wl.session.cache();
		
		EMMServer.DB.Select()
			.addQuery("WORKLOG", wl.toSql())
			.submit("offline/worklog/worklog.htm", true);
	};
	
	PUBLIC.showDetails = function(wl){
		wl.session.cache();
		
		EMMServer.DB.Select()
			.addQuery("WORKLOG", wl.toSql())
			.submit("offline/worklog/worklog.htm");
	};	
	
	PUBLIC.actions = {
		saveWorkLog : function(wl){
			var entityName = null, actionName = null;			
			
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			if (wl.mbo.toBeSaved()){
				if(wl.mbo.validate()){
					var entityName = 'WORKLOG';
					if(wl.mbo.appName() === 'WOTRACK' || wl.mbo.appName() === 'PLUSTWO' || wl.mbo.appName() === 'PLUSPWO'){
						actionName = 'INSERT';
					} else if(wl.mbo.appName() === 'SR' || wl.mbo.appName() === 'PLUSPSR'){
						actionName = 'INSERTSR';
					}
					EMMServer.DB.Insert(entityName, actionName)
						.addObject(wl.getMbo())
						.submit()
						.then(function(result) {
							// Be sure to remove session data
				        	wl.session.remove();
							EMMServer.DB.Select()
								.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
								.go("offline/worklog/main.htm");
						});
				} else {
					alert(wl.mbo.message());
				}
			}
		}
	};
	
	return PUBLIC;
});