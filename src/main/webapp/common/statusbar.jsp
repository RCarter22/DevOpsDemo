<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<div class="ui-statusbar ui-statusbar-<s:property value="message.type" />"><s:if test="displayMessage neq null"><h3 class="ui-title"><s:property value="displayMessage" /></h3></s:if></div>
<div id="OFFLN_DIRTY_MSG" class="ui-statusbar ui-statusbar-b" style="display:none;"><h5 class="ui-title"><s:text name="global.offlinedirty"/></h5></div>