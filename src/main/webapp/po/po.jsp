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
			<h3 class="ui-title"><s:text name="ezmaxmobile.po"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			 <a class="ui-btn-right" data-scrollto="#ACTIONS"><span class="emm-ellipsis-v"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<ul class="ui-navbar">
			<li>
				<a class="ui-active">
					<s:text name="ezmaxmobile.po"/>
				</a>
			<li>
				<a href="polines.action?id=<s:property value="mbo.getUniqueIDValue()"/>">
					<s:text name="po.polines"/>
				</a>				
		</ul>		
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PONUM').getTitle()" /></label>
					<input type="text"
							id="PONUM" 
							required="<s:property value="mbo.getMboValueData('PONUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PONUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PONUM')"/>"
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
					<label><s:property value="mbo.getMboValueInfoStatic('ORDERDATE').getTitle()" /></label>
					<input type="text"
							id="ORDERDATE" 
							required="<s:property value="mbo.getMboValueData('ORDERDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ORDERDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('ORDERDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="ORDERDATE"></a>
				</li>
				<li class="ui-divider"><s:text name="global.costs"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOTALCOST').getTitle()" /></label>
					<input type="text"
							id="TOTALCOST" 
							required="<s:property value="mbo.getMboValueData('TOTALCOST').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TOTALCOST').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TOTALCOST')"/>"
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
					<label><s:property value="mbo.getMboValueInfoStatic('PO_VENDOR.PHONE').getTitle()" /></label>
					<input type="text"
							id="PO_VENDOR.PHONE" 
							required="<s:property value="mbo.getMboValueData('PO_VENDOR.PHONE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('COMPANIES.PHONE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PO_VENDOR.PHONE')"/>"
					/>
				</li>
				<s:if test="!mbo.getMboSet('IMGLIB').isEmpty()">
					<li class="ui-divider"><s:text name="global.signature"/></li>
					<li class="ui-field" style="min-height: 150px;">
						<div class="ui-inset" style="text-align: center;">
							<img style="max-height: 300px; max-width: 300px;" src="viewblob.action?imglibID=<s:property value="mbo.getInt('IMGLIB.IMGLIBID')"/>" />
						</div>
					</li>
					<li class="ui-field ui-field-auto">
						<label><s:text name="global.signature"/></label>
						<p><s:property value="mbo.getString('IMGLIB.IMAGENAME')"/></p>
					</li>
				</s:if>
			</ul>
			
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>
			</s:if>		
		</div>		
	</div>
</body>
