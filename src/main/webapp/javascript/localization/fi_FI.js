'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: fi_FI
 */
var locale = 'fi_FI'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'M\u00E4\u00E4rit\u00E4',
        cancelText: 'Peruuta',
        clearText: 'Tyhjenn\u00E4',
        selectedText: 'Valittu',
        // Calender component
        calendarText: 'Kalenteri',
        dateText: 'P\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
        timeText: 'Kellonaika',
        // Datetime component
        dateFormat: 'd.m.yy',
        dateOrder: 'dmyy',
        dayNames: ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'],
        dayNamesShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
        dayText: 'P\u00E4iv\u00E4',
        hourText: 'Tunnit',
        minuteText: 'Minuutit',
        monthNames: ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kes\u00E4kuu', 'Hein\u00E4kuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
        monthNamesShort: ['Tam', 'Hel', 'Maa', 'Huh', 'Toukokuu', 'Kes', 'Hei', 'Elo', 'Syy', 'Lok', 'Mar', 'Jou'],
        monthText: 'Kuukausi',
        secText: 'Sekunnit',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'H:ii',
        timeWheels: 'Hii',
        yearText: 'Vuosi',
        nowText: 'Nyt',
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
		ZERO : "nolla",
		ONE : "yksi",
		TWO : "kaksi",
		FEW : "v\u00E4h\u00E4n",
		MANY : "paljon",
		OTHER : "muu"
	},
	locale : {
		"DATETIME_FORMATS" : {
            "AMPMS": ["ap.","ip."],
            "DAY": ["sunnuntaina","maanantaina","tiistaina","keskiviikkona","torstaina","perjantaina","lauantaina"],
            "MONTH": ["tammikuuta","helmikuuta","maaliskuuta","huhtikuuta","toukokuuta","kes\u00e4kuuta","hein\u00e4kuuta","elokuuta","syyskuuta","lokakuuta","marraskuuta","joulukuuta"],
            "SHORTDAY": ["su","ma","ti","ke","to","pe","la"],
            "SHORTMONTH":["tammik.","helmik.","maalisk.","huhtik.","toukok.","kes\u00e4k.","hein\u00e4k.","elok.","syysk.","lokak.","marrask.","jouluk."],
            "STANDALONEMONTH": ["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kes\u00e4kuu","hein\u00e4kuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],
            "WEEKENDRANGE": [5,6],
            "fullDate": "cccc d. MMMM y",
            "longDate": "d. MMMM y",
            "medium": "d.M.y H:mm:ss",
            "mediumDate": "d.M.y",
            "mediumTime": "H:mm:ss",
            "short": "d.M.y H:mm",
            "shortDate": "d.M.y",
            "shortTime": "H:mm"
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
 * Language: FI
 */
var lang = 'FI'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Synkronointi on valmis, virheit\u00E4.  Voit jatkaa yritt\u00E4\u00E4 ty\u00F6skennell\u00E4 offline-tilassa.',
	EMMOF1001W : 'Synkronointi on valmis, virheit\u00E4.  Synkronoi uudelleen offline-tilan k\u00E4ytt\u00F6\u00F6nottoa varten.',
	EMMOF1002W : 'Synkronointi on valmis, virheit\u00E4.  Voit kokeilla synkronointia uudelleen tai jatkaa ty\u00F6skentely\u00E4 offline-tilassa.',
	EMMOF1003W : 'Synkronointi on valmis, virheit\u00E4.  Yrit\u00E4 synkronoida uudelleen offline-ty\u00F6skentely\u00E4 varten.',
	EMMOF1004W : '{0} on oltava numero',
	EMMOF1005W : 'Pakollisia kentti\u00E4 puuttuu: {0}',
	EMMOF1006W : 'M\u00E4\u00E4rite {0} on vain luku -muotoinen',
	EMMOF1007W : 'Valitse arvo',
	EMMOF1008I : 'Tilaa on muutettu',
	EMMOF1009W : 'M\u00E4\u00E4rit\u00E4 m\u00E4\u00E4r\u00E4, joka on suurempi kuin nolla',
	EMMOF1010W : '{0} on oltava suurempi kuin nolla',
	EMMOF1011W : '{0} on pakollinen',
	EMMOF1012W : 'T\u00E4lle nimikkeelle ei ole saldoa, varastotilan, ja varastopaikan yhdistelm\u00E4t',
	EMMOF1013W : 'Varastopaikan saldosta tulee t\u00E4m\u00E4n tapahtuman seurauksena negatiivinen',
	EMMOF1014W : 'Siirtoa ei voi tehd\u00E4, jos sijainnit,, varastopaikan numerot ja toimipaikan tunnukset ovat samat',
	// [WF]		
	EMMWF1000I : 'Aloita k\u00E4sittelyreitti',
	EMMWF1001I : 'T\u00E4lle sovellukselle on k\u00E4ytett\u00E4viss\u00E4 useampi kuin yksi k\u00E4sittelyreittiprosessi.  Valitse yksi ja napsauta OK-painiketta.',
	EMMWF1002I : 'Valitse prosessi',
	EMMWF1003I : 'Prosessi',
	EMMWF1004I : 'Muistio',
	EMMWF1005I : 'Pys\u00E4yt\u00E4 k\u00E4sittelyreitti',
	// [ES]
	EMMES1000I : 'Allekirjoita valtuutus s\u00E4hk\u00F6isesti',
	EMMES1001I : 'S\u00E4hk\u00F6inen allekirjoitus vaaditaan',
	EMMES1002E : 'Valtuutus ep\u00E4onnistui',
	EMMES1003I : 'Anna salasana ja syy',
	EMMES1004I : 'K\u00E4ytt\u00E4j\u00E4',
	EMMES1005I : 'Salasana',
	EMMES1006I : 'Syy',
	// [GB]
	EMMGB1001I : 'S\u00E4hk\u00F6posti',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Peruuta',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Vahvista',
	EMMGB1006I : 'Kyll\u00E4',
	EMMGB1007I : 'Ei',
	EMMGB1008I : 'Puhelin',
	EMMGB1009I : 'Puhelu',
	EMMGB1010I : 'Tekstiviesti',
	EMMGB1011I : 'Haluatko vahvistaa poiston?',
	EMMGB1012I : '{0} t\u00E4ytyy ilmet\u00E4 aiemmin {1}',
	EMMGB1013I : '{0} t\u00E4ytyy ilmet\u00E4 my\u00F6hemmin {1}',
	EMMGB1014I : '{0} t\u00E4ytyy ilmet\u00E4 menneisyydess\u00E4',
	// General	
	OFFLINEMODE : 'Offline-tila',
	SYNCNEEDED : ' - muokattu, Synkronointi tarvitaan',
	SYNCHRONIZATION : 'Synkronointi',
	SYNCSERVER : 'Synkronoi palvelimen kanssa',
	ENTERLABOR: 'Sy\u00F6t\u00E4 ty\u00F6voiman mukaan',
	ADDMORE: 'Lis\u00E4\u00E4 uusi...',
	GOONLINE : 'Siirry takaisin online-tilaan',
	GOTOOFFLINEAPPS : 'Siirry offline-sovelluksiin',
	OFFLINEAPPS : 'Offline-sovellukset',
	QUICKSCAN : 'Pikaluku: ',
	ACTIVEWORKORDERS : 'Aktiiviset ty\u00F6tilaukset',
	RECORDSAVED: 'Tietue on tallennettu',
	RECORDNOTSAVED: 'Virhe - tietueita ei ole palautettu',
	TIMERALREADYSTARTED: 'Ajastin on jo aloitettu',
	TIMERNOTFOUND : 'Ajastinta ei ole aloitettu. Aktiivista ajastinta ei l\u00F6ytynyt.',
	TIMERSTARTED : 'Ajastin on aloitettu',
	TIMERSTOPPED : 'Ajastin on pys\u00E4ytetty',
	TOOLS : 'Ty\u00F6kalut',
	STARTTIMER : 'Aloita ajastin',
	STOPTIMER : 'Pys\u00E4yt\u00E4 ajastin',
	MODIFYSAVE : 'Tietuetta on muokattu.  Tallenna muutokset.',
	SITEREQUIRED : 'Ty\u00F6tilauksen luonti edellytt\u00E4\u00E4 toimipaikkaa.',
	NOVALUE : 'Tyhj\u00E4 arvo',
	ACTIONS : 'Toiminnot',
	CHILDRENOF : 'Kohteiden aliobjektit',
	RESPONSIBILITY : 'Vastuu',
	LOOKUP : 'Haku',
	LOCATIONDRILLDOWN : 'Sijainnin tarkennus',
	ASSETDRILLDOWN : 'Omaisuuden tarkennus',
	DRILLDOWN : 'Tarkennus',
	BACK : 'Takaisin',
	SAVE : 'Tallenna',
	APPLY : 'K\u00E4yt\u00E4',
	FILTER : 'Suodatin',
	RESET : 'Nollaa',
	SELECTVALUE : 'Valitse arvo',
	CANCEL : 'Peruuta',
	OK : 'OK',
	YES : 'Kyll\u00E4',
	NO : 'Ei',
	CREATEFOLLOWUP : 'Luo seuranta',
	CREATESR : 'Luo uusi palvelupyynt\u00F6',
	PARENT : 'P\u00E4\u00E4taso',
	CHANGESTATUS : 'Muuta tilaa',
	LABOR : 'Ty\u00F6voima',
	MATERIALS : 'Materiaalit',
	TASKS : 'Teht\u00E4v\u00E4t',
	ATTACHMENTS : 'Liitteet',
	FAILUREREPORTING : 'Toimintah\u00E4iri\u00F6n raportointi',
	MULTIASSETS : 'Useita omaisuuksia, Sijainnit',
	ADDNEW : 'Lis\u00E4\u00E4 uusi',
	CLASSIFICATION : 'Luokittelu',
	NORECORDS : 'Tietuetta/tietueita ei l\u00F6ytynyt',
	NORECORDEXIST : 'Tietuetta ei l\u00F6ytynyt, tai sit\u00E4 ei en\u00E4\u00E4 ole',
	NORECORDSADJ : 'Ei tietueita fyysisten m\u00E4\u00E4rien s\u00E4\u00E4t\u00E4miseen',
	SELECTOWNER : 'Valitse omistaja',
	OWNER : 'Omistaja',
	OWNERGROUP : 'Omistajaryhm\u00E4',
	TAKEOWNERSHIP : 'Ota omistajuus',
	SORTBY : 'Lajitteluperuste',
	LIST : 'Luettelo',
	QUICKSEARCH: 'Pikahaku',
	INVENTORYBYSR : 'Inventaario varastotilan mukaan',
	INVDETAILS : 'Inventaarion tiedot',
	NEWCOUNT : 'Uusi m\u00E4\u00E4r\u00E4',
	LABORTRANS : 'Ty\u00F6voimatapahtumat',
	CREATEWO : 'Luo uusi ty\u00F6tilaus',
	MYWOS : 'Omat ty\u00F6tilaukset',
	FAILUREREPORT : 'Toimintah\u00E4iri\u00F6n raportointi',
	METERREADINGS : 'Anna mittarin lukemat',
	ASSETMETER : 'Omaisuusmittarin lukemat',
	LOCATIONMETER : 'Sijaintimittarin lukemat',
	FROM : 'Mist\u00E4',
	TO : 'Mihin',
	ADVANCED : 'Lis\u00E4asetukset',
	ADVANCEDSEARCH : 'Tarkennettu haku',
	DOWNTIME : 'K\u00E4ytt\u00F6katko',
	PURCHASEINFO : 'Ostotiedot',
	SPAREPARTS : 'Varaosat',
	SCHEDULEINFO : 'Ajoitustiedot',
	PLANLABOR : 'Suunniteltu ty\u00F6voima',
	PLANMATERIAL : 'Suunnitellut materiaalit',
	WOCREATED : 'Ty\u00F6tilaus {0} on luotu.',
	PRESTART : 'Esik\u00E4ynnistys',
	REVIEWANDAPPROVE : 'Tarkista ja hyv\u00E4ksy',
	MOCACTIONGROUP : 'Valitse MOC-toimintoryhm\u00E4',
	MOCACTIONS : 'Valitse MOC-toiminnot',
	REVIEWERSAVED : 'Tarkistaja(t) on tallennettu offline-tilassa.',
	APPROVERSAVED : 'Hyv\u00E4ksyj\u00E4(t) on tallennettu offline-tilassa.',
	ACTIONSAVED : 'Toiminto/toiminnot on tallennettu offline-tilassa.',
	NOACTIONS : 'Vakiotoimintoryhm\u00E4ss\u00E4 {0} ei ole lis\u00E4tt\u00E4vi\u00E4 kelvollisia vakiotoimintoja.',
	SRQUEUED : 'Palvelupyynt\u00F6 {0} on siirretty tilaan JONOSSA.',
	SELECTREVIEWERS : 'Valitse arvioijat',
	SELECTAPPROVERS : 'Valitse hyv\u00E4ksyj\u00E4t',
	APPROVERS : 'Hyv\u00E4ksyj\u00E4t',
	REVIEWERS : 'Arvioijat',
	VIEWLIST: 'N\u00E4yt\u00E4 luettelo',
	VIEWSUMMARY : 'N\u00E4yt\u00E4 yhteenveto',
	STOREROOMS : 'Varastotilat',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Siirry kohteeseen',
	APPS : 'Sovellukset',
	STARTCENTER : 'Aloituskeskus',
	PAGINATION : {
		TITLE : 'Sivu {{from}}{{to}} - {{total}} Tietueita',
		PREV : 'Edellinen',
		NEXT : 'Seuraava'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Sijainti',
		ASSET : 'Omaisuus',
		WOTRACK : 'Ty\u00F6tilauksen seuranta',
		SR : 'Palvelupyynn\u00F6t',
		INVENTOR: 'Inventaario',
		INVISSUE: 'Toimitukset ja siirrot',
		MOC : 'MOC (\u00F6ljy)',
		CREATEDR : 'Luo pyynt\u00F6',
		VIEWDR : 'N\u00E4yt\u00E4 pyynn\u00F6t',
		LABREP: 'Ty\u00F6voiman raportointi',
		TXNTRACK : 'Synkronoi resoluutio'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Omaisuuden numero',
		STATUS : 'Tila',
		STATUSDATE: 'Edellinen muutosp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		INSTALLDATE: 'Asennusp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		SITEID : 'Toimipaikka',
		PARENT : 'P\u00E4\u00E4taso',
		ASSETTYPE: 'Laji',
		LONGDESCRIPTION : 'Tiedot',
		GROUPNAME: 'Mittariryhm\u00E4',
		SERIALNUM: 'Sarjanumero',
		PURCHASEPRICE: 'Ostohinta',
		TOTDOWNTIME: 'K\u00E4ytt\u00F6katko yhteens\u00E4',
		ISRUNNING: 'Omaisuus on k\u00E4yt\u00F6ss\u00E4',
		VENDOR: 'Toimittaja',
		MANUFACTURER: 'Valmistaja',
		FAILURECODE: 'Toimintah\u00E4iri\u00F6n luokka',
		DESCRIPTION : 'Kuvaus',
		LOCATION : 'Sijainti',
		LOCDESC : 'Tiedot',
		SEQUENCE : 'J\u00E4rjestys',
		PROGRESS : 'Haluatko merkit\u00E4 edistymisen?',
		COMMENTS : 'Kommentit',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Ty\u00F6tilaus',
		DESCRIPTION : 'Kuvaus',
		LONGDESCRIPTION : 'Tiedot',
		STATUS : 'Tila',
		PARENT : 'P\u00E4\u00E4ty\u00F6tilaus',
		SITEID : 'Toimipaikka',
		LOCATION : 'Sijainti',
		ASSETNUM : 'Omaisuus',
		WORKTYPE : 'Ty\u00F6n laji',
		WOPRIORITY : 'Prioriteetti',
		GLACCOUNT : 'P\u00E4\u00E4kirjatili',
		FAILURECODE : 'Toimintah\u00E4iri\u00F6n luokka',
		PROBLEMCODE : 'Ongelmakoodi',
		SUPERVISOR : 'Esimies',
		CREWID : 'Ty\u00F6ryhm\u00E4',
		LEAD : 'Johtohenkil\u00F6',
		PERSONGROUP : 'Ty\u00F6ryhm\u00E4',
		REPORTEDBY : 'Raportoija',
		REPORTDATE : 'Ilmoitusp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		PHONE : 'Puhelin',
		TASKID : 'Teht\u00E4v\u00E4',
		TARGSTARTDATE : 'Suunniteltu aloitus',
		TARGCOMPDATE : 'Suunniteltu lopetus',
		SCHEDSTART : 'Ajoitettu aloitus',
		SCHEDFINISH : 'Ajoitettu lopetus',
		ACTSTART : 'Todellinen aloitus',
		ACTFINISH : 'Todellinen lopetus',
		ASSIGNMENT : 'Osoitettu ty\u00F6voima',
		OWNER : 'Omistaja',
		OWNERGROUP : 'Omistajaryhm\u00E4',
		OBSERVATION : 'Havainto',
		MEASUREMENTVALUE : 'Mittausarvo',
		HAZARDS: 'Vaaratekij\u00E4t',
		HAZARDSMAT: 'Vaaralliset aineet',
		PRECAUTIONS: 'Varotoimet',
		LOCKTAG: 'Lukitse tai lis\u00E4\u00E4 ei k\u00E4yt\u00F6ss\u00E4 -merkint\u00E4',
		TAGOUT: 'Ei k\u00E4yt\u00F6ss\u00E4 -merkinn\u00E4t',
		LOCKOUT: 'Lukitus',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Kuvaus',
		ITEM : 'Nimike',
		LINETYPE : 'Rivin laji',
		QUANTITY : 'M\u00E4\u00E4r\u00E4',
		STOREROOM : 'Varastotila',
		STORELOC : 'Varastotila',
		BINNUM : 'Varastopaikka',
		CURBAL : 'Nykyinen saldo',
		UNITCOST : 'Yksikk\u00F6kustannus',
		ASSET : 'Omaisuus',
		WORKORDER : 'Ty\u00F6tilaus',
		LOCATION : 'Sijainti',
		ISSUETYPE : 'Toimituslaji',
		ISSUETO : 'Saaja',
		ROTASSETNUM : 'Kiert\u00E4v\u00E4 omaisuus',
		SITEID : 'Toimipaikka',
		ISSUERETURN : 'Toimitus ja palautus',
		CHARGEINFO : 'Veloitustiedot'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Kuvaus',
		ITEM : 'Nimike',
		LINETYPE : 'Rivin laji',
		QUANTITY : 'M\u00E4\u00E4r\u00E4',
		STOREROOM : 'Varastotila',
		BINNUM : 'Varastopaikka',
		CURBAL : 'Nykyinen saldo',
		UNITCOST : 'Yksikk\u00F6kustannus',
		ISSUETYPE : 'Toimituslaji',
		LOCATION : 'Sijainti',
		TOOLRATE : 'Ty\u00F6kalun yksikk\u00F6hinta',
		ASSETNUM: 'Omaisuus',
		TOOLHRS: 'Ty\u00F6kalun k\u00E4ytt\u00F6tunnit',
		LINECOST: 'Rivikustannus',
		TOOLQTY: 'Ty\u00F6kalum\u00E4\u00E4r\u00E4'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Kuvaus',
		ITEM : 'Nimike',
		LINETYPE : 'Rivin laji',
		QUANTITY : 'M\u00E4\u00E4r\u00E4',
		TOSTORELOC : 'Kohdesijainti',
		FROMSTORELOC : 'Alkusijainti',
		FROMSITE : 'Alkutoimipaikka',
		TOSITE : 'Kohdetoimipaikka',
		TOBIN: 'Kohdevarastopaikka',
		FROMBIN: 'Alkuvarastopaikka',
		UNITCOST : 'Yksikk\u00F6kustannus',
		ISSUETYPE : 'Toimituslaji',
		CONVERSIONFACTOR : 'Muuntokerroin',
		ROTASSETNUM : 'Kiert\u00E4v\u00E4 omaisuus',
		TRANSFEROUT : 'Siirr\u00E4 ulos',
		TRANSFERIN : 'Siirr\u00E4 sis\u00E4\u00E4n',
		FROMQTY : 'Varastopaikan m\u00E4\u00E4r\u00E4st\u00E4',
		TOQTY : 'Varastopaikan m\u00E4\u00E4r\u00E4\u00E4n',
		SITEID : 'Toimipaikka',
		LOCATION : 'Sijainti',
		TRANSFERDETAILS: 'Siirron tiedot'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Omaisuus',
		LOCATION : 'Sijainti',
		SEQUENCE : 'J\u00E4rjestys',
	},
	WORKLOG : {
		NAME : 'Ty\u00F6loki',
		DESCRIPTION : 'Kuvaus',
		DETAILS : 'Tiedot',
		LOGTYPE : 'Laji',
		CREATEBY : 'Tekij\u00E4',
		CREATEDATE : 'Luontip\u00E4iv\u00E4m\u00E4\u00E4r\u00E4'
	},
	SR : {
		ACTIVEREQS : 'Aktiiviset palvelupyynn\u00F6t',
		NEWREQS : 'Uudet palvelupyynn\u00F6t',
		AFFECTEDPERSON : 'Henkil\u00F6',
		DETAILS : 'Tiedot',
		GLACCOUNT : 'P\u00E4\u00E4kirjatili',
		LOCATION : 'Sijainti',
		OWNER : 'Omistaja',
		OWNERGROUP : 'Omistajaryhm\u00E4',
		REPORTEDPRIORITY : 'Ilmoitettu prioriteetti',
		REPORTEDBY : 'Raportoija',
		REPORTDATE : 'Raportin p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		REPORTEDPHONE : 'Raportoijan puhelin',
		REPORTEDEMAIL : 'Raportoijan s\u00E4hk\u00F6posti',
		SITE : 'Toimipaikka',
		STATUS : 'Tila',
		SR : 'Palvelupyynt\u00F6',
		SUMMARY : 'Yhteenveto',
		ASSETNUM : 'Omaisuus',
		ASSETSITEID : 'Omaisuuden toimipaikka',
	},
	INVBALANCES : {
		ITEMNUM : 'Nimike',
		DESCRIPTION : 'Kuvaus',
		BINNUM : 'Varastopaikka',
		CURBAL : 'Nykyinen saldo',
		PHYSCNT : 'Fyysinen saldo',
		PHYSCNTDATE : 'Fyysisen laskennan p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		RECONCILED : 'T\u00E4sm\u00E4ytetty',
		LOCATION : 'Varastotila',
	},
	INVENTORY : {
		ITEMNUM : 'Nimike',
		DESCRIPTION : 'Kuvaus',
		SITEID : 'Toimipaikka',
		STATUS : 'Tila',
		LOCATION : 'Varastotila',
		CATEGORY : 'Varastoluokka',
		BINNUM : 'Oletusvarastopaikka',
		ISSUEUNIT : 'Toimitusyksikk\u00F6',
		CURBAL : 'Nykyinen saldo',
		LASTISSUEDATE : 'Edellinen toimitusp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		ISSUEYTD : 'Vuoden alusta',
		ISSUE1YRAGO : 'Viime vuosi',
		PHYSCNT : 'Fyysinen m\u00E4\u00E4r\u00E4',
		PHYSCNTDATE : 'Fyysisen laskennan p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		RECONCILED : 'T\u00E4sm\u00E4ytetty',
		TOTALINVPHYBAL : 'Fyysinen saldo',
		TOTALINVBAL : 'Nykyinen saldo',
		ISSUEHISTORY : 'Toimitushistoria',
		INVBALANCE : 'Varastosaldot',
		ADJCOUNT : 'S\u00E4\u00E4d\u00E4 {{count}} nimikkeen fyysisi\u00E4 m\u00E4\u00E4ri\u00E4',
		BALSUMMARY : 'K\u00E4ytett\u00E4viss\u00E4 olevan saldon tiivistelm\u00E4',
	},
	METER : {
		ASSETNUM : 'Omaisuus',
		METERNAME : 'Mittari',
		METERTYPE : 'Mittarilaji',
		READINGTYPE : 'Lukeman laji',
		LASTREADING : 'Edellinen lukema',
		LASTREADINGDATE : 'Edellisen lukeman p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		LASTREADINGINSPECTOR : 'Edellisen lukeman tarkastaja',
		READING : 'Uusi lukema',
		NEWREADINGDATE : 'Uuden lukeman p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4'
	},
	WPLABOR : {
		NAME : 'Suunniteltu ty\u00F6voima',
		LABORCODE : 'Ty\u00F6voima',
		CRAFT : 'Ammattiryhm\u00E4',
		QUANTITY : 'M\u00E4\u00E4r\u00E4',
		LABORHRS : 'Vakiotunnit',
		DISPLAYNAME : 'Nimi',
		SKILLLEVEL: 'Taitotaso',
		VENDOR : 'Toimittaja',
		AMCREW : 'Ty\u00F6ryhm\u00E4'
	},		
	WPMATERIAL : {
		NAME : 'Suunnitellut materiaalit',
		LINETYPE : 'Rivin laji',
		ITEMNUM : 'Nimike',
		DESCRIPTION : 'Kuvaus',
		ITEMQTY : 'M\u00E4\u00E4r\u00E4',
		UNITCOST : 'Yksikk\u00F6kustannus',
		STOREROOM : 'Varastotila',
		STORELOCSITE : 'Varaston toimipaikka',
		RESTYPE : 'Varauksen laji',
		REQUIREDATE : 'Pakollinen p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4'
	},
	LABTRANS : {
		LABORCODE : 'Ty\u00F6voima',
		CRAFT : 'Ammattiryhm\u00E4',
		STARTDATE : 'Aloitusp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		TIMERSTATUS : 'Ajastintila',
		REGULARHRS : 'Vakiotunnit',
		PAYRATE: 'Taksa',
		PREMIUMPAYCODE : 'Lis\u00E4palkkakoodi',
		PREMIUMPAYHOURS : 'Lis\u00E4palkkatunnit',
		PREMIUMPAYRATE: 'Lis\u00E4palkkayksikk\u00F6hinta',
		WONUM : 'Ty\u00F6tilaus',
		LOCATION : 'Sijainti',
		ASSETNUM : 'Omaisuus',
		TICKETID: 'Tiketti'
	},
	LABREP : {
		LABORCODE : 'Ty\u00F6voima',
		CRAFT : 'Ammattiryhm\u00E4',
		SKILLLEVEL : 'Taitotaso',
		STARTDATE : 'Aloitusp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		STARTTIME : 'Aloitusaika',
		FINISHDATE : 'Lopetusp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		FINISHTIME : 'Lopetusaika',
		REGULARHRS : 'Vakiotunnit',
		PAYRATE : 'Taksa',
		TRANSTYPE : 'Laji',
		WONUM : 'Ty\u00F6tilaus',
		LOCATION : 'Sijainti',
		ASSETNUM : 'Omaisuus',
		GENAPPRSERVRECEIPT: 'Hyv\u00E4ksytty',
		NAME: 'Nimi',
		TIMERSTATUS : 'Ajastintila',
		PREMIUMPAYHOURS : 'Lis\u00E4palkkatunnit',
		PREMIUMPAYRATE: 'Lis\u00E4palkkayksikk\u00F6hinta',
		PREMIUMPAYCODE : 'Lis\u00E4palkkakoodi',
		TICKETID: 'Tiketti',
		TICKETCLASS: 'Tiketin luokka'
	},
	PERSON : {
		PERSONID: 'Henkil\u00F6',
		FIRSTNAME: 'Etunimi',
		LASTNAME: 'Sukunimi'
	},
	FAILURECODE : {
		FAILURECODE : 'Toimintah\u00E4iri\u00F6n luokka',
		PROBLEMCODE : 'Ongelma',
		CAUSECODE : 'Syy',
		REMEDYCODE : 'Toimenpide',
	},
	SPAREPART : {
		QUANTITY : 'M\u00E4\u00E4r\u00E4',
		ISSUEDQTY : 'Toimitettu m\u00E4\u00E4r\u00E4',
		REMARKS : 'Kommentit',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Kuvaus',
		LONGDESCRIPTION : 'Tiedot',
		ASSET : 'Omaisuus',
		STATUS : 'Tila',
		PARENT : 'P\u00E4\u00E4ty\u00F6tilaus',
		SITE : 'Toimipaikka',
		LOCATION : 'Sijainti',
	},
	DOMAIN : {
		VALUE: 'Arvo',
		DESCRIPTION: 'Kuvaus',
	},
	MR : {
		MRNUM : 'Pyynt\u00F6',
		DESCRIPTION : 'Kuvaus',
		LONGDESCRIPTION : 'Pitk\u00E4 kuvaus',
		STATUS : 'Tila',
		PRIORITY : 'Prioriteetti',
		CHARGEINFO : 'Veloitustiedot',
		REQUIREDDATE : 'Pakollinen p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4',
		WONUM : 'Ty\u00F6tilaus',
		LOCATION : 'Sijainti',
		ASSET : 'Omaisuus',
		GLACCOUNT : 'P\u00E4\u00E4kirjan debet-tili',
		MRLINES : 'Pyynt\u00F6rivin nimikkeet',
		ENTERDATE : 'Lis\u00E4ysp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4'
	},
	MRLINE : {
		MRLINEITEM : 'Pyynt\u00F6nimike',
		MRLINENUM : 'Rivi',
		LINETYPE : 'Rivin laji',
		ITEM : 'Nimike',
		DESCRIPTION : 'Kuvaus',
		QTY : 'M\u00E4\u00E4r\u00E4',
		ORDERUNIT : 'Tilausyksikk\u00F6',
		UNITCOST : 'Yksikk\u00F6kustannus',
		LINECOST : 'Rivikustannus',
		REQUIREDDATE : 'Pakollinen p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'N\u00E4yt\u00E4 l\u00E4hetetyt pyynn\u00F6t',
		VIEWSAVED : 'N\u00E4yt\u00E4 tallennetut pyynn\u00F6t',
		EDIT : 'Muokkaa pyynt\u00F6\u00E4'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Tallenna luonnoksena',
		NEWREQITEM : 'Uusi pyynt\u00F6nimike',
		SUBMIT : 'L\u00E4het\u00E4'
	},
	CLASSIFY : {
		CLASSASSET : 'Luokittele omaisuus',
		CLASSWO : 'Luokittele ty\u00F6tilaus',
		DESCRIPTION : 'Luokan kuvaus',
		CLASSIFICATION : 'Luokittelu'
	}
};
