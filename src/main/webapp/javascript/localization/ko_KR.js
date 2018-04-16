'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: ko_KR
 */
var locale = 'ko_KR'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: '\uc124\uc815',
        cancelText: '\ucde8\uc18c',
        clearText: '\uc81c\uac70',
        selectedText: '\ud604\uc7ac \uc120\ud0dd',
        // Calender component
        calendarText: '\uc77c\ub825.',
        dateText: '\ub0a0\uc9dc',
        timeText: '\uc2dc\uac04\u95f4',
        // Datetime component
        dateFormat: 'y. m. d',
        dateOrder: 'ymd',
        dayNames: ['\uc77c\uc694\uc77c', '\uc6d4\uc694\uc77c', '\ud654\uc694\uc77c', '\uc218\uc694\uc77c', '\ubaa9\uc694\uc77c', '\uae08\uc694\uc77c', '\ud1a0\uc694\uc77c'],
        dayNamesShort: ['\uc77c\uc694\uc77c', '\uc6d4\uc694\uc77c', '\ud654\uc694\uc77c', '\uc218\uc694\uc77c', '\ubaa9\uc694\uc77c', '\uae08\uc694\uc77c', '\ud1a0\uc694\uc77c'],
        dayText: '\uc77c',
        hourText: '\uc2dc',
        minuteText: '\ubd84',
        monthNames: ['\uc77c\uc6d4', '\uc774\uc6d4', '\uc0bc\uc6d4', '\uc0ac\uc6d4', '\uc624\uc6d4', '\uc720\uc6d4', '\uce60\uc6d4', '\ud314\uc6d4', '\uad6c\uc6d4', '\uc2dc\uc6d4', '\uc2ed\uc77c\uc6d4', '\uc2ed\uc774\uc6d4'],
        monthNamesShort: ['\uc77c\uc6d4', '\uc774\uc6d4', '\uc0bc\uc6d4', '\uc0ac\uc6d4', '\uc624\uc6d4', '\uc720\uc6d4', '\uce60\uc6d4', '\ud314\uc6d4', '\uad6c\uc6d4', '\uc2dc\uc6d4', '\uc2ed\uc77c\uc6d4', '\uc2ed\uc774\uc6d4'],
        monthText: '\uc6d4',
        secText: '\ucd08',
        amText: '\uc624\uc804',
        pmText: '\uc624\ub8e8',
        timeFormat: 'HH:ii:ss',
        timeWheels: 'HHiiss',
        yearText: '\ub144',
        nowText: '\ud604\uc7ac',
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
	        symbol: '\u20a9'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : 0,
		ONE : 1,
		TWO : 2,
		FEW : "\uc801\ub2e4",
		MANY : "\ub9ce\ub2e4",
		OTHER : "\uae30\ud0c0"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "\uc624\uc804", "\uc624\ud6c4" ],
			"DAY" : [ "\uc77c\uc694\uc77c", "\uc6d4\uc694\uc77c", "\ud654\uc694\uc77c", "\uc218\uc694\uc77c", "\ubaa9\uc694\uc77c", "\uae08\uc694\uc77c", "\ud1a0\uc694\uc77c" ],
			"MONTH" : [ "1\uc6d4","2\uc6d4","3\uc6d4","4\uc6d4","5\uc6d4","6\uc6d4","7\uc6d4","8\uc6d4","9\uc6d4","10\uc6d4","11\uc6d4","12\uc6d4" ],
			"SHORTDAY" : [ "\uc77c", "\uc6d4", "\ud654", "\uc218", "\ubaa9", "\uae08", "\ud1a0" ],
			"SHORTMONTH" : [ "1\uc6d4","2\uc6d4","3\uc6d4","4\uc6d4","5\uc6d4","6\uc6d4","7\uc6d4","8\uc6d4","9\uc6d4","10\uc6d4","11\uc6d4","12\uc6d4" ],
			"fullDate" : "y\ub144 M\uc6d4 d\uc77c EEEE",
			"longDate" : "y\ub144 M\uc6d4 d\uc77c",
			"medium" : "y. M. d. HH:mm:ss",
		    "mediumDate" : "y. M. d.",
		    "mediumTime" : "HH:mm:ss",
		    "short" : "yy. M. d HH:mm:ss",
		    "shortDate" : "yy. M. d",
		    "shortTime" : "HH:mm:ss"		
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "\u20a9",
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
 * Language: KO
 */
var lang = 'KO'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : '\ub3d9\uae30\uc644\ub8cc,\ud558\uc9c0\ub9cc \uc624\ub958 \ubc1c\uc0dd! \uacc4\uc18d \uc624\ud504\ub77c\uc778 \uc0c1\ud0dc\ub85c \uc804\ud658\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',
	EMMOF1001W : '\ub3d9\uae30\uc644\ub8cc,\ud558\uc9c0\ub9cc \uc624\ub958 \ubc1c\uc0dd! \ub2e4\uc2dc\ud55c\ubc88 \ub3d9\uae30,\uc774\ubbf8 \uc624\ud504\ub77c\uc778 \ubaa8\ub378\uc744 \uc2dc\uc791\ud588\uc2b5\ub2c8\ub2e4.',
	EMMOF1002W : '\ub3d9\uae30\ud654\uc644\ub8cc,\ud558\uc9c0\ub9cc \uc624\ub958 \ubc1c\uc0dd! \ub2e4\uc2dc\ud55c\ubc88 \ub3d9\uae30\ub97c \uc2dc\ub3c4\ud558\uc2dc\uac70\ub098  \uc628\ub77c\uc778 \uc791\uc5c5\uc744 \uc720\uc9c0\ud558\uc138\uc694.',
	EMMOF1003W : '\ub3d9\uae30\ud654\uc644\ub8cc,\ud558\uc9c0\ub9cc \uc624\ub958 \ubc1c\uc0dd! \uc624\ud504\ub77c\uc778 \uc791\uc5c5 \ud3b8\ub9ac\ud654\ub97c \uc704\ud574 \ub2e4\uc2dc\ud55c\ubc88 \ub3d9\uae30\ub97c \uc2dc\ub3c4\ud558\uc138\uc694.',
	EMMOF1004W : '{0}\uc740(\ub294)\uc22b\uc790\uc5ec\uc57c \ud569\ub2c8\ub2e4',
	EMMOF1005W : '\ud544\uc218 \uc785\ub825 \ud544\ub4dc{0}',
	EMMOF1006W : '\uc18d\uc131{0}\uc740 \uc77d\uae30 \uc804\uc6a9',
	EMMOF1007W : '\uc218\uce58 \ud558\ub098\ub97c \uc120\ud0dd\ud574 \uc8fc\uc138\uc694.',
	EMMOF1008I : '\uc0c1\ud0dc\ubcc0\uacbd \uc131\uacf5',
	EMMOF1009W : '0\ubcf4\ub2e4 \ud070 \uc218\ub7c9\uc744 \uc9c0\uc815\ud558\uc138\uc694.',
	EMMOF1010W : '{0}\uc740 \ubc18\ub4dc\uc2dc 0\ubcf4\ub2e4 \ucee4\uc57c \ud568.',
	EMMOF1011W : '{0}\uc740 \ud544\uc218 \uc785\ub825\ud56d ',
	EMMOF1012W : '\ubcf8 \ud56d\ubaa9,\ucc3d\uace0\ubc0f \ud654\ubb3c\uc7a5 \uc870\ud569\uc740 \uc794\uace0\uac00 \uc5c6\ub2e4',
	EMMOF1013W : '\ubcf8 \uac70\ub798\ub85c \uc778\ud574 \ud654\ubb3c\uc7a5\uc911\uc758 \uc794\uace0\ub294  \ub9c8\uc774\ub108\uc2a4\ub85c \ubcc0\ud568.  ',
	EMMOF1014W : '\uc704\uce58,\ud654\ubb3c\uc7a5\ubc88\ud638\ubc0f \uc9c0\uc810\ubc88\ud638\ub294 \uc644\uc804 \ub3d9\uc77c\ud558\uc5ec \uc62e\uae38\uc218 \uc5c6\ub2e4.',
	// [WF]		
	EMMWF1000I : '\uc6cc\ud06c\ud50c\ub85c \uc2dc\uc791 ',
	EMMWF1001I : '\uc774 \ud504\ub85c\uadf8\ub7a8\uc740 \ub354\ub9ce\uc740  \ud504\ub85c\uadf8\ub7a8\uc5d0 \uc751\uc6a9\ud560\uc218 \uc788\uc2b5\ub2c8\ub2e4.\ud558\ub098\ub97c \uc120\ud0dd\ud574\uc11c \ud655\uc778\uc744 \ud074\ub9ad\ud558\uc2ed\uc2dc\uc624.',
	EMMWF1002I : '\ud55c \ud504\ub85c\uadf8\ub7a8\uc744 \uc120\ud0dd\ud558\uc138\uc694.',
	EMMWF1003I : '\ud504\ub85c\uadf8\ub7a8',
	EMMWF1004I : '\uba54\ubaa8',
	EMMWF1005I : '\uc6cc\ud06c\ud50c\ub85c \uc815\uc9c0 ',
	// [ES]
	EMMES1000I : '\uc804\uc790 \uc11c\uba85 \uc778\uc99d',
	EMMES1001I : '\uc804\uc790 \uc11c\uba85\uc744 \uc81c\uacf5\ud574\uc57c \ub429\ub2c8\ub2e4',
	EMMES1002E : '\uc778\uc99d \uc2e4\ud328',
	EMMES1003I : '\ube44\ubc00\ubc88\ud638\uc640 \uc6d0\uc778\uc744 \uc785\ub825\ud558\uc138\uc694.',
	EMMES1004I : '\uc0ac\uc6a9\uc790',
	EMMES1005I : '\ube44\ubc00\ubc88\ud638',
	EMMES1006I : '\uc6d0\uc778',
	// [GB]
	EMMGB1001I : '\uc774\uba54\uc77c',
	EMMGB1002I : '\uc601\uc0c1\ud1b5\ud654',
	EMMGB1003I : '\ucde8\uc18c',
	EMMGB1004I : '\ud655\uc778',
	EMMGB1005I : '\ud655\uc778',
	EMMGB1006I : '\uc608',
	EMMGB1007I : '\uc544\ub2c8\uc694',
	EMMGB1008I : '\uc804\ud654',
	EMMGB1009I : '\ud638\ucd9c',
	EMMGB1010I : '\uba54\uc2dc\uc9c0',
	EMMGB1011I : '\uc0ad\uc81c \ud560\uae4c\uc694?',
	EMMGB1012I : '{0}\uc740{1}\uc804\uc5d0 \ubc1c\uc0dd\ud574\uc57c \ub429\ub2c8\ub2e4',
	EMMGB1013I : '{0}\uc740{2}\ud6c4\uc5d0 \ubc1c\uc0dd\ud574\uc57c \ub429\ub2c8\ub2e4',
	EMMGB1014I : '{0}\uc740\uacfc\uac70\uc5d0 \ubc1c\uc0dd\ud574\uc57c \ub429\ub2c8\ub2e4',
	// General	
	OFFLINEMODE : '\uc624\ud504\ub77c\uc778 \ubaa8\ub4dc',
	SYNCNEEDED : '\uc774\ubbf8 \uc218\uc815,\ub3d9\uae30\ud654 \uc9c4\ud589 \ud544\uc218',
	SYNCHRONIZATION : '\ub3d9\uae30\ud654',
	SYNCSERVER : '\uc11c\ubc84\uc640 \ub3d9\uae30\ud654',
	ENTERLABOR: '\uc778\ub825\uc73c\ub85c \uc785\ub825',
	ADDMORE: '\ucd94\uac00',
	GOONLINE : '\ub2e4\uc2dc\uc628\ub77c\uc778',
	GOTOOFFLINEAPPS : ' \uc624\ud504\ub77c\uc778 \ud504\ub85c\uadf8\ub7a8\uc73c\ub85c \uc774\ub3d9',
	OFFLINEAPPS : ' \uc624\ud504\ub77c\uc778 \ud504\ub85c\uadf8\ub7a8',
	QUICKSCAN : '\ube60\ub978 \uc2a4\uce94',
	ACTIVEWORKORDERS : '\uc791\uc5c5 \uba85\uc138\uc11c\uc0c1\ud0dc \ud65c\uc131',
	RECORDSAVED: '\ub808\ucf54\ub4dc \uc800\uc7a5\ub428',
	RECORDNOTSAVED: '\uc624\ub958-\ub418\ub3cc\uc544\uc624\ub294 \uae30\ub85d\uc774 \uc5c6\uc74c',
	TIMERALREADYSTARTED: '\ud0c0\uc774\uba38 \uc774\ubbf8 \uc2dc\uc791\ub418\uc5c8\uc2b5\ub2c8\ub2e4',
	TIMERNOTFOUND : '\ud0c0\uc774\uba38 \uc2dc\uc791\ud558\uc9c0 \uc54a\uc74c.\ud65c\uc131\ud654\ub41c \ud0c0\uc774\uba38\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.',
	TIMERSTARTED : '\ud0c0\uc774\uba38 \uc774\ubbf8 \uc2dc\uc791',
	TIMERSTOPPED : '\ud0c0\uc774\uba38 \uc774\ubbf8 \uc815\uc9c0',
	TOOLS : '\ub3c4\uad6c',
	STARTTIMER : '\ud0c0\uc774\uba38 \uc2a4\ud0c0\ud2b8',
	STOPTIMER : '\ud0c0\uc774\uba38 \uc815\uc9c0',
	MODIFYSAVE : '\uae30\ub85d\uc774 \uc218\uc815\ub418\uc600\uc2b5\ub2c8\ub2e4.\uc218\uc815\ud55c \uac83\uc744 \ubcf4\uc874\ud558\uc138\uc694.',
	SITEREQUIRED : '\uc0ac\uc774\ud2b8 \uc0dd\uc131\uc5d0  \ud544\uc694\ud55c \uc791\uc5c5\uba85\uc138\uc11c',
	NOVALUE : '\ube48 \uc218\uce58',
	ACTIONS : '\uc561\uc158',
	CHILDRENOF : '\uc758 \ud558\uc704\ud56d\ubaa9',
	RESPONSIBILITY : '\ucc45\uc784',
	LOOKUP : '\ucc3e\uae30',
	LOCATIONDRILLDOWN : '\uc704\uce58 \ub4dc\ub9b4',
	ASSETDRILLDOWN : '\uc790\uc0b0 \ub4dc\ub9b4',
	DRILLDOWN : '\ub4dc\ub9b4',
	BACK : '\ub4a4\ub85c',
	SAVE : '\ubcf4\uc874',
	APPLY : '\uc751\uc6a9',
	FILTER : '\ud544\ud130',
	RESET : '\ucd08\uae30\ud654',
	SELECTVALUE : '\uc218\uce58 \uc120\ud0dd',
	CANCEL : '\ucde8\uc18c',
	OK : '\ud655\uc778',
	YES : '\uc608',
	NO : '\uc544\ub2c8\uc694',
	CREATEFOLLOWUP : '\ud6c4\uc18d \uc870\uce58 \uc0dd\uc131',
	CREATESR : '\uc0c8\ub85c\uc6b4 \uc11c\ube44\uc2a4\ub97c \uc791\uc131',
	PARENT : '\uc0c1\uc704 \ud56d\ubaa9',
	CHANGESTATUS : '\uc0c1\ud0dc \ubcc0\uacbd',
	LABOR : '\uc778\ub825',
	MATERIALS : '\uc790\uc7ac',
	TASKS : '\uc784\ubb34',
	ATTACHMENTS : '\ucca8\ubd80 \ud30c\uc77c',
	FAILUREREPORTING : '\uace0\uc7a5 \ubcf4\uace0',
	MULTIASSETS : '\ub2e4\uc911 \uc790\uc0b0, \uc704\uce58 \uc9c0\uc815',
	ADDNEW : '\uc0c8 \ud56d\ubaa9 \ucd94\uac00',
	CLASSIFICATION : '\ubd84\ub958',
	NORECORDS : '\uae30\ub85d\uc744 \ucc3e\uc9c0 \ubabb\ud568',
	NORECORDEXIST : '\uae30\ub85d\uc744 \ucc3e\uc9c0 \ubabb\ud568 \ud639\uc740 \uae30\ub85d\uc774 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc74c',
	NORECORDSADJ : '\ubb3c\ub9ac\uc801 \uce74\uc6b4\ud2b8\ub97c \uc870\uc815\ud560 \ub808\ucf54\ub4dc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.',
	SELECTOWNER : '\ucc45\uc784\uc790 \uc120\ud0dd',
	OWNER : '\ucc45\uc784\uc790',
	OWNERGROUP : '\ucc45\uc784\uc790 \uadf8\ub8f9',
	TAKEOWNERSHIP : '\ucc45\uc784',
	SORTBY : '\ubc30\ub82c\ubc29\uc2dd',
	LIST : '\ub9ac\uc2a4\ud2b8',
	QUICKSEARCH: '\ube60\ub978 \uac80\uc0c9',
	INVENTORYBYSR : '\ucc3d\uace0\uc5d0 \ub530\ub77c \uc7ac\uace0 \uc815\ub9ac',
	INVDETAILS : '\uc7ac\uace0 \uc0c1\uc138 \ub0b4\uc5ed',
	NEWCOUNT : '\uc0c8\ub85c \uc810\uac80\ud558\ub2e4',
	LABORTRANS : '\uc778\ub825\uac70\ub798',
	CREATEWO : '\uc0c8\ub85c\uc6b4 \uc791\uc5c5\uba85\uc138\uc11c \uc791\uc131',
	MYWOS : '\ub098\uc758 \uc791\uc5c5 \uba85\uc138\uc11c',
	FAILUREREPORT : '\uace0\uc7a5 \ubcf4\uace0',
	METERREADINGS : '\ubbf8\ud130 \ud310\ub3c5\uce58 \uc785\ub825',
	ASSETMETER : '\uc790\uc0b0 \uacc4\uae30 \uc218\uce58',
	LOCATIONMETER : '\uc704\uce58 \uacc4\uae30\uc218\uce58',
	FROM : '\ubc1c\uc2e0',
	TO : '\uc218\uc2e0',
	ADVANCED : '\uace0\uae09',
	ADVANCEDSEARCH : '\uace0\uae09 \uac80\uc0c9',
	DOWNTIME : '\ub2e4\uc6b4 \ud0c0\uc784',
	PURCHASEINFO : '\uad6c\ub9e4 \uc815\ubcf4',
	SPAREPARTS : '\uc2a4\ud398\uc5b4 \ubd80\ud488',
	SCHEDULEINFO : '\uc77c\uc815\uad00\ub9ac \uc815\ubcf4',
	PLANLABOR : '\uc778\ub825 \uacc4\ud68d',
	PLANMATERIAL : '\ubb3c\ub8cc\uacc4\ud68d',
	WOCREATED : '\uc791\uc5c5 \uba85\uc138\uc11c{0}\uc0dd\uc131',
	PRESTART : '\ud504\ub9ac \uc2a4\ud0c0\ud2b8',
	REVIEWANDAPPROVE : '\uc2ec\uc0ac \ubc0f \ube44\uc900',
	MOCACTIONGROUP : 'MOC\uc870\uc791\uc138\ud2b8\uc120\ud0dd',
	MOCACTIONS : 'MOC\uc870\uc791 \uc120\ud0dd',
	REVIEWERSAVED : '\uc2ec\uc0ac\uc778\uc740 \uc624\ud504\ub77c\uc778\uc0c1\ud0dc\ub85c \ubcf4\uc874\ud568.',
	APPROVERSAVED : '\ube44\uc900\uc778\uc740 \uc624\ud504\ub77c\uc789 \uc0c1\ud0dc\ub85c \ubcf4\uc874\ud568.',
	ACTIONSAVED : '\uc561\uc158\uc740 \uc624\ud504\ub77c\uc778\uc0c1\ud0dc\ub85c \ubcf4\uc874\ud568',
	NOACTIONS : '\ud45c\uc900 \uc870\uc791\uc138\ud2b8{0}\uc5d0 \uc720\ud6a8 \ucd94\uac00\ud560\uc218\uc788\ub294 \ud45c\uc900 \uc870\uc791\uc774 \uc5c6\uc74c',
	SRQUEUED : 'SR {0}\ub97c QUEUED \ubcc0\uacbd.',
	SELECTREVIEWERS : '\uc2ec\uc0ac\uc778 \uc120\ud0dd',
	SELECTAPPROVERS : '\ube44\uc900\uc778 \uc120\ud0dd',
	APPROVERS : '\ube44\uc900\uc778',
	REVIEWERS : '\uc2ec\uc0ac\uc778',
	VIEWLIST: '\ub9ac\uc2a4\ud2b8 \ubcf4\uae30',
	VIEWSUMMARY : '\uac1c\uc694 \ubcf4\uae30',
	STOREROOMS : '\ucc3d\uace0',
	REPDOWNTIME: 'Report Downtime',
	GOTO : '\uac00\uae30',
	APPS : '\uc751\uc6a9 \ud504\ub85c\uadf8\ub7a8',
	STARTCENTER : '\uc2dc\uc791\uc13c\ud130',
	PAGINATION : {
		TITLE : '\uc81c {{from}}\ud398\uc9c0, \ucd1d  {{to}}\ud398\uc9c0 - {{total}} \uae30\ub85d\uc774',
		PREV : '\uc774\uc804',
		NEXT : '\ub2e4\uc74c'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : '\uc704\uce58',
		ASSET : '\uc790\uc0b0',
		WOTRACK : '\uc791\uc5c5\uba85\uc138\uc11c \ucde8\uc801',
		SR : '\uc11c\ube44\uc2a4 \uc2e0\uccad',
		INVENTOR: '\uc7ac\uace0',
		INVISSUE: '\uc7ac\uace0\uacf5\uae09',
		MOC : 'MOC (\uae30\ub984)',
		CREATEDR : '\uad6c\ub9e4 \uccad\uad6c\uc11c \uc791\uc131',
		VIEWDR : '\uad6c\ub9e4 \uccad\uad6c\uc11c \ubcf4\uae30',
		LABREP: '\uc778\ub825\ubcf4\uace0',
		TXNTRACK : '\ub3d9\uae30\ud654 \ubb38\uc81c \ud574\uacb0'
	},
	// Objects
	ASSET : {
		ASSETNUM : '\uc790\uc0b0 \ubc88\ud638 #',
		STATUS : '\uc0c1\ud0dc',
		STATUSDATE: '\uc9c0\ub09c\ubc88 \ubcc0\ub3d9 \ub0a0\uc9dc',
		INSTALLDATE: '\uc124\uce58 \ub0a0\uc9dc',
		SITEID : '\uc9c0\uc810',
		PARENT : '\uc0c1\uc704\ud56d\ubaa9',
		ASSETTYPE: '\ud615\uc2dd',
		LONGDESCRIPTION : '\uc790\uc138\ud55c \uc815\ubcf4',
		GROUPNAME: '\uadf8\ub8f9 \uc774\ub984',
		SERIALNUM: '\uc11c\uc5f4 #',
		PURCHASEPRICE: '\uad6c\ub9e4 \uac00\uaca9',
		TOTDOWNTIME: '\ucd1d \ub2e4\uc6b4 \ud0c0\uc784',
		ISRUNNING: '\uc790\uc0b0\uc804\uc6a9',
		VENDOR: '\uacf5\uae09\uc790',
		MANUFACTURER: '\uc81c\uc870\uc5c5\uccb4',
		FAILURECODE: '\uace0\uc7a5\ub958',
		DESCRIPTION : '\ubb18\uc0ac',
		LOCATION : '\uc704\uce58',
		LOCDESC : '\uc0c1\uc138\uc815\ubcf4',
		SEQUENCE : '\uc21c\uc11c',
		PROGRESS : '\ubc1c\uc804',
		COMMENTS : '\uc8fc\uc11d',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : '\uc791\uc5c5\uba85\uc138\uc11c \ubc88\ud638',
		DESCRIPTION : '\ubb18\uc0ac',
		LONGDESCRIPTION : '\uc0c1\uc138\ud55c \uc815\ubcf4',
		STATUS : '\uc0c1\ud0dc\u6001',
		PARENT : '\uc0c1\uc704 \uc791\uc5c5\uba85\uc138\uc11c',
		SITEID : '\uc9c0\uc810',
		LOCATION : '\uc704\uce58',
		ASSETNUM : '\uc790\uc0b0\ubc88\ud638',
		WORKTYPE : '\uadfc\ubb34 \uc720\ud615',
		WOPRIORITY : '\uc6b0\uc120\uc21c\uc704',
		GLACCOUNT : '\ucd1d\uc7a5\ubd80',
		FAILURECODE : '\uace0\uc7a5 \ud074\ub798\uc2a4 \ucf54\ub4dc',
		PROBLEMCODE : '\uc758\ubb38\ucf54\ub4dc',
		SUPERVISOR : '\uac10\uc2dc \uad00\ub9ac\uc6d0',
		CREWID : '\uc804\uccb4\uc778\uc6d0',
		LEAD : '\ub839\ub3c4',
		PERSONGROUP : '\uadfc\ubb34\ud300',
		REPORTEDBY : '\ubcf4\uace0\uc778',
		REPORTDATE : '\ubcf4\uace0\ub0a0\uc9dc',
		PHONE : '\uc804\ud654',
		TASKID : '\ud0dc\uc2a4\ud06c \uc544\uc774\ub514',
		TARGSTARTDATE : '\ubaa9\ud45c \uac1c\uc2dc \uc77c\uc790',
		TARGCOMPDATE : '\ubaa9\ud45c \uc644\ub8cc \uc77c\uc790',
		SCHEDSTART : '\uc2a4\ucf00\uc904 \uc2dc\uc791',
		SCHEDFINISH : '\uc2a4\ucf00\uc904 \uc644\ub8cc',
		ACTSTART : '\uc2e4\uc81c\ub85c \uc2dc\uc791',
		ACTFINISH : '\uc2e4\uc81c\uc644\ub8cc',
		ASSIGNMENT : '\uc778\ub825 \ubd84\ubc30',
		OWNER : '\ucc45\uc784\uc790',
		OWNERGROUP : '\ucc45\uc784\uc790 \ud300',
		OBSERVATION : '\uad00\ucc30',
		MEASUREMENTVALUE : '\uce21\uc815\uc218\uce58',
		HAZARDS: '\uc704\ud5d8',
		HAZARDSMAT: '\uc720\ud574\ubb3c\uc9c8',
		PRECAUTIONS: '\uc8fc\uc758\uc0ac\ud56d',
		LOCKTAG: '\uc7a0\uae08/\ud45c\uc2dc',
		TAGOUT: '\ud45c\uc2dc',
		LOCKOUT: '\uc7a0\uae08',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : '\ubb18\uc0ac',
		ITEM : '\ud56d\ubaa9',
		LINETYPE : '\uc720\ud615\ubcc4',
		QUANTITY : '\uc218\ub7c9',
		STOREROOM : '\ucc3d\uace0',
		STORELOC : '\ucc3d\uace0',
		BINNUM : '\ud654\ubb3c\uc790\ub9ac',
		CURBAL : '\ud604\uc7ac\uc794\uace0',
		UNITCOST : '\ub2e8\uc704\uc6d0\uac00',
		ASSET : '\uc790\uc0b0',
		WORKORDER : '\uc791\uc5c5\uba85\uc138\uc11c',
		LOCATION : '\uc704\uce58',
		ISSUETYPE : '\uc2a4\ud53c\ub4dc \uba54\ud0c0 \ud615\uc2dd',
		ISSUETO : '\ubc1c\uc1a1\uc9c0',
		ROTASSETNUM : '\uc790\uc0b0\uc800\ud658',
		SITEID : '\uc9c0\uc810',
		ISSUERETURN : '\ubc1c\uc1a1\ubc0f \ub418\ub3cc\uc544\uac00\ub2e4',
		CHARGEINFO : '\uc7a5\ubd80 \uc815\ubcf4'
	},
	TOOLTRANS : {
		DESCRIPTION : '\ubb18\uc0ac',
		ITEM : '\ud56d\ubaa9',
		LINETYPE : '\uc720\ud615\ubcc4',
		QUANTITY : '\uc218\ub7c9',
		STOREROOM : '\ucc3d\uace0',
		BINNUM : '\ud654\ubb3c\uc790',
		CURBAL : '\ud604\uc7ac\uc794\uace0',
		UNITCOST : '\ub2e8\uc704\uc6d0\uac00',
		ISSUETYPE : '\uc2a4\ud53c\ub4dc \uba54\ud0c0 \ud615\uc2dd',
		LOCATION : '\uc704',
		TOOLRATE : '\ub3c4\uad6c\ube44\uc728',
		ASSETNUM: '\uc790\uc0b0',
		TOOLHRS: '\ub3c4\uad6c\uc0ac\uc6a9 \uc2dc\uac04\uc218\uce58',
		LINECOST: '\ud589 \ub2e8\uac00',
		TOOLQTY: '\ub3c4\uad6c\uc218\ub7c9'
	},
	MATRECTRANS : {
		DESCRIPTION : '\ubb18\uc0ac',
		ITEM : '\ud56d\ubaa9',
		LINETYPE : '\uc720\ud615\ubcc4',
		QUANTITY : '\uc218\ub7c9',
		TOSTORELOC : '\ubaa9\ud45c\uc704\uce58',
		FROMSTORELOC : '\uc2dc\uc791\uc704\uce58',
		FROMSITE : '\uc2dc\uc791\uc9c0\uc810',
		TOSITE : '\ubaa9\ud45c\uc9c0\uc810',
		TOBIN: '\ubaa9\ud45c \ud654\ubb3c\uc790\ub9ac',
		FROMBIN: '\uc2dc\uc791 \ud654\ubb3c\uc790\ub9ac',
		UNITCOST : '\ub2e8\uc704\uc6d0\uac00',
		ISSUETYPE : '\uc2a4\ud53c\ub4dc \uba54\ud0c0 \ud615\uc2dd',
		CONVERSIONFACTOR : '\ud658\uc0b0 \uacc4\uc218',
		ROTASSETNUM : '\uc790\uc0b0\uc804\ud658',
		TRANSFEROUT : '\uc804\ucd9c',
		TRANSFERIN : '\uc804\uc785',
		FROMQTY : '\uc2dc\uc791 \ud654\ubb3c\uc790\ub9ac\uc218\ub7c9',
		TOQTY : '\ubaa9\ud45c\ud654\ubb3c\uc790\ub9ac\uc218\ub7c9',
		SITEID : '\uc9c0\uc810',
		LOCATION : '\uc704\uce58',
		TRANSFERDETAILS: '\uc0c1\uc138\uc815\ubcf4 \uc804\uc758'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : '\uc790\uc0b0',
		LOCATION : '\uc704\uce58',
		SEQUENCE : '\uc21c\uc11c',
	},
	WORKLOG : {
		NAME : '\uba54\ubaa8\uc77c\uc9c0',
		DESCRIPTION : '\ubb18\uc0ac',
		DETAILS : '\uc0c1\uc138\uc815\ubcf4',
		LOGTYPE : '\uc720\ud615',
		CREATEBY : '\uc124\ub9bd\uc790',
		CREATEDATE : '\uc124\ub9bd\ub0a0\uc9dc'
	},
	SR : {
		ACTIVEREQS : '\ucc98\ub9ac\uc911\uc778 \uc11c\ube44\uc2a4 \uc2e0\uccad',
		NEWREQS : '\uc0c8\ub85c\uc6b4 \uc12d\uc2a4 \uc2e0\uccad',
		AFFECTEDPERSON : '\uad00\uacc4\uc790',
		DETAILS : '\uc0c1\uc138\uc815\ubcf4',
		GLACCOUNT : '\ucd1d\uc7a5\ubd80',
		LOCATION : '\uc704\uce58',
		OWNER : '\ucc45\uc784\uc790',
		OWNERGROUP : '\ucc45\uc784\uc790\ud300',
		REPORTEDPRIORITY : '\uc911\uc810\ubcf4\uace0',
		REPORTEDBY : '\ubcf4\uace0\uc778',
		REPORTDATE : '\ubcf4\uace0\ub0a0\uc9dc',
		REPORTEDPHONE : '\uc804\ud654\ubcf4\uace0',
		REPORTEDEMAIL : '\uc774\uba54\uc77c \ubcf4\uace0',
		SITE : '\uc9c0\uc810',
		STATUS : '\uc0c1\ud0dc',
		SR : '\uc11c\ube44\uc2a4 \uc2e0\uccad',
		SUMMARY : '\uc801\uc694',
		ASSETNUM : '\uc790\uc0b0',
		ASSETSITEID : '\uc790\uc0b0\uc9c0\uc810',
	},
	INVBALANCES : {
		ITEMNUM : '\ud488\ubaa9\ubc88\ud638',
		DESCRIPTION : '\ubb18\uc0ac',
		BINNUM : '\ud654\ubb3c\ubc88\ud638',
		CURBAL : '\ud604\uc7ac\uc794\uace0',
		PHYSCNT : '\uc2e4\uc81c \uc7ac\uace0 \uc870\uc0ac \uacb0\uacfc',
		PHYSCNTDATE : '\uc2e4\uc81c \uc7ac\uace0 \uc870\uc0ac \ub0a0\uc9dc',
		RECONCILED : '\uc794\uace0 \ud3c9\uade0\uc774\ub8f8',
		LOCATION : '\ucc3d\uace0',
	},
	INVENTORY : {
		ITEMNUM : '\ud488\ubaa9\ubc88\ud638',
		DESCRIPTION : '\ubb18\uc0ac',
		SITEID : '\uc9c0\uc810',
		STATUS : '\uc0c1\ud0dc',
		LOCATION : '\ucc3d\uace0',
		CATEGORY : '\uc7ac\uace0\ubd84\ub958',
		BINNUM : '\uae30\ubcf8 \ud654\ubb3c\uc7a5\ubc88\ud638',
		ISSUEUNIT : '\ubc29\ucd9c\uae30\uad00',
		CURBAL : '\ud604\uc7ac\uc7ac\uace0',
		LASTISSUEDATE : '\uc9c0\ub09c\ubc88 \uc7ac\ub8cc\ub97c \ubcf4\ub0b8 \ub0a0\uc9dc',
		ISSUEYTD : '\ub140\ucd08\ubd80\ud130 \uc9c0\uae08\uae4c\uc9c0',
		ISSUE1YRAGO : '\uc791\ub144',
		PHYSCNT : '\uc2e4\ubb3c\uc7ac\uace0 \uc870\uc0ac',
		PHYSCNTDATE : '\uc2e4\ubb3c\uc7ac\uace0 \uc870\uc0ac \ub0a0\uc9dc',
		RECONCILED : '\uc794\uace0 \ud3c9\uade0\uc774\ub8f8',
		TOTALINVPHYBAL : '\uc2e4\ubb3c\uc794\uace0',
		TOTALINVBAL : '\ud604\uc7ac\uc794\uace0',
		ISSUEHISTORY : '\uacfc\uac70\uc0ac',
		INVBALANCE : '\uc794\uace0 \uc5b4\ub7c9',
		ADJCOUNT : '{{\uc7ac\uace0 \uc870\uc0ac}}\ud504\ub85d\uc7ad\ud2b8\ub97c \uc704\ud574 \uc2e4\ubb3c\uc7ac\uace0\uc870\uc0ac\ud588\uc74c',
		BALSUMMARY : '\uc7ac\uace0\uc5b4\ub7c9\uc801\uc694',
	},
	METER : {
		ASSETNUM : '\uc790\uc0b0\ubc88\ud638',
		METERNAME : '\uacc4\uae30\uba85',
		METERTYPE : '\uacc4\uae30\uc720\ud615',
		READINGTYPE : '\uc218\uce58\uc720\ud615',
		LASTREADING : '\uc9c0\ub09c\ubc88 \uc218\uce58',
		LASTREADINGDATE : '\uc9c0\ub09c\ubc88 \uc218\uce58 \ub0a0\uc9dc',
		LASTREADINGINSPECTOR : '\uc9c0\ub09c\ubc88 \uc218 \uac80\uc0ac\uc6d0',
		READING : '\uc0c8 \uc218\uce58',
		NEWREADINGDATE : '\uc0c8\uc218\uce58 \ub0a0\uc9dc'
	},
	WPLABOR : {
		NAME : '\uc778\ub825\uacc4\ud68d',
		LABORCODE : '\uc778\ub825\ucf54\ub4dc',
		CRAFT : '\uacf5\uc608',
		QUANTITY : '\uc218\ub7c9',
		LABORHRS : '\uc815\uc0c1\uc791\uc5c5\uc2dc\uac04',
		DISPLAYNAME : '\uc774\ub984',
		SKILLLEVEL: '\uae30\ub2a5\uc218\uc900',
		VENDOR : '\uacf5\uae09\uc790',
		AMCREW : '\uc804\uccb4\uc778\uc6d0'
	},		
	WPMATERIAL : {
		NAME : '\ubb3c\ub8cc\uacc4\ud68d',
		LINETYPE : '\uc120\ud615',
		ITEMNUM : '\ud56d\ubaa9 \ubc88\ud638',
		DESCRIPTION : '\ubb18\uc0ac',
		ITEMQTY : '\uc218\ub7c9',
		UNITCOST : '\ub2e8\uc704\ub2e8\uac00',
		STOREROOM : '\ucc38\uace0',
		STORELOCSITE : '\ucc3d\uace0\uc9c0\uc810',
		RESTYPE : '\uc608\uc815\uc720\ud615',
		REQUIREDATE : '\uc0ac\uc6a9 \ub0a0\uc9dc'
	},
	LABTRANS : {
		LABORCODE : '\uc778\ub825\ucf54\ub4dc',
		CRAFT : '\uacf5\uc608',
		STARTDATE : '\uc2dc\uc791\ub0a0\uc9dc',
		TIMERSTATUS : '\ud0c0\uc774\uba38 \uc0c1\ud0dc',
		REGULARHRS : '\uc815\uc0c1 \uc791\uc5c5\uc2dc\uac04',
		PAYRATE: '\uae09\ubd80 \ube44\uc728',
		PREMIUMPAYCODE : '\uc794\uc5c5 \uc218\ub2f9 \ucf54\ub4dc',
		PREMIUMPAYHOURS : '\uc794\uc5c5 \uc218\ub2f9 \uc2dc\uac04',
		PREMIUMPAYRATE: '\uc794\uc5c5 \uc218\ub2f9 \ube44\uc728',
		WONUM : '\uc791\uc5c5\uba85\uc138\uc11c',
		LOCATION : '\uc704\uce58',
		ASSETNUM : '\uc790\uc0b0',
		TICKETID: '\ud2f0\ucf13'
	},
	LABREP : {
		LABORCODE : '\uc778\ub825\ucf54\ub4dc',
		CRAFT : '\uacf5\uc608',
		SKILLLEVEL : '\uae30\ub2a5\uc218\uc900',
		STARTDATE : '\uc2dc\uc791\ub0a0\uc9dc',
		STARTTIME : '\uc2dc\uc791\ud0c0\uc784',
		FINISHDATE : '\ub05d\ub098\ub294 \ub0a0\uc9dc',
		FINISHTIME : '\ub05d\ub098\ub294 \uc2dc\uac04',
		REGULARHRS : '\uc815\uc0c1\uc791\uc5c5\uc2dc\uac04',
		PAYRATE : '\uae09\ubd80 \ube44\uc728',
		TRANSTYPE : '\uc720\ud615',
		WONUM : '\uc791\uc5c5\uba85\uc138\uc11c',
		LOCATION : '\uc704\uce58',
		ASSETNUM : '\uc790\uc0b0',
		GENAPPRSERVRECEIPT: '\uc774\ubbf8 \ube44\uc900\ud568',
		NAME: '\uc774\ub984',
		TIMERSTATUS : '\ud0c0\uc774\uba38 \uc0c1\ud0dc',
		PREMIUMPAYHOURS : '\uc794\uc5c5 \uc218\ub2f9 \uc2dc\uac04',
		PREMIUMPAYRATE: '\uc794\uc5c5 \uc218\ub2f9 \ube44\uc728',
		PREMIUMPAYCODE : '\uc794\uc5c5 \uc218\ub2f9 \ube44\uc728',
		TICKETID: '\ud2f0\ucf13',
		TICKETCLASS: '\ud2f0\ucf13\ub958'
	},
	PERSON : {
		PERSONID: '\uc778\uc6d0 \uc544\uc774\ub514',
		FIRSTNAME: '\uc774\ub984',
		LASTNAME: '\uc131\uc528'
	},
	FAILURECODE : {
		FAILURECODE : '\uace0\uc7a5\ub958\ucf54\ub4dc',
		PROBLEMCODE : '\uc758\ubb38\ucf54\ub4dc',
		CAUSECODE : '\uc6d0\uc778\ucf54\ub4dc',
		REMEDYCODE : '\ubcf4\uc644\ucf54\ub4dc',
	},
	SPAREPART : {
		QUANTITY : '\uc218\ub7c9',
		ISSUEDQTY : '\ubcf4\ub0b8 \uc7ac\ub8cc \uc218\ub7c9',
		REMARKS : '\ube44\uace0',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : '\ubb18\uc0ac',
		LONGDESCRIPTION : '\uc0c1\uc138\ud55c \uc815\ubcf4',
		ASSET : '\uc790\uc0b0',
		STATUS : '\uc0c1\ud0dc',
		PARENT : '\uc0c1\uc704\ud56d\ubaa9 \uc791\uc5c5\uba85\uc138\uc11c',
		SITE : '\uc9c0\uc810',
		LOCATION : '\uc704\uce58',
	},
	DOMAIN : {
		VALUE: '\uc218\uce58',
		DESCRIPTION: '\ubb18\uc0ac',
	},
	MR : {
		MRNUM : '\uad6c\ub9e4\uccad\uad6c\uc11c \ubc88\ud638',
		DESCRIPTION : '\ubb18\uc0ac',
		LONGDESCRIPTION : '\uc0c1\uc138\ud55c \ubb18\uc0ac',
		STATUS : '\uc0c1\ud0dc',
		PRIORITY : '\uc6b0\uc120\uc21c\uc704',
		CHARGEINFO : '\uc7a5\ubd80 \uc815\ubcf4',
		REQUIREDDATE : '\uc0ac\uc6a9\ub0a0\uc9dc',
		WONUM : '\uc791\uc5c5\uba85\uc138\uc11c',
		LOCATION : '\uc704\uce58',
		ASSET : '\uc790\uc0b0',
		GLACCOUNT : '\ucd1d\uc7a5\ubd80',
		MRLINES : '\uad6c\ub9e4\uccad\uad6c\uc11c \ud589\ud56d\ubaa9',
		ENTERDATE : '\ub0a0\uc9dc \uc784\ub825'
	},
	MRLINE : {
		MRLINEITEM : '\uad6c\ub9e4\uccad\uad6c\uc11c \ud56d\ubaa9',
		MRLINENUM : '\ud589',
		LINETYPE : '\ud589\uc720\ud615',
		ITEM : '\ud56d\ubaa9',
		DESCRIPTION : '\ubb18\uc0ac',
		QTY : '\uc218\ub7c9',
		ORDERUNIT : '\uad6c\ub9e4\uae30\uad00',
		UNITCOST : '\ub2e8\uc704\uc6d0\uac00',
		LINECOST : '\ud589\uc6d0\uac00',
		REQUIREDDATE : '\uc0ac\uc6a9\ub0a0\uc9dc'
	},
	VIEWDR : {
		VIEWSUBMITTED : '\uc774\ubbf8 \uc81c\ucd9c\ud55c \uad6c\ub9e4\uccad\uad6c\uc11c \ubcf4\uae30',
		VIEWSAVED : '\uc774\ubbf8 \ubcf4\uc874\ud55c \uad6c\ub9e4\uccad\uad6c\uc11c \ubcf4\uae30',
		EDIT : '\uad6c\ub9e4 \uccad\uad6c\uc11c \ud3b8\uc9d1'
	},
	CREATEDR: {
		SAVEASDRAFT : '\ucd08\uc548\uc73c\ub85c \uc800\uc7a5\ud558\ub2e4',
		NEWREQITEM : '\uc0c8\ub85c\uc6b4 \uad6c\ub9e4\uccad\uad6c\uc11c \ud56d\ubaa9',
		SUBMIT : '\uc81c\ucd9c'
	},
	CLASSIFY : {
		CLASSASSET : '\uc790\uc0b0\ubd84\ub958',
		CLASSWO : '\uc791\uc5c5\uba85\uc138\uc11c \ubd84\ub958',
		DESCRIPTION : '\ubd84\ub958 \ubb18\uc0ac',
		CLASSIFICATION : '\ubd84\ub958'
	}
};