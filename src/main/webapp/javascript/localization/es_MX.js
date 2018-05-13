'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: es_MX
 */
var locale = 'es_MX'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Establecer',
        cancelText: 'Cancelar',
        clearText: 'Borrar',
        selectedText: 'Seleccionado',
        // Calender component
        calendarText: 'Calendario',
        dateText: 'Fecha',
        timeText: 'Hora',
        // Datetime component
        dateFormat: 'dd/mm/y',
        dateOrder: 'dmy',
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi\u00e9rcoles', 'Jueves', 'Viernes', 'S\u00e1bado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'S\u00e1b'],
        dayText: 'D\u00eda',
        hourText: 'Horas',
        minuteText: 'Minutos',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthText: 'Mes',
        secText: 'Segundos',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'H:ii',
        timeWheels: 'Hii',
        yearText: 'A\u00f1o',
        nowText: 'Ahora',
	},
	numeral : {
	    delimiters: {
	        thousands: ',',
	        decimal: '.'
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
		ZERO : "cero",
		ONE : "uno",
		TWO : "dos",
		FEW : "pocos",
		MANY : "muchos",
		OTHER : "otro"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "a. m.", "p. m." ],
			"DAY" : [ "domingo", "lunes", "martes", "mi\u00e9rcoles", "jueves", "viernes", "s\u00e1bado" ],
			"MONTH" : [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ],
			"SHORTDAY" : [ "dom.", "lun.", "mar.", "mi\u00e9.", "jue.", "vie.", "s\u00e1b." ],
			"SHORTMONTH" : [ "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic" ],
			"fullDate" : "EEEE, d 'de' MMMM 'de' y",
			"longDate" : "d 'de' MMMM 'de' y",
			"medium": "dd/MM/y H:mm:ss",
			"mediumDate" : "dd/MM/y",
			"mediumTime" : "H:mm:ss",
			"short" : "dd/MM/yy H:mm",
			"shortDate" : "dd/MM/yy",
			"shortTime" : "H:mm"			
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "$",
		    "DECIMAL_SEP": ".",
			"GROUP_SEP": ",",
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
 * Language: ES
 */
var lang = 'ES'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : '\u00a1Sinc completada con errores!  Todav\u00eda puede intentar trabajar fuera de l\u00ednea.',
	EMMOF1001W : '\u00a1Sinc completada con errores!  Sincronice de nuevo para habilitar el modo fuera de l\u00ednea.',
	EMMOF1002W : '\u00a1Sinc completada con errores!  Puede intentar sincronizar de nuevo o seguir trabajando fuera de l\u00ednea.',
	EMMOF1003W : '\u00a1Sinc completada con errores!  Intente sincronizar de nuevo para trabajar fuera de l\u00ednea.',
	EMMOF1004W : '{0} tiene que ser un n\u00famero',
	EMMOF1005W : 'Campos requeridos faltantes: {0}',
	EMMOF1006W : 'El atributo {0} es solo de lectura',
	EMMOF1007W : 'Seleccione un valor',
	EMMOF1008I : 'El estado se cambi\u00f3 con \u00e9xito',
	EMMOF1009W : 'Especifique una cantidad mayor que cero',
	EMMOF1010W : '{0} tiene que ser mayor que cero',
	EMMOF1011W : 'se requiere {0}',
	EMMOF1012W : 'No existen saldos para este art\u00EDculo, dep\u00F3sito y combinaciones de papelera.',
	EMMOF1013W : 'El saldo en la papelera ser\u00E1 negativo como resultado de esta transacci\u00F3n.',
	EMMOF1014W : 'No se puede transferir cuando las ubicaciones, los n\u00FAmeros de papeleras y las identificaciones de los sitios son id\u00E9nticos.',
	// [WF]		
	EMMWF1000I : 'Iniciar flujo de trabajo',
	EMMWF1001I : 'Hay m\u00e1s que un proceso de flujo de trabajo disponible para esta aplicaci\u00f3n.  Seleccione uno y presione Aceptar.',
	EMMWF1002I : 'Seleccione un proceso',
	EMMWF1003I : 'Proceso',
	EMMWF1004I : 'Memo',
	EMMWF1005I : 'Detener flujo de trabajo',
	// [ES]
	EMMES1000I : 'Autorizaci\u00f3n de firma electr\u00f3nica',
	EMMES1001I : 'Se requiere una firma electr\u00f3nica',
	EMMES1002E : 'Autorizaci\u00f3n fallida',
	EMMES1003I : 'Ingrese una contrase\u00f1a y raz\u00f3n',
	EMMES1004I : 'Usuario',
	EMMES1005I : 'Contrase\u00f1a',
	EMMES1006I : 'Raz\u00f3n',
	// [GB]
	EMMGB1001I : 'Correo electr\u00f3nico',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Cancelar',
	EMMGB1004I : 'Aceptar',
	EMMGB1005I : 'Confirmar',
	EMMGB1006I : 'S\u00ed',
	EMMGB1007I : 'No',
	EMMGB1008I : 'Tel\u00e9fono',
	EMMGB1009I : 'Llamar',
	EMMGB1010I : 'SMS',
	EMMGB1011I : '\u00bfConfirmar borrado?',
	EMMGB1012I : '{0} tiene que ocurrir antes de {1}',
	EMMGB1013I : '{0} tiene que ocurrir despu\u00e9s de {1}',
	EMMGB1014I : '{0} tiene que ocurrir en el pasado',
	// General	
	OFFLINEMODE : 'Modo fuera de l\u00ednea',
	SYNCNEEDED : '- Modificado, se necesita sincronizaci\u00f3n',
	SYNCHRONIZATION : 'Sincronizaci\u00f3n',
	SYNCSERVER : 'Sinc con el servidor',
	ENTERLABOR: 'Ingresar por mano de obra',
	ADDMORE: 'Agregar m\u00E1s...',
	GOONLINE : 'Regresar en l\u00ednea',
	GOTOOFFLINEAPPS : 'Ir a aplicaciones fuera de l\u00ednea',
	OFFLINEAPPS : 'Aplicaciones fuera de l\u00ednea',
	QUICKSCAN : 'Exploraci\u00f3n r\u00e1pida',
	ACTIVEWORKORDERS : '\u00d3rdenes de trabajo activas',
	RECORDSAVED: 'Registro guardado',
	RECORDNOTSAVED: 'Error - No se devolvi\u00f3 registro',
	TIMERALREADYSTARTED: 'El temporizador ya ha iniciado.',
	TIMERNOTFOUND : 'Temporizador no iniciado. No se encontr\u00f3 un temporizador activo.',
	TIMERSTARTED : 'Temporizador iniciado',
	TIMERSTOPPED : 'Temporizador detenido',
	TOOLS : 'Herramientas',
	STARTTIMER : 'Iniciar temporizador',
	STOPTIMER : 'Detener temporizador',
	MODIFYSAVE : 'Registro modificado.  Guarde sus cambios.',
	SITEREQUIRED : 'El sitio tiene que crear la Orden de trabajo.',
	NOVALUE : 'Valor vac\u00edo',
	ACTIONS : 'Acciones',
	CHILDRENOF : 'Secundarios de',
	RESPONSIBILITY : 'Responsabilidad',
	LOOKUP : 'B\u00fasqueda',
	LOCATIONDRILLDOWN : 'Desglose de ubicaciones',
	ASSETDRILLDOWN : 'Desglose de activos',
	DRILLDOWN : 'Desglose',
	BACK : 'Atr\u00e1s',
	SAVE : 'Guardar',
	APPLY : 'Aplicar',
	FILTER : 'Filtro',
	RESET : 'Restablecer',
	SELECTVALUE : 'Seleccionar valor',
	CANCEL : 'Cancelar',
	OK : 'Aceptar',
	YES : 'S\u00ed',
	NO : 'No',
	CREATEFOLLOWUP : 'Crear seguimiento',
	CREATESR : 'Crear nueva solicitud de servicio',
	PARENT : 'Principal',
	CHANGESTATUS : 'Cambiar estado',
	LABOR : 'Mano de obra',
	MATERIALS : 'Materiales',
	TASKS : 'Tareas',
	ATTACHMENTS : 'Adjuntos',
	FAILUREREPORTING : 'Elaboraci\u00f3n de informe de fallas',
	MULTIASSETS : 'M\u00faltiples activos, ubicaciones',
	ADDNEW : 'Agregar nuevo',
	CLASSIFICATION : 'Clasificaci\u00f3n',
	NORECORDS : 'No se encontraron registros',
	NORECORDEXIST : 'No se encontraron registros o ya no existen',
	NORECORDSADJ : 'No hay registros para ajustar los conteos f\u00edsicos',
	SELECTOWNER : 'Seleccionar propietario',
	OWNER : 'Propietario',
	OWNERGROUP : 'Grupo de propietarios',
	TAKEOWNERSHIP : 'Tomar propiedad',
	SORTBY : 'Ordenado por',
	LIST : 'Lista',
	QUICKSEARCH: 'B\u00fasqueda r\u00e1pida',
	INVENTORYBYSR : 'Inventario por almac\u00e9n',
	INVDETAILS : 'Detalles del inventario',
	NEWCOUNT : 'Nuevo conteo',
	LABORTRANS : 'Transacciones de mano de obra',
	CREATEWO : 'Crear nueva orden de trabajo',
	MYWOS : 'Mis \u00f3rdenes de trabajo',
	FAILUREREPORT : 'Elaboraci\u00f3n de informe de fallas',
	METERREADINGS : 'Ingresar lecturas del medidor',
	ASSETMETER : 'Lecturas del medidor de activos',
	LOCATIONMETER : 'Lecturas del medidor de ubicaci\u00f3n',
	FROM : 'De',
	TO : 'A',
	ADVANCED : 'Avanzado',
	ADVANCEDSEARCH : 'B\u00fasqueda avanzada',
	DOWNTIME : 'Tiempo de inactividad',
	PURCHASEINFO : 'Informaci\u00f3n de compra',
	SPAREPARTS : 'Piezas de repuesto',
	SCHEDULEINFO : 'programar informaci\u00f3n',
	PLANLABOR : 'Planificar mano de obra',
	PLANMATERIAL : 'Materiales planificados',
	WOCREATED : 'Orden de trabajo {0} creada.',
	PRESTART : 'Inicio previo',
	REVIEWANDAPPROVE : 'Revisar y aprobar',
	MOCACTIONGROUP : 'Seleccionar grupo de acci\u00f3n de MOC',
	MOCACTIONS : 'Seleccionar acciones de MOC',
	REVIEWERSAVED : 'Revisor(es) guardados fuera de l\u00ednea.',
	APPROVERSAVED : 'Aprobador(es) guardados fuera de l\u00ednea.',
	ACTIONSAVED : 'Acci\u00f3n(es) guardadas fuera de l\u00ednea.',
	NOACTIONS : 'El grupo de acci\u00f3n est\u00e1ndar {0} no tiene acciones est\u00e1ndar v\u00e1lidas para agregar.',
	SRQUEUED : 'El estado de SR {0} cambi\u00f3 para PONERLO EN COLA.',
	SELECTREVIEWERS : 'Seleccionar revisores',
	SELECTAPPROVERS : 'Seleccionar aprobadores',
	APPROVERS : 'Aprobadores',
	REVIEWERS : 'Revisores',
	VIEWLIST: 'Ver lista',
	VIEWSUMMARY : 'Ver resumen',
	STOREROOMS : 'Dep\u00F3sitos',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Ir a',
	APPS : 'Aplicaciones',
	STARTCENTER : 'Iniciar centro',
	PAGINATION : {
		TITLE : 'P\u00e1gina {{from}} de {{to}} - {{total}} Registros',
		PREV : 'Prev',
		NEXT : 'Siguiente'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Ubicaci\u00F3n',
		ASSET : 'Activo',
		WOTRACK : 'Seguimiento de la orden de trabajo',
		SR : 'Solicitudes de servicio',
		INVENTOR: 'Inventario',
		INVISSUE: 'Problemas y transferencias',
		MOC : 'MOC (aceite)',
		CREATEDR : 'Crear petici\u00F3n',
		VIEWDR : 'Ver peticiones',
		LABREP: 'Elaboraci\u00F3n del informe de mano de obra',
		TXNTRACK : 'Resoluci\u00F3n de la sincronizaci\u00F3n'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'N.\u00b0 de activo',
		STATUS : 'Estado',
		STATUSDATE: 'Fecha del \u00faltimo cambio',
		INSTALLDATE: 'Fecha de instalaci\u00f3n',
		SITEID : 'Sitio',
		PARENT : 'Principal',
		ASSETTYPE: 'Tipo',
		LONGDESCRIPTION : 'Detalles',
		GROUPNAME: 'Grupo de medidor',
		SERIALNUM: 'N.\u00b0 de serie',
		PURCHASEPRICE: 'Precio de compra',
		TOTDOWNTIME: 'Tiempo de inactividad total',
		ISRUNNING: 'Activo',
		VENDOR: 'Proveedor',
		MANUFACTURER: 'Fabricante',
		FAILURECODE: 'Clase de falla',
		DESCRIPTION : 'Descripci\u00f3n',
		LOCATION : 'Ubicaci\u00f3n',
		LOCDESC : 'Detalles',
		SEQUENCE : 'Secuencia',
		PROGRESS : '\u00bfMarcar el progreso?',
		COMMENTS : 'Comentarios',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Orden de trabajo',
		DESCRIPTION : 'Descripci\u00F3n',
		LONGDESCRIPTION : 'Detalles',
		STATUS : 'Estado',
		PARENT : 'WO principal',
		SITEID : 'Sitio',
		LOCATION : 'Ubicaci\u00F3n',
		ASSETNUM : 'Activo',
		WORKTYPE : 'Tipo de trabajo',
		WOPRIORITY : 'Prioridad',
		GLACCOUNT : 'Cuenta de libro mayor',
		FAILURECODE : 'Clase de falla',
		PROBLEMCODE : 'C\u00F3digo del problema',
		SUPERVISOR : 'Supervisor',
		CREWID : 'Equipo',
		LEAD : 'Director',
		PERSONGROUP : 'Grupo de trabajo',
		REPORTEDBY : 'Informado por',
		REPORTDATE : 'Fecha del informe',
		PHONE : 'Tel\u00E9fono',
		TASKID : 'Tarea',
		TARGSTARTDATE : 'Inicio del objetivo',
		TARGCOMPDATE : 'Finalizaci\u00F3n del objetivo',
		SCHEDSTART : 'Inicio programado',
		SCHEDFINISH : 'Finalizaci\u00F3n programada',
		ACTSTART : 'Inicio real',
		ACTFINISH : 'Finalizaci\u00F3n real',
		ASSIGNMENT : 'Mano de obra asignada',
		OWNER : 'Propietario',
		OWNERGROUP : 'Grupo de propietarios',
		OBSERVATION : 'Observaci\u00F3n',
		MEASUREMENTVALUE : 'Valor de la medici\u00F3n',
		HAZARDS: 'Peligros',
		HAZARDSMAT: 'Materiales peligrosos',
		PRECAUTIONS: 'Precauciones',
		LOCKTAG: 'Bloqueo/Etiquetado',
		TAGOUT: 'Etiquetados',
		LOCKOUT: 'Bloqueo',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Descripci\u00F3n',
		ITEM : 'Art\u00EDculo',
		LINETYPE : 'Tipo de l\u00EDnea',
		QUANTITY : 'Cantidad',
		STOREROOM : 'Dep\u00F3sito',
		STORELOC : 'Dep\u00F3sito',
		BINNUM : 'Papelera',
		CURBAL : 'Saldo actual',
		UNITCOST : 'Costo por unidad',
		ASSET : 'Activo',
		WORKORDER : 'Orden de trabajo',
		LOCATION : 'Ubicaci\u00F3n',
		ISSUETYPE : 'Tipo de emisi\u00F3n',
		ISSUETO : 'Emitido a',
		ROTASSETNUM : 'Activo rotativo',
		SITEID : 'Sitio',
		ISSUERETURN : 'Emisi\u00F3n y devoluci\u00F3n',
		CHARGEINFO : 'Informaci\u00F3n del cargo'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Descripci\u00f3n',
		ITEM : 'Art\u00edculo',
		LINETYPE : 'Tipo de l\u00ednea',
		QUANTITY : 'Cantidad',
		STOREROOM : 'Almac\u00e9n',
		BINNUM : 'Papelera',
		CURBAL : 'Saldo actual',
		UNITCOST : 'Costo unitario',
		ISSUETYPE : 'Tipo de emisi\u00f3n',
		LOCATION : 'Ubicaci\u00f3n',
		TOOLRATE : 'Velocidad de la herramienta',
		ASSETNUM: 'Activo',
		TOOLHRS: 'Horas de herramienta',
		LINECOST: 'Costo de l\u00ednea',
		TOOLQTY: 'Cantidad de herramienta'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Descripci\u00F3n',
		ITEM : 'Art\u00EDculo',
		LINETYPE : 'Tipo de l\u00EDnea',
		QUANTITY : 'Cantidad',
		TOSTORELOC : 'A ubicaci\u00F3n',
		FROMSTORELOC : 'De ubicaci\u00F3n',
		FROMSITE : 'Del sitio',
		TOSITE : 'Al sitio',
		TOBIN: 'A la papelera',
		FROMBIN: 'De la papelera',
		UNITCOST : 'Costo por unidad',
		ISSUETYPE : 'Tipo de emisi\u00F3n',
		CONVERSIONFACTOR : 'Factor de conversi\u00F3n',
		ROTASSETNUM : 'Activo rotativo',
		TRANSFEROUT : 'Transferencia saliente',
		TRANSFERIN : 'Transferencia entrante',
		FROMQTY : 'De la cantidad de la papelera',
		TOQTY : 'A la cantidad de la papelera',
		SITEID : 'Sitio',
		LOCATION : 'Ubicaci\u00F3n',
		TRANSFERDETAILS: 'Detalles de la transferencia'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Activo',
		LOCATION : 'Ubicaci\u00f3n',
		SEQUENCE : 'Secuencia',
	},
	WORKLOG : {
		NAME : 'Registro de trabajo',
		DESCRIPTION : 'Descripci\u00f3n',
		DETAILS : 'Detalles',
		LOGTYPE : 'Tipo',
		CREATEBY : 'Creado por',
		CREATEDATE : 'Fecha de creaci\u00f3n'
	},
	SR : {
		ACTIVEREQS : 'Solicitudes de servicio activas',
		NEWREQS : 'Nuevas solicitudes de servicio',
		AFFECTEDPERSON : 'Persona afectada',
		DETAILS : 'Detalles',
		GLACCOUNT : 'Cuenta de libro mayor',
		LOCATION : 'Ubicaci\u00f3n',
		OWNER : 'Propietario',
		OWNERGROUP : 'Grupo de propietarios',
		REPORTEDPRIORITY : 'Prioridad reportada',
		REPORTEDBY : 'Reportado por',
		REPORTDATE : 'Fecha del informe',
		REPORTEDPHONE : 'Tel\u00e9fono reportado',
		REPORTEDEMAIL : 'Correo reportado',
		SITE : 'Sitio',
		STATUS : 'Estado',
		SR : 'Solicitud de servicio',
		SUMMARY : 'Resumen',
		ASSETNUM : 'Activo',
		ASSETSITEID : 'Sitio del activo',
	},
	INVBALANCES : {
		ITEMNUM : 'Art\u00edculo',
		DESCRIPTION : 'Descripci\u00f3n',
		BINNUM : 'Papelera',
		CURBAL : 'Saldo actual',
		PHYSCNT : 'Balance f\u00edsico',
		PHYSCNTDATE : 'Fecha de conteo f\u00edsico',
		RECONCILED : 'Conciliado',
		LOCATION : 'Almac\u00e9n',
	},
	INVENTORY : {
		ITEMNUM : 'Art\u00EDculo',
		DESCRIPTION : 'Descripci\u00F3n',
		SITEID : 'Sitio',
		STATUS : 'Estado',
		LOCATION : 'Dep\u00F3sito',
		CATEGORY : 'Categor\u00EDa de existencias',
		BINNUM : 'Papelera predeterminada',
		ISSUEUNIT : 'Unidad de emisi\u00F3n',
		CURBAL : 'Saldo actual',
		LASTISSUEDATE : 'Fecha de la \u00FAltima emisi\u00F3n',
		ISSUEYTD : 'A\u00F1o a la fecha',
		ISSUE1YRAGO : 'A\u00F1o pasado',
		PHYSCNT : 'Conteo f\u00EDsico',
		PHYSCNTDATE : 'Fecha de conteo f\u00EDsico',
		RECONCILED : 'Conciliado',
		TOTALINVPHYBAL : 'Saldo f\u00EDsico',
		TOTALINVBAL : 'Saldo actual',
		ISSUEHISTORY : 'Historial de emisiones',
		INVBALANCE : 'Saldos del inventario',
		ADJCOUNT : 'Ajustar conteos f\u00EDsicos para estos {{count}} art\u00EDculos',
		BALSUMMARY : 'Resumen del saldo disponible',
	},
	METER : {
		ASSETNUM : 'Activo',
		METERNAME : 'Medidor',
		METERTYPE : 'Tipo de medidor',
		READINGTYPE : 'Tipo de lectura',
		LASTREADING : '\u00DAltima lectura',
		LASTREADINGDATE : 'Fecha de la \u00FAltima lectura',
		LASTREADINGINSPECTOR : 'Inspector de la \u00FAltima lectura',
		READING : 'Nueva lectura',
		NEWREADINGDATE : 'Fecha de la nueva lectura'
	},
	WPLABOR : {
		NAME : 'Mano de obra planificada',
		LABORCODE : 'Mano de obra',
		CRAFT : 'Oficio',
		QUANTITY : 'Cantidad',
		LABORHRS : 'Horario regular',
		DISPLAYNAME : 'Nombre',
		SKILLLEVEL: 'Nivel de habilidad',
		VENDOR : 'Proveedor',
		AMCREW : 'Equipo'
	},		
	WPMATERIAL : {
		NAME : 'Materiales planificados',
		LINETYPE : 'Tipo de l\u00ednea',
		ITEMNUM : 'Art\u00edculo',
		DESCRIPTION : 'Descripci\u00f3n',
		ITEMQTY : 'Cantidad',
		UNITCOST : 'Costo unitario',
		STOREROOM : 'Almac\u00e9n',
		STORELOCSITE : 'Sitio de almac\u00e9n',
		RESTYPE : 'Tipo de reservaci\u00f3n',
		REQUIREDATE : 'Fecha requerida'
	},
	LABTRANS : {
		LABORCODE : 'Mano de obra',
		CRAFT : 'Oficio',
		STARTDATE : 'Fecha de inicio',
		TIMERSTATUS : 'Estado del temporizador',
		REGULARHRS : 'Horario regular',
		PAYRATE: 'Tasa',
		PREMIUMPAYCODE : 'C\u00F3digo de pago de la prima',
		PREMIUMPAYHOURS : 'Horas de pago de la prima',
		PREMIUMPAYRATE: 'Tasa de pago de la prima',
		WONUM : 'Orden de trabajo',
		LOCATION : 'Ubicaci\u00F3n',
		ASSETNUM : 'Activo',
		TICKETID: 'Ticket'
	},
	LABREP : {
		LABORCODE : 'Mano de obra',
		CRAFT : 'Oficio',
		SKILLLEVEL : 'Nivel de habilidad',
		STARTDATE : 'Fecha de inicio',
		STARTTIME : 'Hora de inicio',
		FINISHDATE : 'Fecha de finalizaci\u00F3n',
		FINISHTIME : 'Hora de finalizaci\u00F3n',
		REGULARHRS : 'Horario regular',
		PAYRATE : 'Tasa',
		TRANSTYPE : 'Tipo',
		WONUM : 'Orden de trabajo',
		LOCATION : 'Ubicaci\u00F3n',
		ASSETNUM : 'Activo',
		GENAPPRSERVRECEIPT: 'Aprobado',
		NAME: 'Nombre',
		TIMERSTATUS : 'Estado del temporizador',
		PREMIUMPAYHOURS : 'Horas de pago de la prima',
		PREMIUMPAYRATE: 'Tasa de pago de la prima',
		PREMIUMPAYCODE : 'C\u00F3digo de pago de la prima',
		TICKETID: 'Ticket',
		TICKETCLASS: 'Clase de ticket'
	},
	PERSON : {
		PERSONID: 'Persona',
		FIRSTNAME: 'Nombre',
		LASTNAME: 'Apellido'
	},
	FAILURECODE : {
		FAILURECODE : 'Clase de falla',
		PROBLEMCODE : 'Emisi\u00f3n',
		CAUSECODE : 'Causa',
		REMEDYCODE : 'Recurso',
	},
	SPAREPART : {
		QUANTITY : 'Cantidad',
		ISSUEDQTY : 'Cantidad emitida',
		REMARKS : 'Comentarios',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Descripci\u00f3n',
		LONGDESCRIPTION : 'Detalles',
		ASSET : 'Activo',
		STATUS : 'Estado',
		PARENT : 'WO principal',
		SITE : 'Sitio',
		LOCATION : 'Ubicaci\u00f3n',
	},
	DOMAIN : {
		VALUE: 'Valor',
		DESCRIPTION: 'Descripci\u00f3n',
	},
	MR : {
		MRNUM : 'Requisici\u00f3n',
		DESCRIPTION : 'Descripci\u00f3n',
		LONGDESCRIPTION : 'Descripci\u00f3n larga',
		STATUS : 'Estado',
		PRIORITY : 'Prioridad',
		CHARGEINFO : 'Informaci\u00f3n de cargo',
		REQUIREDDATE : 'Fecha requerida',
		WONUM : 'Orden de trabajo',
		LOCATION : 'Ubicaci\u00f3n',
		ASSET : 'Activo',
		GLACCOUNT : 'Cuenta de d\u00e9bito de libro mayor',
		MRLINES : 'Partida de requisici\u00f3n',
		ENTERDATE : 'Fecha en que se ingres\u00f3'
	},
	MRLINE : {
		MRLINEITEM : 'Art\u00edculo de requisici\u00f3n',
		MRLINENUM : 'L\u00ednea',
		LINETYPE : 'Tipo de l\u00ednea',
		ITEM : 'Art\u00edculo',
		DESCRIPTION : 'Descripci\u00f3n',
		QTY : 'Cantidad',
		ORDERUNIT : 'Unidad de la orden',
		UNITCOST : 'Costo unitario',
		LINECOST : 'Costo de l\u00ednea',
		REQUIREDDATE : 'Fecha requerida'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Ver requisiciones enviadas',
		VIEWSAVED : 'Ver requisiciones guardadas',
		EDIT : 'Editar requisici\u00f3n'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Guardar como borrador',
		NEWREQITEM : 'Nuevo art\u00edculo de requisici\u00f3n',
		SUBMIT : 'Enviar'
	},
	CLASSIFY : {
		CLASSASSET : 'Clasificar activo',
		CLASSWO : 'Clasificar orden de trabajo',
		DESCRIPTION : 'Descripci\u00f3n de clase',
		CLASSIFICATION : 'Clasificaci\u00f3n'
	}
};