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
	<s:if test="offlineModeEnabled eq true">
		<script type="text/javascript">
			var inventoryid = '<s:property value="mbo.getString('INVENTORYID')"/>';
			var itemnum = '<s:property value="mbo.getString('ITEMNUM')"/>';
			var itemlocation = '<s:property value="mbo.getString('LOCATION')"/>';
			var queries = {
					INVENTORY : "SELECT * FROM INVENTORY WHERE INVENTORYID = '" + inventoryid + "'",
					CURBAL : "SELECT SUM(CURBAL) AS CURBAL FROM INVBALANCES WHERE ITEMNUM = '" + itemnum + "' AND SITEID = '" + '<s:property value="user.getSiteId()"/>' + "' AND LOCATION = '" + itemlocation + "'",
					INVBALANCES : "SELECT INVB.* FROM INVBALANCES INVB WHERE INVB.SITEID = '" + '<s:property value="user.getSiteId()"/>' + "' AND INVB.ITEMNUM = '" + itemnum + "' AND INVB.LOCATION = '" + itemlocation + "'"
				},
				offlinePage = "offline/inventor/view.htm";
			
			function goOffline() {
				EMMServer.DB.Select()
					.addQueries(queries)
					.submit(offlinePage, true);
			}
			$(function(){
				EMMServer.Offline.prepareBounce(queries, offlinePage);
			});		
		</script>
	</s:if>
</head>
<body>
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.inventor"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
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
					<label><s:property value="mbo.getMboValueInfoStatic('CATEGORY').getTitle()" /></label>
					<input type="text"
							id="CATEGORY" 
							required="<s:property value="mbo.getMboValueData('CATEGORY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CATEGORY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CATEGORY')"/>"
							onchange="emm.core.setValue(this)"
					/>
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
					<label><s:property value="mbo.getMboValueInfoStatic('ITEM.ROTATING').getTitle()" /></label>
					<input type="checkbox"
							id="ITEM.ROTATING" 
							readonly="true"
							value="<s:property value="mbo.getString('ITEM.ROTATING')"/>"
					/>
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
				<li class="ui-divider"><s:property value="mbo.getMboValueInfoStatic('INVENTORY.MANUFACTURER').getTitle()" /></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INVENTORY.MANUFACTURER').getTitle()" /></label>
					<input type="text"
							id="INVENTORY.MANUFACTURER" 
							readonly="true"
							value="<s:property value="mbo.getString('INVENTORY.MANUFACTURER')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MANUFACTURER.NAME').getTitle()" /></label>
					<input type="text"
							id="MANUFACTURER.NAME" 
							readonly="true"
							value="<s:property value="mbo.getString('MANUFACTURER.NAME')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INVVENDOR.MODELNUM').getTitle()" /></label>
					<input type="text"
							id="INVVENDOR.MODELNUM" 
							readonly="true"
							value="<s:property value="mbo.getString('INVVENDOR.MODELNUM')"/>"
					/>
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
				<li class="ui-divider"><s:text name="inventor.issuehistory"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LASTISSUEDATE').getTitle()" /></label>
					<input type="text"
							id="LASTISSUEDATE" 
							required="<s:property value="mbo.getMboValueData('LASTISSUEDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LASTISSUEDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LASTISSUEDATE')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUEYTD').getTitle()" /></label>
					<input type="text"
							id="ISSUEYTD" 
							required="<s:property value="mbo.getMboValueData('ISSUEYTD').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUEYTD').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISSUEYTD')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUE1YRAGO').getTitle()" /></label>
					<input type="text"
							id="ISSUE1YRAGO" 
							required="<s:property value="mbo.getMboValueData('ISSUE1YRAGO').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUE1YRAGO').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISSUE1YRAGO')"/>"
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
								<p><s:property value="getMboValueInfoStatic('PHYSCNTDATE').getTitle()"/>: <s:property value="getString('PHYSCNTDATE')"/></p>
								<p><s:property value="getMboValueInfoStatic('RECONCILED').getTitle()"/>: <s:property value="getBoolean('RECONCILED')"/></p>
								<p><s:property value="getMboValueInfoStatic('USEBY').getTitle()"/>: <s:property value="getString('USEBY')"/></p>	
							</span>
						 	<a href="deletebalance.action?id=<s:property value="getUniqueIDValue()"/>" class="ui-trash-large"></a> 			
						</li>
					</s:iterator>
				</ul>
				
			</s:if>				
			
			<s:include value="actions.jsp"/>			
		</div>
	</div>
</body>
