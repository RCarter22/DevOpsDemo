<%--
* Copyright © 2012 InterPro Solutions, LLC
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
	<div class="ui-page" data-rememberscroll="true">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="location.children"/></h3>
			<a class="ui-btn-right" onclick=""  data-control="dialog" href="#locationadddialog"><img src="../images/plus.png"/></a>
		</div>
		
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<s:if test="mboList.size > 0">	
			    <ul class="ui-listview">
				    <li class="ui-divider ui-divider-d">
				    	<s:text name="location.childrenof"><s:param><s:property value="mbo.getString('LOCATION')"/></s:param><s:param><s:property value="mbo.getString('SYSTEMID')"/></s:param></s:text>
					</li>
			    	<s:include value="../common/pagination.jsp"/>
						<s:iterator value="mboList">
							<li>
								<a href="view.action?id=<s:property value='getMboSet("$LOCATION", "LOCATIONS", "LOCATION = :LOCATION").getMbo(0).getUniqueIDValue()'/>">												
									<p class="ui-aside"><s:property value="getString('SITEID')"/></p>
									<p><strong><s:property value="getString('LOCATION')"/></strong></p>
									<h3><s:property value='getMboSet("$LOCATION", "LOCATIONS", "LOCATION = :LOCATION").getMbo(0).getString("DESCRIPTION")'/></h3>	
									<span class="ui-arrow"></span>
								</a>
							</li>
						</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>			
			</s:if>
			<s:else>
				<ul class="ui-listview">
					<li class="ui-divider ui-divider-d">
				    	<s:text name="location.childrenof"><s:param><s:property value="mbo.getString('LOCATION')"/></s:param><s:param><s:property value="mbo.getString('SYSTEMID')"/></s:param></s:text>
					</li>
				</ul>
				<div class="ui-statusbar ui-statusbar-c">
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:else>
		</div>
	</div>
	<div id="locationadddialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="location.addchild"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="" href="addchild.action?id=<s:property value='mbo.getUniqueIDValue()'/>"><s:text name="location.existinglocation"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="" href="newcreatechild.action?id=<s:property value='mbo.getUniqueIDValue()'/>"><s:text name="location.newlocation"/></a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>