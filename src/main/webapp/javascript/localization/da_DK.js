'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: da_DK
 */
var locale = 'da_DK'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Angiv',
        cancelText: 'Annuller',
        clearText: 'Ryd',
        selectedText: 'Valgte',
        // Calender component
        calendarText: 'Kalender',
        dateText: 'Dato',
        timeText: 'Klokkesl\u00E6t',
        // Datetime component
        dateFormat: 'dd-mm-y',
        dateOrder: 'ddmmy',
        dayNames: ['S\u00F8ndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'L\u00F8rdag'],
        dayNamesShort: ['S\u00F8n', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'L\u00F8r'],
        dayText: 'Dag',
        hourText: 'Timer',
        minuteText: 'Minutter',
        monthNames: ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
        monthText: 'M\u00E5ned',
        secText: 'Sekunder',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: '\u00C5r',
        nowText: 'Nu',
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
	        symbol: 'kr.'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "nul",
		ONE : "en",
		TWO : "to",
		FEW : "f\u00E5",
		MANY : "mange",
		OTHER : "andet"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "AM", "PM" ],
			"DAY" : [ "s\u00f8ndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "l\u00f8rdag" ],
			"MONTH" : [ "januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december" ],
			"SHORTDAY" : [ "s\u00f8n.", "man.", "tir.", "ons.", "tor.", "fre.", "l\u00f8r." ],
			"SHORTMONTH" : [ "jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "dec." ],
			"fullDate" : "EEEE 'den' d. MMMM y",
			"longDate" : "d. MMMM y",
			"medium": "d. MMM y HH:mm:ss",
			"mediumDate" : "d. MMM y",
			"mediumTime" : "HH:mm:ss",
			"short" : "dd-MM-y HH:mm",
			"shortDate" : "dd-MM-y",
			"shortTime" : "HH:mm"				
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "kr.",
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
 * Language: DA
 */
var lang = 'DA'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Synkroniseringen blev fuldf\u00F8rt med fejl!  Du kan fortsat arbejde offline.',
	EMMOF1001W : 'Synkroniseringen blev fuldf\u00F8rt med fejl!  Synkroniser igen for at aktivere offlinetilstand.',
	EMMOF1002W : 'Synkroniseringen blev fuldf\u00F8rt med fejl!  Du kan pr\u00F8ve at synkronisere igen eller forts\u00E6tte med at arbejde offline.',
	EMMOF1003W : 'Synkroniseringen blev fuldf\u00F8rt med fejl!  Pr\u00F8v at synkronisere igen for at arbejde offline.',
	EMMOF1004W : '{0} skal v\u00E6re et tal',
	EMMOF1005W : 'Manglende obligatoriske felter: {0}',
	EMMOF1006W : 'Attributten {0} er skrivebeskyttet',
	EMMOF1007W : 'V\u00E6lg en v\u00E6rdi',
	EMMOF1008I : 'Status er \u00E6ndret',
	EMMOF1009W : 'Angiv et antal, der er st\u00F8rre end nul',
	EMMOF1010W : '{0} skal v\u00E6re st\u00F8rre end nul',
	EMMOF1011W : '{0} er p\u00E5kr\u00E6vet',
	EMMOF1012W : 'Der findes ingen saldo for dette element, opbevaring, og kombinationer af bin\u00E6re numeriske datatyper',
	EMMOF1013W : 'Saldoen i den bin\u00E6re numeriske datatype bliver negativ som f\u00F8lge af denne transaktion',
	EMMOF1014W : 'Kan ikke overf\u00F8re, n\u00E5r placeringer,, bin\u00E6re numeriske datatyper og lokalitets-id\'er alle er identiske',
	// [WF]		
	EMMWF1000I : 'Start arbejdsgang',
	EMMWF1001I : 'Der er mere end \u00E9n tilg\u00E6ngelig arbejdsgangproces til denne applikation.  V\u00E6lg \u00E9n, og tryk p\u00E5 OK.',
	EMMWF1002I : 'V\u00E6lg en proces',
	EMMWF1003I : 'Proces',
	EMMWF1004I : 'Memo',
	EMMWF1005I : 'Stop arbejdsgang',
	// [ES]
	EMMES1000I : 'Godkendelse af e-signatur',
	EMMES1001I : 'Der kr\u00E6ves en elektronisk signatur',
	EMMES1002E : 'Godkendelsen mislykkedes',
	EMMES1003I : 'Indtast en adgangskode og en \u00E5rsag',
	EMMES1004I : 'Bruger',
	EMMES1005I : 'Adgangskode',
	EMMES1006I : '\u00C5rsag',
	// [GB]
	EMMGB1001I : 'E-mail',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Annuller',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Bekr\u00E6ft',
	EMMGB1006I : 'Ja',
	EMMGB1007I : 'Nej',
	EMMGB1008I : 'Telefon',
	EMMGB1009I : 'Opkald',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Bekr\u00E6ft sletning?',
	EMMGB1012I : '{0} skal optr\u00E6de f\u00F8r {1}',
	EMMGB1013I : '{0} skal optr\u00E6de efter {1}',
	EMMGB1014I : '{0} skal optr\u00E6de i fortiden',
	// General	
	OFFLINEMODE : 'Offlinetilstand',
	SYNCNEEDED : ' - \u00C6ndret, Synkronisering p\u00E5kr\u00E6vet',
	SYNCHRONIZATION : 'Synkronisering',
	SYNCSERVER : 'Synkroniser med server',
	ENTERLABOR: 'Indtast efter arbejdskraft',
	ADDMORE: 'Tilf\u00F8j mere ...',
	GOONLINE : 'G\u00E5 online igen',
	GOTOOFFLINEAPPS : 'G\u00E5 til offlineapplikationer',
	OFFLINEAPPS : 'Offllineapplikationer',
	QUICKSCAN : 'Hurtig scanning: ',
	ACTIVEWORKORDERS : 'Aktive arbejdsordrer',
	RECORDSAVED: 'Posten er gemt',
	RECORDNOTSAVED: 'Fejl \u2013 Der blev ikke returneret nogen post',
	TIMERALREADYSTARTED: 'Timeren er allerede startet',
	TIMERNOTFOUND : 'Timeren er ikke startet. Der blev ikke fundet nogen aktiv timer.',
	TIMERSTARTED : 'Timeren er startet',
	TIMERSTOPPED : 'Timeren er stoppet',
	TOOLS : 'V\u00E6rkt\u00F8jer',
	STARTTIMER : 'Start timer',
	STOPTIMER : 'Stop timer',
	MODIFYSAVE : 'Posten er \u00E6ndret.  Gem \u00E6ndringerne.',
	SITEREQUIRED : 'Lokaliteten skal oprette en arbejdsordre.',
	NOVALUE : 'Tom v\u00E6rdi',
	ACTIONS : 'Handlinger',
	CHILDRENOF : 'Underordnet af',
	RESPONSIBILITY : 'Ansvar',
	LOOKUP : 'S\u00F8g',
	LOCATIONDRILLDOWN : 'Placering af specificering',
	ASSETDRILLDOWN : 'Specificering af aktiv',
	DRILLDOWN : 'Specificering',
	BACK : 'Tilbage',
	SAVE : 'Gem',
	APPLY : 'Anvend',
	FILTER : 'Filter',
	RESET : 'Nulstil',
	SELECTVALUE : 'V\u00E6lg v\u00E6rdi',
	CANCEL : 'Annuller',
	OK : 'OK',
	YES : 'Ja',
	NO : 'Nej',
	CREATEFOLLOWUP : 'Opret en opf\u00F8lgning',
	CREATESR : 'Opret en ny tjenesteanmodning',
	PARENT : 'Overordnet',
	CHANGESTATUS : 'Skift status',
	LABOR : 'Arbejdskraft',
	MATERIALS : 'Materialer',
	TASKS : 'Opgaver',
	ATTACHMENTS : 'Vedh\u00E6ftede filer',
	FAILUREREPORTING : 'Fejlrapportering',
	MULTIASSETS : 'Flere aktiver, Placeringer',
	ADDNEW : 'Tilf\u00F8j ny',
	CLASSIFICATION : 'Klassificering',
	NORECORDS : 'Der blev ikke fundet nogen post(er)',
	NORECORDEXIST : 'Der blev ikke fundet nogen post, eller den findes ikke l\u00E6ngere',
	NORECORDSADJ : 'Der er ingen poster til at justere fysiske opt\u00E6llinger',
	SELECTOWNER : 'V\u00E6lg ejer',
	OWNER : 'Ejer',
	OWNERGROUP : 'Ejergruppe',
	TAKEOWNERSHIP : 'Overtag ejerskab',
	SORTBY : 'Sorter efter',
	LIST : 'Liste',
	QUICKSEARCH: 'Hurtig s\u00F8gning',
	INVENTORYBYSR : 'Inventar efter lager',
	INVDETAILS : 'Inventaroplysninger',
	NEWCOUNT : 'Nyt antal',
	LABORTRANS : 'Arbejdskrafttransaktioner',
	CREATEWO : 'Opret ny arbejdsordre',
	MYWOS : 'Mine arbejdsordrer',
	FAILUREREPORT : 'Fejlrapportering',
	METERREADINGS : 'Angiv m\u00E5lerafl\u00E6sninger',
	ASSETMETER : 'M\u00E5lerafl\u00E6sninger af aktiv',
	LOCATIONMETER : 'Placering af m\u00E5lerafl\u00E6sninger',
	FROM : 'Fra',
	TO : 'Til',
	ADVANCED : 'Avanceret',
	ADVANCEDSEARCH : 'Avanceret s\u00F8gning',
	DOWNTIME : 'Nedetid',
	PURCHASEINFO : 'K\u00F8bsoplysninger',
	SPAREPARTS : 'Reservedele',
	SCHEDULEINFO : 'Planl\u00E6gningsoplysninger',
	PLANLABOR : 'Planl\u00E6g arbejdskraft',
	PLANMATERIAL : 'Planlagte materialer',
	WOCREATED : 'Arbejdsordren {0} blev oprettet.',
	PRESTART : 'F\u00F8r start',
	REVIEWANDAPPROVE : 'Gennemse og godkend',
	MOCACTIONGROUP : 'V\u00E6lg MOC-handlingsgruppe',
	MOCACTIONS : 'V\u00E6lg MOC-handlinger',
	REVIEWERSAVED : 'Bed\u00F8mmer(e) gemt offline.',
	APPROVERSAVED : 'Godkender(e) gemt offline.',
	ACTIONSAVED : 'Handling(er) gemt offline.',
	NOACTIONS : 'Standardhandlingsgruppen {0} har ingen gyldige standardhandlinger at tilf\u00F8je.',
	SRQUEUED : 'SR {0}-status er \u00E6ndret til I K\u00D8.',
	SELECTREVIEWERS : 'V\u00E6lg bed\u00F8mmere',
	SELECTAPPROVERS : 'V\u00E6lg godkendere',
	APPROVERS : 'Godkendere',
	REVIEWERS : 'Bed\u00F8mmere',
	VIEWLIST: 'Vis liste',
	VIEWSUMMARY : 'Vis oversigt',
	STOREROOMS : 'Lagre',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'G\u00E5 til',
	APPS : 'Apps',
	STARTCENTER : 'Startcenter',
	PAGINATION : {
		TITLE : 'Side {{from}} af {{to}} - {{total}} Poster',
		PREV : 'Forrige',
		NEXT : 'N\u00E6ste'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Placering',
		ASSET : 'Aktiv',
		WOTRACK : 'Sporing af arbejdsordre',
		SR : 'Tjenesteanmodninger',
		INVENTOR: 'Inventar',
		INVISSUE: 'Udstedelser og overf\u00F8rsler',
		MOC : 'MOC (olie)',
		CREATEDR : 'Opret rekvisition',
		VIEWDR : 'Vis rekvisitioner',
		LABREP: 'Arbejdskraftrapportering',
		TXNTRACK : 'Synkroniseringsopl\u00F8sning'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Aktivnummer',
		STATUS : 'Status',
		STATUSDATE: 'Dato for sidste \u00E6ndring',
		INSTALLDATE: 'Installationsdato',
		SITEID : 'Lokalitet',
		PARENT : 'Overordnet',
		ASSETTYPE: 'Type',
		LONGDESCRIPTION : 'Detaljer',
		GROUPNAME: 'M\u00E5lergruppe',
		SERIALNUM: 'Serienummer',
		PURCHASEPRICE: 'K\u00F8bspris',
		TOTDOWNTIME: 'Samlet nedetid',
		ISRUNNING: 'Aktiv up',
		VENDOR: 'Leverand\u00F8r',
		MANUFACTURER: 'Producent',
		FAILURECODE: 'Fejlklasse',
		DESCRIPTION : 'Beskrivelse',
		LOCATION : 'Placering',
		LOCDESC : 'Detaljer',
		SEQUENCE : 'R\u00E6kkef\u00F8lge',
		PROGRESS : 'Mark\u00E9r fremskridt?',
		COMMENTS : 'Kommentarer',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Arbejdsordre',
		DESCRIPTION : 'Beskrivelse',
		LONGDESCRIPTION : 'Detaljer',
		STATUS : 'Status',
		PARENT : 'Overordnet arbejdsordre',
		SITEID : 'Lokalitet',
		LOCATION : 'Placering',
		ASSETNUM : 'Aktiv',
		WORKTYPE : 'Arbejdstype',
		WOPRIORITY : 'Prioritet',
		GLACCOUNT : 'GL-konto',
		FAILURECODE : 'Fejlklasse',
		PROBLEMCODE : 'Problemkode',
		SUPERVISOR : 'Tilsynsf\u00F8rende',
		CREWID : 'Personale',
		LEAD : 'Leder',
		PERSONGROUP : 'Arbejdsgruppe',
		REPORTEDBY : 'Rapporteret af',
		REPORTDATE : 'Dato for rapportering',
		PHONE : 'Telefon',
		TASKID : 'Opgave',
		TARGSTARTDATE : 'M\u00E5lstart',
		TARGCOMPDATE : 'M\u00E5lslut',
		SCHEDSTART : 'Planlagt start',
		SCHEDFINISH : 'Planlagt afslutning',
		ACTSTART : 'Faktisk start',
		ACTFINISH : 'Faktisk afslutning',
		ASSIGNMENT : 'Tildelt arbejdskraft',
		OWNER : 'Ejer',
		OWNERGROUP : 'Ejergruppe',
		OBSERVATION : 'Observation',
		MEASUREMENTVALUE : 'M\u00E5lev\u00E6rdi',
		HAZARDS: 'Farer',
		HAZARDSMAT: 'Farlige materialer',
		PRECAUTIONS: 'Forholdsregler',
		LOCKTAG: 'Lock Out/Tag Out',
		TAGOUT: 'Tag Out',
		LOCKOUT: 'Lock Out',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Beskrivelse',
		ITEM : 'Element',
		LINETYPE : 'Linjetype',
		QUANTITY : 'Antal',
		STOREROOM : 'Lager',
		STORELOC : 'Lager',
		BINNUM : 'Bin\u00E6r',
		CURBAL : 'Aktuel saldo',
		UNITCOST : 'Enhedsomkostninger',
		ASSET : 'Aktiv',
		WORKORDER : 'Arbejdsordre',
		LOCATION : 'Placering',
		ISSUETYPE : 'Udstedelsestype',
		ISSUETO : 'Udstedt til',
		ROTASSETNUM : 'Roterende aktiv',
		SITEID : 'Lokalitet',
		ISSUERETURN : 'Udstedelse og returnering',
		CHARGEINFO : 'Ansvarsbeskrivelse'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Beskrivelse',
		ITEM : 'Element',
		LINETYPE : 'Linjetype',
		QUANTITY : 'Antal',
		STOREROOM : 'Lager',
		BINNUM : 'Bin\u00E6r',
		CURBAL : 'Aktuel saldo',
		UNITCOST : 'Enhedsomkostninger',
		ISSUETYPE : 'Udstedelsestype',
		LOCATION : 'Placering',
		TOOLRATE : 'V\u00E6rkt\u00F8jspris',
		ASSETNUM: 'Aktiv',
		TOOLHRS: 'V\u00E6rkt\u00F8jstimer',
		LINECOST: 'Linjeomkostninger',
		TOOLQTY: 'V\u00E6rkt\u00F8jsantal'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Beskrivelse',
		ITEM : 'Element',
		LINETYPE : 'Linjetype',
		QUANTITY : 'Antal',
		TOSTORELOC : 'Til-placering',
		FROMSTORELOC : 'Fra-placering',
		FROMSITE : 'Fra lokalitet',
		TOSITE : 'Til lokalitet',
		TOBIN: 'Til bin\u00E6r',
		FROMBIN: 'Fra bin\u00E6r',
		UNITCOST : 'Enhedsomkostninger',
		ISSUETYPE : 'Udstedelsestype',
		CONVERSIONFACTOR : 'Omregningsfaktor',
		ROTASSETNUM : 'Roterende aktiv',
		TRANSFEROUT : 'Overf\u00F8rsel ud',
		TRANSFERIN : 'Overf\u00F8rsel ind',
		FROMQTY : 'Fra bin\u00E6rt antal',
		TOQTY : 'Til bin\u00E6rt antal',
		SITEID : 'Lokalitet',
		LOCATION : 'Placering',
		TRANSFERDETAILS: 'Overf\u00F8rselsdetaljer'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Aktiv',
		LOCATION : 'Placering',
		SEQUENCE : 'R\u00E6kkef\u00F8lge',
	},
	WORKLOG : {
		NAME : 'Arbejdslogbog',
		DESCRIPTION : 'Beskrivelse',
		DETAILS : 'Detaljer',
		LOGTYPE : 'Type',
		CREATEBY : 'Oprettet af',
		CREATEDATE : 'Oprettelsesdato'
	},
	SR : {
		ACTIVEREQS : 'Aktive tjenesteanmodninger',
		NEWREQS : 'Nye tjenesteanmodninger',
		AFFECTEDPERSON : 'Ber\u00F8rt person',
		DETAILS : 'Detaljer',
		GLACCOUNT : 'GL-konto',
		LOCATION : 'Placering',
		OWNER : 'Ejer',
		OWNERGROUP : 'Ejergruppe',
		REPORTEDPRIORITY : 'Rapporteret prioritet',
		REPORTEDBY : 'Rapporteret af',
		REPORTDATE : 'Dato for rapportering',
		REPORTEDPHONE : 'Rapporteret telefon',
		REPORTEDEMAIL : 'Rapporteret mail',
		SITE : 'Lokalitet',
		STATUS : 'Status',
		SR : 'Tjenesteanmodning',
		SUMMARY : 'Oversigt',
		ASSETNUM : 'Aktiv',
		ASSETSITEID : 'Aktivlokalitet',
	},
	INVBALANCES : {
		ITEMNUM : 'Element',
		DESCRIPTION : 'Beskrivelse',
		BINNUM : 'Bin\u00E6r',
		CURBAL : 'Aktuel saldo',
		PHYSCNT : 'Fysisk saldo',
		PHYSCNTDATE : 'Dato for fysisk opt\u00E6lling',
		RECONCILED : 'Afstemt',
		LOCATION : 'Lager',
	},
	INVENTORY : {
		ITEMNUM : 'Element',
		DESCRIPTION : 'Beskrivelse',
		SITEID : 'Lokalitet',
		STATUS : 'Status',
		LOCATION : 'Lager',
		CATEGORY : 'Lagerkategori',
		BINNUM : 'Standard bin\u00E6r',
		ISSUEUNIT : 'Udstedelsesenhed',
		CURBAL : 'Aktuel saldo',
		LASTISSUEDATE : 'Sidste udstedelsesdato',
		ISSUEYTD : '\u00C5r til dato',
		ISSUE1YRAGO : 'Sidste \u00E5r',
		PHYSCNT : 'Fysisk opt\u00E6lling',
		PHYSCNTDATE : 'Dato for fysisk opt\u00E6lling',
		RECONCILED : 'Afstemt',
		TOTALINVPHYBAL : 'Fysisk saldo',
		TOTALINVBAL : 'Aktuel saldo',
		ISSUEHISTORY : 'Udstedelseshistorik',
		INVBALANCE : 'Lagersaldi',
		ADJCOUNT : 'Just\u00E9r fysisk opt\u00E6lling for disse {{count}} elementer',
		BALSUMMARY : 'Oversigt over tilg\u00E6ngelig saldo',
	},
	METER : {
		ASSETNUM : 'Aktiv',
		METERNAME : 'M\u00E5ler',
		METERTYPE : 'M\u00E5lertype',
		READINGTYPE : 'Afl\u00E6sningstype',
		LASTREADING : 'Seneste afl\u00E6sning',
		LASTREADINGDATE : 'Dato for seneste afl\u00E6sning',
		LASTREADINGINSPECTOR : 'Inspekt\u00F8r for seneste afl\u00E6sning',
		READING : 'Ny afl\u00E6sning',
		NEWREADINGDATE : 'Dato for ny afl\u00E6sning'
	},
	WPLABOR : {
		NAME : 'Planlagt arbejdskraft',
		LABORCODE : 'Arbejds-',
		CRAFT : 'kraft',
		QUANTITY : 'Antal',
		LABORHRS : 'Normaltimer',
		DISPLAYNAME : 'Navn',
		SKILLLEVEL: 'F\u00E6rdighedsniveau',
		VENDOR : 'Leverand\u00F8r',
		AMCREW : 'Personale'
	},		
	WPMATERIAL : {
		NAME : 'Planlagte materialer',
		LINETYPE : 'Linjetype',
		ITEMNUM : 'Element',
		DESCRIPTION : 'Beskrivelse',
		ITEMQTY : 'Antal',
		UNITCOST : 'Enhedsomkostninger',
		STOREROOM : 'Lager',
		STORELOCSITE : 'Lagerlokalitet',
		RESTYPE : 'Reservationstype',
		REQUIREDATE : 'P\u00E5kr\u00E6vet dato'
	},
	LABTRANS : {
		LABORCODE : 'Arbejds-',
		CRAFT : 'kraft',
		STARTDATE : 'Startdato',
		TIMERSTATUS : 'Timerstatus',
		REGULARHRS : 'Normaltimer',
		PAYRATE: 'Sats',
		PREMIUMPAYCODE : 'Premium Pay-kode',
		PREMIUMPAYHOURS : 'Premium Pay-timer',
		PREMIUMPAYRATE: 'Premium Pay-sats',
		WONUM : 'Arbejdsordre',
		LOCATION : 'Placering',
		ASSETNUM : 'Aktiv',
		TICKETID: 'Arbejdsseddel'
	},
	LABREP : {
		LABORCODE : 'Arbejds-',
		CRAFT : 'kraft',
		SKILLLEVEL : 'F\u00E6rdighedsniveau',
		STARTDATE : 'Startdato',
		STARTTIME : 'Starttidspunkt',
		FINISHDATE : 'Slutdato',
		FINISHTIME : 'Sluttidspunkt',
		REGULARHRS : 'Normaltimer',
		PAYRATE : 'Sats',
		TRANSTYPE : 'Type',
		WONUM : 'Arbejdsordre',
		LOCATION : 'Placering',
		ASSETNUM : 'Aktiv',
		GENAPPRSERVRECEIPT: 'Godkendt',
		NAME: 'Navn',
		TIMERSTATUS : 'Timerstatus',
		PREMIUMPAYHOURS : 'Premium Pay-timer',
		PREMIUMPAYRATE: 'Premium Pay-sats',
		PREMIUMPAYCODE : 'Premium Pay-kode',
		TICKETID: 'Arbejdsseddel',
		TICKETCLASS: 'Arbejdsseddelklasse'
	},
	PERSON : {
		PERSONID: 'Person',
		FIRSTNAME: 'Fornavn',
		LASTNAME: 'Efternavn'
	},
	FAILURECODE : {
		FAILURECODE : 'Fejlklasse',
		PROBLEMCODE : 'Problem',
		CAUSECODE : '\u00C5rsag',
		REMEDYCODE : 'Afhj\u00E6lpning',
	},
	SPAREPART : {
		QUANTITY : 'Antal',
		ISSUEDQTY : 'Udstedt antal',
		REMARKS : 'Bem\u00E6rkninger',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Beskrivelse',
		LONGDESCRIPTION : 'Detaljer',
		ASSET : 'Aktiv',
		STATUS : 'Status',
		PARENT : 'Overordnet arbejdsordre',
		SITE : 'Lokalitet',
		LOCATION : 'Placering',
	},
	DOMAIN : {
		VALUE: 'V\u00E6rdi',
		DESCRIPTION: 'Beskrivelse',
	},
	MR : {
		MRNUM : 'Rekvisition',
		DESCRIPTION : 'Beskrivelse',
		LONGDESCRIPTION : 'Lang beskrivelse',
		STATUS : 'Status',
		PRIORITY : 'Prioritet',
		CHARGEINFO : 'Ansvarsbeskrivelse',
		REQUIREDDATE : 'P\u00E5kr\u00E6vet dato',
		WONUM : 'Arbejdsordre',
		LOCATION : 'Placering',
		ASSET : 'Aktiv',
		GLACCOUNT : 'GL-debitkonto',
		MRLINES : 'Rekvisitionslinjeelementer',
		ENTERDATE : 'Indtastningsdato'
	},
	MRLINE : {
		MRLINEITEM : 'Rekvisitionselement',
		MRLINENUM : 'Linje',
		LINETYPE : 'Linjetype',
		ITEM : 'Element',
		DESCRIPTION : 'Beskrivelse',
		QTY : 'Antal',
		ORDERUNIT : 'Ordreenhed',
		UNITCOST : 'Enhedsomkostninger',
		LINECOST : 'Linjeomkostninger',
		REQUIREDDATE : 'P\u00E5kr\u00E6vet dato'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Vis sendte rekvisitioner',
		VIEWSAVED : 'Vis gemte rekvisitioner',
		EDIT : 'Rediger rekvisition'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Gem som kladde',
		NEWREQITEM : 'Nyt rekvisitionselement',
		SUBMIT : 'Send'
	},
	CLASSIFY : {
		CLASSASSET : 'Klassificer aktiv',
		CLASSWO : 'Klassificer arbejdsordre',
		DESCRIPTION : 'Klassebeskrivelse',
		CLASSIFICATION : 'Klassicicering'
	}
};