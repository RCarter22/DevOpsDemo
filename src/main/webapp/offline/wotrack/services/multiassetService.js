angular.module('emm').factory('multiassetService', function(){
	var options = {
			defaultPageSize: 20,
			viewName : null,
			userInfo:null
	}

	var PUBLIC ={};

	PUBLIC.init = function(opt){
		$.extend(options, opt);
	}

	PUBLIC.showDetail  = function(asset){
		var sql = "SELECT * FROM MULTIASSETLOCCI WHERE MULTIID='" + asset.MULTIID + "'";
		var extraSql = "SELECT ASSET.DESCRIPTION AS ASSETDESC, LOC.DESCRIPTION AS LOCDESC " + 
			"FROM MULTIASSETLOCCI MUL " +  
			"LEFT OUTER JOIN ASSET ASSET ON MUL.ASSETNUM = ASSET.ASSETNUM AND MUL.SITEID = ASSET.SITEID " + 
			"LEFT OUTER JOIN LOCATIONS LOC ON MUL.LOCATION = LOC.LOCATION AND MUL.SITEID = LOC.SITEID " + 
			"WHERE MUL.MULTIID = '" + asset.MULTIID + "'";
		
		EMMServer.DB.Select()
			.addQuery("ROUTE", sql)
			.addQuery("EXTRA", extraSql)
			.submit("offline/wotrack/multiasset.htm", true);
	}

	PUBLIC.actions = {
		saveMultiAssetLocCi : function(asset){
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			if (asset.mbo.toBeSaved()){
				if (asset.mbo.validate()){
					if (asset.mbo.isNew()){
						EMMServer.DB.Insert("MULTIASSETLOCCI", "INSERT")
							.addObject(asset.getMbo())
							.submit()
							.then(function(result){
								// Be sure to remove session data
								asset.session.remove();
								asset.mbo.isNew(false);
								EMMServer.DB.Select()
									.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
									.go("offline/wotrack/multiassetlist.htm");
							});
					} else {
						//temporary bug fix:
						//need to add a unique value for the transaction
						//var jsonObj = asset.getMbo();
						//jsonObj._TXNID = new Date().getTime();
						EMMServer.DB.Update("MULTIASSETLOCCI", "EDIT")
							.addObject(asset.getMbo(), "MULTIID='" + asset.MULTIID + "'")
							.submit()
							.then(function(result){
								asset.session.remove();
								EMMServer.DB.Select()
									.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
									.go("offline/wotrack/multiassetlist.htm");
						});						
					}	
				} else 
					alert(asset.mbo.message());											
			}
		},
		markProgress : function(asset){			
			asset.PROGRESS = asset.PROGRESS == "0" ? "1" : "0";
			
			//temporary bug fix:
			//need to add a unique value for the transaction
			//var jsonObj = asset.getMbo();
			//jsonObj._TXNID = new Date().getTime();

			EMMServer.DB.Update("MULTIASSETLOCCI", "EDIT_PRG")
			.addObject(asset.getMbo(), "MULTIID='" + asset.MULTIID + "'")
			.submit()
			.then(function(result){
				asset.session.remove();
				EMMServer.DB.Select()
					.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
					.go("offline/wotrack/multiassetlist.htm");
			});			
		},
		createNew : function(parentMbo){
			var multiasset = new MultiAssetLocCi();
			multiasset.mbo.appName(parentMbo.mbo.appName());

			multiasset.createNew({
				SITEID: parentMbo.SITEID,
				ORGID: parentMbo.ORGID,
				WORKORDERID: parentMbo.WORKORDERID
			});
			
			// Save to the cache
			multiasset.session.cache();
			
			EMMServer.DB.Select()
				.addQuery("ROUTE", multiasset.toSql())
				.addQuery("EXTRA", "")
				.submit("offline/wotrack/multiasset.htm", true);
		}	
	};
	
	return PUBLIC;
});