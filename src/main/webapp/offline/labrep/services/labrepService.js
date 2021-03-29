angular.module('emm').factory('labrepService', function(domainService) {
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
		var sql = "SELECT * FROM LABTRANS WHERE " + query;
		PUBLIC.toList(null,null,sql);	
	}
	PUBLIC.setStartCenterApplicationName('LABREP');

	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	PUBLIC.enterByLabor = function(laborInfo) {
		// laborInfo used to set default labor to current user
		if (!laborInfo || String.isNullOrEmpty(laborInfo.LABORCODE)){
			alert('Missing required default labor info');
			return;			
		}
		
		if (String.isNullOrEmpty(laborInfo.CRAFT)){
			alert('Missing required default craft for the signed in laborcode');
			return;			
		}
		
		var labtrans = new LabTrans(); // Labor reporting object behind the scenes is a LabTrans object
		
		var defaultData = {
				LABORCODE: laborInfo.LABORCODE,
				CRAFT: laborInfo.CRAFT,
				SKILLLEVEL: laborInfo.SKILLLEVEL,
				PAYRATE: laborInfo.RATE,
				SITEID: options.userInfo.siteId,
				ORGID: options.userInfo.orgId,
				TASKID: labtrans.TASKID 
		};
		
		var laborInfo = "SELECT LABOR.LABORCODE, LABORCRAFTRATE.CRAFT, LABORCRAFTRATE.SKILLLEVEL, LABORCRAFTRATE.RATE " +
						"FROM LABOR LEFT JOIN LABORCRAFTRATE ON LABOR.LABORCODE = LABORCRAFTRATE.LABORCODE AND LABOR.ORGID = LABORCRAFTRATE.ORGID AND LABORCRAFTRATE.DEFAULTCRAFT = '1'" +
						"WHERE LABOR.PERSONID = '" + options.userInfo.personId + "' AND LABOR.ORGID =  '" + options.userInfo.orgId + "'";

		labtrans.createNew(defaultData);
		labtrans.session.cache();
		
		EMMServer.DB.Select()
			.addQuery('LABREP', labtrans.toSql())
			.addQuery('LABORINFO', laborInfo)
			.submit('offline/labrep/enterbylabor.htm', true);
	};
	
	PUBLIC.toAdvancedSearch = function() {
		var advLabRep = new LabTrans();
		// Create a new in memory Labor Reporting and set field defaults
		advLabRep.createNew({
			SITEID:options.userInfo.siteId, 
			ORGID: options.userInfo.orgId,
			ISADVANCED: '1'
		});
		// Save to the cache
		advLabRep.session.cache();

		EMMServer.DB.Select()
			.addQuery('LABREP', advLabRep.toSql())
			.submit('offline/labrep/advancedsearch.htm', true);
	};
	
	PUBLIC.doAdvancedSearch = function(labtrans) {
		var viewName = 'offline/labrep/list.htm';
		var query = "SELECT * from LABTRANS WHERE 1=1";
		
		if(labtrans.LABORCODE && labtrans.LABORCODE != '')
			query += " AND LABORCODE = '" + labtrans.LABORCODE + "'";
		if(labtrans.SKILLLEVEL && labtrans.SKILLLEVEL != '')
			query += " AND SKILLLEVEL = '" + labtrans.SKILLLEVEL + "'";
		if(labtrans.CRAFT && labtrans.CRAFT != '')
			query += " AND CRAFT = '" + labtrans.CRAFT + "'";
		if(labtrans.GENAPPRSERVRECEIPT && labtrans.GENAPPRSERVRECEIPT != '')
			query += " AND GENAPPRSERVRECEIPT = '" + labtrans.GENAPPRSERVRECEIPT + "'";
		if(labtrans.WONUM && labtrans.WONUM != '')
			query += " AND WONUM = '" + labtrans.WONUM + "'";
		if(labtrans.LOCATION && labtrans.LOCATION != '')
			query += " AND LOCATION = '" + labtrans.LOCATION + "'";
		if(labtrans.ASSETNUM && labtrans.ASSETNUM != '')
			query += " AND ASSETNUM = '" + labtrans.ASSETNUM + "'";
		if(labtrans.STARTDATEFROM && labtrans.STARTDATEFROM != ''){
			//need to convert the selected date into the appropriate format
			var startdatefrom = labtrans.STARTDATEFROM.toDate().toISOString().substring(0,10);
			query += " AND date(STARTDATE) >= date('" + startdatefrom + "')";
		}
		if(labtrans.STARTDATETO && labtrans.STARTDATETO != ''){
			//need to convert the selected date into the appropriate format
			var startdateto = labtrans.STARTDATETO.toDate().toISOString().substring(0,10);
			query += " AND date(STARTDATE) <= date('" + startdateto + "')";
		}

		
		query += " ORDER BY LABORCODE ASC";
		
		EMMServer.DB.Select()
			.addQuery('LABREP', query, 1, options.defaultPageSize)
			.submit(viewName, true);
	};
	
	PUBLIC.toList = function(searchValue, goBack, query) {
		var viewName = 'offline/labrep/list.htm';
		if(String.isNullOrEmpty(query))
			query = "SELECT * FROM LABTRANS";
		
		if(searchValue && (typeof searchValue) === 'string') {
			query += (query.toUpperCase().indexOf("WHERE") > 0 ? " AND " : " WHERE ");
			query += " (LABORCODE like '%{0}%' OR CRAFT like '%{0}%' OR TRANSTYPE like '%{0}%')".format(searchValue);
			
			query += " ORDER BY LABORCODE ASC";
			
			EMMServer.DB.Select()
				.addQuery('LABREP', query, 1, options.defaultPageSize)
				.submit(viewName, true);
		} else {
			query += " ORDER BY LABORCODE ASC";
			EMMServer.DB.Select()
				.addQuery('LABREP', "SELECT * FROM LABTRANS where (siteid = 'CORP') and (exists (select 1 from maxuser where defaultrepfac = (select defaultrepfac from maxuser where userid = '" + options.userInfo.personId + "' )and (personid in (select personid from labor where laborcode = labtrans.laborcode))))", 1, options.defaultPageSize)
				.submit(viewName, true);
		}
	};
	
	PUBLIC.showDetail = function(labtrans, message) {
		var sql = "SELECT * FROM LABTRANS WHERE LABTRANSID = '" + labtrans.LABTRANSID + "'";
		
		var person = "SELECT DISPLAYNAME FROM LABOR WHERE LABORCODE = '" + labtrans.LABORCODE + "'";
		
		var laborInfo = "SELECT LABOR.LABORCODE, LABORCRAFTRATE.CRAFT, LABORCRAFTRATE.SKILLLEVEL, LABORCRAFTRATE.RATE " +
						"FROM LABOR LEFT JOIN LABORCRAFTRATE ON LABOR.LABORCODE = LABORCRAFTRATE.LABORCODE AND LABOR.ORGID = LABORCRAFTRATE.ORGID AND LABORCRAFTRATE.DEFAULTCRAFT = '1'" +
						"WHERE LABOR.PERSONID = '" + options.userInfo.personId + "' AND LABOR.ORGID =  '" + options.userInfo.orgId + "'";
		
		EMMServer.DB.Select()
			.addQuery('LABREP', sql)
			.addQuery('LABORINFO', laborInfo)
			.addQuery('PERSON', person)
			.addMessage(message)
			.submit("offline/labrep/labrep.htm",true);
	};
	
	PUBLIC.actions = {
		saveLabTrans: function(lt){
			if(lt.mbo.toBeSaved()){
				if(lt.mbo.validate()){
					if(lt.mbo.isNew()){
						EMMServer.DB.Insert("LABTRANS", "INSERTLR")					
						.addObject(lt.getMbo())
						.submit()
						.then(function(result) {
				        	lt.session.remove();
				        	PUBLIC.showDetail(lt, getText('RECORDSAVED', null, 'Record Saved'));
						});
					}
					else if(!lt.mbo.isNew() && (lt.GENAPPRSERVRECEIPT == 0 || lt.GENAPPRSERVRECEIPT == false)){
						EMMServer.DB.Update('LABTRANS', 'EDITLABREP')
						.addObject(lt.getMbo(true), "LABTRANSID='" + lt.LABTRANSID + "'")
						.submit()
						.then(function(result) {
							lt.session.remove();
				        	PUBLIC.showDetail(lt, getText('RECORDSAVED', null, 'Record Saved'));
						});
					}
				} else {
					alert(lt.mbo.message());
				}
				
			}
		},
		approveLabor: function(lt){
			lt.GENAPPRSERVRECEIPT = '1';
			
			EMMServer.DB.Update('LABTRANS', 'APPROVE')
				.addObject(lt.getMbo(true), "LABTRANSID='" + lt.LABTRANSID + "'")
				.submit()
				.then(function(result) {
					EMMServer.DB.Select()
						.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
						.go("offline/labrep/list.htm");
				});
		}		
	};
	
	return PUBLIC;
});