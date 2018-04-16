<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

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
		function resetFilter(){
			$.each($('#emm_filterform input'), function(i, e){
				$(e).val('');
			});
			$('#emm_domainform').submit();
			return false;	
		}
		
		angular.module('domain', []).controller('DomainController', function($scope, $http){
			var dialog = null;
			
			var searchLookupFlds = '<s:property value="searchLookupFlds" escapeHtml="false"/>',
				lookupMbo = '<s:property value="lookupMbo" />',
				lookupMboId = '<s:property value="lookupMboId" />',
				fieldName = '<s:property value="fieldName" />';
			
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
			<a class="ui-btn-left" href="<s:property value='currentAction'/>"><s:text name="global.cancel"/></a>
			<h3 class="ui-title"><s:text name="global.selectvalue"/></h3>
			<a class="ui-btn-right" onclick="emm.core.ezlookup()"><img src="../images/barcode.png"/></a>
			<s:include value="../common/statusbar.jsp"/>
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
				<input type="search" placeholder="<s:text name="global.search"/>" name="search" value="<s:property value="search"/>"/>	
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
				<ul id="emm_filterform" class="ui-listview ui-inset">					
					<s:if test="search neq null && search neq ''">
						<li class="ui-field ui-readonly">
							<label><s:text name="global.quicksearch" /></label>
							<input type="text" readonly="true" value="<s:property value="search" />"/>
						</li>						
					</s:if>	
					<s:iterator value="filterList">
						<li class="ui-field">
							<label><s:property value="filterDisplayName" /></label>
							<input type="text" name="<s:property value="filterName" />" value="<s:property value="filterValue" />"/>
							<a class="ui-arrow" ng-show="lookups.hasOwnProperty('<s:property value="filterName" />')" ng-click="lookupDomain('<s:property value="filterName" />')" data-display="{{lookups['<s:property value="filterName" />']}}"></a>
						</li>
					</s:iterator>
					<s:hidden name="search"/>				
				</ul>	
				<div class="ui-btn-container" style="width: 300px; margin: 0 auto;">
					<a class="ui-btn-b" style="width: 120px; padding: 0;" onclick="resetFilter();"><s:text name="global.reset"/></a>
					<input class="ui-btn-a" type="submit" value="<s:text name="global.apply"/>"/>								
				</div>				
			</s:form>	
		</div>			
		<div id="emm_list" class="ui-content">
			<s:if test="search neq null && search neq ''">
				<div class="ui-statusbar">
					<h3 class="ui-title"><s:text name="global.quicksearch" />: <s:property value="search" /></h3>
				</div>
			</s:if>
			<s:iterator value="filterList">
				<s:if test="filterValue neq ''">
					<div class="ui-statusbar">
						<h3 class="ui-title"><s:property value="filterDisplayName" />: <s:property value="filterValue" /></h3>
					</div>
				</s:if>
			</s:iterator>
			<s:if test="lookupList.size == 0">
				<div class="ui-statusbar ui-statusbar-c">	
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:if>
			<ul class="ui-listview">
				<s:include value="../common/pagination.jsp"/>	
				<s:iterator value="lookupList">
					<li>
						<a onclick="emm.core.setLookupValue('<s:property value='fieldName'/>','<s:property value="lookupSourceFieldValue"/>','<s:property value='currentAction'/>','<s:property value='lookupMbo'/>','<s:property value='lookupMboId'/>','<s:property value='updateField'/>','<s:property value='lookupSourceField'/>','<s:property value='uniqueId'/>')">
							<s:iterator value="displayValues" status="status">
								<s:if test="#status.index == 0 ">
									<h3><s:property value="%{displayValues[#status.index]}"/></h3>
								</s:if>
								<s:else>
									<p><s:property value="%{displayValues[#status.index]}"/></p>
								</s:else>
							</s:iterator>
						</a>
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