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
			<h3 class="ui-title"><s:text name="ezmaxmobile.invusage"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
			<s:include value="../common/statusbar.jsp"/>		
		</div>
		
		<div class="ui-content">
			
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INVUSENUM').getTitle()" /></label>
					<input type="text"
							id="INVUSENUM" 
							required="<s:property value="mbo.getMboValueData('INVUSENUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('INVUSENUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('INVUSENUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('INVUSENUM').getLength()"/>"
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
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('DESCRIPTION_LONGDESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field ui-field-auto ui-details ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<p><s:property value="mbo.getString('STATUS')" /></p>
					<p><s:property value="mbo.getString('STATUSDATE')" /></p>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
					<input type="text"
						readonly="true"
						value="<s:property value="mbo.getString('SITEID')" />"
					/>
				</li>				
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('FROMSTORELOC').getTitle()" /></label>
					<input type="text"
							id="FROMSTORELOC" 
							required="<s:property value="mbo.getMboValueData('FROMSTORELOC').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FROMSTORELOC').isReadOnly()"/>"
							value="<s:property value="mbo.getString('FROMSTORELOC')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<p><s:property value="mbo.getString('LOCATIONS.DESCRIPTION')"/></p>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FROMSTORELOC" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('USETYPE').getTitle()" /></label>
					<input type="text"
							id="USETYPE" 
							required="<s:property value="mbo.getMboValueData('USETYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('USETYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('USETYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="USETYPE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INVOWNER').getTitle()" /></label>
					<input type="text"
							id="INVOWNER" 
							required="<s:property value="mbo.getMboValueData('INVOWNER').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('INVOWNER').isReadOnly()"/>"
							value="<s:property value="mbo.getString('INVOWNER')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="INVOWNER" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME,FIRSTNAME,LASTNAME" data-search="PERSONID,FIRSTNAME,LASTNAME"></a>
				</li>									
			</ul>

			<div class="ui-section"><s:text name="invusage.invusagelines"/></div>
			<s:if test="mboList.isEmpty() eq false">			
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li data-markdeleted="<s:property value="toBeDeleted()"/>">
							<a href="viewline.action?id=<s:property value="getUniqueIDValue()"/>">
								<p><s:property value="getMboValueInfoStatic('INVUSELINENUM').getTitle()"/>: <s:property value="getString('INVUSELINENUM')"/></p>
								<h3><s:property value="getString('ITEMNUM')"/> - <s:property value="getString('DESCRIPTION')"/></h3>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('FROMBIN').getTitle()"/></strong>: <s:property value="getString('FROMBIN')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('USETYPE').getTitle()"/></strong>: <s:property value="getString('USETYPE')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('QUANTITY').getTitle()"/></strong>: <s:property value="getString('QUANTITY')"/>		
									</div>
									<div class="ui-column">
										
									</div>
								</div>
								<span class="ui-arrow"></span>
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
			<s:else>
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:else>	
			<s:if test="mbo.sigopGranted('NEWINVUSAGE')">
				<div class="ui-btn-container">
					<a class="ui-btn-a" href="addline.action"><s:text name="global.newrow"/></a>
				</div>
			</s:if>								
			<s:include value="actions.jsp"/>	
			
		</div>		
	</div></body>
