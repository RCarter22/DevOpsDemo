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
		<div class="ui-header ui-header-b">
			<a class="ui-btn-left" href="<s:property value='currentAction'/>"><s:text name="global.cancel"/></a>
			<h3 class="ui-title"><s:text name="global.selectvalue"/></h3>	
			<a class="ui-btn-right" onclick="emm.core.ezlookup()"><img src="../images/barcode.png"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>	
		<div class="ui-content">
			<div class="ui-searchbar">
				<form method="post" action="${pageContext.request.contextPath}/domain/selectowner.action">				
					<s:hidden name="searchFlds"/>
					<s:hidden name="fieldName"/>
					<s:hidden name="updateField"/>
					<s:hidden name="dispFlds"/>
					<s:hidden name="lookupSourceField"/>
					<s:hidden name="currentAction"/>
					<s:hidden name="lookupMbo"/>
					<s:hidden name="lookupMboId"/>
					<input type="search" placeholder="<s:text name="global.search"/>" name="search" value="<s:property value="search"/>"/>	
				</form>	
			</div>
			<ul class="ui-navbar">
				<li>
					<a onclick="emm.core.selectOwner(this)" data-field="OWNER" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME" data-currentaction="<s:property value='currentAction'/>"
							<s:if test="fieldName.equals('OWNER')">		
								class="ui-active" 
							</s:if>
						>
						<s:text name="global.persons"/>
					</a>
				<li>
					<a onclick="emm.core.selectOwner(this)" data-field="OWNERGROUP" data-source="PERSONGROUP" data-display="PERSONGROUP,DESCRIPTION" data-search="PERSONGROUP,DESCRIPTION" data-currentaction="<s:property value='currentAction'/>"
							<s:if test="fieldName.equals('OWNERGROUP')">		
								class="ui-active" 
							</s:if>					
					    >
						<s:text name="global.persongroup"/>
					</a>
			</ul>	
			<s:if test="mboList.size == 0">
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:if>			
			<ul class="ui-listview">
				<s:include value="../common/pagination.jsp"/>					
					<s:iterator value="lookupList">
						<li>
							<a onclick="emm.core.setOwnerValue('<s:property value='fieldName'/>','<s:property value="lookupSourceFieldValue"/>','<s:property value='currentAction'/>')">
								<s:iterator value="displayValues" status="status">
									<s:if test="#status.index == 0 ">
										<h3><s:property value="%{displayValues[#status.index]}"/></h3>
									</s:if>
									<s:else>
										<p><s:property value="%{displayValues[#status.index]}"/></p>
									</s:else>
								</s:iterator>
							</a>
						</li>
					</s:iterator>
				<s:include value="../common/pagination.jsp"/>
			</ul>		
		</div>
	</div>		
</body>
</html>
