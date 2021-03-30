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
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="asset.spareparts"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content ui-content-narrow">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							required="<s:property value="mbo.getMboValueData('ITEMNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ITEMNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ITEMNUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('ITEMNUM').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ITEMNUM" data-source="ITEMNUM" data-display="ITEMNUM,DESCRIPTION,COMMODITYGROUP" data-search="ITEMNUM,DESCRIPTION,COMMODITYGROUP"></a>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEM.DESCRIPTION').getTitle()" /></label>
					<textarea
							id="ITEM.DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('ITEM.DESCRIPTION').isRequired()"/>"
							readonly="true"
							maxlength="<s:property value="mbo.getMboValueData('ITEM.DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('ITEM.DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEM.DESCRIPTION_LONGDESCRIPTION').getTitle()" /></label>
					<textarea
							id="ITEM.DESCRIPTION_LONGDESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('ITEM.DESCRIPTION_LONGDESCRIPTION').isRequired()"/>"
							readonly="true"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('ITEM.DESCRIPTION_LONGDESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('QUANTITY').getTitle()" /></label>
					<input type="text"
							id="QUANTITY" 
							required="<s:property value="mbo.getMboValueData('QUANTITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('QUANTITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('QUANTITY')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="1"
					/>
				</li>		
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUEDQTY').getTitle()" /></label>
					<input type="text"
							id="ISSUEDQTY" 
							required="<s:property value="mbo.getMboValueData('ISSUEDQTY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUEDQTY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISSUEDQTY')"/>"
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
			</ul>
			<div class="ui-btn-container">
				<a class="ui-btn-c" href="deletesparepart.action?id=<s:property value="mbo.getUniqueIDValue()"/>"><s:text name="global.delete"/></a>
			</div>
		</div>
	</div>	
</body>
</html>
