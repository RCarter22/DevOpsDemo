angular.module('emm').factory('viewdrService', function(){
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
		var sql = "SELECT * FROM MR WHERE " + query;
		PUBLIC.toList(null,sql,null);	
	}
	PUBLIC.setStartCenterApplicationName('VIEWDR');
	
	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};
	
	PUBLIC.viewMR = function(mr){
		mr.session.cache();
		EMMServer.DB.Select()
			.addQuery('MR', "SELECT * FROM MR WHERE MRID = '" + mr.MRID + "'")
			.submit('offline/viewdr/mr.htm', true);
	};
	
	PUBLIC.toList = function(searchValue, query, goBack){
		var viewName = 'offline/viewdr/list.htm';
		if(String.isNullOrEmpty(query))
			query = "SELECT * FROM MR WHERE STATUS IN ('DRAFT','WAPPR')";
		var viewtype = EMMServer.Session.getItem('VIEWTYPE');
		if(viewtype === 'SAVED'){
			query = "SELECT * FROM MR WHERE STATUS IN ('DRAFT','WAPPR')";
		}
		else if(viewtype === 'SUBMIT'){
			query = "SELECT * FROM MR WHERE STATUS IN ('APPR')";
		}
		
		if (goBack){
			if (EMMServer.DB.Select().getQuery(viewName))
				EMMServer.DB.Select().go(viewName);
			else {
				EMMServer.DB.Select()
					.addQuery('MR', query, 1, options.defaultPageSize)
					.submit(viewName, true);				
			}
			return;
		}
			
		if (searchValue && (typeof searchValue)==='string'){
			if (query.toUpperCase().indexOf("WHERE") > 0)
				query += " AND (MRNUM = '" + searchValue + "' OR DESCRIPTION like '%" + searchValue + "%')";
			else
				query += " WHERE ((MRNUM = '" + searchValue + "' OR DESCRIPTION like '%" + searchValue + "%'))";
			
			EMMServer.DB.Select()
				.addQuery('MR', query, 1, options.defaultPageSize)
				.submit(viewName, true);
		} else {
			EMMServer.DB.Select()
				.addQuery('MR', query, 1, options.defaultPageSize)
				.submit(viewName, true);			
		}			
	};
	
	PUBLIC.actions = {
			toMRLines : function(mr){
				EMMServer.DB.Select()
				.addQuery("MR", "SELECT * FROM MR WHERE MRID = '" + mr.MRID + "'")
				.addQuery("MRLINES", "SELECT * FROM MRLINES WHERE MRID = '" +  mr.MRID + "'")
				.submit("offline/viewdr/mrlines.htm", true);
			},
			toMRLine : function (mr, mrline) {
				mr.session.cache();
				
				EMMServer.Session.setItem('MRLINE_DATA', {
					returnPage : options.viewName,
					cacheKey : mr.session.cacheKey()
				});
				
				EMMServer.DB.Select()
					.addQuery('MRLINE', "SELECT * FROM MRLINES WHERE MRLINEID = '" + mrline.MRLINEID + "'")
					.submit('offline/viewdr/mrline.htm', true);
			},
			toMR : function(mr){
				EMMServer.DB.Select()
				.addQuery('MR', "SELECT * FROM MR WHERE MRID = '" +mr.MRID + "'")
				.submit('offline/viewdr/mr.htm', true);
			}
		};
	return PUBLIC;
});