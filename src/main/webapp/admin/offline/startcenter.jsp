<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="wrapper wrapper-content animated fadeInRight" ng-controller="QueryCtrl">
	<div class="row">
		<s:if test="!isOfflineStartCenterEnabled()">
			<div class = "alert alert-danger">
				<s:text name="admin.offline.sc.disabled"/>
			</div>
		</s:if>
		<div class="col-lg-12">
			<s:if test="isOfflineStartCenterEnabled()">
			    <div class="ibox float-e-margins">
			        <div class="ibox-title">
		        		<h5><s:text name="admin.offline.sc"/></h5>
						<div class="ibox-tools">
			                <a ng-click="toggleProperties(settings)">
			                    <i class="fa fa-cog"></i>
			                </a>
			            </div>
			        </div>	        
			        <div class="ibox-content">
						<div class="input-group">
							<input type="text" class="form-control form-control-sm m-b-xs" placeholder="<s:text name="admin.offline.sc.search"/>" ng-model="tableFilter">
							<span class="input-group-btn">
								<a class="btn btn-default" ><i class="fa fa-search"></i></a>
							</span>
						</div>						
						<div class="table-responsive">
							<table class="table table-striped table-hover">
								<thead>
									<tr>
										<th ng-repeat="col in columnDefs" ng-click="setSortBy(col.key)" width="{{col.width}}">
											{{col.displayName}} <span ng-class="{'emm-angle-up': !reverse, 'emm-angle-down': reverse}" ng-show="col.key === orderBy"></span>
										</th>
										<th width="25">
											<s:text name="admin.offline.sc.edit"/>
										</th>
									</tr>
								</thead>
								<tbody class="reactable-data">
									<tr dir-paginate="q in queries | filter: myFilter | orderBy:orderBy:reverse | itemsPerPage: maxSize" pagination-id="queries" current-page="pagination.current">
										<td style=" overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title="{{q.QUERYNAME}}">{{q.QUERYNAME}}</td>
										<td style=" overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title="{{q.DESCRIPTION}}" >{{q.DESCRIPTION}}</td>
										<td style=" overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title="{{q.TABLE}}">{{q.TABLE}}</td>
										<td style=" overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" title="{{q.APPLICATION}}">{{q.APPLICATION}}</td>
										<td>
											<span ng-show="q.DOWNLOADRESULTSET"><i class="fa fa-check text-navy"></i></span>
											<span class="label label-danger" ng-show="!q.DOWNLOADRESULTSET"><i class="fa fa-times"></i></span>
										</td>
										<td>
											<span ng-show="q.OFFLINEREADY"><i class="fa fa-check text-navy"></i></span>
											<span class="label label-danger" ng-show="!q.OFFLINEREADY"><i class="fa fa-times"></i></span>
										</td>
										<td>
											<span class="fa fa-edit fa-lg" ng-click="editQuery(q)"></span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
			        	<div class="row">
							<div class="col-lg-12">
								<dir-pagination-controls pagination-id="queries" on-page-change="allUsersPageChanged(newPageNumber)"></dir-pagination-controls>
							</div>
						</div>
			        </div>
				</div>
			</s:if>
		</div>
	</div>
</div>
<script type="text/ng-template" id="editquery.html">
	<div class="modal-header">
		<button type="button" class="close" ng-click="cancel()"><i class="fa fa-times"></i></button>
	    <h4>Edit Query</h4>
	</div>
	<div class="modal-body">	
		<form method ="post" class="form-horizontal">
			<div class="form-group">
				<label class="col-sm-4 control-label"><s:text name="admin.offline.sc.query"/></label>
				<div class="col-sm-8">
					<input type="text" class="form-control" ng-model="entity.QUERYNAME" ng-readonly="true"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-4 control-label"><s:text name="admin.offline.sc.description"/></label>
				<div class="col-sm-8">
					<input type="text" class="form-control" ng-model="entity.DESCRIPTION" ng-readonly="true"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-4 control-label"><s:text name="admin.offline.sc.table"/></label>
				<div class="col-sm-8">
					<input type="text" class="form-control" ng-model="entity.TABLE" ng-readonly="true"/>		          	
				</div>
			</div>
			<div class="form-group">
				<div class="alert alert-info" ng-show="entity.EXECUTIONTIME > settings.QUERYTIMEOUT && !entity.DOWNLOADRESULTSET"><s:text name="admin.offline.sc.timeoutlimit"/></div>
				<label class="col-sm-4 control-label"><s:text name="admin.offline.sc.include"/></label>
				<div class="col-sm-8">
					<checkbox class="pull-left" name="DOWNLOADRESULTSET" ng-model="entity.DOWNLOADRESULTSET" ng-disabled="entity.EXECUTIONTIME > settings.QUERYTIMEOUT && !entity.DOWNLOADRESULTSET"></checkbox>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-4 control-label"><s:text name="admin.offline.sc.onlineclause"/></label>
				<div class="col-sm-8">
					<div class="input-group">
						<textarea id="query" class="form-control" ng-model="entity.ONLINECLAUSE" rows="8" ng-readonly="true"></textarea>
						<span class="input-group-addon btn btn-info btn-outline" ngclipboard data-clipboard-target="#query" ngclipboard-success="copied(e)">							
							<i class="fa fa-copy"></i>
						</span>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-4 control-label"><s:text name="admin.offline.sc.offlineclause"/></label>
				<div class="col-sm-8">
					<div class="input-group">
						<textarea class="form-control" ng-model="entity.OFFLINECLAUSE" rows="8"></textarea>
						<span class="input-group-addon btn btn-info btn-outline" ng-click="actions.testQuery(entity,entity.QUERYID)">							
							<i class="fa fa-play"></i>
						</span>
					</div>
				</div>
			</div>
			<div class="bs-callout bs-callout-primary">
				<h4>Supported Dynamic Variables</h4>
				<div class="row">					
					<p class="col-sm-3" ng-repeat="v in supportedVars">{{v}}</p>
				</div>
			</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-default" ng-click="cancel()"><s:text name="global.cancel"/></button>
		<button type="button" class="btn btn-primary" ng-click="save(entity)"><s:text name="global.save"/></button>
	</div>
</script>

<script type="text/ng-template" id="scsettings.html">
	<div class="modal-header">
		<button type="button" class="close" ng-click="cancel()"><i class="fa fa-times"></i></button>
		<h5><s:text name="admin.offline.sc.settings"/></h5>
	</div>
	<div class="modal-body">
		<form method="post" class="form-horizontal">
			<div class="form-group">
				<label class="col-sm-5 control-label"><s:text name="admin.offline.sc.prefix"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="settings.QUERYPREFIX"/>
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-5 control-label"><s:text name="admin.offline.sc.timeout"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="settings.QUERYTIMEOUT" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-5 control-label"><s:text name="admin.offline.sc.supported"/></label>
				<div class="col-sm-7">
					<input type="text" class="form-control" ng-model="settings.QUERYSUPPORTEDAPPS" />
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-default" ng-click="cancel()"><s:text name="global.cancel"/></button>
		<button type="button" class="btn btn-primary" ng-click="actions.saveSettings(settings)"><s:text name="global.save"/></button>
	</div>
</script>

<script>

	EZMaxMobile.controller('QueryCtrl', function ($scope, $http, $uibModal, uiGridConstants){
		$scope.queries = [];
		$scope.myFilter = function(i){
			if(!$scope.tableFilter)
				return i;
			if(i.QUERYNAME.toLowerCase().includes($scope.tableFilter.toLowerCase()) || i.DESCRIPTION.toLowerCase().includes($scope.tableFilter.toLowerCase()) || i.TABLE.toLowerCase().includes($scope.tableFilter.toLowerCase()) || i.APPLICATION.toLowerCase().includes($scope.tableFilter.toLowerCase()))
				return i;
		}
		$scope.loadQueries = function(){
			$http({
				  method: 'GET',
				  url: 'startcenter/getqueries.action'
			})
			.success(function(response){
				$scope.queries = response;
			})
			.error(function(response){
				$scope.showError(response.message);
			});
		}
		
		$scope.loadSettings = function(){
			$http({
			  method: 'GET',
			  url: 'startcenter/getsettings.action'
			})
			.success(function(response){
				$scope.settings = response;
			})
			.error(function(response){
				$scope.showError(response.message);
			});
		};
		
		$scope.currentPage = 1,
		$scope.maxSize = 20;	

		$scope.columnDefs = [
				{ key: 'QUERYNAME', displayName:'<s:text name="admin.offline.sc.query"/>', width: 30},	
				{ key: 'DESCRIPTION', displayName:'<s:text name="admin.offline.sc.description"/>', width: 100},
				{ key: 'TABLE', displayName:'<s:text name="admin.offline.sc.table"/>', width: 30},
				{ key: 'APPLICATION', displayName:'<s:text name="admin.offline.sc.application"/>', width: 30},
				{ key: 'DOWNLOADRESULTSET', displayName:'<s:text name="admin.offline.sc.include"/>', width: 25},
				{ key: 'OFFLINEREADY', displayName:'<s:text name="admin.offline.sc.valid"/>', width: 25},
			];	

		$scope.pagination = {
	        current: 1
	    };
		
		$scope.editQuery = function(entity){
			var modalInstance = $uibModal.open({
				templateUrl : 'editquery.html',
				controller : 'EditQueryCtrl',
				scope: $scope,
				resolve : {
					params : function() {
						return angular.copy(entity);
					}
				}
			});
		};
		
		$scope.toggleProperties = function (settings){
			var modalInstance = $uibModal.open({
				templateUrl : 'scsettings.html',
				controller : 'SettingsCtrl',
				scope: $scope,
				resolve : {
					params : function() {
						return angular.copy(settings);
					}
				}
			});
		}		
		//Sort by DO NOT TOUCH	
		$scope.orderBy = '';
		$scope.reverse = false;
		$scope.setSortBy = function(key){
			if(key !== $scope.orderBy){
				$scope.orderBy = key;
				$scope.reverse = false;
			}
			else if(key === $scope.orderBy){
				$scope.reverse = !$scope.reverse;
				if($scope.reverse === false){
					$scope.orderBy = '';
				}
			}
		}				
		$scope.loadQueries();
		$scope.loadSettings();
		
	});	
	
	EZMaxMobile.controller('SettingsCtrl', function ($scope, $http, $uibModalInstance, params){
		$scope.settings = params;
		$scope.actions = {
			saveSettings : function(settings){
				$http({
					method: 'POST',
					url: 'startcenter/savesettings.action',
					data: $.param({ settingsmap : JSON.stringify(settings)}),
					headers: { "Content-Type": "application/x-www-form-urlencoded" }
				})
				.success(function(response){
					$scope.showSuccess(response.message);
					$scope.loadSettings();
					$uibModalInstance.close();
				})
				.error(function(response){
					$scope.showError(response.message);
				});
			},
		};
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	});		
	
	EZMaxMobile.controller('EditQueryCtrl', function ($scope, $http, $uibModalInstance, params){
		$scope.entity = params;		
		$scope.supportedVars = [':USER', ':&USERNAME&', ':&PERSONID&', ':&OWNER&', ':&OWNERNAME&', ':&APPNAME&', ':&MBONAME&', ':&UNIQUEID&', ':NO', ':YES', ':&NO&', ':&YES&'];
        var testDynamicVars = function(str){
            //Matches on any word in str that starts with : and ends at next whitespace
            var dynamicVarsInStr = str.match(/:\S*\b/gm);           
            var illegalVarsArr = [];
            $.each(dynamicVarsInStr, function(idx, value){
                  if($.inArray(value, $scope.supportedVars) == -1){
                        if($.inArray(value, illegalVarsArr) == -1)
                              illegalVarsArr.push(value);
                  }
            });
            return illegalVarsArr;
		}
        
        $scope.copied = function(e){
			if (e.action == 'copy'){				
        		$scope.showSuccess("Copied to clipboard");
			}
        	e.clearSelection();
        }
        
		$scope.actions = {				
			validateQuery: function(query){
				var result = testDynamicVars(query);
				return result.length == 0;
			},
			testQuery : function(entity, id){
				if(entity){
					var clause;
		 			if(entity.OFFLINECLAUSE){
		 				clause = entity.OFFLINECLAUSE;
		 			}
		 			else{
		 				clause = entity.ONLINECLAUSE;
		 			}
		 			var data = {
		 				id : id,
		 				offlineClause : clause
		 			};
		 			if (this.validateQuery(data.offlineClause)){
			 			$http({
			 				url: 'startcenter/testquery.action',
			 				method: 'POST',
			 				data: $.param({ 
		 						id: id,
	 							offlineClause: clause
							}),
							headers: { "Content-Type": "application/x-www-form-urlencoded" }
			 				
			 			})
		           	 	.success(function(response){
							$scope.showSuccess(response.message);
		           	 	})
						.error(function(response){
							$scope.showError(response.message);
						});
		 			} else {
		 				$scope.showError("Invalid Syntax");
		 			}
				}
			},
			saveQuery : function(entity){
				if(entity != null){
	 				$http({
	 					url: 'startcenter/savequery.action',
	 					method: 'POST',
	 					data: $.param({entity : JSON.stringify(entity)}), 
	 					headers: { "Content-Type": "application/x-www-form-urlencoded" }
	 				})
	           	 	.success(function(response){
	 					$scope.showSuccess(response.message);
	 					$scope.loadQueries();
	 					$uibModalInstance.close();
					})
					.error(function(response){
						$scope.showError(response.message);
	 					$scope.loadQueries();
	 					$uibModalInstance.close();						
					});
				}
			}
		};
		
		$scope.save = function(entity) {
			$scope.actions.saveQuery(entity);						
		};
		
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	
	});	
</script>