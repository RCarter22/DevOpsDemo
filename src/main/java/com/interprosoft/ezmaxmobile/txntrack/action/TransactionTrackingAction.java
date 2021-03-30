/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.txntrack.action;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.common.BaseMaximoException;
import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;
import com.interprosoft.ezmaxmobile.offline.action.BaseTxnTrackingAction;
import com.interprosoft.ezmaxmobile.offline.model.Transaction;

@Component
@Scope("prototype")
@Namespace("/txntrack")
@ResultPath(value="/")
public class TransactionTrackingAction extends BaseTxnTrackingAction {

	private List<Transaction> transactions;

	private Transaction transaction;

	private boolean includeAll;

	@Action(value="main",
		results={
			@Result(name="success", location="list.jsp"),
			@Result(name="error", location="list.jsp")
		}
	)
	public String main() {
		try {
			if(this.getSessionObject("INCLUDEALL") != null){
				includeAll = true;
				this.setSessionObject("INCLUDEALL", null);
			}
			if (this.search != null && this.search.length() != 0) {
				this.transactions = this.getTransactionService().listByUser(this.user, this.search, pagination, includeAll);
			} else {
				this.transactions = this.getTransactionService().search(this.user, this.transaction, pagination, includeAll);
			}
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="transaction_view",
		results={
			@Result(name="success", location="view.jsp"),
			@Result(name="error", location="view.jsp")
		}
	)
	public String view() {
		try {
			this.transaction = this.getTransactionService().findById(transaction.getTransactionId());
			if(includeAll){
				this.setSessionObject("INCLUDEALL", true);
			}
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="transaction_changestatus", results={
		@Result(name="success",location="changestatus.jsp"),
		@Result(name="error",location="../common/systemmessage.jsp")
	})
	public String toChangeStatus(){
		try {
			this.transaction = this.getTransactionService().findById(transaction.getTransactionId());
			this.currentAction = "transaction_view.action?transaction.transactionId=" + transaction.getTransactionId();
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="transaction_dochangestatus", results={
		@Result(name="success",location="${currentAction}",type="redirect"),
		@Result(name="error",location="${currentAction}",type="redirect")
	})
	public String doChangeStatus(){
		try {
			this.getTransactionService().changeStatus(this.transaction);
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="transaction_reprocess", results={
		@Result(name="success",location="reprocess.jsp"),
		@Result(name="error",location="../common/systemmessage.jsp")
	})
	public String toReprocess(){
		try {
			this.transaction = this.getTransactionService().findById(transaction.getTransactionId());
			this.currentAction = "transaction_view.action?transaction.transactionId=" + transaction.getTransactionId();
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="transaction_doReprocess", results={
		@Result(name="success",location="${currentAction}",type="redirect"),
		@Result(name="error",location="${currentAction}",type="redirect")
	})
	public String doReprocess(){
		try {
			this.getTransactionService().reprocess(this.transaction, this.user);
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="transaction_doReprocessAllErrors", results={
		@Result(name="success",location="${currentAction}",type="redirect"),
		@Result(name="error",location="${currentAction}",type="redirect")
	})
	public String transaction_doReprocessAllErrors(){
		try {
			this.getTransactionService().reprocessErrorTransactions(this.user);
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="transaction_delete", results={
		@Result(name="success",location="delete.jsp"),
		@Result(name="error",location="../common/systemmessage.jsp")
	})
	public String toDelete(){
		try {
			this.transaction = this.getTransactionService().findById(transaction.getTransactionId());
			this.currentAction = "transaction_view.action?transaction.transactionId=" + transaction.getTransactionId();
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="transaction_doDelete", results={
		@Result(name="success",location="${currentAction}",type="redirect"),
		@Result(name="error",location="${currentAction}",type="redirect")
	})
	public String doDelete(){
		try {
			this.getTransactionService().delete(this.transaction);
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="transaction_listDelete", results={
			@Result(name="success",location="main.action",type="redirect",params={"includeAll","${includeAll}"}),
			@Result(name="error",location="main.action",type="redirect",params={"includeAll","${includeAll}"})
		})
		public String listDelete(){
			try {
				this.transaction = this.getTransactionService().findById(transaction.getTransactionId());
				this.getTransactionService().delete(this.transaction);
			} catch(BaseMaximoException ex) {
				this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
				this.addActionError(ex.getMessage());
				return ERROR;
			}
			return SUCCESS;
		}

	@Action(value="transaction_edit", results={
		@Result(name="success",location="edit.jsp"),
		@Result(name="error",location="../common/edit.jsp")
	})
	public String toEdit(){
		try {
			this.transaction = this.getTransactionService().findById(transaction.getTransactionId());
			this.currentAction = "transaction_view.action?transaction.transactionId=" + transaction.getTransactionId();
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="transaction_doEdit", results={
		@Result(name="success",location="${currentAction}",type="redirect"),
		@Result(name="error",location="${currentAction}",type="redirect")
	})
	public String doEdit(){
		try {
			this.getTransactionService().editAndReprocess(this.transaction, this.user);
		} catch(BaseMaximoException ex) {
			this.setMessage(new EZMessage(ex.getMessage(), EMMConstants.ERROR));
			this.addActionError(ex.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value="transaction_advancedsearch",results={
		@Result(name="success", location="advancedsearch.jsp"),
		@Result(name="error", location="advancedsearch.jsp")
	})
	public String advancedsearch() {
		try{

		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}

	public Transaction getTransaction() {
		return transaction;
	}

	public void setTransaction(Transaction transaction) {
		this.transaction = transaction;
	}

	public boolean isIncludeAll() {
		return includeAll;
	}

	public void setIncludeAll(boolean includeAll) {
		this.includeAll = includeAll;
	}
}
