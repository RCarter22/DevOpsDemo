/** 
 * HttpService helper class to queue up requests and cancel 
 */
EZMaxMobile.factory('HttpService', function($http, $q){   
	
	function HttpService(){
		var defer = $q.defer(); 
		this.create = function (params, callback){
	    	var p = {timeout:defer.promise};
	    	angular.merge(p, params);
	    	return $http(p);
	    }
	    this.cancel = function(){
	    	defer.resolve();
	    }
	}
    
	// Callers need to instantiate this to use it
    return ( HttpService );

});