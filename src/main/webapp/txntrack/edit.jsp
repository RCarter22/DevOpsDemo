<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html ng-app="emm" ng-controller="MainController" ng-cloak>
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
	<script type="text/javascript" src="../javascript/angular.min.js"></script>
</head>
<body>
	<div class="ui-page ui-inset">	
		<div class="ui-header">
			<h3 class="ui-title">Edit and Reprocess</h3>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<s:form action="transaction_doEdit.action" method="post">
			<s:hidden name="currentAction"/>
			<s:hidden name="transaction.entityName"/>
			<s:hidden name="transaction.transactionId"/>
			<div class="ui-content ui-content-narrow">
				<s:hidden name="transaction.txRequest"/>			
				<ul class="ui-listview">				
					<li class="ui-field" ng-repeat="(key, value) in transaction[entityName][0]">
						<label>{{key}}</label>
						<input ng-model="transaction[entityName][0][key]" />
					</li>
                </ul>
				<ul class="ui-listview">
					<li class="ui-field-block">
						<label>Memo</label>
						<textarea id="transaction.memo" name="transaction.memo"><s:property value="transaction.memo"/></textarea>
					</li>
                </ul>
				<div class="ui-btn-container">
					<a class="ui-btn-b" href="<s:property value="currentAction"/>"><s:text name="global.cancel"/></a>
					<input class="ui-btn-a" type="submit" ng-click="save()" value="<s:text name="global.ok"/>">
				</div>
			</div>
		</s:form>
	</div>	
	<script type="text/javascript">
		angular.module('emm', []).controller('MainController', ['$scope', function($scope) {
			$scope.transaction = JSON.parse($('[name="transaction.txRequest"]').val());
			$scope.entityName = $('[name="transaction.entityName"]').val();
			
			$scope.save = function(){
				console.log($scope.transaction);
				$('[name="transaction.txRequest"]').val(JSON.stringify($scope.transaction));
			}
		}]);
	</script>	
</body>
</html>
