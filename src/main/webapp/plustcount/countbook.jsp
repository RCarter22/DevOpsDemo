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
			<h3 class="ui-title"><s:text name="ezmaxmobile.plustcount"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save('savecountbook.action?id=<s:property value='mbo.getUniqueIDValue()'/>')"><s:text name="global.save"/></a>
		</div>
		<ul class="ui-navbar">
			<li>
				<a class="ui-active">
					<s:text name="plustcount.cb"/>
				</a>
			<li>
				<a href="cblines.action?id=<s:property value="mbo.getUniqueIDValue()"/>">
					<s:text name="plustcount.cblines"/>
				</a>				
		</ul>			
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>					
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('COUNTBOOKNUM').getTitle()" /></label>
					<input type="text"
							id="COUNTBOOKNUM" 
							required="<s:property value="mbo.getMboValueData('COUNTBOOKNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('COUNTBOOKNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('COUNTBOOKNUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('COUNTBOOKNUM').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field-block">
					<label>Detail</label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field ui-field-auto ui-details ui-readonly">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<p><s:property value="mbo.getString('STATUS')" /></p>
					<p><s:property value="mbo.getString('STATUSDATE')" /></p>
				</li>		
				<li class="ui-field ui-field-auto ui-details">
					<label><s:property value="mbo.getMboValueInfoStatic('STOREROOM').getTitle()" /></label>
					<input type="text"
							id="STOREROOM" 
							required="<s:property value="mbo.getMboValueData('STOREROOM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STOREROOM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STOREROOM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<p><s:property value="mbo.getString('LOCATIONS.DESCRIPTION')"/></p>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STOREROOM" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('REASON').getTitle()" /></label>
					<input type="text"
							id="REASON" 
							required="<s:property value="mbo.getMboValueData('REASON').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('REASON').isReadOnly()"/>"
							value="<s:property value="mbo.getString('REASON')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="REASON"></a>
				</li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('MEMO').getTitle()" /></label>
					<textarea
							id="MEMO" 
							required="<s:property value="mbo.getMboValueData('MEMO').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('MEMO').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('MEMO').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('MEMO')"/></textarea>
				</li>				
<%-- 				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('MEMO_LONGDESCRIPTION').getTitle()" /></label>
					<textarea
							id="MEMO_LONGDESCRIPTION" 
							required="<s:property value="mbo.getMboValueData('MEMO_LONGDESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('MEMO_LONGDESCRIPTION').isReadOnly()"/>"
							onchange="emm.core.setValue(this)"
							data-htmleditor="true"
					><s:property value="mbo.getString('MEMO_LONGDESCRIPTION')"/></textarea>
				</li>	 --%>
				<%-- <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLCREDITACCOUNT').getTitle()" /></label>
					<input type="text"
							id="GLCREDITACCOUNT" 
							required="<s:property value="mbo.getMboValueData('GLCREDITACCOUNT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLCREDITACCOUNT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLCREDITACCOUNT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)" data-field="GLCREDITACCOUNT"></a>
				</li>								
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLDEBITACCOUNT').getTitle()" /></label>
					<input type="text"
							id="GLDEBITACCOUNT" 
							required="<s:property value="mbo.getMboValueData('GLDEBITACCOUNT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLDEBITACCOUNT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLDEBITACCOUNT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)" data-field="GLDEBITACCOUNT"></a>
				</li> --%>
				<li class="ui-divider"><s:text name="plustcount.itemselection"/></li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SELECTIONTYPE').getTitle()" /></label>
					<input type="text"
							id="SELECTIONTYPE" 
							required="<s:property value="mbo.getMboValueData('SELECTIONTYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SELECTIONTYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SELECTIONTYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SELECTIONTYPE"></a>
				</li>				
				<li class="ui-divider"><s:text name="plustcount.itemsummary"/></li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SELECTED').getTitle()" /></label>
					<input type="text" readonly value="<s:property value="mbo.getString('SELECTED')" />"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('COUNTED').getTitle()" /></label>
					<input type="text" readonly value="<s:property value="mbo.getString('COUNTED')" />"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MATCHED').getTitle()" /></label>
					<input type="text" readonly value="<s:property value="mbo.getString('MATCHED')" />"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('RECONCILED').getTitle()" /></label>
					<input type="text" readonly value="<s:property value="mbo.getString('RECONCILED')" />"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ACCURACY').getTitle()" /></label>
					<input type="text" readonly value="<s:property value="mbo.getString('ACCURACY')" />"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOTALNONSERIAL').getTitle()" /></label>
					<input type="text" readonly value="<s:property value="mbo.getString('TOTALNONSERIAL')" />"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOTALADJUST').getTitle()" /></label>
					<input type="text" readonly value="<s:property value="mbo.getString('TOTALADJUST')" />"/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TOTALADJUST').getTitle()" /></label>
					<input type="text" readonly value="<s:property value="mbo.getString('TOTALADJUST')" />"/>
				</li>																																							
			</ul>		
			<div class="ui-section"><s:text name="plustcount.selectitems"/></div>
			<s:if test="mboList.isEmpty() eq false">			
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="mboList">
						<li data-markdeleted="<s:property value="toBeDeleted()"/>">
							<a>
								<div class="ui-row-4">
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('SELECTIONTYPE').getTitle()"/></strong> <s:property value="getString('SELECTIONTYPE')"/>
									</div>								
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('SELECTIONITM').getTitle()"/></strong> <s:property value="getString('FROMBIN')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('SELECTIONICG').getTitle()"/></strong> <s:property value="getString('USETYPE')"/>
									</div>
									<div class="ui-column">
										<strong><s:property value="getMboValueInfoStatic('CNTFREQDATE').getTitle()"/></strong> <s:property value="getString('QUANTITY')"/>		
									</div>
								</div>
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>										
			<s:include value="actions.jsp"/>	
			
		</div>		
	</div></body>
