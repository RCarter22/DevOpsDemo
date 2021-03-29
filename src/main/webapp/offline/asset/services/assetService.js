angular.module('emm').factory('assetService', function(domainService, doclinksService, wotrackService, srService, classificationService){
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
		var sql = "SELECT * FROM ASSET WHERE " + query;
		PUBLIC.toList(null,null,sql);	
	}
	PUBLIC.setStartCenterApplicationName('ASSET');

	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	PUBLIC.createNew = function(){
		var asset = new Asset();
		// Create a new in memory asset and set field defaults
		asset.createNew({
			SITEID: options.userInfo.siteId,
			ORGID: options.userInfo.orgId
		});
		
		// Save to the cache
		asset.session.cache();
		
		EMMServer.DB.Select()
			.addQuery('ASSET', asset.toSql())
			.submit('offline/asset/asset.htm', true);
	};
	
	PUBLIC.toList = function(searchValue, goBack, query){
		var viewName = 'offline/asset/list.htm';
		if(String.isNullOrEmpty(query))
			query = "SELECT * FROM ASSET WHERE SITEID = '" + options.userInfo.siteId + "'";
		
		if (goBack){
			if (EMMServer.DB.Select().getQuery(viewName))
				EMMServer.DB.Select().go(viewName);
			else {
				EMMServer.DB.Select()
					.addQuery('ASSET', query, 1, options.defaultPageSize)
					.submit(viewName, true);				
			}
			return;
		}
			
		if (searchValue && (typeof searchValue)==='string'){
			if (query.toUpperCase().indexOf("WHERE") > 0)
				query += " AND (ASSETNUM LIKE '%" + searchValue + "%' OR DESCRIPTION like '%" + searchValue + "%')";
			else
				query += " WHERE (ASSETNUM LIKE '%" + searchValue + "%' OR DESCRIPTION like '%" + searchValue + "%')";
			
			EMMServer.DB.Select()
				.addQuery('ASSET', query, 1, options.defaultPageSize)
				.submit(viewName, true);
		} else {
			EMMServer.DB.Select()
				.addQuery('ASSET', query, 1, options.defaultPageSize)
				.submit(viewName, true);			
		}								
	};
	
	PUBLIC.toAdvancedSearch = function(){		
		var advAsset = new Asset();
		// Create a new in memory asset and set field defaults
		advAsset.createNew({
			ISADVANCED: '1'
		});
		// Save to the cache
		advAsset.session.cache();
		
		EMMServer.DB.Select()
		.addQuery('ASSET', advAsset.toSql())
		.submit('offline/asset/advancedsearch.htm', true);
	};
	
	PUBLIC.doAdvancedSearch = function(asset){		
		var viewName = 'offline/asset/list.htm';
		var query = "SELECT * FROM ASSET WHERE 1=1 ";
					
		if(asset.ASSETNUM && asset.ASSETNUM != '')
			query += " AND ASSETNUM LIKE '%" + asset.ASSETNUM + "%'";
		if(asset.DESCRIPTION && asset.DESCRIPTION != '')
			query += " AND DESCRIPTION LIKE '%" + asset.DESCRIPTION + "%'";
		if(asset.STATUS && asset.STATUS != '')
			query += " AND STATUS = '" + asset.STATUS + "'";
		if(asset.LOCATION && asset.LOCATION != '')
			query += " AND LOCATION = '" + asset.LOCATION + "'";
		if(asset.PARENT && asset.PARENT != '')
			query += " AND PARENT = '" + asset.PARENT + "'";
		if(asset.ASSETTYPE && asset.ASSETTYPE != '')
			query += " AND ASSETTYPE = '" + asset.ASSETTYPE + "'";
		if(asset.GROUPNAME && asset.GROUPNAME != '')
			query += " AND GROUPNAME = '" + asset.GROUPNAME + "'";
		if(asset.SERIALNUM && asset.SERIALNUM != '')
			query += " AND SERIALNUM LIKE '%" + asset.SERIALNUM + "%'";	
		if(asset.VENDOR && asset.VENDOR != '')
			query += " AND VENDOR = '" + asset.VENDOR + "'";
		if(asset.FAILURECODE && asset.FAILURECODE != '')
			query += " AND FAILURECODE = '" + asset.FAILURECODE + "'";		
		if(asset.MANUFACURER && asset.MANUFACURER != '')	
			query += " AND MANUFACTURER = '" + asset.MANUFACURER + "'";
		if(asset.SITEID && asset.SITEID != '')	
			query += " AND SITEID = '" + asset.SITEID + "'";		
		
		EMMServer.DB.Select()
			.addQuery('ASSET', query, 1, options.defaultPageSize)
			.submit(viewName, true);								
	};
	
	PUBLIC.showDetail = function(asset, message, fromMap){
		// The MBO object should be queried in one SQL clause, this is because when the MBO object is updated, it has a one-to-one mapping to the database
		var sql = "SELECT * FROM ASSET WHERE ASSETUID = '" + asset.ASSETUID + "'";
		// All non-MBO related data should be queried separately
		// var extraSql = "SELECT * FROM ASSETMETER WHERE ASSETUID = '" + asset.ASSETUID + "'";
		
		EMMServer.DB.Select()
			.addQuery("ASSET", sql)
			// .addQuery("METERS", extraSql)
			.addMessage(message)
			.addEZWebMap(fromMap)
			.submit("offline/asset/asset.htm", true);	
	};
	PUBLIC.actions = {
		toMeterList : function(asset){
			//Cache Asset to send to next page
			asset.session.cache();
			var sql = "SELECT * FROM ASSETMETER WHERE ASSETUID = '" + asset.ASSETUID + "'";
			EMMServer.Session.setItem('ASSET',{
				returnPage : options.viewName,
				cacheKey : asset.session.cacheKey()
			});
			
			EMMServer.DB.Select()
			.addQuery("METERS", sql)
			.submit("offline/asset/assetmeterlist.htm",true);
		},
		toSpareParts : function(asset){
			var sql = "SELECT * FROM SPAREPART WHERE ASSETNUM = '" + asset.ASSETNUM + "' AND SITEID = '" + asset.SITEID + "'";
			
			EMMServer.DB.Select()
			.addQuery("SPAREPART", sql)
			.submit("offline/asset/listspareparts.htm",true);
		},		
		enterReadings : function(meter, message){
			var sql = "SELECT * FROM ASSETMETER WHERE ASSETMETERID = '" + meter.ASSETMETERID + "'";
			var sqlMeasurePoint = "SELECT MP.* FROM MEASUREPOINT MP";
			sqlMeasurePoint += " LEFT JOIN ASSETMETER AM ON MP.ASSETNUM = AM.ASSETNUM AND MP.METERNAME = AM.METERNAME AND MP.SITEID = AM.SITEID";
			sqlMeasurePoint += " WHERE AM.ASSETMETERID = '" + meter.ASSETMETERID + "'";

			EMMServer.DB.Select()
				.addQuery("METER", sql)
				.addQuery("MEASUREPOINT", sqlMeasurePoint)
				.addMessage(message)
				.submit("offline/asset/assetmeter.htm",true);
		},
		saveAsset : function(asset){
			if(asset.mbo.toBeSaved()){
				if(asset.mbo.validate()){
					var whereClause = "ASSETUID='" + asset.ASSETUID +"'";
					
					
					if(asset.mbo.isNew()){
						var failureCode = new FailureCode({
							ASSETID: asset.ASSETID,
							FAILURECODE: asset.FAILURECODE
						});
						multiUpdate = EMMServer.DB.MultiUpdate()
						.addInsertObject("ASSET","INSERT",asset.getMbo())
						.addInsertObject("FAILUREREPORT" ,"EDIT", failureCode.getMbo())
						.submit()
						.then(function(result){
							failureCode.session.remove();
							asset.session.remove();
							PUBLIC.showDetail(asset,getText('RECORDSAVED', null, 'Record Saved'));
						});
					} else {
						var failureCode = null;
						var update = EMMServer.DB.MultiUpdate()
						.addUpdateObject("ASSET","EDIT",asset.getMbo(), whereClause);
						if(asset.mbo.isFailureUpdated()){
								failureCode = new FailureCode({
									ASSETID: asset.ASSETID,
									FAILURECODE: asset.FAILURECODE
								});
							update.addUpdateObject("FAILUREREPORT","EDIT", failureCode.getMbo(), whereClause);
						}
						update.submit().then(function(result){
							if(failureCode)
								failureCode.session.remove();
							asset.session.remove();
							PUBLIC.showDetail(asset, getText('RECORDSAVED', null, 'Record Saved'));
						});
						
					}
				}
			}
		
		},
		saveAssetMeter: function(meter)
		{
			if(meter.READING){
				if(meter.mbo.validate()){
					var WhereClause = "ASSETMETERID = '" + meter.ASSETMETERID +"'";
					var dateTime = new Date();
					
					meter.LASTREADINGINSPCTR = options.userInfo.personId;
					// if the READING TYPE is DELTA, we don't want to overwrite the LASTREADING for displaying reasons
					// instead we will add the READING on top of the LASTREADING
					if (!String.isNullOrEmpty(meter.READINGTYPE) && meter.READINGTYPE.toUpperCase() == 'DELTA') {
						if (!meter.LASTREADING)
							meter.LASTREADING = '0';
						meter.LASTREADING = meter.LASTREADING.toNumber() + meter.READING.toNumber();
						meter.LASTREADING = meter.LASTREADING.toLocaleString();
					} else					
						meter.LASTREADING = meter.READING;
					meter.LASTREADINGDATE = dateTime.getTime();	
					
					meter.NEWREADING = meter.READING;
					meter.NEWREADINGDATE = dateTime.getTime();
					meter.READING = '';
					
					EMMServer.DB.Update('ASSETMETER', 'UPDATE_METER')
					.addObject(meter.getMbo(), WhereClause)
					.submit()
					.then(function(result){
						meter.session.remove();
						PUBLIC.actions.enterReadings(meter,getText('RECORDSAVED', null, 'Record Saved'));
					});	
				
				
				}
			}
		},
		toAttachments: function(asset){
			if (asset.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}

			// Cache the current object
			asset.session.cache();
			
			doclinksService.toDoclinks({
				returnPage : options.viewName,
				entityName : 'ASSET',
				entityId : asset.ASSETUID,
				appName : asset.mbo.appName()
			});
		},
		createServiceRequest : function(asset){
			
			var sr = new SR();
			
			sr.createNew({
				REPORTEDBY : options.userInfo.personId,				
				// ORGID: options.userInfo.orgId,
				AFFECTEDPERSON : options.userInfo.personId,
				ASSETNUM : asset.ASSETNUM,
				ASSETSITEID : asset.SITEID,
				ASSETORGID : asset.ORGID,
				LOCATION : asset.LOCATION
				});
			
			sr.session.cache();
			
			EMMServer.DB.Select()
			.addQuery('SR', sr.toSql())
			.submit('offline/sr/sr.htm', true);
		},
		createWorkOrder : function (asset){
			var wo = new WorkOrder();
			
			wo.createNew({
				REPORTEDBY : options.userInfo.personId,
				SITEID: options.userInfo.siteId,
				ORGID: options.userInfo.orgId,
				ASSETNUM : asset.ASSETNUM,
				FAILURECODE : asset.FAILURECODE,
				LOCATION : asset.LOCATION,
				ISTASK : '0'
			});
			wo.session.cache();
			
			EMMServer.DB.Select()
			.addQuery('WORKORDER', wo.toSql())
			.submit('offline/wotrack/wotrack.htm',true);				
		},
		toMoveAsset: function(asset){
			if (!String.isNullOrEmpty(asset.NEWLOCATION) || !String.isNullOrEmpty(asset.NEWSITE)){
				alert("Move Asset is pending. Please sync before moving the asset again.");				
				return;
			}
			asset.session.cache();
			
			var sql = "SELECT * FROM ASSET WHERE ASSETUID = '" + asset.ASSETUID + "'";
			// All non-MBO related data should be queried separately			
			
			EMMServer.DB.Select()
				.addQuery("ASSET", sql)				
				.submit("offline/asset/moveasset.htm", true);	
		},
		moveAsset: function(asset){
			
			EMMServer.DB.Update('ASSET', 'MOVEASSET')
			.addObject(asset.getMbo(), "ASSETUID='" + asset.ASSETUID +"'")
			.submit()
			.then(function(result){
				asset.session.remove();
				PUBLIC.showDetail(asset, getText('RECORDSAVED', null, 'Record Saved'));
			});	
		},
		reportDowntime : function(asset){			
			/*if (!workorder.ASSETNUM){
				alert(getText('NOASSET', null, 'Downtime reporting requires an asset. This work order does not have an asset.'));
				return;
			}*/

			if (asset.mbo.toBeSaved() && !message){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}

			var dt = new Downtime();
			dt.createNew({
				ASSETNUM : asset.ASSETNUM,
				ISRUNNING : asset.ISRUNNING,
				OPERATIONAL : '1',
				STATUSCHANGEDATE : new Date(),
				SITEID : asset.SITEID
			});
			asset.session.cache();
			dt.session.cache();

			EMMServer.Session.setItem('DOWNTIME_DATA',{
				returnPage : options.viewName,
				dtcacheKey : dt.session.cacheKey(),
				assetcacheKey : asset.session.cacheKey()
			});
			EMMServer.DB.Select()
				.addQuery("RECENTDOWNTIME", "SELECT CHANGEDATE FROM ASSETSTATUS WHERE ASSETNUM = '" + asset.ASSETNUM + "' AND SITEID = '" + asset.SITEID + "' ORDER BY date(changedate/1000,'unixepoch') desc LIMIT 1")
				.submit("offline/asset/downtime.htm", true);
		},	
		saveDowntime : function(downtime, asset, mode){
			if (downtime.mbo.toBeSaved()){
				if (downtime.mbo.validate()){
					if (downtime.mbo.isNew()){
						if(mode === 'REPORTDOWNTIME'){
							/*downtime.ENDCODE = downtime.STARTCODE;
							downtime.ENDOPERATIONAL = downtime.OPERATIONAL;
							downtime.STARTOPERATIONAL = downtime.OPERATIONAL;
							downtime.ENDWONUM = downtime.STARTWONUM;*/
							downtime.ASSETUID = asset.ASSETUID;
							
							EMMServer.DB.Insert('DOWNTIME', 'INSERTASSET')
								.addObject(downtime.getMbo())
								.submit()
								.then(function(result){
									downtime.session.remove();
									asset.session.remove();
									PUBLIC.showDetail(asset, getText('RECORDSAVED', null, 'Record Saved'));
									
								});
						}else{
							//null out any data that was possibly filled out
							downtime.STARTDATE = '';
							downtime.ENDDATE = '';	
							downtime.ASSETUID = asset.ASSETUID;
							
							var update = EMMServer.DB.MultiUpdate();
							var now = new Date();
							
							var at = new AssetStatus();
							at.createNew({
								ASSETNUM : asset.ASSETNUM,
								CHANGEDATE : downtime.STATUSCHANGEDATE,
								SITEID : asset.SITEID,
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
							update.addInsertObject("DOWNTIME","INSERTASSET", downtime.getMbo());
							update.submit()
								.then(function(result){
									downtime.session.remove();
									asset.session.remove();
									PUBLIC.showDetail(asset, getText('DOWNTIMESAVED', null, 'Asset\'s up/down status has been successfully changed'));
									
								});
						}
					}
				}
				else {
					alert(downtime.mbo.message());
				}
			}
		},
		toClassify : function(asset){
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
				SPECTABLE : 'ASSETSPEC',
				SPECCLASS : 'AssetSpec',
				SPECUNIQUEIDNAME : 'ASSETSPECID',
				SPECADDSYNC : 'GENERATE',
				SPECEDITSYNC : 'EDIT',
				MBOUNIQUEIDNAME : 'ASSETUID',
				MBOOBJECTNAME : 'ASSET',
				MBOSYNCNAME : 'EDIT',
				
			};
			classificationService.actions.toClassify(asset, classificationObj);
		}	
	};
	return PUBLIC;
});