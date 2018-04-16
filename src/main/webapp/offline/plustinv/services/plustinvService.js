angular.module('emm').factory('plustinvService', function() {
	
	var options = {
		defaultPageSize: 20,
		viewName: null,
		userInfo: null
	};
	
	var PUBLIC = {};
	
	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	
	PUBLIC.toList = function(storeroom, message){
		var sql = "SELECT INV.*, " + 
			" (SELECT SUM(INVB.CURBAL) FROM INVBALANCES INVB WHERE INVB.SITEID = INV.SITEID AND INVB.ITEMSETID = INV.ITEMSETID AND INVB.ITEMNUM = INV.ITEMNUM AND INVB.LOCATION = INV.LOCATION) AS TOTALINVBAL," +
			" (SELECT SUM(INVB.PHYSCNT) FROM INVBALANCES INVB WHERE INVB.SITEID = INV.SITEID AND INVB.ITEMSETID = INV.ITEMSETID AND INVB.ITEMNUM = INV.ITEMNUM AND INVB.LOCATION = INV.LOCATION) AS TOTALINVPHYBAL" +
			" FROM INVENTORY INV" + 
			" WHERE INV.STATUS = 'ACTIVE' AND INV.LOCATION IN (SELECT DEFSTOREROOM FROM MAXUSER WHERE INV.SITEID = '" + options.userInfo.siteId + "')";
		var select = EMMServer.DB.Select()
    	 	.addQuery("INVENTORY", sql, 1, options.defaultPageSize)
    	 	.addQuery("STOREROOM", "SELECT '" + storeroom + "' AS STOREROOM", 1, options.defaultPageSize);
		
		if (message){	
			select.addMessage(message);
		}
		if(EMMServer.Session.getItem('mode') == 'cyclecount'){
			select.submit("offline/plustinv/cyclecountlist.htm", true);
		}
		else{
			select.submit("offline/plustinv/list.htm", true);
		}		

	};
	
	PUBLIC.setMode = function(mode){
		EMMServer.Session.setItem('mode',mode);
	};
	
	PUBLIC.getMode = function(){
		return 	EMMServer.Session.getItem('mode');
	};
	
	PUBLIC.setHide = function(yes){
		EMMServer.Session.setItem('hideList', yes);
	};
	
	PUBLIC.getHide = function(){
		return EMMServer.Session.getItem('hideList');
	};

	PUBLIC.toSearchList = function(searchValue, storeroom, goBack, saved){
		
		if(EMMServer.Session.getItem('mode') == 'cyclecount'){
			var viewName = "offline/plustinv/cyclecountlist.htm";
		}
		else{
			var viewName = "offline/plustinv/list.htm";
		}
		
		
		var sql = "SELECT INV.*, " + 
			" (SELECT SUM(INVB.CURBAL) FROM INVBALANCES INVB WHERE INVB.SITEID = INV.SITEID AND INVB.ITEMSETID = INV.ITEMSETID AND INVB.ITEMNUM = INV.ITEMNUM AND INVB.LOCATION = INV.LOCATION) AS TOTALINVBAL," +
			" (SELECT SUM(INVB.PHYSCNT) FROM INVBALANCES INVB WHERE INVB.SITEID = INV.SITEID AND INVB.ITEMSETID = INV.ITEMSETID AND INVB.ITEMNUM = INV.ITEMNUM AND INVB.LOCATION = INV.LOCATION) AS TOTALINVPHYBAL" +
			" FROM INVENTORY INV" + 
			" WHERE INV.STATUS = 'ACTIVE' AND INV.LOCATION IN (SELECT DEFSTOREROOM FROM MAXUSER WHERE USERID= '" + options.userInfo.personId + "') AND INV.SITEID ='CORP'";
		
		if(storeroom){
			sql += " AND INV.LOCATION = '" + storeroom + "'";
		}
		
		if(goBack){
			if(saved){
				var select = EMMServer.DB.Select();
				select.addMessage(getText('RECORDSAVED', null, 'Record Saved'));
				select.go(viewName);
				return;
			}
			else{
				if (EMMServer.DB.Select().getQuery(viewName)){
					var select = EMMServer.DB.Select();
					select.go(viewName);
				}
				else {
					var select = EMMServer.DB.Select().addQuery("INVENTORY", sql, 1, options.defaultPageSize);
					if(storeroom){
						select.addQuery("STOREROOM", "SELECT '" + storeroom + "' AS STOREROOM")
					}
					select.submit(viewName, true);
    	 			    	 			
				}
				return;
			}
		}
		
		if(searchValue && (typeof searchValue) === 'string'){
			if(sql.toUpperCase().indexOf("WHERE") > 0)
				sql += " AND (INV.ITEMNUM LIKE '%" + searchValue + "%' OR INV.DESCRIPTION LIKE '%" + searchValue + "%' OR INV.BINNUM LIKE '%" + searchValue + "%')"; 
			else
				sql += " WHERE (INV.ITEMNUM LIKE '%" + searchValue + "%' OR INV.DESCRIPTION LIKE '%" + searchValue + "%' OR INV.BINNUM LIKE '%" + searchValue + "%')"; 
		}
		
		var select = EMMServer.DB.Select().addQuery("INVENTORY", sql, 1, options.defaultPageSize);
		if(storeroom){
			select.addQuery("STOREROOM", "SELECT '" + storeroom + "' AS STOREROOM")
		}				
		select.submit(viewName, true);		
	};
	
	
	PUBLIC.toStorerooms = function(){
		EMMServer.DB.Select()
			.addQuery("STOREROOMS", "SELECT * FROM STOREROOM WHERE SITEID='" + options.userInfo.siteId + "'", options.defaultPageSize)
			.submit("offline/plustinv/main.htm", true);
	};
	
	PUBLIC.showDetails = function(inv, messages){

		if (EMMServer.Session.getItem('mode') == 'cyclecount'){
			EMMServer.DB.Select()
				.addQuery("INVENTORY", inv.toSql())
				.addQuery("CURBAL", "SELECT SUM(CURBAL) AS CURBAL FROM INVBALANCES WHERE ITEMNUM = '" + inv.ITEMNUM + "' AND SITEID = '" + options.userInfo.siteId + "' AND LOCATION = '" + inv.LOCATION + "'")
				.addQuery("INVBALANCES", "SELECT INVB.* FROM INVBALANCES INVB WHERE INVB.SITEID = '" + options.userInfo.siteId + "' AND INVB.ITEMNUM = '" + inv.ITEMNUM + "' AND INVB.LOCATION = '" + inv.LOCATION + "'")
				.addMessage(messages)
			    .submit("offline/plustinv/cyclecountview.htm", true);
		}else{
			EMMServer.DB.Select()
				.addQuery("INVENTORY", inv.toSql())
				.addQuery("CURBAL", "SELECT SUM(CURBAL) AS CURBAL FROM INVBALANCES WHERE ITEMNUM = '" + inv.ITEMNUM + "' AND SITEID = '" + options.userInfo.siteId + "' AND LOCATION = '" + inv.LOCATION + "'")
				.addQuery("INVBALANCES", "SELECT INVB.* FROM INVBALANCES INVB WHERE INVB.SITEID = '" + options.userInfo.siteId + "' AND INVB.ITEMNUM = '" + inv.ITEMNUM + "' AND INVB.LOCATION = '" + inv.LOCATION + "'")
				.addMessage(messages)
			    .submit("offline/plustinv/view.htm", true);
		}
	};
	
	PUBLIC.listBack = function(){
		EMMServer.DB.Select().submit("offline/plustinv/main.htm",true);
	};
	
	
	PUBLIC.actions = {
		toPhysicalCount: function(inv){
			var sql;
			if ($.isArray(inv)){
				sql = "SELECT INVB.* FROM INVBALANCES INVB " + 
					"INNER JOIN INVENTORY INV ON INVB.SITEID = INV.SITEID AND INVB.ITEMNUM = INV.ITEMNUM AND INVB.ITEMSETID = INV.ITEMSETID AND INVB.LOCATION = INV.LOCATION " + 
					"WHERE INV.INVENTORYID IN ('" + inv.join("','") + "')";						
			} else {
				sql = "SELECT * FROM INVBALANCES WHERE SITEID = '" + options.userInfo.siteId + "' AND ITEMNUM = '" + inv.ITEMNUM + "' AND LOCATION = '" + inv.LOCATION + "'";
			}	
			EMMServer.Session.setItem("PHYSCNT_DATA", {
				returnPage: options.viewName
			});			
			EMMServer.DB.Select()
				.addQuery("INVBALANCES", sql)
				.submit("offline/invbalances/physicalcount.htm", true);			
		},
		/*
		 * This function is implemented by Mi Zhang, 
		 * Save the Invbalance in the cyclecountview.htm page. 
		 *  
		 * */
		toSaveInvbalance : function(inventory, invbal){
			
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
						PUBLIC.toSearchList('', inventory.LOCATION, true, true);
					});
				}
				// test
			}
		}
	
	};
	
	return PUBLIC;
	
});