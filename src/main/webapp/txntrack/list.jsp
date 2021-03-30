<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html>
<head>
	<title>EZMaxMobile</title>
	<s:include value="../common/includes.jsp"/>
	<script type="text/javascript">
		$(function(){
			$('#includeAll').on('change', function(){
				$('#includeAll').val($('#includeAll').is(':checked'));
				$('#myform').submit();
			});
		});

		goOffline = function(){
			var url = new URI(window.location.href);
			var paramObj = URI.parseQuery(url.search());
			if(paramObj['prevOfflineUrl']){
				prevOfflineUrl = paramObj['prevOfflineUrl'];
				emm.offline.DefaultOffline()
					.addQuery("LASTVISIT", "SELECT '" + prevOfflineUrl + "' AS LASTVISIT")
					.go();
			}
			else{
				emm.offline.DefaultOffline()
					.addQuery("STARTCENTER","SELECT * FROM STARTCENTER ORDER BY DESCRIPTION")
					.addQuery("PORTLET","SELECT * FROM PORTLET WHERE SCCONFIGID IN (SELECT SCCONFIGID FROM STARTCENTER WHERE ISDEFAULT = '1') ORDER BY ORDERNUM ASC")
					.go();
			}
		}
		
		emm.core.goToPage = function(/*Int*/ pageNum){
			emm.ui.clearScrollPosition();
			var sortOrder = $('[data-sortorder]'),
				url = window.location.href;
			var form=$('<form id="emm_pagination" target="_self">').attr('method','post');
			if (url.indexOf('pagination.currentPageNum=')>-1){
				url = url.substring(0, url.indexOf('pagination.currentPageNum='));
				form.attr('action', url);
			}
			var queryString = window.location.search;
			if(queryString.indexOf('fieldName')==-1) form.append($('<input type="hidden">').attr('name','fieldName').val($('[name="fieldName"]').val()));
			if(queryString.indexOf('updateField')==-1) form.append($('<input type="hidden">').attr('name','updateField').val($('[name="updateField"]').val()));
			if(queryString.indexOf('searchFlds')==-1) form.append($('<input type="hidden">').attr('name','searchFlds').val($('[name="searchFlds"]').val()));
			if(queryString.indexOf('searchLookupFlds')==-1) form.append($('<input type="hidden">').attr('name','searchLookupFlds').val($('[name="searchLookupFlds"]').val()));
			if(queryString.indexOf('search')==-1) form.append($('<input type="hidden">').attr('name','search').val($('[name="search"]').val()));
			if(queryString.indexOf('lookupSourceField')==-1) form.append($('<input type="hidden">').attr('name','lookupSourceField').val($('[name="lookupSourceField"]').val()));
			if(queryString.indexOf('dispFlds')==-1) form.append($('<input type="hidden">').attr('name','dispFlds').val($('[name="dispFlds"]').val()));
			if(queryString.indexOf('currentAction')==-1) form.append($('<input type="hidden">').attr('name','currentAction').val($('[name="currentAction"]').val()));
			if(queryString.indexOf('lookupMbo')==-1) form.append($('<input type="hidden">').attr('name','lookupMbo').val($('[name="lookupMbo"]').val()));
			if(queryString.indexOf('lookupMboId')==-1) form.append($('<input type="hidden">').attr('name','lookupMboId').val($('[name="lookupMboId"]').val()));
			if(queryString.indexOf('glaccount')==-1) form.append($('<input type="hidden">').attr('name','glaccount').val($('[name="glaccount"]').val()));
			if(queryString.indexOf('glOrder')==-1) form.append($('<input type="hidden">').attr('name','glOrder').val($('[name="glOrder"]').val()));
			if(queryString.indexOf('currentGL')==-1) form.append($('<input type="hidden">').attr('name','currentGL').val($('[name="currentGL"]').val()));
			form.append($('<input type="hidden">').attr('name','pagination.currentPageNum').val(pageNum));
			form.append($('<input type="hidden">').attr('name','pagination.sortBy').val($('[name="pagination.sortBy"]').val()));
			form.append($('<input type="hidden">').attr('name','pagination.sortOrder').val(sortOrder.data('sortorder')));
			form.append($('<input type="hidden">').attr('name','includeAll').val('<s:property value="includeAll"/>'));
			
			$.each($('#emm_domainform #emm_filterform input[type="text"]'), function(index, value){
				value = $(value);
				if(queryString.indexOf(value.attr('name'))==-1) form.append($('<input type="hidden">').attr('name', value.attr('name')).val(value.val()));
			});
			
			var body = $('body');
			$('#'+form.attr('id')).remove();
			body.append(form);
			form.submit();
		}
	</script>
</head>
<body>
	<div class="ui-page" data-rememberscroll="true">
		<s:include value="../common/menu.jsp"/>
		<div class="ui-header">
			<a class="ui-btn-left" href="../main.action"><span class="emm-home"></span></a>
			<h3 class="ui-title"><s:text name="ezmaxmobile.txntrack"/></h3>
			<a class="ui-btn-right" onclick="emm.util.formPost('transaction_doReprocessAllErrors.action')"><span class="emm-repeat"></span></a>
			<s:include value="../common/statusbar.jsp"/>
		</div>
		<div class="ui-content">
			<%-- <div class="ui-searchbar">
				<s:form id="quicksearch" method="post">
					<input type="search" placeholder="<s:text name="global.quicksearch"/>" name="search" maxlength="100" value="<s:property value="search"/>" />
					<a class="ui-btn-side" href="transaction_advancedsearch.action"><s:text name="global.advanced"/></a>
					<input type="hidden" name="transaction.entityName" value="<s:property value="transaction.entityName"/>"/>
					<input type="hidden" name="transaction.userId" value="<s:property value="transaction.userId"/>"/>
					<input type="hidden" name="transaction.status" value="<s:property value="transaction.status"/>"/>
				</s:form>
			</div> --%>

			<ul class="ui-listview" data-native="true">
				<li>
					<a onclick="goOffline()">
						<span class="emm-offline"></span>
						<h3><s:text name="ezmaxmobile.offline"/></h3>
					</a>
				</li>
				<li class="ui-divider ui-divider-b"></li>
			</ul>

			<s:form id="myform">
				<ul class="ui-listview">
					<li class="ui-field">						
						<label>Show All?</label>						
						<input type="checkbox" id="includeAll" name="includeAll" value="<s:property value="includeAll"/>"/>
					</li>
					<li class="ui-divider"></li>
				</ul>
			</s:form>

			<s:if test="transactions.size > 0">
				<ul class="ui-listview">
					<s:include value="../common/pagination.jsp"/>
					<s:iterator value="transactions">
						<li>
							<a href="transaction_view.action?transaction.transactionId=<s:property value="transactionId"/>&includeAll=<s:property value="includeAll"/>" >
								<s:if test="status eq 'ERROR'">
									<span class="ui-accessory-left">
										<span class="ui-circle ui-circle-c"></span>
									</span>
								</s:if>
								<s:if test="status eq 'PROCESSED'">
									<span class="ui-accessory-left">
										<span class="ui-circle ui-circle-e"></span>
									</span>
								</s:if>
								<s:if test="status eq 'DELETED'">
									<span class="ui-accessory-left">
										<span class="ui-circle ui-circle-f"></span>
									</span>
								</s:if>
								<p><strong><s:text name="txntrack.status"/>: <s:property value="status"/></strong></p>
								<h3><s:text name="txntrack.entity"/>: <s:property value="entityName"/></h3>
								<s:if test="status eq 'ERROR'">
									<p><s:text name="txntrack.message"/>: <s:property value="responseMessage"/></p>
								</s:if>								
								<p><s:text name="txntrack.syncaction"/>: <s:property value="syncAction"/></p>
								<p><s:text name="txntrack.timestamp"/>: <s:property value="txTimestamp"/></p>									
								<a class="ui-trash-large" onclick="emm.util.confirm({title:'Delete',message:'Are you sure you want to delete this line? ',yes: function(){window.location='transaction_listDelete.action?transaction.transactionId=<s:property value="transactionId"/>&includeAll=<s:property value="includeAll"/>';},no: function(){},yesText :'<s:text name='global.yes'/>',noCssClass: 'ui-btn-a',noText:'<s:text name='global.no'/>'});">								
							</a>
						</li>
					</s:iterator>
					<s:include value="../common/pagination.jsp"/>
				</ul>
			</s:if>
			<s:else>
				<div class="ui-statusbar ui-statusbar-c">
					<h3 class="ui-title"><s:text name="global.norecords"/></h3>
				</div>
			</s:else>
		</div>
	</div>
</body>
</html>
