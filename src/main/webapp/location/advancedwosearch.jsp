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
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input type="text"
							id="WONUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('WONUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('WONUM').getLength()"/>"
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
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							value="<s:property value="mbo.getThisMboSet().getQbe('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
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
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION" data-search="ASSETNUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WORKTYPE').getTitle()" /></label>
					<input type="text"
							id="WORKTYPE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('WORKTYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="WORKTYPE" data-source="WORKTYPE" data-display="WORKTYPE,WTYPEDESC,ORGID" data-search="WORKTYPE,WTYPEDESC"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WOPRIORITY').getTitle()" /></label>
					<input type="text"
							id="WOPRIORITY" 
							value="<s:property value="mbo.getThisMboSet().getQbe('WOPRIORITY')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li> 
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SUPERVISOR').getTitle()" /></label>
					<input type="text"
							id="SUPERVISOR" 
							value="<s:property value="mbo.getThisMboSet().getQbe('SUPERVISOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SUPERVISOR" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>
				<%-- <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('AMCREW').getTitle()" /></label>
					<input type="text"
							id="AMCREW" 
							value="<s:property value="mbo.getThisMboSet().getQbe('AMCREW')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="AMCREW"></a>
				</li> --%>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LEAD').getTitle()" /></label>
					<input type="text"
							id="LEAD" 
							value="<s:property value="mbo.getThisMboSet().getQbe('LEAD')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LEAD" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PERSONGROUP').getTitle()" /></label>
					<input type="text"
							id="PERSONGROUP" 
							value="<s:property value="mbo.getThisMboSet().getQbe('PERSONGROUP')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PERSONGROUP" data-source="PERSONGROUP" data-display="PERSONGROUP,DESCRIPTION" data-search="PERSONGROUP,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FAILURECODE').getTitle()" /></label>
					<input type="text"
							id="FAILURECODE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('FAILURECODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FAILURECODE" data-source="FAILURECODE" data-display="FAILURECODE,DESCRIPTION,ORGID" data-search="FAILURECODE,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PROBLEMCODE').getTitle()" /></label>
					<input type="text"
							id="PROBLEMCODE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('PROBLEMCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PROBLEMCODE" data-source="FAILURECODE" data-display="FAILURECODE,DESCRIPTION,ORGID" data-search="FAILURECODE,DESCRIPTION"></a>
				</li>
				<li class="ui-divider"><s:property value="mbo.getMboValueInfoStatic('SCHEDSTART').getTitle()" /></li>
				<li class="ui-field">
					<label><s:text name="global.from"/></label>
					<input type="text"
							id="GTEQ_EMMEXP_SCHEDSTART"
							value="<s:property value="mbo.getThisMboSet().getQbe('GTEQ_EMMEXP_SCHEDSTART/>=/SCHEDSTART')"/>"
							onchange="emm.core.setValue(this)" 
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="GTEQ_EMMEXP_SCHEDSTART"></a>					
				</li>
				<li class="ui-field">
					<label><s:text name="global.to"/></label>
					<input type="text"
							id="LTEQ_EMMEXP_SCHEDSTART"
							value="<s:property value="mbo.getThisMboSet().getQbe('LTEQ_EMMEXP_SCHEDSTART/<=/SCHEDSTART')"/>"
							onchange="emm.core.setValue(this)" 
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="LTEQ_EMMEXP_SCHEDSTART"></a>					
				</li>
				<li class="ui-divider"><s:property value="mbo.getMboValueInfoStatic('ASSIGNMENT.LABORCODE').getTitle()" /></li>
				<li class="ui-field">
					<label><s:text name="global.assignedlabor"/></label>
					<input type="text"
							id="ASSIGNEDLABOR" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ASSIGNMENT.LABORCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSIGNMENT.LABORCODE" data-source="ASSIGNMENT.LABORCODE" data-display="LABORCODE,CRAFT,SKILLLEVEL" data-search="LABORCODE,CRAFT,SKILLLEVEL"></a>
				</li>
			</ul>
		</div>
		
		<div class="ui-btn-container">
			<a class="ui-btn-b" href="clearadvancedsearch.action">
				<s:text name="global.clear"/>
			</a>
			<a class="ui-btn-a" href="doadvancedwosearch.action">
				<s:text name="global.search"/>
			</a>
		</div>	
	</div>
</body>
</html>
