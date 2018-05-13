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
		function submitForm(id,type){
			$('#id').val(id);
			$('#drilldownType').val(type);
			$('form').submit();
		}
	</script>
</head>
<body>
	<div class="ui-page">	
		<div class="ui-header ui-header-b">
			<a class="ui-btn-left" onclick="emm.core.back();"><s:text name="global.cancel"/></a>
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
								onclick="submitForm('<s:property value="parentMboId"/>','LOCATION')"
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
									onclick="submitForm('<s:property value="parentMboId"/>','ASSET')"
								</s:if>
								<s:else>
									onclick="submitForm('<s:property value="mbo.getMboSet('PARENT').getMbo(0).getUniqueIDValue()"/>','ASSETDRILLDOWN')"
								</s:else>
							>
								<img src="../images/returnarrow.png"/>
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
								<a onclick="emm.core.setLookupValue('<s:property value='fieldName'/>','<s:property value="top[2].getData()"/>','<s:property value='currentAction'/>','<s:property value='lookupMbo'/>','<s:property value='lookupMboId'/>',null,'<s:property value='lookupSourceField'/>')">
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
								<s:if test='top[1].getData().equals("Y")'>
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
							<a onclick="submitForm('<s:property value="parentMboId"/>','LOCATION')">
								<img src="../images/returnarrow.png"/>
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
								<s:if test='top[1].getData().equals("Y")'>
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
			</form>
		</div>
	</div>	
</body>
</html>
