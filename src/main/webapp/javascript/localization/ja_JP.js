'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: ja_JP
 */
var locale = 'ja_JP'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: '\u8a2d\u5b9a',
        cancelText: '\u30ad\u30e3\u30f3\u30bb\u30eb',
        clearText: '\u6d88\u53bb',
        selectedText: '\u9078\u629e\u6e08\u307f',
        // Calender component
        calendarText: '\u30ab\u30ec\u30f3\u30c0\u30fc',
        dateText: '\u65e5\u4ed8',
        timeText: '\u6642\u523b',
        // Datetime component
        dateFormat: 'y/mm/dd',
        dateOrder: 'ymmdd',
        dayNames: ['\u65e5\u66dc\u65e5', '\u6708\u66dc\u65e5', '\u706b\u66dc\u65e5', '\u6c34\u66dc\u65e5', '\u6728\u66dc\u65e5', '\u91d1\u66dc\u65e5', '\u571f\u66dc\u65e5'],
        dayNamesShort: ['\u65e5', '\u6708', '\u706b', '\u6c34', '\u6728', '\u91d1', '\u571f'],
        dayText: '\u66dc\u65e5',
        hourText: '\u6642',
        minuteText: '\u5206',
        monthNames: ['1\u6708', '2\u6708', '3\u6708', '4\u6708', '5\u6708', '6\u6708', '7\u6708', '8\u6708', '9\u6708', '10\u6708', '11\u6708', '12\u6708'],
        monthNamesShort: ['1\u6708', '2\u6708', '3\u6708', '4\u6708', '5\u6708', '6\u6708', '7\u6708', '8\u6708', '9\u6708', '10\u6708', '11\u6708', '12\u6708'],
        monthText: '\u6708',
        secText: '\u79d2',
        amText: '\u5348\u524d',
        pmText: '\u5348\u5f8c',
        timeFormat: 'H:ii',
        timeWheels: 'Hii',
        yearText: '\u5e74',
        nowText: '\u73fe\u5728',
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
	        symbol: '\u00a5'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "\u30bc\u30ed",
		ONE : "\u4e00",
		TWO : "\u4e8c",
		FEW : "\u5c11",
		MANY : "\u591a",
		OTHER : "\u305d\u306e\u4ed6"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "\u5348\u524d", "\u5348\u5f8c" ],
			"DAY" : [  "\u65e5\u66dc\u65e5", "\u6708\u66dc\u65e5", "\u706b\u66dc\u65e5", "\u6c34\u66dc\u65e5", "\u6728\u66dc\u65e5", "\u91d1\u66dc\u65e5", "\u571f\u66dc\u65e5" ],
			"MONTH" : [ "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708" ],
			"SHORTDAY" : [ "\u65e5", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f" ],
			"SHORTMONTH" : [  "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708","10\u6708", "11\u6708", "12\u6708" ],
			"fullDate" : "y\u5e74M\u6708d\u65e5EEEE",
		    "longDate" : "y\u5e74M\u6708d\u65e5",
		    "medium" : "y/MM/dd H:mm:ss",
		    "mediumDate" : "y/MM/dd",
		    "mediumTime" : "H:mm:ss",
		    "short" : "yy/MM/dd H:mm",
		    "shortDate" : "yy/MM/dd",
		    "shortTime" : "H:mm"		
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "\u00a5",
		    "DECIMAL_SEP": ".",
		    "GROUP_SEP": ",",
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
		        "negPre": "-\u00a4",
		        "negSuf": "",
		        "posPre": "\u00a4",
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
 * Language: JA
 */
var lang = 'JA'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : '\u540c\u671f\u304c\u30a8\u30e9\u30fc\u4ed8\u304d\u3067\u5b8c\u4e86\u3057\u307e\u3057\u305f!  \u305f\u3060\u3057\u3001\u30aa\u30d5\u30e9\u30a4\u30f3\u3067\u4f5c\u696d\u3057\u3066\u307f\u308b\u3053\u3068\u306f\u3067\u304d\u307e\u3059\u3002',
	EMMOF1001W : '\u540c\u671f\u304c\u30a8\u30e9\u30fc\u4ed8\u304d\u3067\u5b8c\u4e86\u3057\u307e\u3057\u305f!  \u30aa\u30d5\u30e9\u30a4\u30f3\u30e2\u30fc\u30c9\u3092\u6709\u52b9\u306b\u3059\u308b\u305f\u3081\u306b\u518d\u5ea6\u540c\u671f\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
	EMMOF1002W : '\u540c\u671f\u304c\u30a8\u30e9\u30fc\u4ed8\u304d\u3067\u5b8c\u4e86\u3057\u307e\u3057\u305f!  \u518d\u5ea6\u540c\u671f\u3057\u3066\u307f\u308b\u304b\u3001\u3053\u306e\u307e\u307e\u30aa\u30d5\u30e9\u30a4\u30f3\u3067\u4f5c\u696d\u3067\u304d\u307e\u3059\u3002',
	EMMOF1003W : '\u540c\u671f\u304c\u30a8\u30e9\u30fc\u4ed8\u304d\u3067\u5b8c\u4e86\u3057\u307e\u3057\u305f!  \u30aa\u30d5\u30e9\u30a4\u30f3\u3067\u4f5c\u696d\u3059\u308b\u305f\u3081\u306b\u518d\u5ea6\u540c\u671f\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002',
	EMMOF1004W : '{0}\u306f\u6570\u5b57\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059',
	EMMOF1005W : '\u5fc5\u9808\u30d5\u30a3\u30fc\u30eb\u30c9\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093: {0}',
	EMMOF1006W : '\u5c5e\u6027{0}\u306f\u8aad\u307f\u53d6\u308a\u5c02\u7528\u3067\u3059',
	EMMOF1007W : '\u5024\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044',
	EMMOF1008I : '\u30b9\u30c6\u30fc\u30bf\u30b9\u304c\u6b63\u5e38\u306b\u5909\u66f4\u3055\u308c\u307e\u3057\u305f',
	EMMOF1009W : '\u30bc\u30ed\u3088\u308a\u5927\u304d\u3044\u6570\u91cf\u3092\u6307\u5b9a\u3057\u3066\u304f\u3060\u3055\u3044',
	EMMOF1010W : '{0}\u306f\u30bc\u30ed\u3088\u308a\u5927\u304d\u304f\u306a\u3051\u308c\u3070\u306a\u308a\u307e\u305b\u3093',
	EMMOF1011W : '{0}\u306f\u5fc5\u9808\u3067\u3059',
	EMMOF1012W : '\u3053\u306e\u54c1\u76ee\u3001\u4fdd\u7ba1\u5834\u6240\u3001\u304a\u3088\u3073\u30d3\u30f3\u306e\u7d44\u307f\u5408\u308f\u305b\u306e\u6b8b\u9ad8\u306f\u5b58\u5728\u3057\u307e\u305b\u3093',
	EMMOF1013W : '\u3053\u306e\u30d3\u30f3\u306e\u6b8b\u9ad8\u306f\u3053\u306e\u30c8\u30e9\u30f3\u30b6\u30af\u30b7\u30e7\u30f3\u306e\u7d50\u679c\u3068\u3057\u3066\u8ca0\u306b\u306a\u308a\u307e\u3059',
	EMMOF1014W : '\u5834\u6240\u3001\u30d3\u30f3\u756a\u53f7\u3001\u304a\u3088\u3073\u30b5\u30a4\u30c8ID\u304c\u3059\u3079\u3066\u540c\u3058\u3068\u304d\u306f\u642c\u9001\u3067\u304d\u307e\u305b\u3093',
	// [WF]		
	EMMWF1000I : '\u30ef\u30fc\u30af\u30d5\u30ed\u30fc\u3092\u958b\u59cb',
	EMMWF1001I : '\u3053\u306e\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u306b\u4f7f\u7528\u3067\u304d\u308b\u30ef\u30fc\u30af\u30d5\u30ed\u30fc\u30d7\u30ed\u30bb\u30b9\u304c\u8907\u6570\u3042\u308a\u307e\u3059\u3002\u3044\u305a\u308c\u304b\u3092\u9078\u629e\u3057\u3066\u300cOK\u300d\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
	EMMWF1002I : '\u30d7\u30ed\u30bb\u30b9\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044',
	EMMWF1003I : '\u30d7\u30ed\u30bb\u30b9',
	EMMWF1004I : '\u30e1\u30e2',
	EMMWF1005I : '\u30ef\u30fc\u30af\u30d5\u30ed\u30fc\u3092\u505c\u6b62',
	// [ES]
	EMMES1000I : '\u96fb\u5b50\u7f72\u540d\u627f\u8a8d',
	EMMES1001I : '\u96fb\u5b50\u7f72\u540d\u304c\u5fc5\u8981\u3067\u3059',
	EMMES1002E : '\u627f\u8a8d\u304c\u5931\u6557\u3057\u307e\u3057\u305f',
	EMMES1003I : '\u30d1\u30b9\u30ef\u30fc\u30c9\u3068\u7406\u7531\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044',
	EMMES1004I : '\u30e6\u30fc\u30b6',
	EMMES1005I : '\u30d1\u30b9\u30ef\u30fc\u30c9',
	EMMES1006I : '\u7406\u7531',
	// [GB]
	EMMGB1001I : '\u30e1\u30fc\u30eb',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : '\u30ad\u30e3\u30f3\u30bb\u30eb',
	EMMGB1004I : 'OK',
	EMMGB1005I : '\u78ba\u8a8d',
	EMMGB1006I : '\u306f\u3044',
	EMMGB1007I : '\u3044\u3044\u3048',
	EMMGB1008I : '\u96fb\u8a71',
	EMMGB1009I : '\u96fb\u8a71',
	EMMGB1010I : 'SMS',
	EMMGB1011I : '\u524a\u9664\u3057\u3066\u3082\u3088\u308d\u3057\u3044\u3067\u3059\u304b?',
	EMMGB1012I : '{0}\u306f{1}\u306e\u524d\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059',
	EMMGB1013I : '{0}\u306f{1}\u306e\u5f8c\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059',
	EMMGB1014I : '{0}\u306f\u904e\u53bb\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059',
	// General	
	OFFLINEMODE : '\u30aa\u30d5\u30e9\u30a4\u30f3\u30e2\u30fc\u30c9',
	SYNCNEEDED : '- \u5909\u66f4\u3055\u308c\u307e\u3057\u305f\u3002\u540c\u671f\u304c\u5fc5\u8981\u3067\u3059',
	SYNCHRONIZATION : '\u540c\u671f',
	SYNCSERVER : '\u30b5\u30fc\u30d0\u30fc\u3068\u540c\u671f',
	ENTERLABOR: '\u52b4\u50cd\u5225\u306b\u5165\u529b',
	ADDMORE: '\u3055\u3089\u306b\u8ffd\u52a0...',
	GOONLINE : '\u30aa\u30f3\u30e9\u30a4\u30f3\u306b\u623b\u308b',
	GOTOOFFLINEAPPS : '\u30aa\u30d5\u30e9\u30a4\u30f3\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u306b\u79fb\u52d5',
	OFFLINEAPPS : '\u30aa\u30d5\u30e9\u30a4\u30f3\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3',
	QUICKSCAN : '\u30af\u30a4\u30c3\u30af\u30b9\u30ad\u30e3\u30f3:',
	ACTIVEWORKORDERS : '\u30a2\u30af\u30c6\u30a3\u30d6\u306a\u4f5c\u696d\u6307\u793a\u66f8',
	RECORDSAVED: '\u30ec\u30b3\u30fc\u30c9\u304c\u4fdd\u5b58\u3055\u308c\u307e\u3057\u305f',
	RECORDNOTSAVED: '\u30a8\u30e9\u30fc - \u30ec\u30b3\u30fc\u30c9\u304c\u8fd4\u3055\u308c\u307e\u305b\u3093\u3067\u3057\u305f',
	TIMERALREADYSTARTED: '\u30bf\u30a4\u30de\u30fc\u306f\u3059\u3067\u306b\u958b\u59cb\u3057\u307e\u3057\u305f',
	TIMERNOTFOUND : '\u30bf\u30a4\u30de\u30fc\u306f\u958b\u59cb\u3057\u3066\u3044\u307e\u305b\u3093\u3002\u30a2\u30af\u30c6\u30a3\u30d6\u30bf\u30a4\u30de\u30fc\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002',
	TIMERSTARTED : '\u30bf\u30a4\u30de\u30fc\u306f\u958b\u59cb\u3057\u307e\u3057\u305f',
	TIMERSTOPPED : '\u30bf\u30a4\u30de\u30fc\u306f\u505c\u6b62\u3057\u307e\u3057\u305f',
	TOOLS : '\u30c4\u30fc\u30eb',
	STARTTIMER : '\u30bf\u30a4\u30de\u30fc\u3092\u958b\u59cb',
	STOPTIMER : '\u30bf\u30a4\u30de\u30fc\u3092\u505c\u6b62',
	MODIFYSAVE : '\u30ec\u30b3\u30fc\u30c9\u304c\u5909\u66f4\u3055\u308c\u307e\u3057\u305f\u3002\u5909\u66f4\u3092\u4fdd\u5b58\u3057\u3066\u304f\u3060\u3055\u3044\u3002',
	SITEREQUIRED : '\u4f5c\u696d\u6307\u793a\u66f8\u3092\u4f5c\u6210\u3059\u308b\u306b\u306f\u30b5\u30a4\u30c8\u304c\u5fc5\u8981\u3067\u3059\u3002',
	NOVALUE : '\u7a7a\u306e\u5024',
	ACTIONS : '\u30a2\u30af\u30b7\u30e7\u30f3',
	CHILDRENOF : '\u5b50\u306e\u5bfe\u8c61:',
	RESPONSIBILITY : '\u8cac\u4efb',
	LOOKUP : '\u30eb\u30c3\u30af\u30a2\u30c3\u30d7',
	LOCATIONDRILLDOWN : '\u5834\u6240\u30c9\u30ea\u30eb\u30c0\u30a6\u30f3',
	ASSETDRILLDOWN : '\u8cc7\u7523\u30c9\u30ea\u30eb\u30c0\u30a6\u30f3',
	DRILLDOWN : '\u30c9\u30ea\u30eb\u30c0\u30a6\u30f3',
	BACK : '\u623b\u308b',
	SAVE : '\u4fdd\u5b58',
	APPLY : '\u9069\u7528',
	FILTER : '\u30d5\u30a3\u30eb\u30bf',
	RESET : '\u30ea\u30bb\u30c3\u30c8',
	SELECTVALUE : '\u5024\u3092\u9078\u629e',
	CANCEL : '\u30ad\u30e3\u30f3\u30bb\u30eb',
	OK : 'OK',
	YES : '\u306f\u3044',
	NO : '\u3044\u3044\u3048',
	CREATEFOLLOWUP : '\u30d5\u30a9\u30ed\u30fc\u30a2\u30c3\u30d7\u3092\u4f5c\u6210',
	CREATESR : '\u65b0\u898f\u30b5\u30fc\u30d3\u30b9\u8981\u6c42\u3092\u4f5c\u6210',
	PARENT : '\u89aa',
	CHANGESTATUS : '\u5909\u66f4\u30b9\u30c6\u30fc\u30bf\u30b9',
	LABOR : '\u52b4\u50cd',
	MATERIALS : '\u8cc7\u6750',
	TASKS : '\u30bf\u30b9\u30af',
	ATTACHMENTS : '\u6dfb\u4ed8\u30d5\u30a1\u30a4\u30eb',
	FAILUREREPORTING : '\u969c\u5bb3\u30ec\u30dd\u30fc\u30c8',
	MULTIASSETS : '\u8907\u6570\u306e\u8cc7\u7523\u3001\u5834\u6240',
	ADDNEW : '\u65b0\u898f\u3092\u8ffd\u52a0',
	CLASSIFICATION : '\u5206\u985e',
	NORECORDS : '\u30ec\u30b3\u30fc\u30c9\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093',
	NORECORDEXIST : '\u30ec\u30b3\u30fc\u30c9\u304c\u898b\u3064\u304b\u3089\u306a\u3044\u304b\u3001\u3059\u3067\u306b\u5b58\u5728\u3057\u307e\u305b\u3093',
	NORECORDSADJ : '\u7269\u7406\u30ab\u30a6\u30f3\u30c8\u3092\u8abf\u6574\u3059\u308b\u305f\u3081\u306e\u30ec\u30b3\u30fc\u30c9\u304c\u3042\u308a\u307e\u305b\u3093',
	SELECTOWNER : '\u6240\u6709\u8005\u3092\u9078\u629e',
	OWNER : '\u6240\u6709\u8005',
	OWNERGROUP : '\u6240\u6709\u8005\u30b0\u30eb\u30fc\u30d7',
	TAKEOWNERSHIP : '\u6240\u6709\u6a29\u3092\u53d6\u5f97',
	SORTBY : '\u30bd\u30fc\u30c8\u9806\u5e8f',
	LIST : '\u30ea\u30b9\u30c8',
	QUICKSEARCH: '\u30af\u30a4\u30c3\u30af\u691c\u7d22',
	INVENTORYBYSR : '\u4fdd\u7ba1\u5834\u6240\u5225\u306e\u30a4\u30f3\u30d9\u30f3\u30c8\u30ea',
	INVDETAILS : '\u30a4\u30f3\u30d9\u30f3\u30c8\u30ea\u8a73\u7d30',
	NEWCOUNT : '\u65b0\u898f\u30ab\u30a6\u30f3\u30c8',
	LABORTRANS : '\u52b4\u50cd\u8a73\u7d30',
	CREATEWO : '\u65b0\u898f\u52b4\u50cd\u9806\u3092\u4f5c\u6210',
	MYWOS : '\u81ea\u5206\u306e\u52b4\u50cd\u9806',
	FAILUREREPORT : '\u969c\u5bb3\u30ec\u30dd\u30fc\u30c8',
	METERREADINGS : '\u30e1\u30fc\u30bf\u793a\u5ea6\u3092\u5165\u529b',
	ASSETMETER : '\u8cc7\u7523\u30e1\u30fc\u30bf\u793a\u5ea6',
	LOCATIONMETER : '\u5834\u6240\u30e1\u30fc\u30bf\u793a\u5ea6',
	FROM : '\u958b\u59cb',
	TO : '\u7d42\u4e86',
	ADVANCED : '\u8a73\u7d30',
	ADVANCEDSEARCH : '\u8a73\u7d30\u691c\u7d22',
	DOWNTIME : '\u30c0\u30a6\u30f3\u30bf\u30a4\u30e0',
	PURCHASEINFO : '\u8cfc\u5165\u60c5\u5831',
	SPAREPARTS : '\u30b9\u30da\u30a2\u30d1\u30fc\u30c4',
	SCHEDULEINFO : '\u30b9\u30b1\u30b8\u30e5\u30fc\u30eb\u60c5\u5831',
	PLANLABOR : '\u52b4\u50cd\u3092\u8a08\u753b',
	PLANMATERIAL : '\u8a08\u753b\u6e08\u307f\u8cc7\u6750',
	WOCREATED : '\u4f5c\u696d\u6307\u793a\u66f8{0}\u304c\u4f5c\u6210\u3055\u308c\u307e\u3057\u305f\u3002',
	PRESTART : '\u30d7\u30ec\u30b9\u30bf\u30fc\u30c8',
	REVIEWANDAPPROVE : '\u30ec\u30d3\u30e5\u30fc\u3068\u627f\u8a8d',
	MOCACTIONGROUP : 'MOC\u30a2\u30af\u30b7\u30e7\u30f3\u30b0\u30eb\u30fc\u30d7\u3092\u9078\u629e',
	MOCACTIONS : 'MOC\u30a2\u30af\u30b7\u30e7\u30f3\u3092\u9078\u629e',
	REVIEWERSAVED : '\u30ec\u30d3\u30e5\u30fc\u30a2\u304c\u30aa\u30d5\u30e9\u30a4\u30f3\u3067\u4fdd\u5b58\u3057\u307e\u3057\u305f\u3002',
	APPROVERSAVED : '\u627f\u8a8d\u8005\u304c\u30aa\u30d5\u30e9\u30a4\u30f3\u3067\u4fdd\u5b58\u3057\u307e\u3057\u305f\u3002',
	ACTIONSAVED : '\u30a2\u30af\u30b7\u30e7\u30f3\u304c\u30aa\u30d5\u30e9\u30a4\u30f3\u3067\u4fdd\u5b58\u3057\u307e\u3057\u305f\u3002',
	NOACTIONS : '\u6a19\u6e96\u30a2\u30af\u30b7\u30e7\u30f3\u30b0\u30eb\u30fc\u30d7{0}\u306b\u3001\u8ffd\u52a0\u3059\u308b\u305f\u3081\u306e\u6709\u52b9\u306a\u6a19\u6e96\u30a2\u30af\u30b7\u30e7\u30f3\u304c\u3042\u308a\u307e\u305b\u3093\u3002',
	SRQUEUED : 'SR {0}\u30b9\u30c6\u30fc\u30bf\u30b9\u304cQUEUED\u306b\u5909\u66f4\u3055\u308c\u307e\u3057\u305f\u3002',
	SELECTREVIEWERS : '\u30ec\u30d3\u30e5\u30fc\u30a2\u3092\u9078\u629e',
	SELECTAPPROVERS : '\u627f\u8a8d\u8005\u3092\u9078\u629e',
	APPROVERS : '\u30ec\u30d3\u30e5\u30fc\u30a2',
	REVIEWERS : '\u627f\u8a8d\u8005',
	VIEWLIST: '\u30ea\u30b9\u30c8\u3092\u8868\u793a',
	VIEWSUMMARY : '\u30b5\u30de\u30ea\u30fc\u3092\u8868\u793a',
	STOREROOMS : '\u4fdd\u7ba1\u5834\u6240',
	REPDOWNTIME: 'Report Downtime',
	GOTO : '\u79fb\u52d5\u5148',
	APPS : '\u30a2\u30d7\u30ea',
	STARTCENTER : '\u30b9\u30bf\u30fc\u30c8\u30bb\u30f3\u30bf\u30fc',
	PAGINATION : {
		TITLE : '\u30da\u30fc\u30b8 {{from}}/{{to}} - {{total}} \u30ec\u30b3\u30fc\u30c9\u304c',
		PREV : '\u524d\u3078',
		NEXT : '\u6b21\u3078'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : '\u5834\u6240',
		ASSET : '\u8cc7\u7523',
		WOTRACK : '\u4f5c\u696d\u6307\u793a\u66f8\u8ffd\u8de1',
		SR : '\u30b5\u30fc\u30d3\u30b9\u8981\u6c42',
		INVENTOR: '\u30a4\u30f3\u30d9\u30f3\u30c8\u30ea',
		INVISSUE: '\u51fa\u5eab\u3068\u642c\u9001',
		MOC : 'MOC (\u30aa\u30a4\u30eb)',
		CREATEDR : '\u8981\u6c42\u3092\u4f5c\u6210',
		VIEWDR : '\u8981\u6c42\u3092\u8868\u793a',
		LABREP: '\u52b4\u50cd\u30ec\u30dd\u30fc\u30c8',
		TXNTRACK : '\u89e3\u6c7a\u3092\u540c\u671f\n'
	},
	// Objects
	ASSET : {
		ASSETNUM : '\u8cc7\u7523\u756a\u53f7',
		STATUS : '\u30b9\u30c6\u30fc\u30bf\u30b9',
		STATUSDATE: '\u6700\u7d42\u5909\u66f4\u65e5',
		INSTALLDATE: '\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u65e5',
		SITEID : '\u30b5\u30a4\u30c8',
		PARENT : '\u89aa',
		ASSETTYPE: '\u30bf\u30a4\u30d7',
		LONGDESCRIPTION : '\u8a73\u7d30',
		GROUPNAME: '\u30e1\u30fc\u30bf\u30fc\u30b0\u30eb\u30fc\u30d7',
		SERIALNUM: '\u30b7\u30ea\u30a2\u30eb\u756a\u53f7',
		PURCHASEPRICE: '\u8cfc\u5165\u4fa1\u683c',
		TOTDOWNTIME: '\u5408\u8a08\u30c0\u30a6\u30f3\u30bf\u30a4\u30e0',
		ISRUNNING: '\u8cc7\u7523\u30a2\u30c3\u30d7',
		VENDOR: '\u30d9\u30f3\u30c0\u30fc',
		MANUFACTURER: '\u88fd\u9020\u5143',
		FAILURECODE: '\u969c\u5bb3\u30af\u30e9\u30b9',
		DESCRIPTION : '\u8aac\u660e',
		LOCATION : '\u5834\u6240',
		LOCDESC : '\u8a73\u7d30',
		SEQUENCE : '\u30b7\u30fc\u30b1\u30f3\u30b9',
		PROGRESS : '\u9032\u6357\u3092\u30de\u30fc\u30af\u3057\u307e\u3059\u304b?',
		COMMENTS : '\u30b3\u30e1\u30f3\u30c8',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : '\u4f5c\u696d\u6307\u793a\u66f8',
		DESCRIPTION : '\u8aac\u660e',
		LONGDESCRIPTION : '\u8a73\u7d30',
		STATUS : '\u30b9\u30c6\u30fc\u30bf\u30b9',
		PARENT : '\u89aa\u4f5c\u696d\u6307\u793a\u66f8',
		SITEID : '\u30b5\u30a4\u30c8',
		LOCATION : '\u5834\u6240',
		ASSETNUM : '\u8cc7\u7523',
		WORKTYPE : '\u4f5c\u696d\u30bf\u30a4\u30d7',
		WOPRIORITY : '\u512a\u5148\u5ea6',
		GLACCOUNT : '\u7dcf\u52d8\u5b9a\u5143\u5e33\u52d8\u5b9a',
		FAILURECODE : '\u969c\u5bb3\u30af\u30e9\u30b9',
		PROBLEMCODE : '\u554f\u984c\u30b3\u30fc\u30c9',
		SUPERVISOR : '\u30b9\u30fc\u30d1\u30fc\u30d0\u30a4\u30b6',
		CREWID : '\u30af\u30eb\u30fc',
		LEAD : '\u30ea\u30fc\u30c9',
		PERSONGROUP : '\u4f5c\u696d\u30b0\u30eb\u30fc\u30d7',
		REPORTEDBY : '\u30ec\u30dd\u30fc\u30c8\u8005',
		REPORTDATE : '\u30ec\u30dd\u30fc\u30c8\u65e5',
		PHONE : '\u96fb\u8a71',
		TASKID : '\u30bf\u30b9\u30af',
		TARGSTARTDATE : '\u30bf\u30fc\u30b2\u30c3\u30c8\u958b\u59cb',
		TARGCOMPDATE : '\u30bf\u30fc\u30b2\u30c3\u30c8\u7d42\u4e86',
		SCHEDSTART : '\u30b9\u30b1\u30b8\u30e5\u30fc\u30eb\u6e08\u307f\u958b\u59cb',
		SCHEDFINISH : '\u30b9\u30b1\u30b8\u30e5\u30fc\u30eb\u6e08\u307f\u7d42\u4e86',
		ACTSTART : '\u81ea\u52d5\u958b\u59cb',
		ACTFINISH : '\u81ea\u52d5\u7d42\u4e86',
		ASSIGNMENT : '\u5272\u308a\u5f53\u3066\u6e08\u307f\u52b4\u50cd',
		OWNER : '\u6240\u6709\u8005',
		OWNERGROUP : '\u6240\u6709\u8005\u30b0\u30eb\u30fc\u30d7',
		OBSERVATION : '\u76e3\u8996',
		MEASUREMENTVALUE : '\u6e2c\u5b9a\u5024',
		HAZARDS: '\u5371\u967a',
		HAZARDSMAT: '\u5371\u967a\u6027\u7269\u8cea',
		PRECAUTIONS: '\u4e88\u9632\u624b\u6bb5',
		LOCKTAG: '\u30ed\u30c3\u30af\u30a2\u30a6\u30c8/\u30bf\u30b0\u30a2\u30a6\u30c8',
		TAGOUT: '\u30bf\u30b0\u30a2\u30a6\u30c8',
		LOCKOUT: '\u30ed\u30c3\u30af\u30a2\u30a6\u30c8',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : '\u8aac\u660e',
		ITEM : '\u54c1\u76ee',
		LINETYPE : '\u660e\u7d30\u30bf\u30a4\u30d7',
		QUANTITY : '\u6570\u91cf',
		STOREROOM : '\u4fdd\u7ba1\u5834\u6240',
		STORELOC : '\u4fdd\u7ba1\u5834\u6240',
		BINNUM : '\u30d3\u30f3',
		CURBAL : '\u73fe\u5728\u306e\u6b8b\u9ad8',
		UNITCOST : '\u5358\u4fa1',
		ASSET : '\u8cc7\u7523',
		WORKORDER : '\u4f5c\u696d\u6307\u793a\u66f8',
		LOCATION : '\u5834\u6240',
		ISSUETYPE : '\u51fa\u5eab\u30bf\u30a4\u30d7',
		ISSUETO : '\u51fa\u5eab\u5148',
		ROTASSETNUM : '\u56de\u8ee2\u8cc7\u7523',
		SITEID : '\u30b5\u30a4\u30c8',
		ISSUERETURN : '\u51fa\u5eab\u3068\u8fd4\u5374',
		CHARGEINFO : '\u5909\u66f4\u60c5\u5831'
	},
	TOOLTRANS : {
		DESCRIPTION : '\u8aac\u660e',
		ITEM : '\u54c1\u76ee',
		LINETYPE : '\u660e\u7d30\u30bf\u30a4\u30d7',
		QUANTITY : '\u6570\u91cf',
		STOREROOM : '\u4fdd\u7ba1\u5834\u6240',
		BINNUM : '\u30d3\u30f3',
		CURBAL : '\u73fe\u5728\u306e\u6b8b\u9ad8',
		UNITCOST : '\u5358\u4fa1',
		ISSUETYPE : '\u51fa\u5eab\u30bf\u30a4\u30d7',
		LOCATION : '\u5834\u6240',
		TOOLRATE : '\u30c4\u30fc\u30eb\u30ec\u30fc\u30c8',
		ASSETNUM: '\u8cc7\u7523',
		TOOLHRS: '\u30c4\u30fc\u30eb\u6642\u9593',
		LINECOST: '\u660e\u7d30\u30b3\u30b9\u30c8',
		TOOLQTY: '\u5408\u8a08\u6570\u91cf'
	},
	MATRECTRANS : {
		DESCRIPTION : '\u8aac\u660e',
		ITEM : '\u54c1\u76ee',
		LINETYPE : '\u660e\u7d30\u30bf\u30a4\u30d7',
		QUANTITY : '\u6570\u91cf',
		TOSTORELOC : '\u5834\u6240(\u7d42\u4e86)',
		FROMSTORELOC : '\u5834\u6240(\u958b\u59cb)',
		FROMSITE : '\u30b5\u30a4\u30c8(\u958b\u59cb)',
		TOSITE : '\u30b5\u30a4\u30c8(\u7d42\u4e86)',
		TOBIN: '\u30d3\u30f3(\u7d42\u4e86)',
		FROMBIN: '\u30d3\u30f3(\u958b\u59cb)',
		UNITCOST : '\u5358\u4fa1',
		ISSUETYPE : '\u51fa\u5eab\u30bf\u30a4\u30d7',
		CONVERSIONFACTOR : '\u5909\u63db\u8981\u56e0',
		ROTASSETNUM : '\u56de\u8ee2\u8cc7\u7523',
		TRANSFEROUT : '\u642c\u51fa',
		TRANSFERIN : '\u642c\u5165',
		FROMQTY : '\u30d3\u30f3\u6570\u91cf(\u958b\u59cb)',
		TOQTY : '\u30d3\u30f3\u6570\u91cf(\u7d42\u4e86)',
		SITEID : '\u30b5\u30a4\u30c8',
		LOCATION : '\u5834\u6240',
		TRANSFERDETAILS: '\u642c\u9001\u8a73\u7d30'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : '\u8cc7\u7523',
		LOCATION : '\u5834\u6240',
		SEQUENCE : '\u30b7\u30fc\u30b1\u30f3\u30b9',
	},
	WORKLOG : {
		NAME : '\u4f5c\u696d\u30ed\u30b0',
		DESCRIPTION : '\u8aac\u660e',
		DETAILS : '\u8a73\u7d30',
		LOGTYPE : '\u30bf\u30a4\u30d7',
		CREATEBY : '\u4f5c\u6210\u8005',
		CREATEDATE : '\u4f5c\u6210\u65e5'
	},
	SR : {
		ACTIVEREQS : '\u30a2\u30af\u30c6\u30a3\u30d6\u306a\u30b5\u30fc\u30d3\u30b9\u8981\u6c42',
		NEWREQS : '\u65b0\u898f\u30b5\u30fc\u30d3\u30b9\u8981\u6c42',
		AFFECTEDPERSON : '\u5f71\u97ff\u3092\u53d7\u3051\u308b\u4eba',
		DETAILS : '\u8a73\u7d30',
		GLACCOUNT : '\u7dcf\u52d8\u5b9a\u5143\u5e33\u52d8\u5b9a',
		LOCATION : '\u5834\u6240',
		OWNER : '\u6240\u6709\u8005',
		OWNERGROUP : '\u6240\u6709\u8005\u30b0\u30eb\u30fc\u30d7',
		REPORTEDPRIORITY : '\u30ec\u30dd\u30fc\u30c8\u3055\u308c\u305f\u512a\u5148\u5ea6',
		REPORTEDBY : '\u30ec\u30dd\u30fc\u30c8\u8005',
		REPORTDATE : '\u30ec\u30dd\u30fc\u30c8\u65e5',
		REPORTEDPHONE : '\u30ec\u30dd\u30fc\u30c8\u3055\u308c\u305f\u96fb\u8a71',
		REPORTEDEMAIL : '\u30ec\u30dd\u30fc\u30c8\u3055\u308c\u305f\u30e1\u30fc\u30eb',
		SITE : '\u30b5\u30a4\u30c8',
		STATUS : '\u30b9\u30c6\u30fc\u30bf\u30b9',
		SR : '\u30b5\u30fc\u30d3\u30b9\u8981\u6c42',
		SUMMARY : '\u30b5\u30de\u30ea\u30fc',
		ASSETNUM : '\u8cc7\u7523',
		ASSETSITEID : '\u8cc7\u7523\u30b5\u30a4\u30c8',
	},
	INVBALANCES : {
		ITEMNUM : '\u54c1\u76ee',
		DESCRIPTION : '\u8aac\u660e',
		BINNUM : '\u30d3\u30f3',
		CURBAL : '\u73fe\u5728\u306e\u6b8b\u9ad8',
		PHYSCNT : '\u7269\u7406\u6b8b\u9ad8',
		PHYSCNTDATE : '\u7269\u7406\u30ab\u30a6\u30f3\u30c8\u65e5',
		RECONCILED : '\u8abf\u6574\u6e08\u307f',
		LOCATION : '\u4fdd\u7ba1\u5834\u6240',
	},
	INVENTORY : {
		ITEMNUM : '\u54c1\u76ee',
		DESCRIPTION : '\u8aac\u660e',
		SITEID : '\u30b5\u30a4\u30c8',
		STATUS : '\u30b9\u30c6\u30fc\u30bf\u30b9',
		LOCATION : '\u4fdd\u7ba1\u5834\u6240',
		CATEGORY : '\u5728\u5eab\u30ab\u30c6\u30b4\u30ea',
		BINNUM : '\u30c7\u30d5\u30a9\u30eb\u30c8\u30d3\u30f3',
		ISSUEUNIT : '\u51fa\u5eab\u5358\u4f4d',
		CURBAL : '\u73fe\u5728\u306e\u6b8b\u9ad8',
		LASTISSUEDATE : '\u6700\u7d42\u51fa\u5eab\u65e5',
		ISSUEYTD : '\u5e74\u521d\u6765',
		ISSUE1YRAGO : '\u6628\u5e74',
		PHYSCNT : '\u7269\u7406\u30ab\u30a6\u30f3\u30c8',
		PHYSCNTDATE : '\u7269\u7406\u30ab\u30a6\u30f3\u30c8\u65e5',
		RECONCILED : '\u8abf\u6574\u6e08\u307f',
		TOTALINVPHYBAL : '\u7269\u7406\u6b8b\u9ad8',
		TOTALINVBAL : '\u73fe\u5728\u306e\u6b8b\u9ad8',
		ISSUEHISTORY : '\u51fa\u5eab\u5c65\u6b74',
		INVBALANCE : '\u30a4\u30f3\u30d9\u30f3\u30c8\u30ea\u6b8b\u9ad8',
		ADJCOUNT : '\u3053\u308c\u3089{{count}}\u500b\u306e\u54c1\u76ee\u306e\u7269\u7406\u30ab\u30a6\u30f3\u30c8\u3092\u8abf\u6574',
		BALSUMMARY : '\u5229\u7528\u53ef\u80fd\u306a\u6b8b\u9ad8\u306e\u30b5\u30de\u30ea\u30fc',
	},
	METER : {
		ASSETNUM : '\u8cc7\u7523',
		METERNAME : '\u30e1\u30fc\u30bf\u30fc',
		METERTYPE : '\u30e1\u30fc\u30bf\u30fc\u30bf\u30a4\u30d7',
		READINGTYPE : '\u793a\u5ea6\u30bf\u30a4\u30d7',
		LASTREADING : '\u6700\u7d42\u793a\u5ea6',
		LASTREADINGDATE : '\u6700\u7d42\u793a\u5ea6\u65e5',
		LASTREADINGINSPECTOR : '\u6700\u7d42\u793a\u5ea6\u691c\u67fb\u8005',
		READING : '\u65b0\u898f\u793a\u5ea6',
		NEWREADINGDATE : '\u65b0\u898f\u793a\u5ea6\u65e5'
	},
	WPLABOR : {
		NAME : '\u8a08\u753b\u6e08\u307f\u52b4\u50cd',
		LABORCODE : '\u52b4\u50cd',
		CRAFT : '\u6280\u80fd',
		QUANTITY : '\u6570\u91cf',
		LABORHRS : '\u901a\u5e38\u306e\u52b4\u50cd\u6642\u9593',
		DISPLAYNAME : '\u540d\u524d',
		SKILLLEVEL: '\u30b9\u30ad\u30eb\u30ec\u30d9\u30eb',
		VENDOR : '\u30d9\u30f3\u30c0\u30fc',
		AMCREW : '\u30af\u30eb\u30fc'
	},		
	WPMATERIAL : {
		NAME : '\u8a08\u753b\u6e08\u307f\u8cc7\u6750',
		LINETYPE : '\u660e\u7d30\u30bf\u30a4\u30d7',
		ITEMNUM : '\u54c1\u76ee',
		DESCRIPTION : '\u8aac\u660e',
		ITEMQTY : '\u6570\u91cf',
		UNITCOST : '\u5358\u4fa1',
		STOREROOM : '\u4fdd\u7ba1\u5834\u6240',
		STORELOCSITE : '\u4fdd\u7ba1\u5834\u6240\u30b5\u30a4\u30c8',
		RESTYPE : '\u4e88\u7d04\u30bf\u30a4\u30d7',
		REQUIREDATE : '\u5f15\u6e21\u65e5'
	},
	LABTRANS : {
		LABORCODE : '\u52b4\u50cd',
		CRAFT : '\u6280\u80fd',
		STARTDATE : '\u958b\u59cb\u65e5',
		TIMERSTATUS : '\u30bf\u30a4\u30de\u30fc\u30b9\u30c6\u30fc\u30bf\u30b9',
		REGULARHRS : '\u901a\u5e38\u306e\u52b4\u50cd\u6642\u9593',
		PAYRATE: '\u30ec\u30fc\u30c8',
		PREMIUMPAYCODE : '\u5272\u5897\u652f\u6255\u30b3\u30fc\u30c9',
		PREMIUMPAYHOURS : '\u5272\u5897\u652f\u6255\u6642\u9593',
		PREMIUMPAYRATE: '\u5272\u5897\u652f\u6255\u30ec\u30fc\u30c8',
		WONUM : '\u4f5c\u696d\u6307\u793a\u66f8',
		LOCATION : '\u5834\u6240',
		ASSETNUM : '\u8cc7\u7523',
		TICKETID: '\u30c1\u30b1\u30c3\u30c8'
	},
	LABREP : {
		LABORCODE : '\u52b4\u50cd',
		CRAFT : '\u6280\u80fd',
		SKILLLEVEL : '\u30b9\u30ad\u30eb\u30ec\u30d9\u30eb',
		STARTDATE : '\u958b\u59cb\u65e5\u4ed8',
		STARTTIME : '\u958b\u59cb\u6642\u523b',
		FINISHDATE : '\u7d42\u4e86\u65e5\u4ed8',
		FINISHTIME : '\u7d42\u4e86\u6642\u523b',
		REGULARHRS : '\u901a\u5e38\u306e\u52b4\u50cd\u6642\u9593',
		PAYRATE : '\u30ec\u30fc\u30c8',
		TRANSTYPE : '\u30bf\u30a4\u30d7',
		WONUM : '\u4f5c\u696d\u6307\u793a\u66f8',
		LOCATION : '\u5834\u6240',
		ASSETNUM : '\u8cc7\u7523',
		GENAPPRSERVRECEIPT: '\u627f\u8a8d\u6e08\u307f',
		NAME: '\u540d\u524d',
		TIMERSTATUS : '\u30bf\u30a4\u30de\u30fc\u30b9\u30c6\u30fc\u30bf\u30b9',
		PREMIUMPAYHOURS : '\u5272\u5897\u652f\u6255\u6642\u9593',
		PREMIUMPAYRATE: '\u5272\u5897\u652f\u6255\u30ec\u30fc\u30c8',
		PREMIUMPAYCODE : '\u5272\u5897\u652f\u6255\u30b3\u30fc\u30c9',
		TICKETID: '\u30c1\u30b1\u30c3\u30c8',
		TICKETCLASS: '\u30c1\u30b1\u30c3\u30c8\u30af\u30e9\u30b9'
	},
	PERSON : {
		PERSONID: '\u4eba',
		FIRSTNAME: '\u540d',
		LASTNAME: '\u59d3'
	},
	FAILURECODE : {
		FAILURECODE : '\u969c\u5bb3\u30af\u30e9\u30b9',
		PROBLEMCODE : '\u554f\u984c',
		CAUSECODE : '\u539f\u56e0',
		REMEDYCODE : '\u4fee\u5fa9',
	},
	SPAREPART : {
		QUANTITY : '\u6570\u91cf',
		ISSUEDQTY : '\u51fa\u5eab\u6570\u91cf',
		REMARKS : '\u5099\u8003',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : '\u8aac\u660e',
		LONGDESCRIPTION : '\u8a73\u7d30',
		ASSET : '\u8cc7\u7523',
		STATUS : '\u30b9\u30c6\u30fc\u30bf\u30b9',
		PARENT : '\u89aa\u4f5c\u696d\u6307\u793a\u66f8',
		SITE : '\u30b5\u30a4\u30c8',
		LOCATION : '\u5834\u6240',
	},
	DOMAIN : {
		VALUE: '\u5024',
		DESCRIPTION: '\u8aac\u660e',
	},
	MR : {
		MRNUM : '\u8981\u6c42',
		DESCRIPTION : '\u8aac\u660e',
		LONGDESCRIPTION : '\u9577\u3044\u8aac\u660e',
		STATUS : '\u30b9\u30c6\u30fc\u30bf\u30b9',
		PRIORITY : '\u512a\u5148\u5ea6',
		CHARGEINFO : '\u5909\u66f4\u60c5\u5831',
		REQUIREDDATE : '\u5f15\u6e21\u65e5',
		WONUM : '\u4f5c\u696d\u6307\u793a\u66f8',
		LOCATION : '\u5834\u6240',
		ASSET : '\u8cc7\u7523',
		GLACCOUNT : '\u7dcf\u52d8\u5b9a\u5143\u5e33\u501f\u65b9\u52d8\u5b9a',
		MRLINES : '\u8981\u6c42\u660e\u7d30\u54c1\u76ee',
		ENTERDATE : '\u5165\u529b\u65e5'
	},
	MRLINE : {
		MRLINEITEM : '\u8981\u6c42\u54c1\u76ee',
		MRLINENUM : '\u660e\u7d30',
		LINETYPE : '\u660e\u7d30\u30bf\u30a4\u30d7',
		ITEM : '\u54c1\u76ee',
		DESCRIPTION : '\u8aac\u660e',
		QTY : '\u6570\u91cf',
		ORDERUNIT : '\u6ce8\u6587\u5358\u4f4d',
		UNITCOST : '\u5358\u4fa1',
		LINECOST : '\u660e\u7d30\u30b3\u30b9\u30c8',
		REQUIREDDATE : '\u5f15\u6e21\u65e5'
	},
	VIEWDR : {
		VIEWSUBMITTED : '\u9001\u4fe1\u6e08\u307f\u8981\u6c42\u3092\u8868\u793a',
		VIEWSAVED : '\u4fdd\u5b58\u6e08\u307f\u8981\u6c42\u3092\u8868\u793a',
		EDIT : '\u8981\u6c42\u3092\u7de8 \u96c6'
	},
	CREATEDR: {
		SAVEASDRAFT : '\u4e0b\u66f8\u304d\u3068\u3057\u3066\u4fdd\u5b58',
		NEWREQITEM : '\u65b0\u898f\u8981\u6c42\u54c1\u76ee',
		SUBMIT : '\u9001\u4fe1'
	},
	CLASSIFY : {
		CLASSASSET : '\u8cc7\u7523\u3092\u5206\u985e',
		CLASSWO : '\u4f5c\u696d\u6307\u793a\u66f8\u3092\u5206\u985e',
		DESCRIPTION : '\u30af\u30e9\u30b9\u8aac\u660e',
		CLASSIFICATION : '\u5206\u985e'
	}
};