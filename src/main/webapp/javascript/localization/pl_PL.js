'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: pl_PL
 */
var locale = 'pl_PL'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Konfiguruj',
        cancelText: 'Anuluj',
        clearText: 'Kasuj',
        selectedText: 'Wybrane',
        // Calender component
        calendarText: 'Kalendarz',
        dateText: 'Data',
        timeText: 'Godzina',
        // Datetime component
        dateFormat: 'dd.mm.y',
        dateOrder: 'ddmmy',
        dayNames: ['Niedziela', 'Poniedzia\u0142ek', 'Wtorek', '\u015Aroda', 'Czwartek', 'Pi\u0105tek', 'Sobota'],
        dayNamesShort: ['Ndz.', 'Pon.', 'Wt.', '\u015Ar.', 'Czw.', 'Pt.', 'Sob.'],
        dayText: 'Dzie\u0144',
        hourText: 'Godziny',
        minuteText: 'Minuty',
        monthNames: ['Stycze\u0144', 'Luty', 'Marzec', 'Kwiecie\u0144', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpie\u0144', 'Wrzesie\u0144', 'Pa\u017Adziernik', 'Listopad', 'Grudzie\u0144'],
        monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwie', 'Maj', 'Cze', 'Lip', 'Sier', 'Wrz', 'Pa\u017A', 'Lis', 'Gru'],
        monthText: 'Miesi\u0105c',
        secText: 'Sekundy',
        amText: 'rano',
        pmText: 'po po\u0142udniu',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
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
	        symbol: 'z\u0142'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "zero",
		ONE : "jeden",
		TWO : "dwa",
		FEW : "kilka",
		MANY : "wiele",
		OTHER : "inne"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS": [ "AM", "PM" ],
			"DAY": [ "niedziela", "poniedzia\u0142ek", "wtorek", "\u015broda", "czwartek", "pi\u0105tek", "sobota"],
			"MONTH" : [ "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "wrze\u015bnia", "pa\u017adziernika", "listopada", "grudnia" ],
			"SHORTDAY": [ "niedz.", "pon.", "wt.", "\u015br.", "czw.", "pt.", "sob." ],
			"SHORTMONTH": [ "sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "pa\u017a", "lis", "gru"],
			"fullDate" : "EEEE, d MMMM y",
			"longDate" : "d MMMM y",
			"medium" : "d MMM y HH:mm:ss",
			"mediumDate" : "d MMM y",
			"mediumTime" : "HH:mm:ss",
			"short" : "dd.MM.yy HH:mm",
			"shortDate" : "dd.MM.yy",
			"shortTime" : "HH:mm"				
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "z\u0142",
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
 * Language: PL
 */
var lang = 'PL'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Synchronizacja zako\u0144czona z b\u0142\u0119dami!  Nadal mo\u017Cesz pr\u00F3bowa\u0107 pracowa\u0107 w trybie offline.',
	EMMOF1001W : 'Synchronizacja zako\u0144czona z b\u0142\u0119dami!  Zsynchronizuj ponownie, aby w\u0142\u0105czy\u0107 tryb online.',
	EMMOF1002W : 'Synchronizacja zako\u0144czona z b\u0142\u0119dami!  Mo\u017Cesz spr\u00F3bowa\u0107 zsynchronizowa\u0107 ponownie lub pracowa\u0107 w trybie offline.',
	EMMOF1003W : 'Synchronizacja zako\u0144czona z b\u0142\u0119dami!  Spr\u00F3buj zsynchronizowa\u0107 ponownie w celu umo\u017Cliwienia pracy w trybie offline.',
	EMMOF1004W : '{0} musi by\u0107 liczb\u0105',
	EMMOF1005W : 'Brakuj\u0105ce pola wymagane: {0}',
	EMMOF1006W : 'Atrybut {0} jest tylko do odczytu',
	EMMOF1007W : 'Wybierz warto\u015B\u0107',
	EMMOF1008I : 'Pomy\u015Blnie zmieniono status',
	EMMOF1009W : 'Okre\u015Bl ilo\u015B\u0107 wi\u0119ksz\u0105 ni\u017C zero',
	EMMOF1010W : '{0} musi by\u0107 wi\u0119ksze od zera',
	EMMOF1011W : '{0} jest wymagane',
	EMMOF1012W : 'Brak salda dla tej pozycji, magazyn, oraz kombinacje koszyka',
	EMMOF1013W : 'Saldo w koszyku b\u0119dzie ujemne w wyniku tej transakcji',
	EMMOF1014W : 'Nie mo\u017Cna przenie\u015B\u0107, je\u015Bli lokalizacje, binnums oraz siteids s\u0105 identyczne',
	// [WF]		
	EMMWF1000I : 'Rozpocznij organizacj\u0119 pracy',
	EMMWF1001I : 'Dla tej aplikacji dost\u0119pny jest co najmniej jeden proces w ramach organizacji pracy.  Wybierz jeden i naci\u015Bnij OK.',
	EMMWF1002I : 'Wybierz proces',
	EMMWF1003I : 'Proces',
	EMMWF1004I : 'Notatka',
	EMMWF1005I : 'Zatrzymaj organizacj\u0119 pracy',
	// [ES]
	EMMES1000I : 'Autoryzacja podpisu elektronicznego',
	EMMES1001I : 'Podpis elektroniczny jest wymagany',
	EMMES1002E : 'Autoryzacja nie powiod\u0142a si\u0119',
	EMMES1003I : 'Wprowad\u017A has\u0142o i pow\u00F3d',
	EMMES1004I : 'U\u017Cytkownik',
	EMMES1005I : 'Has\u0142o',
	EMMES1006I : 'Przyczyna',
	// [GB]
	EMMGB1001I : 'E-mail',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Anuluj',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Potwierd\u017A',
	EMMGB1006I : 'Tak',
	EMMGB1007I : 'Nie',
	EMMGB1008I : 'Nr telefonu',
	EMMGB1009I : 'Rozmowa',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Potwierdzi\u0107 usuni\u0119cie?',
	EMMGB1012I : '{0} musi wyst\u0105pi\u0107 przed {1}',
	EMMGB1013I : '{0} musi wyst\u0105pi\u0107 po {1}',
	EMMGB1014I : '{0} musi wyst\u0105pi\u0107 w przesz\u0142o\u015Bci',
	// General	
	OFFLINEMODE : 'Tryb offline',
	SYNCNEEDED : ' \u2013 zmodyfikowano, Wymagana synchronizacja',
	SYNCHRONIZATION : 'Synchronizacja',
	SYNCSERVER : 'Synchronizuj z serwerem',
	ENTERLABOR: 'Wprowad\u017A wg pracy',
	ADDMORE: 'Dodaj wi\u0119cej...',
	GOONLINE : 'Wr\u00F3\u0107 online',
	GOTOOFFLINEAPPS : 'Przejd\u017A do aplikacji offline',
	OFFLINEAPPS : 'Aplikacje offline',
	QUICKSCAN : 'Szybkie skanowanie: ',
	ACTIVEWORKORDERS : 'Aktywne zlecenia',
	RECORDSAVED: 'Rekord zapisany',
	RECORDNOTSAVED: 'B\u0142\u0105d \u2013 nie zwr\u00F3cono \u017Cadnych rekord\u00F3w',
	TIMERALREADYSTARTED: 'Licznik ju\u017C zosta\u0142 uruchomiony',
	TIMERNOTFOUND : 'Licznik nie zosta\u0142 uruchomiony. Nie znaleziono aktywnych licznik\u00F3w.',
	TIMERSTARTED : 'Licznik uruchomiony',
	TIMERSTOPPED : 'Licznik zatrzymany',
	TOOLS : 'Narz\u0119dzia',
	STARTTIMER : 'Uruchom licznik',
	STOPTIMER : 'Zatrzymaj licznik',
	MODIFYSAVE : 'Rekord zosta\u0142 zmodyfikowany.  Zapisz zmiany.',
	SITEREQUIRED : 'Miejsce jest wymagane w celu utworzenia zlecenia.',
	NOVALUE : 'Pusta warto\u015B\u0107',
	ACTIONS : 'Dzia\u0142ania',
	CHILDRENOF : 'Podrz\u0119dne dla',
	RESPONSIBILITY : 'Odpowiedzialno\u015B\u0107',
	LOOKUP : 'Wyszukiwanie',
	LOCATIONDRILLDOWN : 'Uszczeg\u00F3\u0142owienie lokalizacji',
	ASSETDRILLDOWN : 'Dog\u0142\u0119bna analiza zasob\u00F3w',
	DRILLDOWN : 'Dog\u0142\u0119bna analiza',
	BACK : 'Wstecz',
	SAVE : 'Zapisz',
	APPLY : 'Zastosuj',
	FILTER : 'Filtruj',
	RESET : 'Resetuj',
	SELECTVALUE : 'Wybierz warto\u015B\u0107',
	CANCEL : 'Anuluj',
	OK : 'OK',
	YES : 'Tak',
	NO : 'Nie',
	CREATEFOLLOWUP : 'Utw\u00F3rz kontynuacj\u0119',
	CREATESR : 'Utw\u00F3rz nowe \u017C\u0105danie us\u0142ugi',
	PARENT : 'Nadrz\u0119dny',
	CHANGESTATUS : 'Zmie\u0144 status',
	LABOR : 'Praca',
	MATERIALS : 'Materia\u0142y',
	TASKS : 'Zadania',
	ATTACHMENTS : 'Za\u0142\u0105czniki',
	FAILUREREPORTING : 'Raportowanie usterki',
	MULTIASSETS : 'Wiele zasob\u00F3w, Lokalizacje',
	ADDNEW : 'Dodaj nowy',
	CLASSIFICATION : 'Klasyfikacja',
	NORECORDS : 'Nie znaleziono rekordu(-\u00F3w)',
	NORECORDEXIST : 'Nie znaleziono rekordu lub ju\u017C nie istnieje',
	NORECORDSADJ : 'Brak rekord\u00F3w, aby zastosowa\u0107 spis z natury',
	SELECTOWNER : 'Wybierz w\u0142a\u015Bciciela',
	OWNER : 'W\u0142a\u015Bciciel',
	OWNERGROUP : 'Grupa w\u0142a\u015Bciciela',
	TAKEOWNERSHIP : 'Przejmij w\u0142asno\u015B\u0107',
	SORTBY : 'Sortuj wg',
	LIST : 'Lista',
	QUICKSEARCH: 'Szybkie wyszukiwanie',
	INVENTORYBYSR : 'Zapas wg magazynu',
	INVDETAILS : 'Szczeg\u00F3\u0142y zapasu',
	NEWCOUNT : 'Nowe liczenie',
	LABORTRANS : 'Transakcje dotycz\u0105ce pracy',
	CREATEWO : 'Utw\u00F3rz nowe zlecenie',
	MYWOS : 'Moje zlecenia',
	FAILUREREPORT : 'Raportowanie usterki',
	METERREADINGS : 'Wprowad\u017A odczyty miernika',
	ASSETMETER : 'Odczyty miernika zasob\u00F3w',
	LOCATIONMETER : 'Odczyty miernika lokalizacji',
	FROM : 'Od',
	TO : 'Do',
	ADVANCED : 'Zaawansowany',
	ADVANCEDSEARCH : 'Wyszukiwanie zaawansowane',
	DOWNTIME : 'Czas przestoju',
	PURCHASEINFO : 'Informacje dotycz\u0105ce zakupu',
	SPAREPARTS : 'Cz\u0119\u015Bci zamienne',
	SCHEDULEINFO : 'Informacje dotycz\u0105ce planowania',
	PLANLABOR : 'Zaplanuj prac\u0119',
	PLANMATERIAL : 'Zaplanowane materia\u0142y',
	WOCREATED : 'Utworzono zlecenie {0}.',
	PRESTART : 'Pierwsze uruchomienie',
	REVIEWANDAPPROVE : 'Przejrzyj i zatwierd\u017A',
	MOCACTIONGROUP : 'Wybierz grup\u0119 dzia\u0142ania MOC',
	MOCACTIONS : 'Wybierz dzia\u0142ania MOC',
	REVIEWERSAVED : 'Recenzent(-ci) zapisany(-i) offline.',
	APPROVERSAVED : 'Zatwierdzaj\u0105cy(-ci) zapisany(-i) offline.',
	ACTIONSAVED : 'Dzia\u0142anie(-a) zapisane offline.',
	NOACTIONS : 'Grupa standardowego dzia\u0142ania {0} nie ma wa\u017Cnych standardowych dzia\u0142a\u0144 do dodania.',
	SRQUEUED : 'Status SR {0} zmieniony na DODANY DO KOLEJKI.',
	SELECTREVIEWERS : 'Wybierz recenzent\u00F3w',
	SELECTAPPROVERS : 'Wybierz zatwierdzaj\u0105cych',
	APPROVERS : 'Zatwierdzaj\u0105cy',
	REVIEWERS : 'Recenzenci',
	VIEWLIST: 'Wy\u015Bwietl list\u0119',
	VIEWSUMMARY : 'Wy\u015Bwietl podsumowanie',
	STOREROOMS : 'Magazyny',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Id\u017A do',
	APPS : 'Aplikacje',
	STARTCENTER : 'Uruchom centrum',
	PAGINATION : {
		TITLE : 'Strona {{from}} z {{to}} - {{total}} rekord\u00f3w',
		PREV : 'Poprzednia',
		NEXT : 'Nast\u0119pna'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Lokalizacja',
		ASSET : 'Zas\u00F3b',
		WOTRACK : '\u015Aledzenie zlecenia',
		SR : '\u017B\u0105dania us\u0142ugi',
		INVENTOR: 'Zapasy',
		INVISSUE: 'Wydania i transfery',
		MOC : 'MOC (olej)',
		CREATEDR : 'Utw\u00F3rz zapotrzebowanie',
		VIEWDR : 'Wy\u015Bwietl zapotrzebowania',
		LABREP: 'Raportowanie pracy',
		TXNTRACK : 'Rozdzielczo\u015B\u0107 synchronizacji'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Nr zasobu',
		STATUS : 'Status',
		STATUSDATE: 'Data ostatniej zmiany',
		INSTALLDATE: 'Data instalacji',
		SITEID : 'Miejsce',
		PARENT : 'Nadrz\u0119dny',
		ASSETTYPE: 'Typ',
		LONGDESCRIPTION : 'Szczeg\u00F3\u0142y',
		GROUPNAME: 'Grupa licznika',
		SERIALNUM: 'Nr seryjny',
		PURCHASEPRICE: 'Cena zakupu',
		TOTDOWNTIME: '\u0141\u0105czny czas przestoju',
		ISRUNNING: 'Zas\u00F3b w g\u00F3r\u0119',
		VENDOR: 'Sprzedawca',
		MANUFACTURER: 'Producent',
		FAILURECODE: 'Klasa usterki',
		DESCRIPTION : 'Opis',
		LOCATION : 'Lokalizacja',
		LOCDESC : 'Szczeg\u00F3\u0142y',
		SEQUENCE : 'Sekwencja',
		PROGRESS : 'Oznaczy\u0107 post\u0119p?',
		COMMENTS : 'Komentarze',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Zlecenie',
		DESCRIPTION : 'Opis',
		LONGDESCRIPTION : 'Szczeg\u00F3\u0142y',
		STATUS : 'Status',
		PARENT : 'WO nadrz\u0119dne',
		SITEID : 'Miejsce',
		LOCATION : 'Lokalizacja',
		ASSETNUM : 'Zas\u00F3b',
		WORKTYPE : 'Typ pracy',
		WOPRIORITY : 'Priorytet',
		GLACCOUNT : 'Konto GL',
		FAILURECODE : 'Klasa usterki',
		PROBLEMCODE : 'Kod problemu',
		SUPERVISOR : 'Prze\u0142o\u017Cony',
		CREWID : 'Zesp\u00F3\u0142',
		LEAD : 'Wiod\u0105cy',
		PERSONGROUP : 'Grupa robocza',
		REPORTEDBY : 'Zg\u0142oszone przez',
		REPORTDATE : 'Data zg\u0142oszenia',
		PHONE : 'Nr telefonu',
		TASKID : 'Zadanie',
		TARGSTARTDATE : 'Docelowe rozpocz\u0119cie',
		TARGCOMPDATE : 'Docelowe zako\u0144czenie',
		SCHEDSTART : 'Zaplanowane rozpocz\u0119cie',
		SCHEDFINISH : 'Zaplanowane zako\u0144czenie',
		ACTSTART : 'Faktyczne rozpocz\u0119cie',
		ACTFINISH : 'Faktyczne zako\u0144czenie',
		ASSIGNMENT : 'Przydzielona praca',
		OWNER : 'W\u0142a\u015Bciciel',
		OWNERGROUP : 'Grupa w\u0142a\u015Bciciela',
		OBSERVATION : 'Obserwacja',
		MEASUREMENTVALUE : 'Warto\u015B\u0107 pomiaru',
		HAZARDS: 'Zagro\u017Cenia',
		HAZARDSMAT: 'Niebezpieczne materia\u0142y',
		PRECAUTIONS: '\u015Arodki ostro\u017Cno\u015Bci',
		LOCKTAG: 'Zablokowanie / oznaczenie',
		TAGOUT: 'Oznakowania',
		LOCKOUT: 'Zablokowanie',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Opis',
		ITEM : 'Pozycja',
		LINETYPE : 'Typ linii',
		QUANTITY : 'Ilo\u015B\u0107',
		STOREROOM : 'Magazyn',
		STORELOC : 'Magazyn',
		BINNUM : 'Koszyk',
		CURBAL : 'Bie\u017C\u0105ce saldo',
		UNITCOST : 'Koszt jednostkowy',
		ASSET : 'Zas\u00F3b',
		WORKORDER : 'Zlecenie',
		LOCATION : 'Lokalizacja',
		ISSUETYPE : 'Typ wydania',
		ISSUETO : 'Wydano do',
		ROTASSETNUM : 'Zas\u00F3b rotuj\u0105cy',
		SITEID : 'Miejsce',
		ISSUERETURN : 'Wydanie i zwrot',
		CHARGEINFO : 'Informacje dotycz\u0105ce op\u0142aty'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Opis',
		ITEM : 'Pozycja',
		LINETYPE : 'Typ linii',
		QUANTITY : 'Ilo\u015B\u0107',
		STOREROOM : 'Magazyn',
		BINNUM : 'Koszyk',
		CURBAL : 'Bie\u017C\u0105ce saldo',
		UNITCOST : 'Koszt jednostkowy',
		ISSUETYPE : 'Typ wydania',
		LOCATION : 'Lokalizacja',
		TOOLRATE : 'Ocena narz\u0119dzia',
		ASSETNUM: 'Zas\u00F3b',
		TOOLHRS: '\u0141\u0105czna liczba godzin',
		LINECOST: 'Koszt linii',
		TOOLQTY: 'Liczba narz\u0119dzi'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Opis',
		ITEM : 'Pozycja',
		LINETYPE : 'Typ linii',
		QUANTITY : 'Ilo\u015B\u0107',
		TOSTORELOC : 'Do lokalizacji',
		FROMSTORELOC : 'Z lokalizacji',
		FROMSITE : 'Z miejsca',
		TOSITE : 'Do miejsca',
		TOBIN: 'Do koszyka',
		FROMBIN: 'Z koszyka',
		UNITCOST : 'Koszt jednostkowy',
		ISSUETYPE : 'Typ wydania',
		CONVERSIONFACTOR : 'Wsp\u00F3\u0142czynnik przeliczania',
		ROTASSETNUM : 'Zas\u00F3b rotuj\u0105cy',
		TRANSFEROUT : 'Transfer wychodz\u0105cy',
		TRANSFERIN : 'Transfer przychodz\u0105cy',
		FROMQTY : 'Z ilo\u015Bci w koszyku',
		TOQTY : 'Do ilo\u015Bci w koszyku',
		SITEID : 'Miejsce',
		LOCATION : 'Lokalizacja',
		TRANSFERDETAILS: 'Szczeg\u00F3\u0142y transferu'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Zas\u00F3b',
		LOCATION : 'Lokalizacja',
		SEQUENCE : 'Sekwencja',
	},
	WORKLOG : {
		NAME : 'Dziennik zada\u0144',
		DESCRIPTION : 'Opis',
		DETAILS : 'Szczeg\u00F3\u0142y',
		LOGTYPE : 'Typ',
		CREATEBY : 'Utworzone przez',
		CREATEDATE : 'Data utworzenia'
	},
	SR : {
		ACTIVEREQS : 'Aktywne \u017C\u0105danie us\u0142ugi',
		NEWREQS : 'Nowe \u017C\u0105danie us\u0142ugi',
		AFFECTEDPERSON : 'Osoby',
		DETAILS : 'Szczeg\u00F3\u0142y',
		GLACCOUNT : 'Konto GL',
		LOCATION : 'Lokalizacja',
		OWNER : 'W\u0142a\u015Bciciel',
		OWNERGROUP : 'Grupa w\u0142a\u015Bciciela',
		REPORTEDPRIORITY : 'Zg\u0142oszony priorytet',
		REPORTEDBY : 'Zg\u0142oszone przez',
		REPORTDATE : 'Data zg\u0142oszenia',
		REPORTEDPHONE : 'Zg\u0142oszony numer telefonu',
		REPORTEDEMAIL : 'Zg\u0142oszona poczta',
		SITE : 'Miejsce',
		STATUS : 'Status',
		SR : '\u017B\u0105danie us\u0142ugi',
		SUMMARY : 'Podsumowanie',
		ASSETNUM : 'Zas\u00F3b',
		ASSETSITEID : 'Miejsce zasobu',
	},
	INVBALANCES : {
		ITEMNUM : 'Pozycja',
		DESCRIPTION : 'Opis',
		BINNUM : 'Koszyk',
		CURBAL : 'Bie\u017C\u0105ce saldo',
		PHYSCNT : 'Saldo fizyczne',
		PHYSCNTDATE : 'Data spisu z natury',
		RECONCILED : 'Uzgodnione',
		LOCATION : 'Magazyn',
	},
	INVENTORY : {
		ITEMNUM : 'Pozycja',
		DESCRIPTION : 'Opis',
		SITEID : 'Miejsce',
		STATUS : 'Status',
		LOCATION : 'Magazyn',
		CATEGORY : 'Kategoria zapasu',
		BINNUM : 'Domy\u015Blny koszyk',
		ISSUEUNIT : 'Jednostka wydania',
		CURBAL : 'Bie\u017C\u0105ce saldo',
		LASTISSUEDATE : 'Data ostatniego wydania',
		ISSUEYTD : 'Rok do daty bie\u017C\u0105cej',
		ISSUE1YRAGO : 'Ostatni rok',
		PHYSCNT : 'Spis z natury',
		PHYSCNTDATE : 'Data spisu z natury',
		RECONCILED : 'Uzgodnione',
		TOTALINVPHYBAL : 'Saldo fizyczne',
		TOTALINVBAL : 'Bie\u017C\u0105ce saldo',
		ISSUEHISTORY : 'Historia wyda\u0144',
		INVBALANCE : 'Saldo zapas\u00F3w',
		ADJCOUNT : 'Dostosuj spis z natury to tych {{count}} pozycji',
		BALSUMMARY : 'Podsumowanie dost\u0119pnego salda',
	},
	METER : {
		ASSETNUM : 'Zas\u00F3b',
		METERNAME : 'Miernik',
		METERTYPE : 'Typ miernika',
		READINGTYPE : 'Typ odczytu',
		LASTREADING : 'Ostatni odczyt',
		LASTREADINGDATE : 'Data ostatniego odczytu',
		LASTREADINGINSPECTOR : 'Inspektor ostatniego odczytu',
		READING : 'Nowy odczyt',
		NEWREADINGDATE : 'Data nowego odczytu'
	},
	WPLABOR : {
		NAME : 'Zaplanowana praca',
		LABORCODE : 'Praca',
		CRAFT : 'Rzemios\u0142o',
		QUANTITY : 'Ilo\u015B\u0107',
		LABORHRS : 'Normalne godziny',
		DISPLAYNAME : 'Imi\u0119 i\u00A0nazwisko',
		SKILLLEVEL: 'Poziom umiej\u0119tno\u015Bci',
		VENDOR : 'Sprzedawca',
		AMCREW : 'Zesp\u00F3\u0142'
	},		
	WPMATERIAL : {
		NAME : 'Zaplanowane materia\u0142y',
		LINETYPE : 'Typ linii',
		ITEMNUM : 'Pozycja',
		DESCRIPTION : 'Opis',
		ITEMQTY : 'Ilo\u015B\u0107',
		UNITCOST : 'Koszt jednostkowy',
		STOREROOM : 'Magazyn',
		STORELOCSITE : 'Miejsce magazynu',
		RESTYPE : 'Typ rezerwacji',
		REQUIREDATE : 'Wymagana data'
	},
	LABTRANS : {
		LABORCODE : 'Praca',
		CRAFT : 'Rzemios\u0142o',
		STARTDATE : 'Data rozpocz\u0119cia',
		TIMERSTATUS : 'Status licznika',
		REGULARHRS : 'Normalne godziny',
		PAYRATE: 'Wska\u017Anik',
		PREMIUMPAYCODE : 'Kod wyp\u0142aty premii',
		PREMIUMPAYHOURS : 'Godziny wyp\u0142aty premii',
		PREMIUMPAYRATE: 'Stawka wyp\u0142aty premii',
		WONUM : 'Zlecenie',
		LOCATION : 'Lokalizacja',
		ASSETNUM : 'Zas\u00F3b',
		TICKETID: 'Bilet'
	},
	LABREP : {
		LABORCODE : 'Praca',
		CRAFT : 'Rzemios\u0142o',
		SKILLLEVEL : 'Poziom umiej\u0119tno\u015Bci',
		STARTDATE : 'Data rozpocz\u0119cia',
		STARTTIME : 'Godzina rozpocz\u0119cia',
		FINISHDATE : 'Data zako\u0144czenia',
		FINISHTIME : 'Godzina zako\u0144czenia',
		REGULARHRS : 'Normalne godziny',
		PAYRATE : 'Wska\u017Anik',
		TRANSTYPE : 'Typ',
		WONUM : 'Zlecenie',
		LOCATION : 'Lokalizacja',
		ASSETNUM : 'Zas\u00F3b',
		GENAPPRSERVRECEIPT: 'Zatwierdzi\u0142',
		NAME: 'Imi\u0119 i\u00A0nazwisko',
		TIMERSTATUS : 'Status licznika',
		PREMIUMPAYHOURS : 'Godziny wyp\u0142aty premii',
		PREMIUMPAYRATE: 'Stawka wyp\u0142aty premii',
		PREMIUMPAYCODE : 'Kod wyp\u0142aty premii',
		TICKETID: 'Bilet',
		TICKETCLASS: 'Klasa biletu'
	},
	PERSON : {
		PERSONID: 'Osoba',
		FIRSTNAME: 'Imi\u0119',
		LASTNAME: 'Nazwisko'
	},
	FAILURECODE : {
		FAILURECODE : 'Klasa usterki',
		PROBLEMCODE : 'Problem',
		CAUSECODE : 'Pow\u00F3d',
		REMEDYCODE : '\u015Arodek zaradczy',
	},
	SPAREPART : {
		QUANTITY : 'Ilo\u015B\u0107',
		ISSUEDQTY : 'Wydana ilo\u015B\u0107',
		REMARKS : 'Uwagi',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Opis',
		LONGDESCRIPTION : 'Szczeg\u00F3\u0142y',
		ASSET : 'Zas\u00F3b',
		STATUS : 'Status',
		PARENT : 'WO nadrz\u0119dne',
		SITE : 'Miejsce',
		LOCATION : 'Lokalizacja',
	},
	DOMAIN : {
		VALUE: 'Warto\u015B\u0107',
		DESCRIPTION: 'Opis',
	},
	MR : {
		MRNUM : 'Zapotrzebowanie',
		DESCRIPTION : 'Opis',
		LONGDESCRIPTION : 'D\u0142ugi opis',
		STATUS : 'Status',
		PRIORITY : 'Priorytet',
		CHARGEINFO : 'Informacje dotycz\u0105ce op\u0142aty',
		REQUIREDDATE : 'Wymagana data',
		WONUM : 'Zlecenie',
		LOCATION : 'Lokalizacja',
		ASSET : 'Zas\u00F3b',
		GLACCOUNT : 'Konto debetowe GL',
		MRLINES : 'Pozycje linii zapotrzebowania',
		ENTERDATE : 'Data wprowadzenia'
	},
	MRLINE : {
		MRLINEITEM : 'Pozycja zapotrzebowania',
		MRLINENUM : 'Linia',
		LINETYPE : 'Typ linii',
		ITEM : 'Pozycja',
		DESCRIPTION : 'Opis',
		QTY : 'Ilo\u015B\u0107',
		ORDERUNIT : 'Jednostka zam\u00F3wienia',
		UNITCOST : 'Koszt jednostkowy',
		LINECOST : 'Koszt linii',
		REQUIREDDATE : 'Wymagana data'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Wy\u015Bwietl przes\u0142ane zapotrzebowania',
		VIEWSAVED : 'Wy\u015Bwietl zapisane zapotrzebowania',
		EDIT : 'Edytuj zapotrzebowanie'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Zapisz jako wersj\u0119 robocz\u0105',
		NEWREQITEM : 'Nowa pozycja zapotrzebowania',
		SUBMIT : 'Wy\u015Blij'
	},
	CLASSIFY : {
		CLASSASSET : 'Klasyfikuj zas\u00F3b',
		CLASSWO : 'Klasyfikuj zlecenie',
		DESCRIPTION : 'Opis klasy',
		CLASSIFICATION : 'Klasyfikacja'
	}
};