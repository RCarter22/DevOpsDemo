<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:if test="pagination.total > pagination.pageSize">
	<s:hidden name="pagination.currentPageNum" disabled="true"/>
	<li class="ui-pagination">	
		<s:if test="pagination.currentPageNum > 1">
			<a class="ui-pagination-prev" onclick="emm.core.goToPage(<s:property value="%{pagination.currentPageNum - 1}"/>)">	
				<span class="ui-arrow"></span>
			</a>
		</s:if>	
		<h3 class="title">
			<s:if test="pagination.total > 0">
				<s:text name="pagination.pagetotal">
					<s:param><s:property value="pagination.currentPageNum"/></s:param>
					<s:param><s:property value="pagination.totalPageNum"/></s:param>
					<s:param><s:property value="pagination.total"/></s:param>
				</s:text>
			</s:if>
			<s:else>
				<s:text name="pagination.page">
					<s:param>1</s:param>
					<s:param>1</s:param>
				</s:text>
			</s:else>
		</h3>
		<s:if test="pagination.currentPageNum < pagination.totalPageNum">
			<a class="ui-pagination-next" onclick="emm.core.goToPage(<s:property value="%{pagination.currentPageNum + 1}"/>)">
				<span class="ui-arrow"></span>	
			</a>
		</s:if>			
	</li>
</s:if>
