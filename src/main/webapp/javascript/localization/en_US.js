'use strict';

/***
 * NOTE: There are two parts to this localization file.  
 * Here you can set the internationalization and language settings
 ***/ 

/***
 * Locale: en_US
 */
var locale = 'en_US'; // Set Locale
emm.i18n[locale] = {
	mobiscroll : {
		// Core
        setText: 'Set',
        cancelText: 'Cancel',
        clearText: 'Clear',
        selectedText: 'Selected',
        // Calender component
        calendarText: 'Calendar',
        dateText: 'Date',        
        timeText: 'Time',
        // Datetime component
        dateFormat: 'm/d/y',
        dateOrder: 'mdy',
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayText: 'Day',
        hourText: 'Hours',
        minuteText: 'Minutes',
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthText: 'Month',
        secText: 'Seconds',
        amText: 'am',
        pmText: 'pm',
        timeFormat: 'h:ii A',
        timeWheels: 'hiiA',
        yearText: 'Year',
        nowText: 'Now',		
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
		ZERO : "zero",
		ONE : "one",
		TWO : "two",
		FEW : "few",
		MANY : "many",
		OTHER : "other"
	},
	locale : {
		"DATETIME_FORMATS" : {
			"AMPMS" : [ "AM", "PM" ],
			"DAY" : [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
			"MONTH" : [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
			"SHORTDAY" : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
			"SHORTMONTH" : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
			"fullDate" : "EEEE, MMMM d, y",
			"longDate" : "MMMM d, y",
			"medium": "MM/dd/yyyy h:mm:ss a",
			"mediumDate" : "MM/dd/yyyy",
			"mediumTime" : "h:mm:ss a",
			"short" : "M/d/yy h:mm a",
			"shortDate" : "M/d/yy",
			"shortTime" : "h:mm a"				
		},
		"NUMBER_FORMATS" : {
			"CURRENCY_SYM" : "$",
			"DECIMAL_SEP" : ".",
			"GROUP_SEP" : ",",
			"PATTERNS" : [ {
				"gSize" : 3,
				"lgSize" : 3,
				"macFrac" : 0,
				"maxFrac" : 3,
				"minFrac" : 0,
				"minInt" : 1,
				"negPre" : "-",
				"negSuf" : "",
				"posPre" : "",
				"posSuf" : ""
			}, {
				"gSize" : 3,
				"lgSize" : 3,
				"macFrac" : 0,
				"maxFrac" : 2,
				"minFrac" : 2,
				"minInt" : 1,
				"negPre" : "(\u00a4",
				"negSuf" : ")",
				"posPre" : "\u00a4",
				"posSuf" : ""
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
 * Language: EN
 */
var lang = 'EN'; // Set Language
emm.l10n[lang.toUpperCase()] = {
	// ** DO NOT MODIFY KEY NAMES BEGINNING WITH 'EMM' BECAUSE THEY ARE USED INTERNALLY, ONLY MODIFY THE TEXT ** //
	// [OF]		
	EMMOF1000W : 'Sync completed with errors!  You can still try working offline.',
	EMMOF1001W : 'Sync completed with errors!  Please sync again to enable offline mode.',
	EMMOF1002W : 'Sync completed with errors!  You can try syncing again or remain working offline.',
	EMMOF1003W : 'Sync completed with errors!  Please try to sync again in order to work offline.',
	EMMOF1004W : '{0} must be a number',
	EMMOF1005W : 'Missing required fields: {0}',
	EMMOF1006W : 'Attribute {0} is readonly',
	EMMOF1007W : 'Please select a value',
	EMMOF1008I : 'Status Successfully Changed',
	EMMOF1009W : 'Please specify a quantity greater than zero',
	EMMOF1010W : '{0} must be greater than zero',
	EMMOF1011W : '{0} is required',
	EMMOF1012W : 'No balance exists for this item, storeroom, and bin combinations',
	EMMOF1013W : 'The balance in the bin will become negative as a result of this transaction',
	EMMOF1014W : 'Cannot transfer when locations, binnums and siteids are all identical',
	// [WF]		
	EMMWF1000I : 'Start Workflow',	
	EMMWF1001I : 'There is more than one workflow process available for this application.  Please select one and press OK.',
	EMMWF1002I : 'Please select a process',
	EMMWF1003I : 'Process',
	EMMWF1004I : 'Memo',
	EMMWF1005I : 'Stop Workflow',
	// [ES]
	EMMES1000I : 'e-Sign Authorization',
	EMMES1001I : 'An electronic signature is required',
	EMMES1002E : 'Authorization Failed',
	EMMES1003I : 'Please enter a password and reason',
	EMMES1004I : 'User',
	EMMES1005I : 'Password',
	EMMES1006I : 'Reason',		
	// [GB]
	EMMGB1001I : 'Email',
	EMMGB1002I : 'Facetime',
	EMMGB1003I : 'Cancel',
	EMMGB1004I : 'OK',
	EMMGB1005I : 'Confirm',	
	EMMGB1006I : 'Yes',
	EMMGB1007I : 'No',
	EMMGB1008I : 'Phone',
	EMMGB1009I : 'Call',
	EMMGB1010I : 'SMS',
	EMMGB1011I : 'Confirm Delete?',
	EMMGB1012I : '{0} must occur before {1}',
	EMMGB1013I : '{0} must occur after {1}',
	EMMGB1014I : '{0} must occur in the past',
	// [AEP]
	EMMAEP1001E : 'You should not change directly to WCOMP or COMP.  Actual flow of a workorder must be WSCH --> SCH or INPRG --> WCOMP --> COMP',	
	// General	
	OFFLINEMODE : 'Offline Mode',
	SYNCNEEDED : ' - Modified, Sync Needed',
	SYNCHRONIZATION : 'Synchronization',
	SYNCSERVER : 'Sync with Server',	
	ENTERLABOR:'Enter By Labor',
	ADDMORE:'Add More...',
	GOONLINE : 'Go Back Online',
	GOTOOFFLINEAPPS : 'Go To Offline Applications',
	OFFLINEAPPS : 'Offline Applications',
	QUICKSCAN : 'Quick Scan: ',
	ACTIVEWORKORDERS : 'Active Work Orders',
	RECORDSAVED: 'Record Saved',
	RECORDNOTSAVED: 'Error - No record returned',
	TIMERALREADYSTARTED: 'Timer already started',
	TIMERNOTFOUND : 'Timer not started. No active timer found.',
	TIMERSTARTED : 'Timer Started',
	TIMERSTOPPED : 'Timer Stopped',
	TOOLS : 'Tools',
	STARTTIMER : 'Start Timer',
	STOPTIMER : 'Stop Timer',
	MODIFYSAVE : 'Record modified.  Please save your changes.',	
	SITEREQUIRED : 'Site is required to create Work Order.',
	NOVALUE : 'Empty Value',
	ACTIONS : 'Actions',
	CHILDRENOF : 'Children Of',
	RESPONSIBILITY : 'Responsibility',
	LOOKUP : 'Lookup',
	LOCATIONDRILLDOWN : 'Location Drilldown',
	ASSETDRILLDOWN : 'Asset Drilldown',
	DRILLDOWN : 'Drilldown',
	BACK : 'Back',
	SAVE : 'Save',
	APPLY : 'Apply',
	FILTER : 'Filter',
	RESET : 'Reset',
	SELECTVALUE : 'Select Value',
	CANCEL : 'Cancel',
	OK : 'OK',
	YES : 'Yes',
	NO : 'No',	
	CREATEFOLLOWUP : 'Create a Follow Up',
	CREATESR : 'Create New Service Request',
	PARENT : 'Parent',
	CHANGESTATUS : 'Change Status',
	LABOR : 'Labor',
	MATERIALS : 'Materials',
	TASKS : 'Tasks',
	ATTACHMENTS : 'Attachments',
	FAILUREREPORTING : 'Failure Reporting',
	MULTIASSETS : 'Multiple Assets, Locations', 
	ADDNEW : 'Add New',
	CLASSIFICATION : 'Classification',
	NORECORDS : 'No Record(s) Found',
	NORECORDEXIST : 'No record found or no longer exist',
	NORECORDSADJ : 'No records to adjust physical counts',
	SELECTOWNER : 'Select Owner',
	OWNER : 'Owner',
	OWNERGROUP : 'Owner Group',
	TAKEOWNERSHIP : 'Take Ownership',
	SORTBY : 'Sort By',
	LIST : 'List',
	QUICKSEARCH: 'Quick Search',
	INVENTORYBYSR : 'Inventory by Storeroom',
	INVDETAILS : 'Inventory Details',
	NEWCOUNT : 'New Count',
	LABORTRANS : 'Labor Transactions',
	CREATEWO : 'Create New Work Order',
	MYWOS : 'My Work Orders',
	FAILUREREPORT : 'Failure Reporting',
	METERREADINGS : 'Enter Meter Readings',	
	ASSETMETER : 'Asset Meter Readings',	
	LOCATIONMETER : 'Location Meter Readings',	
	FROM : 'From', 
	TO : 'To',	
	ADVANCED : 'Advanced',
	ADVANCEDSEARCH : 'Advanced Search',
	DOWNTIME : 'Downtime',	
	PURCHASEINFO : 'Purchase Information',
	SPAREPARTS : 'Spare Parts',
	SCHEDULEINFO : 'Scheduling Info',
	PLANLABOR : 'Plan Labor',
	PLANMATERIAL : 'Plan Materials',
	WOCREATED : 'Work Order {0} created.',
	PRESTART : 'Pre-Start',
	REVIEWANDAPPROVE : 'Review and Approve',
	MOCACTIONGROUP : 'Select MOC Action Group',
	MOCACTIONS : 'Select MOC Actions', 
	REVIEWERSAVED : 'Reviewer(s) saved offline.',
	APPROVERSAVED : 'Approver(s) saved offline.',
	ACTIONSAVED : 'Action(s) saved offline.',
	NOACTIONS : 'Standard Action Group {0} has no valid standard actions to add.',
	SRQUEUED : 'SR {0} status changed to QUEUED.',
	SELECTREVIEWERS : 'Select Reviewers',
	SELECTAPPROVERS : 'Select Approvers',
	APPROVERS : 'Approvers',
	REVIEWERS : 'Reviewers',
	VIEWLIST: 'View List',
	VIEWSUMMARY : 'View Summary',
	STOREROOMS : 'Storerooms',
	REPDOWNTIME: 'Report Downtime',
	GOTO : 'Go To',
	APPS : 'Apps',
	STARTCENTER : 'Start Center',
	LICENSES : 'Licenses',
	ALIASES : 'Aliases',
	ASSIGNMENTS: 'Assignments',	
	PAGINATION : {
		TITLE : 'Page {{from}} of {{to}} - {{total}} Records',
		PREV : 'Prev',
		NEXT : 'Next'
	},
	// Apps
	EZMAXMOBILE : {
		LOCATION : 'Location',
		ASSET : 'Asset',
		PLUSTASSET : 'Asset (Tr)',
		WOTRACK : 'Work Order Tracking',	
		PLUSTWO: 'Work Order Tracking (Tr)',
		SR : 'Service Requests',
		INVENTOR: 'Inventory',
		PLUSTINV: 'Inventory (Tr)',
		INVISSUE: 'Issues and Tranfers',
		MOC : 'MOC (Oil)',
		CREATEDR : 'Create Requisition',
		VIEWDR : 'View Requisitions',
		LABREP: 'Labor Reporting',
		PLUSPWO : 'Work Order Tracking (SP)',
		PLUSPSR : 'Service Request (SP)',
		PLUSPASSET : 'Asset (SP)',
		PLUSTLRP : 'Labor Reporting (Tr)',
		TXNTRACK : 'Sync Resolution'
	},
	// Objects
	ASSET : {
		ASSETNUM : 'Asset #',
		STATUS : 'Status',
		STATUSDATE: 'Last Changed Date',
		INSTALLDATE: 'Install Date',
		SITEID : 'Site',
		PARENT : 'Parent',
		ASSETTYPE: 'Type',
		LONGDESCRIPTION : 'Details',
		GROUPNAME: 'Meter Group',
		SERIALNUM: 'Serial #',
		PURCHASEPRICE: 'Purchase Price',
		TOTDOWNTIME: 'Total Downtime',
		ISRUNNING: 'Asset Up',
		VENDOR: 'Vendor',
		MANUFACTURER: 'Manufacturer',
		FAILURECODE: 'Failure Class',
		DESCRIPTION : 'Description',
		LOCATION : 'Location',
		LOCDESC : 'Details',
		SEQUENCE : 'Sequence',
		PROGRESS : 'Mark Progress?',
		COMMENTS : 'Comments',
		MOVEASSET: 'Move/Swap',
		NEWASSETNUM : 'New Asset Number',
		NEWSITE: 'To Site',
		NEWLOCATION : 'To Location',
		MOVEMODIFYBINNUM: 'Bin',
		MOVE: 'Move',
		ALIAS : 'Alias',
		WOHISTORY : 'Work Order History'
	},
	WORKORDER : {
		WONUM : 'Work Order',
		DESCRIPTION : 'Description',
		LONGDESCRIPTION : 'Details',
		STATUS : 'Status',
		PARENT : 'Parent WO',
		SITEID : 'Site',
		LOCATION : 'Location',
		ASSETNUM : 'Asset',
		WORKTYPE : 'Work Type',
		WOPRIORITY : 'Priority',
		GLACCOUNT : 'GL Account',
		FAILURECODE : 'Failure Class',
		PROBLEMCODE : 'Problem Code',
		SUPERVISOR : 'Supervisor',
		CREWID : 'Crew',
		LEAD : 'Lead',
		PERSONGROUP : 'Work Group',
		REPORTEDBY : 'Reported By',
		REPORTDATE : 'Reported Date',
		PHONE : 'Phone',
		TASKID : 'Task',
		TARGSTARTDATE : 'Target Start',
		TARGCOMPDATE : 'Target Finish',
		SCHEDSTART : 'Scheduled Start',
		SCHEDFINISH : 'Scheduled Finish',
		ACTSTART : 'Actual Start',
		ACTFINISH : 'Actual Finish',
		ASSIGNMENT : 'Assigned Labor',
		OWNER : 'Owner',
		OWNERGROUP : 'Owner Group',
		OBSERVATION : 'Observation',
		MEASUREMENTVALUE : 'Measurement Value',
		HAZARDS: 'Hazards',
		HAZARDSMAT: 'Hazardous Materials',
		PRECAUTIONS: 'Precautions',
		LOCKTAG: 'Lock Out/Tag Out',
		TAGOUT: 'Tag Outs',
		LOCKOUT: 'Lock Out',
		RELATELOC: 'Related Location',
		RELATEASSET: 'Related Asset',
		HEALTH: 'Health',
		FLAMMABILITY: 'Flammability',
		REACTIVITY: 'Reactivity',
		CONTACT: 'Contact',
		REQSTATE: 'Required State',
		ALIAS : 'Alias'
	},
	ASSIGNMENT : {
		ASSIGNMENT : 'Assignment',
		ASSIGNMENTS : 'Assignments',
		LABORCODE : 'Labor',
		DESCRIPTION : 'Description',
		CRAFT : 'Craft',
		SKILLLEVEL : 'Skill Level',
		STARTDATE : 'Start Date',
		LABORHRS : 'Hours',
		STATUS: 'Status',
		COMPLETE: 'Complete'
	},	
	MATUSETRANS : {
		DESCRIPTION : 'Description',
		ITEM : 'Item',
		LINETYPE : 'Line Type',
		QUANTITY : 'Quantity',
		STOREROOM : 'Storeroom',
		STORELOC : 'Storeroom',
		BINNUM : 'Bin',
		CURBAL : 'Current Balance',		
		UNITCOST : 'Unit Cost',
		ASSET : 'Asset',
		WORKORDER : 'Work Order',
		LOCATION : 'Location',
		ISSUETYPE : 'Issue Type',
		ISSUETO : 'Issued To',
		ROTASSETNUM : 'Rotating Asset',
		SITEID : 'Site',
		ISSUERETURN : 'Issue and Return',
		CHARGEINFO : 'Charge Information'
	},
	TOOLTRANS : {
		DESCRIPTION : 'Description',
		ITEM : 'Item',
		LINETYPE : 'Line Type',
		QUANTITY : 'Quantity',
		STOREROOM : 'Storeroom',
		BINNUM : 'Bin',
		CURBAL : 'Current Balance',
		UNITCOST : 'Unit Cost',
		ISSUETYPE : 'Issue Type',
		LOCATION : 'Location',
		TOOLRATE : 'Tool Rate',
		ASSETNUM: 'Asset',
		TOOLHRS: 'Tool Hours',
		LINECOST: 'Line Cost',
		TOOLQTY: 'Tool Quantity'
	},
	MATRECTRANS : {
		DESCRIPTION : 'Description',
		ITEM : 'Item',
		LINETYPE : 'Line Type',
		QUANTITY : 'Quantity',
		TOSTORELOC : 'To Location',
		FROMSTORELOC : 'From Location',
		FROMSITE : 'From Site',
		TOSITE : 'To Site',
		TOBIN: 'To Bin',
		FROMBIN: 'From Bin',
		UNITCOST : 'Unit Cost',
		ISSUETYPE : 'Issue Type',
		CONVERSIONFACTOR : 'Conversion Factor',
		ROTASSETNUM : 'Rotating Asset',
		TRANSFEROUT : 'Transfer Out',
		TRANSFERIN : 'Transfer In',
		FROMQTY : 'From Bin Quantity',
		TOQTY : 'To Bin Quantity',
		SITEID : 'Site',
		LOCATION : 'Location',
		TRANSFERDETAILS: 'Transfer Details'
	},
	MULTIASSETLOCCI : {
		ASSETNUM : 'Asset',
		LOCATION : 'Location',
		SEQUENCE : 'Sequence',
	},
	WORKLOG : {
		NAME : 'Work Log',
		DESCRIPTION : 'Description',
		DETAILS : 'Details',
		LOGTYPE : 'Type',
		CREATEBY : 'Created By',
		CREATEDATE : 'Created Date'
	},
	SR : {
		ACTIVEREQS : 'Active Service Requests',
		NEWREQS : 'New Service Requests',
		AFFECTEDPERSON : 'Affected Person',
		DETAILS : 'Details',
		GLACCOUNT : 'GL Account',
		LOCATION : 'Location',
		OWNER : 'Owner',
		OWNERGROUP : 'Owner Group',
		REPORTEDPRIORITY : 'Reported Priority',
		REPORTEDBY : 'Reported By',
		REPORTDATE : 'Report Date',
		REPORTEDPHONE : 'Reported Phone',
		REPORTEDEMAIL : 'Reported Mail',
		SITE : 'Site',
		STATUS : 'Status',
		SR : 'Service Request',
		SUMMARY : 'Summary',
		ASSETNUM : 'Asset',
		ASSETSITEID : 'Asset Site',
	},
	INVBALANCES : {
		ITEMNUM : 'Item',
		DESCRIPTION : 'Description',
		BINNUM : 'Bin',
		CURBAL : 'Current Balance',
		PHYSCNT : 'Physical Balance',
		PHYSCNTDATE : 'Physical Count Date',
		RECONCILED : 'Reconciled',
		LOCATION : 'Storeroom',
	},
	INVENTORY : {
		ITEMNUM : 'Item',
		DESCRIPTION : 'Description',
		SITEID : 'Site',
		STATUS : 'Status',
		LOCATION : 'Storeroom',
		CATEGORY : 'Stock Category',
		BINNUM : 'Default Bin',
		ISSUEUNIT : 'Issue Unit',
		CURBAL : 'Current Balance',
		LASTISSUEDATE : 'Last Issue Date',
		ISSUEYTD : 'Year to Date',
		ISSUE1YRAGO : 'Last Year',
		PHYSCNT : 'Physical Count',
		PHYSCNTDATE : 'Physical Count Date',
		RECONCILED : 'Reconciled',
		TOTALINVPHYBAL : 'Physical Balance',
		TOTALINVBAL : 'Current Balance',
		ISSUEHISTORY : 'Issue History',
		INVBALANCE : 'Inventory Balances',
		ADJCOUNT : 'Adjust physical counts for these {{count}} items',
		BALSUMMARY : 'Available Balance Summary',
	},
	METER : {
		ASSETNUM : 'Asset',
		METERNAME : 'Meter',
		METERTYPE : 'Meter Type',
		READINGTYPE : 'Reading Type',		
		LASTREADING : 'Last Reading',
		LASTREADINGDATE : 'Last Reading Date',
		LASTREADINGINSPECTOR : 'Last Reading Inspector',
		READING : 'New Reading',
		NEWREADINGDATE : 'New Reading Date'
	},
	WPLABOR : {
		NAME : 'Planned Labor',
		LABORCODE : 'Labor',
		CRAFT : 'Craft',
		QUANTITY : 'Quantity',
		LABORHRS : 'Regular Hours',
		DISPLAYNAME : 'Name',
		SKILLLEVEL: 'Skill Level',
		VENDOR : 'Vendor',
		AMCREW : 'Crew'
	},		
	WPMATERIAL : {
		NAME : 'Planned Materials',
		LINETYPE : 'Line Type',
		ITEMNUM : 'Item',
		DESCRIPTION : 'Description',
		ITEMQTY : 'Quantity',
		UNITCOST : 'Unit Cost',
		STOREROOM : 'Storeroom',
		STORELOCSITE : 'Storeroom Site',
		RESTYPE : 'Reservation Type',
		REQUIREDATE : 'Required Date'
	},
	LABTRANS : {
		LABORCODE : 'Labor',
		CRAFT : 'Craft',
		STARTDATE : 'Start Date',
		TIMERSTATUS : 'Timer Status',
		REGULARHRS : 'Regular Hours',
		PAYRATE:'Rate',
		PREMIUMPAYCODE : 'Premium Pay Code',
		PREMIUMPAYHOURS : 'Premium Pay Hours',
		PREMIUMPAYRATE: 'Premium Pay Rate',
		WONUM : 'Work Order',
		LOCATION : 'Location',
		ASSETNUM : 'Asset',
		TICKETID: 'Ticket'
	},
	LABREP : {
		LABORCODE : 'Labor',
		CRAFT : 'Craft',
		SKILLLEVEL : 'Skill Level',
		STARTDATE : 'Start Date',
		STARTTIME : 'Start Time',
		FINISHDATE : 'End Date',
		FINISHTIME : 'End Time',
		REGULARHRS : 'Regular Hours',
		PAYRATE : 'Rate',
		TRANSTYPE : 'Type',
		WONUM : 'Work Order',
		LOCATION : 'Location',
		ASSETNUM : 'Asset',
		GENAPPRSERVRECEIPT: 'Approved',
		NAME: 'Name',
		TIMERSTATUS : 'Timer Status',
		PREMIUMPAYHOURS : 'Premium Pay Hours',
		PREMIUMPAYRATE: 'Premium Pay Rate',
		PREMIUMPAYCODE : 'Premium Pay Code',
		TICKETID: 'Ticket',
		TICKETCLASS: 'Ticket Class',
		ALREADYAPPR: 'Transaction has already been approved'
	},
	PERSON : {
		PERSONID: 'Person',
		FIRSTNAME: 'First Name',
		LASTNAME: 'Last Name'
	},
	FAILURECODE : {
		FAILURECODE : 'Failure Class',
		PROBLEMCODE : 'Problem',
		CAUSECODE : 'Cause',
		REMEDYCODE : 'Remedy',
	},
	SPAREPART : {
		QUANTITY : 'Quantity',
		ISSUEDQTY : 'Issued Qty',
		REMARKS : 'Remarks',
	},
	MOC : {
		WONUM : 'MOC',
		DESCRIPTION : 'Description',
		LONGDESCRIPTION : 'Details',
		ASSET : 'Asset',
		STATUS : 'Status',
		PARENT : 'Parent WO',
		SITE : 'Site',
		LOCATION : 'Location',
	},
	DOMAIN : {
		VALUE: 'Value',
		DESCRIPTION: 'Description',
	},
	MR : {
		MRNUM : 'Requisition',
		DESCRIPTION : 'Description',
		LONGDESCRIPTION : 'Long Description',
		STATUS : 'Status',
		PRIORITY : 'Priority',
		CHARGEINFO : 'Charge Information',
		REQUIREDDATE : 'Required Date',
		WONUM : 'Work Order',
		LOCATION : 'Location',
		ASSET : 'Asset',
		GLACCOUNT : 'GL Debit Account',
		MRLINES : 'Requisition Line Items',
		ENTERDATE : 'Entered Date'
	},
	MRLINE : {
		MRLINEITEM : 'Requisition Item',
		MRLINENUM : 'Line',
		LINETYPE : 'Line Type',
		ITEM : 'Item',
		DESCRIPTION : 'Description',
		QTY : 'Quantity',
		ORDERUNIT : 'Order Unit',
		UNITCOST : 'Unit Cost',
		LINECOST : 'Line Cost',
		REQUIREDDATE : 'Required Date'
	},
	VIEWDR : {
		VIEWSUBMITTED : 'View Submitted Requisitions',
		VIEWSAVED :  'View Saved Requisitions',
		EDIT : 'Edit Requisition'
	},
	CREATEDR: {
		SAVEASDRAFT : 'Save as Draft',
		NEWREQITEM : 'New Requisition Item',
		SUBMIT : 'Submit'
	},
	CLASSIFY : {
		CLASSASSET : 'Classify Asset',
		CLASSWO : 'Classify Work Order',
		DESCRIPTION : 'Class Description',
		CLASSIFICATION : 'Classification',
		DRILLDOWN : 'Classification Drilldown'
	},
	ASSETALIAS : {
		ALIAS : 'Alias',
		DESCRIPTION: 'Description',
		ISDEFAULT: 'Default',
		ISACTIVE : 'Active'
	},	
	ASSETLICENSE : {
		LICENSENUM : 'License Number',
		DESCRIPTION: 'Description',
		STARTDATE: 'Start Date',
		ENDDATE : 'End Date'
	}
};