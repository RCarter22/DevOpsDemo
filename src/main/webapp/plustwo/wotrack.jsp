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
	<script type="text/javascript">
		function mapLocationLookup(){			
			// Create new Map object
			var map = new emm.maps.Map();
			map.setProvider(emm.maps.Providers.GOOGLE);
			map.setSidebar('/plustwo/map/sidebar_location.htm');
			map.addEventListener('onDataSelected', function(data){
				$('#LOCATION').val(data.LOCATION).change();
			});
			
			// Data Source
			var ds = new emm.maps.DataSource();
			ds.setKey('LOCATIONS');
			ds.setTitle('Locations');
			ds.setImage('/images/pins/location.png');
			ds.setCallout('/plustwo/map/callout_location.htm')
			ds.setLatLngFields('LATITUDEY', 'LONGITUDEX');
			ds.addEventListener('onBoundsChanged', function(bounds){
				return '/plustwo/ws/locationlookup.action?' + $.param(bounds);
			});
			
			// Add Data Source to Map
			map.addDataSource(ds);				
			
			// Launch Map
			emm.maps.launchMap(map);
		}		
		function mapAssetLookup(){			
			// Create new Map object
			var map = new emm.maps.Map();
			map.setProvider(emm.maps.Providers.GOOGLE);
			map.setSidebar('/plustwo/map/sidebar_asset.htm');			
			map.addEventListener('onDataSelected', function(data){
				$('#ASSETNUM').val(data.ASSETNUM).change();
			});			
			
			// Data Source
			var ds = new emm.maps.DataSource();
			ds.setKey('ASSETS');
			ds.setTitle('Assets');
			ds.setImage('/images/pins/asset.png');
			ds.setCallout('/plustwo/map/callout_asset.htm')
			ds.setLatLngFields('LATITUDEY', 'LONGITUDEX');
			ds.addEventListener('onBoundsChanged', function(bounds){
				return '/plustwo/ws/assetlookup.action?' + $.param(bounds);
			});
			
			// Add Data Source to Map
			map.addDataSource(ds);				
						
			// Launch Map
			emm.maps.launchMap(map);
		}			
	</script>
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
						.getUrl("offline/plustwo/wotrack.htm");
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
							"CREWID" : '<s:property value="mbo.getString('CREWID')"/>',
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
        	<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
            <h3 class="ui-title"><s:text name="Work Order Tracking (Tr)"/></h3>
            <%-- <s:if test="!mbo.isNew()">                
            	<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="saveOrPrepBounce();"><s:text name="global.save"/></a>
			</s:if>
            <s:else> --%>
            	<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
            <%-- </s:else> --%>
        </div>
		
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			
			<ul class="ui-listview ui-inset" data-visible="<s:property value='!mbo.isNew()'/>">
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
										<p class="ui-wrap"><s:property value="getString('HAZARDDESCRIPTION_LONGDESCRIPTION')" escapeHtml="fale"/></p>
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
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/></strong>: <s:property value="getString('LOCATION')"/></p>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('ASSETNUM').getTitle()"/></strong>: <s:property value="getString('ASSETNUM')"/></p>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('HEALTHRATING').getTitle()"/></strong>: <s:property value="getString('HEALTHRATING')"/></p>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('FLAMMABILITYRATING').getTitle()"/></strong>: <s:property value="getString('FLAMMABILITYRATING')"/></p>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('REACTIVITYRATING').getTitle()"/></strong>: <s:property value="getString('REACTIVITYRATING')"/></p>
									<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('CONTACTRATING').getTitle()"/></strong>: <s:property value="getString('CONTACTRATING')"/></p>																											
									<s:if test="getString('HAZARDDESCRIPTION_LONGDESCRIPTION') neq ''">
										<br />
										<p class="ui-wrap"><s:property value="getString('HAZARDDESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/></p>
									</s:if>									
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
										<li class="ui-divider ui-divider-c"><s:text name="global.tagouts"/></li>
										<s:iterator value="getMboDataSet('WOSAFETYLINKTAG')">
											<li>
												<span>
													<h3 class="ui-wrap"><s:property value="getString('TAGOUTDESCRIPTION')"/></h3>
													<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('TAGOUTLOCATION').getTitle()"/></strong>: <s:property value="getString('TAGOUTLOCATION')"/></p>
													<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('TAGOUTASSETNUM').getTitle()"/></strong>: <s:property value="getString('TAGOUTASSETNUM')"/></p>
													<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('REQUIREDSTATE').getTitle()"/></strong>: <s:property value="getString('REQUIREDSTATE')"/></p>
													<s:if test="getString('TAGOUTDESCRIPTION_LONGDESCRIPTION') neq ''">
														<br />
														<p class="ui-wrap"><s:property value="getString('TAGOUTDESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/></p>
													</s:if>													
													<ul class="ui-listview ui-message-e" data-visible="<s:property value="!getMboDataSet('WOTAGLOCK').isEmpty()"/>">
														<li class="ui-divider ui-divider-c"><s:text name="global.lockout"/></li>
														<s:iterator value="getMboDataSet('WOTAGLOCK')">
															<li>
																<span>
																	<h3 class="ui-wrap"><s:property value="getString('DEVICEDESCRIPTION')"/></h3>
																	<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('APPLYSEQ').getTitle()"/></strong>: <s:property value="getString('APPLYSEQ')"/></p>
																	<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/></strong>: <s:property value="getString('LOCATION')"/></p>
																	<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('ASSETNUM').getTitle()"/></strong>: <s:property value="getString('ASSETNUM')"/></p>
																	<p class="ui-wrap"><strong><s:property value="getMboValueInfoStatic('REQUIREDSTATE').getTitle()"/></strong>: <s:property value="getString('REQUIREDSTATE')"/></p>
																	<s:if test="getString('DEVICEDESCRIPTION_LONGDESCRIPTION') neq ''">
																		<br />
																		<p class="ui-wrap"><s:property value="getString('DEVICEDESCRIPTION_LONGDESCRIPTION')" escapeHtml="false"/></p>
																	</s:if>
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
							maxlength="<s:property value="mbo.getMboValueData(DESCRIPTION').getLength()"/>"
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
					<p><s:property value="%{mbo.getString('STATUS')}" /></p>
					<p><s:property value="%{mbo.getString('STATUSDATE')}" /></p>
				</li>
				<s:if test="!mbo.isNew()">
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('PARENT').getTitle()" /></label>
						<s:textfield readonly="true" value="%{mbo.getString('PARENT')}" />
						<s:if  test='mbo.getMboSet("PARENT").getMbo(0).getUniqueIDValue() neq null'>
							<a class="ui-arrow" onclick="view.action?id=<s:property value='mbo.getMboSet("PARENT").getMbo(0).getUniqueIDValue()'/>"></a>
						</s:if>
					</li>				
				</s:if>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
					<s:textfield readonly="true" value="%{mbo.getString('SITEID')}" />
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
					<label><s:property value="mbo.getMboValueInfoStatic('REPAIRFACILITY').getTitle()" /></label>
					<input type="text"
							id="REPAIRFACILITY" 
							required="<s:property value="mbo.getMboValueData('REPAIRFACILITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REPAIRFACILITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('REPAIRFACILITY')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
					/>
					<p id="REPAIRFACILITY.DESCRIPTION" data-update="true"><s:property value="mbo.getString('REPAIRFACILITY.DESCRIPTION')"/></p>
					<a class="ui-arrow" onclick="" data-control="dialog" href="#repairlocationlookupdialog"></a>
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
					<p id="PLUSTDEFASSETALIAS.ALIAS" data-update="true"><s:property value="mbo.getMboValueInfoStatic('PLUSTDEFASSETALIAS.ALIAS').getTitle()"/>: <s:property value="mbo.getString('PLUSTDEFASSETALIAS.ALIAS')"/></p>
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
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('AEPUSINGDEPARTMENT').getTitle()" /></label>
					<input type="text"
							id="AEPUSINGDEPARTMENT" 
							required="<s:property value="mbo.getMboValueData('AEPUSINGDEPARTMENT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('AEPUSINGDEPARTMENT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('AEPUSINGDEPARTMENT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<%-- <p id="AEPUSINGDEPARTMENT" data-update="true"><s:property value="mbo.getString('AEPUSINGDEPARTMENT.DESCRIPTION')"/></p> --%>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="AEPUSINGDEPARTMENT" data-source="CUSTOMER" data-display="CUSTOMER,NAME,TYPE" data-search="CUSTOMER,NAME,TYPE"></a>
				</li>
				
					<li class="ui-divider">Asset Details</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('ASSET.PLUSTYEAR').getTitle()" />
					</label>
					<input type="text"
						id="ASSET.PLUSTYEAR" 
						required="<s:property value="mbo.getMboValueData('ASSET.PLUSTYEAR').isRequired()"/>"
						readonly="true"
						<%-- readonly="<s:property value="mbo.getMboValueData('ASSET.PLUSTYEAR').isReadOnly()"/>" --%>
						value="<s:property value="mbo.getString('ASSET.PLUSTYEAR')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('ASSET.PLUSTYEAR').getLength()}"
					/>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('ASSET.AEPMAKE').getTitle()" />
					</label>
					<input type="text"
						id="ASSET.AEPMAKE" 
						required="<s:property value="mbo.getMboValueData('ASSET.AEPMAKE').isRequired()"/>"
						readonly="true"
<%-- 						readonly="<s:property value="mbo.getMboValueData('ASSET.AEPMAKE').isReadOnly()"/>"
 --%>						value="<s:property value="mbo.getString('ASSET.AEPMAKE')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('ASSET.AEPMAKE').getLength()}"
					/>
				<!-- 	<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="MANUFACTURER" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a> -->
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('ASSET.PLUSTMODEL').getTitle()" />
					</label>
					<input type="text"
						id="ASSET.PLUSTMODEL" 
						required="<s:property value="mbo.getMboValueData('ASSET.PLUSTMODEL').isRequired()"/>"
						readonly="true"
<%-- 						readonly="<s:property value="mbo.getMboValueData('ASSET.PLUSTMODEL').isReadOnly()"/>"
 --%>						value="<s:property value="mbo.getString('ASSET.PLUSTMODEL')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('ASSET.PLUSTMODEL').getLength()}"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSET.MANUFACTURER').getTitle()" /></label>
					<input type="text"
							id="ASSET.MANUFACTURER" 
							readonly="true"
<%-- 							readonly="<s:property value="mbo.getMboValueData('ASSET.MANUFACTURER').isReadOnly()"/>"
 --%>							value="<s:property value="mbo.getString('ASSET.MANUFACTURER')"/>"
							onchange="emm.core.setValue(this)"
					/>
<!-- 					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="INSTALLDATE"></a>					
 -->				</li>
			
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('ASSET.SERIALNUM').getTitle()" />
					</label>
					<input type="text"
							id="ASSET.SERIALNUM" 
							readonly="true"
							required="<s:property value="mbo.getMboValueData('ASSET.SERIALNUM').isRequired()"/>"
<%-- 							readonly="<s:property value="mbo.getMboValueData('ASSET.SERIALNUM').isReadOnly()"/>"
 --%>							value="<s:property value="mbo.getString('ASSET.SERIALNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>		
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSET.STATUS').getTitle()" /></label>
					<input type="text"
							id="ASSET.STATUS" 
							readonly="true"
<%-- 							readonly="<s:property value="mbo.getMboValueData('ASSET.STATUS').isReadOnly()"/>"
 --%>							value="<s:property value="mbo.getString('ASSET.STATUS')"/>"
							onchange="emm.core.setValue(this)"
					/>
<!-- 					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="STATUSDATE"></a>					
 -->				</li>
				<li class="ui-field">
				<label><s:property value="mbo.getMboValueInfoStatic('AEPASSETUSERCUST.PERSONID').getTitle()" /></label>
					<input type="text"
						id="AEPASSETUSERCUST.PERSONID" 
						readonly="<s:property value="mbo.getMboValueData('AEPASSETUSERCUST.PERSONID').isReadOnly()"/>"
						value="<s:property value="mbo.getString('AEPASSETUSERCUST.PERSON.DISPLAYNAME')"/>"
					/>
				</li>
				<%-- <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WOPRIORITY').getTitle()" /></label>
					<input type="text"
							id="WOPRIORITY" 
							required="<s:property value="mbo.getMboValueData('WOPRIORITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('WOPRIORITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('WOPRIORITY')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>  --%>
				<%-- <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLACCOUNT').getTitle()" /></label>
					<input type="text"
							id="GLACCOUNT" 
							required="<s:property value="mbo.getMboValueData('GLACCOUNT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLACCOUNT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLACCOUNT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)"></a>
				</li> --%>
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
			<%-- 	<li class="ui-field">
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
				</li> --%>
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
							value="<s:property value="mbo.getString('TARGSTARTDATE')"/>"
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
							value="<s:property value="mbo.getString('TARGCOMPDATE')"/>"
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
							value="<s:property value="mbo.getString('SCHEDSTART')"/>"
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
							value="<s:property value="mbo.getString('SCHEDFINISH')"/>"
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
							value="<s:property value="mbo.getString('ACTSTART')"/>"
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
							value="<s:property value="mbo.getString('ACTFINISH')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="ACTFINISH"></a>
				</li> 
<%-- 				<li class="ui-divider"><s:text name="global.responsibility"/></li> --%>
<!-- 				<li class="ui-field ui-field-auto ui-details"> -->
<%-- 					<label><s:property value="mbo.getMboValueInfoStatic('SUPERVISOR').getTitle()" /></label> --%>
<!-- 					<input type="text" -->
<!-- 							id="SUPERVISOR"  -->
<%-- 							required="<s:property value="mbo.getMboValueData('SUPERVISOR').isRequired()"/>" --%>
<%-- 							readonly="<s:property value="mbo.getMboValueData('SUPERVISOR').isReadOnly()"/>" --%>
<%-- 							value="<s:property value="mbo.getString('SUPERVISOR')"/>" --%>
<!-- 							onchange="emm.core.setValue(this)" -->
<!-- 					/> -->
<!-- 					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SUPERVISOR" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME,FIRSTNAME,LASTNAME" data-search="PERSONID,FIRSTNAME,LASTNAME"></a> -->
<!-- 				</li> -->
<%-- 				<%-- <s:if test="!mbo.isNew()"> --%>
				<%-- 	<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('SUPERVISOR.PERSON.PRIMARYPHONE').getTitle()" /></label>
						<input type="text" 
								id="SUPERVISOR.PERSON.PRIMARYPHONE"
								required="<s:property value="mbo.getMboValueData('SUPERVISOR.PERSON.PRIMARYPHONE').isRequired()"/>"
								readonly="false"
								value="<s:property value="mbo.getString('SUPERVISOR.PERSON.PRIMARYPHONE')"/>"
						/> 
						<a class="ui-arrow" onclick="emm.util.phone('<s:property value="mbo.getString('SUPERVISOR.PERSON.PRIMARYPHONE')"/>')"></a>
					</li>  --%> 
<!-- 					<li class="ui-field"> -->
<%-- 						<label><s:property value="mbo.getMboValueInfoStatic('SUPERVISOR.PERSON.PRIMARYEMAIL').getTitle()" /></label> --%>
<!-- 						<input type="text" -->
<!-- 								id="SUPERVISOR.PERSON.PRIMARYEMAIL"  -->
<%-- 								required="<s:property value="mbo.getMboValueData('SUPERVISOR.PERSON.PRIMARYEMAIL').isRequired()"/>" --%>
<%-- 								readonly="<s:property value="mbo.getMboValueData('SUPERVISOR.PERSON.PRIMARYEMAIL').isReadOnly()"/>" --%>
<%-- 								value="<s:property value="mbo.getString('SUPERVISOR.PERSON.PRIMARYEMAIL')"/>" --%>
<!-- 						/> -->
<%-- 						<a class="ui-arrow" onclick="emm.util.email('<s:property value="mbo.getString('SUPERVISOR.PERSON.PRIMARYEMAIL')"/>')"></a> --%>
<!-- 					</li> -->
<%-- 				</s:if> --%>
<!-- 				<li class="ui-field"> -->
<%-- 					<label><s:property value="mbo.getMboValueInfoStatic('CREWID').getTitle()" /></label> --%>
<!-- 					<input type="text" -->
<!-- 							id="CREWID"  -->
<%-- 							required="<s:property value="mbo.getMboValueData('CREWID').isRequired()"/>" --%>
<%-- 							readonly="<s:property value="mbo.getMboValueData('CREWID').isReadOnly()"/>" --%>
<%-- 							value="<s:property value="mbo.getString('CREWID')"/>" --%>
<!-- 							onchange="emm.core.setValue(this)" -->
<!-- 					/> -->
<!-- 					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="CREWID"></a> -->
<!-- 				</li> -->
				<%-- <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LEAD').getTitle()" /></label>
					<input type="text"
							id="LEAD" 
							required="<s:property value="mbo.getMboValueData('LEAD').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LEAD').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LEAD')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LEAD" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME,FIRSTNAME,LASTNAME" data-search="PERSONID,FIRSTNAME,LASTNAME"></a>
				</li> --%>
			<%-- 	<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PERSONGROUP').getTitle()" /></label>
					<input type="text"
							id="PERSONGROUP" 
							required="<s:property value="mbo.getMboValueData('PERSONGROUP').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PERSONGROUP').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PERSONGROUP')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PERSONGROUP" data-source="PERSONGROUP" data-display="PERSONGROUP,DESCRIPTION" data-search="PERSONGROUP,DESCRIPTION"></a>
				</li> --%>
			<%-- 	<s:if test="!mbo.isNew()">  
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
				</s:if> --%>
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
	<div id="locationlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.location"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION,TYPE"><s:text name="global.lookup"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.locationDrilldown(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID,TYPE"><s:text name="global.drilldown"/></a>
				</div>
<!-- 				<div class="ui-btn-container" data-native="true"> -->
<%-- 					<a class="ui-btn-a" data-dismiss="modal" onclick="mapLocationLookup()"><s:text name="global.map"/></a> --%>
<!-- 				</div>	 -->
				<div class="ui-btn-container" data-native="true">
					<a class="ui-btn-a" onclick="emm.nativeapp.scanBarcode('#LOCATION')" data-dismiss="modal"><s:text name="global.scanbarcode"/></a>
				</div>
			</div>
		</div>
	</div>
	<div id="repairlocationlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.location"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="REPAIRFACILITY" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID,TYPE" data-search="LOCATION,DESCRIPTION,TYPE"><s:text name="global.lookup"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.locationDrilldown(this)" data-field="REPAIRFACILITY" data-source="REPAIRFACILITY" data-display="LOCATION,DESCRIPTION,ORGID,TYPE"><s:text name="global.drilldown"/></a>
				</div>
<!-- 				<div class="ui-btn-container" data-native="true"> -->
<%-- 					<a class="ui-btn-a" data-dismiss="modal" onclick="mapLocationLookup()"><s:text name="global.map"/></a> --%>
<!-- 				</div>	 -->
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
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,ORGID,PLUSTDEFASSETALIAS.ALIAS" data-search="ASSETNUM,DESCRIPTION,DEFAULTREPFAC,PLUSTDEFASSETALIAS.ALIAS,PLUSTLICENSES.LICENSENUM,SERIALNUM"><s:text name="global.lookup"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.assetDrilldown(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,ORGID"><s:text name="global.drilldown"/></a>
				</div>
<!-- 				<div class="ui-btn-container" data-native="true"> -->
<%-- 					<a class="ui-btn-a" data-dismiss="modal" onclick="mapAssetLookup()"><s:text name="global.map"/></a> --%>
<!-- 				</div> -->
				<div class="ui-btn-container" data-native="true">
					<a class="ui-btn-a" onclick="emm.nativeapp.scanBarcode('#ASSETNUM')" data-dismiss="modal"><s:text name="global.scanbarcode"/></a>
				</div>	
			</div>
		</div>
	</div>
</body>
</html>
