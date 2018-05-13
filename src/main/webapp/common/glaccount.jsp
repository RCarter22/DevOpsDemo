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
	<div class="ui-page">
		<s:form action="selectgl" method="post">
			<s:hidden name="glOrder"/>
			<s:hidden name="currentGL"/>
			<s:hidden name="glaccount"/>
			<s:hidden name="fieldName"/>
			<s:hidden name="currentAction"/>
			<s:include value="../common/statusbar.jsp"/>
			
			<div class="ui-header ui-header-b">
				<a class="ui-btn-left" href="<s:property value="currentAction"/>"><s:text name="global.cancel"/></a>
				<h3 class="ui-title"><s:text name="global.selectvalue"/></h3>
				<a class="ui-btn-right" onclick="emm.core.setGLA('<s:property value='currentAction'/>');"><s:text name="global.ok"/></a>		
			</div>
			<div class="ui-searchbar">
				<input type="search" placeholder="<s:text name="global.search"/>" name="search" type="text" value="<s:property value="search"/>"/>
			</div>
			<div class="ui-content">
				<div id="GLACCOUNT" style="padding:10px; text-align:center; font-size:20px; color:#000;background-color:#fff;">
					<s:iterator value="topGLConfigures">	
						<a id="comp<s:property value="getInt('GLORDER')"/>" href="javascript:emm.core.toGLOrder(<s:property value="getInt('GLORDER')"/>);" style="<s:if test="getInt('GLORDER') eq glOrder">font-weight:bold;</s:if>color:inherit;">
							<s:if test="getString('GROUPNAME') neq ''">
								<s:property value="getString('GROUPNAME')"/>
							</s:if>	
							<s:else>
								<s:iterator status="stat" value="(getInt('GLLENGTH')).{ #this }" >?</s:iterator>
							</s:else>
						</a>			
						<s:if test="getInt('GLORDER') < topGLConfigures.size-1"><s:property value="getString('DELIMITER')"/></s:if>
					</s:iterator>
				</div>
				
				<ul class="ui-listview">
					<li class="ui-divider ui-divider-c"><s:text name="global.segment"/>: <s:property value="topGLConfigures.get(glOrder).getString('GLACCOUNTFIELD')"/></li>
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="glComponents">
						<li>
							<a onclick="emm.core.doSelectGLComp('comp<s:property value="getString('GLORDER')"/>','<s:property value="getString('COMPVALUE')"/>',<s:property value="getInt('GLORDER')"/>+1)">
								<h3><s:property value="getString('COMPVALUE')"/></h3>
								<p><s:property value="getString('COMPTEXT')"/></p>					
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</div>
		</s:form>
	</div>
</body>
</html>
