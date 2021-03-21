'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: hu_HU
 */
var locale = 'hu_HU'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Be\u00E1ll\u00EDt\u00E1s',
        cancelText: 'M\u00E9gse',
        clearText: 'T\u00F6rl\u00E9s',
        selectedText: 'Kiv\u00E1lasztott',
        // Calender component
        calendarText: 'Napt\u00E1r',
        dateText: 'D\u00E1tum',
        timeText: 'Id\u0151',
        // Datetime component
        dateFormat: 'yy.mm.dd',
        dateOrder: 'yymmdd',
        dayNames: ['vas\u00E1rnap', 'h\u00E9tf\u0151', 'kedd', 'szerda', 'cs\u00FCt\u00F6rt\u00F6k', 'p\u00E9ntek', 'szombat'],
        dayNamesShort: ['vas', 'h\u00E9t', 'ked', 'sze', 'cs\u00FC', 'p\u00E9n', 'szo'],
        dayText: 'Nap',
        hourText: '\u00D3ra',
        minuteText: 'Perc',
        monthNames: ['janu\u00E1r', 'febru\u00E1r', 'm\u00E1rcius', '\u00E1prilis', 'm\u00E1jus', 'j\u00FAnius', 'j\u00FAlius', 'augusztus', 'szeptember', 'okt\u00F3ber', 'november', 'december'],
        monthNamesShort: ['jan.', 'febr.', 'm\u00E1rc.', '\u00E1pr.', 'm\u00E1j.', 'j\u00FAn.', 'j\u00FAl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'],
        monthText: 'H\u00F3nap',
        secText: 'M\u00E1sodperc',
        amText: 'de.',
        pmText: 'du.',
        timeFormat: 'H:ii',
        timeWheels: 'Hii',
        yearText: '\u00C9v',
        nowText: 'Most',
	},
	numeral : {
	    delimiters: {
	        thousands: '\u00a0',
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
	        symbol: 'Ft'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "nulla",
		ONE : "egy",
		TWO : "kett\u0151",
		FEW : "kev\u00E9s",
		MANY : "sok",
		OTHER : "egy\u00E9b"
	},
	locale : {
		"DATETIME_FORMATS" : {
            "AMPMS" : [ "de.", "du." ],
            "DAY" : ["vas\u00e1rnap","h\u00e9tf\u0151","kedd","szerda","cs\u00fct\u00f6rt\u00f6k","p\u00e9ntek","szombat"],
            "MONTH" :  ["janu\u00e1r","febru\u00e1r","m\u00e1rcius","\u00e1prilis","m\u00e1jus","j\u00fanius","j\u00falius","augusztus","szeptember","okt\u00f3ber","november","december"],
            "SHORTDAY" : ["V","H","K","Sze","Cs","P","Szo"],
            "SHORTMONTH" : ["jan.","febr.","m\u00e1rc.","\u00e1pr.","m\u00e1j.","j\u00fan.","j\u00fal.","aug.","szept.","okt.","nov.","dec."],
            "fullDate": "y. MMMM d., EEEE",
            "longDate": "y. MMMM d.",
            "medium": "y. MMM d. H:mm:ss",
            "mediumDate": "y. MMM d.",
            "mediumTime": "H:mm:ss",
            "short": "y.MM.dd H:mm",
            "shortDate": "y.MM.dd",
            "shortTime": "H:mm"
		},
		"NUMBER_FORMATS" : {
            "CURRENCY_SYM": "Ft",
            "DECIMAL_SEP": ",",
            "GROUP_SEP": "\u00a0",
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
                "negPre": "-",
                "negSuf": "\u00a0\u00a4",
                "posPre": "",
                "posSuf": "\u00a0\u00a4"
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
 * Language: HU
 */
var lang = 'HU'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'A szinkroniz\u00E1l\u00E1s hib\u00E1kkal k\u00E9sz!  Offline m\u00F3dban megpr\u00F3b\u00E1lhat tov\u00E1bb dolgozni.',
	EMMOF1001W : 'A szinkroniz\u00E1l\u00E1s hib\u00E1kkal k\u00E9sz!  Ahhoz, hogy az offline m\u00F3d el\u00E9rhet\u0151 legyen, \u00FAjb\u00F3l szinkroniz\u00E1lnia kell.',
	EMMOF1002W : 'A szinkroniz\u00E1l\u00E1s hib\u00E1kkal k\u00E9sz!  Megpr\u00F3b\u00E1lkozhat az \u00FAjb\u00F3li szinkroniz\u00E1l\u00E1ssal, vagy tov\u00E1bb dolgozhat offline m\u00F3dban.',
	EMMOF1003W : 'A szinkroniz\u00E1l\u00E1s hib\u00E1kkal k\u00E9sz!  Az offline munkav\u00E9gz\u00E9s \u00E9rdek\u00E9ben pr\u00F3b\u00E1lkozzon meg m\u00E9g egyszer a szinkroniz\u00E1l\u00E1ssal.',
	EMMOF1004W : '{0} sz\u00E1mnak kell lennie',
	EMMOF1005W : 'Hi\u00E1nyz\u00F3 k\u00F6telez\u0151 mez\u0151k: {0}',
	EMMOF1006W : 'Csak olvashat\u00F3 a k\u00F6vetkez\u0151 attrib\u00FAtum: {0}',
	EMMOF1007W : 'V\u00E1lasszon \u00E9rt\u00E9ket',
	EMMOF1008I : '\u00C1llapot sikeresen m\u00F3dos\u00EDtva',
	EMMOF1009W : 'Null\u00E1n\u00E1l nagyobb mennyis\u00E9get adjon meg',
	EMMOF1010W : '{0} null\u00E1n\u00E1l nagyobbnak kell lennie',
	EMMOF1011W : '{0} k\u00F6telez\u0151',
	EMMOF1012W : 'Nem l\u00E9tezik olyan egyenleg, amely ennek a cikknek,, rakt\u00E1rnak, \u00E9s t\u00E1rol\u00F3nak a kombin\u00E1ci\u00F3ira \u00E9rv\u00E9nyes',
	EMMOF1013W : 'A t\u00E1rol\u00F3 egyenlege a tranzakci\u00F3 k\u00F6vetkezt\u00E9ben negat\u00EDv lesz',
	EMMOF1014W : 'Nem lehet \u00E1thelyezni akkor, ha a helysz\u00EDnek,, a t\u00E1rol\u00F3sz\u00E1mok \u00E9s a telephely-azonos\u00EDt\u00F3k mind megegyeznek',
	// [WF]		
	EMMWF1000I : 'Munkafolyamat ind\u00EDt\u00E1sa',
	EMMWF1001I : 'Ehhez az alkalmaz\u00E1shoz egyn\u00E9l t\u00F6bb munkafolyamat \u00E1ll rendelkez\u00E9sre.  V\u00E1lasszon ki egyet, majd nyomja meg az OK gombot.',
	EMMWF1002I : 'V\u00E1lasszon folyamatot',
	EMMWF1003I : 'Folyamat',
	EMMWF1004I : 'Feljegyz\u00E9s',
	EMMWF1005I : 'Munkafolyamat le\u00E1ll\u00EDt\u00E1sa',
	// [ES]
	EMMES1000I : 'e-Sign hiteles\u00EDt\u00E9s',
	EMMES1001I : 'Elektronikus al\u00E1\u00EDr\u00E1s sz\u00FCks\u00E9ges',
	EMMES1002E : 'Sikertelen hiteles\u00EDt\u00E9s',
	EMMES1003I : 'Adjon meg egy jelsz\u00F3t \u00E9s egy okot',
	EMMES1004I : 'Felhaszn\u00E1l\u00F3',
	EMMES1005I : 'Jelsz\u00F3',
	EMMES1006I : 'Ok',
	// [GB]
	EMMGB1001I : 'E-mail',
	EMMGB1002I : 'FaceTime',
	EMMGB1003I : 'M\u00E9gse',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Meger\u0151s\u00EDt\u00E9s',
	EMMGB1006I : 'Igen',
	EMMGB1007I : 'Nem',
	EMMGB1008I : 'Telefon',
	EMMGB1009I : 'H\u00EDv\u00E1s',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'T\u00F6rl\u00E9s meger\u0151s\u00EDt\u00E9se?',
	EMMGB1012I : '{0} kor\u00E1bbra kell esnie, mint {1}',
	EMMGB1013I : '{0} k\u00E9s\u0151bbre kell esnie, mint {1}',
	EMMGB1014I : '{0} m\u00FAltbeli \u00E9rt\u00E9knek kell lennie',
	// General	
	OFFLINEMODE : 'Offline m\u00F3d',
	SYNCNEEDED : ' \u2013 M\u00F3dos\u00EDtva, Szinkroniz\u00E1l\u00E1s sz\u00FCks\u00E9ges',
	SYNCHRONIZATION : 'Szinkroniz\u00E1l\u00E1s',
	SYNCSERVER : 'Szinkroniz\u00E1l\u00E1s a kiszolg\u00E1l\u00F3val',
	ENTERLABOR: 'Bevitel munkaer\u0151 szerint',
	ADDMORE: 'Tov\u00E1bbiak hozz\u00E1ad\u00E1sa...',
	GOONLINE : 'Visszat\u00E9r\u00E9s online m\u00F3dba',
	GOTOOFFLINEAPPS : 'Ugr\u00E1s az offline alkalmaz\u00E1sokhoz',
	OFFLINEAPPS : 'Offline alkalmaz\u00E1sok',
	QUICKSCAN : 'Gyors beolvas\u00E1s: ',
	ACTIVEWORKORDERS : 'Akt\u00EDv munkamegrendel\u00E9sek',
	RECORDSAVED: 'Rekord elmentve',
	RECORDNOTSAVED: 'Hiba \u2013 Nincs visszaadott rekord',
	TIMERALREADYSTARTED: 'Az id\u0151z\u00EDt\u0151 m\u00E1r el van ind\u00EDtva',
	TIMERNOTFOUND : 'Az id\u0151z\u00EDt\u0151 nincs elind\u00EDtva. Nem tal\u00E1lhat\u00F3 akt\u00EDv id\u0151z\u00EDt\u0151.',
	TIMERSTARTED : 'Id\u0151z\u00EDt\u0151 elind\u00EDtva',
	TIMERSTOPPED : 'Id\u0151z\u00EDt\u0151 le\u00E1ll\u00EDtva',
	TOOLS : 'Eszk\u00F6z\u00F6k',
	STARTTIMER : 'Id\u0151z\u00EDt\u0151 ind\u00EDt\u00E1sa',
	STOPTIMER : 'Id\u0151z\u00EDt\u0151 le\u00E1ll\u00EDt\u00E1sa',
	MODIFYSAVE : 'Rekord m\u00F3dos\u00EDtva.  Mentse el a v\u00E1ltoztat\u00E1sokat.',
	SITEREQUIRED : 'Munkamegrendel\u00E9s l\u00E9trehoz\u00E1s\u00E1hoz k\u00F6telez\u0151 telephelyet megadni.',
	NOVALUE : '\u00DCres \u00E9rt\u00E9k',
	ACTIONS : 'M\u0171veletek',
	CHILDRENOF : 'A k\u00F6vetkez\u0151 gyermekei:',
	RESPONSIBILITY : 'Felel\u0151ss\u00E9g',
	LOOKUP : 'Keres\u00E9s',
	LOCATIONDRILLDOWN : 'Helysz\u00EDnr\u00E9szletez\u00E9s',
	ASSETDRILLDOWN : 'Eszk\u00F6zr\u00E9szletez\u00E9s',
	DRILLDOWN : 'R\u00E9szletez\u00E9s',
	BACK : 'Vissza',
	SAVE : 'Ment\u00E9s',
	APPLY : 'Alkalmaz',
	FILTER : 'Sz\u0171r\u00E9s',
	RESET : 'Alaphelyzetbe \u00E1ll\u00EDt\u00E1s',
	SELECTVALUE : '\u00C9rt\u00E9k kiv\u00E1laszt\u00E1sa',
	CANCEL : 'M\u00E9gse',
	OK : 'OK',
	YES : 'Igen',
	NO : 'Nem',
	CREATEFOLLOWUP : 'Ut\u00E1nk\u00F6vet\u00E9s l\u00E9trehoz\u00E1sa',
	CREATESR : '\u00DAj szolg\u00E1ltat\u00E1sk\u00E9r\u00E9s l\u00E9trehoz\u00E1sa',
	PARENT : 'Sz\u00FCl\u0151',
	CHANGESTATUS : '\u00C1llapot m\u00F3dos\u00EDt\u00E1sa',
	LABOR : 'Munkaer\u0151',
	MATERIALS : 'Anyagok',
	TASKS : 'Feladatok',
	ATTACHMENTS : 'Csatolm\u00E1nyok',
	FAILUREREPORTING : 'Hibajelent\u00E9s',
	MULTIASSETS : 'T\u00F6bb eszk\u00F6z, Helysz\u00EDnek',
	ADDNEW : '\u00DAj hozz\u00E1ad\u00E1sa',
	CLASSIFICATION : 'Besorol\u00E1s',
	NORECORDS : 'Nem tal\u00E1lhat\u00F3 rekord',
	NORECORDEXIST : 'Nem tal\u00E1lhat\u00F3 rekord, vagy m\u00E1r nem l\u00E9tezik',
	NORECORDSADJ : 'Nem l\u00E9tezik rekord a fizikai sz\u00E1ml\u00E1l\u00E1sok kiigaz\u00EDt\u00E1s\u00E1hoz',
	SELECTOWNER : 'Tulajdonos kiv\u00E1laszt\u00E1sa',
	OWNER : 'Tulajdonos',
	OWNERGROUP : 'Tulajdonosi csoport',
	TAKEOWNERSHIP : 'Tulajdonba v\u00E9tel',
	SORTBY : 'Rendez\u00E9si szempont',
	LIST : 'Lista',
	QUICKSEARCH: 'Gyors keres\u00E9s',
	INVENTORYBYSR : 'Rakt\u00E1rank\u00E9nti k\u00E9szlet',
	INVDETAILS : 'K\u00E9szlet r\u00E9szletes adatai',
	NEWCOUNT : '\u00DAj sz\u00E1ml\u00E1l\u00E1s',
	LABORTRANS : 'Munkaer\u0151-tranzakci\u00F3k',
	CREATEWO : '\u00DAj munkamegrendel\u00E9s l\u00E9trehoz\u00E1sa',
	MYWOS : 'Saj\u00E1t munkamegrendel\u00E9sek',
	FAILUREREPORT : 'Hibajelent\u00E9s',
	METERREADINGS : 'M\u00E9r\u0151leolvas\u00E1sok megad\u00E1sa',
	ASSETMETER : 'Eszk\u00F6zm\u00E9r\u0151-leolvas\u00E1sok',
	LOCATIONMETER : 'Helysz\u00EDnm\u00E9r\u0151-leolvas\u00E1sok',
	FROM : 'Kezdet:',
	TO : 'V\u00E9g:',
	ADVANCED : '\u00D6sszetett',
	ADVANCEDSEARCH : '\u00D6sszetett keres\u00E9s',
	DOWNTIME : '\u00C1ll\u00E1sid\u0151',
	PURCHASEINFO : 'Beszerz\u00E9si inform\u00E1ci\u00F3k',
	SPAREPARTS : 'P\u00F3talkatr\u00E9szek',
	SCHEDULEINFO : '\u00DCtemez\u00E9si inform\u00E1ci\u00F3k',
	PLANLABOR : 'Munkaer\u0151 tervez\u00E9se',
	PLANMATERIAL : 'Tervezett anyagok',
	WOCREATED : 'L\u00E9trej\u00F6tt a k\u00F6vetkez\u0151 munkamegrendel\u00E9s: {0}',
	PRESTART : 'Ind\u00EDt\u00E1s el\u0151tt',
	REVIEWANDAPPROVE : 'Fel\u00FClvizsg\u00E1lat \u00E9s j\u00F3v\u00E1hagy\u00E1s',
	MOCACTIONGROUP : 'MOC-m\u0171veletcsoport kiv\u00E1laszt\u00E1sa',
	MOCACTIONS : 'MOC-m\u0171veletek kiv\u00E1laszt\u00E1sa',
	REVIEWERSAVED : 'Fel\u00FClvizsg\u00E1l\u00F3(k) offline elmentve.',
	APPROVERSAVED : 'J\u00F3v\u00E1hagy\u00F3(k) offline elmentve.',
	ACTIONSAVED : 'M\u0171velet(ek) offline elmentve.',
	NOACTIONS : 'A k\u00F6vetkez\u0151 \u00E1ltal\u00E1nos m\u0171veletcsoportnak: {0} nincs \u00E9rv\u00E9nyes, hozz\u00E1adhat\u00F3 \u00E1ltal\u00E1nos m\u0171velete.',
	SRQUEUED : 'A k\u00F6vetkez\u0151 szolg\u00E1ltat\u00E1sk\u00E9r\u00E9s: {0} \u00E1llapota QUEUED (V\u00C1R\u00D3LIST\u00C1N) \u00E9rt\u00E9kre m\u00F3dosult.',
	SELECTREVIEWERS : 'Fel\u00FClvizsg\u00E1l\u00F3k kiv\u00E1laszt\u00E1sa',
	SELECTAPPROVERS : 'J\u00F3v\u00E1hagy\u00F3k kiv\u00E1laszt\u00E1sa',
	APPROVERS : 'J\u00F3v\u00E1hagy\u00F3k',
	REVIEWERS : 'Fel\u00FClvizsg\u00E1l\u00F3k',
	VIEWLIST: 'Lista megtekint\u00E9se',
	VIEWSUMMARY : '\u00D6sszegz\u00E9s megtekint\u00E9se',
	STOREROOMS : 'Rakt\u00E1rak',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Ugr\u00E1s:',
	APPS : 'Alkalmaz\u00E1sok',
	STARTCENTER : 'Ind\u00EDt\u00F3k\u00F6zpont',
	PAGINATION : {
		TITLE : '{{to}}/{{from}}. oldal - {{total}} Rekord',
		PREV : 'El\u0151z\u0151',
		NEXT : 'K\u00F6vetkez\u0151'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Helysz\u00EDn',
		ASSET : 'Eszk\u00F6z',
		WOTRACK : 'Munkamegrendel\u00E9s nyomon k\u00F6vet\u00E9se',
		SR : 'Szolg\u00E1ltat\u00E1sk\u00E9r\u00E9sek',
		INVENTOR: 'K\u00E9szlet',
		INVISSUE: 'Kibocs\u00E1t\u00E1sok \u00E9s \u00E1thelyez\u00E9sek',
		MOC : 'MOC (olaj)',
		CREATEDR : 'Ig\u00E9nybejelent\u00E9s l\u00E9trehoz\u00E1sa',
		VIEWDR : 'Ig\u00E9nybejelent\u00E9sek megtekint\u00E9se',
		LABREP: 'Munkaer\u0151-jelent\u00E9s',
		TXNTRACK : 'Szinkroniz\u00E1l\u00E1s felold\u00E1sa'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Eszk\u00F6zsz\u00E1m',
		STATUS : '\u00C1llapot',
		STATUSDATE: 'Legut\u00F3bbi m\u00F3dos\u00EDt\u00E1s d\u00E1tuma',
		INSTALLDATE: 'Telep\u00EDt\u00E9s d\u00E1tuma',
		SITEID : 'Telephely',
		PARENT : 'Sz\u00FCl\u0151',
		ASSETTYPE: 'T\u00EDpus',
		LONGDESCRIPTION : 'R\u00E9szletek',
		GROUPNAME: 'M\u00E9r\u0151csoport',
		SERIALNUM: 'Sorozatsz\u00E1m',
		PURCHASEPRICE: 'V\u00E9tel\u00E1r',
		TOTDOWNTIME: 'Teljes \u00E1ll\u00E1sid\u0151',
		ISRUNNING: 'Eszk\u00F6z \u00FCzemben',
		VENDOR: 'Besz\u00E1ll\u00EDt\u00F3',
		MANUFACTURER: 'Gy\u00E1rt\u00F3',
		FAILURECODE: 'Hibaoszt\u00E1ly',
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		LOCATION : 'Helysz\u00EDn',
		LOCDESC : 'R\u00E9szletek',
		SEQUENCE : 'Sorozat',
		PROGRESS : 'Megjel\u00F6li az el\u0151rehalad\u00E1st?',
		COMMENTS : 'Megjegyz\u00E9sek',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Munkamegrendel\u00E9s',
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		LONGDESCRIPTION : 'R\u00E9szletek',
		STATUS : '\u00C1llapot',
		PARENT : 'Sz\u00FCl\u0151 munkamegrendel\u00E9s',
		SITEID : 'Telephely',
		LOCATION : 'Helysz\u00EDn',
		ASSETNUM : 'Eszk\u00F6z',
		WORKTYPE : 'Munkat\u00EDpus',
		WOPRIORITY : 'Priorit\u00E1s',
		GLACCOUNT : 'F\u0151k\u00F6nyvi sz\u00E1mla',
		FAILURECODE : 'Hibaoszt\u00E1ly',
		PROBLEMCODE : 'Probl\u00E9mak\u00F3d',
		SUPERVISOR : 'Ellen\u0151r',
		CREWID : 'Csapat',
		LEAD : 'Vezet\u0151',
		PERSONGROUP : 'Munkacsoport',
		REPORTEDBY : 'Jelent\u0151',
		REPORTDATE : 'Jelent\u00E9s d\u00E1tuma',
		PHONE : 'Telefon',
		TASKID : 'Feladat',
		TARGSTARTDATE : 'Kit\u0171z\u00F6tt ind\u00EDt\u00E1s',
		TARGCOMPDATE : 'Kit\u0171z\u00F6tt befejez\u00E9s',
		SCHEDSTART : '\u00DCtemezett ind\u00EDt\u00E1s',
		SCHEDFINISH : '\u00DCtemezett befejez\u00E9s',
		ACTSTART : 'T\u00E9nyleges ind\u00EDt\u00E1s',
		ACTFINISH : 'T\u00E9nyleges befejez\u00E9s',
		ASSIGNMENT : 'Hozz\u00E1rendelt munkaer\u0151',
		OWNER : 'Tulajdonos',
		OWNERGROUP : 'Tulajdonosi csoport',
		OBSERVATION : 'Megfigyel\u00E9s',
		MEASUREMENTVALUE : 'M\u00E9r\u00E9si \u00E9rt\u00E9k',
		HAZARDS: 'Vesz\u00E9lyek',
		HAZARDSMAT: 'Vesz\u00E9lyes anyagok',
		PRECAUTIONS: '\u00D3vint\u00E9zked\u00E9sek',
		LOCKTAG: 'Kiz\u00E1r\u00E1s/kit\u00E1bl\u00E1z\u00E1s',
		TAGOUT: 'Kit\u00E1bl\u00E1z\u00E1sok',
		LOCKOUT: 'Kiz\u00E1r\u00E1s',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		ITEM : 'Cikk',
		LINETYPE : 'Sort\u00EDpus',
		QUANTITY : 'Mennyis\u00E9g',
		STOREROOM : 'Rakt\u00E1r',
		STORELOC : 'Rakt\u00E1r',
		BINNUM : 'T\u00E1rol\u00F3',
		CURBAL : 'Aktu\u00E1lis egyenleg',
		UNITCOST : 'Egys\u00E9gk\u00F6lts\u00E9g',
		ASSET : 'Eszk\u00F6z',
		WORKORDER : 'Munkamegrendel\u00E9s',
		LOCATION : 'Helysz\u00EDn',
		ISSUETYPE : 'Kibocs\u00E1t\u00E1st\u00EDpus',
		ISSUETO : 'Kibocs\u00E1tva a k\u00F6vetkez\u0151nek',
		ROTASSETNUM : 'Forg\u00F3eszk\u00F6z',
		SITEID : 'Telephely',
		ISSUERETURN : 'Kibocs\u00E1t\u00E1s \u00E9s visszav\u00E9tel',
		CHARGEINFO : 'Elsz\u00E1mol\u00E1si inform\u00E1ci\u00F3k'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		ITEM : 'Cikk',
		LINETYPE : 'Sort\u00EDpus',
		QUANTITY : 'Mennyis\u00E9g',
		STOREROOM : 'Rakt\u00E1r',
		BINNUM : 'T\u00E1rol\u00F3',
		CURBAL : 'Aktu\u00E1lis egyenleg',
		UNITCOST : 'Egys\u00E9gk\u00F6lts\u00E9g',
		ISSUETYPE : 'Kibocs\u00E1t\u00E1st\u00EDpus',
		LOCATION : 'Helysz\u00EDn',
		TOOLRATE : 'Eszk\u00F6ztarifa',
		ASSETNUM: 'Eszk\u00F6z',
		TOOLHRS: 'Eszk\u00F6z\u00F3rasz\u00E1m',
		LINECOST: 'Sork\u00F6lts\u00E9g',
		TOOLQTY: 'Eszk\u00F6zmennyis\u00E9g'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		ITEM : 'Cikk',
		LINETYPE : 'Sort\u00EDpus',
		QUANTITY : 'Mennyis\u00E9g',
		TOSTORELOC : 'C\u00E9lhelysz\u00EDn',
		FROMSTORELOC : 'Kiindul\u00E1si helysz\u00EDn',
		FROMSITE : 'Kiindul\u00E1si telephely',
		TOSITE : 'C\u00E9ltelephely',
		TOBIN: 'C\u00E9lt\u00E1rol\u00F3',
		FROMBIN: 'Kiindul\u00E1si t\u00E1rol\u00F3',
		UNITCOST : 'Egys\u00E9gk\u00F6lts\u00E9g',
		ISSUETYPE : 'Kibocs\u00E1t\u00E1st\u00EDpus',
		CONVERSIONFACTOR : '\u00C1tv\u00E1lt\u00E1si t\u00E9nyez\u0151',
		ROTASSETNUM : 'Forg\u00F3eszk\u00F6z',
		TRANSFEROUT : '\u00C1thelyez\u00E9s ki',
		TRANSFERIN : '\u00C1thelyez\u00E9s be',
		FROMQTY : 'Kiindul\u00E1sitart\u00E1ly-mennyis\u00E9g',
		TOQTY : 'C\u00E9ltart\u00E1lymennyis\u00E9g',
		SITEID : 'Telephely',
		LOCATION : 'Helysz\u00EDn',
		TRANSFERDETAILS: '\u00C1thelyez\u00E9s r\u00E9szletes adatai'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Eszk\u00F6z',
		LOCATION : 'Helysz\u00EDn',
		SEQUENCE : 'Sorozat',
	},
	WORKLOG : {
		NAME : 'Munkanapl\u00F3',
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		DETAILS : 'R\u00E9szletek',
		LOGTYPE : 'T\u00EDpus',
		CREATEBY : 'L\u00E9trehoz\u00F3',
		CREATEDATE : 'L\u00E9trehoz\u00E1s d\u00E1tuma'
	},
	SR : {
		ACTIVEREQS : 'Akt\u00EDv szolg\u00E1ltat\u00E1sk\u00E9r\u00E9sek',
		NEWREQS : '\u00DAj szolg\u00E1ltat\u00E1sk\u00E9r\u00E9sek',
		AFFECTEDPERSON : '\u00C9rintett szem\u00E9ly',
		DETAILS : 'R\u00E9szletek',
		GLACCOUNT : 'F\u0151k\u00F6nyvi sz\u00E1mla',
		LOCATION : 'Helysz\u00EDn',
		OWNER : 'Tulajdonos',
		OWNERGROUP : 'Tulajdonosi csoport',
		REPORTEDPRIORITY : 'Jelentett priorit\u00E1s',
		REPORTEDBY : 'Jelent\u0151',
		REPORTDATE : 'Jelent\u00E9s d\u00E1tuma',
		REPORTEDPHONE : 'Jelentett telefonsz\u00E1m',
		REPORTEDEMAIL : 'Jelentett e-mail-c\u00EDm',
		SITE : 'Telephely',
		STATUS : '\u00C1llapot',
		SR : 'Szolg\u00E1ltat\u00E1sk\u00E9r\u00E9s',
		SUMMARY : '\u00D6sszegz\u00E9s',
		ASSETNUM : 'Eszk\u00F6z',
		ASSETSITEID : 'Eszk\u00F6ztelephely',
	},
	INVBALANCES : {
		ITEMNUM : 'Cikk',
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		BINNUM : 'T\u00E1rol\u00F3',
		CURBAL : 'Aktu\u00E1lis egyenleg',
		PHYSCNT : 'Fizikai egyenleg',
		PHYSCNTDATE : 'Fizikai sz\u00E1ml\u00E1l\u00E1s d\u00E1tuma',
		RECONCILED : 'Egyeztetve',
		LOCATION : 'Rakt\u00E1r',
	},
	INVENTORY : {
		ITEMNUM : 'Cikk',
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		SITEID : 'Telephely',
		STATUS : '\u00C1llapot',
		LOCATION : 'Rakt\u00E1r',
		CATEGORY : 'Rakt\u00E1rk\u00E9szlet-kateg\u00F3ria',
		BINNUM : 'Alap\u00E9rtelmezett t\u00E1rol\u00F3',
		ISSUEUNIT : 'Kibocs\u00E1t\u00E1si egys\u00E9g',
		CURBAL : 'Aktu\u00E1lis egyenleg',
		LASTISSUEDATE : 'Legut\u00F3bbi kibocs\u00E1t\u00E1s d\u00E1tuma',
		ISSUEYTD : '\u00C9ves \u00E9rt\u00E9k az aktu\u00E1lis d\u00E1tumig',
		ISSUE1YRAGO : 'El\u0151z\u0151 \u00E9v',
		PHYSCNT : 'Fizikai sz\u00E1ml\u00E1l\u00E1s',
		PHYSCNTDATE : 'Fizikai sz\u00E1ml\u00E1l\u00E1s d\u00E1tuma',
		RECONCILED : 'Egyeztetve',
		TOTALINVPHYBAL : 'Fizikai egyenleg',
		TOTALINVBAL : 'Aktu\u00E1lis egyenleg',
		ISSUEHISTORY : 'Kibocs\u00E1t\u00E1si el\u0151zm\u00E9nyek',
		INVBALANCE : 'K\u00E9szletegyenlegek',
		ADJCOUNT : 'Fizikai sz\u00E1ml\u00E1l\u00E1sok kiigaz\u00EDt\u00E1sa erre az \u00F6sszesen {{count}} cikkre vonatkoz\u00F3an',
		BALSUMMARY : 'Rendelkez\u00E9sre \u00E1ll\u00F3 egyenleg \u00F6sszegz\u00E9se',
	},
	METER : {
		ASSETNUM : 'Eszk\u00F6z',
		METERNAME : 'M\u00E9r\u0151',
		METERTYPE : 'M\u00E9r\u0151t\u00EDpus',
		READINGTYPE : 'Leolvas\u00E1s t\u00EDpusa',
		LASTREADING : 'Utols\u00F3 leolvas\u00E1s',
		LASTREADINGDATE : 'Utols\u00F3 leolvas\u00E1s d\u00E1tuma',
		LASTREADINGINSPECTOR : 'Utols\u00F3 leolvas\u00E1s vizsg\u00E1l\u00F3ja',
		READING : '\u00DAj leolvas\u00E1s',
		NEWREADINGDATE : '\u00DAj leolvas\u00E1s d\u00E1tuma'
	},
	WPLABOR : {
		NAME : 'Tervezett munkaer\u0151',
		LABORCODE : 'Munkaer\u0151',
		CRAFT : 'Szak\u00E9rtelem',
		QUANTITY : 'Mennyis\u00E9g',
		LABORHRS : 'Norm\u00E1l munka\u00F3r\u00E1k',
		DISPLAYNAME : 'N\u00E9v',
		SKILLLEVEL: 'K\u00E9pess\u00E9gszint',
		VENDOR : 'Besz\u00E1ll\u00EDt\u00F3',
		AMCREW : 'Csapat'
	},		
	WPMATERIAL : {
		NAME : 'Tervezett anyagok',
		LINETYPE : 'Sort\u00EDpus',
		ITEMNUM : 'Cikk',
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		ITEMQTY : 'Mennyis\u00E9g',
		UNITCOST : 'Egys\u00E9gk\u00F6lts\u00E9g',
		STOREROOM : 'Rakt\u00E1r',
		STORELOCSITE : 'Rakt\u00E1r telephelye',
		RESTYPE : 'Foglal\u00E1st\u00EDpus',
		REQUIREDATE : 'Ig\u00E9nyelt d\u00E1tum'
	},
	LABTRANS : {
		LABORCODE : 'Munkaer\u0151',
		CRAFT : 'Szak\u00E9rtelem',
		STARTDATE : 'Kezd\u0151 d\u00E1tum',
		TIMERSTATUS : 'Id\u0151z\u00EDt\u0151\u00E1llapot',
		REGULARHRS : 'Norm\u00E1l munka\u00F3r\u00E1k',
		PAYRATE: 'Tarifa',
		PREMIUMPAYCODE : 'Emelt b\u00E9r k\u00F3dja',
		PREMIUMPAYHOURS : 'Emelt b\u00E9r \u00F3rasz\u00E1ma',
		PREMIUMPAYRATE: 'Emelt b\u00E9r tarif\u00E1ja',
		WONUM : 'Munkamegrendel\u00E9s',
		LOCATION : 'Helysz\u00EDn',
		ASSETNUM : 'Eszk\u00F6z',
		TICKETID: 'Jegy'
	},
	LABREP : {
		LABORCODE : 'Munkaer\u0151',
		CRAFT : 'Szak\u00E9rtelem',
		SKILLLEVEL : 'K\u00E9pess\u00E9gszint',
		STARTDATE : 'Kezd\u0151 d\u00E1tum',
		STARTTIME : 'Kezd\u0151 id\u0151pont',
		FINISHDATE : 'Befejez\u0151 d\u00E1tum',
		FINISHTIME : 'Befejez\u0151 id\u0151pont',
		REGULARHRS : 'Norm\u00E1l munka\u00F3r\u00E1k',
		PAYRATE : 'Tarifa',
		TRANSTYPE : 'T\u00EDpus',
		WONUM : 'Munkamegrendel\u00E9s',
		LOCATION : 'Helysz\u00EDn',
		ASSETNUM : 'Eszk\u00F6z',
		GENAPPRSERVRECEIPT: 'J\u00F3v\u00E1hagyva',
		NAME: 'N\u00E9v',
		TIMERSTATUS : 'Id\u0151z\u00EDt\u0151\u00E1llapot',
		PREMIUMPAYHOURS : 'Emelt b\u00E9r \u00F3rasz\u00E1ma',
		PREMIUMPAYRATE: 'Emelt b\u00E9r tarif\u00E1ja',
		PREMIUMPAYCODE : 'Emelt b\u00E9r k\u00F3dja',
		TICKETID: 'Jegy',
		TICKETCLASS: 'Jegyoszt\u00E1ly'
	},
	PERSON : {
		PERSONID: 'Szem\u00E9ly',
		FIRSTNAME: 'Ut\u00F3n\u00E9v',
		LASTNAME: 'Vezet\u00E9kn\u00E9v'
	},
	FAILURECODE : {
		FAILURECODE : 'Hibaoszt\u00E1ly',
		PROBLEMCODE : 'Probl\u00E9ma',
		CAUSECODE : 'Indok',
		REMEDYCODE : 'Megold\u00E1s',
	},
	SPAREPART : {
		QUANTITY : 'Mennyis\u00E9g',
		ISSUEDQTY : 'Kibocs\u00E1tott mennyis\u00E9g',
		REMARKS : 'Megjegyz\u00E9sek',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		LONGDESCRIPTION : 'R\u00E9szletek',
		ASSET : 'Eszk\u00F6z',
		STATUS : '\u00C1llapot',
		PARENT : 'Sz\u00FCl\u0151 munkamegrendel\u00E9s',
		SITE : 'Telephely',
		LOCATION : 'Helysz\u00EDn',
	},
	DOMAIN : {
		VALUE: '\u00C9rt\u00E9k',
		DESCRIPTION: 'Le\u00EDr\u00E1s',
	},
	MR : {
		MRNUM : 'Ig\u00E9nybejelent\u00E9s',
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		LONGDESCRIPTION : 'Hossz\u00FA le\u00EDr\u00E1s',
		STATUS : '\u00C1llapot',
		PRIORITY : 'Priorit\u00E1s',
		CHARGEINFO : 'Elsz\u00E1mol\u00E1si inform\u00E1ci\u00F3k',
		REQUIREDDATE : 'Ig\u00E9nyelt d\u00E1tum',
		WONUM : 'Munkamegrendel\u00E9s',
		LOCATION : 'Helysz\u00EDn',
		ASSET : 'Eszk\u00F6z',
		GLACCOUNT : 'F\u0151k\u00F6nyvi \u201Etartozik\u201D sz\u00E1mla',
		MRLINES : 'Ig\u00E9nybejelent\u00E9si sor cikkei',
		ENTERDATE : 'Beviteli d\u00E1tum'
	},
	MRLINE : {
		MRLINEITEM : 'Ig\u00E9nybejelent\u00E9s cikke',
		MRLINENUM : 'Sor',
		LINETYPE : 'Sort\u00EDpus',
		ITEM : 'Cikk',
		DESCRIPTION : 'Le\u00EDr\u00E1s',
		QTY : 'Mennyis\u00E9g',
		ORDERUNIT : 'Rendel\u00E9si egys\u00E9g',
		UNITCOST : 'Egys\u00E9gk\u00F6lts\u00E9g',
		LINECOST : 'Sork\u00F6lts\u00E9g',
		REQUIREDDATE : 'Ig\u00E9nyelt d\u00E1tum'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Elk\u00FCld\u00F6tt ig\u00E9nybejelent\u00E9sek megtekint\u00E9se',
		VIEWSAVED : 'Mentett ig\u00E9nybejelent\u00E9sek megtekint\u00E9se',
		EDIT : 'Ig\u00E9nybejelent\u00E9s szerkeszt\u00E9se'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Ment\u00E9s v\u00E1zlatk\u00E9nt',
		NEWREQITEM : '\u00DAj ig\u00E9nybejelent\u00E9si cikk',
		SUBMIT : 'Elk\u00FCld'
	},
	CLASSIFY : {
		CLASSASSET : 'Eszk\u00F6z besorol\u00E1sa',
		CLASSWO : 'Munkamegrendel\u00E9s besorol\u00E1sa',
		DESCRIPTION : 'Oszt\u00E1ly le\u00EDr\u00E1sa',
		CLASSIFICATION : 'Besorol\u00E1s'
	}
};
