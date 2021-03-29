angular.module('emm').factory('wplaborService', function(){	
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
		var wpl = new WPLabor();
		// Create a new in memory wplabor and set field defaults
		wpl.createNew({
			WORKORDERID: wo.WORKORDERID,
			WONUM: wo.WONUM,
			SITEID: wo.SITEID,
			ORGID: wo.ORGID
		});
		
		// Save to the cache
		wpl.session.cache();
		
		EMMServer.DB.Select()
			.addQuery('WPLABOR', wpl.toSql())
			.submit('offline/wplabor/wplabor.htm', true);
	};
	
	
	PUBLIC.showDetails = function(wpl, message){
		var sql = "SELECT * FROM WPLABOR WHERE WPLABORUID = '" + wpl.WPLABORUID + "'";
		
		EMMServer.DB.Select()
			.addQuery("WPLABOR", sql)
			.addMessage(message)
			.submit('offline/wplabor/wplabor.htm', true);
	};
		
	PUBLIC.actions = {
			saveWPLabor : function(wpl){				
				// Must call 'getMbo()' on all MBO objects that are being saved to the database
				// This will also run any validation scripts if available
				if (wpl.mbo.toBeSaved()){
					if(wpl.mbo.validate()){
						if(wpl.mbo.isNew()){
							EMMServer.DB.Insert('WPLABOR', 'INSERT')
								.addObject(wpl.getMbo())
								.submit()
								.then(function(result) {
									// Be sure to remove session data
						        	wpl.session.remove();
									EMMServer.DB.Select()
										.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
										.go("offline/wplabor/main.htm");
								});	
						} else {
							EMMServer.DB.Update('WPLABOR', 'UPDATE')
								.addObject(wpl.getMbo(), "WPLABORUID='" + wpl.WPLABORUID + "'")
								.submit()
								.then(function(result) {
									// Be sure to remove session data
						        	wpl.session.remove();
									EMMServer.DB.Select()
										.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
										.go("offline/wplabor/main.htm");
								});
						}
					} else {
						alert(wpl.mbo.message());
					}
				}
			}
		};
		
		return PUBLIC;
	});