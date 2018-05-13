angular.module('emm').factory('plustassetService', function(domainService,doclinksService,plustwoService,srService){
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
			.submit('offline/plustasset/asset.htm', true);
	};
	
	PUBLIC.toList = function(searchValue, goBack){
		var viewName = 'offline/plustasset/list.htm';
		var query = "SELECT * FROM ASSET WHERE defaultrepfac=(select defaultrepfac from maxuser where userid= '" + options.userInfo.personId + "' and siteid =defaultrepfacsiteid)";
		
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
		.submit('offline/plustasset/advancedsearch.htm', true);
	};
	
	PUBLIC.doAdvancedSearch = function(asset){		
		var viewName = 'offline/plustasset/list.htm';
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
		if(asset.PLUSTYEAR && asset.PLUSTYEAR != '')
			query += " AND PLUSTYEAR = '" + asset.PLUSTYEAR + "'";
		if(asset.PLUSTMODEL && asset.PLUSTMODEL != '')
			query += " AND PLUSTMODEL = '" + asset.PLUSTMODEL + "'";
		if(asset.AEPMAKE && asset.AEPMAKE != '')
			query += " AND AEPMAKE = '" + asset.AEPMAKE + "'";
		if(asset.DEFAULTREPFAC && asset.DEFAULTREPFAC != '')
			query += " AND DEFAULTREPFAC = '" + asset.DEFAULTREPFAC + "'";
		if(asset.LICENSENUM && asset.LICENSENUM != '')
			query += " AND LICENSENUM = '" + asset.LICENSENUM + "'";
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
	
	PUBLIC.showDetail = function(asset, message){
		// The MBO object should be queried in one SQL clause, this is because when the MBO object is updated, it has a one-to-one mapping to the database
		var sql = "SELECT * FROM ASSET WHERE ASSETUID = '" + asset.ASSETUID + "'";
		// All non-MBO related data should be queried separately
		// var extraSql = "SELECT * FROM ASSETMETER WHERE ASSETUID = '" + asset.ASSETUID + "'";
		
		EMMServer.DB.Select()
			.addQuery("ASSET", sql)
			// .addQuery("METERS", extraSql)
			.addMessage(message)
			.submit("offline/plustasset/asset.htm", true);	
	};
	
	PUBLIC.classify = {
		createAssetSpecs : function(asset,attributeSet){
			var assetspecs = [];
			var i = 0;

	        while(i<attributeSet.length)
			{
				var spec = new AssetSpec();
				spec.createNew({
					ASSETNUM: asset.ASSETNUM,
					ASSETUID: asset.ASSETUID,
					ASSETATTRID: attributeSet[i].ASSETATTRID,
					CLASSSTRUCTUREID: asset.CLASSSTRUCTUREID,
					DATATYPE: attributeSet[i].DATATYPE,
					DISPLAYSEQUENCE: attributeSet[i].SEQUENCE,
					DOMAINID: attributeSet[i].DOMAINID,
					MEASUREUNITID: attributeSet[i].MEASUREUNITID,
					MANDATORY: attributeSet[i].MANDATORY
				});
				
				spec.session.cache();
				assetspecs.push(spec);
	            i++;
			}
	        return assetspecs;
		},
		getAssetSpecSQL : function(assetspecs){
			var sqlSpecs ="";
			var i = assetspecs.length;;
			if(i == 1)
			{
				sqlSpecs = assetspecs[0].toSql();
			}
			else if (i == 0)
			{
				sqlSpecs = "SELECT * FROM (SELECT NULL) WHERE 0";
			}
			else
			{
	            var x= 0;
	            while(x < assetspecs.length)
				{
					sqlSpecs = sqlSpecs + " UNION " + assetspecs[x].toSql();
					if(!assetspecs[x].DOMAINID)
	                {
	                    sqlSpecs = sqlSpecs + ", NULL AS DOMAINID";
	                }
					if(!assetspecs[x].MEASUREUNITID)
	                {
	                    sqlSpecs = sqlSpecs + ", NULL AS MEASUREUNITID";
	                }
	                x++;
				}
	            sqlSpecs = "SELECT ASSETSPECID, ASSETNUM, ASSETUID, ASSETATTRID, CLASSSTRUCTUREID, DATATYPE, DISPLAYSEQUENCE, MANDATORY, DOMAINID FROM ("
					+ sqlSpecs.substr(7) + ") ORDER BY CAST(DISPLAYSEQUENCE  AS UNSIGNED)";
				
			}
			return sqlSpecs;
		},
		getClassHierarchy : function(classArray){
			var path ="";
			var i = classArray.length;
			if(i == 1)
			{
				path = classArray[0].CLASSIFICATIONID;
			}
			else if (i == 0)
			{
				path = "0";
			}
			else
			{
				path = classArray[0].CLASSIFICATIONID;
	            var x= 1;
	            while(x < classArray.length)
				{
					path = classArray[x].CLASSIFICATIONID+"/"+path;
	                x++;
				}
			}
			return path;
		},
		formatNumber : function(spec)
		{
			var numberWithCommas = function(x)
			{
				var xString = x.toLocaleString();
				if((x*10)%10 == 0)
					xString = xString + ".0";
                return xString;
			};
			if(spec.MEASUREUNITID)
			{
				return numberWithCommas(parseFloat(spec.NUMVALUE)) + " " + spec.MEASUREUNITID;
			}
			else
			{
				return numberWithCommas(parseFloat(spec.NUMVALUE));
				
			}
		},
		generateDescription : function(classArray, assetspecs){
			var path ="";
			var i = classArray.length;
			if(i == 1)
			{
				path = classArray[0].CLASSIFICATIONID;
			}
			else if (i == 0)
			{
				path = "0";
			}
			else
			{
				path = classArray[0].CLASSIFICATIONID;
	            var x= 1;
	            while(x < classArray.length)
				{
					path = classArray[x].CLASSIFICATIONID+","+path;
	                x++;
				}
			}
			
			var attrDesc = "";
			var x= 0;
			while(x < assetspecs.length)
			{
				if(assetspecs[x].DATATYPE == "NUMERIC")
					if(!String.isNullOrEmpty(assetspecs[x].NUMVALUE))
						attrDesc = attrDesc+", "+PUBLIC.classify.formatNumber(assetspecs[x]);
						
				if(assetspecs[x].DATATYPE == "ALN")
					if(!String.isNullOrEmpty(assetspecs[x].ALNVALUE))
						attrDesc = attrDesc+", "+assetspecs[x].ALNVALUE;
	            x++;
			}
	        
			if(attrDesc!="")
	            path = path+ ", " +attrDesc.substr(2);
	        
			return path;
		}
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
			.submit("offline/plustasset/assetmeterlist.htm",true);
		},
		toSpareParts : function(asset){
			var sql = "SELECT * FROM SPAREPART WHERE ASSETNUM = '" + asset.ASSETNUM + "' AND SITEID = '" + asset.SITEID + "'";
			
			EMMServer.DB.Select()
			.addQuery("SPAREPART", sql)
			.submit("offline/plustasset/listspareparts.htm",true);
		},	
		toWorkOrders : function(asset){
			var sql = "SELECT * FROM WORKORDER WHERE ASSETNUM = '" + asset.ASSETNUM + "' AND SITEID = '" + asset.SITEID + "' ORDER BY ACTSTART DESC";
			
			EMMServer.DB.Select()
			.addQuery("WORKORDER", sql)
			.submit("offline/plustasset/listwos.htm",true);
		},			
		toAssetAliases : function(asset){
			var sql = "SELECT * FROM PLUSTASSETALIAS WHERE ASSETNUM = '" + asset.ASSETNUM + "' AND SITEID = '" + asset.SITEID + "' AND ISASSETNUM = '0'";
			
			EMMServer.DB.Select()
			.addQuery("ALIASES", sql)
			.submit("offline/plustasset/listassetaliases.htm",true);
		},		
		toAssetLicenses : function(asset){
			var sql = "SELECT * FROM PLUSTLICENSE WHERE ASSETNUM = '" + asset.ASSETNUM + "' AND SITEID = '" + asset.SITEID + "'";
			
			EMMServer.DB.Select()
			.addQuery("LICENSES", sql)
			.submit("offline/plustasset/listassetlicenses.htm",true);
		},	
		toAssetUser : function(asset){
			var sql = "SELECT * FROM ASSETUSERCUST WHERE ASSETNUM = '" + asset.ASSETNUM + "' AND SITEID = '" + asset.SITEID + "'";
			var extraSql = "SELECT * FROM AEPASSETDEPT WHERE ASSETNUM = '" + asset.ASSETNUM + "' AND SITEID = '" + asset.SITEID + "'";
			

			EMMServer.DB.Select()
			.addQuery("USERS", sql)
			.addQuery("ASSETDEPT",extraSql)

			.submit("offline/plustasset/listassetusers.htm",true);
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
				.submit("offline/plustasset/assetmeter.htm",true);
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
		saveAssetClassifications : function(asset, assetspecs, toGen, pathSet){
			
			var toBeSaved = false;
			if(asset.mbo.toBeSaved())
				toBeSaved = true;
			var x = 0;
			while(x<assetspecs.length && (toBeSaved==false))
			{
				if(assetspecs[x].mbo.toBeSaved())
					toBeSaved = true;
				x++;
			}
			if(!toBeSaved)
				return;
			
			//SAVES CLASSIFICATION FOR ASSET THAT IS INPUTED
			//Checks if an asset is specified
			if(assetspecs)
			{
				//Checks validity of input first
				var i = 0;
                var numMessages=[];
                var mandatoryMessages=[];
				while(i<assetspecs.length)
				{
					spec = assetspecs[i];
					//Check if proper value inserted 
					if(!spec.mbo.validate())
					{
                        if(JSON.stringify(spec.mbo.message().toString()).indexOf("must be numeric")>=0)
                            numMessages.push(spec.ASSETATTRID);
                        if(JSON.stringify(spec.mbo.message().toString()).indexOf("is required")>=0)
                            mandatoryMessages.push(spec.ASSETATTRID);
					}
					i++;
				}
				if(numMessages.length>0)
                {
                    alert(numMessages + ": Require numeric values");
                    return;
                }
                if(mandatoryMessages.length>0)
                {
                    alert(mandatoryMessages + ": Missing fields are required");
                    return;
                }
				
				if(toGen)
					asset.DESCRIPTION = PUBLIC.classify.generateDescription(pathSet, assetspecs);
				
				//First need to update ClassstructureID, so save asset
				update = EMMServer.DB.MultiUpdate();
				if(asset.mbo.toBeSaved()){
					if(asset.mbo.validate()){
						var whereClause = "ASSETUID='" + asset.ASSETUID +"'";
						update = EMMServer.DB.MultiUpdate()
							.addUpdateObject("ASSET","CLASSIFY",asset.getMbo(), whereClause);
						if(asset.mbo.isFailureUpdated()){
								failureCode = new FailureCode({
									ASSETID: asset.ASSETID,
									FAILURECODE: asset.FAILURECODE
								});
							update.addUpdateObject("FAILUREREPORT","EDIT", failureCode.getMbo(), whereClause);
						}
						
					}
					else
					{
						return;
					}
				}
				else
				{
					if(toGen)
					{
						//TO UPDATE DESCRIPTION WITHIN LOCAL DATABASE, W/O A TRANSCATION
						var whereClause = "ASSETUID='" + asset.ASSETUID +"'";
						update = EMMServer.DB.MultiUpdate()
							.addUpdateObject("ASSET","NO_ACTION",asset.getMbo(), whereClause);
					}
				}
				
				//Save every individual asset spec
				i = 0;
				while(i<assetspecs.length)
				{
					spec = assetspecs[i];
					//Add individual insert update for each Spec
					if(spec.mbo.isNew())
					{
						update.addInsertObject("ASSETSPEC","EDIT",spec.getMbo());
					}
					else
					{
						var whereClause = "ASSETSPECID='" + spec.ASSETSPECID +"'";
						update.addUpdateObject("ASSETSPEC","EDIT",spec.getMbo(), whereClause);
					}
					i++;
				}
				
				update.submit()
				.then(function(result) {
					// Be sure to remove session data
		        	asset.session.remove();
		        	
		        	i = 0;
					while(i<assetspecs.length)
					{
						spec = assetspecs[i];
						spec.session.remove();
						i++;
					}
                    asset.mbo.toBeSaved(false);
					PUBLIC.actions.toClassify(asset, getText('RECORDSAVED', null, 'Record Saved'));
				});
			}
		},
		saveAssetMeter: function(meter)
		{
			if(meter.mbo.toBeSaved()){
				if(meter.mbo.validate()){
					var WhereClause = "ASSETMETERID = '" + meter.ASSETMETERID +"'";
					var dateTime = new Date();
					
					meter.LASTREADINGINSPCTR = options.userInfo.personId;
					// if the READING TYPE is DELTA, we don't want to overwrite the LASTREADING for displaying reasons
					// instead we will add the READING on top of the LASTREADING
					if (meter.READINGTYPE.toUpperCase() == 'DELTA') {
						if (!meter.LASTREADING)
							meter.LASTREADING = '0';
						meter.LASTREADING = parseFloat(meter.LASTREADING.replace(/[^\d\.]/g,'')) + parseFloat(meter.READING.replace(/[^\d\.]/g,''));
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
				entityId : asset.ASSETUID
			});
		},
		createServiceRequest : function(asset){
			
			var sr = new SR();
			
			sr.createNew({
				REPORTEDBY : options.userInfo.personId,				
				ORGID: options.userInfo.orgId,
				AFFECTEDPERSON : options.userInfo.personId,
				ASSETNUM : asset.ASSETNUM,
				ASSETSITEID : asset.SITEID,
				SITEID : asset.SITEID,
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
				ALIAS: asset.ALIAS,
				AEPUSINGDEPARTMENT: asset.CUSTOMER,
				FAILURECODE : asset.FAILURECODE,
				LOCATION : asset.LOCATION,
				STATUS: 'INPRG',
				ISTASK : '0'
			});
			wo.session.cache();
			
			EMMServer.DB.Select()
			.addQuery('WORKORDER', wo.toSql())
			.submit('offline/plustwo/wotrack.htm',true);				
		},
		toClassify : function(asset, message){
			if (asset.mbo.toBeSaved() && !message){
				alert('Record modified. Please save your changes.');
				return;
			}
			//Cache Asset to send to next page
			asset.session.cache();
			var sqlSpecs = "SELECT * FROM ASSETSPEC WHERE ASSETUID = '" + asset.ASSETUID + "' AND CLASSSTRUCTUREID = '" +asset.CLASSSTRUCTUREID+ "' ORDER BY CAST(DISPLAYSEQUENCE  AS UNSIGNED) ";
			var sqlClass = "SELECT * FROM CLASSSTRUCTURE WHERE CLASSSTRUCTUREID = '" + asset.CLASSSTRUCTUREID + "' AND OBJECTVALUE = 'ASSET'";
			var sqlPath = "WITH RECURSIVE cp AS ("
                					+"SELECT CLASSSTRUCTUREID, CLASSIFICATIONID, PARENT FROM CLASSSTRUCTURE WHERE CLASSSTRUCTUREID = '" + asset.CLASSSTRUCTUREID + "' AND OBJECTVALUE = 'ASSET'"
                					+" UNION ALL "
                					+" SELECT CLASSSTRUCTURE.CLASSSTRUCTUREID, CLASSSTRUCTURE.CLASSIFICATIONID, CLASSSTRUCTURE.PARENT FROM CLASSSTRUCTURE INNER JOIN cp "
                					+" ON CLASSSTRUCTURE.CLASSSTRUCTUREID=cp.PARENT AND CLASSSTRUCTURE.OBJECTVALUE = 'ASSET'"
                					+" WHERE cp.PARENT IS NOT NULL "
                				+")"
                				+"SELECT * FROM cp";
			EMMServer.Session.setItem('ASSET',{
				returnPage : 'offline/plustasset/asset.htm',
				cacheKey : asset.session.cacheKey()
			});
			
			EMMServer.DB.Select()
			.addQuery("SPECS", sqlSpecs)
			.addQuery("CLASSSTRUCT", sqlClass)
			.addQuery("PATH", sqlPath)
			.addMessage(message)
			.submit("offline/plustasset/classify.htm",true);
			
		}
	};
	
	return PUBLIC;
});