'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: sv_SE
 */
var locale = 'sv_SE'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'St\u00E4ll in',
        cancelText: 'Avbryt',
        clearText: 'Rensa',
        selectedText: 'Vald',
        // Calender component
        calendarText: 'Kalender',
        dateText: 'Datum',
        timeText: 'Tid',
        // Datetime component
        dateFormat: 'yy-mm-dd',
        dateOrder: 'yymmdd',
        dayNames: ['S\u00F6ndag', 'M\u00E5ndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'L\u00F6rdag'],
        dayNamesShort: ['S\u00F6n', 'M\u00E5n', 'Tis', 'Ons', 'Tor', 'Fre', 'L\u00F6r'],
        dayText: 'Dag',
        hourText: 'Timmar',
        minuteText: 'Minuter',
        monthNames: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
        monthText: 'M\u00E5nad',
        secText: 'Sekunder',
        amText: 'f.m.',
        pmText: 'e.m.',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: '\u00C5r',
        nowText: 'Nu',
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
	        symbol: 'kr'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "noll",
		ONE : "ett",
		TWO : "tv\u00E5",
		FEW : "tre",
		MANY : "m\u00E5nga",
		OTHER : "annat"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "fm", "em" ],
			"DAY" : [ "s\u00f6ndag", "m\u00e5ndag", "tisdag", "onsdag", "torsdag", "fredag", "l\u00f6rdag" ],
			"MONTH": [ "januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december" ],
			"SHORTDAY": [ "s\u00f6n", "m\u00e5n", "tis", "ons", "tors", "fre", "l\u00f6r" ],
			"SHORTMONTH": [ "jan.", "feb.", "mars", "apr.", "maj", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "dec." ],
			"fullDate": "EEEE d MMMM y",
			"longDate": "d MMMM y",
			"medium": "d MMM y HH:mm:ss",
			"mediumDate": "d MMM y",
			"mediumTime": "HH:mm:ss",
			"short": "y-MM-dd HH:mm",
			"shortDate": "y-MM-dd",
			"shortTime": "HH:mm"				
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "kr",
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
 * Language: SV
 */
var lang = 'SV'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Synkroniseringen har slutf\u00F6rts med fel!  Du kan fortfarande f\u00F6rs\u00F6ka arbeta offline.',
	EMMOF1001W : 'Synkroniseringen har slutf\u00F6rts med fel!  Synkronisera igen f\u00F6r att aktivera offlinel\u00E4ge.',
	EMMOF1002W : 'Synkroniseringen har slutf\u00F6rts med fel!  Du kan f\u00F6rs\u00F6ka synkronisera igen eller forts\u00E4tta arbeta offline.',
	EMMOF1003W : 'Synkroniseringen har slutf\u00F6rts med fel!  F\u00F6rs\u00F6k synkronisera igen f\u00F6r att arbeta offline.',
	EMMOF1004W : '{0} m\u00E5ste vara en siffra',
	EMMOF1005W : 'Obligatoriska f\u00E4lt som saknas: {0}',
	EMMOF1006W : 'Attribut {0} \u00E4r skrivskyddat',
	EMMOF1007W : 'V\u00E4lj ett v\u00E4rde',
	EMMOF1008I : 'Status har \u00E4ndrats',
	EMMOF1009W : 'Ange en st\u00F6rre kvantitet \u00E4n noll',
	EMMOF1010W : '{0} m\u00E5ste vara st\u00F6rre \u00E4n noll',
	EMMOF1011W : '{0} \u00E4r obligatoriskt',
	EMMOF1012W : 'Det finns inget saldo f\u00F6r den h\u00E4r kombinationen av post,, lagerrum, och korg',
	EMMOF1013W : 'Som ett resultat av denna transaktion blir saldot i korgen negativt ',
	EMMOF1014W : '\u00D6verf\u00F6ringen kan inte genomf\u00F6ras n\u00E4r plats,, korgnummer och plats-ID \u00E4r identiska',
	// [WF]		
	EMMWF1000I : 'Starta arbetsfl\u00F6de',
	EMMWF1001I : 'Det finns mer \u00E4n en tillg\u00E4nglig arbetsfl\u00F6desprocess f\u00F6r det h\u00E4r programmet.  V\u00E4lj en och tryck p\u00E5 OK.',
	EMMWF1002I : 'V\u00E4lj en process',
	EMMWF1003I : 'Process',
	EMMWF1004I : 'Memo',
	EMMWF1005I : 'Stoppa arbetsfl\u00F6de',
	// [ES]
	EMMES1000I : 'Auktorisering med e-signatur',
	EMMES1001I : 'Elektronisk signatur kr\u00E4vs',
	EMMES1002E : 'Auktoriseringen misslyckades',
	EMMES1003I : 'Ange l\u00F6senord och orsak',
	EMMES1004I : 'Anv\u00E4ndare',
	EMMES1005I : 'L\u00F6senord',
	EMMES1006I : 'Orsak',
	// [GB]
	EMMGB1001I : 'E-post',
	EMMGB1002I : 'FaceTime',
	EMMGB1003I : 'Avbryt',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Bekr\u00E4fta',
	EMMGB1006I : 'Ja',
	EMMGB1007I : 'Nej',
	EMMGB1008I : 'Telefon',
	EMMGB1009I : 'Ring',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Bekr\u00E4fta borttagning?',
	EMMGB1012I : '{0} m\u00E5ste infalla f\u00F6re {1}',
	EMMGB1013I : '{0} m\u00E5ste infalla efter {1}',
	EMMGB1014I : '{0} m\u00E5ste infalla i det f\u00F6rflutna',
	// General	
	OFFLINEMODE : 'Offlinel\u00E4ge',
	SYNCNEEDED : ' \u2013 \u00C4ndrad, Synkronisering beh\u00F6vs',
	SYNCHRONIZATION : 'Synkronisering',
	SYNCSERVER : 'Synkronisera med server',
	ENTERLABOR: 'Ange efter arbete',
	ADDMORE: 'L\u00E4gg till fler...',
	GOONLINE : 'G\u00E5 tillbaka till online',
	GOTOOFFLINEAPPS : 'G\u00E5 till offlineprogram',
	OFFLINEAPPS : 'Offlineprogram',
	QUICKSCAN : 'Snabbskanning: ',
	ACTIVEWORKORDERS : 'Aktivera arbetsordrar',
	RECORDSAVED: 'Posten har sparats',
	RECORDNOTSAVED: 'Fel \u2013 Ingen post returnerades',
	TIMERALREADYSTARTED: 'Timern har redan startats',
	TIMERNOTFOUND : 'Timern startades inte. Ingen aktiv timer hittades.',
	TIMERSTARTED : 'Timern har startats',
	TIMERSTOPPED : 'Timern har stoppats',
	TOOLS : 'Verktyg',
	STARTTIMER : 'Starta timer',
	STOPTIMER : 'Stoppa timer',
	MODIFYSAVE : 'Posten har \u00E4ndrats.  Spara dina \u00E4ndringar.',
	SITEREQUIRED : 'Arbetsplats m\u00E5ste anges f\u00F6r att skapa arbetsorder.',
	NOVALUE : 'Tomt v\u00E4rde',
	ACTIONS : '\u00C5tg\u00E4rder',
	CHILDRENOF : 'Underordnade',
	RESPONSIBILITY : 'Ansvar',
	LOOKUP : 'S\u00F6k',
	LOCATIONDRILLDOWN : 'Plats mer detaljerat',
	ASSETDRILLDOWN : 'Tillg\u00E5ng mer detaljerat',
	DRILLDOWN : 'Mer detaljerat',
	BACK : 'Tillbaka',
	SAVE : 'Spara',
	APPLY : 'Till\u00E4mpa',
	FILTER : 'Filter',
	RESET : '\u00C5terst\u00E4ll',
	SELECTVALUE : 'V\u00E4lj v\u00E4rde',
	CANCEL : 'Avbryt',
	OK : 'OK',
	YES : 'Ja',
	NO : 'Nej',
	CREATEFOLLOWUP : 'Skapa en uppf\u00F6ljning',
	CREATESR : 'Skapa ny servicebeg\u00E4ran',
	PARENT : '\u00D6verordnad',
	CHANGESTATUS : '\u00C4ndra status',
	LABOR : 'Arbete',
	MATERIALS : 'Material',
	TASKS : 'Uppgifter',
	ATTACHMENTS : 'Bilagor',
	FAILUREREPORTING : 'Felrapportering',
	MULTIASSETS : 'Flera tillg\u00E5ngar, Platser',
	ADDNEW : 'L\u00E4gg till ny',
	CLASSIFICATION : 'Klassificering',
	NORECORDS : 'Inga poster hittades',
	NORECORDEXIST : 'Inga poster hittades eller finns l\u00E4ngre',
	NORECORDSADJ : 'Inga poster f\u00F6r att justera fysiska r\u00E4kningar',
	SELECTOWNER : 'V\u00E4lj \u00E4gare',
	OWNER : '\u00C4gare',
	OWNERGROUP : '\u00C4gargrupp',
	TAKEOWNERSHIP : 'Ta \u00F6ver \u00E4gande',
	SORTBY : 'Sortera efter',
	LIST : 'Lista',
	QUICKSEARCH: 'Snabbs\u00F6kning',
	INVENTORYBYSR : 'Lager efter lagerrum',
	INVDETAILS : 'Lagerdetaljer',
	NEWCOUNT : 'Ny r\u00E4kning',
	LABORTRANS : 'Arbetstransaktioner',
	CREATEWO : 'Skapa ny arbetsorder',
	MYWOS : 'Mina arbetsordrar',
	FAILUREREPORT : 'Felrapportering',
	METERREADINGS : 'Ange m\u00E4taravl\u00E4sningar',
	ASSETMETER : 'Tillg\u00E5ngens m\u00E4taravl\u00E4sningar',
	LOCATIONMETER : 'Platsens m\u00E4taravl\u00E4sningar',
	FROM : 'Fr\u00E5n',
	TO : 'Till',
	ADVANCED : 'Avancerat',
	ADVANCEDSEARCH : 'Avancerad s\u00F6kning',
	DOWNTIME : 'Driftstopp',
	PURCHASEINFO : 'Ink\u00F6psinformation',
	SPAREPARTS : 'Reservdelar',
	SCHEDULEINFO : 'Reservdelar',
	PLANLABOR : 'Planeringsarbete',
	PLANMATERIAL : 'Planerade material',
	WOCREATED : 'Arbetsorder {0} har skapats.',
	PRESTART : 'F\u00F6re start',
	REVIEWANDAPPROVE : 'Granska och godk\u00E4nn',
	MOCACTIONGROUP : 'V\u00E4lj MOC-\u00E5tg\u00E4rdsgrupp',
	MOCACTIONS : 'V\u00E4lj MOC-\u00E5tg\u00E4rder',
	REVIEWERSAVED : 'Granskare har sparats offline.',
	APPROVERSAVED : 'Godk\u00E4nnare har sparats offline.',
	ACTIONSAVED : '\u00C5tg\u00E4rd(er) har sparats offline.',
	NOACTIONS : 'Standard\u00E5tg\u00E4rdsgrupp {0} har inga giltiga standard\u00E5tg\u00E4rder att l\u00E4gga till.',
	SRQUEUED : 'SR {0} status \u00E4ndrades till K\u00D6AD.',
	SELECTREVIEWERS : 'V\u00E4lj granskare',
	SELECTAPPROVERS : 'V\u00E4lj godk\u00E4nnare',
	APPROVERS : 'Godk\u00E4nnare',
	REVIEWERS : 'Granskare',
	VIEWLIST: 'Visa lista',
	VIEWSUMMARY : 'Visa sammanfattning',
	STOREROOMS : 'Lagerrum',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'G\u00E5 till',
	APPS : 'Appar',
	STARTCENTER : 'Startcenter',
	PAGINATION : {
		TITLE : 'Sida {{from}}{{to}} - {{total}} poster',
		PREV : 'F\u00F6reg\u00E5ende',
		NEXT : 'N\u00E4sta'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Plats',
		ASSET : 'Tillg\u00E5ng',
		WOTRACK : 'Sp\u00E5rning av arbetsorder',
		SR : 'Servicebeg\u00E4randen',
		INVENTOR: 'Lager',
		INVISSUE: 'Utf\u00E4rdanden och \u00F6verf\u00F6ringar',
		MOC : 'MOC (Olja)',
		CREATEDR : 'Skapa rekvisition',
		VIEWDR : 'Visa rekvisitioner',
		LABREP: 'Arbetsrapportering',
		TXNTRACK : 'Synkronisera beslut'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Tillg\u00E5ngsnr',
		STATUS : 'Status',
		STATUSDATE: '\u00C4ndrades senast den',
		INSTALLDATE: 'Installationsdatum',
		SITEID : 'Arbetsplats',
		PARENT : '\u00D6verordnad',
		ASSETTYPE: 'Typ',
		LONGDESCRIPTION : 'Detaljer',
		GROUPNAME: 'M\u00E4targrupp',
		SERIALNUM: 'Serienr',
		PURCHASEPRICE: 'Ink\u00F6pspris',
		TOTDOWNTIME: 'Totaltid f\u00F6r driftstopp',
		ISRUNNING: 'Tillg\u00E5ng upp',
		VENDOR: 'F\u00F6rs\u00E4ljare',
		MANUFACTURER: 'Tillverkare',
		FAILURECODE: 'Felklass',
		DESCRIPTION : 'Beskrivning',
		LOCATION : 'Plats',
		LOCDESC : 'Detaljer',
		SEQUENCE : 'Sekvens',
		PROGRESS : 'Markera f\u00F6rlopp?',
		COMMENTS : 'Kommentarer',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Arbetsorder',
		DESCRIPTION : 'Beskrivning',
		LONGDESCRIPTION : 'Detaljer',
		STATUS : 'Status',
		PARENT : '\u00D6verordnad arbetsorder',
		SITEID : 'Arbetsplats',
		LOCATION : 'Plats',
		ASSETNUM : 'Tillg\u00E5ng',
		WORKTYPE : 'Arbetstyp',
		WOPRIORITY : 'Prioritet',
		GLACCOUNT : 'GL-konto',
		FAILURECODE : 'Felklass',
		PROBLEMCODE : 'Problemkod',
		SUPERVISOR : 'Chef',
		CREWID : 'Bes\u00E4ttning',
		LEAD : 'Ledare',
		PERSONGROUP : 'Arbetsgrupp',
		REPORTEDBY : 'Rapporterat av',
		REPORTDATE : 'Rapportdatum',
		PHONE : 'Telefon',
		TASKID : 'Uppgift',
		TARGSTARTDATE : 'Planerad start',
		TARGCOMPDATE : 'Planerat slut',
		SCHEDSTART : 'Schemalagd start',
		SCHEDFINISH : 'Schemalagt slut',
		ACTSTART : 'Faktisk start',
		ACTFINISH : 'Faktiskt slut',
		ASSIGNMENT : 'Tilldelat arbete',
		OWNER : '\u00C4gare',
		OWNERGROUP : '\u00C4gargrupp',
		OBSERVATION : 'Observation',
		MEASUREMENTVALUE : 'M\u00E4tv\u00E4rde',
		HAZARDS: 'Risker',
		HAZARDSMAT: 'Riskfyllda material',
		PRECAUTIONS: 'F\u00F6rsiktighets\u00E5tg\u00E4rder',
		LOCKTAG: 'L\u00E5sning/Taggning',
		TAGOUT: 'Taggningar',
		LOCKOUT: 'L\u00E5sning',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Beskrivning',
		ITEM : 'Objekt',
		LINETYPE : 'Radtyp',
		QUANTITY : 'Kvantitet',
		STOREROOM : 'Lagerrum',
		STORELOC : 'Lagerrum',
		BINNUM : 'Korg',
		CURBAL : 'Aktuellt saldo',
		UNITCOST : 'Enhetskostnad',
		ASSET : 'Tillg\u00E5ng',
		WORKORDER : 'Arbetsorder',
		LOCATION : 'Plats',
		ISSUETYPE : 'Utf\u00E4rdandetyp',
		ISSUETO : 'Utf\u00E4rdat till',
		ROTASSETNUM : 'Roterande tillg\u00E5ng',
		SITEID : 'Arbetsplats',
		ISSUERETURN : 'Utf\u00E4rda och returnera',
		CHARGEINFO : 'Debiteringsinformation'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Beskrivning',
		ITEM : 'Objekt',
		LINETYPE : 'Radtyp',
		QUANTITY : 'Kvantitet',
		STOREROOM : 'Lagerrum',
		BINNUM : 'Korg',
		CURBAL : 'Aktuellt saldo',
		UNITCOST : 'Enhetskostnad',
		ISSUETYPE : 'Utf\u00E4rdandetyp',
		LOCATION : 'Plats',
		TOOLRATE : 'Verktygsklass',
		ASSETNUM: 'Tillg\u00E5ng',
		TOOLHRS: 'Verktygstimmar',
		LINECOST: 'Radkostnad',
		TOOLQTY: 'Verktygskvantitet'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Beskrivning',
		ITEM : 'Objekt',
		LINETYPE : 'Radtyp',
		QUANTITY : 'Kvantitet',
		TOSTORELOC : 'Till plats',
		FROMSTORELOC : 'Fr\u00E5n plats',
		FROMSITE : 'Fr\u00E5n arbetsplats',
		TOSITE : 'Till arbetsplats',
		TOBIN: 'Till korg',
		FROMBIN: 'Fr\u00E5n korg',
		UNITCOST : 'Enhetskostnad',
		ISSUETYPE : 'Utf\u00E4rdandetyp',
		CONVERSIONFACTOR : 'Omvandlingsfaktor',
		ROTASSETNUM : 'Roterande tillg\u00E5ng',
		TRANSFEROUT : '\u00D6verf\u00F6ring ut',
		TRANSFERIN : '\u00D6verf\u00F6ring in',
		FROMQTY : 'Kvantitet fr\u00E5n korg',
		TOQTY : 'Kvantitet till korg',
		SITEID : 'Arbetsplats',
		LOCATION : 'Plats',
		TRANSFERDETAILS: '\u00D6verf\u00F6ringsinformation'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Tillg\u00E5ng',
		LOCATION : 'Plats',
		SEQUENCE : 'Sekvens',
	},
	WORKLOG : {
		NAME : 'Arbetslogg',
		DESCRIPTION : 'Beskrivning',
		DETAILS : 'Detaljer',
		LOGTYPE : 'Typ',
		CREATEBY : 'Skapades av',
		CREATEDATE : 'Skapades den'
	},
	SR : {
		ACTIVEREQS : 'Aktiva servicebeg\u00E4randen',
		NEWREQS : 'Nya servicebeg\u00E4randen',
		AFFECTEDPERSON : 'Ber\u00F6rd person',
		DETAILS : 'Detaljer',
		GLACCOUNT : 'GL-konto',
		LOCATION : 'Plats',
		OWNER : '\u00C4gare',
		OWNERGROUP : '\u00C4gargrupp',
		REPORTEDPRIORITY : 'Rapporterad prioritet',
		REPORTEDBY : 'Rapporterat av',
		REPORTDATE : 'Rapportdatum',
		REPORTEDPHONE : 'Rapporterad telefon',
		REPORTEDEMAIL : 'Rapporterad post',
		SITE : 'Arbetsplats',
		STATUS : 'Status',
		SR : 'Servicebeg\u00E4ran',
		SUMMARY : 'Sammanfattning',
		ASSETNUM : 'Tillg\u00E5ng',
		ASSETSITEID : 'Tillg\u00E5ngsplats',
	},
	INVBALANCES : {
		ITEMNUM : 'Objekt',
		DESCRIPTION : 'Beskrivning',
		BINNUM : 'Korg',
		CURBAL : 'Aktuellt saldo',
		PHYSCNT : 'Fysiskt saldo',
		PHYSCNTDATE : 'Datum f\u00F6r fysisk r\u00E4kning',
		RECONCILED : 'Avst\u00E4md',
		LOCATION : 'Lagerrum',
	},
	INVENTORY : {
		ITEMNUM : 'Objekt',
		DESCRIPTION : 'Beskrivning',
		SITEID : 'Arbetsplats',
		STATUS : 'Status',
		LOCATION : 'Lagerrum',
		CATEGORY : 'Lagerkategori',
		BINNUM : 'Standardkorg',
		ISSUEUNIT : 'Utf\u00E4rda enhet',
		CURBAL : 'Aktuellt saldo',
		LASTISSUEDATE : 'Datum f\u00F6r senaste utf\u00E4rdande',
		ISSUEYTD : '\u00C5ret till dags dato',
		ISSUE1YRAGO : 'F\u00F6rra \u00E5ret',
		PHYSCNT : 'Fysisk r\u00E4kning',
		PHYSCNTDATE : 'Datum f\u00F6r fysisk r\u00E4kning',
		RECONCILED : 'Avst\u00E4md',
		TOTALINVPHYBAL : 'Fysiskt saldo',
		TOTALINVBAL : 'Aktuellt saldo',
		ISSUEHISTORY : 'Utf\u00E4rdandehistorik',
		INVBALANCE : 'Lagersaldon',
		ADJCOUNT : 'Justera fysiska r\u00E4kningar f\u00F6r dessa {{count}} objekt',
		BALSUMMARY : 'Sammanfattning av tillg\u00E4ngligt saldo',
	},
	METER : {
		ASSETNUM : 'Tillg\u00E5ng',
		METERNAME : 'M\u00E4tare',
		METERTYPE : 'M\u00E4tartyp',
		READINGTYPE : 'Avl\u00E4sningstyp',
		LASTREADING : 'Senaste avl\u00E4sningen',
		LASTREADINGDATE : 'Datum f\u00F6r senaste avl\u00E4sningen',
		LASTREADINGINSPECTOR : 'Inspekt\u00F6r vid senaste avl\u00E4sningen',
		READING : 'Ny avl\u00E4sning',
		NEWREADINGDATE : 'Datum f\u00F6r ny avl\u00E4sning'
	},
	WPLABOR : {
		NAME : 'Planerat arbete',
		LABORCODE : 'Arbete',
		CRAFT : 'Hantverk',
		QUANTITY : 'Kvantitet',
		LABORHRS : 'Vanliga arbetstimmar',
		DISPLAYNAME : 'Namn',
		SKILLLEVEL: 'F\u00E4rdighetsniv\u00E5',
		VENDOR : 'F\u00F6rs\u00E4ljare',
		AMCREW : 'Bes\u00E4ttning'
	},		
	WPMATERIAL : {
		NAME : 'Planerade material',
		LINETYPE : 'Radtyp',
		ITEMNUM : 'Objekt',
		DESCRIPTION : 'Beskrivning',
		ITEMQTY : 'Kvantitet',
		UNITCOST : 'Enhetskostnad',
		STOREROOM : 'Lagerrum',
		STORELOCSITE : 'Lagerrumsplats',
		RESTYPE : 'Reservationstyp',
		REQUIREDATE : 'Obligatoriskt datum'
	},
	LABTRANS : {
		LABORCODE : 'Arbete',
		CRAFT : 'Hantverk',
		STARTDATE : 'Startdatum',
		TIMERSTATUS : 'Timerstatus',
		REGULARHRS : 'Vanliga arbetstimmar',
		PAYRATE: 'Klass',
		PREMIUMPAYCODE : 'Extra l\u00F6nekod',
		PREMIUMPAYHOURS : 'Extra l\u00F6netimmar',
		PREMIUMPAYRATE: 'Extra l\u00F6neklass',
		WONUM : 'Arbetsorder',
		LOCATION : 'Plats',
		ASSETNUM : 'Tillg\u00E5ng',
		TICKETID: 'Biljett'
	},
	LABREP : {
		LABORCODE : 'Arbete',
		CRAFT : 'Hantverk',
		SKILLLEVEL : 'F\u00E4rdighetsniv\u00E5',
		STARTDATE : 'Startdatum',
		STARTTIME : 'Starttid',
		FINISHDATE : 'Slutdatum',
		FINISHTIME : 'Sluttid',
		REGULARHRS : 'Vanliga arbetstimmar',
		PAYRATE : 'Klass',
		TRANSTYPE : 'Typ',
		WONUM : 'Arbetsorder',
		LOCATION : 'Plats',
		ASSETNUM : 'Tillg\u00E5ng',
		GENAPPRSERVRECEIPT: 'Godk\u00E4nnare',
		NAME: 'Namn',
		TIMERSTATUS : 'Timerstatus',
		PREMIUMPAYHOURS : 'Extra l\u00F6netimmar',
		PREMIUMPAYRATE: 'Extra l\u00F6neklass',
		PREMIUMPAYCODE : 'Extra l\u00F6nekod',
		TICKETID: 'Biljett',
		TICKETCLASS: 'Biljettklass'
	},
	PERSON : {
		PERSONID: 'Person',
		FIRSTNAME: 'F\u00F6rnamn',
		LASTNAME: 'Efternamn'
	},
	FAILURECODE : {
		FAILURECODE : 'Felklass',
		PROBLEMCODE : 'Problem',
		CAUSECODE : 'Orsak',
		REMEDYCODE : '\u00C5tg\u00E4rd',
	},
	SPAREPART : {
		QUANTITY : 'Kvantitet',
		ISSUEDQTY : 'Utf\u00E4rdat antal',
		REMARKS : 'Anm\u00E4rkningar',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Beskrivning',
		LONGDESCRIPTION : 'Detaljer',
		ASSET : 'Tillg\u00E5ng',
		STATUS : 'Status',
		PARENT : '\u00D6verordnad arbetsorder',
		SITE : 'Arbetsplats',
		LOCATION : 'Plats',
	},
	DOMAIN : {
		VALUE: 'V\u00E4rde',
		DESCRIPTION: 'Beskrivning',
	},
	MR : {
		MRNUM : 'Rekvisition',
		DESCRIPTION : 'Beskrivning',
		LONGDESCRIPTION : 'L\u00E5ng beskrivning',
		STATUS : 'Status',
		PRIORITY : 'Prioritet',
		CHARGEINFO : 'Debiteringsinformation',
		REQUIREDDATE : 'Obligatoriskt datum',
		WONUM : 'Arbetsorder',
		LOCATION : 'Plats',
		ASSET : 'Tillg\u00E5ng',
		GLACCOUNT : 'GL-debetkonto',
		MRLINES : 'Radobjekt f\u00F6r rekvisition',
		ENTERDATE : 'Angivet datum'
	},
	MRLINE : {
		MRLINEITEM : 'Rekvisitionsobjekt',
		MRLINENUM : 'Rad',
		LINETYPE : 'Radtyp',
		ITEM : 'Objekt',
		DESCRIPTION : 'Beskrivning',
		QTY : 'Kvantitet',
		ORDERUNIT : 'Orderenhet',
		UNITCOST : 'Enhetskostnad',
		LINECOST : 'Radkostnad',
		REQUIREDDATE : 'Obligatoriskt datum'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Visa inskickade rekvisitioner',
		VIEWSAVED : 'Visa sparade rekvisitioner',
		EDIT : 'Redigera rekvisition'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Spara som utkast',
		NEWREQITEM : 'Nytt rekvisitionsobjekt',
		SUBMIT : 'Skicka in'
	},
	CLASSIFY : {
		CLASSASSET : 'Klassificera tillg\u00E5ng',
		CLASSWO : 'Klassificera arbetsordrar',
		DESCRIPTION : 'Klassbeskrivning',
		CLASSIFICATION : 'Klassificering'
	}
};