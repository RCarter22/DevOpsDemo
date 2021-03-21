(function(){
	var pagination = angular.module('emm.pagination', []);
	
	pagination.filter('startFrom', function() {
	    return function(input, start) {
	        if(input) {
	            start = +start; //parse to int
	            return input.slice(start);
	        }
	        return [];
	    }
	});
	
	pagination.directive('pagination', function(){
		return {
			restrict: 'A',
			template: "<li class='ui-pagination' ng-show='pageService.hasPages()'>" +
						"<a class='ui-pagination-prev' ng-click='pageService.previousPage()' ng-show='pageService.hasPrevious()'><span class='ui-arrow'></span></a>" +
						"<h3 class='title' translate='PAGINATION.TITLE' translate-value-from='{{pageService.getCurrentPage()}}' translate-value-to='{{pageService.numberOfPages()}}'>" +
					  			"Page {{pageService.getCurrentPage()}} of {{pageService.numberOfPages()}} " +
						"</h3>" +
						"<a class='ui-pagination-next' ng-click='pageService.nextPage()' ng-show='pageService.hasNext()'><span class='ui-arrow'></span></a>" +
					"</li>"
		};
	});
	
	pagination.factory('pageService', function(){
		
		var pageService = {
				currentPage: 0,
				pageSize: 20, // Default page size
				records: 0,
				startFrom: function(){
					return this.currentPage*this.pageSize;					
				},
				getPageSize: function(){
					return this.pageSize;
				},
				setPageSize: function(num){
					this.pageSize = num;
				},				
				setNumberOfRecords: function(num){
					this.records = num;
				},
				hasPages: function(){
					return this.numberOfPages()>1;
				},
				getCurrentPage: function(){
					return this.currentPage+1;
				},
				numberOfPages: function(){
					try{
						return Math.ceil(this.records/this.pageSize);
					} catch(err) {
						return 1;
					}
				},
				hasPrevious: function(){
					if(this.currentPage>0)
						return true;
					return false;
				},
				hasNext: function(){
					var nextPage = this.numberOfPages()-1;
					if(this.currentPage<nextPage)
						return true;
					return false;
				},
				previousPage: function(){
					if(--this.currentPage<=0)
						this.currentPage=0;
				},
				nextPage: function(){
					var nextPage = this.numberOfPages()-1;
					if(++this.currentPage>nextPage)
						this.currentPage=nextPage;
				}
			};
		
		return pageService;
	});
	
})();