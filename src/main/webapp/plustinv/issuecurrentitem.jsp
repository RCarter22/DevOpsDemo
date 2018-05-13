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
			<h3 class="ui-title"><s:text name="inventor.issuecurrentitem"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" href="doissuecurrentitem.action"><s:text name="global.save"/></a>
		</div>
	
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>			
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
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
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STORELOC').getTitle()" /></label>
					<input type="text"
							id="STORELOC" 
							required="<s:property value="mbo.getMboValueData('STORELOC').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STORELOC').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STORELOC')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STORELOC" data-source="LOCATION" data-display="LOCATION,LOCATIONS.DESCRIPTION,ORGID" data-search="LOCATION,LOCATIONS.DESCRIPTION"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
					<input type="text"
							id="SITEID" 
							required="<s:property value="mbo.getMboValueData('SITEID').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('SITEID')"/>"
							onchange="emm.core.setValue(this)"
					/>
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
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUETYPE').getTitle()" /></label>
					<input type="text"
							id="ISSUETYPE" 
							required="<s:property value="mbo.getMboValueData('ISSUETYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUETYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISSUETYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ISSUETYPE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getOwner().getMboValueInfoStatic('ISSUEUNIT').getTitle()" /></label>
					<input type="text"
							id="ISSUEUNIT" 
							required="<s:property value="mbo.getOwner().getMboValueData('ISSUEUNIT').isRequired()"/>"
							readonly="<s:property value="true"/>"
							value="<s:property value="mbo.getOwner().getString('ISSUEUNIT')"/>"
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
	
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LINECOST').getTitle()" /></label>
					<input type="text"
							id="LINECOST" 
							required="<s:property value="mbo.getMboValueData('LINECOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LINECOST').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LINECOST')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="1.0"
					/>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input type="text"
							id="WONUM" 
							required="<s:property value="mbo.getMboValueData('WONUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('WONUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('WONUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="WONUM" data-source="WONUM" data-display="WONUM,DESCRIPTION,ORGID" data-search="WONUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TASKID').getTitle()" /></label>
					<input type="text"
							id="TASKID" 
							required="<s:property value="mbo.getMboValueData('TASKID').isRequired()"/>"
							readonly="FALSE"
							value="<s:property value="mbo.getString('TASKID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TASKID" data-source="TASKID" data-display="TASKID,DESCRIPTION" data-search="TASKID,DESCRIPTION"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSETNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,PLUSTDEFASSETALIAS.ALIAS,ORGID" data-search="ASSETNUM,DESCRIPTION,PLUSTDEFASSETALIAS.ALIAS"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PLUSTDEFASSETALIAS.ALIAS').getTitle()" /></label>
					<input type="text"
							id=" PLUSTASSETALIAS.ALIAS " 
							required="<s:property value="mbo.getMboValueData('PLUSTDEFASSETALIAS.ALIAS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PLUSTDEFASSETALIAS.ALIAS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PLUSTDEFASSETALIAS.ALIAS')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
			   <%--  <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li> --%>
			   <%--  <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLDEBITACCT').getTitle()" /></label>
					<input type="text"
							id="GLDEBITACCT" 
							required="<s:property value="mbo.getMboValueData('GLDEBITACCT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLDEBITACCT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLDEBITACCT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)" data-field="GLDEBITACCT"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLCREDITACCT').getTitle()" /></label>
					<input type="text"
							id="GLCREDITACCT" 
							required="<s:property value="mbo.getMboValueData('GLCREDITACCT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLCREDITACCT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLCREDITACCT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)" data-field="GLCREDITACCT"></a>
				</li> --%>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ENTERBY').getTitle()" /></label>
					<input type="text"
							id="ENTERBY" 
							required="<s:property value="mbo.getMboValueData('ENTERBY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ENTERBY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ENTERBY')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ACTUALDATE').getTitle()" /></label>
					<input type="text"
							id="ACTUALDATE" 
							required="<s:property value="mbo.getMboValueData('ACTUALDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ACTUALDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ACTUALDATE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="TARGSTARTDATE"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUETO').getTitle()" /></label>
					<input type="text"
							id="ISSUETO" 
							required="<s:property value="mbo.getMboValueData('ISSUETO').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUETO').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISSUETO')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ISSUETO" data-source="PERSONID" data-display="PERSONID,FIRSTNAME,LASTNAME" data-search="PERSONID,FIRSTNAME,LASTNAME"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MEMO').getTitle()" /></label>
					<input type="text"
							id="MEMO" 
							required="<s:property value="mbo.getMboValueData('MEMO').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('MEMO').isReadOnly()"/>"
							value="<s:property value="mbo.getString('MEMO')"/>"
							onchange="emm.core.setValue(this)"
					/>
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
			</ul>
		</div>
	</div>
</body>
</html>
