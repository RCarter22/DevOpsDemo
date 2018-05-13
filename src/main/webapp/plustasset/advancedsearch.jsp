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
			<h3 class="ui-title"><s:text name="global.advancedsearch"/></h3>
		</div>
		<div class="ui-btn-container">
			<a class="ui-btn-b" href="clearadvancedsearch.action">
				<s:text name="global.clear"/>
			</a>
			<a class="ui-btn-a" href="doadvancedsearch.action">
				<s:text name="global.search"/>
			</a>
		</div>	
		
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
					<input type="text"
							id="ASSETNUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ASSETNUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('ASSETNUM').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PLUSTDEFASSETALIAS.ALIAS').getTitle()" /></label>
					<input type="text"
							id="PLUSTDEFASSETALIAS.ALIAS" 
							value="<s:property value="mbo.getThisMboSet().getQbe('PLUSTDEFASSETALIAS.ALIAS')"/>"
							maxlength="<s:property value="mbo.getMboValueData('PLUSTDEFASSETALIAS.ALIAS').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>				
				<li class="ui-field-block">
					<label><s:property value="mbo.getMboValueInfoStatic('DESCRIPTION').getTitle()" /></label>
					<textarea
							id="DESCRIPTION" 
							maxlength="<s:property value="mbo.getMboValueData('DESCRIPTION').getLength()"/>"
							onchange="emm.core.setValue(this)"
					><s:property value="mbo.getThisMboSet().getQbe('DESCRIPTION')"/></textarea>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<input type="text"
							id="STATUS" 
							value="<s:property value="mbo.getThisMboSet().getQbe('STATUS')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="STATUS"></a>
				</li>	
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					<input type="text"
							id="LOCATION" 
							value="<s:property value="mbo.getThisMboSet().getQbe('LOCATION')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="LOCATION" data-source="LOCATION" data-display="LOCATION,DESCRIPTION,ORGID" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PARENT').getTitle()" /></label>
					<input type="text"
							id="PARENT" 
							value="<s:property value="mbo.getThisMboSet().getQbe('PARENT')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PARENT" data-source="ASSETNUM" data-display="ASSETNUM,DESCRIPTION" data-search="ASSETNUM,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
					<input type="text"
							id="SITEID" 
							value="<s:property value="mbo.getThisMboSet().getQbe('SITEID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="SITEID" data-source="SITEID" data-display="SITEID,DESCRIPTION" data-search="SITEID,DESCRIPTION"></a>
				</li>					
				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ASSETTYPE').getTitle()" /></label>
					<input type="text"
							id="ASSETTYPE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ASSETTYPE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETTYPE"></a>
				</li> 
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('GROUPNAME').getTitle()" /></label>
					<input type="text"
							id="GROUPNAME" 
							value="<s:property value="mbo.getThisMboSet().getQbe('GROUPNAME')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="GROUPNAME" data-source="GROUPNAME" data-display="GROUPNAME,DESCRIPTION" data-search="GROUPNAME,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('SERIALNUM').getTitle()" /></label>
					<input type="text"
							id="SERIALNUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('SERIALNUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('VENDOR').getTitle()" /></label>
					<input type="text"
							id="VENDOR" 
							value="<s:property value="mbo.getThisMboSet().getQbe('VENDOR')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="VENDOR" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PLUSTYEAR').getTitle()" /></label>
					<input type="text"
							id="PLUSTYEAR" 
							value="<s:property value="mbo.getThisMboSet().getQbe('PLUSTYEAR')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('AEPMAKE').getTitle()" /></label>
					<input type="text"
							id="AEPMAKE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('AEPMAKE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="AEPMAKE" data-source="DESCRIPTION" data-display="VALUE,DESCRIPTION" data-search="VALUE,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PLUSTMODEL').getTitle()" /></label>
					<input type="text"
							id="PLUSTMODEL" 
							value="<s:property value="mbo.getThisMboSet().getQbe('PLUSTMODEL')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="PLUSTMODEL" data-source="MODEL" data-display="MODEL,MANUFACTURER,MAKE" data-search="MODEL,MANUFACTURER,MAKE"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('PLUSTLICENSES.LICENSENUM').getTitle()" /></label>
					<input type="text"
							id="PLUSTLICENSES.LICENSENUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('PLUSTLICENSES.LICENSENUM')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('DEFAULTREPFAC').getTitle()" /></label>
					<input type="text"
							id="DEFAULTREPFAC" 
							value="<s:property value="mbo.getThisMboSet().getQbe('DEFAULTREPFAC')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="DEFAULTREPFAC" data-source="LOCATION" data-display="LOCATION,DESCRIPTION" data-search="LOCATION,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('MANUFACTURER').getTitle()" /></label>
					<input type="text"
							id="MANUFACTURER" 
							value="<s:property value="mbo.getThisMboSet().getQbe('MANUFACTURER')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="MANUFACTURER" data-source="COMPANY" data-display="COMPANY,NAME" data-search="COMPANY,NAME"></a>
				</li>
				<li class="ui-field">
					<label>User</label>
					<%-- <label><s:property value="mbo.getMboValueInfoStatic(ASSETUSER.PERSONID').getTitle()" /></label> --%>
					<input type="text"
							id="ASSETUSER.PERSONID" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ASSETUSER.PERSONID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ASSETUSER.PERSONID" data-source="PERSONID" data-display="PERSONID,DISPLAYNAME,TITLE,DEPARTMENT,LOCATION,LOCATIONSITE,LOCATIONORG" data-search="PERSONID,DISPLAYNAME,TITLE,DEPARTMENT,LOCATION,LOCATIONSITE,LOCATIONORG"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('FAILURECODE').getTitle()" /></label>
					<input type="text"
							id="FAILURECODE" 
							value="<s:property value="mbo.getThisMboSet().getQbe('FAILURECODE')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FAILURECODE" data-source="FAILURECODE" data-display="FAILURECODE,FAILURECODE.DESCRIPTION,ORGID" data-search="FAILURECODE,FAILURECODE.DESCRIPTION"></a>
				</li>
			</ul>
		</div>
		
		<div class="ui-btn-container">
			<a class="ui-btn-b" href="clearadvancedsearch.action">
				<s:text name="global.clear"/>
			</a>
			<a class="ui-btn-a" href="doadvancedsearch.action">
				<s:text name="global.search"/>
			</a>
		</div>	
	</div>
</body>
</html>
