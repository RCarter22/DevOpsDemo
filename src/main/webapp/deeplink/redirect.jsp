<%--
* Copyright (c) 2019 InterPro Solutions, LLC.
* All rights reserved.
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
		<div class="ui-header">
			<h3 class="ui-title"><s:text name="deeplink.redirecting"/> <s:text name="deeplink.clickhere"/></h3>
		</div>
		
		<div class="ui-content ui-content-narrow">

			<div class="ui-btn-container">
				<a href="<s:property value='url'/>" class="ui-btn-a"><s:text name="deeplink.viewbrowser"/></a>	
				<a href="<s:property value='deeplink'/>" class="ui-btn-a"><s:text name="deeplink.viewezmaxmobile"/></a>					
			</div>

		</div>	
		
		<s:include value="../common/footer.jsp"/>
	</div>
	<script type="text/javascript">
		$(function() {
			window.location.href="<s:property value='deeplink'/>";
		});
	</script>	
</body>
</html>
