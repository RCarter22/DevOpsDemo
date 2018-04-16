angular.module('emm').filter('myCustomFilter', function(){
	// implement filter here
});

angular.module('emm').filter('htmlToText', function(){
	return function(value){
		return value ? String(value).replace(/<[^>]+>/gm, '') : '';
	}
});