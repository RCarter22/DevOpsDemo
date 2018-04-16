angular.module('emm').factory('issuestransfersService', function() {
	
	var options = {
		defaultPageSize: 10,
		viewName: null,
		userInfo: null
	};
	
	var PUBLIC = {};
	
	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};

	PUBLIC.createNewIssue = function(storeroom){
		var mt = new MatUseTrans();
		mt.createNew({
			LINETYPE: 'ITEM',
			ISSUETYPE: 'ISSUE',
			SITEID: storeroom.SITEID,
			STORELOC: storeroom.LOCATION,
			ORGID: storeroom.ORGID
		});
		
		mt.mbo._isInvIssue = true;
		mt.session.cache();
		
		EMMServer.DB.Select()
		 	.addQuery("ISSUE", mt.toSql())
		 	.submit("offline/invissue/issuedetail.htm", true);
	};
	
	PUBLIC.createNewTransferIn = function(storeroom){
		var mt = new MatRecTrans();
		mt.createNew({
			LINETYPE: 'ITEM',
			FROMSITEID: storeroom.SITEID,
			NEWSITE: storeroom.SITEID,
			SITEID: storeroom.SITEID,
			TOSTORELOC: storeroom.LOCATION,
			TRANSFERINOUT: 'IN',
			ORGID: storeroom.ORGID,
			ISSUETYPE: 'TRANSFER'
		});
		
		mt.session.cache();
		
		EMMServer.DB.Select()
		 	.addQuery("TRANSFERIN", mt.toSql())
		 	.submit("offline/invissue/transferindetail.htm", true);
	};
	
	PUBLIC.createNewTransferOut = function(storeroom){
		var mt = new MatRecTrans();
		mt.createNew({
			LINETYPE: 'ITEM',
			SITEID: storeroom.SITEID,
			FROMSITEID: storeroom.SITEID,
			NEWSITE: storeroom.SITEID,
			FROMSTORELOC: storeroom.LOCATION,
			TRANSFERINOUT: 'OUT',
			ORGID: storeroom.ORGID,
			ISSUETYPE: 'TRANSFER'
		});
		mt.session.cache();
		
		EMMServer.DB.Select()
		 	.addQuery("TRANSFEROUT", mt.toSql())
		 	.submit("offline/invissue/transferoutdetail.htm", true);
	};
	
	PUBLIC.actions = {
		toIssue : function(storeroom, message, lastscannedID){
			var sql = "SELECT * FROM MATUSETRANS WHERE (ISSUETYPE IN ('ISSUE', 'RETURN')) AND ISDIRTY = '1' AND STORELOC = (select defstoreroom from maxuser where userid=  '" + options.userInfo.personId + "'and siteid = 'CORP') ORDER BY TRANSDATE DESC";
			var summarySql = "SELECT ITEMNUM, LINETYPE, DESCRIPTION, SUM(CASE ISSUETYPE WHEN 'ISSUE' THEN QUANTITY ELSE 0 END) AS ISSUES, " +
							"SUM(CASE ISSUETYPE WHEN 'RETURN' THEN QUANTITY ELSE 0 END) AS RETURNS FROM MATUSETRANS " +
							"WHERE ISDIRTY = '1' AND STORELOC = '" + storeroom.LOCATION + "' GROUP BY ITEMNUM";
			
			EMMServer.Session.setItem('STOREROOM_DATA', {
				storeroom : storeroom,
				viewType : "LIST",
				lastscannedID : lastscannedID
			});
			
			EMMServer.DB.Select()
			 	.addQuery("ISSUES", sql, 1, options.defaultPageSize)
			 	.addQuery("ISSUESUMMARY", summarySql, 1, options.defaultPageSize)
			 	.addMessage(message)
			 	.submit("offline/invissue/issue.htm", true);
		},
		toTransferIn : function(storeroom, message, lastscannedID){
			var sql = "SELECT * FROM MATRECTRANS WHERE ISSUETYPE = 'TRANSFER' AND TRANSFERINOUT = 'IN' AND ISDIRTY = '1' AND TOSTORELOC = '" + storeroom.LOCATION + "' ORDER BY TRANSDATE DESC";
			
			var summarySql = "SELECT FROMSTORELOC, ITEMNUM, DESCRIPTION, SUM(QUANTITY) AS QUANTITY FROM MATRECTRANS " +
							"WHERE ISSUETYPE = 'TRANSFER' AND TRANSFERINOUT = 'IN' AND ISDIRTY = '1' AND TOSTORELOC = '" + storeroom.LOCATION + 
							"' GROUP BY FROMSTORELOC, ITEMNUM ORDER BY FROMSTORELOC";
			
			EMMServer.Session.setItem('STOREROOM_DATA', {
				storeroom : storeroom,
				viewType : "LIST",
				lastscannedID : lastscannedID
			});
			
			EMMServer.DB.Select()
			 	.addQuery("TRANSFERIN", sql, 1, options.defaultPageSize)
			 	.addQuery("TRANSFERSUMMARY", summarySql, 1, options.defaultPageSize)
			 	.addMessage(message)
			 	.submit("offline/invissue/transferin.htm", true);
		},			
		toTransferOut : function(storeroom, message, lastscannedID){
			var sql = "SELECT * FROM MATRECTRANS WHERE ISSUETYPE = 'TRANSFER' AND TRANSFERINOUT = 'OUT' AND ISDIRTY = '1' AND FROMSTORELOC = '" + storeroom.LOCATION + "' ORDER BY TRANSDATE DESC";
			
			var summarySql = "SELECT TOSTORELOC, ITEMNUM, DESCRIPTION, SUM(QUANTITY) AS QUANTITY FROM MATRECTRANS " +
							"WHERE ISSUETYPE = 'TRANSFER' AND TRANSFERINOUT = 'OUT' AND ISDIRTY = '1' AND FROMSTORELOC = '" + storeroom.LOCATION + 
							"' GROUP BY TOSTORELOC, ITEMNUM ORDER BY TOSTORELOC";

			EMMServer.Session.setItem('STOREROOM_DATA', {
				storeroom : storeroom,
				viewType : "LIST",
				lastscannedID : lastscannedID
			});
			
			EMMServer.DB.Select()
			 	.addQuery("TRANSFEROUT", sql, 1, options.defaultPageSize)
			 	.addQuery("TRANSFERSUMMARY", summarySql, 1, options.defaultPageSize)
			 	.addMessage(message)
			 	.submit("offline/invissue/transferout.htm", true);
		},
		toIssueDetail : function(storeroom, issue){
			var sql = "SELECT * FROM MATUSETRANS WHERE MATUSETRANSID = '" + issue.MATUSETRANSID + "'";
			EMMServer.DB.Select()
				.addQuery("ISSUE", sql, 1, options.defaultPageSize)
			 	.submit("offline/invissue/issuedetail.htm", true);
		},
		toTransferInDetail : function(storeroom, transfer){
			var sql = "SELECT * FROM MATRECTRANS WHERE MATRECTRANSID = '" + transfer.MATRECTRANSID + "'";
			EMMServer.DB.Select()
				.addQuery("TRANSFERIN", sql, 1, options.defaultPageSize)
			 	.submit("offline/invissue/transferindetail.htm", true);
		},
		toTransferOutDetail : function(storeroom, transfer){
			var sql = "SELECT * FROM MATRECTRANS WHERE MATRECTRANSID = '" + transfer.MATRECTRANSID + "'";
			EMMServer.DB.Select()
				.addQuery("TRANSFEROUT", sql, 1, options.defaultPageSize)
			 	.submit("offline/invissue/transferoutdetail.htm", true);
		},
		saveIssueReturn: function(storeroom, issue) 
		{
			var multiUpdate = EMMServer.DB.MultiUpdate()
				.addInsertObject("MATUSETRANS", "INSERTISSUE", issue.getMbo());
			
			if(issue.mbo._invData){
				var inv = issue.mbo._invData;
				
				if(issue.ISSUETYPE === 'ISSUE'){
					inv.CURBAL = ((+inv.CURBAL)-(+issue.QUANTITY));
    			}
    			else if(issue.ISSUETYPE === 'RETURN'){
    				inv.CURBAL = ((+inv.CURBAL)+(+issue.QUANTITY));
    			}
				multiUpdate
					.addUpdateObject("INVBALANCES", "", inv, "INVBALANCESID='" + inv.INVBALANCESID +"'");
			}
			
			multiUpdate.submit()
				.then(function(){
					issue.session.remove();
					PUBLIC.actions.toIssue(storeroom, getText('RECORDSAVED', null, 'Record Saved'), issue.MATUSETRANSID);
				});
		},
		saveTransferInOut : function(storeroom, transfer) 
		{
			var transferType = transfer.TRANSFERINOUT;

			var invTo = transfer.mbo._tobinData;
			var invFrom = transfer.mbo._frombinData;
			
			var multiUpdate = EMMServer.DB.MultiUpdate()
				.addInsertObject("MATRECTRANS", "INSERTTRANSFER" + transferType, transfer.getMbo());
			
			if(invFrom){
				invFrom.CURBAL = ((+invFrom.CURBAL)-(+transfer.QUANTITY));
				multiUpdate
					.addUpdateObject("INVBALANCES", "", invFrom, "INVBALANCESID='" + invFrom.INVBALANCESID +"'");
			}
			
			if(invTo){
				invTo.CURBAL = ((+invTo.CURBAL)+(+transfer.QUANTITY)*transfer.CONVERSION);
				multiUpdate
					.addUpdateObject("INVBALANCES", "", invTo, "INVBALANCESID='" + invTo.INVBALANCESID +"'");
			}else {
				invTo = new InvBalances();
				invTo.createNew({
					ITEMNUM: transfer.ITEMNUM,
					ITEMTYPE: transfer.ITEMTYPE,
					SITEID: transfer.NEWSITE,
					LOCATION: transfer.TOSTORELOC,
					BINNUM: transfer.TOBIN,
					CURBAL: (+transfer.QUANTITY)*transfer.CONVERSION,
					PHYSCNT: (+transfer.QUANTITY)*transfer.CONVERSION
				});
				multiUpdate
					.addInsertObject("INVBALANCES", "", invTo.getMbo());
			}
									
			multiUpdate.submit()
				.then(function(result){
					transfer.session.remove();		
					if (transferType == "IN") {
						PUBLIC.actions.toTransferIn(storeroom, getText('RECORDSAVED', null, 'Record Saved'), transfer.MATRECTRANSID);
					}else if (transferType == "OUT") {
						PUBLIC.actions.toTransferOut(storeroom, getText('RECORDSAVED', null, 'Record Saved'), transfer.MATRECTRANSID);
					}
				});
				
			
		},
		confirmTransferOnSave : function (storeroom, matrectrans) {	
			if(matrectrans.mbo.toBeSaved()){
				if(matrectrans.mbo.validate()){
					if (matrectrans.mbo._frombinData && (+matrectrans.QUANTITY) > matrectrans.mbo._frombinData.CURBAL ) {
						emm.util.confirm({
						  title:'Save Record?',
						  message: getText('EMMOF1013W'), yes: function(){
							  PUBLIC.actions.saveTransferInOut(storeroom, matrectrans);
						  },
						  no: function(){
						  },
						  yesText :'OK',
						  noCssClass: 'ui-btn-b',
						  noText:'Cancel'
						});	
					}else {
				    	PUBLIC.actions.saveTransferInOut(storeroom, matrectrans);
				    } 
				} else {
					alert(matrectrans.mbo.message());
				}			
			}
		},
		confirmIssueOnSave : function (storeroom, matusetrans) {	
			if(matusetrans.mbo.toBeSaved()){
				if(matusetrans.mbo.validate()){
					if (matusetrans.ISSUETYPE=='ISSUE' && (+matusetrans.QUANTITY)> matusetrans.mbo._invData.CURBAL) {
						emm.util.confirm({
						  title:'Save Record?',
						  message: getText('EMMOF1013W'), yes: function(){
							  PUBLIC.actions.saveIssueReturn(storeroom, matusetrans);
						  },
						  no: function(){
						  },
						  yesText :'OK',
						  noCssClass: 'ui-btn-b',
						  noText:'Cancel'
						});	
					}else {
				    	PUBLIC.actions.saveIssueReturn(storeroom, matusetrans);
				    } 
				} else {
					alert(matusetrans.mbo.message());
				}			
			}
		}
		
	};
	
	return PUBLIC;
	
});