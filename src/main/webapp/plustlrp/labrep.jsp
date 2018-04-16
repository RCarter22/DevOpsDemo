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
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back();"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.plustlrp"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LABORCODE').getTitle()" /></label>
					<input readonly="true" value="<s:property value="mbo.getString('LABORCODE')"/>"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PERSON.DISPLAYNAME').getTitle()" /></label>
					<input readonly="true" value="<s:property value="mbo.getString('PERSON.DISPLAYNAME')"/>"/>
				</li>
			   <%--  <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GENAPPRSERVRECEIPT').getTitle()" /></label>
					<input type="checkbox"
							id="GENAPPRSERVRECEIPT" 
							required="<s:property value="mbo.getMboValueData('GENAPPRSERVRECEIPT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GENAPPRSERVRECEIPT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GENAPPRSERVRECEIPT')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li> --%>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input type="text"
							id="WONUM" 
							required="<s:property value="mbo.getMboValueData('WONUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('WONUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('WONUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="WONUM" data-source="WONUM" data-display="WONUM,DESCRIPTION,LOCATION,ASSETNUM" data-search="WONUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TASKID').getTitle()" /></label>
					<input type="text"
							id="TASKID" 
							required="<s:property value="mbo.getMboValueData('TASKID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TASKID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TASKID')"/>"
							onchange="emm.core.setValue(this)"	
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TASKID" data-source="TASKID" data-display="TASKID,DESCRIPTION,SITEID" data-search="TASKID,DESCRIPTION,SITEID"></a>
				</li>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CRAFT').getTitle()" /></label>
					<input type="text"
							id="CRAFT" 
							required="<s:property value="mbo.getMboValueData('CRAFT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('CRAFT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('CRAFT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="CRAFT" data-source="CRAFT" data-display="CRAFT,LABOR.PERSON.DISPLAYNAME,LABORCODE,SKILLLEVEL" data-search="LABORCODE,LABOR.PERSON.DISPLAYNAME,CRAFT"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STARTDATE').getTitle()" /></label>
					<input type="text"
							id="STARTDATE" 
							required="<s:property value="mbo.getMboValueData('STARTDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STARTDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('STARTDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="STARTDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STARTTIME').getTitle()" /></label>
					<input type="text"
							id="STARTTIME" 
							required="<s:property value="mbo.getMboValueData('STARTTIME').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STARTTIME').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('STARTTIME').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="time" data-input="STARTTIME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FINISHDATE').getTitle()" /></label>
					<input type="text"
							id="FINISHDATE" 
							required="<s:property value="mbo.getMboValueData('FINISHDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FINISHDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('FINISHDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="FINISHDATE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FINISHTIME').getTitle()" /></label>
					<input type="text"
							id="FINISHTIME" 
							required="<s:property value="mbo.getMboValueData('FINISHTIME').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FINISHTIME').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('FINISHTIME').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="time" data-input="FINISHTIME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('REGULARHRS').getTitle()" /></label>
					<input type="text"
							id="REGULARHRS" 
							required="<s:property value="mbo.getMboValueData('REGULARHRS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REGULARHRS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('REGULARHRS')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PAYRATE').getTitle()" /></label>
					<input type="text"
							id="PAYRATE" 
							required="<s:property value="mbo.getMboValueData('PAYRATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PAYRATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PAYRATE')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PREMIUMPAYCODE').getTitle()" /></label>
					<input type="text"
							id="PREMIUMPAYCODE" 
							required="<s:property value="mbo.getMboValueData('PREMIUMPAYCODE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PREMIUMPAYCODE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PREMIUMPAYCODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PREMIUMPAYCODE" data-source="PREMIUMPAYCODE" data-display="PREMIUMPAYCODE,PREMIUMPAY.DESCRIPTION" data-search="PREMIUMPAYCODE,PREMIUMPAY.DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PREMIUMPAYHOURS').getTitle()" /></label>
					<input type="text"
							id="PREMIUMPAYHOURS" 
							required="<s:property value="mbo.getMboValueData('PREMIUMPAYHOURS').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PREMIUMPAYHOURS').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PREMIUMPAYHOURS')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="0.25"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PREMIUMPAYRATE').getTitle()" /></label>
					<input type="text"
							id="PREMIUMPAYRATE" 
							required="<s:property value="mbo.getMboValueData('PREMIUMPAYRATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PREMIUMPAYRATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PREMIUMPAYRATE')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>   
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TRANSTYPE').getTitle()" /></label>
					<input type="text"
							id="TRANSTYPE" 
							required="<s:property value="mbo.getMboValueData('TRANSTYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TRANSTYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TRANSTYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TRANSTYPE"></a>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TIMERSTATUS').getTitle()" /></label>
					<input type="text"
							id="TIMERSTATUS" 
							readonly="true"
							value="<s:property value="mbo.getString('TIMERSTATUS')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>			
			</ul>
		</div>
	</div>	
</body>
</html>
