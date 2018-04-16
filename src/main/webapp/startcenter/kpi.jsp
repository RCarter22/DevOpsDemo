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
	
	<script type="text/javascript" src="../javascript/jquery.jqplot.min.js"></script>
	<script type="text/javascript" src="../javascript/plugins/jqplot.meterGaugeRenderer.min.js"></script>
	<script type="text/javascript" src="../javascript/plugins/jqplot.barRenderer.min.js"></script>
	<script type="text/javascript" src="../javascript/plugins/jqplot.categoryAxisRenderer.min.js"></script>
	<link rel="stylesheet" type="text/css" href="../css/jquery.jqplot.min.css" />
	
	<script type="text/javascript">
		$(document).ready(function(){
			var list = [];			
			<s:iterator value="data">
			list.push({
				description : '<s:property value="getString('DESCRIPTION')"/>',
				kpiDate : '<s:property value="getString('KPIDATE')"/>',
				kpiValue : <s:property value="getDouble('KPIVALUE')"/>,
				cautionMin : <s:property value="getDouble('CAUTIONMIN')"/>,
				cautionMax : <s:property value="getDouble('CAUTIONMAX')"/>,				
				target : <s:property value="getDouble('TARGET')"/>,
				format : '<s:property value="getString('FORMAT')"/>'
			});
			</s:iterator>
			if (list.length>0)
				emm.core.showKpi(list,'chart');
		});
	</script>
</head>

<body>
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.startcenter"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>

		<div class="ui-content ui-content-narrow">
			<div id="chart"></div>
			<ul class="ui-listview">
				<s:iterator value="data">
					<li>
						<a>
							<span class="ui-accessory-left">
								<s:if test="getDouble('CAUTIONMAX') lt getDouble('CAUTIONMIN')">
									<s:if test="getDouble('KPIVALUE') lt getDouble('CAUTIONMAX')">
										<span class="ui-circle ui-circle-c"></span>
									</s:if>
									<s:elseif test="getDouble('KPIVALUE') gt getDouble('CAUTIONMAX') and kpiValue lt getDouble('CAUTIONMIN')">
										<span class="ui-circle ui-circle-f"></span>
									</s:elseif>
									<s:elseif test="getDouble('KPIVALUE') gt getDouble('CAUTIONMIN')">
										<span class="ui-circle ui-circle-e"></span>
									</s:elseif>
								</s:if>
								<s:else>
									<s:if test="getDouble('KPIVALUE') lt getDouble('CAUTIONMIN')">
										<span class="ui-circle ui-circle-e"></span>
									</s:if>
									<s:elseif test="getDouble('KPIVALUE') gt getDouble('CAUTIONMIN') and getDouble('KPIVALUE') lt getDouble('CAUTIONMAX')">
										<span class="ui-circle ui-circle-f"></span>
									</s:elseif>
									<s:elseif test="getDouble('KPIVALUE') gt getDouble('CAUTIONMAX')">
										<span class="ui-circle ui-circle-c"></span>
									</s:elseif>
								</s:else>
							</span>
							<p><strong><s:property value="getMboValueInfoStatic('KPIDATE').getTitle()"/>: <s:property value="getString('KPIDATE')"/></strong></p>
							<h3><s:property value="getString('DESCRIPTION')"/><s:if test="getDouble('FORMAT') eq 'PERCENT'"> (%)</s:if></h3>						
							<table>
								<tbody>
									<tr><td width="75px"><s:property value="getMboValueInfoStatic('KPIVALUE').getTitle()"/></td><td width="75px"><s:property value="getMboValueInfoStatic('TARGET').getTitle()"/></td><td width="75px"><s:text name="global.variance"/></td></tr>
									<tr><td><s:property value="getDouble('KPIVALUE')"/></td><td><s:property value="getDouble('TARGET')"/></td><td><s:property value="getDouble('KPIVALUE')-getDouble('TARGET')"/></td></tr>									
								</tbody>
							</table>
						</a>												
					</li>
				</s:iterator>
			</ul>
		</div>
	</div>
</body>
</html>
