angular.module('emm').factory('invBalancesService', function(){
	
	var options = {
		defaultPageSize: 20,
		viewName: null,
		userInfo: null
	};
	
	var PUBLIC = {};
	
	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	PUBLIC.savePhysicalCount = function (invbal) {
		if (invbal) {
			// Get Current Date Time
			var dateTime = new Date();
			var update = EMMServer.DB.MultiUpdate();
			var updateCount = 0;
			
			for (var i=0; i<invbal.length; i++) {
				var invbalances = invbal[i];
				if(invbalances.mbo.toBeSaved()){
					if(invbalances.mbo.validate()) {
						invbalances.PHYSCNTDATE = dateTime;
						update.addUpdateObject("INVBALANCES", "UPDATE_PHYSCNT", invbalances.getMbo(), "INVBALANCESID='" + invbalances.INVBALANCESID + "'");
						updateCount++;
					} else {
						alert(invbalances.mbo.message());
						return;
					}
				}
			}
			if(updateCount > 0){
				for (var i=0; i<invbal.length; i++) {
					invbal[i].session.remove();
				}
				update.submit().then(function(result){
					EMMServer.DB.Select()
						.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
						.go("offline/invbalances/physicalcount.htm");
				});
			}
		}
	};
	
	return PUBLIC;
});