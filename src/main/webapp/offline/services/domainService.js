angular.module('emm').factory('domainService', function(){
	var PUBLIC = {};
	
	var options = {
			defaultPageSize: 20,
			viewName : null,
			userInfo : null
		};	
	
	PUBLIC.init = function(opt){
		$.extend(options, opt);
	}	
	
	PUBLIC.domain = function(e, obj) {
		if (!options.viewName){
			alert('No view name specified. Please initialize this service.');
			return;
		}
		
		e = $(e.target||e.srcElement);
		var display = e.data('display'), 
			field = e.data('field'),
			search = e.data('search');
		if (!field || !display)
			return;

		var domain = obj.mbo.lookup(field, {searchFields: search, isAdvanced: options.isAdvanced});
		
		if (domain != null){
			PRIVATE.rememberPageOffset();
			
			// Cache the current object
			obj.session.cache();
			
			// Save session data to be retrieved from the domain page
			EMMServer.Session.setItem('DOMAIN_DATA', {
				cacheKey : obj.session.cacheKey(),
				displayOrder : display.replace(/\s+/g, ''),
				domain : domain, 
				returnPage : options.viewName,
				name : obj.constructor.name.toUpperCase()
			});
			
			EMMServer.DB.Select()
				.addQuery("DOMAIN", domain.getSql(), 1, options.defaultPageSize)
				.submit("offline/common/domain.htm", true);
		}
	}
	
	
	PUBLIC.selectOwner = function(mbo, attributeName){
		if(!attributeName)
			attributeName = 'OWNER';			
		
		if (!options.viewName && !options.returnPage){
			alert('No view name specified. Please initialize this service.');
			return;
		}
		
		mbo.session.cache();
		EMMServer.Session.setItem('SELECTOWNER_DATA' , {
			cacheKey: mbo.session.cacheKey(),
			attributeName : attributeName,
			returnPage: options.viewName||options.returnPage
		});		
		PRIVATE.rememberPageOffset();
		
		EMMServer.DB.Select()
			.addQuery("OWNER", "SELECT * FROM PERSON")
			.addQuery("OWNERGROUP", "SELECT * FROM PERSONGROUP")
			.submit("offline/common/selectowner.htm", false);
	}
	
	PUBLIC.ClassificationDrilldown = function(mbo, attributeName, drillDownClassification){
		
		var attrGiven = true;
		if(!attributeName)
        {
			attributeName = 'CLASSSTRUCTUREID';
            attrGiven = false;
        }
		if(!options.classificationObject){
			alert('No classification object specified. Please initialize the domain service with the classificationObject property');
			return;
		}
		//IF NO DRIll DOWN
		if (!drillDownClassification){
			if (!options.viewName && !options.returnPage){
				alert('No view name specified. Please initialize this service.');
				return;
			}
			
			mbo.session.cache();
			EMMServer.Session.setItem('CLASSIFICATIONDRILLDOWN_DATA' , {
				cacheKey: mbo.session.cacheKey(),
				attributeName : attributeName,
				returnPage: options.viewName || options.returnPage,
				classificationObject : options.classificationObject
			});		
			PRIVATE.rememberPageOffset();
		}
		var sqlChildClass = "SELECT * FROM CLASSSTRUCTURE WHERE PARENT IS NULL AND OBJECTVALUE = '" + options.classificationObject.MBOOBJECTNAME + "'";
		if(!String.isNullOrEmpty(mbo.ORGID)){
			sqlChildClass += " AND ( ORGID IS NULL OR ( ORGID IS NOT NULL AND ORGID = '" + mbo.ORGID + "'))";
		}
		if(!String.isNullOrEmpty(mbo.SITEID)){
			sqlChildClass += " AND ( SITEID IS NULL OR ( SITEID IS NOT NULL AND SITEID = '" + mbo.SITEID + "'))";
		}
		//If No Drilldown was specified then pick from whats already in 
		if (!drillDownClassification && mbo[attributeName] && !attrGiven)
			drillDownClassification = mbo[attributeName]; 
		if (drillDownClassification){
			var sqlCurrentClass = "SELECT * FROM CLASSSTRUCTURE WHERE CLASSSTRUCTUREID = '" + drillDownClassification + "' AND OBJECTVALUE='" + options.classificationObject.MBOOBJECTNAME + "' ORDER BY CLASSIFICATIONID";
			sqlChildClass = "SELECT * FROM CLASSSTRUCTURE WHERE PARENT IN (SELECT CLASSSTRUCTUREID FROM CLASSSTRUCTURE WHERE CLASSSTRUCTUREID = '" + drillDownClassification + "') AND OBJECTVALUE='" + options.classificationObject.MBOOBJECTNAME + "'";
			if(!String.isNullOrEmpty(mbo.ORGID)){
				sqlChildClass += " AND ( ORGID IS NULL OR ( ORGID IS NOT NULL AND ORGID = '" + mbo.ORGID + "'))";
			}
			if(!String.isNullOrEmpty(mbo.SITEID)){
				sqlChildClass += " AND ( SITEID IS NULL OR ( SITEID IS NOT NULL AND SITEID = '" + mbo.SITEID + "'))";
			}

			EMMServer.DB.Select()
				.addQuery("CURRENTCLASSIFICATION", sqlCurrentClass)			
				.addQuery("CHILDCLASSIFICATION", sqlChildClass)
				.submit("offline/common/classificationdrilldown.htm", false);
		} else {
			EMMServer.DB.Select()
				.addQuery("CHILDCLASSIFICATION", sqlChildClass)
				.submit("offline/common/classificationdrilldown.htm", false);
		}
	}
	
	PUBLIC.locationDrilldown = function(mbo, attributeName, drillDownLocation, toParent){
		if(!attributeName)
			attributeName = 'LOCATION';		

		if (!drillDownLocation){
			if (!options.viewName && !options.returnPage){
				alert('No view name specified. Please initialize this service.');
				return;
			}
			
			mbo.session.cache();
			EMMServer.Session.setItem('LOCATIONDRILLDOWN_DATA' , {
				cacheKey: mbo.session.cacheKey(),
				attributeName : attributeName,
				returnPage: options.viewName||options.returnPage
			});		
			PRIVATE.rememberPageOffset();
		}
		
		var sqlChildLoc = "SELECT * FROM LOCATIONS WHERE SITEID = '" + options.userInfo.siteId + "' AND (PARENT IS NULL OR PARENT = '') AND SYSTEMID = 'PRIMARY' ORDER BY LOCATION";				 
						
		var toLocation = null;
		if (drillDownLocation){
			toLocation = drillDownLocation;
		} else if ((toParent === undefined || toParent === false) && mbo[attributeName]){
			toLocation = mbo[attributeName];
		}
		
		if (toLocation){
			var sqlCurrentLoc = "SELECT * FROM LOCATIONS WHERE LOCATION = '" + toLocation + "' AND SYSTEMID = 'PRIMARY' AND SITEID = '" + options.userInfo.siteId + "' ORDER BY LOCATION";						
			sqlChildLoc = "SELECT * FROM LOCATIONS WHERE SITEID = '" + options.userInfo.siteId + "' AND PARENT IN (SELECT LOCATION FROM LOCATIONS WHERE LOCATION = '" + toLocation + "' AND SYSTEMID = 'PRIMARY' AND SITEID = '" + options.userInfo.siteId + "') AND SYSTEMID = 'PRIMARY' ORDER BY LOCATION";
			EMMServer.DB.Select()
				.addQuery("CURRENTLOCATION", sqlCurrentLoc)			
				.addQuery("CHILDLOCATION", sqlChildLoc)
				.submit("offline/common/locationdrilldown.htm", false);
		} else {
			EMMServer.DB.Select()
				.addQuery("CHILDLOCATION", sqlChildLoc)
				.submit("offline/common/locationdrilldown.htm", false);
		}
	}
	
	PUBLIC.assetDrilldown = function(mbo, attributeName){
		if(!attributeName)
			attributeName = 'ASSETNUM';		
		
		if (!options.viewName && !options.returnPage){
			alert('No view name specified. Please initialize this service.');
			return;
		}
		
		mbo.session.cache();
		EMMServer.Session.setItem('ASSETDRILLDOWN_DATA' , {
			cacheKey: mbo.session.cacheKey(),
			attributeName : attributeName,
			returnPage: options.viewName||options.returnPage
		});
		
		PRIVATE.rememberPageOffset();
		
		var sqlChildLoc = "SELECT * FROM LOCATIONS WHERE SITEID = '" + options.userInfo.siteId + "' AND (PARENT IS NULL OR PARENT = '') AND SYSTEMID = 'PRIMARY' ORDER BY LOCATION";
		
		var selectObj = EMMServer.DB.Select().addQuery("CHILDLOCATIONLIST", sqlChildLoc);
		
		if(mbo[attributeName] != null){
			PUBLIC.assetDrilldownActions.gotoAsset(mbo, null);
		} else {
			selectObj.submit("offline/common/assetdrilldown.htm", true);
		}		
	}
	
	PUBLIC.assetDrilldownActions = {
		gotoLocation : function(location){
			var siteId = options.userInfo.siteId;
			var sqlCurrentLoc = "", sqlChildLoc = "";
			
			if(!location){
				sqlChildLoc = "SELECT * FROM LOCATIONS WHERE SITEID = '" + siteId + "' AND (PARENT IS NULL OR PARENT = '') AND SYSTEMID = 'PRIMARY' ORDER BY LOCATION";
			} else {
				sqlCurrentLoc = "SELECT * FROM LOCATIONS WHERE LOCATION = '" + location + "' AND SYSTEMID = 'PRIMARY' AND SITEID = '" + siteId + "' ORDER BY LOCATION";
				sqlChildLoc = "SELECT * FROM LOCATIONS WHERE SITEID = '" + siteId + "' AND PARENT IN (SELECT LOCATION FROM LOCATIONS WHERE LOCATION = '" + location + "' AND SYSTEMID = 'PRIMARY' AND SITEID = '" + siteId + "') AND SYSTEMID = 'PRIMARY' ORDER BY LOCATION";
			}
			
			EMMServer.Session.setItem('DRILLDOWNTYPE_DATA','LOCATION');
			
            if (sqlCurrentLoc != ""){
            	EMMServer.DB.Select()
            		.addQuery("CHILDLOCATIONLIST", sqlChildLoc)
            		.addQuery("CURRENTLOCATION", sqlCurrentLoc)
            		.submit("offline/common/assetdrilldown.htm", true);
            }else{
            	EMMServer.DB.Select()
            		.addQuery("CHILDLOCATIONLIST", sqlChildLoc)
            		.submit("offline/common/assetdrilldown.htm", true);
            }
		},
		gotoAsset : function(mbo, assetnum){
			var siteId = mbo.SITEID, location = mbo.LOCATION;
			var sqlCurrentAsset = "", sqlChildAsset = "", sqlCurrentLoc = "", sqlChildLoc = "";
			
			EMMServer.Session.setItem('DRILLDOWNTYPE_DATA','ASSET');
			
			if(location == undefined || location == ""){
				sqlChildLoc = "SELECT * FROM LOCATIONS WHERE SITEID = '" + siteId + "' AND (PARENT IS NULL OR PARENT = '') AND SYSTEMID = 'PRIMARY' ORDER BY LOCATION";
			}else{
				 sqlCurrentLoc = "SELECT * FROM LOCATIONS WHERE LOCATION = '" + location + "' AND SYSTEMID = 'PRIMARY' AND SITEID = '" + siteId + "' ORDER BY LOCATION";
	             sqlChildLoc = "SELECT * FROM LOCATIONS WHERE SITEID = '" + siteId + "' AND PARENT IN (SELECT LOCATION FROM LOCATIONS WHERE LOCATION = '" + location + "' AND SYSTEMID = 'PRIMARY' AND SITEID = '" + siteId + "') AND SYSTEMID = 'PRIMARY' ORDER BY LOCATION";
			}
			
			var selectObj = EMMServer.DB.Select();
            if (sqlCurrentLoc != ""){
                selectObj.addQuery("CHILDLOCATIONLIST", sqlChildLoc);
            	selectObj.addQuery("CURRENTLOCATION", sqlCurrentLoc);
            }else{
            	selectObj.addQuery("CHILDLOCATIONLIST", sqlChildLoc);
            }
			
			if (!assetnum) {
                sqlChildAsset = "SELECT * FROM ASSET WHERE SITEID = '" + siteId + "' AND (PARENT IS NULL OR PARENT = '') AND LOCATION = '" + location + "' ORDER BY ASSETNUM";
            } else {
                sqlCurrentAsset = "SELECT * FROM ASSET WHERE SITEID = '" + siteId + "' AND LOCATION = '" + location + "' AND ASSETNUM = '" + assetnum + "' ORDER BY ASSETNUM";
                sqlChildAsset = "SELECT * FROM ASSET WHERE SITEID =  '" + siteId + "' AND PARENT IN (SELECT ASSETNUM FROM ASSET WHERE LOCATION = '" + location + "' AND SITEID = '" + siteId + "' AND ASSETNUM = '" + assetnum + "') ORDER BY ASSETNUM";
            }
			
            selectObj.addQuery("CHILDASSETLIST", sqlChildAsset);
            if (sqlCurrentAsset != "")
                selectObj.addQuery("CURRENTASSET", sqlCurrentAsset);
            selectObj.submit("offline/common/assetdrilldown.htm", false);
		}
	};
	
	PUBLIC.toChangeStatus = function(obj, params){
		if (obj.mbo.toBeSaved()){
			alert(getText('MODIFYSAVE', null, 'Record modified.  Please save your changes.'));
			return;
		}
		
		var requiredParams = ['fieldName','action','entityName','whereClause','returnPage'], 
			invalid = false,
			message = "Missing param: ";
		$.each(requiredParams, function(k,v){
			if (!params.hasOwnProperty(v) || !params[v]){
				message += v;
				return false;
			}
		});
		if(String.isNullOrEmpty(obj.mbo.maxStatusValue())){
			alert("The max status value has not been set for this object. Please set value before changing status");
			return;
		}
		
		if (invalid){
			alert(message);
			return;
		}
		var domain = obj.mbo.lookup(params.fieldName);
		
		if (domain != null){
			// Cache the current object
			obj.session.cache();
			
			// Save session data to be retrieved from the change status page
			EMMServer.Session.setItem('CHANGESTATUS_DATA', {
				cacheKey : obj.session.cacheKey(),
				fieldName : params.fieldName,
				action : params.action,
				entityName : params.entityName,
				whereClause : params.whereClause,
				returnPage : params.returnPage,
			});		
			
			if(obj.mbo.appName() == 'PLUSTWO'){
				EMMServer.DB.Select()
				.addQuery("STATUS", domain.getSql())
				.addQuery("AEPWOACTIVITY","SELECT COUNT(*) AS COUNT FROM WORKORDER WHERE ISTASK = '1' AND PARENTID = '" + obj.WORKORDERID + "' AND (PLUSTREASON IS NULL OR PLUSTACCOMP IS NULL)")
				.addQuery("ASSETMETER","SELECT COUNT(*) AS COUNT FROM ASSETMETER WHERE PLUSTPRIMETER = '1' AND SITEID = 'CORP' AND ASSETNUM = '"+ obj.ASSETNUM + "'")
				.submit("offline/common/changestatus.htm", false);
			}
			else{
				EMMServer.DB.Select()
					.addQuery("STATUS", domain.getSql())
					.submit("offline/common/changestatus.htm", false);
			}
		}
	}

	PUBLIC.ClassificationLookup = function(e, obj) {
		if (!options.viewName){
			alert('No view name specified. Please initialize this service.');
			return;
		}
		if(!options.classificationObject){
			alert('No classification object specified. Please initialize the domain service with the classificationObject property');
			return;
		}
		
		e = $(e.target||e.srcElement);
		var display = e.data('display'), 
			field = e.data('field'),
			search = e.data('search');
		if (!field || !display)
			return;

		var domain = obj.mbo.lookup(field, {searchFields: search, isAdvanced: options.isAdvanced});
		
		if (domain != null){
			PRIVATE.rememberPageOffset();
			
			// Cache the current object
			obj.session.cache();
			
			// Save session data to be retrieved from the domain page
			EMMServer.Session.setItem('DOMAIN_DATA', {
				cacheKey : obj.session.cacheKey(),
				displayOrder : display.replace(/\s+/g, ''),
				domain : domain, 
				returnPage : options.viewName,
				name : obj.constructor.name.toUpperCase(),
				classificationObject : options.classificationObject
			});
			EMMServer.DB.Select()
				.addQuery("DOMAIN", domain.getSql(), 1, options.defaultPageSize)
				.submit("offline/common/classificationlookup.htm", true);
		}
	}
	
	/* Private functions */
	var PRIVATE = {};
	
	PRIVATE.rememberPageOffset = function(){
		localStorage.pageYOffset = (sessionStorage._tempdialogscrollposition||window.pageYOffset)+'|'+options.viewName;
	}
	
	// On Load, scroll to last page offset
	$(function(){
		var el = localStorage.pageYOffset;
		if (el){
			el = el.split('|');
			var offset = el[0], view = el[1];
			if (view === options.viewName){
				localStorage.removeItem('pageYOffset');
				$('html, body').animate({
					scrollTop : offset
				}, 1);
			}
		}
	});
	
	return PUBLIC;
});