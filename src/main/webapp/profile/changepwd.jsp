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
			<a class="ui-btn-left" href="../main.action"><span class="emm-home"></span></a>
			<h3 class="ui-title"><s:text name="global.passwordinfo"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field ui-field-auto ui-details ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('USERID').getTitle()" /></label>
					<p><s:property value="mbo.getString('USERID')" /></p>
					<p><s:property value="mbo.getString('MAXUSER.PERSON.DISPLAYNAME')" /></p>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PASSWORDINPUT').getTitle()" /></label>
					<input type="password"
							id="PASSWORDINPUT" 
							required="<s:property value="mbo.getMboValueData('PASSWORDINPUT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PASSWORDINPUT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PASSWORDINPUT')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PASSWORDCHECK').getTitle()" /></label>
					<input type="password"
							id="PASSWORDCHECK" 
							required="<s:property value="mbo.getMboValueData('PASSWORDCHECK').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PASSWORDCHECK').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PASSWORDCHECK')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PWHINTQUESTION').getTitle()" /></label>
					<input type="text"
							id="PWHINTQUESTION" 
							required="<s:property value="mbo.getMboValueData('PWHINTQUESTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PWHINTQUESTION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PWHINTQUESTION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PWHINTQUESTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PWHINTANSWER').getTitle()" /></label>
					<input type="text"
							id="PWHINTANSWER" 
							required="<s:property value="mbo.getMboValueData('PWHINTANSWER').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PWHINTANSWER').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PWHINTANSWER')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>		
			</ul>
			<div class="ui-btn-container">
				<a class="ui-btn-b" href="cancelchangepwd.action">
					<s:text name="global.cancel"/>
				</a>
				<a class="ui-btn-a" href="dochangepwd.action">
					<s:text name="global.save"/>
				</a>
			</div>
		</div>
	</div>
</body>