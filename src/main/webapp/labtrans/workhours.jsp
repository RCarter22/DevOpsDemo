<%--
*Copyright (c) 2014 InterPro Solutions, LLC.
*All rights reserved.
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
		$(function(){
			$('#selectdate').mobiscroll({
				preset:'date',
				setText: '<s:text name="global.ok"/>',
				onSelect: function(text, inst){
					$('#selectedDate').val(inst.getDate().toJSON());
					emm.core.removeThisUrlFromHistory();
					$('#form').attr('action',"workhours.action?selectedDate=" + $('#selectedDate').val() );
					$('#form').submit();
				}
			});
		});
		function showDatePicker(){
			var date = '<s:date name="selectedDate" format="yyyy-MM-dd 00:00:00"/>';
			if (date!=''){
				date = Date.parseExact(date, 'yyyy-MM-dd 00:00:00');
				$('#selectdate').mobiscroll('setDate',date);
			}
			$('#selectdate').mobiscroll('show');
		}
		function approveLaborCheck(id){
			emm.util.confirm({
				message: 'Is there a task #?',
				yes: function(){
					$('input[name="id"]').val(id);
					$('input[name="currentAction"]').val(window.location);
					approveLabor(id)
				}
			});
		}

		function approveLabor(id){
			emm.util.confirm({
				message: '<s:text name="global.approvelabor"/>',
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
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="global.timeentry"/></h3>
			<a class="ui-btn-right" id="selectdate" onclick="showDatePicker()"><img src="../images/date.png"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			<form id="form" method="post">
				<s:hidden name="selectedDate"/>
			</form>
			<p class="ui-section"><s:text name="global.dailyhours" /> (<s:property value="currentDay"/>)</p>
			<s:if test="dailyMboList.size > 0">
				<ul class="ui-listview">
					<li class="ui-divider"><s:text name="global.dailyhours" /></li>
					<li class="ui-field">
						<label><s:text name="global.dates"/></label>
						<input readonly="true" value="<s:property value="currentDay"/>"/>
					</li>
				    <li class="ui-field">
						<label><s:text name="global.regularhours"/></label>
						<input readonly="true" value="<s:property value="dailyMboSet.sum('REGULARHRS')"/>" data-time/>
					</li>
					<li class="ui-field">
						<label><s:text name="global.overtimehours"/></label>
						<input readonly="true" value="<s:property value="dailyMboSet.sum('PREMIUMPAYHOURS')"/>" data-time/>
					</li>				
					<li class="ui-field">
						<label><s:text name="global.totalhours"/></label>
						<input readonly="true" value="<s:property value="dailyMboSet.sum('REGULARHRS')+dailyMboSet.sum('PREMIUMPAYHOURS')"/>" data-time/>
					</li>
					<li class="ui-divider"><s:text name="global.daily" /> <s:text name="ezmaxmobile.labtrans"/></li>
					<s:iterator value="dailyMboList">
						<li>
							<s:if test="getString('REFWO').equals('')">							
								<span>
							</s:if>
							<s:else>
								<a href="main.action?id=<s:property value="getLong('WORKORDER.WORKORDERID')"/>">
									<p><strong>Alias: <s:property value="getString('PLUSTDEFASSETALIAS.ALIAS')"/></strong></p>						
									<p><strong>Work Order: <s:property value="getString('WORKORDER.PARENT')"/></strong></p>
									<%-- <p><strong>Referenced Work Order: <s:property value="getString('REFWO')"/></strong></p> --%>
									<p><strong><s:property value="getMboValueInfoStatic('WORKORDER.TASKID').getTitle()" />: <s:property value="getString('WORKORDER.TASKID')"/></strong></p>																	
														
									<h3><s:property value="getString('WORKORDER.DESCRIPTION')"/></h3>								
							</s:else>									
									<p><s:property value="getMboValueInfoStatic('STARTDATE').getTitle()" />: <s:property value="getString('STARTDATE')"/> <s:property value="getString('STARTTIME')"/></p>
									<p><s:property value="getMboValueInfoStatic('FINISHDATE').getTitle()" />: <s:property value="getString('FINISHDATE')"/> <s:property value="getString('FINISHTIME')"/></p>
									<p><s:property value="getMboValueInfoStatic('REGULARHRS').getTitle()" />: <s:property value="getString('REGULARHRS')"/></p>
									<%-- <p><s:property value="getMboValueInfoStatic('PREMIUMPAYHOURS').getTitle()" />: <s:property value="getString('PREMIUMPAYHOURS')"/></p> --%>
									<p><s:property value="getMboValueInfoStatic('GENAPPRSERVRECEIPT').getTitle()" />: <s:property value="getString('GENAPPRSERVRECEIPT')"/></p>
									<p><s:property value="getMboValueInfoStatic('TRANSTYPE').getTitle()" />: <s:property value="getString('TRANSTYPE')"/></p>
									<p><s:property value="getMboValueInfoStatic('TIMERSTATUS').getTitle()" />: <s:property value="getString('TIMERSTATUS')"/></p>																
									<a onclick="approveLabor(<s:property value="getUniqueIDValue()"/>);" class="ui-checklistbutton" data-checked="<s:property value='getString("GENAPPRSERVRECEIPT").equalsIgnoreCase("Y")'/>"></a>					
									<span class="ui-arrow"></span>
							<s:if test="getString('REFWO').equals('')">							
								</span>
							</s:if>
							<s:else>
								</a>
							</s:else>
						</li>
					</s:iterator>
				</ul>
			</s:if>
			<s:else>
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:else>
			<p class="ui-section"><s:text name="global.weeklyhours" /> (<s:property value="currentWeekRange"/>)</p>
			<s:if test="mboList.size > 0">
				<ul class="ui-listview">
					<li class="ui-divider"><s:text name="global.weeklyhours" /></li>
					<li class="ui-field">
						<label><s:text name="global.dates"/></label>
						<input readonly="true" value="<s:property value="currentWeekRange"/>"/>
					</li>
				    <li class="ui-field">
						<label><s:text name="global.regularhours"/></label>
						<input readonly="true" value="<s:property value="mboSet.sum('REGULARHRS')"/>" data-time/>
					</li>
					<li class="ui-field">
						<label><s:text name="global.overtimehours"/></label>
						<input readonly="true" value="<s:property value="mboSet.sum('PREMIUMPAYHOURS')"/>" data-time/>
					</li>				
					<li class="ui-field">
						<label><s:text name="global.totalhours"/></label>
						<input readonly="true" value="<s:property value="mboSet.sum('REGULARHRS')+mboSet.sum('PREMIUMPAYHOURS')"/>" data-time/>
					</li>
					<li class="ui-divider"><s:text name="global.weekly" /> <s:text name="ezmaxmobile.labtrans"/></li>
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<s:if test="getString('REFWO').equals('')">							
								<span>
							</s:if>
							<s:else>
								<a href="main.action?id=<s:property value="getLong('WORKORDER.WORKORDERID')"/>">
									<p><strong>Alias: <s:property value="getString('PLUSTDEFASSETALIAS.ALIAS')"/></strong></p>					
									<p><strong>Work Order: <s:property value="getString('WORKORDER.PARENT')"/></strong></p>
									<p><strong><s:property value="getMboValueInfoStatic('WORKORDER.TASKID').getTitle()" />: <s:property value="getString('WORKORDER.TASKID')"/></strong></p>							
									
									<%-- <p><strong>Referenced Work Order: <s:property value="getString('REFWO')"/></strong></p> --%>
									<h3><s:property value="getString('WORKORDER.DESCRIPTION')"/></h3>								
							</s:else>									
									<p><s:property value="getMboValueInfoStatic('STARTDATE').getTitle()" />: <s:property value="getString('STARTDATE')"/> <s:property value="getString('STARTTIME')"/></p>
									<p><s:property value="getMboValueInfoStatic('FINISHDATE').getTitle()" />: <s:property value="getString('FINISHDATE')"/> <s:property value="getString('FINISHTIME')"/></p>
									<p><s:property value="getMboValueInfoStatic('REGULARHRS').getTitle()" />: <s:property value="getString('REGULARHRS')"/></p>
<%-- 									<p><s:property value="getMboValueInfoStatic('PREMIUMPAYHOURS').getTitle()" />: <s:property value="getString('PREMIUMPAYHOURS')"/></p>
 --%>								<p><s:property value="getMboValueInfoStatic('GENAPPRSERVRECEIPT').getTitle()" />: <s:property value="getString('GENAPPRSERVRECEIPT')"/></p>
									<p><s:property value="getMboValueInfoStatic('TRANSTYPE').getTitle()" />: <s:property value="getString('TRANSTYPE')"/></p>
									<p><s:property value="getMboValueInfoStatic('TIMERSTATUS').getTitle()" />: <s:property value="getString('TIMERSTATUS')"/></p>				
									<a onclick="approveLabor(<s:property value="getUniqueIDValue()"/>);" class="ui-checklistbutton" data-checked="<s:property value='getString("GENAPPRSERVRECEIPT").equalsIgnoreCase("Y")'/>"></a>
									
									<span class="ui-arrow"></span>
							<s:if test="getString('REFWO').equals('')">							
								</span>
							</s:if>
							<s:else>
								</a>
							</s:else>
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
