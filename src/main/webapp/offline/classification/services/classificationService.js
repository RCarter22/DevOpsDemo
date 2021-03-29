angular.module('emm').factory('classificationService', function(){
	var options = {
			defaultPageSize: 20,
			viewName : null,
			queryName : null,
			userInfo : null
		};
	
	var PUBLIC = {};
	
	PUBLIC.init = function(opt){
		$.extend(options, opt);
	};

	PUBLIC.actions = {
		toClassify : function(mboObject, classificationObject, message){
			if(mboObject.mbo.toBeSaved() && !message){
				alert('Record modified. Please save your changes.');
				return;
			}
			if(classificationObject == null || classificationObject == undefined){
				alert("classificationObject is not defined");
				return;
			}
			//Validate classification Object
			if(String.isNullOrEmpty(classificationObject.returnPage) || String.isNullOrEmpty(classificationObject.SPECTABLE) || String.isNullOrEmpty(classificationObject.SPECCLASS) || String.isNullOrEmpty(classificationObject.SPECUNIQUEIDNAME) || String.isNullOrEmpty(classificationObject.SPECADDSYNC) || String.isNullOrEmpty(classificationObject.SPECEDITSYNC) || String.isNullOrEmpty(classificationObject.MBOUNIQUEIDNAME) || String.isNullOrEmpty(classificationObject.MBOOBJECTNAME) || String.isNullOrEmpty(classificationObject.MBOSYNCNAME)){
			 	alert("One or more classification object properties are missing");
				return;
			 }
			//Cache Asset to send to next page
			mboObject.session.cache();
			//This query will start at the classification node and recursively 
			//traverse the classification tree till it reaches a null condition on the parent
			//This will identify that we are at the base level for the given classification
			var sqlClassificationPath = "WITH RECURSIVE cp AS ("
				+"SELECT CLASSSTRUCTUREID, CLASSIFICATIONID, PARENT, DESCRIPTION FROM CLASSSTRUCTURE WHERE CLASSSTRUCTUREID = '" + mboObject.CLASSSTRUCTUREID + "' AND OBJECTVALUE = '" + classificationObject.MBOOBJECTNAME + "'"
				+" UNION ALL "
				+" SELECT CLASSSTRUCTURE.CLASSSTRUCTUREID, CLASSSTRUCTURE.CLASSIFICATIONID, CLASSSTRUCTURE.PARENT, CLASSSTRUCTURE.DESCRIPTION FROM CLASSSTRUCTURE INNER JOIN cp "
				+" ON CLASSSTRUCTURE.CLASSSTRUCTUREID=cp.PARENT AND CLASSSTRUCTURE.OBJECTVALUE = 'ASSET'"
				+" WHERE cp.PARENT IS NOT NULL "
				+") "
				+"SELECT * FROM cp";
			
			var sqlAssetSpecs = "SELECT * FROM " +  classificationObject.SPECTABLE + " WHERE ISACTIVE = '1' AND " + classificationObject.MBOUNIQUEIDNAME + " = '" + mboObject[classificationObject.MBOUNIQUEIDNAME] + "' AND CLASSSTRUCTUREID = '" + mboObject.CLASSSTRUCTUREID+ "' AND DATATYPE IN ('ALN', 'NUMERIC') ORDER BY CAST(DISPLAYSEQUENCE AS UNSIGNED) ";
			
			EMMServer.Session.setItem('CLASSIFICATIONDATA', {
				returnPage : classificationObject.returnPage,
				cacheKey : mboObject.session.cacheKey(),
				classificationObject : classificationObject,
			});
			
			EMMServer.DB.Select()
				.addQuery("CLASSIFICATIONPATH", sqlClassificationPath)
				.addQuery("SPECS", sqlAssetSpecs)
				.addMessage(message)
				.submit("offline/classification/classify.htm", true);	
		},
		saveClassification : function(mboObject, specifications, assetAttributes){
			var multiUpdate = EMMServer.DB.MultiUpdate();
			var count = 0;
			if(mboObject.mbo.validate()){
				if(mboObject.mbo.isClassificationUpdated()){
					mboObject.CHANGEDATE = new Date();
					multiUpdate.addUpdateObject(options.classificationObject.MBOOBJECTNAME, options.classificationObject.MBOSYNCNAME, mboObject.getMbo(), options.classificationObject.MBOUNIQUEIDNAME + " = '" + mboObject[options.classificationObject.MBOUNIQUEIDNAME] + "'");
					count++;
					if(specifications){
						//"Remove" existing assetSpecifications because we have reclassified
						for(var i = 0; i < specifications.length; i++){
							var specification = specifications[i];
							specification.CHANGEDATE = new Date();
							//We know we have reclassified this object because we have new asset attributes
							//If we have new asset attributes then we want to update the existing workorder spec objects and flag them as inactive 
							specification.ISACTIVE = '0';
							var whereClause = options.classificationObject.SPECUNIQUEIDNAME + " ='" + specification[options.classificationObject.SPECUNIQUEIDNAME] + "'";
							multiUpdate.addUpdateObject(options.classificationObject.SPECTABLE, options.classificationObject.SPECEDITSYNC, specification.getMbo(true), whereClause);
							count++;											
						}
					}
					//Build new specification set
					if(assetAttributes){
						for(var i = 0; i < assetAttributes.length; i++){
							var assetattribute = assetAttributes[i];
							var spec = new window[options.classificationObject.SPECCLASS]();
							spec.createNew({
								ASSETATTRID: assetattribute.ASSETATTRID,
								ASSETATTRIDDESC : assetattribute.DESCRIPTION,
								CLASSSTRUCTUREID: mboObject.CLASSSTRUCTUREID,
								DATATYPE: assetattribute.DATATYPE,
								DISPLAYSEQUENCE: assetattribute.SEQUENCE,
								DOMAINID: assetattribute.DOMAINID,
								MEASUREUNITID: assetattribute.MEASUREUNITID,
								MANDATORY: assetattribute.MANDATORY,
								ALNVALUE : assetattribute.DEFAULTALNVALUE,
								NUMVALUE : assetattribute.DEFAULTNUMVALUE,
							});
							spec[options.classificationObject.MBOUNIQUEIDNAME] = mboObject[options.classificationObject.MBOUNIQUEIDNAME];
							multiUpdate.addInsertObject(options.classificationObject.SPECTABLE, options.classificationObject.SPECADDSYNC, spec.getMbo(true));
							count++;
						}
					}
				}
				else{
					if(specifications){
						for(var i = 0; i < specifications.length; i++){
							var specification = specifications[i];
							if(specification.mbo.toBeSaved()){
								if(specification.mbo.validate()){
									specification.CHANGEDATE = new Date();
									var whereClause = options.classificationObject.SPECUNIQUEIDNAME + " ='" + specification[options.classificationObject.SPECUNIQUEIDNAME] + "'";
									multiUpdate.addUpdateObject(options.classificationObject.SPECTABLE, options.classificationObject.SPECEDITSYNC, specification.getMbo(true), whereClause);
									specification.session.remove();
									count++;
								}else{
									alert(specification.mbo.message());
									return;
								}
							}
						}
					}
				}
				if(count > 0){
					multiUpdate.submit()
					.then(function(result){
						mboObject.mbo.toBeSaved(false);
						mboObject.mbo.isClassificationUpdated(false);
						PUBLIC.actions.toClassify(mboObject, options.classificationObject, getText('RECORDSAVED', null, 'Record Saved'));
					});
				}
							
			}else{
				alert(mboObject.mbo.message());
			}
		
		},
		addSpecification : function(mboObject){
			var spec = new window[options.classificationObject.SPECCLASS]();
			spec[options.classificationObject.MBOUNIQUEIDNAME] = mboObject[options.classificationObject.MBOUNIQUEIDNAME];
			spec.CLASSSTRUCTUREID = mboObject.CLASSSTRUCTUREID;
			EMMServer.Session.setItem('SPECIFICATION_DATA', {
				classificationObject : options.classificationObject,
				returnPage : options.viewName
			});
			EMMServer.DB.Select()
				.addQuery("SPEC", spec.toSql())
				.submit("offline/classification/specification.htm", true);
		},
		saveSpecification : function(spec){

		}
	};
	return PUBLIC;
});
