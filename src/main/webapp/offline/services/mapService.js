angular.module('emm').factory('mapService', function(labtransService){
	var PUBLIC = {};
	
	var options = {
			defaultPageSize: 20,
			viewName : null,
			queryName : null,
			userInfo : null,
			entityName : null,
			dataSources : [
                {
             	  "dataSourceId":"DS_WORKORDERS", 
             	  "dsQuery": "SELECT * FROM WORKORDER WHERE ISTASK=0"
                },
                {
             	  "dataSourceId":"DS_ASSETS", 
             	  "dsQuery": "SELECT * FROM ASSET"
               	  //"queryKeys": { "MAXGISID" : "OBJECTID" } /* This will tell the native app to link feature layer lat long with the location records */
                },
                {
             	  "dataSourceId":"DS_SRS", 
             	  "dsQuery": "SELECT * FROM SR"
                },
                {
               	  "dataSourceId":"DS_LOCATIONS", 
               	  "dsQuery": "SELECT * FROM LOCATIONS"
               	  //"queryKeys": { "MAXGISID" : "OBJECTID" } /* This will tell the native app to link feature layer lat long with the location records */
                },
            ]
		};
	
	PUBLIC.getOptions = function(){
		return options;
	}
	
	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	PUBLIC.initializePinWithData = function(jsonParam, dataSourceId, viewName, lookUpJson) {
		EMMServer.Session.setItem('JSONPARAM_DATA', null);
		
		if (lookUpJson != undefined && dataSourceId in lookUpJson) {
			EMMServer.Session.setItem('ISLOOKUP_DATA', lookUpJson[dataSourceId]);
		}
		else {
			EMMServer.Session.setItem('ISLOOKUP_DATA', false);
		}
		// If not from data source, do nothing
		// Additionally, skip on clusters and listviews
		if (dataSourceId == "DS_WORKORDERS") {
			if (jsonParam[dataSourceId] != null && jsonParam[dataSourceId].length < 2 && Object.keys(jsonParam).length < 2) {
				jsonParam = jsonParam[dataSourceId][0];
				var baseQuery = "SELECT W.* FROM WORKORDER W WHERE W.WORKORDERID = '" + jsonParam.WORKORDERID + "'";

				var extraQuery = "SELECT L.DESCRIPTION AS LOCDESC, A.DESCRIPTION AS ASSETDESC, LAB.LABORCODE AS TIMERLABORCODE, LCR.CRAFT AS TIMERCRAFT, LT.LABTRANSID AS TIMERLABTRANSID, LT.STARTDATE AS TIMERSTARTDATE, LT.TIMERSTATUS " + 
				"FROM WORKORDER W LEFT OUTER JOIN LOCATIONS L ON W.LOCATION = L.LOCATION AND W.SITEID = L.SITEID " +
				"LEFT OUTER JOIN ASSET A ON W.ASSETNUM = A.ASSETNUM AND W.SITEID = A.SITEID " +
				"LEFT OUTER JOIN LABOR LAB ON W.ORGID = LAB.ORGID AND LAB.PERSONID = '" + EMMServer.DB.getUserInfo().personId + "' " +
				"LEFT OUTER JOIN LABORCRAFTRATE LCR ON LAB.LABORCODE = LCR.LABORCODE AND LAB.ORGID = LCR.ORGID AND LCR.DEFAULTCRAFT = '1' " +
				"LEFT OUTER JOIN LABTRANS LT ON W.WONUM = LT.WONUM AND W.SITEID = LT.SITEID AND LT.LABORCODE = LAB.LABORCODE AND LT.TIMERSTATUS = 'ACTIVE' " + 
				"WHERE W.WORKORDERID = '" + jsonParam.WORKORDERID + "'";
				
				var appDocTypeQuery = "SELECT * FROM APPDOCTYPE WHERE APP = 'WOTRACK' ORDER BY DOCTYPE ASC";
				
				var statusListSql = "SELECT * FROM DOMAIN WHERE DOMAINID = 'WOSTATUS'";
				
				EMMServer.Session.setItem('JSONPARAM_DATA', jsonParam);
				
				EMMServer.DB.Select()
				.addQuery("WORKORDER", baseQuery)
				.addQuery("EXTRA", extraQuery)
				.addQuery("APPDOCTYPE", appDocTypeQuery)
				.addQuery("WOSTATUS", statusListSql)
				// New map DB select option, allows the native app to copy over the right attachment for viewing on the pin page
				.mapOfflineAttachment(jsonParam.WORKORDERID, "WORKORDER")
				.submit(viewName, true);
			}	
		}
		else if (dataSourceId == "DS_SRS") {
			if (jsonParam[dataSourceId] != null && jsonParam[dataSourceId].length < 2 && Object.keys(jsonParam).length < 2) {
				jsonParam = jsonParam[dataSourceId][0];
				var baseQuery = "SELECT * FROM SR WHERE TICKETUID='" + jsonParam.TICKETUID + "'";
				
				var extraQuery = "SELECT L.DESCRIPTION AS LOCDESC, A.DESCRIPTION AS ASSETDESC FROM SR S " +
				"LEFT OUTER JOIN LOCATIONS L ON S.LOCATION = L.LOCATION AND S.SITEID = L.SITEID " +
				"LEFT OUTER JOIN ASSET A ON S.ASSETNUM = A.ASSETNUM AND S.SITEID = A.SITEID " +
				"WHERE S.TICKETUID = '" + jsonParam.TICKETUID + "'"
				
				var appDocTypeQuery = "SELECT * FROM APPDOCTYPE WHERE APP = 'SR' ORDER BY DOCTYPE ASC";
				
				EMMServer.Session.setItem('JSONPARAM_DATA', jsonParam);
				
				EMMServer.DB.Select()
				.addQuery("SR", baseQuery)
				.addQuery("EXTRA", extraQuery)
				.addQuery("APPDOCTYPE", appDocTypeQuery)
				// New map DB select option, allows the native app to copy over the right attachment for viewing on the pin page
				.mapOfflineAttachment(jsonParam.TICKETUID, "SR")
				.submit(viewName, true);
			}
		}
		else if (dataSourceId == "DS_ASSETS") {
			if (jsonParam[dataSourceId] != null && jsonParam[dataSourceId].length < 2 && Object.keys(jsonParam).length < 2) {
				jsonParam = jsonParam[dataSourceId][0];
				var baseQuery = "SELECT * FROM ASSET WHERE ASSETUID = '" + jsonParam.ASSETUID + "'";
				
				var extraQuery = "SELECT L.DESCRIPTION AS LOCDESC FROM ASSET A " +
				"LEFT OUTER JOIN LOCATIONS L ON A.LOCATION = L.LOCATION AND A.SITEID = L.SITEID " +
				"WHERE A.ASSETUID = '" + jsonParam.ASSETUID + "'"
				
				var appDocTypeQuery = "SELECT * FROM APPDOCTYPE WHERE APP = 'ASSET' ORDER BY DOCTYPE ASC";
				
				EMMServer.Session.setItem('JSONPARAM_DATA', jsonParam);
				
				EMMServer.DB.Select()
				.addQuery("ASSET", baseQuery)
				.addQuery("EXTRA", extraQuery)
				.addQuery("APPDOCTYPE", appDocTypeQuery)
				// New map DB select option, allows the native app to copy over the right attachment for viewing on the pin page
				.mapOfflineAttachment(jsonParam.ASSETUID, "ASSET")
				.submit(viewName, true);
			}
		}
		else if (dataSourceId == "DS_LOCATIONS") {
			if (jsonParam[dataSourceId] != null && jsonParam[dataSourceId].length < 2 && Object.keys(jsonParam).length < 2) {
				jsonParam = jsonParam[dataSourceId][0];
				var baseQuery = "SELECT * FROM LOCATIONS WHERE LOCATIONSID = '" + jsonParam.LOCATIONSID + "'";
				
				EMMServer.Session.setItem('JSONPARAM_DATA', jsonParam);
				
				EMMServer.DB.Select()
				.addQuery("LOCATION", baseQuery)
				.submit(viewName, true);
			}
		}
	}
	
	PUBLIC.actions = {
		createNewWorkOrder : function(pin){ 
			var wo = new WorkOrder();
			// Create a new in memory workorder and set field defaults
			wo.createNew({
				SITEID: options.userInfo.siteId,
				ORGID: options.userInfo.orgId,
				ISTASK: "0",
			});
			
			// Depending on where the create is called from, different fields must be set
			if (options.entityName == "ASSET") {
				wo.ASSETNUM = pin.ASSETNUM;                                  
				wo.DESCRIPTION = "(" + pin.LATITUDEY + "," + pin.LONGITUDEX + ")";
				wo.FAILURECODE = pin.FAILURECODE;
				wo.LOCATION = pin.LOCATION;
				wo.LONGITUDEX = pin.LONGITUDEX;
				wo.LATITUDEY = pin.LATITUDEY;
			}
			else if (options.entityName == "DROPPED_PIN") {
				wo.DESCRIPTION = "(" + pin.emmmap_y + "," + pin.emmmap_x + ")";
				wo.LONGITUDEX = pin.emmmap_x;
				wo.LATITUDEY = pin.emmmap_y;
			}
			
			// Save to the cache
			wo.session.cache();
			EMMServer.DB.Select()
				.addQuery('WORKORDER', wo.toSql())
				.addEZWebMap(true) /* This function tells the native app to go from map view to web view (Parameter: boolean)*/
				.submit('offline/wotrack/wotrack.htm', true);
		},
		createNewSR : function(pin){
			var sr = new SR();
			// Create a new in memory sr and set field defaults
			sr.createNew();
			
			// Depending on where the create is called from, different fields must be set
			if (options.entityName == "DROPPED_PIN") {
				sr.DESCRIPTION = "(" + pin.emmmap_y + "," + pin.emmmap_x + ")";
				sr.LONGITUDEX = pin.emmmap_x;
				sr.LATITUDEY = pin.emmmap_y;
			}
			
			// Save to the cache
			sr.session.cache();
			
			EMMServer.DB.Select()
				.addQuery('SR', sr.toSql())
				.addEZWebMap(true) /* This function tells the native app to go from map view to web view (Parameter: boolean)*/
				.submit('offline/sr/sr.htm', true);
		},
		saveWorkOrder : function(wo){
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			var jsonParam = EMMServer.Session.getItem('JSONPARAM_DATA');
			if (wo.mbo.toBeSaved()){
				if (wo.mbo.validate()){
					var whereClause = "WORKORDERID='" + wo.WORKORDERID + "'";				
					var failureCode = null;
					var update = EMMServer.DB.MultiUpdate()
						.addUpdateObject("WORKORDER", "EDIT", wo.getMbo(), whereClause);
					if (wo.mbo.isFailureUpdated()){
						failureCode = new FailureCode({
							WORKORDERID: wo.WORKORDERID,
							FAILURECODE: wo.FAILURECODE,
							PROBLEMCODE: wo.PROBLEMCODE,
							CAUSECODE: null,
							REMEDYCODE: null
						});
						update.addUpdateObject("FAILUREREPORT", "EDIT", failureCode.getMbo(), whereClause);
					}
					jsonParam.SCHEDSTART = wo.SCHEDSTART;
					jsonParam.SCHEDFINISH = wo.SCHEDFINISH;					
					
					update.submit().then(function(result){
						if (failureCode) failureCode.session.remove(); // Be sure to remove session data
						wo.session.remove(); // Be sure to remove session data
						EMMServer.Session.setItem('JSONPARAM_DATA', jsonParam); // Refresh jsonParam
						
						EMMServer.DB.Select()
						.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
						// New map DB select option, allows the native app to copy over the right attachment for viewing on the pin page
						.mapOfflineAttachment(wo.WORKORDERID, "WORKORDER")
						.go(options.viewName);
					});
				} else {
					alert(wo.mbo.message());
				}
			}		
		},
		takeOwnership: function(sr){
			if(!sr.mbo.toBeSaved()){
				if(sr.mbo.validate()){
					sr.OWNER = options.userInfo.personId;
					sr.OWNERGROUP = null;
					
					//Maximo automatically changes the status of a SR to QUEUED whenever
					//the record is NEW and the OWNER or OWNERGROUP is populated
					if(sr.STATUS == 'NEW'){
						sr.STATUS = 'QUEUED';	
						var now = new Date();
						sr.STATUSDATE = now.getTime();						

						EMMServer.DB.Update('SR', 'EDIT')
							.addObject(sr.getMbo(), "TICKETUID= '" + sr.TICKETUID + "'")
							.submit()
							.then(function(result){
								sr.session.remove();
								EMMServer.DB.Select()
								.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
								// New map DB select option, allows the native app to copy over the right attachment for viewing on the pin page
								.mapOfflineAttachment(sr.TICKETUID, "SR")
								.go(options.viewName);
							});	
					}
					else{
						EMMServer.DB.Update('SR', 'EDIT')
						.addObject(sr.getMbo(), "TICKETUID= '" + sr.TICKETUID + "'")
						.submit()
						.then(function(result){
							sr.session.remove();
							EMMServer.DB.Select()
							.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
							// New map DB select option, allows the native app to copy over the right attachment for viewing on the pin page
							.mapOfflineAttachment(sr.TICKETUID, "SR")
							.go(options.viewName);							
						});	
					}					
				} else {
					alert(sr.mbo.message());
				}
			} else {
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
			}
			
		},
		startTimer: function(wo, labtransInfo){
			if (wo.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			
			if (labtransInfo.TIMERSTATUS == 'ACTIVE') {
				EMMServer.DB.Select()
					.addMessage(getText('TIMERALREADYSTARTED', null, 'Timer already started'))
					// New map DB select option, allows the native app to copy over the right attachment for viewing on the pin page
					.mapOfflineAttachment(wo.WORKORDERID, "WORKORDER")
					.go(options.viewName);
			} else {
				labtransService.startTimer(wo, labtransInfo, function(result){
					EMMServer.DB.Select()
					.addMessage(getText('TIMERSTARTED', null, 'Timer Started'))
					// New map DB select option, allows the native app to copy over the right attachment for viewing on the pin page
					.mapOfflineAttachment(wo.WORKORDERID, "WORKORDER")
					.go(options.viewName);
				});
			}
		},
		stopTimer: function(wo, labtransInfo){
			if (wo.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			
			if (!labtransInfo.TIMERSTATUS || labtransInfo.TIMERSTATUS == "COMPLETE") {
				EMMServer.DB.Select()
					.addMessage(getText('TIMERNOTFOUND', null, 'Timer not started. No active timer found.'))
					// New map DB select option, allows the native app to copy over the right attachment for viewing on the pin page
					.mapOfflineAttachment(wo.WORKORDERID, "WORKORDER")
					.go(options.viewName);
			} else {
				labtransService.stopTimer(wo, labtransInfo, function(result){
					EMMServer.DB.Select()
					.addMessage(getText('TIMERSTOPPED', null, 'Timer Stopped'))
					// New map DB select option, allows the native app to copy over the right attachment for viewing on the pin page
					.mapOfflineAttachment(wo.WORKORDERID, "WORKORDER")
					.go(options.viewName);
				});
			}
		}
	};	
	
	return PUBLIC;
});