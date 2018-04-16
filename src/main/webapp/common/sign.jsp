<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>


<!DOCTYPE html>
<head>
  <title>EZMaxMobile</title>
  <s:include value="../common/includes.jsp"/>
  <link rel="stylesheet" href="../css/signature/jquery.signaturepad.css">
  <style type="text/css">
	.sigPad { width: 600px; height: 222px; margin: 0 auto; }
	.sigWrapper { width: 600px; height: 220px; }
  </style>
  <script src="../javascript/signature/jquery.signaturepad.min.js"></script>
  <script type="text/javascript">
  		var pad = null;
		function confirmSubmit(){
			var api = pad || $('.sigPad').signaturePad({drawOnly:true});
			$('#signatureData').val(api.getSignatureImage());
			$('#myform').attr('action', 'doSign.action').submit();
		}
		function clear(){
			var api = pad || $('.sigPad').signaturePad({drawOnly:true});
			api.clearCanvas();
		}
		$(window).bind('orientationchange', function(e) {
			if (window.orientation != 0 || $(window).width() > 500){
				$('#myform, .ui-btn-right, #clearButton').show();
				$('#portrait').hide();
			} else {
				$('#myform, .ui-btn-right, #clearButton').hide();
				$('#portrait').show();
			}
		});
		$(document).ready(function(){
			if (window.orientation == 0 && $(window).width() < 500){
				$('#myform, .ui-btn-right, #clearButton').hide();			
			} else {
				$('#myform, .ui-btn-right, #clearButton').show();
				$('#portrait').hide();
			}
			pad = $('.sigPad').signaturePad({drawOnly:true, lineTop: 200});
		});
	</script>
</head>
<body>
	<div class="ui-page ui-inset">
		<div class="ui-header">
			<a class="ui-btn-left ui-btn-e" href="javascript:emm.core.back();"><s:text name="global.cancel"/></a>
			<h3 class="ui-title"><s:text name="global.signature"/></h3>
			<a id="clearButton" style="right : 75px" href="javascript:clear();"><s:text name="global.clear"/></a>
			<a class="ui-btn-right ui-btn-c" href="javascript:confirmSubmit();"><s:text name="global.save"/></a>
		</div>
		<div class="ui-content">
			<ul id="portrait" class="ui-listview">
				<li><span><h3><s:text name="global.rotatedevice"/></h3></span></li>
			</ul>
		  	<form id="myform" method="post" action="" class="sigPad" enctype="multipart/form-data" style="display: none;">
		    	<div class="sig sigWrapper">
		      		<div class="typed"></div>
			      	<canvas class="pad" width="600px" height="220px"></canvas>
			      	<input type="hidden" id="signatureData" name="signatureData">
			    </div>	
			  </form>
		</div>
  </div>
</body>