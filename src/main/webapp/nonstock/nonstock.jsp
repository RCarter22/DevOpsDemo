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
		<div class="ui-header">
			<s:if test="mbo.toBeAdded() eq true">
				<a class="ui-btn-left ui-btn-e" href="cancel.action"><s:text name="global.cancel"/></a>
			</s:if>
			<s:else>
				<a class="ui-btn-left" href="goback.action"><s:text name="global.back"/></a>
			</s:else>
			<h3 class="ui-title"><s:text name="Nonstock"/></h3>
			<%-- <a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a> --%>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			
			<%-- <ul class="ui-listview ui-inset" data-visible="<s:property value='!mbo.isNew()'/>">
				<li class="ui-pagination">	
					<a class="ui-pagination-prev" href="#" onclick="emm.core.movePrev('prevlog.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
					<div class="ui-container">
						<span><s:text name="global.prev"/></span>
						<span><s:text name="global.next"/></span>
					</div>
					<a class="ui-pagination-next" href="#" onclick="emm.core.moveNext('nextlog.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
				</li>
			</ul>	 --%>
			
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ACTUALSTASKID').getTitle()" /></label>
					<input type="text"
							id="ACTUALSTASKID" 
							required="<s:property value="mbo.getMboValueData('ACTUALSTASKID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ACTUALSTASKID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ACTUALSTASKID')"/>"
							maxlength="<s:property value="mbo.getMboValueData('ACTUALSTASKID').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
		
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<input type="text"
							id="DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('DESCRIPTION')"/>"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('AEPINVOICELINE.AEPPARTNUMBER').getTitle()" /></label>
					<input type="text"
							id="AEPINVOICELINE.AEPPARTNUMBER'" 
							required="<s:property value="mbo.getMboValueData('AEPINVOICELINE.AEPPARTNUMBER').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('AEPINVOICELINE.AEPPARTNUMBER').isReadOnly()"/>"
							value="<s:property value="mbo.getString('AEPINVOICELINE.AEPPARTNUMBER')"/>"
							maxlength="<s:property value="mbo.getMboValueData('AEPINVOICELINE.AEPPARTNUMBER).getLength()"/>"
					/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('QUANTITY').getTitle()" /></label>
					<textarea
							id="QUANTITY" 
							required="<s:property value="mbo.getMboValueData('QUANTITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('QUANTITY).isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('QUANTITY').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('QUANTITY')"/></textarea>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('UNITCOST').getTitle()" /></label>
					<textarea
							id="UNITCOST" 
							required="<s:property value="mbo.getMboValueData('UNITCOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('UNITCOST').isReadOnly()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('UNITCOST')"/></textarea>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('LOADEDCOST').getTitle()" /></label>
					<textarea
							id="LOADEDCOST" 
							required="<s:property value="mbo.getMboValueData('LOADEDCOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOADEDCOST').isReadOnly()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('LOADEDCOST')"/></textarea>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('PLUSTHASWARRANTY').getTitle()" /></label>
					<textarea
							id="PLUSHASWARRANTY" 
							required="<s:property value="mbo.getMboValueData('PLUSTHASWARRANTY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PLUSTHASWARRANTY').isReadOnly()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('PLUSTHASWARRANTY')"/></textarea>
				</li>
			</ul>
		</div>
	</div>
</body>
</html>
