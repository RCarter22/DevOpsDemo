'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: it_IT
 */
var locale = 'it_IT'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Imposta',
        cancelText: 'Annulla',
        clearText: 'Cancella',
        selectedText: 'Selezionato',
        // Calender component
        calendarText: 'Calendario',
        dateText: 'Data',
        timeText: 'Ora',
        // Datetime component
        dateFormat: 'dd/mm/y',
        dateOrder: 'ddmmy',
        dayNames: ['Domenica', 'Luned\u00ec', 'Marted\u00ec', 'Mercoled\u00ec', 'Gioved\u00ec', 'Venerd\u00ec', 'Sabato'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
        dayText: 'Giorno',
        hourText: 'Ore',
        minuteText: 'Minuti',
        monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Maggio', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
        monthText: 'Mese',
        secText: 'Secondi',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: 'Anno',
        nowText: 'Adesso',
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
		ZERO : "zero",
		ONE : "uno",
		TWO : "due",
		FEW : "alcuni",
		MANY : "molti",
		OTHER : "altro"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "AM", "PM" ],
			"DAY" : [ "domenica", "luned\u00ec", "marted\u00ec", "mercoled\u00ec", "gioved\u00ec", "venerd\u00ec", "sabato"],
			"MONTH" : [ "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre","dicembre"],
			"SHORTDAY" : [ "dom","lun","mar","mer","gio","ven","sab" ],
			"SHORTMONTH" : [ "gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic" ],
			"fullDate" : "EEEE d MMMM y",
		    "longDate" : "d MMMM y",
		    "medium" : "dd MMM y HH:mm:ss",
		    "mediumDate" : "dd MMM y",
		    "mediumTime" : "HH:mm:ss",
		    "short" : "dd/MM/yy HH:mm",
		    "shortDate" : "dd/MM/yy",
		    "shortTime" : "HH:mm"			
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
 * Language: IT
 */
var lang = 'IT'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Sincronizzazione completata con errori!  \u00c8 possibile provare a lavorare offline.',
	EMMOF1001W : 'Sincronizzazione completata con errori!  Effettuare una nuova sincronizzazione per abilitare la modalit\u00e0 offline.',
	EMMOF1002W : 'Sincronizzazione completata con errori!  \u00c8 possibile provare una nuova sincronizzazione o continuare a lavorare offline.',
	EMMOF1003W : 'Sincronizzazione completata con errori!  Provare una nuova sincronizzazione per lavorare offline.',
	EMMOF1004W : '{0} deve essere un numero',
	EMMOF1005W : 'Campi obbligatori mancanti: {0}',
	EMMOF1006W : 'L\u2019attributo {0} \u00e8 di sola lettura',
	EMMOF1007W : 'Selezionare un valore',
	EMMOF1008I : 'Stato modificato correttamente',
	EMMOF1009W : 'Specificare una quantit\u00e0 maggiore di zero',
	EMMOF1010W : '{0} deve essere maggiore di zero',
	EMMOF1011W : '{0} \u00e8 obbligatorio',
	EMMOF1012W : 'Nessun saldo presente per queste combinazioni di voce, deposito e contenitore',
	EMMOF1013W : 'Il saldo presente nel contenitore diverr\u00E0 negativo a seguito di questa transazione',
	EMMOF1014W : 'Impossibile effettuare il trasferimento quando sedi, numeri di contenitori e ID di siti sono tutti identici',
	// [WF]		
	EMMWF1000I : 'Avvia workflow',
	EMMWF1001I : '\u00c8 disponibile pi\u00f9 di un processo workflow per questa applicazione.  Selezionarne uno e premere OK.',
	EMMWF1002I : 'Selezionare un processo',
	EMMWF1003I : 'Processo',
	EMMWF1004I : 'Memo',
	EMMWF1005I : 'Arresta workflow',
	// [ES]
	EMMES1000I : 'Firma autorizzazione',
	EMMES1001I : '\u00c8 richiesta una firma elettronica',
	EMMES1002E : 'Autorizzazione non riuscita',
	EMMES1003I : 'Inserire una password e un motivo',
	EMMES1004I : 'Utente',
	EMMES1005I : 'Password',
	EMMES1006I : 'Motivo',
	// [GB]
	EMMGB1001I : 'E-mail',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Annulla',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Conferma',
	EMMGB1006I : 'S\u00ec',
	EMMGB1007I : 'No',
	EMMGB1008I : 'Telefono',
	EMMGB1009I : 'Chiamata',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Confermare eliminazione?',
	EMMGB1012I : '{0} deve verificarsi prima di {1}',
	EMMGB1013I : '{0} deve verificarsi dopo di {1}',
	EMMGB1014I : '{0} deve verificarsi nel passato',
	// General	
	OFFLINEMODE : 'Modalit\u00e0 offline',
	SYNCNEEDED : '- Modificato, richiesta sincronizzazione',
	SYNCHRONIZATION : 'Sincronizzazione',
	SYNCSERVER : 'Sincronizza con server',
	ENTERLABOR: 'Inserisci per manodopera',
	ADDMORE: 'Aggiungi altro...',
	GOONLINE : 'Ritorna online',
	GOTOOFFLINEAPPS : 'Vai ad applicazioni offline',
	OFFLINEAPPS : 'Applicazioni offline',
	QUICKSCAN : 'Scansione rapida:',
	ACTIVEWORKORDERS : 'Ordini di lavoro attivi',
	RECORDSAVED: 'Record salvato',
	RECORDNOTSAVED: 'Errore - Nessun record restituito',
	TIMERALREADYSTARTED: 'Timer gi\u00e0 avviato',
	TIMERNOTFOUND : 'Timer non avviato. Nessun timer attivo trovato.',
	TIMERSTARTED : 'Timer avviato',
	TIMERSTOPPED : 'Timer arrestato',
	TOOLS : 'Strumenti',
	STARTTIMER : 'Avvia timer',
	STOPTIMER : 'Arresta timer',
	MODIFYSAVE : 'Record modificato.  Salvare le modifiche.',
	SITEREQUIRED : '\u00c8 richiesto il sito per creare l\u2019ordine di lavoro.',
	NOVALUE : 'Valore vuoto',
	ACTIONS : 'Azioni',
	CHILDRENOF : 'Componenti secondari di',
	RESPONSIBILITY : 'Responsabilit\u00e0',
	LOOKUP : 'Ricerca',
	LOCATIONDRILLDOWN : 'Drilldown sedi',
	ASSETDRILLDOWN : 'Drilldown asset',
	DRILLDOWN : 'Drilldown',
	BACK : 'Indietro',
	SAVE : 'Salva',
	APPLY : 'Applica',
	FILTER : 'Filtra',
	RESET : 'Reimposta',
	SELECTVALUE : 'Seleziona valore',
	CANCEL : 'Annulla',
	OK : 'OK',
	YES : 'S\u00ec',
	NO : 'No',
	CREATEFOLLOWUP : 'Crea follow-up',
	CREATESR : 'Crea nuova richiesta di servizio',
	PARENT : 'Componente principale',
	CHANGESTATUS : 'Cambia stato',
	LABOR : 'Manodopera',
	MATERIALS : 'Materiali',
	TASKS : 'Attivit\u00e0',
	ATTACHMENTS : 'Allegati',
	FAILUREREPORTING : 'Errore di reporting',
	MULTIASSETS : 'Asset, sedi multiple',
	ADDNEW : 'Aggiungi nuovo',
	CLASSIFICATION : 'Classificazione',
	NORECORDS : 'Nessun record trovato',
	NORECORDEXIST : 'Nessun record trovato o non pi\u00f9 esistente',
	NORECORDSADJ : 'Nessun record per adattare i conteggi fisici',
	SELECTOWNER : 'Seleziona proprietario',
	OWNER : 'Proprietario',
	OWNERGROUP : 'Gruppo di proprietari',
	TAKEOWNERSHIP : 'Assumi propriet\u00e0',
	SORTBY : 'Ordina per',
	LIST : 'Elenca',
	QUICKSEARCH: 'Ricerca rapida',
	INVENTORYBYSR : 'Inventario per deposito',
	INVDETAILS : 'Dettagli inventario',
	NEWCOUNT : 'Nuovo conteggio',
	LABORTRANS : 'Transazioni manodopera',
	CREATEWO : 'Crea nuovo ordine di lavoro',
	MYWOS : 'Miei ordini di lavoro',
	FAILUREREPORT : 'Errore di reporting',
	METERREADINGS : 'Inserisci letture contatori',
	ASSETMETER : 'Asset letture contatori',
	LOCATIONMETER : 'Sede letture contatori',
	FROM : 'Da',
	TO : 'A',
	ADVANCED : 'Avanzata',
	ADVANCEDSEARCH : 'Ricerca avanzata',
	DOWNTIME : 'Inattivit\u00e0',
	PURCHASEINFO : 'Informazioni su acquisti',
	SPAREPARTS : 'Parti di ricambio',
	SCHEDULEINFO : 'Info pianificazione',
	PLANLABOR : 'Pianifica manodopera',
	PLANMATERIAL : 'Materiali pianificati',
	WOCREATED : 'Ordine di lavoro {0} creato.',
	PRESTART : 'Preavvio',
	REVIEWANDAPPROVE : 'Rivedi e approva',
	MOCACTIONGROUP : 'Seleziona gruppo di azione MOC',
	MOCACTIONS : 'Seleziona azioni MOC',
	REVIEWERSAVED : 'Esaminatori salvati offline.',
	APPROVERSAVED : 'Approvatori salvati offline.',
	ACTIONSAVED : 'Azioni salvate offline.',
	NOACTIONS : 'Il gruppo di azioni standard {0} non ha azioni standard valide da aggiungere.',
	SRQUEUED : 'Stato {0} SR cambiato in QUEUED.',
	SELECTREVIEWERS : 'Seleziona esaminatori',
	SELECTAPPROVERS : 'Seleziona approvatori',
	APPROVERS : 'Approvatori',
	REVIEWERS : 'Esaminatori',
	VIEWLIST: 'Visualizza elenco',
	VIEWSUMMARY : 'Visualizza riepilogo',
	STOREROOMS : 'Depositi',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Vai a',
	APPS : 'App',
	STARTCENTER : 'Centro iniziale',
	PAGINATION : {
		TITLE : 'Pagina {{from}} di {{to}} - {{total}} Records',
		PREV : 'Indietro',
		NEXT : 'Avanti'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Sede',
		ASSET : 'Asset',
		WOTRACK : 'Tracciatura ordine di lavoro',
		SR : 'Richieste di servizi',
		INVENTOR: 'Inventario',
		INVISSUE: 'Rilasci e trasferimenti',
		MOC : 'MOC (petrolio)',
		CREATEDR : 'Crea richiesta di approvv.',
		VIEWDR : 'Visualizza richieste di approvv.',
		LABREP: 'Reporting manodopera',
		TXNTRACK : 'Risoluzione sincronizzazione'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'N. asset',
		STATUS : 'Stato',
		STATUSDATE: 'Data ultima modifica',
		INSTALLDATE: 'Data installazione',
		SITEID : 'Sito',
		PARENT : 'Componente principale',
		ASSETTYPE: 'Tipo',
		LONGDESCRIPTION : 'Dettagli',
		GROUPNAME: 'Gruppo contatori',
		SERIALNUM: 'N. serie',
		PURCHASEPRICE: 'Prezzo di acquisto',
		TOTDOWNTIME: 'Tempo totale inattivit\u00e0',
		ISRUNNING: 'Asset attivi',
		VENDOR: 'Fornitore',
		MANUFACTURER: 'Produttore',
		FAILURECODE: 'Classe di errore',
		DESCRIPTION : 'Descrizione',
		LOCATION : 'Sede',
		LOCDESC : 'Dettagli',
		SEQUENCE : 'Sequenza',
		PROGRESS : 'Segnare avanzamento?',
		COMMENTS : 'Commenti',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Ordine di lavoro',
		DESCRIPTION : 'Descrizione',
		LONGDESCRIPTION : 'Dettagli',
		STATUS : 'Stato',
		PARENT : 'OL principale',
		SITEID : 'Sito',
		LOCATION : 'Sede',
		ASSETNUM : 'Asset',
		WORKTYPE : 'Tipo di lavoro',
		WOPRIORITY : 'Priorit\u00E0',
		GLACCOUNT : 'Conto CG',
		FAILURECODE : 'Classe di errore',
		PROBLEMCODE : 'Codice problema',
		SUPERVISOR : 'Supervisore',
		CREWID : 'Personale',
		LEAD : 'Direttore',
		PERSONGROUP : 'Gruppo di lavoro',
		REPORTEDBY : 'Segnalato da',
		REPORTDATE : 'Data segnalazione',
		PHONE : 'Telefono',
		TASKID : 'Attivit\u00E0',
		TARGSTARTDATE : 'Inizio target',
		TARGCOMPDATE : 'Fine target',
		SCHEDSTART : 'Inizio programmato',
		SCHEDFINISH : 'Fine programmata',
		ACTSTART : 'Inizio effettivo',
		ACTFINISH : 'Fine effettiva',
		ASSIGNMENT : 'Manodopera assegnata',
		OWNER : 'Proprietario',
		OWNERGROUP : 'Gruppo di proprietari',
		OBSERVATION : 'Osservazione',
		MEASUREMENTVALUE : 'Valore di misurazione',
		HAZARDS: 'Pericoli',
		HAZARDSMAT: 'Materiali pericolosi',
		PRECAUTIONS: 'Precauzioni',
		LOCKTAG: 'Blocca/Escludi',
		TAGOUT: 'Esclusioni',
		LOCKOUT: 'Blocco',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Descrizione',
		ITEM : 'Voce',
		LINETYPE : 'Tipo di riga',
		QUANTITY : 'Quantit\u00E0',
		STOREROOM : 'Deposito',
		STORELOC : 'Deposito',
		BINNUM : 'Contenitore',
		CURBAL : 'Saldo corrente',
		UNITCOST : 'Costo unitario',
		ASSET : 'Asset',
		WORKORDER : 'Ordine di lavoro',
		LOCATION : 'Sede',
		ISSUETYPE : 'Tipo di rilascio',
		ISSUETO : 'Rilasciato a',
		ROTASSETNUM : 'Asset in rotazione',
		SITEID : 'Sito',
		ISSUERETURN : 'Rilasci e restituzioni',
		CHARGEINFO : 'Informazioni di spesa'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Descrizione',
		ITEM : 'Voce',
		LINETYPE : 'Tipo di riga',
		QUANTITY : 'Quantit\u00e0',
		STOREROOM : 'Deposito',
		BINNUM : 'Contenitore',
		CURBAL : 'Saldo corrente',
		UNITCOST : 'Costo unitario',
		ISSUETYPE : 'Tipo di rilascio',
		LOCATION : 'Sede',
		TOOLRATE : 'Velocit\u00e0 strumento',
		ASSETNUM: 'Asset',
		TOOLHRS: 'Ore strumento',
		LINECOST: 'Costo linea',
		TOOLQTY: 'Quantit\u00e0 strumento'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Descrizione',
		ITEM : 'Voce',
		LINETYPE : 'Tipo di riga',
		QUANTITY : 'Quantit\u00E0',
		TOSTORELOC : 'A sede',
		FROMSTORELOC : 'Da sede',
		FROMSITE : 'Da sito',
		TOSITE : 'A sito',
		TOBIN: 'A contenitore',
		FROMBIN: 'Da contenitore',
		UNITCOST : 'Costo unitario',
		ISSUETYPE : 'Tipo di rilascio',
		CONVERSIONFACTOR : 'Fattore di conversione',
		ROTASSETNUM : 'Asset in rotazione',
		TRANSFEROUT : 'Trasferimento esterno',
		TRANSFERIN : 'Trasferimento interno',
		FROMQTY : 'Quantit\u00E0 da contenitore',
		TOQTY : 'Quantit\u00E0 a contenitore',
		SITEID : 'Sito',
		LOCATION : 'Sede',
		TRANSFERDETAILS: 'Dettagli trasferimento'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Asset',
		LOCATION : 'Sede',
		SEQUENCE : 'Sequenza',
	},
	WORKLOG : {
		NAME : 'Registro di lavoro',
		DESCRIPTION : 'Descrizione',
		DETAILS : 'Dettagli',
		LOGTYPE : 'Tipo',
		CREATEBY : 'Creato da',
		CREATEDATE : 'Data creazione'
	},
	SR : {
		ACTIVEREQS : 'Richieste di servizi attive',
		NEWREQS : 'Nuove richieste di servizi',
		AFFECTEDPERSON : 'Persona interessata',
		DETAILS : 'Dettagli',
		GLACCOUNT : 'Conto CG',
		LOCATION : 'Sede',
		OWNER : 'Proprietario',
		OWNERGROUP : 'Gruppo di proprietari',
		REPORTEDPRIORITY : 'Priorit\u00e0 segnalata',
		REPORTEDBY : 'Segnalato da',
		REPORTDATE : 'Data report',
		REPORTEDPHONE : 'Telefono segnalato',
		REPORTEDEMAIL : 'Mail segnalata',
		SITE : 'Sito',
		STATUS : 'Stato',
		SR : 'Richiesta di servizi',
		SUMMARY : 'Riepilogo',
		ASSETNUM : 'Asset',
		ASSETSITEID : 'Sito asset',
	},
	INVBALANCES : {
		ITEMNUM : 'Voce',
		DESCRIPTION : 'Descrizione',
		BINNUM : 'Contenitore',
		CURBAL : 'Saldo corrente',
		PHYSCNT : 'Saldo fisico',
		PHYSCNTDATE : 'Data conteggio fisico',
		RECONCILED : 'Riconciliato',
		LOCATION : 'Deposito',
	},
	INVENTORY : {
		ITEMNUM : 'Voce',
		DESCRIPTION : 'Descrizione',
		SITEID : 'Sito',
		STATUS : 'Stato',
		LOCATION : 'Deposito',
		CATEGORY : 'Categoria di stock',
		BINNUM : 'Contenitore predefinito',
		ISSUEUNIT : 'Unit\u00E0 rilascio',
		CURBAL : 'Saldo corrente',
		LASTISSUEDATE : 'Data ultimo rilascio',
		ISSUEYTD : 'Da inizio anno',
		ISSUE1YRAGO : 'Ultimo anno',
		PHYSCNT : 'Conteggio fisico',
		PHYSCNTDATE : 'Data conteggio fisico',
		RECONCILED : 'Riconciliato',
		TOTALINVPHYBAL : 'Saldo fisico',
		TOTALINVBAL : 'Saldo corrente',
		ISSUEHISTORY : 'Cronologia rilasci',
		INVBALANCE : 'Saldi di inventario',
		ADJCOUNT : 'Adatta conteggi fisici a queste {{count}} voci',
		BALSUMMARY : 'Riepilogo saldo disponibile',
	},
	METER : {
		ASSETNUM : 'Asset',
		METERNAME : 'Contatore',
		METERTYPE : 'Tipo di contatore',
		READINGTYPE : 'Tipo di lettura',
		LASTREADING : 'Ultima lettura',
		LASTREADINGDATE : 'Data ultima lettura',
		LASTREADINGINSPECTOR : 'Ispettore ultima lettura',
		READING : 'Nuova lettura',
		NEWREADINGDATE : 'Data nuova lettura'
	},
	WPLABOR : {
		NAME : 'Manodopera pianificata',
		LABORCODE : 'Manodopera',
		CRAFT : 'Specialit\u00e0',
		QUANTITY : 'Quantit\u00e0',
		LABORHRS : 'Ore regolari',
		DISPLAYNAME : 'Nome',
		SKILLLEVEL: 'Livello di competenza',
		VENDOR : 'Fornitore',
		AMCREW : 'Personale'
	},		
	WPMATERIAL : {
		NAME : 'Materiali pianificati',
		LINETYPE : 'Tipo di riga',
		ITEMNUM : 'Voce',
		DESCRIPTION : 'Descrizione',
		ITEMQTY : 'Quantit\u00e0',
		UNITCOST : 'Costo unitario',
		STOREROOM : 'Deposito',
		STORELOCSITE : 'Sito deposito',
		RESTYPE : 'Tipo di riserva',
		REQUIREDATE : 'Data richiesta'
	},
	LABTRANS : {
		LABORCODE : 'Manodopera',
		CRAFT : 'Specialit\u00E0',
		STARTDATE : 'Data di inizio',
		TIMERSTATUS : 'Stato timer',
		REGULARHRS : 'Ore regolari',
		PAYRATE: 'Tariffa',
		PREMIUMPAYCODE : 'Codice pagamento premio',
		PREMIUMPAYHOURS : 'Ore pagamento premio',
		PREMIUMPAYRATE: 'Tariffa pagamento premio',
		WONUM : 'Ordine di lavoro',
		LOCATION : 'Sede',
		ASSETNUM : 'Asset',
		TICKETID: 'Ticket'
	},
	LABREP : {
		LABORCODE : 'Manodopera',
		CRAFT : 'Specialit\u00E0',
		SKILLLEVEL : 'Livello di competenza',
		STARTDATE : 'Data di inizio',
		STARTTIME : 'Ora di inizio',
		FINISHDATE : 'Data di fine',
		FINISHTIME : 'Ora di fine',
		REGULARHRS : 'Ore regolari',
		PAYRATE : 'Tariffa',
		TRANSTYPE : 'Tipo',
		WONUM : 'Ordine di lavoro',
		LOCATION : 'Sede',
		ASSETNUM : 'Asset',
		GENAPPRSERVRECEIPT: 'Approvato',
		NAME: 'Nome',
		TIMERSTATUS : 'Stato timer',
		PREMIUMPAYHOURS : 'Ore pagamento premio',
		PREMIUMPAYRATE: 'Tariffa pagamento premio',
		PREMIUMPAYCODE : 'Codice pagamento premio',
		TICKETID: 'Ticket',
		TICKETCLASS: 'Classe di ticket'
	},
	PERSON : {
		PERSONID: 'Persona',
		FIRSTNAME: 'Nome',
		LASTNAME: 'Cognome'
	},
	FAILURECODE : {
		FAILURECODE : 'Classe di errore',
		PROBLEMCODE : 'Problema',
		CAUSECODE : 'Causa',
		REMEDYCODE : 'Rimedio',
	},
	SPAREPART : {
		QUANTITY : 'Quantit\u00e0',
		ISSUEDQTY : 'Qt\u00e0 rilasciata',
		REMARKS : 'Annotazioni',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Descrizione',
		LONGDESCRIPTION : 'Dettagli',
		ASSET : 'Asset',
		STATUS : 'Stato',
		PARENT : 'OL principale',
		SITE : 'Sito',
		LOCATION : 'Sede',
	},
	DOMAIN : {
		VALUE: 'Valore',
		DESCRIPTION: 'Descrizione',
	},
	MR : {
		MRNUM : 'Richiesta di approvvigionamento',
		DESCRIPTION : 'Descrizione',
		LONGDESCRIPTION : 'Descrizione lunga',
		STATUS : 'Stato',
		PRIORITY : 'Priorit\u00e0',
		CHARGEINFO : 'Informazioni di spesa',
		REQUIREDDATE : 'Data richiesta',
		WONUM : 'Ordine di lavoro',
		LOCATION : 'Sede',
		ASSET : 'Asset',
		GLACCOUNT : 'Conto di addebito CG',
		MRLINES : 'Voci richiesta di approvv.',
		ENTERDATE : 'Data inserimento'
	},
	MRLINE : {
		MRLINEITEM : 'Voce richiesta di approvv.',
		MRLINENUM : 'Linea',
		LINETYPE : 'Tipo di riga',
		ITEM : 'Voce',
		DESCRIPTION : 'Descrizione',
		QTY : 'Quantit\u00e0',
		ORDERUNIT : 'Unit\u00e0 ordine',
		UNITCOST : 'Costo unitario',
		LINECOST : 'Costo linea',
		REQUIREDDATE : 'Data richiesta'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Visualizza richieste di approvv. inviate',
		VIEWSAVED : 'Visualizza richieste di approvv. salvate',
		EDIT : 'Modifica richiesta di approvv.'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Salva come bozza',
		NEWREQITEM : 'Nuova voce richiesta di approvv.',
		SUBMIT : 'Invia'
	},
	CLASSIFY : {
		CLASSASSET : 'Classifica asset',
		CLASSWO : 'Classifica ordine di lavoro',
		DESCRIPTION : 'Descrizione classe',
		CLASSIFICATION : 'Classificazione'
	}
};