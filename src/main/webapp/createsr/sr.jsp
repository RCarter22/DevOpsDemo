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
			<h3 class="ui-title"><s:text name="ezmaxmobile.sr"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<a class="ui-btn-right" data-scrollto="#ACTIONS"><span class="emm-ellipsis-v"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TICKETID').getTitle()" /></label>
					<input type="text"
							id="TICKETID" 
							required="<s:property value="mbo.getMboValueData('TICKETID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TICKETID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TICKETID')"/>"
							maxlength="<s:property value="mbo.getMboValueData('TICKETID').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION_LONGDESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION_LONGDESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION_LONGDESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION_LONGDESCRIPTION').isReadOnly()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('DESCRIPTION_LONGDESCRIPTION')"/></textarea>
				</li>
				<s:if test="!mbo.isNew()">
					<li class="ui-field ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
						<p><s:property value="mbo.getString('STATUS')" /></p>
						<p><s:property value="mbo.getString('STATUSDATE')" /></p>
					</li>			
					<li class="ui-field ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
						<p><s:property value="mbo.getString('SITEID')" /></p>
					</li>
				</s:if>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('REPORTEDBYID').getTitle()" /></label>
					<input type="text"
							id="REPORTEDBY" 
							required="<s:property value="mbo.getMboValueData('REPORTEDBYID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REPORTEDBYID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('REPORTEDBYID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="REPORTEDBYID" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('REPORTEDEMAIL').getTitle()" /></label>
					<input type="text"
							id="REPORTEDEMAIL" 
							required="<s:property value="mbo.getMboValueData('REPORTEDEMAIL').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REPORTEDEMAIL').isReadOnly()"/>"
							value="<s:property value="mbo.getString('REPORTEDEMAIL')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('AFFECTEDPERSONID').getTitle()" /></label>
					<input type="text"
							id="AFFECTEDPERSONID" 
							required="<s:property value="mbo.getMboValueData('AFFECTEDPERSONID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('AFFECTEDPERSONID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('AFFECTEDPERSONID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="AFFECTEDPERSONID" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>
				<s:property value="mbo.setValue('ASSETFILTERBY', 'ALL')"/>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSETNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION" data-search="ASSETNUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('REPORTEDPRIORITY').getTitle()" /></label>
					<input type="text"
							id="REPORTEDPRIORITY" 
							required="<s:property value="mbo.getMboValueData('REPORTEDPRIORITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REPORTEDPRIORITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('REPORTEDPRIORITY')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="REPORTEDPRIORITY" data-source="VALUE" data-display="VALUE,DESCRIPTION" data-search="VALUE,DESCRIPTION"></a>
				</li> 
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLACCOUNT').getTitle()" /></label>
					<input type="text"
							id="GLACCOUNT" 
							required="<s:property value="mbo.getMboValueData('GLACCOUNT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLACCOUNT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLACCOUNT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)"></a>
				</li>
				<s:if test="!mbo.isNew()">
					<li class="ui-divider"><s:text name="global.responsibility"/></li>
					<li class="ui-field ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('REPORTEDBY').getTitle()" /></label>
						<p><s:property value="mbo.getString('REPORTEDBY')" /></p>
						<p><s:property value="mbo.getString('REPORTDATE')" /></p>
					</li>		
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('PERSON.PRIMARYPHONE').getTitle()" /></label>
						<input type="text"
							readonly="true"
							value="<s:property value="mbo.getString('PERSON.PRIMARYPHONE')" />"
						/>
						<a class="ui-arrow" onclick="emm.util.phone('<s:property value="mbo.getString('PERSON.PRIMARYPHONE')"/>')"></a>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('PERSON.PRIMARYEMAIL').getTitle()" /></label>
						<input type="text"
							readonly="true"
							value="<s:property value="mbo.getString('PERSON.PRIMARYEMAIL')" />"
						/>
						<a class="ui-arrow" onclick="emm.util.email('<s:property value="mbo.getString('PERSON')"/>')"></a>
					</li>
					<li class="ui-field ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('OWNER').getTitle()" /></label>
						<p><s:property value="mbo.getString('OWNER')" /></p>
						<p><s:property value="mbo.getString('OWNERPERSON.DISPLAYNAME')" /></p>
					</li>	
					<li class="ui-field ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('OWNERGROUP').getTitle()" /></label>
						<p><s:property value="mbo.getString('OWNERGROUP')" /></p>
						<p><s:property value="mbo.getString('PERSONGROUPUSEDBYTICKET.DESCRIPTION')" /></p>
					</li>	
				</s:if>										
			</ul>
			
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>	
			</s:if>
		</div>
	</div>
</body>
</html>
