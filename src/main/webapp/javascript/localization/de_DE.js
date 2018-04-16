'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: de_DE
 */
var locale = 'de_DE'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Einstellen',
        cancelText: 'Stornieren',
        clearText: 'L\u00F6schen',
        selectedText: 'Gew\u00E4hlter',
        // Calender component
        calendarText: 'Kalender',
        dateText: 'Datum',
        timeText: 'Zeit',
        // Datetime component
        dateFormat: 'dd.mm.y',
        dateOrder: 'ddmmy',
        dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        dayNamesShort: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
        dayText: 'Tag',
        hourText: 'Stunden',
        minuteText: 'Minuten',
        monthNames: ['Januar', 'Februar', 'M\u00E4rz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        monthNamesShort: ['Jan', 'Feb', 'M\u00E4r', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        monthText: 'Monat',
        secText: 'Sekunden',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: 'Jahr',
        nowText: 'Jetzt',
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
		ZERO : "null",
		ONE : "EINS",
		TWO : "ZWEI",
		FEW : "WENIGE",
		MANY : "VIELE",
		OTHER : "ANDERE"
	},
	locale : {
		"DATETIME_FORMATS" : {
            "AMPMS" : ["vorm.","nachm."],
            "DAY" : [ "Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag" ],
            "MONTH" : [ "Januar","Februar","M\u00e4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
            "SHORTDAY" : [ "So.","Mo.","Di.","Mi.","Do.","Fr.","Sa." ],
            "SHORTMONTH" : [ "Jan.","Feb.","M\u00e4rz","Apr.","Mai","Juni","Juli","Aug.","Sep.","Okt.","Nov.","Dez." ],
            "fullDate": "EEEE, d. MMMM y",
            "longDate": "d. MMMM y",
            "medium": "dd.MM.y HH:mm:ss",
            "mediumDate": "dd.MM.y",
            "mediumTime": "HH:mm:ss",
            "short": "dd.MM.yy HH:mm",
            "shortDate": "dd.MM.yy",
            "shortTime": "HH:mm"
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
 * Language: DE
 */
var lang = 'DE'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Synchronisierung mit Fehlern abgeschlossen! Sie k\xf6nnen immer noch versuchen, offline zu arbeiten.',
	EMMOF1001W : 'Synchronisierung mit Fehlern abgeschlossen! Bitte neu synchronisieren, um den Offline-Modus zu aktivieren.',
	EMMOF1002W : 'Synchronisierung mit Fehlern abgeschlossen! Sie k\u00F6nnen versuchen, erneut zu synchronisieren oder weiter offline zu arbeiten.',
	EMMOF1003W : 'Synchronisierung mit Fehlern abgeschlossen! Bitte versuchen Sie es erneut, um offline zu arbeiten.',
	EMMOF1004W : '{0} muss eine Nummer sein',
	EMMOF1005W : 'Fehlende Pflichtfelder: {0}',
	EMMOF1006W : 'Attribut {0} ist schreibgesch\u00FCtzt',
	EMMOF1007W : 'Bitte w\u00E4hlen Sie einen Wert aus',
	EMMOF1008I : 'Status erfolgreich ge\u00E4ndert',
	EMMOF1009W : 'Bitte geben Sie eine Menge gr\u00F6\u00DFer als Null an',
	EMMOF1010W : '{0} muss gr\u00F6\u00DFer als Null sein',
	EMMOF1011W : '{0} ist erforderlich',
	EMMOF1012W : 'Es gibt keinen Saldos f\u00FCr diesen Artikel, Lagerraum und Lagerfachkombinationen',
	EMMOF1013W : 'Der Saldo in diesem Lagerfach wird aufgrund dieser Transaktion negativ',
	EMMOF1014W : 'Kann nicht \u00FCbertragen werden, wenn Orte, Fach-Nummern und Site IDs alle identisch sind',
	// [WF]		
	EMMWF1000I : 'Starten Sie den Arbeitsablauf',
	EMMWF1001I : 'F\u00FCr diese Anwendung steht mehr als ein Arbeitsablauf-Prozess zur Verf\u00FCgung. Bitte w\u00E4hlen Sie einen aus und dr\u00FCcken Sie OK.',
	EMMWF1002I : 'Bitte w\u00E4hlen Sie einen Prozess aus',
	EMMWF1003I : 'Verarbeiten',
	EMMWF1004I : 'Memo',
	EMMWF1005I : 'Stoppen Sie den Arbeitsablauf',
	// [ES]
	EMMES1000I : 'e-Unterschriftsberechtigung',
	EMMES1001I : 'Eine elektronische Unterschrift ist erforderlich',
	EMMES1002E : 'Autorisierung fehlgeschlagen',
	EMMES1003I : 'Bitte geben Sie ein Passwort und Grund ein',
	EMMES1004I : 'Benutzer',
	EMMES1005I : 'Passwort',
	EMMES1006I : 'Grund',
	// [GB]
	EMMGB1001I : 'E-Mail',
	EMMGB1002I : 'FaceTime',
	EMMGB1003I : 'Stornieren',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Best\u00E4tigen',
	EMMGB1006I : 'Ja',
	EMMGB1007I : 'Nein',
	EMMGB1008I : 'Telefon',
	EMMGB1009I : 'Anruf',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'L\u00F6schen best\u00E4tigen?',
	EMMGB1012I : '{0} muss vor {1}',
	EMMGB1013I : '{0} muss nach {1}',
	EMMGB1014I : '{0} muss in der Vergangenheit auftreten',
	// General	
	OFFLINEMODE : 'Offline-Modus',
	SYNCNEEDED : '\u00A0- Abge\u00E4ndert, Sync Ben\u00F6tigt',
	SYNCHRONIZATION : 'Synchronisierung',
	SYNCSERVER : 'Synchronisierung mit Server',
	ENTERLABOR: 'Eingabe  \u00FCber Arbeit',
	ADDMORE: 'Mehr ... hinzuf\u00FCgen',
	GOONLINE : 'Gehen Sie zur\u00FCck zur Online',
	GOTOOFFLINEAPPS : 'Gehen Sie zu Offline-Anwendungen',
	OFFLINEAPPS : 'Offline-Anwendungen',
	QUICKSCAN : 'Schneller Scan:',
	ACTIVEWORKORDERS : 'Aktive Arbeitsauftr\u00E4ge',
	RECORDSAVED: 'Datensatz gespeichert',
	RECORDNOTSAVED: 'Fehler - Kein Datensatz zur\u00FCckgegeben',
	TIMERALREADYSTARTED: 'Timer hat bereits begonnen',
	TIMERNOTFOUND : 'Timer nicht gestartet Kein aktiver Timer gefunden.',
	TIMERSTARTED : 'Timer gestartet',
	TIMERSTOPPED : 'Timer gestoppt',
	TOOLS : 'Werkzeuge',
	STARTTIMER : 'Starten Sie den Timer',
	STOPTIMER : 'Stoppen Sie den Timer',
	MODIFYSAVE : 'Datensatz ge\u00E4ndert. Bitte speichern Sie Ihre \u00C4nderungen.',
	SITEREQUIRED : 'Site ist erforderlich, um Arbeitsauftrag zu erstellen.',
	NOVALUE : 'Wert leeren',
	ACTIONS : 'Aktionen',
	CHILDRENOF : 'Kinder von',
	RESPONSIBILITY : 'Verantwortung',
	LOOKUP : 'Nachsehen',
	LOCATIONDRILLDOWN : 'Standort Recherche',
	ASSETDRILLDOWN : 'Aktiva Recherche',
	DRILLDOWN : 'Recherche',
	BACK : 'Zur\u00FCck',
	SAVE : 'Speichern',
	APPLY : 'Sich bewerben',
	FILTER : 'Filter',
	RESET : 'Zur\u00FCcksetzen',
	SELECTVALUE : 'Wert w\u00E4hlen',
	CANCEL : 'Stornieren',
	OK : 'OK',
	YES : 'Ja',
	NO : 'Nein',
	CREATEFOLLOWUP : 'Erstellen Sie eine Verfolgung',
	CREATESR : 'Neue Serviceanfrage anlegen',
	PARENT : 'Elternteil',
	CHANGESTATUS : 'Status \u00E4ndern',
	LABOR : 'Arbeit',
	MATERIALS : 'Materialien',
	TASKS : 'Aufgaben',
	ATTACHMENTS : 'Anh\u00E4nge',
	FAILUREREPORTING : 'Fehlermeldung',
	MULTIASSETS : 'Mehrere Aktiva, Standorte',
	ADDNEW : 'Neue hinzuf\u00FCgen',
	CLASSIFICATION : 'Einstufung',
	NORECORDS : 'Keine Datens\u00E4tze gefunden',
	NORECORDEXIST : 'Kein Datensatz gefunden oder nicht mehr vorhanden',
	NORECORDSADJ : 'Keine Datens\u00E4tze zur Anpassung der physischen Z\u00E4hlungen',
	SELECTOWNER : 'W\u00E4hlen Sie Eigent\u00FCmer',
	OWNER : 'Eigent\u00FCmer',
	OWNERGROUP : 'Besitzer Gruppe',
	TAKEOWNERSHIP : 'In die Hand nehmen',
	SORTBY : 'Sortieren nach',
	LIST : 'Liste',
	QUICKSEARCH: 'Schnelle Suche',
	INVENTORYBYSR : 'Inventar pro Lagerraum',
	INVDETAILS : 'Inventardetails',
	NEWCOUNT : 'Neue Z\u00E4hlung',
	LABORTRANS : 'Arbeitstransaktionen',
	CREATEWO : 'Neuen Arbeitsauftrag anlegen',
	MYWOS : 'Meine Arbeitsauftr\u00E4ge',
	FAILUREREPORT : 'Fehlermeldung',
	METERREADINGS : 'Geben Sie Messwerte ein',
	ASSETMETER : 'Aktiva Messwerte',
	LOCATIONMETER : 'Standort Messwerte',
	FROM : 'Von',
	TO : 'Nach',
	ADVANCED : 'Erweitert',
	ADVANCEDSEARCH : 'Erweiterte Suche',
	DOWNTIME : 'Ausfallzeit',
	PURCHASEINFO : 'Informationen zum Kauf',
	SPAREPARTS : 'Ersatzteile',
	SCHEDULEINFO : 'Zeitplan Info',
	PLANLABOR : 'Arbeitsplan',
	PLANMATERIAL : 'Geplante Materialien',
	WOCREATED : 'Arbeitsauftrag {0} erstellt.',
	PRESTART : 'Vorstart',
	REVIEWANDAPPROVE : '\u00DCberpr\u00FCfung und Genehmigung',
	MOCACTIONGROUP : 'W\u00E4hlen Sie MOC Aktionsgruppe',
	MOCACTIONS : 'W\u00E4hlen Sie MOC-Aktionen',
	REVIEWERSAVED : 'Begutachter gespeichert offline.',
	APPROVERSAVED : 'Genehmiger offline gespeichert',
	ACTIONSAVED : 'Aktion (en) offline gespeichert',
	NOACTIONS : 'Standard-Aktionsgruppe {0} hat keine g\u00FCltigen Standardaktionen zum Hinzuf\u00FCgen.',
	SRQUEUED : 'SR {0} Status wurde in QUEUED ge\u00E4ndert.',
	SELECTREVIEWERS : 'W\u00E4hlen Sie Gutachter aus',
	SELECTAPPROVERS : 'W\u00E4hlen Sie Genehmiger aus',
	APPROVERS : 'Genehmiger',
	REVIEWERS : 'Gutachter',
	VIEWLIST: 'Liste anzeigen',
	VIEWSUMMARY : 'Zusammenfassung anzeigen',
	STOREROOMS : 'Lagerr\u00E4ume',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Gehe zu',
	APPS : 'Apps',
	STARTCENTER : 'Start Center',
	PAGINATION : {
		TITLE : 'Seite {{from}} von {{to}} - {{total}} Aufzeichnungen',
		PREV : 'Prev',
		NEXT : 'Weiter'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Ort',
		ASSET : 'Aktiva',
		WOTRACK : 'Arbeitsauftrag Verfolgung',
		SR : 'Dienstanforderung',
		INVENTOR: 'Inventar',
		INVISSUE: 'Ausgaben und Tranfers',
		MOC : 'MOC (\u00D6l)',
		CREATEDR : 'Anforderung anlegen',
		VIEWDR : 'Anforderungen ansehen',
		LABREP: 'Arbeitsberichte',
		TXNTRACK : 'Sync-Aufl\u00F6sung'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Aktiva #',
		STATUS : 'Status',
		STATUSDATE: 'Letztes \u00C4nderungsdatum',
		INSTALLDATE: 'Installationsdatum',
		SITEID : 'Site',
		PARENT : 'Elternteil',
		ASSETTYPE: 'Aktiva Typ',
		LONGDESCRIPTION : 'Einzelheiten',
		GROUPNAME: 'Messgruppe',
		SERIALNUM: 'Seriennummer #',
		PURCHASEPRICE: 'Kaufpeis',
		TOTDOWNTIME: 'Gesamte Ausfallzeit',
		ISRUNNING: 'Aktiva ok',
		VENDOR: 'Verk\u00E4ufer',
		MANUFACTURER: 'Hersteller',
		FAILURECODE: 'Fehlercode',
		DESCRIPTION : 'Beschreibung',
		LOCATION : 'Ort',
		LOCDESC : 'Einzelheiten',
		SEQUENCE : 'Reihenfolge',
		PROGRESS : 'Fortschritt markieren ?',
		COMMENTS : 'Kommentare',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Arbeitsauftragsnummer',
		DESCRIPTION : 'Beschreibung',
		LONGDESCRIPTION : 'Einzelheiten',
		STATUS : 'Status',
		PARENT : 'Haupt-Arbeitsauftrag',
		SITEID : 'Site',
		LOCATION : 'Standort',
		ASSETNUM : 'Aktivanummer',
		WORKTYPE : 'Arbeitstyp',
		WOPRIORITY : 'Arbeitsauftrag Priorit\u00E4t',
		GLACCOUNT : 'Hauptbuch Konto',
		FAILURECODE : 'Fehlercode',
		PROBLEMCODE : 'Problemkode',
		SUPERVISOR : 'Vorgesetzter',
		CREWID : 'Arbeitsgruppe ID',
		LEAD : 'F\u00FChrer',
		PERSONGROUP : 'Arbeitsgruppe',
		REPORTEDBY : 'Berichtet von',
		REPORTDATE : 'Berichtsdatum',
		PHONE : '\u96fb\u8a71',
		TASKID : 'Aufgabe ID',
		TARGSTARTDATE : 'Ziel Start',
		TARGCOMPDATE : 'Ziel Ende',
		SCHEDSTART : 'Geplanter Start',
		SCHEDFINISH : 'Geplantes Ende',
		ACTSTART : 'Ist-Start',
		ACTFINISH : 'Ist-Ende',
		ASSIGNMENT : 'Zugeordnete Arbeit',
		OWNER : 'Besitzer',
		OWNERGROUP : 'Besitzergruppe',
		OBSERVATION : 'Beobachtung',
		MEASUREMENTVALUE : 'Messwert',
		HAZARDS: 'Gefahren',
		HAZARDSMAT: 'Gef\u00E4hrliche Stoffe',
		PRECAUTIONS: 'Vorsichtsma\u00DFnahmen',
		LOCKTAG: 'Abspereen /Sichern',
		TAGOUT: 'Sichern',
		LOCKOUT: 'Absperren',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Beschreibung',
		ITEM : 'Artikel',
		LINETYPE : 'null',
		QUANTITY : 'Menge',
		STOREROOM : 'Lagerraum',
		STORELOC : 'Lagerort',
		BINNUM : 'Fach Nummer',
		CURBAL : 'Aktueller Saldo',
		UNITCOST : 'Einheitskosten',
		ASSET : 'Aktiva',
		WORKORDER : 'Arbeitsauftrag',
		LOCATION : 'Ort',
		ISSUETYPE : 'Ausgabe Type',
		ISSUETO : 'Ausgabe an',
		ROTASSETNUM : 'Rotierendes Aktiva',
		SITEID : 'Site ID',
		ISSUERETURN : 'Ausgabe und R\u00FCckgabe',
		CHARGEINFO : 'Belastungsinfo'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Beschreibung',
		ITEM : 'Artikel',
		LINETYPE : 'null',
		QUANTITY : 'Menge',
		STOREROOM : 'Lagerraum',
		BINNUM : 'Fach Nummer',
		CURBAL : 'Aktueller Saldo',
		UNITCOST : 'Einheitskosten',
		ISSUETYPE : 'Ausgabetyp',
		LOCATION : 'Ort',
		TOOLRATE : 'Werkzeugrate',
		ASSETNUM: 'Aktiva Nummer',
		TOOLHRS: 'Werkzeugstunden',
		LINECOST: 'Zeilenkosten',
		TOOLQTY: 'Werkzeugmenge'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Beschreibung',
		ITEM : 'Artikel',
		LINETYPE : 'Zeilentyp',
		QUANTITY : 'Menge',
		TOSTORELOC : 'Zum Lagerort',
		FROMSTORELOC : 'Vom Lagerort',
		FROMSITE : 'Von Site',
		TOSITE : 'Zur Site',
		TOBIN: 'Zum Fach',
		FROMBIN: 'Aus Fach',
		UNITCOST : 'Einheitskosten',
		ISSUETYPE : 'Ausgabetyp',
		CONVERSIONFACTOR : 'Umrechnungsfaktor',
		ROTASSETNUM : 'Rotierendes Aktiva',
		TRANSFEROUT : 'Transfer Aus',
		TRANSFERIN : 'Transfer Ein',
		FROMQTY : 'Von Menge',
		TOQTY : 'Zu Menge',
		SITEID : 'Site ID',
		LOCATION : 'Ort',
		TRANSFERDETAILS: 'Transfer Einzelheiten'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Aktiva',
		LOCATION : 'Ort',
		SEQUENCE : 'Reihenfolge',
	},
	WORKLOG : {
		NAME : 'Arbeitsprotokoll',
		DESCRIPTION : 'Beschreibung',
		DETAILS : 'Einzelheiten',
		LOGTYPE : 'Protokolltyp',
		CREATEBY : 'Erstellt von',
		CREATEDATE : 'Erstellt Datum'
	},
	SR : {
		ACTIVEREQS : 'Aktive Dienstanforderungen',
		NEWREQS : 'Neue Serviceanforderungen',
		AFFECTEDPERSON : 'Betroffene Person',
		DETAILS : 'Einzelheiten',
		GLACCOUNT : 'Hauptbuch Konto',
		LOCATION : 'Ort',
		OWNER : 'Besitzer',
		OWNERGROUP : 'Besitzergruppe',
		REPORTEDPRIORITY : 'Berichtete Priorit\u00E4t',
		REPORTEDBY : 'Berichtet von',
		REPORTDATE : '\u5831\u544a\u65e5\u671f',
		REPORTEDPHONE : 'Bericht Telefon',
		REPORTEDEMAIL : 'Bericht Mail',
		SITE : 'Site',
		STATUS : 'Status',
		SR : 'Serviceanfrage',
		SUMMARY : '\u6458\u8981',
		ASSETNUM : 'Aktiva Nummer',
		ASSETSITEID : 'Aktiva Site ID',
	},
	INVBALANCES : {
		ITEMNUM : 'Artikelnummer',
		DESCRIPTION : 'Beschreibung',
		BINNUM : 'Fach Nummer',
		CURBAL : 'Aktueler Saldo',
		PHYSCNT : 'Z\u00E4hlung',
		PHYSCNTDATE : 'Z\u00E4hldatum',
		RECONCILED : 'Abgestimmt',
		LOCATION : 'Lagerraum',
	},
	INVENTORY : {
		ITEMNUM : 'Artikel Nummer',
		DESCRIPTION : 'Beschreibung',
		SITEID : 'Site ID',
		STATUS : 'Status',
		LOCATION : 'Lagerraum',
		CATEGORY : 'Bestandskategoriee',
		BINNUM : 'Fach Nummer',
		ISSUEUNIT : 'Ausgabeeinheit',
		CURBAL : 'Aktueller Saldo',
		LASTISSUEDATE : 'Letztes Ausgabedatum',
		ISSUEYTD : 'Ausgabe dieses Jahr',
		ISSUE1YRAGO : 'Ausgabe letztes Jahr',
		PHYSCNT : 'Physische Z\u00E4hlung',
		PHYSCNTDATE : 'Z\u00E4hldatum',
		RECONCILED : 'Abgestimmt',
		TOTALINVPHYBAL : 'Physisches Inventarsaldo',
		TOTALINVBAL : 'Aktueller Saldo',
		ISSUEHISTORY : 'Ausgabeverlauf',
		INVBALANCE : 'Inventar Salden',
		ADJCOUNT : 'Anpassung der physischen Z\u00E4hlungen f\u00FCr diese {{Z\u00E4hl}} Artikel',
		BALSUMMARY : 'Verf\u00FCgbare Saldo Zusammenfassung',
	},
	METER : {
		ASSETNUM : 'Aktiva Nummer',
		METERNAME : 'Z\u00E4hlger\u00E4tname',
		METERTYPE : 'Z\u00E4hlertyp',
		READINGTYPE : 'Lesetyp',
		LASTREADING : 'Letztes Ablesen',
		LASTREADINGDATE : 'Letztes Ablesedatum',
		LASTREADINGINSPECTOR : 'Letzter Ableseinspektor',
		READING : 'Neues Lesen',
		NEWREADINGDATE : 'Neues Lesedatum'
	},
	WPLABOR : {
		NAME : 'Geplante Arbeit',
		LABORCODE : 'Arbeitscode',
		CRAFT : 'Kenntnistyp',
		QUANTITY : 'Menge',
		LABORHRS : 'Normale Arbeitsstd.',
		DISPLAYNAME : 'Name',
		SKILLLEVEL: 'F\u00E4higkeitsstufe',
		VENDOR : 'Verk\u00E4ufer',
		AMCREW : 'Arbeitsgruppe'
	},		
	WPMATERIAL : {
		NAME : 'Geplante Materialien',
		LINETYPE : 'Zeilentyp',
		ITEMNUM : 'Artikelnummer',
		DESCRIPTION : 'Beschreibung',
		ITEMQTY : 'Artikel Menge',
		UNITCOST : 'Einzelkosten',
		STOREROOM : 'Lagerraum',
		STORELOCSITE : 'Lagerraum Ort',
		RESTYPE : 'Reservierungtyp',
		REQUIREDATE : 'Angefordertes Datum'
	},
	LABTRANS : {
		LABORCODE : 'Labor',
		CRAFT : 'Craft',
		STARTDATE : 'Start Date',
		TIMERSTATUS : 'Timer Status',
		REGULARHRS : 'Regular Hours',
		PAYRATE: 'Rate',
		PREMIUMPAYCODE : 'Premium Pay Code',
		PREMIUMPAYHOURS : 'Premium Pay Hours',
		PREMIUMPAYRATE: 'Premium Pay Rate',
		WONUM : 'Work Order',
		LOCATION : 'Location',
		ASSETNUM : 'Asset',
		TICKETID: 'Ticket'
	},
	LABREP : {
		LABORCODE : 'Arbeitscode',
		CRAFT : 'Kenntnis',
		SKILLLEVEL : 'F\u00E4higkeitsstufe',
		STARTDATE : 'Startdatume',
		STARTTIME : 'Startzeit',
		FINISHDATE : 'Enddatum',
		FINISHTIME : 'Endzeit',
		REGULARHRS : 'Normale Std.',
		PAYRATE : 'Zahlungsrate',
		TRANSTYPE : 'Typ',
		WONUM : 'Arbeitsauftragnummer',
		LOCATION : 'Ort',
		ASSETNUM : 'Aktiva Nummer',
		GENAPPRSERVRECEIPT: 'Genehmigt',
		NAME: 'Name',
		TIMERSTATUS : 'Timer Status',
		PREMIUMPAYHOURS : 'Pr\u00E4mienzahlstd.',
		PREMIUMPAYRATE: 'Pr\u00E4mienzahlrate',
		PREMIUMPAYCODE : 'Pr\u00E4mienzahlcode',
		TICKETID: 'Ticket',
		TICKETCLASS: 'Ticketklasse'
	},
	PERSON : {
		PERSONID: 'Person',
		FIRSTNAME: 'Vorname',
		LASTNAME: 'Nachname'
	},
	FAILURECODE : {
		FAILURECODE : 'Fehlerklasse',
		PROBLEMCODE : 'Problemcode',
		CAUSECODE : 'Ursache',
		REMEDYCODE : 'L\u00F6sung',
	},
	SPAREPART : {
		QUANTITY : 'Menge',
		ISSUEDQTY : 'Ausgabemenge',
		REMARKS : 'Bemerkungen',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Beschreibung',
		LONGDESCRIPTION : 'Einzelheitens',
		ASSET : 'Aktiva',
		STATUS : 'Status',
		PARENT : 'Haupt Arbeitsauftrag',
		SITE : 'Site',
		LOCATION : 'Ort',
	},
	DOMAIN : {
		VALUE: 'Wert',
		DESCRIPTION: 'Beschreibung',
	},
	MR : {
		MRNUM : 'Anforderung',
		DESCRIPTION : 'Deschreibung',
		LONGDESCRIPTION : 'Lange Beschreibung',
		STATUS : 'Status',
		PRIORITY : 'Priorit\u00E4t',
		CHARGEINFO : 'Belastung Information',
		REQUIREDDATE : 'Anforderungsdatum',
		WONUM : 'Arbeitsauftrag',
		LOCATION : 'Lrt',
		ASSET : 'Aktiva',
		GLACCOUNT : 'Hauptbuch Konto',
		MRLINES : 'Anforderung Einzelposten',
		ENTERDATE : 'Eingabedatum'
	},
	MRLINE : {
		MRLINEITEM : 'Anforderungsartikel',
		MRLINENUM : 'Zeile',
		LINETYPE : 'Zeilentyp',
		ITEM : 'Artikel',
		DESCRIPTION : 'Beschreibung',
		QTY : 'Menge',
		ORDERUNIT : 'Auftragseinheit',
		UNITCOST : 'Einzelkosten',
		LINECOST : 'Zeilenkosten',
		REQUIREDDATE : 'Erforderliches Datum'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Eingereichte Anforderungen ansehen',
		VIEWSAVED : 'gespeicherte Anforderungen sehen',
		EDIT : 'Anforderung bearbeiten'
	},
	CREATEDR: {
		SAVEASDRAFT : 'als Entwurf speichern',
		NEWREQITEM : 'Neuer Anforderungsartikel',
		SUBMIT : 'Einreichen'
	},
	CLASSIFY : {
		CLASSASSET : 'Aktiva klassifizieren',
		CLASSWO : 'Arbeitsauftrag klassifizieren',
		DESCRIPTION : 'Klassebeschreibung',
		CLASSIFICATION : 'Klassifizierung'
	}
};
