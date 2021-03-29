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
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="global.advancedsearch"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TICKETID').getTitle()" /></label>
					<input type="text"
							id="TICKETID" 
							value="<s:property value="mbo.getThisMboSet().getQbe('TICKETID')"/>"
							maxlength="<s:property value="mbo.getMboValueData('TICKETID').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getThisMboSet().getQbe('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<input type="text"
							id="STATUS" 
							value="<s:property value="mbo.getThisMboSet().getQbe('STATUS')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STATUS"></a>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ALLMULTIASSETLOCCI.LOCATION').getTitle()" /></label>
					<input type="text"
							id="ALLMULTIASSETLOCCI.LOCATION" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ALLMULTIASSETLOCCI.LOCATION')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ALLMULTIASSETLOCCI.LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ALLMULTIASSETLOCCI.ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ALLMULTIASSETLOCCI.ASSETNUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ALLMULTIASSETLOCCI.ASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ALLMULTIASSETLOCCI.ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION" data-search="ASSETNUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('COMMODITYGROUP').getTitle()" /></label>
					<input type="text"
							id="COMMODITYGROUP" 
							value="<s:property value="mbo.getThisMboSet().getQbe('COMMODITYGROUP')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="COMMODITYGROUP" data-source="COMMODITY" data-display="COMMODITY,DESCRIPTION" data-search="COMMODITY,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('COMMODITY').getTitle()" /></label>
					<input type="text"
							id="COMMODITY" 
							value="<s:property value="mbo.getThisMboSet().getQbe('COMMODITY')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="COMMODITY" data-source="COMMODITY" data-display="COMMODITY,DESCRIPTION" data-search="COMMODITY,DESCRIPTION"></a>
				</li> 
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('REPORTEDBY').getTitle()" /></label>
					<input type="text"
							id="REPORTEDBY" 
							value="<s:property value="mbo.getThisMboSet().getQbe('REPORTEDBY')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="REPORTEDBY" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('OWNER').getTitle()" /></label>
					<input type="text"
							id="OWNER" 
							value="<s:property value="mbo.getThisMboSet().getQbe('OWNER')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="OWNER" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('OWNERGROUP').getTitle()" /></label>
					<input type="text"
							id="OWNERGROUP" 
							value="<s:property value="mbo.getThisMboSet().getQbe('OWNERGROUP')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="OWNERGROUP" data-source="PERSONGROUP" data-display="PERSONGROUP,DESCRIPTION" data-search="PERSONGROUP,DESCRIPTION"></a>
				</li>
			</ul>
		</div>
		
		<div class="ui-btn-container">
			<a class="ui-btn-b" href="clearadvancedsearch.action">
				<s:text name="global.clear"/>
			</a>
			<a class="ui-btn-a" href="doadvancedsearch.action">
				<s:text name="global.search"/>
			</a>
		</div>	
	</div>
</body>
</html>
