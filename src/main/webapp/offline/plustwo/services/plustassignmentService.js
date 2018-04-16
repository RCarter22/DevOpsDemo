angular.module('emm').factory('plustassignmentService', function(){
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
	
	PUBLIC.createNew = function(wo, laborInfo){
		var a = new Assignment();
		// Create a new in memory workorder and set field defaults
		a.createNew({
			WONUM : wo.WONUM,
			LABORCODE: laborInfo.LABORCODE,
			CRAFT: laborInfo.CRAFT,
			SITEID: options.userInfo.siteId,
			ORGID: options.userInfo.orgId
		});
		
		// Save to the cache
		a.session.cache();
		
		EMMServer.DB.Select()
			.addQuery('ASSIGNMENT', a.toSql())
			.submit('offline/plustwo/assignment.htm', true);
	};

	PUBLIC.toAssignments = function(wo, message){
		wo.session.cache();
		
		EMMServer.Session.setItem('ASSIGNMENT_DATA', {
			returnPage : options.viewName,
			cacheKey : wo.session.cacheKey()
		});
		
		var laborInfo = "SELECT LABOR.LABORCODE, LABORCRAFTRATE.CRAFT " +
		"FROM LABOR LEFT JOIN LABORCRAFTRATE ON LABOR.LABORCODE = LABORCRAFTRATE.LABORCODE AND LABOR.ORGID = LABORCRAFTRATE.ORGID AND LABORCRAFTRATE.DEFAULTCRAFT = '1'" +
		"WHERE LABOR.PERSONID = '" + options.userInfo.personId + "' AND LABOR.ORGID =  '" + options.userInfo.orgId + "'";
		
		EMMServer.DB.Select()
			.addQuery("ASSIGNMENTS", "SELECT * FROM ASSIGNMENT WHERE WONUM = '" + wo.WONUM + "' AND SITEID = '" + wo.SITEID + "' AND ORGID = '" + wo.ORGID + "'")
			.addQuery("LABORINFO", laborInfo)
			.addMessage(message)
			.submit("offline/plustwo/assignments.htm", true);
	};
	
	
	PUBLIC.viewAssignment = function(a, message){
		EMMServer.DB.Select()
			.addQuery("ASSIGNMENT", "SELECT * FROM ASSIGNMENT WHERE ASSIGNMENTID = '" + a.ASSIGNMENTID + "'")
			.addMessage(message)
			.submit("offline/plustwo/assignment.htm", true);
	};
	
	
	PUBLIC.actions = {
		saveAssignment : function(a){
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			if (a.mbo.toBeSaved()){
				if (a.mbo.validate()){
					EMMServer.DB.Insert('ASSIGNMENT', 'INSERT')
					.addObject(a.getMbo())
					.submit()
					.then(function(result) {
						// Be sure to remove session data
			        	a.session.remove();
			        	PUBLIC.viewAssignment(a, getText('RECORDSAVED', null, 'Record Saved'));
					});
				} else {
					alert(a.mbo.message());					
				}
			}
		},
		completeAssignment : function(a){
			a.STATUS = getText('ASSIGNMENT.COMPLETE', null, 'COMPLETE');
			EMMServer.DB.Update("ASSIGNMENT", "UPDATE_STATUS")
				.addObject(a.getMbo(), "ASSIGNMENTID = '" + a.ASSIGNMENTID + "'")
				.submit()
				.then(function(result) {
					// Be sure to remove session data
		        	a.session.remove();
		        	PUBLIC.viewAssignment(a, getText('EMMOF1008I', null, 'Status Successfully Changed'));
				});
		}
	}
	
	
	return PUBLIC;
});