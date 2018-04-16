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
	<script type="text/javascript">
		function goPage(pageNum,pageObject){
			var url = window.location.href;
			var form=$('<form id="emm_pagination" target="_self">').attr('method','post');
			if (url.indexOf(pageObject+'.currentPageNum=')>-1){
				url = url.substring(0, url.indexOf('&'));
				form.attr('action', url);
			}
			
			var hierarchyCurrentPage = $('#hierarchyPagination_currentPageNum');
						
			if(pageObject == 'hierarchyPagination')
				form.append($('<input type="hidden">').attr('name','hierarchyPagination.currentPageNum').val(pageNum));			
			else if (hierarchyCurrentPage.length==1 && hierarchyCurrentPage.val()!='')
				form.append($('<input type="hidden">').attr('name','hierarchyPagination.currentPageNum').val(hierarchyCurrentPage.val()));			
			
			var body = $('body');
			$('#'+form.attr('id')).remove();		
			body.append(form);		
			form.submit();
		}
	</script>
</head>
<body>
	<div class="ui-page ui-inset">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<!-- <a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a> -->
			<a class="ui-btn-left" onclick="" href="list.action"><s:text name="global.back"/></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.locations"/></h3>
			<s:if test="currLochHier==null"><a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save()"><s:text name="global.save"/></a></s:if>
			<s:if test="currLochHier!=null"><a class="ui-btn-right <s:if test="mbo.toBeSaved() eq true">ui-btn-c</s:if>" onclick="emm.core.save('savenewlocationhierachy.action?id=<s:property value="mbo.getUniqueIdValue()"/>&toAdd=<s:property value="toAdd"/>')"><s:text name="global.save"/></a></s:if>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview">
				<s:if test="currLochHier!=null">
					<li class="ui-field">
						
						<s:if test="toAdd.equals('child')">
							<label><s:text name="location.parent"/></label>
						</s:if>
						<s:else>
							<label><s:text name="location.child"/></label>
						</s:else>
					
						<input type="text" 
								required="<s:property value="currLochHier.getMboValueData('LOCATION').isRequired()"/>"
								readonly="true"
								value="<s:property value="currLochHier.getString('LOCATION')"/>"
								maxlength="<s:property value="currLochHier.getMboValueData('LOCATION').getLength()"/>"
						/>
					</li>
					<li class="ui-field">
						<label><s:property value="currLochHier.getMboValueInfoStatic('SYSTEMID').getTitle()" /></label>
						<input type="text"
								required="<s:property value="currLochHier.getMboValueData('SYSTEMID').isRequired()"/>"
								readonly="true"
								value="<s:property value="currLochHier.getString('SYSTEMID')"/>"
								maxlength="<s:property value="currLochHier.getMboValueData('SYSTEMID').getLength()"/>"
						/>
					</li>
				</s:if>
				<li class="ui-field">
					<s:if test="currLochHier==null">
						<label><s:property value="mbo.getMboValueInfoStatic('LOCATION').getTitle()" /></label>
					</s:if>
					<s:else>
						<s:if test="toAdd.equals('child')">
							<label><s:text name="location.child"/></label>
						</s:if>
						<s:else>
							<label><s:text name="location.parent"/></label>
						</s:else>
					</s:else>
					<input type="text"
							id="LOCATION" 
							required="<s:property value="mbo.getMboValueData('LOCATION').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('LOCATION').isReadOnly()"/>"
							value="<s:property value="mbo.getString('LOCATION')"/>"
							maxlength="<s:property value="mbo.getMboValueData('LOCATION').getLength()"/>"
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
				<li class="ui-field">
					<label><s:property value="mbo.getMboValueInfoStatic('TYPE').getTitle()" /></label>
					<input type="text"
							id="TYPE" 
							required="<s:property value="mbo.getMboValueData('TYPE').isRequired()"/>"
							readonly="<s:property value="mbo.getMboValueData('TYPE').isReadOnly()"/>"
							value="<s:property value="mbo.getString('TYPE')"/>"
							maxlength="<s:property value="mbo.getMboValueData('TYPE').getLength()"/>"
							onchange="emm.core.setValue(this)"
					/>
					<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="TYPE"></a>
				</li>		
				<s:if test="!mbo.isNew()">									
					<li class="ui-field ui-details ui-readonly">
						<label><s:property value="mbo.getMboValueInfoStatic('STATUS').getTitle()" /></label>
						<p><s:property value="mbo.getString('STATUS')" /></p>
						<p><s:property value="mbo.getString('STATUSDATE')" /></p>
					</li>				
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('SITEID').getTitle()" /></label>
						<input type="text"
							readonly="true"
							value="<s:property value="mbo.getString('SITEID')" />"
						/>
					</li>
					<li class="ui-field">
						<label><s:property value="mbo.getMboValueInfoStatic('FAILURECODE').getTitle()" /></label>
						<input type="text"
								id="FAILURECODE" 
								required="<s:property value="mbo.getMboValueData('FAILURECODE').isRequired()"/>"
								readonly="<s:property value="mbo.getMboValueData('FAILURECODE').isReadOnly()"/>"
								value="<s:property value="mbo.getString('FAILURECODE')"/>"
								onchange="emm.core.setValue(this)"
						/>
						<a class="ui-arrow" onclick="emm.core.lookup(this)" data-field="FAILURECODE" data-source="FAILURECODE" data-display="FAILURECODE,FAILURECODE.DESCRIPTION,ORGID" data-search="FAILURECODE"></a>
					</li>
				</s:if>
		
			</ul>
			<s:if test="hierarchyMboList.size()>0">
				<p class="ui-section"><s:text name="location.systems"/></p>
				<div>
					<ul class="ui-listview">
						<s:include value="hierarchypagination.jsp"/>
					</ul>
					<s:iterator value="hierarchyMboList">
						<ul class="ui-listview ui-inset">
							<li class="ui-divider"><s:property value="getString('SYSTEMID')"/></li>
							<li class="ui-field">
								<label><s:property value="getMboValueInfoStatic('NETWORK').getTitle()" /></label>
								<input type="checkbox"
										id="NETWORK" 
										required="<s:property value="getMboValueData('NETWORK').isRequired()"/>"
										readonly="true"
										value="<s:property value="getString('NETWORK')"/>"
								/>
							</li>
							<%-- <li>
								<a href="listparents.action?id=<s:property value='getMboSet("$CHILDRENZ","LOCHIERARCHY",
											"systemid=:systemid and location=:location").moveFirst().getUniqueIDValue()'/>">
									<img src="../images/relatedrecords.png" />
									<h3><s:text name="location.parents"/></h3>
									<span class="ui-bubble"><s:property value="getMboSet('LOCHIERARCHY_PARENTS').count()"/></span>
									<span class="ui-arrow"></span>
								</a>
							</li> --%>
							<li>
								<a href="listparents.action?id=<s:property value='getUniqueIDValue()'/>">
									<img src="../images/relatedrecords.png" />
									<h3><s:text name="location.parents"/></h3>
									<span class="ui-bubble"><s:property value="getMboSet('LOCHIERARCHY_PARENTS').count()"/></span>
									<span class="ui-arrow"></span>
								</a>
							</li>
							<%-- <li>
								<a href="listchildren.action?id=<s:property value='getMboSet("$CHILDRENZ","LOCHIERARCHY",
											"systemid=:systemid and location=:location").moveFirst().getUniqueIDValue()'/>">
									<img src="../images/relatedrecords.png" />
									<h3><s:text name="location.children"/></h3>
									<span class="ui-bubble"><s:property value="getMboSet('LOCHIERARCHY_CHILDREN').count()"/></span>
									<span class="ui-arrow"></span>
								</a>
							</li> --%>
							<li>
								<a href="listchildren.action?id=<s:property value='getUniqueIDValue()'/>">											
									<img src="../images/relatedrecords.png" />
									<h3><s:text name="location.children"/></h3>
									<span class="ui-bubble"><s:property value="getMboSet('LOCHIERARCHY_CHILDREN').count()"/></span>
									<span class="ui-arrow"></span>
								</a>
							</li>
						</ul>
					</s:iterator>
					<ul class="ui-listview">
						<s:include value="hierarchypagination.jsp"/>
					</ul>
				</div>
			</s:if>
			
			<s:if test="!mbo.isNew()">
				<s:include value="actions.jsp"/>	
			</s:if>
		</div>
	</div>	
</body>
</html>
