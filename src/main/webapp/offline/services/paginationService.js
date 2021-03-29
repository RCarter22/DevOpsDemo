angular.module('emm').factory('paginationService', function($filter){
	var cacheKey = '_PAGESERVICE_'; /* DO NOT EDIT */
	var swap = {
		ASC : 'DESC',
		DESC : 'ASC'
	};

	var options = {
		pageNum : 1,
		pagination : null,
		queryName : null,
		viewName : null,
		sortOptions : null,
	}

	var PUBLIC = {};
	
	var _search = null; 
	Object.defineProperty(PUBLIC, 'search', {
		get: function(){ return _search; },
		set: function(v){ 
			_search = v; 
			cacheMe(); 
		}
	});
	
	PUBLIC.init = function(opt){
		var sortOpt = opt.sortOptions;
		if (sortOpt != null){
			PUBLIC.sortOptions = sortOpt;
			PUBLIC.sortBy = PUBLIC.sortOptions[0];
			delete opt.sortOptions;
		}
		$.extend(options, opt);
		
		PUBLIC.pagination = opt.pagination;
		var sortDir = EMMServer.DB.getQueryResult('SORTDIR') || null;
		if (sortDir != null)
			PUBLIC.sortDirection = sortDir[0].SORTDIR;
		var sortBy = EMMServer.DB.getQueryResult('SORTBY') || null;
		if (sortBy != null)
			PUBLIC.sortBy = $filter('filter')(PUBLIC.sortOptions, sortBy[0].SORTBY)[0];
		
		var cacheData = EMMServer.Session.getItem(cacheKey+options.viewName);
		if (cacheData != null){
			PUBLIC.search = cacheData.search;
			PUBLIC.sortBy = $filter('filter')(PUBLIC.sortOptions, cacheData.sortBy)[0];
			PUBLIC.sortDirection = cacheData.sortDirection;
			cacheMe(); 
		}
	};
	
	PUBLIC.pagination = null;
	PUBLIC.sortOptions = [{label : '', value : ''}];
	
	// Defaults
	PUBLIC.sortBy = PUBLIC.sortOptions[0];
	PUBLIC.sortDirection = 'ASC';

	// Methods
	PUBLIC.clearCache = function(){
		EMMServer.Session.removeItem(cacheKey+options.viewName);
	}
	PUBLIC.changeSortBy = function(){
		PUBLIC.goToPage(1);
	};
	PUBLIC.changeSortDirection = function(){
		PUBLIC.sortDirection = swap[PUBLIC.sortDirection];			
		PUBLIC.goToPage(1);
	};
	PUBLIC.goToPage = function(pageNum){
		if (options.pagination == null)
			return;
		if (options.pagination.pagenum <= 0 || options.pagination.pagenum > options.pagination.totalpages) {
			return;
		}							
		var selectObj = EMMServer.DB.Select();
		var sql = selectObj.getQuery(options.viewName,{query:options.queryName});					
		
		if (PUBLIC.sortBy.value != ''){
			var indx = sql.toUpperCase().indexOf("ORDER BY");
			if (indx > 0)
				sql = sql.substring(0, indx); 
				
			sql += " ORDER BY " + PUBLIC.sortBy.value + " " + PUBLIC.sortDirection;
			
			selectObj.addQuery("SORTBY", "SELECT '" + PUBLIC.sortBy.value + "' AS SORTBY");
			selectObj.addQuery("SORTDIR", "SELECT '" + PUBLIC.sortDirection + "' AS SORTDIR");						
		}
		
		cacheMe();
		
		selectObj.addQuery(options.queryName, sql, pageNum, options.pagination.pagesize);
		
		var queries = selectObj.getQuery(options.viewName);		
		if (queries!=null && queries.sqlselects!=null){
			$.each(queries.sqlselects, function(i, n){
				if (i !== options.queryName)
					selectObj.addQuery(i, queries.sqlselects[i].sqlstmt);
			});
		}
		
		selectObj.submit(options.viewName, true);				
	};
	PUBLIC.hasPages = function(){
		return options.pagination.totalpages > 1 || false;
	};
	PUBLIC.hasPrevious = function(){
		return options.pagination.pagenum > 1;
	};
	PUBLIC.hasNext = function(){
		return options.pagination.pagenum < options.pagination.totalpages;
	};
	PUBLIC.nextPage = function(){
		var page = options.pagination.pagenum + 1;
		if (page <= options.pagination.totalpages)
			PUBLIC.goToPage(page);
	};
	PUBLIC.previousPage = function(){
		var page = options.pagination.pagenum - 1;
		if (page > 0)
			PUBLIC.goToPage(page);
	};
	
	function cacheMe(){
		EMMServer.Session.setItem(cacheKey+options.viewName, {
			search: PUBLIC.search,
			sortDirection: PUBLIC.sortDirection,
			sortBy: PUBLIC.sortBy 
		});		
	}
	return PUBLIC;
});