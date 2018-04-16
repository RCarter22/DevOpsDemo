angular.module('emm').factory('srService', function(doclinksService, wotrackService, domainService, classificationService){
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
		var sql = "SELECT * FROM SR WHERE " + query;
		PUBLIC.toList(null,null,sql);	
	}
	PUBLIC.setStartCenterApplicationName('SR');


	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	PUBLIC.createNew = function(){
		var sr = new SR();
		// Create a new in memory sr and set field defaults
		sr.createNew();
		
		// Save to the cache
		sr.session.cache();
		
		EMMServer.DB.Select()
			.addQuery('SR', sr.toSql())
			.submit('offline/sr/sr.htm', true);
	};
	
	PUBLIC.toAdvancedSearch = function(){		
		var advSR = new SR();
		// Create a new in memory work order and set field defaults
		advSR.createNew({
			ISADVANCED: '1'
		});
		// Save to the cache
		advSR.session.cache();
		
		EMMServer.DB.Select()
		.addQuery('SR', advSR.toSql())
		.submit('offline/sr/advancedsearch.htm', true);
	};
	
	PUBLIC.doAdvancedSearch = function(sr){		
		var viewName = 'offline/sr/list.htm';
		var query = "SELECT * FROM SR WHERE 1=1 ";
		
		if(sr.TICKETID && sr.TICKETID != '')
			query += " AND TICKETID = '" + sr.TICKETID + "'";
		if(sr.DESCRIPTION && sr.DESCRIPTION != '')
			query += " AND DESCRIPTION LIKE '%" + sr.DESCRIPTION + "%'";
		if(sr.STATUS && sr.STATUS != '')
			query += " AND STATUS = '" + sr.STATUS + "'";
		if(sr.LOCATION && sr.LOCATION != '')
			query += " AND LOCATION = '" + sr.LOCATION + "'";
		if(sr.ASSETNUM && sr.ASSETNUM != '')
			query += " AND ASSETNUM = '" + sr.ASSETNUM + "'";
		if(sr.REPORTEDBY && sr.REPORTEDBY != '')
			query += " AND REPORTEDBY = '" + sr.REPORTEDBY + "'";
		if(sr.OWNER && sr.OWNER != '')
			query += " AND OWNER = '" + sr.OWNER + "'";
		
		query += " ORDER BY REPORTDATE DESC";
		
		EMMServer.DB.Select()
			.addQuery('SR', query, 1, options.defaultPageSize)
			.submit(viewName, true);								
	};
	
	PUBLIC.toNewList = function(){
		var viewName = 'offline/sr/list.htm';		
		var query = "SELECT * FROM SR WHERE STATUS = 'NEW'";
		query += " ORDER BY REPORTDATE DESC";
		EMMServer.DB.Select()
			.addQuery("SR", query, 1, options.defaultPageSize)
			.submit(viewName, true);		
	};

	PUBLIC.toActiveList = function(){
		var viewName = 'offline/sr/list.htm';		
		var query = "SELECT * FROM SR WHERE STATUS NOT IN ('NEW','CLOSED','RESOLVED')";
		query += " ORDER BY REPORTDATE DESC";
		EMMServer.DB.Select()
			.addQuery("SR", query, 1, options.defaultPageSize)
			.submit(viewName, true);
	};
	
	PUBLIC.toList = function(searchValue, goBack, query){
		var viewName = 'offline/sr/list.htm';
		if(String.isNullOrEmpty(query))
			query = "SELECT * FROM SR";
	
		if (goBack){
			if (EMMServer.DB.Select().getQuery(viewName))
				EMMServer.DB.Select().go(viewName);
			else {
				EMMServer.DB.Select()
					.addQuery('SR', query, 1, options.defaultPageSize)
					.submit(viewName, true);				
			}
			return;
		}
			
		if (searchValue && (typeof searchValue)==='string'){
			if (query.toUpperCase().indexOf("WHERE") > 0)
				query += " AND (TICKETID = '" + searchValue + "' OR DESCRIPTION like '%" + searchValue + "%' OR OWNER like '%" + searchValue + "%' OR OWNERGROUP = '" + searchValue + "' OR LOCATION = '" + searchValue + "')";
			else
				query += " WHERE (TICKETID = '" + searchValue + "' OR DESCRIPTION like '%" + searchValue + "%' OR OWNER like '%" + searchValue + "%' OR OWNERGROUP = '" + searchValue + "' OR LOCATION = '" + searchValue + "')";
			
			EMMServer.DB.Select()
				.addQuery("SR", query, 1, options.defaultPageSize)
				.submit(viewName, true);
		} else {
			EMMServer.DB.Select()
				.addQuery("SR", query, 1, options.defaultPageSize)
				.submit(viewName, true);
		}
		
	};
	
	PUBLIC.showDetails = function(sr, message){
		var statusListSql = "SELECT * FROM DOMAIN WHERE DOMAINID = 'SRSTATUS'";
		EMMServer.DB.Select()
			.addQuery("SR", "SELECT * FROM SR WHERE TICKETUID='" + sr.TICKETUID + "'")
			.addQuery("SRSTATUS", statusListSql)
			.addMessage(message)
			.submit("offline/sr/sr.htm", true);
	};
	
	PUBLIC.actions = {
		save: function(sr){
			if(sr.mbo.toBeSaved()){
				if (sr.mbo.validate()){
					if(sr.mbo.isNew()){
						EMMServer.DB.Insert('SR','INSERT')
						.addObject(sr.getMbo())
						.submit()
						.then(function(result){
							sr.session.remove();
							sr.mbo.isNew(false);
							PUBLIC.showDetails(sr, getText('RECORDSAVED', null, 'Record Saved'));
						});
					}else{
						EMMServer.DB.Update('SR', 'EDIT')
						.addObject(sr.getMbo(), "TICKETUID= '" + sr.TICKETUID + "'")
						.submit()
						.then(function(result){
							sr.session.remove();
							PUBLIC.showDetails(sr, getText('RECORDSAVED', null, 'Record Saved'));
						});
					}
				}
				else {
					alert(sr.mbo.message());
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
								PUBLIC.showDetails(sr, getText('SRQUEUED', [sr.TICKETID], 'SR ' + sr.TICKETID + ' status changed to QUEUED.'));							
							});	
					}
					else{
						EMMServer.DB.Update('SR', 'EDIT')
						.addObject(sr.getMbo(), "TICKETUID= '" + sr.TICKETUID + "'")
						.submit()
						.then(function(result){
							sr.session.remove();
							PUBLIC.showDetails(sr, getText('RECORDSAVED', null, 'Record Saved'));							
						});	
					}					
				} else {
					alert(sr.mbo.message());
				}
			} else {
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
			}
			
		},
		selectOwner : function(sr){
			if (sr.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			else{
				domainService.selectOwner(sr,'OWNER');
			}	
		},		
		toAttachments: function(sr){
			if (sr.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}

			// Cache the current object
			sr.session.cache();

			doclinksService.toDoclinks({
				returnPage : options.viewName,
				entityName : 'SR',
				entityId : sr.TICKETUID,
				appName : sr.mbo.appName()
			});
		},
		toChangeStatus: function(sr){
			if (sr.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}			
			domainService.toChangeStatus(sr, {
				fieldName: 'STATUS',
				action: 'UPDATE_STATUS',
				entityName : 'SR',
				whereClause : 'TICKETUID = "' + sr.TICKETUID + '"',
				returnPage : options.viewName
			});
		},		
		createWorkOrder : function (sr){			
			if (sr.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}			
			
			var siteId = sr.SITEID;
			if(sr.ASSETSITEID)
				siteId = sr.ASSETSITEID;
			
			if (siteId == null || siteId == ''){
				alert(getText('SITEREQUIRED', null, 'Site is required to create Work Order.'));				
				return;
			}	

			var wo = new WorkOrder();			
			
			wo.createNew({
				REPORTEDBY : options.userInfo.personId,
				DESCRIPTION: sr.DESCRIPTION,
				LONGDESCRIPTION: sr.LONGDESCRIPTION,
				LOCATION: sr.LOCATION,
				ASSETNUM: sr.ASSETNUM,
				PROBLEMCODE: sr.PROBLEMCODE,
				FAILURECODE: sr.FAILURECODE,				
				SITEID: siteId,
				ORGID: options.userInfo.orgId,
				ISTASK: '0',
				ORIGRECORDID: sr.TICKETID,
				ORIGRECORDCLASS: 'SR'
				});
			
			var failureReport = new FailureCode({
				WORKORDERID: wo.WORKORDERID,
				FAILURECODE: wo.FAILURECODE,
				PROBLEMCODE: null,
				CAUSECODE: null,
				REMEDYCODE: null
			});
			
			var whereClause = "WORKORDERID='" + wo.WORKORDERID + "'";
			
			wotrackService.init({
				userInfo : options.userInfo
			});	
			
			EMMServer.DB.MultiUpdate()
				.addInsertObject("WORKORDER", "INSERT", wo.getMbo(), whereClause)
				.addInsertObject("FAILUREREPORT", "EDIT", failureReport.getMbo(), whereClause)
				.submit()
				.then(function(result){
					failureReport.session.remove(); // Be sure to remove session data
					wo.session.remove(); // Be sure to remove session data
					wotrackService.showDetail(wo, getText('WOCREATED', [wo.WONUM], 'Work Order ' + wo.WONUM + ' Created.'));
				});			
				
		},			
		toWorkLog: function(sr){
			sr.session.cache();
			
			EMMServer.Session.setItem('WORKLOG_DATA', {
				returnPage : options.viewName,
				cacheKey : sr.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("WORKLOG", "SELECT * FROM WORKLOG WHERE TICKETUID = '" + sr.TICKETUID + "'")
				.submit("offline/worklog/main.htm", true);
		},
		toLabTrans: function(sr){
			sr.session.cache();
			
			EMMServer.Session.setItem('LABTRANS_DATA', {
				returnPage : options.viewName,
				cacheKey : sr.session.cacheKey()
			});
			
	        var laborInfo = "SELECT LABOR.LABORCODE, LABORCRAFTRATE.CRAFT " +
    			"FROM LABOR LEFT JOIN LABORCRAFTRATE ON LABOR.LABORCODE = LABORCRAFTRATE.LABORCODE AND LABOR.ORGID = LABORCRAFTRATE.ORGID AND LABORCRAFTRATE.DEFAULTCRAFT = '1'" +
    			"WHERE LABOR.PERSONID = '" + options.userInfo.personId + "' AND LABOR.ORGID =  '" + options.userInfo.orgId + "'";
	        
			EMMServer.DB.Select()
				.addQuery("LABTRANS", "SELECT * FROM LABTRANS WHERE TICKETUID = '" + sr.TICKETUID + "'")
				.addQuery("LABORINFO", laborInfo)
				.submit("offline/labtrans/main.htm", true);	
		},
		toClassify : function(sr){
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
				SPECTABLE : 'TICKETSPEC',
				SPECCLASS : 'TicketSpec',
				SPECUNIQUEIDNAME : 'TICKETSPECID',
				SPECADDSYNC : 'GENERATE',
				SPECEDITSYNC : 'EDIT',
				MBOUNIQUEIDNAME : 'TICKETUID',
				MBOOBJECTNAME : 'SR',
				MBOSYNCNAME : 'EDIT',
				
			};
			classificationService.actions.toClassify(sr, classificationObj);
		}
	};
	
	return PUBLIC;
	
});