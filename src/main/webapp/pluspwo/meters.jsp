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
</head>

<body>
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="global.entermeterreadings"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
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
			<s:include value="../common/statusbar.jsp"/>
			<s:if test="mboList.size > 0">
				<p class="ui-section"><s:text name="ezmaxmobile.meters"/></p>						
				<s:iterator value="mboList">
					<ul class="ui-listview">
						<li class="ui-divider"><s:property value="getString('METER.DESCRIPTION')"/></li>
						<li class="ui-field">
							<label><s:property value="getString('METERNAME')"/></label>
							<input type="text"
									id="<s:property value="getUniqueIDValue()"/>" 
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
