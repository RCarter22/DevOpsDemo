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
			<h3 class="ui-title"><s:text name="wotrack.plannedservices"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>			
		</div>
	
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LINETYPE').getTitle()" /></label>
					<input type="text"
							id="LINETYPE" 
							required="<s:property value="mbo.getMboValueData('LINETYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LINETYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LINETYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>	
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LINETYPE"></a>
				</li> 
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							required="<s:property value="mbo.getMboValueData('ITEMNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ITEMNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ITEMNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ITEMNUM" data-source="ITEMNUM" data-display="ITEMNUM,DESCRIPTION" data-search="ITEMNUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getOwner().getMboValueData('ITEM.DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMQTY').getTitle()" /></label>
					<input type="text"
							id="ITEMQTY" 
							required="<s:property value="mbo.getMboValueData('ITEMQTY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ITEMQTY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ITEMQTY')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="1"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('UNITCOST').getTitle()" /></label>
					<input type="text"
							id="UNITCOST" 
							required="<s:property value="mbo.getMboValueData('UNITCOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('UNITCOST').isReadOnly()"/>"
							value="<s:property value="mbo.getString('UNITCOST')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LINECOST').getTitle()" /></label>
					<input type="text"
							id="LINECOST" 
							required="<s:property value="mbo.getMboValueData('LINECOST').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('LINECOST')"/>"
					/>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('REQUIREDATE').getTitle()" /></label>
					<input type="text"
							id="REQUIREDATE" 
							required="<s:property value="mbo.getMboValueData('REQUIREDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REQUIREDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('REQUIREDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="REQUIREDATE"></a>
				</li>			
			</ul>
		</div>
	</div>
</body>
</html>
