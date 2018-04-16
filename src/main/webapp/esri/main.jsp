<%--
* Copyright (c) 2014 InterPro Solutions, LLC.
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>	

<!DOCTYPE html>
<html>   
    <head>
        <title>EZMaxMobile</title>
        <link rel="stylesheet" type="text/css" href="http://js.arcgis.com/3.7/js/esri/css/esri.css">
        <s:include value="../common/includes.jsp"/>
        <style>
			/* Override EZMaxMobile CSS Settings */
        	.ui-toolbar.ui-toolbar-a{
				border-color: #16569B;
				background: #195EA8;
				background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzE5NWVhOCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxNDRkODkiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
				background: -moz-linear-gradient(top,#195EA8 0,#144D89 100%);
				background: -webkit-gradient(linear,left top,left bottom,color-stop(0%,#195EA8),color-stop(100%,#144D89));
				background: -webkit-linear-gradient(top,#195EA8 0,#144D89 100%);
				background: -o-linear-gradient(top,#195EA8 0,#144D89 100%);
				background: -ms-linear-gradient(top,#195EA8 0,#144D89 100%);
				background: linear-gradient(top,#195EA8 0,#144D89 100%);
        	}
          	.ui-toolbar .ui-btn{
				text-shadow: rgba(0, 0, 0, 0.6) 0 -1px 0;
				border-width: 1px;
				border-style: solid;
				border-color: #073365;
				border-top-color: #073365;
				background: #1D6EC4;
				background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFkNmVjNCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxMTQxNzIiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
				background: -moz-linear-gradient(top,#1D6EC4 0,#114172 100%);
				background: -webkit-gradient(linear,left top,left bottom,color-stop(0%,#1D6EC4),color-stop(100%,#114172));
				background: -webkit-linear-gradient(top,#1D6EC4 0,#114172 100%);
				background: -o-linear-gradient(top,#1D6EC4 0,#114172 100%);
				background: -ms-linear-gradient(top,#1D6EC4 0,#114172 100%);
				background: linear-gradient(top,#1D6EC4 0,#114172 100%);
				-webkit-border-radius: 6px;
				font-size: 14px;
				font-weight: bold;
				color: white;
				text-decoration: none;
				padding: 8px 13px;
				display: inline-block;
          	}
          	.ui-toolbar.ui-footer{
          		position:fixed;
          	}
        </style>          
        <script type="text/javascript">
            dojoConfig = {
                parseOnLoad: false
            };
        </script>               
        <script src="http://js.arcgis.com/3.7/"></script>
        <script type="text/javascript">   
            dojo.require("esri.map");
            dojo.require("esri.layers.FeatureLayer");
            dojo.require("esri.layers.osm");
            dojo.require("esri.dijit.editing.AttachmentEditor");
            dojo.require("esri.dijit.PopupMobile");
            var map;
            var graphic;
            var watchId;
            var hotelsFeatureLayer;
            var hotelAssetsFeatureLayer;
            var cityAssetsFeatureLayer;
            var mapService;   
            var visible = [];
            var loadTimer;
            var resizeTimer;
            
            function init() 
            {
            	//esri.config.defaults.io.proxyUrl = '/arcgisserver/apis/javascript/proxy/proxy.ashx';

                var popup = new esri.dijit.PopupMobile(null, dojo.create("div"));
                map = new esri.Map("map", {
                	basemap: "streets",
                	//center: [-115.172775, 36.114754],
                    fadeOnZoom: true,
					force3DTransforms: true,
                    navigationMode: "css-transforms",
                    infoWindow: popup,
                    slider: true,
                    zoom: 14
                });       
                
                dojo.connect(dijit.byId('map'), 'onresize', function() {  //resize the map if the div is resized
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(resizeMap, 500);
                  });
                
                //var baseMapLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");
                //map.addLayer(baseMapLayer);

                dojo.connect(map, "onLoad", mapLoaded);
                
            }           
            function updateLayerVisibility(layer) {
            	(layer.visible) ? layer.hide() : layer.show();
            }
            function buildLayerList(service) {
                var template = new esri.InfoTemplate();
                template.setTitle($('#titleTemplate').generateTemplate());
                template.setContent($('#detailTemplate').generateTemplate());
                                
                var layer;
                var items = dojo.map(service.layerInfos, function(info,index){
					if (info.defaultVisibility) {
		                layer = new esri.layers.FeatureLayer(service.url + "/" + info.id, {
		                    mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
		                    infoTemplate: template,
		                    outFields: ["*"]
		                });		
		                dojo.connect(layer, "onClick", function (evt) {
		                    map.infoWindow.setFeatures([evt.graphic]);
		                });
		                map.addLayer(layer);				
						visible.push(layer);
					}
					return "<li class='ui-field'><label>" + info.name + "</label><input data-on='ON' data-off='OFF' type='checkbox' class='list_item'" + (info.defaultVisibility ? "checked=checked" : "") + " id='" + info.id + "' onchange='updateLayerVisibility(visible[" + info.id + "]);' /></li>";
                });
                dojo.byId("layers_dialog").innerHTML = items.join(' ');
			}            
            function locationError(error) {
                //error occurred so stop watchPosition
                if (navigator.geolocation) {
                    navigator.geolocation.clearWatch(watchId);
                }
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("Location not provided");
                        break;

                    case error.POSITION_UNAVAILABLE:
                        alert("Current location not available");
                        break;

                    case error.TIMEOUT:
                        alert("Timeout");
                        break;

                    default:
                        alert("Unknown error");
                        break;
                }
            }     
            function addGraphic(pt) {
                var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 12,
                new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                new dojo.Color([210, 105, 30, 0.5]), 8),
                new dojo.Color([210, 105, 30, 0.9]));
                graphic = new esri.Graphic(pt, symbol);                    
                map.graphics.add(graphic);
            }   
               
            function mapServiceLoaded(mapService)
            {
            	console.log("mapServiceLoaded");
            	map.extent = esri.geometry.geographicToWebMercator(mapService.initialExtent);
                buildLayerList(mapService);
                resizeMap();
            }
            
            function mapLoaded() {
            	console.log("mapLoaded");
                //map.addLayer(layer);
                resizeMap();
            	mapService = new esri.layers.ArcGISTiledMapServiceLayer("http://<server>:<port>/arcgis/rest/services/<service>/<map server>");
                dojo.connect(mapService, "onLoad", mapServiceLoaded);
                
                // This must be at the end or the map won't load sometimes
                if(navigator.geolocation){  
                    navigator.geolocation.getCurrentPosition(myLocation, locationError, {maximumAge:60000, enableHighAccuracy:true});
                    //watchId = navigator.geolocation.watchPosition(showLocation, locationError);
                }                    
            }      
            function locate(){
                if (watchId){
                    // Do something with this ID
                }
                if(navigator.geolocation){  
                    navigator.geolocation.getCurrentPosition(function(location){
                    	var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(location.coords.longitude, location.coords.latitude));
                    	map.centerAndZoom(pt);
					}, locationError, {maximumAge:60000, enableHighAccuracy:true});
                }                             	
            }     
            function myLocation(location) {
                var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(location.coords.longitude, location.coords.latitude));
                addGraphic(pt);
            }
            function showLocation(location) {
                //zoom to the users location and add a graphic
                var pt = esri.geometry.geographicToWebMercator(new esri.geometry.Point(location.coords.longitude, location.coords.latitude));
                if (!graphic) {
                    addGraphic(pt);
                } else { //move the graphic if it already exists
                    graphic.setGeometry(pt);
                }
               	map.centerAndZoom(pt);
            }
            dojo.addOnLoad(init);
            //dojo.ready(init);            
      
            //for map resizing
            function orientationChanged() {
                resizeMap();
            }
            //for map resizing
            function resizeMap() {
            	console.log("resizeMap");
                if (map) {
                	var headerHeight = $('#mapheader').outerHeight(true);
                	var footerHeight = $('#mapfooter').outerHeight(true);
                	console.log("headerHeight = " + headerHeight);
                	console.log("footerHeight = " + footerHeight);
                	var menuHeight = 0;
                	if ($('#topmenubar').height() > 0)
                		menuHeight = $('#topmenubar').outerHeight(true);
                	else
                		menuHeight = 40;
               		console.log("menuHeight = " + menuHeight);
                    $('#map').height($('body').height() - (headerHeight + footerHeight + menuHeight)); // Minus height of header + footer
                    map.resize();
                    map.reposition();
                }
            }
            $(function(){
                var toolbarBtns = $('.ui-toolbar .ui-btn');
                var width = (100/toolbarBtns.length) - (100/toolbarBtns.length)*.50 + '%';
                toolbarBtns.css('width', width);
            });
        </script>
    </head>
    <body>
		<div class="ui-dialog" id="layers">
			<div class="ui-container">
				<div class="ui-header">
					<h1 class="ui-title"><s:text name="global.layers"/></h1>
				</div>
				<div class="ui-content">
					<ul class="ui-listview" id="layers_dialog">
					</ul>
				</div>
			</div>
		</div>		
        <div class="ui-page">
			<s:include value="../common/menu.jsp"/>
            <div id="mapheader" class="ui-header"> 
                  <a class="ui-btn-left" onclick="emm.core.back()"><s:text name="global.back"/></a>
                  <h3 class="ui-title"><s:text name="ezmaxmobile.esri"/></h3>
            </div>
            <div class="ui-content">           
                <div id="map"></div>
            </div>
        </div>
		<div id="mapfooter" class="ui-toolbar ui-toolbar-a ui-footer">
			<div class="ui-container">
				<a href="#layers" class="ui-btn" data-control="dialog"><s:text name="global.layers"/></a>
				<a href="#" class="ui-btn" onclick="locate()"><s:text name="global.locate"/></a>
			</div>
		</div>


		<!-- TEMPLATES -->		
		<div id="titleTemplate" data-visible="false">
			<div style="text-align:center;"><b>%{DESCRIPTION}</b></div>
		</div>		
		<div id="detailTemplate" data-visible="false">
			<ul class="ui-listview ui-inset">
				<li class="ui-divider">ESRI ArcGIS Details</li>
				<li class="ui-field">
					<label>GIS Asset</label>
					<p>%{ASSETNUM}</p>
					<a class="ui-arrow" onclick="emm.util.confirm({message:'Create work order with asset number \'%{ASSETNUM}\'?', yes:function(){window.location.href='../wotrack/create.action?additionalattrs=ASSETNUM=%{ASSETNUM}'}})"></a>
				</li>
				<li class="ui-field">
					<label>GIS Location</label>
					<p>%{LOCATION}</p>
					<a class="ui-arrow" onclick="emm.util.confirm({message:'Create work order with location \'%{LOCATION}\'?', yes:function(){window.location.href='../wotrack/create.action?additionalattrs=LOCATION=%{LOCATION}'}})"></a>
				</li>
				<li class="ui-field">
					<label>Description</label>
					<p>%{DESCRIPTION}</p>
				</li>
			</ul>		
		</div>		
	</body>
</html>