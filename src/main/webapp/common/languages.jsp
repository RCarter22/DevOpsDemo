<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<ul class="ui-listview" >				
	<li class="ui-field ui-combobox">
		<label><s:text name="global.selectlanguage"/></label>
		<select name="request_locale" id="request_locale">
			<option value=""></option>
			<option value="CS"><s:text name="lang.czech"/></option>
			<option value="DA"><s:text name="lang.danish"/></option>
			<option value="DE"><s:text name="lang.german"/></option>
			<option value="EN"><s:text name="lang.english"/></option>
			<option value="ES"><s:text name="lang.spanish"/></option>
			<option value="FI"><s:text name="lang.finish"/></option>
			<option value="FR"><s:text name="lang.frenchfrance"/></option>
			<option value="HU"><s:text name="lang.hungarian"/></option>
			<option value="IT"><s:text name="lang.italian"/></option>
			<option value="JA"><s:text name="lang.japanese"/></option>
			<option value="KO"><s:text name="lang.korean"/></option>
			<option value="NO"><s:text name="lang.norwegian"/></option>
			<option value="NL"><s:text name="lang.dutch"/></option>
			<option value="PL"><s:text name="lang.polish"/></option>
			<option value="RO"><s:text name="lang.romanian"/></option>
			<option value="RU"><s:text name="lang.russian"/></option>
			<option value="SK"><s:text name="lang.slovak"/></option>
			<option value="SV"><s:text name="lang.swedish"/></option>
			<option value="TH"><s:text name="lang.thai"/></option>
			<option value="AR"><s:text name="lang.arabic"/></option>						
			<option value="VI"><s:text name="lang.vietnamese"/></option>
			<option value="ZH"><s:text name="lang.simplifiedchinese"/></option>
			<option value="ZHT"><s:text name="lang.traditionalchinese"/></option>			
		</select>
		<span class="ui-arrow"></span>
	</li>				
</ul>
<script>
	$(function(){
		var request_locale = $('#request_locale');
		request_locale.on('change', function(){
			var uri = new URI(document.location);
			uri.removeSearch('request_locale').addSearch('request_locale', $(this).val());
			document.location = uri.toString();
		});
	});			
</script>