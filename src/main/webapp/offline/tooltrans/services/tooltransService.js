angular.module('emm').factory('tooltransService', function(){
	
	var options = {
			defaultPageSize: 20,
			viewName : null,
			userInfo : null
		};
	
	var PUBLIC = {};

	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};

	PUBLIC.createNew = function(wo){
		var tt = new ToolTrans();
		// Create a new in memory tooltrans and set field defaults
		tt.createNew({
			WORKORDERID: wo.WORKORDERID,
			WONUM: wo.WONUM,
			SITEID: wo.SITEID,
			ORGID: wo.ORGID,
			LOCATION: wo.LOCATION,
			ASSETNUM: wo.ASSETNUM
		});
		
		// Save to the cache
		tt.session.cache();
		
		EMMServer.DB.Select()
			.addQuery("TOOLTRANS", tt.toSql())
			.submit("offline/tooltrans/tooltrans.htm", true);
	};
	
	PUBLIC.showDetails = function(tt) {
		tt.session.cache();
		
		var extraSql = "SELECT T.DESCRIPTION FROM TOOLTRANS TT INNER JOIN TOOLITEM T ON TT.ITEMNUM = T.ITEMNUM";
		
		EMMServer.DB.Select()
			.addQuery("TOOLTRANS", tt.toSql())
			.addQuery("EXTRA", extraSql)
			.submit("offline/tooltrans/tooltrans.htm", true);
	};
	
	PUBLIC.actions = {
			saveToolTrans : function(tt){
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			if (tt.mbo.toBeSaved()){
				if (tt.mbo.validate()){
					EMMServer.DB.Insert('TOOLTRANS', 'INSERT')
					.addObject(tt.getMbo())
					.submit()
					.then(function(result) {
						// Be sure to remove session data
			        	tt.session.remove();
						EMMServer.DB.Select()
							.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
							.go("offline/tooltrans/main.htm");
					});
				} else {
					alert(tt.mbo.message());					
				}
			}	
		}
	}
	
	return PUBLIC;
});	