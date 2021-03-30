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
			<h3 class="ui-title"><s:text name="ezmaxmobile.createdr"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content ui-content-narrow">
			<ul class="ui-listview ui-inset">
				<li class="ui-pagination">	
					<a class="ui-pagination-prev" href="view.action?id=<s:property value="mbo.getUniqueIDValue()"/>">	
						<span class="ui-arrow"></span>
					</a>
					<h3 class="title">
						Step 2 of 2
					</h3>
				</li>
			</ul>
			
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MRNUM').getTitle()" /></label>
					<input type="text"
							id="MRNUM" 
							required="<s:property value="mbo.getMboValueData('MRNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('MRNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('MRNUM')"/>"
							onchange="emm.core.setValue(this)"
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
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="WONUM" data-source="WONUM" data-display="WONUM,DESCRIPTION" data-search="WONUM,DESCRIPTION"></a>					
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION" data-search="LOCATION,DESCRIPTION"></a>					
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
								<li class="ui-field ui-details ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<p><s:property value="mbo.getString('STATUS')" /></p>
					<p><s:property value="mbo.getString('STATUSDATE')" /></p>
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
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="REQUIREDDATE"></a>
				</li>	
			</ul>
			<div class="ui-section"><s:text name="mr.mrlines"/></div>
			<s:if test="mboList.isEmpty() eq false">			
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li data-markdeleted="<s:property value="toBeDeleted()"/>">
							<a href="viewline.action?id=<s:property value="getUniqueIDValue()"/>">
								<p><s:property value="getMboValueInfoStatic('MRLINENUM').getTitle()"/>: <s:property value="getString('MRLINENUM')"/></p>
								<h3><s:property value="getString('ITEMNUM')"/> - <s:property value="getString('DESCRIPTION')"/></h3>
								<table>
									<tbody>
										<tr><td width="90px"><strong><s:property value="getMboValueInfoStatic('QTY').getTitle()"/></strong></td><td><s:property value="getString('QTY')"/></td></tr>
									</tbody>
								</table>
								<span class="ui-arrow"></span>
							</a>
							<a class="ui-trash-large" href="deleteline.action?id=<s:property value="getUniqueIDValue()"/>"></a>
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
			<div class="ui-btn-container">
				<a onclick="emm.core.save()" class="ui-btn-a <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>"><s:text name="global.savedraft"/></a>
				<a onclick="emm.core.save('submit.action')" class="ui-btn-b <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>"><s:text name="global.submit"/></a>			
			</div>	
		</div>
		<div id="ACTIONS" class="ui-sidebar">
			<p class="ui-section"><s:text name="global.actions"/></p>
			<ul class="ui-listview ui-inset">
			
				<li data-visible="">
					<a href="addline.action">
						<span class="emm-add"></span>
						<h3><s:text name="global.newrow"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>	
				<li data-visible="">
					<a href="selectspareparts.action">
						<span class="emm-add"></span>
						<h3><s:text name="global.selectspareparts"/></h3>
						<span class="ui-arrow"></span>
					</a>
				</li>
			</ul>
		</div>		
	</div>
</body>
