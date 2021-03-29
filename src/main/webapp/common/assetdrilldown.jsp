<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="e" uri="https://www.owasp.org/index.php/OWASP_Java_Encoder_Project" %>

<!DOCTYPE html>
<html>
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
	<script type="text/javascript">
		function submitForm(id,type){
			$('#id').val(id);
			$('#drilldownType').val(type);
			$('form').submit();
		}
		function goToParent(id, type){
			$('#parentMboId').val(id);
			$('#id').val(0);
			$('#drilldownType').val(type);
			$('form').submit();
		}
	</script>
</head>
<body>
	<div class="ui-page">	
		<div class="ui-header ui-header-b">
			<a class="ui-btn-left" onclick="emm.core.back();"><span class="emm-times-circle"></span></a>
			<h3 class="ui-title"><s:text name="asset.drilldown"/></h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<ul class="ui-navbar">
				<li>
					<a href="#"
						<s:if test='drilldownType.equals("LOCATION")'>
							class="ui-active"
						</s:if>
						<s:else>							
							<s:if test='parentMboId > 0'>
								onclick="submitForm('<e:forJavaScript value="${parentMboId}" />','LOCATION')"
							</s:if>
							<s:else>
								onclick="submitForm('<s:property value="mbo.getMboSet('LOCATION').getMbo(0).getUniqueIDValue()"/>','LOCATION')"
							</s:else>
						</s:else>
					>
						<s:text name="ezmaxmobile.location"/>
					</a>
				<li>
					<a
						<s:if test='drilldownType.equals("ASSET") || drilldownType.equals("ASSETDRILLDOWN")'>
							class="ui-active"
						</s:if>
						<s:else>
							href="#"
						</s:else>
					>
						<s:text name="ezmaxmobile.asset"/>
					</a>
		</ul>
		<div class="ui-content">		
			<s:if test="mboList.size == 0">
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:if>
			
			<s:if test='drilldownType.equals("ASSET") || drilldownType.equals("ASSETDRILLDOWN")'>
				<ul class="ui-listview">
					<s:if test="mbo neq null">
						<li>
							<a
								<s:if test='parentMboId > 0'>
									onclick="submitForm('<e:forJavaScript value="${parentMboId}" />','ASSET')"
								</s:if>
								<s:else>
									onclick="submitForm('<s:property value="mbo.getMboSet('PARENT').getMbo(0).getUniqueIDValue()"/>','ASSETDRILLDOWN')"
								</s:else>
							>
								<span class="emm-return"></span>
								<p class="ui-aside"><s:property value='mbo.getString("ORGID")'/></p>
								<h3><s:property value='mbo.getString("ASSETNUM")'/></h3>
								<p><s:property value='mbo.getString("DESCRIPTION")'/></p>							
							</a>
						</li>
						<li class="ui-divider ui-divider-c"><s:text name="asset.subassemblies"/></li>
					</s:if>					
					<s:iterator value="mboData">
						<li>
							<s:if test='top[0].getData().equals("")'>
								<span>
									<h3><s:property value='top[2].getDataAsLong()'/></h3>
								</span>
							</s:if>
							<s:else>	
								<a onclick="emm.core.setLookupValue('<e:forJavaScript value="${fieldName}" />','<s:property value="top[2].getData()" />','<e:forJavaScript value="${currentAction}" />','<e:forJavaScript value="${lookupMbo}" />','<e:forJavaScript value="${lookupMboId}" />',null,'<e:forJavaScript value="${lookupSourceField}" />',null,'<e:forJavaScript value="${postLookupValueActionUrl}" />')">
									<s:iterator status="status">
											<s:if test="#status.index == 2">
												<h3><s:property value='getData()'/></h3>
											</s:if>
											<s:else>
												<s:if test="#status.index > 2">
													<p><s:property value='getData()'/></p>
												</s:if>										
											</s:else>
									</s:iterator>
								</a>							
								<s:if test='top[1].getDataAsBoolean()'>
									<a class="ui-arrow" onclick="submitForm('<s:property value="top[0].getDataAsLong()"/>','ASSETDRILLDOWN')"></a>
								</s:if>
							</s:else>
						</li>
					</s:iterator>
				</ul>
			</s:if>
			<s:if test='drilldownType.equals("LOCATION")'>
				<ul class="ui-listview">
					<s:if test="mbo neq null">
						<li>
							<a onclick="goToParent('<s:if test="parentMboId == 0"><s:property value="-1"/></s:if><s:else><e:forJavaScript value="${parentMboId}" /></s:else>', 'LOCATION')">
								<span class="emm-return"></span>
								<p class="ui-aside"><s:property value='mbo.getString("ORGID")'/></p>
								<h3><s:property value='mbo.getString("LOCATION")'/></h3>
								<p><s:property value='mbo.getString("DESCRIPTION")'/></p>							
							</a>
						</li>
						<li class="ui-divider ui-divider-c">
							<s:text name="location.childrenof">
								<s:param><s:property value='mbo.getString("LOCATION")'/></s:param>
								<s:param><s:property value='mbo.getString("SYSTEMID")'/></s:param>
							</s:text>
						</li>
					</s:if>					
					<s:iterator value="mboData">
						<li>
							<s:if test='top[0].getData().equals("")'>
								<span>
									<h3><s:property value='top[2].getData()'/></h3>
								</span>
							</s:if>
							<s:else>	
								<a onclick="submitForm('<s:property value="top[0].getDataAsLong()"/>','ASSET')">						
									<s:iterator status="status">
											<s:if test="#status.index == 2">
												<h3><s:property value='getData()'/></h3>
											</s:if>
											<s:else>
												<s:if test="#status.index > 2">
													<p><s:property value='getData()'/></p>
												</s:if>										
											</s:else>
									</s:iterator>
								</a>							
								<s:if test='top[1].getDataAsBoolean()'>
									<a class="ui-arrow" onclick="submitForm('<s:property value="top[0].getDataAsLong()"/>','LOCATION')"></a>
								</s:if>
							</s:else>
						</li>
					</s:iterator>
				</ul>
			</s:if>
			
			<form method="post">				
				<s:hidden name="fieldName"/>
				<s:hidden name="dispFlds"/>
				<s:hidden name="lookupSourceField"/>
				<s:hidden name="currentAction"/>
				<s:hidden name="drilldownType"/>
				<s:hidden name="id"/>
				<s:hidden name="parentMboId"/>		
			</form>
		</div>
	</div>	
</body>
</html>
