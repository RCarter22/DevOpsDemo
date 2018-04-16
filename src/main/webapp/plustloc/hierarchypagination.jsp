<%--
* Copyright (c) 2014 InterPro Solutions, LLC
*    All rights reserved.
--%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:if test="hierarchyPagination.total > hierarchyPagination.pageSize">
	<s:hidden name="hierarchyPagination.currentPageNum" disabled="true"/>
	<li class="ui-pagination">	
		<s:if test="hierarchyPagination.currentPageNum > 1">
			<a class="ui-pagination-prev" onclick="goPage(<s:property value="%{hierarchyPagination.currentPageNum - 1}"/>,'hierarchyPagination')">	
				<span class="ui-arrow"></span>
			</a>
		</s:if>	
		<h3 class="title">
			<s:if test="hierarchyPagination.total > 0">
				<s:text name="pagination.pagetotal">
					<s:param><s:property value="hierarchyPagination.currentPageNum"/></s:param>
					<s:param><s:property value="hierarchyPagination.totalPageNum"/></s:param>
					<s:param><s:property value="hierarchyPagination.total"/></s:param>
				</s:text>
			</s:if>
			<s:else>
				<s:text name="pagination.page">
					<s:param>1</s:param>
					<s:param>1</s:param>
				</s:text>
			</s:else>
		</h3>
		<s:if test="hierarchyPagination.currentPageNum < hierarchyPagination.totalPageNum">
			<a class="ui-pagination-next" onclick="goPage(<s:property value="%{hierarchyPagination.currentPageNum + 1}"/>,'hierarchyPagination')">
				<span class="ui-arrow"></span>	
			</a>
		</s:if>			
	</li>
</s:if>
