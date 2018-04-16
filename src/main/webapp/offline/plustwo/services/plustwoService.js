angular.module('emm').factory('plustwoService', function(domainService, doclinksService, labtransService, classificationService){
	var options = {
			defaultPageSize: 20,
			viewName : null,
			queryName : null,
			userInfo : null
		};
	
	var PUBLIC = {};

	/* Required for SC interface */
	PUBLIC.setStartCenterApplicationName = function(appName){
		options.appName = appName;
	}
	PUBLIC.getOptions = function(){
		return options;
	}
	PUBLIC.useSavedQuery = function(query){
		var sql = "SELECT * FROM WORKORDER WHERE " + query;
		PUBLIC.toList(null,null,sql);	
	}
	PUBLIC.setStartCenterApplicationName('PLUSTWO');
	//####################End Offline StartCenter Functions 
	
	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	PUBLIC.createNew = function(){
        var wo = new WorkOrder();
        // Create a new in memory workorder and set field defaults
        wo.createNew({
            SITEID: options.userInfo.siteId,
            ORGID: options.userInfo.orgId,
            ASSETNUM : wo.ASSETNUM,
            ALIAS : wo.ALIAS,
            AEPUSINGDEPARTMENT: wo.AEPUSINGDEPARTMENT,
            STATUS : 'INPRG',
            ISTASK: "0"
           
        });
        
        // Save to the cache
        wo.session.cache();
        
        EMMServer.DB.Select()
            .addQuery('WORKORDER', wo.toSql())
            .submit('offline/plustwo/wotrack.htm', true);
    };

	
	PUBLIC.toAdvancedSearch = function(){		
		var advWo = new WorkOrder();
		// Create a new in memory work order and set field defaults
		advWo.createNew({
			ISADVANCED: '1'
		});
		// Save to the cache
		advWo.session.cache();
		
		EMMServer.DB.Select()
		.addQuery('WORKORDER', advWo.toSql())
		.submit('offline/plustwo/advancedsearch.htm', true);
	};
	
	PUBLIC.doAdvancedSearch = function(wo){		
		var viewName = 'offline/plustwo/list.htm';
		var query = "SELECT * FROM WORKORDER WHERE ISTASK='0'";
			
		if(wo.WONUM && wo.WONUM != '')
			query += " AND WONUM = '" + wo.WONUM + "'";
		if(wo.DESCRIPTION && wo.DESCRIPTION != '')
			query += " AND DESCRIPTION LIKE '%" + wo.DESCRIPTION + "%'";
		if(wo.STATUS && wo.STATUS != '')
			query += " AND STATUS = '" + wo.STATUS + "'";
		if(wo.LOCATION && wo.LOCATION != '')
			query += " AND LOCATION = '" + wo.LOCATION + "'";
		if(wo.ASSETNUM && wo.ASSETNUM != '')
			query += " AND ASSETNUM = '" + wo.ASSETNUM + "'";
		if(wo.WOPRIORITY && wo.WOPRIORITY != '')
			query += " AND WOPRIORITY = '" + wo.WOPRIORITY + "'";		
		if(wo.WORKTYPE && wo.WORKTYPE != '')
			query += " AND WORKTYPE = '" + wo.WORKTYPE + "'";
		if(wo.REPAIRFACILITY && wo.REPAIRFACILITY != '')
			query += " AND REPAIRFACILITY = '" + wo.REPAIRFACILITY + "'";
		if(wo.AEPUSINGDEPARTMENT && wo.AEPUSINGDEPARTMENT != '')
			query += " AND AEPUSINGDEPARTMENT = '" + wo.AEPUSINGDEPARTMENT + "'";			
		if(wo.LEAD && wo.LEAD != '')
			query += " AND LEAD = '" + wo.LEAD + "'";
		if(wo.PERSONGROUP && wo.PERSONGROUP != '')
			query += " AND PERSONGROUP = '" + wo.PERSONGROUP + "'";		
		if(wo.SUPERVISOR && wo.SUPERVISOR != '')
			query += " AND SUPERVISOR = '" + wo.SUPERVISOR + "'";
		if(wo.FAILURECODE && wo.FAILURECODE != '')
			query += " AND FAILURECODE = '" + wo.FAILURECODE + "'";		
		if(wo.PROBLEMCODE && wo.PROBLEMCODE != '')	
			query += " AND PROBLEMCODE = '" + wo.PROBLEMCODE + "'";
		if(wo.SCHEDSTARTFROM && wo.SCHEDSTARTFROM != ''){
			//need to convert the selected date into the appropriate format
			var schedstartfrom = wo.SCHEDSTARTFROM.toDate().toISOString().substring(0,10);
			query += " AND date(SCHEDSTART) >= date('" + schedstartfrom + "')";
		}
		if(wo.SCHEDSTARTTO && wo.SCHEDSTARTTO != ''){
			//need to convert the selected date into the appropriate format
			var schedstartto = wo.SCHEDSTARTTO.toDate().toISOString().substring(0,10);
			query += " AND date(SCHEDSTART) <= date('" + schedstartto + "')";
		}
		
		query += " ORDER BY REPORTDATE DESC";
		
	
		EMMServer.DB.Select()
			.addQuery('WORKORDER', query, 1, options.defaultPageSize)
			.submit(viewName, true);			
					
	};
	
	PUBLIC.toList = function(searchValue, goBack, query){
		var viewName = 'offline/plustwo/list.htm';
		if(!query)
			query = "SELECT * FROM WORKORDER WHERE STATUS NOT IN ('CLOSE')";
		
		if (goBack){
			if (EMMServer.DB.Select().getQuery(viewName))
				EMMServer.DB.Select().go(viewName);
			else {
				EMMServer.DB.Select()
					.addQuery('WORKORDER', query, 1, options.defaultPageSize)
					.submit(viewName, true);				
			}
			return;
		}
			
		if (searchValue && (typeof searchValue)==='string'){
			query += (query.toUpperCase().indexOf("WHERE") > 0 ? " AND " : " WHERE ");
			query += " (WONUM = '{0}' OR DESCRIPTION like '%{0}%' OR LEAD like '%{0}%' OR ASSETNUM = '{0}' OR LOCATION = '{0}')".format(searchValue);
			
			EMMServer.DB.Select()
				.addQuery('WORKORDER', query, 1, options.defaultPageSize)
				.submit(viewName, true);
		} else {
			EMMServer.DB.Select()
				.addQuery('WORKORDER', query, 1, options.defaultPageSize)
				.submit(viewName, true);			
		}			
	};
	
	PUBLIC.toSearchList = function(searchValue, goBack, query){
		var viewName = 'offline/plustwo/list.htm';
		if(!query)
			query = "SELECT * FROM WORKORDER WHERE STATUS NOT IN ('CLOSE')";
		
		if (goBack){
			if (EMMServer.DB.Select().getQuery(viewName))
				EMMServer.DB.Select().go(viewName);
			else {
				EMMServer.DB.Select()
					.addQuery('WORKORDER', query, 1, options.defaultPageSize)
					.submit(viewName, true);				
			}
			return;
		}
			
		if (searchValue && (typeof searchValue)==='string'){
			query += (query.toUpperCase().indexOf("WHERE") > 0 ? " AND " : " WHERE ");
			query += " (WONUM = '{0}' OR DESCRIPTION like '%{0}%' OR LEAD like '%{0}%' OR ASSETNUM = '{0}' OR LOCATION = '{0}')".format(searchValue);
			
			EMMServer.DB.Select()
				.addQuery('WORKORDER', query, 1, options.defaultPageSize)
				.submit(viewName, true);
		} else {
			EMMServer.DB.Select()
				.addQuery('WORKORDER', query, 1, options.defaultPageSize)
				.submit(viewName, true);			
		}			
	};
	
	PUBLIC.toStartedWorkOrderList = function(){
		var sql = "SELECT DISTINCT W.*, LT.LABORCODE AS TIMERLABORCODE, LT.CRAFT AS TIMERCRAFT, LT.LABTRANSID AS TIMERLABTRANSID, LT.STARTDATE AS TIMERSTARTDATE " + 
			"FROM WORKORDER W " +
			"INNER JOIN LABTRANS LT ON W.WONUM = LT.WONUM AND W.SITEID = LT.SITEID AND LT.TIMERSTATUS = 'ACTIVE' " + 
			"INNER JOIN LABOR LAB ON W.ORGID = LAB.ORGID AND LAB.LABORCODE = LT.LABORCODE " +
			"WHERE LAB.PERSONID = '" + options.userInfo.personId + "' ";
		
		EMMServer.DB.Select()
			.addQuery("WORKORDER", sql, 1, options.defaultPageSize)
			.submit("offline/plustwo/list.htm", true);									
	};
	
	PUBLIC.showDetail = function(wo, message){
		// The MBO object should be queried in one SQL clause, this is because when the MBO object is updated, it has a one-to-one mapping to the database
		var sql = "SELECT * FROM WORKORDER WHERE WORKORDERID = '" + wo.WORKORDERID + "'";
		
		// All non-MBO related data should be queried separately
		var extraSql = "SELECT L.DESCRIPTION AS LOCDESC, LAB.LABORCODE AS TIMERLABORCODE,MX.DEFAULTREPFAC, LCR.CRAFT AS TIMERCRAFT, LT.LABTRANSID AS TIMERLABTRANSID, LT.STARTDATE AS TIMERSTARTDATE, LT.TIMERSTATUS, " +
			"A.PLUSTYEAR, A.AEPMAKE, A.PLUSTMODEL, A.MANUFACTURER, A.SERIALNUM, A.STATUS, AU.PERSONID " +
			"FROM WORKORDER W LEFT OUTER JOIN LOCATIONS L ON W.LOCATION = L.LOCATION AND W.SITEID = L.SITEID " +
			"LEFT OUTER JOIN LABOR LAB ON W.ORGID = LAB.ORGID AND LAB.PERSONID = '" + options.userInfo.personId + "' " +
			"LEFT OUTER JOIN MAXUSER MX  ON MX.DEFSITE= W.SITEID AND MX.PERSONID= '" + options.userInfo.personId + "' " +
			"LEFT OUTER JOIN LABORCRAFTRATE LCR ON LAB.LABORCODE = LCR.LABORCODE AND LAB.ORGID = LCR.ORGID AND LCR.DEFAULTCRAFT = '1' " +
			"LEFT OUTER JOIN LABTRANS LT ON W.WONUM = LT.WONUM AND W.SITEID = LT.SITEID AND LT.LABORCODE = LAB.LABORCODE AND LT.TIMERSTATUS = 'ACTIVE' " +
			"LEFT OUTER JOIN ASSET A ON W.ASSETNUM = A.ASSETNUM AND W.SITEID = A.SITEID " +
			"LEFT OUTER JOIN ASSETUSERCUST AU ON W.ASSETNUM = AU.ASSETNUM AND W.SITEID = AU.SITEID AND AU.ISPRIMARY = '1'" +			
			"WHERE W.WORKORDERID='" + wo.WORKORDERID + "'";

		var statusListSql = "SELECT * FROM DOMAIN WHERE DOMAINID = 'WOSTATUS'";
		
		var assetSql = "SELECT A.ISRUNNING FROM WORKORDER W " +
				" LEFT JOIN ASSET A ON A.ASSETNUM = W.ASSETNUM AND A.SITEID=W.SITEID" +
				" WHERE W.WORKORDERID = '" + wo.WORKORDERID + "'";
		
		// Initialize variable for workorder display and MAXVALUE of status. 
		/*var hazard = getWOHazardSql(wo);
		var precaution = getWOPrecautionSql(wo);
		var hazardmaterial = getWOHazardMaterialSql(wo);
		var hazardtag = getWOHazardTagSql(wo);
		var tagout = getWOTagOutSql(wo);
		var wotaglock = getWOTagLockSql(wo);*/
		
		EMMServer.DB.Select()
			.addQuery("WORKORDER", sql)
			.addQuery("EXTRA", extraSql)
			.addQuery("ASSET", assetSql)
			/*.addQuery("WOHAZARD", hazard)
			.addQuery("WOPRECAUTION", precaution)
			.addQuery("WOMATERIAL", hazardmaterial)
			.addQuery("WOHAZARDTAG", hazardtag)
			.addQuery("WOTAGOUT", tagout)
			.addQuery("WOTAGLOCK", wotaglock)*/
			.addQuery("WOSTATUS", statusListSql)
			.addMessage(message)
			.submit("offline/plustwo/wotrack.htm", true);
	};	
	
	PUBLIC.createNewTask = function(workorder){
		//Adjust TASKID to be value 10 higher than last task
		var wo = new WorkOrder();
		
		// Create a new in memory workorder and set field defaults
		//Need to validate pagination effect on determining workorder obj
		wo.createNew({
			SITEID: workorder.SITEID,
			ORGID: workorder.ORGID,
			PARENT: workorder.WONUM,
			STATUS: 'INPRG',
			PARENTID: workorder.WORKORDERID,
			LOCATION: workorder.LOCATION,
			PLUSTREASON: workorder.PLUSTREASON,
			PLUSTCOMP: workorder.PLUSTCOMP,
			PLUSTACCOMP: workorder.PLUSTACCOMP,
			ASSETNUM: workorder.ASSETNUM,
			ISTASK: "1"
		});
		
		// Save to the cache
		wo.session.cache();
		
		var extraSql = "SELECT WORKORDER.WORKORDERID AS PARENTID, WORKORDER.WONUM AS PARENT, WORKORDER.SITEID,  MAX(CAST(WOTASK.TASKID AS INTEGER)) AS TASKID"
			+ " FROM WORKORDER LEFT JOIN WORKORDER WOTASK ON WORKORDER.WONUM = WOTASK.PARENT AND WORKORDER.SITEID = WOTASK.SITEID"
	 		+ " WHERE WORKORDER.WORKORDERID = '" + workorder.WORKORDERID + "'"
			+ " GROUP BY WORKORDER.WORKORDERID, WORKORDER.WONUM, WORKORDER.SITEID";
		
		EMMServer.DB.Select()
			.addQuery("TASK", wo.toSql())
			.addQuery("EXTRA", extraSql)
			.submit("offline/plustwo/task.htm", true);
	};

	PUBLIC.actions = {
		saveWorkorder : function(wo){
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			if (wo.mbo.toBeSaved()){
				if (wo.mbo.validate()){
					var whereClause = "WORKORDERID='" + wo.WORKORDERID + "'";
					if (wo.mbo.isNew()){
						var failureCode = new FailureCode({
							WORKORDERID: wo.WORKORDERID,
							FAILURECODE: wo.FAILURECODE,
							PROBLEMCODE: wo.PROBLEMCODE,
							CAUSECODE: null,
							REMEDYCODE: null
						});
						var multiUpdate = EMMServer.DB.MultiUpdate()
							.addInsertObject("WORKORDER", "INSERT", wo.getMbo())
							.addInsertObject("FAILUREREPORT", "EDIT", failureCode.getMbo())
							.submit()
							.then(function(result){
								failureCode.session.remove(); // Be sure to remove session data
								wo.session.remove(); // Be sure to remove session data
								PUBLIC.showDetail(wo, getText('RECORDSAVED', null, 'Record Saved'));
							});						
					} else {
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
						update.submit().then(function(result){
							if (failureCode) failureCode.session.remove(); // Be sure to remove session data
							wo.session.remove(); // Be sure to remove session data
							PUBLIC.showDetail(wo, getText('RECORDSAVED', null, 'Record Saved'));
						});
					}	
				} else {
					alert(wo.mbo.message());
				}
			}		
		},
		completeTask: function(task, parent){
			var whereClause = "WORKORDERID = '" + task.WORKORDERID +"'";
			
			var currentTime = new Date();
						
			var updateData = { 
					STATUSDATE : currentTime.getTime(),
					STATUS : "WCOMP"
				};
			
			EMMServer.DB.MultiUpdate()
				.addUpdateObject("WORKORDER", "UPDATE_STATUS", updateData, whereClause)			
				.submit()
				.then(function(result){
					task.session.remove();
					EMMServer.DB.Select()
						.addQuery("TASKLIST", "SELECT * FROM WORKORDER  WHERE PARENTID='" + parent.WORKORDERID + "' AND ISTASK='1' ORDER BY CAST(TASKID AS INTEGER) ASC", 1, options.defaultPageSize)
						.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
						.submit("offline/plustwo/tasklist.htm", true);		
					
				});					
		},			
		/*completeTask: function(lt){
			lt.STATUS = 'WCOMP';
			
			EMMServer.DB.Update('WORKORDER', 'COMPLETE')
				.addObject(lt.getMbo(true), "WORKORDERID='" + lt.WORKORDERID+ "'")
				.submit()
				.then(function(result) {
					EMMServer.DB.Select()
						.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
						.go("offline/plustwo/tasklist.htm");
				});
		},	*/
		takeOwnership : function(wo){
			if (wo.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			else{
				wo.OWNER = options.userInfo.personId;
				wo.OWNERGROUP = null;
				EMMServer.DB.Update('WORKORDER', 'EDIT')
					.addObject(wo.getMbo(), "WORKORDERID = '" + wo.WORKORDERID + "'")
					.submit()
					.then(function(result){
						wo.session.remove(); // Be sure to remove session data
						PUBLIC.showDetail(wo, getText('RECORDSAVED', null, 'Record Saved'));
					});				
			}	
		},	
		selectOwner : function(wo){
			if (wo.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			else{
				domainService.selectOwner(wo,'OWNER');
			}	
		},					
		saveFailureReport : function(wo, failureCode){
			if (failureCode.mbo.toBeSaved()){
				// Update the work order fields to save
				wo.FAILURECODE = failureCode.FAILURECODE;
				wo.PROBLEMCODE = failureCode.PROBLEMCODE;
			
				var WORKORDERID = (wo.ISTASK == '1') ? wo.PARENTID : wo.WORKORDERID;
				var whereClause = "WORKORDERID='" + WORKORDERID + "'";
			
				EMMServer.DB.MultiUpdate()
					.addUpdateObject("WORKORDER", "EDIT", wo.getMbo(), whereClause)
					.addUpdateObject("FAILUREREPORT", "EDIT", failureCode.getMbo(), whereClause)
					.submit()
					.then(function(result){
						failureCode.session.remove(); // Be sure to remove session data
						wo.session.remove(); // Be sure to remove session data
						PUBLIC.showDetail(wo, getText('RECORDSAVED', null, 'Record Saved'));
					});
			}
		},
		toChangeStatus: function(wo){
			domainService.toChangeStatus(wo, {
				fieldName: 'STATUS',
				action: (wo.ISTASK === '1' ? 'UPDATE_TASK_STATUS' : 'UPDATE_STATUS'),
				entityName : 'WORKORDER',
				whereClause : 'WORKORDERID = "' + wo.WORKORDERID + '"',
				returnPage : options.viewName
			});
		},
		toToolTrans: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('TOOLTRANS_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
		
			EMMServer.DB.Select()
				.addQuery("TOOLTRANS", "SELECT * FROM TOOLTRANS WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
				.submit("offline/tooltrans/main.htm", true);
		},
		toLabTrans: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('LABTRANS_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
	        var laborInfo = "SELECT LABOR.LABORCODE, LABORCRAFTRATE.CRAFT " +
        		"FROM LABOR LEFT JOIN LABORCRAFTRATE ON LABOR.LABORCODE = LABORCRAFTRATE.LABORCODE AND LABOR.ORGID = LABORCRAFTRATE.ORGID AND LABORCRAFTRATE.DEFAULTCRAFT = '1'" +
        		"WHERE LABOR.PERSONID = '" + options.userInfo.personId + "' AND LABOR.ORGID =  '" + options.userInfo.orgId + "'";
	        
			EMMServer.DB.Select()
				.addQuery("LABTRANS", "SELECT * FROM LABTRANS WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
				.addQuery("LABORINFO", laborInfo)
				.submit("offline/labtrans/main.htm", true);				
		},
		toMatUseTrans: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('MATUSETRANS_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("MATUSETRANS", "SELECT * FROM MATUSETRANS WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
				.submit("offline/matusetrans/main.htm", true);
		},	
		toWorkLog: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('WORKLOG_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("WORKLOG", "SELECT * FROM WORKLOG WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
				.submit("offline/worklog/main.htm", true);
		},
		toWPLabor: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('WPLABOR_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("WPLABOR", "SELECT * FROM WPLABOR WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
				.submit("offline/wplabor/main.htm", true);
		},	
		toWPMaterial: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('WPMATERIAL_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("WPMATERIAL", "SELECT * FROM WPMATERIAL WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
				.submit("offline/wpmaterial/main.htm", true);
		},				
		toTask: function(wo, message){
			// All non-MBO related data should be queried separately
			var extraSql = "SELECT L.DESCRIPTION AS LOCDESC, LAB.LABORCODE AS TIMERLABORCODE, LCR.CRAFT AS TIMERCRAFT, LT.LABTRANSID AS TIMERLABTRANSID, LT.STARTDATE AS TIMERSTARTDATE, LT.TIMERSTATUS " + 
				"FROM WORKORDER W LEFT OUTER JOIN LOCATIONS L ON W.LOCATION = L.LOCATION AND W.SITEID = L.SITEID " +
				"LEFT OUTER JOIN LABOR LAB ON W.ORGID = LAB.ORGID AND LAB.PERSONID = '" + options.userInfo.personId + "' " +
				"LEFT OUTER JOIN LABORCRAFTRATE LCR ON LAB.LABORCODE = LCR.LABORCODE AND LAB.ORGID = LCR.ORGID AND LCR.DEFAULTCRAFT = '1' " +
				"LEFT OUTER JOIN LABTRANS LT ON W.WONUM = LT.WONUM AND W.SITEID = LT.SITEID AND LT.LABORCODE = LAB.LABORCODE AND LT.TIMERSTATUS = 'ACTIVE' " +
				"WHERE W.WORKORDERID='" + wo.WORKORDERID + "'";
			var statusListSql = "SELECT * FROM DOMAIN WHERE DOMAINID = 'WOSTATUS'";
			EMMServer.DB.Select()
				.addQuery("TASK", "SELECT * FROM WORKORDER WHERE WORKORDERID='" + wo.WORKORDERID + "' AND ISTASK='1'")
				.addQuery("EXTRA", extraSql)
				.addQuery("WOSTATUS", statusListSql)
				.addMessage(message)
				.submit("offline/plustwo/task.htm", true);
		},
		toTaskList: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('TASKLIST_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("TASKLIST", "SELECT * FROM WORKORDER  WHERE PARENTID='" + wo.WORKORDERID + "' AND ISTASK='1' ORDER BY CAST(TASKID AS INTEGER) ASC", 1, options.defaultPageSize)
				.submit("offline/plustwo/tasklist.htm", true);
			
		},
		toNonStock: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('NONSTOCK_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("NONSTOCK", "SELECT * FROM SERVRECTRANS WHERE WONUM IN (SELECT WONUM FROM WORKORDER WHERE PARENT = '" + wo.PARENT + "')")
				.submit("offline/plustwo/nonstock.htm", true);
			
		},		
		saveTask: function(wo){
			if (wo.mbo.toBeSaved()){
				if (wo.mbo.validate()){
					if (wo.mbo.isNew()){
						var currentTime = new Date();
						
						var updateData = { 
								STATUSDATE : currentTime.getTime(),
								STATUS : "INPRG"
							};
						
						var multiUpdate = EMMServer.DB.MultiUpdate()
						.addInsertObject("WORKORDER", "INSERT_TASK", wo.getMbo())
						.addUpdateObject("WORKORDER", "UPDATE_TASK_STATUS", updateData, "WORKORDERID = '" + wo.WORKORDERID + "'")
						.submit()
						.then(function(result){
							// Be sure to remove session data
							wo.session.remove();
							wo.mbo.isNew(false);
							PUBLIC.actions.toTask(wo, getText('RECORDSAVED', null, 'Record Saved'));
						});						
						
/*						EMMServer.DB.Insert('WORKORDER', 'INSERT_TASK')
							.addObject(wo.getMbo())
							.submit()
							.then(function(result){
								// Be sure to remove session data
								wo.session.remove();
								wo.mbo.isNew(false);
								PUBLIC.actions.toTask(wo, getText('RECORDSAVED', null, 'Record Saved'));
							});*/
					} else {
						EMMServer.DB.Update('WORKORDER', 'UPDATE_TASK')
							.addObject(wo.getMbo(), "WORKORDERID='" + wo.WORKORDERID + "'")
							.submit()
							.then(function(result){
								// Be sure to remove session data
								wo.session.remove();
								wo.mbo.isNew(false);
								PUBLIC.actions.toTask(wo, getText('RECORDSAVED', null, 'Record Saved'));
							});						
					}
				} else {
					alert(wo.mbo.message());
				}
			}
		},
		reportDowntime : function(workorder){			
			if (!workorder.ASSETNUM){
				alert(getText('NOASSET', null, 'Downtime reporting requires an asset. This work order does not have an asset.'));
				return;
			}

			if (workorder.mbo.toBeSaved() && !message){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}

			var dt = new Downtime();
			dt.createNew({
				ASSETNUM : workorder.ASSETNUM,
				ISRUNNING : workorder.mbo._ASSETISRUNNING,
				OPERATIONAL : '1',
				STARTDATESOURCE: 'REPORTDATE',
				STARTDATE: workorder.REPORTDATE,
				SITEID : workorder.SITEID,
				WORKORDERID : workorder.WORKORDERID,

			});
			workorder.session.cache();
			dt.session.cache();

			EMMServer.Session.setItem('DOWNTIME_DATA',{
				returnPage : options.viewName,
				dtcacheKey : dt.session.cacheKey(),
				wocacheKey : workorder.session.cacheKey()
			});
			EMMServer.DB.Select()
				.addQuery("RECENTDOWNTIME", "SELECT CHANGEDATE FROM ASSETSTATUS WHERE ASSETNUM = '" + workorder.ASSETNUM + "' AND SITEID = '" + workorder.SITEID + "' ORDER BY date(changedate/1000,'unixepoch') desc LIMIT 1")
				.submit("offline/plustwo/downtime.htm", true);
		},	
		saveDowntime : function(downtime, workorder, mode){
			if (downtime.mbo.toBeSaved()){
				if (downtime.mbo.validate()){
					if (downtime.mbo.isNew()){
						if(mode === 'REPORTDOWNTIME'){
							downtime.ENDCODE = downtime.STARTCODE;
							downtime.ENDOPERATIONAL = downtime.OPERATIONAL;
							downtime.STARTOPERATIONAL = downtime.OPERATIONAL;
							downtime.ENDWONUM = downtime.STARTWONUM;
							
							EMMServer.DB.Insert('DOWNTIME', 'INSERT')
								.addObject(downtime.getMbo())
								.submit()
								.then(function(result){
									downtime.session.remove();
									workorder.session.remove();
									PUBLIC.showDetail(workorder, getText('RECORDSAVED', null, 'Record Saved'));
									
								});
						}else{
							//null out any data that was possibly filled out
							downtime.STARTDATE = '';
							downtime.ENDDATE = '';							
							
							var update = EMMServer.DB.MultiUpdate();
							var now = new Date();
							
							var at = new AssetStatus();
							at.createNew({
								ASSETNUM : workorder.ASSETNUM,
								CHANGEDATE : downtime.STATUSCHANGEDATE,
								SITEID : workorder.SITEID,
							});
							
							var newRunning = '1';
							
							if(downtime.ISRUNNING == '1')
								newRunning = '0';
							
							var assetData = { 
									ISRUNNING : newRunning,
								};
							
							var whereClause = "ASSETNUM = '" + downtime.ASSETNUM + "' AND SITEID = '" + downtime.SITEID + "'";
							
							update.addInsertObject("ASSETSTATUS", "", at.getMbo());
							update.addUpdateObject("ASSET", "", assetData, whereClause);
							update.addInsertObject("DOWNTIME","INSERT", downtime.getMbo());
							update.submit()
								.then(function(result){
									downtime.session.remove();
									workorder.session.remove();
									PUBLIC.showDetail(workorder, getText('DOWNTIMESAVED', null, 'Asset\'s up/down status has been successfully changed'));
								});
						}
					}
				}
				else {
					alert(downtime.mbo.message());
				}
			}
		},
		toMoveAsset: function(workorder){
			if (!String.isNullOrEmpty(workorder.NEWLOCATION) || !String.isNullOrEmpty(workorder.NEWSITE)){
				alert("Move Asset is pending. Please sync before moving the asset again.");				
				return;
			}
			workorder.session.cache();
			
			var sql = "SELECT * FROM ASSET WHERE assetnum = '" + workorder.ASSETNUM+ "' and siteid = '" + workorder.SITEID + "'";
			// All non-MBO related data should be queried separately			
			
			EMMServer.DB.Select()
				.addQuery("ASSET", sql)
				.addQuery("WORKORDER",workorder.toSql())
				.submit("offline/plustwo/moveasset.htm", true);	
		},
		moveAsset: function(asset,wo){			
			
			EMMServer.DB.Update('ASSET', 'MOVEASSET')
			.addObject(asset.getMbo(), "ASSETUID='" + asset.ASSETUID +"'")
			.submit()
			.then(function(result){
				asset.session.remove();
				PUBLIC.showDetail(wo, getText('RECORDSAVED', null, 'Record Saved'));
			});	
		},
		toParent: function(wo){
			wo.session.remove();
			EMMServer.DB.Select()
				.go("offline/plustwo/wotrack.htm");
		},		
		toMultiAssets: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('MULTIASSETLOCCI_DATA',{
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			var WORKORDERID = (wo.ISTASK == '1') ? wo.PARENTID : wo.WORKORDERID;
			
			EMMServer.DB.Select()
				.addQuery("MULTIASSETLOCCI", "SELECT * FROM MULTIASSETLOCCI WHERE WORKORDERID='" + WORKORDERID + "'")
				.submit("offline/plustwo/multiassetlist.htm", true);
		},
		toMeterList : function(wo){
			wo.session.cache();
			var sqlAssetMeter = "SELECT * FROM ASSETMETER WHERE ASSETUID = (SELECT ASSETUID FROM ASSET WHERE ASSETNUM = '" + wo.ASSETNUM + "' AND SITEID = '" + wo.SITEID + "')";
			var sqlLocMeter = "SELECT * FROM LOCATIONMETER WHERE LOCATIONSID = (SELECT LOCATIONSID FROM LOCATIONS WHERE LOCATION = '" + wo.LOCATION + "' AND SITEID = '" + wo.SITEID + "')";
			var sqlMeasurePoint = "SELECT MP.* FROM MEASUREPOINT MP";
			sqlMeasurePoint += " LEFT JOIN ASSETMETER AM ON MP.ASSETNUM = AM.ASSETNUM AND MP.METERNAME = AM.METERNAME AND MP.SITEID = AM.SITEID";
			sqlMeasurePoint += " LEFT JOIN LOCATIONMETER LM ON MP.LOCATION = LM.LOCATION AND MP.METERNAME = LM.METERNAME AND MP.SITEID = LM.SITEID";
			sqlMeasurePoint += " WHERE AM.ASSETUID = (SELECT ASSETUID FROM ASSET WHERE ASSETNUM = '" + wo.ASSETNUM + "' AND SITEID = '" + wo.SITEID + "')";
			sqlMeasurePoint += " OR LM.LOCATIONSID = (SELECT LOCATIONSID FROM LOCATIONS WHERE LOCATION = '" + wo.LOCATION + "' AND SITEID = '" + wo.SITEID + "')";
			
			
			EMMServer.Session.setItem('METER_DATA',{
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("ASSETMETERS", sqlAssetMeter)
				.addQuery("LOCMETERS", sqlLocMeter)
				.addQuery("MEASUREPOINT", sqlMeasurePoint)
				.submit("offline/plustwo/meters.htm",true);
		},
		saveAssetLocMeters: function(wo, assetmeters, locationmeters){
			// Get Current Date Time
			var dateTime = new Date();
			var update = EMMServer.DB.MultiUpdate();
			if (assetmeters) {
				for (var i=0; i<assetmeters.length; i++) {
					var assetmeter = assetmeters[i];
					
				/*	if(assetmeter.LASTREADING.toNumber() + 6000 < assetmeter.READING.toNumber()){
							alert(getText(null,null,'Reading is over 6000 the last reading.'));
							return false;
					}*/
					if(assetmeter.READING){
						var WhereClause = "ASSETMETERID = '" + assetmeter.ASSETMETERID + "'";

						assetmeter.LASTREADINGINSPCTR = options.userInfo.personId;
						// if the READING TYPE is DELTA, we don't want to overwrite the LASTREADING for displaying reasons
						// instead we will add the READING on top of the LASTREADING
						if (!String.isNullOrEmpty(assetmeter.READINGTYPE) && assetmeter.READINGTYPE.toUpperCase() == 'DELTA') {
							if (!assetmeter.LASTREADING)
								assetmeter.LASTREADING = '0';
							assetmeter.LASTREADING = assetmeter.LASTREADING.toNumber() + assetmeter.READING.toNumber();
							assetmeter.LASTREADING = assetmeter.LASTREADING.toLocaleString();
						} else
							assetmeter.LASTREADING = assetmeter.READING;
						assetmeter.LASTREADINGDATE = dateTime.getTime();	
						
						assetmeter.NEWREADING = assetmeter.READING;
						assetmeter.NEWREADINGDATE = dateTime.getTime();
						
						assetmeter.READING = '';
						
						if(assetmeter.PLUSTPRIMETER == 1 || assetmeter.PLUSTPRIMETER == true){
							wo.PLUSTPRIENTERED = 1;
							update.addUpdateObject("WORKORDER", "", wo.getMbo(), "WORKORDERID = '" + wo.WORKORDERID + "'");
						}
						
					
						update.addUpdateObject("ASSETMETER", "UPDATE_METER", assetmeter.getMbo(), WhereClause);
					}
					
				}
			}
			
			if (locationmeters) {
				for (var j=0; j<locationmeters.length; j++) {
					var locmeter = locationmeters[j];
					if(locmeter.READING){
						var WhereClause = "LOCATIONMETERID = '" + locmeter.LOCATIONMETERID + "'";

						locmeter.LASTREADINGINSPCTR = options.userInfo.personId;
						// if the READING TYPE is DELTA, we don't want to overwrite the LASTREADING for displaying reasons
						// instead we will add the READING on top of the LASTREADING
						if (!String.isNullOrEmpty(locmeter.READINGTYPE) && locmeter.READINGTYPE.toUpperCase() == 'DELTA') {
							if (!locmeter.LASTREADING)
								locmeter.LASTREADING = '0';
							locmeter.LASTREADING = locmeter.LASTREADING.toNumber() + locmeter.READING.toNumber();
							locmeter.LASTREADING = locmeter.LASTREADING.toLocaleString();
						} else
							locmeter.LASTREADING = locmeter.READING;
						locmeter.LASTREADINGDATE = dateTime.getTime();	
						
						locmeter.NEWREADING = locmeter.READING;
						locmeter.NEWREADINGDATE = dateTime.getTime();
						
						locmeter.READING = '';
						update.addUpdateObject("LOCATIONMETER", "UPDATE_METER", locmeter.getMbo(), WhereClause);
					}
				}
			}

			for (var i=0; i<assetmeters.length; i++) {
				assetmeters[i].session.remove();
			}
			for (var j=0; j<locationmeters.length; j++) {
				locationmeters[j].session.remove();
			}
			
			update.submit().then(function(result){
				EMMServer.DB.Select()
					.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
					.go("offline/plustwo/meters.htm");
			});
		},		
		toFailureReporting: function(wo){
			if (wo.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			
			// Cache the current object
			wo.session.cache();
			
			EMMServer.Session.setItem('FAILURE_DATA', {
				cacheKey : wo.session.cacheKey(),
				returnPage : options.viewName
			});
			
			var WORKORDERID = (wo.ISTASK == '1') ? wo.PARENTID : wo.WORKORDERID;
			
			var query = "SELECT FR.*, ";
			query += "  (SELECT FAILURELIST FROM FAILURECODE WHERE FAILURECODE = FR.FAILURECODE) AS FAILURECODE_FAILURELIST,";
			query += "	(SELECT FAILURELIST FROM FAILURECODE";
			query += "		WHERE FAILURECODE = FR.PROBLEMCODE";
			query += "			AND PARENT = (SELECT FAILURELIST FROM FAILURECODE WHERE FAILURECODE = FR.FAILURECODE)";
			query += "	) AS PROBLEMCODE_FAILURELIST,";
			query += "	(SELECT FAILURELIST FROM FAILURECODE";
			query += "		WHERE FAILURECODE = FR.CAUSECODE"; 
			query += "			AND PARENT = (";
			query += "				SELECT FAILURELIST FROM FAILURECODE";
			query += "					WHERE FAILURECODE = FR.PROBLEMCODE ";
			query += "						AND PARENT = (SELECT FAILURELIST FROM FAILURECODE WHERE FAILURECODE = FR.FAILURECODE)";
			query += "			)";
			query += "	) AS CAUSECODE_FAILURELIST";			
			query += " FROM FAILUREREPORT FR WHERE WORKORDERID = '" + WORKORDERID + "'";			
			
			EMMServer.DB.Select()
				.addQuery("FAILUREREPORT", query)
				.submit("offline/plustwo/failurereporting.htm", true);
		},
		toAttachments: function(wo){
			if (wo.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}

			// Cache the current object
			wo.session.cache();
			
			doclinksService.toDoclinks({
				returnPage : options.viewName,
				entityName : 'WORKORDER',
				entityId : wo.WORKORDERID,
				appName : wo.mbo.appName()
			});
		},
		createFollowUp: function(wo){
			var workorder = new WorkOrder();
			
			workorder.createNew({
				DESCRIPTION: wo.DESCRIPTION,
				LONGDESCRIPTION: wo.LONGDESCRIPTION,
				LOCATION: wo.LOCATION,
				ASSETNUM: wo.ASSETNUM,
				PERSONGROUP: wo.PERSONGROUP,
		/*		AMCREW: wo.AMCREW,
				SUPERVISOR: wo.SUPERVISOR,
				LEAD: wo.LEAD,
				PHONE: wo.PHONE,
				PROBLEMCODE: wo.PROBLEMCODE,*/
				FAILURECODE: wo.FAILURECODE,
				WOPRIORITY: wo.WOPRIORITY,
				ISTASK: "0",
				// version 5.0.1 fix - siteid and origid on followup needs to be from the actual work order
				SITEID: wo.SITEID,
				ORGID: wo.ORGID,
				ORIGRECORDID: wo.WONUM,
				//STATUS: wo.STATUS,
				ORIGRECORDCLASS: "WORKORDER"
			});
			
			var failureReport = new FailureCode({
				WORKORDERID: workorder.WORKORDERID,
				FAILURECODE: workorder.FAILURECODE,
				PROBLEMCODE: workorder.PROBLEMCODE,
				CAUSECODE: null,
				REMEDYCODE: null
			});

			var whereClause = "WORKORDERID='" + workorder.WORKORDERID + "'";

			EMMServer.DB.MultiUpdate()
				.addInsertObject("WORKORDER", "INSERT", workorder.getMbo(), whereClause)
				.addInsertObject("FAILUREREPORT", "EDIT", failureReport.getMbo(), whereClause)
				.submit()
				.then(function(result){
					failureReport.session.remove(); // Be sure to remove session data
					workorder.session.remove(); // Be sure to remove session data
					PUBLIC.showDetail(workorder, getText('RECORDSAVED', null, 'Record Saved'));
				});					
			
		},
		startTimer: function(wo, labtransInfo){
			if (wo.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			
			if (labtransInfo.TIMERSTATUS == 'ACTIVE') {
				EMMServer.DB.Select()
					.addMessage(getText('TIMERALREADYSTARTED', null, 'Timer already started'))
					.go(options.viewName);
			} else {
				labtransService.startTimer(wo, labtransInfo, function(result){
					if (options.viewName == 'offline/plustwo/task.htm')
						PUBLIC.actions.toTask(wo, getText('TIMERSTARTED', null, 'Timer Started'));
					else
						PUBLIC.showDetail(wo, getText('TIMERSTARTED', null, 'Timer Started'));
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
					.go(options.viewName);
			} else {
				labtransService.stopTimer(wo, labtransInfo, function(result){
					if (options.viewName == 'offline/plustwo/task.htm')
						PUBLIC.actions.toTask(wo, getText('TIMERSTARTED', null, 'Timer Started'));
					else
						PUBLIC.showDetail(wo, getText('TIMERSTOPPED', null, 'Timer Stopped'));
				});
			}
		},
		toClassify : function(workorder){
			/* 
				Defines a classification object that defines the type of specification you are looking to adjust
				@returnPage -  return page of the current view
				@SPECTABLE - The specification table you will be querying against EX : assetspec, workorderspec
				@SPECCLASS - The Mbo class name of specification object
				@SPECUNIQUEIDNAME - The Unique key to the specification table
				@SPECADDSYNC -  The insert or add method defined against the specification table
				@SPECEDITSYNC - The edit or update method defined against the specification table
				@MBOUNIQUEIDNAME - The Unique key to the parent object of the specification
				@MBOOBJECTNAME - The table name of the parent object of the specification
				@MBOSYNCNAME - The edit or update method defined against the parent object
			*/
			var classificationObj = {
				returnPage : options.viewName,
				SPECTABLE : 'WORKORDERSPEC',
				SPECCLASS : 'WorkOrderSpec',
				SPECUNIQUEIDNAME : 'WORKORDERSPECID',
				SPECADDSYNC : 'GENERATE',
				SPECEDITSYNC : 'EDIT',
				MBOUNIQUEIDNAME : 'WORKORDERID',
				MBOOBJECTNAME : 'WORKORDER',
				MBOSYNCNAME : 'EDIT',
				
			};
			classificationService.actions.toClassify(workorder, classificationObj);
		}
	};

	var getWOHazardSql = function(wo){
		var hazardSql = "SELECT WO.WONUM, WSL.HAZARDID, WSL.WHDESCRIPTION, WSL.WHLONGDESCRIPTION FROM WORKORDER WO " +
			"INNER JOIN WOSAFETYLINK WSL ON WO.WONUM = WSL.WONUM AND WO.SITEID = WSL.SITEID " +
			"INNER JOIN WOHAZARD Z ON Z.HAZARDID = WSL.HAZARDID AND Z.WONUM = WSL.WONUM AND Z.SITEID = WSL.SITEID AND Z.WOSAFETYDATASOURCE = WSL.WOSAFETYDATASOURCE AND Z.PRECAUTIONENABLED = 1 AND Z.ORGID = WO.ORGID " +
			"WHERE WO.WORKORDERID='" + wo.WORKORDERID + "'" +
			"GROUP BY WSL.WONUM, WSL.HAZARDID, Z.DESCRIPTION";
		return hazardSql;
	};

	var getWOPrecautionSql = function(wo){
		var precautionSql = "SELECT WO.WONUM, WHP.HAZARDID, WHP.PRECAUTIONID, WHP.WPDESCRIPTION, WHP.WPLONGDESCRIPTION FROM WORKORDER WO " +
			"INNER JOIN WOHAZARDPREC WHP ON WO.WONUM = WHP.WONUM AND WO.SITEID = WHP.SITEID " +
			"WHERE WO.WORKORDERID='" + wo.WORKORDERID + "'";
		return precautionSql;
	};

	var getWOHazardMaterialSql = function(wo){
		var materialSql = "SELECT WO.WONUM, WSL.ASSET, WSL.LOC, WSL.WHDESCRIPTION, H.MSDSNUM, H.HEALTHRATING, H.FLAMMABILITYRATING, H.REACTIVITYRATING, H.CONTACTRATING, WSL.WHLONGDESCRIPTION " +
			"FROM WORKORDER WO " +
			"INNER JOIN WOSAFETYLINK WSL ON WO.WONUM = WSL.WONUM AND WO.SITEID = WSL.SITEID " +
			"INNER JOIN WOHAZARD H ON WSL.HAZARDID = H.HAZARDID AND WSL.WONUM = H.WONUM AND WSL.WOSAFETYDATASOURCE = H.WOSAFETYDATASOURCE AND WSL.SITEID = H.SITEID AND H.HAZMATENABLED = 1 AND H.ORGID = WO.ORGID " +
			"WHERE WO.WORKORDERID='" + self.WORKORDERID + "'";
		return materialSql;
	};

	var getWOHazardTagSql = function(wo){
		var woHarzardTagSql = "SELECT WO.WONUM, WSL.HAZARDID, WSL.WHDESCRIPTION, WSL.WHLONGDESCRIPTION FROM WORKORDER WO " +
			"INNER JOIN WOSAFETYLINK WSL ON WO.WONUM = WSL.WONUM AND WO.SITEID = WSL.SITEID " +
			"INNER JOIN WOHAZARD Z ON Z.HAZARDID = WSL.HAZARDID AND WSL.WONUM = Z.WONUM AND WSL.WOSAFETYDATASOURCE = Z.WOSAFETYDATASOURCE AND WSL.SITEID = Z.SITEID AND Z.TAGOUTENABLED = 1 AND Z.ORGID = WO.ORGID " +
			"WHERE WO.WORKORDERID='" + wo.WORKORDERID + "' " +
			"GROUP BY WO.WONUM, WSL.HAZARDID, Z.DESCRIPTION";
		return woHarzardTagSql;
	};

	var getWOTagOutSql = function(wo){
		var woTagOutSql = "SELECT WO.WONUM, WSL.HAZARDID, WSL.TAGOUTID, WSL.LOCATION, WSL.ASSETNUM, WSL.REQUIREDSTATE, WSL.WTDESCRIPTION, WSL.WTLONGDESCRIPTION FROM WORKORDER WO " +
			"INNER JOIN WOSAFETYLINK WSL ON WO.WONUM = WSL.WONUM AND WO.SITEID = WSL.SITEID " +
			"INNER JOIN WOHAZARD Z ON WSL.HAZARDID = Z.HAZARDID AND WSL.WONUM = Z.WONUM AND WSL.WOSAFETYDATASOURCE = Z.WOSAFETYDATASOURCE AND WSL.SITEID = Z.SITEID AND Z.TAGOUTENABLED = 1 " +
			"INNER JOIN WOTAGOUT T ON WSL.TAGOUTID = T.TAGOUTID AND WSL.SITEID = T.SITEID AND WSL.WONUM = T.WONUM AND WSL.WOSAFETYDATASOURCE = T.WOSAFETYDATASOURCE " +
			"WHERE WO.WORKORDERID='" + wo.WORKORDERID + "'";
		return woTagOutSql;
	};

	var getWOTagLockSql = function(wo){
		var woTagLockSql = "SELECT WO.WONUM, WTL.TAGOUTID, WTL.LOCKOUTID, WTL.LOCATION, WTL.ASSETNUM, WTL.REQUIREDSTATE, WTL.WLDESCRIPTION, WTL.WLLONGDESCRIPTION " +
			"FROM WORKORDER WO " +
			"INNER JOIN WOTAGLOCK WTL ON WO.WONUM = WTL.WONUM AND WO.SITEID = WTL.SITEID " +
			"INNER JOIN WOLOCKOUT L ON WTL.LOCKOUTID = L.LOCKOUTID AND WTL.SITEID = L.SITEID AND WTL.WONUM = L.WONUM " +
			"WHERE WO.WORKORDERID ='" + wo.WORKORDERID + "'";
		return woTagLockSql;
	};

	return PUBLIC;
});