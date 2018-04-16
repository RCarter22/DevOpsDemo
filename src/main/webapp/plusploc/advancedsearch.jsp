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
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="global.advancedsearch"/></h3>
		</div>
		
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							value="<s:property value="mbo.getThisMboSet().getQbe('LOCATION')"/>"
							maxlength="<s:property value="mbo.getMboValueData('LOCATION').getLength()"/>"
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
					<label><s:property value="mbo.getMboValueInfoStatic('LOCHIERARCHY.PARENT').getTitle()" /></label>
					<input type="text"
							id="PARENT" 
							value="<s:property value="mbo.getThisMboSet().getQbe('LOCHIERARCHY.PARENT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCHIERARCHY.PARENT" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,TYPE,SITEID" data-search="LOCATION,DESCRIPTION"></a>
				</li>	
					<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TYPE').getTitle()" /></label>
					<input type="text"
							id="TYPE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('TYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TYPE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<input type="text"
							id="STATUS" 
							value="<s:property value="mbo.getThisMboSet().getQbe('STATUS')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STATUS" data-source="VALUE" data-display="VALUE,DESCRIPTION" data-search="VALUE,DESCRIPTION"></a>
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
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCOPER.LOCPRIORITY').getTitle()" /></label>
					<input type="text"
							id="LOCOPER.LOCPRIORITY" 
							value="<s:property value="mbo.getThisMboSet().getQbe('LOCOPER.LOCPRIORITY')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCOPER.FAILURECODE').getTitle()" /></label>
					<input type="text"
							id="LOCOPER.FAILURECODE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('LOCOPER.FAILURECODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCOPER.FAILURECODE" data-source="FAILURECODE" data-display="FAILURECODE,FAILURECODE.DESCRIPTION" data-search="FAILURECODE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLACCOUNT').getTitle()" /></label>
					<input type="text"
							id="GLACCOUNT" 
							value="<s:property value="mbo.getThisMboSet().getQbe('GLACCOUNT')"/>"
							onchange="emm.core.setValue(this)"
					/>					
					<a class="ui-arrow" onclick="emm.core.glalookup(this)"></a>
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
	<div id="locationlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.location"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"><s:text name="global.lookup"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.locationDrilldown(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID"><s:text name="global.drilldown"/></a>
				</div>
			</div>
		</div>
	</div>	
</body>
</html>
