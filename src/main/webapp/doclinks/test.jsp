<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
	<title>EZMaxMobile File Upload</title>
</head>

<body>
	<s:actionerror />
	<s:fielderror />
	<s:form name="myform" action="doUploadJSon" method="POST" enctype="multipart/form-data">
		<h3>EZMaxMobile File Upload</h3>
		Owner ID: <s:textfield name="ownerId"/><br/>
		Owner Table: <s:textfield name="ownerTable"/><br/>
		File: <s:file name="myFile"/><br/>
		Document Name: <s:textfield name="docInfo.document" maxlength="20"/><br/>
		Description: <s:textfield name="docInfo.description"/><br/>
		<s:submit/>
	</s:form>
	
	<table class="wwFormTable">
		<tr>
			<td colspan="2">
				<h3>EZMaxMobile File Upload</h3>
			</td>
		</tr>
		<tr>
			<td><label>File:</label></td>
			<td><s:property value="myFile" /></td>
		</tr>
		<tr>
			<td><label>File Name:</label></td>
			<td><s:property value="myFileFileName" /></td>
		</tr>
	</table>
</body>
</html>