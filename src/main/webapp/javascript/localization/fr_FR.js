'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: fr_FR
 */
var locale = 'fr_FR'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Configurer',
        cancelText: 'Annuler',
        clearText: 'Supprimer',
        selectedText: 'S\u00e9lectionn\u00e9',
        // Calender component
        calendarText: 'Calendrier',
        dateText: 'Date',
        timeText: 'Heure',
        // Datetime component
        dateFormat: 'dd/mm/y',
        dateOrder: 'ddmmy',
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        dayText: 'Jour',
        hourText: 'Heures',
        minuteText: 'Minutes',
        monthNames: ['Janvier', 'F\u00e9vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao\u00fbt', 'Septembre', 'Octobre', 'Novembre', 'D\u00e9cembre'],
        monthNamesShort: ['Jan', 'F\u00e9v', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Ao\u00fbt', 'Sep', 'Oct', 'Nov', 'D\u00e9c'],
        monthText: 'Mois',
        secText: 'Secondes',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: 'Ann\u00e9e',
        nowText: 'Maintenant',
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
		ZERO : "z\u00e9ro",
		ONE : "un",
		TWO : "deux",
		FEW : "quelques",
		MANY : "nombreux",
		OTHER : "autre"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "AM", "PM" ],
            "DAY" : ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
            "MONTH": ["janvier","f\u00e9vrier","mars","avril","mai","juin","juillet","ao\u00fbt","septembre","octobre","novembre","d\u00e9cembre"],
            "SHORTDAY" : ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
            "SHORTMONTH" : [ "janv.","f\u00e9vr.","mars","avr.","mai","juin","juil.","ao\u00fbt","sept.","oct.","nov.","d\u00e9c." ],
            "fullDate": "EEEE d MMMM y",
            "longDate": "d MMMM y",
            "medium": "d MMM y HH:mm:ss",
            "mediumDate": "d MMM y",
            "mediumTime": "HH:mm:ss",
            "short": "dd/MM/yy HH:mm",
            "shortDate": "dd/MM/yy",
            "shortTime": "HH:mm"			
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
 * Language: FR
 */
var lang = 'FR'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Synchronisation termin\u00e9e avec erreurs\u00a0!  Vous pouvez tenter de poursuivre votre activit\u00e9 hors ligne\u00a0!',
	EMMOF1001W : 'Synchronisation termin\u00e9e avec erreurs\u00a0!  Veuillez refaire la synchronisation pour activer le mode hors ligne.',
	EMMOF1002W : 'Synchronisation termin\u00e9e avec erreurs\u00a0!  Vous pouvez retenter la synchronisation ou rester hors ligne.',
	EMMOF1003W : 'Synchronisation termin\u00e9e avec erreurs\u00a0!  Veuillez retenter la synchronisation afin de travailler hors ligne.',
	EMMOF1004W : '{0} doit \u00eatre un nombre',
	EMMOF1005W : 'Champs manquants obligatoires\u00a0: {0}',
	EMMOF1006W : 'L\attribut {0} est en lecture seule',
	EMMOF1007W : 'Veuillez s\u00e9lectionner une valeur',
	EMMOF1008I : 'L\u00e9tat a \u00e9t\u00e9 modifi\u00e9',
	EMMOF1009W : 'Veuillez pr\u00e9ciser une quantit\u00e9 sup\u00e9rieure \u00e0 z\u00e9ro',
	EMMOF1010W : '{0} doit \u00eatre sup\u00e9rieur \u00e0 z\u00e9ro',
	EMMOF1011W : '{0} est obligatoire',
	EMMOF1012W : 'Il n\'existe aucun solde pour cet article, entrep\u00F4t et combinaisons de bac',
	EMMOF1013W : 'Le solde dans le bac redeviendra n\u00E9gatif suite \u00E0 cette op\u00E9ration',
	EMMOF1014W : 'Transfert impossible lorsque les emplacements, num\u00E9ros de bacs et ID des sites sont tous identiques',
	// [WF]		
	EMMWF1000I : 'D\u00e9marrer le flux de travail',
	EMMWF1001I : 'Cette application a plusieurs processus de flux de travail.  Veuillez en s\u00e9lectionner un et appuyer sur OK.',
	EMMWF1002I : 'Veuillez s\u00e9lectionner un processus',
	EMMWF1003I : 'Processus',
	EMMWF1004I : 'Notes',
	EMMWF1005I : 'Arr\u00eater le flux de travail',
	// [ES]
	EMMES1000I : 'Autorisation de signature \u00e9lectronique',
	EMMES1001I : 'La signature \u00e9lectronique est obligatoire',
	EMMES1002E : '\u00c9chec de l\autorisation',
	EMMES1003I : 'Veuillez saisir un mot de passe et une raison',
	EMMES1004I : 'Utilisateur',
	EMMES1005I : 'Mot de passe',
	EMMES1006I : 'Raison',
	// [GB]
	EMMGB1001I : 'Courriel',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Annuler',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Confirmer',
	EMMGB1006I : 'Oui',
	EMMGB1007I : 'Non',
	EMMGB1008I : 'T\u00e9l\u00e9phone',
	EMMGB1009I : 'Appel',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Confirmer la suppression\u00a0?',
	EMMGB1012I : '{0} doit survenir avant {1}',
	EMMGB1013I : '{0} doit survenir apr\u00e8s {1}',
	EMMGB1014I : '{0} doit \u00eatre dans le pass\u00e9',
	// General	
	OFFLINEMODE : 'Mode hors ligne',
	SYNCNEEDED : '- Modifi\u00e9, synchronisation n\u00e9cessaire',
	SYNCHRONIZATION : 'Synchronisation',
	SYNCSERVER : 'Synchronisation avec le serveur',
	ENTERLABOR: 'Saisir par main-d\'\u0153uvre',
	ADDMORE: 'Ajouter...',
	GOONLINE : 'Retourner en ligne',
	GOTOOFFLINEAPPS : 'Aller aux applications hors ligne',
	OFFLINEAPPS : 'Applications hors ligne',
	QUICKSCAN : 'Lecture rapide\u00a0:',
	ACTIVEWORKORDERS : 'Bons de travail actifs',
	RECORDSAVED: 'Dossier enregistr\u00e9',
	RECORDNOTSAVED: 'Erreur - Aucun dossier n\a \u00e9t\u00e9 trouv\u00e9',
	TIMERALREADYSTARTED: 'Le minuteur a d\u00e9j\u00e0 d\u00e9marr\u00e9',
	TIMERNOTFOUND : 'Le minuteur n\a pas d\u00e9marr\u00e9. Aucun minuteur actif n\a \u00e9t\u00e9 trouv\u00e9.',
	TIMERSTARTED : 'Le minuteur a d\u00e9marr\u00e9',
	TIMERSTOPPED : 'Le minuteur s\est arr\u00eat\u00e9',
	TOOLS : 'Outils',
	STARTTIMER : 'D\u00e9marrer le minuteur',
	STOPTIMER : 'Arr\u00eater le minuteur',
	MODIFYSAVE : 'Dossier modifi\u00e9.  Veuillez enregistrer vos modifications.',
	SITEREQUIRED : 'Le site est obligatoire pour cr\u00e9er le bon de travail.',
	NOVALUE : 'Valeur vide',
	ACTIONS : 'Actions',
	CHILDRENOF : 'Enfants de',
	RESPONSIBILITY : 'Responsabilit\u00e9',
	LOOKUP : 'Consulter',
	LOCATIONDRILLDOWN : 'Recherche en profondeur des emplacements',
	ASSETDRILLDOWN : 'Recherche en profondeur des actifs',
	DRILLDOWN : 'Recherche en profondeur',
	BACK : 'Retour',
	SAVE : 'Enregistrer',
	APPLY : 'Appliquer',
	FILTER : 'Filtrer',
	RESET : 'R\u00e9initialiser',
	SELECTVALUE : 'S\u00e9lectionner une valeur',
	CANCEL : 'Annuler',
	OK : 'OK',
	YES : 'Oui',
	NO : 'Non',
	CREATEFOLLOWUP : 'Cr\u00e9er un suivi',
	CREATESR : 'Cr\u00e9er une nouvelle demande de service',
	PARENT : 'Parent',
	CHANGESTATUS : 'Modifier l\u00e9tat',
	LABOR : 'Main d\u0153uvre',
	MATERIALS : 'Mat\u00e9riaux',
	TASKS : 'T\u00e2ches',
	ATTACHMENTS : 'Pi\u00e8ces jointes',
	FAILUREREPORTING : 'Signalement de d\u00e9faillance',
	MULTIASSETS : 'Actifs, emplacements multiples',
	ADDNEW : 'Ajouter nouveau (nouvelle)',
	CLASSIFICATION : 'Classification',
	NORECORDS : 'Dossier(s) introuvable(s)',
	NORECORDEXIST : 'Dossier introuvable ou il n\existe plus',
	NORECORDSADJ : 'Aucun dossier pour ajuster le d\u00e9compte physique',
	SELECTOWNER : 'S\u00e9lectionner un propri\u00e9taire',
	OWNER : 'Propri\u00e9taire',
	OWNERGROUP : 'Groupe de propri\u00e9taires',
	TAKEOWNERSHIP : 'S\approprier',
	SORTBY : 'Trier par',
	LIST : 'Liste',
	QUICKSEARCH: 'Recherche rapide',
	INVENTORYBYSR : 'Inventaire par entrep\u00f4t',
	INVDETAILS : 'D\u00e9tails de l\inventaire',
	NEWCOUNT : 'Nouveau d\u00e9compte',
	LABORTRANS : 'Op\u00e9rations de la main d\u0153uvre',
	CREATEWO : 'Cr\u00e9er un bon de travail',
	MYWOS : 'Mes bons de travail',
	FAILUREREPORT : 'Signalement de d\u00e9faillance',
	METERREADINGS : 'Saisir les relev\u00e9s de compteur',
	ASSETMETER : 'Relev\u00e9s de compteur des actifs',
	LOCATIONMETER : 'Relev\u00e9s de compteur des emplacements',
	FROM : 'Exp\u00e9diteur',
	TO : 'Destinataire',
	ADVANCED : 'Avanc\u00e9',
	ADVANCEDSEARCH : 'Recherche avanc\u00e9e',
	DOWNTIME : 'Temps d\arr\u00eat',
	PURCHASEINFO : 'Information sur les achats',
	SPAREPARTS : 'Pi\u00e8ces de rechange',
	SCHEDULEINFO : 'Infos de planification',
	PLANLABOR : 'Planifier la main d\u0153uvre',
	PLANMATERIAL : 'Mat\u00e9riaux planifi\u00e9s',
	WOCREATED : 'Bon de travail {0} cr\u00e9\u00e9.',
	PRESTART : 'Pr\u00e9-d\u00e9marrage',
	REVIEWANDAPPROVE : '\u00c9valuer et approuver',
	MOCACTIONGROUP : 'S\u00e9lectionner le groupe d\actions MOC',
	MOCACTIONS : 'S\u00e9lectionner les actions MOC',
	REVIEWERSAVED : '\u00c9valuateur(s) enregistr\u00e9(s) hors ligne.',
	APPROVERSAVED : 'Approbateur(s) enregistr\u00e9(s) hors ligne.',
	ACTIONSAVED : 'Action(s) enregistr\u00e9e(s) hors ligne.',
	NOACTIONS : 'Le Groupe d\actions standard {0} n\a aucune action standard valable \u00e0 ajouter.',
	SRQUEUED : '\u00c9tat SR {0} a \u00e9t\u00e9 modifi\u00e9 pour devenir PLAC\u00c9 EN FILE D\ATTENTE.',
	SELECTREVIEWERS : 'S\u00e9lectionner les \u00e9valuateurs',
	SELECTAPPROVERS : 'S\u00e9lectionner les approbateurs',
	APPROVERS : 'Approbateurs',
	REVIEWERS : '\u00c9valuateurs',
	VIEWLIST: 'Afficher la liste',
	VIEWSUMMARY : 'Afficher le r\u00E9capitulatif',
	STOREROOMS : 'Entrep\u00F4ts',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Aller \u00E0',
	APPS : 'Applications',
	STARTCENTER : 'Centre de d\u00E9marrage',
	PAGINATION : {
		TITLE : 'Page {{from}} sur {{to}} - {{total}} Dossier',
		PREV : 'Pr\u00e9c\u00e9dent',
		NEXT : 'Suivant'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Emplacement',
		ASSET : 'Actif',
		WOTRACK : 'Suivi des bons de travail',
		SR : 'Demandes de service',
		INVENTOR: 'Inventaire',
		INVISSUE: 'Distributions et transferts',
		MOC : 'MOC (p\u00E9trole)',
		CREATEDR : 'Cr\u00E9er une demande',
		VIEWDR : 'Afficher les demandes',
		LABREP: 'Rapport de main-d\'\u0153uvre',
		TXNTRACK : 'R\u00E9solution de synchronisation'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Actif n\u00b0',
		STATUS : '\u00c9tat',
		STATUSDATE: 'Date de la derni\u00e8re modification',
		INSTALLDATE: 'Date d\installation',
		SITEID : 'Site',
		PARENT : 'Parent',
		ASSETTYPE: 'Type',
		LONGDESCRIPTION : 'D\u00e9tails',
		GROUPNAME: 'Groupe de compteurs',
		SERIALNUM: 'N\u00b0 de s\u00e9rie',
		PURCHASEPRICE: 'Prix d\achat',
		TOTDOWNTIME: 'Temps d\arr\u00eat total',
		ISRUNNING: 'Actif en service',
		VENDOR: 'Fournisseur',
		MANUFACTURER: 'Fabricant',
		FAILURECODE: 'Cat\u00e9gorie de d\u00e9faillance',
		DESCRIPTION : 'Description',
		LOCATION : 'Emplacement',
		LOCDESC : 'D\u00e9tails',
		SEQUENCE : 'S\u00e9quence',
		PROGRESS : 'Noter l\avancement\u00a0?',
		COMMENTS : 'Commentaires',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Bon de travail',
		DESCRIPTION : 'Description',
		LONGDESCRIPTION : 'D\u00E9tails',
		STATUS : '\u00C9tat',
		PARENT : 'BT parent',
		SITEID : 'Site',
		LOCATION : 'Emplacement',
		ASSETNUM : 'Actif',
		WORKTYPE : 'Type de travail',
		WOPRIORITY : 'Priorit\u00E9',
		GLACCOUNT : 'Compte GL',
		FAILURECODE : 'Cat\u00E9gorie de d\u00E9faillance',
		PROBLEMCODE : 'Code de probl\u00E8me',
		SUPERVISOR : 'Superviseur',
		CREWID : '\u00C9quipe',
		LEAD : 'Chef',
		PERSONGROUP : 'Groupe de travail',
		REPORTEDBY : 'Signal\u00E9 par',
		REPORTDATE : 'Date du signalement',
		PHONE : 'T\u00E9l\u00E9phone',
		TASKID : 'T\u00E2che',
		TARGSTARTDATE : 'D\u00E9but de l\'objectif',
		TARGCOMPDATE : 'Fin de l\'objectif',
		SCHEDSTART : 'D\u00E9but pr\u00E9vu',
		SCHEDFINISH : 'Fin pr\u00E9vue',
		ACTSTART : 'D\u00E9but r\u00E9el',
		ACTFINISH : 'Fin r\u00E9elle',
		ASSIGNMENT : 'Main-d\'\u0153uvre affect\u00E9e',
		OWNER : 'Propri\u00E9taire',
		OWNERGROUP : 'Groupe de propri\u00E9taires',
		OBSERVATION : 'Observation',
		MEASUREMENTVALUE : 'Valeur de mesure',
		HAZARDS: 'Dangers',
		HAZARDSMAT: 'Mati\u00E8res dangereuses',
		PRECAUTIONS: 'Pr\u00E9cautions',
		LOCKTAG: 'Verrouillage/\u00E9tiquetage',
		TAGOUT: '\u00C9tiquetages',
		LOCKOUT: 'Verrouillage',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Description',
		ITEM : 'Article',
		LINETYPE : 'Type de ligne',
		QUANTITY : 'Quantit\u00E9',
		STOREROOM : 'Entrep\u00F4t',
		STORELOC : 'Entrep\u00F4t',
		BINNUM : 'Bac',
		CURBAL : 'Solde actuel',
		UNITCOST : 'Co\u00FBt unitaire',
		ASSET : 'Actif',
		WORKORDER : 'Bon de travail',
		LOCATION : 'Emplacement',
		ISSUETYPE : 'Type de distribution',
		ISSUETO : 'Distribu\u00E9 \u00E0',
		ROTASSETNUM : 'Rotation d\'actif',
		SITEID : 'Site',
		ISSUERETURN : 'Distribution et retour',
		CHARGEINFO : 'Information de taxation'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Description',
		ITEM : 'Article',
		LINETYPE : 'Type de ligne',
		QUANTITY : 'Quantit\u00e9',
		STOREROOM : 'Entrep\u00f4t',
		BINNUM : 'Bac',
		CURBAL : 'Solde actuel',
		UNITCOST : 'Co\u00fbt unitaire',
		ISSUETYPE : 'Type de distribution',
		LOCATION : 'Emplacement',
		TOOLRATE : 'Tarif de l\outil',
		ASSETNUM: 'Actif',
		TOOLHRS: 'Heures de l\outil',
		LINECOST: 'Co\u00fbt de la ligne',
		TOOLQTY: 'Quantit\u00e9 d\outils'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Description',
		ITEM : 'Article',
		LINETYPE : 'Type de ligne',
		QUANTITY : 'Quantit\u00E9',
		TOSTORELOC : 'Vers l\'emplacement',
		FROMSTORELOC : 'Depuis l\'emplacement',
		FROMSITE : 'Depuis le site',
		TOSITE : 'Vers le site',
		TOBIN: 'Vers le bac',
		FROMBIN: 'Depuis le bac',
		UNITCOST : 'Co\u00FBt unitaire',
		ISSUETYPE : 'Type de distribution',
		CONVERSIONFACTOR : 'Facteur de conversion',
		ROTASSETNUM : 'Rotation d\'actif',
		TRANSFEROUT : 'Transfert sortant',
		TRANSFERIN : 'Transfert entrant',
		FROMQTY : 'Depuis la quantit\u00E9 de bacs',
		TOQTY : 'Vers la quantit\u00E9 de bacs',
		SITEID : 'Site',
		LOCATION : 'Emplacement',
		TRANSFERDETAILS: 'D\u00E9tails du transfert'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Actif',
		LOCATION : 'Emplacement',
		SEQUENCE : 'S\u00e9quence',
	},
	WORKLOG : {
		NAME : 'Journal des travaux',
		DESCRIPTION : 'Description',
		DETAILS : 'D\u00e9tails',
		LOGTYPE : 'Type',
		CREATEBY : 'Cr\u00e9\u00e9 par',
		CREATEDATE : 'Date de cr\u00e9ation'
	},
	SR : {
		ACTIVEREQS : 'Demandes de service actives',
		NEWREQS : 'Nouvelles demandes de service',
		AFFECTEDPERSON : 'Personne concern\u00e9e',
		DETAILS : 'D\u00e9tails',
		GLACCOUNT : 'Compte GL',
		LOCATION : 'Emplacement',
		OWNER : 'Propri\u00e9taire',
		OWNERGROUP : 'Groupe de propri\u00e9taires',
		REPORTEDPRIORITY : 'Priorit\u00e9 signal\u00e9e',
		REPORTEDBY : 'Signal\u00e9 par',
		REPORTDATE : 'Date du rapport',
		REPORTEDPHONE : 'T\u00e9l\u00e9phone fourni',
		REPORTEDEMAIL : 'Adresse \u00e9lectronique fournie',
		SITE : 'Site',
		STATUS : '\u00c9tat',
		SR : 'Demande de service',
		SUMMARY : 'R\u00e9capitulatif',
		ASSETNUM : 'Actif',
		ASSETSITEID : 'Site de l\actif',
	},
	INVBALANCES : {
		ITEMNUM : 'Article',
		DESCRIPTION : 'Description',
		BINNUM : 'Bac',
		CURBAL : 'Solde actuel',
		PHYSCNT : 'Solde r\u00e9el',
		PHYSCNTDATE : 'Date du d\u00e9compte r\u00e9el',
		RECONCILED : 'Rapproch\u00e9(s)',
		LOCATION : 'Entrep\u00f4t',
	},
	INVENTORY : {
		ITEMNUM : 'Article',
		DESCRIPTION : 'Description',
		SITEID : 'Site',
		STATUS : '\u00C9tat',
		LOCATION : 'Entrep\u00F4t',
		CATEGORY : 'Cat\u00E9gorie de stock',
		BINNUM : 'Bac par d\u00E9faut',
		ISSUEUNIT : 'Unit\u00E9 de distribution',
		CURBAL : 'Solde actuel',
		LASTISSUEDATE : 'Derni\u00E8re date de distribution',
		ISSUEYTD : 'Depuis le d\u00E9but de l\'ann\u00E9e',
		ISSUE1YRAGO : 'Ann\u00E9e derni\u00E8re',
		PHYSCNT : 'D\u00E9compte r\u00E9el',
		PHYSCNTDATE : 'Date du d\u00E9compte r\u00E9el',
		RECONCILED : 'Rapproch\u00E9(s)',
		TOTALINVPHYBAL : 'Solde r\u00E9el',
		TOTALINVBAL : 'Solde actuel',
		ISSUEHISTORY : 'Historique des distributions',
		INVBALANCE : 'Soldes d\'inventaire',
		ADJCOUNT : 'Ajuster les d\u00E9comptes r\u00E9els pour ces {{d\u00E9compte}} articles',
		BALSUMMARY : 'R\u00E9capitulatif du solde disponible',
	},
	METER : {
		ASSETNUM : 'Actif',
		METERNAME : 'Compteur',
		METERTYPE : 'Type de compteur',
		READINGTYPE : 'Type de relev\u00E9',
		LASTREADING : 'Dernier relev\u00E9',
		LASTREADINGDATE : 'Date du dernier relev\u00E9',
		LASTREADINGINSPECTOR : 'Inspecteur du dernier relev\u00E9',
		READING : 'Nouveau relev\u00E9',
		NEWREADINGDATE : 'Date du nouveau relev\u00E9'
	},
	WPLABOR : {
		NAME : 'Main d\u0153uvre planifi\u00e9e',
		LABORCODE : 'Main d\u0153uvre',
		CRAFT : 'M\u00e9tier',
		QUANTITY : 'Quantit\u00e9',
		LABORHRS : 'Heures habituelles',
		DISPLAYNAME : 'Nom',
		SKILLLEVEL: 'Niveau de comp\u00e9tence',
		VENDOR : 'Fournisseur',
		AMCREW : '\u00c9quipe'
	},		
	WPMATERIAL : {
		NAME : 'Mat\u00e9riaux planifi\u00e9s',
		LINETYPE : 'Type de ligne',
		ITEMNUM : 'Article',
		DESCRIPTION : 'Description',
		ITEMQTY : 'Quantit\u00e9',
		UNITCOST : 'Co\u00fbt unitaire',
		STOREROOM : 'Entrep\u00f4t',
		STORELOCSITE : 'Site de l\entrep\u00f4t',
		RESTYPE : 'Type de r\u00e9servation',
		REQUIREDATE : 'Date requise'
	},
	LABTRANS : {
		LABORCODE : 'Main-d\'\u0153uvre',
		CRAFT : 'M\u00E9tier',
		STARTDATE : 'Date de d\u00E9but',
		TIMERSTATUS : '\u00C9tat du minuteur',
		REGULARHRS : 'Heures habituelles',
		PAYRATE: 'Taux',
		PREMIUMPAYCODE : 'Code de prime',
		PREMIUMPAYHOURS : 'Heures de prime',
		PREMIUMPAYRATE: 'Taux de prime',
		WONUM : 'Bon de travail',
		LOCATION : 'Emplacement',
		ASSETNUM : 'Actif',
		TICKETID: 'Ticket'
	},
	LABREP : {
		LABORCODE : 'Main-d\'\u0153uvre',
		CRAFT : 'M\u00E9tier',
		SKILLLEVEL : 'Niveau de comp\u00E9tence',
		STARTDATE : 'Date de d\u00E9but',
		STARTTIME : 'Heure de d\u00E9but',
		FINISHDATE : 'Date de fin',
		FINISHTIME : 'Heure de fin',
		REGULARHRS : 'Heures habituelles',
		PAYRATE : 'Taux',
		TRANSTYPE : 'Type',
		WONUM : 'Bon de travail',
		LOCATION : 'Emplacement',
		ASSETNUM : 'Actif',
		GENAPPRSERVRECEIPT: 'Approuv\u00E9',
		NAME: 'Nom',
		TIMERSTATUS : '\u00C9tat du minuteur',
		PREMIUMPAYHOURS : 'Heures de prime',
		PREMIUMPAYRATE: 'Taux de prime',
		PREMIUMPAYCODE : 'Code de prime',
		TICKETID: 'Ticket',
		TICKETCLASS: 'Cat\u00E9gorie de ticket'
	},
	PERSON : {
		PERSONID: 'Personne',
		FIRSTNAME: 'Pr\u00e9nom',
		LASTNAME: 'Nom'
	},
	FAILURECODE : {
		FAILURECODE : 'Cat\u00e9gorie de d\u00e9faillance',
		PROBLEMCODE : 'Probl\u00e8me',
		CAUSECODE : 'Cause',
		REMEDYCODE : 'Rem\u00e8de',
	},
	SPAREPART : {
		QUANTITY : 'Quantit\u00e9',
		ISSUEDQTY : 'Qt\u00e9 distribu\u00e9e',
		REMARKS : 'Remarques',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Description',
		LONGDESCRIPTION : 'D\u00e9tails',
		ASSET : 'Actif',
		STATUS : '\u00c9tat',
		PARENT : 'BT parent',
		SITE : 'Site',
		LOCATION : 'Emplacement',
	},
	DOMAIN : {
		VALUE: 'Valeur',
		DESCRIPTION: 'Description',
	},
	MR : {
		MRNUM : 'Demande',
		DESCRIPTION : 'Description',
		LONGDESCRIPTION : 'Description longue',
		STATUS : '\u00c9tat',
		PRIORITY : 'Priorit\u00e9',
		CHARGEINFO : 'Information de taxation',
		REQUIREDDATE : 'Date requise',
		WONUM : 'Bon de travail',
		LOCATION : 'Emplacement',
		ASSET : 'Actif',
		GLACCOUNT : 'Compte de d\u00e9bit GL',
		MRLINES : 'Articles des lignes de demande',
		ENTERDATE : 'Date de saisie'
	},
	MRLINE : {
		MRLINEITEM : 'Articles de demande',
		MRLINENUM : 'Ligne',
		LINETYPE : 'Type de ligne',
		ITEM : 'Article',
		DESCRIPTION : 'Description',
		QTY : 'Quantit\u00e9',
		ORDERUNIT : 'Unit\u00e9 de commande',
		UNITCOST : 'Co\u00fbt unitaire',
		LINECOST : 'Co\u00fbt de la ligne',
		REQUIREDDATE : 'Date requise'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Afficher les demandes envoy\u00e9es',
		VIEWSAVED : 'Afficher les demandes enregistr\u00e9es',
		EDIT : 'Modifier une demande'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Enregistrer un brouillon',
		NEWREQITEM : 'Nouvel article de demande',
		SUBMIT : 'Envoyer'
	},
	CLASSIFY : {
		CLASSASSET : 'Classer l\actif',
		CLASSWO : 'Classer le bon de travail',
		DESCRIPTION : 'Description de cat\u00e9gorie',
		CLASSIFICATION : 'Classification'
	}
};
