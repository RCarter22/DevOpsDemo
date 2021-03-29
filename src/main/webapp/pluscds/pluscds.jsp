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
			<h3 class="ui-title"><s:text name="wotrack.datasheet"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">	
			<ul class="ui-listview">	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('DSPLANNUM').getTitle()" /></label>
					<input type="text"
						readonly="true"
						value="<s:property value="mbo.getString('DSPLANNUM')" />"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<input type="text"
						readonly="true"
						value="<s:property value="mbo.getString('DESCRIPTION')" />"
					/>
				</li>				
			</ul>
			<s:if test="assetFunctionsList.size > 0">				
				<ul class="ui-listview">			
					<li class="ui-divider"><s:text name="pluscds.assetfunctions"/></li>		
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="assetFunctionsList">
						<li <s:if test="isSelected()"> style="background-color:#BFEFFF;"</s:if>>
							<a href="selectassetfunction.action?id=<s:property value='getUniqueIDValue()'/>">				
								<h3><s:property value="getMboValueInfoStatic('DESCRIPTION').getTitle()" />: <s:property value="getString('DESCRIPTION')"/></h3>
								<p><s:property value="getMboValueInfoStatic('INSTRCALRANGEEU').getTitle()" />: <s:property value="getString('INSTRCALRANGEEU')"/></p>
								<p><s:property value="getMboValueInfoStatic('INSTROUTRANGEEU').getTitle()" />: <s:property value="getString('INSTROUTRANGEEU')"/></p>																
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>	
			
			<s:if test="calibrationPointsList.size > 0">
				<ul class="ui-listview">			
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="calibrationPointsList">
						<li class="ui-divider"><s:property value="getMboValueInfoStatic('POINT').getTitle()" /> <s:property value="getString('POINT')" /> </li>
						<s:if test="assetFunction.getString('PLANTYPE').equals('ANALOG')">
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('INPUTVALUE_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_INPUTVALUE_NP" 
									required="<s:property value="getMboValueData('INPUTVALUE_NP').isRequired()"/>"
									readonly="<s:property value="getMboValueData('INPUTVALUE_NP').isReadOnly()"/>"
									value="<s:property value="getString('INPUTVALUE_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="INPUTVALUE_NP"
								/>
							</li>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('OUTPUTVALUE_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_OUTPUTVALUE_NP" 
									required="<s:property value="getMboValueData('OUTPUTVALUE_NP').isRequired()"/>"
									readonly="<s:property value="getMboValueData('OUTPUTVALUE_NP').isReadOnly()"/>"
									value="<s:property value="getString('OUTPUTVALUE_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="OUTPUTVALUE_NP"
								/>
							</li>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('ASFOUNDINPUT_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_ASFOUNDINPUT_NP" 
									required="<s:property value="getMboValueData('ASFOUNDINPUT_NP').isRequired()"/>"
									readonly="<s:property value="getMboValueData('ASFOUNDINPUT_NP').isReadOnly()"/>"
									value="<s:property value="getString('ASFOUNDINPUT_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="ASFOUNDINPUT_NP"
								/>
							</li>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('ASFOUNDOUTPUT_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_ASFOUNDOUTPUT_NP" 
									required="<s:property value="getMboValueData('ASFOUNDOUTPUT_NP').isRequired()"/>"
									readonly="<s:property value="getMboValueData('ASFOUNDOUTPUT_NP').isReadOnly()"/>"
									value="<s:property value="getString('ASFOUNDOUTPUT_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="ASFOUNDOUTPUT_NP"
								/>
							</li>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('ASLEFTINPUT_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_ASLEFTINPUT_NP" 
									required="<s:property value="getMboValueData('ASLEFTINPUT_NP').isRequired()"/>"
									readonly="<s:property value="getMboValueData('ASLEFTINPUT_NP').isReadOnly()"/>"
									value="<s:property value="getString('ASLEFTINPUT_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="ASLEFTINPUT_NP"
								/>
							</li>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('ASLEFTOUTPUT_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_ASLEFTOUTPUT_NP" 
									required="<s:property value="getMboValueData('ASLEFTOUTPUT_NP').isRequired()"/>"
									readonly="<s:property value="getMboValueData('ASLEFTOUTPUT_NP').isReadOnly()"/>"
									value="<s:property value="getString('ASLEFTOUTPUT_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="ASLEFTOUTPUT_NP"
								/>
							</li>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('ASFOUNDTOL1LOWER_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_ASFOUNDTOL1LOWER_NP" 
									required="<s:property value="getMboValueData('ASFOUNDTOL1LOWER_NP').isRequired()"/>"
									readonly="true"
									value="<s:property value="getString('ASFOUNDTOL1LOWER_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="ASFOUNDTOL1LOWER_NP"								
								/>
							</li>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('ASFOUNDTOL1UPPER_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_ASFOUNDTOL1UPPER_NP" 
									required="<s:property value="getMboValueData('ASFOUNDTOL1UPPER_NP').isRequired()"/>"
									readonly="true"
									value="<s:property value="getString('ASFOUNDTOL1UPPER_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="ASFOUNDTOL1UPPER_NP"								
								/>
							</li>
						</s:if>
						<s:else>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('SETPOINTVALUE_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_SETPOINTVALUE_NP" 
									required="<s:property value="getMboValueData('SETPOINTVALUE_NP').isRequired()"/>"
									readonly="<s:property value="getMboValueData('SETPOINTVALUE_NP').isReadOnly()"/>"
									value="<s:property value="getString('SETPOINTVALUE_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="SETPOINTVALUE_NP"
								/>
							</li>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('ASFOUNDSETPOINT_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_ASFOUNDSETPOINT_NP" 
									required="<s:property value="getMboValueData('ASFOUNDSETPOINT_NP').isRequired()"/>"
									readonly="<s:property value="getMboValueData('ASFOUNDSETPOINT_NP').isReadOnly()"/>"
									value="<s:property value="getString('ASFOUNDSETPOINT_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="ASFOUNDSETPOINT_NP"
								/>
							</li>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('ASLEFTSETPOINT_NP').getTitle()" /></label>
								<input type="text"
									id="<s:property value='getUniqueIDValue()'/>_ASLEFTSETPOINT_NP" 
									required="<s:property value="getMboValueData('ASLEFTSETPOINT_NP').isRequired()"/>"
									readonly="<s:property value="getMboValueData('ASLEFTSETPOINT_NP').isReadOnly()"/>"
									value="<s:property value="getString('ASLEFTSETPOINT_NP')"/>"
									onchange="emm.core.setListValue(this)"
									data-mbo="PLUSCWODSINSTRPOINTS"
									data-field="ASLEFTSETPOINT_NP"
								/>
							</li>
						</s:else>						
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
		</div>
	</div>
</body>
</html>