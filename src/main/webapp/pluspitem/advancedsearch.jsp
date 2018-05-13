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
	<div id="itemlookupdialog" class="ui-dialog">
			<div class="ui-container">
				<div class="ui-header">
					<h1 class="ui-title"><s:text name="global.classification"/></h1>
				</div>
				<div class="ui-content">
					<div class="ui-btn-container">
						<a class="ui-btn-a" onclick="emm.core.classificationDrilldown(this)" data-field="ITEMNUM" data-source="CLASSSTRUCTUREID"><s:text name="global.drilldown"/></a>
					</div>
				</div>
			</div>
	</div>
	<div id="classificationlookupdialog" class="ui-dialog">
			<div class="ui-container">
				<div class="ui-header">
					<h1 class="ui-title"><s:text name="global.classification"/></h1>
				</div>
				<div class="ui-content">
					<div class="ui-btn-container">
						<a class="ui-btn-a" onclick="emm.core.classificationDrilldown(this)" data-field="CLASSSTRUCTUREID" data-source="CLASSSTRUCTUREID"><s:text name="global.drilldown"/></a>
					</div>
				</div>
			</div>
	</div>
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="global.advancedsearch"/></h3>
		</div>
		
		<div class="ui-content">
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
					<input type="text"
							id="ITEMNUM" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ITEMNUM')"/>"
							maxlength="<s:property value="mbo.getMboValueData('ITEMNUM').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="" href="#itemlookupdialog" data-control="dialog"></a>
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
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMSETID').getTitle()" /></label>
					<input type="text"
							id="ITEMSETID" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ITEMSETID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ITEMSETID" data-source="SETID" data-display="SETID,DESCRIPTION" data-search="SETID,DESCRIPTION"></a>
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
					<label><s:property value="mbo.getMboValueInfoStatic('COMMODITYGROUP').getTitle()" /></label>
					<input type="text"
							id="COMMODITYGROUP" 
							value="<s:property value="mbo.getThisMboSet().getQbe('COMMODITYGROUP')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="COMMODITYGROUP" data-source="COMMODITY" data-display="COMMODITY,DESCRIPTION" data-search="COMMODITY,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CLASSSTRUCTURE.HIERARCHYPATH').getTitle()" /></label>
					<input type="text"
							id="CLASSSTRUCTUREID"
							value="<s:property value="mbo.getThisMboSet().getQbe('CLASSSTRUCTUREID')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="" href="#classificationlookupdialog" data-control="dialog"></a>
				</li>

				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ITEMORGINFO.CATEGORY').getTitle()" /></label>
					<input type="text"
							id="ITEMORGINFO.CATEGORY" 
							value="<s:property value="mbo.getThisMboSet().getQbe('ITEMORGINFO.CATEGORY')"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="ITEMORGINFO.CATEGORY" data-source="VALUE" data-display="VALUE,DESCRIPTION" data-search="VALUE,DESCRIPTION"></a>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
					<input type="text"
							id="STATUS" 
							value="<s:property value="mbo.getThisMboSet().getQbe('STATUS')"/>"
							onchange="emm.core.setValue(this)"
					/>
				</li> 				
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ISKIT').getTitle()" /></label>
						<input type="checkbox"
								id="ISKIT" 
								value="<s:property value="mbo.getThisMboSet().getQbe('ISKIT')"/>"
								onchange="emm.core.setValue(this)"
						/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('CONDITIONENABLED').getTitle()" /></label>
						<input type="checkbox"
								id="CONDITIONENABLED" 
								value="<s:property value="mbo.getThisMboSet().getQbe('CONDITIONENABLED')"/>"
								onchange="emm.core.setValue(this)"
						/>
				</li>
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('ROTATING').getTitle()" /></label>
						<input type="checkbox"
								id="ROTATING" 
								value="<s:property value="mbo.getThisMboSet().getQbe('ROTATING')"/>"
								onchange="emm.core.setValue(this)"
						/>
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
	<div id="classificationlookupdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="global.classification"/></h1>
			</div>
			<div class="ui-content">
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.lookup(this)" data-field="CLASSSTRUCTUREID" data-source="CLASSSTRUCTUREID" data-display="CLASSIFICATIONID,DESCRIPTION" data-search="CLASSIFICATIONID,DESCRIPTION,CLASSUSEWITH.OBJECTNAME=ITEM"><s:text name="global.lookup"/></a> 
				</div>
				<div class="ui-btn-container">
					<a class="ui-btn-a" onclick="emm.core.classificationDrilldown(this)" data-field="CLASSSTRUCTUREID" data-source="CLASSSTRUCTUREID"><s:text name="global.drilldown"/></a>
				</div>
			</div>
		</div>
	</div>		
</body>
</html>
