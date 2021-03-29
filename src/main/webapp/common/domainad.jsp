<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="e" uri="https://www.owasp.org/index.php/OWASP_Java_Encoder_Project" %>

<!DOCTYPE html>
<html ng-app="domain" ng-controller="DomainController">
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
	<script src="../javascript/angular.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		function toggleFilterView(){
			$('#emm_domainform, #emm_list').toggle();
			$('.ui-filter').toggleClass('ui-filter-on ui-filter-off');
			return false;
		}
		function resetadFilter(){
			$.each($('#emm_filterform input'), function(i, e){
				$(e).val('');
			});
			$('#resetFilter').val(true);
			$('#emm_domainform').submit();
			return false;	
		}
		
		angular.module('domain', []).controller('DomainController', function($scope, $http){
			var dialog = null;
			
			var searchLookupFlds = '<e:forJavaScript value="${searchLookupFlds}" />',
				lookupMbo = '<e:forJavaScript value="${lookupMbo}" />',
				lookupMboId = '<e:forJavaScript value="${lookupMboId}" />',
				fieldName = '<e:forJavaScript value="${fieldName}" />';
			
			if (searchLookupFlds)
				$scope.lookups = $.parseJSON(searchLookupFlds);				
			else
				$scope.lookups = {};
			
			$scope.pagination = {
				title: '<s:text name="pagination.pagetotal"/>',
				currentPageNum: 1,
				pageSize: 20,
				getTitle: function(){
					return this.title.format([this.currentPageNum, this.totalPageNum, this.total]);
				},				
				prev: function(){
					this.currentPageNum--;
					$scope.lookupDomain();
				},
				next: function(){
					this.currentPageNum++;
					$scope.lookupDomain();
				},
				hasNext: function(){
					return (this.currentPageNum + 1) <= this.totalPageNum;
				},
				hasPrev: function(){
					return (this.currentPageNum - 1) > 0;
				}
			};
			$scope.lookupDomain = function(prop){
				if (prop) {
					$scope.prop = prop;	
					$scope.pagination.currentPageNum = 1;
				}
				else 
					prop = $scope.prop;
				
				var data = {						
						lookupMbo: lookupMbo, 
						lookupMboId: lookupMboId,
						'pagination.currentPageNum': $scope.pagination.currentPageNum,
						'pagination.pageSize': $scope.pagination.pageSize,
						searchLookupFlds: $scope.lookups[prop],
						fieldName: fieldName,
						lookupSourceField: prop
					};
				
				emm.ui.loader.show();
				$http.get('filterlookup.action', {params:data})
					.success(function(data){						
						if (data.errMsg){
							alert(data.errMsg);
						} else {
							emm.ui.loader.hide();
							$scope.list = data.valuelist;
							$.extend($scope.pagination, data.pagination);
							$scope.field = prop;
							dialog = emm.util.dialog('#valuelist');							
						}						
					})
					.error(function(){
						emm.ui.loader.hide();
					});				
			}
			$scope.selectValue = function(prop, val){
				dialog.close();
				$('[name="' + prop + '"]').val(val);
			}
		});
		
	</script>
</head>
<body>
	<div class="ui-page">	
		<div class="ui-header ui-header-b">
			<a class="ui-btn-left" href="gotourl.action?currentAction=<e:forUriComponent value="${currentAction}" />"><span class="emm-times-circle"></span></a>
			<h3 class="ui-title"><s:text name="global.selectvalue"/></h3>
			<a class="ui-btn-right" href="prepareQbe.action?currentAction=<e:forUriComponent value="${currentAction}" />"><span class="emm-check"></span></a>
		</div>				
		<%--<div class="ui-searchbar">
			<form method="post">				
				<s:hidden name="searchFlds"/>
				<s:hidden name="fieldName"/>
				<s:hidden name="updateField"/>
				<s:hidden name="dispFlds"/>
				<s:hidden name="lookupSourceField"/>
				<s:hidden name="currentAction"/>
				<s:hidden name="lookupMbo"/>
				<s:hidden name="lookupMboId"/>
				<input type="search" placeholder="<s:text name="global.search"/>" name="search" value="<e:forHtml value="${search}" />"/>	
			</form>					
		</div>--%>

		<div class="ui-toolbar ui-toolbar-b">
			<div class="ui-container">
				<a href="#" onclick="toggleFilterView();"><div class="ui-filter ui-filter-off"></div><s:text name="global.filter"/></a>
			</div>
		</div>
		<div class="ui-content">
			<s:form id="emm_domainform" data-visible="false" action="domain" method="post">		
				<s:hidden name="searchFlds"/>
				<s:hidden name="searchLookupFlds"/>
				<s:hidden name="fieldName"/>
				<s:hidden name="updateField"/>
				<s:hidden name="dispFlds"/>
				<s:hidden name="lookupSourceField"/>
				<s:hidden name="currentAction"/>
				<s:hidden name="lookupMbo"/>
				<s:hidden name="lookupMboId"/>
				<s:hidden id="resetFilter" name="resetFilter"/>
				<ul id="emm_filterform" class="ui-listview ui-inset">					
					<s:if test="search neq null && search neq ''">
						<li class="ui-field ui-readonly">
							<label><s:text name="global.quicksearch" /></label>
							<input type="text" readonly="true" value="<e:forHtml value="${search}" />"/>
						</li>						
					</s:if>	
					<s:iterator value="filterListad">
						<li class="ui-field">
							<label><e:forHtml value="${filterDisplayName}" /></label>
							<input type="text" name="<e:forHtml value="${filterName}" />" value="<e:forHtml value="${filterValue}" />"/>
							<a class="ui-arrow" ng-show="lookups.hasOwnProperty('<e:forJavaScript value="${filterName}" />')" ng-click="lookupDomain('<e:forJavaScript value="${filterName}" />')" data-display="{{lookups['<e:forJavaScript value="${filterName}" />']}}"></a>
						</li>
					</s:iterator>
					<s:hidden name="search"/>				
				</ul>	
				<div class="ui-btn-container" style="width: 300px; margin: 0 auto;">
					<a class="ui-btn-b" onclick="resetadFilter();"><s:text name="global.reset"/></a>
					<input class="ui-btn-a" type="submit" value="<s:text name="global.apply"/>"/>								
				</div>				
			</s:form>	
		</div>			
		<div id="emm_list" class="ui-content">
			<s:if test="search neq null && search neq ''">
				<div class="ui-statusbar">
					<h3 class="ui-title"><s:text name="global.quicksearch" />: <e:forJavaScript value="${search}" /></h3>
				</div>
			</s:if>
			<s:iterator value="filterListad">
				<s:if test="filterValue neq ''">
					<div class="ui-statusbar">
						<h3 class="ui-title"><e:forJavaScript value="${filterDisplayName}" />: <e:forJavaScript value="${filterValue}" /></h3>
					</div>
				</s:if>
			</s:iterator>
			<s:include value="../common/statusbar.jsp"/>
			<ul class="ui-listview">
				<s:include value="../common/pagination.jsp"/>	
				<s:iterator value="mboList">
					<li>
						<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="<e:forHtml value="${fieldNameAD}"/>">
							<s:iterator value="displayValues" status="status">
								<s:if test="#status.index == 0 ">
									<h3><s:property value="getString(displayValues[#status.index])"/></h3>
								</s:if>
								<s:else>
									<p><s:property value="getMboValueInfoStatic(displayValues[#status.index]).getTitle()"/>: <s:property value="getString(displayValues[#status.index])"/></p> 
								</s:else>
							</s:iterator>
						</a>
						<a onclick="emm.core.toggleSelection(this)" data-id="<s:property value="getUniqueIDValue()"/>" data-mbo="<e:forHtml value="${fieldNameAD}"/>" class="ui-checklistbutton" data-checked="<s:property value="isSelected()"/>"></a>
					</li>
				</s:iterator>
				<s:include value="../common/pagination.jsp"/>
			</ul>
		</div>
	</div>	
	<div id="valuelist" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"></h1>
			</div>
			<div class="ui-content">
				<ul class="ui-listview">
					<li class="ui-pagination">
						<a class="ui-pagination-prev" ng-show="pagination.hasPrev()" ng-click="pagination.prev()"><span class="ui-arrow"></span></a>
						<h3 class="title">{{pagination.getTitle()}}</h3>
						<a class="ui-pagination-next" ng-show="pagination.hasNext()" ng-click="pagination.next()"><span class="ui-arrow"></span></a>
					</li>
					<li ng-repeat="row in list">
						<a ng-click="selectValue(field, row[field])" data-modal="dialog">							
							<h3>{{row[field]}}</h3>
							<p ng-repeat="(k, v) in row" ng-if="$index!=0">{{row[$index]}}</p>
						</a>						
					</li>
					<li class="ui-pagination">
						<a class="ui-pagination-prev" ng-show="pagination.hasPrev()" ng-click="pagination.prev()"><span class="ui-arrow"></span></a>
						<h3 class="title">{{pagination.getTitle()}}</h3>
						<a class="ui-pagination-next" ng-show="pagination.hasNext()" ng-click="pagination.next()"><span class="ui-arrow"></span></a>
					</li>
				</ul>
			</div>
		</div>
	</div>	
</body>
</html>