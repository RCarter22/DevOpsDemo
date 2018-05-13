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
			<h3 class="ui-title"><s:text name="ezmaxmobile.inventor"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save('cyclecountsave.action?storeroom=<s:property value='storeroom'/>')"><s:text name="global.save"/></a>
			<s:include value="../common/statusbar.jsp"/>	
		</div>		
		<div class="ui-content">
			<ul class="ui-listview">
				<s:if test="!mbo.getMboSet('ITEM.IMGLIB').isEmpty()">
					<li>				
						<a class="ui-image-detail" href="viewblob.action?imglibID=<s:property value="mbo.getInt('ITEM.IMGLIB.IMGLIBID')"/>">
							<img src="viewblob.action?imglibID=<s:property value="mbo.getInt('ITEM.IMGLIB.IMGLIBID')"/>" />
						</a>
					</li>
				</s:if>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							required="<s:property value="mbo.getMboValueData('ITEMNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ITEMNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ITEMNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ITEMNUM"></a>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEM.DESCRIPTION').getTitle()" /></label>
					<textarea
							id="ITEM.DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('ITEM.DESCRIPTION').isRequired()"/>"
							readonly="true"
							maxlength="<s:property value="mbo.getMboValueData('ITEM.DESCRIPTION').getLength()"/>"
					><s:property value="mbo.getString('ITEM.DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MODELNUM').getTitle()" /></label>
					<input type="text"
							id="MODELNUM" 
							required="<s:property value="mbo.getMboValueData('MODELNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('MODELNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('MODELNUM')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
					<input type="text"
							id="SITEID" 
							required="<s:property value="mbo.getMboValueData('SITEID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SITEID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SITEID')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('BINNUM').getTitle()" /></label>
					<input type="text"
							id="BINNUM" 
							required="<s:property value="mbo.getMboValueData('BINNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('BINNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('BINNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<input type="text"
							id="STATUS" 
							required="<s:property value="mbo.getMboValueData('STATUS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STATUS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STATUS')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEM.ROTATING').getTitle()" /></label>
					<input type="checkbox"
							id="ITEM.ROTATING" 
							readonly="true"
							value="<s:property value="mbo.getString('ITEM.ROTATING')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUEUNIT').getTitle()" /></label>
					<input type="text"
							id="ISSUEUNIT" 
							required="<s:property value="mbo.getMboValueData('ISSUEUNIT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUEUNIT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISSUEUNIT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ISSUEUNIT" data-source="MEASUREUNITID" data-display="MEASUREUNITID,ABBREVIATION,DESCRIPTION" data-search="MEASUREUNITID,ABBREVIATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ORDERUNIT').getTitle()" /></label>
					<input type="text"
							id="ORDERUNIT" 
							required="<s:property value="mbo.getMboValueData('ORDERUNIT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ORDERUNIT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ORDERUNIT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ORDERUNIT" data-source="MEASUREUNITID" data-display="MEASUREUNITID,ABBREVIATION,DESCRIPTION" data-search="MEASUREUNITID,ABBREVIATION,DESCRIPTION"></a>
				</li>	
				<li class="ui-divider"><s:text name="inventor.availbal"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CURBALTOTAL').getTitle()" /></label>
					<input type="text"
							id="CURBALTOTAL" 
							required="<s:property value="mbo.getMboValueData('CURBALTOTAL').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CURBALTOTAL').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CURBALTOTAL')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('AVBLBALANCE').getTitle()" /></label>
					<input type="text"
							id="AVBLBALANCE" 
							required="<s:property value="mbo.getMboValueData('AVBLBALANCE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('AVBLBALANCE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('AVBLBALANCE')"/>"
					/>
				</li>
			</ul>
			<s:if test="mboList.isEmpty() eq false">
				<div class="ui-section"><s:text name="inventor.balances"/></div>
				<ul class="ui-listview">		
					<s:iterator value="mboList">
						<li data-markdeleted="<s:property value="toBeDeleted()"/>">
							<span>
								<h3><s:property value="getMboValueInfoStatic('BINNUM').getTitle()"/>: <s:property value="getString('BINNUM')"/></h3>
								<h3><s:property value="getMboValueInfoStatic('LOTNUM').getTitle()"/>: <s:property value="getString('LOTNUM')"/></h3>
								<h3><s:property value="getMboValueInfoStatic('CURBAL').getTitle()"/>: <s:property value="getString('CURBAL')"/></h3> 
								<h3><s:property value="getMboValueInfoStatic('PHYSCNT').getTitle()"/>: <s:property value="getString('PHYSCNT')"/></h3>
								<p><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/>: <s:property value="getString('LOCATION')"/></p>
								<p><s:property value="getMboValueInfoStatic('PHYSCNTDATE').getTitle()"/>: <s:property value="getString('PHYSCNTDATE')"/></p>
								<p><s:property value="getMboValueInfoStatic('RECONCILED').getTitle()"/>: <s:property value="getBoolean('RECONCILED')"/></p>
								<p><s:property value="getMboValueInfoStatic('USEBY').getTitle()"/>: <s:property value="getString('USEBY')"/></p>	
							</span>
						 	<a href="cyclecountdeletebalance.action?id=<s:property value="getUniqueIDValue()"/>" class="ui-trash-large"></a> 			
						</li>
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('ADJUSTEDPHYSCNT').getTitle()" /></label>
							<input type="tel"
								id="<s:property value='getUniqueIDValue()'/>_ADJUSTEDPHYSCNT" 
								required="<s:property value="getMboValueData('ADJUSTEDPHYSCNT').isRequired()"/>"
								readonly="<s:property value="getMboValueData('ADJUSTEDPHYSCNT').isReadOnly()"/>"
								value="<s:property value="getString('ADJUSTEDPHYSCNT')"/>"
								onchange="emm.core.setListValue(this)"
								data-mbo="INVBALANCESMBOSET"
								data-field="ADJUSTEDPHYSCNT"
								data-control="spinner" data-interval="1.00" data-min="0"
							/>
						</li>
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('ADJUSTEDPHYSCNTDATE').getTitle()" /></label>
							<input type="text"
								id="<s:property value='getUniqueIDValue()'/>_ADJUSTEDPHYSCNTDATE"
								required="<s:property value="getMboValueData('ADJUSTEDPHYSCNTDATE').isRequired()"/>"
								readonly="<s:property value="getMboValueData('ADJUSTEDPHYSCNTDATE').isReadOnly()"/>"
								value="<s:property value="getDate('ADJUSTEDPHYSCNTDATE').getTime())"/>"
								onchange="emm.core.setListValue(this)"
								data-mbo="INVBALANCESMBOSET"
								data-field="ADJUSTEDPHYSCNTDATE"
							/>
							<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="<s:property value='getUniqueIDValue()'/>_ADJUSTEDPHYSCNTDATE"></a>
						</li>
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('MEMO').getTitle()" /></label>
							<input type="text"
								id="<s:property value='getUniqueIDValue()'/>_MEMO" 
								required="<s:property value="getMboValueData('MEMO').isRequired()"/>"
								readonly="<s:property value="getMboValueData('MEMO').isReadOnly()"/>"
								value="<s:property value="getString('MEMO')"/>"
								onchange="emm.core.setListValue(this)"
								data-mbo="INVBALANCESMBOSET"
								data-field="MEMO"
							/>
						</li>
					</s:iterator>
				</ul>
				
			</s:if>			
		</div>
	</div>
</body>
