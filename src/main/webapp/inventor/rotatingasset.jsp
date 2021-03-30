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
			<h3 class="ui-title"><s:text name="ezmaxmobile.inventor"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save();"><span class="emm-floppy-o"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							required="<s:property value="mbo.getMboValueData('ASSETNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSETNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ASSETNUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('ASSETNUM').getLength()"/>"
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
				<s:if test="!mbo.isNew()">
					<li class="ui-field ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
						<p><s:property value="mbo.getString('STATUS')" /></p>
						<p><s:property value="mbo.getString('STATUSDATE')" /></p>
					</li>	
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('PARENT').getTitle()" /></label>
						<input type="text"
							readonly="true"
							value="<s:property value="mbo.getString('PARENT')" />"
						/>						
					</li>				
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
						<input type="text"
							readonly="true"
							value="<s:property value="mbo.getString('SITEID')" />"
						/>
					</li>
				</s:if>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" />
					</label>
					<input type="text"
						id="LOCATION" 
						readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()" />" 
						maxlength="<s:property value="mbo.getMboValueData('LOCATION').getLength()" />"
						value="<s:property value="mbo.getString('LOCATION')" />" 
						onchange="emm.core.setValue(this)"   
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('SERIALNUM').getTitle()" />
					</label>
					<input type="text"
						id="SERIALNUM" 
						readonly="<s:property value="mbo.getMboValueData('SERIALNUM').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('SERIALNUM').isRequired()" />" 
						maxlength="<s:property value="mbo.getMboValueData('SERIALNUM').getLength()" />"
						value="<s:property value="mbo.getString('SERIALNUM')" />" 
						onchange="emm.core.setValue(this)"   
					/>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('ASSETTYPE').getTitle()" />
					</label>
					<input type="text"
						id="ASSETTYPE" 
						readonly="<s:property value="mbo.getMboValueData('ASSETTYPE').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('ASSETTYPE').isRequired()" />" 
						maxlength="<s:property value="mbo.getMboValueData('ASSETTYPE').getLength()" />"
						value="<s:property value="mbo.getString('ASSETTYPE')" />" 
						onchange="emm.core.setValue(this)"   
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETTYPE"></a>
				</li> 
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('SHIFTNUM').getTitle()" />
					</label>
					<input type="text"
						id="SHIFTNUM" 
						readonly="<s:property value="mbo.getMboValueData('SHIFTNUM').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('SHIFTNUM').isRequired()" />" 
						maxlength="<s:property value="mbo.getMboValueData('SHIFTNUM').getLength()" />"
						value="<s:property value="mbo.getString('SHIFTNUM')" />" 
						onchange="emm.core.setValue(this)"   
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SHIFTNUM" data-source="SHIFTNUM" data-display="SHIFTNUM,DESCRIPTION,ORGID" data-search="DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('FAILURECODE').getTitle()" />
					</label>
					<input type="text"
						id="FAILURECODE" 
						readonly="<s:property value="mbo.getMboValueData('FAILURECODE').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('FAILURECODE').isRequired()" />" 
						maxlength="<s:property value="mbo.getMboValueData('FAILURECODE').getLength()" />"
						value="<s:property value="mbo.getString('FAILURECODE')" />" 
						onchange="emm.core.setValue(this)"   
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FAILURECODE" data-source="FAILURECODE" data-display="FAILURECODE,FAILURECODE.DESCRIPTION,ORGID" data-search="FAILURECODE.DESCRIPTION"></a>
				</li>
				<li class="ui-divider"><s:text name="global.purchaseinfo"/></li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('VENDOR').getTitle()" />
					</label>
					<input type="text"
						id="VENDOR" 
						readonly="<s:property value="mbo.getMboValueData('VENDOR').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('VENDOR').isRequired()" />" 
						maxlength="<s:property value="mbo.getMboValueData('VENDOR').getLength()" />"
						value="<s:property value="mbo.getString('VENDOR')" />" 
						onchange="emm.core.setValue(this)"   
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="VENDOR" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('MANUFACTURER').getTitle()" />
					</label>
					<input type="text"
						id="MANUFACTURER" 
						readonly="<s:property value="mbo.getMboValueData('MANUFACTURER').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('MANUFACTURER').isRequired()" />" 
						maxlength="<s:property value="mbo.getMboValueData('MANUFACTURER').getLength()" />"
						value="<s:property value="mbo.getString('MANUFACTURER')" />" 
						onchange="emm.core.setValue(this)"   
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="MANUFACTURER" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('PURCHASEPRICE').getTitle()" />
					</label>
					<input type="text"
						id="PURCHASEPRICE" 
						readonly="<s:property value="mbo.getMboValueData('PURCHASEPRICE').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('PURCHASEPRICE').isRequired()" />" 
						maxlength="<s:property value="mbo.getMboValueData('PURCHASEPRICE').getLength()" />"
						value="<s:property value="mbo.getString('PURCHASEPRICE')" />" 
						onchange="emm.core.setValue(this)"   
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INSTALLDATE').getTitle()" /></label>
					<input type="text"
						id="INSTALLDATE" 
						readonly="<s:property value="mbo.getMboValueData('INSTALLDATE').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('INSTALLDATE').isRequired()" />" 
						value="<s:property value="mbo.getDate('INSTALLDATE').getTime()" />" 
						onchange="emm.core.setValue(this)"   
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="INSTALLDATE"></a>					
				</li>
				<li class="ui-divider"><s:text name="global.downtime"/></li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('ISRUNNING').getTitle()" />
					</label>
					<input type="checkbox"
							id="ISRUNNING" 
							required="<s:property value="mbo.getMboValueData('ISRUNNING').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISRUNNING').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISRUNNING')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>		
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUSDATE').getTitle()" /></label>
					<input type="text"
						id="STATUSDATE" 
						readonly="<s:property value="mbo.getMboValueData('STATUSDATE').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('STATUSDATE').isRequired()" />" 
						value="<s:property value="mbo.getDate('STATUSDATE').getTime()" />" 
						onchange="emm.core.setValue(this)"   
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="date" data-input="STATUSDATE"></a>					
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('TOTDOWNTIME').getTitle()" />
					</label>
					<input type="text"
						id="TOTDOWNTIME" 
						readonly="<s:property value="mbo.getMboValueData('TOTDOWNTIME').isReadOnly()" />"
						required="<s:property value="mbo.getMboValueData('TOTDOWNTIME').isRequired()" />" 
						maxlength="<s:property value="mbo.getMboValueData('TOTDOWNTIME').getLength()" />"
						value="<s:property value="mbo.getString('TOTDOWNTIME')" />" 
						onchange="emm.core.setValue(this)"   
					/>
				</li>
			</ul>
			
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>	
			</s:if>
		</div>
	</div>	
</body>
</html>
