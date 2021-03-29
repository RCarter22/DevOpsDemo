angular.module('emm').factory('inspectorService', function($filter, domainService, doclinksService){
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
		var sql = "SELECT * FROM INSPECTIONRESULT WHERE " + query;
		PUBLIC.toList(null,null,sql);	
	}
	PUBLIC.setStartCenterApplicationName('INSPECTOR');

	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	PUBLIC.toList = function(searchValue, goBack, query, status){
		var viewName = 'offline/inspector/insplist.htm';
		if(String.isNullOrEmpty(query)) {
			var query = "SELECT R.*, A.DESCRIPTION AS ASSETDESC, L.DESCRIPTION AS LOCDESC, W.DESCRIPTION AS WODESC, "
					+ "P.INSPECTIONRESULTID AS PARENTID, P.STATUS AS PARENTSTATUS "
					+ "FROM INSPECTIONRESULT R "
					+ "LEFT JOIN ASSET A ON R.ASSET = A.ASSETNUM AND R.SITEID = A.SITEID "
					+ "LEFT JOIN LOCATIONS L ON R.LOCATION = L.LOCATION AND R.SITEID = L.SITEID "
					+ "LEFT JOIN INSPECTIONRESULT P ON R.PARENT = P.REFERENCEOBJECTID AND P.REFERENCEOBJECT = 'PARENTWO' "
					+ "LEFT JOIN WORKORDER W ON R.REFERENCEOBJECTID = W.WONUM ";
			if (status)
				query += "WHERE R.STATUS = '" + status + "'";
		}
	
		EMMServer.Session.setItem('STATUS', status);
		
		if (goBack){
			if (EMMServer.DB.Select().getQuery(viewName))
				EMMServer.DB.Select().go(viewName);
			else {
				EMMServer.DB.Select()
					.addQuery('INSPECTIONRESULT', query, 1, options.defaultPageSize)
					.submit(viewName, true);				
			}
			return;
		}
			
		if (searchValue && (typeof searchValue)==='string'){
			query += (query.toUpperCase().indexOf("WHERE") > 0 ? " AND " : " WHERE ");
			query += " (R.RESULTNUM = '{0}' OR R.NAME like '%{0}%' OR R.STATUS like '%{0}%' OR R.ASSET = '{0}' OR R.LOCATION = '{0}')".format(searchValue);

			EMMServer.DB.Select()
				.addQuery('INSPECTIONRESULT', query, 1, options.defaultPageSize)
				.submit(viewName, true);
		} else {
			EMMServer.DB.Select()
				.addQuery('INSPECTIONRESULT', query, 1, options.defaultPageSize)
				.submit(viewName, true);			
		}								
	};
	
	PUBLIC.showDetail = function(inspectionresult, message){
		var resultSql = "SELECT R.*, A.DESCRIPTION AS ASSETDESC, L.DESCRIPTION AS LOCDESC, F.LONGDESCRIPTION "
						+ "FROM INSPECTIONRESULT R "
						+ "LEFT JOIN ASSET A ON R.ASSET = A.ASSETNUM AND R.SITEID = A.SITEID "
						+ "LEFT JOIN LOCATIONS L ON R.LOCATION = L.LOCATION AND R.SITEID = L.SITEID "
						+ "LEFT JOIN INSPECTIONFORM F ON R.INSPFORMNUM = F.INSPFORMNUM AND R.REVISION = F.REVISION AND R.ORGID = F.ORGID "
						+ "WHERE R.RESULTNUM = '" + inspectionresult.RESULTNUM + "' AND R.SITEID = '"  + inspectionresult.SITEID + "' ";

		var questionSql = "SELECT INSPQUESTIONNUM, DESCRIPTION, GROUPID, GROUPSEQ, SEQUENCE, LONGDESCRIPTION FROM INSPQUESTION "
						+ "WHERE INSPFORMNUM = '" + inspectionresult.INSPFORMNUM + "' AND REVISION = '" + inspectionresult.REVISION + "' "
						+ "ORDER BY CAST(GROUPSEQ as decimal)";
		
		var inspfieldSql = "SELECT F.* FROM INSPFIELD F "
						+ "WHERE F.INSPFORMNUM = '" + inspectionresult.INSPFORMNUM + "' AND F.REVISION = '" + inspectionresult.REVISION 
						+ "' AND F.ORGID = '"  + inspectionresult.ORGID + "' "
						+ "ORDER BY F.INSPQUESTIONNUM, F.SEQUENCE";
		
		var fieldresultSql = "SELECT * FROM INSPFIELDRESULT "
						+ "WHERE RESULTNUM = '" + inspectionresult.RESULTNUM + "' AND SITEID = '"  + inspectionresult.SITEID + "' ";
						+ "ORDER BY INSPQUESTIONNUM ";
		
		var fieldoptionSql =  "SELECT * FROM INSPFIELDOPTION "
						+ "WHERE INSPFORMNUM = '" + inspectionresult.INSPFORMNUM + "' AND REVISION = '" + inspectionresult.REVISION
						+ "' AND ORGID = '"  + inspectionresult.ORGID + "' "
						+ "ORDER BY INSPFIELDNUM, SEQUENCE";

		var doclinkSql = "SELECT D.DOCUMENT, D.DOCTYPE, DI.DESCRIPTION, D.OWNERID FROM DOCLINKS D "
						+ "LEFT JOIN EMMDOCINFO E ON E.DOCINFOID = D.DOCINFOID "
						+ "LEFT JOIN DOCINFO DI ON DI.DOCINFOID = D.DOCINFOID "
						+ "WHERE (E.DOWNLOADED is null or E.DOWNLOADED = '0') AND EXISTS ( SELECT 1 FROM APPDOCTYPE WHERE APP = 'INSPECTOR' AND DOCTYPE = D.DOCTYPE) "
						+ "AND D.OWNERTABLE = 'INSPFIELDRESULT' AND D.OWNERID IN (SELECT INSPFIELDRESULTID FROM INSPFIELDRESULT WHERE "
						+ "RESULTNUM = '" + inspectionresult.RESULTNUM + "' AND SITEID = '"  + inspectionresult.SITEID + "') "
						+ "UNION "
						+ "SELECT DOCNAME AS DOCUMENT, DOCTYPE, DOCDESCRIPTION, OWNERENTITYID AS OWNERID FROM EMMDOCINFO "
						+ "WHERE OWNERENTITY = 'INSPFIELDRESULT' AND OWNERENTITYID IN (SELECT INSPFIELDRESULTID FROM INSPFIELDRESULT WHERE "
						+ "RESULTNUM = '" + inspectionresult.RESULTNUM + "' AND SITEID = '"  + inspectionresult.SITEID + "') ";

		var meterSql, measurementSql, meterReadingSql;
		var readingTable, where;
		
		if (!String.isNullOrEmpty(inspectionresult.ASSET)) {
			meterSql =  "SELECT mt.METERNAME, mt.ROLLOVER, mt.DOMAINID, n.VALUE "
						+ "FROM ASSETMETER mt "
						+ "LEFT JOIN DOMAIN n ON mt.DOMAINID = n.DOMAINID "
						+ "WHERE mt.ASSETUID = (SELECT ASSETUID FROM ASSET WHERE ASSETNUM = '" +  inspectionresult.ASSET + "' AND SITEID = '" +  inspectionresult.SITEID + "') "
						+ "ORDER BY mt.METERNAME, n.DOMAINID";
			readingTable = "METERREADING";
			where = " WHERE ASSETNUM = '" +  inspectionresult.ASSET + "' AND SITEID = '" +  inspectionresult.SITEID + "' ";
		} else if (!String.isNullOrEmpty(inspectionresult.LOCATION)) {
			meterSql =  "SELECT mt.METERNAME, mt.ROLLOVER, mt.DOMAINID, n.VALUE "
						+ "FROM LOCATIONMETER mt "
						+ "LEFT JOIN DOMAIN n ON mt.DOMAINID = n.DOMAINID "
						+ "WHERE mt.LOCATIONSID = (SELECT LOCATIONSID FROM LOCATIONS WHERE LOCATION = '" +  inspectionresult.LOCATION + "' AND SITEID = '" +  inspectionresult.SITEID + "') "
						+ "ORDER BY mt.METERNAME, n.DOMAINID";
			readingTable = "LOCMETERREADING";
			where = " WHERE LOCATION = '" +  inspectionresult.LOCATION + "' AND SITEID = '" +  inspectionresult.SITEID + "' ";
		}

		if (!String.isNullOrEmpty(inspectionresult.ASSET) || !String.isNullOrEmpty(inspectionresult.LOCATION)) {
			measurementSql =  "SELECT METERNAME, OBSERVATION, MEASUREMENTVALUE AS READING, MEASUREDATE AS READINGDATE, INSPECTOR, 0 AS DIDROLLOVER "
						+ "FROM MEASUREMENT "
						+ where
						+ "ORDER BY MEASUREDATE DESC";
		
			meterReadingSql =  "SELECT METERNAME, null as OBSERVATION, READING, READINGDATE,INSPECTOR, DIDROLLOVER "
						+ "FROM " + readingTable
						+ where
						+ "ORDER BY READINGDATE DESC";
		}
		
		var parentOthersSql = "SELECT * FROM INSPECTIONRESULT WHERE PARENT = '" + inspectionresult.PARENT + "' AND "
						+ "ORGID = '" + inspectionresult.ORGID + "' AND SITEID = '" + inspectionresult.SITEID + "' AND "
						+ "RESULTNUM <> '" + inspectionresult.RESULTNUM + "' AND STATUS != 'COMPLETED'";
		
		var parentSql = "SELECT * FROM INSPECTIONRESULT WHERE REFERENCEOBJECT = 'PARENTWO' AND "
						+ "ORGID = '" + inspectionresult.ORGID + "' AND SITEID = '" + inspectionresult.SITEID + "' AND "
						+ "REFERENCEOBJECTID = '" + inspectionresult.PARENT + "'";
		
		var followupSql = "SELECT * FROM INSPFIELDRESULT WHERE ORGID = '" + inspectionresult.ORGID + "' AND SITEID = '" 
						+ inspectionresult.SITEID + "' AND RESULTNUM = '" + inspectionresult.RESULTNUM + "' AND FUPOBJECT IS NOT NULL";

		
		if (options.userInfo.serverInfo.maximoVersion.patch.toNumber() >= 1) {
			inspfieldSql = "SELECT F.*, C.SRCFIELD, C.SRCTXTRESPONSE, C.VISIBLE AS TGTVISIBLE, C.REQUIRED AS TGTREQUIRED " 
							+ "FROM INSPFIELD F "
							+ "LEFT JOIN INSPCASCADEOPTION C ON F.INSPFORMNUM = C.INSPFORMNUM and F.REVISION = C.REVISION and F.ORGID = C.ORGID and F.INSPFIELDNUM = C.TGTFIELD "
							+ "WHERE F.INSPFORMNUM = '" + inspectionresult.INSPFORMNUM + "' AND F.REVISION = '" + inspectionresult.REVISION 
							+ "' AND F.ORGID = '"  + inspectionresult.ORGID + "' "
							+ "ORDER BY F.INSPQUESTIONNUM, F.SEQUENCE";
		}
		
		inspectionresult.session.remove();
		
		EMMServer.DB.Select()
			.addQuery("INSPECTIONRESULT", resultSql)
			.addQuery("INSPQUESTION", questionSql)
			.addQuery("INSPFIELD", inspfieldSql)
			.addQuery("INSPFIELDRESULT", fieldresultSql)
			.addQuery("INSPFIELDOPTION", fieldoptionSql)
			.addQuery("METER", meterSql)
			.addQuery("METERREADING", meterReadingSql)
			.addQuery("MEASUREMENT", measurementSql)
			.addQuery("DOCLINKS", doclinkSql)
			.addQuery("PARENTOTHERS", parentOthersSql)
			.addQuery("PARENT", parentSql)
			.addQuery("FOLLOWUPS", followupSql)
			.addMessage(message)
			.submit("offline/inspector/inspresultlist.htm", true);	
	};
	
	
	PUBLIC.actions = {
		toStatuslist : function(status){
			var query = "SELECT R.*, A.DESCRIPTION AS ASSETDESC, L.DESCRIPTION AS LOCDESC, W.DESCRIPTION AS WODESC, "
				+ "P.INSPECTIONRESULTID AS PARENTID, P.STATUS AS PARENTSTATUS "
				+ "FROM INSPECTIONRESULT R "
				+ "LEFT JOIN ASSET A ON R.ASSET = A.ASSETNUM AND R.SITEID = A.SITEID "
				+ "LEFT JOIN LOCATIONS L ON R.LOCATION = L.LOCATION AND R.SITEID = L.SITEID "
				+ "LEFT JOIN WORKORDER W ON R.REFERENCEOBJECTID = W.WONUM "
				+ "LEFT JOIN INSPECTIONRESULT P ON R.PARENT = P.REFERENCEOBJECTID AND P.REFERENCEOBJECT = 'PARENTWO' "
				+ "WHERE R.STATUS = '" + status + "' ORDER BY R.CREATEDATE DESC";
			var statusSql = "SELECT DISTINCT '" +  status + "' AS STATUS FROM INSPECTIONRESULT";
			
			EMMServer.DB.Select()
			.addQuery('INSPECTIONRESULT', query, 1, options.defaultPageSize)
			.addQuery('STATUS', statusSql)
			.submit('offline/inspector/insplist.htm', true);
		},
		toWoinsplist : function(inspectionresult){
			var parent = inspectionresult.REFERENCEOBJECTID;
			if (inspectionresult.PARENT && inspectionresult.REFERENCEOBJECT != 'PARENTWO') {
				parent = inspectionresult.PARENT;
			}

			var query = "SELECT R.*, A.DESCRIPTION AS ASSETDESC, L.DESCRIPTION AS LOCDESC "
				+ "FROM INSPECTIONRESULT R "
				+ "LEFT JOIN ASSET A ON R.ASSET = A.ASSETNUM AND R.SITEID = A.SITEID "
				+ "LEFT JOIN LOCATIONS L ON R.LOCATION = L.LOCATION AND R.SITEID = L.SITEID "
				+ "WHERE R.PARENT = '" + parent + "' "
				+ "AND R.ORGID = '" + inspectionresult.ORGID + "' AND R.SITEID = '" + inspectionresult.SITEID + "'";
			var woSql = "SELECT * FROM WORKORDER where WONUM = '" + parent 
				+ "' AND ORGID = '" + inspectionresult.ORGID + "' AND SITEID = '" + inspectionresult.SITEID + "'";
			var parentSql = "SELECT * FROM INSPECTIONRESULT where REFERENCEOBJECT = 'PARENTWO' AND "
				+ "ORGID = '" + inspectionresult.ORGID + "' AND SITEID = '" + inspectionresult.SITEID + "' AND "
				+ "REFERENCEOBJECTID = '" + parent + "'";
			
			EMMServer.Session.setItem('FROM_PAGE', 'offline/inspector/woinsplist.htm');
			
			EMMServer.DB.Select()
			.addQuery('INSPECTIONRESULTLIST', query, 1, options.defaultPageSize)
			.addQuery('WORKORDER', woSql)
			.addQuery('PARENT', parentSql)
			.submit('offline/inspector/woinsplist.htm', true);
		},
		toFuplist : function(inspection){
			var woSql = "SELECT * FROM WORKORDER where WONUM = '" + inspection.PARENT 
				+ "' AND ORGID = '" + inspection.ORGID + "' AND SITEID = '" + inspection.SITEID + "'";
			var followupSql = "SELECT *, Q.DESCRIPTION AS INSPQUESTION FROM INSPFIELDRESULT R "
				+ "LEFT JOIN INSPQUESTION Q ON R.INSPQUESTIONNUM = Q.INSPQUESTIONNUM AND R.ORGID = Q.ORGID "
				+ "WHERE R.ORGID = '" + inspection.ORGID + "' AND R.SITEID = '" 
				+ inspection.SITEID + "' AND R.RESULTNUM = '" + inspection.RESULTNUM + "' AND R.FUPOBJECT IS NOT NULL";
			
			inspection.session.cache();
			
			EMMServer.Session.setItem('INSPECTION_DATA', {
				returnPage : options.viewName,
				cacheSession : inspection
			});
			
			EMMServer.DB.Select()
			.addQuery('WORKORDER', woSql)
			.addQuery('FOLLOWUPS', followupSql)
			.submit('offline/inspector/listfollowups.htm', true);
		},
		startInspection : function(inspresult, parent) {
			var newStatus = 'INPROG';
			var update = EMMServer.DB.MultiUpdate();
			var parentid;
			
			if (inspresult.STATUS != newStatus) {
				var currentTime = new Date();
				var updateData = { 
					STATUSDATE : currentTime.getTime()
				};
				updateData['STATUS'] = newStatus;
				
				if (parent && parent.STATUS == 'PENDING') {
					parentid =  parent.INSPECTIONRESULTID;
				} else if (inspresult.PARENTID && inspresult.PARENTSTATUS == 'PENDING' )
					parentid = inspresult.PARENTID;
			
				if (parentid != null) {
					update.addUpdateObject("INSPECTIONRESULT", "", updateData, "INSPECTIONRESULTID='" + parentid +"'");
				}
				
				update.addUpdateObject("INSPECTIONRESULT", "UPDATE_STATUS", updateData, "INSPECTIONRESULTID='" + inspresult.INSPECTIONRESULTID +"'")
					.submit()
					.then(function(result){
						PUBLIC.showDetail(inspresult, getText('EMMOF1008I', null, 'Status Successfully Changed'));
					});
			}
		},
		saveInspection : function(inspection) {
			var update = EMMServer.DB.MultiUpdate();
			var inspfieldresult;
			var currentTime = new Date();
			if(inspection.mbo.toBeSaved()){
				if(inspection.mbo.validate()){
					angular.forEach(inspection.INSPQUESTION, function(question, questionIndex) {
						angular.forEach(question.FIELDRESULT, function(fr, frIndex) {
							if (fr && fr.INSPFIELDRESULT) {
								if (fr.INSPFIELDRESULT.INSPFIELDRESULTID) {
									// Update existing inspfieldresult value
									if (fr.INSPFIELDRESULT.mbo.toBeSaved() && fr.INSPFIELDRESULT.mbo.validate()) {
										fr.INSPFIELDRESULT.ROLLOVERFLAG = (fr.INSPFIELDRESULT.ROLLOVERFLAG == 1) ? true : false;
										fr.INSPFIELDRESULT.ENTEREDDATE = currentTime.getTime();
										fr.INSPFIELDRESULT.ENTEREDBY = options.userInfo.personId;
										
										update.addUpdateObject("INSPFIELDRESULT", "EDIT", fr.INSPFIELDRESULT.getMbo(), "INSPFIELDRESULTID='" + fr.INSPFIELDRESULT.INSPFIELDRESULTID + "'");
									}
								}else if (fr.INSPFIELDRESULT.TXTRESPONSE || fr.INSPFIELDRESULT.NUMRESPONSE || fr.INSPFIELDRESULT.DATERESPONSE || fr.INSPFIELDRESULT.TIMERESPONSE) {
									inspfieldresult = createInspFieldResult(inspection, fr.INSPFIELD);
									inspfieldresult.TXTRESPONSE = (fr.INSPFIELDRESULT.TXTRESPONSE) ? fr.INSPFIELDRESULT.TXTRESPONSE : '';
									inspfieldresult.NUMRESPONSE = (fr.INSPFIELDRESULT.NUMRESPONSE) ? fr.INSPFIELDRESULT.NUMRESPONSE : '';
									inspfieldresult.DATERESPONSE = (fr.INSPFIELDRESULT.DATERESPONSE) ? fr.INSPFIELDRESULT.DATERESPONSE : '';
									inspfieldresult.TIMERESPONSE = (fr.INSPFIELDRESULT.TIMERESPONSE) ? fr.INSPFIELDRESULT.TIMERESPONSE : '';
									inspfieldresult.ROLLOVERFLAG = (fr.INSPFIELDRESULT.ROLLOVERFLAG == 1) ? true : false;
			
									if(inspfieldresult.mbo.validate()){
										//Add a new inspfieldresult
										update.addInsertObject("INSPFIELDRESULT","INSERT", inspfieldresult.getMbo());
										//inspfieldresult.session.remove();
									}
								}
							}
						});
					});
					
					update.submit()
						.then(function(result){
							inspection.session.remove();
							PUBLIC.showDetail(inspection, getText('RECORDSAVED', null, 'Record Saved'));
						});
				}
			}
		},
		completeInspection : function(inspresult, parent) {
			var newStatus = 'COMPLETED';
			var update = EMMServer.DB.MultiUpdate();
			
			if (inspresult.STATUS != newStatus) {
				var currentTime = new Date();
				var updateData = { 
					STATUSDATE : currentTime.getTime()
				};
				updateData['STATUS'] = newStatus;
				
				if (parent && parent.STATUS != newStatus) {
					update.addUpdateObject("INSPECTIONRESULT", "", updateData, "INSPECTIONRESULTID='" + parent.INSPECTIONRESULTID +"'");
				}

				update.addUpdateObject("INSPECTIONRESULT", "COMPLETE", updateData, "INSPECTIONRESULTID='" + inspresult.INSPECTIONRESULTID +"'")
					.submit()
					.then(function(result){
						PUBLIC.showDetail(inspresult, getText('EMMOF1008I', null, 'Status Successfully Changed'));
					});
			}
			
		},
		toAttachments: function(inspfieldresult, inspfield, inspection){
			if (inspection.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			
			if (!inspfieldresult.INSPFIELDRESULTID){
				inspfieldresult = createInspFieldResult(inspection, inspfield);
				if(inspfieldresult.mbo.validate()){
					//Add a new inspfieldresult -- Commented out until native app can handle it
					/*var update = EMMServer.DB.MultiUpdate();
					update.addInsertObject("INSPFIELDRESULT","INSERT", inspfieldresult.getMbo())
						.submit()
						.then();*/
				}
			}

			// Cache the current object
			inspection.session.cache();
			inspfieldresult.session.cache();
			
			doclinksService.toDoclinks({
				returnPage : options.viewName,
				entityName : options.entityName,
				entityId : inspfieldresult.INSPFIELDRESULTID,
				appName : 'INSPECTOR',
				docType : inspfield.DOCTYPE
			});
		},
		createWorkOrder : function (inspection, detail) {
			var updateData = { 
				DEFICIENCYLIST : JSON.stringify(detail)
			};
			
			EMMServer.DB.MultiUpdate()
				.addUpdateObject("INSPECTIONRESULT", "CREATEINSPWO", updateData, "INSPECTIONRESULTID = '" + inspection.INSPECTIONRESULTID + "'")
				.submit()
				.then(function(result){
					EMMServer.DB.Select()
					.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
					.go("offline/inspector/inspresultlist.htm");
				});
		},
		viewAssetDetails : function (inspection) {
			var sql = "SELECT * FROM ASSET WHERE ASSETNUM = '" +  inspection.ASSET + "' AND SITEID = '" +  inspection.SITEID + "'";
			inspection.session.cache();
			
			EMMServer.Session.setItem('FROM_PAGE', 'offline/inspector/inspresultlist.htm');
			EMMServer.DB.Select()
				.addQuery("ASSET", sql)
				.submit("offline/asset/asset.htm", true);	

		},
		createWorkOrderWithResults : function (inspection) {			
			EMMServer.Session.setItem('INSPECTION_DATA', {
				returnPage : options.viewName,
				cacheSession : inspection
			});
		
			EMMServer.DB.Select()
				.submit("offline/inspector/createwoinspresult.htm", true);
		
		},
		toSignature : function (inspection, inspfieldresult, inspfield) {
			if (inspection.mbo.toBeSaved()){
				alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
				return;
			}
			
			inspection.session.cache();
			
			if (!inspfieldresult.INSPFIELDRESULTID){
				inspfieldresult = createInspFieldResult(inspection, inspfield);
			}
			inspfieldresult.session.cache();
			
			EMMServer.Session.setItem('SIGNATURE_DATA', {
				cacheKey : inspfieldresult.session.cacheKey(),
				fieldName : 'SIGNATURE',
				action : 'ADD_SIGNATURE',
				entityName : 'INSPFIELDRESULT',
				whereClause : "INSPFIELDRESULTID='" + inspfieldresult.INSPFIELDRESULTID + "'",
				returnPage : options.viewName
			});
		
			EMMServer.DB.Select()
				.submit("offline/inspector/signature.htm", true);
		},
		getMeterList : function (meterResult, meterList) {
			var meterName, domainList = [], mt = {};
	 		
	 		angular.forEach(meterResult, function(meter, meterIndex) {
	 			if (!meterName || meterName != meter.METERNAME) {
	 			 	if (meterName && meterName != meter.METERNAME) {
	 			 		// get domainList for characteric meter
	 					if (domainList.length>0) 
	 						mt.VALUE = domainList;
	 					meterList.push(mt);
	 				}

		 			domainList = [], mt = meter, meterName = meter.METERNAME;
	 				if (!String.isNullOrEmpty(meter.DOMAINID)) {
						domainList.push(meter.VALUE);
					}
	 			}else if (meterName == meter.METERNAME && !String.isNullOrEmpty(meter.DOMAINID)) {
	 				domainList.push(meter.VALUE);
	 			}
	 		});
			
			if (domainList.length>0) {
	 			mt.VALUE = domainList;
			}
			meterList.push(mt);	
		},
		getMeterHistory : function (meterReadingResult, measurementResult, meterHistoryList) {
			var historySize = 3;
			if (meterReadingResult) {
				angular.forEach(meterReadingResult, function(meterReading, readingIndex) {
		 			if (!meterHistoryList || !meterHistoryList.hasOwnProperty(meterReading.METERNAME)) {
		 				meterHistoryList[meterReading.METERNAME] = [];
		 			}
		 			if (meterHistoryList[meterReading.METERNAME].length < historySize) {
		 				meterHistoryList[meterReading.METERNAME].push(meterReading);
		 			}
		 		});
			}
			
			if (measurementResult) {
				angular.forEach(measurementResult, function(measurement, mmIndex) {
					if (!meterHistoryList || !meterHistoryList.hasOwnProperty(measurement.METERNAME)) {
						meterHistoryList[measurement.METERNAME] = [];
		 			}
		 			if (meterHistoryList[measurement.METERNAME].length < historySize) {
		 				meterHistoryList[measurement.METERNAME].push(measurement);
		 			}
		 		});
			}
		},
		mergeInspectionResult : function (inspection, questionResult, inspfieldResult, fieldresultResult, optionResult, doclinksResult, meterList, meterHistoryList) {
			if (questionResult){
				for(var i = 0; i < questionResult.length; i++) {
					var questionnum = questionResult[i].INSPQUESTIONNUM;
					var fieldresults = [];

					//Merge with inspection field results
					angular.forEach(inspfieldResult, function(field, fieldIndex) {
					 	if (field.INSPQUESTIONNUM == questionnum) {
					 		var fieldresult = {};
					 		fieldresult.INSPFIELD = field;
							
					 		var inspfieldresult = createEmptyInspFieldResult();

					 		angular.forEach(fieldresultResult, function(fr, frIndex) { 	
						 		// Add inspfielresult if any
					 			if (fr.INSPFIELDNUM == field.INSPFIELDNUM) {
					 				inspfieldresult = new InspFieldResult(fr);
					 				inspfieldresult.Format();
									inspfieldresult.mbo.toBeSaved(false);
					 			}
					 		});
					 		fieldresult.INSPFIELDRESULT = inspfieldresult;									
					 		
					 		// Add options if any
					 		var options = [];
					 		angular.forEach(optionResult, function(option, optIndex) {
					 			if (option.INSPFIELDNUM == fieldresult.INSPFIELD.INSPFIELDNUM) {
					 				options.push(option.DESCRIPTION);
					 			}
					 		});
					 		fieldresult.INSPFIELDOPTION = options;
					 		
					 		// Add meters if any
					 		if (meterList && field.FIELDTYPE == 'MM' ) {
					 			var meter = $filter('filter')(meterList, {METERNAME: field.METERNAME}, true)[0];
					 			if (meter) {
					 				fieldresult.INSPFIELD.METERFLAG = false;
					 				fieldresult.METERINFO = meter;
					 			} else {
					 				fieldresult.INSPFIELD.METERFLAG = true;
					 				fieldresult.INSPFIELD.REQUIRED = 0;
					 			}
					 			
								//Merge with meter history
					 			if (meterHistoryList && meterHistoryList[field.METERNAME]) {
					 				fieldresult.METERINFO.HISTORY = meterHistoryList[field.METERNAME];
					 			}
					 		}
					 		
					 		// Add doclinks
					 		var doclinks = [];
					 		angular.forEach(doclinksResult, function(doclink, doclinkIndex) {
					 			if (doclink.OWNERID == fieldresult.INSPFIELDRESULT.INSPFIELDRESULTID) {
					 				doclinks.push(doclink);
					 			}
					 		});
					 		fieldresult.DOCLINK = doclinks;
					 		
					 		fieldresults.push(fieldresult);
					 	}
					});
					
					if (fieldresults) {
						questionResult[i].FIELDRESULT = fieldresults;
					}
				} // End for
				
				inspection.INSPQUESTION = questionResult; 
			} 
		}
			
	}
		
	var createInspFieldResult = function (inspection, inspfield) {
		var inspfieldresult = {};
		var currentTime = new Date();
		
		inspfieldresult.INSPQUESTIONNUM = inspfield.INSPQUESTIONNUM;
		inspfieldresult.INSPFIELDNUM = inspfield.INSPFIELDNUM;
		inspfieldresult.INSPFORMNUM = inspfield.INSPFORMNUM;
		inspfieldresult.RESULTNUM = inspection.RESULTNUM;
		inspfieldresult.REVISION = inspection.REVISION;
		inspfieldresult.ORGID = inspection.ORGID;
		inspfieldresult.SITEID = inspection.SITEID;
		inspfieldresult.INSPECTIONRESULTID = inspection.INSPECTIONRESULTID;
		inspfieldresult.ENTEREDDATE = currentTime.getTime();
		inspfieldresult.ENTEREDBY = options.userInfo.personId;
		inspfieldresult.ROLLOVERFLAG = false;
		
		if (inspfield.FIELDTYPE == "MM")
			inspfieldresult.METERNAME = inspfield.METERNAME;
		
		newInspFieldResult = new InspFieldResult();
		newInspFieldResult.createNew(inspfieldresult);
		
		return newInspFieldResult;
	}

	createEmptyInspFieldResult = function () {
		var inspfieldresult = {};
		inspfieldresult.ROLLOVERFLAG = false;
		inspfieldresult.NUMRESPONSE = null;
		return inspfieldresult;
	}
	
	return PUBLIC;
});