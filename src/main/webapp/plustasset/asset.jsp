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
			<h3 class="ui-title"><s:text name="ezmaxmobile.asset"/></h3>
			<a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a>
		</div>
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
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
						<p><s:property value="%{mbo.getString('STATUS')}" /></p>
						<p><s:property value="%{mbo.getString('STATUSDATE')}" /></p>
					</li>	
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('PARENT').getTitle()" /></label>
						<s:textfield readonly="true" value="%{mbo.getString('PARENT')}" />
					</li>				
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
						<s:textfield readonly="true" value="%{mbo.getString('SITEID')}" />
					</li>
				</s:if>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('PLUSTYEAR').getTitle()" />
					</label>
					<input type="text"
						id="PLUSTYEAR" 
						required="<s:property value="mbo.getMboValueData('PLUSTYEAR').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('PLUSTYEAR').isReadOnly()"/>"
						value="<s:property value="mbo.getString('PLUSTYEAR')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('PLUSTYEAR).getLength()}"
					/>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('PLUSTMODEL').getTitle()" />
					</label>
					<input type="text"
						id="PLUSTMODEL" 
						required="<s:property value="mbo.getMboValueData('PLUSTMODEL').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('PLUSTMODEL').isReadOnly()"/>"
						value="<s:property value="mbo.getString('PLUSTMODEL')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('PLUSTMODEL).getLength()}"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PLUSTMODEL" data-source="MODEL" data-display="MODEL,MANUFACTURER,MAKE"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('AEPMAKE').getTitle()" />
					</label>
					<input type="text"
						id="AEPMAKE" 
						required="<s:property value="mbo.getMboValueData('AEPMAKE').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('AEPMAKE').isReadOnly()"/>"
						value="<s:property value="mbo.getString('AEPMAKE')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('AEPMAKE).getLength()}"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="AEPMAKE" data-source="DESCRIPTION" data-display="VALUE,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" />
					</label>
					<input type="text"
						id="LOCATION" 
						required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
						value="<s:property value="mbo.getString('LOCATION')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('LOCATION').getLength()}"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('DEFAULTREPFAC').getTitle()" />
					</label>
					<input type="text"
						id="DEFAULTREPFAC" 
						required="<s:property value="mbo.getMboValueData('DEFAULTREPFAC').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('DEFAULTREPFAC').isReadOnly()"/>"
						value="<s:property value="mbo.getString('DEFAULTREPFAC')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('DEFAULTREPFAC').getLength()}"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="DEFAULTREPFAC" data-source="LOCATION" data-display="LOCATION,DESCRIPTION" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('SERIALNUM').getTitle()" />
					</label>
					<input type="text"
							id="SERIALNUM" 
							required="<s:property value="mbo.getMboValueData('SERIALNUM').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('SERIALNUM').isReadOnly()"/>"
							value="<s:property value="mbo.getString('SERIALNUM')"/>"
							onchange="emm.core.setValue(this)"
							maxlength="%{mbo.getMboValueData('SERIALNUM').getLength()}"
							data-barcode
					/>
				</li>
				
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('ASSETTYPE').getTitle()" />
					</label>
					<input type="text"
							id="ASSETTYPE" 
							required="<s:property value="mbo.getMboValueData('ASSETTYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ASSETTYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ASSETTYPE')"/>"
							onchange="emm.core.setValue(this)"
							maxlength="%{mbo.getMboValueData('ASSETTYPE').getLength()}" 
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETTYPE"></a>
				</li> 
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('FAILURECODE').getTitle()" />
					</label>
					<input type="text"
						id="FAILURECODE" 
						required="<s:property value="mbo.getMboValueData('FAILURECODE').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('FAILURECODE').isReadOnly()"/>"
						value="<s:property value="mbo.getString('FAILURECODE')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('FAILURECODE').getLength()}"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FAILURECODE" data-source="FAILURECODE" data-display="FAILURECODE,FAILURECODE.DESCRIPTION,ORGID" data-search="FAILURECODE.DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('SHIFTNUM').getTitle()" />
					</label>
					<input type="text"
						id="SHIFTNUM" 
						required="<s:property value="mbo.getMboValueData('SHIFTNUM').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('SHIFTNUM').isReadOnly()"/>"
						value="<s:property value="mbo.getString('SHIFTNUM')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('SHIFTNUM').getLength()}"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SHIFTNUM" data-source="SHIFTNUM" data-display="SHIFTNUM,DESCRIPTION,ORGID" data-search="DESCRIPTION"></a>
				</li>
		<%-- 		<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('ISUSER').getTitle()" />
					</label>
					<input type="checkbox"
							id="ISUSER" 
							required="<s:property value="mbo.getMboValueData('ISUSER').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('ISUSER').isReadOnly()"/>"
							value="<s:property value="mbo.getString('ISUSER')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>	 --%>	
				
				<li class="ui-divider"><s:text name="global.purchaseinfo"/></li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('VENDOR').getTitle()" />
					</label>
					<input type="text"
						id="VENDOR" 
						required="<s:property value="mbo.getMboValueData('VENDOR').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('VENDOR').isReadOnly()"/>"
						value="<s:property value="mbo.getString('VENDOR')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('VENDOR').getLength()}"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="VENDOR" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('MANUFACTURER').getTitle()" />
					</label>
					<input type="text"
						id="MANUFACTURER" 
						required="<s:property value="mbo.getMboValueData('MANUFACTURER').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('MANUFACTURER').isReadOnly()"/>"
						value="<s:property value="mbo.getString('MANUFACTURER')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('MANUFACTURER').getLength()}"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="MANUFACTURER" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a>
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('PURCHASEPRICE').getTitle()" />
					</label>
					<input type="text"
						id="PURCHASEPRICE" 
						required="<s:property value="mbo.getMboValueData('PURCHASEPRICE').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('PURCHASEPRICE').isReadOnly()"/>"
						value="<s:property value="mbo.getString('PURCHASEPRICE')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('PURCHASEPRICE').getLength()}"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('INSTALLDATE').getTitle()" /></label>
					<input type="text"
							id="INSTALLDATE" 
							readonly="<s:property value="mbo.getMboValueData('INSTALLDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('INSTALLDATE')"/>"
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
							readonly="<s:property value="mbo.getMboValueData('STATUSDATE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('STATUSDATE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-datepicker" data-control="datepicker" data-datetype="datetime" data-input="STATUSDATE"></a>					
				</li>
				<li class="ui-field">
					<label>
						<s:property value="mbo.getMboValueInfoStatic('TOTDOWNTIME').getTitle()" />
					</label>
					<input type="text"
						id="TOTDOWNTIME" 
						required="<s:property value="mbo.getMboValueData('TOTDOWNTIME').isRequired()"/>"
						readonly="<s:property value="mbo.getMboValueData('TOTDOWNTIME').isReadOnly()"/>"
						value="<s:property value="mbo.getString('TOTDOWNTIME')"/>"
						onchange="emm.core.setValue(this)"
						maxlength="%{mbo.getMboValueData('TOTDOWNTIME').getLength()}"
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
