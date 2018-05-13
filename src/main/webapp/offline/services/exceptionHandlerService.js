/*
 * 
 *	Exception Handler Service overrides the default exception handling that angularjs provides.
 *	Default angularjs will only log to the console. This now provides an alert. 
 */

angular.module('emm').factory('$exceptionHandler', function ($log) {
    return function (exception, cause) {    	
    	if (exception && typeof(exception.showCallout) === 'function'){ // Check if EMMFieldException
    		exception.showCallout();
    	} else {
        	var message = "ERROR: " + exception.message;
        	if(cause)
        		message += ", Caused by: " + cause;
        	//if(exception.stack)
        	//	message += "\nStack trace: " + exception.stack;    	
        	$log.error(message); //prints to the console
        	alert(message);    		
    	}    	
    };
});