'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: no_NO
 */
var locale = 'no_NO'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Angi',
        cancelText: 'Avbryt',
        clearText: 'T\u00F8m',
        selectedText: 'Valgt',
        // Calender component
        calendarText: 'Kalender',
        dateText: 'Dato',
        timeText: 'Tid',
        // Datetime component
        dateFormat: 'dd.mm.y',
        dateOrder: 'ddmmy',
        dayNames: ['S\u00F8ndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'L\u00F8rdag'],
        dayNamesShort: ['S\u00F8ndag', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'L\u00F8r'],
        dayText: 'Dag',
        hourText: 'Timer',
        minuteText: 'Minutter',
        monthNames: ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
        monthText: 'M\u00E5ned',
        secText: 'Sekunder',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: '\u00C5r',
        nowText: 'N\u00E5',
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
		ZERO : "null",
		ONE : "\u00E9n",
		TWO : "to",
		FEW : "f\u00E5",
		MANY : "mange",
		OTHER : "annet"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "a.m.", "p.m." ],
			"DAY" : [  "s\u00f8ndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag","l\u00f8rdag" ],
			"MONTH" : [ "januar", "februar", "mars", "april", "mai", "juni", "juli", "august","september", "oktober", "november","desember" ],
			"SHORTDAY" : [ "s\u00f8n.","man.","tir.","ons.","tor.", "fre.", "l\u00f8r." ],
			"SHORTMONTH" : [ "jan.","feb.","mar.", "apr.", "mai", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.","des." ],
			"fullDate" : "EEEE d. MMMM y",
		    "longDate" : "d. MMMM y",
		    "medium" : "d. MMM y HH:mm:ss",
		    "mediumDate" : "d. MMM y",
		    "mediumTime" : "HH:mm:ss",
		    "short" : "dd.MM.yy HH:mm",
		    "shortDate" : "dd.MM.yy",
		    "shortTime" : "HH:mm"
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
		        "negPre": "-\u00a4\u00a0",
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
 * Language: NO
 */
var lang = 'NO'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Synkronisering fullf\u00F8rt med feil!  Du kan fortsatt pr\u00F8ve \u00E5 arbeide offline.',
	EMMOF1001W : 'Synkronisering fullf\u00F8rt med feil!  Synkroniser igjen for \u00E5 aktivere offline-modus.',
	EMMOF1002W : 'Synkronisering fullf\u00F8rt med feil!  Du kan pr\u00F8ve \u00E5 synkronisere igjen eller fortsette \u00E5 arbeide offline.',
	EMMOF1003W : 'Synkronisering fullf\u00F8rt med feil!  Pr\u00F8v \u00E5 synkronisere igjen for \u00E5 arbeide offline.',
	EMMOF1004W : '{0} m\u00E5 v\u00E6re et tall ',
	EMMOF1005W : 'Manglende obligatoriske felter : {0}',
	EMMOF1006W : 'Egenskap {0} er l\u00E5st for redigering',
	EMMOF1007W : 'Velg en verdi',
	EMMOF1008I : 'Status endret',
	EMMOF1009W : 'Angi en mengde st\u00F8rre enn null',
	EMMOF1010W : '{0} m\u00E5 v\u00E6re st\u00F8rre enn null ',
	EMMOF1011W : '{0} er obligatorisk ',
	EMMOF1012W : 'Ingen saldo for denne artikkelen, lager, og s\u00F8ppelb\u00F8tte-kombinasjoner',
	EMMOF1013W : 'Saldoen i s\u00F8ppelb\u00F8tten vil bli negativ som en f\u00F8lge av denne transaksjonen',
	EMMOF1014W : 'Kan ikke overf\u00F8re n\u00E5r lokasjonene, s\u00F8ppelb\u00F8ttenumre og virksomhetssted-ID-er alle er identiske',
	// [WF]		
	EMMWF1000I : 'Start arbeidsflyt',
	EMMWF1001I : 'Mer enn \u00E9n arbeidsflytprosess er tilgjengelig for denne applikasjonen.  Velg \u00E9n arbeidsflytprosess, og trykk p\u00E5 Ok.',
	EMMWF1002I : 'Velg en prosess',
	EMMWF1003I : 'Prosess',
	EMMWF1004I : 'Memo',
	EMMWF1005I : 'Stopp arbeidsflyt',
	// [ES]
	EMMES1000I : 'e-tegn-autorisasjon',
	EMMES1001I : 'Elektronisk signatur n\u00F8dvendig',
	EMMES1002E : 'Kunne ikke autorisere',
	EMMES1003I : 'Angi et passord og en \u00E5rsak',
	EMMES1004I : 'Bruker',
	EMMES1005I : 'Passord',
	EMMES1006I : '\u00C5rsak',
	// [GB]
	EMMGB1001I : 'E-post',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Avbryt',
	EMMGB1004I : 'Ok',
	EMMGB1005I : 'Bekreft',
	EMMGB1006I : 'Ja',
	EMMGB1007I : 'Nei',
	EMMGB1008I : 'Telefon',
	EMMGB1009I : 'Ring',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Bekreft sletting?',
	EMMGB1012I : '{0} m\u00E5 inntreffe f\u00F8r {1}',
	EMMGB1013I : '{0} m\u00E5 inntreffe etter {1}',
	EMMGB1014I : '{0} m\u00E5 inntreffe i fortiden ',
	// General	
	OFFLINEMODE : 'Offline-modus',
	SYNCNEEDED : ' \u2013 Modifisert, Synkronisering n\u00F8dvendig',
	SYNCHRONIZATION : 'Synkronisering',
	SYNCSERVER : 'Synkroniser med server',
	ENTERLABOR: 'Angi i henhold til arbeid',
	ADDMORE: 'Legg til mer ...',
	GOONLINE : 'G\u00E5 online igjen',
	GOTOOFFLINEAPPS : 'G\u00E5 til offline-applikasjoner',
	OFFLINEAPPS : 'Offline-applikasjoner',
	QUICKSCAN : 'Hurtigskanning: ',
	ACTIVEWORKORDERS : 'Aktive arbeidsinstrukser',
	RECORDSAVED: 'Oppf\u00F8ring lagret',
	RECORDNOTSAVED: 'Feil \u2013 S\u00F8ket ga ingen oppf\u00F8ringer',
	TIMERALREADYSTARTED: 'Tidstaker allerede startet',
	TIMERNOTFOUND : 'Tidstaker ikke startet. Ingen aktiv tidstaker funnet.',
	TIMERSTARTED : 'Tidstaker startet',
	TIMERSTOPPED : 'Tidstaker stoppet',
	TOOLS : 'Verkt\u00F8y',
	STARTTIMER : 'Start tidstaker',
	STOPTIMER : 'Stopp tidstaker',
	MODIFYSAVE : 'Oppf\u00F8ring modifisert.  Lagre endringene.',
	SITEREQUIRED : 'Virksomhetssted m\u00E5 opprette arbeidsinstruks.',
	NOVALUE : 'Tom verdi',
	ACTIONS : 'Handlinger',
	CHILDRENOF : 'Underordnede elementer for',
	RESPONSIBILITY : 'Ansvar',
	LOOKUP : 'S\u00F8k',
	LOCATIONDRILLDOWN : 'Lokasjon for leting',
	ASSETDRILLDOWN : 'Leting etter ressurser',
	DRILLDOWN : 'Leting',
	BACK : 'Tilbake',
	SAVE : 'Lagre',
	APPLY : 'Bruk',
	FILTER : 'Filter',
	RESET : 'Tilbakestill',
	SELECTVALUE : 'Velg verdi',
	CANCEL : 'Avbryt',
	OK : 'Ok',
	YES : 'Ja',
	NO : 'Nei',
	CREATEFOLLOWUP : 'Opprett en oppf\u00F8lging',
	CREATESR : 'Opprett ny tjenesteforesp\u00F8rsel',
	PARENT : 'Overordnet element',
	CHANGESTATUS : 'Endre status',
	LABOR : 'Arbeid',
	MATERIALS : 'Materialer',
	TASKS : 'Oppgaver',
	ATTACHMENTS : 'Vedlegg',
	FAILUREREPORTING : 'Feilrapportering',
	MULTIASSETS : 'Flere ressurser, Lokasjoner',
	ADDNEW : 'Legg til ny',
	CLASSIFICATION : 'Klassifikasjon',
	NORECORDS : 'Ingen oppf\u00F8ringer funnet',
	NORECORDEXIST : 'Ingen oppf\u00F8ringer funnet/eksisterer',
	NORECORDSADJ : 'Ingen oppf\u00F8ringer for justering av fysisk antall',
	SELECTOWNER : 'Velg innehaver',
	OWNER : 'Innehaver',
	OWNERGROUP : 'Innehavergruppe',
	TAKEOWNERSHIP : 'Ta eierskap',
	SORTBY : 'Sorter i henhold til',
	LIST : 'List opp',
	QUICKSEARCH: 'Hurtigs\u00F8k',
	INVENTORYBYSR : 'Beholdning i henhold til lager',
	INVDETAILS : 'Detaljer for beholdning',
	NEWCOUNT : 'Nytt antall',
	LABORTRANS : 'Arbeidstransaksjoner',
	CREATEWO : 'Opprett ny arbeidsinstruks',
	MYWOS : 'Mine arbeidsinstrukser',
	FAILUREREPORT : 'Feilrapportering',
	METERREADINGS : 'Angi m\u00E5leravlesninger',
	ASSETMETER : 'Ressursm\u00E5leravlesninger',
	LOCATIONMETER : 'Lokasjonsm\u00E5leravlesninger',
	FROM : 'Fra',
	TO : 'Til',
	ADVANCED : 'Avansert',
	ADVANCEDSEARCH : 'Avansert s\u00F8k',
	DOWNTIME : 'Nedetid',
	PURCHASEINFO : 'Kj\u00F8psinformasjon',
	SPAREPARTS : 'Reservedeler',
	SCHEDULEINFO : 'Planleggingsinfo',
	PLANLABOR : 'Planlegg arbeid',
	PLANMATERIAL : 'Planlagte materialer',
	WOCREATED : 'Arbeidsinstruks {0} opprettet.',
	PRESTART : 'Prestart',
	REVIEWANDAPPROVE : 'G\u00E5 gjennom og godkjenn',
	MOCACTIONGROUP : 'Velg MOC-handlingsgruppe',
	MOCACTIONS : 'Velg MOC-handlinger',
	REVIEWERSAVED : 'Person(er) som foretar gjennomgang lagret offline.',
	APPROVERSAVED : 'Godkjenner(e) lagret offline.',
	ACTIONSAVED : 'Handling(er) lagret offline.',
	NOACTIONS : 'Standard handlingsgruppe {0} har ingen gyldige standardhandlinger som kan legges til.',
	SRQUEUED : 'SR {0}-status endret til K\u00D8SATT.',
	SELECTREVIEWERS : 'Velg personer som skal foreta gjennomgang',
	SELECTAPPROVERS : 'Velg godkjennere',
	APPROVERS : 'Godkjennere',
	REVIEWERS : 'Personer som foretar gjennomgang',
	VIEWLIST: 'Vis liste',
	VIEWSUMMARY : 'Vis sammendrag',
	STOREROOMS : 'Lager',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'G\u00E5 til',
	APPS : 'Apper',
	STARTCENTER : 'Startsenter',
	PAGINATION : {
		TITLE : 'Side {{from}} av {{to}} - {{total}} Oppf\u00F8ringer',
		PREV : 'Forrige',
		NEXT : 'Neste'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Lokasjon',
		ASSET : 'Ressurs',
		WOTRACK : 'Sporing av arbeidsinstruks',
		SR : 'Tjenesteforesp\u00F8rsler',
		INVENTOR: 'Beholdning',
		INVISSUE: 'Forsendelser og overf\u00F8ringer',
		MOC : 'MOC (Oil)',
		CREATEDR : 'Opprett utlysning',
		VIEWDR : 'Vis utlysninger',
		LABREP: 'Arbeidsrapportering',
		TXNTRACK : 'Synkroniseringsoppl\u00F8sning'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Ressursnr.',
		STATUS : 'Status',
		STATUSDATE: 'Sist endret dato',
		INSTALLDATE: 'Installasjonsdato',
		SITEID : 'Virksomhetssted',
		PARENT : 'Overordnet element',
		ASSETTYPE: 'Type',
		LONGDESCRIPTION : 'Detaljer',
		GROUPNAME: 'M\u00E5lergruppe',
		SERIALNUM: 'Serienummer',
		PURCHASEPRICE: 'Kj\u00F8pspris',
		TOTDOWNTIME: 'Total nedetid',
		ISRUNNING: 'Ressurs opp',
		VENDOR: 'Selger',
		MANUFACTURER: 'Produsent',
		FAILURECODE: 'Feilklasse',
		DESCRIPTION : 'Beskrivelse',
		LOCATION : 'Lokasjon',
		LOCDESC : 'Detaljer',
		SEQUENCE : 'Sekvens',
		PROGRESS : 'Marker fremdrift?',
		COMMENTS : 'Kommentarer',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Arbeidsinstruks',
		DESCRIPTION : 'Beskrivelse',
		LONGDESCRIPTION : 'Detaljer',
		STATUS : 'Status',
		PARENT : 'Overordnet WO',
		SITEID : 'Virksomhetssted',
		LOCATION : 'Lokasjon',
		ASSETNUM : 'Ressurs',
		WORKTYPE : 'Arbeidstype',
		WOPRIORITY : 'Prioritet',
		GLACCOUNT : 'GL-konto',
		FAILURECODE : 'Feilklasse',
		PROBLEMCODE : 'Problemkode',
		SUPERVISOR : 'Overv\u00E5ker',
		CREWID : 'Besetning',
		LEAD : 'Ledelse',
		PERSONGROUP : 'Arbeidsgruppe',
		REPORTEDBY : 'Rapportert av',
		REPORTDATE : 'Rapportert dato',
		PHONE : 'Telefon',
		TASKID : 'Oppgave',
		TARGSTARTDATE : '\u00D8nsket start',
		TARGCOMPDATE : '\u00D8nsket slutt',
		SCHEDSTART : 'Planlagt start',
		SCHEDFINISH : 'Planlagt slutt',
		ACTSTART : 'Faktisk start',
		ACTFINISH : 'Faktisk slutt',
		ASSIGNMENT : 'Tildelt arbeid',
		OWNER : 'Innehaver',
		OWNERGROUP : 'Innehavergruppe',
		OBSERVATION : 'Observasjon',
		MEASUREMENTVALUE : 'M\u00E5lingsverdi',
		HAZARDS: 'Farer',
		HAZARDSMAT: 'Farlige materialer',
		PRECAUTIONS: 'Forholdsregler',
		LOCKTAG: 'Sikring',
		TAGOUT: 'Sikring',
		LOCKOUT: 'Sikring',
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
		ITEM : 'Artikkel',
		LINETYPE : 'Linjetype',
		QUANTITY : 'Antall',
		STOREROOM : 'Lager',
		STORELOC : 'Lager',
		BINNUM : 'S\u00F8ppelb\u00F8tte',
		CURBAL : 'N\u00E5v\u00E6rende saldo',
		UNITCOST : 'Enhetskostnad',
		ASSET : 'Ressurs',
		WORKORDER : 'Arbeidsinstruks',
		LOCATION : 'Lokasjon',
		ISSUETYPE : 'Forsendelsestype',
		ISSUETO : 'Sendt til',
		ROTASSETNUM : 'Roterende ressurs',
		SITEID : 'Virksomhetssted',
		ISSUERETURN : 'Forsendelse og retur',
		CHARGEINFO : 'Informasjon om trekk'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Beskrivelse',
		ITEM : 'Artikkel',
		LINETYPE : 'Linjetype',
		QUANTITY : 'Antall',
		STOREROOM : 'Lager',
		BINNUM : 'S\u00F8ppelb\u00F8tte',
		CURBAL : 'N\u00E5v\u00E6rende saldo',
		UNITCOST : 'Enhetskostnad',
		ISSUETYPE : 'Forsendelsestype',
		LOCATION : 'Lokasjon',
		TOOLRATE : 'Verkt\u00F8ykostnad',
		ASSETNUM: 'Ressurs',
		TOOLHRS: 'Verkt\u00F8ytimer',
		LINECOST: 'Linjekostnad',
		TOOLQTY: 'Verkt\u00F8yantall'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Beskrivelse',
		ITEM : 'Artikkel',
		LINETYPE : 'Linjetype',
		QUANTITY : 'Antall',
		TOSTORELOC : 'Til lokasjon',
		FROMSTORELOC : 'Fra lokasjon',
		FROMSITE : 'Fra virksomhetssted',
		TOSITE : 'Til virksomhetssted',
		TOBIN: 'Til s\u00F8ppelb\u00F8tte',
		FROMBIN: 'Fra s\u00F8ppelb\u00F8tte',
		UNITCOST : 'Enhetskostnad',
		ISSUETYPE : 'Forsendelsestype',
		CONVERSIONFACTOR : 'Konversjonsfaktor',
		ROTASSETNUM : 'Roterende ressurs',
		TRANSFEROUT : 'Overf\u00F8ring ut',
		TRANSFERIN : 'Overf\u00F8ring inn',
		FROMQTY : 'Fra s\u00F8ppelb\u00F8tte',
		TOQTY : 'Til s\u00F8ppelb\u00F8tte',
		SITEID : 'Virksomhetssted',
		LOCATION : 'Lokasjon',
		TRANSFERDETAILS: 'Overf\u00F8ringsdetaljer'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Ressurs',
		LOCATION : 'Lokasjon',
		SEQUENCE : 'Sekvens',
	},
	WORKLOG : {
		NAME : 'Arbeidslogg',
		DESCRIPTION : 'Beskrivelse',
		DETAILS : 'Detaljer',
		LOGTYPE : 'Type',
		CREATEBY : 'Opprettet av',
		CREATEDATE : 'Opprettet dato'
	},
	SR : {
		ACTIVEREQS : 'Aktive tjenesteforesp\u00F8rsler',
		NEWREQS : 'Nye tjenesteforesp\u00F8rsler',
		AFFECTEDPERSON : 'Ber\u00F8rt person',
		DETAILS : 'Detaljer',
		GLACCOUNT : 'GL-konto',
		LOCATION : 'Lokasjon',
		OWNER : 'Innehaver',
		OWNERGROUP : 'Innehavergruppe',
		REPORTEDPRIORITY : 'Rapportert prioritet',
		REPORTEDBY : 'Rapportert av',
		REPORTDATE : 'Rapportdato',
		REPORTEDPHONE : 'Rapport-telefon',
		REPORTEDEMAIL : 'Rapport-e-post',
		SITE : 'Virksomhetssted',
		STATUS : 'Status',
		SR : 'Tjenesteforesp\u00F8rsel',
		SUMMARY : 'Sammendrag',
		ASSETNUM : 'Ressurs',
		ASSETSITEID : 'Ressursvirksomhetssted',
	},
	INVBALANCES : {
		ITEMNUM : 'Artikkel',
		DESCRIPTION : 'Beskrivelse',
		BINNUM : 'S\u00F8ppelb\u00F8tte',
		CURBAL : 'N\u00E5v\u00E6rende saldo',
		PHYSCNT : 'Fysisk saldo',
		PHYSCNTDATE : 'Dato for fysisk telling',
		RECONCILED : 'Avstemt',
		LOCATION : 'Lager',
	},
	INVENTORY : {
		ITEMNUM : 'Artikkel',
		DESCRIPTION : 'Beskrivelse',
		SITEID : 'Virksomhetssted',
		STATUS : 'Status',
		LOCATION : 'Lager',
		CATEGORY : 'Varekategori',
		BINNUM : 'Standard s\u00F8ppelb\u00F8tte',
		ISSUEUNIT : 'Forsendelsesenhet',
		CURBAL : 'N\u00E5v\u00E6rende saldo',
		LASTISSUEDATE : 'Siste forsendelsesdato',
		ISSUEYTD : '\u00C5r til dato',
		ISSUE1YRAGO : 'Forrige \u00E5r',
		PHYSCNT : 'Fysisk antall',
		PHYSCNTDATE : 'Dato for fysisk telling',
		RECONCILED : 'Avstemt',
		TOTALINVPHYBAL : 'Fysisk saldo',
		TOTALINVBAL : 'N\u00E5v\u00E6rende saldo',
		ISSUEHISTORY : 'Forsendelseshistorikk',
		INVBALANCE : 'Beholdningssaldoer',
		ADJCOUNT : 'Juster fysisk antall av disse {{count}} artiklene',
		BALSUMMARY : 'Tilgjengelig saldosammendrag',
	},
	METER : {
		ASSETNUM : 'Ressurs',
		METERNAME : 'M\u00E5ler',
		METERTYPE : 'M\u00E5lertype',
		READINGTYPE : 'Avlesningstype',
		LASTREADING : 'Siste avlesning',
		LASTREADINGDATE : 'Dato for siste avlesning',
		LASTREADINGINSPECTOR : 'Inspekt\u00F8r ved siste avlesning',
		READING : 'Ny avlesning',
		NEWREADINGDATE : 'Dato for ny avlesning'
	},
	WPLABOR : {
		NAME : 'Planlagt arbeid',
		LABORCODE : 'Arbeid',
		CRAFT : 'Yrke',
		QUANTITY : 'Antall',
		LABORHRS : 'Normal arbeidstid',
		DISPLAYNAME : 'Navn',
		SKILLLEVEL: 'Ferdighetsniv\u00E5',
		VENDOR : 'Leverand\u00F8r',
		AMCREW : 'Besetning'
	},		
	WPMATERIAL : {
		NAME : 'Planlagte materialer',
		LINETYPE : 'Linjetype',
		ITEMNUM : 'Artikkel',
		DESCRIPTION : 'Beskrivelse',
		ITEMQTY : 'Antall',
		UNITCOST : 'Enhetskostnad',
		STOREROOM : 'Lager',
		STORELOCSITE : 'Lagersted',
		RESTYPE : 'Reservasjonstype',
		REQUIREDATE : 'P\u00E5krevd dato'
	},
	LABTRANS : {
		LABORCODE : 'Arbeid',
		CRAFT : 'Yrke',
		STARTDATE : 'Startdato',
		TIMERSTATUS : 'Status for tidstaker',
		REGULARHRS : 'Normal arbeidstid',
		PAYRATE: 'L\u00F8nn',
		PREMIUMPAYCODE : 'Premium Pay \u2013 kode',
		PREMIUMPAYHOURS : 'Premium Pay \u2013 timer',
		PREMIUMPAYRATE: 'Premium Pay \u2013 l\u00F8nn',
		WONUM : 'Arbeidsinstruks',
		LOCATION : 'Lokasjon',
		ASSETNUM : 'Ressurs',
		TICKETID: 'Billett'
	},
	LABREP : {
		LABORCODE : 'Arbeid',
		CRAFT : 'Yrke',
		SKILLLEVEL : 'Ferdighetsniv\u00E5',
		STARTDATE : 'Startdato',
		STARTTIME : 'Starttidspunkt',
		FINISHDATE : 'Sluttdato',
		FINISHTIME : 'Sluttidspunkt',
		REGULARHRS : 'Normal arbeidstid',
		PAYRATE : 'L\u00F8nn',
		TRANSTYPE : 'Type',
		WONUM : 'Arbeidsinstruks',
		LOCATION : 'Lokasjon',
		ASSETNUM : 'Ressurs',
		GENAPPRSERVRECEIPT: 'Godkjent',
		NAME: 'Navn',
		TIMERSTATUS : 'Status for tidstaker',
		PREMIUMPAYHOURS : 'Premium Pay \u2013 timer',
		PREMIUMPAYRATE: 'Premium Pay \u2013 l\u00F8nn',
		PREMIUMPAYCODE : 'Premium Pay \u2013 kode',
		TICKETID: 'Billett',
		TICKETCLASS: 'Billettklasse'
	},
	PERSON : {
		PERSONID: 'Person',
		FIRSTNAME: 'Fornavn',
		LASTNAME: 'Etternavn'
	},
	FAILURECODE : {
		FAILURECODE : 'Feilklasse',
		PROBLEMCODE : 'Problem',
		CAUSECODE : '\u00C5rsak',
		REMEDYCODE : 'L\u00F8sning',
	},
	SPAREPART : {
		QUANTITY : 'Antall',
		ISSUEDQTY : 'Sendt ant.',
		REMARKS : 'Bemerkninger',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Beskrivelse',
		LONGDESCRIPTION : 'Detaljer',
		ASSET : 'Ressurs',
		STATUS : 'Status',
		PARENT : 'Overordnet WO',
		SITE : 'Virksomhetssted',
		LOCATION : 'Lokasjon',
	},
	DOMAIN : {
		VALUE: 'Verdi',
		DESCRIPTION: 'Beskrivelse',
	},
	MR : {
		MRNUM : 'Utlysning',
		DESCRIPTION : 'Beskrivelse',
		LONGDESCRIPTION : 'Lang beskrivelse',
		STATUS : 'Status',
		PRIORITY : 'Prioritet',
		CHARGEINFO : 'Informasjon om trekk',
		REQUIREDDATE : 'P\u00E5krevd dato',
		WONUM : 'Arbeidsinstruks',
		LOCATION : 'Lokasjon',
		ASSET : 'Ressurs',
		GLACCOUNT : 'GL-debetkonto',
		MRLINES : 'Utlysningslinjeelementer',
		ENTERDATE : 'Angitt dato'
	},
	MRLINE : {
		MRLINEITEM : 'Utlysningselement',
		MRLINENUM : 'Linje',
		LINETYPE : 'Linjetype',
		ITEM : 'Artikkel',
		DESCRIPTION : 'Beskrivelse',
		QTY : 'Antall',
		ORDERUNIT : 'Bestillingsenhet',
		UNITCOST : 'Enhetskostnad',
		LINECOST : 'Linjekostnad',
		REQUIREDDATE : 'P\u00E5krevd dato'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Vis innsendte utlysninger',
		VIEWSAVED : 'Vis lagrede utlysninger',
		EDIT : 'Rediger utlysning'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Lagre som utkast',
		NEWREQITEM : 'Nytt utlysningselement',
		SUBMIT : 'Send inn'
	},
	CLASSIFY : {
		CLASSASSET : 'Klassifiser ressurs',
		CLASSWO : 'Klassifiser arbeidsinstruks',
		DESCRIPTION : 'Klassebeskrivelse',
		CLASSIFICATION : 'Klassifikasjon'
	}
};