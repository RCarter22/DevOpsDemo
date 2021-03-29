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
		<div class="ui-header ui-header-b">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="receipts.selectorderedservice"/></h3>
			<a class="ui-btn-right" onclick="$('#myform').submit()"><span class="emm-check"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			
			<form id="myform" action="generatereceipts.action" method="post">
				<s:hidden name="viewType" />
				<s:if test="viewType eq 'SERVRECEIPTINPUT'">
					<s:if test="!mboList.isEmpty()">				
						<ul class="ui-listview">
							<s:include value="../common/pagination.jsp"/>
								<s:iterator value="mboList" status="status">
									<li>		
										<span>	
											<p><s:property value="getMboValueInfoStatic('POLINENUM').getTitle()"/>: <s:property value="getString('POLINENUM')"/></p>
											<h3 class="ui-wrap"><s:property value="getString('DESCRIPTION')"/></h3>
										</span>
									</li>			
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('QTYREQUESTED').getTitle()" /></label>
										<input type="text"
											name = "qtyRequested"
											id="<s:property value="#status.index"/>_QTYREQUESTED" 
											required="<s:property value="getMboValueData('QTYREQUESTED').isRequired()"/>"
											readonly="<s:property value="getMboValueData('QTYREQUESTED').isReadOnly()"/>"
											value="<s:property value="getString('QTYREQUESTED')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="<s:property value="viewType"/>"
											data-field="QTYREQUESTED"
											data-control="spinner" data-interval="1.0"
										/>
									</li>
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('ORDERQTY').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_ORDERQTY" 
											required="<s:property value="getMboValueData('ORDERQTY').isRequired()"/>"
											readonly="<s:property value="getMboValueData('ORDERQTY').isReadOnly()"/>"
											value="<s:property value="getString('ORDERQTY')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="<s:property value="viewType"/>"
											data-field="ORDERQTY"
										/>
									</li>
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('REMARK').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_REMARK" 
											required="<s:property value="getMboValueData('REMARK').isRequired()"/>"
											readonly="<s:property value="getMboValueData('REMARK').isReadOnly()"/>"
											value="<s:property value="getString('REMARK')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="<s:property value="viewType"/>"
											data-field="REMARK"
										/>
									</li>
									<li class="ui-field">
										<label><s:text name="global.select"/></label>
										<input type="checkbox" name="checkedID" value="idx_<s:property value="#status.index"/>"/>
									</li>
									<li class="ui-divider ui-divider-b"></li>
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
				<s:if test="viewType eq 'RETURNRECEIPTINPUTSRV'">
					<s:if test="!mboList.isEmpty()">		
						<ul class="ui-listview">
							<s:include value="../common/pagination.jsp"/>
								<s:iterator value="mboList" status="status">
									<li>		
										<span>	
											<p><s:property value="getMboValueInfoStatic('POLINENUM').getTitle()"/>: <s:property value="getString('POLINENUM')"/></p>
											<h3 class="ui-wrap"><s:property value="getString('DESCRIPTION')"/></h3>
										</span>
									</li>				
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('QTYREQUESTED').getTitle()" /></label>
										<input type="text"
											name="qtyRequested"
											id="<s:property value="#status.index"/>_QTYREQUESTED" 
											required="<s:property value="getMboValueData('QTYREQUESTED').isRequired()"/>"
											readonly="<s:property value="getMboValueData('QTYREQUESTED').isReadOnly()"/>"
											value="<s:property value="getString('QTYREQUESTED')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="<s:property value="viewType"/>"
											data-field="QTYREQUESTED"
										/>
									</li>
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('TRANSDATE').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_TRANSDATE"
											required="<s:property value="getMboValueData('TRANSDATE').isRequired()"/>"
											readonly="<s:property value="getMboValueData('TRANSDATE').isReadOnly()"/>"
											value="<s:property value="getDate('TRANSDATE').getTime()"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="<s:property value="viewType"/>"
											data-field="TRANSDATE"
										/>
										<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="<s:property value="#status.index"/>_TRANSDATE"></a>
									</li>	
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('ENTERBY').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_ENTERBY" 
											required="<s:property value="getMboValueData('ENTERBY').isRequired()"/>"
											readonly="<s:property value="getMboValueData('ENTERBY').isReadOnly()"/>"
											value="<s:property value="getString('ENTERBY')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="<s:property value="viewType"/>"
											data-field="ENTERBY"
										/>
									</li>
									<li class="ui-field">
										<label><s:text name="global.select"/></label>
										<input type="checkbox" name="checkedID" value="idx_<s:property value="#status.index"/>"/>
									</li>
									<li class="ui-divider ui-divider-b"></li>
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
			</form>
		</div>
	</div>
</body>
