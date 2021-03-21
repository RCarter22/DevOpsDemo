'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: fr_CA
 */
var locale = 'fr_CA'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Ensemble',
        cancelText: 'Annuler',
        clearText: 'Effacer',
        selectedText: 'S\u00e9lectionn\u00e9',
        // Calender component
        calendarText: 'Calendrier',
        dateText: 'Date',
        timeText: 'Heure',
        // Datetime component
        dateFormat: 'y-mm-dd',
        dateOrder: 'ymmdd',
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        dayText: 'Jour',
        hourText: 'Heures',
        minuteText: 'Minutes',
        monthNames: ['Janvier', 'F\u00e9vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao\u00fbt', 'Septembre', 'Octobre', 'Novembre', 'D\u00e9cembre'],
        monthNamesShort: ['Jan', 'F\u00e9v', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Ao\u00fb', 'Sep', 'Oct', 'Nov', 'D\u00e9c'],
        monthText: 'Mois',
        secText: 'Seconde',
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
	        symbol: '$'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "z\u00e9ro",
		ONE : "un",
		TWO : "deux",
		FEW : "peu",
		MANY : "plusieurs",
		OTHER : "autre"
	},
	locale : {
        "DATETIME_FORMATS" : {   "AMPMS": ["a.m.", "p.m."],
            "DAY": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
            "ERANAMES": ["avant J\u00e9sus-Christ", "apr\u00e8s J\u00e9sus-Christ"],
            "ERAS": ["av. J.-C.", "ap. J.-C."],
            "FIRSTDAYOFWEEK": 6,
            "MONTH": ["janvier", "f\u00e9vrier","mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre","octobre","novembre","d\u00e9cembre"],
            "SHORTDAY": ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
            "SHORTMONTH": ["janv.","f\u00e9vr.","mars","avr.","mai","juin","juill.","ao\u00fbt", "sept.","oct.","nov.","d\u00e9c."],
            "STANDALONEMONTH": ["janvier","f\u00e9vrier","mars","avril","mai","juin","juillet","ao\u00fbt","septembre","octobre","novembre","d\u00e9cembre"],
            "WEEKENDRANGE": [5,6],
            "fullDate": "EEEE d MMMM y",
            "longDate": "d MMMM y",
            "medium": "d MMM y HH:mm:ss",
            "mediumDate": "d MMM y",
            "mediumTime": "HH:mm:ss",
            "short": "yy-MM-dd HH:mm",
            "shortDate": "yy-MM-dd",
            "shortTime": "HH:mm"
		},
		"NUMBER_FORMATS" : {
            "CURRENCY_SYM": "$",
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
	EMMOF1000W : 'La synchronisation est compl\u00e9t\u00e9e avec des erreurs!  Vous pouvez encore essayer de travailler hors ligne.',
	EMMOF1001W : 'La synchronisation est compl\u00e9t\u00e9e avec des erreurs!  Veuillez synchroniser de nouveau pour activer le mode hors ligne.',
	EMMOF1002W : 'La synchronisation est compl\u00e9t\u00e9e avec des erreurs!  Vous pouvez encore essayer de synchroniser ou continuer \u00e0 travailler hors ligne.',
	EMMOF1003W : 'La synchronisation est compl\u00e9t\u00e9e avec des erreurs!  Veuillez essayer de synchroniser de nouveau pour pouvoir travailler hors ligne.',
	EMMOF1004W : '{0} doit \u00eatre un chiffre',
	EMMOF1005W : 'Des champs requis sont manquants\u00a0: {0}',
	EMMOF1006W : 'L\'attribut {0} est en lecture seulement',
	EMMOF1007W : 'Veuillez s\u00e9lectionner une valeur',
	EMMOF1008I : 'Le changement d\'\u00e9tat a r\u00e9ussi',
	EMMOF1009W : 'Veuillez pr\u00e9ciser une quantit\u00e9 sup\u00e9rieure \u00e0 z\u00e9ro',
	EMMOF1010W : '{0} doit \u00eatre sup\u00e9rieur \u00e0 z\u00e9ro',
	EMMOF1011W : '{0} est requis',
	EMMOF1012W : 'Il n\'y pas de solde pour ces combinaisons d\u2019article, d\u2019entrep\u00F4t et unit\u00E9 de rangement',
	EMMOF1013W : 'Cette transaction rendra n\u00E9gatif le solde de cette unit\u00E9 de rangement',
	EMMOF1014W : 'Impossible de transf\u00E9rer lorsque les emplacements, les num\u00E9ros d\u2019unit\u00E9 de rangement et les identifiants de site sont tous identiques.',
	// [WF]		
	EMMWF1000I : 'D\u00e9marrer le flux de travail',
	EMMWF1001I : 'Plus d\'un flux de travail est disponible pour cette application.  Veuillez en s\u00e9lectionner un et appuyer sur OK.',
	EMMWF1002I : 'Veuillez s\u00e9lectionner un processus',
	EMMWF1003I : 'Processus',
	EMMWF1004I : 'M\u00e9mo',
	EMMWF1005I : 'Arr\u00eater le flux de travail',
	// [ES]
	EMMES1000I : 'Autorisation e-Sign',
	EMMES1001I : 'Une signature \u00e9lectronique est requise',
	EMMES1002E : '\u00c9chec de l\'autorisation',
	EMMES1003I : 'Veuillez saisir un mot de passe et un motif',
	EMMES1004I : 'Utilisateur',
	EMMES1005I : 'Mot de passe',
	EMMES1006I : 'Motif',
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
	EMMGB1011I : 'Valider la suppression?',
	EMMGB1012I : '{0} doit survenir avant {1}',
	EMMGB1013I : '{0} doit survenir apr\u00e8s {1}',
	EMMGB1014I : '{0} doit \u00eatre survenu dans le pass\u00e9',
	// General	
	OFFLINEMODE : 'Mode hors ligne',
	SYNCNEEDED : '- Modifi\u00e9, synchronisation requise',
	SYNCHRONIZATION : 'Synchronisation',
	SYNCSERVER : 'Synchronisation avec le serveur',
	ENTERLABOR: 'Saisir par main-d\'\u0153uvre',
	ADDMORE: 'Ajouter plus...',
	GOONLINE : 'Retourner en ligne',
	GOTOOFFLINEAPPS : 'Retourner aux applications hors ligne',
	OFFLINEAPPS : 'Applications hors ligne',
	QUICKSCAN : 'Analyse rapide\u00a0:',
	ACTIVEWORKORDERS : 'Ordres de travail actifs',
	RECORDSAVED: 'Dossier enregistr\u00e9',
	RECORDNOTSAVED: 'Erreur - Aucune erreur n\'a \u00e9t\u00e9 retourn\u00e9e',
	TIMERALREADYSTARTED: 'La minuterie a d\u00e9j\u00e0 d\u00e9marr\u00e9',
	TIMERNOTFOUND : 'La minuterie n\'a pas d\u00e9marr\u00e9. Aucune minuterie active n\'a \u00e9t\u00e9 trouv\u00e9e.',
	TIMERSTARTED : 'La minuterie a d\u00e9marr\u00e9',
	TIMERSTOPPED : 'La minuterie a arr\u00eat\u00e9',
	TOOLS : 'Outils',
	STARTTIMER : 'D\u00e9marrer la minuterie',
	STOPTIMER : 'Arr\u00eater la minuterie',
	MODIFYSAVE : 'Dossier modifi\u00e9.  Veuillez enregistrer vos modifications.',
	SITEREQUIRED : 'Le site doit cr\u00e9er l\'ordre de travail.',
	NOVALUE : 'Valeur vide',
	ACTIONS : 'Actions',
	CHILDRENOF : 'Enfant de',
	RESPONSIBILITY : 'Responsabilit\u00e9',
	LOOKUP : 'Chercher',
	LOCATIONDRILLDOWN : 'Analyse de l\'emplacement',
	ASSETDRILLDOWN : 'Analyse des actifs',
	DRILLDOWN : 'Analyse',
	BACK : 'Retour',
	SAVE : 'Enregistrer',
	APPLY : 'Appliquer',
	FILTER : 'Filtre',
	RESET : 'R\u00e9initialiser',
	SELECTVALUE : 'S\u00e9lectionner une valeur',
	CANCEL : 'Annuler',
	OK : 'OK',
	YES : 'Oui',
	NO : 'Non',
	CREATEFOLLOWUP : 'Cr\u00e9er un suivi',
	CREATESR : 'Cr\u00e9er une nouvelle demande de service',
	PARENT : 'Parent',
	CHANGESTATUS : 'Modifier l\'\u00e9tat',
	LABOR : 'Main d\'\u0153uvre',
	MATERIALS : 'Mat\u00e9riaux',
	TASKS : 'T\u00e2ches',
	ATTACHMENTS : 'Pi\u00e8ces jointes',
	FAILUREREPORTING : 'La soumission de rapport a \u00e9chou\u00e9',
	MULTIASSETS : 'Plusieurs actifs, plusieurs emplacements',
	ADDNEW : 'Ajouter un nouveau',
	CLASSIFICATION : 'Classification',
	NORECORDS : 'Aucun dossier trouv\u00e9',
	NORECORDEXIST : 'Aucun dossier trouv\u00e9 ou les dossiers n\'existent plus',
	NORECORDSADJ : 'Aucun dossier permettant d\'ajuster les comptes physiques',
	SELECTOWNER : 'S\u00e9lectionner un responsable',
	OWNER : 'Responsable',
	OWNERGROUP : 'Groupe responsable',
	TAKEOWNERSHIP : 'Prendre la responsabilit\u00e9',
	SORTBY : 'Trier par',
	LIST : 'Liste',
	QUICKSEARCH: 'Recherche rapide',
	INVENTORYBYSR : 'Inventaire par r\u00e9serve',
	INVDETAILS : 'D\u00e9tails de l\'inventaire',
	NEWCOUNT : 'Nouveau compte',
	LABORTRANS : 'Transaction de main-d\'\u0153uvre',
	CREATEWO : 'Cr\u00e9er un nouvel ordre de travail',
	MYWOS : 'Mes ordres de travail',
	FAILUREREPORT : 'La soumission de rapport a \u00e9chou\u00e9',
	METERREADINGS : 'Saisir les relev\u00e9s des compteurs',
	ASSETMETER : 'Lectures du compteur de l\'actif',
	LOCATIONMETER : 'Lectures du compteur de l\'emplacement',
	FROM : 'De',
	TO : 'Destinataire',
	ADVANCED : 'Avanc\u00e9',
	ADVANCEDSEARCH : 'Recherche avanc\u00e9e',
	DOWNTIME : 'Temps d\'arr\u00eat',
	PURCHASEINFO : 'Renseignements sur l\u2019achat',
	SPAREPARTS : 'Pi\u00e8ces de rechange',
	SCHEDULEINFO : 'Renseignements de planification',
	PLANLABOR : 'Planifier la main-d\'\u0153uvre',
	PLANMATERIAL : 'Mat\u00e9riaux planifi\u00e9s',
	WOCREATED : 'L\'ordre de travail {0} a \u00e9t\u00e9 cr\u00e9\u00e9.',
	PRESTART : 'Pr\u00e9d\u00e9marrage',
	REVIEWANDAPPROVE : 'R\u00e9viser et approuver',
	MOCACTIONGROUP : 'S\u00e9lectionner le groupe d\'action MOC',
	MOCACTIONS : 'S\u00e9lectionner les actions MOC',
	REVIEWERSAVED : 'R\u00e9viseur(s) enregistr\u00e9(s) hors ligne.',
	APPROVERSAVED : 'Approbateur(s) enregistr\u00e9(s) hors ligne.',
	ACTIONSAVED : 'Action(s) enregistr\u00e9e(s) hors ligne.',
	NOACTIONS : 'Le groupe d\'actions standard {0} n\'a aucune action standard valide \u00e0 ajouter.',
	SRQUEUED : '\u00c9tat de SR {0} chang\u00e9 \u00e0 FILE D\'ATTENTE.',
	SELECTREVIEWERS : 'S\u00e9lectionner les r\u00e9viseurs',
	SELECTAPPROVERS : 'S\u00e9lectionner des approbateurs',
	APPROVERS : 'Approbateurs',
	REVIEWERS : '\u00c9valuateurs',
	VIEWLIST: 'Voir la liste',
	VIEWSUMMARY : 'Voir le sommaire',
	STOREROOMS : 'R\u00E9serves',
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
		WOTRACK : 'Suivi des ordres de travail',
		SR : 'Demandes de service',
		INVENTOR: 'Stock',
		INVISSUE: 'Questions et transferts',
		MOC : 'MOC (Huile)',
		CREATEDR : 'Cr\u00E9er une demande',
		VIEWDR : 'Afficher les demandes',
		LABREP: 'Rapport sur la main-d\'\u0153uvre',
		TXNTRACK : 'R\u00E9solution de la synchronisation'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'No d\'actif',
		STATUS : '\u00c9tat',
		STATUSDATE: 'Derni\u00e8re date modifi\u00e9e',
		INSTALLDATE: 'Date d\'installation',
		SITEID : 'Site',
		PARENT : 'Parent',
		ASSETTYPE: 'Type',
		LONGDESCRIPTION : 'D\u00e9tails',
		GROUPNAME: 'Groupe de compteurs',
		SERIALNUM: 'No de s\u00e9rie\u00a0',
		PURCHASEPRICE: 'Prix d\u2019achat',
		TOTDOWNTIME: 'Temps d\'arr\u00eat total',
		ISRUNNING: 'Actif fonctionnel',
		VENDOR: 'Fournisseur',
		MANUFACTURER: 'Fabricant',
		FAILURECODE: 'Classe d\'\u00e9checs',
		DESCRIPTION : 'Description',
		LOCATION : 'Emplacement',
		LOCDESC : 'D\u00e9tails',
		SEQUENCE : 'S\u00e9quence',
		PROGRESS : 'Marquer la progression?',
		COMMENTS : 'Commentaires',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Ordre de travail (WO)',
		DESCRIPTION : 'Description',
		LONGDESCRIPTION : 'D\u00E9tails',
		STATUS : '\u00C9tat',
		PARENT : 'WO parent',
		SITEID : 'Site',
		LOCATION : 'Emplacement',
		ASSETNUM : 'Actif',
		WORKTYPE : 'Type de travail',
		WOPRIORITY : 'Priorit\u00E9',
		GLACCOUNT : 'Compte du grand livre',
		FAILURECODE : 'Classe d\'\u00E9chec',
		PROBLEMCODE : 'Code de probl\u00E8me',
		SUPERVISOR : 'Superviseur',
		CREWID : '\u00C9quipe',
		LEAD : 'Chef d\'\u00E9quipe',
		PERSONGROUP : 'Groupe de travail',
		REPORTEDBY : 'Signal\u00E9 par',
		REPORTDATE : 'Date de signalement',
		PHONE : 'T\u00E9l\u00E9phone',
		TASKID : 'T\u00E2che',
		TARGSTARTDATE : 'D\u00E9but de la cible',
		TARGCOMPDATE : 'Fin de la cible',
		SCHEDSTART : 'D\u00E9but de la planification',
		SCHEDFINISH : 'Fin de la planification',
		ACTSTART : 'D\u00E9but effectif',
		ACTFINISH : 'Fin effective',
		ASSIGNMENT : 'Main-d\'\u0153uvre assign\u00E9e',
		OWNER : 'Responsable',
		OWNERGROUP : 'Groupe responsable',
		OBSERVATION : 'Observation',
		MEASUREMENTVALUE : 'Valeur des mesures',
		HAZARDS: 'Risques',
		HAZARDSMAT: 'Mati\u00E8res dangereuses',
		PRECAUTIONS: 'Pr\u00E9cautions',
		LOCKTAG: 'Verrouiller/\u00C9tiqueter',
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
		LINETYPE : 'Type de poste',
		QUANTITY : 'Quantit\u00E9',
		STOREROOM : 'R\u00E9serve',
		STORELOC : 'R\u00E9serve',
		BINNUM : 'Conteneur',
		CURBAL : 'Solde courant',
		UNITCOST : 'Co\u00FBt unitaire',
		ASSET : 'Actif',
		WORKORDER : 'Ordre de travail (WO)',
		LOCATION : 'Emplacement',
		ISSUETYPE : 'Type d\u2019\u00E9mission',
		ISSUETO : '\u00C9mis \u00E0',
		ROTASSETNUM : 'Rotation des actifs',
		SITEID : 'Site',
		ISSUERETURN : '\u00C9mission et retour',
		CHARGEINFO : 'Renseignements de facturation'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Description',
		ITEM : 'Article',
		LINETYPE : 'Type de poste',
		QUANTITY : 'Quantit\u00e9',
		STOREROOM : 'R\u00e9serve',
		BINNUM : 'Conteneur',
		CURBAL : 'Solde courant',
		UNITCOST : 'Co\u00fbt unitaire',
		ISSUETYPE : 'Type de probl\u00e8me',
		LOCATION : 'Emplacement',
		TOOLRATE : 'Tarifs pour l\'outil',
		ASSETNUM: 'Actif',
		TOOLHRS: 'Heures pour l\'outil',
		LINECOST: 'Co\u00fbt du poste',
		TOOLQTY: 'Quantit\u00e9 d\'outils'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Description',
		ITEM : 'Article',
		LINETYPE : 'Type de poste',
		QUANTITY : 'Quantit\u00E9',
		TOSTORELOC : 'Vers l\'emplacement',
		FROMSTORELOC : '\u00C0 partir de l\'emplacement',
		FROMSITE : '\u00C0 partir du site',
		TOSITE : 'Vers le site',
		TOBIN: 'Vers l\'unit\u00E9 de rangement',
		FROMBIN: '\u00C0 partir de l\'unit\u00E9 de rangement',
		UNITCOST : 'Co\u00FBt unitaire',
		ISSUETYPE : 'Type d\u2019\u00E9mission',
		CONVERSIONFACTOR : 'Facteur de conversion',
		ROTASSETNUM : 'Rotation des actifs',
		TRANSFEROUT : 'Transf\u00E9rer hors de',
		TRANSFERIN : 'Transf\u00E9rer dans',
		FROMQTY : '\u00C0 partir de la quantit\u00E9 de l\'unit\u00E9 de rangement',
		TOQTY : 'Vers la quantit\u00E9 de l\'unit\u00E9 de rangement',
		SITEID : 'Site',
		LOCATION : 'Emplacement',
		TRANSFERDETAILS: 'D\u00E9tails sur le transfert'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Actif',
		LOCATION : 'Emplacement',
		SEQUENCE : 'S\u00e9quence',
	},
	WORKLOG : {
		NAME : 'Journal de travail',
		DESCRIPTION : 'Description',
		DETAILS : 'D\u00e9tails',
		LOGTYPE : 'Type',
		CREATEBY : 'Cr\u00e9\u00e9 par',
		CREATEDATE : 'Date cr\u00e9\u00e9e'
	},
	SR : {
		ACTIVEREQS : 'Demandes de service actif',
		NEWREQS : 'Nouvelles demandes de service',
		AFFECTEDPERSON : 'Personne affect\u00e9e',
		DETAILS : 'D\u00e9tails',
		GLACCOUNT : 'Compte du grand livre',
		LOCATION : 'Emplacement',
		OWNER : 'Responsable',
		OWNERGROUP : 'Groupe responsable',
		REPORTEDPRIORITY : 'Priorit\u00e9 rapport\u00e9e',
		REPORTEDBY : 'Rapport par',
		REPORTDATE : 'Date du rapport',
		REPORTEDPHONE : 'T\u00e9l\u00e9phone rapport\u00e9',
		REPORTEDEMAIL : 'Courrier rapport\u00e9',
		SITE : 'Site',
		STATUS : '\u00c9tat',
		SR : 'Demande de service',
		SUMMARY : 'Sommaire',
		ASSETNUM : 'Actif',
		ASSETSITEID : 'Site de l\'actif',
	},
	INVBALANCES : {
		ITEMNUM : 'Article',
		DESCRIPTION : 'Description',
		BINNUM : 'Conteneur',
		CURBAL : 'Solde courant',
		PHYSCNT : 'Solde physique',
		PHYSCNTDATE : 'Date du compte physique',
		RECONCILED : 'Rapproch\u00e9',
		LOCATION : 'R\u00e9serve',
	},
	INVENTORY : {
		ITEMNUM : 'Article',
		DESCRIPTION : 'Description',
		SITEID : 'Site',
		STATUS : '\u00C9tat',
		LOCATION : 'R\u00E9serve',
		CATEGORY : 'Cat\u00E9gorie de stock',
		BINNUM : 'Conteneur par d\u00E9faut',
		ISSUEUNIT : 'Unit\u00E9 d\u2019\u00E9mission',
		CURBAL : 'Solde courant',
		LASTISSUEDATE : 'Derni\u00E8re date d\'\u00E9mission',
		ISSUEYTD : 'Cumul annuel',
		ISSUE1YRAGO : 'L\u2019an dernier',
		PHYSCNT : 'Compte physique',
		PHYSCNTDATE : 'Date du compte physique',
		RECONCILED : 'Rapproch\u00E9',
		TOTALINVPHYBAL : 'Solde physique',
		TOTALINVBAL : 'Solde courant',
		ISSUEHISTORY : 'Historique de l\'\u00E9mission',
		INVBALANCE : 'Solde des stocks',
		ADJCOUNT : 'Ajuster les comptes physiques pour ces {{count}} articles',
		BALSUMMARY : 'Sommaire du solde disponible',
	},
	METER : {
		ASSETNUM : 'Actif',
		METERNAME : 'Compteur',
		METERTYPE : 'Type de compteur',
		READINGTYPE : 'Type de lecture',
		LASTREADING : 'Derni\u00E8re lecture',
		LASTREADINGDATE : 'Date de la derni\u00E8re lecture',
		LASTREADINGINSPECTOR : 'Dernier inspecteur ayant fait une lecture',
		READING : 'Nouvelle lecture',
		NEWREADINGDATE : 'Date de la nouvelle lecture'
	},
	WPLABOR : {
		NAME : 'Main-d\'\u0153uvre planifi\u00e9e',
		LABORCODE : 'Main d\'\u0153uvre',
		CRAFT : 'M\u00e9tier',
		QUANTITY : 'Quantit\u00e9',
		LABORHRS : 'Heures normales',
		DISPLAYNAME : 'Nom',
		SKILLLEVEL: 'Niveau d\'aptitude',
		VENDOR : 'Fournisseur',
		AMCREW : '\u00c9quipe'
	},		
	WPMATERIAL : {
		NAME : 'Mat\u00e9riaux planifi\u00e9s',
		LINETYPE : 'Type de poste',
		ITEMNUM : 'Article',
		DESCRIPTION : 'Description',
		ITEMQTY : 'Quantit\u00e9',
		UNITCOST : 'Co\u00fbt unitaire',
		STOREROOM : 'R\u00e9serve',
		STORELOCSITE : 'Site de la r\u00e9serve',
		RESTYPE : 'Type de r\u00e9servation',
		REQUIREDATE : 'Date requise'
	},
	LABTRANS : {
		LABORCODE : 'Main d\'\u0153uvre',
		CRAFT : 'M\u00E9tier',
		STARTDATE : 'Date de d\u00E9but',
		TIMERSTATUS : '\u00C9tat de la minuterie',
		REGULARHRS : 'Heures normales',
		PAYRATE: 'Tarif',
		PREMIUMPAYCODE : 'Code de prime',
		PREMIUMPAYHOURS : 'Heures de la prime',
		PREMIUMPAYRATE: 'Tarif de la prime',
		WONUM : 'Ordre de travail (WO)',
		LOCATION : 'Emplacement',
		ASSETNUM : 'Actif',
		TICKETID: 'Billet'
	},
	LABREP : {
		LABORCODE : 'Main d\'\u0153uvre',
		CRAFT : 'M\u00E9tier',
		SKILLLEVEL : 'Niveau d\'aptitude',
		STARTDATE : 'Date de d\u00E9but',
		STARTTIME : 'Heure de d\u00E9but',
		FINISHDATE : 'Date de fin',
		FINISHTIME : 'Heure de fin',
		REGULARHRS : 'Heures normales',
		PAYRATE : 'Tarif',
		TRANSTYPE : 'Type',
		WONUM : 'Ordre de travail (WO)',
		LOCATION : 'Emplacement',
		ASSETNUM : 'Actif',
		GENAPPRSERVRECEIPT: 'Approuv\u00E9',
		NAME: 'Nom',
		TIMERSTATUS : '\u00C9tat de la minuterie',
		PREMIUMPAYHOURS : 'Heures de la prime',
		PREMIUMPAYRATE: 'Tarif de la prime',
		PREMIUMPAYCODE : 'Code de prime',
		TICKETID: 'Billet',
		TICKETCLASS: 'Classe du billet'
	},
	PERSON : {
		PERSONID: 'Personne',
		FIRSTNAME: 'Pr\u00e9nom',
		LASTNAME: 'Nom de famille'
	},
	FAILURECODE : {
		FAILURECODE : 'Classe d\'\u00e9checs',
		PROBLEMCODE : 'Probl\u00e8me',
		CAUSECODE : 'Cause',
		REMEDYCODE : 'Solution',
	},
	SPAREPART : {
		QUANTITY : 'Quantit\u00e9',
		ISSUEDQTY : 'Quantit\u00e9 \u00e9mise',
		REMARKS : 'Remarques',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Description',
		LONGDESCRIPTION : 'D\u00e9tails',
		ASSET : 'Actif',
		STATUS : '\u00c9tat',
		PARENT : 'OC parent',
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
		CHARGEINFO : 'Renseignements de facturation',
		REQUIREDDATE : 'Date requise',
		WONUM : 'Ordre de travail',
		LOCATION : 'Emplacement',
		ASSET : 'Actif',
		GLACCOUNT : 'Compte de d\u00e9bit du grand livre',
		MRLINES : 'Postes de demande',
		ENTERDATE : 'Date de saisie'
	},
	MRLINE : {
		MRLINEITEM : 'Article de demande',
		MRLINENUM : 'Ligne',
		LINETYPE : 'Type de poste',
		ITEM : 'Article',
		DESCRIPTION : 'Description',
		QTY : 'Quantit\u00e9',
		ORDERUNIT : 'Commander l\'unit\u00e9',
		UNITCOST : 'Co\u00fbt unitaire',
		LINECOST : 'Co\u00fbt du poste',
		REQUIREDDATE : 'Date requise'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Afficher les demandes envoy\u00e9es',
		VIEWSAVED : 'Afficher les demandes enregistr\u00e9es',
		EDIT : 'Modifier la demande'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Enregistrer en tant que brouillon',
		NEWREQITEM : 'Article de nouvelle demandes',
		SUBMIT : 'Envoyer'
	},
	CLASSIFY : {
		CLASSASSET : 'Classifier l\'actif',
		CLASSWO : 'Classifier l\'ordre de travail',
		DESCRIPTION : 'Classer la description',
		CLASSIFICATION : 'Classification'
	}
};
