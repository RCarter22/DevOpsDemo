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
			<h3 class="ui-title"><s:text name="global.advancedsearch"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMTYPE').getTitle()" /></label>
					<input type="text"
							id="ITEMTYPE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ITEMTYPE')"/>"
							maxlength="<s:property value="mbo.getMboValueData('ITEMTYPE').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ITEMNUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('ITEMNUM').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ITEMNUM" data-source="ITEMNUM" data-display="ITEMNUM,DESCRIPTION" data-search="ITEMNUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('VENDOR').getTitle()" /></label>
					<input type="text"
							id="VENDOR" 
							value="<s:property value="mbo.getThisMboSet().getQbe('VENDOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="VENDOR" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MANUFACTURER').getTitle()" /></label>
					<input type="text"
							id="MANUFACTURER" 
							value="<s:property value="mbo.getThisMboSet().getQbe('MANUFACTURER')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="MANUFACTURER" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MODELNUM').getTitle()" /></label>
					<input type="text"
							id="MODELNUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('MODELNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							value="<s:property value="mbo.getThisMboSet().getQbe('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CATEGORY').getTitle()" /></label>
					<input type="text"
							id="CATEGORY" 
							value="<s:property value="mbo.getThisMboSet().getQbe('CATEGORY')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="CATEGORY"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CATALOGCODE').getTitle()" /></label>
					<input type="text"
							id="CATALOGCODE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('CATALOGCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('BINNUM').getTitle()" /></label>
					<input type="text"
							id="BINNUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('BINNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEM.COMMODITYGROUP').getTitle()" /></label>
					<input type="text"
							id="ITEM.COMMODITYGROUP" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ITEM.COMMODITYGROUP')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ITEM.COMMODITYGROUP" data-source="COMMODITY" data-display="COMMODITY,DESCRIPTION" data-search="COMMODITY,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEM.COMMODITY').getTitle()" /></label>
					<input type="text"
							id="ITEM.COMMODITY" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ITEM.COMMODITY')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ITEM.COMMODITY" data-source="COMMODITY" data-display="COMMODITY,DESCRIPTION" data-search="COMMODITY,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
					<input type="text"
							id="SITEID" 
							value="<s:property value="mbo.getThisMboSet().getQbe('SITEID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SITEID" data-source="SITEID" data-display="SITEID,DESCRIPTION" data-search="SITEID,DESCRIPTION"></a>
				</li> 				
			</ul>
		</div>
		
		<div class="ui-btn-container">
			<a class="ui-btn-b" href="cyclecountclearadvancedsearch.action">
				<s:text name="global.clear"/>
			</a>
			<a class="ui-btn-a" href="cyclecountdoadvancedsearch.action?mode=<s:property value="%{#parameters.mode}"/>">
				<s:text name="global.search"/>
			</a>
		</div>	
	</div>
</body>
</html>
