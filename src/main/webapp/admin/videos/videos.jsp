<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<div class="wrapper wrapper-content animated fadeInRight" ng-controller="ViewController">
	<div class="row">
        <div class="col-lg-12">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>EZMaxMobile - What's New</h5>
				</div>
				<div class="ibox-content">
					<div class="row">
						<div class="col-lg-3">
						</div>
				        <div class="col-lg-6">
							<div class="embed-responsive embed-responsive-16by9">
								<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/videoseries?list=PLlUvpzSzVZWaTVP1X8sVWyckuFnUkQChV" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>							
							</div>
					    </div>
						<div class="col-lg-3">
						</div>					    
					</div>
				</div>
			</div>
	    </div>
	</div>
	
	<div class="row">
		<div class="col-lg-4">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>EZRequest - Community Work Request</h5>
				</div>
				<div>
					<div class="ibox-content no-padding border-left-right">
						<div class="embed-responsive embed-responsive-16by9">
							<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/videoseries?list=PLlUvpzSzVZWazjXUza690PMakY7ATuca3" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</div>
					</div>
					<div class="ibox-content profile-content">
						<p>EZRequest creates a simple, effective communication channel between your team and your entire customer community. Now people who do not have regular access to Maximo can log maintenance requests, track the progress of a job, or book an event space online. Your team can get to work without fielding a constant stream of phone calls or re-entering information into Maximo.</p>
						<p><a href="https://interprosoft.com/products-services/ezrequest/">Click Here to Learn More...</a>
					</div>
				</div>
			</div>
		</div>
		
		<div class="col-lg-4">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>EZPlanner - Maximo Planning</h5>
				</div>
				<div>
					<div class="ibox-content no-padding border-left-right">
						<div class="embed-responsive embed-responsive-16by9">
							<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/videoseries?list=PLlUvpzSzVZWYqOn2WABoYuxsvXOgbErjk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</div>
					</div>
					<div class="ibox-content profile-content">
						<p>EZPlanner streamlines the entire process of assigning work orders and managing the complex schedules of your team. With a single click you can assign jobs on an individual basis or by groups. Sort records on any fields available in Maximo, including views for managers, supervisors, and technicians, assigned or unassigned jobs, completion date, etc. EZPlanner is a flexible desktop tool that can be configured to match the business processes of your organization.</p>
						<p><a href="https://interprosoft.com/products-services/ezplanner/">Click Here to Learn More...</a>
					</div>
				</div>
			</div>
		</div>	
		
		<div class="col-lg-4">
			<div class="ibox float-e-margins">
				<div class="ibox-title">
					<h5>EZInsight - Reporting Tool</h5>
				</div>
				<div>
					<div class="ibox-content no-padding border-left-right">
						<div class="embed-responsive embed-responsive-16by9">
							<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/videoseries?list=PLlUvpzSzVZWY5KcSo9zrfYmN0gkPIah7t" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</div>
					</div>
					<div class="ibox-content profile-content">
						<p>Now you can easily create reports right on your desktop or mobile device. Extract up-to-the-minute Maximo data on work orders, inspections, scheduling, inventory management, purchasing, cost analysis, or ROI. With EZInsight, you’ll always be the one with the answers, no matter how tough the question or last-minute request.</p>
						<p><a href="https://interprosoft.com/products-services/ezinsight/">Click Here to Learn More...</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</div>

<script type="text/ng-template" id="videoTemplate.html">
	<div class="col-lg-4">
		<div class="ibox float-e-margins">
			<div class="ibox-title">
				<h5>{{title}}</h5>
			</div>
			<div>
				<div class="ibox-content no-padding border-left-right">
					<div style="text-align: center; height: 250px;">{0}</div>
				</div>
				<div class="ibox-content profile-content">
					<p>{{description}}</p>
				</div>
			</div>
		</div>
	</div>
</script>

<script type="text/javascript">
	EZMaxMobile.controller('ViewController', function ($scope, $templateCache, $sce, $http){		
		var rowTemplate = $('<div class="row"></div>');
		var videoTemplate = $templateCache.get('videoTemplate.html');
	});
</script>