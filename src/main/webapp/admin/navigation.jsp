<%--
* Copyright (c) 2017 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul side-navigation class="nav metismenu" id="side-menu">
            <li class="nav-header-notused">
                <div class="profile-element">
					<h1 class="font-bold" style="color:white">
						<img alt="image" class="img-circle" src="../images/ezmaxmobile.png" height="75px">
						<p>{{appName}}</p>
					</h1>
                </div>
            </li>
             			
			<!-- User Management -->
            <li ng-class="{active: <s:property value="view.equals('users/manageusers.jsp')"/>}">
            	<a href="main.action?view=users/manageusers">
            		<i class="fa fa-users"></i> 
            		<span class="nav-label"><s:text name="admin.manageusers"/></span>
            	</a>   
            </li>       
			<!-- Offline Mode -->
            <li ng-class="{active: <s:property value="view.startsWith('offline')"/>}">
            	<a href="">
            		<i class="fa fa-database"></i>
            		<span class="nav-label"><s:text name="admin.offlinemode"/></span>
            		<span class="fa arrow"></span>
            	</a>
                <ul class="nav nav-second-level collapse">
                	<!-- Start Center -->
                    <li ng-class="{active: <s:property value="view.equals('offline/startcenter.jsp')"/>}">
                    	<a href="main.action?view=offline/startcenter">
                    		<span class="nav-label"><s:text name="admin.startcenter"/></span>
                    	</a>
                    </li>
		       		<!-- Txn Tracking -->
		            <li ng-class="{active: <s:property value="view.contains('offline/txntrack.jsp')"/>}">
		            	<a href="txntrack.action?view=offline/txntrack">
		            		<span class="nav-label"><s:text name="admin.txntrack"/></span>
		            	</a>   
		            </li> 
                </ul>   
            </li>
            <!-- System -->
            <li ng-class="{active: <s:property value="view.startsWith('system')"/>}">
        		<a href="">
        			<i class="fa fa-cog"></i>
        			<span class="nav-label"><s:text name="admin.system"/></span>
        			<span class="fa arrow"></span>
        		</a>
                <ul class="nav nav-second-level collapse">
                	<!-- License -->
                    <li ng-class="{active: <s:property value="view.equals('system/license.jsp')"/>}">
                    	<a href="main.action?view=system/license">
                    		<span class="nav-label"><s:text name="admin.license"/></span>
                    	</a>
                    </li>
                </ul>  
       		</li>
            <!-- Videos -->
            <li ng-class="{active: <s:property value="view.equals('videos/videos.jsp')"/>}">
        		<a href="main.action?view=videos/videos">
        			<i class="fa fa-video-camera"></i>
        			<span class="nav-label"><s:text name="admin.videos"/></span>
        		</a>
       		</li> 
        </ul>

    </div>
</nav>
