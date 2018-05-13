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
			<s:if test="mbo.toBeAdded() eq true">
				<a class="ui-btn-left ui-btn-e" href="cancel.action"><s:text name="global.cancel"/></a>
			</s:if>
			<s:else>
				<a class="ui-btn-left" href="goback.action"><s:text name="global.back"/></a>
			</s:else>
			<h3 class="ui-title"><s:text name="ezmaxmobile.inventor"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
	
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('WONUM').getTitle()" /></label>
					<input readonly="true" value="<s:property value="mbo.getString('WONUM')"/>"/>
				</li>
				<%-- <li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ACTUALSTASKID').getTitle()" /></label>
					<input type="text"
							id="ACTUALSTASKID" 
							required="<s:property value="mbo.getMboValueData('ACTUALSTASKID').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ACTUALSTASKID').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ACTUALSTASKID')"/>"
							onchange="emm.core.setValue(this)"
					/>	
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ACTUALSTASKID" data-source="TASKID" data-display="TASKID,DESCRIPTION,SITEID" data-search="TASKID,DESCRIPTION,SITEID"></a>
				</li> 				 --%>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LINETYPE').getTitle()" /></label>
					<input type="text"
							id="LINETYPE" 
							required="<s:property value="mbo.getMboValueData('LINETYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LINETYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LINETYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>	
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LINETYPE"></a>
				</li> 
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							required="<s:property value="mbo.getMboValueData('ITEMNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ITEMNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ITEMNUM')"/>"
							onchange="emm.core.setValue(this)"
							data-barcode
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ITEMNUM" data-source="ITEMNUM" data-display="ITEMNUM,DESCRIPTION" data-search="ITEMNUM,DESCRIPTION"></a>
				</li>
                <li class="ui-field">
                    <label><s:property value="mbo.getMboValueInfoStatic('ROTASSETNUM').getTitle()" /></label>
                    <input type="text"
                            id="ROTASSETNUM" 
                            required="<s:property value="mbo.getMboValueData('ROTASSETNUM').isRequired()"/>"
                            readonly="<s:property value="mbo.getMboValueData('ROTASSETNUM').isReadOnly()"/>"
                            value="<s:property value="mbo.getString('ROTASSETNUM')"/>"
                            onchange="emm.core.setValue(this)"
                    />
                    <a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ROTASSETNUM" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION,LOCATION,SITEID" data-search="ASSETNUM,DESCRIPTION"></a>
                </li>
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							required="<s:property value="mbo.getOwner().getMboValueData('ITEM.DESCRIPTION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('DESCRIPTION').isReadOnly()"/>"
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getString('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STORELOC').getTitle()" /></label>
					<input type="text"
							id="STORELOC" 
							required="<s:property value="mbo.getMboValueData('STORELOC').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('STORELOC').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STORELOC')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STORELOC" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('POSITIVEQUANTITY').getTitle()" /></label>
					<input type="text"
							id="POSITIVEQUANTITY" 
							required="<s:property value="mbo.getMboValueData('POSITIVEQUANTITY').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('POSITIVEQUANTITY').isReadOnly()"/>"
							value="<s:property value="mbo.getString('POSITIVEQUANTITY')"/>"
							onchange="emm.core.setValue(this)"
							data-control="spinner" data-interval="1"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('UNITCOST').getTitle()" /></label>
					<input type="text"
							id="UNITCOST" 
							required="<s:property value="mbo.getMboValueData('UNITCOST').isRequired()"/>"
							readonly
							value="<s:property value="mbo.getString('UNITCOST')"/>"
							onchange="emm.core.setValue(this)"
						
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('BINNUM').getTitle()" /></label>
					<input type="text"
							id="BINNUM" 
							required="<s:property value="mbo.getMboValueData('BINNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('BINNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('BINNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="BINNUM" data-source="BINNUM" data-display="BINNUM,LOTNUM,CONDITIONCODE,CURBAL,ORGID" data-search="BINNUM"></a>
				</li>				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISSUETYPE').getTitle()" /></label>
					<input type="text"
							id="ISSUETYPE" 
							required="<s:property value="mbo.getMboValueData('ISSUETYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISSUETYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISSUETYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ISSUETYPE"></a>
				</li>
<%-- 				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLDEBITACCT').getTitle()" /></label>
					<input type="text"
							id="GLDEBITACCT" 
							required="<s:property value="mbo.getMboValueData('GLDEBITACCT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLDEBITACCT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLDEBITACCT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.glalookup(this)" data-field="GLDEBITACCT"></a>										
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GLCREDITACCT').getTitle()" /></label>
					<input type="text"
							id="GLCREDITACCT" 
							required="<s:property value="mbo.getMboValueData('GLCREDITACCT').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('GLCREDITACCT').isReadOnly()"/>"
							value="<s:property value="mbo.getString('GLCREDITACCT')"/>"
							onchange="emm.core.setValue(this)"
					/>					
					<a class="ui-arrow" onclick="emm.core.glalookup(this)" data-field="GLCREDITACCT"></a>
				</li> --%>
			</ul>
		</div>
	</div>
</body>
</html>
