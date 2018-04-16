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
			<h3 class="ui-title"><s:text name="receipts.receiverotatingitem"/></h3>
			<a class="ui-btn-right" onclick="$('#myform').submit()"><s:text name="global.ok"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			
			<form id="myform" action="saverotatingreceipts.action" method="post">
				<s:if test="!mboList.isEmpty()">				
					<ul class="ui-listview">
						<s:include value="../common/pagination.jsp"/>
							<s:iterator value="mboList" status="status">
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_ASSETNUM" 
											required="<s:property value="getMboValueData('ASSETNUM').isRequired()"/>"
											readonly="<s:property value="getMboValueData('ASSETNUM').isReadOnly()"/>"
											value="<s:property value="getString('ASSETNUM')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="ASSETINPUT"
											data-field="ASSETNUM"
										/>
									</li>						
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_DESCRIPTION" 
											required="<s:property value="getMboValueData('DESCRIPTION').isRequired()"/>"
											readonly="<s:property value="getMboValueData('DESCRIPTION').isReadOnly()"/>"
											value="<s:property value="getString('DESCRIPTION')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="ASSETINPUT"
											data-field="DESCRIPTION"
										/>
									</li>
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_ITEMNUM" 
											required="<s:property value="getMboValueData('ITEMNUM').isRequired()"/>"
											readonly="<s:property value="getMboValueData('ITEMNUM').isReadOnly()"/>"
											value="<s:property value="getString('ITEMNUM')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="ASSETINPUT"
											data-field="ITEMNUM"
										/>
									</li>
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('UNITCOST').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_UNITCOST"
											required="<s:property value="getMboValueData('UNITCOST').isRequired()"/>"
											readonly="<s:property value="getMboValueData('UNITCOST').isReadOnly()"/>"
											value="<s:property value="getString('UNITCOST')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="ASSETINPUT"
											data-field="UNITCOST"
										/>
									</li>	
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('SERIALNUM').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_SERIALNUM" 
											required="<s:property value="getMboValueData('SERIALNUM').isRequired()"/>"
											readonly="<s:property value="getMboValueData('SERIALNUM').isReadOnly()"/>"
											value="<s:property value="getString('SERIALNUM')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="ASSETINPUT"
											data-field="SERIALNUM"
										/>
									</li>
									<li class="ui-divider ui-divider-b"></li>
								</s:iterator>
							<s:include value="../common/pagination.jsp"/>	
						</ul>
					<div class="ui-btn-container">
						<a class="ui-btn-a" href="autonumber.action?id=<s:property value="mbo.getUniqueIDValue()"/>"><s:text name="receipts.autonumber"/></a>
					</div>						
				</s:if>
				<s:else>
					<div class="ui-statusbar ui-statusbar-c">	
						<h3 class="ui-title"><s:text name="global.norecords"/></h3>
					</div>
				</s:else>														
			</form>
		</div>
	</div>
</body>
