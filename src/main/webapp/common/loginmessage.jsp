<%--
* Copyright (c) 2014 InterPro Solutions, LLC
* All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<div class="ui-message ui-message-<s:property value="message.type" /> ui-inset"><s:if test="displayMessage eq 'INVALIDLICENSE'"><h3><s:text name="global.notavalidlicense"/></h3></s:if><s:elseif test="displayMessage eq 'INVALIDUSER'"><h3><s:text name="global.invalidlogin"/></h3></s:elseif><s:elseif test="displayMessage eq 'BLOCKEDUSER'"><h3><s:text name="global.blockeduser"/></h3></s:elseif><s:elseif test="displayMessage eq 'EXPIREDLICENSE'"><h3><s:text name="global.expiredlicense"/></h3></s:elseif><s:elseif test="displayMessage eq 'NOTINEMMGROUP'"><h3><s:text name="global.notinemmgroup"/></h3></s:elseif><s:elseif test="displayMessage eq 'EXCEEDVALIDLICENSELIMIT'"><h3><s:text name="global.exceedvalidlicenselimit"/></h3></s:elseif><s:elseif test="displayMessage neq null"><h3><s:property value="displayMessage" /></h3></s:elseif></div>
