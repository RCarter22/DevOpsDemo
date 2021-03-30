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
			<h3 class="ui-title"><s:text name="invbalances.physcount"/></h3>
			<a class="ui-btn-right <s:if test="mboInvbList.get(0).getThisMboSet().toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save('savephysicalcount.action?storeroom=<s:property value='storeroom'/>&itemnum=<s:property value='itemnum'/>')"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			
			<s:if test="mboInvbList.isEmpty() eq false">		
				<s:iterator value="mboInvbList"  status="status">
					<ul class="ui-listview">
						<li>		
							<span>			
								<h3><s:property value="getString('ITEMNUM')"/></h3>
								<h3 class="ui-wrap"><s:property value="getString('ITEM.DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('LOCATION').getTitle()"/>: <s:property value="getString('LOCATION')"/></p>
								<p><s:property value="getMboValueInfoStatic('BINNUM').getTitle()"/>: <s:property value="getString('BINNUM')"/></p>
								<p><s:property value="getMboValueInfoStatic('LOTNUM').getTitle()"/>: <s:property value="getString('LOTNUM')"/></p>
								<h3><s:property value="getMboValueInfoStatic('CURBAL').getTitle()"/>: <s:property value="getString('CURBAL')"/></h3> 
								<h3><s:property value="getMboValueInfoStatic('PHYSCNT').getTitle()"/>: <s:property value="getString('PHYSCNT')"/></h3>
								<p><s:property value="getMboValueInfoStatic('PHYSCNTDATE').getTitle()"/>: <s:property value="getString('PHYSCNTDATE')"/></p>
								<p><s:property value="getMboValueInfoStatic('RECONCILED').getTitle()"/>: <s:property value="getBoolean('RECONCILED')"/></p>
								<s:if test="!getMboSet('ITEM.IMGLIB').isEmpty()">
									<a class="ui-icon" style="background-image: url(../images/attachment.png);" href="viewblob.action?imglibID=<s:property value="getInt('ITEM.IMGLIB.IMGLIBID')"/>"></a>
								</s:if>	
							</span>
						</li>
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('LOTNUM').getTitle()" /></label>
							<input type="text"
								id="<s:property value='getUniqueIDValue()'/>_LOTNUM" 
								required="<s:property value="getMboValueData('LOTNUM').isRequired()"/>"
								readonly="<s:property value="getMboValueData('LOTNUM').isReadOnly()"/>"
								value="<s:property value="getString('LOTNUM')"/>"
							/>
						</li>
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('ADJUSTEDPHYSCNT').getTitle()" /></label>
							<input type="text"
								id="<s:property value='getUniqueIDValue()'/>_ADJUSTEDPHYSCNT" 
								required="<s:property value="getMboValueData('ADJUSTEDPHYSCNT').isRequired()"/>"
								readonly="<s:property value="getMboValueData('ADJUSTEDPHYSCNT').isReadOnly()"/>"
								value="<s:property value="getString('ADJUSTEDPHYSCNT')"/>"
								onchange="emm.core.setListValue(this)"
								data-mbo="INVBALANCESMBOSET"
								data-field="ADJUSTEDPHYSCNT"
								data-control="spinner" data-interval="1.00" data-min="0"
							/>
						</li>
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('ADJUSTEDPHYSCNTDATE').getTitle()" /></label>
							<input type="text"
								id="<s:property value='getUniqueIDValue()'/>_ADJUSTEDPHYSCNTDATE"
								required="<s:property value="getMboValueData('ADJUSTEDPHYSCNTDATE').isRequired()"/>"
								readonly="<s:property value="getMboValueData('ADJUSTEDPHYSCNTDATE').isReadOnly()"/>"
								value="<s:property value="getDate('ADJUSTEDPHYSCNTDATE').getTime()"/>"
								onchange="emm.core.setListValue(this)"
								data-mbo="INVBALANCESMBOSET"
								data-field="ADJUSTEDPHYSCNTDATE"
							/>
							<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="<s:property value='getUniqueIDValue()'/>_ADJUSTEDPHYSCNTDATE"></a>
						</li>
						<li class="ui-field">
							<label><s:property value="getMboValueInfoStatic('MEMO').getTitle()" /></label>
							<input type="text"
								id="<s:property value='getUniqueIDValue()'/>_MEMO" 
								required="<s:property value="getMboValueData('MEMO').isRequired()"/>"
								readonly="<s:property value="getMboValueData('MEMO').isReadOnly()"/>"
								value="<s:property value="getString('MEMO')"/>"
								onchange="emm.core.setListValue(this)"
								data-mbo="INVBALANCESMBOSET"
								data-field="MEMO"
							/>
						</li>
					</ul>
				</s:iterator>
			</s:if>
			<s:else>
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:else>
			
		</div>
	</div>
</body>
