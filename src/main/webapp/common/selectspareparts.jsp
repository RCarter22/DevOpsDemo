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
	<script type="text/javascript">
		function resetFilter(){
			$.each($('#emm_filterform input').not('[type=submit]'), function(i, e){
				$(e).val('').trigger('change');				
			});
			$('#emm_form').submit();
			return false;	
		}
	</script>	
</head>
<body>
	<div class="ui-page">
		<div class="ui-header ui-header-b">
			<a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.cancel"/></a>
			<h3 class="ui-title"><s:text name="global.selectspareparts"/></h3>
			<a class="ui-btn-right" href="saveselectedspareparts.action?id=<s:property value="mbo.getOwner().getUniqueIDValue()"/>"><s:text name="global.ok"/></a>	
			<s:include value="../common/statusbar.jsp"/>			
		</div>
		<div class="ui-content">		
			<s:form id="emm_form" action="#" method="post">
				<s:hidden name="refine" value="1"/>			
				<ul class="ui-listview">
					<li class="ui-divider ui-divider-c"><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></li>
				    <li class="ui-field">
						<label class="ui-wrap"><s:property value="mbo.getMboValueInfoStatic('ASSETNUM').getTitle()" /></label>
						<input type="text"
								id="ASSETNUM" 
								value="<s:property value="mbo.getThisMboSet().getQbe('ASSETNUM')"/>"
								onchange="emm.core.setQbeValue(this)"
						/>
					</li>
				    <li class="ui-field">
						<label><s:property value="mboSet.getMboSetInfo().getMboValueInfo('SITEID').getTitle()" /></label>
						<input type="text"
								id="SITEID" 
								value="<s:property value="mbo.getThisMboSet().getQbe('SITEID')"/>"
								onchange="emm.core.setQbeValue(this)"
						/>						
					</li>				
				</ul>
				<div class="ui-btn-container" style="width: 300px; margin: 0 auto;">
					<input class="ui-btn-a" type="submit" value="<s:text name="global.refine"/>"/>
				</div>				
			
				<ul class="ui-listview" id="emm_filterform">
					<li class="ui-divider ui-divider-c"><s:text name="global.filter"/></li>
				    <li class="ui-field">
						<label><s:property value="mboSet.getMboValueInfoStatic('ITEMNUM').getTitle()" /></label>
						<input name="ITEMNUM" value="<s:property value="mboSet.getQbe('ITEMNUM')"/>"/>
						<input type="text"
								id="ITEMNUM" 
								value="<s:property value="mbo.getThisMboSet().getQbe('ITEMNUM')"/>"
								onchange="emm.core.setQbeValue(this)"
						/>							
					</li>
				    <li class="ui-field">
						<label><s:property value="mboSet.getMboValueInfoStatic('ITEM.ITEM_DESCRIPTION').getTitle()" /></label>
						<input type="text"
								id="ITEM.DESCRIPTION" 
								value="<s:property value="mbo.getThisMboSet().getQbe('ITEM.DESCRIPTION')"/>"
								onchange="emm.core.setQbeValue(this)"
						/>							
					</li>		
				    <li class="ui-field">
						<label><s:property value="mboSet.getMboValueInfoStatic('ITEM.COMMODITYGROUP').getTitle()" /></label>
						<input type="text"
								id="ITEM.COMMODITYGROUP" 
								value="<s:property value="mbo.getThisMboSet().getQbe('ITEM.COMMODITYGROUP')"/>"
								onchange="emm.core.setQbeValue(this)"
						/>							
					</li>		
					<li style="background-color: #d8d8d8">
						<div class="ui-btn-container" style="width: 300px; margin: 0 auto;">
							<a class="ui-btn-b" style="width: 47%; padding: 0;" onclick="resetFilter();"><s:text name="global.reset"/></a>
							<input class="ui-btn-a" type="submit" value="<s:text name="global.apply"/>"/>
						</div>						
					</li>
					<li class="ui-divider ui-divider-c"><s:text name="global.selectspareparts"/></li>
					<s:if test="mboList.size > 0">
						<s:include value="../common/pagination.jsp"/>												
						<s:iterator value="mboList">
							<li>
								<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="SPAREPARTS">
									<p><strong><s:property value="getMboValueInfoStatic('ITEMNUM').getTitle()"/>: <s:property value="getString('ITEMNUM')"/></strong></p>								
									<h3><s:property value="getMboValueInfoStatic('ITEM.DESCRIPTION').getTitle()"/>: <s:property value="getString('ITEM.DESCRIPTION')"/></h3>
									<p><s:property value="getMboValueInfoStatic('QUANTITY').getTitle()"/>: <s:property value="getString('QUANTITY')"/></p>
									<p><s:property value="getMboValueInfoStatic('DESCRIPTION').getTitle()"/>: <s:property value="getString('DESCRIPTION')"/></p>										
								</a>
								<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="SPAREPARTS" class="ui-checklistbutton" data-checked="<s:property value="isSelected()"/>"></a>
							</li>
						</s:iterator>							
						<s:include value="../common/pagination.jsp"/>
					</s:if>
					<s:else>
						<div class="ui-statusbar ui-statusbar-c">	
							<h3 class="ui-title"><s:text name="global.norecords"/></h3>
						</div>
					</s:else>					
				</ul>
			</s:form>
		</div>
	</div>		
</body>
</html>
