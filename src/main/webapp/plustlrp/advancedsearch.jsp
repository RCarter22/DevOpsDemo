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
		</div>
		
		<div class="ui-content">
			
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LABORCODE').getTitle()" /></label>
					<input type="text"
							id="LABORCODE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('LABORCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LABORCODE" data-source="LABORCODE" data-display="LABORCODE,LABOR.PERSON.DISPLAYNAME" data-search="LABORCODE,LABOR.PERSON.DISPLAYNAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CRAFT').getTitle()" /></label>
					<input type="text"
							id="CRAFT" 
							value="<s:property value="mbo.getThisMboSet().getQbe('CRAFT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="CRAFT" data-source="CRAFT" data-display="CRAFT,CRAFT.DESCRIPTION,ORGID" data-search="CRAFT,CRAFT.DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SKILLLEVEL').getTitle()" /></label>
					<input type="text"
							id="SKILLLEVEL" 
							value="<s:property value="mbo.getThisMboSet().getQbe('SKILLLEVEL')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LABOR.LABORCRAFTRATE.CRAFTSKILL.SKILLLEVEL" data-update="SKILLLEVEL"></a>
				</li>
				<li class="ui-field">
					<label>Supervisor<s:property value="mbo.getMboValueInfoStatic('SUPERVISOR').getTitle()" /></label>
					<input type="text"
							id="PERSON.SUPERVISOR" 
							value="<s:property value="mbo.getThisMboSet().getQbe('PERSON.SUPERVISOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PERSON.SUPERVISOR" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GENAPPRSERVRECEIPT').getTitle()" /></label>
					<input type="checkbox"
							id="GENAPPRSERVRECEIPT" 
							value="<s:property value="mbo.getThisMboSet().getQbe('GENAPPRSERVRECEIPT')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input type="text"
							id="REFWO" 
							value="<s:property value="mbo.getThisMboSet().getQbe('REFWO')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="REFWO" data-source="WONUM" data-display="WONUM,DESCRIPTION" data-search="WONUM,DESCRIPTION"></a>
				</li>
				<li class="ui-divider">Start Dates</li>
				
				<li class="ui-field">
					<label><s:text name="global.from"/></label>
					<input type="text"
							id="GTEQ_EMMEXP_STARTDATEENTERED"
							value="<s:property value="mbo.getThisMboSet().getQbe('GTEQ_EMMEXP_STARTDATEENTERED/>=/STARTDATEENTERED')"/>"
							onchange="emm.core.setValue(this)" 
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="GTEQ_EMMEXP_STARTDATEENTERED"></a>					
				</li>
				<li class="ui-field">
					<label><s:text name="global.to"/></label>
					<input type="text"
							id="LTEQ_EMMEXP_STARTDATEENTERED"
							value="<s:property value="mbo.getThisMboSet().getQbe('LTEQ_EMMEXP_STARTDATEENTERED/<=/STARTDATEENTERED')"/>"
							onchange="emm.core.setValue(this)" 
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="LTEQ_EMMEXP_STARTDATEENTERED"></a>					
				</li>		
				<%-- <li class="ui-divider">End Dates</li>
				<li class="ui-field">
					<label><s:text name="global.from"/></label>
					<input type="text"
							id="FINISHDATEENTERED"
							value="<s:property value="mbo.getThisMboSet().getQbe('FINISHDATEENTERED')"/>"
							onchange="emm.core.setValue(this)" 
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="FINISHDATEENTERED"></a>					
				</li>
				<li class="ui-field">
					<label><s:text name="global.to"/></label>
					<input type="text"
							id="FINISHDATEENTERED"
							value="<s:property value="mbo.getThisMboSet().getQbe('FINISHDATEENTERED')"/>"
							onchange="emm.core.setValue(this)" 
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="FINISHDATEENTERED"></a>					
				</li> --%>								
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
