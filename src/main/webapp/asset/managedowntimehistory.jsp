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
			<h3 class="ui-title">Manage Downtime History</h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" href="domanagedowntime.action"><span class="emm-floppy-o"></span></a>
		</div>		
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
					/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSET.DESCRIPTION').getTitle()" /></label>
					<textarea
							id="ASSET.DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('ASSET.DESCRIPTION').isRequired()"/>"
							readonly="true"
							maxlength="<s:property value="mbo.getMboValueData('ASSET.DESCRIPTION').getLength()"/>"
					><s:property value="mbo.getString('ASSET.DESCRIPTION')"/></textarea>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSET.SITEID').getTitle()" /></label>
					<input type="text"
							id="ASSET.SITEID" 
							required="<s:property value="mbo.getMboValueData('ASSET.SITEID').isRequired()"/>"
							readonly="true"
							value="<s:property value="mbo.getString('ASSET.SITEID')"/>"
					/>
				</li>				
			</ul>
			
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('DOWNTIME').getTitle()" /></label>
					<input type="text"
							id="DOWNTIME" 
							required="<s:property value="mbo.getMboValueData('DOWNTIME').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DOWNTIME').isReadOnly()"/>"
							value="<s:property value="mbo.getString('DOWNTIME')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STARTDATE').getTitle()" /></label>
					<input type="text"
							id="STARTDATE" 
							required="<s:property value="mbo.getMboValueData('STARTDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STARTDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('STARTDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="STARTDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STARTWONUM').getTitle()" /></label>
					<input type="text"
							id="STARTWONUM" 
							required="<s:property value="mbo.getMboValueData('STARTWONUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STARTWONUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STARTWONUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STARTWONUM" data-source="WONUM" data-display="WONUM,DESCRIPTION,REPORTDATE" data-search="WONUM,DESCRIPTION,REPORTDATE"></a>
				</li>		
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STARTCODE').getTitle()" /></label>
					<input type="text"
							id="STARTCODE" 
							required="<s:property value="mbo.getMboValueData('STARTCODE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STARTCODE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STARTCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STARTCODE"></a>
				</li>
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ENDDATE').getTitle()" /></label>
					<input type="text"
							id="ENDDATE" 
							required="<s:property value="mbo.getMboValueData('ENDDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ENDDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('ENDDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="ENDDATE"></a>
				</li> 
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ENDWONUM').getTitle()" /></label>
					<input type="text"
							id="ENDWONUM" 
							required="<s:property value="mbo.getMboValueData('ENDWONUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ENDWONUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ENDWONUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ENDWONUM" data-source="WONUM" data-display="WONUM,DESCRIPTION,REPORTDATE" data-search="WONUM,DESCRIPTION,REPORTDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ENDCODE').getTitle()" /></label>
					<input type="text"
							id="ENDCODE" 
							required="<s:property value="mbo.getMboValueData('ENDCODE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ENDCODE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ENDCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ENDCODE"></a>
				</li>				
			</ul>
			
			<p class="ui-section"><s:property value="mbo.getMboValueInfoStatic('STARTOPERATIONAL').getTitle()" /></p>
			<ul class="ui-listview ui-radiobutton" id="group1">
			    <li>
					<label for="check1">Operational</label>
					<input type="radio"
							id="check1" 
							name="group1"
							value="1"
							<s:if test="mbo.getString('STARTOPERATIONAL') eq 1">checked="checked"</s:if>
							data-mbo="MODDOWNTIMEHIST"
							data-field="STARTOPERATIONAL"
							name="type"
							onclick="emm.core.setValue(this)"
					/>
				</li>		
			    <li>
					<label for="check2">Non-Operational</label>
					<input type="radio"
							id="check2"
							name="group1"
							value="0"
							<s:if test="mbo.getString('STARTOPERATIONAL') eq 0">checked="checked"</s:if>
							data-mbo="MODDOWNTIMEHIST"
							data-field="STARTOPERATIONAL"
							name="type"
							onclick="emm.core.setValue(this)"
					/>
				</li>
			</ul>
			
			<p class="ui-section"><s:property value="mbo.getMboValueInfoStatic('ENDOPERATIONAL').getTitle()" /></p>
			<ul class="ui-listview ui-radiobutton" id="group2">
			    <li>
					<label for="check3">Operational</label>
					<input type="radio"
							id="check3"
							name="group2" 
							value="1"
							<s:if test="mbo.getString('ENDOPERATIONAL') eq 1">checked="checked"</s:if>
							data-mbo="MODDOWNTIMEHIST"
							data-field="ENDOPERATIONAL"
							name="type"
							onclick="emm.core.setValue(this)"
					/>
				</li>		
			    <li>
					<label for="check4">Non-Operational</label>
					<input type="radio"
							id="check4"
							name="group2"
							value="0"
							<s:if test="mbo.getString('ENDOPERATIONAL') eq 0">checked="checked"</s:if>
							data-mbo="MODDOWNTIMEHIST"
							data-field="ENDOPERATIONAL"
							name="type"
							onclick="emm.core.setValue(this)"
					/>
				</li>
			</ul>

		</div>
	</div>
</body>
</html>
