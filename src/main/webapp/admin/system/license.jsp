<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!-- Classes -->
<script src="./system/classes/License.js"></script>

<div class="wrapper wrapper-content animated fadeInRight" ng-controller="ViewController">
	<div class="row" ng-controller="LicenseCtrl">
        <div class="col-sm-8 col-md-8 col-lg-6">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5><s:text name="admin.license.file"/></h5>
				</div>
				<div class="ibox-content">
					<div class="form-group">
						<label class="control-label"><s:text name="admin.license.orgid"/></label>
						<ul class="list-group">
						  <li class="list-group-item" ng-repeat="org in licenseInfo.getOrgs()">{{org}}</li>
						</ul>						
					</div>					
					<div class="form-group">
						<label class="control-label"><s:text name="admin.license.licensetype"/></label>
						<ul class="list-group">
						  <li class="list-group-item">{{licenseInfo.getLicenseType()}}</li>
						</ul>
					</div>
					<div class="form-group" ng-show = "licenseInfo.getLicenseType () == 'Trial'">
						<label class="control-label"><s:text name="admin.license.trial"/></label>
						<ul class="list-group">
						  <li class="list-group-item"><s:text name="admin.license.daysremaining"/> : {{licenseInfo.getTrialRemainder()}}</li>
						</ul>
					</div>
					<div class="form-group" ng-show = "licenseInfo.showLicenseCount()">
						<label class="control-label"><s:text name="admin.license.total"/></label>
						<ul class="list-group">
						  <li class="list-group-item">{{licenseInfo.licenseTotal}}</li>
						</ul>
					</div>					
					<div class="row">
						<button class="btn btn-primary m-md pull-right" ng-click="uploadLicenseFile()">
							<i class="fa fa-upload"></i> <s:text name="admin.license.upload"/>
						</button>
					</div>				
				</div>
			</div>
	    </div>
	</div>
	<s:file id="fileUpload" type="file" style="display: none" accept=".interpro" name="licenseFile"></s:file>
	</div>

<script type="text/javascript">
	EZMaxMobile.controller('ViewController', function ($scope, $http, $timeout){		
		$timeout(function(){
			$(function () {
				  $('[data-toggle="tooltip"]').tooltip()
				});
		}, 0);
	});
	
	EZMaxMobile.controller('LicenseCtrl', function($scope, $timeout, $http, toastr){
		$scope.licensekey=null;
		$scope.licenseInfo = new License();
		var getLicenseInfo = function(){
			$http({
			    method: 'POST', // doesnt need to be POST
			    url: 'system/license/getlicenseinfo',
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'} // should be JSON
			})
			.success(function(response){
				$scope.licenseInfo.init(response);
			})
			.error(function(response){
				$scope.showError(response.message);
			});
		}
		
		//Used to fire to get properties after angular has all rendered templates
		$timeout(function(){
			getLicenseInfo();
			$scope.$apply();
		}, 100);
		
		$scope.uploadLicenseFile = function(){
			$('#fileUpload').click();
		}
		$('#fileUpload').on('click touchstart' , function(){
		    $(this).val('');
		});
		
		$("#fileUpload").change(function(e) {
			var fd = new FormData();
			fd.append("license", $(this)[0].files[0]);
			$http({
				method : 'POST',
				url : 'system/license/uploadlicense',
				headers : {'Content-Type': undefined},
				data : fd
			})
			.success(function(response){
				$scope.showSuccess(response.message);
				getLicenseInfo();
			})
			.error(function(response){
				$scope.showError(response.message);
			});
		});
		
	});	
</script>