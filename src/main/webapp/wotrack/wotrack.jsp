<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html>
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
	<s:if test="offlineModeEnabled eq true">
		<s:if test="!mbo.isNew()">
			<script type="text/javascript">
				// This is the function to bounce offline if user loses connectivity
				// Native app will load the URL that this function returns when user loses connectivity
				function getBounceOfflineUrl() {
					var recordid = '<s:property value="mbo.getUniqueIDValue()"/>';
					// The MBO object should be queried in one SQL clause, this is because when the MBO object is updated, it has a one-to-one mapping to the database
					var woSql = "SELECT * FROM WORKORDER WHERE WORKORDERID = '" + recordid + "'";
					
					// All non-MBO related data should be queried separately
					var extraSql = "SELECT L.DESCRIPTION AS LOCDESC, LAB.LABORCODE AS TIMERLABORCODE, LCR.CRAFT AS TIMERCRAFT, LT.LABTRANSID AS TIMERLABTRANSID, LT.STARTDATE AS TIMERSTARTDATE " + 
						"FROM WORKORDER W LEFT OUTER JOIN LOCATIONS L ON W.LOCATION = L.LOCATION AND W.SITEID = L.SITEID " +
						"LEFT OUTER JOIN LABOR LAB ON W.ORGID = LAB.ORGID AND LAB.PERSONID = '" + '<s:property value="user.getPersonId()"/>' + "' " +
						"LEFT OUTER JOIN LABORCRAFTRATE LCR ON LAB.LABORCODE = LCR.LABORCODE AND LAB.ORGID = LCR.ORGID AND LCR.DEFAULTCRAFT = '1' " +
						"LEFT OUTER JOIN LABTRANS LT ON W.WONUM = LT.WONUM AND W.SITEID = LT.SITEID AND LT.LABORCODE = LAB.LABORCODE AND LT.TIMERSTATUS = 'ACTIVE' " +
						"WHERE W.WORKORDERID='" + recordid + "'";
					
					return EMMServer.DB.Select()
						.addQuery("WORKORDER", woSql)
						.addQuery("EXTRA", extraSql)
						.addQuery("BOUNCE", "SELECT 1 AS ISBOUNCE")
						.getUrl("offline/wotrack/wotrack.htm");
				}			
				
				function prepareBounce() {
					var recordid = '<s:property value="mbo.getUniqueIDValue()"/>';
					var wodesc = $('#DESCRIPTION').val();
					var wolongdesc = $('#DESCRIPTION_LONGDESCRIPTION').val();
					var entity = { 
							"WORKORDERID" : recordid, 
							"WONUM" : '<s:property value="mbo.getString('WONUM')"/>',
							"PARENT" : '<s:property value="mbo.getString('PARENT')"/>', 
							"STATUS" : '<s:property value="mbo.getString('STATUS')"/>',
							"STATUSDATE" : '<s:property value="mbo.getString('STATUSDATE')"/>', 
							"DESCRIPTION" : wodesc,
							"LONGDESCRIPTION" : wolongdesc,  
							"LOCATION" : '<s:property value="mbo.getString('LOCATION')"/>',  
							"ASSETNUM" : '<s:property value="mbo.getString('ASSETNUM')"/>',  
							"PERSONGROUP" : '<s:property value="mbo.getString('PERSONGROUP')"/>',
							"AMCREW" : '<s:property value="mbo.getString('AMCREW')"/>',
							"SUPERVISOR" : '<s:property value="mbo.getString('SUPERVISOR')"/>',
							"LEAD": '<s:property value="mbo.getString('LEAD')"/>',
							"PHONE": '<s:property value="mbo.getString('PHONE')"/>',
							"REPORTEDBY" : '<s:property value="mbo.getString('REPORTEDBY')"/>',
							"REPORTDATE" : '<s:property value="mbo.getString('REPORTDATE')"/>',
							"WOPRIORITY" : '<s:property value="mbo.getString('WOPRIORITY')"/>',
							"WORKTYPE" : '<s:property value="mbo.getString('WORKTYPE')"/>',
							"ISTASK" : 0,
							"SITEID" :  '<s:property value="mbo.getString('SITEID')"/>',
							"ORGID" :  '<s:property value="mbo.getString('ORGID')"/>'
						};
					var failureEntity = { 
							"WORKORDERID" : recordid, 
							"WONUM" : '<s:property value="mbo.getString('WONUM')"/>',
							"FAILURECODE" : '<s:property value="mbo.getString('FAILURECODE')"/>', 
							"PROBLEMCODE" : '<s:property value="mbo.getString('PROBLEMCODE')"/>',
							"SITEID" :  '<s:property value="mbo.getString('SITEID')"/>',
							"ORGID" :  '<s:property value="mbo.getString('ORGID')"/>'
						}
					
					EMMServer.Offline.Bounce()
						.checkEntity("SELECT * FROM WORKORDER WHERE WORKORDERID ='" + recordid + "'")
						.addBounceUrl(getBounceOfflineUrl())
						.addBounceEntity("WORKORDER", "WORKORDERID='" + recordid + "'", entity)
						.addBounceEntity("FAILUREREPORT", "WORKORDERID='" + recordid + "'", failureEntity)
						.prepare();
				}
				
				function saveOrPrepBounce() {
                    $.ajax( "view.action" )
                          .done(function() { emm.core.save(); prepareBounce(); })
                          .fail(function() { prepareBounce(); location.reload(); })
              	}
				
				$(function(){
					prepareBounce();
				});
			</script>
		</s:if>			
	</s:if> 
</head>

<body>
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
        	<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
            <h3 class="ui-title"><s:text name="ezmaxmobile.wotrack"/></h3>
            <%-- <s:if test="!mbo.isNew()">                
            	<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="saveOrPrepBounce();"><span class="emm-floppy-o"></span></a>
			</s:if>
            <s:else> --%>
				<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
            <%-- </s:else> --%>
            <a class="ui-btn-right" data-scrollto="#ACTIONS"><span class="emm-ellipsis-v"></span></a>     
<!-- 	        <div class="ui-subheader" > -->
<%-- 				<button onclick="emm.core.doChangeStatus('APPR')" title="Approve Work Order"><span class="emm-check-circle-o"></span></button> --%>
<%-- 				<button onclick="emm.core.doChangeStatus('INPRG')" title="Initiate Work Order"><span class="emm-play-circle"></span></button> --%>
<%-- 				<button onclick="emm.core.doChangeStatus('COMP')" title="Complete Work Order"><span class="emm-check-circle"></span></button> --%>
<%-- 				<button onclick="window.location.href='../worklog/add.action'" title="Add Worklog"><span class="emm-files-o"></span></button> --%>
<%-- 	       		<s:if test="mbo.getMboSet('$MYACTIVETIMER', 'LABTRANS', \"refwo=:wonum and siteid=:siteid and timerstatus in (select value from synonymdomain where domainid = 'TIMERSTATUS' and maxvalue = 'ACTIVE') and laborcode = (select laborcode from labor where personid = :&PERSONID& and orgid = :orgid)\").isEmpty()"> --%>
<%-- 	        		<button onclick="window.location.href='starttimer.action'" title="Start Timer"><span class="emm-clock-o"></span></button> --%>
<%-- 	        	</s:if> --%>
<%-- 	        	<s:else> --%>
<%-- 					<button class="ui-btn-c" onclick="window.location.href='stoptimer.action'" title="Stop Timer"><span class="emm-clock-o"></span></button> --%>
<%-- 				</s:else> --%>
<!-- 	        </div>  -->
            <s:include value="../common/statusbar.jsp"/>
        </div>
		
		<div class="ui-content">			
			
			<ul class="ui-listview ui-inset" data-visible="<s:property value='!mbo.isNew() && isMboPrevNextVisible()'/>">
				<li class="ui-pagination">	
					<a class="ui-pagination-prev" href="#" onclick="emm.core.movePrev('prevwo.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
					<div class="ui-container">
						<span><s:text name="global.prev"/></span>
						<span><s:text name="global.next"/></span>
					</div>
					<a class="ui-pagination-next" href="#" onclick="emm.core.moveNext('nextwo.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
				</li>
			</ul>			
			
			<ul class="ui-listview ui-message-e" data-visible="<s:property value="!mbo.getMboDataSet('WOSLHAZPRECENABLED').isEmpty() or !mbo.getMboDataSet('WOSLTAGENABLED').isEmpty()"/>">			
				<li class="ui-divider ui-divider-c"><s:text name="global.hazards"/></li>	
				<li>
					<ul class="ui-listview ui-message-e" data-visible="<s:property value="!mbo.getMboDataSet('WOSLHAZPRECENABLED').isEmpty()"/>">
						<s:iterator value="mbo.getMboDataSet('WOSLHAZPRECENABLED')">
							<li>
								<span>
									<h3><strong><s:property value="getString('HAZARDDESCRIPTION')"/></strong></h3>
									<s:if test="getString('HAZARDDESCRIPTION_LONGDESCRIPTION') neq ''">
										<br />
										<p class="ui-wrap"><s:property value="getString('HAZARDDESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/></p>
									</s:if>									
									<ul class="ui-listview ui-message-e" data-visible="<s:property value="!getMboDataSet('WOHAZARDPREC').isEmpty()"/>">
										<li class="ui-divider ui-divider-c"><s:text name="global.precautions"/></li>
										<s:iterator value="getMboDataSet('WOHAZARDPREC')">
											<li>
												<span>
													<h3 class="ui-wrap"><s:property value="getString('DESCRIPTION')"/></h3>
													<s:if test="getString('DESCRIPTION_LONGDESCRIPTION') neq ''">
														<br />
														<p class="ui-wrap"><s:property value="getString('DESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/></p>
													</s:if>
												</span>
											</li>										
										</s:iterator>
									</ul>
								</span>
							</li>
						</s:iterator>
					</ul>
				</li>
				<li class="ui-divider ui-divider-c" data-visible="<s:property value="!mbo.getMboDataSet('WOSLHAZMATENABLED').isEmpty()"/>"><s:text name="global.hazardousmaterials"/></li>
				<li>
					<ul class="ui-listview ui-message-e" data-visible="<s:property value="!mbo.getMboDataSet('WOSLHAZMATENABLED').isEmpty()"/>">
						<s:iterator value="mbo.getMboDataSet('WOSLHAZMATENABLED')">
							<li>
								<span>
									<h3><strong><s:property value="getString('HAZARDDESCRIPTION')"/></strong></h3>
									<s:if test="getString('HAZARDDESCRIPTION_LONGDESCRIPTION') neq ''">
										<br />
										<p class="ui-wrap"><s:property value="getString('HAZARDDESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/></p>
									</s:if>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/></strong>: <s:property value="getString('LOCATION')"/></p>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('ASSETNUM').getTitle()"/></strong>: <s:property value="getString('ASSETNUM')"/></p>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('HEALTHRATING').getTitle()"/></strong>: <s:property value="getString('HEALTHRATING')"/></p>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('FLAMMABILITYRATING').getTitle()"/></strong>: <s:property value="getString('FLAMMABILITYRATING')"/></p>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('REACTIVITYRATING').getTitle()"/></strong>: <s:property value="getString('REACTIVITYRATING')"/></p>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('CONTACTRATING').getTitle()"/></strong>: <s:property value="getString('CONTACTRATING')"/></p>																											
								</span>
							</li>
						</s:iterator>
					</ul>
				</li>				
				<li class="ui-divider ui-divider-c" data-visible="<s:property value="!mbo.getMboDataSet('WOSLTAGENABLED').isEmpty()"/>"><s:text name="global.lockouttagout"/></li>
				<li>
					<ul class="ui-listview ui-message-e" data-visible="<s:property value="!mbo.getMboDataSet('WOSLTAGENABLED').isEmpty()"/>">
						<s:iterator value="mbo.getMboDataSet('WOSLTAGENABLED')">
							<li>
								<span>
									<h3><strong><s:property value="getString('HAZARDDESCRIPTION')"/></strong></h3>
									<s:if test="getString('HAZARDDESCRIPTION_LONGDESCRIPTION') neq ''">
										<br />
										<p class="ui-wrap"><s:property value="getString('HAZARDDESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/></p>
									</s:if>	
									<ul class="ui-listview ui-message-e" data-visible="<s:property value="!getMboDataSet('WOSAFETYLINKTAG').isEmpty()"/>">
										<s:iterator value="getMboDataSet('WOSAFETYLINKTAG')">
											<li class="ui-divider ui-divider-c"><s:text name="global.tagouts"/></li>
											<li>
												<span>
													<h3 class="ui-wrap"><s:property value="getString('TAGOUTDESCRIPTION')"/></h3>
													<s:if test="getString('TAGOUTDESCRIPTION_LONGDESCRIPTION') neq ''">
														<br />
														<p class="ui-wrap"><s:property value="getString('TAGOUTDESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/></p>
													</s:if>
													<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('TAGOUTLOCATION').getTitle()"/></strong>: <s:property value="getString('TAGOUTLOCATION')"/></p>
													<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('TAGOUTASSETNUM').getTitle()"/></strong>: <s:property value="getString('TAGOUTASSETNUM')"/></p>
													<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('REQUIREDSTATE').getTitle()"/></strong>: <s:property value="getString('REQUIREDSTATE')"/></p>
													<ul class="ui-listview ui-message-e" data-visible="<s:property value="!getMboDataSet('WOTAGLOCK').isEmpty()"/>">
														<li class="ui-divider ui-divider-c"><s:text name="global.lockout"/></li>
														<s:iterator value="getMboDataSet('WOTAGLOCK')">
															<li>
																<span>
																	<h3 class="ui-wrap"><s:property value="getString('DEVICEDESCRIPTION')"/></h3>
																	<s:if test="getString('DEVICEDESCRIPTION_LONGDESCRIPTION') neq ''">
																		<br />
																		<p class="ui-wrap"><s:property value="getString('DEVICEDESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/></p>
																	</s:if>
																	<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('APPLYSEQ').getTitle()"/></strong>: <s:property value="getString('APPLYSEQ')"/></p>
																	<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/></strong>: <s:property value="getString('LOCATION')"/></p>
																	<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('ASSETNUM').getTitle()"/></strong>: <s:property value="getString('ASSETNUM')"/></p>
																	<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('REQUIREDSTATE').getTitle()"/></strong>: <s:property value="getString('REQUIREDSTATE')"/></p>
																</span>
															</li>
														</s:iterator>
													</ul>													
												</span>
											</li>
										</s:iterator>
									</ul>
								</span>
							</li>
						</s:iterator>
					</ul>
				</li>
			</ul>
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input type="text"
							id="WONUM" 
							required="<s:property value="mbo.getMboValueData('WONUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('WONUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('WONUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('WONUM').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION_LONGDESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION_LONGDESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION_LONGDESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION_LONGDESCRIPTION').isReadOnly()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('DESCRIPTION_LONGDESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field ui-field-auto ui-details ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<p><s:property value="mbo.getString('STATUS')" /></p>
					<p><s:property value="mbo.getString('STATUSDATE')" /></p>
				</li>
				<s:if test="!mbo.isNew()">
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('PARENT').getTitle()" /></label>
						<input type="text"
							readonly="true"
							value="<s:property value="mbo.getString('PARENT')" />"
						/>
						<s:if  test='mbo.getMboSet("PARENT").getMbo(0).getUniqueIDValue() neq null'>
							<a class="ui-arrow" href="view.action?id=<s:property value='mbo.getMboSet("PARENT").getMbo(0).getUniqueIDValue()'/>"></a>
						</s:if>
					</li>				
				</s:if>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
					<input type="text"
						readonly="true"
						value="<s:property value="mbo.getString('SITEID')" />"
					/>
				</li>
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
					/>
					<p id="LOCATION.DESCRIPTION" data-update="true"><s:property value="mbo.getString('LOCATION.DESCRIPTION')"/></p>
					<a class="ui-arrow" onclick="" data-control="dialog" href="#locationlookupdialog"></a>
				</li>
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSETNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
					/>
					<p id="ASSET.DESCRIPTION" data-update="true"><s:property value="mbo.getString('ASSET.DESCRIPTION')"/></p>
					<a class="ui-arrow" onclick="" data-control="dialog" href="#assetlookupdialog"></a>
				</li>			
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('WORKTYPE').getTitle()" /></label>
					<input type="text"
							id="WORKTYPE" 
							required="<s:property value="mbo.getMboValueData('WORKTYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('WORKTYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('WORKTYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<p id="WORKTYPE.WTYPEDESC" data-update="true"><s:property value="mbo.getString('WORKTYPE.WTYPEDESC')"/></p>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="WORKTYPE" data-source="WORKTYPE" data-display="WORKTYPE,WTYPEDESC,ORGID" data-search="WORKTYPE,WTYPEDESC"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WOPRIORITY').getTitle()" /></label>
					<input type="text"
							id="WOPRIORITY" 
							required="<s:property value="mbo.getMboValueData('WOPRIORITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('WOPRIORITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('WOPRIORITY')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li> 
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLACCOUNT').getTitle()" /></label>
					<input type="text"
							id="GLACCOUNT" 
							required="<s:property value="mbo.getMboValueData('GLACCOUNT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLACCOUNT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLACCOUNT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)"></a>
				</li>
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('JPNUM').getTitle()" /></label>
					<input type="text"
							id="JPNUM" 
							required="<s:property value="mbo.getMboValueData('JPNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('JPNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('JPNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<p><s:property value="mbo.getString('JOBPLAN.DESCRIPTION')"/></p>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="JPNUM" data-source="JPNUM" data-display="JPNUM,DESCRIPTION" data-search="JPNUM,DESCRIPTION"></a>
				</li>	
				<s:if test="isInspectionEnabled()">
					<li class="ui-field ui-field-auto ui-details">
						<label><s:property value="mbo.getMboValueInfoStatic('INSPFORMNUM').getTitle()" /></label>
						<input type="text"
								id="INSPFORMNUM" 
								required="<s:property value="mbo.getMboValueData('INSPFORMNUM').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('INSPFORMNUM').isReadOnly()"/>"
								value="<s:property value="mbo.getString('INSPFORMNUM')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<p><s:property value="mbo.getString('INSPECTIONFORM.NAME')"/></p>
						<a class="ui-arrow" data-control="dialog" href="#inspectionlookupdialog"></a>
					</li>
				</s:if>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FAILURECODE').getTitle()" /></label>
					<input type="text"
							id="FAILURECODE" 
							required="<s:property value="mbo.getMboValueData('FAILURECODE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FAILURECODE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('FAILURECODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FAILURECODE" data-source="FAILURECODE" data-display="FAILURECODE,DESCRIPTION,ORGID" data-search="FAILURECODE,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PROBLEMCODE').getTitle()" /></label>
					<input type="text"
							id="PROBLEMCODE" 
							required="<s:property value="mbo.getMboValueData('PROBLEMCODE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PROBLEMCODE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PROBLEMCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PROBLEMCODE" data-source="FAILURECODE" data-display="FAILURECODE,FAILURECODE.DESCRIPTION,ORGID" data-search="FAILURECODE,FAILURECODE.DESCRIPTION"></a>
				</li>
				<s:if test="!mbo.isNew()">
					<li class="ui-field ui-field-auto ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('REPORTEDBY').getTitle()" /></label>
						<p><s:property value="mbo.getString('REPORTEDBY')" /></p>
						<p><s:property value="mbo.getString('REPORTDATE')" /></p>
					</li>									
				</s:if>	
				<li class="ui-divider"><s:text name="global.scheduleinfo"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TARGSTARTDATE').getTitle()" /></label>
					<input type="text"
							id="TARGSTARTDATE" 
							required="<s:property value="mbo.getMboValueData('TARGSTARTDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TARGSTARTDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('TARGSTARTDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="TARGSTARTDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TARGCOMPDATE').getTitle()" /></label>
					<input type="text"
							id="TARGCOMPDATE" 
							required="<s:property value="mbo.getMboValueData('TARGCOMPDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TARGCOMPDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('TARGCOMPDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="TARGCOMPDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SCHEDSTART').getTitle()" /></label>
					<input type="text"
							id="SCHEDSTART" 
							required="<s:property value="mbo.getMboValueData('SCHEDSTART').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SCHEDSTART').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('SCHEDSTART').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="SCHEDSTART"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SCHEDFINISH').getTitle()" /></label>
					<input type="text"
							id="SCHEDFINISH" 
							required="<s:property value="mbo.getMboValueData('SCHEDFINISH').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SCHEDFINISH').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('SCHEDFINISH').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="SCHEDFINISH"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ACTSTART').getTitle()" /></label>
					<input type="text"
							id="ACTSTART" 
							required="<s:property value="mbo.getMboValueData('ACTSTART').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ACTSTART').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('ACTSTART').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="ACTSTART"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ACTFINISH').getTitle()" /></label>
					<input type="text"
							id="ACTFINISH" 
							required="<s:property value="mbo.getMboValueData('ACTFINISH').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ACTFINISH').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('ACTFINISH').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="ACTFINISH"></a>
				</li>
				<li class="ui-divider"><s:text name="global.responsibility"/></li>
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('SUPERVISOR').getTitle()" /></label>
					<input type="text"
							id="SUPERVISOR" 
							required="<s:property value="mbo.getMboValueData('SUPERVISOR').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SUPERVISOR').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SUPERVISOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SUPERVISOR" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME,FIRSTNAME,LASTNAME" data-search="PERSONID,FIRSTNAME,LASTNAME"></a>
				</li>
				<s:if test="!mbo.isNew()">
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('SUPERVISOR.PERSON.PRIMARYPHONE').getTitle()" /></label>
						<input type="text"
								id="SUPERVISOR.PERSON.PRIMARYPHONE" 
								required="<s:property value="mbo.getMboValueData('SUPERVISOR.PERSON.PRIMARYPHONE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('SUPERVISOR.PERSON.PRIMARYPHONE').isReadOnly()"/>"
								value="<s:property value="mbo.getString('SUPERVISOR.PERSON.PRIMARYPHONE')"/>"
						/>
						<a class="ui-arrow" onclick="emm.util.phone('<s:property value="mbo.getString('SUPERVISOR.PERSON.PRIMARYPHONE')"/>')"></a>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('SUPERVISOR.PERSON.PRIMARYEMAIL').getTitle()" /></label>
						<input type="text"
								id="SUPERVISOR.PERSON.PRIMARYEMAIL" 
								required="<s:property value="mbo.getMboValueData('SUPERVISOR.PERSON.PRIMARYEMAIL').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('SUPERVISOR.PERSON.PRIMARYEMAIL').isReadOnly()"/>"
								value="<s:property value="mbo.getString('SUPERVISOR.PERSON.PRIMARYEMAIL')"/>"
						/>
						<a class="ui-arrow" onclick="emm.util.email('<s:property value="mbo.getString('SUPERVISOR.PERSON.PRIMARYEMAIL')"/>')"></a>
					</li>
				</s:if>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('AMCREW').getTitle()" /></label>
					<input type="text"
							id="AMCREW" 
							required="<s:property value="mbo.getMboValueData('AMCREW').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('AMCREW').isReadOnly()"/>"
							value="<s:property value="mbo.getString('AMCREW')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="AMCREW" data-source="AMCREW" data-display="AMCREW,DESCRIPTION,AMCREWTYPE,ORGID" data-search="AMCREW,DESCRIPTION,AMCREWTYPE,ORGID"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LEAD').getTitle()" /></label>
					<input type="text"
							id="LEAD" 
							required="<s:property value="mbo.getMboValueData('LEAD').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LEAD').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LEAD')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LEAD" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME,FIRSTNAME,LASTNAME" data-search="PERSONID,FIRSTNAME,LASTNAME"></a>
				</li>
				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PERSONGROUP').getTitle()" /></label>
					<input type="text"
							id="PERSONGROUP" 
							required="<s:property value="mbo.getMboValueData('PERSONGROUP').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PERSONGROUP').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PERSONGROUP')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PERSONGROUP" data-source="PERSONGROUP" data-display="PERSONGROUP,DESCRIPTION" data-search="PERSONGROUP,DESCRIPTION"></a>
				</li>
				<s:if test="!mbo.isNew()">  
					<li class="ui-field ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('OWNER').getTitle()" /></label>
						<p><s:property value="mbo.getString('OWNER')" /></p>
						<p><s:property value="mbo.getString('OWNERPERSON.DISPLAYNAME')" /></p>
					</li>	
					<li class="ui-field ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('OWNERGROUP').getTitle()" /></label>
						<p><s:property value="mbo.getString('OWNERGROUP')" /></p>
						<p><s:property value="mbo.getString('PERSONGROUPUSEDBYTICKET.DESCRIPTION')" /></p>
					</li>		
				</s:if>
			</ul>
			
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>	
			</s:if>
		</div>		
	</div>
	<div id="notification" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="global.send"/> <s:text name="global.notification"/></h1>
			</div>			
			<div class="ui-content">
				<form action="push.action" method="post">							
					<ul class="ui-listview">	
						<li class="ui-field">
							<label><s:text name="global.notify"/> <s:property value="mbo.getMboValueInfoStatic('LEAD').getTitle()" /></label>
							<p><s:property value="mbo.getMboSet('$WOLEAD', 'PERSON', 'PERSONID = :LEAD').getMbo(0).getString('DISPLAYNAME')"/></p>
							<input type="checkbox" name="personOptions" value="<s:property value="mbo.getString('LEAD')"/>"/>
						</li>							
						<li class="ui-field">
							<label><s:text name="global.notify"/> <s:property value="mbo.getMboValueInfoStatic('SUPERVISOR').getTitle()" /></label>
							<p><s:property value="mbo.getString('SUPERVISOR.PERSON.DISPLAYNAME')"/></p>
							<input type="checkbox" name="personOptions" value="<s:property value="mbo.getString('SUPERVISOR')"/>"/>
						</li>			
						<li class="ui-field">
							<label><s:text name="global.notify"/> <s:property value="mbo.getMboValueInfoStatic('PERSONGROUP').getTitle()" /></label>
							<p><s:property value="mbo.getString('WORKORDERPERSONGROUP.DESCRIPTION')"/></p>
							<input type="checkbox" name="groupOptions" value="<s:property value="mbo.getString('PERSONGROUP')"/>"/>
						</li>
						<li class="ui-divider"><s:text name="global.message"/></li>
						<li class="ui-field-block">
							<textarea id="notificationMessage" name="notificationMessage"></textarea>
						</li>
					</ul>	
					<div class="ui-btn-container">
						<input class="ui-btn-a" type="submit" value="<s:text name="global.send"/>"/>								
					</div>
				</form>	
			</div>
		</div>
	</div>
	<div id="event" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="event.prompt"/></h1>
			</div>			
			<div class="ui-content">
				<form action="addevent.action" method="post">							
					<ul class="ui-listview">
						<s:if test="mbo.getString('UXLEAD.PRIMARYEMAIL') == null or mbo.getString('UXLEAD.PRIMARYEMAIL') eq ''">
							<li class="ui-callout ui-message-a"><s:text name="event.missingemail"/></li>
						</s:if>
						<li class="ui-field">
							<label><s:property value="mbo.getMboValueInfoStatic('LEAD').getTitle()" /></label>
							<p><s:property value="mbo.getMboSet('$WOLEAD', 'PERSON', 'PERSONID = :LEAD').getMbo(0).getString('DISPLAYNAME')"/></p>
							<s:if test="mbo.getString('UXLEAD.PRIMARYEMAIL') != null and mbo.getString('UXLEAD.PRIMARYEMAIL') neq ''">
								<input type="checkbox" name="personOptions"
									value="<s:property value="mbo.getString('UXLEAD.PRIMARYEMAIL')"/>,<s:property value="mbo.getString('UXLEAD.DISPLAYNAME')"/>,<s:property value="mbo.getString('LEAD')"/>"/>
							</s:if>
						</li>
						<s:if test="mbo.getString('UXSUPERVISOR.PRIMARYEMAIL') == null or mbo.getString('UXSUPERVISOR.PRIMARYEMAIL') eq ''">
							<li class="ui-callout ui-message-a"><s:text name="event.missingemail"/></li>
						</s:if>
						<li class="ui-field">
							<label><s:property value="mbo.getMboValueInfoStatic('SUPERVISOR').getTitle()" /></label>
							<p><s:property value="mbo.getString('UXSUPERVISOR.DISPLAYNAME')"/></p>
							<s:if test="mbo.getString('UXSUPERVISOR.PRIMARYEMAIL') != null and mbo.getString('UXSUPERVISOR.PRIMARYEMAIL') neq ''">
								<input type="checkbox" name="personOptions"
									value="<s:property value="mbo.getString('UXSUPERVISOR.PRIMARYEMAIL')"/>,<s:property value="mbo.getString('UXSUPERVISOR.DISPLAYNAME')"/>,<s:property value="mbo.getString('SUPERVISOR')"/>"/>
							</s:if>
						</li>
						<!-- Requester -->
							<!-- <s:if test="mbo.getString('REPORTEDBY.PRIMARYEMAIL') == null or mbo.getString('REPORTEDBY.PRIMARYEMAIL') eq ''">
								<li class="ui-callout ui-message-a"><s:text name="event.missingemail"/></li>
							</s:if> -->
<!-- 						<li class="ui-field"> -->
<%-- 							<label><s:property value="mbo.getMboValueInfoStatic('REPORTEDBY').getTitle()" /></label> --%>
<%-- 							<p><s:property value="mbo.getString('REPORTEDBY.DISPLAYNAME')"/></p> --%>
								<!-- <s:if test="mbo.getString('REPORTEDBY.PRIMARYEMAIL') != null and mbo.getString('REPORTEDBY.PRIMARYEMAIL') neq ''"> -->
<!-- 							<input type="checkbox" name="personOptions" -->
<%-- 								value="<s:property value="mbo.getString('REPORTEDBY.PRIMARYEMAIL')"/>,<s:property value="mbo.getString('REPORTEDBY.DISPLAYNAME')"/>,<s:property value="mbo.getString('REPORTEDBY')"/>"/> --%>
								<!-- </s:if> -->
<!-- 						</li>			 -->
					</ul>	
					<div class="ui-btn-container">
						<input class="ui-btn-a" type="submit" value="<s:text name="global.send"/>"/>								
					</div>
				</form>	
			</div>
		</div>
	</div>
	<div id="locationlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.location"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"><s:text name="global.lookup"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.locationDrilldown(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID"><s:text name="global.drilldown"/></a>
				</div>
				<div class="ui-btn-container" data-native="true">
					<a class="ui-btn-a" data-dismiss="modal"
						data-control="map"
						data-modules='[{"dataSourceId":"DS_LOCATIONS","isLookup":true}]'
					>
						<s:text name="global.map"/>
					</a>
				</div>	
				<div class="ui-btn-container" data-native="true">
					<a class="ui-btn-a" onclick="emm.nativeapp.scanBarcode('#LOCATION')" data-dismiss="modal"><s:text name="global.scanbarcode"/></a>
				</div>
			</div>
		</div>
	</div>
	<div id="assetlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.asset"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,ORGID" data-search="ASSETNUM,DESCRIPTION,LOCATION"><s:text name="global.lookup"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.assetDrilldown(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,ORGID"><s:text name="global.drilldown"/></a>
				</div>
				<div class="ui-btn-container" data-native="true">
					<a class="ui-btn-a" data-dismiss="modal"
						data-control="map"
						data-modules='[{"dataSourceId":"DS_ASSETS","isLookup":true}]'
					>
						<s:text name="global.map"/>
					</a>
				</div>
				<div class="ui-btn-container" data-native="true">
					<a class="ui-btn-a" onclick="emm.nativeapp.scanBarcode('#ASSETNUM')" data-dismiss="modal"><s:text name="global.scanbarcode"/></a>
				</div>	
			</div>
		</div>
	</div>
	
	<div id="inspectionlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.inspection"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="INSPFORMNUM" data-source="INSPECTIONFORM.INSPFORMNUM" data-display="INSPECTIONFORM.INSPFORMNUM,INSPECTIONFORM.NAME,INSPECTIONFORM.REVISION" data-search="INSPECTIONFORM.INSPFORMNUM,INSPECTIONFORM.NAME"><s:text name="inspection.recommendedforms"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="INSPFORMNUM" data-source="INSPFORMNUM" data-display="INSPFORMNUM,NAME,REVISION" data-search="INSPFORMNUM,NAME"><s:text name="inspection.otherforms"/></a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
