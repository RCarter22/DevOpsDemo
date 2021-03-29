<%--
* Copyright © 2012 InterPro Solutions, LLC
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
			<h3 class="ui-title"><s:text name="ezmaxmobile.persongr"/></h3>
			<a class="ui-btn-right <s:if test="mboList.get(0).getThisMboSet().toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save('savepersongroup.action')"><span class="emm-floppy-o"></span></a>
			<a class="ui-btn-right" data-scrollto="#ACTIONS"><span class="emm-ellipsis-v"></span></a>
			<s:include value="../common/statusbar.jsp"/>			
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PERSONGROUP').getTitle()" /></label>
					<input type="text"
							id="PERSONGROUP" 
							required="<s:property value="mbo.getMboValueData('PERSONGROUP').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('PERSONGROUP').isReadOnly()"/>"
							value="<s:property value="mbo.getString('PERSONGROUP')"/>"
							maxlength="<s:property value="mbo.getMboValueData('PERSONGROUP').getLength()"/>"
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
			</ul>
			<div class="ui-section"><s:text name="persongr.people"/></div>
			<s:if test="mboList.isEmpty() eq false">	
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li>
							<a href="viewresppartygroup.action?id=<s:property value="getUniqueIDValue()"/>">
								<h3><s:property value="getString('RESPPARTYGROUP')"/> - <s:property value="getString('RESPPARTYGROUP_PERSONS.DISPLAYNAME')"/></h3>
								<table>
									<tbody>
										<tr><td><strong><s:property value="getMboValueInfoStatic('GROUPDEFAULT').getTitle()"/></strong></td><td><s:property value="getString('GROUPDEFAULT')"/></td></tr>
										<tr><td><strong><s:property value="getMboValueInfoStatic('RESPPARTYGROUPSEQ').getTitle()"/></strong></td><td><s:property value="getString('RESPPARTYGROUPSEQ')"/></td></tr>
									</tbody>
								</table>
								<span class="ui-arrow"></span>
							</a>
							<a onclick="emm.util.confirm({message:'<s:text name="global.confirmdelete"/>',yes:function(){window.location='deleterespparty.action?id=<s:property value='getUniqueIDValue()'/>'}});" class="ui-trash-large"></a>
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
			<div class="ui-btn-container">
				<a class="ui-btn-a" href="newrow.action?id=<s:property value='mbo.getUniqueIDValue()'/>"><s:text name="global.newrow"/></a>
			</div>		
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>
			</s:if>					
		</div>
	</div>
</body>
</html>
