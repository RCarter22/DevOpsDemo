angular.module('emm').factory('labtransService', function(){
	
	var options = {
			defaultPageSize: 20,
			viewName : null,
			userInfo : null
		};
	
	var PUBLIC = {};

	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};

	PUBLIC.createNew = function(parentMbo, laborInfo){
		// laborInfo used to set default labor to current user 		
		if (!laborInfo || String.isNullOrEmpty(laborInfo.LABORCODE)){
			alert('Missing required default labor info');
			return;			
		}
		
		if (String.isNullOrEmpty(laborInfo.CRAFT)){
			alert('Missing required default craft for the signed in laborcode');
			return;			
		}
		
		var lt = new LabTrans();
		// *Important* to set app name
		lt.mbo.appName(parentMbo.mbo.appName());
		
		var defaultData = {
			LABORCODE: laborInfo.LABORCODE,
			CRAFT: laborInfo.CRAFT,
			SITEID: parentMbo.SITEID,
			ORGID: parentMbo.ORGID,
			TASKID : parentMbo.TASKID
		
		};
		
		if (parentMbo.mbo.appName() === 'WOTRACK' || parentMbo.mbo.appName() === 'PLUSTWO' || parentMbo.mbo.appName() === 'PLUSPWO'){
			defaultData.WORKORDERID = parentMbo.WORKORDERID;
			defaultData.WONUM = parentMbo.WONUM;
		} else if (parentMbo.mbo.appName() === 'SR' || parentMbo.mbo.appName() === 'PLUSPSR'){
			defaultData.TICKETUID = parentMbo.TICKETUID;
			defaultData.TICKETID = parentMbo.TICKETID;
		}

		// Create a new in memory labtrans and set field defaults
		lt.createNew(defaultData);
		
		// Save to the cache
		lt.session.cache();
		
		EMMServer.DB.Select()
			.addQuery("LABTRANS", lt.toSql())
			.submit("offline/labtrans/labtrans.htm", true);
	};
	
	PUBLIC.startTimer = function(parentMbo, laborInfo, callback){
		if (!laborInfo || String.isNullOrEmpty(laborInfo.LABORCODE)){
			alert('Missing required default labor info');
			return;			
		}
		
		var lt = new LabTrans();					

		var defaultData = {
			STARTDATE: new Date(),
			LABORCODE: laborInfo.LABORCODE,
			CRAFT: laborInfo.CRAFT,
			TIMERSTATUS: 'ACTIVE',
			TRANSTYPE: 'WORK'
		};
			
		if (parentMbo.mbo.appName() === 'WOTRACK' || parentMbo.mbo.appName() === 'PLUSTWO' || parentMbo.mbo.appName() === 'PLUSPWO'){
			defaultData.WORKORDERID = parentMbo.WORKORDERID;
			defaultData.WONUM = parentMbo.WONUM;
			defaultData.SITEID = parentMbo.SITEID;
			defaultData.ORGID = parentMbo.ORGID;
		} else if (parentMbo.mbo.appName() === 'SR' || parentMbo.mbo.appName() === 'PLUSPSR'){
			defaultData.TICKETUID = parentMbo.TICKETUID;
			defaultData.TICKETID = parentMbo.TICKETID;
			defaultData.SITEID = parentMbo.SITEID;
			defaultData.ORGID = parentMbo.ORGID;			
		}
		
		lt.createNew(defaultData);		
		
		EMMServer.DB.Insert('LABTRANS', 'START_TIMER')
			.addObject(lt.getMbo())
			.submit()
			.then(callback);		
	}
	
	PUBLIC.stopTimer = function(parentMbo, labtransInfo, callback){
		var lt = new LabTrans({
			FINISHDATE: new Date(),
			TIMERSTATUS: 'COMPLETE',
			LABTRANSID: labtransInfo.LABTRANSID
		});		
		EMMServer.DB.Update('LABTRANS', 'STOP_TIMER')
			.addObject(lt.getMbo(true), "LABTRANSID='" + lt.LABTRANSID + "'")
			.submit()
			.then(callback);		
	}
	
	PUBLIC.showDetails = function(lt) {
		lt.session.cache();
		
		EMMServer.DB.Select()
			.addQuery("LABTRANS", lt.toSql())
			.submit("offline/labtrans/labtrans.htm", true);
	};
	
	PUBLIC.actions = {
		saveLabTrans : function(lt){			
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			if (lt.mbo.toBeSaved()){
				if (lt.mbo.validate()){
					/* Private vars */
					var entityName = null, actionName = null, entityName = 'LABTRANS';
					
					if(lt.mbo.appName() === 'WOTRACK' || lt.mbo.appName() === 'PLUSTWO' || lt.mbo.appName() === 'PLUSPWO'){
						actionName = 'INSERT';
					} else if(lt.mbo.appName() === 'SR' || lt.mbo.appName() === 'PLUSPSR'){
						actionName = 'INSERTSR';
					}
					EMMServer.DB.Insert(entityName, actionName)
						.addObject(lt.getMbo())
						.submit()
						.then(function(result) {
				        	lt.session.remove();
							EMMServer.DB.Select()
								.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
								.go("offline/labtrans/main.htm");
						});
				} else {
					alert(lt.mbo.message());
				}
			}
		}
	};
	
	return PUBLIC;
});	