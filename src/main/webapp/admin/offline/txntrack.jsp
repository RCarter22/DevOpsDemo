<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<link href="resources/css/datepicker.css" rel="stylesheet" type="text/css" />

<!-- Offline Class Files -->
<script src="offlineclassjs.action" type="text/javascript"></script>

<!-- Localization Files -->
<script src="localizationjs.action" type="text/javascript"></script>

<style>
.modal-body .form-group{
	margin-bottom: 5px;
}

input[type="text"]:disabled {
	background: transparent;
}

.ui-datepicker {
	position: absolute;
	width: 24px;
	height: 24px;
	right: 20px;
	top: 10%;
	padding: 0;
	margin: 0;
	font: normal normal 24px ezmaxmobile;
	color: #195ea8;
	z-index: 100;
}

@media (max-width: 768px) {
	.ui-datepicker {
		top: auto;
		bottom: 10%;
	}
}

.ui-datepicker:before {
	content: "\e0a3";
}

.ui-spinner .ui-button {
	z-index: 1000;
	display: block;
	position: absolute;
	top: 50%;
	border-radius: 18px;
	-webkit-border-radius: 18px;
	margin-top: -0.33em;
	width: .75em;
	height: .75em;
	text-align: center;
	font-weight: bold;
	font-size: 36px;
	line-height: .75em;
	cursor: pointer;
	padding: 0;
	border-width: 1px;
	border-style: solid;
	border-color: #b7b7b7;
	color: #888;
	text-shadow: 0 -1px 1px #333;
}

.ui-spinner button .plus {
	width: 21px;
	height: 4px;
	background: #888;
	position: absolute;
	left: 2px;
	top: 11px;
}

.ui-spinner button .plus::after {
	content: '';
	position: absolute;
	width: 4px;
	height: 21px;
	background: #888;
	left: 8.5px;
	top: -9px;
}

.ui-spinner button .minus {
	width: 21px;
	height: 4px;
	background: #888;
	position: absolute;
	left: 2px;
	top: 11px;
}

.ui-spinner .ui-btn-down {
	right: 40px;
}

.ui-spinner .ui-btn-up {
	right: 5px;
}
</style>
<script type="text/javascript">
	// EMM Default Settings
 	emm.setDefaults({
		eSigEnabled:false,
		language: $('#lang').val(),
		locale: $('#locale').val(),
		userInfo: $('#userInfo').val()
	});
</script>

<s:hidden id="lang" value="user.getLanguage()"/>
<s:hidden id="locale" value="user.getLocale()"/>
<s:hidden id="userInfo" value="user.getUserInfo()"/>

<div class="wrapper wrapper-content animated fadeInRight" ng-controller="ListTxnTrackCtrl">
	<div class="row">
		<div class="col-lg-12">
		    <div class="ibox">
		        <div class="ibox-title">
		        	<div class="row">
		        		<div class="col-lg-9">
		        			<h5><s:text name="ezmaxmobile.txntrack"/></h5>
		        		</div>	
					</div>
		        </div>
		        <div class="ibox-content">    	
					<div class="row">
						<div class="form-group col-md-6 col-lg-6">
							<label class="control-label col-md-3 col-lg-3"><s:text name="admin.offline.txn.user"/></label>
							<div class="col-md-9 col-lg-9">
								<div class="input-group">
									<input type="text" class="form-control" ng-model="search.userid" />
								    <span class="input-group-btn">
										<button class="btn btn-default" type="button" ng-click="lookupUser()"><i class="fa fa-external-link"></i></button>
									</span>
								</div>		          	
							</div>
						</div>
						<div class="form-group col-md-6 col-lg-6">
							<label class="control-label col-md-3 col-lg-3"><s:text name="admin.offline.txn.daterange"/></label>
							<div class="col-md-9 col-lg-9">
								<div class="input-group">
									<input type="daterange" name="search_daterange" class="form-control" ng-model="search.dateRange"/>
								    <span class="input-group-btn">
										<button class="btn btn-default" type="button" ng-click="selectDateRange()"><i class="fa fa-calendar"></i></button>
									</span>
								</div>		          	
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-md-6 col-lg-6">
							<label class="control-label col-md-3 col-lg-3"><s:text name="admin.offline.txn.showall"/></label>						
							<div class="col-md-9 col-lg-9">
								<checkbox class="pull-left" ng-true-value="true" ng-false-value="false" ng-model="search.includeAll"></checkbox>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="text-right">
							<button type="button" class="btn btn-default" ng-click="resetSearch()">
								<i class="fa"></i> <s:text name="admin.offline.txn.reset"/>
							</button>
							<button type="button" class="btn btn-primary m-sm" ng-click="getAllTransactions(1)">
								<i class="fa fa-search"></i> <s:text name="admin.offline.txn.search"/>
							</button>
						</div>
					</div>					
		        </div>
		    </div>
		</div>				    
	</div>
	
	<div class="row">
		<div class="col-lg-12">
	        <div class="ibox-content">
				<div class="row">
					<div class="table-responsive">
						<table class="table table-striped table-hover">
							<thead>
								<tr>
									<th ng-repeat="col in columnDefs" width="{{col.width}}">
										{{col.displayName}}
									</th>
								</tr>
							</thead>
							<tbody class="reactable-data" id="txtable">
								<tr dir-paginate="txn in allTxnTrack | itemsPerPage: maxSize" pagination-id="allTxnTrack" current-page="txntrackPagination.current">
									<td>{{txn.transactionId}}</td>
									<td>{{txn.txTimestamp}}</td>
									<td>{{txn.userId}}</td>
<!-- 									<td>{{txn.entityId}}</td> -->
									<td>{{txn.entityName}}</td>
									<td>
										<span class="label label-danger" style="display: inline-block;" ng-show="txn.status=='ERROR'"><i class="fa fa-times"></i></span>
										<span class="label label-primary" ng-show="txn.status=='PROCESSED'"><i class="fa fa-check"></i></span>
										{{txn.status}}									
									</td>
									<td>{{txn.responseMessage}}</td>
									<td>
							  			<i class="fa fa-edit fa-lg" ng-click="showDetails(txn.transactionId)"></i>
									</td>
								</tr>
							</tbody>
						</table>
						<dir-pagination-controls pagination-id="allTxnTrack" on-page-change="allTxnTrackPageChanged(newPageNumber)"></dir-pagination-controls>
					</div>
		        	<div class="row">
						<div class="col-lg-10">
							<ul class="row centered-form center-block pagination pagination-large" id="txnpager"></ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>

<script type="text/ng-template" id="view.html">					
	<div class="modal-header">
		<button type="button" class="close" ng-click="cancel()"><i class="fa fa-times"></i></button>
		<h4 class="modal-title"><s:text name="admin.offline.txn.viewtxn"/></h4>
	</div>
	<div class="modal-body">
		<form role="form" class="form-horizontal">
			<div class="form-group">
				<label class="control-label col-sm-5"><s:text name="admin.offline.txn.status"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="transaction.status" ng-disabled="true"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-5"><s:text name="admin.offline.txn.entityname"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="transaction.entityName" ng-disabled="true"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-5"><s:text name="admin.offline.txn.syncaction"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="transaction.syncAction" ng-disabled="true"/>
				</div>
			</div>
			<div class="form-group" ng-show = "transaction.status == 'ERROR'"">
				<label class="control-label col-sm-5"><s:text name="admin.offline.txn.message"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="transaction.responseMessage" ng-disabled="true"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-5"><s:text name="admin.offline.txn.txnid"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="transaction.transactionId" ng-disabled="true"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-5"><s:text name="admin.offline.txn.txnentityid"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="transaction.txEntityId" ng-disabled="true"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-5"><s:text name="admin.offline.txn.txnentityname"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="transaction.txEntityName" ng-disabled="true"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-5"><s:text name="admin.offline.txn.txntimestamp"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="transaction.txTimestamp" ng-disabled="true"/>
				</div>
			</div>
			<div class="form-group">
				<label class="control-label"><s:text name="admin.offline.txn.memo"/></label>
				<textarea class="form-control" ng-model="transaction.memo" ng-disabled="true" rows="3"/>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-default" ng-click="cancel()"><s:text name="admin.offline.txn.cancel"/></button>
		<button type="button" class="btn btn-info" ng-click="editTxn(transaction)"><s:text name="admin.offline.txn.edit"/></button>
		<button type="button" class="btn btn-danger" ng-click="deleteTxn()"><s:text name="admin.offline.txn.delete"/></button>
	</div>
</script>

<script type="text/ng-template" id="edit.html">					
	<div class="modal-header">
		<button type="button" class="close" ng-click="cancel()"><i class="fa fa-times"></i></button>
		<h4 class="modal-title"><s:text name="admin.offline.txn.edittxn"/></h4>
	</div>
	<div class="modal-body">
		<div class="ibox float-e-margins">
			<form role="form" class="form-horizontal">		
				<div class="row" ng-repeat="(key, value) in transaction[entityName][0]" class="form-group" ng-if="key != 'RN' && key != '_ID'">
					<div class="form-group" ng-if="txMBO.getDataType(key) == 'decimal'">
						<label class="control-label col-sm-5">{{key}}</label>
						<div class="col-sm-7">
							<input type="text" class="form-control" id = "{{key}}" ng-model="transaction[entityName][0][key]" data-control="spinner" data-interval="0.25"/>
						</div>
					</div>
					<div class="form-group" ng-if="txMBO.getDataType(key) == 'int'">
						<label class="control-label col-sm-5">{{key}}</label>
						<div class="col-sm-7">
							<input type="text" class="form-control" id = "{{key}}" ng-model="transaction[entityName][0][key]" data-control="spinner" data-interval="1"/>
						</div>
					</div>
					<div class="form-group" ng-if="(txMBO.getDataType(key) == 'time') || (txMBO.getDataType(key) == 'date' || key.indexOf('DATE')>-1 || key.indexOf('TIME')>-1 || key.indexOf('TIME')>-1 || key.endsWith('START') || key.endsWith('FINISH'))">
						<label class="control-label col-sm-5">{{key}}</label>
						<div class="col-sm-7">
							<input disabled="true" class="form-control" id = "{{key}}" type="text" ng-model="transaction[entityName][0][key]" ng-change="formatToISO(key)" date-format="datetime" ng-blur="formatToISO(key)"/>
                        	<a data-input="{{key}}" data-datetype="datetime" data-control="datepicker" class="ui-datepicker"></a>
						</div>
					</div>
					<div class="form-group" ng-if="txMBO.getDataType(key) == 'description'">
						<label class="control-label col-sm-5">{{key}}</label>
						<div class="col-sm-7">
							<textarea class="form-control" ng-model="transaction[entityName][0][key]" rows="4"></textarea>
						</div>
					</div>
					<div class="form-group" ng-if="(!txMBO.getDataType(key) || txMBO.getDataType(key) == 'string') && (key.indexOf('DATE')==-1 && key.indexOf('TIME')==-1 && !key.endsWith('START') && !key.endsWith('FINISH'))">
						<label class="control-label col-sm-5">{{key}}</label>
						<div class="col-sm-7">
							<input ng-disabled="key=='_ID'" type="text" class="form-control" ng-model="transaction[entityName][0][key]"/>
						</div>
					</div>
				</div>
				<hr />
				<div class="row">
					<div class="form-group">
						<label class="control-label col-sm-5"><s:text name="admin.offline.txn.memo"/></label>
						<div class="col-sm-7">
							<textarea class="form-control" id="transaction.memo" name="transaction.memo" rows="3">{{transaction.memo}}</textarea>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-default" ng-click="cancel()"><s:text name="admin.offline.txn.cancel"/></button>
		<button type="button" class="btn btn-primary" ng-click="saveTxn()" ng-if="transactionTemp.status == 'ERROR' || transactionTemp.status == 'EDITED'"><s:text name="admin.offline.txn.save"/></button>
	</div>
</script>

<script type="text/ng-template" id="user.html">					
	<div class="modal-header">
		<button type="button" class="close" ng-click="cancel()"><i class="fa fa-times"></i></button>
		<h4 class="modal-title"><s:text name="admin.offline.txn.user"/></h4>
	</div>
	<div class="modal-body">
		<div class="row" style="margin-bottom: 20px">					
			<div class="input-group">
				<input class="form-control" id="system-search" name="q" placeholder="Search by User ID, Name" required>
				<span class="input-group-btn">
					<a class="btn btn-default" ><i class="fa fa-search"></i></a>
				</span>
			</div>
		</div>
		<div class="row">
		   	<table class="table table-striped table-hover table-list-search">
		   		<thead>
					<tr>
					</tr>
				</thead>
				<tbody class="reactable-data" id="newusertable" style="display: none;">
					<tr ng-repeat= "g in usergrid track by $index" index="{{$index}}" on-finish-render="ngRepeatFinishedNewUser()">
						<td style="text-align: center; width: 50px">
							<checkbox ng-model="g.checked" ng-click="singleSelect()"></checkbox>
						</td>
						<td>{{g.USERID}}</td>
						<td>{{g.DISPLAYNAME}}</td>
						<td></td>
					</tr>
				</tbody>
		   	</table>
	   	</div>
		<div class="row">
			<div class="col-md-10">
				<ul id="adduserpager"class="row centered-form center-block pagination pagination-large"></ul>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn btn-default" ng-click="cancel()"><s:text name="global.cancel"/></button>
	    <button type="button" class="btn btn btn-primary" ng-click="selectUser()"><s:text name="global.ok"/></button>
	</div>
</script>	

<script>
	EZMaxMobile.controller('ListTxnTrackCtrl', function ($scope, $rootScope, $http, $uibModal){

		$scope.currentPage = 1,
		$scope.maxSize = 10,
		$scope.transactions = [];
		var searchDefault = {
				includeAll: false,
				userid: null,
				dateRange: {
					startDate: moment(new Date()).subtract(30, 'days'),
					endDate: new Date()
				}
			};
		$scope.search = angular.copy(searchDefault);

		$scope.txntrackPagination = {
	        current: 1
	    };

	    $scope.txntrackPageChanged = function(newPage) {
	    	$scope.getActiveUser(newPage);
	    };

		$scope.columnDefs = [					
				{ displayName:'Transaction ID', width: 25 },
				{ displayName:'Transaction Date', width: 100 },
				{ displayName:'User Id', width: 50 },
// 				{ displayName:'Entity ID', width: 100 },
				{ displayName:'Entity Name', width: 100 },
				{ displayName:'Status', width: 100 },
				{ displayName:'Message', width: 100 },
				{ displayName:'Edit', width: 50 },
			];
		
		$scope.getAllTransactions = function(pageNumber){			
			var params = {
				page: pageNumber
			};
		    $http({
				url : 'txntracklist.action',
				params : $.extend(params, $scope.search),
				method: 'GET',
			})
			.success(function(response){
				$scope.allTxnTrack = response;
			})
			.error(function(err){
				$scope.showError(err.message);
			});
		}
		
		$scope.showDetails = function(entity){			
			var modalInstance = $uibModal.open({
				templateUrl : 'view.html',
				controller : 'ViewTxnTrackCtrl',
				scope: $scope,
				resolve : {
					params : function() {
						return entity;
					}
				}
			});
			
		};

		$scope.getAllTransactions(1);
		
		$rootScope.$on('refresh-txn-list', function () {
			$scope.getAllTransactions(1);
        });
		
		$scope.lookupUser = function(){
			var modalInstance = $uibModal.open({
				templateUrl : 'user.html',
				controller : 'userCtrl',
				scope: $scope,
			});
		};
		
		$scope.setLookupUser = function(users){
			$scope.search.userid = users.join(',');
		}		
		
		$scope.selectDateRange = function(){
			$('[name="search_daterange"]').trigger('click');
		}
		
		$scope.resetSearch = function(){
			$scope.search = angular.copy(searchDefault);
			$scope.getAllTransactions(1);
			
			var $element = $('[name="search_daterange"]').data('daterangepicker');
			$element.setStartDate($scope.search.dateRange.startDate);
			$element.setEndDate($scope.search.dateRange.endDate);
		}
	});
	
	EZMaxMobile.controller('ViewTxnTrackCtrl', function ($scope, $rootScope, $http, $uibModalInstance, $uibModal, params){
		
		$scope.transactionId = params;
		
		$scope.columnDefs = [
				{ displayName:'Transaction ID', field:'transactionId', width: 100 },	
				{ displayName:'Entity ID', field:'entityId', width: 100 },
				{ displayName:'Entity Name', field:'entityName', width: 100 },				
				{ displayName:'User ID', field:'userId', width: 100 },
			];
		
		$scope.getTransactionInfo = function(){
		    $http({
				url : 'gettransaction.action?transactionId=' + $scope.transactionId,
				method: 'GET',
			})
			.success(function(response){
				$scope.transaction = response;
			})
			.error(function(err, status){
				$scope.showError(err.message);
			});
		}
		
		$scope.editTxn = function(entity){
			$scope.cancel();
			var modalInstance = $uibModal.open({
				templateUrl : 'edit.html',
				controller : 'EditTxnTrackCtrl',
				scope: $scope.$parent,
				resolve : {
					params : function() {
						return entity;
					}
				}
			});
			
			setTimeout(function(){
				emm.ui.init();
				emm.ui.postInit();
			}, 1);			
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
		
		$scope.deleteTxn = function(){
			var fd = new FormData();
			fd.set("transactionId", $scope.transactionId);
			$http({
				method : 'POST',
				url : 'txntrackdelete',
				headers : {'Content-Type': undefined},
				data : fd
			})
			.success(function(data){
				$scope.showSuccess('Transaction Deleted');
				$rootScope.$broadcast('refresh-txn-list');
				$scope.cancel();
			})
			.error(function(data){
				$scope.showError(data.message);
			});
		}
					
		$scope.transaction = $scope.getTransactionInfo();
		
	});
	
	EZMaxMobile.controller('EditTxnTrackCtrl', function ($scope, $rootScope, $http, $uibModalInstance, params){

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
		
		$scope.transactionTemp = params;		
		if (String.isNullOrEmpty($scope.transactionTemp.txRequest)){
			$scope.showInfo("Transaction already edited");
			setTimeout($scope.cancel, 1);
			return;
		}
		$scope.transaction = JSON.parse($scope.transactionTemp.txRequest);
		$scope.entityName = $scope.transactionTemp.entityName;
		$scope.txMBO = new window[$scope.entityName]();
	
		//need to add mapping			
		$scope.formatToISO = function(key){
			var timeTemp = (new Date($scope.transaction[$scope.entityName][0][key])).toISOString();
			$scope.transaction[$scope.entityName][0][key] = timeTemp;
		}
		
		$scope.saveTxn = function(){
			$http({
				method : 'POST',
				url : 'txntracksave.action',
				headers : {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $.param({
					transactionId: $scope.transactionTemp.transactionId,
					txRequest: JSON.stringify($scope.transaction)
				})
			})
			.success(function(data){
				$scope.showSuccess(data.message);
				$scope.cancel();
				$rootScope.$broadcast('refresh-txn-list');
			})
			.error(function error(response){
				$scope.showError(response.message);
			}); 
		}
		
	});
	
	// Add User Modal Controller
	EZMaxMobile.controller('userCtrl', function($scope, $uibModalInstance, $http){
		$scope.ok = function() {
			$uibModalInstance.close();
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
		
		
		// Open Popup content in new file and customized the controller for new modal page. 
		$scope.getAllUsers = function(){
		    $http({
				url : 'getallusers.action',
				method: 'GET',
			})
			.success(function(response){
				$scope.usergrid = response;
			})
			.error(function(err, status){
				$scope.showError(err.message);
			});
		}
		
		$scope.getAllUsers();
		
		$scope.selectUser = function(){
			var users=[];
		    angular.forEach($scope.usergrid, function(k, v){
		    	if (k.checked == true){		    		
		    		users.push(k.USERID);
		    	}
		    });
		    $scope.setLookupUser(users);
		    $scope.ok();
		};
		
		$scope.singleSelect = function(){
		    angular.forEach($scope.usergrid, function(k, v){
		    	k.checked = false;
		    });			
		}
		
		// Search bar service on the new user modal page.  
		$scope.ngRepeatFinishedNewUser = function(){
			var usertable = $('#newusertable'); 
			$('#adduserpager').children().remove();
			usertable.pageMe({pagerSelector:'#adduserpager',showPrevNext:true,hidePageNumbers:false,perPage:10});
			$('#system-search').keyup( function(event) {			
				var that = this;
		        // affect all table rows on in systems table
		        var tableBody = $('.table-list-search tbody');
		        var tableRowsClass = $('.table-list-search tbody tr');
		        $('.search-sf').remove();
		        tableRowsClass.each( function(i, val) {
		            //Lower text for case insensitive
		            var rowText = $(val).text().toLowerCase();
		            var inputText = $(that).val().toLowerCase();
		            if(inputText != ''){
		                $('.search-query-sf').remove();
		                tableBody.prepend('<tr class="search-query-sf"><td colspan="6"><strong>Searching for: "'
		                    + $(that).val()
		                    + '"</strong></td></tr>');
		                $('#adduserpager').children().remove();
		            }else{
		                $('.search-query-sf').remove();
		                $('#adduserpager').children().remove();
		                usertable.pageMe({pagerSelector:'#adduserpager',showPrevNext:true,hidePageNumbers:false,perPage:10});
		            }
	
		            if( rowText.indexOf( inputText ) == -1 ){
		                //hide rows
		                tableRowsClass.eq(i).hide();
		                
		            }else{
		                $('.search-sf').remove();
		                tableRowsClass.eq(i).show();
		            }
		        });
		        //all tr elements are hidden
		        if(tableRowsClass.children(':visible').length == 0){
		            tableBody.append('<tr class="search-sf"><td class="text-muted" colspan="6">No entries found.</td></tr>');
		        }
			});
			usertable.show();
		}
		// Catch the ngRepearFinishEvent and execute paging. 
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			$scope.ngRepeatFinishedNewUser();
		});
	});
</script>
</body>