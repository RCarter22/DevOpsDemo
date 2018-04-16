'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: pt_BR
 */
var locale = 'pt_BR'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Definir',
        cancelText: 'Cancelar',
        clearText: 'Limpar',
        selectedText: 'Selecionado',
        // Calender component
        calendarText: 'Calend\u00e1rio',
        dateText: 'Data',
        timeText: 'Hora',
        // Datetime component
        dateFormat: 'dd/mm/y',
        dateOrder: 'ddmmy',
        dayNames: ['Domingo', 'Segunda-feira', 'Ter\u00e7a-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'S\u00e1bado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S\u00e1b'],
        dayText: 'Dia',
        hourText: 'Horas',
        minuteText: 'Minutos',
        monthNames: ['Janeiro', 'Fevereiro', 'Mar\u00e7o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        monthText: 'M\u00eas',
        secText: 'Segundos',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: 'Ano',
        nowText: 'Agora',
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
	        symbol: 'R$'
	    }		
	},
	PLURAL_CATEGORY : {
		ZERO : "zero",
		ONE : "um",
		TWO : "dois",
		FEW : "alguns",
		MANY : "muitos",
		OTHER : "outro"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "AM", "PM" ],
			"DAY" : [ "domingo", "segunda-feira", "ter\u00e7a-feira", "quarta-feira", "quinta-feira", "sexta-feira", "s\u00e1bado" ],
			"MONTH": [ "janeiro", "fevereiro", "mar\u00e7o", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro" ],
			"SHORTDAY": [ "dom", "seg", "ter", "qua", "qui", "sex", "s\u00e1b" ],
			"SHORTMONTH": [ "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez" ],
			"fullDate": "EEEE, d 'de' MMMM 'de' y",
			"longDate": "d 'de' MMMM 'de' y",
			"medium": "d 'de' MMM 'de' y HH:mm:ss",
			"mediumDate": "d 'de' MMM 'de' y",
			"mediumTime": "HH:mm:ss",
			"short": "dd/MM/yy HH:mm",
			"shortDate": "dd/MM/yy",
			"shortTime": "HH:mm"				
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM": "R$",
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
 * Language: PT
 */
var lang = 'PT'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Sincroniza\u00e7\u00e3o conclu\u00edda com erros!  Voc\u00ea ainda pode tentar trabalhar off-line.',
	EMMOF1001W : 'Sincroniza\u00e7\u00e3o conclu\u00edda com erros!  Sincronize novamente para ativar o modo off-line.',
	EMMOF1002W : 'Sincroniza\u00e7\u00e3o conclu\u00edda com erros!  Voc\u00ea pode tentar sincronizar novamente ou continuar trabalhando off-line.',
	EMMOF1003W : 'Sincroniza\u00e7\u00e3o conclu\u00edda com erros!  Tente sincronizar novamente para trabalhar off-line.',
	EMMOF1004W : '{0} deve ser um n\u00famero',
	EMMOF1005W : 'Campos obrigat\u00f3rios ausentes: {0}',
	EMMOF1006W : 'Atributo {0} \u00e9 somente leitura',
	EMMOF1007W : 'Selecione um valor',
	EMMOF1008I : 'Status alterado com sucesso',
	EMMOF1009W : 'Especifique uma quantidade maior que zero',
	EMMOF1010W : '{0} deve ser maior que zero',
	EMMOF1011W : '{0} \u00e9 obrigat\u00f3rio',
	EMMOF1012W : 'N\u00E3o existe balan\u00E7o para estas combina\u00E7\u00F5es de item, armaz\u00E9m e compartimento',
	EMMOF1013W : 'O saldo no compartimento ficar\u00E1 negativo devido \u00E0 transa\u00E7\u00E3o',
	EMMOF1014W : 'N\u00E3o \u00E9 poss\u00EDvel transferir quando loca\u00E7\u00F5es, n\u00FAmeros de dep\u00F3sito e IDs de local s\u00E3o todos id\u00EAnticos',
	// [WF]		
	EMMWF1000I : 'Iniciar fluxo de trabalho',
	EMMWF1001I : 'Existe mais de um processo de fluxo de trabalho dispon\u00edvel para esta aplica\u00e7\u00e3o.  Selecione um e pressione OK.',
	EMMWF1002I : 'Selecione um processo',
	EMMWF1003I : 'Processar',
	EMMWF1004I : 'Memo',
	EMMWF1005I : 'Parar fluxo de trabalho',
	// [ES]
	EMMES1000I : 'Autoriza\u00e7\u00e3o de e-Sign',
	EMMES1001I : 'Uma assinatura eletr\u00f4nica \u00e9 obrigat\u00f3ria',
	EMMES1002E : 'Autoriza\u00e7\u00e3o com falhas',
	EMMES1003I : 'Insira uma senha e uma raz\u00e3o',
	EMMES1004I : 'Usu\u00e1rio',
	EMMES1005I : 'Senha',
	EMMES1006I : 'Raz\u00e3o',
	// [GB]
	EMMGB1001I : 'E-mail',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Cancelar',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Confirmar',
	EMMGB1006I : 'Sim',
	EMMGB1007I : 'N\u00e3o',
	EMMGB1008I : 'Telefone',
	EMMGB1009I : 'Ligar',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Confirmar exclus\u00e3o?',
	EMMGB1012I : '{0} deve ocorrer antes de {1}',
	EMMGB1013I : '{0} deve ocorrer depois de {1}',
	EMMGB1014I : '{0} deve ocorrer no passado',
	// General	
	OFFLINEMODE : 'Modo off-line',
	SYNCNEEDED : '\u2013 Modificado, sincroniza\u00e7\u00e3o necess\u00e1ria',
	SYNCHRONIZATION : 'Sincroniza\u00e7\u00e3o',
	SYNCSERVER : 'Sincronizar com o servidor',
	ENTERLABOR: 'Inserir por m\u00E3o de obra',
	ADDMORE: 'Adicionar mais...',
	GOONLINE : 'Voltar on-line',
	GOTOOFFLINEAPPS : 'Ir para aplica\u00e7\u00f5es off-line',
	OFFLINEAPPS : 'Aplica\u00e7\u00f5es off-line',
	QUICKSCAN : 'Varredura r\u00e1pida:',
	ACTIVEWORKORDERS : 'Ordens de trabalho ativas',
	RECORDSAVED: 'Registro salvo',
	RECORDNOTSAVED: 'Erro \u2013 Nenhum registro retornado',
	TIMERALREADYSTARTED: 'Temporizador j\u00e1 iniciou',
	TIMERNOTFOUND : 'Temporizador n\u00e3o iniciou. Nenhum temporizador ativo encontrado.',
	TIMERSTARTED : 'Temporizador iniciou',
	TIMERSTOPPED : 'Temporizador parou',
	TOOLS : 'Ferramentas',
	STARTTIMER : 'Iniciar temporizador',
	STOPTIMER : 'Parar temporizador',
	MODIFYSAVE : 'Registro modificado.  Salve suas altera\u00e7\u00f5es.',
	SITEREQUIRED : 'Site \u00e9 obrigat\u00f3rio para criar a Ordem de servi\u00e7o.',
	NOVALUE : 'Valor vazio',
	ACTIONS : 'A\u00e7\u00f5es',
	CHILDRENOF : 'Filhos de',
	RESPONSIBILITY : 'Responsabilidade',
	LOOKUP : 'Procurar',
	LOCATIONDRILLDOWN : 'Detalhamento da localiza\u00e7\u00e3o',
	ASSETDRILLDOWN : 'Detalhamento do ativo',
	DRILLDOWN : 'Detalhamento',
	BACK : 'Voltar',
	SAVE : 'Salvar',
	APPLY : 'Aplicar',
	FILTER : 'Filtrar',
	RESET : 'Redefinir',
	SELECTVALUE : 'Selecionar valor',
	CANCEL : 'Cancelar',
	OK : 'OK',
	YES : 'Sim',
	NO : 'N\u00e3o',
	CREATEFOLLOWUP : 'Criar um acompanhamento',
	CREATESR : 'Criar nova solicita\u00e7\u00e3o de servi\u00e7o',
	PARENT : 'Principal',
	CHANGESTATUS : 'Alterar status',
	LABOR : 'M\u00e3o de obra',
	MATERIALS : 'Materiais',
	TASKS : 'Tarefas',
	ATTACHMENTS : 'Anexos',
	FAILUREREPORTING : 'Relat\u00f3rios de falhas',
	MULTIASSETS : 'M\u00faltiplos ativos, locais',
	ADDNEW : 'Adicionar novo',
	CLASSIFICATION : 'Classifica\u00e7\u00e3o',
	NORECORDS : 'Nenhum registro encontrado',
	NORECORDEXIST : 'Nenhum registro encontrado ou n\u00e3o existe mais',
	NORECORDSADJ : 'Nenhum registro para ajustar contagens f\u00edsicas',
	SELECTOWNER : 'Selecionar propriet\u00e1rio',
	OWNER : 'Propriet\u00e1rio',
	OWNERGROUP : 'Grupo de propriet\u00e1rios',
	TAKEOWNERSHIP : 'Assumir propriedade',
	SORTBY : 'Classificar por',
	LIST : 'Lista',
	QUICKSEARCH: 'Pesquisa r\u00e1pida',
	INVENTORYBYSR : 'Invent\u00e1rio por armaz\u00e9m',
	INVDETAILS : 'Detalhes do invent\u00e1rio',
	NEWCOUNT : 'Nova contagem',
	LABORTRANS : 'Transa\u00e7\u00f5es de m\u00e3o de obra',
	CREATEWO : 'Criar nova ordem de trabalho',
	MYWOS : 'Minhas ordens de trabalho',
	FAILUREREPORT : 'Relat\u00f3rios de falhas',
	METERREADINGS : 'Inserir leituras do medidor',
	ASSETMETER : 'Leituras do medidor de ativos',
	LOCATIONMETER : 'Leituras do medidor de localiza\u00e7\u00e3o',
	FROM : 'De',
	TO : 'Para',
	ADVANCED : 'Avan\u00e7ado',
	ADVANCEDSEARCH : 'Pesquisa avan\u00e7ada',
	DOWNTIME : 'Tempo de inatividade',
	PURCHASEINFO : 'Informa\u00e7\u00f5es de compra',
	SPAREPARTS : 'Pe\u00e7as sobressalentes',
	SCHEDULEINFO : 'Informa\u00e7\u00f5es de agendamento',
	PLANLABOR : 'Planejar m\u00e3o de obra',
	PLANMATERIAL : 'Materiais planejados',
	WOCREATED : 'Ordem de trabalho {0} criada.',
	PRESTART : 'Pr\u00e9-in\u00edcio',
	REVIEWANDAPPROVE : 'Revisar e aprovar',
	MOCACTIONGROUP : 'Selecionar grupo de a\u00e7\u00f5es MOC',
	MOCACTIONS : 'Selecionar a\u00e7\u00f5es MOC',
	REVIEWERSAVED : 'Revisor(es) salvo(s) off-line.',
	APPROVERSAVED : 'Aprovador(es) salvo(s) off-line.',
	ACTIONSAVED : 'A\u00e7\u00e3o(\u00f5es) salva(s) off-line.',
	NOACTIONS : 'Grupo de a\u00e7\u00e3o padr\u00e3o {0} n\u00e3o tem a\u00e7\u00f5es padr\u00e3o v\u00e1lidas para adicionar.',
	SRQUEUED : 'Status de SR {0} alterado para NA FILA.',
	SELECTREVIEWERS : 'Selecionar revisores',
	SELECTAPPROVERS : 'Selecionar aprovadores',
	APPROVERS : 'Aprovadores',
	REVIEWERS : 'Revisores',
	VIEWLIST: 'Exibir lista',
	VIEWSUMMARY : 'Exibir resumo',
	STOREROOMS : 'Armaz\u00E9ns',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Ir para',
	APPS : 'Apps',
	STARTCENTER : 'Centro de In\u00EDcio',
	PAGINATION : {
		TITLE : 'P\u00e1gina {{from}} de {{to}} - {{total}} registros',
		PREV : 'Ant',
		NEXT : 'Pr\u00f3ximo'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Localiza\u00E7\u00E3o',
		ASSET : 'Ativo',
		WOTRACK : 'Rastreamento da ordem de trabalho',
		SR : 'Solicita\u00E7\u00F5es de servi\u00E7o',
		INVENTOR: 'Invent\u00E1rio',
		INVISSUE: 'Problemas e devolu\u00E7\u00F5es',
		MOC : 'MOC (\u00F3leo)',
		CREATEDR : 'Criar requisi\u00E7\u00E3o',
		VIEWDR : 'Visualizar requisi\u00E7\u00F5es',
		LABREP: 'Relat\u00F3rios de m\u00E3o de obra',
		TXNTRACK : 'Resolu\u00E7\u00E3o de sincroniza\u00E7\u00E3o'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'No. do ativo',
		STATUS : 'Status',
		STATUSDATE: 'Data da \u00faltima altera\u00e7\u00e3o',
		INSTALLDATE: 'Data da instala\u00e7\u00e3o',
		SITEID : 'Site',
		PARENT : 'Principal',
		ASSETTYPE: 'Tipo',
		LONGDESCRIPTION : 'Detalhes',
		GROUPNAME: 'Grupo de medidores',
		SERIALNUM: 'No. de s\u00e9rie',
		PURCHASEPRICE: 'Pre\u00e7o de compra',
		TOTDOWNTIME: 'Tempo de inatividade total',
		ISRUNNING: 'Ativo acima',
		VENDOR: 'Fornecedor',
		MANUFACTURER: 'Fabricante',
		FAILURECODE: 'Classe da falha',
		DESCRIPTION : 'Descri\u00e7\u00e3o',
		LOCATION : 'Localiza\u00e7\u00e3o',
		LOCDESC : 'Detalhes',
		SEQUENCE : 'Sequ\u00eancia',
		PROGRESS : 'Marcar progresso?',
		COMMENTS : 'Coment\u00e1rios',
		MOVEASSET: 'Move Asset',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin'
	},
	WORKORDER : {
		WONUM : 'Ordem de trabalho',
		DESCRIPTION : 'Descri\u00E7\u00E3o',
		LONGDESCRIPTION : 'Detalhes',
		STATUS : 'Status',
		PARENT : 'WO principal',
		SITEID : 'Local',
		LOCATION : 'Localiza\u00E7\u00E3o',
		ASSETNUM : 'Ativo',
		WORKTYPE : 'Tipo de trabalho',
		WOPRIORITY : 'Prioridade',
		GLACCOUNT : 'Conta GL',
		FAILURECODE : 'Classe da falha',
		PROBLEMCODE : 'C\u00F3digo do problema',
		SUPERVISOR : 'Supervisor',
		CREWID : 'Equipe',
		LEAD : 'Chefe',
		PERSONGROUP : 'Grupo de trabalho',
		REPORTEDBY : 'Relatado por',
		REPORTDATE : 'Data relatada',
		PHONE : 'Telefone',
		TASKID : 'Tarefa',
		TARGSTARTDATE : 'In\u00EDcio do destino',
		TARGCOMPDATE : 'T\u00E9rmino do destino',
		SCHEDSTART : 'In\u00EDcio agendado',
		SCHEDFINISH : 'T\u00E9rmino agendado',
		ACTSTART : 'In\u00EDcio real',
		ACTFINISH : 'T\u00E9rmino real',
		ASSIGNMENT : 'M\u00E3o de obra atribu\u00EDda',
		OWNER : 'Propriet\u00E1rio',
		OWNERGROUP : 'Grupo de propriet\u00E1rios',
		OBSERVATION : 'Observa\u00E7\u00E3o',
		MEASUREMENTVALUE : 'Valor da medi\u00E7\u00E3o',
		HAZARDS: 'Riscos',
		HAZARDSMAT: 'Materiais perigosos',
		PRECAUTIONS: 'Precau\u00E7\u00F5es',
		LOCKTAG: 'Bloquear sa\u00EDda/Marcar sa\u00EDda',
		TAGOUT: 'Marcar sa\u00EDdas',
		LOCKOUT: 'Bloquear sa\u00EDda',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State'
	},
	MATUSETRANS : {
		DESCRIPTION : 'Descri\u00E7\u00E3o',
		ITEM : 'Item',
		LINETYPE : 'Tipo de linha',
		QUANTITY : 'Quantidade',
		STOREROOM : 'Armaz\u00E9m',
		STORELOC : 'Armaz\u00E9m',
		BINNUM : 'Compartimento',
		CURBAL : 'Saldo atual',
		UNITCOST : 'Custo unit\u00E1rio',
		ASSET : 'Ativo',
		WORKORDER : 'Ordem de trabalho',
		LOCATION : 'Localiza\u00E7\u00E3o',
		ISSUETYPE : 'Tipo de problema',
		ISSUETO : 'Emitido para',
		ROTASSETNUM : 'Ativos rotativos',
		SITEID : 'Local',
		ISSUERETURN : 'Problema e devolu\u00E7\u00E3o',
		CHARGEINFO : 'Informa\u00E7\u00F5es de cobran\u00E7a'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Descri\u00e7\u00e3o',
		ITEM : 'Item',
		LINETYPE : 'Tipo de linha',
		QUANTITY : 'Quantidade',
		STOREROOM : 'Armaz\u00e9m',
		BINNUM : 'Compartimento',
		CURBAL : 'Saldo atual',
		UNITCOST : 'Custo unit\u00e1rio',
		ISSUETYPE : 'Tipo de problema',
		LOCATION : 'Localiza\u00e7\u00e3o',
		TOOLRATE : 'Taxa da ferramenta',
		ASSETNUM: 'Ativo',
		TOOLHRS: 'Horas da ferramenta',
		LINECOST: 'Custo da linha',
		TOOLQTY: 'Quantidade da ferramenta'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Descri\u00E7\u00E3o',
		ITEM : 'Item',
		LINETYPE : 'Tipo de linha',
		QUANTITY : 'Quantidade',
		TOSTORELOC : 'Para a localiza\u00E7\u00E3o',
		FROMSTORELOC : 'Da localiza\u00E7\u00E3o',
		FROMSITE : 'Do local',
		TOSITE : 'Para o local',
		TOBIN: 'Para o dep\u00F3sito',
		FROMBIN: 'Do dep\u00F3sito',
		UNITCOST : 'Custo unit\u00E1rio',
		ISSUETYPE : 'Tipo de problema',
		CONVERSIONFACTOR : 'Fator de convers\u00E3o',
		ROTASSETNUM : 'Ativos rotativos',
		TRANSFEROUT : 'Transfer\u00EAncia de sa\u00EDda',
		TRANSFERIN : 'Transfer\u00EAncia de entrada',
		FROMQTY : 'Da quantidade do compartimento',
		TOQTY : 'Para a quantidade do compartimento',
		SITEID : 'Local',
		LOCATION : 'Localiza\u00E7\u00E3o',
		TRANSFERDETAILS: 'Detalhes da transfer\u00EAncia'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Ativo',
		LOCATION : 'Localiza\u00e7\u00e3o',
		SEQUENCE : 'Sequ\u00eancia',
	},
	WORKLOG : {
		NAME : 'Log de trabalho',
		DESCRIPTION : 'Descri\u00e7\u00e3o',
		DETAILS : 'Detalhes',
		LOGTYPE : 'Tipo',
		CREATEBY : 'Criado por',
		CREATEDATE : 'Data da cria\u00e7\u00e3o'
	},
	SR : {
		ACTIVEREQS : 'Solicita\u00e7\u00f5es de servi\u00e7o ativas',
		NEWREQS : 'Novas solicita\u00e7\u00f5es de servi\u00e7o',
		AFFECTEDPERSON : 'Pessoa afetada',
		DETAILS : 'Detalhes',
		GLACCOUNT : 'Conta GL',
		LOCATION : 'Localiza\u00e7\u00e3o',
		OWNER : 'Propriet\u00e1rio',
		OWNERGROUP : 'Grupo de propriet\u00e1rios',
		REPORTEDPRIORITY : 'Prioridade relatada',
		REPORTEDBY : 'Relatado por',
		REPORTDATE : 'Data do relat\u00f3rio',
		REPORTEDPHONE : 'Telefone relatado',
		REPORTEDEMAIL : 'E-mail relatado',
		SITE : 'Site',
		STATUS : 'Status',
		SR : 'Solicita\u00e7\u00e3o de servi\u00e7o',
		SUMMARY : 'Resumo',
		ASSETNUM : 'Ativo',
		ASSETSITEID : 'Site do ativo',
	},
	INVBALANCES : {
		ITEMNUM : 'Item',
		DESCRIPTION : 'Descri\u00e7\u00e3o',
		BINNUM : 'Compartimento',
		CURBAL : 'Saldo atual',
		PHYSCNT : 'Saldo f\u00edsico',
		PHYSCNTDATE : 'Data da contagem f\u00edsica',
		RECONCILED : 'Reconciliado',
		LOCATION : 'Armaz\u00e9m',
	},
	INVENTORY : {
		ITEMNUM : 'Item',
		DESCRIPTION : 'Descri\u00E7\u00E3o',
		SITEID : 'Local',
		STATUS : 'Status',
		LOCATION : 'Armaz\u00E9m',
		CATEGORY : 'Categoria do estoque',
		BINNUM : 'Compartimento padr\u00E3o',
		ISSUEUNIT : 'Unidade de emiss\u00E3o',
		CURBAL : 'Saldo atual',
		LASTISSUEDATE : 'Data do \u00FAltimo problema',
		ISSUEYTD : 'Acumulado no ano',
		ISSUE1YRAGO : 'Ano passado',
		PHYSCNT : 'Contagem f\u00EDsica',
		PHYSCNTDATE : 'Data da contagem f\u00EDsica',
		RECONCILED : 'Reconciliado',
		TOTALINVPHYBAL : 'Balan\u00E7o f\u00EDsico',
		TOTALINVBAL : 'Saldo atual',
		ISSUEHISTORY : 'Hist\u00F3rico do problema',
		INVBALANCE : 'Saldos do invent\u00E1rio',
		ADJCOUNT : 'Ajustar contagens f\u00EDsica para estes {{contagem}} itens',
		BALSUMMARY : 'Resumo do saldo dispon\u00EDvel',
	},
	METER : {
		ASSETNUM : 'Ativo',
		METERNAME : 'Medidor',
		METERTYPE : 'Tipo de m\u00E9trica',
		READINGTYPE : 'Tipo de leitura',
		LASTREADING : '\u00DAltima leitura',
		LASTREADINGDATE : 'Data da \u00FAltima leitura',
		LASTREADINGINSPECTOR : 'Inspetor da \u00FAltima leitura',
		READING : 'Nova leitura',
		NEWREADINGDATE : 'Data da nova leitura'
	},
	WPLABOR : {
		NAME : 'M\u00e3o de obra planejada',
		LABORCODE : 'M\u00e3o de obra',
		CRAFT : 'Artes e of\u00edcios',
		QUANTITY : 'Quantidade',
		LABORHRS : 'Horas regulares',
		DISPLAYNAME : 'Nome',
		SKILLLEVEL: 'N\u00edvel de habilidade',
		VENDOR : 'Fornecedor',
		AMCREW : 'Equipe'
	},		
	WPMATERIAL : {
		NAME : 'Materiais planejados',
		LINETYPE : 'Tipo de linha',
		ITEMNUM : 'Item',
		DESCRIPTION : 'Descri\u00e7\u00e3o',
		ITEMQTY : 'Quantidade',
		UNITCOST : 'Custo unit\u00e1rio',
		STOREROOM : 'Armaz\u00e9m',
		STORELOCSITE : 'Site do armaz\u00e9m',
		RESTYPE : 'Tipo de reserva',
		REQUIREDATE : 'Data obrigat\u00f3ria'
	},
	LABTRANS : {
		LABORCODE : 'M\u00E3o de obra',
		CRAFT : 'Artes e of\u00EDcios',
		STARTDATE : 'Data de in\u00EDcio',
		TIMERSTATUS : 'Status do temporizador',
		REGULARHRS : 'Horas regulares',
		PAYRATE: 'Taxa',
		PREMIUMPAYCODE : 'C\u00F3digo de pagamento premium',
		PREMIUMPAYHOURS : 'Horas de pagamento premium',
		PREMIUMPAYRATE: 'Taxa de pagamento premium',
		WONUM : 'Ordem de trabalho',
		LOCATION : 'Localiza\u00E7\u00E3o',
		ASSETNUM : 'Ativo',
		TICKETID: 'T\u00EDquete'
	},
	LABREP : {
		LABORCODE : 'M\u00E3o de obra',
		CRAFT : 'Artes e of\u00EDcios',
		SKILLLEVEL : 'N\u00EDvel de habilidade',
		STARTDATE : 'Data de in\u00EDcio',
		STARTTIME : 'Hora de in\u00EDcio',
		FINISHDATE : 'Data de fim',
		FINISHTIME : 'Hora de fim',
		REGULARHRS : 'Horas regulares',
		PAYRATE : 'Taxa',
		TRANSTYPE : 'Tipo',
		WONUM : 'Ordem de trabalho',
		LOCATION : 'Localiza\u00E7\u00E3o',
		ASSETNUM : 'Ativo',
		GENAPPRSERVRECEIPT: 'Aprovado',
		NAME: 'Nome',
		TIMERSTATUS : 'Status do temporizador',
		PREMIUMPAYHOURS : 'Horas de pagamento premium',
		PREMIUMPAYRATE: 'Taxa de pagamento premium',
		PREMIUMPAYCODE : 'C\u00F3digo de pagamento premium',
		TICKETID: 'T\u00EDquete',
		TICKETCLASS: 'Classe do t\u00EDquete'
	},
	PERSON : {
		PERSONID: 'Pessoa',
		FIRSTNAME: 'Nome',
		LASTNAME: 'Sobrenome'
	},
	FAILURECODE : {
		FAILURECODE : 'Classe da falha',
		PROBLEMCODE : 'Problema',
		CAUSECODE : 'Causa',
		REMEDYCODE : 'Solu\u00e7\u00e3o',
	},
	SPAREPART : {
		QUANTITY : 'Quantidade',
		ISSUEDQTY : 'Qtde emitida',
		REMARKS : 'Observa\u00e7\u00f5es',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Descri\u00e7\u00e3o',
		LONGDESCRIPTION : 'Detalhes',
		ASSET : 'Ativo',
		STATUS : 'Status',
		PARENT : 'WO principal',
		SITE : 'Site',
		LOCATION : 'Localiza\u00e7\u00e3o',
	},
	DOMAIN : {
		VALUE: 'Valor',
		DESCRIPTION: 'Descri\u00e7\u00e3o',
	},
	MR : {
		MRNUM : 'Requisi\u00e7\u00e3o',
		DESCRIPTION : 'Descri\u00e7\u00e3o',
		LONGDESCRIPTION : 'Descri\u00e7\u00e3o longa',
		STATUS : 'Status',
		PRIORITY : 'Prioridade',
		CHARGEINFO : 'Informa\u00e7\u00f5es de cobran\u00e7a',
		REQUIREDDATE : 'Data obrigat\u00f3ria',
		WONUM : 'Ordem de trabalho',
		LOCATION : 'Localiza\u00e7\u00e3o',
		ASSET : 'Ativo',
		GLACCOUNT : 'Conta de d\u00e9bito GL',
		MRLINES : 'Itens de linha da requisi\u00e7\u00e3o',
		ENTERDATE : 'Data inserida'
	},
	MRLINE : {
		MRLINEITEM : 'Itens da requisi\u00e7\u00e3o',
		MRLINENUM : 'Linha',
		LINETYPE : 'Tipo de linha',
		ITEM : 'Item',
		DESCRIPTION : 'Descri\u00e7\u00e3o',
		QTY : 'Quantidade',
		ORDERUNIT : 'Unidade da solicita\u00e7\u00e3o',
		UNITCOST : 'Custo unit\u00e1rio',
		LINECOST : 'Custo da linha',
		REQUIREDDATE : 'Data obrigat\u00f3ria'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'Visualizar requisi\u00e7\u00f5es enviadas',
		VIEWSAVED : 'Visualizar requisi\u00e7\u00f5es salvas',
		EDIT : 'Editar requisi\u00e7\u00e3o'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Salvar como rascunho',
		NEWREQITEM : 'Novo item de requisi\u00e7\u00e3o',
		SUBMIT : 'Enviar'
	},
	CLASSIFY : {
		CLASSASSET : 'Classificar ativo',
		CLASSWO : 'Classificar ordem de trabalho',
		DESCRIPTION : 'Descri\u00e7\u00e3o da classe',
		CLASSIFICATION : 'Classifica\u00e7\u00e3o'
	}
};