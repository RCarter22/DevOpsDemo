'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: vi_VN
 */
var locale = 'vi_VN'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'c\u00E0i \u0111\u1EB7t',
        cancelText: 'h\u1EE7y b\u1ECF',
        clearText: 'x\u00F3a b\u1ECF',
        selectedText: 'l\u1EF1a ch\u1ECDn',
        // Calender component
        calendarText: 'l\u1ECBch',
        dateText: 'ng\u00E0y th\u00E1ng',
        timeText: 'th\u1EDDi gian',
        // Datetime component
        dateFormat: 'd-m-y',
        dateOrder: 'dmy',
        dayNames: ['ch\u1EE7 nh\u1EADt', 'th\u1EE9 2', 'th\u1EE9 3', 'th\u1EE9 4', 'th\u1EE9 5', 'th\u1EE9 6', 'th\u1EE9 7'],
        dayNamesShort: ['ch\u1EE7 nh\u1EADt', 'th\u1EE9 2', 'th\u1EE9 3', 'th\u1EE9 4', 'th\u1EE9 5', 'th\u1EE9 6', 'th\u1EE9 7'],
        dayText: 'ng\u00E0y',
        hourText: 'gi\u1EDD',
        minuteText: 'ph\u00FAt',
        monthNames: ['th\u00E1ng 1', 'th\u00E1ng 2', 'th\u00E1ng 3', 'th\u00E1ng 4', 'th\u00E1ng 5', 'th\u00E1ng 6', 'th\u00E1ng 7', 'th\u00E1ng 8', 'th\u00E1ng 9', 'th\u00E1ng 10', 'th\u00E1ng 11', 'th\u00E1ng 12'],
        monthNamesShort: ['th\u00E1ng 1', 'th\u00E1ng 2', 'th\u00E1ng 3', 'th\u00E1ng 4', 'th\u00E1ng 5', 'th\u00E1ng 6', 'th\u00E1ng 7', 'th\u00E1ng 8', 'th\u00E1ng 9', 'th\u00E1ng 10', 'th\u00E1ng 11', 'th\u00E1ng 12'],
        monthText: 'th\u00E1ng',
        secText: 'gi\u00E2y',
        amText: 's\u00E1ng',
        pmText: 'chi\u1EC1u',
        timeFormat: 'H:i:s',
        timeWheels: 'His',
        yearText: 'n\u0103m',
        nowText: 'hi\u1EC7n t\u1EA1i',
	},
	numeral : {
	    delimiters: {
	        thousands: '.',
	        decimal: ','
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
	        symbol: '\u20ab'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : 0,
		ONE : 1,
		TWO : 2,
		FEW : "\u00EDt",
		MANY : "nhi\u1EC1u",
		OTHER : "kh\u00E1c"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS": [ "SA", "CH" ],
			"DAY": [ "Ch\u1ee7 Nh\u1eadt", "Th\u1ee9 Hai", "Th\u1ee9 Ba", "Th\u1ee9 T\u01b0", "Th\u1ee9 N\u0103m", "Th\u1ee9 S\u00e1u", "Th\u1ee9 B\u1ea3y" ],
			"MONTH": [ "th\u00e1ng 1", "th\u00e1ng 2", "th\u00e1ng 3", "th\u00e1ng 4", "th\u00e1ng 5", "th\u00e1ng 6", "th\u00e1ng 7", "th\u00e1ng 8", "th\u00e1ng 9", "th\u00e1ng 10", "th\u00e1ng 11", "th\u00e1ng 12" ],
		    "SHORTDAY": [ "CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7" ],
		    "SHORTMONTH": [ "thg 1", "thg 2", "thg 3", "thg 4", "thg 5", "thg 6", "thg 7", "thg 8", "thg 9", "thg 10", "thg 11", "thg 12" ],
			"fullDate" : "EEEE, d MMMM, y",
		    "longDate" : "d MMMM, y",
		    "medium" : "d MMM, y H:m:s",
		    "mediumDate" : "d MMM, y",
		    "mediumTime" : "H:m:s",
		    "short" : "d-M-yy H:m:s",
		    "shortDate" : "d-M-yy",
		    "shortTime" : "H:m:s"				
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "\u20ab",
		    "DECIMAL_SEP": ",",
		    "GROUP_SEP": ".",
			"PATTERNS" : [ {
				"gSize": 3,
		        "lgSize": 3,
		        "maxFrac": 3,
		        "minFrac": 0,
		        "minInt": 1,
		        "negPre": "-",
		        "negSuf": "",
		        "posPre": "",
		        "posSuf": ""
			}, {
				"gSize": 3,
		        "lgSize": 3,
		        "maxFrac": 0,
		        "minFrac": 0,
		        "minInt": 1,
		        "negPre": "-\u00a4\u00a0",
		        "negSuf": "",
		        "posPre": "\u00a4\u00a0",
		        "posSuf": ""
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


/***
 * NOTE: All keys need to be UPPERCASE
 * 
 * MESSAGE Code Structure - EMM[CC][NNNN][T]
 * [CC] - two letter code identifies the module
 * [NNNN] - four digit number
 * [T] - Type of message, E (Error), W (Warning), I (Info)
 * 
 * List of existing modules:
 * [OF] - Offline
 * [ES] - E-Signature
 * [WF] - Workflow
 * [GB] - General Messages
 * 
 * Usage:
 * 
 * There are two approaches to message formatting; Object based or array based.  The object base is preferred if the message is 
 * going to be used as a template for AngularJS (See how PAGINATION.TITLE is being used) and the array based method is used for simple Javascript formatting.
 * 
 * Formatting messages is available for localized strings.  There are two ways to implement formatting:  
 * 		Method 1: Use double brackets {{}} with an object variable name
 * 	    	- Example - MESSAGEID : 'This is a {{variableA}} message with {{variableB}}'
 *      	- Javascript Usage - getText('MESSAGEID', {variableA: 'formatted', variableB: 'place holders'}); // Outputs 'This is a formatted message with place holders'
 *      		- Notice the second parameter is an Object with the corresponding property names
 *      Method 2: Use single brackets {} with an index, similar to C#
 * 			- Example - MESSAGEID : 'This is a {0} message with {1}'
 * 			- Javascript Usage - getText('MESSAGEID', ['formatted', 'place holders']); // Outputs 'This is a formatted message with place holders'
 * 				- Notice the second parameter is an Array of values 
 */

/***
 * Language: VI
 */
var lang = 'VI'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Ho\u00E0n th\u00E0nh \u0111\u1ED3ng b\u1ED9, nh\u01B0ng xu\u1EA5t hi\u1EC7n l\u1ED7i! V\u1EABn c\u00F3 th\u1EC3 th\u1EED tho\u00E1t m\u00E1y l\u00E0m vi\u1EC7c.',
	EMMOF1001W : 'Ho\u00E0n th\u00E0nh \u0111\u1ED3ng b\u1ED9, nh\u01B0ng xu\u1EA5t hi\u1EC7n l\u1ED7i! Xin \u0111\u1ED3ng b\u1ED9 l\u1EA1i, v\u00E0 kh\u1EDFi \u0111\u1ED9ng m\u00F4 th\u1EE9c ngo\u1EA1i tuy\u1EBFn.',
	EMMOF1002W : 'Ho\u00E0n th\u00E0nh \u0111\u1ED3ng b\u1ED9, nh\u01B0ng xu\u1EA5t hi\u1EC7n l\u1ED7i! C\u00F3 th\u1EC3 th\u1EED \u0111\u1ED3ng b\u1ED9 l\u1EA1i ho\u1EB7c gi\u1EEF tr\u1EA1ng th\u00E1i tho\u00E1t m\u00E1y l\u00E0m vi\u1EC7c.',
	EMMOF1003W : 'Ho\u00E0n th\u00E0nh \u0111\u1ED3ng b\u1ED9, nh\u01B0ng xu\u1EA5t hi\u1EC7n l\u1ED7i! Xin th\u1EED \u0111\u1ED3ng b\u1ED9 l\u1EA1i, \u0111\u1EC3 tho\u00E1t m\u00E1y l\u00E0m vi\u1EC7c.',
	EMMOF1004W : '{0} ph\u1EA3i l\u00E0 m\u1ED9t s\u1ED1',
	EMMOF1005W : 'Thi\u1EBFu \u0111o\u1EA1n ch\u1EEF ph\u1EA3i \u0111i\u1EC1n: {0}',
	EMMOF1006W : 'Thu\u1ED9c t\u00EDnh {0} l\u00E0 ch\u1EC9 \u0111\u1ECDc \u0111\u01B0\u1EE3c',
	EMMOF1007W : 'Xin l\u1EF1a ch\u1ECDn 1 gi\u00E1 tr\u1ECB',
	EMMOF1008I : '\u0110\u00E3 s\u1EEDa \u0111\u1ED5i tr\u1EA1ng th\u00E1i th\u00E0nh c\u00F4ng',
	EMMOF1009W : 'Xin ch\u1EC9 \u0111\u1ECBnh s\u1ED1 l\u01B0\u1EE3ng l\u1EDBn h\u01A1n 0',
	EMMOF1010W : '{0} ph\u1EA3i l\u1EDBn h\u01A1n 0',
	EMMOF1011W : '{0} l\u00E0 m\u1EE5c ph\u1EA3i \u0111i\u1EC1n v\u00E0o',
	EMMOF1012W : 'H\u1EA1ng m\u1EE5c, t\u1ED3n kho v\u00E0 t\u1ED5 h\u1EE3p v\u1ECB tr\u00ED h\u00E0ng n\u00E0y kh\u00F4ng t\u1ED3n t\u1EA1i s\u1ED1 d\u01B0',
	EMMOF1013W : 'Do giao d\u1ECBch n\u00E0y, s\u1ED1 d\u01B0 trong v\u1ECB tr\u00ED h\u00E0ng c\u00F3 th\u1EC3 \u0111\u1ED5i th\u00E0nh gi\u00E1 tr\u1ECB \u00E2m',
	EMMOF1014W : 'Khi v\u1ECB tr\u00ED, s\u1ED1 v\u1ECB tr\u00ED h\u00E0ng v\u00E0 s\u1ED1 \u0111\u1ECBa \u0111i\u1EC3m gi\u1ED1ng nhau, th\u00EC kh\u00F4ng th\u1EC3 chuy\u1EC3n d\u1ECBch',
	// [WF]		
	EMMWF1000I : 'Kh\u1EDFi \u0111\u1ED9ng quy tr\u00ECnh l\u00E0m vi\u1EC7c',
	EMMWF1001I : 'Quy tr\u00ECnh \u1EE9ng d\u1EE5ng n\u00E0y c\u00F3 nhi\u1EC1u quy tr\u00ECnh l\u00E0m vi\u1EC7c kh\u1EA3 d\u1EE5ng. Xin l\u1EF1a ch\u1ECDn 1 c\u00E1i v\u00E0 \u1EA5n x\u00E1c nh\u1EADn.',
	EMMWF1002I : 'Xin l\u1EF1a ch\u1ECDn 1 quy tr\u00ECnh',
	EMMWF1003I : 'Quy tr\u00ECnh',
	EMMWF1004I : 'B\u1EA3n ghi nh\u1EDB',
	EMMWF1005I : 'D\u1EEBng quy tr\u00ECnh l\u00E0m vi\u1EC7c',
	// [ES]
	EMMES1000I : '\u1EE6y quy\u1EC1n ch\u1EEF k\u00FD \u0111i\u1EC7n t\u1EED',
	EMMES1001I : 'C\u1EA7n cung c\u1EA5p ch\u1EEF k\u00FD \u0111i\u1EC7n t\u1EED',
	EMMES1002E : '\u1EE6y quy\u1EC1n th\u1EA5t b\u1EA1i',
	EMMES1003I : 'Xin nh\u1EADp m\u1EADt kh\u1EA9u v\u00E0 nguy\u00EAn nh\u00E2n',
	EMMES1004I : 'Ng\u01B0\u1EDDi d\u00F9ng',
	EMMES1005I : 'M\u1EADt kh\u1EA9u',
	EMMES1006I : 'Nguy\u00EAn nh\u00E2n',
	// [GB]
	EMMGB1001I : 'Th\u01B0 \u0111i\u1EC7n t\u1EED',
	EMMGB1002I : 'K\u1EBFt n\u1ED1i video',
	EMMGB1003I : 'H\u1EE7y b\u1ECF',
	EMMGB1004I : 'X\u00E1c \u0111\u1ECBnh',
	EMMGB1005I : 'X\u00E1c nh\u1EADn',
	EMMGB1006I : 'Ph\u1EA3i',
	EMMGB1007I : 'Kh\u00F4ng',
	EMMGB1008I : '\u0110i\u1EC7n tho\u1EA1i',
	EMMGB1009I : 'G\u1ECDi',
	EMMGB1010I : 'Tin nh\u1EAFn',
	EMMGB1011I : 'X\u00E1c nh\u1EADn x\u00F3a b\u1ECF?',
	EMMGB1012I : '{0} ph\u1EA3i ph\u00E1t sinh tr\u01B0\u1EDBc {1}',
	EMMGB1013I : '{0} ph\u1EA3i ph\u00E1t sinh sau {1}',
	EMMGB1014I : '{0} ph\u1EA3i ph\u00E1t sinh trong qu\u00E1 kh\u1EE9',
	// General	
	OFFLINEMODE : 'M\u00F4 th\u1EE9c ngo\u1EA1i tuy\u1EBFn',
	SYNCNEEDED : '\u00A0 -- \u0111\u00E3 thay \u0111\u1ED5i, ph\u1EA3i ti\u1EBFn h\u00E0nh \u0111\u1ED3ng b\u1ED9',
	SYNCHRONIZATION : '\u0110\u1ED3ng b\u1ED9 h\u00F3a',
	SYNCSERVER : '\u0110\u1ED3ng b\u1ED9 v\u1EDBi m\u00E1y ch\u1EE7',
	ENTERLABOR: 'Nh\u1EADp v\u00E0o theo nh\u00E2n l\u1EF1c',
	ADDMORE: 'Th\u00EAm nhi\u1EC1u h\u01A1n...',
	GOONLINE : 'L\u1EA1i tr\u1EF1c tuy\u1EBFn',
	GOTOOFFLINEAPPS : 'Chuy\u1EC3n \u0111\u1EBFn tr\u00ECnh t\u1EF1 \u1EE9ng d\u1EE5ng ngo\u1EA1i tuy\u1EBFn',
	OFFLINEAPPS : 'Tr\u00ECnh t\u1EF1 \u1EE9ng d\u1EE5ng ngo\u1EA1i tuy\u1EBFn',
	QUICKSCAN : 'Qu\u00E9t nhanh:',
	ACTIVEWORKORDERS : 'K\u00EDch ho\u1EA1t tr\u1EA1ng th\u00E1i \u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c',
	RECORDSAVED: 'Ghi ch\u00E9p \u0111\u00E3 \u0111\u01B0\u1EE3c l\u01B0u',
	RECORDNOTSAVED: 'L\u1ED7i - kh\u00F4ng c\u00F3 ghi ch\u00E9p tr\u1EDF v\u1EC1',
	TIMERALREADYSTARTED: 'B\u1ED9 \u0111\u1EBFm th\u1EDDi gian \u0111\u00E3 kh\u1EDFi \u0111\u1ED9ng',
	TIMERNOTFOUND : 'B\u1ED9 \u0111\u1EBFm th\u1EDDi gian ch\u01B0a kh\u1EDFi \u0111\u1ED9ng. Kh\u00F4ng t\u00ECm th\u1EA5y b\u1ED9 \u0111\u1EBFm th\u1EDDi gian \u0111\u00E3 s\u1EED d\u1EE5ng.',
	TIMERSTARTED : 'B\u1ED9 \u0111\u1EBFm th\u1EDDi gian \u0111\u00E3 kh\u1EDFi \u0111\u1ED9ng',
	TIMERSTOPPED : 'B\u1ED9 \u0111\u1EBFm th\u1EDDi gian \u0111\u00E3 ng\u1EEBng',
	TOOLS : 'C\u00F4ng c\u1EE5',
	STARTTIMER : 'Kh\u1EDFi \u0111\u1ED9ng b\u1ED9 \u0111\u1EBFm th\u1EDDi gian',
	STOPTIMER : 'D\u1EEBng b\u1ED9 \u0111\u1EBFm th\u1EDDi gian',
	MODIFYSAVE : 'Ghi ch\u00E9p \u0111\u00E3 thay \u0111\u1ED5i. Xin l\u01B0u thay \u0111\u1ED5i c\u1EE7a b\u1EA1n.',
	SITEREQUIRED : 'Site y\u00EAu c\u1EA7u t\u1EA1o \u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c',
	NOVALUE : 'Gi\u00E1 tr\u1ECB r\u1ED7ng',
	ACTIONS : 'Thao t\u00E1c',
	CHILDRENOF : 'Ph\u1EA7n t\u1EED con c\u1EE7a',
	RESPONSIBILITY : 'Tr\u00E1ch nhi\u1EC7m',
	LOOKUP : 'T\u00ECm xem',
	LOCATIONDRILLDOWN : 'Khoan xu\u1ED1ng v\u1ECB tr\u00ED',
	ASSETDRILLDOWN : 'Khoan xu\u1ED1ng t\u00E0i s\u1EA3n',
	DRILLDOWN : 'Khoan xu\u1ED1ng',
	BACK : 'Tr\u1EDF v\u1EC1',
	SAVE : 'L\u01B0u',
	APPLY : '\u1EE8ng d\u1EE5ng',
	FILTER : 'L\u1ECDc',
	RESET : 'B\u1ED1 tr\u00ED l\u1EA1i',
	SELECTVALUE : 'Gi\u00E1 tr\u1ECB l\u1EF1a ch\u1ECDn',
	CANCEL : 'H\u1EE7y b\u1ECF',
	OK : 'X\u00E1c nh\u1EADn',
	YES : 'Ph\u1EA3i',
	NO : 'Kh\u00F4ng',
	CREATEFOLLOWUP : 'T\u1EA1o theo d\u00F5i',
	CREATESR : 'T\u1EA1o y\u00EAu c\u1EA7u d\u1ECBch v\u1EE5 m\u1EDBi',
	PARENT : 'Ph\u1EA7n t\u1EED cha',
	CHANGESTATUS : 'Tr\u1EA1ng th\u00E1i thay \u0111\u1ED5i',
	LABOR : 'Nh\u00E2n l\u1EF1c',
	MATERIALS : 'V\u1EADt li\u1EC7u',
	TASKS : 'Nhi\u1EC7m v\u1EE5',
	ATTACHMENTS : 'Ph\u1EE5 ki\u1EC7n',
	FAILUREREPORTING : 'B\u00E1o c\u00E1o s\u1EF1 c\u1ED1',
	MULTIASSETS : 'Nhi\u1EC1u t\u00E0i s\u1EA3n, v\u1ECB tr\u00ED',
	ADDNEW : 'Th\u00EAm m\u1EE5c m\u1EDBi',
	CLASSIFICATION : 'Ph\u00E2n lo\u1EA1i',
	NORECORDS : 'Ch\u01B0a t\u00ECm th\u1EA5y ghi ch\u00E9p',
	NORECORDEXIST : 'Ch\u01B0a t\u00ECm th\u1EA5y ghi ch\u00E9p ho\u1EB7c ghi ch\u00E9p kh\u00F4ng t\u1ED3n t\u1EA1i n\u1EEFa',
	NORECORDSADJ : 'Kh\u00F4ng c\u00F3 ghi ch\u00E9p \u0111\u1EC3 \u0111i\u1EC1u ch\u1EC9nh ki\u1EC3m k\u00EA th\u1EF1c t\u1EBF',
	SELECTOWNER : 'L\u1EF1a ch\u1ECDn ng\u01B0\u1EDDi ph\u1EE5 tr\u00E1ch',
	OWNER : 'Ng\u01B0\u1EDDi ph\u1EE5 tr\u00E1ch',
	OWNERGROUP : 'Nh\u00F3m  ng\u01B0\u1EDDi ph\u1EE5 tr\u00E1ch',
	TAKEOWNERSHIP : 'Ph\u1EE5 tr\u00E1ch',
	SORTBY : 'Ph\u01B0\u01A1ng th\u1EE9c s\u1EAFp x\u1EBFp',
	LIST : 'B\u1EA3ng k\u00EA',
	QUICKSEARCH: 'T\u00ECm  ki\u1EBFm  nhanh',
	INVENTORYBYSR : 'Ti\u1EBFn h\u00E0nh t\u1ED3n kho theo kho',
	INVDETAILS : 'Chi ti\u1EBFt t\u1ED3n kho',
	NEWCOUNT : 'Ki\u1EC3m  k\u00EA m\u1EDBi',
	LABORTRANS : 'Giao d\u1ECBch nh\u00E2n l\u1EF1c',
	CREATEWO : 'T\u1EA1o \u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c m\u1EDBi',
	MYWOS : '\u0110\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c c\u1EE7a t\u00F4i',
	FAILUREREPORT : 'B\u00E1o c\u00E1o s\u1EF1 c\u1ED1',
	METERREADINGS : 'S\u1ED1 \u0111\u1ECDc \u0111\u1ED3ng h\u1ED3 \u0111o nh\u1EADp v\u00E0o',
	ASSETMETER : 'S\u1ED1 \u0111\u1ECDc \u0111\u1ED3ng h\u1ED3 \u0111o t\u00E0i s\u1EA3n',
	LOCATIONMETER : 'S\u1ED1 \u0111\u1ECDc \u0111\u1ED3ng h\u1ED3 \u0111o v\u1ECB tr\u00ED',
	FROM : 'T\u1EEB',
	TO : '\u0110\u1EBFn',
	ADVANCED : 'Cao c\u1EA5p',
	ADVANCEDSEARCH : 'T\u00ECm ki\u1EBFm cao c\u1EA5p',
	DOWNTIME : 'Th\u1EDDi gian ng\u1EEBng m\u00E1y',
	PURCHASEINFO : 'Th\u00F4ng tin mua',
	SPAREPARTS : 'Linh ki\u1EC7n',
	SCHEDULEINFO : 'Th\u00F4ng tin \u0111i\u1EC1u \u0111\u1ED9',
	PLANLABOR : 'K\u1EBF ho\u1EA1ch nh\u00E2n l\u1EF1c',
	PLANMATERIAL : 'k\u1EBF ho\u1EA1ch v\u1EADt li\u1EC7u',
	WOCREATED : '\u0110\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c {0} \u0111\u00E3 \u0111\u01B0\u1EE3c t\u1EA1o.',
	PRESTART : 'Kh\u1EDFi \u0111\u1ED9ng tr\u01B0\u1EDBc',
	REVIEWANDAPPROVE : 'Ki\u1EC3m tra l\u1EA1i v\u00E0 ph\u00EA chu\u1EA9n',
	MOCACTIONGROUP : 'L\u1EF1a ch\u1ECDn nh\u00F3m thao t\u00E1c MOC',
	MOCACTIONS : 'L\u1EF1a ch\u1ECDn thao t\u00E1c MOC',
	REVIEWERSAVED : 'Ng\u01B0\u1EDDi ki\u1EC3m tra l\u1EA1i \u0111\u00E3 \u0111\u01B0\u1EE3c l\u01B0u ngo\u1EA1i tuy\u1EBFn.',
	APPROVERSAVED : 'Ng\u01B0\u1EDDi ph\u00EA chu\u1EA9n \u0111\u00E3 \u0111\u01B0\u1EE3c l\u01B0u ngo\u1EA1i tuy\u1EBFn.',
	ACTIONSAVED : 'Thao t\u00E1c \u0111\u00E3 \u0111\u01B0\u1EE3c l\u01B0u ngo\u1EA1i tuy\u1EBFn.',
	NOACTIONS : 'Nh\u00F3m thao t\u00E1c ti\u00EAu chu\u1EA9n {0} kh\u00F4ng c\u00F3 thao t\u00E1c ti\u00EAu chu\u1EA9n c\u00F3 hi\u1EC7u qu\u1EA3 c\u00F3 th\u1EC3 th\u00EAm v\u00E0o.',
	SRQUEUED : 'Tr\u1EA1ng th\u00E1i SR {0} \u0111\u1ED5i th\u00E0nh QUEUED.',
	SELECTREVIEWERS : 'L\u1EF1a ch\u1ECDn ng\u01B0\u1EDDi ki\u1EC3m tra l\u1EA1i',
	SELECTAPPROVERS : 'L\u1EF1a ch\u1ECDn ng\u01B0\u1EDDi ph\u00EA chu\u1EA9n',
	APPROVERS : 'Ng\u01B0\u1EDDi ph\u00EA chu\u1EA9n',
	REVIEWERS : 'Ng\u01B0\u1EDDi ki\u1EC3m tra l\u1EA1i',
	VIEWLIST: 'Xem b\u1EA3ng bi\u1EC3u',
	VIEWSUMMARY : 'Xem tr\u00EDch l\u1EE5c',
	STOREROOMS : 'T\u1ED3n kho',
	REPDOWNTIME: 'Report Downtime',
	GOTO : '\u0110\u1EBFn',
	APPS : 'Tr\u00ECnh t\u1EF1 \u1EE9ng d\u1EE5ng',
	STARTCENTER : 'Trung t\u00E2m b\u1EAFt \u0111\u1EA7u',
	PAGINATION : {
		TITLE : 'trang s\u1ED1 {{from}} {{to}} - {{total}} ch\u00fa th\u00edch',
		PREV : 'tr\u01B0\u1EDBc',
		NEXT : 'sau'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'v\u1ECB tr\u00ED',
		ASSET : 't\u00E0i s\u1EA3n',
		WOTRACK : 'theo d\u00F5i \u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c',
		SR : 'y\u00EAu c\u1EA7u d\u1ECBch v\u1EE5',
		INVENTOR: 't\u1ED3n kho',
		INVISSUE: 'ph\u00E1t h\u00E0nh v\u00E0 chuy\u1EC3n d\u1ECBch',
		MOC : 'MOC (d\u1EA7u)',
		CREATEDR : 't\u1EA1o \u0111\u01A1n xin mua h\u00E0ng',
		VIEWDR : 'xem \u0111\u01A1n xin mua h\u00E0ng',
		LABREP: 'b\u00E1o c\u00E1o nh\u00E2n l\u1EF1c',
		TXNTRACK : '\u0111\u1ED3ng b\u1ED9 gi\u1EA3i quy\u1EBFt v\u1EA5n \u0111\u1EC1'
	},
	// Objects
	ASSET : {
		ASSETNUM : 's\u1ED1 t\u00E0i s\u1EA3n #',
		STATUS : 'tr\u1EA1ng th\u00E1i',
		STATUSDATE: 'ng\u00E0y bi\u1EBFn \u0111\u1ED9ng l\u1EA7n tr\u01B0\u1EDBc',
		INSTALLDATE: 'ng\u00E0y l\u1EAFp \u0111\u1EB7t',
		SITEID : '\u0111\u1ECBa \u0111i\u1EC3m',
		PARENT : 'ph\u1EA7n t\u1EED cha',
		ASSETTYPE: 'lo\u1EA1i h\u00ECnh',
		LONGDESCRIPTION : 'th\u00F4ng tin chi ti\u1EBFt',
		GROUPNAME: 'nh\u00F3m \u0111\u1ED3ng h\u1ED3 \u0111o',
		SERIALNUM: 'th\u1EE9 t\u1EF1 #',
		PURCHASEPRICE: 'gi\u00E1 mua',
		TOTDOWNTIME: 't\u1ED5ng th\u1EDDi gian ng\u1EEBng m\u00E1y',
		ISRUNNING: '\u0111i\u1EC1u ph\u1ED1i s\u1EED d\u1EE5ng t\u00E0i s\u1EA3n',
		VENDOR: 'nh\u00E0 cung \u1EE9ng',
		MANUFACTURER: 'nh\u00E0 s\u1EA3n xu\u1EA5t',
		FAILURECODE: 'lo\u1EA1i s\u1EF1 c\u1ED1',
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		LOCATION : 'v\u1ECB tr\u00ED',
		LOCDESC : 'th\u00F4ng tin chi ti\u1EBFt',
		SEQUENCE : 'th\u1EE9 t\u1EF1',
		PROGRESS : '\u0111\u00E1nh d\u1EA5u ti\u1EBFn \u0111\u1ED9?',
		COMMENTS : 'ch\u00FA th\u00EDch',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 's\u1ED1 \u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c',
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		LONGDESCRIPTION : 'th\u00F4ng tin chi ti\u1EBFt',
		STATUS : 'tr\u1EA1ng th\u00E1i',
		PARENT : '\u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c cha',
		SITEID : '\u0111\u1ECBa \u0111i\u1EC3m',
		LOCATION : 'v\u1ECB tr\u00ED',
		ASSETNUM : 's\u1ED1 t\u00E0i s\u1EA3n',
		WORKTYPE : 'lo\u1EA1i h\u00ECnh c\u00F4ng vi\u1EC7c',
		WOPRIORITY : '\u01B0u ti\u00EAn',
		GLACCOUNT : 't\u1ED5ng t\u00E0i kho\u1EA3n',
		FAILURECODE : 'm\u00E3 lo\u1EA1i s\u1EF1 c\u1ED1',
		PROBLEMCODE : 'm\u00E3 v\u1EA5n \u0111\u1EC1',
		SUPERVISOR : 'ng\u01B0\u1EDDi gi\u00E1m s\u00E1t',
		CREWID : 'to\u00E0n th\u1EC3 nh\u00E2n vi\u00EAn',
		LEAD : 'l\u00E3nh \u0111\u1EA1o',
		PERSONGROUP : 'nh\u00F3m l\u00E0m vi\u1EC7c',
		REPORTEDBY : 'ng\u01B0\u1EDDi b\u00E1o c\u00E1o',
		REPORTDATE : 'ng\u00E0y b\u00E1o c\u00E1o',
		PHONE : 's\u1ED1 \u0111i\u1EC7n tho\u1EA1i',
		TASKID : 'm\u00E3 nhi\u1EC7m v\u1EE5',
		TARGSTARTDATE : 'ng\u00E0y b\u1EAFt \u0111\u1EA7u m\u1EE5c ti\u00EAu',
		TARGCOMPDATE : 'ng\u00E0y ho\u00E0n th\u00E0nh m\u1EE5c ti\u00EAu',
		SCHEDSTART : 'b\u1EAFt \u0111\u1EA7u k\u1EBF ho\u1EA1ch',
		SCHEDFINISH : 'ho\u00E0n th\u00E0nh k\u1EBF ho\u1EA1ch',
		ACTSTART : 'b\u1EAFt \u0111\u1EA7u th\u1EF1c t\u1EBF',
		ACTFINISH : 'ho\u00E0n th\u00E0nh th\u1EF1c t\u1EBF',
		ASSIGNMENT : 'nh\u00E2n l\u1EF1c ph\u00E2n ph\u1ED1i',
		OWNER : 'ng\u01B0\u1EDDi ph\u1EE5 tr\u00E1ch',
		OWNERGROUP : 'nh\u00F3m ng\u01B0\u1EDDi ph\u1EE5 tr\u00E1ch',
		OBSERVATION : 'quan s\u00E1t',
		MEASUREMENTVALUE : 'gi\u00E1 tr\u1ECB \u0111o \u0111\u1ECBnh',
		HAZARDS: 'nguy hi\u1EC3m',
		HAZARDSMAT: 'ch\u1EA5t c\u00F3 h\u1EA1i',
		PRECAUTIONS: 's\u1EF1 vi\u1EC7c c\u1EA7n ch\u00FA \u00FD',
		LOCKTAG: 'c\u00E1ch ly/c\u00F4 l\u1EADp',
		TAGOUT: 'c\u00F4 l\u1EADp',
		LOCKOUT: 'c\u00E1ch ly',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		ITEM : 'h\u1EA1ng m\u1EE5c',
		LINETYPE : 'lo\u1EA1i h\u00E0ng',
		QUANTITY : 's\u1ED1 l\u01B0\u1EE3ng',
		STOREROOM : 'kho',
		STORELOC : 'kho',
		BINNUM : 'v\u1ECB tr\u00ED h\u00E0ng h\u00F3a',
		CURBAL : 's\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i',
		UNITCOST : 'gi\u00E1 v\u1ED1n \u0111\u01A1n v\u1ECB',
		ASSET : 't\u00E0i s\u1EA3n',
		WORKORDER : '\u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c',
		LOCATION : 'v\u1ECB tr\u00ED',
		ISSUETYPE : 'lo\u1EA1i h\u00ECnh nh\u1EADn v\u1EADt li\u1EC7u',
		ISSUETO : 'ph\u00E1t h\u00E0nh \u0111\u1EBFn',
		ROTASSETNUM : 'chuy\u1EC3n \u0111\u1ED5i t\u00E0i s\u1EA3n',
		SITEID : '\u0111\u1ECBa \u0111i\u1EC3m',
		ISSUERETURN : 'ph\u00E1t h\u00E0nh v\u00E0 tr\u1EDF v\u1EC1',
		CHARGEINFO : 'th\u00F4ng tin ghi s\u1ED5'
	},
	TOOLTRANS : {
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		ITEM : 'h\u1EA1ng m\u1EE5c',
		LINETYPE : 'lo\u1EA1i h\u00E0ng',
		QUANTITY : 's\u1ED1 l\u01B0\u1EE3ng',
		STOREROOM : 'kho',
		BINNUM : 'v\u1ECB tr\u00ED h\u00E0ng h\u00F3a',
		CURBAL : 's\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i',
		UNITCOST : 'gi\u00E1 v\u1ED1n \u0111\u01A1n v\u1ECB',
		ISSUETYPE : 'lo\u1EA1i h\u00ECnh nh\u1EADn v\u1EADt li\u1EC7u',
		LOCATION : 'v\u1ECB tr\u00ED',
		TOOLRATE : 't\u1EF7 l\u1EC7 c\u00F4ng c\u1EE5',
		ASSETNUM: 't\u00E0i s\u1EA3n',
		TOOLHRS: 's\u1ED1 gi\u1EDD s\u1EED d\u1EE5ng c\u00F4ng c\u1EE5',
		LINECOST: 'gi\u00E1 v\u1ED1n h\u00E0ng',
		TOOLQTY: 's\u1ED1 l\u01B0\u1EE3ng c\u00F4ng c\u1EE5'
	},
	MATRECTRANS : {
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		ITEM : 'h\u1EA1ng m\u1EE5c',
		LINETYPE : 'lo\u1EA1i h\u00E0ng',
		QUANTITY : 's\u1ED1 l\u01B0\u1EE3ng',
		TOSTORELOC : 'v\u1ECB tr\u00ED m\u1EE5c ti\u00EAu',
		FROMSTORELOC : 'v\u1ECB tr\u00ED b\u1EAFt \u0111\u1EA7u',
		FROMSITE : '\u0111\u1ECBa \u0111i\u1EC3m b\u1EAFt \u0111\u1EA7u',
		TOSITE : '\u0111\u1ECBa \u0111i\u1EC3m m\u1EE5c ti\u00EAu',
		TOBIN: 'v\u1ECB tr\u00ED h\u00E0ng h\u00F3a m\u1EE5c ti\u00EAu',
		FROMBIN: 'v\u1ECB tr\u00ED h\u00E0ng h\u00F3a b\u1EAFt \u0111\u1EA7u',
		UNITCOST : 'gi\u00E1 v\u1ED1n \u0111\u01A1n v\u1ECB',
		ISSUETYPE : 'lo\u1EA1i h\u00ECnh nh\u1EADn v\u1EADt li\u1EC7u',
		CONVERSIONFACTOR : 'h\u1EC7 s\u1ED1 quy \u0111\u1ED5i',
		ROTASSETNUM : 'chuy\u1EC3n h\u00F3a t\u00E0i s\u1EA3n',
		TRANSFEROUT : 'chuy\u1EC3n ra',
		TRANSFERIN : 'chuy\u1EC3n v\u00E0o',
		FROMQTY : 's\u1ED1 l\u01B0\u1EE3ng v\u1ECB tr\u00ED h\u00E0ng h\u00F3a b\u1EAFt \u0111\u1EA7u',
		TOQTY : 's\u1ED1 l\u01B0\u1EE3ng v\u1ECB tr\u00ED h\u00E0ng h\u00F3a m\u1EE5c ti\u00EAu',
		SITEID : '\u0111\u1ECBa \u0111i\u1EC3m',
		LOCATION : 'v\u1ECB tr\u00ED',
		TRANSFERDETAILS: 'th\u00F4ng tin chuy\u1EC3n d\u1ECBch chi ti\u1EBFt'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 't\u00E0i s\u1EA3n',
		LOCATION : 'v\u1ECB tr\u00ED',
		SEQUENCE : 'th\u1EE9 t\u1EF1',
	},
	WORKLOG : {
		NAME : 'nh\u1EADt k\u00FD c\u00F4ng vi\u1EC7c',
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		DETAILS : 'th\u00F4ng tin chi ti\u1EBFt',
		LOGTYPE : 'lo\u1EA1i h\u00ECnh',
		CREATEBY : 'ng\u01B0\u1EDDi s\u00E1ng l\u1EADp',
		CREATEDATE : 'ng\u00E0y l\u1EADp'
	},
	SR : {
		ACTIVEREQS : 'y\u00EAu c\u1EA7u d\u1ECBch v\u1EE5 \u0111ang \u0111\u01B0\u1EE3c x\u1EED l\u00FD',
		NEWREQS : 'y\u00EAu c\u1EA7u d\u1ECBch v\u1EE5 m\u1EDBi',
		AFFECTEDPERSON : '\u0111\u1EC1 c\u1EADp \u0111\u1EBFn nh\u00E2n vi\u00EAn',
		DETAILS : 'th\u00F4ng tin chi ti\u1EBFt',
		GLACCOUNT : 't\u1ED5ng t\u00E0i kho\u1EA3n',
		LOCATION : 'v\u1ECB tr\u00ED',
		OWNER : 'ng\u01B0\u1EDDi ph\u1EE5 tr\u00E1ch',
		OWNERGROUP : 'nh\u00F3m ng\u01B0\u1EDDi ph\u1EE5 tr\u00E1ch',
		REPORTEDPRIORITY : 'tr\u1ECDng \u0111i\u1EC3m b\u00E1o c\u00E1o',
		REPORTEDBY : 'ng\u01B0\u1EDDi b\u00E1o c\u00E1o',
		REPORTDATE : 'ng\u00E0y b\u00E1o c\u00E1o',
		REPORTEDPHONE : 'b\u00E1o c\u00E1o b\u1EB1ng \u0111i\u1EC7n tho\u1EA1i',
		REPORTEDEMAIL : 'b\u00E1o c\u00E1o th\u01B0 \u0111i\u1EC7n t\u1EED',
		SITE : '\u0111\u1ECBa \u0111i\u1EC3m',
		STATUS : 'tr\u1EA1ng th\u00E1i',
		SR : 'y\u00EAu c\u1EA7u d\u1ECBch v\u1EE5',
		SUMMARY : 'tr\u00EDch l\u1EE5c',
		ASSETNUM : 't\u00E0i s\u1EA3n',
		ASSETSITEID : '\u0111\u1ECBa \u0111i\u1EC3m t\u00E0i s\u1EA3n',
	},
	INVBALANCES : {
		ITEMNUM : 's\u1ED1 h\u1EA1ng m\u1EE5c',
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		BINNUM : 's\u1ED1 v\u1ECB tr\u00ED h\u00E0ng',
		CURBAL : 's\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i',
		PHYSCNT : 's\u1ED1 d\u01B0 ki\u1EC3m k\u00EA th\u1EF1c t\u1EBF',
		PHYSCNTDATE : 'ng\u00E0y ki\u1EC3m k\u00EA th\u1EF1c t\u1EBF',
		RECONCILED : 's\u1ED1 d\u01B0 \u0111\u00E3 c\u00E2n',
		LOCATION : 'kho',
	},
	INVENTORY : {
		ITEMNUM : 's\u1ED1 h\u1EA1ng m\u1EE5c',
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		SITEID : '\u0111\u1ECBa \u0111i\u1EC3m',
		STATUS : 'tr\u1EA1ng th\u00E1i',
		LOCATION : 'kho',
		CATEGORY : 'ph\u00E2n lo\u1EA1i t\u1ED3n kho',
		BINNUM : 's\u1ED1 v\u1ECB tr\u00ED h\u00E0ng m\u1EB7c \u0111\u1ECBnh',
		ISSUEUNIT : '\u0111\u01A1n v\u1ECB ph\u00E1t h\u00E0nh',
		CURBAL : 's\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i',
		LASTISSUEDATE : 'ng\u00E0y ph\u00E1t h\u00E0nh v\u1EADt li\u1EC7u l\u1EA7n tr\u01B0\u1EDBc',
		ISSUEYTD : 't\u1EEB \u0111\u1EA7u n\u0103m \u0111\u1EBFn nay',
		ISSUE1YRAGO : 'n\u0103m ngo\u00E1i',
		PHYSCNT : 'ki\u1EC3m k\u00EA th\u1EF1c t\u1EBF',
		PHYSCNTDATE : 'ng\u00E0y ki\u1EC3m k\u00EA th\u1EF1c t\u1EBF',
		RECONCILED : 's\u1ED1 d\u01B0 \u0111\u00E3 c\u00E2n',
		TOTALINVPHYBAL : 's\u1ED1 d\u01B0 th\u1EF1c t\u1EBF',
		TOTALINVBAL : 's\u1ED1 d\u01B0 hi\u1EC7n t\u1EA1i',
		ISSUEHISTORY : 'l\u1ECBch s\u1EED ph\u00E1t h\u00E0nh v\u1EADt li\u1EC7u',
		INVBALANCE : 's\u1ED1 d\u01B0 t\u1ED3n kho',
		ADJCOUNT : '\u0111i\u1EC1u ch\u1EC9nh ki\u1EC3m k\u00EA th\u01B0c t\u1EBF cho nh\u1EEFng h\u1EA1ng m\u1EE5c {{ki\u1EC3m k\u00EA}} n\u00E0y',
		BALSUMMARY : 'tr\u00EDch l\u1EE5c s\u1ED1 d\u01B0 kh\u1EA3 d\u1EE5ng',
	},
	METER : {
		ASSETNUM : 's\u1ED1 t\u00E0i s\u1EA3n',
		METERNAME : '\u0111\u1ED3ng h\u1ED3 \u0111o',
		METERTYPE : 'lo\u1EA1i \u0111\u1ED3ng h\u1ED3 \u0111o',
		READINGTYPE : 'lo\u1EA1i \u0111\u1ECDc s\u1ED1',
		LASTREADING : '\u0111\u1ECDc s\u1ED1 l\u1EA7n tr\u01B0\u1EDBc',
		LASTREADINGDATE : 'ng\u00E0y \u0111\u1ECDc s\u1ED1 l\u1EA7n tr\u01B0\u1EDBc',
		LASTREADINGINSPECTOR : 'nh\u00E2n vi\u00EAn ki\u1EC3m tra \u0111\u1ECDc s\u1ED1 l\u1EA7n tr\u01B0\u1EDBc',
		READING : 's\u1ED1 \u0111\u1ECDc m\u1EDBi',
		NEWREADINGDATE : 'ng\u00E0y \u0111\u1ECDc s\u1ED1 m\u1EDBi'
	},
	WPLABOR : {
		NAME : 'k\u1EBF ho\u1EA1ch nh\u00E2n l\u1EF1c',
		LABORCODE : 'm\u00E3 nh\u00E2n l\u1EF1c',
		CRAFT : 'c\u00F4ng ngh\u1EC7',
		QUANTITY : 's\u1ED1 l\u01B0\u1EE3ng',
		LABORHRS : 's\u1ED1 gi\u1EDD l\u00E0m vi\u1EC7c b\u00ECnh th\u01B0\u1EDDng',
		DISPLAYNAME : 't\u00EAn g\u1ECDi',
		SKILLLEVEL: 'tr\u00ECnh \u0111\u1ED9 k\u1EF9 n\u0103ng',
		VENDOR : 'nh\u00E0 cung \u1EE9ng',
		AMCREW : 'to\u00E0n th\u1EC3 nh\u00E2n vi\u00EAn'
	},		
	WPMATERIAL : {
		NAME : 'k\u1EBF ho\u1EA1ch v\u1EADt li\u1EC7u',
		LINETYPE : 'lo\u1EA1i \u0111\u01B0\u1EDDng',
		ITEMNUM : 's\u1ED1 h\u1EA1ng m\u1EE5c',
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		ITEMQTY : 's\u1ED1 l\u01B0\u1EE3ng',
		UNITCOST : 'gi\u00E1 v\u1ED1n \u0111\u01A1n v\u1ECB',
		STOREROOM : 'tham kh\u1EA3o',
		STORELOCSITE : '\u0111\u1ECBa \u0111i\u1EC3m kho',
		RESTYPE : 'lo\u1EA1i h\u00ECnh \u0111\u1EB7t tr\u01B0\u1EDBc',
		REQUIREDATE : 'ng\u00E0y c\u1EA7n d\u00F9ng'
	},
	LABTRANS : {
		LABORCODE : 'nh\u00E2n l\u1EF1c',
		CRAFT : 'c\u00F4ng ngh\u1EC7',
		STARTDATE : 'ng\u00E0y b\u1EAFt \u0111\u1EA7u',
		TIMERSTATUS : 'tr\u1EA1ng th\u00E1i b\u1ED9 \u0111\u1EBFm gi\u1EDD',
		REGULARHRS : 's\u1ED1 gi\u1EDD l\u00E0m vi\u1EC7c b\u00ECnh th\u01B0\u1EDDng',
		PAYRATE: 't\u1EF7 l\u1EC7 thanh to\u00E1n',
		PREMIUMPAYCODE : 'm\u00E3 ph\u1EE5 c\u1EA5p t\u0103ng ca',
		PREMIUMPAYHOURS : 's\u1ED1 gi\u1EDD ph\u1EE5 c\u1EA5p t\u0103ng ca',
		PREMIUMPAYRATE: 't\u1EF7 l\u1EC7 ph\u1EE5 c\u1EA5p t\u0103ng ca',
		WONUM : '\u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c',
		LOCATION : 'v\u1ECB tr\u00ED',
		ASSETNUM : 't\u00E0i s\u1EA3n',
		TICKETID: 'v\u00E9'
	},
	LABREP : {
		LABORCODE : 'nh\u00E2n l\u1EF1c',
		CRAFT : 'c\u00F4ng ngh\u1EC7',
		SKILLLEVEL : 'tr\u00ECnh \u0111\u1ED9 k\u1EF9 n\u0103ng',
		STARTDATE : 'ng\u00E0y b\u1EAFt \u0111\u1EA7u',
		STARTTIME : 'th\u1EDDi gian b\u1EAFt \u0111\u1EA7u',
		FINISHDATE : 'ng\u00E0y k\u1EBFt th\u00FAc',
		FINISHTIME : 'th\u1EDDi gian k\u1EBFt th\u00FAc',
		REGULARHRS : 's\u1ED1 gi\u1EDD l\u00E0m vi\u1EC7c b\u00ECnh th\u01B0\u1EDDng',
		PAYRATE : 't\u1EF7 l\u1EC7 thanh to\u00E1n',
		TRANSTYPE : 'lo\u1EA1i h\u00ECnh',
		WONUM : '\u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c',
		LOCATION : 'v\u1ECB tr\u00ED',
		ASSETNUM : 't\u00E0i s\u1EA3n',
		GENAPPRSERVRECEIPT: '\u0111\u00E3 ph\u00EA chu\u1EA9n',
		NAME: 't\u00EAn g\u1ECDi',
		TIMERSTATUS : 'tr\u1EA1ng th\u00E1i b\u1ED9 \u0111\u1EBFm gi\u1EDD',
		PREMIUMPAYHOURS : 'th\u00EAm th\u1EDDi gian ph\u1EE5 c\u1EA5p t\u0103ng ca',
		PREMIUMPAYRATE: 't\u1EF7 l\u1EC7 ph\u1EE5 c\u1EA5p t\u0103ng ca',
		PREMIUMPAYCODE : 'm\u00E3 ph\u1EE5 c\u1EA5p t\u0103ng ca',
		TICKETID: 'v\u00E9',
		TICKETCLASS: 'lo\u1EA1i v\u00E9'
	},
	PERSON : {
		PERSONID: 'nh\u00E2n vi\u00EAn',
		FIRSTNAME: 't\u00EAn',
		LASTNAME: 'h\u1ECD'
	},
	FAILURECODE : {
		FAILURECODE : 'm\u00E3 lo\u1EA1i s\u1EF1 c\u1ED1',
		PROBLEMCODE : 'm\u00E3 v\u1EA5n \u0111\u1EC1',
		CAUSECODE : 'm\u00E3 nguy\u00EAn nh\u00E2n',
		REMEDYCODE : 'm\u00E3 kh\u1EAFc ph\u1EE5c',
	},
	SPAREPART : {
		QUANTITY : 's\u1ED1 l\u01B0\u1EE3ng',
		ISSUEDQTY : 's\u1ED1 l\u01B0\u1EE3ng ph\u00E1t h\u00E0nh',
		REMARKS : 'ghi ch\u00FA',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		LONGDESCRIPTION : 'th\u00F4ng tin chi ti\u1EBFt',
		ASSET : 't\u00E0i s\u1EA3n',
		STATUS : 'tr\u1EA1ng th\u00E1i',
		PARENT : '\u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c cha',
		SITE : '\u0111\u1ECBa \u0111i\u1EC3m',
		LOCATION : 'v\u1ECB tr\u00ED',
	},
	DOMAIN : {
		VALUE: 'gi\u00E1 tr\u1ECB',
		DESCRIPTION: 'm\u00F4 t\u1EA3',
	},
	MR : {
		MRNUM : 's\u1ED1 \u0111\u01A1n xin mua h\u00E0ng',
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		LONGDESCRIPTION : 'm\u00F4 t\u1EA3 d\u00E0i',
		STATUS : 'tr\u1EA1ng th\u00E1i',
		PRIORITY : '\u01B0u ti\u00EAn',
		CHARGEINFO : 'th\u00F4ng tin ghi s\u1ED5',
		REQUIREDDATE : 'ng\u00E0y c\u1EA7n d\u00F9ng',
		WONUM : '\u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c',
		LOCATION : 'v\u1ECB tr\u00ED',
		ASSET : 't\u00E0i s\u1EA3n',
		GLACCOUNT : 't\u1ED5ng t\u00E0i kho\u1EA3n',
		MRLINES : 'h\u1EA1ng m\u1EE5c h\u00E0ng \u0111\u01A1n xin mua h\u00E0ng',
		ENTERDATE : 'nh\u1EADp ng\u00E0y th\u00E1ng'
	},
	MRLINE : {
		MRLINEITEM : 'h\u1EA1ng m\u1EE5c \u0111\u01A1n xin mua h\u00E0ng',
		MRLINENUM : 'h\u00E0ng',
		LINETYPE : 'lo\u1EA1i h\u00E0ng',
		ITEM : 'h\u1EA1ng m\u1EE5c',
		DESCRIPTION : 'm\u00F4 t\u1EA3',
		QTY : 's\u1ED1 l\u01B0\u1EE3ng',
		ORDERUNIT : '\u0111\u01A1n v\u1ECB \u0111\u1EB7t mua',
		UNITCOST : 'gi\u00E1 v\u1ED1n \u0111\u01A1n v\u1ECB',
		LINECOST : 'h\u00E0ng gi\u00E1 v\u1ED1n',
		REQUIREDDATE : 'ng\u00E0y c\u1EA7n d\u00F9ng'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'xem \u0111\u01A1n xin mua h\u00E0ng \u0111\u00E3 khai b\u00E1o',
		VIEWSAVED : 'xem \u0111\u01A1n xin mua h\u00E0ng \u0111\u00E3 l\u01B0u',
		EDIT : 'l\u00E0m \u0111\u01A1n xin mua h\u00E0ng'
	},
	CREATEDR: {
		SAVEASDRAFT : 'l\u01B0u l\u00E0m b\u1EA3n nh\u00E1p',
		NEWREQITEM : 'h\u1EA1ng m\u1EE5c \u0111\u01A1n xin mua h\u00E0ng m\u1EDBi',
		SUBMIT : 'khai b\u00E1o'
	},
	CLASSIFY : {
		CLASSASSET : 'ph\u00E2n lo\u1EA1i t\u00E0i s\u1EA3n',
		CLASSWO : 'ph\u00E2n lo\u1EA1i \u0111\u01A1n h\u00E0ng c\u00F4ng vi\u1EC7c',
		DESCRIPTION : 'm\u00F4 t\u1EA3 ph\u00E2n lo\u1EA1i',
		CLASSIFICATION : 'ph\u00E2n lo\u1EA1i'
	}
};