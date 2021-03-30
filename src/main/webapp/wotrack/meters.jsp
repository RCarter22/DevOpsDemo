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
		//Script used to enforce proper behavior of rollover readings.
		//Rollover must be checked prior to newreading being entered.
		//Maximo alerts the user of an error if this is done in the wrong order.
		checkRollover = function(el, id, last){
			var idDoRollover = '#' + id + '_DOROLLOVER';
			var idNewReading = '#' + id + '_NEWREADING';
			var newVal = $(idNewReading).val();
			
			if (newVal < last && newVal !== '') {
				if ($(idDoRollover).val() === 'false' || $(idDoRollover).val() === 'N'){
					emm.util.confirm({
						message: 'This new reading is lower than the last reading.  Is this a rollver reading?',
						yes: function(){
							clickYes(idDoRollover, el)
						},
						no: function(){
							clickNo(idDoRollover, el)
							$(idNewReading).val('');
// 							emm.core.setValue(el);
						}
					});
				}
				else {
					emm.core.setValue(el);
				}
			}
			else {
				emm.core.setValue(el);
			}
		}
		clickYes = function(id, el) {
			if ($(id).val() === 'false' || $(id).val() === 'N') {
				$(id).click();
				emm.core.setValue(el);
			}

		}
		clickNo = function(id, el){
			if ($(id).val() === 'true' || $(id).val() === 'Y'){
				$(id).click();
				emm.core.setValue(el);
			}

		}
	</script>
</head>

<body>
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="global.entermeterreadings"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<ul class="ui-navbar">
			<li>
				<a
					<s:if test="meterRelationship eq 'ACTIVEASSETMETER'">
						class="ui-active"
					</s:if>
					<s:else>
						href="meter.action?id=<s:property value='mbo.getUniqueIDValue()'/>&meterRelationship=ACTIVEASSETMETER"
					</s:else>
				>
					<s:text name="meters.assetmeterreadings"/>
				</a>
			<li>
				<a
					<s:if test="meterRelationship eq 'ACTIVELOCATIONMETER'">
						class="ui-active"
					</s:if>
					<s:else>
						href="meter.action?id=<s:property value='mbo.getUniqueIDValue()'/>&meterRelationship=ACTIVELOCATIONMETER"
					</s:else>
				>
					<s:text name="meters.locationmeterreadings"/>
				</a>
		</ul>
		<div class="ui-content ui-content-narrow">
			<s:if test="mboList.size > 0">
				<p class="ui-section"><s:text name="ezmaxmobile.meters"/></p>		
				<ul class="ui-listview" data-visible="<s:property value="pagination.getTotalPageNum() > 1"/>">
					<s:include value="../common/pagination.jsp"/>
				</ul>
				<s:iterator value="mboList">
					<ul class="ui-listview">
						<li class="ui-divider"><s:property value="getString('METER.DESCRIPTION')"/></li>
						<li class="ui-field ui-readonly">
							<label><s:property value="getMboValueInfoStatic('METER.METERTYPE').getTitle()" /></label>
							<p><s:property value="getString('METER.METERTYPE')"/></p>
						</li>						
						<li class="ui-field ui-readonly">
							<label><s:property value="getMboValueInfoStatic('READINGTYPE').getTitle()" /></label>
							<p><s:property value="getString('READINGTYPE')"/></p>
						</li>
						<s:if test="getString('METER.METERTYPE').equalsIgnoreCase('CONTINUOUS') && getString('READINGTYPE').equalsIgnoreCase('ACTUAL')">
							<s:if test="!getString('ROLLOVER').isEmpty()">
								<li class="ui-field">
									<label><s:property value="getMboValueInfoStatic('DOROLLOVER').getTitle()" /></label>
									<input type="checkbox"
											id="<s:property value="getUniqueIDValue()"/>_DOROLLOVER" 
											required="<s:property value="getMboValueData('DOROLLOVER').isRequired()"/>"
											readonly="<s:property value="getMboValueData('DOROLLOVER').isReadOnly()"/>"
											value="<s:property value="getBoolean('DOROLLOVER')"/>"
											onchange="emm.core.setValue(this)"
											data-mbo="<s:property value="meterRelationship"/>" 
											data-field="DOROLLOVER"
									/>
								</li>
							</s:if>
							<li class="ui-field">
								<label><s:property value="getString('METERNAME')"/></label>
								<input type="text"
										id="<s:property value="getUniqueIDValue()"/>_NEWREADING" 
										required="<s:property value="getMboValueData('NEWREADING').isRequired()"/>"
										readonly="<s:property value="getMboValueData('NEWREADING').isReadOnly()"/>"
										value="<s:property value="getString('NEWREADING')"/>"
										onchange="checkRollover(this, '<s:property value ="getUniqueIDValue()"/>', '<s:property value="getString('LASTREADING')"/>')"
										data-mbo="<s:property value="meterRelationship"/>" 
										data-field="NEWREADING"
								/>
								<s:if test="getString('METER.DOMAINID') != ''">
									<a class="ui-arrow" onclick="emm.core.lookup(this)" data-mbo="<s:property value="meterRelationship"/>" data-mboid="<s:property value="getUniqueIDValue()"/>"  data-field="NEWREADING"></a>
								</s:if>
							</li>
						</s:if>
						<s:else>
							<li class="ui-field">
								<label><s:property value="getString('METERNAME')"/></label>
								<input type="text"
										id="<s:property value="getUniqueIDValue()"/>_NEWREADING" 
										required="<s:property value="getMboValueData('NEWREADING').isRequired()"/>"
										readonly="<s:property value="getMboValueData('NEWREADING').isReadOnly()"/>"
										value="<s:property value="getString('NEWREADING')"/>"
										onchange="emm.core.setValue(this)"
										data-mbo="<s:property value="meterRelationship"/>" 
										data-field="NEWREADING"
								/>
								<s:if test="getString('METER.DOMAINID') != ''">
									<a class="ui-arrow" onclick="emm.core.lookup(this)" data-mbo="<s:property value="meterRelationship"/>" data-mboid="<s:property value="getUniqueIDValue()"/>"  data-field="NEWREADING"></a>
								</s:if>
							</li>
						</s:else>
						<li class="ui-field ui-readonly">
							<label><s:property value="getMboValueInfoStatic('LASTREADING').getTitle()" /></label>
							<p><s:property value="getString('LASTREADING')"/></p>
						</li>
					</ul>
				</s:iterator>
			</s:if>
		</div>
	</div>
</body>
</html>
