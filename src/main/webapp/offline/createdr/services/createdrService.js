angular.module('emm').factory('createdrService', function(){
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
	
	PUBLIC.createMR = function(){
		var mr = new MR();
		// Create a new in memory mr and set field defaults
		mr.createNew({
			SITEID : options.userInfo.siteId,
			ORGID : options.userInfo.orgId,
		});
		
		// Save to the cache
		mr.session.cache();
		
		EMMServer.DB.Select()
			.addQuery('MR', mr.toSql())
			.submit('offline/createdr/mr.htm', true);
	};
	PUBLIC.createMRLine = function(mr){
		var mrline = new MRLines();
		// Create a new in memory mrline and set field defaults
		mrline.createNew({
			MRID : mr.MRID,
			MRNUM : mr.MRNUM,
			LINETYPE : 'ITEM',
			ORDERUNIT : 'EACH',
			LINECOST : 0,
			SITEID : mr.SITEID,
			ORGID : mr.ORGID
		});
		
		mr.session.cache();
		
		EMMServer.Session.setItem('MRLINE_DATA', {
			returnPage : options.viewName,
			cacheKey : mr.session.cacheKey()
		});
		
		
		mrline.session.cache();
	
		var extraSql = "SELECT MRLINES.MRLINEID, MAX(CAST(MRLINES.MRLINENUM AS INTEGER)) AS MRLINENUM"
			+ " FROM MRLINES"
	 		+ " WHERE MRLINES.MRNUM = '" + mr.MRNUM + "'";
		
		EMMServer.DB.Select()
			.addQuery('MRLINE', mrline.toSql())
			.addQuery("EXTRA", extraSql)
			.submit('offline/createdr/mrline.htm', true);
	};
	PUBLIC.actions = {
		continueMR : function(mr){
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			if (mr.mbo.toBeSaved()){
				if(mr.mbo.isNew()){
					if(mr.mbo.validate()){
						EMMServer.DB.Insert('MR', 'INSERT')
							.addObject(mr.getMbo())
							.submit()
							.then(function(result) {
								// Be sure to remove session data
					        	mr.session.remove();
								EMMServer.DB.Select()
									.addQuery("MR", "SELECT * FROM MR WHERE MRID = '" + mr.MRID + "'")
									.addQuery("MRLINES", "SELECT * FROM MRLINES WHERE MRID = '" +  mr.MRID + "'")
									.submit("offline/createdr/mrlines.htm", true);
							});
					} else {
						alert(mr.mbo.message());
					}
				}
				else{
					if(mr.mbo.validate()){
						mr.STATUSDATE = new Date();
						EMMServer.DB.Update('MR', 'EDIT')
							.addObject(mr.getMbo(), "MRID='" + mr.MRID + "'")
							.submit()
							.then(function(result) {
								// Be sure to remove session data
					        	mr.session.remove();
					        	EMMServer.DB.Select()
								.addQuery("MR", "SELECT * FROM MR WHERE MRID = '" + mr.MRID + "'")
								.addQuery("MRLINES", "SELECT * FROM MRLINES WHERE MRID = '" +  mr.MRID + "'")
								.submit("offline/createdr/mrlines.htm", true);
							});
					} else {
						alert(mr.mbo.message());
					}
				}
			}
			else{
				EMMServer.DB.Select()
				.addQuery("MR", "SELECT * FROM MR WHERE MRID = '" + mr.MRID + "'")
				.addQuery("MRLINES", "SELECT * FROM MRLINES WHERE MRID = '" +  mr.MRID + "'")
				.submit("offline/createdr/mrlines.htm", true);
			}
		},
		saveAsDraft : function(mr){
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			if (mr.mbo.toBeSaved()){
				if(mr.mbo.isNew()){
					if(mr.mbo.validate()){
						mr.STATUSDATE = new Date();
						EMMServer.DB.Insert('MR', 'INSERT')
							.addObject(mr.getMbo())
							.submit()
							.then(function(result) {
								// Be sure to remove session data
					        	mr.session.remove();
					        	var scconfigid = EMMServer.Session.getItem("SELECTEDSC");
								
								EMMServer.DB.Select()
									.addMessage("Requisition " + mr.MRNUM + " saved as draft!")
									.addQuery("SAVEDTOTAL", "SELECT COUNT(*) AS SAVEDTOTAL FROM MR WHERE STATUS IN ('DRAFT','WAPPR')")
									.addQuery("SUBMITTOTAL", "SELECT COUNT(*) AS SUBMITTOTAL FROM MR WHERE STATUS IN ('APPR')")
									.submit("offline/viewdr/main.htm", true);
							});
					} else {
						alert(mr.mbo.message());
					}
				}
				else{
					if(mr.mbo.validate()){
						mr.STATUSDATE = new Date();
						EMMServer.DB.Update('MR', 'EDIT')
							.addObject(mr.getMbo(), "MRID='" + mr.MRID + "'")
							.submit()
							.then(function(result) {
								// Be sure to remove session data
					        	mr.session.remove();
					        	EMMServer.DB.Select()
								.addMessage("Requisition " + mr.MRNUM + " saved as draft!")
								.addQuery("SAVEDTOTAL", "SELECT COUNT(*) AS SAVEDTOTAL FROM MR WHERE STATUS IN ('DRAFT','WAPPR')")
								.addQuery("SUBMITTOTAL", "SELECT COUNT(*) AS SUBMITTOTAL FROM MR WHERE STATUS IN ('APPR')")
								.submit("offline/viewdr/main.htm", true);
							});
					} else {
						alert(mr.mbo.message());
					}
				}
			}
			else{
				EMMServer.DB.Select()
				.addMessage("Requisition " + mr.MRNUM + " saved as draft!")
				.addQuery("SAVEDTOTAL", "SELECT COUNT(*) AS SAVEDTOTAL FROM MR WHERE STATUS IN ('DRAFT','WAPPR')")
				.addQuery("SUBMITTOTAL", "SELECT COUNT(*) AS SUBMITTOTAL FROM MR WHERE STATUS IN ('APPR')")
				.submit("offline/viewdr/main.htm", true);
			}
		},
		toMR : function(mr){
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			if (mr.mbo.toBeSaved()){
				if(mr.mbo.validate()){
					mr.STATUSDATE = new Date();
					EMMServer.DB.Update('MR', 'EDIT')
						.addObject(mr.getMbo(), "MRID='" + mr.MRID + "'")
						.submit()
						.then(function(result) {
							// Be sure to remove session data
				        	mr.session.remove();
				        	EMMServer.DB.Select()
							.addQuery('MR', "SELECT * FROM MR WHERE MRID = '" +mr.MRID + "'")
							.submit('offline/createdr/mr.htm', true);
						});
				} else {
					alert(mr.mbo.message());
				}
			}
			else{
				EMMServer.DB.Select()
				.addQuery('MR', "SELECT * FROM MR WHERE MRID = '" +mr.MRID + "'")
				.submit('offline/createdr/mr.htm', true);
			}
		},
		toMRLine : function (mr, mrline) {
			mr.session.cache();
			
			EMMServer.Session.setItem('MRLINE_DATA', {
				returnPage : options.viewName,
				cacheKey : mr.session.cacheKey()
			});
			
			EMMServer.DB.Select()
				.addQuery('MRLINE', "SELECT * FROM MRLINES WHERE MRLINEID = '" + mrline.MRLINEID + "'")
				.submit('offline/createdr/mrline.htm', true);
		},
		saveMRLine : function(mrline){
			// Must call 'getMbo()' on all MBO objects that are being saved to the database
			// This will also run any validation scripts if available
			if (mrline.mbo.toBeSaved()){
				if(mrline.mbo.validate()){
					EMMServer.DB.Insert('MRLINES', 'INSERT')
						.addObject(mrline.getMbo())
						.submit()
						.then(function(result) {
							// Be sure to remove session data
							mrline.session.remove();
							EMMServer.DB.Select()
								.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
								.addQuery("MR", "SELECT * FROM MR WHERE MRID = '" + mrline.MRID + "'")
								.addQuery("MRLINES", "SELECT * FROM MRLINES WHERE MRID = '" +  mrline.MRID + "'")
								.submit("offline/createdr/mrlines.htm");
						});
				} else {
					alert(mrline.mbo.message());
				}
			}
		},
		submitMR : function(mr, mrlines){
			if (mrlines.length == 0)
				alert("The requisition cannot be submitted without any lines!");
			
			if (mrlines.length > 0){
				mr.STATUSDATE = new Date();
				mr.STATUS = 'APPR';
				EMMServer.DB.Update('MR', 'COMMIT')
					.addObject(mr.getMbo(), "MRID='" + mr.MRID + "'")
					.submit()
					.then(function(result) {
						// Be sure to remove session data
			        	mr.session.remove();
						for (var i=0; i<mrlines.length; i++) {
							mrlines[i].session.remove();
						}
						EMMServer.DB.Select()
							.addMessage("Requisition " + mr.MRNUM + " created successfully!")
							.addQuery("SAVEDTOTAL", "SELECT COUNT(*) AS SAVEDTOTAL FROM MR WHERE STATUS IN ('DRAFT','WAPPR')")
							.addQuery("SUBMITTOTAL", "SELECT COUNT(*) AS SUBMITTOTAL FROM MR WHERE STATUS IN ('APPR')")
							.submit("offline/viewdr/main.htm", true);							
					});
			}
		}
	};
	
	return PUBLIC;
});