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
			<h3 class="ui-title"><s:text name="global.advancedsearch"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('COUNTBOOKNUM').getTitle()" /></label>
					<input type="text"
							id="COUNTBOOKNUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('COUNTBOOKNUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('COUNTBOOKNUM').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
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
					<label><s:property value="mbo.getMboValueInfoStatic('REASON').getTitle()" /></label>
					<input type="text"
							id="REASON" 
							value="<s:property value="mbo.getThisMboSet().getQbe('REASON')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="REASON"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STOREROOM').getTitle()" /></label>
					<input type="text"
							id="STOREROOM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('STOREROOM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STOREROOM" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-divider"><s:text name="global.dates"/></li>
				<li class="ui-field">
					<label><s:text name="global.from"/></label>
					<input type="text"
							id="GTEQ_EMMEXP_STATUSDATE"
							value="<s:property value="mbo.getThisMboSet().getQbe('GTEQ_EMMEXP_STATUSDATE/>=/STATUSDATE')"/>"
							onchange="emm.core.setValue(this)" 
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="GTEQ_EMMEXP_STATUSDATE"></a>					
				</li>				
				<li class="ui-field">
					<label><s:text name="global.to"/></label>
					<input type="text"
							id="LTEQ_EMMEXP_STATUSDATE"
							value="<s:property value="mbo.getThisMboSet().getQbe('LTEQ_EMMEXP_STATUSDATE/<=/STATUSDATE')"/>"
							onchange="emm.core.setValue(this)" 
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="LTEQ_EMMEXP_STATUSDATE"></a>					
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
