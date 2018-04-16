angular.module('emm').factory('startCenterService', function($injector){
	var PUBLIC = {};
	var options = {
			defaultPageSize: 20,
			viewName : null,
			queryName : null,
			userInfo : null
		};
	
	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	
	PUBLIC.goToPortlet = function(portlet){
		//Iterate through all services injected into the emm module (IE angular & custom services)
		var notFound = true;
		if(portlet.OFFLINEREADY === 'Y'){
			angular.forEach(angular.module('emm')._invokeQueue, function(service) {
				if(service[0] && service [1] && service[0] == "$provide" && service[1] == "factory"){
					try{
						var serviceCall = service[2][0];
						if($injector.get(serviceCall).getOptions().appName == portlet.QUERYAPP){
							$injector.get(serviceCall).useSavedQuery(portlet.CLAUSE);
							notFound = false;
							return;
						}
					}catch(e){
						
					}
				}
			});
			//TODO Localize message and utilize emm.util.alert to drive alert based messages
			if(notFound)
				alert("The " + portlet.QUERYAPP + " Application is not configured for offline result sets.");	
		}else{
			//TODO Localize message and utilize emm.util.alert to drive alert based messages
			alert("This result set has not been setup for offline use. Please contact your administrator for assistance.");
		}		
	};
	PUBLIC.selectStartCenter = function(selectedstartcenter){
		/*EMMServer.Session.setItem("SELECTEDSC",selectedstartcenter.mbo.getUniqueIDValue());
		var scope = angular.element(document.querySelector('[ng-app]')).scope();
		scope.startcenter = scope.startCenters.getMboByUniqueID(selectedstartcenter.mbo.getUniqueIDValue());*/
		EMMServer.Session.setItem("SELECTEDSC", selectedstartcenter.SCCONFIGID);
		EMMServer.DB.Select()
			.addQuery("STARTCENTER", "SELECT * FROM STARTCENTER ORDER BY DESCRIPTION ASC")
			.addQuery("PORTLET", "SELECT * FROM PORTLET WHERE SCCONFIGID = '" + selectedstartcenter.SCCONFIGID + "'  ORDER BY ORDERNUM ASC")
			.submit("offline/login/default.htm",true);
	}
	PUBLIC.goToTemplate = function(sc){
		EMMServer.Session.setItem("SELECTEDSC",sc.SCCONFIGID);
		EMMServer.DB.Select()
		.addQuery("STARTCENTERS","SELECT * FROM STARTCENTER")
		.addQuery("PORTLETS","SELECT * FROM PORTLET WHERE SCCONFIGID = '" + sc.SCCONFIGID + "' ORDER BY DESCRIPTION")
		.submit("offline/startcenter/index.htm",true);
	};
	PUBLIC.helper = {
		getStartCenter : function(startCenters){
			/*//Finds the last selected SC
			var startcenterMbo = null;
			if(EMMServer.Session.getItem("SELECTEDSC")){
				 startcenterMbo = startCenters.getMboByUniqueID(EMMServer.Session.getItem("SELECTEDSC"));
				if(startcenterMbo)
					return startcenterMbo;
			}
			//If We don't have a selected start center than search if there is a default startcenter template
			startCenters.setQbe("ISDEFAULT", "=1");
			startCenters.reset();
			startcenterMbo = startCenters.getMbo(0);
			if(startcenterMbo){
				startCenters.resetQbe();
				startCenters.reset();
				return startcenterMbo;
			}
			startCenters.resetQbe();
			startCenters.reset();
			startcenterMbo = startCenters.getMbo(0);
			if(startcenterMbo)
				return startcenterMbo;
			return null;*/
			if(startCenters && startCenters.length > 0){
				if(EMMServer.Session.getItem("SELECTEDSC")){
					for(var i = 0; i < startCenters.length; i++){
						if(EMMServer.Session.getItem("SELECTEDSC") == startCenters[i].SCCONFIGID)
							return startCenters[i];
					}
				}
				else{
					for(var i = 0; i < startCenters.length; i++){
						if(startCenters[i].ISDEFAULT == '1')
							return startCenters[i];
					}
					return startCenters[0];
				}
			}
			return null;
		},
		getPortletCount : function(portlet){
			if(portlet.OFFLINEREADY == 'Y'){
				var portletSet = EMMServer.Mbo.getMboSet(portlet.TABLENAME,'Mbo',portlet.LAYOUTID);
				portletSet.setWhere(portlet.CLAUSE);
				portletSet.reset();
				return portletSet.count();
			}
			return 0;
		}
	};
	return PUBLIC;
	
});