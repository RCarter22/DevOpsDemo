'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: cs_CZ
 */
var locale = 'cs_CZ'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Nastavit',
        cancelText: 'Zru\u0161it',
        clearText: 'Vymazat',
        selectedText: 'Vybran\u00E9',
        // Calender component
        calendarText: 'Kalend\u00E1\u0159',
        dateText: 'Datum',
        timeText: '\u010Cas',
        // Datetime component
        dateFormat: 'd.m.y',
        dateOrder: 'dmy',
        dayNames: ['Ned\u011Ble', 'Pond\u011Bl\u00ED', '\u00DAter\u00FD', 'St\u0159eda', '\u010Ctvrtek', 'P\u00E1tek', 'Sobota'],
        dayNamesShort: ['Ne', 'Po', '\u00DAt', 'St', '\u010Ct', 'P\u00E1', 'So'],
        dayText: 'Den',
        hourText: 'Hodiny',
        minuteText: 'Minuty',
        monthNames: ['Leden', '\u00DAnor', 'B\u0159ezen', 'Duben', 'Kv\u011Bten', '\u010Cerven', '\u010Cervenec', 'Srpen', 'Z\u00E1\u0159\u00ED', '\u0158\u00EDjen', 'Listopad', 'Prosinec'],
        monthNamesShort: ['Led', '\u00DAno', 'B\u0159e', 'Dub', 'Kv\u011B', '\u010Cen', '\u010Cec', 'Srp', 'Z\u00E1\u0159', '\u0158\u00EDj', 'Lis', 'Pro'],
        monthText: 'M\u011Bs\u00EDc',
        secText: 'Sekundy',
        amText: 'dop.',
        pmText: 'odp.',
        timeFormat: 'H:ii',
        timeWheels: 'Hii',
        yearText: 'Rok',
        nowText: 'Nyn\u00ED',
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
	        symbol: 'K\u010d'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "nula",
		ONE : "jeden",
		TWO : "dva",
		FEW : "n\u011Bkolik",
		MANY : "mnoho",
		OTHER : "jin\u00E9"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "dop.", "odp." ],
			"DAY" : [ "ned\u011ble", "pond\u011bl\u00ed", "\u00fater\u00fd", "st\u0159eda", "\u010dtvrtek", "p\u00e1tek", "sobota" ],
			"MONTH" : [ "ledna", "\u00fanora", "b\u0159ezna", "dubna", "kv\u011btna", "\u010dervna", "\u010dervence", "srpna", "z\u00e1\u0159\u00ed", "\u0159\u00edjna", "listopadu", "prosince" ],
			"SHORTDAY" : [ "ne", "po", "\u00fat", "st", "\u010dt", "p\u00e1", "so" ],
			"SHORTMONTH" : [ "led", "\u00fano", "b\u0159e", "dub", "kv\u011b", "\u010dvn", "\u010dvc", "srp", "z\u00e1\u0159", "\u0159\u00edj", "lis", "pro" ],
			"fullDate" : "EEEE d. MMMM y",
			"longDate" : "d. MMMM y",
			"medium": "d. M. y H:mm:ss",
			"mediumDate" : "d. M. y",
			"mediumTime" : "H:mm:ss",
			"short" : "d.M.yy H:mm",
			"shortDate" : "d.M.yy",
			"shortTime" : "H:mm"				
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "K\u010d",
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
 * Language: CS
 */
var lang = 'CS'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Synchronizace byla dokon\u010Dena a\u00A0do\u0161lo k\u00A0chyb\u00E1m.  M\u016F\u017Eete i\u00A0nad\u00E1le pracovat offline.',
	EMMOF1001W : 'Synchronizace byla dokon\u010Dena a\u00A0do\u0161lo k\u00A0chyb\u00E1m.  Aby bylo mo\u017En\u00E9 povolit re\u017Eim offline, zopakujte synchronizaci.',
	EMMOF1002W : 'Synchronizace byla dokon\u010Dena a\u00A0do\u0161lo k\u00A0chyb\u00E1m.  M\u016F\u017Eete znovu opakovat pokus o\u00A0synchronizaci nebo pokra\u010Dovat v\u00A0pr\u00E1ci offline.',
	EMMOF1003W : 'Synchronizace byla dokon\u010Dena a\u00A0do\u0161lo k\u00A0chyb\u00E1m.  Aby bylo mo\u017En\u00E9 pracovat offline, pokuste se znovu prov\u00E9st synchronizaci.',
	EMMOF1004W : '{0} mus\u00ED b\u00FDt \u010D\u00EDslo',
	EMMOF1005W : 'Chyb\u00ED po\u017Eadovan\u00E1 pole: {0}',
	EMMOF1006W : 'Atribut {0} je jen pro \u010Dten\u00ED',
	EMMOF1007W : 'Vyberte hodnotu',
	EMMOF1008I : 'Stav byl \u00FAsp\u011B\u0161n\u011B zm\u011Bn\u011Bn',
	EMMOF1009W : 'Zadejte mno\u017Estv\u00ED v\u011Bt\u0161\u00ED ne\u017E nula',
	EMMOF1010W : '{0} mus\u00ED b\u00FDt v\u011Bt\u0161\u00ED ne\u017E nula',
	EMMOF1011W : '{0} je po\u017Eadov\u00E1no',
	EMMOF1012W : 'Neexistuje \u017E\u00E1dn\u00FD z\u016Fstatek pro tyto kombinace polo\u017Eek, skladovac\u00ED m\u00EDstnosti, a\u00A0p\u0159ihr\u00E1dky',
	EMMOF1013W : 'V\u00FDsledkem t\u00E9to transakce je vznik z\u00E1porn\u00E9ho z\u016Fstatku v\u00A0p\u0159ihr\u00E1dce',
	EMMOF1014W : 'Nelze p\u0159en\u00E9st, kdy\u017E jsou v\u0161echna \u010D\u00EDsla, p\u0159ihr\u00E1dek a\u00A0ID lokalit identick\u00E1',
	// [WF]		
	EMMWF1000I : 'Zah\u00E1jit pracovn\u00ED postup',
	EMMWF1001I : 'Pro tuto aplikaci je k\u00A0dispozici v\u00EDce pracovn\u00EDch postup\u016F.  Jeden vyberte a\u00A0stiskn\u011Bte tla\u010D\u00EDtko OK.',
	EMMWF1002I : 'Vyberte proces',
	EMMWF1003I : 'Proces',
	EMMWF1004I : 'Pozn\u00E1mka',
	EMMWF1005I : 'Zastavit pracovn\u00ED postup',
	// [ES]
	EMMES1000I : 'Autorizace el. podpisem',
	EMMES1001I : 'Elektronick\u00FD podpis je povinn\u00FD',
	EMMES1002E : 'Autorizace se nezda\u0159ila',
	EMMES1003I : 'Zadejte heslo a\u00A0d\u016Fvod',
	EMMES1004I : 'U\u017Eivatel',
	EMMES1005I : 'Heslo',
	EMMES1006I : 'D\u016Fvod',
	// [GB]
	EMMGB1001I : 'E-mail',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Zru\u0161it',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Potvrdit',
	EMMGB1006I : 'Ano',
	EMMGB1007I : 'Ne',
	EMMGB1008I : 'Telefon',
	EMMGB1009I : 'Hovor',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Potvrdit odstran\u011Bn\u00ED?',
	EMMGB1012I : '{0} mus\u00ED b\u00FDt p\u0159ed {1}',
	EMMGB1013I : '{0} mus\u00ED b\u00FDt po {1}',
	EMMGB1014I : '{0} mus\u00ED b\u00FDt v\u00A0minulosti',
	// General	
	OFFLINEMODE : 'Re\u017Eim offline',
	SYNCNEEDED : ' \u2013 zm\u011Bn\u011Bno, Je t\u0159eba synchronizovat',
	SYNCHRONIZATION : 'Synchronizace',
	SYNCSERVER : 'Synchronizovat se serverem',
	ENTERLABOR: 'Zadat podle pr\u00E1ce',
	ADDMORE: 'P\u0159idat dal\u0161\u00ED...',
	GOONLINE : 'P\u0159ej\u00EDt zp\u011Bt online',
	GOTOOFFLINEAPPS : 'P\u0159ej\u00EDt k\u00A0offline aplikac\u00EDm',
	OFFLINEAPPS : 'Aplikace offline',
	QUICKSCAN : 'Rychl\u00E9 skenov\u00E1n\u00ED:',
	ACTIVEWORKORDERS : 'Aktivn\u00ED pracovn\u00ED p\u0159\u00EDkazy',
	RECORDSAVED: 'Z\u00E1znam byl ulo\u017Een',
	RECORDNOTSAVED: 'Chyba: Nebyl vr\u00E1cen \u017E\u00E1dn\u00FD z\u00E1znam',
	TIMERALREADYSTARTED: '\u010Casova\u010D ji\u017E byl spu\u0161t\u011Bn',
	TIMERNOTFOUND : '\u010Casova\u010D nebyl spu\u0161t\u011Bn. Nebyl nalezen \u017E\u00E1dn\u00FD aktivn\u00ED \u010Dasova\u010D.',
	TIMERSTARTED : '\u010Casova\u010D byl spu\u0161t\u011Bn',
	TIMERSTOPPED : '\u010Casova\u010D byl zastaven',
	TOOLS : 'N\u00E1stroje',
	STARTTIMER : 'Spustit \u010Dasova\u010D',
	STOPTIMER : 'Zastavit \u010Dasova\u010D',
	MODIFYSAVE : 'Z\u00E1znam byl upraven.  Ulo\u017Ete zm\u011Bny.',
	SITEREQUIRED : 'Lokalita je nutn\u00E1 k\u00A0vytvo\u0159en\u00ED pracovn\u00EDho p\u0159\u00EDkazu.',
	NOVALUE : 'Pr\u00E1zdn\u00E1 hodnota',
	ACTIONS : 'Akce',
	CHILDRENOF : 'Pod\u0159\u00EDzen\u00E9 polo\u017Eky',
	RESPONSIBILITY : 'Odpov\u011Bdnost',
	LOOKUP : 'Vyhledat',
	LOCATIONDRILLDOWN : 'Podrobnosti o\u00A0um\u00EDst\u011Bn\u00ED',
	ASSETDRILLDOWN : 'Podrobnosti o\u00A0aktivech',
	DRILLDOWN : 'Podrobnosti',
	BACK : 'Zp\u011Bt',
	SAVE : 'Ulo\u017Eit',
	APPLY : 'Pou\u017E\u00EDt',
	FILTER : 'Filtr',
	RESET : 'Resetovat',
	SELECTVALUE : 'Vybrat hodnotu',
	CANCEL : 'Zru\u0161it',
	OK : 'OK',
	YES : 'Ano',
	NO : 'Ne',
	CREATEFOLLOWUP : 'Vytvo\u0159it n\u00E1slednou aktivitu',
	CREATESR : 'Vytvo\u0159it nov\u00FD po\u017Eadavek na slu\u017Ebu',
	PARENT : 'Nad\u0159azen\u00E1 polo\u017Eka',
	CHANGESTATUS : 'Zm\u011Bnit stav',
	LABOR : 'Pr\u00E1ce',
	MATERIALS : 'Materi\u00E1ly',
	TASKS : '\u00DAlohy',
	ATTACHMENTS : 'P\u0159\u00EDlohy',
	FAILUREREPORTING : 'Vykazov\u00E1n\u00ED selh\u00E1n\u00ED',
	MULTIASSETS : 'V\u00EDce aktiv, Um\u00EDst\u011Bn\u00ED',
	ADDNEW : 'P\u0159idat nov\u00FD',
	CLASSIFICATION : 'Klasifikace',
	NORECORDS : 'Nebyl nalezen \u017E\u00E1dn\u00FD z\u00E1znam',
	NORECORDEXIST : 'Nebyl nalezen \u017E\u00E1dn\u00FD z\u00E1znam nebo z\u00E1znam ji\u017E neexistuje',
	NORECORDSADJ : 'Neexistuj\u00ED \u017E\u00E1dn\u00E9 z\u00E1znamy k\u00A0\u00FAprav\u011B inventur',
	SELECTOWNER : 'Vybrat vlastn\u00EDka',
	OWNER : 'Vlastn\u00EDk',
	OWNERGROUP : 'Skupina vlastn\u00EDk\u016F',
	TAKEOWNERSHIP : 'St\u00E1t se vlastn\u00EDkem',
	SORTBY : 'T\u0159\u00EDdit dle',
	LIST : 'Seznam',
	QUICKSEARCH: 'Rychl\u00E9 hled\u00E1n\u00ED',
	INVENTORYBYSR : 'Z\u00E1soby podle skladovac\u00ED m\u00EDstnosti',
	INVDETAILS : 'Podrobnosti o\u00A0z\u00E1sob\u00E1ch',
	NEWCOUNT : 'Nov\u00FD po\u010Det',
	LABORTRANS : 'Transakce pr\u00E1ce',
	CREATEWO : 'Vytvo\u0159it nov\u00FD pracovn\u00ED p\u0159\u00EDkaz',
	MYWOS : 'Moje pracovn\u00ED p\u0159\u00EDkazy',
	FAILUREREPORT : 'Vykazov\u00E1n\u00ED selh\u00E1n\u00ED',
	METERREADINGS : 'Zadat ode\u010Dty m\u011B\u0159i\u010De',
	ASSETMETER : 'Ode\u010Dty m\u011B\u0159i\u010De aktiv',
	LOCATIONMETER : 'Ode\u010Dty m\u011B\u0159i\u010De um\u00EDst\u011Bn\u00ED',
	FROM : 'Od',
	TO : 'Do',
	ADVANCED : 'Pokro\u010Dil\u00E9',
	ADVANCEDSEARCH : 'Roz\u0161\u00ed\u0159en\u00e9 hled\u00e1n\u00ed',
	DOWNTIME : 'Prostoj',
	PURCHASEINFO : 'Informace o\u00A0n\u00E1kupu',
	SPAREPARTS : 'N\u00E1hradn\u00ED d\u00EDly',
	SCHEDULEINFO : 'Informace o\u00A0pl\u00E1nov\u00E1n\u00ED',
	PLANLABOR : 'Napl\u00E1novat pr\u00E1ci',
	PLANMATERIAL : 'Pl\u00E1novan\u00E9 materi\u00E1ly',
	WOCREATED : 'Pracovn\u00ED p\u0159\u00EDkaz {0} byl vytvo\u0159en.',
	PRESTART : 'P\u0159ed spu\u0161t\u011Bn\u00EDm',
	REVIEWANDAPPROVE : 'Zkontrolovat a\u00A0schv\u00E1lit',
	MOCACTIONGROUP : 'Vybrat skupinu akc\u00ED MOC',
	MOCACTIONS : 'Vybrat akce MOC',
	REVIEWERSAVED : 'Kontrolo\u0159i ulo\u017Een\u00ED offline.',
	APPROVERSAVED : 'Schvalovatel\u00E9 ulo\u017Een\u00ED offline.',
	ACTIONSAVED : 'Akce ulo\u017Een\u00E9 offline.',
	NOACTIONS : 'Skupina standardn\u00EDch akc\u00ED {0} nem\u00E1 \u017E\u00E1dn\u00E9 platn\u00E9 standardn\u00ED akce k\u00A0p\u0159id\u00E1n\u00ED.',
	SRQUEUED : 'Stav {0} SR byl zm\u011Bn\u011Bn na hodnotu VE FRONT\u011A.',
	SELECTREVIEWERS : 'Vybrat kontrolory',
	SELECTAPPROVERS : 'Vybrat schvalovatele',
	APPROVERS : 'Schvalovatel\u00E9',
	REVIEWERS : 'Kontrolo\u0159i',
	VIEWLIST: 'Zobrazit seznam',
	VIEWSUMMARY : 'Zobrazit souhrn',
	STOREROOMS : 'Skladovac\u00ED m\u00EDstnosti',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'P\u0159ej\u00EDt na',
	APPS : 'Aplikace',
	STARTCENTER : 'Centrum zah\u00E1jen\u00ED',
	PAGINATION : {
		TITLE : 'Strana {{from}} z {{to}} - {{total}} Z\u00e1znamy',
		PREV : 'P\u0159edchoz\u00ED',
		NEXT : 'Dal\u0161\u00ED'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		ASSET : 'Aktivum',
		WOTRACK : 'Sledov\u00E1n\u00ED pracovn\u00EDho p\u0159\u00EDkazu',
		SR : 'Po\u017Eadavky na slu\u017Ebu',
		INVENTOR: 'Z\u00E1soby',
		INVISSUE: 'Vydan\u00E9 a\u00A0p\u0159eveden\u00E9',
		MOC : 'MOC (ropa)',
		CREATEDR : 'Vytvo\u0159it \u017E\u00E1danku',
		VIEWDR : 'Zobrazit \u017E\u00E1danky',
		LABREP: 'Vykazov\u00E1n\u00ED pr\u00E1ce',
		TXNTRACK : 'Rozli\u0161en\u00ED synchronizace'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Aktivum \u010D.',
		STATUS : 'Stav',
		STATUSDATE: 'Datum posledn\u00ED zm\u011Bny',
		INSTALLDATE: 'Datum instalace',
		SITEID : 'Lokalita',
		PARENT : 'Nad\u0159azen\u00E1 polo\u017Eka',
		ASSETTYPE: 'Typ',
		LONGDESCRIPTION : 'Podrobnosti',
		GROUPNAME: 'Skupina m\u011B\u0159i\u010D\u016F',
		SERIALNUM: 'S\u00E9riov\u00E9 \u010D.',
		PURCHASEPRICE: 'N\u00E1kupn\u00ED cena',
		TOTDOWNTIME: 'Celkov\u00FD prostoj',
		ISRUNNING: 'Aktivum nahoru',
		VENDOR: 'Dodavatel',
		MANUFACTURER: 'V\u00FDrobce',
		FAILURECODE: 'T\u0159\u00EDda selh\u00E1n\u00ED',
		DESCRIPTION : 'Popis',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		LOCDESC : 'Podrobnosti',
		SEQUENCE : 'Po\u0159ad\u00ED',
		PROGRESS : 'Ozna\u010Dit postup?',
		COMMENTS : 'Koment\u00E1\u0159e',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Pracovn\u00ED p\u0159\u00EDkaz',
		DESCRIPTION : 'Popis',
		LONGDESCRIPTION : 'Podrobnosti',
		STATUS : 'Stav',
		PARENT : 'Nad\u0159azen\u00FD prac. p\u0159\u00EDkaz',
		SITEID : 'Lokalita',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		ASSETNUM : 'Aktivum',
		WORKTYPE : 'Typ pr\u00E1ce',
		WOPRIORITY : 'Priorita',
		GLACCOUNT : '\u00DA\u010Det hlavn\u00ED knihy',
		FAILURECODE : 'T\u0159\u00EDda selh\u00E1n\u00ED',
		PROBLEMCODE : 'K\u00F3d probl\u00E9mu',
		SUPERVISOR : 'Supervisor',
		CREWID : 'T\u00FDm',
		LEAD : 'Vedouc\u00ED',
		PERSONGROUP : 'Pracovn\u00ED skupina',
		REPORTEDBY : 'Nahl\u00E1sil/a',
		REPORTDATE : 'Datum nahl\u00E1\u0161en\u00ED',
		PHONE : 'Telefon',
		TASKID : '\u00DAloha',
		TARGSTARTDATE : 'C\u00EDlov\u00FD za\u010D\u00E1tek',
		TARGCOMPDATE : 'C\u00EDlov\u00E9 dokon\u010Den\u00ED',
		SCHEDSTART : 'Pl\u00E1novan\u00E9 zah\u00E1jen\u00ED',
		SCHEDFINISH : 'Pl\u00E1novan\u00E9 dokon\u010Den\u00ED',
		ACTSTART : 'Skute\u010Dn\u00FD za\u010D\u00E1tek',
		ACTFINISH : 'Skute\u010Dn\u00E9 dokon\u010Den\u00ED',
		ASSIGNMENT : 'P\u0159i\u0159azen\u00E1 pr\u00E1ce',
		OWNER : 'Vlastn\u00EDk',
		OWNERGROUP : 'Skupina vlastn\u00EDk\u016F',
		OBSERVATION : 'Pozorov\u00E1n\u00ED',
		MEASUREMENTVALUE : 'Hodnota m\u011B\u0159en\u00ED',
		HAZARDS: 'Nebezpe\u010D\u00ED',
		HAZARDSMAT: 'Nebezpe\u010Dn\u00FD materi\u00E1l',
		PRECAUTIONS: 'Bezpe\u010Dnost\u00ED z\u00E1sady',
		LOCKTAG: 'Lockout/Tagout',
		TAGOUT: 'Polo\u017Eky Tagout',
		LOCKOUT: 'Lockout',
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
		LINETYPE : 'Typ \u0159\u00E1dku',
		QUANTITY : 'Mno\u017Estv\u00ED',
		STOREROOM : 'Skladovac\u00ED m\u00EDstnost',
		STORELOC : 'Skladovac\u00ED m\u00EDstnost',
		BINNUM : 'P\u0159ihr\u00E1dka',
		CURBAL : 'Aktu\u00E1ln\u00ED z\u016Fstatek',
		UNITCOST : 'Jednotkov\u00E9 n\u00E1klady',
		ASSET : 'Aktivum',
		WORKORDER : 'Pracovn\u00ED p\u0159\u00EDkaz',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		ISSUETYPE : 'Typ v\u00FDdeje',
		ISSUETO : 'Vyd\u00E1no kam',
		ROTASSETNUM : 'V\u00FDm\u011Bnn\u00E9 aktivum',
		SITEID : 'Lokalita',
		ISSUERETURN : 'Vydat a\u00A0vr\u00E1tit',
		CHARGEINFO : 'Informace o\u00A0\u00FA\u010Dtov\u00E1n\u00ED'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Popis',
		ITEM : 'Polo\u017Eka',
		LINETYPE : 'Typ \u0159\u00E1dku',
		QUANTITY : 'Mno\u017Estv\u00ED',
		STOREROOM : 'Skladovac\u00ED m\u00EDstnost',
		BINNUM : 'P\u0159ihr\u00E1dka',
		CURBAL : 'Aktu\u00E1ln\u00ED z\u016Fstatek',
		UNITCOST : 'Jednotkov\u00E9 n\u00E1klady',
		ISSUETYPE : 'Typ v\u00FDdeje',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		TOOLRATE : 'N\u00E1\u0159ad\u00ED \u2013 sazba',
		ASSETNUM: 'Aktivum',
		TOOLHRS: 'N\u00E1\u0159ad\u00ED \u2013 hodiny',
		LINECOST: 'N\u00E1klady na \u0159\u00E1dku',
		TOOLQTY: 'N\u00E1\u0159ad\u00ED \u2013 mno\u017Estv\u00ED'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Popis',
		ITEM : 'Polo\u017Eka',
		LINETYPE : 'Typ \u0159\u00E1dku',
		QUANTITY : 'Mno\u017Estv\u00ED',
		TOSTORELOC : 'Do um\u00EDst\u011Bn\u00ED',
		FROMSTORELOC : 'Z\u00A0um\u00EDst\u011Bn\u00ED',
		FROMSITE : 'Z\u00A0lokality',
		TOSITE : 'Do lokality',
		TOBIN: 'Do p\u0159ihr\u00E1dky',
		FROMBIN: 'Z\u00A0p\u0159ihr\u00E1dky',
		UNITCOST : 'Jednotkov\u00E9 n\u00E1klady',
		ISSUETYPE : 'Typ v\u00FDdeje',
		CONVERSIONFACTOR : 'Koeficient p\u0159evodu',
		ROTASSETNUM : 'V\u00FDm\u011Bnn\u00E9 aktivum',
		TRANSFEROUT : 'V\u00FDstupn\u00ED p\u0159evod',
		TRANSFERIN : 'Vstupn\u00ED p\u0159evod',
		FROMQTY : 'Mno\u017Estv\u00ED \u2013 z\u00A0p\u0159ihr\u00E1dky',
		TOQTY : 'Mno\u017Estv\u00ED \u2013 do p\u0159ihr\u00E1dky',
		SITEID : 'Lokalita',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		TRANSFERDETAILS: 'Podrobnosti p\u0159evodu'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Aktivum',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		SEQUENCE : 'Po\u0159ad\u00ED',
	},
	WORKLOG : {
		NAME : 'Protokol pr\u00E1ce',
		DESCRIPTION : 'Popis',
		DETAILS : 'Podrobnosti',
		LOGTYPE : 'Typ',
		CREATEBY : 'Vytvo\u0159il/a',
		CREATEDATE : 'Datum vytvo\u0159en\u00ED'
	},
	SR : {
		ACTIVEREQS : 'Aktivn\u00ED po\u017Eadavky na slu\u017Ebu',
		NEWREQS : 'Nov\u00E9 po\u017Eadavky na slu\u017Ebu',
		AFFECTEDPERSON : 'Posti\u017Een\u00E1 osoba',
		DETAILS : 'Podrobnosti',
		GLACCOUNT : '\u00DA\u010Det hlavn\u00ED knihy',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		OWNER : 'Vlastn\u00EDk',
		OWNERGROUP : 'Skupina vlastn\u00EDk\u016F',
		REPORTEDPRIORITY : 'Nahl\u00E1\u0161en\u00E1 priorita',
		REPORTEDBY : 'Nahl\u00E1sil/a',
		REPORTDATE : 'Datum nahl\u00E1\u0161en\u00ED',
		REPORTEDPHONE : 'Nahl\u00E1\u0161en\u00FD telefon',
		REPORTEDEMAIL : 'Nahl\u00E1\u0161en\u00FD e-mail',
		SITE : 'Lokalita',
		STATUS : 'Stav',
		SR : 'Po\u017Eadavek na slu\u017Ebu',
		SUMMARY : 'Souhrn',
		ASSETNUM : 'Aktivum',
		ASSETSITEID : 'Lokalita aktiva',
	},
	INVBALANCES : {
		ITEMNUM : 'Polo\u017Eka',
		DESCRIPTION : 'Popis',
		BINNUM : 'P\u0159ihr\u00E1dka',
		CURBAL : 'Aktu\u00E1ln\u00ED z\u016Fstatek',
		PHYSCNT : 'Z\u016Fstatek \u2013 fyz. polo\u017Eky',
		PHYSCNTDATE : 'Datum inventury',
		RECONCILED : 'Odsouhlaseno',
		LOCATION : 'Skladovac\u00ED m\u00EDstnost',
	},
	INVENTORY : {
		ITEMNUM : 'Polo\u017Eka',
		DESCRIPTION : 'Popis',
		SITEID : 'Lokalita',
		STATUS : 'Stav',
		LOCATION : 'Skladovac\u00ED m\u00EDstnost',
		CATEGORY : 'Kategorie z\u00E1sob',
		BINNUM : 'V\u00FDchoz\u00ED p\u0159ihr\u00E1dka',
		ISSUEUNIT : 'Vydat jednotku',
		CURBAL : 'Aktu\u00E1ln\u00ED z\u016Fstatek',
		LASTISSUEDATE : 'Datum posledn\u00EDho v\u00FDdeje',
		ISSUEYTD : 'Od za\u010D\u00E1tku roku',
		ISSUE1YRAGO : 'Minul\u00FD rok',
		PHYSCNT : 'Inventura',
		PHYSCNTDATE : 'Datum inventury',
		RECONCILED : 'Odsouhlaseno',
		TOTALINVPHYBAL : 'Z\u016Fstatek \u2013 fyz. polo\u017Eky',
		TOTALINVBAL : 'Aktu\u00E1ln\u00ED z\u016Fstatek',
		ISSUEHISTORY : 'Historie v\u00FDdeje',
		INVBALANCE : 'Z\u016Fstatky z\u00E1sob',
		ADJCOUNT : 'Upravte inventury pro tyto polo\u017Eky \u2013 po\u010Det {{count}}',
		BALSUMMARY : 'Souhrn dostupn\u00E9ho z\u016Fstatku',
	},
	METER : {
		ASSETNUM : 'Aktivum',
		METERNAME : 'M\u011B\u0159i\u010D',
		METERTYPE : 'Typ m\u011B\u0159i\u010De',
		READINGTYPE : 'Typ ode\u010Dtu',
		LASTREADING : 'Posledn\u00ED ode\u010Det',
		LASTREADINGDATE : 'Datum posledn\u00EDho ode\u010Dtu',
		LASTREADINGINSPECTOR : 'Inspektor posledn\u00EDho ode\u010Dtu',
		READING : 'Nov\u00FD ode\u010Det',
		NEWREADINGDATE : 'Datum nov\u00E9ho ode\u010Dtu'
	},
	WPLABOR : {
		NAME : 'Pl\u00E1novan\u00E1 pr\u00E1ce',
		LABORCODE : 'Pr\u00E1ce',
		CRAFT : '\u0158emeslo',
		QUANTITY : 'Mno\u017Estv\u00ED',
		LABORHRS : 'B\u011B\u017En\u00E9 hodiny',
		DISPLAYNAME : 'Jm\u00E9no',
		SKILLLEVEL: '\u00DArove\u0148 dovednost\u00ED',
		VENDOR : 'Dodavatel',
		AMCREW : 'T\u00FDm'
	},		
	WPMATERIAL : {
		NAME : 'Pl\u00E1novan\u00E9 materi\u00E1ly',
		LINETYPE : 'Typ \u0159\u00E1dku',
		ITEMNUM : 'Polo\u017Eka',
		DESCRIPTION : 'Popis',
		ITEMQTY : 'Mno\u017Estv\u00ED',
		UNITCOST : 'Jednotkov\u00E9 n\u00E1klady',
		STOREROOM : 'Skladovac\u00ED m\u00EDstnost',
		STORELOCSITE : 'Lokalita sklad. m\u00EDstnosti',
		RESTYPE : 'Typ rezervace',
		REQUIREDATE : 'Po\u017Eadovan\u00E9 datum'
	},
	LABTRANS : {
		LABORCODE : 'Pr\u00E1ce',
		CRAFT : '\u0158emeslo',
		STARTDATE : 'Po\u010D\u00E1te\u010Dn\u00ED datum',
		TIMERSTATUS : 'Stav \u010Dasova\u010De',
		REGULARHRS : 'B\u011B\u017En\u00E9 hodiny',
		PAYRATE: 'Sazba',
		PREMIUMPAYCODE : 'K\u00F3dy pr\u00E9mi\u00ED',
		PREMIUMPAYHOURS : 'Pr\u00E9miov\u00E9 hodiny',
		PREMIUMPAYRATE: 'Sazba pr\u00E9mi\u00ED',
		WONUM : 'Pracovn\u00ED p\u0159\u00EDkaz',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		ASSETNUM : 'Aktivum',
		TICKETID: 'L\u00EDstek'
	},
	LABREP : {
		LABORCODE : 'Pr\u00E1ce',
		CRAFT : '\u0158emeslo',
		SKILLLEVEL : '\u00DArove\u0148 dovednost\u00ED',
		STARTDATE : 'Po\u010D\u00E1te\u010Dn\u00ED datum',
		STARTTIME : '\u010Cas zah\u00E1jen\u00ED',
		FINISHDATE : 'Koncov\u00E9 datum',
		FINISHTIME : '\u010Cas ukon\u010Den\u00ED',
		REGULARHRS : 'B\u011B\u017En\u00E9 hodiny',
		PAYRATE : 'Sazba',
		TRANSTYPE : 'Typ',
		WONUM : 'Pracovn\u00ED p\u0159\u00EDkaz',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		ASSETNUM : 'Aktivum',
		GENAPPRSERVRECEIPT: 'Schv\u00E1leno',
		NAME: 'Jm\u00E9no',
		TIMERSTATUS : 'Stav \u010Dasova\u010De',
		PREMIUMPAYHOURS : 'Pr\u00E9miov\u00E9 hodiny',
		PREMIUMPAYRATE: 'Sazba pr\u00E9mi\u00ED',
		PREMIUMPAYCODE : 'K\u00F3dy pr\u00E9mi\u00ED',
		TICKETID: 'L\u00EDstek',
		TICKETCLASS: 'T\u0159\u00EDda l\u00EDstku'
	},
	PERSON : {
		PERSONID: 'Osoba',
		FIRSTNAME: 'K\u0159estn\u00ED jm\u00E9no',
		LASTNAME: 'P\u0159\u00EDjmen\u00ED'
	},
	FAILURECODE : {
		FAILURECODE : 'T\u0159\u00EDda selh\u00E1n\u00ED',
		PROBLEMCODE : 'Probl\u00E9m',
		CAUSECODE : 'P\u0159\u00ED\u010Dina',
		REMEDYCODE : 'N\u00E1pravn\u00E1 akce',
	},
	SPAREPART : {
		QUANTITY : 'Mno\u017Estv\u00ED',
		ISSUEDQTY : 'Vydan\u00E9 mno\u017Estv\u00ED',
		REMARKS : 'Pozn\u00E1mky',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Popis',
		LONGDESCRIPTION : 'Podrobnosti',
		ASSET : 'Aktivum',
		STATUS : 'Stav',
		PARENT : 'Nad\u0159azen\u00FD prac. p\u0159\u00EDkaz',
		SITE : 'Lokalita',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
	},
	DOMAIN : {
		VALUE: 'Hodnota',
		DESCRIPTION: 'Popis',
	},
	MR : {
		MRNUM : '\u017D\u00E1danka',
		DESCRIPTION : 'Popis',
		LONGDESCRIPTION : 'Podrobn\u00FD popis',
		STATUS : 'Stav',
		PRIORITY : 'Priorita',
		CHARGEINFO : 'Informace o\u00A0\u00FA\u010Dtov\u00E1n\u00ED',
		REQUIREDDATE : 'Po\u017Eadovan\u00E9 datum',
		WONUM : 'Pracovn\u00ED p\u0159\u00EDkaz',
		LOCATION : 'Um\u00EDst\u011Bn\u00ED',
		ASSET : 'Aktivum',
		GLACCOUNT : 'Hl. kniha \u2013 \u00FA\u010Det M\u00E1 d\u00E1ti',
		MRLINES : 'Polo\u017Eky \u0159\u00E1dku \u017E\u00E1danky',
		ENTERDATE : 'Zadan\u00E9 datum'
	},
	MRLINE : {
		MRLINEITEM : 'Polo\u017Eka \u017E\u00E1danky',
		MRLINENUM : '\u0158\u00E1dek',
		LINETYPE : 'Typ \u0159\u00E1dku',
		ITEM : 'Polo\u017Eka',
		DESCRIPTION : 'Popis',
		QTY : 'Mno\u017Estv\u00ED',
		ORDERUNIT : 'Jednotka objedn\u00E1vky',
		UNITCOST : 'Jednotkov\u00E9 n\u00E1klady',
		LINECOST : 'N\u00E1klady na \u0159\u00E1dku',
		REQUIREDDATE : 'Po\u017Eadovan\u00E9 datum'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Zobrazit odeslan\u00E9 \u017E\u00E1danky',
		VIEWSAVED : 'Zobrazit ulo\u017Een\u00E9 \u017E\u00E1danky',
		EDIT : 'Upravit \u017E\u00E1danku'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Ulo\u017Eit jako koncept',
		NEWREQITEM : 'Nov\u00E1 polo\u017Eka \u017E\u00E1danky',
		SUBMIT : 'Odeslat'
	},
	CLASSIFY : {
		CLASSASSET : 'Klasifikovat aktivum',
		CLASSWO : 'Klasifikovat pracovn\u00ED p\u0159\u00EDkaz',
		DESCRIPTION : 'Popis t\u0159\u00EDdy',
		CLASSIFICATION : 'Klasifikace'
	}
};