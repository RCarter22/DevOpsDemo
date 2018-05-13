angular.module('emm').factory('pluspwoService', function(domainService, doclinksService, labtransService){
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
		var wo = new WorkOrder();
		// Create a new in memory workorder and set field defaults
		wo.createNew({
			SITEID: options.userInfo.siteId,
			ORGID: options.userInfo.orgId,
			ISTASK: "0"
		});
		
		// Save to the cache
		wo.session.cache();
		
		EMMServer.DB.Select()
			.addQuery('WORKORDER', wo.toSql())
			.submit('offline/pluspwo/wotrack.htm', true);
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
		.submit('offline/pluspwo/advancedsearch.htm', true);
	};
	
	PUBLIC.doAdvancedSearch = function(wo){		
		var viewName = 'offline/pluspwo/list.htm';
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
			var schedstartfrom = wo.SCHEDSTARTFROM.substring(6,10) + '-' + wo.SCHEDSTARTFROM.substring(0,2) + '-' + wo.SCHEDSTARTFROM.substring(3,5);	
			query += " AND SCHEDSTART >= '" + schedstartfrom + "'";
		}
		if(wo.SCHEDSTARTTO && wo.SCHEDSTARTTO != ''){
			//need to convert the selected date into the appropriate format
			var schedstartto = wo.SCHEDSTARTTO.substring(6,10) + '-' + wo.SCHEDSTARTTO.substring(0,2) + '-' + wo.SCHEDSTARTTO.substring(3,5);	
			query += " AND SCHEDSTART <= '" + schedstartto + "'";
		}	
		
		query += " ORDER BY REPORTDATE DESC";
		
		EMMServer.DB.Select()
			.addQuery('WORKORDER', query, 1, options.defaultPageSize)
			.submit(viewName, true);			
					
	};
	
	PUBLIC.toList = function(searchValue, goBack){
		var viewName = 'offline/pluspwo/list.htm';
		var query = "SELECT * FROM WORKORDER WHERE ISTASK='0'";
	
		if (goBack){
			var fromChild = EMMServer.Session.getItem('FROMCHILD');
			var scQuery = '';
			
			if(fromChild != null && fromChild.fromchild != null && fromChild.fromchild == '1'){
				EMMServer.Session.setItem('FROMCHILD', null);
				if (EMMServer.DB.Select().getQuery('offline/pluspwo/listchildren.htm')){					
					EMMServer.DB.Select().go('offline/pluspwo/listchildren.htm');
					return;
				}						
			}
			
			if (EMMServer.DB.Select().getQuery(viewName)){
				EMMServer.DB.Select().go(viewName);
			}
			else {
				EMMServer.DB.Select()
					.addQuery('WORKORDER', query, 1, options.defaultPageSize)
					.submit(viewName, true);				
			}
			return;
		}
			
		var fromSC = EMMServer.Session.getItem('SCQUERY');
		var scQuery = '';
		
		if(fromSC != null)
			scQuery = fromSC.scquery;
		
		//if there is already a query from the start center, we want to append it to the search
		if(scQuery != ''){			
			//strip out order by if it exists
			if (scQuery.toUpperCase().indexOf("ORDER BY") > 0){
				var queryParts = scQuery.toUpperCase().split("ORDER BY");
				scQuery = queryParts[0];				
			}
			query = scQuery;
		} 

		
		if (searchValue && (typeof searchValue)==='string'){
			if (query.toUpperCase().indexOf("WHERE") > 0)
				query += " AND (WONUM = '" + searchValue + "' OR DESCRIPTION like '%" + searchValue + "%' OR LEAD like '%" + searchValue + "%' OR ASSETNUM = '" + searchValue + "' OR LOCATION = '" + searchValue + "')";
			else
				query += " WHERE (WONUM = '" + searchValue + "' OR DESCRIPTION like '%" + searchValue + "%' OR LEAD like '%" + searchValue + "%' OR ASSETNUM = '" + searchValue + "' OR LOCATION = '" + searchValue + "')";
			
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
			.submit("offline/pluspwo/list.htm", true);									
	};
	
	PUBLIC.showDetail = function(wo, message){
		// The MBO object should be queried in one SQL clause, this is because when the MBO object is updated, it has a one-to-one mapping to the database
		var sql = "SELECT * FROM WORKORDER WHERE WORKORDERID = '" + wo.WORKORDERID + "'";
		
		// All non-MBO related data should be queried separately
		var extraSql = "SELECT L.DESCRIPTION AS LOCDESC, LAB.LABORCODE AS TIMERLABORCODE, LCR.CRAFT AS TIMERCRAFT, LT.LABTRANSID AS TIMERLABTRANSID, LT.STARTDATE AS TIMERSTARTDATE, LT.STARTTIME AS TIMERSTARTTIME, LT.TIMERSTATUS " + 
		"FROM WORKORDER W LEFT OUTER JOIN LOCATIONS L ON W.LOCATION = L.LOCATION AND W.SITEID = L.SITEID " +
		"LEFT OUTER JOIN LABOR LAB ON W.ORGID = LAB.ORGID AND LAB.PERSONID = '" + options.userInfo.personId + "' " +
		"LEFT OUTER JOIN LABORCRAFTRATE LCR ON LAB.LABORCODE = LCR.LABORCODE AND LAB.ORGID = LCR.ORGID AND LCR.DEFAULTCRAFT = '1' " +
		"LEFT OUTER JOIN LABTRANS LT ON W.WONUM = LT.WONUM AND W.SITEID = LT.SITEID AND LT.LABORCODE = LAB.LABORCODE AND LT.TIMERSTATUS = 'ACTIVE' " +
		"WHERE W.WORKORDERID='" + wo.WORKORDERID + "'";
		
		var sqlClass = "SELECT * FROM CLASSSTRUCTURE WHERE CLASSSTRUCTUREID = '" + wo.CLASSSTRUCTUREID + "' AND OBJECTVALUE = 'WORKORDER'";
		var sqlPath = "WITH RECURSIVE cp AS ("
			+"SELECT CLASSSTRUCTUREID, CLASSIFICATIONID, PARENT FROM CLASSSTRUCTURE WHERE CLASSSTRUCTUREID = '" + wo.CLASSSTRUCTUREID + "' AND OBJECTVALUE = 'WORKORDER'"
			+" UNION ALL "
			+" SELECT CLASSSTRUCTURE.CLASSSTRUCTUREID, CLASSSTRUCTURE.CLASSIFICATIONID, CLASSSTRUCTURE.PARENT FROM CLASSSTRUCTURE INNER JOIN cp "
			+" ON CLASSSTRUCTURE.CLASSSTRUCTUREID=cp.PARENT AND CLASSSTRUCTURE.OBJECTVALUE = 'WORKORDER'"
			+" WHERE cp.PARENT IS NOT NULL "
		+") "
		+"SELECT * FROM cp";
		
		//add query to determine the wopriority lookup
		//if customer is filled out, use customer list, if they dont have their own, use the default
		var prioSql = "SELECT COUNT(*) AS PCOUNT FROM DOMAIN WHERE DOMAINID='SDX_URGENCY' and PLUSPCUSTOMER in (SELECT PLUSPCUSTOMER FROM WORKORDER WHERE WORKORDERID='" + wo.WORKORDERID + "')";
		
		EMMServer.DB.Select()
			.addQuery("WORKORDER", sql)
			.addQuery("EXTRA", extraSql)
			.addQuery("CLASSSTRUCT", sqlClass)
			.addQuery("PATH", sqlPath)
			.addQuery("PRIO", prioSql)
			.addMessage(message)
			.submit("offline/pluspwo/wotrack.htm", true);
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
			PARENTID: workorder.WORKORDERID,
			LOCATION: workorder.LOCATION,
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
			.submit("offline/pluspwo/task.htm", true);
	};
	
	PUBLIC.classify = {
			createWorkOrderSpecs : function(workorder,attributeSet){
				var workorderspecs = [];
				var i = 0;

		        while(i<attributeSet.length)
				{
					var spec = new WorkOrderSpec();
					spec.createNew({
						WONUM: workorder.WONUM,
						WORKORDERID: workorder.WORKORDERID,
						ASSETATTRID: attributeSet[i].ASSETATTRID,
						CLASSSTRUCTUREID: workorder.CLASSSTRUCTUREID,
						DATATYPE: attributeSet[i].DATATYPE,
						DISPLAYSEQUENCE: attributeSet[i].SEQUENCE,
						DOMAINID: attributeSet[i].DOMAINID,
						MEASUREUNITID: attributeSet[i].MEASUREUNITID,
						MANDATORY: attributeSet[i].MANDATORY
					});
					//DISPLAYSEQUENCE: i+1,
					spec.session.cache();
					workorderspecs.push(spec);
		            i++;
				}
		        return workorderspecs;
			},
			getWorkOrderSpecSQL : function(workorderspecs){
				var sqlSpecs ="";
				var i = workorderspecs.length;;
				if(i == 1)
				{
					sqlSpecs = workorderspecs[0].toSql();
				}
				else if (i == 0)
				{
					sqlSpecs = "SELECT * FROM (SELECT NULL) WHERE 0";
				}
				else
				{
		            var x= 0;
		            while(x < workorderspecs.length)
					{
						sqlSpecs = sqlSpecs + " UNION " + workorderspecs[x].toSql();
						if(!workorderspecs[x].DOMAINID)
		                {
		                    sqlSpecs = sqlSpecs + ", NULL AS DOMAINID";
		                }
						if(!workorderspecs[x].MEASUREUNITID)
		                {
		                    sqlSpecs = sqlSpecs + ", NULL AS MEASUREUNITID";
		                }
		                x++;
					}
					sqlSpecs = "SELECT WORKORDERSPECID, WONUM, WORKORDERID, ASSETATTRID, CLASSSTRUCTUREID, DATATYPE, DISPLAYSEQUENCE, MANDATORY, DOMAINID FROM ("
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
			generateDescription : function(classArray, workorderspecs){
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
				while(x < workorderspecs.length)
				{
					if(workorderspecs[x].DATATYPE == "NUMERIC")
						if(!String.isNullOrEmpty(workorderspecs[x].NUMVALUE))
							attrDesc = attrDesc+", "+PUBLIC.classify.formatNumber(workorderspecs[x]);
					if(workorderspecs[x].DATATYPE == "ALN")
						if(!String.isNullOrEmpty(workorderspecs[x].ALNVALUE))
							attrDesc = attrDesc+", "+workorderspecs[x].ALNVALUE;
		            x++;
				}
		        
				if(attrDesc!="")
		            path = path+ ", " +attrDesc.substr(2);
		        
				return path;
			},
			newAttribute : function(wo, seq, flag)
			{
				if(flag)
                {
					alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				    return;
                }

				var spec = new WorkOrderSpec();
				spec.createNew({
					WORKORDERID: wo.WORKORDERID,
					WONUM: wo.WONUM,
					CLASSSTRUCTUREID: wo.CLASSSTRUCTUREID,
                    DATATYPE: 'ALN',
					DISPLAYSEQUENCE: seq,
					MANDATORY: 0
				});
				spec.session.cache();
				EMMServer.Session.setItem('WORKORDER',{
					returnPage : 'offline/pluspwo/classify.htm',
					cacheKey : wo.session.cacheKey()
				});
                EMMServer.DB.Select()
				.addQuery("SPEC", spec.toSql())
				.submit("offline/pluspwo/attribute.htm",true);
				
			},
            saveAttribute :  function(spec, wo)
            {
                var update = EMMServer.DB.MultiUpdate();
                update.addInsertObject("WORKORDERSPEC","ADDNEW",spec.getMbo());
                update.submit()
                    .then(function(result) {
                        // Be sure to remove session data
                    	wo.mbo.toBeSaved(false);
                        spec.session.remove();
                        PUBLIC.actions.toClassify(wo, getText('RECORDSAVED', null, 'Record Saved'));
				});
            }			
	};

	PUBLIC.actions = {
		saveWorkorder : function(wo, fromRisk){
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
							if(!fromRisk)
								PUBLIC.showDetail(wo, getText('RECORDSAVED', null, 'Record Saved'));
							else{
								var message = '';
								
								var submit = EMMServer.DB.Select()
									.addQuery("WORKORDER", "SELECT * FROM WORKORDER WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
									.addQuery("SDXWORISKASSESS", "SELECT VALUE FROM DOMAIN WHERE DOMAINID = 'SDXWORISKASSESS'");
								
								if(wo.SDX_TOTALSCORE >= 15)
									submit.addQuery("ERRMESSAGE", "SELECT '" + getText('RISK.EXTREME', null, 'Extreme risk! Immediate action required. Stop the activity.') + "' AS DISPLAYMESSAGE");
								else
									submit.addMessage(getText('RECORDSAVED', null, 'Record Saved'));
									
								submit.submit("offline/pluspwo/riskassessment.htm", true);
							}
						});
					}	
				} else {
					alert(wo.mbo.message());
				}
			}		
		},
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
		listChildren: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('CHILDWO_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			var childrenSql = "SELECT * FROM WORKORDER WHERE ISTASK = '0' AND SITEID = '" + wo.SITEID + "' AND PARENT = '" + wo.WONUM + "'";
			
			EMMServer.DB.Select()
				.addQuery("WORKORDER", childrenSql)
				.submit("offline/pluspwo/listchildren.htm", true, 1, options.defaultPageSize);
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
		toSignature : function(wo){
			wo.session.cache();
			// Save session data to be retrieved from the change status page
			EMMServer.Session.setItem('SIGNATURE_DATA', {
				cacheKey : wo.session.cacheKey(),
				fieldName : 'SIGNATURE',
				action : 'ADD_SIGNATURE',
				entityName : 'WORKORDER',
				whereClause : "WORKORDERID='" + wo.WORKORDERID + "'",
				returnPage : options.viewName
			});
			EMMServer.DB.Select()
				.submit("offline/pluspwo/sign.htm", false);
		},
		viewSignatures: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('WORKLOG_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("SIGNATURES", "SELECT * FROM WORKLOG WHERE WORKORDERID = '" + wo.WORKORDERID + "' AND IMAGENAME IS NOT NULL AND IMAGENAME != ''")
				.submit("offline/pluspwo/signatures.htm", true);
		},		
		toWPService: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('WPSERVICE_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("WPSERVICE", "SELECT * FROM WPSERVICE WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
				.submit("offline/wpservice/main.htm", true);
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
		toWPTool: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('WPTOOL_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("WPTOOL", "SELECT * FROM WPTOOL WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
				.submit("offline/wptool/main.htm", true);
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
		toRiskAssessment: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('RISKASSESSMENT_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("WORKORDER", "SELECT * FROM WORKORDER WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
				.addQuery("SDXWORISKASSESS", "SELECT VALUE FROM DOMAIN WHERE DOMAINID = 'SDXWORISKASSESS'")
				.submit("offline/pluspwo/riskassessment.htm", true);
		},			
		toAssetWarranty: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('ASSETWARRANTY_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("WORKORDER", "SELECT * FROM WORKORDER WHERE WORKORDERID = '" + wo.WORKORDERID + "'")
				.submit("offline/pluspwo/assetwarranty.htm", true);
		},			
		
		toTask: function(wo, message){
			// All non-MBO related data should be queried separately
			var extraSql = "SELECT L.DESCRIPTION AS LOCDESC, LAB.LABORCODE AS TIMERLABORCODE, LCR.CRAFT AS TIMERCRAFT, LT.LABTRANSID AS TIMERLABTRANSID, LT.STARTDATE AS TIMERSTARTDATE, LT.TIMERSTATUS " + 
				"FROM WORKORDER W LEFT OUTER JOIN LOCATIONS L ON W.LOCATION = L.LOCATION AND W.SITEID = L.SITEID " +
				"LEFT OUTER JOIN LABOR LAB ON W.ORGID = LAB.ORGID AND LAB.PERSONID = '" + options.userInfo.personId + "' " +
				"LEFT OUTER JOIN LABORCRAFTRATE LCR ON LAB.LABORCODE = LCR.LABORCODE AND LAB.ORGID = LCR.ORGID AND LCR.DEFAULTCRAFT = '1' " +
				"LEFT OUTER JOIN LABTRANS LT ON W.WONUM = LT.WONUM AND W.SITEID = LT.SITEID AND LT.LABORCODE = LAB.LABORCODE AND LT.TIMERSTATUS = 'ACTIVE' " +
				"WHERE W.WORKORDERID='" + wo.WORKORDERID + "'";
			
			EMMServer.DB.Select()
				.addQuery("TASK", "SELECT * FROM WORKORDER WHERE WORKORDERID='" + wo.WORKORDERID + "' AND ISTASK='1'")
				.addQuery("EXTRA", extraSql)				
				.addMessage(message)
				.submit("offline/pluspwo/task.htm", true);
		},
		toTaskList: function(wo){
			wo.session.cache();
			
			EMMServer.Session.setItem('TASKLIST_DATA', {
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("TASKLIST", "SELECT * FROM WORKORDER  WHERE PARENTID='" + wo.WORKORDERID + "' AND ISTASK='1' ORDER BY CAST(TASKID AS INTEGER) ASC", 1, options.defaultPageSize)
				.submit("offline/pluspwo/tasklist.htm", true);
			
		},
		saveTask: function(wo){
			if (wo.mbo.toBeSaved()){
				if (wo.mbo.validate()){
					if (wo.mbo.isNew()){
						EMMServer.DB.Insert('WORKORDER', 'INSERT_TASK')
							.addObject(wo.getMbo())
							.submit()
							.then(function(result){
								// Be sure to remove session data
								wo.session.remove();
								wo.mbo.isNew(false);
								PUBLIC.actions.toTask(wo, getText('RECORDSAVED', null, 'Record Saved'));
							});
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
		toParent: function(wo){
			wo.session.remove();
			EMMServer.DB.Select()
				.go("offline/pluspwo/wotrack.htm");
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
				.submit("offline/pluspwo/multiassetlist.htm", true);
		},
		toMeterList : function(wo){
			wo.session.cache();
			var sqlAssetMeter = "SELECT * FROM ASSETMETER WHERE ASSETUID = (SELECT ASSETUID FROM ASSET WHERE ASSETNUM = '" + wo.ASSETNUM + "' AND SITEID = '" + wo.SITEID + "')";
			var sqlLocMeter = "SELECT * FROM LOCATIONMETER WHERE LOCATIONSID = (SELECT LOCATIONSID FROM LOCATIONS WHERE LOCATION = '" + wo.LOCATION + "' AND SITEID = '" + wo.SITEID + "')";
			EMMServer.Session.setItem('METER_DATA',{
				returnPage : options.viewName,
				cacheKey : wo.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery("ASSETMETERS", sqlAssetMeter)
				.addQuery("LOCMETERS", sqlLocMeter)
				.submit("offline/pluspwo/meters.htm",true);
		},
		saveAssetLocMeters: function(wo, assetmeters, locationmeters){
			// Get Current Date Time
			var dateTime = new Date();
			var update = EMMServer.DB.MultiUpdate();
			if (assetmeters) {
				for (var i=0; i<assetmeters.length; i++) {
					var assetmeter = assetmeters[i];
					if(assetmeter.READING){
						var WhereClause = "ASSETMETERID = '" + assetmeter.ASSETMETERID + "'";

						assetmeter.LASTREADINGINSPCTR = options.userInfo.personId;
						assetmeter.LASTREADING = assetmeter.READING;
						assetmeter.LASTREADINGDATE = dateTime.getTime();	
						
						assetmeter.NEWREADING = assetmeter.READING;
						assetmeter.NEWREADINGDATE = dateTime.getTime();
						
						assetmeter.READING = '';
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
					.go("offline/pluspwo/meters.htm");
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
			query += "  (SELECT FAILURELIST FROM FAILURECODE WHERE FAILURECODE = FR.FAILURECODE AND ORGID = '" + wo.ORGID + "') AS FAILURECODE_FAILURELIST,";
			query += "	(SELECT FAILURELIST FROM FAILURECODE";
			query += "		WHERE FAILURECODE = FR.PROBLEMCODE AND ORGID = '" + wo.ORGID + "'";
			query += "			AND PARENT = (SELECT FAILURELIST FROM FAILURECODE WHERE FAILURECODE = FR.FAILURECODE AND ORGID = '" + wo.ORGID + "')";
			query += "	) AS PROBLEMCODE_FAILURELIST,";
			query += "	(SELECT FAILURELIST FROM FAILURECODE";
			query += "		WHERE FAILURECODE = FR.CAUSECODE AND ORGID = '" + wo.ORGID + "'"; 
			query += "			AND PARENT = (";
			query += "				SELECT FAILURELIST FROM FAILURECODE";
			query += "					WHERE FAILURECODE = FR.PROBLEMCODE AND ORGID = '" + wo.ORGID + "'";
			query += "						AND PARENT = (SELECT FAILURELIST FROM FAILURECODE WHERE FAILURECODE = FR.FAILURECODE AND ORGID = '" + wo.ORGID + "')";
			query += "			)";
			query += "	) AS CAUSECODE_FAILURELIST";			
			query += " FROM FAILUREREPORT FR WHERE WORKORDERID = '" + WORKORDERID + "'";			
			
			EMMServer.DB.Select()
				.addQuery("FAILUREREPORT", query)
				.submit("offline/pluspwo/failurereporting.htm", true);
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
				entityId : wo.WORKORDERID
			});
		},
		createFollowUp: function(wo){
			var workorder = new WorkOrder();
			
			workorder.createNew({
				DESCRIPTION: wo.DESCRIPTION,
				LONGDESCRIPTION: wo.LONGDESCRIPTION,
				LOCATION: wo.LOCATION,
				SDX_LEGACYLOCATION : wo.SDX_LEGACYLOCATION,
				ASSETNUM: wo.ASSETNUM,
				SDX_LEGACYASSET : wo.SDX_LEGACYASSET,
				PLUSPCUSTOMER : wo.PLUSPCUSTOMER,
				PERSONGROUP: wo.PERSONGROUP,
				CREWID: wo.CREWID,
				SUPERVISOR: wo.SUPERVISOR,
				LEAD: wo.LEAD,
				PHONE: wo.PHONE,
				PROBLEMCODE: wo.PROBLEMCODE,
				WORKTYPE: wo.WORKTYPE,
				CLASSSTRUCTUREID: wo.CLASSSTRUCTUREID,
				FAILURECODE: wo.FAILURECODE,
				WOPRIORITY: wo.WOPRIORITY,
				ISTASK: "0",
				// version 5.0.1 fix - siteid and origid on followup needs to be from the actual work order
				SITEID: wo.SITEID,
				ORGID: wo.ORGID,
				ORIGRECORDID: wo.WONUM,
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
					if(wo.STATUS != 'COMP' && wo.STATUS != 'INPRG'){
						//add sodexo logic here for adjusting to INPRG
						if(  /*COND1*/((wo.WORKTYPE == 'RM' || wo.WORKTYPE=='SDXD') && (wo.STATUS=='REC' || wo.STATUS =='ACK')) ||
							 /*COND2*/((wo.WORKTYPE == 'CM' || wo.WORKTYPE=='CMSTA') && (wo.STATUS=='REC' )) ||
							 /*COND3*/((wo.WORKTYPE == 'PM' || wo.WORKTYPE=='PMMAND' || wo.WORKTYPE=='PMSTA') && (wo.STATUS=='SCHED' || wo.STATUS =='REC')) ||
							 /*COND4*/((wo.WORKTYPE == 'QUOTE') && (wo.STATUS=='APPR')) ||
							 /*COND5*/((wo.WORKTYPE == 'PRO' || wo.WORKTYPE == 'WAPPR') && (wo.STATUS=='WAPPR')) ||
							 /*COND6*/((wo.WORKTYPE !== 'RM' && wo.WORKTYPE !=='CM' && wo.WORKTYPE !=='PM' && wo.WORKTYPE !=='PRO' && wo.WORKTYPE !=='QUOTE' && wo.WORKTYPE !=='CMSTA' && wo.WORKTYPE !=='PMMAND' && wo.WORKTYPE !=='PMSTA' && wo.WORKTYPE !=='SDXD') && (wo.STATUS=='REC'))
							/*END*/){
							var whereClause = "WORKORDERID = '" + wo.WORKORDERID +"'";
							
							var currentTime = new Date();
										
							var updateData = { 
									STATUSDATE : currentTime.getTime(),
									STATUS : "INPRG"
								};
							
							EMMServer.DB.MultiUpdate()
								.addUpdateObject("WORKORDER", "UPDATE_STATUS", updateData, whereClause)		
								.submit()
								.then(function(result){
									wo.session.remove();
									if (options.viewName == 'offline/pluspwo/task.htm')
										PUBLIC.actions.toTask(wo, getText('TIMERSTARTED', null, 'Timer Started'));
									else 
										PUBLIC.showDetail(wo, getText('TIMERSTARTSTATUS', null, 'Timer Started. Status changed to INPRG.'));									
								});
						}else{
							if (options.viewName == 'offline/pluwpwo/task.htm')
								PUBLIC.actions.toTask(wo, getText('TIMERSTARTED', null, 'Timer Started'));
							else 
								PUBLIC.showDetail(wo, getText('TIMERSTARTED', null, 'Timer Started'));	
						}					
					}
					else{
						if (options.viewName == 'offline/pluwpwo/task.htm')
							PUBLIC.actions.toTask(wo, getText('TIMERSTARTED', null, 'Timer Started'));
						else 
							PUBLIC.showDetail(wo, getText('TIMERSTARTED', null, 'Timer Started'));	
					}
				});
			}
		},
		stopTimer: function(wo, labtransInfo, compwo){
			if (wo.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			
			if (!labtransInfo.TIMERSTATUS || labtransInfo.TIMERSTATUS == "COMPLETE") {
				EMMServer.DB.Select()
					.addMessage(getText('TIMERNOTFOUND', null, 'Timer not started. No active timer found.'))
					.go(options.viewName);
			} else {
				labtransService.stopTimerPopup(wo, labtransInfo);
				
				//old code
				/*labtransService.stopTimer(wo, labtransInfo, function(result){
					
					if(compwo && compwo == '1'){
						var whereClause = "WORKORDERID = '" + wo.WORKORDERID +"'";
						
						var currentTime = new Date();
									
						var updateData = { 
								STATUSDATE : currentTime.getTime(),
								STATUS : "COMP"
							};
						
						EMMServer.DB.MultiUpdate()
							.addUpdateObject("WORKORDER", "UPDATE_STATUS", updateData, whereClause)		
							.submit()
							.then(function(result){
								wo.session.remove();
								if (options.viewName == 'offline/pluwpwo/task.htm')
									PUBLIC.actions.toTask(wo, getText('TIMERSTOPPED', null, 'Timer Stopped'));
								else 
									PUBLIC.showDetail(wo, getText('TIMERSTOPPED', null, 'Timer Stopped') + '. Status changed to COMP.');									
							});					
					}
					else{
						if (options.viewName == 'offline/pluspwo/task.htm')
							PUBLIC.actions.toTask(wo, getText('TIMERSTOPPED', null, 'Timer Stopped'));
						else 					
							PUBLIC.showDetail(wo, getText('TIMERSTOPPED', null, 'Timer Stopped'));	
					}
				});*/
			}
		},
		toClassify : function(workorder, message){
			if (workorder.mbo.toBeSaved() && !message){
				alert('Record modified. Please save your changes.');
				return;
			}
			//Cache WorkOrder to send to next page
			workorder.session.cache();
			var sqlSpecs = "SELECT * FROM WORKORDERSPEC WHERE WORKORDERID = '" + workorder.WORKORDERID + "' AND CLASSSTRUCTUREID = '" +workorder.CLASSSTRUCTUREID+ "' ORDER BY CAST(DISPLAYSEQUENCE AS UNSIGNED) ";
			var sqlClass = "SELECT * FROM CLASSSTRUCTURE WHERE CLASSSTRUCTUREID = '" + workorder.CLASSSTRUCTUREID + "' AND OBJECTVALUE = 'WORKORDER'";
			var sqlPath = "WITH RECURSIVE cp AS ("
                					+"SELECT CLASSSTRUCTUREID, CLASSIFICATIONID, PARENT FROM CLASSSTRUCTURE WHERE CLASSSTRUCTUREID = '" + workorder.CLASSSTRUCTUREID + "' AND OBJECTVALUE = 'WORKORDER'"
                					+" UNION ALL "
                					+" SELECT CLASSSTRUCTURE.CLASSSTRUCTUREID, CLASSSTRUCTURE.CLASSIFICATIONID, CLASSSTRUCTURE.PARENT FROM CLASSSTRUCTURE INNER JOIN cp "
                					+" ON CLASSSTRUCTURE.CLASSSTRUCTUREID=cp.PARENT AND CLASSSTRUCTURE.OBJECTVALUE = 'WORKORDER'"
                					+" WHERE cp.PARENT IS NOT NULL "
                				+") "
                				+"SELECT * FROM cp";
			EMMServer.Session.setItem('WORKORDER',{
				returnPage : 'offline/pluspwo/wotrack.htm',
				cacheKey : workorder.session.cacheKey()
			});
			
			EMMServer.DB.Select()
			.addQuery("SPECS", sqlSpecs)
			.addQuery("CLASSSTRUCT", sqlClass)
			.addQuery("PATH", sqlPath)
			.addMessage(message)
			.submit("offline/pluspwo/classify.htm",true);
			
		},
		applySLA : function(wo){
			if (wo.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			
			if(!wo.WOPRIORITY || wo.WOPRIORITY == '0'){
				alert(getText('NOSLA', null, 'No service level agreement was found.'));
				return;
			}
			EMMServer.DB.Insert('WORKORDER', 'APPLYSLA')
				.addObject(wo.getMbo())
				.submit()
				.then(function(result){
					// Be sure to remove session data
					wo.session.remove();
					PUBLIC.showDetail(wo, getText('APPLYSLAMESSAGE', null, 'Applied SLA(s). Sync to apply SLAs'));
				});
		},
		saveWorkOrderClassifications : function(workorder, workorderspecs, toGen, pathSet){
			
			var toBeSaved = false;
			if(workorder.mbo.toBeSaved())
				toBeSaved = true;
			var x = 0;
			while(x<workorderspecs.length && (toBeSaved==false))
			{
				if(workorderspecs[x].mbo.toBeSaved())
					toBeSaved = true;
				x++;
			}
			if(!toBeSaved)
				return;
			
			//SAVES CLASSIFICATION FOR WORK ORDER THAT IS INPUTED
			//Checks if a work order is specified
			if(workorderspecs)
			{
				//Checks validity of input first
				var i = 0;
				var numMessages=[];
                var mandatoryMessages=[];
				while(i<workorderspecs.length)
				{
					spec = workorderspecs[i];
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
					workorder.DESCRIPTION = PUBLIC.classify.generateDescription(pathSet, workorderspecs);
				
				//First need to update ClassstructureID, so save work order
				update = EMMServer.DB.MultiUpdate();
				if(workorder.mbo.toBeSaved()){
					if(workorder.mbo.validate()){
						var whereClause = "WORKORDERID='" + workorder.WORKORDERID +"'";
						update = EMMServer.DB.MultiUpdate()
							.addUpdateObject("WORKORDER","CLASSIFY",workorder.getMbo(), whereClause);
						if(workorder.mbo.isFailureUpdated()){
								failureCode = new FailureCode({
									WORKORDERID: workorder.WORKORDERID,
									FAILURECODE: workorder.FAILURECODE
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
						var whereClause = "WORKORDERID='" + workorder.WORKORDERID +"'";
						update = EMMServer.DB.MultiUpdate()
							.addUpdateObject("WORKORDER","NO_ACTION",workorder.getMbo(), whereClause);
					}
				}
				
				//Save every individual work order spec
				i = 0;
				while(i<workorderspecs.length)
				{
					spec = workorderspecs[i];
					//Add individual insert update for each Spec
					if(spec.mbo.isNew())
					{
						update.addInsertObject("WORKORDERSPEC","EDIT",spec.getMbo());
					}
					else
					{
						var whereClause = "WORKORDERSPECID='" + spec.WORKORDERSPECID +"'";
						update.addUpdateObject("WORKORDERSPEC","EDIT",spec.getMbo(), whereClause);
					}
					i++;
				}
				
				update.submit()
				.then(function(result) {
					// Be sure to remove session data
		        	workorder.session.remove();
		        	
		        	i = 0;
					while(i<workorderspecs.length)
					{
						spec = workorderspecs[i];
						spec.session.remove();
						i++;
					}
                    workorder.mbo.toBeSaved(false);
					PUBLIC.actions.toClassify(workorder, getText('RECORDSAVED', null, 'Record Saved'));
				});
				
			}
		}
	};
	
	return PUBLIC;
});