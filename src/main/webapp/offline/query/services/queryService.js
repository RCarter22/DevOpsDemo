angular.module('emm').factory('queryService', function($injector){
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
	
	PUBLIC.myQueries = function(appName){
		EMMServer.Session.setItem("QUERY_INFO",{
			viewName : options.viewName
		});
		var query = "SELECT * FROM QUERY WHERE APP = '" + appName + "' AND OWNER = '" + options.userInfo.userId + "'";
		EMMServer.DB.Select()
		.addQuery("QUERY",query)
		.submit("offline/query/list.htm", true);
	}
	PUBLIC.allQueries = function(appName){
		EMMServer.Session.setItem("QUERY_INFO",{
			viewName : options.viewName
		});
		var query = "SELECT * FROM QUERY WHERE APP = '" + appName + "'";
		EMMServer.DB.Select()
		.addQuery("QUERY",query)
		.submit("offline/query/list.htm", true);
	}
	PUBLIC.toList = function(query){
		//Iterate through all services injected into the emm module (IE angular & custom services)
		var notFound = true;
		if(query.OFFLINEREADY === 'Y'){
			angular.forEach(angular.module('emm')._invokeQueue, function(service) {
				if(service[0] && service [1] && service[0] == "$provide" && service[1] == "factory"){
					try{
						if($injector.get(service[2][0]).getOptions().appName == query.APP){
							$injector.get(service[2][0]).useSavedQuery(query.CLAUSE);
							notFound = false;
							return;
						}
					}catch(e){
						
					}
				}
			});
			if(notFound)
				alert("The " + query.APP + " Application is not configured for offline result sets");
		}
		else{
			alert("This result set has not been setup for offline use. Please contact your administrator for assistance");
		}
		
		
		
			
	};
	return PUBLIC;
});