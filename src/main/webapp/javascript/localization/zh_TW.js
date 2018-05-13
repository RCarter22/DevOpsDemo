'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: zh_TW
 */
var locale = 'zh_TW'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: '\u8a2d\u7f6e',
        cancelText: '\u53d6\u6d88',
        clearText: '\u6e05\u9664',
        selectedText: '\u9078\u5b9a',
        // Calender component
        calendarText: '\u65e5\u66c6',
        dateText: '\u65e5\u671f',
        timeText: '\u6642\u9593',
        // Datetime component
        dateFormat: 'yy/m/d',
        dateOrder: 'yymd',
        dayNames: ['\u661f\u671f\u65e5', '\u661f\u671f\u4e00', '\u661f\u671f\u4e8c', '\u661f\u671f\u4e09', '\u661f\u671f\u56db', '\u661f\u671f\u4e94', '\u661f\u671f\u516d'],
        dayNamesShort: ['\u5468\u65e5', '\u5468\u4e00', '\u5468\u4e8c', '\u5468\u4e09', '\u5468\u56db', '\u5468\u4e94', '\u5468\u516d'],
        dayText: '\u65e5',
        hourText: '\u6642',
        minuteText: '\u5206',
        monthNames: ['\u4e00\u6708', '\u4e8c\u6708', '\u4e09\u6708', '\u56db\u6708', '\u4e94\u6708', '\u516d\u6708', '\u4e03\u6708', '\u516b\u6708', '\u4e5d\u6708', '\u5341\u6708', '\u5341\u4e00\u6708', '\u5341\u4e8c\u6708'],
        monthNamesShort: ['\u4e00\u6708', '\u4e8c\u6708', '\u4e09\u6708', '\u56db\u6708', '\u4e94\u6708', '\u516d\u6708', '\u4e03\u6708', '\u516b\u6708', '\u4e5d\u6708', '\u5341\u6708', '\u5341\u4e00\u6708', '\u5341\u4e8c\u6708'],
        monthText: '\u6708',
        secText: '\u79d2',
        amText: '\u4e0a\u5348',
        pmText: '\u4e0b\u5348',
        timeFormat: 'H:i:s',
        timeWheels: 'His',
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
	        symbol: 'NT$'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : 0,
		ONE : 1,
		TWO : 2,
		FEW : "\u5c11",
		MANY : "\u591a",
		OTHER : "\u5176\u4ed6"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "\u4e0a\u5348", "\u4e0b\u5348" ],
			"DAY" : [ "\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d" ],
			"MONTH" : [ "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708" ],
			"SHORTDAY" : [ "\u9031\u65e5", "\u9031\u4e00", "\u9031\u4e8c", "\u9031\u4e09", "\u9031\u56db", "\u9031\u4e94", "\u9031\u516d" ],
			"SHORTMONTH" : [ "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708" ],
			"fullDate" : "y\u5e74M\u6708d\u65e5 EEEE",
			"longDate" : "y\u5e74M\u6708d\u65e5",
			"medium": "y\u5e74M\u6708d\u65e5 H:m:s",
			"mediumDate" : "y\u5e74M\u6708d\u65e5",
			"mediumTime" : "H:m:s",
			"short" : "y/M/d H:m:s",
			"shortDate" : "y/M/d",
			"shortTime" : "H:m:s"				
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "NT$",
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
		        "maxFrac": 2,
		        "minFrac": 2,
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
 * Language: ZHT
 */
var lang = 'ZHT'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : '\u540c\u6b65\u5b8c\u6210\uff0c\u4f46\u51fa\u73fe\u932f\u8aa4\uff01\u4ecd\u53ef\u5617\u8a66\u96e2\u7dda\u5de5\u4f5c\u3002',
	EMMOF1001W : '\u540c\u6b65\u5b8c\u6210\uff0c\u4f46\u51fa\u73fe\u932f\u8aa4\uff01\u8acb\u518d\u6b21\u540c\u6b65\uff0c\u4ee5\u555f\u7528\u96e2\u7dda\u6a21\u5f0f\u3002',
	EMMOF1002W : '\u540c\u6b65\u5b8c\u6210\uff0c\u4f46\u51fa\u73fe\u932f\u8aa4\uff01\u53ef\u5617\u8a66\u518d\u6b21\u540c\u6b65\u6216\u4fdd\u6301\u96e2\u7dda\u5de5\u4f5c\u3002',
	EMMOF1003W : '\u540c\u6b65\u5b8c\u6210\uff0c\u4f46\u51fa\u73fe\u932f\u8aa4\uff01\u8acb\u5617\u8a66\u518d\u6b21\u540c\u6b65\uff0c\u4ee5\u4fbf\u96e2\u7dda\u5de5\u4f5c\u3002',
	EMMOF1004W : '{0}\u5fc5\u9808\u70ba\u4e00\u500b\u6578\u5b57',
	EMMOF1005W : '\u7f3a\u5c11\u5fc5\u586b\u6b04\u4f4d\uff1a{0}',
	EMMOF1006W : '\u5c6c\u6027{0}\u70ba\u53ea\u8b80',
	EMMOF1007W : '\u8acb\u9078\u64c7\u4e00\u500b\u503c',
	EMMOF1008I : '\u5df2\u6210\u529f\u66f4\u6539\u72c0\u614b',
	EMMOF1009W : '\u8acb\u6307\u5b9a\u4e00\u500b\u5927\u65bc0\u7684\u6578\u91cf',
	EMMOF1010W : '{0}\u5fc5\u9808\u5927\u65bc0',
	EMMOF1011W : '{0}\u70ba\u5fc5\u586b\u9805',
	EMMOF1012W : '\u6b64\u9805\u76ee\u3001\u5009\u5eab\u548c\u8ca8\u4f4d\u7d44\u5408\u4e0d\u5b58\u5728\u9918\u91cf',
	EMMOF1013W : '\u7531\u65bc\u6b64\u6b21\u4ea4\u6613\uff0c\u8ca8\u4f4d\u4e2d\u7684\u9918\u91cf\u5c07\u8b8a\u70ba\u8ca0\u503c',
	EMMOF1014W : '\u4f4d\u7f6e\u3001\u8ca8\u4f4d\u865f\u548c\u5730\u9ede\u865f\u5747\u5b8c\u5168\u76f8\u540c\u6642\uff0c\u7121\u6cd5\u8f49\u79fb',
	// [WF]		
	EMMWF1000I : '\u555f\u52d5\u5de5\u4f5c\u6d41',
	EMMWF1001I : '\u6b64\u61c9\u7528\u7a0b\u5e8f\u6709\u591a\u500b\u5de5\u4f5c\u6d41\u7a0b\u53ef\u7528\u3002\u8acb\u9078\u64c7\u4e00\u500b\u4e26\u6309\u4e0b\u78ba\u8a8d\u3002',
	EMMWF1002I : '\u8acb\u9078\u64c7\u4e00\u500b\u6d41\u7a0b',
	EMMWF1003I : '\u6d41\u7a0b',
	EMMWF1004I : '\u5099\u5fd8\u9304',
	EMMWF1005I : '\u505c\u6b62\u5de5\u4f5c\u6d41',
	// [ES]
	EMMES1000I : '\u96fb\u5b50\u7c3d\u540d\u6388\u6b0a',
	EMMES1001I : '\u9700\u63d0\u4f9b\u96fb\u5b50\u7c3d\u540d',
	EMMES1002E : '\u6388\u6b0a\u5931\u6557',
	EMMES1003I : '\u8acb\u8f38\u5165\u5bc6\u78bc\u548c\u539f\u56e0',
	EMMES1004I : '\u7528\u6236',
	EMMES1005I : '\u5bc6\u78bc',
	EMMES1006I : '\u539f\u56e0',
	// [GB]
	EMMGB1001I : '\u96fb\u5b50\u90f5\u4ef6',
	EMMGB1002I : '\u8996\u983b\u901a\u8a71',
	EMMGB1003I : '\u53d6\u6d88',
	EMMGB1004I : '\u78ba\u5b9a',
	EMMGB1005I : '\u78ba\u8a8d',
	EMMGB1006I : '\u662f',
	EMMGB1007I : '\u5426',
	EMMGB1008I : '\u96fb\u8a71',
	EMMGB1009I : '\u547c\u53eb',
	EMMGB1010I : '\u7c21\u8a0a',
	EMMGB1011I : '\u78ba\u8a8d\u522a\u9664\uff1f',
	EMMGB1012I : '{0}\u5fc5\u9808\u5728{1}\u4e4b\u524d\u767c\u751f',
	EMMGB1013I : '{0}\u5fc5\u9808\u5728{1}\u4e4b\u5f8c\u767c\u751f',
	EMMGB1014I : '{0}\u5fc5\u9808\u5728\u904e\u53bb\u767c\u751f',
	// General	
	OFFLINEMODE : '\u96e2\u7dda\u6a21\u5f0f',
	SYNCNEEDED : '-- \u5df2\u4fee\u6539\uff0c\u9700\u9032\u884c\u540c\u6b65',
	SYNCHRONIZATION : '\u540c\u6b65\u5316',
	SYNCSERVER : '\u8207\u4f3a\u670d\u5668\u540c\u6b65',
	ENTERLABOR: '\u6309\u4eba\u529b\u8f38\u5165',
	ADDMORE: '\u6dfb\u52a0\u66f4\u591a\u2026\u2026',
	GOONLINE : '\u91cd\u65b0\u4e0a\u7dda',
	GOTOOFFLINEAPPS : '\u8f49\u5230\u96e2\u7dda\u61c9\u7528\u7a0b\u5e8f',
	OFFLINEAPPS : '\u96e2\u7dda\u61c9\u7528\u7a0b\u5e8f',
	QUICKSCAN : '\u5feb\u901f\u6383\u63cf\uff1a',
	ACTIVEWORKORDERS : '\u6fc0\u6d3b\u72c0\u614b\u5de5\u55ae',
	RECORDSAVED: '\u8a18\u9304\u5df2\u4fdd\u5b58',
	RECORDNOTSAVED: '\u932f\u8aa4 - \u7121\u8fd4\u56de\u8a18\u9304',
	TIMERALREADYSTARTED: '\u8a08\u6642\u5668\u5df2\u555f\u52d5',
	TIMERNOTFOUND : '\u8a08\u6642\u5668\u672a\u555f\u52d5\u3002\u6c92\u6709\u627e\u5230\u5df2\u555f\u7528\u8a08\u6642\u5668\u3002',
	TIMERSTARTED : '\u8a08\u6642\u5668\u5df2\u555f\u52d5',
	TIMERSTOPPED : '\u8a08\u6642\u5668\u5df2\u505c\u6b62',
	TOOLS : '\u5de5\u5177',
	STARTTIMER : '\u555f\u52d5\u8a08\u6642\u5668',
	STOPTIMER : '\u505c\u6b62\u8a08\u6642\u5668',
	MODIFYSAVE : '\u8a18\u9304\u5df2\u4fee\u6539\u3002\u8acb\u4fdd\u5b58\u60a8\u7684\u4fee\u6539\u3002',
	SITEREQUIRED : '\u9700\u7ad9\u9ede\u5275\u5efa\u5de5\u55ae\u3002',
	NOVALUE : '\u7a7a\u503c',
	ACTIONS : '\u64cd\u4f5c',
	CHILDRENOF : '\u7684\u5b50\u9805',
	RESPONSIBILITY : '\u8cac\u4efb',
	LOOKUP : '\u67e5\u627e',
	LOCATIONDRILLDOWN : '\u4f4d\u7f6e\u947d\u53d6',
	ASSETDRILLDOWN : '\u8cc7\u7522\u947d\u53d6',
	DRILLDOWN : '\u947d\u53d6',
	BACK : '\u8fd4\u56de',
	SAVE : '\u4fdd\u5b58',
	APPLY : '\u61c9\u7528',
	FILTER : '\u904e\u6ffe',
	RESET : '\u91cd\u7f6e',
	SELECTVALUE : '\u9078\u64c7\u503c',
	CANCEL : '\u53d6\u6d88',
	OK : '\u78ba\u5b9a',
	YES : '\u662f',
	NO : '\u5426',
	CREATEFOLLOWUP : '\u5275\u5efa\u8ddf\u9032',
	CREATESR : '\u5275\u5efa\u65b0\u670d\u52d9\u8acb\u6c42',
	PARENT : '\u7236\u9805',
	CHANGESTATUS : '\u66f4\u6539\u72c0\u614b',
	LABOR : '\u4eba\u529b',
	MATERIALS : '\u7269\u6599',
	TASKS : '\u4efb\u52d9',
	ATTACHMENTS : '\u9644\u4ef6',
	FAILUREREPORTING : '\u6545\u969c\u5831\u544a',
	MULTIASSETS : '\u591a\u500b\u8cc7\u7522\u3001\u4f4d\u7f6e',
	ADDNEW : '\u6dfb\u52a0\u65b0\u9805',
	CLASSIFICATION : '\u5206\u985e',
	NORECORDS : '\u672a\u627e\u5230\u8a18\u9304',
	NORECORDEXIST : '\u672a\u627e\u5230\u8a18\u9304\u6216\u8a18\u9304\u4e0d\u518d\u5b58\u5728',
	NORECORDSADJ : '\u7121\u8a18\u9304\u4f86\u8abf\u6574\u5be6\u7269\u76e4\u9ede',
	SELECTOWNER : '\u9078\u64c7\u8ca0\u8cac\u4eba',
	OWNER : '\u8ca0\u8cac\u4eba',
	OWNERGROUP : '\u8ca0\u8cac\u4eba\u5c0f\u7d44',
	TAKEOWNERSHIP : '\u8ca0\u8cac',
	SORTBY : '\u6392\u5e8f\u65b9\u5f0f',
	LIST : '\u5217\u8868',
	QUICKSEARCH: '\u5feb\u901f\u641c\u7d22',
	INVENTORYBYSR : '\u6309\u5009\u5eab\u9032\u884c\u5eab\u5b58',
	INVDETAILS : '\u5eab\u5b58\u8a73\u60c5',
	NEWCOUNT : '\u65b0\u76e4\u9ede',
	LABORTRANS : '\u4eba\u529b\u4ea4\u6613',
	CREATEWO : '\u5275\u5efa\u65b0\u5de5\u55ae',
	MYWOS : '\u6211\u7684\u5de5\u55ae',
	FAILUREREPORT : '\u6545\u969c\u5831\u544a',
	METERREADINGS : '\u8f38\u5165\u5100\u9336\u8b80\u6578',
	ASSETMETER : '\u8cc7\u7522\u5100\u9336\u8b80\u6578',
	LOCATIONMETER : '\u4f4d\u7f6e\u5100\u9336\u8b80\u6578',
	FROM : '\u81ea',
	TO : '\u81f3',
	ADVANCED : '\u9ad8\u7d1a',
	ADVANCEDSEARCH : '\u9ad8\u7d1a\u641c\u7d22',
	DOWNTIME : '\u505c\u6a5f\u6642\u9593',
	PURCHASEINFO : '\u8cfc\u8cb7\u4fe1\u606f',
	SPAREPARTS : '\u5099\u4ef6',
	SCHEDULEINFO : '\u8abf\u5ea6\u4fe1\u606f',
	PLANLABOR : '\u4eba\u529b\u8a08\u5283',
	PLANMATERIAL : '\u7269\u6599\u8a08\u5283',
	WOCREATED : '\u5de5\u55ae{0}\u5df2\u5275\u5efa\u3002',
	PRESTART : '\u9810\u555f\u52d5',
	REVIEWANDAPPROVE : '\u5be9\u67e5\u548c\u6279\u51c6',
	MOCACTIONGROUP : '\u9078\u64c7MOC\u64cd\u4f5c\u7d44',
	MOCACTIONS : '\u9078\u64c7MOC\u64cd\u4f5c',
	REVIEWERSAVED : '\u5be9\u67e5\u4eba\u5df2\u96e2\u7dda\u4fdd\u5b58\u3002',
	APPROVERSAVED : '\u6279\u51c6\u4eba\u5df2\u96e2\u7dda\u4fdd\u5b58\u3002',
	ACTIONSAVED : '\u64cd\u4f5c\u5df2\u96e2\u7dda\u4fdd\u5b58\u3002',
	NOACTIONS : '\u6a19\u6e96\u64cd\u4f5c\u7d44{0}\u7121\u6709\u6548\u7684\u6a19\u6e96\u64cd\u4f5c\u53ef\u6dfb\u52a0\u3002',
	SRQUEUED : 'SR {0}\u72c0\u614b\u66f4\u6539\u70baQUEUED\u3002',
	SELECTREVIEWERS : '\u9078\u64c7\u5be9\u67e5\u4eba',
	SELECTAPPROVERS : '\u9078\u64c7\u6279\u51c6\u4eba',
	APPROVERS : '\u6279\u51c6\u4eba',
	REVIEWERS : '\u5be9\u67e5\u4eba',
	VIEWLIST: '\u67e5\u770b\u5217\u8868',
	VIEWSUMMARY : '\u67e5\u770b\u6458\u8981',
	STOREROOMS : '\u5009\u5eab',
	REPDOWNTIME: 'Report Downtime',
	GOTO : '\u81f3',
	APPS : '\u61c9\u7528\u7a0b\u5e8f',
	STARTCENTER : '\u958b\u59cb\u4e2d\u5fc3',
	PAGINATION : {
		TITLE : '\u7b2c {{from}}\u9801\uff0c\u5171  {{to}}\u9801 - {{total}} \u8a18\u9304',
		PREV : '\u4e0a\u4e00\u500b',
		NEXT : '\u4e0b\u4e00\u500b'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : '\u4f4d\u7f6e',
		ASSET : '\u8cc7\u7522',
		WOTRACK : '\u5de5\u55ae\u8ddf\u8e64',
		SR : '\u670d\u52d9\u8acb\u6c42',
		INVENTOR: '\u5eab\u5b58',
		INVISSUE: '\u767c\u51fa\u548c\u8f49\u79fb',
		MOC : 'MOC (\u6cb9)',
		CREATEDR : '\u5275\u5efa\u8acb\u8cfc\u55ae',
		VIEWDR : '\u67e5\u770b\u8acb\u8cfc\u55ae',
		LABREP: '\u4eba\u529b\u5831\u544a',
		TXNTRACK : '\u540c\u6b65\u554f\u984c\u89e3\u6c7a'
	},
	// Objects
	ASSET : {
		ASSETNUM : '\u8cc7\u7522\u865f #',
		STATUS : '\u72c0\u614b',
		STATUSDATE: '\u524d\u6b21\u66f4\u52d5\u65e5\u671f',
		INSTALLDATE: '\u5b89\u88dd\u65e5\u671f',
		SITEID : '\u5730\u9ede',
		PARENT : '\u7236\u9805',
		ASSETTYPE: '\u985e\u578b',
		LONGDESCRIPTION : '\u8a73\u7d30\u4fe1\u606f',
		GROUPNAME: '\u5100\u9336\u7d44',
		SERIALNUM: '\u5e8f\u5217 #',
		PURCHASEPRICE: '\u8cfc\u8cb7\u50f9\u683c',
		TOTDOWNTIME: '\u7e3d\u505c\u6a5f\u6642\u9593',
		ISRUNNING: '\u8cc7\u7522\u8abf\u7528',
		VENDOR: '\u4f9b\u61c9\u5546',
		MANUFACTURER: '\u88fd\u9020\u5546',
		FAILURECODE: '\u6545\u969c\u985e',
		DESCRIPTION : '\u63cf\u8ff0',
		LOCATION : '\u4f4d\u7f6e',
		LOCDESC : '\u8a73\u7d30\u4fe1\u606f',
		SEQUENCE : '\u9806\u5e8f',
		PROGRESS : '\u6a19\u8a18\u9032\u5ea6?',
		COMMENTS : '\u6ce8\u91cb',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : '\u5de5\u55ae\u865f',
		DESCRIPTION : '\u63cf\u8ff0',
		LONGDESCRIPTION : '\u8a73\u7d30\u4fe1\u606f',
		STATUS : '\u72c0\u614b',
		PARENT : '\u7236\u5de5\u55ae',
		SITEID : '\u5730\u9ede',
		LOCATION : '\u4f4d\u7f6e',
		ASSETNUM : '\u8cc7\u7522\u865f',
		WORKTYPE : '\u5de5\u4f5c\u985e\u578b',
		WOPRIORITY : '\u512a\u5148',
		GLACCOUNT : '\u7e3d\u8cec',
		FAILURECODE : '\u6545\u969c\u985e\u4ee3\u78bc',
		PROBLEMCODE : '\u554f\u984c\u4ee3\u78bc',
		SUPERVISOR : '\u76e3\u7ba1\u54e1',
		CREWID : '\u5168\u9ad4\u4eba\u54e1',
		LEAD : '\u9818\u5c0e',
		PERSONGROUP : '\u5de5\u4f5c\u7d44',
		REPORTEDBY : '\u5831\u544a\u4eba',
		REPORTDATE : '\u5831\u544a\u65e5\u671f',
		PHONE : '\u96fb\u8a71',
		TASKID : '\u4efb\u52d9\u865f',
		TARGSTARTDATE : '\u76ee\u6a19\u958b\u59cb\u65e5\u671f',
		TARGCOMPDATE : '\u76ee\u6a19\u5b8c\u6210\u65e5\u671f',
		SCHEDSTART : '\u8a08\u5283\u958b\u59cb',
		SCHEDFINISH : '\u8a08\u5283\u5b8c\u6210',
		ACTSTART : '\u5be6\u969b\u958b\u59cb',
		ACTFINISH : '\u5be6\u969b\u5b8c\u6210',
		ASSIGNMENT : '\u5206\u914d\u4eba\u529b',
		OWNER : '\u8ca0\u8cac\u4eba',
		OWNERGROUP : '\u8ca0\u8cac\u4eba\u5c0f\u7d44',
		OBSERVATION : '\u89c0\u5bdf',
		MEASUREMENTVALUE : '\u6e2c\u5b9a\u503c',
		HAZARDS: '\u5371\u96aa',
		HAZARDSMAT: '\u6709\u5bb3\u7269\u8cea',
		PRECAUTIONS: '\u6ce8\u610f\u4e8b\u9805',
		LOCKTAG: '\u9396\u5b9a/\u6a19\u51fa',
		TAGOUT: '\u6a19\u51fa',
		LOCKOUT: '\u9396\u5b9a',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : '\u63cf\u8ff0',
		ITEM : '\u9805\u76ee',
		LINETYPE : '\u884c\u985e\u578b',
		QUANTITY : '\u6578\u91cf',
		STOREROOM : '\u5009\u5eab',
		STORELOC : '\u5009\u5eab',
		BINNUM : '\u8ca8\u4f4d',
		CURBAL : '\u7576\u524d\u9918\u91cf',
		UNITCOST : '\u55ae\u4f4d\u6210\u672c',
		ASSET : '\u8cc7\u7522',
		WORKORDER : '\u5de5\u55ae',
		LOCATION : '\u4f4d\u7f6e',
		ISSUETYPE : '\u9818\u6599\u985e\u578b',
		ISSUETO : '\u767c\u51fa\u81f3',
		ROTASSETNUM : '\u8cc7\u7522\u8f49\u63db',
		SITEID : '\u5730\u9ede',
		ISSUERETURN : '\u767c\u51fa\u548c\u8fd4\u56de',
		CHARGEINFO : '\u8a18\u8cec\u4fe1\u606f'
	},
	TOOLTRANS : {
		DESCRIPTION : '\u63cf\u8ff0',
		ITEM : '\u9805\u76ee',
		LINETYPE : '\u884c\u985e\u578b',
		QUANTITY : '\u6578\u91cf',
		STOREROOM : '\u5009\u5eab',
		BINNUM : '\u8ca8\u4f4d',
		CURBAL : '\u7576\u524d\u9918\u91cf',
		UNITCOST : '\u55ae\u4f4d\u6210\u672c',
		ISSUETYPE : '\u9818\u6599\u985e\u578b',
		LOCATION : '\u4f4d\u7f6e',
		TOOLRATE : '\u5de5\u5177\u6bd4\u7387',
		ASSETNUM: '\u8cc7\u7522',
		TOOLHRS: '\u5de5\u5177\u4f7f\u7528\u6642\u6578',
		LINECOST: '\u884c\u6210\u672c',
		TOOLQTY: '\u5de5\u5177\u6578\u91cf'
	},
	MATRECTRANS : {
		DESCRIPTION : '\u63cf\u8ff0',
		ITEM : '\u9805\u76ee',
		LINETYPE : '\u884c\u985e\u578b',
		QUANTITY : '\u6578\u91cf',
		TOSTORELOC : '\u76ee\u6a19\u4f4d\u7f6e',
		FROMSTORELOC : '\u8d77\u59cb\u4f4d\u7f6e',
		FROMSITE : '\u8d77\u59cb\u5730\u9ede',
		TOSITE : '\u76ee\u6a19\u5730\u9ede',
		TOBIN: '\u76ee\u6a19\u8ca8\u4f4d',
		FROMBIN: '\u8d77\u59cb\u8ca8\u4f4d',
		UNITCOST : '\u55ae\u4f4d\u6210\u672c',
		ISSUETYPE : '\u9818\u6599\u985e\u578b',
		CONVERSIONFACTOR : '\u63db\u7b97\u56e0\u6578',
		ROTASSETNUM : '\u8cc7\u7522\u8f49\u63db',
		TRANSFEROUT : '\u8f49\u51fa',
		TRANSFERIN : '\u8f49\u5165',
		FROMQTY : '\u8d77\u59cb\u8ca8\u4f4d\u6578\u91cf',
		TOQTY : '\u76ee\u6a19\u8ca8\u4f4d\u6578\u91cf',
		SITEID : '\u5730\u9ede',
		LOCATION : '\u4f4d\u7f6e',
		TRANSFERDETAILS: '\u8f49\u79fb\u8a73\u7d30\u4fe1\u606f'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : '\u8cc7\u7522',
		LOCATION : '\u4f4d\u7f6e',
		SEQUENCE : '\u9806\u5e8f',
	},
	WORKLOG : {
		NAME : '\u5de5\u4f5c\u65e5\u8a8c',
		DESCRIPTION : '\u63cf\u8ff0',
		DETAILS : '\u8a73\u7d30\u4fe1\u606f',
		LOGTYPE : '\u985e\u578b',
		CREATEBY : '\u5275\u5efa\u8005',
		CREATEDATE : '\u5275\u5efa\u65e5\u671f'
	},
	SR : {
		ACTIVEREQS : '\u8655\u7406\u4e2d\u7684\u670d\u52d9\u8acb\u6c42',
		NEWREQS : '\u65b0\u670d\u52d9\u8acb\u6c42',
		AFFECTEDPERSON : '\u6d89\u53ca\u4eba\u54e1',
		DETAILS : '\u8a73\u7d30\u4fe1\u606f',
		GLACCOUNT : '\u7e3d\u8cec',
		LOCATION : '\u4f4d\u7f6e',
		OWNER : '\u8ca0\u8cac\u4eba',
		OWNERGROUP : '\u8ca0\u8cac\u4eba\u5c0f\u7d44',
		REPORTEDPRIORITY : '\u5831\u544a\u91cd\u9ede',
		REPORTEDBY : '\u5831\u544a\u4eba',
		REPORTDATE : '\u5831\u544a\u65e5\u671f',
		REPORTEDPHONE : '\u96fb\u8a71\u5831\u544a',
		REPORTEDEMAIL : '\u96fb\u5b50\u90f5\u4ef6\u5831\u544a',
		SITE : '\u5730\u9ede',
		STATUS : '\u72c0\u614b',
		SR : '\u670d\u52d9\u8acb\u6c42',
		SUMMARY : '\u6458\u8981',
		ASSETNUM : '\u8cc7\u7522',
		ASSETSITEID : '\u8cc7\u7522\u5730\u9ede',
	},
	INVBALANCES : {
		ITEMNUM : '\u9805\u76ee\u865f',
		DESCRIPTION : '\u63cf\u8ff0',
		BINNUM : '\u8ca8\u4f4d\u865f',
		CURBAL : '\u7576\u524d\u9918\u91cf',
		PHYSCNT : '\u5be6\u7269\u76e4\u9ede\u9918\u91cf',
		PHYSCNTDATE : '\u5be6\u7269\u76e4\u9ede\u65e5\u671f',
		RECONCILED : '\u9918\u91cf\u5df2\u5e73',
		LOCATION : '\u5009\u5eab',
	},
	INVENTORY : {
		ITEMNUM : '\u9805\u76ee\u865f',
		DESCRIPTION : '\u63cf\u8ff0',
		SITEID : '\u5730\u9ede',
		STATUS : '\u72c0\u614b',
		LOCATION : '\u5009\u5eab',
		CATEGORY : '\u5eab\u5b58\u5206\u985e',
		BINNUM : '\u9ed8\u8a8d\u8ca8\u4f4d\u865f',
		ISSUEUNIT : '\u767c\u653e\u55ae\u4f4d',
		CURBAL : '\u7576\u524d\u9918\u91cf',
		LASTISSUEDATE : '\u524d\u6b21\u767c\u6599\u65e5\u671f',
		ISSUEYTD : '\u5e74\u521d\u81f3\u4eca',
		ISSUE1YRAGO : '\u53bb\u5e74',
		PHYSCNT : '\u5be6\u7269\u76e4\u9ede',
		PHYSCNTDATE : '\u5be6\u7269\u76e4\u9ede\u65e5\u671f',
		RECONCILED : '\u9918\u91cf\u5df2\u5e73',
		TOTALINVPHYBAL : '\u5be6\u7269\u9918\u91cf',
		TOTALINVBAL : '\u7576\u524d\u9918\u91cf',
		ISSUEHISTORY : '\u767c\u6599\u6b77\u53f2',
		INVBALANCE : '\u5eab\u5b58\u9918\u91cf',
		ADJCOUNT : '\u70ba\u9019\u4e9b{{\u76e4\u9ede}}\u9805\u76ee\u8abf\u6574\u5be6\u7269\u76e4\u9ede',
		BALSUMMARY : '\u53ef\u7528\u9918\u91cf\u6458\u8981',
	},
	METER : {
		ASSETNUM : '\u8cc7\u7522\u865f',
		METERNAME : '\u5100\u9336',
		METERTYPE : '\u5100\u9336\u985e\u578b',
		READINGTYPE : '\u8b80\u6578\u985e\u578b',
		LASTREADING : '\u524d\u6b21\u8b80\u6578',
		LASTREADINGDATE : '\u524d\u6b21\u8b80\u6578\u65e5\u671f',
		LASTREADINGINSPECTOR : '\u524d\u6b21\u8b80\u6578\u6aa2\u67e5\u54e1',
		READING : '\u65b0\u8b80\u6578',
		NEWREADINGDATE : '\u65b0\u8b80\u6578\u65e5\u671f'
	},
	WPLABOR : {
		NAME : '\u4eba\u529b\u8a08\u5283',
		LABORCODE : '\u4eba\u529b\u4ee3\u78bc',
		CRAFT : '\u5de5\u85dd',
		QUANTITY : '\u6578\u91cf',
		LABORHRS : '\u6b63\u5e38\u5de5\u4f5c\u6642\u6578',
		DISPLAYNAME : '\u540d\u7a31',
		SKILLLEVEL: '\u6280\u80fd\u6c34\u5e73',
		VENDOR : '\u4f9b\u61c9\u5546',
		AMCREW : '\u5168\u9ad4\u4eba\u54e1'
	},		
	WPMATERIAL : {
		NAME : '\u7269\u6599\u8a08\u5283',
		LINETYPE : '\u7dda\u578b',
		ITEMNUM : '\u9805\u76ee\u865f',
		DESCRIPTION : '\u63cf\u8ff0',
		ITEMQTY : '\u6578\u91cf',
		UNITCOST : '\u55ae\u4f4d\u6210\u672c',
		STOREROOM : '\u53c3\u8003',
		STORELOCSITE : '\u5009\u5eab\u5730\u9ede',
		RESTYPE : '\u9810\u8a02\u985e\u578b',
		REQUIREDATE : '\u9700\u7528\u65e5\u671f'
	},
	LABTRANS : {
		LABORCODE : '\u4eba\u529b',
		CRAFT : '\u5de5\u85dd',
		STARTDATE : '\u958b\u59cb\u65e5\u671f',
		TIMERSTATUS : '\u8a08\u6642\u5668\u72c0\u614b',
		REGULARHRS : '\u6b63\u5e38\u5de5\u4f5c\u6642\u6578',
		PAYRATE: '\u7d66\u4ed8\u6bd4\u7387',
		PREMIUMPAYCODE : '\u52a0\u73ed\u88dc\u8cbc\u4ee3\u78bc',
		PREMIUMPAYHOURS : '\u52a0\u73ed\u88dc\u8cbc\u6642\u6578',
		PREMIUMPAYRATE: '\u52a0\u73ed\u88dc\u8cbc\u6bd4\u7387',
		WONUM : '\u5de5\u55ae',
		LOCATION : '\u4f4d\u7f6e',
		ASSETNUM : '\u8cc7\u7522',
		TICKETID: '\u7968\u5238'
	},
	LABREP : {
		LABORCODE : '\u4eba\u529b',
		CRAFT : '\u5de5\u85dd',
		SKILLLEVEL : '\u6280\u80fd\u6c34\u5e73',
		STARTDATE : '\u958b\u59cb\u65e5\u671f',
		STARTTIME : '\u958b\u59cb\u6642\u9593',
		FINISHDATE : '\u7d50\u675f\u65e5\u671f',
		FINISHTIME : '\u7d50\u675f\u6642\u9593',
		REGULARHRS : '\u6b63\u5e38\u5de5\u4f5c\u6642\u6578',
		PAYRATE : '\u7d66\u4ed8\u6bd4\u7387',
		TRANSTYPE : '\u985e\u578b',
		WONUM : '\u5de5\u55ae',
		LOCATION : '\u4f4d\u7f6e',
		ASSETNUM : '\u8cc7\u7522',
		GENAPPRSERVRECEIPT: '\u5df2\u6279\u51c6',
		NAME: '\u540d\u7a31',
		TIMERSTATUS : '\u8a08\u6642\u5668\u72c0\u614b',
		PREMIUMPAYHOURS : '\u52a0\u73ed\u88dc\u8cbc\u4ee3\u6642\u6578',
		PREMIUMPAYRATE: '\u52a0\u73ed\u88dc\u8cbc\u6bd4\u7387',
		PREMIUMPAYCODE : '\u52a0\u73ed\u88dc\u8cbc\u4ee3\u78bc',
		TICKETID: '\u7968\u5238',
		TICKETCLASS: '\u7968\u5238\u985e'
	},
	PERSON : {
		PERSONID: '\u4eba\u54e1',
		FIRSTNAME: '\u540d\u5b57',
		LASTNAME: '\u59d3\u6c0f'
	},
	FAILURECODE : {
		FAILURECODE : '\u6545\u969c\u985e\u4ee3\u78bc',
		PROBLEMCODE : '\u554f\u984c\u4ee3\u78bc',
		CAUSECODE : '\u539f\u56e0\u4ee3\u78bc',
		REMEDYCODE : '\u88dc\u6551\u4ee3\u78bc',
	},
	SPAREPART : {
		QUANTITY : '\u6578\u91cf',
		ISSUEDQTY : '\u767c\u6599\u6578\u91cf',
		REMARKS : '\u5099\u8a3b',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : '\u63cf\u8ff0',
		LONGDESCRIPTION : '\u8a73\u7d30\u4fe1\u606f',
		ASSET : '\u8cc7\u7522',
		STATUS : '\u72c0\u614b',
		PARENT : '\u7236\u5de5\u55ae',
		SITE : '\u5730\u9ede',
		LOCATION : '\u4f4d\u7f6e',
	},
	DOMAIN : {
		VALUE: '\u503c',
		DESCRIPTION: '\u63cf\u8ff0',
	},
	MR : {
		MRNUM : '\u8acb\u8cfc\u55ae\u865f',
		DESCRIPTION : '\u63cf\u8ff0',
		LONGDESCRIPTION : '\u9577\u63cf\u8ff0',
		STATUS : '\u72c0\u614b',
		PRIORITY : '\u512a\u5148',
		CHARGEINFO : '\u8a18\u8cec\u4fe1\u606f',
		REQUIREDDATE : '\u9700\u7528\u65e5\u671f',
		WONUM : '\u5de5\u55ae',
		LOCATION : '\u4f4d\u7f6e',
		ASSET : '\u8cc7\u7522',
		GLACCOUNT : '\u7e3d\u8cec',
		MRLINES : '\u8acb\u8cfc\u55ae\u884c\u9805\u76ee',
		ENTERDATE : '\u8f38\u5165\u65e5\u671f'
	},
	MRLINE : {
		MRLINEITEM : '\u8acb\u8cfc\u55ae\u9805\u76ee',
		MRLINENUM : '\u884c',
		LINETYPE : '\u884c\u985e\u578b',
		ITEM : '\u9805\u76ee',
		DESCRIPTION : '\u63cf\u8ff0',
		QTY : '\u6578\u91cf',
		ORDERUNIT : '\u8a02\u8cfc\u55ae\u4f4d',
		UNITCOST : '\u55ae\u4f4d\u6210\u672c',
		LINECOST : '\u884c\u6210\u672c',
		REQUIREDDATE : '\u9700\u7528\u65e5\u671f'
	},
	VIEWDR : {
		VIEWSUBMITTED : '\u67e5\u770b\u5df2\u63d0\u4ea4\u8acb\u8cfc\u55ae',
		VIEWSAVED : '\u67e5\u770b\u5df2\u4fdd\u5b58\u8acb\u8cfc\u55ae',
		EDIT : '\u7de8\u8f2f\u8acb\u8cfc\u55ae'
	},
	CREATEDR: {
		SAVEASDRAFT : '\u4fdd\u5b58\u70ba\u8349\u7a3f',
		NEWREQITEM : '\u65b0\u8acb\u8cfc\u55ae\u9805\u76ee',
		SUBMIT : '\u63d0\u4ea4'
	},
	CLASSIFY : {
		CLASSASSET : '\u5c07\u8cc7\u7522\u5206\u985e',
		CLASSWO : '\u5c07\u5de5\u55ae\u5206\u985e',
		DESCRIPTION : '\u5206\u985e\u63cf\u8ff0',
		CLASSIFICATION : '\u5206\u985e'
	}
};