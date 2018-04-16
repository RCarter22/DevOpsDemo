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
			<h3 class="ui-title"><s:text name="ezmaxmobile.createdr"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			<ul class="ui-listview ui-inset">
				<li class="ui-pagination">	
					<h3 class="title">
					Step 1 of 2
					</h3>
					<a class="ui-pagination-next" href="mrlines.action?id=<s:property value="mbo.getUniqueIDValue()"/>">	
						<span class="ui-arrow"></span>							
					</a>
				</li>
			</ul>
			
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MRNUM').getTitle()" /></label>
					<input type="text"
							id="MRNUM" 
							required="<s:property value="mbo.getMboValueData('MRNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('MRNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('MRNUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('MRNUM').getLength()"/>"
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
				<li class="ui-field ui-details ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<p><s:property value="mbo.getString('STATUS')" /></p>
					<p><s:property value="mbo.getString('STATUSDATE')" /></p>
				</li>					
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('REQUIREDDATE').getTitle()" /></label>
					<input type="text"
							id="REQUIREDDATE" 
							required="<s:property value="mbo.getMboValueData('REQUIREDDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REQUIREDDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('REQUIREDDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="REQUIREDDATE"></a>
				</li>						
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PRIORITY').getTitle()" /></label>
					<input type="text"
							id="PRIORITY" 
							required="<s:property value="mbo.getMboValueData('PRIORITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PRIORITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PRIORITY')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li> 
				<li class="ui-divider"><s:text name="global.chargeinfo"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLDEBITACCT').getTitle()" /></label>
					<input type="text"
							id="GLDEBITACCT" 
							required="<s:property value="mbo.getMboValueData('GLDEBITACCT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLDEBITACCT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLDEBITACCT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)" data-field="GLDEBITACCT"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input type="text"
							id="WONUM" 
							required="<s:property value="mbo.getMboValueData('WONUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('WONUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('WONUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="WONUM" data-source="WONUM" data-display="WONUM,DESCRIPTION" data-search="WONUM,DESCRIPTION"></a>					
				</li>
			</ul>
			<div class="ui-btn-container">
				<a onclick="emm.core.save()" class="ui-btn-a <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>">Save as Draft</a>			
			</div>	
		</div>
	</div>
</body>

</html>
