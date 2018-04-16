'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: zh_CN
 */
var locale = 'zh_CN'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: '\u8bbe\u7f6e',
        cancelText: '\u53d6\u6d88',
        clearText: '\u6e05\u9664',
        selectedText: '\u9009\u5b9a',
        // Calender component
        calendarText: '\u65e5\u5386',
        dateText: '\u65e5\u671f',
        timeText: '\u65f6\u95f4',
        // Datetime component
        dateFormat: 'y-m-d',
        dateOrder: 'ymd',
        dayNames: ['\u661f\u671f\u65e5', '\u661f\u671f\u4e00', '\u661f\u671f\u4e8c', '\u661f\u671f\u4e09', '\u661f\u671f\u56db', '\u661f\u671f\u4e94', '\u661f\u671f\u516d'],
        dayNamesShort: ['\u5468\u65e5', '\u5468\u4e00', '\u5468\u4e8c', '\u5468\u4e09', '\u5468\u56db', '\u5468\u4e94', '\u5468\u516d'],
        dayText: '\u65e5',
        hourText: '\u65f6',
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
        nowText: '\u73b0\u5728',
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
		ZERO : 0,
		ONE : 1,
		TWO : 2,
		FEW : "\u5c11",
		MANY : "\u591a",
		OTHER : "\u5176\u4ed6"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "\u4e0a\u5348", "\u4e0a\u5348" ],
			"DAY" : [ "\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d" ],
			"MONTH" : [ "\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708" ],
			"SHORTDAY" : [ "\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d" ],
			"SHORTMONTH" : [ "1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708" ],
			"fullDate" : "y\u5e74M\u6708d\u65e5EEEE",
			"longDate" : "y\u5e74M\u6708d\u65e5",
		    "medium" : "y\u5e74M\u6708d\u65e5 H:m:s",
		    "mediumDate" : "y\u5e74M\u6708d\u65e5",
		    "mediumTime" : "H:m:s",
		    "short" : "yy-M-d H:m:s",
		    "shortDate" : "yy-M-d",
			"shortTime" : "H:m:s"				
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
 * Language: ZH
 */
var lang = 'ZH'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : '\u540c\u6b65\u5b8c\u6210\uff0c\u4f46\u51fa\u73b0\u9519\u8bef\uff01\u4ecd\u53ef\u5c1d\u8bd5\u8131\u673a\u5de5\u4f5c\u3002',
	EMMOF1001W : '\u540c\u6b65\u5b8c\u6210\uff0c\u4f46\u51fa\u73b0\u9519\u8bef\uff01\u8bf7\u518d\u6b21\u540c\u6b65\uff0c\u4ee5\u542f\u7528\u79bb\u7ebf\u6a21\u5f0f\u3002',
	EMMOF1002W : '\u540c\u6b65\u5b8c\u6210\uff0c\u4f46\u51fa\u73b0\u9519\u8bef\uff01\u53ef\u5c1d\u8bd5\u518d\u6b21\u540c\u6b65\u6216\u4fdd\u6301\u8131\u673a\u5de5\u4f5c\u3002',
	EMMOF1003W : '\u540c\u6b65\u5b8c\u6210\uff0c\u4f46\u51fa\u73b0\u9519\u8bef\uff01\u8bf7\u5c1d\u8bd5\u518d\u6b21\u540c\u6b65\uff0c\u4ee5\u4fbf\u8131\u673a\u5de5\u4f5c\u3002',
	EMMOF1004W : '{0}\u5fc5\u987b\u4e3a\u4e00\u4e2a\u6570\u5b57',
	EMMOF1005W : '\u7f3a\u5c11\u5fc5\u586b\u5b57\u6bb5\uff1a{0}',
	EMMOF1006W : '\u5c5e\u6027{0}\u4e3a\u53ea\u8bfb',
	EMMOF1007W : '\u8bf7\u9009\u62e9\u4e00\u4e2a\u503c',
	EMMOF1008I : '\u5df2\u6210\u529f\u66f4\u6539\u72b6\u6001',
	EMMOF1009W : '\u8bf7\u6307\u5b9a\u4e00\u4e2a\u5927\u4e8e0\u7684\u6570\u91cf',
	EMMOF1010W : '{0}\u5fc5\u987b\u5927\u4e8e0',
	EMMOF1011W : '{0}\u4e3a\u5fc5\u586b\u9879',
	EMMOF1012W : '\u6b64\u9879\u76ee\u3001\u4ed3\u5e93\u548c\u8d27\u4f4d\u7ec4\u5408\u4e0d\u5b58\u5728\u4f59\u91cf',
	EMMOF1013W : '\u7531\u4e8e\u6b64\u6b21\u4ea4\u6613\uff0c\u8d27\u4f4d\u4e2d\u7684\u4f59\u91cf\u5c06\u53d8\u4e3a\u8d1f\u503c',
	EMMOF1014W : '\u4f4d\u7f6e\u3001\u8d27\u4f4d\u53f7\u548c\u5730\u70b9\u53f7\u5747\u5b8c\u5168\u76f8\u540c\u65f6\uff0c\u65e0\u6cd5\u8f6c\u79fb',
	// [WF]		
	EMMWF1000I : '\u542f\u52a8\u5de5\u4f5c\u6d41',
	EMMWF1001I : '\u6b64\u5e94\u7528\u7a0b\u5e8f\u6709\u591a\u4e2a\u5de5\u4f5c\u6d41\u7a0b\u53ef\u7528\u3002\u8bf7\u9009\u62e9\u4e00\u4e2a\u5e76\u6309\u4e0b\u786e\u8ba4\u3002',
	EMMWF1002I : '\u8bf7\u9009\u62e9\u4e00\u4e2a\u6d41\u7a0b',
	EMMWF1003I : '\u6d41\u7a0b',
	EMMWF1004I : '\u5907\u5fd8\u5f55',
	EMMWF1005I : '\u505c\u6b62\u5de5\u4f5c\u6d41',
	// [ES]
	EMMES1000I : '\u7535\u5b50\u7b7e\u540d\u6388\u6743',
	EMMES1001I : '\u9700\u63d0\u4f9b\u7535\u5b50\u7b7e\u540d',
	EMMES1002E : '\u6388\u6743\u5931\u8d25',
	EMMES1003I : '\u8bf7\u8f93\u5165\u5bc6\u7801\u548c\u539f\u56e0',
	EMMES1004I : '\u7528\u6237',
	EMMES1005I : '\u5bc6\u7801',
	EMMES1006I : '\u539f\u56e0',
	// [GB]
	EMMGB1001I : '\u7535\u5b50\u90ae\u4ef6',
	EMMGB1002I : '\u89c6\u9891\u901a\u8bdd',
	EMMGB1003I : '\u53d6\u6d88',
	EMMGB1004I : '\u786e\u5b9a',
	EMMGB1005I : '\u786e\u8ba4',
	EMMGB1006I : '\u662f',
	EMMGB1007I : '\u5426',
	EMMGB1008I : '\u7535\u8bdd',
	EMMGB1009I : '\u547c\u53eb',
	EMMGB1010I : '\u77ed\u4fe1',
	EMMGB1011I : '\u786e\u8ba4\u5220\u9664\uff1f',
	EMMGB1012I : '{0}\u5fc5\u987b\u5728{1}\u4e4b\u524d\u53d1\u751f',
	EMMGB1013I : '{0}\u5fc5\u987b\u5728{1}\u4e4b\u540e\u53d1\u751f',
	EMMGB1014I : '{0}\u5fc5\u987b\u5728\u8fc7\u53bb\u53d1\u751f',
	// General	
	OFFLINEMODE : '\u79bb\u7ebf\u6a21\u5f0f',
	SYNCNEEDED : '-- \u5df2\u4fee\u6539\uff0c\u9700\u8fdb\u884c\u540c\u6b65',
	SYNCHRONIZATION : '\u540c\u6b65\u5316',
	SYNCSERVER : '\u4e0e\u670d\u52a1\u5668\u540c\u6b65',
	ENTERLABOR: '\u6309\u4eba\u529b\u8f93\u5165',
	ADDMORE: '\u6dfb\u52a0\u66f4\u591a\u2026\u2026',
	GOONLINE : '\u91cd\u65b0\u4e0a\u7ebf',
	GOTOOFFLINEAPPS : '\u8f6c\u5230\u79bb\u7ebf\u5e94\u7528\u7a0b\u5e8f',
	OFFLINEAPPS : '\u79bb\u7ebf\u5e94\u7528\u7a0b\u5e8f',
	QUICKSCAN : '\u5feb\u901f\u626b\u63cf\uff1a',
	ACTIVEWORKORDERS : '\u6fc0\u6d3b\u72b6\u6001\u5de5\u5355',
	RECORDSAVED: '\u8bb0\u5f55\u5df2\u4fdd\u5b58',
	RECORDNOTSAVED: '\u9519\u8bef - \u65e0\u8fd4\u56de\u8bb0\u5f55',
	TIMERALREADYSTARTED: '\u8ba1\u65f6\u5668\u5df2\u542f\u52a8',
	TIMERNOTFOUND : '\u8ba1\u65f6\u5668\u672a\u542f\u52a8\u3002\u6ca1\u6709\u627e\u5230\u5df2\u542f\u7528\u8ba1\u65f6\u5668\u3002',
	TIMERSTARTED : '\u8ba1\u65f6\u5668\u5df2\u542f\u52a8',
	TIMERSTOPPED : '\u8ba1\u65f6\u5668\u5df2\u505c\u6b62',
	TOOLS : '\u5de5\u5177',
	STARTTIMER : '\u542f\u52a8\u8ba1\u65f6\u5668',
	STOPTIMER : '\u505c\u6b62\u8ba1\u65f6\u5668',
	MODIFYSAVE : '\u8bb0\u5f55\u5df2\u4fee\u6539\u3002\u8bf7\u4fdd\u5b58\u60a8\u7684\u4fee\u6539\u3002',
	SITEREQUIRED : '\u9700\u7ad9\u70b9\u521b\u5efa\u5de5\u5355\u3002',
	NOVALUE : '\u7a7a\u503c',
	ACTIONS : '\u64cd\u4f5c',
	CHILDRENOF : '\u7684\u5b50\u9879',
	RESPONSIBILITY : '\u8d23\u4efb',
	LOOKUP : '\u67e5\u627e',
	LOCATIONDRILLDOWN : '\u4f4d\u7f6e\u94bb\u53d6',
	ASSETDRILLDOWN : '\u8d44\u4ea7\u94bb\u53d6',
	DRILLDOWN : '\u94bb\u53d6',
	BACK : '\u8fd4\u56de',
	SAVE : '\u4fdd\u5b58',
	APPLY : '\u5e94\u7528',
	FILTER : '\u8fc7\u6ee4',
	RESET : '\u91cd\u7f6e',
	SELECTVALUE : '\u9009\u62e9\u503c',
	CANCEL : '\u53d6\u6d88',
	OK : '\u786e\u5b9a',
	YES : '\u662f',
	NO : '\u5426',
	CREATEFOLLOWUP : '\u521b\u5efa\u8ddf\u8fdb',
	CREATESR : '\u521b\u5efa\u65b0\u670d\u52a1\u8bf7\u6c42',
	PARENT : '\u7236\u9879',
	CHANGESTATUS : '\u66f4\u6539\u72b6\u6001',
	LABOR : '\u4eba\u529b',
	MATERIALS : '\u7269\u6599',
	TASKS : '\u4efb\u52a1',
	ATTACHMENTS : '\u9644\u4ef6',
	FAILUREREPORTING : '\u6545\u969c\u62a5\u544a',
	MULTIASSETS : '\u591a\u4e2a\u8d44\u4ea7\u3001\u4f4d\u7f6e',
	ADDNEW : '\u6dfb\u52a0\u65b0\u9879',
	CLASSIFICATION : '\u5206\u7c7b',
	NORECORDS : '\u672a\u627e\u5230\u8bb0\u5f55',
	NORECORDEXIST : '\u672a\u627e\u5230\u8bb0\u5f55\u6216\u8bb0\u5f55\u4e0d\u518d\u5b58\u5728',
	NORECORDSADJ : '\u65e0\u8bb0\u5f55\u6765\u8c03\u6574\u5b9e\u7269\u76d8\u70b9',
	SELECTOWNER : '\u9009\u62e9\u8d1f\u8d23\u4eba',
	OWNER : '\u8d1f\u8d23\u4eba',
	OWNERGROUP : '\u8d1f\u8d23\u4eba\u5c0f\u7ec4',
	TAKEOWNERSHIP : '\u8d1f\u8d23',
	SORTBY : '\u6392\u5e8f\u65b9\u5f0f',
	LIST : '\u5217\u8868',
	QUICKSEARCH: '\u5feb\u901f\u641c\u7d22',
	INVENTORYBYSR : '\u6309\u4ed3\u5e93\u8fdb\u884c\u5e93\u5b58',
	INVDETAILS : '\u5e93\u5b58\u8be6\u60c5',
	NEWCOUNT : '\u65b0\u76d8\u70b9',
	LABORTRANS : '\u4eba\u529b\u4ea4\u6613',
	CREATEWO : '\u521b\u5efa\u65b0\u5de5\u5355',
	MYWOS : '\u6211\u7684\u5de5\u5355',
	FAILUREREPORT : '\u6545\u969c\u62a5\u544a',
	METERREADINGS : '\u8f93\u5165\u4eea\u8868\u8bfb\u6570',
	ASSETMETER : '\u8d44\u4ea7\u4eea\u8868\u8bfb\u6570',
	LOCATIONMETER : '\u4f4d\u7f6e\u4eea\u8868\u8bfb\u6570',
	FROM : '\u81ea',
	TO : '\u81f3',
	ADVANCED : '\u9ad8\u7ea7',
	ADVANCEDSEARCH : '\u9ad8\u7ea7\u641c\u7d22',
	DOWNTIME : '\u505c\u673a\u65f6\u95f4',
	PURCHASEINFO : '\u8d2d\u4e70\u4fe1\u606f',
	SPAREPARTS : '\u5907\u4ef6',
	SCHEDULEINFO : '\u8c03\u5ea6\u4fe1\u606f',
	PLANLABOR : '\u4eba\u529b\u8ba1\u5212',
	PLANMATERIAL : '\u7269\u6599\u8ba1\u5212',
	WOCREATED : '\u5de5\u5355{0}\u5df2\u521b\u5efa\u3002',
	PRESTART : '\u9884\u542f\u52a8',
	REVIEWANDAPPROVE : '\u5ba1\u67e5\u548c\u6279\u51c6',
	MOCACTIONGROUP : '\u9009\u62e9MOC\u64cd\u4f5c\u7ec4',
	MOCACTIONS : '\u9009\u62e9MOC\u64cd\u4f5c',
	REVIEWERSAVED : '\u5ba1\u67e5\u4eba\u5df2\u79bb\u7ebf\u4fdd\u5b58\u3002',
	APPROVERSAVED : '\u6279\u51c6\u4eba\u5df2\u79bb\u7ebf\u4fdd\u5b58\u3002',
	ACTIONSAVED : '\u64cd\u4f5c\u5df2\u79bb\u7ebf\u4fdd\u5b58\u3002',
	NOACTIONS : '\u6807\u51c6\u64cd\u4f5c\u7ec4{0}\u65e0\u6709\u6548\u7684\u6807\u51c6\u64cd\u4f5c\u53ef\u6dfb\u52a0\u3002',
	SRQUEUED : 'SR {0}\u72b6\u6001\u66f4\u6539\u4e3aQUEUED\u3002',
	SELECTREVIEWERS : '\u9009\u62e9\u5ba1\u67e5\u4eba',
	SELECTAPPROVERS : '\u9009\u62e9\u6279\u51c6\u4eba',
	APPROVERS : '\u6279\u51c6\u4eba',
	REVIEWERS : '\u5ba1\u67e5\u4eba',
	VIEWLIST: '\u67e5\u770b\u5217\u8868',
	VIEWSUMMARY : '\u67e5\u770b\u6458\u8981',
	STOREROOMS : '\u4ed3\u5e93',
	REPDOWNTIME: 'Report Downtime',
	GOTO : '\u81f3',
	APPS : '\u5e94\u7528\u7a0b\u5e8f',
	STARTCENTER : '\u5f00\u59cb\u4e2d\u5fc3',
	PAGINATION : {
		TITLE : '\u7b2c {{from}}\u9875\uff0c\u5171  {{to}}\u9875 - {{total}} \u8bb0\u5f55',
		PREV : '\u4e0a\u4e00\u4e2a',
		NEXT : '\u4e0b\u4e00\u4e2a'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : '\u4f4d\u7f6e',
		ASSET : '\u8d44\u4ea7',
		WOTRACK : '\u5de5\u5355\u8ddf\u8e2a',
		SR : '\u670d\u52a1\u8bf7\u6c42',
		INVENTOR: '\u5e93\u5b58',
		INVISSUE: '\u53d1\u51fa\u548c\u8f6c\u79fb',
		MOC : 'MOC (\u6cb9)',
		CREATEDR : '\u521b\u5efa\u8bf7\u8d2d\u5355',
		VIEWDR : '\u67e5\u770b\u8bf7\u8d2d\u5355',
		LABREP: '\u4eba\u529b\u62a5\u544a',
		TXNTRACK : '\u540c\u6b65\u95ee\u9898\u89e3\u51b3'
	},
	// Objects
	ASSET : {
		ASSETNUM : '\u8d44\u4ea7\u53f7 #',
		STATUS : '\u72b6\u6001',
		STATUSDATE: '\u524d\u6b21\u66f4\u52a8\u65e5\u671f',
		INSTALLDATE: '\u5b89\u88c5\u65e5\u671f',
		SITEID : '\u5730\u70b9',
		PARENT : '\u7236\u9879',
		ASSETTYPE: '\u7c7b\u578b',
		LONGDESCRIPTION : '\u8be6\u7ec6\u4fe1\u606f',
		GROUPNAME: '\u4eea\u8868\u7ec4',
		SERIALNUM: '\u5e8f\u5217 #',
		PURCHASEPRICE: '\u8d2d\u4e70\u4ef7\u683c',
		TOTDOWNTIME: '\u603b\u505c\u673a\u65f6\u95f4',
		ISRUNNING: '\u8d44\u4ea7\u8c03\u7528',
		VENDOR: '\u4f9b\u5e94\u5546',
		MANUFACTURER: '\u5236\u9020\u5546',
		FAILURECODE: '\u6545\u969c\u7c7b',
		DESCRIPTION : '\u63cf\u8ff0',
		LOCATION : '\u4f4d\u7f6e',
		LOCDESC : '\u8be6\u7ec6\u4fe1\u606f',
		SEQUENCE : '\u987a\u5e8f',
		PROGRESS : '\u6807\u8bb0\u8fdb\u5ea6?',
		COMMENTS : '\u6ce8\u91ca',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : '\u5de5\u5355\u53f7',
		DESCRIPTION : '\u63cf\u8ff0',
		LONGDESCRIPTION : '\u8be6\u7ec6\u4fe1\u606f',
		STATUS : '\u72b6\u6001',
		PARENT : '\u7236\u5de5\u5355',
		SITEID : '\u5730\u70b9',
		LOCATION : '\u4f4d\u7f6e',
		ASSETNUM : '\u8d44\u4ea7\u53f7',
		WORKTYPE : '\u5de5\u4f5c\u7c7b\u578b',
		WOPRIORITY : '\u4f18\u5148',
		GLACCOUNT : '\u603b\u8d26',
		FAILURECODE : '\u6545\u969c\u7c7b\u4ee3\u7801',
		PROBLEMCODE : '\u95ee\u9898\u4ee3\u7801',
		SUPERVISOR : '\u76d1\u7ba1\u5458',
		CREWID : '\u5168\u4f53\u4eba\u5458',
		LEAD : '\u9886\u5bfc',
		PERSONGROUP : '\u5de5\u4f5c\u7ec4',
		REPORTEDBY : '\u62a5\u544a\u4eba',
		REPORTDATE : '\u62a5\u544a\u65e5\u671f',
		PHONE : '\u7535\u8bdd',
		TASKID : '\u4efb\u52a1\u53f7',
		TARGSTARTDATE : '\u76ee\u6807\u5f00\u59cb\u65e5\u671f',
		TARGCOMPDATE : '\u76ee\u6807\u5b8c\u6210\u65e5\u671f',
		SCHEDSTART : '\u8ba1\u5212\u5f00\u59cb',
		SCHEDFINISH : '\u8ba1\u5212\u5b8c\u6210',
		ACTSTART : '\u5b9e\u9645\u5f00\u59cb',
		ACTFINISH : '\u5b9e\u9645\u5b8c\u6210',
		ASSIGNMENT : '\u5206\u914d\u4eba\u529b',
		OWNER : '\u8d1f\u8d23\u4eba',
		OWNERGROUP : '\u8d1f\u8d23\u4eba\u5c0f\u7ec4',
		OBSERVATION : '\u89c2\u5bdf',
		MEASUREMENTVALUE : '\u6d4b\u5b9a\u503c',
		HAZARDS: '\u5371\u9669',
		HAZARDSMAT: '\u6709\u5bb3\u7269\u8d28',
		PRECAUTIONS: '\u6ce8\u610f\u4e8b\u9879',
		LOCKTAG: '\u9501\u5b9a/\u6807\u51fa',
		TAGOUT: '\u6807\u51fa',
		LOCKOUT: '\u9501\u5b9a',
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
		ITEM : '\u9879\u76ee',
		LINETYPE : '\u884c\u7c7b\u578b',
		QUANTITY : '\u6570\u91cf',
		STOREROOM : '\u4ed3\u5e93',
		STORELOC : '\u4ed3\u5e93',
		BINNUM : '\u8d27\u4f4d',
		CURBAL : '\u5f53\u524d\u4f59\u91cf',
		UNITCOST : '\u5355\u4f4d\u6210\u672c',
		ASSET : '\u8d44\u4ea7',
		WORKORDER : '\u5de5\u5355',
		LOCATION : '\u4f4d\u7f6e',
		ISSUETYPE : '\u9886\u6599\u7c7b\u578b',
		ISSUETO : '\u53d1\u51fa\u81f3',
		ROTASSETNUM : '\u8d44\u4ea7\u8f6c\u6362',
		SITEID : '\u5730\u70b9',
		ISSUERETURN : '\u53d1\u51fa\u548c\u8fd4\u56de',
		CHARGEINFO : '\u8bb0\u8d26\u4fe1\u606f'
	},
	TOOLTRANS : {
		DESCRIPTION : '\u63cf\u8ff0',
		ITEM : '\u9879\u76ee',
		LINETYPE : '\u884c\u7c7b\u578b',
		QUANTITY : '\u6570\u91cf',
		STOREROOM : '\u4ed3\u5e93',
		BINNUM : '\u8d27\u4f4d',
		CURBAL : '\u5f53\u524d\u4f59\u91cf',
		UNITCOST : '\u5355\u4f4d\u6210\u672c',
		ISSUETYPE : '\u9886\u6599\u7c7b\u578b',
		LOCATION : '\u4f4d\u7f6e',
		TOOLRATE : '\u5de5\u5177\u6bd4\u7387',
		ASSETNUM: '\u8d44\u4ea7',
		TOOLHRS: '\u5de5\u5177\u4f7f\u7528\u65f6\u6570',
		LINECOST: '\u884c\u6210\u672c',
		TOOLQTY: '\u5de5\u5177\u6570\u91cf'
	},
	MATRECTRANS : {
		DESCRIPTION : '\u63cf\u8ff0',
		ITEM : '\u9879\u76ee',
		LINETYPE : '\u884c\u7c7b\u578b',
		QUANTITY : '\u6570\u91cf',
		TOSTORELOC : '\u76ee\u6807\u4f4d\u7f6e',
		FROMSTORELOC : '\u8d77\u59cb\u4f4d\u7f6e',
		FROMSITE : '\u8d77\u59cb\u5730\u70b9',
		TOSITE : '\u76ee\u6807\u5730\u70b9',
		TOBIN: '\u76ee\u6807\u8d27\u4f4d',
		FROMBIN: '\u8d77\u59cb\u8d27\u4f4d',
		UNITCOST : '\u5355\u4f4d\u6210\u672c',
		ISSUETYPE : '\u9886\u6599\u7c7b\u578b',
		CONVERSIONFACTOR : '\u6362\u7b97\u56e0\u6570',
		ROTASSETNUM : '\u8d44\u4ea7\u8f6c\u6362',
		TRANSFEROUT : '\u8f6c\u51fa',
		TRANSFERIN : '\u8f6c\u5165',
		FROMQTY : '\u8d77\u59cb\u8d27\u4f4d\u6570\u91cf',
		TOQTY : '\u76ee\u6807\u8d27\u4f4d\u6570\u91cf',
		SITEID : '\u5730\u70b9',
		LOCATION : '\u4f4d\u7f6e',
		TRANSFERDETAILS: '\u8f6c\u79fb\u8be6\u7ec6\u4fe1\u606f'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : '\u8d44\u4ea7',
		LOCATION : '\u4f4d\u7f6e',
		SEQUENCE : '\u987a\u5e8f',
	},
	WORKLOG : {
		NAME : '\u5de5\u4f5c\u65e5\u5fd7',
		DESCRIPTION : '\u63cf\u8ff0',
		DETAILS : '\u8be6\u7ec6\u4fe1\u606f',
		LOGTYPE : '\u7c7b\u578b',
		CREATEBY : '\u521b\u5efa\u8005',
		CREATEDATE : '\u521b\u5efa\u65e5\u671f'
	},
	SR : {
		ACTIVEREQS : '\u5904\u7406\u4e2d\u7684\u670d\u52a1\u8bf7\u6c42',
		NEWREQS : '\u65b0\u670d\u52a1\u8bf7\u6c42',
		AFFECTEDPERSON : '\u6d89\u53ca\u4eba\u5458',
		DETAILS : '\u8be6\u7ec6\u4fe1\u606f',
		GLACCOUNT : '\u603b\u8d26',
		LOCATION : '\u4f4d\u7f6e',
		OWNER : '\u8d1f\u8d23\u4eba',
		OWNERGROUP : '\u8d1f\u8d23\u4eba\u5c0f\u7ec4',
		REPORTEDPRIORITY : '\u62a5\u544a\u91cd\u70b9',
		REPORTEDBY : '\u62a5\u544a\u4eba',
		REPORTDATE : '\u62a5\u544a\u65e5\u671f',
		REPORTEDPHONE : '\u7535\u8bdd\u62a5\u544a',
		REPORTEDEMAIL : '\u7535\u5b50\u90ae\u4ef6\u62a5\u544a',
		SITE : '\u5730\u70b9',
		STATUS : '\u72b6\u6001',
		SR : '\u670d\u52a1\u8bf7\u6c42',
		SUMMARY : '\u6458\u8981',
		ASSETNUM : '\u8d44\u4ea7',
		ASSETSITEID : '\u8d44\u4ea7\u5730\u70b9',
	},
	INVBALANCES : {
		ITEMNUM : '\u9879\u76ee\u53f7',
		DESCRIPTION : '\u63cf\u8ff0',
		BINNUM : '\u8d27\u4f4d\u53f7',
		CURBAL : '\u5f53\u524d\u4f59\u91cf',
		PHYSCNT : '\u5b9e\u7269\u76d8\u70b9\u4f59\u91cf',
		PHYSCNTDATE : '\u5b9e\u7269\u76d8\u70b9\u65e5\u671f',
		RECONCILED : '\u4f59\u91cf\u5df2\u5e73',
		LOCATION : '\u4ed3\u5e93',
	},
	INVENTORY : {
		ITEMNUM : '\u9879\u76ee\u53f7',
		DESCRIPTION : '\u63cf\u8ff0',
		SITEID : '\u5730\u70b9',
		STATUS : '\u72b6\u6001',
		LOCATION : '\u4ed3\u5e93',
		CATEGORY : '\u5e93\u5b58\u5206\u7c7b',
		BINNUM : '\u9ed8\u8ba4\u8d27\u4f4d\u53f7',
		ISSUEUNIT : '\u53d1\u653e\u5355\u4f4d',
		CURBAL : '\u5f53\u524d\u4f59\u91cf',
		LASTISSUEDATE : '\u524d\u6b21\u53d1\u6599\u65e5\u671f',
		ISSUEYTD : '\u5e74\u521d\u81f3\u4eca',
		ISSUE1YRAGO : '\u53bb\u5e74',
		PHYSCNT : '\u5b9e\u7269\u76d8\u70b9',
		PHYSCNTDATE : '\u5b9e\u7269\u76d8\u70b9\u65e5\u671f',
		RECONCILED : '\u4f59\u91cf\u5df2\u5e73',
		TOTALINVPHYBAL : '\u5b9e\u7269\u4f59\u91cf',
		TOTALINVBAL : '\u5f53\u524d\u4f59\u91cf',
		ISSUEHISTORY : '\u53d1\u6599\u5386\u53f2',
		INVBALANCE : '\u5e93\u5b58\u4f59\u91cf',
		ADJCOUNT : '\u4e3a\u8fd9\u4e9b{{\u76d8\u70b9}}\u9879\u76ee\u8c03\u6574\u5b9e\u7269\u76d8\u70b9',
		BALSUMMARY : '\u53ef\u7528\u4f59\u91cf\u6458\u8981',
	},
	METER : {
		ASSETNUM : '\u8d44\u4ea7\u53f7',
		METERNAME : '\u4eea\u8868',
		METERTYPE : '\u4eea\u8868\u7c7b\u578b',
		READINGTYPE : '\u8bfb\u6570\u7c7b\u578b',
		LASTREADING : '\u524d\u6b21\u8bfb\u6570',
		LASTREADINGDATE : '\u524d\u6b21\u8bfb\u6570\u65e5\u671f',
		LASTREADINGINSPECTOR : '\u524d\u6b21\u8bfb\u6570\u68c0\u67e5\u5458',
		READING : '\u65b0\u8bfb\u6570',
		NEWREADINGDATE : '\u65b0\u8bfb\u6570\u65e5\u671f'
	},
	WPLABOR : {
		NAME : '\u4eba\u529b\u8ba1\u5212',
		LABORCODE : '\u4eba\u529b\u4ee3\u7801',
		CRAFT : '\u5de5\u827a',
		QUANTITY : '\u6570\u91cf',
		LABORHRS : '\u6b63\u5e38\u5de5\u4f5c\u65f6\u6570',
		DISPLAYNAME : '\u540d\u79f0',
		SKILLLEVEL: '\u6280\u80fd\u6c34\u5e73',
		VENDOR : '\u4f9b\u5e94\u5546',
		AMCREW : '\u5168\u4f53\u4eba\u5458'
	},		
	WPMATERIAL : {
		NAME : '\u7269\u6599\u8ba1\u5212',
		LINETYPE : '\u7ebf\u578b',
		ITEMNUM : '\u9879\u76ee\u53f7',
		DESCRIPTION : '\u63cf\u8ff0',
		ITEMQTY : '\u6570\u91cf',
		UNITCOST : '\u5355\u4f4d\u6210\u672c',
		STOREROOM : '\u53c2\u8003',
		STORELOCSITE : '\u4ed3\u5e93\u5730\u70b9',
		RESTYPE : '\u9884\u8ba2\u7c7b\u578b',
		REQUIREDATE : '\u9700\u7528\u65e5\u671f'
	},
	LABTRANS : {
		LABORCODE : '\u4eba\u529b',
		CRAFT : '\u5de5\u827a',
		STARTDATE : '\u5f00\u59cb\u65e5\u671f',
		TIMERSTATUS : '\u8ba1\u65f6\u5668\u72b6\u6001',
		REGULARHRS : '\u6b63\u5e38\u5de5\u4f5c\u65f6\u6570',
		PAYRATE: '\u7ed9\u4ed8\u6bd4\u7387',
		PREMIUMPAYCODE : '\u52a0\u73ed\u8865\u8d34\u4ee3\u7801',
		PREMIUMPAYHOURS : '\u52a0\u73ed\u8865\u8d34\u65f6\u6570',
		PREMIUMPAYRATE: '\u52a0\u73ed\u8865\u8d34\u6bd4\u7387',
		WONUM : '\u5de5\u5355',
		LOCATION : '\u4f4d\u7f6e',
		ASSETNUM : '\u8d44\u4ea7',
		TICKETID: '\u7968\u5238'
	},
	LABREP : {
		LABORCODE : '\u4eba\u529b',
		CRAFT : '\u5de5\u827a',
		SKILLLEVEL : '\u6280\u80fd\u6c34\u5e73',
		STARTDATE : '\u5f00\u59cb\u65e5\u671f',
		STARTTIME : '\u5f00\u59cb\u65f6\u95f4',
		FINISHDATE : '\u7ed3\u675f\u65e5\u671f',
		FINISHTIME : '\u7ed3\u675f\u65f6\u95f4',
		REGULARHRS : '\u6b63\u5e38\u5de5\u4f5c\u65f6\u6570',
		PAYRATE : '\u7ed9\u4ed8\u6bd4\u7387',
		TRANSTYPE : '\u7c7b\u578b',
		WONUM : '\u5de5\u5355',
		LOCATION : '\u4f4d\u7f6e',
		ASSETNUM : '\u8d44\u4ea7',
		GENAPPRSERVRECEIPT: '\u5df2\u6279\u51c6',
		NAME: '\u540d\u79f0',
		TIMERSTATUS : '\u8ba1\u65f6\u5668\u72b6\u6001',
		PREMIUMPAYHOURS : '\u52a0\u73ed\u8865\u8d34\u4ee3\u65f6\u6570',
		PREMIUMPAYRATE: '\u52a0\u73ed\u8865\u8d34\u6bd4\u7387',
		PREMIUMPAYCODE : '\u52a0\u73ed\u8865\u8d34\u4ee3\u7801',
		TICKETID: '\u7968\u5238',
		TICKETCLASS: '\u7968\u5238\u7c7b'
	},
	PERSON : {
		PERSONID: '\u4eba\u5458',
		FIRSTNAME: '\u540d\u5b57',
		LASTNAME: '\u59d3\u6c0f'
	},
	FAILURECODE : {
		FAILURECODE : '\u6545\u969c\u7c7b\u4ee3\u7801',
		PROBLEMCODE : '\u95ee\u9898\u4ee3\u7801',
		CAUSECODE : '\u539f\u56e0\u4ee3\u7801',
		REMEDYCODE : '\u8865\u6551\u4ee3\u7801',
	},
	SPAREPART : {
		QUANTITY : '\u6570\u91cf',
		ISSUEDQTY : '\u53d1\u6599\u6570\u91cf',
		REMARKS : '\u5907\u6ce8',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : '\u63cf\u8ff0',
		LONGDESCRIPTION : '\u8be6\u7ec6\u4fe1\u606f',
		ASSET : '\u8d44\u4ea7',
		STATUS : '\u72b6\u6001',
		PARENT : '\u7236\u5de5\u5355',
		SITE : '\u5730\u70b9',
		LOCATION : '\u4f4d\u7f6e',
	},
	DOMAIN : {
		VALUE: '\u503c',
		DESCRIPTION: '\u63cf\u8ff0',
	},
	MR : {
		MRNUM : '\u8bf7\u8d2d\u5355\u53f7',
		DESCRIPTION : '\u63cf\u8ff0',
		LONGDESCRIPTION : '\u957f\u63cf\u8ff0',
		STATUS : '\u72b6\u6001',
		PRIORITY : '\u4f18\u5148',
		CHARGEINFO : '\u8bb0\u8d26\u4fe1\u606f',
		REQUIREDDATE : '\u9700\u7528\u65e5\u671f',
		WONUM : '\u5de5\u5355',
		LOCATION : '\u4f4d\u7f6e',
		ASSET : '\u8d44\u4ea7',
		GLACCOUNT : '\u603b\u8d26',
		MRLINES : '\u8bf7\u8d2d\u5355\u884c\u9879\u76ee',
		ENTERDATE : '\u8f93\u5165\u65e5\u671f'
	},
	MRLINE : {
		MRLINEITEM : '\u8bf7\u8d2d\u5355\u9879\u76ee',
		MRLINENUM : '\u884c',
		LINETYPE : '\u884c\u7c7b\u578b',
		ITEM : '\u9879\u76ee',
		DESCRIPTION : '\u63cf\u8ff0',
		QTY : '\u6570\u91cf',
		ORDERUNIT : '\u8ba2\u8d2d\u5355\u4f4d',
		UNITCOST : '\u5355\u4f4d\u6210\u672c',
		LINECOST : '\u884c\u6210\u672c',
		REQUIREDDATE : '\u9700\u7528\u65e5\u671f'
	},
	VIEWDR : {
		VIEWSUBMITTED : '\u67e5\u770b\u5df2\u63d0\u4ea4\u8bf7\u8d2d\u5355',
		VIEWSAVED : '\u67e5\u770b\u5df2\u4fdd\u5b58\u8bf7\u8d2d\u5355',
		EDIT : '\u7f16\u8f91\u8bf7\u8d2d\u5355'
	},
	CREATEDR: {
		SAVEASDRAFT : '\u4fdd\u5b58\u4e3a\u8349\u7a3f',
		NEWREQITEM : '\u65b0\u8bf7\u8d2d\u5355\u9879\u76ee',
		SUBMIT : '\u63d0\u4ea4'
	},
	CLASSIFY : {
		CLASSASSET : '\u5c06\u8d44\u4ea7\u5206\u7c7b',
		CLASSWO : '\u5c06\u5de5\u5355\u5206\u7c7b',
		DESCRIPTION : '\u5206\u7c7b\u63cf\u8ff0',
		CLASSIFICATION : '\u5206\u7c7b'
	}
};