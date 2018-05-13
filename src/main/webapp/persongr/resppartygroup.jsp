<%--
* Copyright © 2012 InterPro Solutions, LLC
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
			<h3 class="ui-title"><s:text name="ezmaxmobile.persongr"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
			<s:include value="../common/statusbar.jsp"/>			
		</div>
		
		<div class="ui-content ui-content-narrow">
			<ul class="ui-listview">
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('RESPPARTYGROUP').getTitle()" /></label>
					<input type="text"
							id="RESPPARTYGROUP" 
							required="<s:property value="mbo.getMboValueData('RESPPARTYGROUP').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('RESPPARTYGROUP').isReadOnly()"/>"
							value="<s:property value="mbo.getString('RESPPARTYGROUP')"/>"
							maxlength="<s:property value="mbo.getMboValueData('RESPPARTYGROUP').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<p><s:property value="mbo.getString('PERSON.DISPLAYNAME')"/></p>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="RESPPARTYGROUP" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GROUPDEFAULT').getTitle()" /></label>
					<input type="checkbox"
							id="GROUPDEFAULT" 
							required="<s:property value="mbo.getMboValueData('GROUPDEFAULT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GROUPDEFAULT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GROUPDEFAULT')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('RESPPARTYGROUPSEQ').getTitle()" /></label>
					<input type="text"
							id="RESPPARTYGROUPSEQ" 
							required="<s:property value="mbo.getMboValueData('RESPPARTYGROUPSEQ').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('RESPPARTYGROUPSEQ').isReadOnly()"/>"
							value="<s:property value="mbo.getString('RESPPARTYGROUPSEQ')"/>"
							maxlength="<s:property value="mbo.getMboValueData('RESPPARTYGROUPSEQ').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>								
			</ul>						
		</div>
	</div>
</body>
</html>
