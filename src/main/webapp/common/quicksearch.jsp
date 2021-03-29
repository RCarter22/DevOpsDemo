<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="e" uri="https://www.owasp.org/index.php/OWASP_Java_Encoder_Project" %>

<div class="ui-searchbar">
	<s:form id="quicksearch" action="doquicksearch" method="post">
	    <input type="hidden" name="searchFlds" value="<%= request.getParameter("searchFields") %>"/>	
		<input type="search" placeholder="<s:text name="global.quicksearch"/>" name="search" maxlength="100" value="<e:forHtml value="${search}" />" />
		<s:if test="mbo.sigopGranted('SEARCHMORE') eq true"><a class="ui-btn-side" href="advancedsearch.action"><s:text name="global.advanced"/></a></s:if>		
	</s:form>	
</div>