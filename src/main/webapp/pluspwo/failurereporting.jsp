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
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="global.failurecodes"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
		</div>
	
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
			   <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FAILURECODE').getTitle()" /></label>
					<input type="text"
							id="FAILURECODE" 
							required="<s:property value="mbo.getMboValueData('FAILURECODE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FAILURECODE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('FAILURECODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FAILURECODE" data-source="FAILURECODE" data-display="FAILURECODE,DESCRIPTION,ORGID" data-search="FAILURECODE,DESCRIPTION"></a>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('REMARKDESC').getTitle()" /></label>
					<textarea
							id="REMARKDESC" 
							required="<s:property value="mbo.getMboValueData('REMARKDESC').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REMARKDESC').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('REMARKDESC').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('REMARKDESC')"/></textarea>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('REMARKDESC_LONGDESCRIPTION').getTitle()" /></label>
					<textarea
							id="REMARKDESC_LONGDESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('REMARKDESC_LONGDESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REMARKDESC_LONGDESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('REMARKDESC_LONGDESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('REMARKDESC_LONGDESCRIPTION')" /></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FAILDATE').getTitle()" /></label>
					<input type="text"
							id="FAILDATE" 
							required="<s:property value="mbo.getMboValueData('FAILDATE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('FAILDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getDate('FAILDATE').getTime()"/>"
							onchange="emm.core.setValue(this)"
					/>						
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="FAILDATE"></a>				
				</li>
			</ul>
			
			<p class="ui-section"><s:text name="global.failurecodes"/></p>		
			<ul class="ui-listview">
				<s:if test="mbo.toBeSaved() neq true || mboList.size > 0">
					<li class="ui-field">
						<label><s:text name="global.problem"/></label>
						<s:if test="mboList eq null || mbo.getString('PROBLEMCODE') == ''">
							<a onclick="emm.core.lookup(this)" data-field="PROBLEMCODE" data-source="FAILURECODE" data-display="FAILURECODE,FAILURECODE.DESCRIPTION,ORGID" data-search="FAILURECODE,FAILURECODE.DESCRIPTION">
								<h3><s:property value="mbo.getString('PROBLEMCODE')"/></h3>
								<span class="ui-arrow"></span>
							</a>
						</s:if>
						<s:else>
							<input type="text"
								id="PROBLEMCODE" 
								readonly="true"
								value="<s:property value="mbo.getString('PROBLEMCODE')"/>"
							/>
						</s:else>
					</li>
				</s:if>
				<s:if test="mbo.getString('PROBLEMCODE') != ''">
					<li class="ui-field">
						<label><s:text name="global.cause"/></label>
						<s:if test="mboList eq null || mbo.getString('FR1CODE') == ''">
							<a onclick="emm.core.lookup(this)" data-field="FR1CODE" data-source="FAILURECODE" data-display="FAILURECODE,FAILURECODE.DESCRIPTION,ORGID" data-search="FAILURECODE,FAILURECODE.DESCRIPTION">
								<h3><s:property value="mbo.getString('FR1CODE')"/></h3>
								<span class="ui-arrow"></span>
							</a>
						</s:if>
						<s:else>
							<input type="text"
								id="FR1CODE" 
								readonly="true"
								value="<s:property value="mbo.getString('FR1CODE')"/>"
							/>
						</s:else>
					</li>
				</s:if>
				<s:if test="mbo.getString('FR1CODE') != ''">
					<li class="ui-field">
						<label><s:text name="global.remedy"/></label>
						<s:if test="mboList eq null || mbo.getString('FR2CODE') == ''">
							<a onclick="emm.core.lookup(this)" data-field="FR2CODE" data-source="FAILURECODE" data-display="FAILURECODE,FAILURECODE.DESCRIPTION,ORGID" data-search="FAILURECODE,FAILURECODE.DESCRIPTION">
								<h3><s:property value="mbo.getString('FR2CODE')"/></h3>
								<span class="ui-arrow"></span>
							</a>
						</s:if>
						<s:else>
							<input type="text"
								id="FR2CODE" 
								readonly="true"
								value="<s:property value="mbo.getString('FR2CODE')"/>"
							/>
						</s:else>
					</li>
				</s:if>	
			</ul>
		</div>
	</div>
</body>
</html>
