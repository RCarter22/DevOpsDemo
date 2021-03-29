angular.module('emm').filter('myCustomFilter', function(){
	// implement filter here
});

// Deprecated
angular.module('emm').filter('htmlToText', function(){
	return function(value){
		return value ? String(value).replace(/<[^>]+>/gm, '') : '';
	}
});

angular.module('emm').filter('trust', function($sce) {
    return function(value, type) {
    	//Defaults to treating trusted text as 'html'
    	return $sce.trustAs(type || 'html', value);
    }
});

angular.module('emm').filter('filterIfNumber', function($filter) {
	return function(value) {
		if (angular.isNumber(('' + value).toNumber())) {
			return $filter('number')(value);
		}
		return value;
	};
});