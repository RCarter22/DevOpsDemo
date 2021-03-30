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
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.itemmaster"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<a class="ui-btn-right" data-scrollto="#ACTIONS"><span class="emm-ellipsis-v"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<div class="ui-content">
			
			<ul class="ui-listview ui-inset" data-visible="<s:property value='!mbo.isNew()'/>">
				<li class="ui-pagination">	
					<a class="ui-pagination-prev" href="#" onclick="emm.core.movePrev('previtem.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
					<div class="ui-container">
						<span><s:text name="global.prev"/></span>
						<span><s:text name="global.next"/></span>
					</div>
					<a class="ui-pagination-next" href="#" onclick="emm.core.moveNext('nextitem.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
				</li>
			</ul>			
			
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							required="<s:property value="mbo.getMboValueData('ITEMNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ITEMNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ITEMNUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('ITEMNUM').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
				<s:if test="!mbo.isNew()">
					<li class="ui-field ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
						<p><s:property value="mbo.getString('STATUS')" /></p>
						<p><s:property value="mbo.getString('STATUSDATE')" /></p>
					</li>	
				</s:if>
				<s:if test="!mbo.getMboSet('IMGLIB').isEmpty()">
					<li>				
						<a class="ui-image-detail" href="viewblob.action?imglibID=<s:property value="mbo.getInt('IMGLIB.IMGLIBID')"/>">
							<img src="viewblob.action?imglibID=<s:property value="mbo.getInt('IMGLIB.IMGLIBID')"/>" />
						</a>
					</li>
				</s:if>
			</ul>
			<ul class="ui-listview">			
				<li class="ui-divider"><s:text name="item.storerooms"/></li>				
				<s:if test="mboList.size > 0">								
						<s:include value="../common/pagination.jsp"/>
						<s:iterator value="mboList">
							<li>
								<span>
									<p class="ui-aside"><s:property value="getString('SITEID')"/></p>
									<h3><s:property value="getString('LOCATION')"/></h3>
									<div class="ui-row-4">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('CATEGORY').getTitle()"/></strong>: <s:property value="getString('CATEGORY')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('INVCOST.STDCOST').getTitle()"/></strong>: <s:property value="getString('INVCOST.STDCOST')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('INVCOST.AVGCOST').getTitle()"/></strong>: <s:property value="getString('INVCOST.AVGCOST')"/>		
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('INVCOST.LASTCOST').getTitle()"/></strong>: <s:property value="getString('INVCOST.LASTCOST')"/>
										</div>
									</div>
									<div class="ui-row-4">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('CURBALTOTAL').getTitle()"/></strong>: <s:property value="getString('CURBALTOTAL')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('BINNUM').getTitle()"/></strong>: <s:property value="getString('BINNUM')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('STATUS').getTitle()"/></strong>: <s:property value="getString('STATUS')"/>		
										</div>
										<div class="ui-column">
											
										</div>
									</div>									
								</span>			
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
			</ul>
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>	
			</s:if>
		</div>		
	</div>
	</body>
</html>
