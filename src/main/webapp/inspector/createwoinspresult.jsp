<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html ng-app="emm" ng-controller="CreatewoInspResultController" ng-cloak>
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
	<script src="../javascript/angular.min.js" type="text/javascript"></script>
</head>
<body>
	<form id="createWoForm" action="createworkorder.action" method="post">
		<div class="ui-page" data-rememberscroll="true">
			<s:include value="../common/menu.jsp"/>
			<div class="ui-header">
				<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
				<h3 class="ui-title"><s:text name="inspection.createworkorder"/></h3>
				<a class="ui-btn-right ui-btn-c" ng-click="submitResultLists()"><span class="emm-floppy-o"></span></a>
				<s:include value="../common/statusbar.jsp"/>
			</div>
		
			<div class="ui-content">
				<div class="ui-message ui-message-b" style="text-align:center;">
					<h3><s:text name="inspection.selecthelp"/></h3>
				</div>

				<ul insp-pagination class="ui-listview" ></ul>
				
				<ul class="ui-listview" id="inspresult">
					<li style="background: #e8e8e8;">
						<a ng-click="toggleAllSelections()" style="float:right;margin:5px 20px 5px 0px; padding:0 !important;"><span class="emm-check-square-o"></span></a>
					</li>
					
					<li ng-repeat="row in inspresultlist track by $index" id="{{$index}}" ng-show="$index >= pagination.fromIndex() && $index <= pagination.toIndex()">
						<a ng-click="toggleSelection(row)" style="padding-right:18%">
							<p class="ui-wrap"><big>{{row.INSPQUESTION}}</big></p>							
							<h3 class="ui-wrap">{{row.RESPONSE}} <s:property value="getLineSeparator()"/></h3>
						</a>
						<a class="ui-checklistbutton" ng-class="{'ui-checklistbutton-on' : row.REQUESTED == 1, 'ui-checklistbutton-off' : row.REQUESTED == 0}" data-checked="{{row.REQUESTED == 1}}" ng-click="toggleSelection(row)"></a>									
					</li>
				</ul>
				
				<ul insp-pagination class="ui-listview" ></ul>
				
			</div>
		</div>
		<s:hidden name="inspDeficiencyList"/>
		<input type="hidden" name="inspDeficiencyList"/>
	</form>
	<script type="text/javascript">
 		angular.module('emm', []).controller('CreatewoInspResultController', function($scope, $http){
			$scope.inspresultlist = JSON.parse($("#inspDeficiencyList").val());
 	 		$scope.submitResultLists = function() {
 	 			var valueList = [];
	 			angular.forEach($scope.inspresultlist, function(ir, irIndex) {
	 				if (ir.REQUESTED == '1') {
	 					valueList.push(ir);
	 				}
				});	         

 	 			emm.core.back();
 	   			$('input[name="inspDeficiencyList"]').val(JSON.stringify(valueList));
 	 			$('#createWoForm').submit();    
 			}
			$scope.toggleSelection = function (inspresult) {
				inspresult.REQUESTED = (inspresult.REQUESTED === '1') ? '0' : '1';
			}
			$scope.toggleAllSelections = function() {
				var checkAll = true;
				angular.forEach($scope.inspresultlist, function(ir, irIndex) {
					if (ir.REQUESTED == '0')
						checkAll = false;
				});

				angular.forEach($scope.inspresultlist, function(ir, irIndex) {
					ir.REQUESTED = (checkAll) ? '0' : '1';
				});
			} 	 		
			$scope.pagination = {
				title: '<s:text name="pagination.pagetotal"/>',
				currentPageNum: 1,
				pageSize: 20,
				total: $scope.inspresultlist.length,
				totalPageNum: function(){
					try{
						return Math.ceil(this.total/this.pageSize);
					} catch(err) {
						return 1;
					}
				},
				getTitle: function(){
					return this.title.format([this.currentPageNum, this.totalPageNum(), this.total]);
				},				
				prev: function(){
					this.currentPageNum--;
				},
				next: function(){
					this.currentPageNum++;
				},
				hasNext: function(){
					return (this.currentPageNum + 1) <= this.totalPageNum();
				},
				hasPrev: function(){
					return (this.currentPageNum - 1) > 0;
				},
				toIndex: function(){
					return this.currentPageNum * this.pageSize -1;
				},				
				fromIndex: function(){
					return this.currentPageNum * this.pageSize - this.pageSize;
				}
			};
		});
 		
		angular.module('emm').directive('inspPagination', function() {
			return {
				restrict: 'A',
				template: "<li class='ui-pagination' ng-show='pagination.totalPageNum() > 1'>" +
						"<a class='ui-pagination-prev' ng-show='pagination.hasPrev()' ng-click='pagination.prev()'><span class='ui-arrow'></span></a>" +
						"<h3 class='title'>{{pagination.getTitle()}}</h3> " + 
						"<a class='ui-pagination-next' ng-show='pagination.hasNext()' ng-click='pagination.next()'><span class='ui-arrow'></span></a>" +
						"</li>"
			};
		});
	</script>
	
</body>
</html>
