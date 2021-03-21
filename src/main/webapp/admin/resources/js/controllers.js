/**
 * MainCtrl - Main Controller
 */
EZMaxMobile.controller('MainCtrl', function ($scope, toastr) {
    $scope.appName = 'Admin Center';
    
    $scope.initGrid = function(config){
    	$scope.grid = {};
    	angular.merge($scope.grid, config);
    }    
    
	$scope.showSuccess = function(msg){
		toastr['success'](msg);
    }
	
	$scope.showError = function(msg){
		toastr['error'](msg);
    }    
	
	$scope.showInfo = function(msg){
		toastr['info'](msg);
	}

	$scope.showWarning = function(msg){
		toastr['warning'](msg);
	}
});

/**
 * Dashboard - Dashboard Controller
 */
EZMaxMobile.controller('DashboardCtrl', function($scope, $interval, HttpService){
    // Shared variables with child controllers
    $scope.chart1 = {};
    $scope.chart2 = {};
    $scope.chart3 = {};
    $scope.chart4 = {};
    $scope.chart5 = {};
    $scope.grid = {};	  
    $scope.datePicker = {};      
	$scope.httpService = new HttpService();
	$scope.createRequest = $scope.httpService.create;
	$scope.cancelRequests = $scope.httpService.cancel;
	
	var intervals = [];
	$scope.initHttpService = function(){
		$scope.httpService = new HttpService();
		$scope.createRequest = $scope.httpService.create;
		$scope.cancelRequests = $scope.httpService.cancel;
		
		
		$scope.setInterval = function(fn, delay){
			if (angular.isFunction(fn)){				
				fn();
				if (!angular.isNumber(delay))
					delay = 30 * 1000;				
				var intv = $interval(fn, delay);
				intervals.push(intv);
				return intv;
			}
			return null;
		}
		$scope.cancelIntervals = function(param){
			var cancelIntv = [];
			if (angular.isArray(param))
				cancelIntv = param;
			else if (angular.isDefined(param))
				cancelIntv.push(param);
			
			if (cancelIntv.length === 0){				
				angular.forEach(intervals, function(k, v){
					$interval.cancel(k);
				});	
				intervals = []; // reset
			} else {				
				angular.forEach(cancelIntv, function(k, v){
					$interval.cancel(k);
				});
			}
				
		}
	}
	
	$scope.initChartControls = function(){
	    $scope.chart1 = {
	    	data : {
	    		empty: { 
	    			label: { 
	    				text: "No Data Available" 
	    			}
	    		}	    		
	    	}
	    };
	    $scope.chart2 = {
	    	data : {
	    		empty: { 
	    			label: { 
	    				text: "No Data Available" 
	    			}
	    		}	    		
	    	}
	    };
	    $scope.chart3 = {
		    	data : {
		    		empty: { 
		    			label: { 
		    				text: "No Data Available" 
		    			}
		    		}	    		
		    	}
		    };
	    $scope.chart4 = {
		    	data : {
		    		empty: { 
		    			label: { 
		    				text: "No Data Available" 
		    			}
		    		}	    		
		    	}
		  	};
	    $scope.chart5 = {
		    	data : {
		    		empty: { 
		    			label: { 
		    				text: "No Data Available" 
		    			}
		    		}	    		
		    	}
		  	};
	    $scope.datePicker = {
			bindto: 'datepicker',
			getPicker: function(){
				return $('#'+this.bindto).data('daterangepicker'); // TODO: fix me to have multiple instances
			},
			date: {
				startDate: moment().subtract(30, 'days'), 
				endDate: moment(),			
			},
			options:{				
				alwaysShowCalendars: true,
				opens: "left",
				ranges: {
			           'Today': [moment(), moment()],
			           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			           'This Month': [moment().startOf('month'), moment().endOf('month')],
			           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
				},
				eventHandlers:{}
			}
		};		
	}
	$scope.initGridControls = function(){
	    $scope.grid = {
        	enableColumnResizing: true,
//         	enablePagination: true,
//    		paginationPageSizes: [20,40,60,80,100],
//    		paginationPageSize: 20,
//    		paginationCurrentPage: 1,
	    };			
	}
	
	$scope.initDashboard = function(){
		$scope.initHttpService();
		$scope.initChartControls();
		$scope.initGridControls();
	}
	
    $scope.initChart1 = function(config){
    	$scope.chart1 = {};
    	angular.merge($scope.chart1, config);
    }    
    $scope.initChart2 = function(config){
    	$scope.chart2 = {};
    	angular.merge($scope.chart2, config);
    }
    $scope.initChart3 = function(config){
    	$scope.chart3 = {};
    	angular.merge($scope.chart3, config);
    }
    $scope.initChart4 = function(config){
    	$scope.chart4 = {};
    	angular.merge($scope.chart4, config);
    }
    $scope.initChart5 = function(config){
    	$scope.chart5 = {};
    	angular.merge($scope.chart5, config);
    }     		
    $scope.initDatePicker = function(config){
    	angular.merge($scope.datePicker, config);
    }
    $scope.getChart1 = function(){
    	return $($scope.chart1.bindto).data('c3-simple');    	
    }
    $scope.getChart2 = function(){
    	return $($scope.chart2.bindto).data('c3-simple');    	
    }        
    $scope.getChart3 = function(){
    	return $($scope.chart3.bindto).data('c3-simple');    	
    }
    $scope.getChart4 = function(){
    	return $($scope.chart4.bindto).data('c3-simple');    	
    }
    $scope.getChart5 = function(){
    	return $($scope.chart5.bindto).data('c3-simple');    	
    }
    $scope.safeApply = function(fn) {
    	var phase = this.$root.$$phase;
		if (phase == '$apply' || phase == '$digest') {
			if (fn && (typeof (fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};

	$scope.resetUI = function(){						
		$scope.resetCharts();
		$scope.resetGrid();		
	}
	$scope.resetCharts = function(){
		$scope.safeApply(function(){
			if ($scope.chart1){
				if ($scope.chart1.data && $scope.chart1.data.columns)
					$scope.chart1.data.columns = [];
				if ($scope.chart1.data && $scope.chart1.data.rows)
					$scope.chart1.data.rows = [];				
			}				
			if ($scope.chart2){
				if ($scope.chart2.data && $scope.chart2.data.columns)
					$scope.chart2.data.columns = [];
				if ($scope.chart2.data && $scope.chart2.data.rows)
					$scope.chart2.data.rows = [];				
			}
			if ($scope.chart3){
				if ($scope.chart3.data && $scope.chart3.data.columns)
					$scope.chart3.data.columns = [];
				if ($scope.chart3.data && $scope.chart3.data.rows)
					$scope.chart3.data.rows = [];				
			}
			if ($scope.chart4){
				if ($scope.chart4.data && $scope.chart4.data.columns)
					$scope.chart4.data.columns = [];
				if ($scope.chart4.data && $scope.chart4.data.rows)
					$scope.chart4.data.rows = [];				
			}
			if ($scope.chart5){
				if ($scope.chart5.data && $scope.chart5.data.columns)
					$scope.chart5.data.columns = [];
				if ($scope.chart5.data && $scope.chart5.data.rows)
					$scope.chart5.data.rows = [];				
			}
		});
	}	
	$scope.resetGrid = function(){		
		$scope.safeApply(function(){
			if ($scope.grid)
				$scope.grid.data = [];
		});
	}
	
	$scope.destroy = function(){
    	$scope.cancelRequests();
    	$scope.cancelIntervals();		
	}
	
	//makes datepicker responsive
	$(window).resize(function(){
	    $scope.width = window.innerWidth;
	    $scope.$apply(function(){
	       //do something to update current scope based on the new innerWidth and let angular update the view.
	       if($scope.width < 1200 && $scope.width >950)
	    	   $(".picker").removeClass("col-md-3").addClass("col-md-4");   
	       else
	    	   $(".picker").removeClass("col-md-4").addClass("col-md-3");   
	    });
	});
	
	$scope.initDashboard();  	
});

/**
 * translateCtrl - Controller for translate
 */
EZMaxMobile.controller('translateCtrl', function($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        $scope.language = langKey;
    };
});