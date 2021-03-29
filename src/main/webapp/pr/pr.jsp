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
			<h3 class="ui-title"><s:text name="ezmaxmobile.pr"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<a class="ui-btn-right" data-scrollto="#ACTIONS"><span class="emm-ellipsis-v"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<ul class="ui-navbar">
			<li>
				<a class="ui-active">
					<s:text name="ezmaxmobile.pr"/>
				</a>
			<li>
				<a href="prlines.action?id=<s:property value="mbo.getUniqueIDValue()"/>">
					<s:text name="pr.prlines"/>
				</a>				
		</ul>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PRNUM').getTitle()" /></label>
					<input type="text"
							id="PRNUM" 
							required="<s:property value="mbo.getMboValueData('PRNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PRNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PRNUM')"/>"
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
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<input type="text"
							id="STATUS" 
							required="<s:property value="mbo.getMboValueData('STATUS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STATUS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STATUS')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PRIORITY').getTitle()" /></label>
					<input type="text"
							id="PRIORITY" 
							required="<s:property value="mbo.getMboValueData('PRIORITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PRIORITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PRIORITY')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-divider"><s:text name="global.dates"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUSDATE').getTitle()" /></label>
					<input type="text"
							id="STATUSDATE" 
							required="<s:property value="mbo.getMboValueData('STATUSDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STATUSDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STATUSDATE')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUEDATE').getTitle()" /></label>
					<input type="text"
							id="ISSUEDATE" 
							required="<s:property value="mbo.getMboValueData('ISSUEDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUEDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('ISSUEDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="ISSUEDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('REQUIREDDATE').getTitle()" /></label>
					<input type="text"
							id="REQUIREDDATE" 
							required="<s:property value="mbo.getMboValueData('REQUIREDDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REQUIREDDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('REQUIREDDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="REQUIREDDATE"></a>
				</li>
				<li class="ui-divider"><s:text name="global.costs"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOTALCOST').getTitle()" /></label>
					<input type="text"
							id="TOTALCOST" 
							required="<s:property value="mbo.getMboValueData('TOTALCOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOTALCOST').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOTALCOST')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CURRENCYCODE').getTitle()" /></label>
					<input type="text"
							id="CURRENCYCODE" 
							required="<s:property value="mbo.getMboValueData('CURRENCYCODE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CURRENCYCODE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CURRENCYCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="CURRENCYCODE" data-source="CURRENCYCODE" data-display="CURRENCYCODE,DESCRIPTION" data-search="CURRENCYCODE,DESCRIPTION"></a>
				</li>
				<li class="ui-divider"><s:text name="global.vendor"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('NOVENDOR').getTitle()" /></label>
					<input type="checkbox"
							id="NOVENDOR" 
							required="<s:property value="mbo.getMboValueData('NOVENDOR').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('NOVENDOR').isReadOnly()"/>"
							value="<s:property value="mbo.getString('NOVENDOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('VENDOR').getTitle()" /></label>
					<input type="text"
							id="VENDOR" 
							required="<s:property value="mbo.getMboValueData('VENDOR').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('VENDOR').isReadOnly()"/>"
							value="<s:property value="mbo.getString('VENDOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="VENDOR" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CONTACT').getTitle()" /></label>
					<input type="text"
							id="CONTACT" 
							required="<s:property value="mbo.getMboValueData('CONTACT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CONTACT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CONTACT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="CONTACT" data-source="CONTACT" data-display="CONTACT,ORGID" data-search="CONTACT"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PR_VENDOR.PHONE').getTitle()" /></label>
					<input type="text"
							id="PR_VENDOR.PHONE" 
							required="<s:property value="mbo.getMboValueData('PR_VENDOR.PHONE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('COMPANIES.PHONE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PR_VENDOR.PHONE')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-divider"><s:text name="global.shipping"/></li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SHIPTO').getTitle()" /></label>
					<input type="text"
							id="SHIPTO" 
							required="<s:property value="mbo.getMboValueData('SHIPTO').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SHIPTO').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SHIPTO')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SHIPTO" data-source="ADDRESSCODE" data-display="ADDRESSCODE,ADDRESS.DESCRIPTION" data-search="ADDRESSCODE,ADDRESS.DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SHIPTOATTN').getTitle()" /></label>
					<input type="text"
							id="SHIPTOATTN" 
							required="<s:property value="mbo.getMboValueData('SHIPTOATTN').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SHIPTOATTN').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SHIPTOATTN')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SHIPTOATTN" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('BILLTO').getTitle()" /></label>
					<input type="text"
							id="BILLTO" 
							required="<s:property value="mbo.getMboValueData('BILLTO').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('BILLTO').isReadOnly()"/>"
							value="<s:property value="mbo.getString('BILLTO')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="BILLTO" data-source="ADDRESSCODE" data-display="ADDRESSCODE,ADDRESS.DESCRIPTION" data-search="ADDRESSCODE,ADDRESS.DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('BILLTOATTN').getTitle()" /></label>
					<input type="text"
							id="BILLTOATTN" 
							required="<s:property value="mbo.getMboValueData('BILLTOATTN').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('BILLTOATTN').isReadOnly()"/>"
							value="<s:property value="mbo.getString('BILLTOATTN')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="BILLTOATTN" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>
			</ul>
			
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>
			</s:if>					
		</div>
	</div>
</body>
