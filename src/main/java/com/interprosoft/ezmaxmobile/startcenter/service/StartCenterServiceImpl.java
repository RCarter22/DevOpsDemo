/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.startcenter.service;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.app.actionscfg.ActionsCfgRemote;
import psdi.app.actionscfg.ActionsCfgSetRemote;
import psdi.app.faconfig.FAConfigRemote;
import psdi.app.faconfig.FAConfigSetRemote;
import psdi.app.scconfig.LayoutRemote;
import psdi.app.scconfig.LayoutSetRemote;
import psdi.app.scconfig.SCConfigRemote;
import psdi.app.scconfig.SCConfigSetRemote;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.util.MXException;
import psdi.util.MXSession;
import psdi.util.MXSystemException;

import com.interprosoft.ezmaxmobile.bboard.service.BulletinBoardServiceImpl;
import com.interprosoft.ezmaxmobile.common.BaseMaximoException;
import com.interprosoft.ezmaxmobile.common.model.TotalCount;
import com.interprosoft.ezmaxmobile.common.pagination.Pagination;
import com.interprosoft.ezmaxmobile.common.service.BaseServiceImpl;
import com.interprosoft.ezmaxmobile.common.util.EMMTool;
import com.interprosoft.ezmaxmobile.startcenter.model.Portlet;
import com.interprosoft.ezmaxmobile.user.model.User;
import com.interprosoft.ezmaxmobile.workflow.service.WorkflowServiceImpl;


@Scope("prototype")
@Component
public class StartCenterServiceImpl extends BaseServiceImpl implements StartCenterService {

	/** An instance of logger. */
	private static Log log = LogFactory.getLog(StartCenterServiceImpl.class);
	
	/** The business object key. */
	private static final String BUSINESS_OBJECT_NAME = "SCCONFIG";
	
	/**
	 * Constructor to create the instance of CraftServiceImpl.
	 * @param user An instance of User.
	 */
	@Autowired
	public StartCenterServiceImpl(User user) {		
		super(user);
	}	
	
	public List<MboRemote> getStartCenterList() throws BaseMaximoException {
		List<MboRemote> list = new ArrayList<MboRemote>();
		try {
			SCConfigSetRemote scSetRemote = (SCConfigSetRemote)this.user.getSession().getMboSet(BUSINESS_OBJECT_NAME);			
			scSetRemote.getUserStartCenters();
			
			SCConfigRemote scRemote = null;
			
			scRemote = (SCConfigRemote)scSetRemote.moveFirst();
			while (scRemote != null) {
				list.add(scRemote);
				scRemote = (SCConfigRemote)scSetRemote.moveNext();
			}	
		} catch (MXException e) {
			throw new BaseMaximoException(e.getMessage(), e);
		} catch (RemoteException e) {			
			log.error("getStartCenterList:" + e);
			throw new BaseMaximoException(e.getMessage(), e);
		}
		return list;
	}
	
	public int getDefaultStartCenterID() throws BaseMaximoException {
		int defaultSCId = 0;
		try {
			SCConfigSetRemote scSetRemote = (SCConfigSetRemote)this.user.getSession().getMboSet(BUSINESS_OBJECT_NAME);			
			scSetRemote.getUserStartCenters();
			
			SCConfigRemote scRemote = null;
			
			scRemote = (SCConfigRemote)scSetRemote.moveFirst();
			if (scRemote != null) {
				defaultSCId = scRemote.getInt("SCCONFIGID");
			}	
		} catch (MXException e) {
			throw new BaseMaximoException(e.getMessage(), e);
		} catch (RemoteException e) {		
			log.error("getDefaultStartCenterID:" + e);
			throw new BaseMaximoException(e.getMessage(), e);
		}		
		return defaultSCId;
	}
	
	public String getQueryByQueryId(MXSession mxSession,int queryId) throws BaseMaximoException{
		String sql, clause = "";
		try {
			MboSetRemote querySetRemote = this.user.getSession().getMboSet("QUERY");
			sql = "(ispublic = 1 or owner = '" + this.user.getPersonId().toUpperCase() + "') and queryid = " + queryId;
	        querySetRemote.setWhere(sql);
			querySetRemote.reset();														
			
			MboRemote queryRemote = querySetRemote.moveFirst();
			if (queryRemote != null){
				clause = queryRemote.getString("CLAUSE");
				clause = replaceDynamicVarInQuery(clause);
			}
	
		} catch (MXException e) {
			throw new BaseMaximoException(e.getMessage(), e);
		} catch (RemoteException e) {	
			log.error("getQueryByQueryId:" + e);
			throw new BaseMaximoException(e.getMessage(), e);
		} 
		return clause;
	}

	public List<Portlet> getUserPortletsByAppName(String appName,long scconfigId) throws BaseMaximoException{
		return this.getPortlets(appName,scconfigId,true);
	}
	
	public List<Portlet> getUserPortletsByAppName(String appName,long scconfigId,boolean showCount) throws BaseMaximoException{
		return this.getPortlets(appName,scconfigId,showCount);
	}
	
	public List<Portlet> getUserPortlets(long scconfigId) throws BaseMaximoException {
		return this.getPortlets(null,scconfigId,true);
	}
	public List<Portlet> getUserPortlets(long scconfigId, boolean showCount) throws BaseMaximoException {
		return this.getPortlets(null,scconfigId,showCount);
	}
	
	private List<Portlet> getPortlets(String appName,long scconfigId,boolean showCount) throws BaseMaximoException {
		List<Portlet> list = new ArrayList<Portlet>();
		List<Portlet> favlist = new ArrayList<Portlet>();
		try {
			SCConfigSetRemote scSetRemote = (SCConfigSetRemote)this.user.getSession().getMboSet(BUSINESS_OBJECT_NAME);			
			scSetRemote.setQbe("SCCONFIGID", Long.toString(scconfigId));
			scSetRemote.reset();
			
			SCConfigRemote scRemote = null;
			LayoutSetRemote layoutSetRemote = null;
			MboSetRemote querySetRemote = null;
			MboRemote queryRemote = null;
			
			scRemote = (SCConfigRemote)scSetRemote.moveFirst();
			if (scRemote != null) {
				if (scRemote.getBoolean("DISPLAY")){
					layoutSetRemote = (LayoutSetRemote)scRemote.getMboSet("LAYOUTALL");
					layoutSetRemote.setQbe("SHOWCHART", "0");
					layoutSetRemote.setQbe("PORTLETID", "RSCONFIG,KPIGCONFIG,INBXCONFIG,BBOARD,FACONFIG,ACTIONSCFG");
					layoutSetRemote.setOrderBy("COLUMNNUM DESC, ORDERNUM");
					layoutSetRemote.reset();
					
					LayoutRemote layoutRemote = (LayoutRemote)layoutSetRemote.moveFirst();
					while(layoutRemote != null){
					    String rsTitle = layoutRemote.getString("DESCRIPTION").replaceAll("'", "");
					    int queryId = 0;
						String tbName = "";
						
						Portlet p = new Portlet();
						
						if (layoutRemote.getString("PORTLETID").equals("RSCONFIG")){
							
							String clause= "";
							try{
								querySetRemote = layoutRemote.getMboSet("QUERY");
								queryRemote = querySetRemote.moveFirst();
							} catch(MXSystemException e)
							{
								MboSetRemote rsSetRemote = layoutRemote.getMboSet("RSCONFIG");
								MboRemote rsRemote = rsSetRemote.moveFirst();
								if (rsRemote != null){
									querySetRemote = rsRemote.getMboSet("RSCONFIG_QUERY");
									queryRemote = querySetRemote.moveFirst();
								}
								
							}
							
							if (queryRemote != null){
								clause = queryRemote.getString("CLAUSE");
								queryId = queryRemote.getInt("QUERYID");
								clause = replaceDynamicVarInQuery(clause);
								MboSetRemote maxAppsSetRemote = queryRemote.getMboSet("MAXAPPS");
								MboRemote maxAppsRemote = maxAppsSetRemote.moveFirst();
								if (maxAppsRemote != null){
									tbName = maxAppsRemote.getString("MAINTBNAME");
								}
							}
							
							if (clause != null && !clause.equals("")){
								p.setTitle(rsTitle);
						        p.setId(queryId);
						        p.setAppName(layoutRemote.getString("QUERYAPP"));						        
						        p.setPortletType(layoutRemote.getString("PORTLETID"));
						        
						        if (tbName != null && layoutRemote.getString("QUERYAPP") != null){
							        MboSetRemote mboSet = this.user.getSession().getMboSet(tbName);
							        
							        String[] parsedQuery = EMMTool.parseWhereClause(clause);
								    if (parsedQuery != null)
								    {
								    	clause = parsedQuery[0];
								    }
							        if(showCount){
							        	mboSet.setWhere(clause);
							        	mboSet.reset();							        
								        int recordCount = mboSet.count();
								        p.setRecordCount(recordCount);
							        }							        
							        list.add(p);
							        
							        p = null;
						        }		
							}
						} else if (layoutRemote.getString("PORTLETID").equals("KPIGCONFIG") && appName == null){
							p.setTitle(rsTitle);	
					        p.setPortletType(layoutRemote.getString("PORTLETID"));							
							p.setId(layoutRemote.getLong("LAYOUTID"));
					        list.add(p);							
							p = null;
						} else if (layoutRemote.getString("PORTLETID").equals("INBXCONFIG") && appName == null){
							p.setTitle(rsTitle);						        
					        p.setPortletType(layoutRemote.getString("PORTLETID"));	
					        WorkflowServiceImpl wfService = new WorkflowServiceImpl(this.user);
					        Pagination pagination = new Pagination();
					        wfService.getInboxAssignments(pagination);
					        p.setRecordCount(pagination.getTotal());
					        list.add(p);	
							p = null;					
						} else if (layoutRemote.getString("PORTLETID").equals("BBOARD") && appName == null){
							p.setTitle(rsTitle);						        
					        p.setPortletType(layoutRemote.getString("PORTLETID"));
					        BulletinBoardServiceImpl bulletinBoardService = new BulletinBoardServiceImpl(this.user);
					        p.setRecordCount(bulletinBoardService.getTotalCount());
					        list.add(p);	
							p = null;		
						}	else if (layoutRemote.getString("PORTLETID").equals("FACONFIG") && appName == null){
							p.setTitle(rsTitle);						        
					        p.setPortletType(layoutRemote.getString("PORTLETID"));
					        p.setId(layoutRemote.getLong("LAYOUTID"));													
							
							FAConfigSetRemote faconfigSet = (FAConfigSetRemote)layoutRemote.getMboSet("FACONFIG");
							FAConfigRemote faconfig = (FAConfigRemote)faconfigSet.moveFirst();
							List<Portlet> tempfavlist = new ArrayList<Portlet>();
							while(faconfig != null){
								Portlet faP = new Portlet();		
																
								//confirm user has authorization for Application
								if(this.user.getSession().getProfile().getAppAuth(faconfig.getString("APP"))){
									faP.setTitle(faconfig.getMboSet("FA_APP").getMbo(0).getString("DESCRIPTION"));
									faP.setAppName(faconfig.getString("APP"));
									faP.setPortletType("FAVORITE");
									tempfavlist.add(faP);
								}
								faconfig = (FAConfigRemote)faconfigSet.moveNext();
							}	
							if(tempfavlist.size() > 0){
								favlist.add(p);
								favlist.addAll(tempfavlist);
							}
							p = null;	
						}
						else if (layoutRemote.getString("PORTLETID").equals("ACTIONSCFG") && appName == null){
							p.setTitle(rsTitle);						        
					        p.setPortletType(layoutRemote.getString("PORTLETID"));
					        p.setId(layoutRemote.getLong("LAYOUTID"));														
							
							ActionsCfgSetRemote actionscfgSet = (ActionsCfgSetRemote)layoutRemote.getMboSet("ACTIONSCFG");
							ActionsCfgRemote actionscfg = (ActionsCfgRemote)actionscfgSet.moveFirst();
							List<Portlet> tempactionscfglist = new ArrayList<Portlet>();
							while(actionscfg != null){
								Portlet acfgP = new Portlet();		
																
								//confirm user has authorization for Application and the Action
								//skip the Item Master and Person Group app insert, as OOB EZMax does NOT support these actions, but does support the apps
								if(!actionscfg.getString("APP").equalsIgnoreCase("ITEM") && !actionscfg.getString("APP").equalsIgnoreCase("PERSONGR") && this.user.getSession().getProfile().getAppAuth(actionscfg.getString("APP")) && this.user.getSession().getProfile().getAppOptionAuth(actionscfg.getString("APP"), actionscfg.getString("OPTIONNAME"), this.user.getSiteId())){
									acfgP.setTitle(actionscfg.getString("DESCRIPTION"));
									acfgP.setAppName(actionscfg.getString("APP"));
									acfgP.setPortletType("QUICKINSERT");
									acfgP.setMboName(actionscfg.getString("ACTION_MAXAPPS.MAINTBNAME"));
									tempactionscfglist.add(acfgP);											
								}
								actionscfg = (ActionsCfgRemote)actionscfgSet.moveNext();
							}	
							if(tempactionscfglist.size() > 0){
								favlist.add(p);
								favlist.addAll(tempactionscfglist);
							}
							p = null;	
						}
						layoutRemote = (LayoutRemote)layoutSetRemote.moveNext();
					}					
				}
				
				if(favlist.size() > 0)
					list.addAll(favlist);
				// Only get first one
				scRemote = null;
			}	
		} catch (MXException e) {
			log.error("getQueryByQueryId:" + e);
			throw new BaseMaximoException(e.getMessage(), e);
		} catch (RemoteException e) {	
			log.error("getQueryByQueryId:" + e);
			throw new BaseMaximoException(e.getMessage(), e);
		}
		
		return list;
	}
	
	public List<MboRemote> getKPIGraphDataList(String layoutId) throws BaseMaximoException{
		if ( layoutId == null || layoutId.length() == 0)
			return null;
		List<MboRemote> list = new ArrayList<MboRemote>();
		try{
			MboSetRemote mboSet = (MboSetRemote)this.user.getSession().getMboSet("KPIGCONFIG");
			mboSet.setQbe("LAYOUTID", layoutId);
			mboSet.setOrderBy("KPINAME");
			mboSet.setQbeExactMatch(true);
			MboRemote mbo = mboSet.moveFirst();
			
			MboSetRemote mboKpiSet = null;
			MboRemote mboKpi = null;
			while (mbo != null){
				mboKpiSet = (MboSetRemote)this.user.getSession().getMboSet("KPIMAIN");
				mboKpiSet.setQbe("KPINAME", mbo.getString("KPINAME"));
				mboKpiSet.setQbeExactMatch(true);
				mboKpi = mboKpiSet.moveFirst();
				while (mboKpi != null){
					list.add(mboKpi);
					mboKpi = mboKpiSet.moveNext();
				}
				mbo = mboSet.moveNext();
			}
			
		} catch (MXException e) {
			throw new BaseMaximoException(e.getMessage(), e);
		} catch (RemoteException e) {
			log.error("getKPIGraphDataList:" + e);
			throw new BaseMaximoException(e.getMessage(), e);
		}
		return list;
	}
	
	public List<MboRemote> listByQueryId(int queryId, String tbName, int start, int size, String sortBy, String sortDir, TotalCount totalCount) throws BaseMaximoException {
        List<MboRemote> list = new ArrayList<MboRemote>();
        try {                                                                                     
              String clause = getQueryByQueryId(this.user.getSession(),queryId);
              
              if (clause != null && !clause.equals("")){
                MboSetRemote mboSetRemote = this.user.getSession().getMboSet(tbName);
                // get order by clause
                String orderby = "";
                clause = clause.replaceAll("(?i)order by", "order by");
                int idx = clause.lastIndexOf("order by");                   
                if ( idx != -1 ){
                    // save order by
                    orderby = clause.substring(idx).substring("order by".length());
                      // remove existing order by 
                      clause = clause.substring(0, idx);
                }                 
                if ( orderby != null && !orderby.equals("") )
                    // Append to existing where clause if it doesn't already exist in the string
                    if ( orderby.toLowerCase().indexOf(sortBy.toLowerCase()) > -1 ){
                          // Already in the order by clause
                          //replace with current sort by and sort dir
                          orderby = orderby.replaceAll("(?i)" + sortBy + "\\sASC", sortBy + " " + sortDir);
                          orderby = orderby.replaceAll("(?i)" + sortBy + "\\sDESC", sortBy + " " + sortDir);
                          if ( orderby.toLowerCase().indexOf(sortBy.toLowerCase() + " " + sortDir.toLowerCase()) > -1 || orderby.toLowerCase().indexOf(sortBy.toLowerCase() + " " + sortDir.toLowerCase()) > -1 ){
                                // Already replaced
                          } else {
                                orderby = orderby.replaceAll("(?i)" + sortBy, sortBy + " " + sortDir);
                          }                                   
                    } else {
                          orderby += (", " + sortBy + " " + sortDir);
                    }
                else
                    orderby = sortBy + " " + sortDir;                 
                mboSetRemote.setWhere(clause);
                mboSetRemote.setOrderBy(orderby);
                mboSetRemote.reset();               
                    
                totalCount.value = mboSetRemote.count();
                
                MboRemote mboRemote = mboSetRemote.moveTo(start);
                while (mboRemote != null && size > 0) {
                	list.add(mboRemote);
                      if (size > 0 && list.size() >= size) {
                            break;
                      }
                      mboRemote = mboSetRemote.moveNext();
                }
              }           
        } catch (BaseMaximoException e) {
        	throw new BaseMaximoException(e.getMessage(), e);         
        } catch (MXException e) {
            throw new BaseMaximoException(e.getMessage(), e);
        } catch (RemoteException e) {
        	log.error("listByQueryId:",e);
            throw new BaseMaximoException(e.getMessage(), e);
        } 
        return list;
	}     
	
	public List<MboRemote> listMboByQueryId(int queryId, String tbName, int start, int size, String sortBy, String sortDir, TotalCount totalCount) throws BaseMaximoException {
	    List<MboRemote> list = new ArrayList<MboRemote>();
	    try {                                                                                     
	          String clause = getQueryByQueryId(this.user.getSession(),queryId);
	          if (clause != null && !clause.equals("")){
	            MboSetRemote mboSetRemote = this.user.getSession().getMboSet(tbName);
	            // get order by clause
	            String orderby = "";
	            clause = clause.replaceAll("(?i)order by", "order by");
	            int idx = clause.lastIndexOf("order by");                   
	            if ( idx != -1 ){
	                // save order by
	                orderby = clause.substring(idx).substring("order by".length());
	                  // remove existing order by 
	                  clause = clause.substring(0, idx);
	            }                 
	            if ( orderby != null && !orderby.equals("") )
	                // Append to existing where clause if it doesn't already exist in the string
	                if ( orderby.toLowerCase().indexOf(sortBy.toLowerCase()) > -1 ){
	                      // Already in the order by clause
	                      //replace with current sort by and sort dir
	                      orderby = orderby.replaceAll("(?i)" + sortBy + "\\sASC", sortBy + " " + sortDir);
	                      orderby = orderby.replaceAll("(?i)" + sortBy + "\\sDESC", sortBy + " " + sortDir);
	                      if ( orderby.toLowerCase().indexOf(sortBy.toLowerCase() + " " + sortDir.toLowerCase()) > -1 || orderby.toLowerCase().indexOf(sortBy.toLowerCase() + " " + sortDir.toLowerCase()) > -1 ){
	                            // Already replaced
	                     } else {
	                            orderby = orderby.replaceAll("(?i)" + sortBy, sortBy + " " + sortDir);
	                      }                                   
	                } else {
	                      orderby += (", " + sortBy + " " + sortDir);
	                }
	            else
	                orderby = sortBy + " " + sortDir;                 
	            mboSetRemote.setWhere(clause);
	            mboSetRemote.setOrderBy(orderby);
	            mboSetRemote.reset();               
	                
	            totalCount.value = mboSetRemote.count();
	            
	            MboRemote mboRemote = mboSetRemote.moveTo(start);
                while (mboRemote != null && size > 0) {
                      list.add(mboRemote);
                      if (size > 0 && list.size() >= size) {
                            break;
                      }
                      mboRemote = mboSetRemote.moveNext();
                }
	          }           
	    } catch (BaseMaximoException e) {
	    	throw new BaseMaximoException(e.getMessage(), e);                
	    } catch (MXException e) {
	    	throw new BaseMaximoException(e.getMessage(), e);
	    } catch (RemoteException e) {
	    	log.error("listMboByQueryId:",e);
	        throw new BaseMaximoException(e.getMessage(), e);
	    } 
	    return list;
	} 	
}
