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
			<s:if test="mbo.toBeAdded() eq true">
				<a class="ui-btn-left ui-btn-e" href="cancel.action"><span class="emm-times-circle"></span></a>
			</s:if>
			<s:else>
				<a class="ui-btn-left" href="goback.action"><span class="emm-chevron-left"></span></a>
			</s:else>	
			<h3 class="ui-title"><s:text name="ezmaxmobile.meter"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save('saveMeter.action')"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content ui-content-narrow">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							readonly="true"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('METERNAME').getTitle()" /></label>
					<input type="text"
							id="METERNAME" 
							required="<s:property value="mbo.getMboValueData('METERNAME').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('METERNAME').isReadOnly()"/>"
							value="<s:property value="mbo.getString('METERNAME')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="METERNAME" data-source="METERNAME" data-display="METERNAME,DESCRIPTION,METERTYPE" data-search="METERNAME,DESCRIPTION"></a>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('METER.DESCRIPTION').getTitle()" /></label>
					<textarea type="text"
							id="METER.DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('METER.DESCRIPTION').isRequired()"/>"
							readonly="true"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('METER.DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('METER.METERTYPE').getTitle()" /></label>
					<p><s:property value="mbo.getString('METER.METERTYPE')"/></p>
				</li>				
				<li class="ui-field ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('READINGTYPE').getTitle()" /></label>
					<p><s:property value="mbo.getString('READINGTYPE')"/></p>
				</li>				
				<s:if test="mbo.getString('METERNAME') neq ''">
					<s:if test="mbo.isNew() neq true">
						<li class="ui-field">
							<label><s:property value="mbo.getMboValueInfoStatic('LASTREADING').getTitle()" /></label>
							<input type="text"
									id="LASTREADING" 
									readonly="true"
									value="<s:property value="mbo.getString('LASTREADING')"/>"
							/>
						</li>
						<%-- 	<li class="ui-field">
							<label><s:property value="mbo.getMboValueInfoStatic('NEWREADING').getTitle()" /></label>
							<input type="text"
									id="NEWREADING" 
									required="<s:property value="mbo.getMboValueData('NEWREADING').isRequired()"/>"
									readonly="<s:property value="mbo.getMboValueData('NEWREADING').isReadOnly()"/>"
									value="<s:property value="mbo.getString('NEWREADING')"/>"
									onchange="emm.core.setValue(this)"
							/>
							<s:if test="mbo.getString('METER.DOMAINID') != ''">
								<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="NEWREADING"></a>
							</s:if>
						</li> --%>
						<%-- <li class="ui-field">
							<label><s:property value="mbo.getMboValueInfoStatic('NEWREADINGDATE').getTitle()" /></label>
							<input type="text"
									id="NEWREADINGDATE" 
									required="<s:property value="mbo.getMboValueData('NEWREADINGDATE').isRequired()"/>"
									readonly="<s:property value="mbo.getMboValueData('NEWREADINGDATE').isReadOnly()"/>"
									value="<s:property value="mbo.getDate('NEWREADINGDATE').getTime()"/>"
									onchange="emm.core.setValue(this)"
							/>
							<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="NEWREADINGDATE"></a>
						</li> --%>
						<li class="ui-field">
							<label><s:property value="mbo.getMboValueInfoStatic('DOROLLOVER').getTitle()" /></label>
							<input type="checkbox"
									id="DOROLLOVER" 
									required="<s:property value="mbo.getMboValueData('DOROLLOVER').isRequired()"/>"
									readonly="<s:property value="mbo.getMboValueData('DOROLLOVER').isReadOnly()"/>"
									value="<s:property value="mbo.getString('DOROLLOVER')"/>"
									onchange="emm.core.setValue(this)"
							/>
						</li> 
					</s:if>
					<li class="ui-divider"><s:text name="meters.contmeterdetails"/></li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('SLIDINGWINDOWSIZE').getTitle()" /></label>
						<input type="text"
								id="SLIDINGWINDOWSIZE" 
								required="<s:property value="mbo.getMboValueData('SLIDINGWINDOWSIZE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('SLIDINGWINDOWSIZE').isReadOnly()"/>"
								value="<s:property value="mbo.getString('SLIDINGWINDOWSIZE')"/>"
								onchange="emm.core.setValue(this)"
						/>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('AVERAGE').getTitle()" /></label>
						<input type="text"
								id="AVERAGE" 
								required="<s:property value="mbo.getMboValueData('AVERAGE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('AVERAGE').isReadOnly()"/>"
								value="<s:property value="mbo.getString('AVERAGE')"/>"
								onchange="emm.core.setValue(this)"
						/>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('AVGCALCMETHOD').getTitle()" /></label>
						<input type="text"
								id="AVGCALCMETHOD" 
								required="<s:property value="mbo.getMboValueData('AVGCALCMETHOD').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('AVGCALCMETHOD').isReadOnly()"/>"
								value="<s:property value="mbo.getString('AVGCALCMETHOD')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="AVGCALCMETHOD"></a>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('READINGTYPE').getTitle()" /></label>
						<input type="text"
								id="READINGTYPE" 
								required="<s:property value="mbo.getMboValueData('READINGTYPE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('READINGTYPE').isReadOnly()"/>"
								value="<s:property value="mbo.getString('READINGTYPE')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="READINGTYPE"></a>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('ROLLDOWNSOURCE').getTitle()" /></label>
						<input type="text"
								id="ROLLDOWNSOURCE" 
								required="<s:property value="mbo.getMboValueData('ROLLDOWNSOURCE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('ROLLDOWNSOURCE').isReadOnly()"/>"
								value="<s:property value="mbo.getString('ROLLDOWNSOURCE')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ROLLDOWNSOURCE"></a>
					</li>
				</s:if>
				<s:if test="mboList.size > 0">
					<li class="ui-divider ui-divider-a"><s:text name="global.previousreadings"><s:param><s:property value="mboList.size"/></s:param></s:text></li>
					<s:iterator value="mboList">
						<li>
							<span>
								<p><strong><s:property value="getString('INSPECTOR')"/> (<s:property value="getString('ENTERDATE')"/><s:property value="getString('MEASUREDATE')"/>)</strong></p>
								<h3><s:property value="getString('READING')"/><s:property value="getString('OBSERVATION')"/><s:property value="getString('MEASUREMENTVALUE')"/></h3>
							</span>
						</li>
					</s:iterator>
				</s:if>
			</ul>
<!--			<div class="ui-btn-container">-->
<!--				<a class="ui-btn-c" href="delete.action?id=<s:property value="mbo.getUniqueIDValue()"/>"><s:text name="global.delete"/></a>-->
<!--			</div>-->
		</div>
	</div>

</body>
</html>