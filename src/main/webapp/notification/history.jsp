<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="e" uri="https://www.owasp.org/index.php/OWASP_Java_Encoder_Project" %>

<!DOCTYPE html>
<html ng-app="notification" ng-controller="NotificationController">
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
	<script src="../javascript/angular.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		angular.module('notification', []).controller('NotificationController', function($scope, $http){
			$scope.notifications = [];
			$(".timeago").livequery(function(){$(this).timeago()});
			
			// Hide 'back' button if this view is opened from external application
			$scope.client = '<e:forJavaScript value="${client}" />';
			$scope.loadingVisible = false;
			
			function showNotifications(data){
				if (data.length>0){
					$scope.notifications = $.merge($scope.notifications, data);
					$scope.loadingVisible = true;
				} else {
					$scope.loadingVisible = false;
				}		
			}
			function onError(){
				$('.ui-content').prepend('<div class="ui-statusbar ui-statusbar-a"><h3 class="ui-title"><s:text name="global.errordownloading"/></h3></div>');
			}
			
			var url = 'listhistory.action?refNum=<e:forJavaScript value="${refNum}" />&APIKey=<e:forJavaScript value="${APIKey}" />';
			
			$http.get(url,
					{headers: { 'Accept': 'application/json; application/json; charset=utf-8' }}
				)
				.success(showNotifications)
				.error(onError);			
			
			$scope.openDialog = function(e, n){
				$scope.notification = null;
                $scope.notification = angular.copy(n);
				$scope.notification.time = $.timeago($scope.notification.time);
				if (!n.hasRead){
					$http.post('markread.action', {pushId:n.id})
						.success(function(data){
	 						$('#'+n.id).removeClass('ui-message-b');
		 				});
				}				
			}
			
			$scope.offset = 0;
			$scope.loadMore = function(){
				$scope.loadingVisible = false;
				$http.get(url, {params:{offset:++$scope.offset}})
					.success(showNotifications)
					.error(onError);	
			}
		});
	</script>
</head>
<body>
	<div class="ui-page">
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()" ng-show="client=='emm'"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="notification.history"/></h3>
			<a class="ui-btn-right" onclick="window.location.reload();"><s:text name="global.refresh"/></a>			
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview" ng-repeat="n in notifications">
				<li id="{{n.id}}" ng-class="{'ui-message-b':!n.hasRead}">
					<span>
						<p class="ui-aside"><strong><abbr class="timeago" title="{{n.time}}"></abbr></strong></p>					
						<h3>{{n.alert}}</h3>
						<p>{{n.details}}</p>
						<span class="ui-arrow"></span>
					</span>
				</li>
			</ul>
			<div ng-show="loadingVisible==true" class="ui-message ui-message-c">
				<a ng-click="loadMore()">
					<p></p>
					<h3 style="text-align:center;"><s:text name="global.loadmore"/></h3>
					<p></p>
				</a>
			</div>
		</div>
	</div>
</body>
</html>
