<%--
* Copyright (c) 2017 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html ng-app="ezmaxmobile" ng-cloak>
	<head>
		<title page-title>EZMaxMobile | Admin Center</title>	
		<s:include value="includes.jsp"/>
	</head>
	
	<body class="skin-1" body-small fix-height>
	
		<!-- Main view  -->
		<div>
				
			<!-- ControllerAs syntax -->
			<!-- Wrapper-->
			<div ng-controller="MainCtrl as main" id="wrapper">
			
			    <!-- Navigation -->
				<s:include value="navigation.jsp"/>
			
			    <!-- Page wraper -->
			    <div id="page-wrapper" class="gray-bg">
			
			        <!-- Page wrapper -->
					<s:include value="topnavbar.jsp"/>
			
			        <!-- Main view -->
					<s:include value="%{view}"/>
			        
			        <!-- Footer -->
			        <s:include value="footer.jsp"/>
			
			    </div>
			    <!-- End page wrapper-->
			
			</div>
			<!-- End wrapper-->		
		
		</div>
	
	</body>
</html>