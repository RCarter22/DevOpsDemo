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
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.ok"/></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.bboard"/></h3>
			<s:if test="appAction eq 'BBORG' && mbo.getName() neq 'BBOARDAUDIENCE'">
				<a class="ui-btn-right" href="addbbaudience.action?appAction=BBORG"><img src="../images/plus.png"/></a>
			</s:if>
			<s:if test="appAction eq 'BBSITE' && mbo.getName() neq 'BBOARDAUDIENCE'">
				<a class="ui-btn-right" href="addbbaudience.action?appAction=BBSITE"><img src="../images/plus.png"/></a>
			</s:if>
			<s:if test="appAction eq 'BBGROUP' && mbo.getName() neq 'BBOARDAUDIENCE'">
				<a class="ui-btn-right" href="addbbaudience.action?appAction=BBGROUP"><img src="../images/plus.png"/></a>
			</s:if>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:if test="mboList neq null">			
				<ul class="ui-listview">
					<s:iterator value="mboList">
						<li>
							<span>
								<s:if test="appAction eq 'BBORG'">
									<p><strong><s:property value="getString('MSGORGID')"/></strong></p>
									<h3><s:property value="getString('BBORGDESC.DESCRIPTION')"/></h3>
								</s:if>
								<s:if test="appAction eq 'BBSITE'">
									<p><strong><s:property value="getString('MSGSITEID')"/></strong></p>
									<h3><s:property value="getString('BBSITEDESC.DESCRIPTION')"/></h3>
								</s:if>
								<s:if test="appAction eq 'BBGROUP'">
									<p><strong><s:property value="getString('PERSONGROUP')"/></strong></p>
									<h3><s:property value="getString('BBGROUPDESC.DESCRIPTION')"/></h3>
								</s:if>
							</span>
						</li>
					</s:iterator>
				</ul>
			</s:if>
			<s:if test="mbo.getName() eq 'BBOARDAUDIENCE' && mbo.toBeAdded()">
				<ul class="ui-listview">
					<s:if test="appAction eq 'BBORG'">
						<li class="ui-field">
							<label><s:property value="mbo.getMboValueInfoStatic('MSGORGID').getTitle()" /></label>
							<input type="text"
									id="MSGORGID" 
									required="<s:property value="mbo.getMboValueData('MSGORGID').isRequired()"/>"
									readonly="<s:property value="mbo.getMboValueData('MSGORGID').isReadOnly()"/>"
									value="<s:property value="mbo.getString('MSGORGID')"/>"
									maxlength="<s:property value="mbo.getMboValueData('MSGORGID').getLength()"/>"
									onchange="emm.core.setValue(this)"
							/>
							<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="MSGORGID" data-source="ORGID" data-display="ORGID,DESCRIPTION" data-search="ORGID,DESCRIPTION"></a>
						</li>
					</s:if>
					<s:if test="appAction eq 'BBSITE'">
						<li class="ui-field">
							<label><s:property value="mbo.getMboValueInfoStatic('MSGSITEID').getTitle()" /></label>
							<input type="text"
									id="MSGSITEID" 
									required="<s:property value="mbo.getMboValueData('MSGSITEID').isRequired()"/>"
									readonly="<s:property value="mbo.getMboValueData('MSGSITEID').isReadOnly()"/>"
									value="<s:property value="mbo.getString('MSGSITEID')"/>"
									maxlength="<s:property value="mbo.getMboValueData('MSGSITEID').getLength()"/>"
									onchange="emm.core.setValue(this)"
							/>
							<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="MSGSITEID" data-source="SITEID" data-display="SITEID,DESCRIPTION" data-search="SITEID,DESCRIPTION"></a>
						</li>
					</s:if>		
					<s:if test="appAction eq 'BBGROUP'">
						<li class="ui-field">
							<label><s:property value="mbo.getMboValueInfoStatic('PERSONGROUP').getTitle()" /></label>
							<input type="text"
									id="PERSONGROUP" 
									required="<s:property value="mbo.getMboValueData('PERSONGROUP').isRequired()"/>"
									readonly="<s:property value="mbo.getMboValueData('PERSONGROUP').isReadOnly()"/>"
									value="<s:property value="mbo.getString('PERSONGROUP')"/>"
									maxlength="<s:property value="mbo.getMboValueData('PERSONGROUP').getLength()"/>"
									onchange="emm.core.setValue(this)"
							/>
							<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PERSONGROUP" data-source="PERSONGROUP" data-display="PERSONGROUP,DESCRIPTION" data-search="PERSONGROUP,DESCRIPTION"></a>
						</li>
					</s:if>	
				</ul>	
			</s:if>
		</div>
	</div>
</body>
