'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: en_GB
 */
var locale = 'en_GB'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Set',
        cancelText: 'Cancel',
        clearText: 'Clear',
        selectedText: 'Selected',
        // Calender component
        calendarText: 'Calendar',
        dateText: 'Date',        
        timeText: 'Time',
        // Datetime component
        dateFormat: 'dd/mm/y',
        dateOrder: 'ddmmy',
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayText: 'Day',
        hourText: 'Hours',
        minuteText: 'Minutes',
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthText: 'Month',
        secText: 'Seconds',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: 'Year',
        nowText: 'Now',		
	},
	numeral : {
	    delimiters: {
	        thousands: ',',
	        decimal: '.'
	    },
	    abbreviations: {
	        thousand: 'k',
	        million: 'm',
	        billion: 'b',
	        trillion: 't'
	    },
	    ordinal: function (number) {
            var b = number % 10;
            return (Math.floor(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
	    currency: {
	        symbol: '\u00a3'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "zero",
		ONE : "one",
		TWO : "two",
		FEW : "few",
		MANY : "many",
		OTHER : "other"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "AM", "PM" ],
			"DAY" : [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
			"MONTH" : [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
			"SHORTDAY" : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
			"SHORTMONTH" : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
			"fullDate" : "EEEE, d MMMM, y",
			"longDate" : "d MMMM, y",
			"medium": "dd/MM/yyyy HH:mm:ss",
			"mediumDate" : "dd/MM/yyyy",
			"mediumTime" : "HH:mm:ss",
			"short" : "dd/MM/yy HH:mm",
			"shortDate" : "dd/MM/yy",
			"shortTime" : "HH:mm"				
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM" : "\u00a3",
			"DECIMAL_SEP" : ".",
			"GROUP_SEP" : ",",
			"PATTERNS" : [ {
				"gSize" : 3,
				"lgSize" : 3,
				"macFrac" : 0,
				"maxFrac" : 3,
				"minFrac" : 0,
				"minInt" : 1,
				"negPre" : "-",
				"negSuf" : "",
				"posPre" : "",
				"posSuf" : ""
			}, {
				"gSize" : 3,
				"lgSize" : 3,
				"macFrac" : 0,
				"maxFrac" : 2,
				"minFrac" : 2,
				"minInt" : 1,
				"negPre" : "(\u00a4",
				"negSuf" : ")",
				"posPre" : "\u00a4",
				"posSuf" : ""
			} ],
			"id": locale,
			"pluralCat": function (n) {
				if (n == 1) { 
					return PLURAL_CATEGORY.ONE;
				}
				return PLURAL_CATEGORY.OTHER;
			}
		}
	}
}