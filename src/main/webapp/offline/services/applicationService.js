angular.module('emm').factory('applicationService', function(){
	var PUBLIC = {};
	
	var options = {
			userInfo : EMMServer.DB.getUserInfo()
		};
	
	PUBLIC.init = function(opt){
		$.extend(options, opt);
	}
	PUBLIC.goToStartCenter = function(){
		/*EMMServer.DB.Select()
		.addQuery("DUMMY", "SELECT 1")
		.submit("offline/login/default.htm", true);*/
		if(EMMServer.Session.getItem("SELECTEDSC")){
			var selectedStartCenterID = EMMServer.Session.getItem("SELECTEDSC");
			EMMServer.DB.Select()
				.addQuery("STARTCENTER", "SELECT * FROM STARTCENTER ORDER BY DESCRIPTION ASC")
				.addQuery("PORTLET", "SELECT * FROM PORTLET WHERE SCCONFIGID = '" + selectedStartCenterID + "'  ORDER BY ORDERNUM ASC")
				.submit("offline/login/default.htm",true);
		}
		else{
			if(options.userInfo.nativeAppSettings.offlineStartCenterEnabled && options.userInfo.nativeAppSettings.sqliteEnabled){
				EMMServer.DB.Select()
					.addQuery("STARTCENTER","SELECT * FROM STARTCENTER ORDER BY DESCRIPTION")
					.addQuery("PORTLET","SELECT * FROM PORTLET WHERE SCCONFIGID IN (SELECT SCCONFIGID FROM STARTCENTER WHERE ISDEFAULT = '1') ORDER BY ORDERNUM ASC")
					.submit("offline/login/default.htm",true);
			}
			else{
				EMMServer.DB.Select()
					.addQuery("DUMMY", "SELECT 1")
					.submit("offline/login/index.htm", true);
			}
		}
			
	}
	PUBLIC.appGranted = function(appName){
		if (!appName)
			throw Error('Invalid application name');
		if (!options.userInfo)
			throw Error('User Info is null or empty');
		
		if($.inArray(appName.toUpperCase(), options.userInfo.apps) > -1)
			return true;

		return false;
	}
	
	PUBLIC.goToApp = function(appName){
		EMMServer.Session.clear();
		if (PUBLIC.appGranted(appName) && apps.hasOwnProperty(appName)){
			apps[appName]();
		}
	}
	
	PUBLIC.getMenuApps = function(){		
		var prv, applen = supportedApps.length, len=0, authorizedApps = [];
		$.each(supportedApps, function(){
			len++;
			if (PUBLIC.appGranted(this[0].toUpperCase())){
				prv = this[0];					
				authorizedApps.push({type:'APP', app:this[0].toUpperCase(), title: this[1], imageName: this[2]});
			} else if (this[0] == 'DIVIDER' && prv != 'DIVIDER' && len != applen) {
				prv = this[0];
				authorizedApps.push({type:'DIVIDER', title:(this[1] || '')});
			}
		});
		
		return authorizedApps;
	}		
	
	/* Offline Supported Apps */
	var supportedApps = [						
		         		['ASSET',getText('EZMAXMOBILE.ASSET', null, 'Asset'),'asset.png'],
						['PLUSTASSET',getText('EZMAXMOBILE.PLUSTASSET', null, 'Asset (Tr)'),'asset.png'],
						['PLUSPASSET',getText('EZMAXMOBILE.PLUSPASSET', null, 'Asset (SP)'),'asset.png'],
		         		['DIVIDER'],
		         		['INVENTOR',getText('EZMAXMOBILE.INVENTOR', null, 'Inventory'),'inventory.png'],
						['PLUSTINV',getText('EZMAXMOBILE.PLUSTINV', null, 'Inventory (Tr)'),'inventory.png'],
						['INVISSUE',getText('EZMAXMOBILE.INVISSUE', null, 'Issues and Transfers'),'transfer.png'],
		         		['DIVIDER'],
		         		['WOTRACK',getText('EZMAXMOBILE.WOTRACK', null, 'Work Order Tracking'),'wos.png'],
						['PLUSTWO',getText('EZMAXMOBILE.PLUSTWO', null, 'Work Order Tracking (Tr)'),'wos.png'],
						['PLUSPWO',getText('EZMAXMOBILE.PLUSPWO', null, 'Work Order Tracking (SP)'),'wos.png'],
		         		//['SR',getText('EZMAXMOBILE.SR', null, 'Service Request'),'sr.png'],
						//['PLUSPSR',getText('EZMAXMOBILE.PLUSPSR', null, 'Service Request (SP)'),'sr.png'],
		         		['LABREP',getText('EZMAXMOBILE.LABREP', null, 'Labor Reporting'), 'labor.png'],
		         		['PLUSTLRP',getText('EZMAXMOBILE.PLUSTLRP', null, 'Labor Reporting (Tr)'), 'labor.png'],
		         		//['DIVIDER'],
		         		//['CREATEDR',getText('EZMAXMOBILE.CREATEDR', null, 'Create Requisition'),'purchase.png'],
		         		//['VIEWDR',getText('EZMAXMOBILE.VIEWDR', null, 'View Requisitions'),'purchase.png'],
		         		];
	
	// App names should match that provided by the server
	var apps = {
		WOTRACK: function(){
			EMMServer.DB.Select()
				.addQuery("WORKORDER", "SELECT COUNT(*) AS WOTOTAL FROM WORKORDER WHERE ISTASK='0'")
				.addQuery("ACTIVEWORKORDER","SELECT * FROM WORKORDER W LEFT OUTER JOIN LABTRANS LT ON W.WONUM =  LT.WONUM AND W.SITEID = LT.SITEID WHERE LT.TIMERSTATUS = 'ACTIVE' AND LABORCODE = (SELECT LABORCODE FROM LABOR WHERE PERSONID = '" + EMMServer.DB.getUserInfo().personId + "')")
				.submit("offline/wotrack/main.htm", true);
		},
		PLUSTWO: function(){
			EMMServer.DB.Select()
				.addQuery("WORKORDER", "SELECT COUNT(*) AS WOTOTAL FROM WORKORDER WHERE ISTASK='0'")
				.addQuery("ACTIVEWORKORDER","SELECT * FROM WORKORDER W LEFT OUTER JOIN LABTRANS LT ON W.WONUM =  LT.WONUM AND W.SITEID = LT.SITEID WHERE LT.TIMERSTATUS = 'ACTIVE' AND LABORCODE = (SELECT LABORCODE FROM LABOR WHERE PERSONID = '" + EMMServer.DB.getUserInfo().personId + "')")
				.submit("offline/plustwo/main.htm", true);
		},	
		PLUSPWO: function(){
			EMMServer.DB.Select()
				.addQuery("WORKORDER", "SELECT COUNT(*) AS WOTOTAL FROM WORKORDER WHERE ISTASK='0'")
				.addQuery("ACTIVEWORKORDER","SELECT * FROM WORKORDER W LEFT OUTER JOIN LABTRANS LT ON W.WONUM =  LT.WONUM AND W.SITEID = LT.SITEID WHERE LT.TIMERSTATUS = 'ACTIVE' AND LABORCODE = (SELECT LABORCODE FROM LABOR WHERE PERSONID = '" + EMMServer.DB.getUserInfo().personId + "')")
				.submit("offline/pluspwo/main.htm", true);
		},				
		INVENTOR: function(){
			EMMServer.DB.Select()
	    		.addQuery("STOREROOMS", "SELECT * FROM STOREROOM WHERE SITEID='" + EMMServer.DB.getUserInfo().siteId + "'")
	    		.submit("offline/inventor/main.htm", true);
		},
		PLUSTINV: function(){
			EMMServer.DB.Select()
	    		.addQuery("STOREROOMS", "SELECT * FROM STOREROOM WHERE SITEID='" + EMMServer.DB.getUserInfo().siteId + "'")
	    		.submit("offline/plustinv/main.htm", true);
		},		
		SR: function(){
			EMMServer.DB.Select()
				.addQuery("ACTIVESRTOTAL", "SELECT COUNT(*) AS ACTIVESRTOTAL FROM SR WHERE STATUS NOT IN ('NEW','CLOSED','RESOLVED')")
				.addQuery("NEWSRTOTAL", "SELECT COUNT(*) AS NEWSRTOTAL FROM SR WHERE STATUS = 'NEW'")
				.submit("offline/sr/main.htm", true);
		},
		PLUSPSR: function(){
			EMMServer.DB.Select()
				.addQuery("ACTIVESRTOTAL", "SELECT COUNT(*) AS ACTIVESRTOTAL FROM SR WHERE STATUS NOT IN ('NEW','CLOSED','RESOLVED')")
				.addQuery("NEWSRTOTAL", "SELECT COUNT(*) AS NEWSRTOTAL FROM SR WHERE STATUS = 'NEW'")
				.submit("offline/pluspsr/main.htm", true);
		},			
		PLUSGMOC: function(){
			EMMServer.DB.Select()
				.addQuery("PLUSGMOC", "SELECT COUNT(*) AS TOTAL FROM PLUSGMOC")
				.submit("offline/plusgmoc/main.htm", true);
		},	
		ASSET: function(){
			EMMServer.DB.Select()
				.addQuery("ASSET","SELECT COUNT(*) AS ASSETTOTAL FROM ASSET")
				.submit("offline/asset/main.htm", true);
		},
		PLUSTASSET: function(){
			EMMServer.DB.Select()
				.addQuery("ASSET","SELECT COUNT(*) AS ASSETTOTAL FROM ASSET")
				.submit("offline/plustasset/main.htm", true);
		},		
		PLUSPASSET: function(){
			EMMServer.DB.Select()
				.addQuery("ASSET","SELECT COUNT(*) AS ASSETTOTAL FROM ASSET")
				.submit("offline/pluspasset/main.htm", true);
		},			
		INVISSUE: function(){
			EMMServer.DB.Select()
				.addQuery("STOREROOMS", "SELECT * FROM STOREROOM WHERE SITEID='" + EMMServer.DB.getUserInfo().siteId + "' AND LOCATION IN (SELECT DEFSTOREROOM FROM MAXUSER WHERE USERID= '" + EMMServer.DB.getUserInfo().personId + "') ")
				.submit("offline/invissue/main.htm", true);
		},
		LABREP: function(){
			var laborInfo = "SELECT LABOR.LABORCODE, LABORCRAFTRATE.CRAFT, LABORCRAFTRATE.SKILLLEVEL,LABORCRAFTRATE.GLACCOUNT,LABORCRAFTRATE.RATE " +
    		"FROM LABOR LEFT JOIN LABORCRAFTRATE ON LABOR.LABORCODE = LABORCRAFTRATE.LABORCODE AND LABOR.ORGID = LABORCRAFTRATE.ORGID AND LABORCRAFTRATE.DEFAULTCRAFT = '1'" +
    		"WHERE LABOR.PERSONID = '" + EMMServer.DB.getUserInfo().personId + "' AND LABOR.ORGID =  '" + EMMServer.DB.getUserInfo().orgId + "'";
			
			EMMServer.DB.Select()
				.addQuery("LABORINFO", laborInfo)
				.submit("offline/labrep/main.htm", true);
		},
		PLUSTLRP: function(){
			var laborInfo = "SELECT LABOR.LABORCODE, LABORCRAFTRATE.CRAFT, LABORCRAFTRATE.SKILLLEVEL,LABORCRAFTRATE.GLACCOUNT,LABORCRAFTRATE.RATE " +
    		"FROM LABOR LEFT JOIN LABORCRAFTRATE ON LABOR.LABORCODE = LABORCRAFTRATE.LABORCODE AND LABOR.ORGID = LABORCRAFTRATE.ORGID AND LABORCRAFTRATE.DEFAULTCRAFT = '1'" +
    		"WHERE LABOR.PERSONID = '" + EMMServer.DB.getUserInfo().personId + "' AND LABOR.ORGID =  '" + EMMServer.DB.getUserInfo().orgId + "'";
			
			EMMServer.DB.Select()
				.addQuery("LABORINFO", laborInfo)
				.submit("offline/plustlrp/main.htm", true);
		},		
		CREATEDR: function(){
			var mr = new MR();
			// Create a new in memory mr and set field defaults
			mr.createNew({
				SITEID : options.userInfo.siteId,
				ORGID : options.userInfo.orgId 
			});
			
			// Save to the cache
			mr.session.cache();
			
			EMMServer.DB.Select()
				.addQuery('MR', mr.toSql())
				.submit('offline/createdr/mr.htm', true);
		},
		VIEWDR: function(){
			EMMServer.DB.Select()
				.addQuery("SAVEDTOTAL", "SELECT COUNT(*) AS SAVEDTOTAL FROM MR WHERE STATUS IN ('DRAFT','WAPPR')")
				.addQuery("SUBMITTOTAL", "SELECT COUNT(*) AS SUBMITTOTAL FROM MR WHERE STATUS IN ('APPR')")
				.submit("offline/viewdr/main.htm", true);
		},
	}
	PUBLIC.getSupportedApps = function(){
		return supportedApps;
	}
		
	
	return PUBLIC;
});