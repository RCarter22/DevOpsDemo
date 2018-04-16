'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: tr_TR
 */
var locale = 'tr_TR'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Ayarla',
        cancelText: '\u0130ptal',
        clearText: 'Temizle',
        selectedText: 'Se\u00E7ili',
        // Calender component
        calendarText: 'Takvim',
        dateText: 'Tarih',
        timeText: 'Zaman',
        // Datetime component
        dateFormat: 'dd.mm.yy',
        dateOrder: 'ddmmyy',
        dayNames: ['Pazar', 'Pazartesi', 'Sal\u0131', '\u00C7ar\u015Famba', 'Per\u015Fembe', 'Cuma', 'Cumartesi'],
        dayNamesShort: ['Paz', 'Pzt', 'Sal', '\u00C7ar', 'Per', 'Cum', 'Cmt'],
        dayText: 'G\u00FCn',
        hourText: 'Saat',
        minuteText: 'Dakika',
        monthNames: ['Ocak', '\u015Eubat', 'Mart', 'Nisan', 'May\u0131s', 'Haziran', 'Temmuz', 'A\u011Fustos', 'Eyl\u00FCl', 'Ekim', 'Kas\u0131m', 'Aral\u0131k'],
        monthNamesShort: ['Oca', '\u015Eub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'A\u011Fu', 'Eyl', 'Eki', 'Kas', 'Ara'],
        monthText: 'Ay',
        secText: 'Saniye',
        amText: '\u00F6\u00F6',
        pmText: '\u00F6s',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: 'Y\u0131l',
        nowText: '\u015Eimdi',
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
	        symbol: 'TL'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "s\u0131f\u0131r",
		ONE : "bir",
		TWO : "iki",
		FEW : "az",
		MANY : "\u00E7ok",
		OTHER : "di\u011Fer"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS": [ "\u00d6\u00d6", "\u00d6S" ],
			"DAY": [ "Pazar", "Pazartesi", "Sal\u0131", "\u00c7ar\u015famba", "Per\u015fembe", "Cuma", "Cumartesi" ],
			"MONTH": [ "Ocak", "\u015eubat", "Mart", "Nisan", "May\u0131s", "Haziran", "Temmuz", "A\u011fustos", "Eyl\u00fcl", "Ekim", "Kas\u0131m", "Aral\u0131k" ],
			"SHORTDAY": [ "Paz", "Pzt", "Sal", "\u00c7ar", "Per", "Cum", "Cmt" ],
			"SHORTMONTH": [ "Oca", "\u015eub", "Mar", "Nis", "May", "Haz", "Tem", "A\u011fu", "Eyl", "Eki", "Kas", "Ara" ],
			"fullDate" : "d MMMM y EEEE",
		    "longDate" : "d MMMM y",
		    "medium" : "d MMM y HH:mm:ss",
		    "mediumDate" : "d MMM y",
		    "mediumTime" : "HH:mm:ss",
		    "short" : "dd.MM.y HH:mm",
		    "shortDate" : "dd.MM.y",
		    "shortTime" : "HH:mm"			
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "TL",
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
		        "negPre": "-\u00a4",
		        "negSuf": "",
		        "posPre": "\u00a4",
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
 * Language: TR
 */
var lang = 'TR'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Senkronizasyon hatalar ile tamamland\u0131!  Yine de \u00E7evrim d\u0131\u015F\u0131 \u00E7al\u0131\u015Fmay\u0131 deneyebilirsiniz.',
	EMMOF1001W : 'Senkronizasyon hatalar ile tamamland\u0131!  \u00C7evrim d\u0131\u015F\u0131 modunu etkinle\u015Ftirmek i\u00E7in l\u00FCtfen tekrar senkronize edin.',
	EMMOF1002W : 'Senkronizasyon hatalar ile tamamland\u0131!  Tekrar senkronize etmeyi deneyebilir veya \u00E7evrim d\u0131\u015F\u0131 \u00E7al\u0131\u015Fma modunda kalabilirsiniz.',
	EMMOF1003W : 'Senkronizasyon hatalar ile tamamland\u0131!  \u00C7evrim d\u0131\u015F\u0131 \u00E7al\u0131\u015Fmak i\u00E7in l\u00FCtfen tekrar senkronize edin.',
	EMMOF1004W : '{0} bir say\u0131 olmal\u0131d\u0131r',
	EMMOF1005W : 'Gerekli alanlar eksik: {0}',
	EMMOF1006W : '{0} sembol\u00FC salt okunur',
	EMMOF1007W : 'L\u00FCtfen bir de\u011Fer se\u00E7in',
	EMMOF1008I : 'Durum Ba\u015Far\u0131yla De\u011Fi\u015Ftirildi',
	EMMOF1009W : 'L\u00FCtfen s\u0131f\u0131rdan b\u00FCy\u00FCk bir de\u011Fer belirtin',
	EMMOF1010W : '{0} s\u0131f\u0131rdan b\u00FCy\u00FCk olmal\u0131d\u0131r',
	EMMOF1011W : '{0} gereklidir',
	EMMOF1012W : 'Bu \u00F6ge, depo alan\u0131 ve, kutu bile\u015Fimleri aras\u0131nda bakiye mevcut de\u011Fil',
	EMMOF1013W : 'Bu i\u015Flem sonucunda kutu i\u00E7indeki bakiye negatif olacakt\u0131r',
	EMMOF1014W : 'Konumlar,, Kutu numaralar\u0131 ve alan kodlar\u0131 ayn\u0131yken aktar\u0131m yap\u0131lamaz',
	// [WF]		
	EMMWF1000I : '\u0130\u015F Ak\u0131\u015F\u0131n\u0131 Ba\u015Flat',
	EMMWF1001I : 'Bu uygulama i\u00E7in birden fazla i\u015F ak\u0131\u015F\u0131 s\u00FCreci mevcuttur.  L\u00FCtfen birini se\u00E7in ve OK butonuna bas\u0131n.',
	EMMWF1002I : 'L\u00FCtfen bir s\u00FCre\u00E7 se\u00E7in',
	EMMWF1003I : 'S\u00FCre\u00E7',
	EMMWF1004I : 'Not',
	EMMWF1005I : '\u0130\u015F Ak\u0131\u015F\u0131n\u0131 Durdur',
	// [ES]
	EMMES1000I : 'e-\u0130mza Yetkisi',
	EMMES1001I : 'Elektronik imza gereklidir',
	EMMES1002E : 'Yetkilendirme Ba\u015Far\u0131s\u0131z',
	EMMES1003I : 'L\u00FCtfen bir \u015Fifre ve neden girin',
	EMMES1004I : 'Kullan\u0131c\u0131',
	EMMES1005I : '\u015Eifre',
	EMMES1006I : 'Neden',
	// [GB]
	EMMGB1001I : 'E-posta',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : '\u0130ptal',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Onayla',
	EMMGB1006I : 'Evet',
	EMMGB1007I : 'Hay\u0131r',
	EMMGB1008I : 'Telefon',
	EMMGB1009I : 'G\u00F6r\u00FC\u015Fmesi',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Silmeyi Onayla?',
	EMMGB1012I : '{0} daha \u00F6nce ger\u00E7ekle\u015Fmelidir {1}',
	EMMGB1013I : '{0} daha sonra ger\u00E7ekle\u015Fmelidir {1}',
	EMMGB1014I : '{0} ge\u00E7mi\u015Fte ger\u00E7ekle\u015Fmi\u015F olmal\u0131d\u0131r',
	// General	
	OFFLINEMODE : '\u00C7evrim D\u0131\u015F\u0131 Modu',
	SYNCNEEDED : ' - De\u011Fi\u015Ftirilmi\u015F, Senkronizasyon Gereklidir',
	SYNCHRONIZATION : 'Senkronizasyon',
	SYNCSERVER : 'Hizmet Sa\u011Flay\u0131c\u0131 ile Senkronizasyon',
	ENTERLABOR: '\u00C7al\u0131\u015Fmaya G\u00F6re Gir',
	ADDMORE: 'Daha Fazla Ekle...',
	GOONLINE : '\u00C7evrim \u0130\u00E7i Moda Geri D\u00F6n',
	GOTOOFFLINEAPPS : '\u00C7evrim D\u0131\u015F\u0131 Uygulamalara Git',
	OFFLINEAPPS : '\u00C7evrim D\u0131\u015F\u0131 Uygulamalar',
	QUICKSCAN : 'H\u0131zl\u0131 Tarama: ',
	ACTIVEWORKORDERS : 'Aktif \u0130\u015F Emirleri',
	RECORDSAVED: 'Kay\u0131t Kaydedildi',
	RECORDNOTSAVED: 'Hata - Geri g\u00F6nderilen kay\u0131t bulunamad\u0131',
	TIMERALREADYSTARTED: 'Zamanlay\u0131c\u0131 zaten ba\u015Flat\u0131ld\u0131',
	TIMERNOTFOUND : 'Zamanlay\u0131c\u0131 ba\u015Flat\u0131lmad\u0131. Aktif zamanlay\u0131c\u0131 bulunamad\u0131',
	TIMERSTARTED : 'Zamanlay\u0131c\u0131 Ba\u015Flat\u0131ld\u0131',
	TIMERSTOPPED : 'Zamanlay\u0131c\u0131 Durduruldu',
	TOOLS : 'Ara\u00E7lar',
	STARTTIMER : 'Zamanlay\u0131c\u0131y\u0131 Ba\u015Flat',
	STOPTIMER : 'Zamanlay\u0131c\u0131y\u0131 Durdur',
	MODIFYSAVE : 'Kay\u0131t de\u011Fi\u015Ftirildi.  L\u00FCtfen yapt\u0131\u011F\u0131n\u0131z de\u011Fi\u015Fiklikleri kaydedin.',
	SITEREQUIRED : '\u0130\u015F Emri olu\u015Fturmak i\u00E7in Alan gereklidir.',
	NOVALUE : 'Bo\u015F De\u011Fer',
	ACTIONS : 'Eylemler',
	CHILDRENOF : 'Alt \u00D6geleri',
	RESPONSIBILITY : 'Sorumluluk',
	LOOKUP : 'Arama',
	LOCATIONDRILLDOWN : 'Konum Detaylar\u0131',
	ASSETDRILLDOWN : 'Varl\u0131k Detaylar\u0131',
	DRILLDOWN : 'Detaylar',
	BACK : 'Geri',
	SAVE : 'Kaydet',
	APPLY : 'Uygula',
	FILTER : 'Filtrele',
	RESET : 'S\u0131f\u0131rla',
	SELECTVALUE : 'De\u011Fer Se\u00E7',
	CANCEL : '\u0130ptal',
	OK : 'OK',
	YES : 'Evet',
	NO : 'Hay\u0131r',
	CREATEFOLLOWUP : 'Bir Takip Olu\u015Ftur',
	CREATESR : 'Yeni Hizmet Talebi Olu\u015Ftur',
	PARENT : '\u00DCst \u00D6ge',
	CHANGESTATUS : 'Durumu De\u011Fi\u015Ftir',
	LABOR : '\u00C7al\u0131\u015Fma',
	MATERIALS : 'Malzemeler',
	TASKS : 'G\u00F6revler',
	ATTACHMENTS : 'Ekler',
	FAILUREREPORTING : 'Hata Raporlama',
	MULTIASSETS : 'Birden Fazla Varl\u0131k, Konumlar',
	ADDNEW : 'Yeni Ekle',
	CLASSIFICATION : 'S\u0131n\u0131fland\u0131rma',
	NORECORDS : 'Hi\u00E7 Kay\u0131t Bulunamad\u0131',
	NORECORDEXIST : 'Kay\u0131t bulunamad\u0131 veya art\u0131k mevcut de\u011Fil',
	NORECORDSADJ : 'Fiziksel say\u0131mlara uyarlanacak kay\u0131t mevcut de\u011Fil',
	SELECTOWNER : 'Varl\u0131k Sahibi Se\u00E7',
	OWNER : 'Sahip',
	OWNERGROUP : 'Sahip Grubu',
	TAKEOWNERSHIP : 'Sahipli\u011Fi \u00DCstlen',
	SORTBY : '\u015Euna G\u00F6re S\u0131rala',
	LIST : 'Listele',
	QUICKSEARCH: 'H\u0131zl\u0131 Arama',
	INVENTORYBYSR : 'Depo Alan\u0131na G\u00F6re Envanter',
	INVDETAILS : 'Envanter Detaylar\u0131',
	NEWCOUNT : 'Yeni Say\u0131m',
	LABORTRANS : '\u00C7al\u0131\u015Fma \u0130\u015Flemleri',
	CREATEWO : 'Yeni \u0130\u015F Emri Olu\u015Ftur',
	MYWOS : '\u0130\u015F Emirlerim',
	FAILUREREPORT : 'Hata Raporlama',
	METERREADINGS : '\u00D6l\u00E7er Okumalar\u0131n\u0131 Gir',
	ASSETMETER : 'Varl\u0131k \u00D6l\u00E7er Okumalar\u0131',
	LOCATIONMETER : 'Konum \u00D6l\u00E7er Okumalar\u0131',
	FROM : 'Kimden',
	TO : 'Kime',
	ADVANCED : 'Geli\u015Fmi\u015F',
	ADVANCEDSEARCH : 'Geli\u015Fmi\u015F Arama',
	DOWNTIME : 'Kesinti S\u00FCresi',
	PURCHASEINFO : 'Sat\u0131n Al\u0131m Bilgisi',
	SPAREPARTS : 'Yedek Par\u00E7alar',
	SCHEDULEINFO : 'Planlama Bilgileri',
	PLANLABOR : '\u00C7al\u0131\u015Fmay\u0131 Planla',
	PLANMATERIAL : 'Planlanan Malzemeler',
	WOCREATED : '{0} \u0130\u015F Emri olu\u015Fturuldu.',
	PRESTART : 'Ba\u015Flang\u0131\u00E7 \u00D6ncesi',
	REVIEWANDAPPROVE : '\u0130ncele ve Onayla',
	MOCACTIONGROUP : 'MOC Eylem Grubunu Se\u00E7in',
	MOCACTIONS : 'MOC Eylemlerini Se\u00E7in',
	REVIEWERSAVED : '\u0130nceleyen(ler) \u00E7evrim d\u0131\u015F\u0131 kaydedildi.',
	APPROVERSAVED : 'Onaylayan(lar) \u00E7evrim d\u0131\u015F\u0131 kaydedildi.',
	ACTIONSAVED : 'Eylem(ler) \u00E7evrim d\u0131\u015F\u0131 kaydedildi.',
	NOACTIONS : '{0} Standart Eylem Grubunda eklenecek ge\u00E7erli standart eylem bulunmuyor.',
	SRQUEUED : 'SR {0} stat\u00FCs\u00FC SIRAYA ALINDI olarak de\u011Fi\u015Ftirildi.',
	SELECTREVIEWERS : '\u0130nceleyenleri Se\u00E7in',
	SELECTAPPROVERS : 'Onaylayanlar\u0131 Se\u00E7in',
	APPROVERS : 'Onaylayanlar',
	REVIEWERS : '\u0130nceleyenler',
	VIEWLIST: 'Listeyi G\u00F6r\u00FCnt\u00FCle',
	VIEWSUMMARY : '\u00D6zeti G\u00F6r\u00FCnt\u00FCle',
	STOREROOMS : 'Depo Alanlar\u0131',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Kime',
	APPS : 'Uygulamalar',
	STARTCENTER : 'Ba\u015Flang\u0131\u00E7 Merkezi',
	PAGINATION : {
		TITLE : 'Sayfa {{from}} / {{to}} - {{total}} Kay\u0131tlar',
		PREV : '\u00D6nceki',
		NEXT : 'Sonraki'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Konum',
		ASSET : 'Varl\u0131k',
		WOTRACK : '\u0130\u015F Emri Takibi',
		SR : 'Hizmet Talepleri',
		INVENTOR: 'Envanter',
		INVISSUE: 'Konular ve Havaleler',
		MOC : 'MOC (Yak\u0131t)',
		CREATEDR : 'Talep Olu\u015Ftur',
		VIEWDR : 'Talepleri G\u00F6r\u00FCnt\u00FCle',
		LABREP: '\u00C7al\u0131\u015Fma Raporlama',
		TXNTRACK : 'Senkronizasyon \u00C7\u00F6z\u00FCn\u00FCrl\u00FC\u011F\u00FC'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Varl\u0131k No',
		STATUS : 'Durum',
		STATUSDATE: 'Son De\u011Fi\u015Ftirme Tarihi',
		INSTALLDATE: 'Kurulum Tarihi',
		SITEID : 'Alan',
		PARENT : '\u00DCst \u00D6ge',
		ASSETTYPE: 'T\u00FCr',
		LONGDESCRIPTION : 'Detaylar',
		GROUPNAME: '\u00D6l\u00E7er Grubu',
		SERIALNUM: 'Seri No',
		PURCHASEPRICE: 'Sat\u0131n Alma Fiyat\u0131',
		TOTDOWNTIME: 'Toplam Kesinti S\u00FCresi',
		ISRUNNING: 'Y\u00FCkselen Varl\u0131k',
		VENDOR: 'Sat\u0131c\u0131',
		MANUFACTURER: '\u00DCretici',
		FAILURECODE: 'Hata S\u0131n\u0131f\u0131',
		DESCRIPTION : 'A\u00E7\u0131klama',
		LOCATION : 'Konum',
		LOCDESC : 'Detaylar',
		SEQUENCE : 'S\u0131ra',
		PROGRESS : '\u0130lerlemeyi \u0130\u015Faretle?',
		COMMENTS : 'Yorumlar',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : '\u0130\u015F Emri',
		DESCRIPTION : 'A\u00E7\u0131klama',
		LONGDESCRIPTION : 'Detaylar',
		STATUS : 'Durum',
		PARENT : '\u00DCst \u00D6ge \u0130E',
		SITEID : 'Alan',
		LOCATION : 'Konum',
		ASSETNUM : 'Varl\u0131k',
		WORKTYPE : '\u0130\u015F T\u00FCr\u00FC',
		WOPRIORITY : '\u00D6ncelik',
		GLACCOUNT : 'GL Hesab\u0131',
		FAILURECODE : 'Hata S\u0131n\u0131f\u0131',
		PROBLEMCODE : 'Sorun Kodu',
		SUPERVISOR : 'G\u00F6zetmen',
		CREWID : 'Ekip',
		LEAD : 'Lider',
		PERSONGROUP : '\u0130\u015F Grubu',
		REPORTEDBY : 'Bildiren',
		REPORTDATE : 'Bildirildi\u011Fi Tarih',
		PHONE : 'Telefon',
		TASKID : 'G\u00F6rev',
		TARGSTARTDATE : 'Hedeflenen Ba\u015Flang\u0131\u00E7',
		TARGCOMPDATE : 'Hedeflenen Biti\u015F',
		SCHEDSTART : 'Planlanan Ba\u015Flang\u0131\u00E7',
		SCHEDFINISH : 'Planlanan Biti\u015F',
		ACTSTART : 'Ger\u00E7ek Ba\u015Flang\u0131\u00E7',
		ACTFINISH : 'Ger\u00E7ek Biti\u015F',
		ASSIGNMENT : 'Verilen \u00C7al\u0131\u015Fma',
		OWNER : 'Sahip',
		OWNERGROUP : 'Sahip Grubu',
		OBSERVATION : 'G\u00F6zlem',
		MEASUREMENTVALUE : '\u00D6l\u00E7\u00FCm De\u011Feri',
		HAZARDS: 'Tehlikeler',
		HAZARDSMAT: 'Tehlikeli Malzemeler',
		PRECAUTIONS: '\u00D6nlemler',
		LOCKTAG: 'Kilitleme/Etiketleme',
		TAGOUT: 'Etiketler',
		LOCKOUT: 'Kilitleme',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'A\u00E7\u0131klama',
		ITEM : '\u00D6ge',
		LINETYPE : 'Kalem T\u00FCr\u00FC',
		QUANTITY : 'Miktar',
		STOREROOM : 'Depo Alan\u0131',
		STORELOC : 'Depo Alan\u0131',
		BINNUM : 'Kutu',
		CURBAL : 'Mevcut Bakiye',
		UNITCOST : 'Birim Maliyet',
		ASSET : 'Varl\u0131k',
		WORKORDER : '\u0130\u015F Emri',
		LOCATION : 'Konum',
		ISSUETYPE : 'Verili\u015F T\u00FCr\u00FC',
		ISSUETO : 'Verildi\u011Fi \u015Eah\u0131s',
		ROTASSETNUM : 'Rotatif Varl\u0131k',
		SITEID : 'Alan',
		ISSUERETURN : 'Verili\u015F ve Geri D\u00F6n\u00FC\u015F',
		CHARGEINFO : '\u00DCcret Bilgisi'
	},
	TOOLTRANS : {
		DESCRIPTION : 'A\u00E7\u0131klama',
		ITEM : '\u00D6ge',
		LINETYPE : 'Kalem T\u00FCr\u00FC',
		QUANTITY : 'Miktar',
		STOREROOM : 'Depo Alan\u0131',
		BINNUM : 'Kutu',
		CURBAL : 'Mevcut Bakiye',
		UNITCOST : 'Birim Maliyet',
		ISSUETYPE : 'Verili\u015F T\u00FCr\u00FC',
		LOCATION : 'Konum',
		TOOLRATE : 'Ara\u00E7 \u00DCcreti',
		ASSETNUM: 'Varl\u0131k',
		TOOLHRS: 'Ara\u00E7 Saatleri',
		LINECOST: 'Kalem Masraf\u0131',
		TOOLQTY: 'Ara\u00E7 Miktar\u0131'
	},
	MATRECTRANS : {
		DESCRIPTION : 'A\u00E7\u0131klama',
		ITEM : '\u00D6ge',
		LINETYPE : 'Kalem T\u00FCr\u00FC',
		QUANTITY : 'Miktar',
		TOSTORELOC : '\u015Eu Konuma',
		FROMSTORELOC : '\u015Eu Konumdan',
		FROMSITE : '\u015Eu Alandan',
		TOSITE : '\u015Eu Alana',
		TOBIN: 'Kutuya',
		FROMBIN: 'Kutudan',
		UNITCOST : 'Birim Maliyet',
		ISSUETYPE : 'Verili\u015F T\u00FCr\u00FC',
		CONVERSIONFACTOR : 'D\u00F6n\u00FC\u015Ft\u00FCrme Fakt\u00F6r\u00FC',
		ROTASSETNUM : 'Rotatif Varl\u0131k',
		TRANSFEROUT : 'Giden Havale',
		TRANSFERIN : 'Gelen Havale',
		FROMQTY : 'Kutu Miktar\u0131ndan',
		TOQTY : 'Kutu Miktar\u0131na',
		SITEID : 'Alan',
		LOCATION : 'Konum',
		TRANSFERDETAILS: 'Havale Detaylar\u0131'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Varl\u0131k',
		LOCATION : 'Konum',
		SEQUENCE : 'S\u0131ra',
	},
	WORKLOG : {
		NAME : '\u0130\u015F Kayd\u0131',
		DESCRIPTION : 'A\u00E7\u0131klama',
		DETAILS : 'Detaylar',
		LOGTYPE : 'T\u00FCr',
		CREATEBY : 'Olu\u015Fturan',
		CREATEDATE : 'Olu\u015Fturuldu\u011Fu Tarih'
	},
	SR : {
		ACTIVEREQS : 'Aktif Hizmet Talepleri',
		NEWREQS : 'Yeni Hizmet Talepleri',
		AFFECTEDPERSON : 'Etkilenen \u015Eah\u0131s',
		DETAILS : 'Detaylar',
		GLACCOUNT : 'GL Hesab\u0131',
		LOCATION : 'Konum',
		OWNER : 'Sahip',
		OWNERGROUP : 'Sahip Grubu',
		REPORTEDPRIORITY : 'Bildirilen \u00D6ncelik',
		REPORTEDBY : 'Bildiren',
		REPORTDATE : 'Bildirildi\u011Fi Tarih',
		REPORTEDPHONE : 'Bildirilen Telefon',
		REPORTEDEMAIL : 'Bildirilen Posta',
		SITE : 'Alan',
		STATUS : 'Durum',
		SR : 'Hizmet Talebi',
		SUMMARY : '\u00D6zet',
		ASSETNUM : 'Varl\u0131k',
		ASSETSITEID : 'Varl\u0131k Alan\u0131',
	},
	INVBALANCES : {
		ITEMNUM : '\u00D6ge',
		DESCRIPTION : 'A\u00E7\u0131klama',
		BINNUM : 'Kutu',
		CURBAL : 'Mevcut Bakiye',
		PHYSCNT : 'Fiziksel Bakiye',
		PHYSCNTDATE : 'Fiziksel Say\u0131m Tarihi',
		RECONCILED : 'Anla\u015Fma Sa\u011Fland\u0131',
		LOCATION : 'Depo Alan\u0131',
	},
	INVENTORY : {
		ITEMNUM : '\u00D6ge',
		DESCRIPTION : 'A\u00E7\u0131klama',
		SITEID : 'Alan',
		STATUS : 'Durum',
		LOCATION : 'Depo Alan\u0131',
		CATEGORY : 'Stok Kategorisi',
		BINNUM : 'Varsay\u0131lan Kutu',
		ISSUEUNIT : 'Verili\u015F Birimi',
		CURBAL : 'Mevcut Bakiye',
		LASTISSUEDATE : 'Son Verili\u015F Tarihi',
		ISSUEYTD : 'Y\u0131lba\u015F\u0131ndan Bug\u00FCne',
		ISSUE1YRAGO : 'Ge\u00E7en Y\u0131l',
		PHYSCNT : 'Fiziksel Say\u0131m',
		PHYSCNTDATE : 'Fiziksel Say\u0131m Tarihi',
		RECONCILED : 'Anla\u015Fma Sa\u011Fland\u0131',
		TOTALINVPHYBAL : 'Fiziksel Bakiye',
		TOTALINVBAL : 'Mevcut Bakiye',
		ISSUEHISTORY : 'Verili\u015F Ge\u00E7mi\u015Fi',
		INVBALANCE : 'Envanter Bakiyeleri',
		ADJCOUNT : 'Fiziksel say\u0131mlar\u0131 bu {{count}} \u00F6geleri i\u00E7in uyarla',
		BALSUMMARY : 'Mevcut Bakiye \u00D6zeti',
	},
	METER : {
		ASSETNUM : 'Varl\u0131k',
		METERNAME : '\u00D6l\u00E7er',
		METERTYPE : '\u00D6l\u00E7er T\u00FCr\u00FC',
		READINGTYPE : 'Okuma T\u00FCr\u00FC',
		LASTREADING : 'Son Okuma',
		LASTREADINGDATE : 'Son Okuma Tarihi',
		LASTREADINGINSPECTOR : 'Son Okumay\u0131 Ger\u00E7ekle\u015Ftiren Denet\u00E7i',
		READING : 'Yeni Okuma',
		NEWREADINGDATE : 'Yeni Okuma Tarihi'
	},
	WPLABOR : {
		NAME : 'Planlanan \u00C7al\u0131\u015Fma',
		LABORCODE : '\u00C7al\u0131\u015Fma',
		CRAFT : 'Zanaat',
		QUANTITY : 'Miktar',
		LABORHRS : 'D\u00FCzenli Saatler',
		DISPLAYNAME : 'Ad',
		SKILLLEVEL: 'Beceri D\u00FCzeyi',
		VENDOR : 'Sat\u0131c\u0131',
		AMCREW : 'Ekip'
	},		
	WPMATERIAL : {
		NAME : 'Planlanan Malzemeler',
		LINETYPE : 'Kalem T\u00FCr\u00FC',
		ITEMNUM : '\u00D6ge',
		DESCRIPTION : 'A\u00E7\u0131klama',
		ITEMQTY : 'Miktar',
		UNITCOST : 'Birim Maliyet',
		STOREROOM : 'Depo Alan\u0131',
		STORELOCSITE : '\u00D6ge Deposu Alan\u0131',
		RESTYPE : 'Rezervasyon T\u00FCr\u00FC',
		REQUIREDATE : 'Gerekli Tarih'
	},
	LABTRANS : {
		LABORCODE : '\u00C7al\u0131\u015Fma',
		CRAFT : 'Zanaat',
		STARTDATE : 'Ba\u015Flang\u0131\u00E7 Tarihi',
		TIMERSTATUS : 'Zamanlay\u0131c\u0131 Durumu',
		REGULARHRS : 'D\u00FCzenli Saatler',
		PAYRATE: '\u00DCcret',
		PREMIUMPAYCODE : 'Prim \u00D6deme Kodu',
		PREMIUMPAYHOURS : 'Prim \u00D6deme Saatleri',
		PREMIUMPAYRATE: 'Prim \u00D6deme Oran\u0131',
		WONUM : '\u0130\u015F Emri',
		LOCATION : 'Konum',
		ASSETNUM : 'Varl\u0131k',
		TICKETID: 'Fi\u015F'
	},
	LABREP : {
		LABORCODE : '\u00C7al\u0131\u015Fma',
		CRAFT : 'Zanaat',
		SKILLLEVEL : 'Beceri D\u00FCzeyi',
		STARTDATE : 'Ba\u015Flang\u0131\u00E7 Tarihi',
		STARTTIME : 'Ba\u015Flang\u0131\u00E7 Saati',
		FINISHDATE : 'Biti\u015F Tarihi',
		FINISHTIME : 'Biti\u015F Saati',
		REGULARHRS : 'D\u00FCzenli Saatler',
		PAYRATE : '\u00DCcret',
		TRANSTYPE : 'T\u00FCr',
		WONUM : '\u0130\u015F Emri',
		LOCATION : 'Konum',
		ASSETNUM : 'Varl\u0131k',
		GENAPPRSERVRECEIPT: 'Onaylanm\u0131\u015F',
		NAME: 'Ad',
		TIMERSTATUS : 'Zamanlay\u0131c\u0131 Durumu',
		PREMIUMPAYHOURS : 'Prim \u00D6deme Saatleri',
		PREMIUMPAYRATE: 'Prim \u00D6deme Oran\u0131',
		PREMIUMPAYCODE : 'Prim \u00D6deme Kodu',
		TICKETID: 'Fi\u015F',
		TICKETCLASS: 'Fi\u015F S\u0131n\u0131f\u0131'
	},
	PERSON : {
		PERSONID: 'Ki\u015Fi',
		FIRSTNAME: 'Ad',
		LASTNAME: 'Soyad'
	},
	FAILURECODE : {
		FAILURECODE : 'Hata S\u0131n\u0131f\u0131',
		PROBLEMCODE : 'Sorun',
		CAUSECODE : 'Neden',
		REMEDYCODE : '\u00C7\u00F6z\u00FCm',
	},
	SPAREPART : {
		QUANTITY : 'Miktar',
		ISSUEDQTY : 'Verilen Miktar',
		REMARKS : 'A\u00E7\u0131klamalar',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'A\u00E7\u0131klama',
		LONGDESCRIPTION : 'Detaylar',
		ASSET : 'Varl\u0131k',
		STATUS : 'Durum',
		PARENT : '\u00DCst \u00D6ge \u0130E',
		SITE : 'Alan',
		LOCATION : 'Konum',
	},
	DOMAIN : {
		VALUE: 'De\u011Fer',
		DESCRIPTION: 'A\u00E7\u0131klama',
	},
	MR : {
		MRNUM : 'Talep',
		DESCRIPTION : 'A\u00E7\u0131klama',
		LONGDESCRIPTION : 'Uzun Tan\u0131m',
		STATUS : 'Durum',
		PRIORITY : '\u00D6ncelik',
		CHARGEINFO : '\u00DCcret Bilgisi',
		REQUIREDDATE : 'Gerekli Tarih',
		WONUM : '\u0130\u015F Emri',
		LOCATION : 'Konum',
		ASSET : 'Varl\u0131k',
		GLACCOUNT : 'GL Bor\u00E7 Hesab\u0131',
		MRLINES : 'Talep Kalemi \u00D6geleri',
		ENTERDATE : 'Girilen Tarih'
	},
	MRLINE : {
		MRLINEITEM : 'Talep Kalemi',
		MRLINENUM : 'Kalem',
		LINETYPE : 'Kalem T\u00FCr\u00FC',
		ITEM : '\u00D6ge',
		DESCRIPTION : 'A\u00E7\u0131klama',
		QTY : 'Miktar',
		ORDERUNIT : 'Emir Birimi',
		UNITCOST : 'Birim Maliyet',
		LINECOST : 'Kalem Masraf\u0131',
		REQUIREDDATE : 'Gerekli Tarih'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'G\u00F6nderilen Talepleri G\u00F6r\u00FCnt\u00FCle',
		VIEWSAVED : 'Kaydedilen Talepleri G\u00F6r\u00FCnt\u00FCle',
		EDIT : 'Talebi D\u00FCzenle'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Taslak Olarak Kaydet',
		NEWREQITEM : 'Yeni Talep Kalemi',
		SUBMIT : 'G\u00F6nder'
	},
	CLASSIFY : {
		CLASSASSET : 'Varl\u0131\u011F\u0131 S\u0131n\u0131fland\u0131r',
		CLASSWO : '\u0130\u015F S\u0131ras\u0131n\u0131 S\u0131n\u0131fland\u0131r',
		DESCRIPTION : 'S\u0131n\u0131f Tan\u0131m\u0131',
		CLASSIFICATION : 'S\u0131n\u0131fland\u0131rma'
	}
};