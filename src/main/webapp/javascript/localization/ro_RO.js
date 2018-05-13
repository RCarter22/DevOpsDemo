'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: ro_RO
 */
var locale = 'ro_RO'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Setare',
        cancelText: 'Anulare',
        clearText: '\u0218tergere',
        selectedText: 'Selectat',
        // Calender component
        calendarText: 'Calendar',
        dateText: 'Dat\u0103',
        timeText: 'Or\u0103',
        // Datetime component
        dateFormat: 'dd.mm.yy',
        dateOrder: 'ddmmyy',
        dayNames: ['Duminic\u0103', 'Luni', 'Mar\u021Bi', 'Miercuri', 'Joi', 'Vineri', 'S\u00E2mb\u0103t\u0103'],
        dayNamesShort: ['Dum', 'Lun', 'Ma', 'Mi', 'Jo', 'Vi', 'S\u00E2'],
        dayText: 'Zi',
        hourText: 'Ore',
        minuteText: 'Minute',
        monthNames: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
        monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthText: 'Lun\u0103',
        secText: 'Secunde',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: 'An',
        nowText: 'Acum',
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
	        symbol: 'RON'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "zero",
		ONE : "unu",
		TWO : "doi",
		FEW : "pu\u021Bini",
		MANY : "mul\u021Bi",
		OTHER : "al\u021Bii"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "a.m.", "p.m." ],
			"DAY" : [ "duminic\u0103", "luni", "mar\u021bi", "miercuri", "joi", "vineri", "s\u00e2mb\u0103t\u0103" ],
			"MONTH": [ "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie" ],
			"SHORTDAY": [ "dum.", "lun.", "mar.", "mie.", "joi", "vin.", "s\u00e2m." ],
			"SHORTMONTH": [ "ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec." ],
			"fullDate": "EEEE, d MMMM y",
			"longDate": "d MMMM y",
			"medium": "d MMM y HH:mm:ss",
			"mediumDate": "d MMM y",
			"mediumTime": "HH:mm:ss",
			"short": "dd.MM.y HH:mm",
			"shortDate": "dd.MM.y",
			"shortTime": "HH:mm"				
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "RON",
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
 * Language: RO
 */
var lang = 'RO'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Sincronizare terminat\u0103 cu erori!  \u00CEnc\u0103 mai pute\u021Bi \u00EEncerca s\u0103 lucra\u021Bi offline.',
	EMMOF1001W : 'Sincronizare terminat\u0103 cu erori!  V\u0103 rug\u0103m resincroniza\u021Bi pentru a activa modul offline.',
	EMMOF1002W : 'Sincronizare terminat\u0103 cu erori!  Pute\u021Bi \u00EEncerca s\u0103 resincroniza\u021Bi sau s\u0103 r\u0103m\u00E2ne\u021Bi la lucrul offline.',
	EMMOF1003W : 'Sincronizare terminat\u0103 cu erori!  V\u0103 rug\u0103m \u00EEncerca\u021Bi s\u0103 resincroniza\u021Bi pentru a lucra offline.',
	EMMOF1004W : '{0} trebuie s\u0103 fie un num\u0103r',
	EMMOF1005W : 'C\u00E2mpuri obligatorii lips\u0103: {0}',
	EMMOF1006W : 'Atributul {0} este doar citire',
	EMMOF1007W : 'V\u0103 rug\u0103m selecta\u021Bi o valoare',
	EMMOF1008I : 'Stare modificat\u0103 cu succes',
	EMMOF1009W : 'V\u0103 rug\u0103m specifica\u021Bi o cantitate mai mare dec\u00E2t zero',
	EMMOF1010W : '{0} trebuie s\u0103 fie mai mare dec\u00E2t zero',
	EMMOF1011W : '{0} este necesar\u0103',
	EMMOF1012W : 'Nu exist\u0103 niciun sold pentru acest element, camer\u0103 de depozitare, \u0219i combina\u021Bii de co\u0219',
	EMMOF1013W : 'Soldul din co\u0219 va deveni negativ \u00EEn urma acestei tranzac\u021Bii',
	EMMOF1014W : 'Nu se poate transfera c\u00E2nd loca\u021Biile, binnums \u0219i siteids sunt toate identice',
	// [WF]		
	EMMWF1000I : 'Pornire flux de lucru',
	EMMWF1001I : 'Exist\u0103 mai mult de un proces de flux de lucru disponibil pentru aceast\u0103 aplica\u021Bie.  V\u0103 rug\u0103m selecta\u021Bi unu \u0219i ap\u0103sa\u021Bi OK.',
	EMMWF1002I : 'V\u0103 rug\u0103m selecta\u021Bi un proces',
	EMMWF1003I : 'Proces',
	EMMWF1004I : 'Memo',
	EMMWF1005I : 'Oprire flux de lucru',
	// [ES]
	EMMES1000I : 'Autoriza\u021Bie e-Sign',
	EMMES1001I : 'Este necesar\u0103 o semn\u0103tur\u0103 electronic\u0103',
	EMMES1002E : 'Autoriza\u021Bie nereu\u0219it\u0103',
	EMMES1003I : 'V\u0103 rug\u0103m introduce\u021Bi o parol\u0103 \u0219i un motiv',
	EMMES1004I : 'Utilizator',
	EMMES1005I : 'Parol\u0103',
	EMMES1006I : 'Motiv',
	// [GB]
	EMMGB1001I : 'Email',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Anulare',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Confirmare',
	EMMGB1006I : 'Da',
	EMMGB1007I : 'Nu',
	EMMGB1008I : 'Telefonic',
	EMMGB1009I : 'Apel',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Confirmare \u0219tergere?',
	EMMGB1012I : '{0} trebuie s\u0103 aib\u0103 loc \u00EEnainte {1}',
	EMMGB1013I : '{0} trebuie s\u0103 aib\u0103 loc dup\u0103 {1}',
	EMMGB1014I : '{0} trebuie s\u0103 aib\u0103 loc \u00EEn trecut',
	// General	
	OFFLINEMODE : 'Modul Offline',
	SYNCNEEDED : ' - Modificat, Sincronizare necesar\u0103',
	SYNCHRONIZATION : 'Sincronizare',
	SYNCSERVER : 'Sincronizare cu server',
	ENTERLABOR: 'Introducere \u00EEn func\u021Bie de munc\u0103',
	ADDMORE: 'Ad\u0103uga\u021Bi \u00EEn continuare...',
	GOONLINE : 'Reveni\u021Bi online',
	GOTOOFFLINEAPPS : 'Accesa\u021Bi aplica\u021Bii offline',
	OFFLINEAPPS : 'Aplica\u021Bii offline',
	QUICKSCAN : 'Scanare rapid\u0103: ',
	ACTIVEWORKORDERS : 'Comenzi de lucru active',
	RECORDSAVED: '\u00CEnregistrare salvat\u0103',
	RECORDNOTSAVED: 'Eroare - nicio \u00EEnregistrare returnat\u0103',
	TIMERALREADYSTARTED: 'Cronometru deja pornit',
	TIMERNOTFOUND : 'Cronometru nepornit. Niciun cronometru activ g\u0103sit.',
	TIMERSTARTED : 'Cronometru pornit',
	TIMERSTOPPED : 'Cronometru oprit',
	TOOLS : 'Instrumente',
	STARTTIMER : 'Pornire cronometru',
	STOPTIMER : 'Oprire cronometru',
	MODIFYSAVE : '\u00CEnregistrare modificat\u0103.  V\u0103 rug\u0103m salva\u021Bi modific\u0103rile dumneavoastr\u0103.',
	SITEREQUIRED : 'Site-ul este obligat s\u0103 creeze comanda de lucru.',
	NOVALUE : 'Valoare necompletat\u0103',
	ACTIONS : 'Ac\u021Biuni',
	CHILDRENOF : 'Copii ai',
	RESPONSIBILITY : 'Responsabilitate',
	LOOKUP : 'C\u0103utare',
	LOCATIONDRILLDOWN : 'Analiz\u0103 detaliat\u0103 loca\u021Bie',
	ASSETDRILLDOWN : 'Analiz\u0103 detaliat\u0103 a activului',
	DRILLDOWN : 'Analiz\u0103 detaliat\u0103',
	BACK : '\u00CEnapoi',
	SAVE : 'Salvare',
	APPLY : 'Aplicare',
	FILTER : 'Filtru',
	RESET : 'Resetare',
	SELECTVALUE : 'Selectare valoare',
	CANCEL : 'Anulare',
	OK : 'OK',
	YES : 'Da',
	NO : 'Nu',
	CREATEFOLLOWUP : 'Crea\u021Bi o continuare',
	CREATESR : 'Crea\u021Bi o nou\u0103 solicitare de serviciu',
	PARENT : 'P\u0103rinte',
	CHANGESTATUS : 'Modificare stare',
	LABOR : 'Munc\u0103',
	MATERIALS : 'Materiale',
	TASKS : 'Activit\u0103\u021Bi',
	ATTACHMENTS : 'Ata\u0219amente',
	FAILUREREPORTING : 'Raportare eroare',
	MULTIASSETS : 'Active multiple, Loca\u021Bii',
	ADDNEW : 'Ad\u0103ugare nou',
	CLASSIFICATION : 'Clasificare',
	NORECORDS : 'Nicio \u00EEnregistrare(i) g\u0103sit\u0103',
	NORECORDEXIST : 'Nu a fost g\u0103sit\u0103 nicio \u00EEnregistrare sau nu mai exist\u0103',
	NORECORDSADJ : 'Nicio \u00EEnregistrare pentru ajustarea contoriz\u0103rilor fizice',
	SELECTOWNER : 'Selectare proprietar',
	OWNER : 'Proprietar',
	OWNERGROUP : 'Grup proprietar',
	TAKEOWNERSHIP : 'Preluare proprietate',
	SORTBY : 'Sortare dup\u0103',
	LIST : 'List\u0103',
	QUICKSEARCH: 'C\u0103utare rapid\u0103',
	INVENTORYBYSR : 'Inventar \u00EEn func\u021Bie de camera de stocare',
	INVDETAILS : 'Detalii inventar',
	NEWCOUNT : 'Contorizare nou\u0103',
	LABORTRANS : 'Tranzac\u021Bii munc\u0103',
	CREATEWO : 'Creare comand\u0103 de lucru nou\u0103',
	MYWOS : 'Comenzile mele de lucru',
	FAILUREREPORT : 'Raportare eroare',
	METERREADINGS : 'Introducere citiri contorizare',
	ASSETMETER : 'Citiri contorizare activ',
	LOCATIONMETER : 'Citiri contorizare loca\u021Bie',
	FROM : 'De la',
	TO : 'La',
	ADVANCED : 'Avansat',
	ADVANCEDSEARCH : 'C\u0103utare avansat\u0103',
	DOWNTIME : 'Inactivitate',
	PURCHASEINFO : 'Informa\u021Bii de achizi\u021Bie',
	SPAREPARTS : 'Piese de schimb',
	SCHEDULEINFO : 'Programare informa\u021Bii',
	PLANLABOR : 'Planificare munc\u0103',
	PLANMATERIAL : 'Materiale planificate',
	WOCREATED : 'Comand\u0103 de lucru {0} creat\u0103.',
	PRESTART : 'Pre-start',
	REVIEWANDAPPROVE : 'Reexaminare \u0219i aprobare',
	MOCACTIONGROUP : 'Selectare grup de ac\u021Biune MOC',
	MOCACTIONS : 'Selectare ac\u021Biuni MOC',
	REVIEWERSAVED : 'Evaluator(i) salva\u021Bi offline.',
	APPROVERSAVED : 'Aprobator(i) salva\u021Bi offline.',
	ACTIONSAVED : 'Ac\u021Biune(i) salvate offline.',
	NOACTIONS : 'Grupul de ac\u021Biune standard {0} nu are nicio ac\u021Biune standard valid\u0103 de ad\u0103ugat.',
	SRQUEUED : 'Starea SR {0} modificat\u0103 \u00EEn QUEUED.',
	SELECTREVIEWERS : 'Selectare evaluatori',
	SELECTAPPROVERS : 'Selectare aprobatori',
	APPROVERS : 'Aprobatori',
	REVIEWERS : 'Evaluatori',
	VIEWLIST: 'Vizualizare list\u0103',
	VIEWSUMMARY : 'Vizualizare rezumat',
	STOREROOMS : 'Camere de depozitare',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Accesa\u021Bi',
	APPS : 'Aplica\u021Bii',
	STARTCENTER : 'Centru de pornire',
	PAGINATION : {
		TITLE : 'Pagina {{from}} din {{to}} - {{total}} \u00cenregistr\u0103ri',
		PREV : 'Prev',
		NEXT : 'Urm\u0103torul'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Loca\u021Bie',
		ASSET : 'Activ',
		WOTRACK : 'Urm\u0103rire comand\u0103 de lucru',
		SR : 'Solicit\u0103ri de serviciu',
		INVENTOR: 'Inventar',
		INVISSUE: 'Emiteri \u0219i transferuri',
		MOC : 'MOC (Ulei)',
		CREATEDR : 'Creare solicitare',
		VIEWDR : 'Vizualizare solicit\u0103ri',
		LABREP: 'Raportare munc\u0103',
		TXNTRACK : 'Rezolu\u021Bie sincronizare'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Activ',
		STATUS : 'Stare',
		STATUSDATE: 'Data ultimei modific\u0103ri',
		INSTALLDATE: 'Data instal\u0103rii',
		SITEID : 'Site',
		PARENT : 'P\u0103rinte',
		ASSETTYPE: 'Tip',
		LONGDESCRIPTION : 'Detalii',
		GROUPNAME: 'Grup contorizare',
		SERIALNUM: 'Serie',
		PURCHASEPRICE: 'Pre\u021B de achizi\u021Bie',
		TOTDOWNTIME: 'Total inactivitate',
		ISRUNNING: 'Activ',
		VENDOR: 'Distribuitor',
		MANUFACTURER: 'Fabricant',
		FAILURECODE: 'Eroare clas\u0103',
		DESCRIPTION : 'Descriere',
		LOCATION : 'Loca\u021Bie',
		LOCDESC : 'Detalii',
		SEQUENCE : 'Secven\u021B\u0103',
		PROGRESS : 'Marcare progres?',
		COMMENTS : 'Comentarii',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Comand\u0103 de lucru',
		DESCRIPTION : 'Descriere',
		LONGDESCRIPTION : 'Detalii',
		STATUS : 'Stare',
		PARENT : 'CL p\u0103rinte',
		SITEID : 'Site',
		LOCATION : 'Loca\u021Bie',
		ASSETNUM : 'Activ',
		WORKTYPE : 'Tip de lucru',
		WOPRIORITY : 'Prioritate',
		GLACCOUNT : 'Cont GL',
		FAILURECODE : 'Eroare clas\u0103',
		PROBLEMCODE : 'Cod problem\u0103',
		SUPERVISOR : 'Supervizor',
		CREWID : 'Echip\u0103',
		LEAD : 'Conducere',
		PERSONGROUP : 'Grup de lucru',
		REPORTEDBY : 'Raportat de',
		REPORTDATE : 'Dat\u0103 raportat\u0103',
		PHONE : 'Telefonic',
		TASKID : 'Activitate',
		TARGSTARTDATE : '\u00CEnceput \u021Bint\u0103',
		TARGCOMPDATE : 'Final \u021Bint\u0103',
		SCHEDSTART : '\u00CEnceput programat',
		SCHEDFINISH : 'Final programat',
		ACTSTART : '\u00CEnceput efectiv',
		ACTFINISH : 'Final efectiv',
		ASSIGNMENT : 'Munc\u0103 atribuit\u0103',
		OWNER : 'Proprietar',
		OWNERGROUP : 'Grup proprietar',
		OBSERVATION : 'Observa\u021Bie',
		MEASUREMENTVALUE : 'Valoare a m\u0103sur\u0103rii',
		HAZARDS: 'Pericole',
		HAZARDSMAT: 'Materiale periculoase',
		PRECAUTIONS: 'Precau\u021Bii',
		LOCKTAG: 'Blocare/Etichetare',
		TAGOUT: 'Etichet\u0103ri',
		LOCKOUT: 'Blocare',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Descriere',
		ITEM : 'Element',
		LINETYPE : 'Tip de linie',
		QUANTITY : 'Cantitate',
		STOREROOM : 'Camer\u0103 de depozitare',
		STORELOC : 'Camer\u0103 de depozitare',
		BINNUM : 'Co\u0219',
		CURBAL : 'Sold curent',
		UNITCOST : 'Cost unitar',
		ASSET : 'Activ',
		WORKORDER : 'Comand\u0103 de lucru',
		LOCATION : 'Loca\u021Bie',
		ISSUETYPE : 'Tip emitere',
		ISSUETO : 'Emis c\u0103tre',
		ROTASSETNUM : 'Activ de rotire',
		SITEID : 'Site',
		ISSUERETURN : 'Emitere \u0219i returnare',
		CHARGEINFO : 'Informa\u021Bii tax\u0103'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Descriere',
		ITEM : 'Element',
		LINETYPE : 'Tip de linie',
		QUANTITY : 'Cantitate',
		STOREROOM : 'Camer\u0103 de depozitare',
		BINNUM : 'Co\u0219',
		CURBAL : 'Sold curent',
		UNITCOST : 'Cost unitar',
		ISSUETYPE : 'Tip emitere',
		LOCATION : 'Loca\u021Bie',
		TOOLRATE : 'Rat\u0103 instrument',
		ASSETNUM: 'Activ',
		TOOLHRS: 'Ore instrument',
		LINECOST: 'Cost linie',
		TOOLQTY: 'Cantitate instrument'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Descriere',
		ITEM : 'Element',
		LINETYPE : 'Tip de linie',
		QUANTITY : 'Cantitate',
		TOSTORELOC : 'La loca\u021Bie',
		FROMSTORELOC : 'De la loca\u021Bie',
		FROMSITE : 'De la site',
		TOSITE : 'La site',
		TOBIN: 'La co\u0219',
		FROMBIN: 'De la co\u0219',
		UNITCOST : 'Cost unitar',
		ISSUETYPE : 'Tip emitere',
		CONVERSIONFACTOR : 'Factor de conversie',
		ROTASSETNUM : 'Activ de rotire',
		TRANSFEROUT : 'Transfer din',
		TRANSFERIN : 'Transfer \u00EEn',
		FROMQTY : 'De la cantitate co\u0219',
		TOQTY : 'La cantitate co\u0219',
		SITEID : 'Site',
		LOCATION : 'Loca\u021Bie',
		TRANSFERDETAILS: 'Detalii transfer'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Activ',
		LOCATION : 'Loca\u021Bie',
		SEQUENCE : 'Secven\u021B\u0103',
	},
	WORKLOG : {
		NAME : 'Jurnal de lucru',
		DESCRIPTION : 'Descriere',
		DETAILS : 'Detalii',
		LOGTYPE : 'Tip',
		CREATEBY : 'Creat de',
		CREATEDATE : 'Dat\u0103 creare'
	},
	SR : {
		ACTIVEREQS : 'Solicit\u0103ri de serviciu active',
		NEWREQS : 'Solicit\u0103ri de serviciu noi',
		AFFECTEDPERSON : 'Persoan\u0103 afectat\u0103',
		DETAILS : 'Detalii',
		GLACCOUNT : 'Cont GL',
		LOCATION : 'Loca\u021Bie',
		OWNER : 'Proprietar',
		OWNERGROUP : 'Grup proprietar',
		REPORTEDPRIORITY : 'Prioritate raportat\u0103',
		REPORTEDBY : 'Raportat de',
		REPORTDATE : 'Dat\u0103 raportare',
		REPORTEDPHONE : 'Telefon raportat',
		REPORTEDEMAIL : 'Mail raportat',
		SITE : 'Site',
		STATUS : 'Stare',
		SR : 'Solicitare de serviciu',
		SUMMARY : 'Rezumat',
		ASSETNUM : 'Activ',
		ASSETSITEID : 'Site activ',
	},
	INVBALANCES : {
		ITEMNUM : 'Element',
		DESCRIPTION : 'Descriere',
		BINNUM : 'Co\u0219',
		CURBAL : 'Sold curent',
		PHYSCNT : 'Sold fizic',
		PHYSCNTDATE : 'Dat\u0103 contor fizic',
		RECONCILED : 'Armonizat',
		LOCATION : 'Camer\u0103 de depozitare',
	},
	INVENTORY : {
		ITEMNUM : 'Element',
		DESCRIPTION : 'Descriere',
		SITEID : 'Site',
		STATUS : 'Stare',
		LOCATION : 'Camer\u0103 de depozitare',
		CATEGORY : 'Categorie stoc',
		BINNUM : 'Co\u0219 implicit',
		ISSUEUNIT : 'Unitate emisie',
		CURBAL : 'Sold curent',
		LASTISSUEDATE : 'Data ultimei emisii',
		ISSUEYTD : 'Anul curent',
		ISSUE1YRAGO : 'Anul trecut',
		PHYSCNT : 'Contor fizic',
		PHYSCNTDATE : 'Dat\u0103 contor fizic',
		RECONCILED : 'Armonizat',
		TOTALINVPHYBAL : 'Sold fizic',
		TOTALINVBAL : 'Sold curent',
		ISSUEHISTORY : 'Emitere istoric',
		INVBALANCE : 'Solduri inventar',
		ADJCOUNT : 'Ajusta\u021Bi contoarele fizice pentru aceste elemente {{count}}',
		BALSUMMARY : 'Rezumat sold disponibil',
	},
	METER : {
		ASSETNUM : 'Activ',
		METERNAME : 'Contorizare',
		METERTYPE : 'Tip contorizare',
		READINGTYPE : 'Tip citire',
		LASTREADING : 'Ultima citire',
		LASTREADINGDATE : 'Data ultimei citiri',
		LASTREADINGINSPECTOR : 'Inspectorul ultimei citiri',
		READING : 'Citire nou\u0103',
		NEWREADINGDATE : 'Data noii citiri'
	},
	WPLABOR : {
		NAME : 'Munc\u0103 planificat\u0103',
		LABORCODE : 'Munc\u0103',
		CRAFT : 'Func\u021Bie',
		QUANTITY : 'Cantitate',
		LABORHRS : 'Ore regulate',
		DISPLAYNAME : 'Nume',
		SKILLLEVEL: 'Nivel competen\u021B\u0103',
		VENDOR : 'Distribuitor',
		AMCREW : 'Echip\u0103'
	},		
	WPMATERIAL : {
		NAME : 'Materiale planificate',
		LINETYPE : 'Tip de linie',
		ITEMNUM : 'Element',
		DESCRIPTION : 'Descriere',
		ITEMQTY : 'Cantitate',
		UNITCOST : 'Cost unitar',
		STOREROOM : 'Camer\u0103 de depozitare',
		STORELOCSITE : 'Site camer\u0103 de depozitare',
		RESTYPE : 'Tip de rezervare',
		REQUIREDATE : 'Dat\u0103 solicitat\u0103'
	},
	LABTRANS : {
		LABORCODE : 'Munc\u0103',
		CRAFT : 'Func\u021Bie',
		STARTDATE : 'Dat\u0103 incepere',
		TIMERSTATUS : 'Stare cronometru',
		REGULARHRS : 'Ore regulate',
		PAYRATE: 'Rat\u0103',
		PREMIUMPAYCODE : 'Cod de plat\u0103 premium',
		PREMIUMPAYHOURS : 'Ore de plat\u0103 premium',
		PREMIUMPAYRATE: 'Rat\u0103 de plat\u0103 premium',
		WONUM : 'Comand\u0103 de lucru',
		LOCATION : 'Loca\u021Bie',
		ASSETNUM : 'Activ',
		TICKETID: 'Bilet'
	},
	LABREP : {
		LABORCODE : 'Munc\u0103',
		CRAFT : 'Func\u021Bie',
		SKILLLEVEL : 'Nivel competen\u021B\u0103',
		STARTDATE : 'Dat\u0103 incepere',
		STARTTIME : 'Or\u0103 de \u00EEncepere',
		FINISHDATE : 'Dat\u0103 de \u00EEncheiere',
		FINISHTIME : 'Or\u0103 de \u00EEncheiere',
		REGULARHRS : 'Ore regulate',
		PAYRATE : 'Rat\u0103',
		TRANSTYPE : 'Tip',
		WONUM : 'Comand\u0103 de lucru',
		LOCATION : 'Loca\u021Bie',
		ASSETNUM : 'Activ',
		GENAPPRSERVRECEIPT: 'Aprobat',
		NAME: 'Nume',
		TIMERSTATUS : 'Stare cronometru',
		PREMIUMPAYHOURS : 'Ore de plat\u0103 premium',
		PREMIUMPAYRATE: 'Rat\u0103 de plat\u0103 premium',
		PREMIUMPAYCODE : 'Cod de plat\u0103 premium',
		TICKETID: 'Bilet',
		TICKETCLASS: 'Clas\u0103 bilet'
	},
	PERSON : {
		PERSONID: 'Persoan\u0103',
		FIRSTNAME: 'Prenume',
		LASTNAME: 'Nume de familie'
	},
	FAILURECODE : {
		FAILURECODE : 'Eroare clas\u0103',
		PROBLEMCODE : 'Problem\u0103',
		CAUSECODE : 'Cauz\u0103',
		REMEDYCODE : 'Remediu',
	},
	SPAREPART : {
		QUANTITY : 'Cantitate',
		ISSUEDQTY : 'Cantitate emis\u0103',
		REMARKS : 'Remarci',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Descriere',
		LONGDESCRIPTION : 'Detalii',
		ASSET : 'Activ',
		STATUS : 'Stare',
		PARENT : 'CL p\u0103rinte',
		SITE : 'Site',
		LOCATION : 'Loca\u021Bie',
	},
	DOMAIN : {
		VALUE: 'Valoare',
		DESCRIPTION: 'Descriere',
	},
	MR : {
		MRNUM : 'Solicitare',
		DESCRIPTION : 'Descriere',
		LONGDESCRIPTION : 'Descriere lung\u0103',
		STATUS : 'Stare',
		PRIORITY : 'Prioritate',
		CHARGEINFO : 'Informa\u021Bii tax\u0103',
		REQUIREDDATE : 'Dat\u0103 solicitat\u0103',
		WONUM : 'Comand\u0103 de lucru',
		LOCATION : 'Loca\u021Bie',
		ASSET : 'Activ',
		GLACCOUNT : 'Cont de debit GL',
		MRLINES : 'Elemente linie de solicitare',
		ENTERDATE : 'Data introdus\u0103'
	},
	MRLINE : {
		MRLINEITEM : 'Element solicitare',
		MRLINENUM : 'Linie',
		LINETYPE : 'Tip de linie',
		ITEM : 'Element',
		DESCRIPTION : 'Descriere',
		QTY : 'Cantitate',
		ORDERUNIT : 'Unitate comand\u0103',
		UNITCOST : 'Cost unitar',
		LINECOST : 'Cost linie',
		REQUIREDDATE : 'Dat\u0103 solicitat\u0103'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Vizualizare solicit\u0103ri remise',
		VIEWSAVED : 'Vizualizare solicit\u0103ri salvate',
		EDIT : 'Editare solicitare'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Salvare ca ciorn\u0103',
		NEWREQITEM : 'Element solicitare nou\u0103',
		SUBMIT : 'Remitere'
	},
	CLASSIFY : {
		CLASSASSET : 'Clasificare activ',
		CLASSWO : 'Clasificare comand\u0103 de lucru',
		DESCRIPTION : 'Descriere clas\u0103',
		CLASSIFICATION : 'Clasificare'
	}
};