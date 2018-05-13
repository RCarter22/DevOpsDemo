angular.module('emm').factory('matusetransService', function(){
	
	var options = {
			defaultPageSize: 20,
			viewName : null,
			userInfo : null
		};
	
	var PUBLIC = {};

	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};

	PUBLIC.createNew = function(wo){
		var mt = new MatUseTrans();
		// Create a new in memory labtrans and set field defaults
		mt.createNew({
			WORKORDERID: wo.WORKORDERID,
			WONUM: wo.WONUM,
			LINETYPE: 'ITEM',
			SITEID: wo.SITEID,
			ORGID: wo.ORGID,
			TASKID: wo.TASKID
		});
		
		// Save to the cache
		mt.session.cache();
		
		EMMServer.DB.Select()
			.addQuery("MATUSETRANS", mt.toSql())
			.submit("offline/matusetrans/matusetrans.htm", true);
	};
	
	PUBLIC.showDetails = function(mt) {
		mt.session.cache();
		
		EMMServer.DB.Select()
			.addQuery("MATUSETRANS", mt.toSql())
			.submit("offline/matusetrans/matusetrans.htm", true);
	};
	
	PUBLIC.actions = {
		saveMatUseTrans : function(mt){
			var multiUpdate = EMMServer.DB.MultiUpdate()
			.addInsertObject("MATUSETRANS", "INSERT", mt.getMbo());
		
			if(mt.mbo._invData){
				var inv = new InvBalances(mt.mbo._invData);
				inv.CURBAL = ((+inv.CURBAL)-(+mt.QUANTITY));
				multiUpdate
					.addUpdateObject("INVBALANCES", "", inv.getMbo(), "INVBALANCESID='" + inv.INVBALANCESID +"'");
			}
		
			multiUpdate.submit()
				.then(function(){
					mt.session.remove();
					EMMServer.DB.Select()
						.addMessage(getText('RECORDSAVED', null, 'Record Saved'))
						.go("offline/matusetrans/main.htm");
				});
				
		},
		confirmBalanceOnSave : function (matusetrans) {	
			if(matusetrans.mbo.toBeSaved()){
				if(matusetrans.mbo.validate()){
					if (matusetrans.ISSUETYPE=='ISSUE' && matusetrans.LINETYPE !='MATERIAL' && (+matusetrans.QUANTITY)> matusetrans.mbo._invData.CURBAL) {
						emm.util.confirm({
						  title:'Save Record?',
						  message: getText('EMMOF1013W'), yes: function(){
							  PUBLIC.actions.saveMatUseTrans(matusetrans);
						  },
						  no: function(){
						  },
						  yesText :'OK',
						  noCssClass: 'ui-btn-b',
						  noText:'Cancel'
						});	
					}else {
				    	PUBLIC.actions.saveMatUseTrans(matusetrans);
				    } 
				} else {
					alert(matusetrans.mbo.message());
				}			
			}
		}
	}
	
	return PUBLIC;
});	