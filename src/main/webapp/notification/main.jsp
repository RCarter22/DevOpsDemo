<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html ng-app="notification" ng-controller="NotificationController" ng-cloak>
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
	<script src="../javascript/angular.min.js" type="text/javascript"></script>
	<script type="text/javascript">
		angular.module('notification', []).controller('NotificationController', function($scope, $http){
			$scope.notifications = [];
			$(".timeago").livequery(function(){$(this).timeago()});
			
			$scope.loadingVisible = true;
			$scope.showLoadMore = false;
			$scope.showNoRecords = false;
			
			$scope.$watch('loadingVisible', function(value){
				if (value == true)
					emm.ui.loader.show();
				else
					emm.ui.loader.hide();
			});
			
			function showNotifications(data){
				if (data.length>0){
					$scope.notifications = $.merge($scope.notifications, data);
					$scope.showLoadMore = true;
					$scope.showNoRecords = false;
				} else {
					$scope.showLoadMore = false;
					if($scope.notifications.length === 0)
						$scope.showNoRecords = true;
				}		
				$scope.loadingVisible = false;
			}
			function onError(){
				$('.ui-content').prepend('<div class="ui-statusbar ui-statusbar-a"><h3 class="ui-title"><s:text name="global.errordownloading"/></h3></div>');
			}
			
			var url = 'list.action';
			$http.get(url)
				.success(showNotifications)
				.error(onError);			
			
			$scope.openDialog = function(e, n){
				$scope.notification = null;
                $scope.notification = angular.copy(n);
				$scope.notification.time = $.timeago($scope.notification.time);			
				var dialog = emm.util.dialog('#notificationdialog');
				dialog.show();
				if (!n.hasRead){
					$http({
					    method: 'POST',
					    url: 'markread.action',
					    data: $.param({pushId:n.id}),
					    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
					})
					.success(function(data){
						$('#'+n.id).removeClass('ui-message-b');
					});
				}				
			}
			
			$scope.offset = 0;
			$scope.loadMore = function(){
				$scope.loadingVisible = true;
				$scope.showLoadMore = false;
				$http.get(url, {params:{offset:++$scope.offset}})
					.success(showNotifications)
					.error(onError);	
			}
		});
	</script>
</head>
<body>
	<div class="ui-page">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" onclick="emm.core.back()"><span class="emm-chevron-left"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.notification"/></h3>			
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<ul class="ui-listview" ng-repeat="n in notifications">
				<li id="{{n.id}}" ng-class="{'ui-message-b':!n.hasRead}">
					<a ng-click="openDialog($event, n);">
						<p class="ui-aside"><strong><abbr class="timeago" title="{{n.time}}"></abbr></strong></p>					
						<h3>{{n.alert}}</h3>
						<p>{{n.details}}</p>
						<span class="ui-arrow"></span>
					</a>
				</li>
			</ul>
			<div ng-show="showLoadMore==true" class="ui-message ui-message-c">
				<a ng-click="loadMore()">
					<p></p>
					<h3 style="text-align:center;"><s:text name="global.loadmore"/></h3>
					<p></p>
				</a>
			</div>
			<div ng-show="showNoRecords==true" class="ui-statusbar ui-statusbar-c">	
				<h3 class="ui-title"><s:text name="global.norecords"/></h3>
			</div>
		</div>
	</div>
	<div id="notificationdialog" class="ui-dialog">
		<div class="ui-container">
			<div class="ui-header">
				<h1 class="ui-title"><s:text name="ezmaxmobile.notification"/></h1>
			</div>
			<div class="ui-content">
				<p>{{notification.time}}</p>
				<p>{{notification.alert}}</p>
				<p>{{notification.details}}</p>
				<div class="ui-btn-container">
					<a class="ui-btn-a" href="../{{notification.openlink}}"><s:text name="global.openlink"/></a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
