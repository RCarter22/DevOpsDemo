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
			<h3 class="ui-title"><s:text name="plustasset.aliases"/></h3>
			<%-- <a class="ui-btn-right" href="add.action"><img src="../images/plus.png"/></a>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a> --%>
		</div>
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<s:if test="mboList.size > 0">
				<ul class="ui-listview">							
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a>	
								<p><strong><s:property value="getString('ALIAS')"/></strong></p>
								<h3><s:property value="getString('DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('ISACTIVE').getTitle()"/>: <s:property value="getString('ISACTIVE')"/></p>
								<p><s:property value="getMboValueInfoStatic('ISDEFAULT').getTitle()"/>: <s:property value="getString('ISDEFAULT')"/></p>
							</a>
							<%-- <a href="delete.action?id=<s:property value='getUniqueIDValue()'/>" class="ui-trash-large"></a> --%>
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
		</div>
	</div>		
</body>
</html>
