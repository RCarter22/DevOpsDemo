'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: nl_NL
 */
var locale = 'nl_NL'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Instellen',
        cancelText: 'Annuleren',
        clearText: 'Wissen',
        selectedText: 'Geselecteerd',
        // Calender component
        calendarText: 'Kalender',
        dateText: 'Datum',
        timeText: 'Tijd',
        // Datetime component
        dateFormat: 'd-m-y',
        dateOrder: 'dmy',
        dayNames: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
        dayNamesShort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
        dayText: 'Dag',
        hourText: 'Uur',
        minuteText: 'Minuten',
        monthNames: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'],
        monthText: 'Maand',
        secText: 'Seconden',
        amText: 'vm',
        pmText: 'nm',
        timeFormat: 'H:ii',
        timeWheels: 'Hii',
        yearText: 'Jaar',
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
	        symbol: '\u20ac'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "nul",
		ONE : "\u00E9\u00E9n",
		TWO : "twee",
		FEW : "weinig",
		MANY : "veel",
		OTHER : "ander(e)"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "a.m.", "p.m."],
			"DAY" : [ "zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag" ],
			"MONTH" : [ "januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december" ],
			"SHORTDAY" : [ "zo", "ma" , "di", "wo", "do", "vr", "za" ],
			"SHORTMONTH" : [ "jan.","feb.", "mrt.","apr.","mei","jun.","jul.","aug.","sep.","okt.","nov.","dec." ],
			"fullDate" : "EEEE d MMMM y",
		    "longDate" : "d MMMM y",
		    "medium" : "d MMM y H:mm:ss",
		    "mediumDate" : "d MMM y",
		    "mediumTime" : "H:mm:ss",
		    "short" : "d-M-yy H:mm",
		    "shortDate" : "d-M-yy",
		    "shortTime" : "H:mm"	
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "\u20ac",
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
		        "negPre": "\u00a4\u00a0-",
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
 * Language: NL
 */
var lang = 'NL'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Synchronisatie voltooid met fouten!  U kunt nog steeds proberen offline te werken.',
	EMMOF1001W : 'Synchronisatie voltooid met fouten!  Voer de synchronisatie opnieuw uit om de offline modus in te schakelen.',
	EMMOF1002W : 'Synchronisatie voltooid met fouten!  U kunt de synchronisatie opnieuw uitvoeren of offline blijven werken.',
	EMMOF1003W : 'Synchronisatie voltooid met fouten!  Probeer opnieuw te synchroniseren om offline te werken.',
	EMMOF1004W : '{0} moet een getal zijn',
	EMMOF1005W : 'Ontbrekende verplichte velden: {0}',
	EMMOF1006W : 'Kenmerk {0} is alleen-lezen',
	EMMOF1007W : 'Selecteer een waarde',
	EMMOF1008I : 'Status gewijzigd',
	EMMOF1009W : 'Geef een aantal groter dan nul op',
	EMMOF1010W : '{0} moet groter zijn dan nul',
	EMMOF1011W : '{0} is verplicht',
	EMMOF1012W : 'Er bestaat geen saldo voor dit artikel, opslagruimte-, en bakcombinaties',
	EMMOF1013W : 'Het saldo in de bak wordt negatief als gevolg van deze transactie',
	EMMOF1014W : 'Kan niet overdragen wanneer locaties,, baknummers en site-id\'s allemaal identiek zijn',
	// [WF]		
	EMMWF1000I : 'Werkstroom starten',
	EMMWF1001I : 'Er is meer dan \u00E9\u00E9n werkstroomproces beschikbaar voor deze applicatie.  Selecteer er een en druk op OK.',
	EMMWF1002I : 'Selecteer een proces',
	EMMWF1003I : 'Proces',
	EMMWF1004I : 'Memo',
	EMMWF1005I : 'Werkstroom stoppen',
	// [ES]
	EMMES1000I : 'Autorisatie elektronische handtekening',
	EMMES1001I : 'Er is een elektronische handtekening vereist',
	EMMES1002E : 'Autorisatie mislukt',
	EMMES1003I : 'Voer een wachtwoord en een reden in',
	EMMES1004I : 'Gebruiker',
	EMMES1005I : 'Wachtwoord',
	EMMES1006I : 'Reden',
	// [GB]
	EMMGB1001I : 'E-mail',
	EMMGB1002I : 'Persoonlijk',
	EMMGB1003I : 'Annuleren',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Bevestigen',
	EMMGB1006I : 'Ja',
	EMMGB1007I : 'Nee',
	EMMGB1008I : 'Telefonisch',
	EMMGB1009I : 'Bellen',
	EMMGB1010I : 'SMS-en',
	EMMGB1011I : 'Verwijderen bevestigen?',
	EMMGB1012I : '{0} moet eerder plaatsvinden dan {1}',
	EMMGB1013I : '{0} moet later plaatsvinden dan {1}',
	EMMGB1014I : '{0} moet in het verleden plaatsvinden',
	// General	
	OFFLINEMODE : 'Offline modus',
	SYNCNEEDED : ' - Gewijzigd, Synchronisatie nodig',
	SYNCHRONIZATION : 'Synchronisatie',
	SYNCSERVER : 'Synchroniseren met server',
	ENTERLABOR: 'Invoeren via arbeid',
	ADDMORE: 'Meer toevoegen...',
	GOONLINE : 'Weer online gaan',
	GOTOOFFLINEAPPS : 'Naar offline applicaties gaan',
	OFFLINEAPPS : 'Offline applicaties',
	QUICKSCAN : 'Snelle scan: ',
	ACTIVEWORKORDERS : 'Actieve werkorders',
	RECORDSAVED: 'Record opgeslagen',
	RECORDNOTSAVED: 'Fout - geen record geretourneerd',
	TIMERALREADYSTARTED: 'Timer al gestart',
	TIMERNOTFOUND : 'Timer niet gestart. Geen actieve timer gevonden.',
	TIMERSTARTED : 'Timer gestart',
	TIMERSTOPPED : 'Timer gestopt',
	TOOLS : 'Gereedschappen',
	STARTTIMER : 'Timer starten',
	STOPTIMER : 'Timer stoppen',
	MODIFYSAVE : 'Record gewijzigd.  Sla uw wijzigingen op.',
	SITEREQUIRED : 'Site is vereist om werkorder te maken.',
	NOVALUE : 'Lege waarde',
	ACTIONS : 'Acties',
	CHILDRENOF : 'Onderliggenden van',
	RESPONSIBILITY : 'Verantwoordelijkheid',
	LOOKUP : 'Opzoeken',
	LOCATIONDRILLDOWN : 'Specificeren op locatie',
	ASSETDRILLDOWN : 'Specificeren op activa',
	DRILLDOWN : 'Specificeren',
	BACK : 'Terug',
	SAVE : 'Opslaan',
	APPLY : 'Toepassen',
	FILTER : 'Filter',
	RESET : 'Reset',
	SELECTVALUE : 'Waarde selecteren',
	CANCEL : 'Annuleren',
	OK : 'OK',
	YES : 'Ja',
	NO : 'Nee',
	CREATEFOLLOWUP : 'Vervolgactie maken',
	CREATESR : 'Nieuwe serviceaanvraag maken',
	PARENT : 'Bovenliggende',
	CHANGESTATUS : 'Status wijzigen',
	LABOR : 'Arbeid',
	MATERIALS : 'Materialen',
	TASKS : 'Taken',
	ATTACHMENTS : 'Bijlagen',
	FAILUREREPORTING : 'Foutenrapportage',
	MULTIASSETS : 'Meerdere activa, Locaties',
	ADDNEW : 'Nieuwe toevoegen',
	CLASSIFICATION : 'Classificatie',
	NORECORDS : 'Geen record(s) gevonden',
	NORECORDEXIST : 'Geen record gevonden of record bestaat niet meer',
	NORECORDSADJ : 'Geen records om fysieke tellingen aan te passen',
	SELECTOWNER : 'Eigenaar selecteren',
	OWNER : 'Eigenaar',
	OWNERGROUP : 'Eigenaar van groep',
	TAKEOWNERSHIP : 'Eigenaar worden',
	SORTBY : 'Sorteren op',
	LIST : 'Lijst',
	QUICKSEARCH: 'Snel zoeken',
	INVENTORYBYSR : 'Voorraad per opslagruimte',
	INVDETAILS : 'Voorraaddetails',
	NEWCOUNT : 'Nieuwe telling',
	LABORTRANS : 'Arbeidstransacties',
	CREATEWO : 'Nieuwe werkorder maken',
	MYWOS : 'Mijn werkorders',
	FAILUREREPORT : 'Foutenrapportage',
	METERREADINGS : 'Meteruitlezingen invoeren',
	ASSETMETER : 'Meteruitlezingen activa',
	LOCATIONMETER : 'Meteruitlezingen locatie',
	FROM : 'Van',
	TO : 'Aan',
	ADVANCED : 'Uitgebreid',
	ADVANCEDSEARCH : 'Uitgebreid zoeken',
	DOWNTIME : 'Uitvaltijd',
	PURCHASEINFO : 'Inkoopgegevens',
	SPAREPARTS : 'Reserveonderdelen',
	SCHEDULEINFO : 'Gegevens plannen',
	PLANLABOR : 'Arbeid plannen',
	PLANMATERIAL : 'Geplande materialen',
	WOCREATED : 'Werkorder {0} gemaakt.',
	PRESTART : 'Voorafgaand aan de start',
	REVIEWANDAPPROVE : 'Reviseren en goedkeuren',
	MOCACTIONGROUP : 'MOC-actiegroep selecteren',
	MOCACTIONS : 'MOC-acties selecteren',
	REVIEWERSAVED : 'Revisor(s) offline opgeslagen.',
	APPROVERSAVED : 'Fiatteur(s) offline opgeslagen.',
	ACTIONSAVED : 'Actie(s) offline opgeslagen.',
	NOACTIONS : 'Standaardactiegroep {0} heeft geen geldige standaardacties om toe te voegen.',
	SRQUEUED : 'SR-status {0} gewijzigd naar IN WACHTRIJ.',
	SELECTREVIEWERS : 'Revisors selecteren',
	SELECTAPPROVERS : 'Fiatteurs selecteren',
	APPROVERS : 'Fiatteurs',
	REVIEWERS : 'Revisors',
	VIEWLIST: 'Lijst weergeven',
	VIEWSUMMARY : 'Overzicht weergeven',
	STOREROOMS : 'Opslagruimten',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Ga naar',
	APPS : 'Apps',
	STARTCENTER : 'Startcentrum',
	PAGINATION : {
		TITLE : 'Pagina {{from}} van {{to}} - {{total}} Records',
		PREV : 'Vorige',
		NEXT : 'Volgende'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Locatie',
		ASSET : 'Activum',
		WOTRACK : 'Werkorders bijhouden',
		SR : 'Serviceaanvragen',
		INVENTOR: 'Voorraad',
		INVISSUE: 'Uitgiften en overdrachten',
		MOC : 'MOC (olie)',
		CREATEDR : 'Aanvraag maken',
		VIEWDR : 'Aanvragen weergeven',
		LABREP: 'Arbeidsrapportage',
		TXNTRACK : 'Synchronisatieresolutie'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Activumnr.',
		STATUS : 'Status',
		STATUSDATE: 'Datum laatste wijziging',
		INSTALLDATE: 'Installatiedatum',
		SITEID : 'Site',
		PARENT : 'Bovenliggende',
		ASSETTYPE: 'Type',
		LONGDESCRIPTION : 'Details',
		GROUPNAME: 'Metergroep',
		SERIALNUM: 'Serienr.',
		PURCHASEPRICE: 'Inkoopprijs',
		TOTDOWNTIME: 'Totale uitvaltijd',
		ISRUNNING: 'Activum omhoog',
		VENDOR: 'Leverancier',
		MANUFACTURER: 'Fabrikant',
		FAILURECODE: 'Foutklasse',
		DESCRIPTION : 'Beschrijving',
		LOCATION : 'Locatie',
		LOCDESC : 'Details',
		SEQUENCE : 'Reeks',
		PROGRESS : 'Voortgang markeren?',
		COMMENTS : 'Opmerkingen',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Werkorder',
		DESCRIPTION : 'Beschrijving',
		LONGDESCRIPTION : 'Details',
		STATUS : 'Status',
		PARENT : 'Bovenliggende WO',
		SITEID : 'Site',
		LOCATION : 'Locatie',
		ASSETNUM : 'Activum',
		WORKTYPE : 'Werktype',
		WOPRIORITY : 'Prioriteit',
		GLACCOUNT : 'GB-rekening',
		FAILURECODE : 'Foutklasse',
		PROBLEMCODE : 'Probleemcode',
		SUPERVISOR : 'Supervisor',
		CREWID : 'Ploeg',
		LEAD : 'Leiden',
		PERSONGROUP : 'Werkgroep',
		REPORTEDBY : 'Gemeld door',
		REPORTDATE : 'Gemeld op',
		PHONE : 'Telefonisch',
		TASKID : 'Taak',
		TARGSTARTDATE : 'Gewenste startdatum',
		TARGCOMPDATE : 'Gewenste voltooiingsdatum',
		SCHEDSTART : 'Geplande startdatum',
		SCHEDFINISH : 'Geplande voltooiingsdatum',
		ACTSTART : 'Daadwerkelijke startdatum',
		ACTFINISH : 'Daadwerkelijke voltooiingsdatum',
		ASSIGNMENT : 'Toegewezen arbeid',
		OWNER : 'Eigenaar',
		OWNERGROUP : 'Eigenaar van groep',
		OBSERVATION : 'Waarneming',
		MEASUREMENTVALUE : 'Meetwaarde',
		HAZARDS: 'Gevaren',
		HAZARDSMAT: 'Gevaarlijke materialen',
		PRECAUTIONS: 'Voorzorgsmaatregelen',
		LOCKTAG: 'Vergrendelen/labelen',
		TAGOUT: 'Labels',
		LOCKOUT: 'Vergrendelen',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Beschrijving',
		ITEM : 'Artikel',
		LINETYPE : 'Regeltype',
		QUANTITY : 'Aantal',
		STOREROOM : 'Opslagruimte',
		STORELOC : 'Opslagruimte',
		BINNUM : 'Bak',
		CURBAL : 'Huidig saldo',
		UNITCOST : 'Kosten per eenheid',
		ASSET : 'Activum',
		WORKORDER : 'Werkorder',
		LOCATION : 'Locatie',
		ISSUETYPE : 'Type uitgifte',
		ISSUETO : 'Uitgegeven naar',
		ROTASSETNUM : 'Roulerend activum',
		SITEID : 'Site',
		ISSUERETURN : 'Uitgifte en retour',
		CHARGEINFO : 'Kostengegevens'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Beschrijving',
		ITEM : 'Artikel',
		LINETYPE : 'Regeltype',
		QUANTITY : 'Aantal',
		STOREROOM : 'Opslagruimte',
		BINNUM : 'Bak',
		CURBAL : 'Huidig saldo',
		UNITCOST : 'Kosten per eenheid',
		ISSUETYPE : 'Type uitgifte',
		LOCATION : 'Locatie',
		TOOLRATE : 'Gereedschapstarief',
		ASSETNUM: 'Activum',
		TOOLHRS: 'Gereedschapsuren',
		LINECOST: 'Kosten per regel',
		TOOLQTY: 'Aantal gereedschappen'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Beschrijving',
		ITEM : 'Artikel',
		LINETYPE : 'Regeltype',
		QUANTITY : 'Aantal',
		TOSTORELOC : 'Naar locatie',
		FROMSTORELOC : 'Van locatie',
		FROMSITE : 'Van site',
		TOSITE : 'Naar site',
		TOBIN: 'Naar bak',
		FROMBIN: 'Van bak',
		UNITCOST : 'Kosten per eenheid',
		ISSUETYPE : 'Type uitgifte',
		CONVERSIONFACTOR : 'Omrekeningsfactor',
		ROTASSETNUM : 'Roulerend activum',
		TRANSFEROUT : 'Overdragen uit',
		TRANSFERIN : 'Overdragen in',
		FROMQTY : 'Van bakaantal',
		TOQTY : 'Naar bakaantal',
		SITEID : 'Site',
		LOCATION : 'Locatie',
		TRANSFERDETAILS: 'Overdrachtgegevens'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Activum',
		LOCATION : 'Locatie',
		SEQUENCE : 'Reeks',
	},
	WORKLOG : {
		NAME : 'Werklogbestand',
		DESCRIPTION : 'Beschrijving',
		DETAILS : 'Details',
		LOGTYPE : 'Type',
		CREATEBY : 'Gemaakt door',
		CREATEDATE : 'Aanmaakdatum'
	},
	SR : {
		ACTIVEREQS : 'Actieve serviceaanvragen',
		NEWREQS : 'Nieuwe serviceaanvragen',
		AFFECTEDPERSON : 'Be\u00EFnvloede persoon',
		DETAILS : 'Details',
		GLACCOUNT : 'GB-rekening',
		LOCATION : 'Locatie',
		OWNER : 'Eigenaar',
		OWNERGROUP : 'Eigenaar van groep',
		REPORTEDPRIORITY : 'Gemelde prioriteit',
		REPORTEDBY : 'Gemeld door',
		REPORTDATE : 'Meldingsdatum',
		REPORTEDPHONE : 'Telefonisch gemeld',
		REPORTEDEMAIL : 'Via e-mail gemeld',
		SITE : 'Site',
		STATUS : 'Status',
		SR : 'Serviceaanvraag',
		SUMMARY : 'Overzicht',
		ASSETNUM : 'Activum',
		ASSETSITEID : 'Activasite',
	},
	INVBALANCES : {
		ITEMNUM : 'Artikel',
		DESCRIPTION : 'Beschrijving',
		BINNUM : 'Bak',
		CURBAL : 'Huidig saldo',
		PHYSCNT : 'Fysiek saldo',
		PHYSCNTDATE : 'Datum fysieke telling',
		RECONCILED : 'Afgestemd',
		LOCATION : 'Opslagruimte',
	},
	INVENTORY : {
		ITEMNUM : 'Artikel',
		DESCRIPTION : 'Beschrijving',
		SITEID : 'Site',
		STATUS : 'Status',
		LOCATION : 'Opslagruimte',
		CATEGORY : 'Voorraadcategorie',
		BINNUM : 'Standaardbak',
		ISSUEUNIT : 'Uitgifte-eenheid',
		CURBAL : 'Huidig saldo',
		LASTISSUEDATE : 'Datum laatste uitgifte',
		ISSUEYTD : 'Jaar tot heden',
		ISSUE1YRAGO : 'Vorig jaar',
		PHYSCNT : 'Fysieke telling',
		PHYSCNTDATE : 'Datum fysieke telling',
		RECONCILED : 'Afgestemd',
		TOTALINVPHYBAL : 'Fysiek saldo',
		TOTALINVBAL : 'Huidig saldo',
		ISSUEHISTORY : 'Uitgiftegeschiedenis',
		INVBALANCE : 'Voorraadsaldi',
		ADJCOUNT : 'Fysieke tellingen aanpassen voor deze {{count}} artikelen',
		BALSUMMARY : 'Overzicht beschikbaar saldo',
	},
	METER : {
		ASSETNUM : 'Activum',
		METERNAME : 'Meter',
		METERTYPE : 'Metertype',
		READINGTYPE : 'Type uitlezing',
		LASTREADING : 'Laatste uitlezing',
		LASTREADINGDATE : 'Datum laatste uitlezing',
		LASTREADINGINSPECTOR : 'Inspecteur laatste uitlezing',
		READING : 'Nieuwe uitlezing',
		NEWREADINGDATE : 'Datum nieuwe uitlezing'
	},
	WPLABOR : {
		NAME : 'Geplande arbeid',
		LABORCODE : 'Arbeid',
		CRAFT : 'Ambacht',
		QUANTITY : 'Aantal',
		LABORHRS : 'Standaarduren',
		DISPLAYNAME : 'Naam',
		SKILLLEVEL: 'Vaardigheidsniveau',
		VENDOR : 'Leverancier',
		AMCREW : 'Ploeg'
	},		
	WPMATERIAL : {
		NAME : 'Geplande materialen',
		LINETYPE : 'Regeltype',
		ITEMNUM : 'Artikel',
		DESCRIPTION : 'Beschrijving',
		ITEMQTY : 'Aantal',
		UNITCOST : 'Kosten per eenheid',
		STOREROOM : 'Opslagruimte',
		STORELOCSITE : 'Opslagruimtesite',
		RESTYPE : 'Type reservering',
		REQUIREDATE : 'Datum vereist'
	},
	LABTRANS : {
		LABORCODE : 'Arbeid',
		CRAFT : 'Ambacht',
		STARTDATE : 'Begindatum',
		TIMERSTATUS : 'Timerstatus',
		REGULARHRS : 'Standaarduren',
		PAYRATE: 'Tarief',
		PREMIUMPAYCODE : 'Code premiebetaling',
		PREMIUMPAYHOURS : 'Uren premiebetaling',
		PREMIUMPAYRATE: 'Tarief premiebetaling',
		WONUM : 'Werkorder',
		LOCATION : 'Locatie',
		ASSETNUM : 'Activum',
		TICKETID: 'Ticket'
	},
	LABREP : {
		LABORCODE : 'Arbeid',
		CRAFT : 'Ambacht',
		SKILLLEVEL : 'Vaardigheidsniveau',
		STARTDATE : 'Begindatum',
		STARTTIME : 'Begintijd',
		FINISHDATE : 'Einddatum',
		FINISHTIME : 'Eindtijd',
		REGULARHRS : 'Standaarduren',
		PAYRATE : 'Tarief',
		TRANSTYPE : 'Type',
		WONUM : 'Werkorder',
		LOCATION : 'Locatie',
		ASSETNUM : 'Activum',
		GENAPPRSERVRECEIPT: 'Goedgekeurd',
		NAME: 'Naam',
		TIMERSTATUS : 'Timerstatus',
		PREMIUMPAYHOURS : 'Uren premiebetaling',
		PREMIUMPAYRATE: 'Tarief premiebetaling',
		PREMIUMPAYCODE : 'Code premiebetaling',
		TICKETID: 'Ticket',
		TICKETCLASS: 'Ticketklasse'
	},
	PERSON : {
		PERSONID: 'Persoon',
		FIRSTNAME: 'Voornaam',
		LASTNAME: 'Achternaam'
	},
	FAILURECODE : {
		FAILURECODE : 'Foutklasse',
		PROBLEMCODE : 'Probleem',
		CAUSECODE : 'Oorzaak',
		REMEDYCODE : 'Oplossing',
	},
	SPAREPART : {
		QUANTITY : 'Aantal',
		ISSUEDQTY : 'Uitgegeven aantal',
		REMARKS : 'Opmerkingen',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Beschrijving',
		LONGDESCRIPTION : 'Details',
		ASSET : 'Activum',
		STATUS : 'Status',
		PARENT : 'Bovenliggende WO',
		SITE : 'Site',
		LOCATION : 'Locatie',
	},
	DOMAIN : {
		VALUE: 'Waarde',
		DESCRIPTION: 'Beschrijving',
	},
	MR : {
		MRNUM : 'Aanvraag',
		DESCRIPTION : 'Beschrijving',
		LONGDESCRIPTION : 'Lange beschrijving',
		STATUS : 'Status',
		PRIORITY : 'Prioriteit',
		CHARGEINFO : 'Kostengegevens',
		REQUIREDDATE : 'Datum vereist',
		WONUM : 'Werkorder',
		LOCATION : 'Locatie',
		ASSET : 'Activum',
		GLACCOUNT : 'GB-debetrekening',
		MRLINES : 'Aanvraagregelartikelen',
		ENTERDATE : 'Ingevoerde datum'
	},
	MRLINE : {
		MRLINEITEM : 'Aanvraagartikelen',
		MRLINENUM : 'Regel',
		LINETYPE : 'Regeltype',
		ITEM : 'Artikel',
		DESCRIPTION : 'Beschrijving',
		QTY : 'Aantal',
		ORDERUNIT : 'Besteleenheid',
		UNITCOST : 'Kosten per eenheid',
		LINECOST : 'Kosten per regel',
		REQUIREDDATE : 'Datum vereist'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Verzonden aanvragen weergeven',
		VIEWSAVED : 'Opgeslagen aanvragen weergeven',
		EDIT : 'Aanvraag bewerken'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Opslaan als concept',
		NEWREQITEM : 'Nieuw aanvraagartikel',
		SUBMIT : 'Verzenden'
	},
	CLASSIFY : {
		CLASSASSET : 'Activum classificeren',
		CLASSWO : 'Werkorder classificeren',
		DESCRIPTION : 'Beschrijving klasse',
		CLASSIFICATION : 'Classificatie'
	}
};