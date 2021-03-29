angular.module('emm').factory('wpmaterialService', function(){	
	var options = {
			defaultPageSize: 20,
			viewName : null,
			queryName : null,
			userInfo : null
		};
	
	var PUBLIC = {};

	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	PUBLIC.createNew = function(wo){
		var wpm = new WPMaterial();
		// Create a new in memory wpmaterial and set field defaults
//		alert('site: ' + options.userInfo.siteId);
		wpm.createNew({
			WORKORDERID: wo.WORKORDERID,
			WONUM: wo.WONUM,
			SITEID: wo.SITEID,
			STORELOCSITE: wo.SITEID,
//			SITEID: options.userInfo.siteId,
//			ORGID: options.userInfo.orgId,
			ORGID: wo.ORGID,
			LINETYPE: 'ITEM',
			RESTYPE: 'AUTOMATIC'
		});
		
		// Save to the cache
		wpm.session.cache();
		
		EMMServer.DB.Select()
			.addQuery('WPMATERIAL', wpm.toSql())
			.submit('offline/wpmaterial/wpmaterial.htm', true);
	};
	
	
	PUBLIC.showDetails = function(wpm, message){
		var sql = "SELECT * FROM WPMATERIAL WHERE WPITEMID = '" + wpm.WPITEMID + "'";
		
		EMMServer.DB.Select()
			.addQuery("WPMATERIAL", sql)
			.addMessage(message)
			.submit('offline/wpmaterial/wpmaterial.htm', true);
	};
		
	PUBLIC.actions = {
			saveWPMaterial : function(wpm){				
				// Must call 'getMbo()' on all MBO objects that are being saved to the database
				// This will also run any validation scripts if available
				if (wpm.mbo.toBeSaved()){
					if(wpm.mbo.validate()){
						if(wpm.mbo.isNew()) {
							EMMServer.DB.Insert('WPMATERIAL', 'INSERT')
							.addObject(wpm.getMbo())
							.submit()
							.then(function(result) {
								// Be sure to remove session data
					        	wpm.session.remove();
								EMMServer.DB.Select()
									.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
									.go("offline/wpmaterial/main.htm");
							});
						} else {
							EMMServer.DB.Update('WPMATERIAL', 'UPDATE')
								.addObject(wpm.getMbo(), "WPITEMID='" + wpm.WPITEMID +"'")
								.submit()
								.then(function(result) {
									// Be sure to remove session data
						        	wpm.session.remove();
									EMMServer.DB.Select()
										.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
										.go("offline/wpmaterial/main.htm");
								});
						}
						
					} else {
						alert(wpm.mbo.message());
					}
				}
			}
		};
		
		return PUBLIC;
	});