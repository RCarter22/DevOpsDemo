<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="wrapper wrapper-content animated fadeInRight" ng-controller="ViewController">

	<div class="row">
		<div class="col-lg-12">
		    <div class="ibox float-e-margins">
		        <div class="ibox-title">
		        	<div class="row">
		        		<div class="col-lg-9">
		        			<h5>{{title||"<s:text name="admin.users.securitygroup"/>"}}</h5>
		        		</div>
					</div>
		        </div>
		        <div class="ibox-content">
					<div class="table-responsive">
						<table class="table table-striped table-hover">
							<thead>
								<tr>
									<th width="250">Name</th>
									<th width="125">User ID</th>
<!-- 									<th width="125">Person ID</th> -->
									<th width="125">Status</th>
									<th width="25"></th>
								</tr>
							</thead>
							<tbody class="reactable-data" id="usertable">
								<tr pagination-id="allUsers" dir-paginate="user in emmgrid.users | itemsPerPage: emmgrid.pageSize" total-items="emmgrid.total" current-page="allUsersCurPage">
									<td>{{user.DISPLAYNAME}}</td>
									<td>{{user.USERID}}</td>
									<!-- <td>{{user.PERSONID}}</td> -->
									<td>{{user.STATUS}}</td>
									<td style="text-align:center; width: 50px">
										<span class="fa fa-trash fa-lg" ng-click="removeUser(user)"></span>
									</td>
								</tr>
							</tbody>
						</table>						
					</div>
		        	<div class="row">
						<div class="col-lg-10">
							<dir-pagination-controls pagination-id="allUsers" on-page-change="getEZMaxMobileUser(newPageNumber)"></dir-pagination-controls>
						</div>
						<div class="col-lg-2">
							<button type="button" class="btn btn-primary m-md pull-right" style="margin: 20px 0" ng-click="addUser()">
							  	<i class="fa fa-plus-circle"></i> <s:text name="global.addnew"/>
							</button>
						</div>
					</div>
		        </div>
		    </div>
		</div>				    
	</div>
	
	<div class="row">
		<div class="col-lg-6">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5><s:text name="admin.users.activeusers"/></h5>
				</div>
				<div class="ibox-content">
					<div class="table-responsive">
						<table class="table table-striped table-hover no-margins">					
							<thead>
								<tr>
									<th><s:text name="admin.users.name"/></th>
									<th><s:text name="admin.users.user"/></th>
									<th><s:text name="admin.users.logintime"/></th>
									<th><s:text name="admin.users.isactive"/></th>
								</tr>
							</thead>
							<tbody>
								<tr pagination-id="activeUsers" dir-paginate="user in activeusers.users | itemsPerPage: activeusers.pageSize" total-items="activeusers.total">
									<td>{{user.DISPLAYNAME}}</td>
									<td>{{user.USERID}}</td>
									<td>{{user.LOGINDATETIME | date : 'short'}}</td>
									<td ng-if="user.ACTIVE == 1"><span class="label label-primary"><i class="fa fa-check"></i></span></td>
									<td ng-if="user.ACTIVE != 1"><span class="label label-danger"><i class="fa fa-times"></i></span></td>
								</tr>
							</tbody>
						</table>
					</div>
					<dir-pagination-controls pagination-id="activeUsers" on-page-change="getActiveUser(newPageNumber)"></dir-pagination-controls>
				</div>
			</div>
		</div>
		
		<div class="col-lg-6">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5><s:text name="admin.users.logintracking"/></h5>
				</div>
				<div class="ibox-content">
					<div class="table-responsive">
						<table class="table table-striped table-hover no-margins">
							<thead>
								<tr>
									<th><s:text name="admin.users.attemptdate"/></th>
									<th><s:text name="admin.users.attemptresult"/></th>
									<th><s:text name="admin.users.name"/></th>
									<th><s:text name="admin.users.user"/></th>
								</tr>
							</thead>
							<tbody>
								<tr pagination-id="loggedinUsers" dir-paginate="user in loggedinusers.users | itemsPerPage: loggedinusers.pageSize" total-items="loggedinusers.total">
									<td><i class="fa fa-clock-o"></i> {{user.ATTEMPTDATE | date : 'short'}}</td>
									<td>{{user.ATTEMPTRESULT}}</td>
									<td>{{user.NAME}}</td>
									<td>{{user.USERID}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<dir-pagination-controls pagination-id="loggedinUsers" on-page-change="getLoggedInUser(newPageNumber)"></dir-pagination-controls>
				</div>
			</div>
		</div>
	</div>

</div>
<script type="text/ng-template" id="removeuser.html">					
	<div class="modal-header">
		<button type="button" class="close" ng-click="cancel()"><i class="fa fa-times"></i></button>
		<h4 class="modal-title"><s:text name="admin.users.removeuser"/></h4>
	</div>
	<div class="modal-body">
		<p>
			<s:text name="admin.users.removeuser"/> "{{removeSelectedUser.DISPLAYNAME}} ({{removeSelectedUser.USERID}})"?
		</p>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn btn-default" ng-click="cancel()"><s:text name="global.cancel"/></button>
		<button type="button" class="btn btn btn-danger" ng-click="deleteUser()"><s:text name="global.remove"/></button>
	</div>
</script>

<script type="text/ng-template" id="adduser.html">					
	<div class="modal-header">
		<button type="button" class="close" ng-click="cancel()"><i class="fa fa-times"></i></button>
		<h4 class="modal-title"><s:text name="admin.users.users"/></h4>
	</div>
	<div class="modal-body">
		<div class="row" style="margin-bottom: 20px">					
			<div class="input-group">
				<input class="form-control" ng-model="userSearch" ng-keypress="doSearch($event)" placeholder="Search by User ID, Name" required>
				<span class="input-group-btn" ng-click="doSearch({which:13})">
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
				<tbody>
					<tr pagination-id="addUsers" dir-paginate="g in data.users | itemsPerPage: data.pageSize" total-items="data.total">
						<td style="text-align: center; width: 50px">
							<checkbox ng-model="g.checked"></checkbox>
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
				<dir-pagination-controls pagination-id="addUsers" on-page-change="getAllUsers(newPageNumber)"></dir-pagination-controls>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn btn-default" ng-click="cancel()"><s:text name="global.cancel"/></button>
	    <button type="button" class="btn btn btn-primary" ng-click="addEZMaxUser()"><s:text name="global.ok"/></button>
	</div>
</script>	
<script>
	EZMaxMobile.controller('ViewController', function ($scope, $http, $uibModal){
		$scope.activeusers = [];
		$scope.emmgrid = [];
		$scope.loggedinusers = [];
		$scope.allUsersCurPage = 1;
		$scope.getEZMaxMobileUser = function (pageNum){   				
		    $http({
				url : 'users/listezmaxmobileusers.action',
				method: 'GET',
				params: { page : pageNum },
			})
			.success(function(response){
				$scope.emmgrid = response;
			})
			.error(function(err, status){
				$scope.showError(err.message);
			});				
	    }
		
		$scope.getActiveUser = function (pageNum){   
		    $http({
				url : 'users/getactiveusers.action',
				method: 'GET',
				params: { page : pageNum },
			})
			.success(function(response){
				$scope.activeusers = response;
			})
			.error(function(err, status){
				$scope.showError(err.message);
			});			
	    }
		$scope.getLoggedInUser = function (pageNum){
		    $http({
				url : 'users/getloggedinusers.action',
				method: 'GET',
				params: { page : pageNum },
			})
			.success(function(response){
				$scope.loggedinusers = response;
			})
			.error(function(err, status){
				$scope.showError(err.message);
			});	
	    }
		
		$scope.removeUser = function(entity){
			var modalInstance = $uibModal.open({
				templateUrl : 'removeuser.html',
				controller : 'RemoveUserCtrl',
				scope: $scope,
				resolve : {
					params : function() {
						return entity;
					}
				}
			});
		};

		$scope.addUser = function(){
			var modalInstance = $uibModal.open({
				templateUrl : 'adduser.html',
				controller : 'AddUserCtrl',
				scope: $scope,
			});
		};
		
		// Call this function after page load. 	
		$scope.getEZMaxMobileUser($scope.allUsersCurPage);
		$scope.getActiveUser(1);
		$scope.getLoggedInUser(1);
		
	});
	
	EZMaxMobile.controller('RemoveUserCtrl', function ($scope, $uibModalInstance, $http, params){
		$scope.removeSelectedUser = params;
		
		$scope.ok = function() {
			$uibModalInstance.close();
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
			  
		$scope.deleteUser = function(){
			
		    $http({
				url : 'users/deleteezmaxuser.action',
				method: 'POST',
				data: $.param({ "delUserId" : $scope.removeSelectedUser.USERID }),
				headers: { "Content-Type": "application/x-www-form-urlencoded" }				
			})
			.success(function(){
	   	 	    // Refresh the EZMaxUserGroup to get the new data.
	   	 		$scope.getEZMaxMobileUser($scope.allUsersCurPage);
	   	 		$uibModalInstance.close();
	   	 		
	   	 		$scope.showSuccess("'{0}' has been removed".format($scope.removeSelectedUser.DISPLAYNAME));			
			})
			.error(function(err, status){				
				$scope.showError(err.message);
			});
		}		
	});
	
	// Add User Modal Controller
	EZMaxMobile.controller('AddUserCtrl', function($scope, $uibModalInstance, $http){
		$scope.userSearch = null;
		
		$scope.ok = function() {
			$uibModalInstance.close();
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
		
		// Open Popup content in new file and customized the controller for new modal page. 
		$scope.getAllUsers = function(pageNum, search){
		    $http({
				url : 'users/getallusers.action',
				method: 'GET',
				params: { page : pageNum, search: search },
			})
			.success(function(response){
				$scope.data = response;
			})
			.error(function(err, status){
				$scope.showError(err.message);
			});
		}
		
		$scope.getAllUsers(1);
		
		$scope.addEZMaxUser = function(){
			var users=[];
		    angular.forEach($scope.data.users, function(k, v){
		    	if (k.checked == true){		    		
		    		users.push(k.USERID);
		    	}
		    });
		    if(users.length > 0){
			    $http({
					url : 'users/addezmaxuser.action',
					method: 'POST',
					data: $.param({ "addUserId" : users.toString() }),
					headers: { "Content-Type": "application/x-www-form-urlencoded" }				
				})
				.success(function(){
		   	 	    // Refresh the EZMaxUserGroup to get the new data.
		   	 		$scope.getEZMaxMobileUser($scope.allUsersCurPage);
		   	 		$scope.ok();
		   	 		$('#adduser').modal('hide');
		   	 		
		   	 		$scope.showSuccess("'{0}' has been successfully added".format(users.toString()));			
				})
				.error(function(err, status){				
					$scope.showError(err.message);
				});
			}else{
				$scope.showWarning("Please select a user");
			}
		};
		
		$scope.doSearch = function(keyEvent){
			if (keyEvent.which === 13){
				$scope.getAllUsers(1, $scope.userSearch);
			}			
		}
	});	
</script>