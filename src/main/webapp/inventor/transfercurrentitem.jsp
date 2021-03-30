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
			<h3 class="ui-title"><s:text name="inventor.transfercurrentitem"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" href="dotransfercurrentitem.action"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>			
		</div>
	
		<div class="ui-content">
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INVENTORY.ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="INVENTORY.ITEMNUM" 
							readonly="true"
							value="<s:property value="mbo.getString('ITEMNUM')"/>"
					/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getOwner().getMboValueInfoStatic('ITEM.DESCRIPTION').getTitle()" /></label>
					<textarea
							id="ITEM.DESCRIPTION" 
							readonly="true"
					><s:property value="mbo.getOwner().getString('ITEM.DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-divider"><s:text name="inventor.itemdetails"/></li>	
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('QUANTITY').getTitle()" /></label>
					<input type="text"
							id="QUANTITY" 
							required="<s:property value="mbo.getMboValueData('QUANTITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('QUANTITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('QUANTITY')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="1.0"
					/>
				</li>		
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FROMSTORELOC').getTitle()" /></label>
					<input type="text"
							id="FROMSTORELOC" 
							required="<s:property value="mbo.getMboValueData('FROMSTORELOC').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('FROMSTORELOC')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FROMSTORELOC" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOSITEID').getTitle()" /></label>
					<input type="text"
							id="TOSITEID" 
							required="<s:property value="mbo.getMboValueData('TOSITEID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOSITEID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOSITEID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TOSITEID" data-source="SITEID" data-display="SITEID,DESCRIPTION,ORGID" data-search="SITEID,DESCRIPTION"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOSTORELOC').getTitle()" /></label>
					<input type="text"
							id="TOSTORELOC" 
							required="<s:property value="mbo.getMboValueData('TOSTORELOC').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOSTORELOC').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOSTORELOC')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TOSTORELOC" data-source="LOCATION" data-display="LOCATION,TYPE,DESCRIPTION,ORGID" data-search="LOCATION,TYPE,DESCRIPTION"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FROMBIN').getTitle()" /></label>
					<input type="text"
							id="FROMBIN" 
							required="<s:property value="mbo.getMboValueData('FROMBIN').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FROMBIN').isReadOnly()"/>"
							value="<s:property value="mbo.getString('FROMBIN')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FROMBIN" data-source="BINNUM" data-display="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,SITEID" data-search="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,SITEID"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOBIN').getTitle()" /></label>
					<input type="text"
							id="TOBIN" 
							required="<s:property value="mbo.getMboValueData('TOBIN').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOBIN').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOBIN')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TOBIN" data-source="BINNUM" data-display="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,SITEID" data-search="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,SITEID"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FROMLOT').getTitle()" /></label>
					<input type="text"
							id="FROMLOT" 
							required="<s:property value="mbo.getMboValueData('FROMLOT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FROMLOT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('FROMLOT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FROMLOT" data-source="LOTNUM" data-display="LOTNUM,BINNUM,CONDITIONCODE,CURBAL,USEBY,SITEID" data-search="LOTNUM,BINNUM,CONDITIONCODE,CURBAL,SITEID"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOLOT').getTitle()" /></label>
					<input type="text"
							id="TOLOT" 
							required="<s:property value="mbo.getMboValueData('TOLOT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOLOT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOLOT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TOLOT" data-source="LOTNUM" data-display="LOTNUM,BINNUM,CONDITIONCODE,CURBAL,USEBY,SITEID" data-search="LOTNUM,BINNUM,CONDITIONCODE,CURBAL,SITEID"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CONVERSION').getTitle()" /></label>
					<input type="text"
							id="CONVERSION" 
							required="<s:property value="mbo.getMboValueData('CONVERSION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CONVERSION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CONVERSION')"/>"
							onchange="emm.core.setValue(this)"
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
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('MEMO').getTitle()" /></label>
					<textarea
							id="MEMO" 
							required="<s:property value="mbo.getMboValueData('MEMO').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('MEMO').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('MEMO').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('MEMO')"/></textarea>
				</li>
			</ul>
		</div>
	</div>
</body>
</html>
