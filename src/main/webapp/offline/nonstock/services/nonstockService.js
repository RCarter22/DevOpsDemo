angular.module('emm').factory('nonstockService', function(){	
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
	
	
	PUBLIC.showDetails = function(srv, message){
		var sql = "SELECT * FROM SERVRECTRANS WHERE ASSETNUM = '" + srv.ASSETNUM + "'";
		
		EMMServer.DB.Select()
			.addQuery("SERVRECTRANS", sql)
			.addMessage(message)
			.submit('offline/nonstock/nonstock.htm', true);
	};
		
		return PUBLIC;
});