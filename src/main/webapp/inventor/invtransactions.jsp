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
	<div class="ui-page">
		<s:include value="../common/menu.jsp"/>		
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="inventor.viewtransactions"/></h3>
		</div>
		<ul class="ui-navbar">
			<li>
				<a
					<s:if test="viewType eq 'MATRECTRANS'">
						class="ui-active"
					</s:if>
					<s:else>
						href="viewreceipts.action?id=<s:property value="id"/>"							
					</s:else>
				>
					<s:text name="inventor.receiptsandtransfers"/>
				</a>
			<li>
				<a
					<s:if test="viewType eq 'MATUSETRANS'">
						class="ui-active"
					</s:if>
					<s:else>
						href="viewissues.action?id=<s:property value="id"/>"							
					</s:else>
				>
					<s:text name="inventor.issuesandreturns"/>
				</a>
			<li>
				<a
					<s:if test="viewType eq 'INVTRANS'">
						class="ui-active"
					</s:if>
					<s:else>
						href="viewadjustments.action?id=<s:property value="id"/>"							
					</s:else>
				>
					<s:text name="inventor.adjustments"/>
				</a>
		</ul>	
				
		<div class="ui-content">				
			<s:if test="viewType eq 'MATRECTRANS'">
				<s:if test="mboList.isEmpty() eq false">
					<ul class="ui-listview">
						<s:include value="../common/pagination.jsp"/>
						<s:iterator value="mboList">					
							<li>
								<span>	
									<div class="ui-row-4">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('ISSUETYPE').getTitle()"/></strong>: <s:property value="getString('ISSUETYPE')"/>		
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('TRANSDATE').getTitle()"/></strong>: <s:property value="getString('TRANSDATE')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('QUANTITY').getTitle()"/></strong>: <s:property value="getString('QUANTITY')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('PONUM').getTitle()"/></strong>: <s:property value="getString('PONUM')"/>		
										</div>
									</div>
									<div class="ui-row-4">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('FROMSTORELOC').getTitle()"/></strong>: <s:property value="getString('FROMSTORELOC')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('TOSTORELOC').getTitle()"/></strong>: <s:property value="getString('TOSTORELOC')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('FROMLOT').getTitle()"/></strong>: <s:property value="getString('FROMLOT')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('TOLOT').getTitle()"/></strong>: <s:property value="getString('TOLOT')"/>		
										</div>
									</div>
									<div class="ui-row-4">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('FROMBIN').getTitle()"/></strong>: <s:property value="getString('FROMBIN')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('TOBIN').getTitle()"/></strong>: <s:property value="getString('TOBIN')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('ENTERBY').getTitle()"/></strong>: <s:property value="getString('ENTERBY')"/>
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
			</s:if>
			
						
			<s:if test="viewType eq 'MATUSETRANS'">
				<s:if test="mboList.isEmpty() eq false">
					<ul class="ui-listview">
						<s:include value="../common/pagination.jsp"/>
						<s:iterator value="mboList">					
							<li>
								<span>
									<div class="ui-row-4">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('ISSUETYPE').getTitle()"/></strong>: <s:property value="getString('ISSUETYPE')"/>		
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('TRANSDATE').getTitle()"/></strong>: <s:property value="getString('TRANSDATE')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('QUANTITY').getTitle()"/></strong>: <s:property value="getString('QUANTITY')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('PONUM').getTitle()"/></strong>: <s:property value="getString('PONUM')"/>		
										</div>
									</div>
									<div class="ui-row-4">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('LOTNUM').getTitle()"/></strong>: <s:property value="getString('LOTNUM')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('ROTASSETNUM').getTitle()"/></strong>: <s:property value="getString('ROTASSETNUM')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('BINNUM').getTitle()"/></strong>: <s:property value="getString('BINNUM')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('CURBAL').getTitle()"/></strong>: <s:property value="getString('CURBAL')"/>		
										</div>
									</div>
									<div class="ui-row-4">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('REFWO').getTitle()"/></strong>: <s:property value="getString('REFWO')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('ENTERBY').getTitle()"/></strong>: <s:property value="getString('ENTERBY')"/>
										</div>
										<div class="ui-column">
										
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
			</s:if>
			
			<s:if test="viewType eq 'INVTRANS'">
				<s:if test="mboList.isEmpty() eq false">
					<ul class="ui-listview">
						<s:include value="../common/pagination.jsp"/>
						<s:iterator value="mboList">		
							<li>
								<span>
									<div class="ui-row-4">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('ISSUETYPE').getTitle()"/></strong>: <s:property value="getString('ISSUETYPE')"/>		
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('TRANSDATE').getTitle()"/></strong>: <s:property value="getString('TRANSDATE')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('BINNUM').getTitle()"/></strong>: <s:property value="getString('BINNUM')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('LOTNUM').getTitle()"/></strong>: <s:property value="getString('LOTNUM')"/>		
										</div>
									</div>
									<div class="ui-row-4">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('QUANTITY').getTitle()"/></strong>: <s:property value="getString('QUANTITY')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('CURBAL').getTitle()"/></strong>: <s:property value="getString('CURBAL')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('PHYSCNT').getTitle()"/></strong>: <s:property value="getString('PHYSCNT')"/>
										</div>
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('ENTERBY').getTitle()"/></strong>: <s:property value="getString('ENTERBY')"/>		
										</div>
									</div>
									<div class="ui-row-2">
										<div class="ui-column">
											<strong><s:property value="getMboValueInfoStatic('MEMO').getTitle()"/></strong>: <s:property value="getString('MEMO')"/>
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
			</s:if>							
		</div>		
	</div>	
</body>
</html>
