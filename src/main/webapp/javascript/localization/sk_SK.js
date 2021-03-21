'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: sk_SK
 */
var locale = 'sk_SK'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Zapnutie',
        cancelText: 'Zru\u0161i\u0165',
        clearText: 'Vymaza\u0165',
        selectedText: 'Vybrat\u00E9',
        // Calender component
        calendarText: 'Kalend\u00E1r',
        dateText: 'D\u00E1tum',
        timeText: '\u010Cas',
        // Datetime component
        dateFormat: 'd.m.yy',
        dateOrder: 'dmyy',
        dayNames: ['Nede\u013Ea', 'Pondelok', 'Utorok', 'Streda', '\u0160tvrtok', 'Piatok', 'Sobota'],
        dayNamesShort: ['Ned', 'Pon', 'Ut', 'Str', '\u0160tv', 'Pia', 'Sob'],
        dayText: 'De\u0148',
        hourText: 'hod.',
        minuteText: 'min.',
        monthNames: ['janu\u00E1r', 'febru\u00E1r', 'marec', 'apr\u00EDl', 'm\u00E1j', 'j\u00FAn', 'j\u00FAl', 'august', 'september', 'okt\u00F3ber', 'november', 'december'],
        monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'm\u00E1j', 'j\u00FAn', 'j\u00FAl', 'aug', 'sep', 'okt', 'nov', 'dec'],
        monthText: 'Mesiac',
        secText: 's.',
        amText: 'dop.',
        pmText: 'pop.',
        timeFormat: 'H:ii',
        timeWheels: 'Hii',
        yearText: 'Rok',
        nowText: 'Teraz',
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
	        symbol: '\u20ac'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "nula",
		ONE : "jeden",
		TWO : "dva",
		FEW : "nieko\u013Eko",
		MANY : "ve\u013Ea",
		OTHER : "in\u00E9"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "AM", "PM" ],
			"DAY" : [ "nede\u013ea", "pondelok", "utorok", "streda", "\u0161tvrtok", "piatok", "sobota" ],
			"MONTH" : [ "janu\u00e1ra", "febru\u00e1ra", "marca", "apr\u00edla", "m\u00e1ja", "j\u00fana", "j\u00fala", "augusta", "septembra", "okt\u00f3bra", "novembra", "decembra" ],
			"SHORTDAY": [ "ne", "po", "ut", "st", "\u0161t", "pi", "so" ],
			"SHORTMONTH": [ "jan", "feb", "mar", "apr", "m\u00e1j", "j\u00fan", "j\u00fal", "aug", "sep", "okt", "nov", "dec" ],
			"fullDate" : "EEEE, d. MMMM y",
		    "longDate" : "d. MMMM y",
		    "medium" : "d. M. y H:mm:ss",
		    "mediumDate" : "d. M. y",
		    "mediumTime" : "H:mm:ss",
		    "short" : "d.M.y H:mm",
		    "shortDate" : "d.M.y",
		    "shortTime" : "H:mm"			
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "\u20ac",
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
 * Language: SK
 */
var lang = 'SK'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Synchroniz\u00E1cia dokon\u010Den\u00E1 s chybami!  M\u00F4\u017Eete sa pok\u00FAsi\u0165 aj na\u010Falej pracova\u0165 offline.',
	EMMOF1001W : 'Synchroniz\u00E1cia dokon\u010Den\u00E1 s chybami!  Na zapnutie re\u017Eimu offline znova spustite synchroniz\u00E1ciu.',
	EMMOF1002W : 'Synchroniz\u00E1cia dokon\u010Den\u00E1 s chybami!  M\u00F4\u017Eete sk\u00FAsi\u0165 znova vykona\u0165 synchroniz\u00E1ciu alebo pokra\u010Dujte v pr\u00E1ci offline.',
	EMMOF1003W : 'Synchroniz\u00E1cia dokon\u010Den\u00E1 s chybami!  Ak chcete pracova\u0165 offline, sk\u00FAste znova vykona\u0165 synchroniz\u00E1ciu.',
	EMMOF1004W : '{0} mus\u00ED \u00EDs\u0165 o \u010D\u00EDslo',
	EMMOF1005W : 'Ch\u00FDbaj\u00FA po\u017Eadovan\u00E9 polia: {0}',
	EMMOF1006W : 'Atrib\u00FAt {0} sl\u00FA\u017Ei len na \u010D\u00EDtanie',
	EMMOF1007W : 'Zvo\u013Ete si hodnotu',
	EMMOF1008I : 'Stav sa \u00FAspe\u0161ne zmenil',
	EMMOF1009W : 'Zadajte mno\u017Estvo, ktor\u00E9 bude v\u00E4\u010D\u0161ie ne\u017E nula',
	EMMOF1010W : '{0} \u010D\u00EDslo mus\u00ED by\u0165 v\u00E4\u010D\u0161ie ne\u017E nula',
	EMMOF1011W : '{0} je po\u017Eadovan\u00E9',
	EMMOF1012W : 'Pre t\u00FAto polo\u017Eku neexistuje \u017Eiadny zostatok, kombin\u00E1cie skladu, a z\u00E1sobn\u00EDka',
	EMMOF1013W : 'Zostatok v z\u00E1sobn\u00EDku bude v d\u00F4sledku tejto transakcie negat\u00EDvny',
	EMMOF1014W : 'Nemo\u017Eno vykona\u0165 prenos,, ak s\u00FA \u010D\u00EDsla z\u00E1sobn\u00EDku a id lokal\u00EDt rovnak\u00E9',
	// [WF]		
	EMMWF1000I : 'Spusti\u0165 pracovn\u00FD postup',
	EMMWF1001I : 'Pre t\u00FAto aplik\u00E1ciu existuje viac ne\u017E jeden proces pracovn\u00E9ho postupu.  Zvo\u013Ete si aspo\u0148 jednu a potom stla\u010Dte OK.',
	EMMWF1002I : 'Zvo\u013Ete si proces',
	EMMWF1003I : 'Proces',
	EMMWF1004I : 'Pam\u00E4\u0165',
	EMMWF1005I : 'Zastavi\u0165 pracovn\u00FD postup',
	// [ES]
	EMMES1000I : 'Overenie e-Sign',
	EMMES1001I : 'Vy\u017Eaduje sa elektronick\u00FD postup',
	EMMES1002E : 'Overenie zlyhalo',
	EMMES1003I : 'Zadajte heslo a d\u00F4vod',
	EMMES1004I : 'Pou\u017E\u00EDvate\u013E',
	EMMES1005I : 'Heslo',
	EMMES1006I : 'D\u00F4vod',
	// [GB]
	EMMGB1001I : 'E-mail',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Zru\u0161i\u0165',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Potvrdi\u0165',
	EMMGB1006I : '\u00C1no',
	EMMGB1007I : 'Nie',
	EMMGB1008I : 'Telef\u00F3n',
	EMMGB1009I : 'Hovor',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Potvrdi\u0165 vymazanie?',
	EMMGB1012I : '{0} mus\u00ED sa objavi\u0165 pred {1}',
	EMMGB1013I : '{0} mus\u00ED sa objavi\u0165 po {1}',
	EMMGB1014I : '{0} mus\u00ED sa objavi\u0165 v minulosti',
	// General	
	OFFLINEMODE : 'Offline re\u017Eim',
	SYNCNEEDED : ' \u2013 upraven\u00E9, Synchroniz\u00E1cia potrebn\u00E1',
	SYNCHRONIZATION : 'Synchroniz\u00E1cia',
	SYNCSERVER : 'Synchronizova\u0165 so serverom',
	ENTERLABOR: 'Zada\u0165 pod\u013Ea pr\u00E1ce',
	ADDMORE: 'Prida\u0165 viac...',
	GOONLINE : 'Prejs\u0165 sp\u00E4\u0165 online',
	GOTOOFFLINEAPPS : 'Prejdite do offline aplik\u00E1ci\u00ED',
	OFFLINEAPPS : 'Offline aplik\u00E1cie',
	QUICKSCAN : 'R\u00FDchle skenovanie: ',
	ACTIVEWORKORDERS : 'Akt\u00EDvne pracovn\u00E9 objedn\u00E1vky',
	RECORDSAVED: 'Z\u00E1znam ulo\u017Een\u00FD',
	RECORDNOTSAVED: 'Chyba \u2013 nepri\u0161li inform\u00E1cie o \u017Eiadnom z\u00E1zname',
	TIMERALREADYSTARTED: '\u010Casova\u010D u\u017E je spusten\u00FD',
	TIMERNOTFOUND : '\u010Casova\u010D neza\u010Dal. Nena\u0161iel sa \u017Eiadny akt\u00EDvny \u010Dasova\u010D.',
	TIMERSTARTED : '\u010Casova\u010D spusten\u00FD',
	TIMERSTOPPED : '\u010Casova\u010D zastaven\u00FD',
	TOOLS : 'N\u00E1stroje',
	STARTTIMER : 'Spusti\u0165 \u010Dasova\u010D',
	STOPTIMER : 'Zastavi\u0165 \u010Dasova\u010D',
	MODIFYSAVE : 'Z\u00E1znam upraven\u00FD.  Ulo\u017Ete svoje zmeny.',
	SITEREQUIRED : 'Lokalita je potrebn\u00E1 na vytvorenie pracovnej objedn\u00E1vky.',
	NOVALUE : 'Pr\u00E1zdna hodnota',
	ACTIONS : 'Akcie',
	CHILDRENOF : 'Podraden\u00E9 \u2013',
	RESPONSIBILITY : 'Zodpovednos\u0165',
	LOOKUP : 'Vyh\u013Ead\u00E1vanie',
	LOCATIONDRILLDOWN : 'Hlb\u0161ie inform\u00E1cie o umiestnen\u00ED',
	ASSETDRILLDOWN : 'Hlb\u0161ie inform\u00E1cie o akt\u00EDve',
	DRILLDOWN : 'Hlb\u0161ie inform\u00E1cie',
	BACK : 'Sp\u00E4\u0165',
	SAVE : 'Ulo\u017Ei\u0165',
	APPLY : 'Pou\u017Ei\u0165',
	FILTER : 'Filter',
	RESET : 'Reset',
	SELECTVALUE : 'V\u00FDber hodnoty',
	CANCEL : 'Zru\u0161i\u0165',
	OK : 'OK',
	YES : '\u00C1no',
	NO : 'Nie',
	CREATEFOLLOWUP : 'Vytvori\u0165 n\u00E1slednos\u0165',
	CREATESR : 'Vytvori\u0165 \u017Eiados\u0165 o nov\u00FA slu\u017Ebu',
	PARENT : 'Nadraden\u00E9',
	CHANGESTATUS : 'Zmeni\u0165 stav',
	LABOR : 'Pr\u00E1ca',
	MATERIALS : 'Materi\u00E1ly',
	TASKS : '\u00DAlohy',
	ATTACHMENTS : 'Pr\u00EDlohy',
	FAILUREREPORTING : 'Hl\u00E1senie por\u00FAch',
	MULTIASSETS : 'Viacn\u00E1sobn\u00E9 akt\u00EDva, Umiestnenia',
	ADDNEW : 'Prida\u0165 nov\u00E9',
	CLASSIFICATION : 'Klasifik\u00E1cia',
	NORECORDS : 'Nena\u0161li sa \u017Eiadne z\u00E1znamy',
	NORECORDEXIST : 'Nena\u0161iel sa \u017Eiadny z\u00E1znam alebo u\u017E neexistuje',
	NORECORDSADJ : '\u017Diadne z\u00E1znamy na \u00FApravu fyzick\u00FDch mno\u017Estiev',
	SELECTOWNER : 'Zvo\u013Ete si majite\u013Ea',
	OWNER : 'Majite\u013E',
	OWNERGROUP : 'Skupina majite\u013Eov',
	TAKEOWNERSHIP : 'Prevzia\u0165 vlastn\u00EDctvo',
	SORTBY : 'Zoradi\u0165 pod\u013Ea',
	LIST : 'Zoznam',
	QUICKSEARCH: 'R\u00FDchle vyh\u013Ead\u00E1vanie',
	INVENTORYBYSR : 'Inventariz\u00E1cia pod\u013Ea skladiska',
	INVDETAILS : 'Podrobnosti invent\u00E1ra',
	NEWCOUNT : 'Nov\u00FD po\u010Det',
	LABORTRANS : 'Pracovn\u00E9 transakcie',
	CREATEWO : 'Vytvori\u0165 nov\u00FA pracovn\u00FA objedn\u00E1vku',
	MYWOS : 'Moje pracovn\u00E9 objedn\u00E1vky',
	FAILUREREPORT : 'Hl\u00E1senie por\u00FAch',
	METERREADINGS : 'Zadajte \u00FAdaje z mera\u010Da',
	ASSETMETER : '\u00DAdaje z mera\u010Da akt\u00EDv',
	LOCATIONMETER : '\u00DAdaje z mera\u010Da umiestnen\u00ED',
	FROM : 'Od',
	TO : 'Do',
	ADVANCED : 'Pokro\u010Dil\u00E9',
	ADVANCEDSEARCH : 'Pokro\u010Dil\u00E9 vyh\u013Ead\u00E1vanie',
	DOWNTIME : 'Prestoj',
	PURCHASEINFO : 'Inform\u00E1cie n\u00E1kupu',
	SPAREPARTS : 'N\u00E1hradn\u00E9 diely',
	SCHEDULEINFO : 'Inform\u00E1cie o pl\u00E1novan\u00ED',
	PLANLABOR : 'Pl\u00E1novanie pr\u00E1ce',
	PLANMATERIAL : 'Pl\u00E1novan\u00E9 materi\u00E1ly',
	WOCREATED : 'Pracovn\u00E1 objedn\u00E1vka {0} vytvoren\u00E1.',
	PRESTART : 'Predbe\u017En\u00FD \u0161tart',
	REVIEWANDAPPROVE : 'Skontrolova\u0165 a schv\u00E1li\u0165',
	MOCACTIONGROUP : 'Zvo\u013Ete si ak\u010Dn\u00FA skupinu MOC',
	MOCACTIONS : 'Zvo\u013Ete si akcie MOC',
	REVIEWERSAVED : 'Kontrol\u00F3r(i) \u2013 ulo\u017Een\u00E9 offline.',
	APPROVERSAVED : 'Schva\u013Eovatelia \u2013 ulo\u017Een\u00E9 offline.',
	ACTIONSAVED : 'Akcie ulo\u017Een\u00E9 offline.',
	NOACTIONS : '\u0160tandardn\u00E1 ak\u010Dn\u00E1 skupina {0} nem\u00E1 \u017Eiadne platn\u00E9 \u00FAkony na pridanie.',
	SRQUEUED : 'SR {0} stav sa zmenil na VO FRONTE.',
	SELECTREVIEWERS : 'Zvo\u013Ete si kontrol\u00F3rov',
	SELECTAPPROVERS : 'Zvo\u013Ete si schva\u013Eova\u010Dov',
	APPROVERS : 'Schva\u013Eova\u010Di',
	REVIEWERS : 'Kontrol\u00F3ri',
	VIEWLIST: 'Zobrazi\u0165 zoznam',
	VIEWSUMMARY : 'Zobrazi\u0165 s\u00FAhrn',
	STOREROOMS : 'Sklady',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Prejs\u0165 na',
	APPS : 'Aplik\u00E1cie',
	STARTCENTER : 'Stredisko sp\u00FA\u0161\u0165ania',
	PAGINATION : {
		TITLE : 'Strana {{from}} z {{to}} - {{total}} z\u00e1znamy',
		PREV : 'Predo\u0161l\u00E9',
		NEXT : '\u010Eal\u0161ie'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Umiestnenie',
		ASSET : 'Akt\u00EDvum',
		WOTRACK : 'Sledovanie pracovnej objedn\u00E1vky',
		SR : 'Servisn\u00E9 \u017Eiadosti',
		INVENTOR: 'Invent\u00E1r',
		INVISSUE: 'Probl\u00E9my a transfery',
		MOC : 'MOC (ropa)',
		CREATEDR : 'Vytvori\u0165 po\u017Eiadavku',
		VIEWDR : 'Zobrazi\u0165 po\u017Eiadavky',
		LABREP: 'Po\u017Eiadavky na pr\u00E1cu',
		TXNTRACK : 'Synchronizova\u0165 rozl\u00ED\u0161enie'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Akt\u00EDvum \u010D.',
		STATUS : 'Stav',
		STATUSDATE: 'D\u00E1tum poslednej zmeny',
		INSTALLDATE: 'D\u00E1tum in\u0161tal\u00E1cie',
		SITEID : 'Lokalita',
		PARENT : 'Nadraden\u00E9',
		ASSETTYPE: 'Typ',
		LONGDESCRIPTION : 'Podrobnosti',
		GROUPNAME: 'Skupina mera\u010Da',
		SERIALNUM: 'S\u00E9riov\u00E9 \u010D.',
		PURCHASEPRICE: 'N\u00E1kupn\u00E1 cena',
		TOTDOWNTIME: 'Celkov\u00FD prestoj',
		ISRUNNING: 'Akt\u00EDvum nahor',
		VENDOR: 'Dod\u00E1vate\u013E',
		MANUFACTURER: 'V\u00FDrobca',
		FAILURECODE: 'Typ chyby',
		DESCRIPTION : 'Popis',
		LOCATION : 'Umiestnenie',
		LOCDESC : 'Podrobnosti',
		SEQUENCE : 'Sekvencia',
		PROGRESS : 'Ozna\u010Di\u0165 progres?',
		COMMENTS : 'Koment\u00E1re',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Pracovn\u00E1 objedn\u00E1vka',
		DESCRIPTION : 'Popis',
		LONGDESCRIPTION : 'Podrobnosti',
		STATUS : 'Stav',
		PARENT : 'Nadraden\u00E1 prac. obj.',
		SITEID : 'Lokalita',
		LOCATION : 'Umiestnenie',
		ASSETNUM : 'Akt\u00EDvum',
		WORKTYPE : 'Typ pr\u00E1ce',
		WOPRIORITY : 'Priorita',
		GLACCOUNT : '\u00DA\u010Det GL',
		FAILURECODE : 'Typ chyby',
		PROBLEMCODE : 'K\u00F3d probl\u00E9mu',
		SUPERVISOR : 'Nadriaden\u00FD',
		CREWID : 'T\u00EDm',
		LEAD : 'Ved\u00FAci',
		PERSONGROUP : 'Pracovn\u00E1 skupina',
		REPORTEDBY : 'Nahlasovate\u013E \u2013',
		REPORTDATE : 'D\u00E1tum nahl\u00E1senia \u2013',
		PHONE : 'Telef\u00F3n',
		TASKID : '\u00DAloha',
		TARGSTARTDATE : 'Cie\u013Eov\u00E9 spustenie',
		TARGCOMPDATE : 'Cie\u013Eov\u00E9 dokon\u010Denie',
		SCHEDSTART : 'Pl\u00E1novan\u00E9 spustenie',
		SCHEDFINISH : 'Pl\u00E1novan\u00E9 dokon\u010Denie',
		ACTSTART : 'Skuto\u010Dn\u00E9 spustenie',
		ACTFINISH : 'Skuto\u010Dn\u00E9 dokon\u010Denie',
		ASSIGNMENT : 'Priraden\u00E1 pr\u00E1ca',
		OWNER : 'Majite\u013E',
		OWNERGROUP : 'Skupina majite\u013Eov',
		OBSERVATION : 'Pozorovanie',
		MEASUREMENTVALUE : 'Hodnota merania',
		HAZARDS: 'Rizik\u00E1',
		HAZARDSMAT: 'Nebezpe\u010Dn\u00E9 materi\u00E1ly',
		PRECAUTIONS: 'Opatrenia',
		LOCKTAG: 'Uzamkn\u00FA\u0165/ozna\u010Di\u0165',
		TAGOUT: 'Ozna\u010Di\u0165',
		LOCKOUT: 'Uzamkn\u00FA\u0165',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Popis',
		ITEM : 'Polo\u017Eka',
		LINETYPE : 'Typ riadku',
		QUANTITY : 'Mno\u017Estvo',
		STOREROOM : 'Sklad',
		STORELOC : 'Sklad',
		BINNUM : 'Z\u00E1sobn\u00EDk',
		CURBAL : 'Aktu\u00E1lny zostatok',
		UNITCOST : 'Jednotkov\u00FD n\u00E1klad',
		ASSET : 'Akt\u00EDvum',
		WORKORDER : 'Pracovn\u00E1 objedn\u00E1vka',
		LOCATION : 'Umiestnenie',
		ISSUETYPE : 'Typ vydania',
		ISSUETO : 'Adres\u00E1t',
		ROTASSETNUM : 'Ot\u00E1\u010Danie polo\u017Eky',
		SITEID : 'Lokalita',
		ISSUERETURN : 'Chyba a vr\u00E1tenie',
		CHARGEINFO : 'Inform\u00E1cie o platbe'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Popis',
		ITEM : 'Polo\u017Eka',
		LINETYPE : 'Typ riadku',
		QUANTITY : 'Mno\u017Estvo',
		STOREROOM : 'Sklad',
		BINNUM : 'Z\u00E1sobn\u00EDk',
		CURBAL : 'Aktu\u00E1lny zostatok',
		UNITCOST : 'Jednotkov\u00FD n\u00E1klad',
		ISSUETYPE : 'Typ vydania',
		LOCATION : 'Umiestnenie',
		TOOLRATE : 'Sadzba n\u00E1stroja',
		ASSETNUM: 'Akt\u00EDvum',
		TOOLHRS: 'Hod. n\u00E1stroja',
		LINECOST: 'Riadkov\u00FD n\u00E1klad',
		TOOLQTY: 'Mno\u017Estvo n\u00E1stroja'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Popis',
		ITEM : 'Polo\u017Eka',
		LINETYPE : 'Typ riadku',
		QUANTITY : 'Mno\u017Estvo',
		TOSTORELOC : 'Do umiestnenia',
		FROMSTORELOC : 'Z umiestnenia',
		FROMSITE : 'Z lokality',
		TOSITE : 'Do lokality',
		TOBIN: 'Do z\u00E1sobn\u00EDka',
		FROMBIN: 'Zo z\u00E1sobn\u00EDka',
		UNITCOST : 'Jednotkov\u00FD n\u00E1klad',
		ISSUETYPE : 'Typ vydania',
		CONVERSIONFACTOR : 'Konverzn\u00FD faktor',
		ROTASSETNUM : 'Ot\u00E1\u010Danie polo\u017Eky',
		TRANSFEROUT : 'Transfer smerom von',
		TRANSFERIN : 'Transfer smerom dnu',
		FROMQTY : 'Mno\u017Estvo z\u00E1sobn\u00EDka von',
		TOQTY : 'Mno\u017Estvo z\u00E1sobn\u00EDka dnu',
		SITEID : 'Lokalita',
		LOCATION : 'Umiestnenie',
		TRANSFERDETAILS: 'Podrobnosti prenosu'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Akt\u00EDvum',
		LOCATION : 'Umiestnenie',
		SEQUENCE : 'Sekvencia',
	},
	WORKLOG : {
		NAME : 'Denn\u00EDk pr\u00E1ce',
		DESCRIPTION : 'Popis',
		DETAILS : 'Podrobnosti',
		LOGTYPE : 'Typ',
		CREATEBY : 'Autor',
		CREATEDATE : 'D\u00E1tum vytvorenia'
	},
	SR : {
		ACTIVEREQS : 'Akt\u00EDvne servisn\u00E9 \u017Eiadosti',
		NEWREQS : 'Nov\u00E9 servisn\u00E9 \u017Eiadosti',
		AFFECTEDPERSON : 'Ovplyvnen\u00E1 osoba',
		DETAILS : 'Podrobnosti',
		GLACCOUNT : '\u00DA\u010Det GL',
		LOCATION : 'Umiestnenie',
		OWNER : 'Majite\u013E',
		OWNERGROUP : 'Skupina majite\u013Eov',
		REPORTEDPRIORITY : 'Hl\u00E1sen\u00E1 priorita',
		REPORTEDBY : 'Nahlasovate\u013E \u2013',
		REPORTDATE : 'D\u00E1tum hl\u00E1senia',
		REPORTEDPHONE : 'Nahl\u00E1sen\u00FD telef\u00F3n',
		REPORTEDEMAIL : 'Nahl\u00E1sen\u00E1 po\u0161ta',
		SITE : 'Lokalita',
		STATUS : 'Stav',
		SR : 'Servisn\u00E1 \u017Eiados\u0165',
		SUMMARY : 'S\u00FAhrn',
		ASSETNUM : 'Akt\u00EDvum',
		ASSETSITEID : 'Lokalita akt\u00EDva',
	},
	INVBALANCES : {
		ITEMNUM : 'Polo\u017Eka',
		DESCRIPTION : 'Popis',
		BINNUM : 'Z\u00E1sobn\u00EDk',
		CURBAL : 'Aktu\u00E1lny zostatok',
		PHYSCNT : 'Fyzick\u00FD zostatok',
		PHYSCNTDATE : 'D\u00E1tum fyzick\u00E9ho po\u010Dtu',
		RECONCILED : 'Uzmieren\u00E9',
		LOCATION : 'Sklad',
	},
	INVENTORY : {
		ITEMNUM : 'Polo\u017Eka',
		DESCRIPTION : 'Popis',
		SITEID : 'Lokalita',
		STATUS : 'Stav',
		LOCATION : 'Sklad',
		CATEGORY : 'Kateg\u00F3ria skladu',
		BINNUM : 'Predvolen\u00FD z\u00E1sobn\u00EDk',
		ISSUEUNIT : 'Jednotka probl\u00E9mu',
		CURBAL : 'Aktu\u00E1lny zostatok',
		LASTISSUEDATE : 'D\u00E1tum posledn\u00E9ho probl\u00E9mu',
		ISSUEYTD : 'Rok k d\u00E1tumu',
		ISSUE1YRAGO : 'Posledn\u00FD rok',
		PHYSCNT : 'Fyzick\u00FD po\u010Det',
		PHYSCNTDATE : 'D\u00E1tum fyzick\u00E9ho po\u010Dtu',
		RECONCILED : 'Uzmieren\u00E9',
		TOTALINVPHYBAL : 'Fyzick\u00FD zostatok',
		TOTALINVBAL : 'Aktu\u00E1lny zostatok',
		ISSUEHISTORY : 'Hist\u00F3ria probl\u00E9mov',
		INVBALANCE : 'Zostatky invent\u00E1ra',
		ADJCOUNT : 'Upravi\u0165 fyzick\u00E9 mno\u017Estv\u00E1 pre tieto {{count}} polo\u017Eky',
		BALSUMMARY : 'S\u00FAhrn dostupn\u00E9ho zostatku',
	},
	METER : {
		ASSETNUM : 'Akt\u00EDvum',
		METERNAME : 'Meranie',
		METERTYPE : 'Typ merania',
		READINGTYPE : 'Typ \u010D\u00EDtania \u00FAdajov',
		LASTREADING : 'Posledn\u00E9 \u010D\u00EDtanie \u00FAdajov',
		LASTREADINGDATE : 'D\u00E1tum posledn\u00E9ho \u010D\u00EDtania \u00FAdajov',
		LASTREADINGINSPECTOR : 'Kontrol\u00F3r posledn\u00E9ho \u010D\u00EDtania \u00FAdajov',
		READING : 'Nov\u00E9 \u010D\u00EDtanie \u00FAdajov',
		NEWREADINGDATE : 'D\u00E1tum nov\u00E9ho \u010D\u00EDtania \u00FAdajov'
	},
	WPLABOR : {
		NAME : 'Pl\u00E1novan\u00E1 pr\u00E1ca',
		LABORCODE : 'Pr\u00E1ca',
		CRAFT : 'Zostrojenie',
		QUANTITY : 'Mno\u017Estvo',
		LABORHRS : 'Be\u017En\u00E9 hodiny',
		DISPLAYNAME : 'Meno',
		SKILLLEVEL: 'N\u00E1zov',
		VENDOR : 'Dod\u00E1vate\u013E',
		AMCREW : 'T\u00EDm'
	},		
	WPMATERIAL : {
		NAME : 'Pl\u00E1novan\u00E9 materi\u00E1ly',
		LINETYPE : 'Typ riadku',
		ITEMNUM : 'Polo\u017Eka',
		DESCRIPTION : 'Popis',
		ITEMQTY : 'Mno\u017Estvo',
		UNITCOST : 'Jednotkov\u00FD n\u00E1klad',
		STOREROOM : 'Sklad',
		STORELOCSITE : 'Lokalita skladu',
		RESTYPE : 'Typ rezerv\u00E1cie',
		REQUIREDATE : 'D\u00E1tum je po\u017Eadovan\u00E1 inform\u00E1cia'
	},
	LABTRANS : {
		LABORCODE : 'Pr\u00E1ca',
		CRAFT : 'Zostrojenie',
		STARTDATE : 'D\u00E1tum za\u010Datia',
		TIMERSTATUS : 'Stav \u010Dasova\u010Da',
		REGULARHRS : 'Be\u017En\u00E9 hodiny',
		PAYRATE: 'R\u00FDchlos\u0165',
		PREMIUMPAYCODE : 'K\u00F3d pr\u00E9miovej platby',
		PREMIUMPAYHOURS : 'Hodiny pr\u00E9miovej platby',
		PREMIUMPAYRATE: 'Sadzba pr\u00E9miovej platby',
		WONUM : 'Pracovn\u00E1 objedn\u00E1vka',
		LOCATION : 'Umiestnenie',
		ASSETNUM : 'Akt\u00EDvum',
		TICKETID: 'Po\u017Eiadavka'
	},
	LABREP : {
		LABORCODE : 'Pr\u00E1ca',
		CRAFT : 'Zostrojenie',
		SKILLLEVEL : 'N\u00E1zov',
		STARTDATE : 'D\u00E1tum za\u010Datia',
		STARTTIME : '\u010Cas za\u010Datia',
		FINISHDATE : 'D\u00E1tum ukon\u010Denia',
		FINISHTIME : '\u010Cas ukon\u010Denia',
		REGULARHRS : 'Be\u017En\u00E9 hodiny',
		PAYRATE : 'R\u00FDchlos\u0165',
		TRANSTYPE : 'Typ',
		WONUM : 'Pracovn\u00E1 objedn\u00E1vka',
		LOCATION : 'Umiestnenie',
		ASSETNUM : 'Akt\u00EDvum',
		GENAPPRSERVRECEIPT: 'Schv\u00E1len\u00E9',
		NAME: 'Meno',
		TIMERSTATUS : 'Stav \u010Dasova\u010Da',
		PREMIUMPAYHOURS : 'Hodiny pr\u00E9miovej platby',
		PREMIUMPAYRATE: 'Sadzba pr\u00E9miovej platby',
		PREMIUMPAYCODE : 'K\u00F3d pr\u00E9miovej platby',
		TICKETID: 'Po\u017Eiadavka',
		TICKETCLASS: 'Trieda po\u017Eiadavky'
	},
	PERSON : {
		PERSONID: 'Osoba',
		FIRSTNAME: 'Meno',
		LASTNAME: 'Priezvisko'
	},
	FAILURECODE : {
		FAILURECODE : 'Typ chyby',
		PROBLEMCODE : 'Probl\u00E9m',
		CAUSECODE : 'Pr\u00ED\u010Dina',
		REMEDYCODE : 'Rie\u0161enie',
	},
	SPAREPART : {
		QUANTITY : 'Mno\u017Estvo',
		ISSUEDQTY : 'Vydan\u00E9 mno\u017Estvo',
		REMARKS : 'Pozn\u00E1mky',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Popis',
		LONGDESCRIPTION : 'Podrobnosti',
		ASSET : 'Akt\u00EDvum',
		STATUS : 'Stav',
		PARENT : 'Nadraden\u00E1 prac. obj.',
		SITE : 'Lokalita',
		LOCATION : 'Umiestnenie',
	},
	DOMAIN : {
		VALUE: 'Hodnota',
		DESCRIPTION: 'Popis',
	},
	MR : {
		MRNUM : 'Po\u017Eiadavka',
		DESCRIPTION : 'Popis',
		LONGDESCRIPTION : 'Dlh\u00FD popis',
		STATUS : 'Stav',
		PRIORITY : 'Priorita',
		CHARGEINFO : 'Inform\u00E1cie o platbe',
		REQUIREDDATE : 'D\u00E1tum je po\u017Eadovan\u00E1 inform\u00E1cia',
		WONUM : 'Pracovn\u00E1 objedn\u00E1vka',
		LOCATION : 'Umiestnenie',
		ASSET : 'Akt\u00EDvum',
		GLACCOUNT : 'Debetn\u00FD \u00FA\u010Det GL',
		MRLINES : 'Polo\u017Eky riadku po\u017Eiadavky',
		ENTERDATE : 'Zadan\u00FD d\u00E1tum'
	},
	MRLINE : {
		MRLINEITEM : 'Polo\u017Eka po\u017Eiadavky',
		MRLINENUM : 'Riadok',
		LINETYPE : 'Typ riadku',
		ITEM : 'Polo\u017Eka',
		DESCRIPTION : 'Popis',
		QTY : 'Mno\u017Estvo',
		ORDERUNIT : 'Jednotka objedn\u00E1vky',
		UNITCOST : 'Jednotkov\u00FD n\u00E1klad',
		LINECOST : 'Riadkov\u00FD n\u00E1klad',
		REQUIREDDATE : 'D\u00E1tum je po\u017Eadovan\u00E1 inform\u00E1cia'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Zobrazi\u0165 odoslan\u00E9 po\u017Eiadavky',
		VIEWSAVED : 'Zobrazi\u0165 ulo\u017Een\u00E9 po\u017Eiadavky',
		EDIT : 'Upravi\u0165 po\u017Eiadavku'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Ulo\u017Ei\u0165 ako koncept',
		NEWREQITEM : 'Nov\u00E1 polo\u017Eka po\u017Eiadavky',
		SUBMIT : 'Odosla\u0165'
	},
	CLASSIFY : {
		CLASSASSET : 'Klasifikova\u0165 akt\u00EDvum',
		CLASSWO : 'Klasifikova\u0165 objedn\u00E1vku pr\u00E1c',
		DESCRIPTION : 'Popis triedy',
		CLASSIFICATION : 'Klasifik\u00E1cia'
	}
};