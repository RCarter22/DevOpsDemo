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
	<script type="text/javascript">
		function approveLabor(id){
			emm.util.confirm({
				message: '<s:text name="Apply Labor"/>',
				yes: function(){
					$('input[name="id"]').val(id);
					$('input[name="currentAction"]').val(window.location);
					$('#applyLabor').submit();
				}
			});
		}
	</script>	
</head>

<body>
	<div class="ui-page">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.labrep"/></h3>			
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<s:include value="../common/quicksearch.jsp">
				<s:param name="searchFields">LABORCODE,REFWO</s:param>
			</s:include>
			<s:if test="mboList.size > 0">				
				<ul class="ui-listview">			
					<li class="ui-divider"><s:text name="global.list"/></li>				
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="view.action?id=<s:property value="getUniqueIDValue()"/>">
								<p class="ui-aside"><s:property value="getString('SITEID')"/></p>					
								<p><strong><s:property value="getString('REFWO')"/></strong></p>
								<h3><s:property value="getString('LABORCODE')"/></h3>
								<p><s:property value="getMboValueInfoStatic('TRANSTYPE').getTitle()"/>: <s:property value="getString('TRANSTYPE')"/></p>
								<p><s:property value="getMboValueInfoStatic('STARTDATE').getTitle()"/>: <s:property value="getString('STARTDATE')"/></p>
								<p><s:property value="getMboValueInfoStatic('REGULARHRS').getTitle()"/>: <s:property value="getString('REGULARHRS')"/></p>
								<p><s:property value="getMboValueInfoStatic('GENAPPRSERVRECEIPT').getTitle()"/>: <s:property value="getBoolean('GENAPPRSERVRECEIPT')"/></p>
								<span class="ui-arrow"></span>
							</a>
							<a onclick="approveLabor(<s:property value="getUniqueIDValue()"/>);" class="ui-checklistbutton" data-checked="<s:property value='getString("GENAPPRSERVRECEIPT").equalsIgnoreCase("Y")'/>"></a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
				<form id="applyLabor" action="applyLabor.action" method="post">
					<input type="hidden" name="id"/>
					<input type="hidden" name="currentAction"/>
				</form>					
			</s:if>
			<s:else>
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:else>
		</div>
	</div>
</body>
</html>
