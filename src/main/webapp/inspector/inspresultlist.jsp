<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html ng-app="emm" ng-controller="InspectionController" ng-cloak>  
<head>
	<title>EZMaxMobile</title>
	<script type="text/javascript" src="scripts/Inspection.js"></script>
	<script type="text/javascript" src="../javascript/angular.min.js"></script>
	<script type="text/javascript" src="../javascript/angular-translate.min.js"></script>
	<s:include value="../common/includes.jsp"/>
</head>
<body>
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<s:if test="inspstatus.equals('INPROG')">
				<a class="ui-btn-left" href="insplist.action"><span class="emm-chevron-left"></span></a>
			</s:if>
			<s:else>
				<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			</s:else>
			<h3 class="ui-title"><s:text name="inspection.conductinspection"/></h3>			
			<a class="ui-btn-right" data-scrollto="#ACTIONS"><span class="emm-ellipsis-v"></span></a>
	        <div class="ui-subheader ui-justify-space-between ui-flex-wrap-no-wrap">
	        	<div class="ui-subheader-left">        		
					<a class="ui-btn-f" ng-if="inspection.isComplete() && !inspection.isStatusComplete() && !inspection.mbo.toBeSaved()" href="compinsp.action?id={{inspection.INSPECTIONRESULTID}}"><span class="emm-check-square-o"></span></a>       				
	        	</div>
				<div class="ui-progress-div">
					<div>
						<h3 style="margin:0 0 4px 0;">{{inspection.getTotalCompleteCount()}} / {{inspection.getTotalCount()}} Total &bull; {{inspection.getRequiredCompleteCount()}} / {{inspection.getRequiredCount()}} Required</h3>
						<progress-bar value="{{inspection.getRequiredCompleteCount()}}" max-value="{{inspection.getRequiredCount()}}"></progress-bar>
					</div>
				</div>
				<div class="ui-subheader-right">
		        	<a type="submit" ng-class="{'ui-btn-c' : inspection.mbo.toBeSaved()}" ng-click="save()"><span class="emm-floppy-o"></span></a>
				</div>
	        </div> 			
			<s:include value="../common/statusbar.jsp"/>
			<div ng-if="inspMessage" class="ui-statusbar ui-statusbar-{{inspMessage[0].type}}"><h3 class="ui-title">{{inspMessage[0].message}}</h3></div>
		</div>
		<div class="ui-content">
			<s:hidden name="inspFormResult"/>
			<s:hidden name="ezPhotoURL"/>
			
			<ul class="ui-listview">								
				<li class="ui-divider ui-btn-toggle" style="padding:.4em;" href=".insp-detail" data-show="&#9660; {{inspection.NAME}}" data-hide="&#9650; {{inspection.NAME}}">
					&#9660; {{inspection.NAME}}
				</li>
				<li class="ui-field ui-readonly ui-hidden insp-detail">
					<label><s:text name="inspection.name"/></label>
					<p style="line-height: 1.5em; margin: .2em 0">{{inspection.NAME}}</p>
				</li>
				<li class="ui-field ui-readonly ui-hidden insp-detail">
					<label><s:text name="inspection.resultnum"/></label>
					<p>{{inspection.RESULTNUM}}</p>
				</li>
				<li class="ui-field ui-readonly ui-hidden insp-detail" ng-show="inspection.LOCATION != ''">
					<label><s:text name="ezmaxmobile.location"/></label>
					<p>{{inspection.LOCATION}}</p>
					<p>{{inspection.LOCDESC}}</p>
				</li>
				<li class="ui-field ui-readonly ui-hidden insp-detail" ng-show="inspection.ASSET != ''">
					<label><s:text name="ezmaxmobile.asset"/></label>
					<p>{{inspection.ASSET}}</p>
					<p>{{inspection.ASSETDESC}}</p>
				</li>
				<li class="ui-field ui-readonly ui-hidden insp-detail">
					<label><s:text name="inspection.status"/></label>
					<p>{{inspection.STATUS}}</p>
				</li>
				<li class="ui-field-block ui-readonly ui-hidden insp-detail" style="display:none;" ng-if="inspection.LONGDESCRIPTION != null">
					<label><s:text name="inspection.inspinstruction"/></label>
					<textarea data-htmleditor="true">
						<s:property value="mbo.getString('INSPECTIONFORM.DESCRIPTION_LONGDESCRIPTION')" />
					</textarea>
				</li>
			</ul>
			
			<ul class="ui-inspection ui-listview">
				<li ng-repeat="(key, question) in inspection.INSPQUESTION" ng-class="question.SEQUENCE == 0 ? 'ui-divider' : ''" ng-hide="question.TOTALCOUNT == 0" >
					<h3 ng-if="question.SEQUENCE == 0" class="ui-wrap" id="groupseq{{question.GROUPSEQ}}">
						{{question.GROUPSEQ  + '.'}} {{question.DESCRIPTION}}
						<!-- Instructional information on group level -->
						<span ng-if="question.LONGDESCRIPTION != null" ng-click="toggleShowHelp(question)" class="emm-info-circle"></span>
						<span id="{{question.INSPQUESTIONNUM}}"></span>
					</h3>
										
					<ul ng-if="question.SEQUENCE != 0" ng-repeat="(key, result) in question.INSPFIELDRESULT">						
						<li class="ui-callout ui-message-a" ng-if="result.ERRORFLAG == 1 && result.ERRORMESSAGE">{{result.ERRORMESSAGE}}</li>
						<li class="ui-callout ui-message-c" ng-if="result.METERFLAG == true"><s:text name="inspection.meternotavailable"><s:param>{{result.METERNAME}}</s:param></s:text></li>
					
						<li class="ui-row" ng-show="inspection.isVisible(result, question.INSPFIELDRESULT)">
						
							<label id="groupseq{{question.GROUPSEQ}}">
								<h3 ng-show="key == 0" class="ui-wrap">
									<span class="emm-asterisk ui-required-icon" ng-if="inspection.isQuestionRequired(question.INSPFIELDRESULT)"></span>{{question.GROUPSEQ  + '.'}} {{question.DESCRIPTION}}
									<!-- Instructional information on individual question level -->
									<span ng-if="question.LONGDESCRIPTION != null" ng-click="toggleShowHelp(question)" class="emm-info-circle" ></span>
									<span id="{{question.INSPQUESTIONNUM}}"></span>
								</h3>
								<div class="ui-question">
									<span class="emm-asterisk ui-required-icon" ng-if="inspection.isRequired(result, question.INSPFIELDRESULT)"></span>{{result.DESCRIPTION.split(signatureKey)[0]}}
								</div>
							</label>
							
							<input
								type="number"
								step="0.01"
								placeholder="<s:text name="inspection.enteranswer"/>"
								ng-if="result.INSPQUESTIONNUM == question.INSPQUESTIONNUM && result.FIELDTYPE && result.FIELDTYPE == 'SE'"
								ng-attr-id="result.INSPFIELDNUM" 
								ng-model="result.NUMRESPONSE"
								ng-disabled="inspection.isStatusComplete()"
							/>
							
							<textarea 
								data-control="autoexpand"
								placeholder="<s:text name="inspection.enteranswer"/>"
								ng-if="result.INSPQUESTIONNUM == question.INSPQUESTIONNUM && result.FIELDTYPE && result.FIELDTYPE == 'TR' && (result.DESCRIPTION == null || result.DESCRIPTION.indexOf(signatureKey) < 0)"
								ng-attr-id="result.INSPFIELDNUM" 
								ng-model="result.TXTRESPONSE" 
								ng-disabled="inspection.isStatusComplete()"
							></textarea>

							<input
								type="number"
								step="0.01"
								placeholder="<s:text name="inspection.enteranswer"/>"
								ng-if="result.INSPQUESTIONNUM == question.INSPQUESTIONNUM && result.FIELDTYPE && result.FIELDTYPE == 'MM' && result.METERTYPE != 'CHARACTERISTIC'" 
								ng-attr-id="result.INSPFIELDNUM" 
								ng-model="result.NUMRESPONSE" 
								ng-disabled="inspection.isStatusComplete() || result.METERFLAG == true || result.ERRORFLAG == 2"
							/>

							<div class="ui-combobox" ng-if="result.INSPQUESTIONNUM == question.INSPQUESTIONNUM && result.INSPFIELDOPTION && result.INSPFIELDOPTION.length > 3 ">
								<select ng-attr-id="result.INSPFIELDNUM" 
									ng-model="result.TXTRESPONSE" 
									ng-options="option as option for option in result.INSPFIELDOPTION"
									ng-disabled="inspection.isStatusComplete()"
									>
									<option value="">-- <s:text name="global.selectvalue"/> --</option>
								</select>								
								<span class="ui-arrow"></span>
							</div>

                  			<ul class="ui-listview ui-radiobutton ui-inset" ng-if="result.INSPQUESTIONNUM == question.INSPQUESTIONNUM && result.INSPFIELDOPTION && result.INSPFIELDOPTION.length <= 3 ">
                  				<li class="ui-block" ng-repeat="(key, option) in result.INSPFIELDOPTION" ng-class="{'ui-radiobutton ui-radio-readonly' : inspection.isStatusComplete(), 'ui-radiobutton ui-radio-row-selected' : result.TXTRESPONSE == option}"> 
									<label for="{{$index}}_{{result.INSPFIELDNUM}}">{{option}}</label>
									<input type="radio" id="{{$index}}_{{result.INSPFIELDNUM}}" 
										name="{{result.INSPFIELDNUM}}" 
										ng-model="result.TXTRESPONSE" 
										ng-value="option" 
										ng-checked="result.TXTRESPONSE == option" 
										ng-disabled="inspection.isStatusComplete()" 
										ng-click="radioSelection($event, option, result)"/> 
								</li>
                  			</ul>		
							
							<div class="ui-combobox" ng-if="result.INSPQUESTIONNUM == question.INSPQUESTIONNUM && result.FIELDTYPE && result.FIELDTYPE == 'MM' && result.METERTYPE == 'CHARACTERISTIC'">
								<select ng-attr-id="result.INSPFIELDNUM" 
									ng-model="result.TXTRESPONSE" 
									ng-options="option as option for option in result.METERINFO.VALUE"
									ng-disabled="inspection.isStatusComplete() || result.METERFLAG == true || result.ERRORFLAG == 2"
									>
									 <option value="">-- <s:text name="global.selectvalue"/> --</option>
								</select>								
								<span class="ui-arrow"></span>
							</div>

							<div class="ui-checkbox-field" ng-if="result.INSPQUESTIONNUM == question.INSPQUESTIONNUM && result.FIELDTYPE && result.FIELDTYPE == 'MM' && result.METERTYPE == 'CONTINUOUS' && result.METERINFO.ROLLOVER">
								<label><s:text name="meter.rollover"/></label>
								<checkbox ng-model="result.ROLLOVERFLAG" ng-disabled="inspection.isStatusComplete()"/>
							</div>
							
							<ul class="ui-listview panel" ng-repeat="(key, doclink) in result.DOCLINK" 
								ng-if="result.INSPQUESTIONNUM == question.INSPQUESTIONNUM && result.FIELDTYPE && result.FIELDTYPE == 'FU'">
								<li>
									<div style="text-align:center;">
										<img ng-src="{{doclink.WEBURL}}" width="60%" ng-click="openImg(doclink.WEBURL)"/>
									</div>
									<a class="ui-trash-large" ng-click="deleteAttachment(result.INSPFIELDRESULTID, doclink.DOCLINKID)" ng-if="!inspection.isStatusComplete()"></a>																
								</li>
							</ul>
						
							<div class="ui-inset" style="text-align: center;" ng-if="result.FIELDTYPE == 'TR' && result.DESCRIPTION.indexOf(signatureKey) > -1 && result.TXTRESPONSE && result.IMAGENAME">
								<img style="max-height: 300px; max-width: 300px;" ng-src="viewblob.action?imglibID={{result.TXTRESPONSE}}" />
							</div>
							
							<div class="ui-inset" style="text-align: center;" ng-if="result.FIELDTYPE == 'TR' && result.DESCRIPTION.indexOf(signatureKey) > -1 && result.TXTRESPONSE && !result.IMAGENAME">
								This signature format is not supported in EZMaxMobile. Please review this inspection answer in Maximo.
							</div>
							
							<div ng-if="result.FIELDTYPE == 'FU'" class="ui-attach">
								<a class="ui-button ui-attach-btn"  ng-click="doclinkBrowser(result)">
									<span class="emm-plus"></span> <s:text name="inspection.addattachment"/>
								</a>
								<a class="ui-button ui-attach-btn" ng-click="photo(result)" data-native="true" >
									<span class="emm-plus" ></span> <s:text name="inspection.addattachment"/>
								</a>
								<a class="ui-button ui-attach-btn" style="color:gray" ng-show="inspection.isStatusComplete()" >
									<span class="emm-plus" style="color:gray"></span> <s:text name="inspection.addattachment"/>
								</a>
							</div >
							
							<span ng-if="inspection.STATUS != 'COMPLETED' && (result.FIELDTYPE == 'TR' && result.DESCRIPTION.indexOf(signatureKey) > -1 && !result.TXTRESPONSE)">
								<a class="ui-button" ng-click="sign(result)">
									<span class="emm-pencil"></span> <s:text name="global.addsignature"/>
								</a>
							</span>
							
							<span ng-if="result.METERINFO.HISTORY">
								<button class="ui-button ui-btn-toggle" href="{{'#' + result.INSPFIELDNUM + result.METERTYPE}}">
									<span class="emm-history"></span> <s:text name="inspection.meterhistory"/>
								</button>
								<ul class="ui-listview ui-hidden" id="{{result.INSPFIELDNUM + result.METERTYPE}}">
									<li class="ui-accessory" ng-repeat="(key, history) in result.METERINFO.HISTORY">
										<span>
											<h3 ng-if="result.METERTYPE!='CHARACTERISTIC'"><s:text name="inspection.reading"/>: {{history.READING}}</h3>
											<h3 ng-if="result.METERTYPE=='CHARACTERISTIC'"><s:text name="inspection.observation"/>: {{history.OBSERVATION}}</h3>
											<p><s:text name="inspection.inspector"/>: {{history.INSPECTOR}}</p>
											<p><s:text name="inspection.readingdate"/>: {{history.READINGDATE | date}}</p>									
										</span>
									</li>
								</ul>
							</span>
							
							<!--  Date and Time New field type -->	
							<datepicker 
								date-format="date"
								placeholder="Date"
								ng-model="result.DATERESPONSE" 
								ng-if="result.INSPQUESTIONNUM == question.INSPQUESTIONNUM && result.FIELDTYPE && (result.FIELDTYPE == 'DO' || result.FIELDTYPE == 'DT')"
								id="{{result.INSPFIELDNUM}}"
								disabled="true"
								ng-readonly="inspection.isStatusComplete()" 
							/>
						</li>
						
						<li class="ui-row" ng-if="result.INSPQUESTIONNUM == question.INSPQUESTIONNUM && result.FIELDTYPE && (result.FIELDTYPE == 'DT' || result.FIELDTYPE == 'TO')">
							<datepicker 
								date-format="time"
								placeholder="Time"
								ng-model="result.TIMERESPONSE" 
								id="{{result.INSPFIELDNUM}}_time"
								disabled="true"
								ng-readonly="inspection.isStatusComplete()" 
							/>
						</li>

					</ul>
				</li>
			</ul>

            <s:include value="actions.jsp"/>

        </div>
	</div>
	
	<script type="text/javascript">
		function InspectionController($scope, $http) {
			$scope.inspection = new Inspection(JSON.parse($("#inspFormResult").val()));	
			//Customized configuration to add signature to inspection
			$scope.signatureKey = '[EMM_SIGN]';
			
			$scope.save = function(){
				var request = {
                    url : 'saveinspfieldresult.action',
                    method : "POST",
                    headers: {
                    	'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data : $.param({
                    	jsonParam : JSON.stringify($scope.inspection)
                    })
                };
				
				$http(request).success(function(data, status, headers, config) {
					$scope.inspection = new Inspection($scope.inspection); 
					$scope.inspMessage = data.inspMessage;
				}).error(function(xhr, status, error) {
                	console.log(error);
                });
			}
			
			$scope.photo = function(result){
				var url = $("#ezPhotoURL").val() + '&docType=' + result.DOCTYPE + '&ownerId=' + result.INSPFIELDRESULTID;								
				if (!$scope.toSaveInspection(url)) {
					emm.core.ezphoto(url);
				}
			}
			
			$scope.doclinkBrowser = function(result) {
				var url = 'doclinkbrowser.action?inspFieldNum=' + result.INSPFIELDNUM + '&inspQuestionNum=' + result.INSPQUESTIONNUM + '&docType=' + result.DOCTYPE;
				if (!$scope.toSaveInspection(url)) {
					window.location=url;
				}
			}
			
			$scope.openImg = function(url){
				if (!$scope.toSaveInspection(url)) {
					window.location=url;
				}
			}
			
			$scope.deleteAttachment = function(mboid, doclinkid) {
				if (!$scope.toSaveInspection(null, mboid, doclinkid)) {
					emm.core.deleteAttachment(mboid, doclinkid);
				}
			}
    		
			$scope.goToWorkOrder = function(url) {
				if (!$scope.toSaveInspection(url)) {
					window.location = url;
				}
			}
			$scope.sign = function (result) {
				var url = 'sign.action?inspFieldNum=' + result.INSPFIELDNUM + '&inspQuestionNum=' + result.INSPQUESTIONNUM;
				if (!$scope.toSaveInspection(url)) {
					window.location = url;
				}
			}
			$scope.toSaveInspection = function(url, mboid, doclinkid) {
				if ($scope.inspection.mbo.toBeSaved()) {
					emm.util.confirm(
					{
						message: '<s:text name="inspection.savebeforecontinue"/>',
						no: function()	{
							if (url && url.includes('ezphoto') ) {								
								emm.core.ezphoto(url);	
							} else if (url){
								window.location = url;
							} else if (mboid && doclinkid){
								emm.core.deleteAttachment(mboid, doclinkid);
							} else
								return false;
						}
					});
					return true;
				} else {
					return false;
				}
			}
			
			// show informational instruction on group and invidivual question level
		    $scope.toggleShowHelp = function(question){	
		    	var id = 'help_' + question.INSPQUESTIONNUM;
		    	if ($('#' + id).length > 0) {
		    		$('#'  + question.INSPQUESTIONNUM).empty();
		    	} else {
			    	$('#' + question.INSPQUESTIONNUM).append("<textarea data-htmleditor='true' readonly='true' id='" + id + "'></textarea>");
			    	$('#' + id).val(question.LONGDESCRIPTION);
			    	$('#' + id).htmlEditor();
			    	$('iframe').ready( function() {
				        $('#' + question.INSPQUESTIONNUM + ' iframe').contents().find("head").append($("<style type='text/css'>  body{background-color:white;}  </style>"));
				        $('#' + question.INSPQUESTIONNUM + ' iframe').css('margin-top', '10px');
				    });
		    	}
				
		    }
			
			// select and deselect Radio button
		    $scope.radioSelection = function(e, value, rlt) { 	
		    	var el = e.srcElement ? angular.element(e.srcElement) : angular.element(e.target);	
		    	id = el.attr('id');

				if (rlt.TXTRESPONSE != null && rlt.TXTRESPONSE === value ){
	 				rlt.TXTRESPONSE = null;
	 				$( "span[name='" + id + "']" ).removeClass('ui-radiobutton-on');
					$('#'+el.attr('id')).parent().removeClass('ui-radio-row-selected');
					
	 			} else {
	 				rlt.TXTRESPONSE = value;
	 				$('#'+el.attr('id')).parent().addClass('ui-radio-row-selected');					
					$('#'+el.attr('id')).parent().siblings().removeClass('ui-radio-row-selected');
		   		} 
		    }
			
			console.log($scope.inspection);
		}
	</script>	
</body>
</html>
