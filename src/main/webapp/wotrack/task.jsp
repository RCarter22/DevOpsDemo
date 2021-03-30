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
				<a class="ui-btn-left ui-btn-e" href="canceltask.action"><span class="emm-times-circle"></span></a>
			</s:if>
			<s:else>
				<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			</s:else>
			<h3 class="ui-title"><s:text name="wotrack.tasks"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<a class="ui-btn-right" data-scrollto="#ACTIONS"><span class="emm-ellipsis-v"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		
		<div class="ui-content">
			
			<ul class="ui-listview ui-inset" data-visible="<s:property value='!mbo.isNew()'/>">
				<li class="ui-pagination">	
					<a class="ui-pagination-prev" href="#" onclick="emm.core.movePrev('prevtask.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
					<div class="ui-container">
						<span><s:text name="global.prev"/></span>
						<span><s:text name="global.next"/></span>
					</div>
					<a class="ui-pagination-next" href="#" onclick="emm.core.moveNext('nexttask.action?id=<s:property value="mbo.getUniqueIDValue()"/>')">	
						<span class="ui-arrow"></span>							
					</a>
				</li>
			</ul>
			
			<ul class="ui-listview">
			    <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input readonly="true" value="<s:property value="mbo.getString('WONUM')"/>"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TASKID').getTitle()" /></label>
					<input type="text"
							id="TASKID" 
							required="<s:property value="mbo.getOwner().getMboValueData('WOACTIVITY.TASKID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TASKID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TASKID')"/>"
							maxlength="<s:property value="mbo.getMboValueData('TASKID').getLength()"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="10"
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
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION_LONGDESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION_LONGDESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION_LONGDESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION_LONGDESCRIPTION').isReadOnly()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('DESCRIPTION_LONGDESCRIPTION')"/></textarea>
				</li>
				<s:if test="!mbo.isNew()">
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
						<input type="text"
							readonly="true"
							value="<s:property value="mbo.getString('STATUS')" />"
						/>
					</li>	
				</s:if>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSETNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION" data-search="ASSETNUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INSPECTOR').getTitle()" /></label>
					<input type="text"
							id="INSPECTOR" 
							required="<s:property value="mbo.getMboValueData('INSPECTOR').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('INSPECTOR').isReadOnly()"/>"
							value="<s:property value="mbo.getString('INSPECTOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="INSPECTOR" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME" data-search="PERSONID,DISPLAYNAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('OBSERVATION').getTitle()" /></label>
					<input type="text"
							id="OBSERVATION" 
							required="<s:property value="mbo.getMboValueData('OBSERVATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('OBSERVATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('OBSERVATION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="OBSERVATION"></a>
				</li>  
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('POINTNUM').getTitle()" /></label>
					<input type="text"
							id="POINTNUM" 
							required="<s:property value="mbo.getMboValueData('POINTNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('POINTNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('POINTNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="POINTNUM" data-source="POINTNUM" data-display="POINTNUM,DESCRIPTION" data-search="POINTNUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MEASUREMENTVALUE').getTitle()" /></label>
					<input type="text"
							id="MEASUREMENTVALUE" 
							required="<s:property value="mbo.getMboValueData('MEASUREMENTVALUE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('MEASUREMENTVALUE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('MEASUREMENTVALUE')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li> 
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MEASUREDATE').getTitle()" /></label>
					<input type="text"
							id="MEASUREDATE" 
							required="<s:property value="mbo.getMboValueData('MEASUREDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('MEASUREDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('MEASUREDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="MEASUREDATE"></a>
				</li>
				<s:if test="isInspectionEnabled()">
					<li class="ui-field ui-field-auto ui-details">
						<label><s:property value="mbo.getMboValueInfoStatic('INSPFORMNUM').getTitle()" /></label>
						<input type="text"
								id="INSPFORMNUM" 
								required="<s:property value="mbo.getMboValueData('INSPFORMNUM').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('INSPFORMNUM').isReadOnly()"/>"
								value="<s:property value="mbo.getString('INSPFORMNUM')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<p><s:property value="mbo.getString('INSPECTIONFORM.NAME')"/></p>
						<a class="ui-arrow" data-control="dialog" href="#inspectionlookupdialog"></a>
					</li>
				</s:if>					
			</ul>
			
			<s:if test="!mbo.isNew()">
				<s:include value="taskactions.jsp"/>			
			</s:if>
			
		</div>
	</div>	
	
	<div id="inspectionlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.inspection"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="INSPFORMNUM" data-source="INSPECTIONFORM.INSPFORMNUM" data-display="INSPECTIONFORM.INSPFORMNUM,INSPECTIONFORM.NAME,INSPECTIONFORM.REVISION" data-search="INSPECTIONFORM.INSPFORMNUM,INSPECTIONFORM.NAME"><s:text name="inspection.recommendedforms"/></a>
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="INSPFORMNUM" data-source="INSPFORMNUM" data-display="INSPFORMNUM,NAME,REVISION" data-search="INSPFORMNUM,NAME"><s:text name="inspection.otherforms"/></a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
