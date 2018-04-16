<%--
* Copyright (c) 2014 InterPro Solutions, LLC.
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
	<script type="text/javascript">
		function closeWindow(){
			window.open('','_self','');
			window.close();		
		}
		$(function(){
			setTimeout(closeWindow, 1000);
		});
	</script>
</head>
<body>
	<div class="ui-page ui-inset">
		<div class="ui-header">
			<h3 class="ui-title">EZMaxMobile <s:text name="ezmaxmobile.notification"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>		
		<div class="ui-content ui-content-narrow">
			<div class="ui-btn-container">
				<input type="button" class="ui-btn-a" value="Close" onclick="closeWindow();"/>
			</div>
		</div>
		<s:include value="../common/footer.jsp"/>
	</div>	
	
</body>
</html>
