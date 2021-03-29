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
			<h3 class="ui-title"><s:text name="receipts.changeinspectionstatus"/></h3>
			<a class="ui-btn-right" onclick="$('#myform').submit()"><span class="emm-check"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			
			<form id="myform" action="changeinspstatus.action" method="post">
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
										<label><s:property value="getMboValueInfoStatic('INSPECTEDQTYDSPLY').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_INSPECTEDQTYDSPLY" 
											required="<s:property value="getMboValueData('INSPECTEDQTYDSPLY').isRequired()"/>"
											readonly="<s:property value="getMboValueData('INSPECTEDQTYDSPLY').isReadOnly()"/>"
											value="<s:property value="getString('INSPECTEDQTYDSPLY')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="<s:property value="viewType"/>"
											data-field="INSPECTEDQTYDSPLY"
										/>
									</li>
	 								<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('ACCEPTEDQTY').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_ACCEPTEDQTY"
											required="<s:property value="getMboValueData('ACCEPTEDQTY').isRequired()"/>"
											readonly="<s:property value="getMboValueData('ACCEPTEDQTY').isReadOnly()"/>"
											value="<s:property value="getString('ACCEPTEDQTY')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="<s:property value="viewType"/>"
											data-field="ACCEPTEDQTY"
										/>
									</li> 
									<li class="ui-field">
										<label><s:property value="getMboValueInfoStatic('REJECTQTYDISPLAY').getTitle()" /></label>
										<input type="text"
											id="<s:property value="#status.index"/>_REJECTQTYDISPLAY" 
											name="qtyRejected"
											required="<s:property value="getMboValueData('REJECTQTYDISPLAY').isRequired()"/>"
											readonly="<s:property value="getMboValueData('REJECTQTYDISPLAY').isReadOnly()"/>"
											value="<s:property value="getString('REJECTQTYDISPLAY')"/>"
											onchange="emm.core.setListValue(this)"
											data-mbo="<s:property value="viewType"/>"
											data-field="REJECTQTYDISPLAY"
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
