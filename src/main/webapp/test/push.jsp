<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ page import="java.net.*" %>
<%@ page import="java.io.*" %>


<!DOCTYPE html>
<html>
<head>
	<title>EZMaxMobile - Test Push Notification Server Access</title>
</head>

<body>

<h3 style="font-family:arial;">
A test will be performed for connectivity to the Push Notification Server
</h3>

<%

	try {
		URL push = new URL("http://emmpush.elasticbeanstalk.com/");
		URLConnection pc = push.openConnection();
		BufferedReader in = new BufferedReader(
								new InputStreamReader(
								pc.getInputStream()));
		String inputLine;
		
		while ((inputLine = in.readLine()) != null) 
		{
			// read each line of the html
			// out.println(inputLine);
		}
		in.close();
		out.println("<h4 style='font-family:arial;color:green;'>Successful communication with Push Notification Server</h4>");
	}
	catch (ConnectException ce)
	{
		out.println("<h4 style='font-family:arial;color:red;'>Connection could not be established to the Push Server</h4>");
	}
	catch (Exception e)
	{
		out.println("<h4 style='font-family:arial;color:red;'>Unknown error communicating with Push Server</h4>");
	}
	
	
%>

</body>
</html>
