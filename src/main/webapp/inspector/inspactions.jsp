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
			<h3 class="ui-title">Take Actions</h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>

		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('RESULTNUM').getTitle()" /></label>
					<input type="text"
							id="RESULTNUM" 
							required="<s:property value="mbo.getMboValueData('RESULTNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('RESULTNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('RESULTNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<p id="INSPECTIONFORM.NAME"><s:property value="mbo.getString('INSPECTIONFORM.NAME')"/></p>
				</li>			
			</ul>
		</div>
				
		<s:if test="mboList.size > 0">
			<s:form action="scheduleinsp.action" method="post">
			<s:hidden name="refobject" value="ASSET" />
				<div class="ui-content">
					<ul class="ui-listview ui-radiobutton">	
					<li class="ui-divider">Actions</li>
						<s:iterator value="mboList">
							<li>
								<a href="executeaction.action?id=<s:property value="getUniqueIDValue()"/>">
								    <h3><s:property value="getString('AUTOSCRIPT')"/></h3>
								    <p><s:property value="getMboSet('$SCRIPT', 'AUTOSCRIPT', 'AUTOSCRIPT = :AUTOSCRIPT').getMbo(0).getString('DESCRIPTION')"/></p>
								    <span class="ui-arrow"></span>
							    </a>
							</li>
						</s:iterator>
					</ul>
				</div>
				
				<!-- <div class="ui-btn-container">
					<input class="ui-btn-e" type="submit" value="Schedule an Inspection">
				</div> -->
			</s:form>
		</s:if>
			

			
	</div>
</body>
</html>
