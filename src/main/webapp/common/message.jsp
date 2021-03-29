<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<div class="ui-message ui-message-<s:property value="message.type" /> ui-inset"><s:if test="displayMessage neq null"><h3><s:property value="displayMessage" /></h3></s:if></div>
