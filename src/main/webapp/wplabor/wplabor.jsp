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
		<div class="ui-header">
			<s:if test="mbo.toBeAdded() eq true">
				<a class="ui-btn-left ui-btn-e" href="cancel.action"><span class="emm-times-circle"></span></a>
			</s:if>
			<s:else>
				<a class="ui-btn-left" href="goback.action"><span class="emm-chevron-left"></span></a>
			</s:else>	
			<h3 class="ui-title"><s:text name="wotrack.plannedlabor"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>						
		</div>
	
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CRAFT').getTitle()" /></label>
					<input type="text"
							id="CRAFT" 
							required="<s:property value="mbo.getMboValueData('CRAFT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CRAFT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CRAFT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="CRAFT" data-source="CRAFT" data-display="CRAFT,SKILLLEVEL,VENDOR,STANDARDRATE" data-search="CRAFT,SKILLLEVEL"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SKILLLEVEL').getTitle()" /></label>
					<input type="text"
							id="SKILLLEVEL" 
							required="<s:property value="mbo.getMboValueData('SKILLLEVEL').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SKILLLEVEL').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SKILLLEVEL')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SKILLLEVEL" data-source="SKILLLEVEL" data-display="CRAFT,SKILLLEVEL,VENDOR,STANDARDRATE" data-search="CRAFT,SKILLLEVEL"></a>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('AMCREW').getTitle()" /></label>
					<input type="text"
							id="AMCREW" 
							required="<s:property value="mbo.getMboValueData('AMCREW').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('AMCREW').isReadOnly()"/>"
							value="<s:property value="mbo.getString('AMCREW')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="AMCREW" data-source="AMCREW" data-display="AMCREW,DESCRIPTION,AMCREWTYPE" data-search="AMCREW,DESCRIPTION"></a>
				</li>							
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('VENDOR').getTitle()" /></label>
					<input type="text"
							id="VENDOR" 
							required="<s:property value="mbo.getMboValueData('VENDOR').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('VENDOR').isReadOnly()"/>"
							value="<s:property value="mbo.getString('VENDOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="VENDOR" data-source="VENDOR" data-display="CRAFT,SKILLLEVEL,VENDOR,STANDARDRATE" data-search="CRAFT,SKILLLEVEL"></a>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('QUANTITY').getTitle()" /></label>
					<input type="text"
							id="QUANTITY" 
							required="<s:property value="mbo.getMboValueData('QUANTITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('QUANTITY').isReadOnly()"/>"
							value="<s:property value="mbo.getInt('QUANTITY')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LABORCODE').getTitle()" /></label>
					<input type="text"
							id="LABORCODE" 
							required="<s:property value="mbo.getMboValueData('LABORCODE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LABORCODE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LABORCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LABORCODE" data-source="LABORCODE" data-display="LABORCODE,PERSON.DISPLAYNAME" data-search="LABORCODE,PERSON.DISPLAYNAME"></a>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LABORHRS').getTitle()" /></label>
					<input type="text"
							id="LABORHRS" 
							required="<s:property value="mbo.getMboValueData('LABORHRS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LABORHRS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LABORHRS')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('DISPLAYRATE').getTitle()" /></label>
					<input type="text"
							id="DISPLAYRATE" 
							required="<s:property value="mbo.getMboValueData('DISPLAYRATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DISPLAYRATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('DISPLAYRATE')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('RATEHASCHANGED').getTitle()" /></label>
					<input type="checkbox"
							id="RATEHASCHANGED" 
							required="<s:property value="mbo.getMboValueData('RATEHASCHANGED').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('RATEHASCHANGED').isReadOnly()"/>"
							value="<s:property value="mbo.getString('RATEHASCHANGED')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>							
			</ul>
		</div>
	</div>
</body>
</html>
