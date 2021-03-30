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
</head>
<body>
	<div class="ui-page" data-rememberscroll="true">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.doclinks"/></h3>
			<!-- This displays when the client is not from a Native EZMaxMobile App -->
			<a class="ui-btn-right" href="browser.action"><span class="emm-plus"></span></a>
<%-- 				<a class="ui-btn-right" onclick="emm.core.ezphoto('<s:property value="ezPhotoURL"/>')"><span class="emm-camera"></span></a> --%>
			<a class="ui-btn-right" data-native="true" data-control="dialog" href="#doctypedialog"><span class="emm-camera"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			<s:if test="convertedMboList.size > 0">		
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="convertedMboList">
						<li>
							<a href="<s:property value="getWeburl()"/>">
								<h3><s:property value="getDocinfoMbo().getString('DOCINFO.DESCRIPTION')"/></h3>
								<p><s:property value="getDocinfoMbo().getString('DOCINFO.DOCUMENT')"/></p>								
								<span class="ui-arrow"></span>
							</a>
							<a data-visible="<s:property value="mbo.sigopGranted('ATTACHDEL')"/>" class="ui-trash-large" onclick="emm.core.deleteAttachment(<s:property value='mbo.getUniqueIDValue()'/>,<s:property value='getDocinfoMbo().getUniqueIDValue()'/>)"></a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
			<s:else>
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:else>	
		</div>
	</div>
	<div id="doctypedialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="global.selectfolder"/></h1>
			</div>
			<div class="ui-content">			
				<ul class="ui-listview ui-radiobutton">	
					<s:iterator value="list" status="status">
						<li>
						    <label for="check<s:property value="#status.index"/>"><s:property /></label>
						    <input type="radio" id="check<s:property value="#status.index"/>" name="doctype" value="<s:property />" <s:if test="#status.index eq 0">checked="true"</s:if>>
						</li>
					</s:iterator>
				</ul>	
				<div class="ui-btn-container">
					<a class="ui-btn-b" href="#" data-dismiss="modal"><s:text name="global.cancel"/></a>
					<a class="ui-btn-a" href="#" onclick="emm.core.ezphoto('<s:property value="ezPhotoURL"/>')" data-dismiss="modal"><s:text name="global.ok"/></a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>