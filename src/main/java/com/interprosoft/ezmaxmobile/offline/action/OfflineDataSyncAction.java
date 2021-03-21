/*******************************************************************************
 * Copyright (c) 2014 InterPro Solutions, LLC.
 * All rights reserved.
 ******************************************************************************/
package com.interprosoft.ezmaxmobile.offline.action;

import java.rmi.RemoteException;
import java.text.ParseException;
import java.util.Date;
import java.util.TimeZone;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.axis.encoding.Base64;
import org.apache.log4j.Logger;

import psdi.app.asset.AssetMeterRemote;
import psdi.app.asset.AssetRemote;
import psdi.app.asset.AssetSetRemote;
// import psdi.app.inspection.InspectionResultRemote;
import psdi.app.inventory.InvBalancesRemote;
import psdi.app.inventory.InventoryRemote;
import psdi.app.labor.LabTransRemote;
import psdi.app.mr.MRRemote;
import psdi.app.location.LocationMeterRemote;
import psdi.app.location.LocationRemote;
import psdi.app.location.LocationSetRemote;
import psdi.app.ticket.SRRemote;
import psdi.app.workorder.WORemote;
import psdi.mbo.MboConstants;
import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;
import psdi.mbo.NonPersistentMboSetRemote;
import psdi.mbo.StatefulMboRemote;
import psdi.util.MXException;
import psdi.util.MXSession;

import com.ibm.icu.text.NumberFormat;
import com.interprosoft.ezmaxmobile.common.BaseMaximoException;
import com.interprosoft.ezmaxmobile.common.util.MaximoExceptionUtil;
import com.interprosoft.ezmaxmobile.db.DatabaseException;
import com.interprosoft.ezmaxmobile.offline.OfflineException;
import com.interprosoft.ezmaxmobile.offline.util.DateTimeFormatter;
import com.interprosoft.ezmaxmobile.offline.util.DateTimeParser;

public class OfflineDataSyncAction extends BaseOfflineSyncAction {

	/**	######################################################################################	*
	 * 	The methods declared defined here can be referenced in the "offlineconfig.xml" file.
	 * 	The methods are for syncing offline transactions with Maximo using MBOs.
	 * 	######################################################################################	*/
	
	private static final long serialVersionUID = 1L;
	
	private static Logger log = Logger.getLogger(OfflineDataSyncAction.class);
	
	public void addWorkOrder() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WORKORDER";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			MboRemote mboRemote = null;
			// Check to see if we are creating a follow up work order
			if (isNull(jsonOfflineEntity.opt("ORIGRECORDID")) == false ) {
				// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
				// If a field is using an autokey, then we need to get the mapped value
				
				//need to determine if this is a followup work order or if this is a work order being generated from a service request
				if(jsonOfflineEntity.optString("ORIGRECORDCLASS").equalsIgnoreCase("WORKORDER")){
					String wonum = getAutoKeyMap(jsonOfflineEntity, "ORIGRECORDID", "WONUM");
					mboSetRemote.setQbe("WONUM", wonum);
					mboSetRemote.setQbe("SITEID", jsonOfflineEntity.getString("SITEID"));
					mboSetRemote.setQbeExactMatch(true);
					WORemote origWoRemote = (WORemote)mboSetRemote.moveFirst();
					// Found the Originating Work Order
					if (origWoRemote != null) {
						//need to set HASFOLLOWUPWORK flag on parent prior to creating the followup
						origWoRemote.setValue("HASFOLLOWUPWORK", true, MboConstants.NOACCESSCHECK);
						origWoRemote.getThisMboSet().save();
						
						mboRemote = origWoRemote.createWorkorder();
						long followupId = mboRemote.getLong("WORKORDERID");
						MboSetRemote mboFollowupSetRemote = this.user.getSession().getMboSet("WORKORDER");
						mboFollowupSetRemote.setQbe("WORKORDERID", String.valueOf(followupId));
						mboFollowupSetRemote.setQbeExactMatch(true);
						
						WORemote mboFollowupRemote = (WORemote)mboFollowupSetRemote.moveFirst();
						mboFollowupRemote.setValue("CHANGEBY", this.user.getUsername());
						
						setValue(mboFollowupRemote, jsonOfflineEntity, "DESCRIPTION");
						setValue(mboFollowupRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");						
						setValue(mboFollowupRemote, jsonOfflineEntity, "SUPERVISOR");
						setValue(mboFollowupRemote, jsonOfflineEntity, "LEAD", MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "PERSONGROUP", MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "AMCREW");
						setValue(mboFollowupRemote, jsonOfflineEntity, "WORKTYPE");
						setValue(mboFollowupRemote, jsonOfflineEntity, "WOPRIORITY");
						setValue(mboFollowupRemote, jsonOfflineEntity, "REPORTDATE", Date.class);
						setValue(mboFollowupRemote, jsonOfflineEntity, "TARGSTARTDATE", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "TARGCOMPDATE", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "SCHEDSTART", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "SCHEDFINISH", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "ACTSTART", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "ACTFINISH", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "CLASSSTRUCTUREID");
						mboFollowupSetRemote.save();
					} else {
						// Need to throw exception, otherwise this will be considered a successful transaction
						throw new Exception("Cannot create follow up workorder, parent workorder #" + wonum + " not found");
					}
				}
				else{
					//this must be a work order generated from a service request					
					String ticketid = getAutoKeyMap(jsonOfflineEntity, "ORIGRECORDID", "TICKETID");
					MboSetRemote srMboSetRemote = this.user.getSession().getMboSet("SR");
					srMboSetRemote.setQbe("TICKETID", ticketid);
					srMboSetRemote.setQbeExactMatch(true);
					SRRemote origSRRemote = (SRRemote)srMboSetRemote.moveFirst();
					
					// Found the Originating Service Request
					if (origSRRemote != null) {
						mboRemote = (MboRemote)(((SRRemote)origSRRemote).createWorkorder()).get(1);
						long followupId = mboRemote.getLong("WORKORDERID");
						MboSetRemote mboFollowupSetRemote = this.user.getSession().getMboSet("WORKORDER");
						mboFollowupSetRemote.setQbe("WORKORDERID", String.valueOf(followupId));
						mboFollowupSetRemote.setQbeExactMatch(true);
						
						WORemote mboFollowupRemote = (WORemote)mboFollowupSetRemote.moveFirst();
						mboFollowupRemote.setValue("CHANGEBY", this.user.getUsername());
						setValue(mboFollowupRemote, jsonOfflineEntity, "DESCRIPTION");
						setValue(mboFollowupRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");	
						setValue(mboFollowupRemote, jsonOfflineEntity, "SUPERVISOR");
						setValue(mboFollowupRemote, jsonOfflineEntity, "LEAD", MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "PERSONGROUP", MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "AMCREW");
						setValue(mboFollowupRemote, jsonOfflineEntity, "WORKTYPE");
						setValue(mboFollowupRemote, jsonOfflineEntity, "WOPRIORITY");
						setValue(mboFollowupRemote, jsonOfflineEntity, "REPORTDATE", Date.class);
						setValue(mboFollowupRemote, jsonOfflineEntity, "TARGSTARTDATE", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "TARGCOMPDATE", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "SCHEDSTART", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "SCHEDFINISH", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "ACTSTART", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "ACTFINISH", Date.class, MboConstants.DELAYVALIDATION);
						setValue(mboFollowupRemote, jsonOfflineEntity, "CLASSSTRUCTUREID");
						mboFollowupSetRemote.save();
					} else {
						// Need to throw exception, otherwise this will be considered a successful transaction
						throw new Exception("Cannot create workorder from service request, ticket #" + ticketid + " not found");
					}					
				}
			}		
			else {
				// Add New Work Order
				mboRemote = (MboRemote)mboSetRemote.addAtEnd();
				mboRemote.setValue("ORGID", this.user.getOrgId(), MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION);				
				mboRemote.setValue("CHANGEBY", this.user.getUsername());
				
				setValue(mboRemote, jsonOfflineEntity, "SITEID", MboConstants.NOACCESSCHECK | MboConstants.NOVALIDATION);
				setValue(mboRemote, jsonOfflineEntity, "LOCATION");
				setValue(mboRemote, jsonOfflineEntity, "ASSETNUM");
				setValue(mboRemote, jsonOfflineEntity, "DESCRIPTION");
				setValue(mboRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
				setValue(mboRemote, jsonOfflineEntity, "SUPERVISOR");
				setValue(mboRemote, jsonOfflineEntity, "LEAD", MboConstants.DELAYVALIDATION);
				setValue(mboRemote, jsonOfflineEntity, "PERSONGROUP", MboConstants.DELAYVALIDATION);
				setValue(mboRemote, jsonOfflineEntity, "AMCREW");
				setValue(mboRemote, jsonOfflineEntity, "WORKTYPE");
				setValue(mboRemote, jsonOfflineEntity, "WOPRIORITY");
				setValue(mboRemote, jsonOfflineEntity, "REPORTDATE", Date.class);
				setValue(mboRemote, jsonOfflineEntity, "TARGSTARTDATE", Date.class, MboConstants.DELAYVALIDATION);
				setValue(mboRemote, jsonOfflineEntity, "TARGCOMPDATE", Date.class, MboConstants.DELAYVALIDATION);
				setValue(mboRemote, jsonOfflineEntity, "SCHEDSTART", Date.class, MboConstants.DELAYVALIDATION);
				setValue(mboRemote, jsonOfflineEntity, "SCHEDFINISH", Date.class, MboConstants.DELAYVALIDATION);
				setValue(mboRemote, jsonOfflineEntity, "ACTSTART", Date.class, MboConstants.DELAYVALIDATION);
				setValue(mboRemote, jsonOfflineEntity, "ACTFINISH", Date.class, MboConstants.DELAYVALIDATION);				
				setValue(mboRemote, jsonOfflineEntity, "CLASSSTRUCTUREID");
				// Mapping - Tracking XY Coordinates
				setValue(mboRemote, "SERVICEADDRESS.LATITUDEY", jsonOfflineEntity, "LATITUDEY");
				setValue(mboRemote, "SERVICEADDRESS.LONGITUDEX", jsonOfflineEntity, "LONGITUDEX");
			}
			
			// Save the MBO Set
			mboSetRemote.save();	
			
			this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, mboRemote);

		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addWorkOrder:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addWorkOrder:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addWorkOrder:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void editWorkOrder() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WORKORDER";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();
			
			if (woRemote != null && !woRemote.isFlagSet(MboConstants.READONLY)) {
				woRemote.setValue("CHANGEBY", this.user.getUsername());
				setValue(woRemote, jsonOfflineEntity, "DESCRIPTION");
				setValue(woRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
				setValue(woRemote, jsonOfflineEntity, "WOPRIORITY");
				setValue(woRemote, jsonOfflineEntity, "LOCATION");
				setValue(woRemote, jsonOfflineEntity, "ASSETNUM");				
				setValue(woRemote, jsonOfflineEntity, "AMCREW");
				setValue(woRemote, jsonOfflineEntity, "LEAD", MboConstants.DELAYVALIDATION);
				setValue(woRemote, jsonOfflineEntity, "PERSONGROUP", MboConstants.DELAYVALIDATION);
				setValue(woRemote, jsonOfflineEntity, "SUPERVISOR");
				setValue(woRemote, jsonOfflineEntity, "WORKTYPE");
				setValue(woRemote, jsonOfflineEntity, "OWNER");
				setValue(woRemote, jsonOfflineEntity, "OWNERGROUP");	
				setValue(woRemote, jsonOfflineEntity, "REPAIRFACILITY");
				setValue(woRemote, jsonOfflineEntity, "WOPRIORITY");
				setValue(woRemote, jsonOfflineEntity, "TARGSTARTDATE", Date.class, MboConstants.DELAYVALIDATION);
				setValue(woRemote, jsonOfflineEntity, "TARGCOMPDATE", Date.class, MboConstants.DELAYVALIDATION);
				setValue(woRemote, jsonOfflineEntity, "SCHEDSTART", Date.class, MboConstants.DELAYVALIDATION);
				setValue(woRemote, jsonOfflineEntity, "SCHEDFINISH", Date.class, MboConstants.DELAYVALIDATION);
				setValue(woRemote, jsonOfflineEntity, "ACTSTART", Date.class, MboConstants.DELAYVALIDATION);
				setValue(woRemote, jsonOfflineEntity, "ACTFINISH", Date.class, MboConstants.DELAYVALIDATION);		
				setValue(woRemote, jsonOfflineEntity, "CLASSSTRUCTUREID");
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot edit workorder, record not found");				
			}
			
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editWorkOrder:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editWorkOrder:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editWorkOrder:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addToolTrans() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "TOOLTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);

			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// Verify with mapping first using "getAutoKeyMap"
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();

			if (woRemote != null) {
				MboSetRemote toolTransMboSet = woRemote.getMboSet("TOOLTRANS");
				MboRemote toolTransMbo = toolTransMboSet.add();	
				
				// For Maximo 7.5, we will need to fill ITEMSETID
				// For Maximo 7.6, comment out the line below
				setValue(toolTransMbo, jsonOfflineEntity, "ITEMSETID");
				setValue(toolTransMbo, jsonOfflineEntity, "ITEMNUM");
				setValue(toolTransMbo, jsonOfflineEntity, "TOOLRATE");
				setValue(toolTransMbo, jsonOfflineEntity, "TOOLHRS");				
				setValue(toolTransMbo, jsonOfflineEntity, "LOCATION");					
				setValue(toolTransMbo, jsonOfflineEntity, "ASSETNUM");
				setValue(toolTransMbo, jsonOfflineEntity, "TOOLQTY");
				setValue(toolTransMbo, jsonOfflineEntity, "LINECOST");
				
				// Save the MBO Set
					toolTransMboSet.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, toolTransMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add TOOL, record not found");				
			}
		} catch (MXException e) {			
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addToolTrans:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addToolTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addToolTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addSR() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "SR";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
		
			MboRemote srRemote = user.getSession().getMboSet("SR").addAtEnd();
			//set reported values first
			setValue(srRemote, jsonOfflineEntity, "REPORTDATE", Date.class);
			setValue(srRemote, jsonOfflineEntity, "REPORTEDBY");
			setValue(srRemote, jsonOfflineEntity, "REPORTEDPRIORITY", Integer.class);
			setValue(srRemote, jsonOfflineEntity, "SITEID");
			setValue(srRemote, jsonOfflineEntity, "ORGID");
			setValue(srRemote, jsonOfflineEntity, "AFFECTEDPERSON");
			setValue(srRemote, jsonOfflineEntity, "ASSETNUM");
			setValue(srRemote, jsonOfflineEntity, "DESCRIPTION");
			setValue(srRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
			setValue(srRemote, jsonOfflineEntity, "LOCATION");
			setValue(srRemote, jsonOfflineEntity, "CLASSSTRUCTUREID");
			// Mapping - Tracking XY Coordinates
			setValue(srRemote, "SERVICEADDRESS.LATITUDEY", jsonOfflineEntity, "LATITUDEY");
			setValue(srRemote, "SERVICEADDRESS.LONGITUDEX", jsonOfflineEntity, "LONGITUDEX");			
			// Save the MBO Set
			srRemote.getThisMboSet().save();	
			
			this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, srRemote);

		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addSR:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addSR:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addSR:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}	

	public void editAsset() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "ASSET";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("ASSET");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("ASSETUID", getAutoKeyMap(jsonOfflineEntity, "ASSETUID"));
			mboSetRemote.setQbeExactMatch(true);
			
			AssetRemote assetRemote = (AssetRemote)mboSetRemote.moveFirst();
						
			if (assetRemote != null && !assetRemote.isFlagSet(MboConstants.READONLY)) {
				
				setValue(assetRemote, jsonOfflineEntity, "DESCRIPTION");
				setValue(assetRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
				setValue(assetRemote, jsonOfflineEntity, "SERIALNUM");
				setValue(assetRemote, jsonOfflineEntity, "ASSETTYPE");				
				setValue(assetRemote, jsonOfflineEntity, "FAILURECODE");
				setValue(assetRemote, jsonOfflineEntity, "VENDOR");					
				setValue(assetRemote, jsonOfflineEntity, "MANUFACTURER");
				setValue(assetRemote, jsonOfflineEntity, "PURCHASEPRICE");
				setValue(assetRemote, jsonOfflineEntity, "CLASSSTRUCTUREID");
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot edit asset, record not found");				
			}
			
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editAsset:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editAsset:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editAsset:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void moveAsset() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "ASSET";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("ASSET");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("ASSETUID", getAutoKeyMap(jsonOfflineEntity, "ASSETUID"));
			mboSetRemote.setQbeExactMatch(true);
			
			AssetRemote assetRemote = (AssetRemote)mboSetRemote.moveFirst();
			
			          
			if (assetRemote != null && !assetRemote.isFlagSet(MboConstants.READONLY)) {
				//logic for assetmove from online mode
				AssetSetRemote assetSetRemote = (AssetSetRemote) assetRemote.getThisMboSet();
	            assetSetRemote.setMoveAssetPageFlag(true);
	            mbo = assetSetRemote.moveFirst();
	            //now set the values
	            setValue(mbo, jsonOfflineEntity, "NEWSITE");
				setValue(mbo, jsonOfflineEntity, "NEWLOCATION");         
	            //now call the action and save
	            ((AssetSetRemote)mbo.getThisMboSet()).moveAsset();
	            ((AssetSetRemote)mbo.getThisMboSet()).setMoveAssetPageFlag(false);             
	            mbo.getThisMboSet().save();
	            mbo.getThisMboSet().reset(); 				
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot move asset, record not found");				
			}
			
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("moveAsset:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("moveAsset:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("moveAsset:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void updateAssetMeter() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "ASSETMETER";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("ASSETMETER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("ASSETMETERID", getAutoKeyMap(jsonOfflineEntity, "ASSETMETERID").replaceAll(",",""));
			mboSetRemote.setQbeExactMatch(true);
			
			AssetMeterRemote assetMeterRemote = (AssetMeterRemote)mboSetRemote.moveFirst();			
			if (assetMeterRemote != null && !assetMeterRemote.isFlagSet(MboConstants.READONLY)) {
				if(jsonOfflineEntity.optString("READINGTYPE").equalsIgnoreCase("DELTA")){
					assetMeterRemote.setValue("ISDELTA", true, MboConstants.NOVALIDATION | MboConstants.NOACCESSCHECK);
				}
				setValue(assetMeterRemote, "NEWREADING", jsonOfflineEntity, "NEWREADING", MboConstants.NOVALIDATION | MboConstants.NOACCESSCHECK);
				setValue(assetMeterRemote, "NEWREADINGDATE", jsonOfflineEntity, "NEWREADINGDATE", Date.class, MboConstants.DELAYVALIDATION);
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot update assetmeter, record not found");				
			}
			
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("updateAssetMeter:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("updateAssetMeter:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("updateAssetMeter:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}

	public void updateLocationMeter() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "LOCATIONMETER";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("LOCATIONMETER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("LOCATIONMETERID", getAutoKeyMap(jsonOfflineEntity, "LOCATIONMETERID").replaceAll(",",""));
			mboSetRemote.setQbeExactMatch(true);
			
			LocationMeterRemote locMeterRemote = (LocationMeterRemote)mboSetRemote.moveFirst();			
			
			if (locMeterRemote != null && !locMeterRemote.isFlagSet(MboConstants.READONLY)) {
				if(jsonOfflineEntity.optString("READINGTYPE").equalsIgnoreCase("DELTA")){
					locMeterRemote.setValue("ISDELTA", true, MboConstants.NOVALIDATION | MboConstants.NOACCESSCHECK);
				}
				setValue(locMeterRemote, "NEWREADING", jsonOfflineEntity, "NEWREADING", MboConstants.NOVALIDATION | MboConstants.NOACCESSCHECK);
				setValue(locMeterRemote, "NEWREADINGDATE", jsonOfflineEntity, "NEWREADINGDATE", Date.class, MboConstants.DELAYVALIDATION);
				
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot update location meter, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("updateLocationMeter:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("updateLocationMeter:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("updateLocationMeter:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addTaskWorkOrder() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WORKORDER";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);

			// Adding a task to a work order requires finding the parent of the task work order
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value			
			mboSetRemote.setQbe("WONUM", getAutoKeyMap(jsonOfflineEntity, "PARENT", "WONUM"));
			mboSetRemote.setQbe("SITEID", jsonOfflineEntity.getString("SITEID"));
			mboSetRemote.setQbeExactMatch(true);
			
			MboRemote mboRemote = (MboRemote)mboSetRemote.moveFirst();
			if (mboRemote != null) {
				MboSetRemote tasksMboSet = mboRemote.getMboSet("WOACTIVITY");
				
				String entityTaskId = jsonOfflineEntity.optString("TASKID", "0");
				int iTaskSeq = 0;
				if (tasksMboSet.count() > 0) {
					// If there are no existing tasks...
					if (entityTaskId != null && entityTaskId.length() > 0)
						iTaskSeq = Integer.parseInt(entityTaskId);
					if (iTaskSeq == 0)
						iTaskSeq = iTaskSeq + 10;
				} else {
					// Check if this passed in task id already exists... 
					// if so... get the next available taskid instead
					// else... use the one that is passed in
					tasksMboSet.setWhere("TASKID = " + entityTaskId);
					tasksMboSet.setQbeExactMatch(true);

					// Already exists if count > 0
					if (tasksMboSet.count() > 0) {
						// reset the task set and find the last taskid in list 
						tasksMboSet.resetQbe();
						tasksMboSet.setOrderBy("TASKID");
						
			            MboRemote lastTask = null;
		            	lastTask = (MboRemote)tasksMboSet.moveLast();
		                if (lastTask != null) 
		                	iTaskSeq = lastTask.getInt("TASKID");

		                // increment the last taskid by 10 for the next taskid
			            iTaskSeq = iTaskSeq + 10;
					} else {
						// the passed in task id does not exist... so just use the one passed in
						if (entityTaskId != null && entityTaskId.length() > 0)
							iTaskSeq = Integer.parseInt(entityTaskId);
						if (iTaskSeq == 0)
							iTaskSeq = iTaskSeq + 10;
					}	
				}
				// Add the task
				MboRemote taskMboRemote = (MboRemote)tasksMboSet.add();
				taskMboRemote.setValue("TASKID", iTaskSeq);

				setValue(taskMboRemote, jsonOfflineEntity, "DESCRIPTION");
				setValue(taskMboRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
				setValue(taskMboRemote, jsonOfflineEntity, "OBSERVATION");
				setValue(taskMboRemote, jsonOfflineEntity, "MEASUREMENTVALUE");
				setValue(taskMboRemote, jsonOfflineEntity, "PLUSTACCOMP");
				setValue(taskMboRemote, jsonOfflineEntity, "PLUSTCOMP");
				setValue(taskMboRemote, jsonOfflineEntity, "PLUSTREASON");

				tasksMboSet.save();

				mboSetRemote.save();

				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, taskMboRemote);			
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add task, record not found");
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addTaskWorkOrder:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addTaskWorkOrder:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addTaskWorkOrder:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	

	public void updateWorkOrderStatus() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WORKORDER";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();
			
			if (woRemote != null) {
				if (!woRemote.getString("STATUS").equalsIgnoreCase(jsonOfflineEntity.optString("STATUS"))) {
					woRemote.checkForOpenStatus();
					Date lastStatusDate = woRemote.getDate("STATUSDATE");
					Date newStatusDate = DateTimeParser.parseDateTime(jsonOfflineEntity.optString("STATUSDATE"));
					if (newStatusDate.before(lastStatusDate)){
						newStatusDate = this.user.getSession().getMXServerRemote().getDate();
					}
					woRemote.changeStatus(jsonOfflineEntity.getString("STATUS"), newStatusDate, null);
				}
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot change workorder status, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("updateWorkOrderStatus:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("updateWorkOrderStatus:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("updateWorkOrderStatus:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void updateSRStatus() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "SR";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("SR");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("TICKETUID", getAutoKeyMap(jsonOfflineEntity, "TICKETUID"));
			mboSetRemote.setQbeExactMatch(true);
			SRRemote srRemote = (SRRemote)mboSetRemote.moveFirst();
			
			if (srRemote != null) {
				if (!srRemote.getString("STATUS").equalsIgnoreCase(jsonOfflineEntity.optString("STATUS"))) {
					srRemote.checkForOpenStatus();
					Date lastStatusDate = srRemote.getDate("STATUSDATE");
					Date newStatusDate = DateTimeParser.parseDateTime(jsonOfflineEntity.optString("STATUSDATE"));
					if (newStatusDate.before(lastStatusDate)){
						newStatusDate = this.user.getSession().getMXServerRemote().getDate();
					}					
					srRemote.changeStatus(jsonOfflineEntity.getString("STATUS"), newStatusDate, null);
				}				
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot change SR status, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("updateSRStatus:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("updateSRStatus:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("updateSRStatus:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void updateWorkOrderTask() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WORKORDER";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();
			
			if (woRemote != null && !woRemote.isFlagSet(MboConstants.READONLY)) {
				
				setValue(woRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
				setValue(woRemote, jsonOfflineEntity, "OBSERVATION");
				setValue(woRemote, jsonOfflineEntity, "MEASUREMENTVALUE");

				woRemote.setValue("CHANGEBY", this.user.getUsername());
				woRemote.setValue("CHANGEDATE", this.user.getSession().getMXServerRemote().getDate());
				
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot update task, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("updateWorkOrderTask:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("updateWorkOrderTask:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("updateWorkOrderTask:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addAssignment() throws Exception {
		try {
			String offlineEntityName = "ASSIGNMENT";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote  = this.user.getSession().getMboSet("WORKORDER");
			mboSetRemote.setQbe("WONUM", getAutoKeyMap(jsonOfflineEntity, "WONUM"));
			mboSetRemote.setQbe("SITEID", jsonOfflineEntity.optString("SITEID"));
			mboSetRemote.setQbe("ORGID", jsonOfflineEntity.optString("ORGID"));
			mboSetRemote.setQbeExactMatch(true);
			
			MboRemote woRemote = mboSetRemote.moveFirst();
			
			if(woRemote != null){
				
				MboSetRemote assigmentsRemote = woRemote.getMboSet("SHOWASSIGNMENT");
				
				MboRemote assignmentRemote = assigmentsRemote.add();
				
				setValue(assignmentRemote, jsonOfflineEntity, "LABORCODE");
				setValue(assignmentRemote, jsonOfflineEntity, "STARTDATE", Date.class);
				setValue(assignmentRemote, jsonOfflineEntity, "LABORCODE");
				setValue(assignmentRemote, jsonOfflineEntity, "CRAFT");
				
				assigmentsRemote.save();
				mboSetRemote.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, assignmentRemote);
			}
			else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot find workorder for assignment, record not found");	
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("insertassignment:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("insertassignment:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("insertassignment:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	// public void completeAssignment() throws Exception {
	// 	try {
	// 		String offlineEntityName = "ASSIGNMENT";
	// 		JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
	// 		MboSetRemote mboSetRemote  = this.user.getSession().getMboSet("WORKORDER");
	// 		mboSetRemote.setQbe("WONUM", jsonOfflineEntity.optString("WONUM"));
	// 		mboSetRemote.setQbe("SITEID", jsonOfflineEntity.optString("SITEID"));
	// 		mboSetRemote.setQbe("ORGID", jsonOfflineEntity.optString("ORGID"));
	// 		mboSetRemote.setQbeExactMatch(true);
			
	// 		MboRemote woRemote = mboSetRemote.moveFirst();
			
	// 		if(woRemote != null){
				
	// 			MboSetRemote assigmentsRemote = woRemote.getMboSet("SHOWASSIGNMENT");
	// 			assigmentsRemote.setQbe("ASSIGNMENTID", getAutoKeyMap(jsonOfflineEntity, "ASSIGNMENTID"));
	// 			MboRemote mboRemote = assigmentsRemote.moveFirst();
			
	// 			if(mboRemote != null){
	// 				((AssignmentRemote)mboRemote).completeAssignment();
					
	// 				assigmentsRemote.save();
	// 				mboSetRemote.save();
					
	// 				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, mboRemote);
	// 			}
	// 			else {
	// 				// Need to throw exception, otherwise this will be considered a successful transaction
	// 				throw new Exception("Cannot complete assignment, record not found");	
	// 			}
	// 		}
	// 		else {
	// 			// Need to throw exception, otherwise this will be considered a successful transaction
	// 			throw new Exception("Cannot complete assignment, record not found");	
	// 		}
	// 	} catch (MXException e) {
	// 		String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
	// 		log.error("completeassignment:", new Exception(e));
	// 		throw new OfflineException(msg, e);
	// 	} catch (RemoteException e) {
	// 		log.error("completeassignment:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	} catch (Exception e) {
	// 		log.error("completeassignment:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	}
	// }

	public void addLabTrans() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "LABTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();

			if (woRemote != null) {
				MboSetRemote labTransMboSet = woRemote.getMboSet("LABTRANS");
				MboRemote labTransMbo = labTransMboSet.add();
				
				this.futureDateExceptionHandler(jsonOfflineEntity, "STARTDATE");
				
				// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
				// Verify with mapping first using "getAutoKeyMap"
				labTransMbo.setValue("REFWO", getAutoKeyMap(jsonOfflineEntity, "WONUM"));
				setValue(labTransMbo, jsonOfflineEntity, "CRAFT");
				setValue(labTransMbo, jsonOfflineEntity, "LABORCODE");
				setValue(labTransMbo, jsonOfflineEntity, "TASKID");
				setValue(labTransMbo, jsonOfflineEntity, "STARTDATE", Date.class);
				setValue(labTransMbo, "STARTTIME", jsonOfflineEntity, "STARTDATE", Date.class);
				setValue(labTransMbo, jsonOfflineEntity, "REGULARHRS");
				setValue(labTransMbo, jsonOfflineEntity, "TRANSTYPE");
				if (!isNull(jsonOfflineEntity.opt("PREMIUMPAYHOURS"))) {
					setValue(labTransMbo, jsonOfflineEntity, "PREMIUMPAYCODE");
					setValue(labTransMbo, jsonOfflineEntity, "PREMIUMPAYHOURS");
				}
			
				// Save the MBO Set
				labTransMboSet.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, labTransMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add labor transaction, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addLabTrans:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addLabTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addLabTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addLabRep() throws Exception {
		try {
			String offlineEntityName = "LABTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
		
			MboSetRemote labTransMboSet = this.user.getSession().getMboSet("LABTRANS");
			MboRemote labRemote = labTransMboSet.addAtEnd();
			if (labRemote != null) {
				
				this.futureDateExceptionHandler(jsonOfflineEntity, "STARTDATE");				
				
				setValue(labRemote, jsonOfflineEntity, "SITEID");
				// Users can add labor hours to a locally created work order.  So we need to grab the "real" wonum from the map
				if(isNull(jsonOfflineEntity.opt("WONUM")) == false)
					labRemote.setValue("WONUM", getAutoKeyMap(jsonOfflineEntity, "WONUM"));
				if(isNull(jsonOfflineEntity.opt("TICKETID")) == false)
					labRemote.setValue("TICKETID", getAutoKeyMap(jsonOfflineEntity, "TICKETID"));
				setValue(labRemote, jsonOfflineEntity, "GENAPPRSERVRECEIPT");
				setValue(labRemote, jsonOfflineEntity, "CRAFT");
				setValue(labRemote, jsonOfflineEntity, "LABORCODE");
				setValue(labRemote, jsonOfflineEntity, "TASKID");
				setValue(labRemote, jsonOfflineEntity, "TRANSTYPE");
				setValue(labRemote, jsonOfflineEntity, "STARTDATE", Date.class);
				setValue(labRemote, jsonOfflineEntity, "STARTTIME", Date.class);
				setValue(labRemote, jsonOfflineEntity, "SKILLLEVEL");
				setValue(labRemote, jsonOfflineEntity, "PREMIUMPAYCODE");
				setValue(labRemote, jsonOfflineEntity, "PREMIUMPAYHOURS");
				setValue(labRemote, jsonOfflineEntity, "REGULARHRS");
				setValue(labRemote, jsonOfflineEntity, "LOCATION");
				setValue(labRemote, jsonOfflineEntity, "TICKETCLASS");
				setValue(labRemote, jsonOfflineEntity, "ASSETNUM");
				setValue(labRemote, jsonOfflineEntity, "TIMERSTATUS");
				
				String gldebitacct = labRemote.getString("GLDEBITACCT");
				String glcreditacct = labRemote.getString("GLCREDITACCT");
				if(gldebitacct.contains("?")){
					labRemote.setValueNull("GLDEBITACCT");
				}
				if(glcreditacct.contains("?")){
					labRemote.setValueNull("GLCREDITACCT");
				}
				// Save the MBO Set
				labTransMboSet.save();
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, labRemote);
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addLabRep:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addLabRep:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addLabRep:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void startTimer() throws Exception {
		try {
			String offlineEntityName = "LABTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			//Get Users WO Set
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			//grabs the specific work order that we are working on based off the unique workorder id
			mboSetRemote.setQbe("WORKORDERID",  getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote) mboSetRemote.moveFirst();
			if(woRemote != null)
			{
				MboSetRemote labTransMboSet = woRemote.getMboSet("LABTRANS");
				labTransMboSet.setQbe("LABORCODE", jsonOfflineEntity.optString("LABORCODE"));
				labTransMboSet.setQbe("TIMERSTATUS", "ACTIVE");
				labTransMboSet.setQbeExactMatch(true);				
				// If workorder does not have an online active labtrans from that user then add else ignore offline start timer
				if(labTransMboSet.isEmpty())
				{
					//creates new labor transaction and returns that labtrans mbo
					MboRemote newLabTrans = labTransMboSet.add();
					newLabTrans.setValue("REFWO", getAutoKeyMap(jsonOfflineEntity, "WONUM"));					
					//populating the new labor transaction from the offline transaction
					setValue(newLabTrans, jsonOfflineEntity, "STARTDATE", Date.class);
					setValue(newLabTrans, "STARTTIME", jsonOfflineEntity, "STARTDATE", Date.class);
					setValue(newLabTrans, jsonOfflineEntity, "TIMERSTATUS");					
					setValue(newLabTrans, jsonOfflineEntity, "CRAFT");
					setValue(newLabTrans, jsonOfflineEntity, "LABORCODE");
					setValue(newLabTrans, jsonOfflineEntity, "TRANSTYPE");
					//saves the labor trans set
					mboSetRemote.save();	
					this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, newLabTrans);
				}
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot start timer, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("startTimer:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("startTimer:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("startTimer:", e);
			throw new OfflineException(e.getMessage(), e);
		}		
	}

	public void stopTimer() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "LABTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value			
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.getMbo(0);
			
			if (woRemote != null) {
                MboSetRemote labTransMboSet = woRemote.getMboSet("LABTRANS");
				// Filter labtrans set to that specific user and most recent start time/date
				labTransMboSet.setQbe("LABORCODE", jsonOfflineEntity.optString("LABORCODE"));
				labTransMboSet.setQbe("TIMERSTATUS", "ACTIVE");
				labTransMboSet.setQbeExactMatch(true);		

				MboRemote labTransMbo = labTransMboSet.moveFirst();				
				
				setValue(labTransMbo, jsonOfflineEntity, "FINISHDATE", Date.class);
				setValue(labTransMbo, "FINISHTIME", jsonOfflineEntity, "FINISHDATE", Date.class, MboConstants.NOVALIDATION);

				// Save the MBO Set
				labTransMboSet.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, labTransMbo);

			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot stop timer, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("stopTimer:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("stopTimer:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("stopTimer:", e);
			throw new OfflineException(e.getMessage(), e);
		}		
	}

	public void approveLabTrans() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "LABTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("LABTRANS");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value			
			mboSetRemote.setQbe("LABTRANSID", getAutoKeyMap(jsonOfflineEntity, "LABTRANSID"));
			mboSetRemote.setQbeExactMatch(true);
			LabTransRemote ltRemote = (LabTransRemote)mboSetRemote.getMbo(0);
			
			if (ltRemote != null) {
				//call MBO method to approve selected labor transaction
				ltRemote.approveLaborTransaction();

				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot approve labor, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("approveLabTrans:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("approveLabTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("approveLabTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		}		
	}
	
	public void editLabRep() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "LABTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("LABTRANS");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value			
			mboSetRemote.setQbe("LABTRANSID", getAutoKeyMap(jsonOfflineEntity, "LABTRANSID"));
			mboSetRemote.setQbeExactMatch(true);
			LabTransRemote ltRemote = (LabTransRemote)mboSetRemote.getMbo(0);
			
			if (ltRemote != null) {
				//call MBO method to approve selected labor transaction
				setValue(ltRemote, jsonOfflineEntity, "TASKID");

				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot edit labor, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editLabRep:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editLabRep:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editLabRep:", e);
			throw new OfflineException(e.getMessage(), e);
		}		
	}
	
	public void addMatUseTrans() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MATUSETRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);

			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// Verify with mapping first using "getAutoKeyMap"
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();

			if (woRemote != null) {
				MboSetRemote matUseTransMboSet = woRemote.getMboSet("MATUSETRANS");
				MboRemote matUseTransMbo = matUseTransMboSet.add();
			
				String lineType = jsonOfflineEntity.optString("LINETYPE", "MATERIAL");
				// Default Line Type to MATERIAL
				if (lineType == null || lineType.length() == 0)
					lineType = "MATERIAL";			
				
				if (lineType.equalsIgnoreCase("MATERIAL")) {
					setValue(matUseTransMbo, jsonOfflineEntity, "LINETYPE");
					setValue(matUseTransMbo, jsonOfflineEntity, "UNITCOST");
					setValue(matUseTransMbo, jsonOfflineEntity, "DESCRIPTION");				
					setValue(matUseTransMbo, jsonOfflineEntity, "ISSUETYPE");					
					setValue(matUseTransMbo, jsonOfflineEntity, "QUANTITY");
				} else {
					setValue(matUseTransMbo, jsonOfflineEntity, "LINETYPE");
					setValue(matUseTransMbo, jsonOfflineEntity, "ITEMNUM");
					setValue(matUseTransMbo, jsonOfflineEntity, "STORELOC");
					setValue(matUseTransMbo, jsonOfflineEntity, "BINNUM");
					setValue(matUseTransMbo, jsonOfflineEntity, "ISSUETYPE");					
					setValue(matUseTransMbo, jsonOfflineEntity, "QUANTITY");
					if (isNull(jsonOfflineEntity.opt("ROTASSETNUM")) == false) {
						setValue(matUseTransMbo, jsonOfflineEntity, "ROTASSETNUM");
					}
				}
				
				// Save the MBO Set
				matUseTransMboSet.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, matUseTransMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add material, record not found");				
			}
		} catch (MXException e) {			
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addMatUseTrans:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addMatUseTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addMatUseTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}

	public void addMatUseTransIssue() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MATUSETRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);

			LocationSetRemote mboSetRemote = (LocationSetRemote)this.user.getSession().getMboSet("LOCATIONS");
			mboSetRemote.setApp("INVISSUE");
			mboSetRemote.findStoreRooms();
			mboSetRemote.filterLocSet(this.user.getSiteId());
			
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// Verify with mapping first using "getAutoKeyMap"
			mboSetRemote.setQbe("LOCATION", getAutoKeyMap(jsonOfflineEntity, "STORELOC"));
			mboSetRemote.setQbeExactMatch(true);
			LocationRemote locRemote = (LocationRemote)mboSetRemote.moveFirst();

			if (locRemote != null) {
				MboSetRemote matUseTransMboSet = locRemote.getMboSet("MATUSETRANSISSUE");
				MboRemote matUseTransMbo = matUseTransMboSet.add();
			
				String lineType = jsonOfflineEntity.optString("LINETYPE", "MATERIAL");
				// Default Line Type to MATERIAL
				if (lineType == null || lineType.length() == 0)
					lineType = "MATERIAL";			
				
				if (lineType.equalsIgnoreCase("MATERIAL")) {
					setValue(matUseTransMbo, jsonOfflineEntity, "ISSUETYPE");
					setValue(matUseTransMbo, jsonOfflineEntity, "LINETYPE");
					setValue(matUseTransMbo, jsonOfflineEntity, "UNITCOST");
					setValue(matUseTransMbo, jsonOfflineEntity, "DESCRIPTION");									
					setValue(matUseTransMbo, jsonOfflineEntity, "QUANTITY");
					setValue(matUseTransMbo, jsonOfflineEntity, "LOCATION");
					setValue(matUseTransMbo, jsonOfflineEntity, "ASSETNUM");
					setValue(matUseTransMbo, jsonOfflineEntity, "WONUM");
				} else {
					setValue(matUseTransMbo, jsonOfflineEntity, "ISSUETYPE");
					setValue(matUseTransMbo, jsonOfflineEntity, "LINETYPE");
					setValue(matUseTransMbo, jsonOfflineEntity, "ITEMNUM");
					setValue(matUseTransMbo, jsonOfflineEntity, "STORELOC");
					setValue(matUseTransMbo, jsonOfflineEntity, "BINNUM");
					setValue(matUseTransMbo, jsonOfflineEntity, "QUANTITY");
					setValue(matUseTransMbo, jsonOfflineEntity, "LOCATION");
					setValue(matUseTransMbo, jsonOfflineEntity, "ASSETNUM");
					setValue(matUseTransMbo, jsonOfflineEntity, "WONUM");
					if (isNull(jsonOfflineEntity.opt("ISSUETO")) == false) {
						setValue(matUseTransMbo, jsonOfflineEntity, "ISSUETO");
					}
					if (isNull(jsonOfflineEntity.opt("ROTASSETNUM")) == false) {
						setValue(matUseTransMbo, jsonOfflineEntity, "ROTASSETNUM");
					}
				}
				
				// Save the MBO Set
				matUseTransMboSet.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, matUseTransMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add material, record not found");				
			}
		} catch (MXException e) {			
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addMatUseTrans:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addMatUseTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addMatUseTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}

	public void addMatRecTransTransferOut() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MATRECTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);

			LocationSetRemote mboSetRemote = (LocationSetRemote)this.user.getSession().getMboSet("LOCATIONS");
			mboSetRemote.setApp("INVISSUE");
			mboSetRemote.findStoreRooms();
			mboSetRemote.filterLocSet(this.user.getSiteId());
			
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// Verify with mapping first using "getAutoKeyMap"
			mboSetRemote.setQbe("LOCATION", getAutoKeyMap(jsonOfflineEntity, "FROMSTORELOC"));
			mboSetRemote.setQbeExactMatch(true);
			LocationRemote locRemote = (LocationRemote)mboSetRemote.moveFirst();

			if (locRemote != null) {
				MboSetRemote matRecTransMboSet = locRemote.getMboSet("MATRECTRANSOUT");
				MboRemote matRecTransMbo = matRecTransMboSet.add();
				setValue(matRecTransMbo, jsonOfflineEntity, "LINETYPE");
				setValue(matRecTransMbo, jsonOfflineEntity, "ITEMNUM");
				setValue(matRecTransMbo, jsonOfflineEntity, "NEWSITE");
				setValue(matRecTransMbo, jsonOfflineEntity, "TOSTORELOC");
				setValue(matRecTransMbo, jsonOfflineEntity, "FROMBIN");
				setValue(matRecTransMbo, jsonOfflineEntity, "TOBIN");
				//RECEIPTQUANTITY is non-persistent mbo field, which does not exist in the table
				setValue(matRecTransMbo, "RECEIPTQUANTITY", jsonOfflineEntity, "QUANTITY");
				setValue(matRecTransMbo, jsonOfflineEntity, "CONVERSION");
				if (isNull(jsonOfflineEntity.opt("ROTASSETNUM")) == false) {
					setValue(matRecTransMbo, jsonOfflineEntity, "ROTASSETNUM");
				}

				// Save the MBO Set
				matRecTransMboSet.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, matRecTransMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add material, record not found");				
			}
		} catch (MXException e) {			
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addMatUseTrans:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addMatUseTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addMatUseTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}

	public void addMatRecTransTransferIn() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MATRECTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);

			LocationSetRemote mboSetRemote = (LocationSetRemote)this.user.getSession().getMboSet("LOCATIONS");
			mboSetRemote.setApp("INVISSUE");
			mboSetRemote.findStoreRooms();
			mboSetRemote.filterLocSet(this.user.getSiteId());
			
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// Verify with mapping first using "getAutoKeyMap"
			mboSetRemote.setQbe("LOCATION", getAutoKeyMap(jsonOfflineEntity, "TOSTORELOC"));
			mboSetRemote.setQbeExactMatch(true);
			LocationRemote locRemote = (LocationRemote)mboSetRemote.moveFirst();

			if (locRemote != null) {
				MboSetRemote matRecTransMboSet = locRemote.getMboSet("MATRECTRANSIN");
				MboRemote matRecTransMbo = matRecTransMboSet.add();
			
				setValue(matRecTransMbo, jsonOfflineEntity, "LINETYPE");
				setValue(matRecTransMbo, jsonOfflineEntity, "ITEMNUM");
				setValue(matRecTransMbo, jsonOfflineEntity, "FROMSITEID");
				setValue(matRecTransMbo, jsonOfflineEntity, "FROMSTORELOC");
				setValue(matRecTransMbo, jsonOfflineEntity, "FROMBIN");
				setValue(matRecTransMbo, jsonOfflineEntity, "TOBIN");
				//RECEIPTQUANTITY is non-persistent mbo field, which does not exist in the table
				setValue(matRecTransMbo, "RECEIPTQUANTITY", jsonOfflineEntity, "QUANTITY");
				setValue(matRecTransMbo, jsonOfflineEntity, "CONVERSION");
				if (isNull(jsonOfflineEntity.opt("ROTASSETNUM")) == false) {
					setValue(matRecTransMbo, jsonOfflineEntity, "ROTASSETNUM");
				}
				
				// Save the MBO Set
				matRecTransMboSet.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, matRecTransMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add material, record not found");				
			}
		} catch (MXException e) {			
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addMatUseTrans:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addMatUseTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addMatUseTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addWorkLog() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WORKLOG";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
							
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();

			if (woRemote != null) {
				MboSetRemote workLogMboSet = woRemote.getMboSet("WORKLOG");
				MboRemote workLogMbo = workLogMboSet.add();
				
				String logType = jsonOfflineEntity.optString("LOGTYPE", "WORK");
				// Default Log Type to WORK
				if (logType == null || logType.length() == 0)
					logType = "WORK";
				
				workLogMbo.setValue("LOGTYPE", logType);
				setValue(workLogMbo, jsonOfflineEntity, "DESCRIPTION");
				setValue(workLogMbo, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
				setValue(workLogMbo, jsonOfflineEntity, "CREATEDATE", Date.class, MboConstants.NOACCESSCHECK);
				
				if (logType.equalsIgnoreCase("WORK"))
					workLogMbo.setValue("MODIFYBY", this.user.getPersonId());
				
				// Save the MBO Set
				workLogMboSet.save();
				mboSetRemote.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, workLogMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add work log, record not found");				
			}

		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addWorkLog:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addWorkLog:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addWorkLog:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}

	public void addWPLabor() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WPLABOR";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
							
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();

			if (woRemote != null) {
				MboSetRemote wplaborMboSet = woRemote.getMboSet("WPLABOR");
				MboRemote wplaborMbo = wplaborMboSet.add();
				
				setValue(wplaborMbo, jsonOfflineEntity, "LABORCODE", MboConstants.DELAYVALIDATION);
				setValue(wplaborMbo, jsonOfflineEntity, "LABORHRS", MboConstants.DELAYVALIDATION);
				setValue(wplaborMbo, jsonOfflineEntity, "CRAFT", MboConstants.DELAYVALIDATION);
				setValue(wplaborMbo, jsonOfflineEntity, "VENDOR", MboConstants.DELAYVALIDATION);
				setValue(wplaborMbo, jsonOfflineEntity, "SKILLLEVEL", MboConstants.DELAYVALIDATION);
				setValue(wplaborMbo, jsonOfflineEntity, "AMCREW", MboConstants.DELAYVALIDATION);
				setValue(wplaborMbo, jsonOfflineEntity, "QUANTITY", Integer.class, MboConstants.DELAYVALIDATION);
				
				// Save the MBO Set
				wplaborMboSet.save();
				mboSetRemote.save();	
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, wplaborMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add planned labor, record not found");				
			}

		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addwplabor:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addwplabor:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addwplabor:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void editWPLabor() throws Exception { // This needs to be implemented for updating an existing planned labor
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WPLABOR";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
							
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();

			if (woRemote != null) {
				MboSetRemote wplaborMboSet = woRemote.getMboSet("WPLABOR");
				wplaborMboSet.setQbe("WPLABORUID", getAutoKeyMap(jsonOfflineEntity, "WPLABORUID"));
				wplaborMboSet.setQbeExactMatch(true);
				
				MboRemote wplaborMbo = (MboRemote)wplaborMboSet.moveFirst();
				
				setValue(wplaborMbo, jsonOfflineEntity, "LABORCODE");
				setValue(wplaborMbo, jsonOfflineEntity, "LABORHRS");
				setValue(wplaborMbo, jsonOfflineEntity, "CRAFT");
				setValue(wplaborMbo, jsonOfflineEntity, "VENDOR");
				setValue(wplaborMbo, jsonOfflineEntity, "SKILLLEVEL");
				setValue(wplaborMbo, jsonOfflineEntity, "AMCREW");
				setValue(wplaborMbo, jsonOfflineEntity, "QUANTITY", Integer.class);
				
				// Save the MBO Set
				wplaborMboSet.save();
				mboSetRemote.save();	
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot edit planned labor, record not found");				
			}

		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editwplabor:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editwplabor:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editwplabor:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}	

	public void addWPMaterial() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WPMATERIAL";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);

			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// Verify with mapping first using "getAutoKeyMap"
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();

			if (woRemote != null) {
				MboSetRemote wpmaterialMboSet = woRemote.getMboSet("WPMATERIAL");
				MboRemote wpmaterialMbo = wpmaterialMboSet.add();
			
//				String lineType = jsonOfflineEntity.optString("LINETYPE", "MATERIAL");
				// Default Line Type to MATERIAL
//				if (lineType == null || lineType.length() == 0)
//					lineType = "MATERIAL";			
				
				setValue(wpmaterialMbo, jsonOfflineEntity, "LINETYPE");
				setValue(wpmaterialMbo, jsonOfflineEntity, "ITEMNUM");
				setValue(wpmaterialMbo, jsonOfflineEntity, "LOCATION");
				setValue(wpmaterialMbo, jsonOfflineEntity, "ITEMQTY");
				setValue(wpmaterialMbo, jsonOfflineEntity, "STORELOCSITE");
				setValue(wpmaterialMbo, jsonOfflineEntity, "UNITCOST");
				setValue(wpmaterialMbo, jsonOfflineEntity, "RESTYPE");
				setValue(wpmaterialMbo, jsonOfflineEntity, "DESCRIPTION");
				setValue(wpmaterialMbo, jsonOfflineEntity, "REQUIREDATE", Date.class);
				
				// Save the MBO Set
				wpmaterialMboSet.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, wpmaterialMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add planned material, record not found");				
			}
		} catch (MXException e) {			
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addwpmaterial:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addwpmaterial:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addwpmaterial:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	
	public void editWPMaterial() throws Exception { // This needs to be implemented for updating an existing planned material
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WPMATERIAL";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
							
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();

			if (woRemote != null) {
				MboSetRemote wpmaterialMboSet = woRemote.getMboSet("WPMATERIAL");
				wpmaterialMboSet.setQbe("SERVRECTRANSID", getAutoKeyMap(jsonOfflineEntity, "SERVRECTRANS"));
				wpmaterialMboSet.setQbeExactMatch(true);
				
				MboRemote wpmaterialMbo = (MboRemote)wpmaterialMboSet.moveFirst();
				
				setValue(wpmaterialMbo, jsonOfflineEntity, "LINETYPE");
				setValue(wpmaterialMbo, jsonOfflineEntity, "ITEMNUM");
				setValue(wpmaterialMbo, jsonOfflineEntity, "LOCATION");
				setValue(wpmaterialMbo, jsonOfflineEntity, "ITEMQTY");
				setValue(wpmaterialMbo, jsonOfflineEntity, "STORELOCSITE");
				setValue(wpmaterialMbo, jsonOfflineEntity, "UNITCOST");
				setValue(wpmaterialMbo, jsonOfflineEntity, "RESTYPE");
				setValue(wpmaterialMbo, jsonOfflineEntity, "DESCRIPTION");
				setValue(wpmaterialMbo, jsonOfflineEntity, "REQUIREDATE", Date.class);
				// Save the MBO Set
				wpmaterialMboSet.save();
				mboSetRemote.save();	
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot edit planned material, record not found");				
			}

		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editwpmaterial:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editwpmaterial:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editwpmaterial:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}	
	
	public void editFailureReport() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "FAILUREREPORT";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();
			
			if (woRemote != null) {
				// Save Failure Reporting				
				if (isNull(jsonOfflineEntity.opt("FAILURECODE")) == false){
					
					//If cause code was entered and the failure code has not been changed
					//reset the entire failure report set to allow for editing.
					String existingFailureCode = woRemote.getString("FAILURECODE");
					MboSetRemote failureReportSet;
					
					if (isNull(jsonOfflineEntity.opt("CAUSECODE")) == false && existingFailureCode.equals(jsonOfflineEntity.optString("FAILURECODE"))) {
						failureReportSet = woRemote.getMboSet("FAILUREREPORT");
						failureReportSet.deleteAll();
						failureReportSet.save();
					}
					if (!existingFailureCode.equals(jsonOfflineEntity.optString("FAILURECODE"))){						
						// Reset failure hierarchy
						setValue(woRemote, jsonOfflineEntity, "FAILURECODE");
						woRemote.getThisMboSet().save();
						woRemote.getThisMboSet().reset();
						woRemote = (WORemote)mboSetRemote.moveFirst();
					}
					
					setValue(woRemote, jsonOfflineEntity, "PROBLEMCODE");					
					
					if (isNull(jsonOfflineEntity.opt("CAUSECODE")) == false) {
						failureReportSet = woRemote.getMboSet("FAILUREREPORT");
						MboRemote causeRemote = (MboRemote) failureReportSet.add();
						setValue(causeRemote, "FAILURECODE", jsonOfflineEntity, "CAUSECODE");
						
						if (isNull(jsonOfflineEntity.opt("REMEDYCODE")) == false) {
							MboRemote remedyRemote = (MboRemote) failureReportSet.add();
							setValue(remedyRemote, "FAILURECODE", jsonOfflineEntity, "REMEDYCODE");
						}
					}
					// Save the MBO Set
					woRemote.getThisMboSet().save();
				}	
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot edit failure reporting, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editFailureReport:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editFailureReport:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editFailureReport:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void editMultiProgress() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MULTIASSETLOCCI";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();
			
			if (woRemote != null && !woRemote.isFlagSet(MboConstants.READONLY)) {
				MboSetRemote multiAssetMboSet = woRemote.getMboSet("MULTIASSETLOCCI");
				multiAssetMboSet.setQbe("MULTIID", jsonOfflineEntity.getString("MULTIID"));
				multiAssetMboSet.setQbeExactMatch(true);
				
				MboRemote multAssetMbo = multiAssetMboSet.moveFirst();
				setValue(multAssetMbo, jsonOfflineEntity, "PROGRESS");
				
				multiAssetMboSet.save();
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot edit multi progress, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editMultiProgress:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editMultiProgress:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editMultiProgress:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void editMultiAssetLocCi() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MULTIASSETLOCCI";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();
			
			if (woRemote != null && !woRemote.isFlagSet(MboConstants.READONLY)) {
				MboSetRemote multiAssetMboSet = woRemote.getMboSet("MULTIASSETLOCCI");
				multiAssetMboSet.setQbe("MULTIID", jsonOfflineEntity.getString("MULTIID"));
				multiAssetMboSet.setQbeExactMatch(true);
				
				MboRemote multAssetMbo = multiAssetMboSet.moveFirst();
				setValue(multAssetMbo, jsonOfflineEntity, "PROGRESS");
				setValue(multAssetMbo, jsonOfflineEntity, "COMMENTS");
				
				multiAssetMboSet.save();
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot edit multiassetlocci, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editMultiAssetLocCi:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editMultiAssetLocCi:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editMultiAssetLocCi:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addMultiAssetLocCi() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MULTIASSETLOCCI";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();
			
			if (woRemote != null && !woRemote.isFlagSet(MboConstants.READONLY)) {
				MboSetRemote multiAssetMboSet = woRemote.getMboSet("MULTIASSETLOCCI");
				MboRemote multAssetMbo = multiAssetMboSet.add();
				
				setValue(multAssetMbo, jsonOfflineEntity, "ASSETNUM");
				setValue(multAssetMbo, jsonOfflineEntity, "LOCATION");
				setValue(multAssetMbo, jsonOfflineEntity, "ORGID");
				setValue(multAssetMbo, jsonOfflineEntity, "SITEID");
				setValue(multAssetMbo, jsonOfflineEntity, "SEQUENCE");
				setValue(multAssetMbo, jsonOfflineEntity, "PROGRESS");
				setValue(multAssetMbo, jsonOfflineEntity, "COMMENTS");
				
				multiAssetMboSet.save();
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add multiassetlocci, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addMultiAssetLocCi:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addMultiAssetLocCi:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addMultiAssetLocCi:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
		
	public void updateInventoryStatus() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "INVENTORY";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("INVENTORY");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("INVENTORYID", getAutoKeyMap(jsonOfflineEntity, "INVENTORYID"));
			mboSetRemote.setQbeExactMatch(true);
			InventoryRemote invRemote = (InventoryRemote)mboSetRemote.moveFirst();
			
			if (invRemote != null) {
				if (!invRemote.getString("STATUS").equalsIgnoreCase(jsonOfflineEntity.optString("STATUS"))) {
					invRemote.checkForOpenStatus();
					invRemote.changeStatus(jsonOfflineEntity.getString("STATUS"), this.user.getSession().getMXServerRemote().getDate(), null);
				}
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot update inventory status, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("updateInventoryStatus:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("updateInventoryStatus:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("updateInventoryStatus:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void adjustPhysicalCount() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "INVBALANCES";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("INVBALANCES");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("INVBALANCESID", getAutoKeyMap(jsonOfflineEntity, "INVBALANCESID"));
			mboSetRemote.setQbeExactMatch(true);
			InvBalancesRemote invbRemote = (InvBalancesRemote)mboSetRemote.moveFirst();
			
			if (invbRemote != null && !invbRemote.isFlagSet(MboConstants.READONLY)) {
				setValue(invbRemote, "ADJUSTEDPHYSCNT", jsonOfflineEntity, "PHYSCNT");
				setValue(invbRemote, "ADJUSTEDPHYSCNTDATE", jsonOfflineEntity, "PHYSCNTDATE", Date.class);
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot adjust physical count, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("adjustPhysicalCount:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("adjustPhysicalCount:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("adjustPhysicalCount:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}

	public void editSR() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "SR";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("SR");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("TICKETUID", getAutoKeyMap(jsonOfflineEntity, "TICKETUID"));
			mboSetRemote.setQbeExactMatch(true);
			SRRemote srRemote = (SRRemote)mboSetRemote.moveFirst();
			
			if (srRemote != null && !srRemote.isFlagSet(MboConstants.READONLY)) {
				setValue(srRemote, jsonOfflineEntity, "DESCRIPTION");
				setValue(srRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
				setValue(srRemote, jsonOfflineEntity, "REPORTEDPRIORITY", Integer.class);
				setValue(srRemote, jsonOfflineEntity, "AFFECTEDPERSON");
				setValue(srRemote, jsonOfflineEntity, "LOCATION");
				setValue(srRemote, jsonOfflineEntity, "ASSETNUM");
				// Fix for version 5.4.4.  Sync back Asset Site ID changes
				setValue(srRemote, jsonOfflineEntity, "ASSETSITEID");
				setValue(srRemote, jsonOfflineEntity, "SITEID");
				setValue(srRemote, jsonOfflineEntity, "CLASSSTRUCTUREID");
				// Need to have a NOACTION parameter here because Maximo automatically changes the status of a NEW SR to QUEUED when an owner or ownergroup
				// is added.  Since we do that manually offline, there is no reason to duplicate the logic on the server side.
				setValue(srRemote, jsonOfflineEntity, "OWNER", MboConstants.NOACTION);
				// Need to have a NOACTION parameter here because Maximo automatically changes the status of a NEW SR to QUEUED when an owner or ownergroup
				// is added.  Since we do that manually offline, there is no reason to duplicate the logic on the server side.
				setValue(srRemote, jsonOfflineEntity, "OWNERGROUP", MboConstants.NOACTION);	
				// Need to manually change the status to QUEUED whenever the offline SR's status is such
	            // and the online SR's status is NEW.  This indicates that an OWNER or OWNERGROUP was added offline
	            // while the status of the SR was NEW.  Based on inherent Maximo business logic, the status should automatically
	            // get updated to QUEUED in this case.
	            if (isNull(jsonOfflineEntity.opt("STATUS")) == false && jsonOfflineEntity.optString("STATUS").equalsIgnoreCase("QUEUED") && srRemote.getString("STATUS").equalsIgnoreCase("NEW")){
					Date lastStatusDate = srRemote.getDate("STATUSDATE");
					Date newStatusDate = DateTimeParser.parseDateTime(jsonOfflineEntity.optString("STATUSDATE"));
					if (newStatusDate.before(lastStatusDate)){
						newStatusDate = this.user.getSession().getMXServerRemote().getDate();
					}		            	
					srRemote.changeStatus(jsonOfflineEntity.getString("STATUS"), newStatusDate, null);				
	            }
				
				// Save the MBO Set
				mboSetRemote.save();
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot edit SR, record not found");
			}
			
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editSR:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editSR:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editSR:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addSRLabTrans() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "LABTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
						
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("SR");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("TICKETUID", getAutoKeyMap(jsonOfflineEntity, "TICKETUID"));
			mboSetRemote.setQbeExactMatch(true);
			SRRemote srRemote = (SRRemote)mboSetRemote.moveFirst();
			
			if (srRemote != null) {
				MboSetRemote labTransMboSet = srRemote.getMboSet("LABTRANS");
				MboRemote labTransMbo = labTransMboSet.add();				
				
				this.futureDateExceptionHandler(jsonOfflineEntity, "STARTDATE");
				
				// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
				// Verify with mapping first using "getAutoKeyMap"
				labTransMbo.setValue("TICKETID", getAutoKeyMap(jsonOfflineEntity, "TICKETID"));
				setValue(labTransMbo, jsonOfflineEntity, "CRAFT");
				setValue(labTransMbo, jsonOfflineEntity, "LABORCODE");
				setValue(labTransMbo, jsonOfflineEntity, "STARTDATE", Date.class);
				setValue(labTransMbo, "STARTTIME", jsonOfflineEntity, "STARTDATE", Date.class);
				setValue(labTransMbo, jsonOfflineEntity, "REGULARHRS");
				setValue(labTransMbo, jsonOfflineEntity, "TRANSTYPE");
				if (!isNull(jsonOfflineEntity.opt("PREMIUMPAYHOURS"))) {
					setValue(labTransMbo, jsonOfflineEntity, "PREMIUMPAYCODE");
					setValue(labTransMbo, jsonOfflineEntity, "PREMIUMPAYHOURS");
				}
				
				// Save the MBO Set
				labTransMboSet.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, labTransMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add SR labor transaction, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addSRLabTrans:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addSRLabTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addSRLabTrans:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addSRWorkLog() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "WORKLOG";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
	
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("SR");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("TICKETUID", getAutoKeyMap(jsonOfflineEntity, "TICKETUID"));
			mboSetRemote.setQbeExactMatch(true);
			SRRemote srRemote = (SRRemote)mboSetRemote.moveFirst();

			if (srRemote != null) {
				MboSetRemote workLogMboSet = srRemote.getMboSet("WORKLOG");
				MboRemote workLogMbo = workLogMboSet.add();
				
				// Default Log Type to WORK
				String logType = jsonOfflineEntity.optString("LOGTYPE", "WORK");
				
				workLogMbo.setValue("LOGTYPE", logType);
				setValue(workLogMbo, jsonOfflineEntity, "DESCRIPTION");
				setValue(workLogMbo, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
				setValue(workLogMbo, "MODIFYDATE", jsonOfflineEntity, "CREATEDATE", Date.class);
				
				if (logType.equalsIgnoreCase("WORK"))
					workLogMbo.setValue("MODIFYBY", this.user.getPersonId());
				
				// Save the MBO Set
				workLogMboSet.save();
				mboSetRemote.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, workLogMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add SR log, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addSRWorkLog:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addSRWorkLog:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addSRWorkLog:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	public void addMR() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MR";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
		
			MboRemote mrRemote = user.getSession().getMboSet("MR").addAtEnd();
			setValue(mrRemote, jsonOfflineEntity, "SITEID");
			setValue(mrRemote, jsonOfflineEntity, "ORGID");
			setValue(mrRemote, jsonOfflineEntity, "DESCRIPTION");
			setValue(mrRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
			setValue(mrRemote, jsonOfflineEntity, "LOCATION");
			setValue(mrRemote, jsonOfflineEntity, "PRIORITY");
			// setValue(mrRemote, jsonOfflineEntity, "ASSETNUM");
			// setValue(mrRemote, jsonOfflineEntity, "WONUM");
			// setValue(mrRemote, jsonOfflineEntity, "GLDEBITACCT");
			setValue(mrRemote, jsonOfflineEntity, "REQUIREDDATE", Date.class);
						
			// Save the MBO Set
			mrRemote.getThisMboSet().save(MboConstants.NOVALIDATION | MboConstants.NOACCESSCHECK);	
			
			this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, mrRemote);
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addMR:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addMR:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addMR:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addMRLine() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MRLINES";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
							
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("MR");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("MRID", getAutoKeyMap(jsonOfflineEntity, "MRID"));
			mboSetRemote.setQbeExactMatch(true);
			MRRemote mrRemote = (MRRemote)mboSetRemote.moveFirst();

			if (mrRemote != null) {
				MboSetRemote mrlineMboSet = mrRemote.getMboSet("MRLINE");
				MboRemote mrlineMbo = mrlineMboSet.add();
			
				String lineType = jsonOfflineEntity.optString("LINETYPE", "MATERIAL");
				// Default Line Type to MATERIAL
				if (lineType == null || lineType.length() == 0)
					lineType = "MATERIAL";
				
				if (lineType.equalsIgnoreCase("MATERIAL")) {
					setValue(mrlineMbo, jsonOfflineEntity, "LINETYPE");
					setValue(mrlineMbo, jsonOfflineEntity, "UNITCOST");
					setValue(mrlineMbo, jsonOfflineEntity, "DESCRIPTION");				
					setValue(mrlineMbo, jsonOfflineEntity, "ORDERUNIT");					
					setValue(mrlineMbo, jsonOfflineEntity, "QTY");
				} else {
					setValue(mrlineMbo, jsonOfflineEntity, "LINETYPE");
					setValue(mrlineMbo, jsonOfflineEntity, "UNITCOST");
					setValue(mrlineMbo, jsonOfflineEntity, "ITEMNUM");
					setValue(mrlineMbo, jsonOfflineEntity, "ORDERUNIT");					
					setValue(mrlineMbo, jsonOfflineEntity, "QTY");
				}
				
				// Save the MBO Set
				mrlineMboSet.save();
				
				this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, mrlineMbo);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot add material, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addMRLine:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addMRLine:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addMRLine:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void editMR() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MR";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("MR");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("MRID", getAutoKeyMap(jsonOfflineEntity, "MRID"));
			mboSetRemote.setQbeExactMatch(true);
			MRRemote mrRemote = (MRRemote)mboSetRemote.moveFirst();
			if(!mrRemote.getString("STATUS").equals("DRAFT")){
				mrRemote.checkForOpenStatus();
				mrRemote.changeStatus("DRAFT", new Date(), null);
			}
			setValue(mrRemote, jsonOfflineEntity, "SITEID");
			setValue(mrRemote, jsonOfflineEntity, "ORGID");
			setValue(mrRemote, jsonOfflineEntity, "DESCRIPTION");
			setValue(mrRemote, "DESCRIPTION_LONGDESCRIPTION", jsonOfflineEntity, "LONGDESCRIPTION");
			setValue(mrRemote, jsonOfflineEntity, "LOCATION");
			// setValue(mrRemote, jsonOfflineEntity, "ASSETNUM");
			// setValue(mrRemote, jsonOfflineEntity, "WONUM");
			// setValue(mrRemote, jsonOfflineEntity, "GLDEBITACCT");
			setValue(mrRemote, jsonOfflineEntity, "REQUIREDDATE", Date.class);			
			// Save the MBO Set
			mrRemote.getThisMboSet().save(MboConstants.NOVALIDATION | MboConstants.NOACCESSCHECK);	
			
			this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, mrRemote);
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editMR:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editMR:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editMR:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}

	public void commitMR() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "MR";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("MR");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("MRID", getAutoKeyMap(jsonOfflineEntity, "MRID"));
			mboSetRemote.setQbeExactMatch(true);
			MRRemote mrRemote = (MRRemote)mboSetRemote.moveFirst();
			
			mrRemote.startCheckpoint();
			mrRemote.approveMR();
			
			mboSetRemote.save();
			this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, mrRemote);
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("commitMR:", e);
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("commitMR:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("commitMR:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addDowntimeRpt() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "DOWNTIME";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
		
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID").replaceAll(",",""));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();
			
			if (woRemote != null) {
				woRemote.canReportDowntime();
				NonPersistentMboSetRemote downTimeSet = (NonPersistentMboSetRemote)woRemote.getMboSet("DOWNTIMEREPORT");				
				downTimeSet.setup();
				
				//check the type of report now
				if(jsonOfflineEntity.getString("STARTDATE") != null && !jsonOfflineEntity.getString("STARTDATE").isEmpty()){
					downTimeSet.setDefaultValue("ISDOWNTIMEREPORT", "1");
					MboRemote dtRemote = downTimeSet.addAtEnd();
					// For 7.6.1, calling the below validate() method will throw error and validate required fields prior to actually setting the field values.
					// dtRemote.validate();
					
					setValue(dtRemote, jsonOfflineEntity, "STARTDATE", Date.class, MboConstants.DELAYVALIDATION);				
					setValue(dtRemote, jsonOfflineEntity, "ENDDATE", Date.class, MboConstants.DELAYVALIDATION);				
					setValue(dtRemote, jsonOfflineEntity, "DOWNTIME");
					setValue(dtRemote, "CODE", jsonOfflineEntity, "STATUSCHANGECODE");
					setValue(dtRemote, jsonOfflineEntity, "OPERATIONAL");
					
					 MboRemote owner = null;
				    MboRemote tempowner = dtRemote.getOwner();
				    if (tempowner.isBasedOn("MULTIASSETLOCCI")) 
				      owner = tempowner.getOwner();
				    else 
				      owner = tempowner;
				    
				    boolean isOperationalDT = dtRemote.getInt("OPERATIONAL") == 1;
				    
				    MboSetRemote assetSet = woRemote.getMboSet("ASSET");
				    AssetRemote asset = ((AssetRemote)assetSet.getMbo(0));
				    asset.reportDowntime(owner, dtRemote.getDate("startdate"), dtRemote.getDate("enddate"), dtRemote.getDouble("downtime"), dtRemote.getString("code"), isOperationalDT);			    
				    assetSet.save();
				    assetSet.close();
				    owner.getThisMboSet().save();
				}else{
					downTimeSet.setDefaultValue("ISDOWNTIMEREPORT", "0");
					MboRemote dtRemote = downTimeSet.addAtEnd();
					dtRemote.validate();
					
				    MboRemote owner = null;
				    MboRemote tempowner = dtRemote.getOwner();
				    if (tempowner.isBasedOn("MULTIASSETLOCCI")) 
				      owner = tempowner.getOwner();
				    else 
				      owner = tempowner;
				    
				    setValue(dtRemote, jsonOfflineEntity, "STATUSCHANGEDATE", Date.class, MboConstants.DELAYVALIDATION);
				    setValue(dtRemote, jsonOfflineEntity, "STATUSCHANGECODE");
				    setValue(dtRemote, jsonOfflineEntity, "OPERATIONAL");
				    
				    boolean isOperationalDT = dtRemote.getInt("OPERATIONAL") == 1;
				    
				    MboSetRemote assetSet = woRemote.getMboSet("ASSET");
				    AssetRemote asset = ((AssetRemote)assetSet.getMbo(0));			    
				    asset.recordAssetStatusChange(owner, dtRemote.getDate("statuschangedate"), dtRemote.getString("statuschangecode"), isOperationalDT);
				    assetSet.save();
				    assetSet.close();
				    owner.getThisMboSet().save();
				}
				
				
				//this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, dtRemote);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot report downtime, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addDowntimeRpt:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addDowntimeRpt:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addDowntimeRpt:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void addAssetDowntimeRpt() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "DOWNTIME";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
		
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("ASSET");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("ASSETUID", getAutoKeyMap(jsonOfflineEntity, "ASSETUID").replaceAll(",",""));
			mboSetRemote.setQbeExactMatch(true);
			AssetRemote assetRemote = (AssetRemote)mboSetRemote.moveFirst();
			
			if (assetRemote != null) {
				
				NonPersistentMboSetRemote downTimeSet = (NonPersistentMboSetRemote)assetRemote.getMboSet("DOWNTIMEREPORT");				
				downTimeSet.setup();
				
				//check the type of report now
				if(jsonOfflineEntity.getString("STARTDATE") != null && !jsonOfflineEntity.getString("STARTDATE").isEmpty()){
					downTimeSet.setDefaultValue("ISDOWNTIMEREPORT", "1");
					MboRemote dtRemote = downTimeSet.addAtEnd();
					
					
					setValue(dtRemote, jsonOfflineEntity, "STARTDATE", Date.class, MboConstants.DELAYVALIDATION);				
					setValue(dtRemote, jsonOfflineEntity, "ENDDATE", Date.class, MboConstants.DELAYVALIDATION);				
					dtRemote.validate();
					setValue(dtRemote, jsonOfflineEntity, "DOWNTIME");
					setValue(dtRemote, "CODE", jsonOfflineEntity, "STATUSCHANGECODE");
					setValue(dtRemote, jsonOfflineEntity, "OPERATIONAL");
					
					MboRemote owner = null;
				    MboRemote tempowner = dtRemote.getOwner();
				    if (tempowner.isBasedOn("MULTIASSETLOCCI")) 
				      owner = tempowner.getOwner();
				    else 
				      owner = tempowner;
				    
				    boolean isOperationalDT = dtRemote.getInt("OPERATIONAL") == 1;
				    
				    AssetRemote asset = assetRemote;
				    asset.reportDowntime(owner, dtRemote.getDate("startdate"), dtRemote.getDate("enddate"), dtRemote.getDouble("downtime"), dtRemote.getString("code"), isOperationalDT);			    
				    assetRemote.getThisMboSet().save();
				    assetRemote.getThisMboSet().close();
				    owner.getThisMboSet().save();
				}else{
					downTimeSet.setDefaultValue("ISDOWNTIMEREPORT", "0");
					MboRemote dtRemote = downTimeSet.addAtEnd();
					dtRemote.validate();
					
				    MboRemote owner = null;
				    MboRemote tempowner = dtRemote.getOwner();
				    if (tempowner.isBasedOn("MULTIASSETLOCCI")) 
				      owner = tempowner.getOwner();
				    else 
				      owner = tempowner;
				    
				    setValue(dtRemote, jsonOfflineEntity, "STATUSCHANGEDATE", Date.class, MboConstants.DELAYVALIDATION);
				    setValue(dtRemote, jsonOfflineEntity, "STATUSCHANGECODE");
				    setValue(dtRemote, jsonOfflineEntity, "OPERATIONAL");
				    
				    boolean isOperationalDT = dtRemote.getInt("OPERATIONAL") == 1;
				    
				    MboSetRemote assetSet = assetRemote.getThisMboSet();
				    AssetRemote asset = assetRemote;			    
				    asset.recordAssetStatusChange(owner, dtRemote.getDate("statuschangedate"), dtRemote.getString("statuschangecode"), isOperationalDT);
				    assetSet.save();
				    assetSet.close();
				    owner.getThisMboSet().save();
				}
				
				
				//this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, dtRemote);
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot report downtime, record not found");				
			}
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("addDowntimeRpt:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("addDowntimeRpt:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("addDowntimeRpt:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void generateWorkOrderSpec() throws Exception {
		// Get the Offline Entity that was posted here to be processed
		String offlineEntityName = "WORKORDERSPEC";
		try {
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();
			if (woRemote != null){
				MboSetRemote workorderSpecMboSet = woRemote.getMboSet("WORKORDERSPEC");
				MboRemote workorderSpecRemote = workorderSpecMboSet.moveFirst();
				while(workorderSpecRemote != null){
					if(workorderSpecRemote.getString("ASSETATTRID").equals(jsonOfflineEntity.getString("ASSETATTRID"))){
						this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, workorderSpecRemote);
						break;
					}
					workorderSpecRemote = workorderSpecMboSet.moveNext();
				}
			}
		} catch (OfflineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public void editWorkOrderSpec() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
				String offlineEntityName = "WORKORDERSPEC";
				JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
				
				MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
				// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
				// If a field is using an autokey, then we need to get the mapped value
				mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
				mboSetRemote.setQbeExactMatch(true);
				WORemote woRemote = (WORemote)mboSetRemote.moveFirst();
	
				if (woRemote != null) {
					if(jsonOfflineEntity.getInt("ISACTIVE") == 1){
						MboSetRemote workorderSpecMboSet = woRemote.getMboSet("WORKORDERSPEC");
						//ASSETATTRID can potentially contain a comma which Maximo interprets as an OR clause when contained in a QBE method
						workorderSpecMboSet.setWhere("WORKORDERSPECID = '" + getAutoKeyMap(jsonOfflineEntity, "WORKORDERSPECID") + "'");
						workorderSpecMboSet.reset();
						MboRemote workorderSpecMbo = (MboRemote)workorderSpecMboSet.moveFirst();
						if(workorderSpecMbo != null){
							setValue(workorderSpecMbo, jsonOfflineEntity, "NUMVALUE");
							setValue(workorderSpecMbo, jsonOfflineEntity, "ALNVALUE");
						}
						else{
							// Need to throw exception, otherwise this will be considered a successful transaction
							throw new Exception("Cannot edit Work Order Spec, Work Order Spec record not found");
						}
						
						// Save the MBO Set
						workorderSpecMboSet.save();
					}	
				} else {
					// Need to throw exception, otherwise this will be considered a successful transaction
					throw new Exception("Cannot edit Workorder Spec, Work Order record not found");				
				}
	
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editworkorderspec:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editworkorderspec:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editworkorderspec:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}

	public void generateAssetSpec() throws Exception {
		// Get the Offline Entity that was posted here to be processed
		String offlineEntityName = "ASSETSPEC";
		try {
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("ASSET");
			mboSetRemote.setQbe("ASSETUID", getAutoKeyMap(jsonOfflineEntity, "ASSETUID"));
			mboSetRemote.setQbeExactMatch(true);
			MboRemote assetRemote = mboSetRemote.moveFirst();
			if (assetRemote != null){
				MboSetRemote assetSpecMboSet = assetRemote.getMboSet("ASSETSPEC");
				MboRemote assetSpecRemote = assetSpecMboSet.moveFirst();
				while(assetSpecRemote != null){
					if(assetSpecRemote.getString("ASSETATTRID").equals(jsonOfflineEntity.getString("ASSETATTRID"))){
						this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, assetSpecRemote);
						break;
					}
					assetSpecRemote = assetSpecMboSet.moveNext();
				}
			}
		} catch (OfflineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void editAssetSpec() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
				String offlineEntityName = "ASSETSPEC";
				JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
				
				MboSetRemote mboSetRemote = this.user.getSession().getMboSet("ASSET");
				// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
				// If a field is using an autokey, then we need to get the mapped value
				mboSetRemote.setQbe("ASSETUID", getAutoKeyMap(jsonOfflineEntity, "ASSETUID"));
				mboSetRemote.setQbeExactMatch(true);
				MboRemote assetRemote = mboSetRemote.moveFirst();
	
				if (assetRemote != null) {
					if(jsonOfflineEntity.getInt("ISACTIVE") == 1){
						MboSetRemote assetSpecMboSet = assetRemote.getMboSet("ASSETSPEC");
						//ASSETATTRID can potentially contain a comma which Maximo interprets as an OR clause when contained in a QBE method
						assetSpecMboSet.setWhere("ASSETSPECID = '" + getAutoKeyMap(jsonOfflineEntity, "ASSETSPECID") + "'");
						assetSpecMboSet.reset();
						MboRemote assetSpecMbo = assetSpecMboSet.moveFirst();
						if(assetSpecMbo != null){
							setValue(assetSpecMbo, jsonOfflineEntity, "NUMVALUE");
							setValue(assetSpecMbo, jsonOfflineEntity, "ALNVALUE");
						}
						else{
							// Need to throw exception, otherwise this will be considered a successful transaction
							throw new Exception("Cannot edit Asset Order Spec, Asset Order Spec record not found");
						}
						
						// Save the MBO Set
						assetSpecMboSet.save();
					}	
				} else {
					// Need to throw exception, otherwise this will be considered a successful transaction
					throw new Exception("Cannot edit Asset Spec, Asset record not found");				
				}
	
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editAssetSpec:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editAssetSpec:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editAssetSpec:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	public void generateTicketSpec() throws Exception {
		// Get the Offline Entity that was posted here to be processed
		String offlineEntityName = "TICKETSPEC";
		try {
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("TICKET");
			mboSetRemote.setQbe("TICKETUID", getAutoKeyMap(jsonOfflineEntity, "TICKETUID"));
			mboSetRemote.setQbeExactMatch(true);
			MboRemote ticketRemote = mboSetRemote.moveFirst();
			if (ticketRemote != null){
				MboSetRemote ticketSpecSetRemote = ticketRemote.getMboSet("TICKETSPEC");
				MboRemote ticketSpecRemote = ticketSpecSetRemote.moveFirst();
				while(ticketSpecRemote != null){
					if(ticketSpecRemote.getString("ASSETATTRID").equals(jsonOfflineEntity.getString("ASSETATTRID"))){
						this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, ticketSpecRemote);
						break;
					}
					ticketSpecRemote = ticketSpecSetRemote.moveNext();
				}
			}
		} catch (OfflineException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (RemoteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	public void editTicketSpec() throws Exception {
		try {
			// Get the Offline Entity that was posted here to be processed
				String offlineEntityName = "TICKETSPEC";
				JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
				
				MboSetRemote mboSetRemote = this.user.getSession().getMboSet("TICKET");
				// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
				// If a field is using an autokey, then we need to get the mapped value
				mboSetRemote.setQbe("TICKETUID", getAutoKeyMap(jsonOfflineEntity, "TICKETUID"));
				mboSetRemote.setQbeExactMatch(true);
				MboRemote ticketRemote = mboSetRemote.moveFirst();
	
				if (ticketRemote != null) {
					if(jsonOfflineEntity.getInt("ISACTIVE") == 1){
						MboSetRemote ticketSpecMboSet = ticketRemote.getMboSet("TICKETSPEC");
						//ASSETATTRID can potentially contain a comma which Maximo interprets as an OR clause when contained in a QBE method
						ticketSpecMboSet.setWhere("TICKETSPECID = '" + getAutoKeyMap(jsonOfflineEntity, "TICKETSPECID") + "'");
						ticketSpecMboSet.reset();
						MboRemote ticketSpecMbo = (MboRemote)ticketSpecMboSet.moveFirst();
						if(ticketSpecMbo != null){
							setValue(ticketSpecMbo, jsonOfflineEntity, "NUMVALUE");
							setValue(ticketSpecMbo, jsonOfflineEntity, "ALNVALUE");
						}
						else{
							// Need to throw exception, otherwise this will be considered a successful transaction
							throw new Exception("Cannot edit Ticket Spec, Ticket record not found");
						}
						
						// Save the MBO Set
						ticketSpecMboSet.save();
					}	
				} else {
					// Need to throw exception, otherwise this will be considered a successful transaction
					throw new Exception("Cannot edit Ticket Spec, Ticket record not found");				
				}
	
		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editworkorderspec:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editworkorderspec:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editworkorderspec:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}
	
	public void editServrecTrans() throws Exception { // This needs to be implemented for updating an existing planned material
		try {
			// Get the Offline Entity that was posted here to be processed
			String offlineEntityName = "SERVRECTRANS";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
							
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("WORKORDER");
			// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
			// If a field is using an autokey, then we need to get the mapped value
			mboSetRemote.setQbe("WORKORDERID", getAutoKeyMap(jsonOfflineEntity, "WORKORDERID"));
			mboSetRemote.setQbeExactMatch(true);
			WORemote woRemote = (WORemote)mboSetRemote.moveFirst();

			if (woRemote != null) {
				MboSetRemote servrectransMboSet = woRemote.getMboSet("SERVRECTRANS");
				servrectransMboSet.setQbe("SERVRECTRANSID", getAutoKeyMap(jsonOfflineEntity, "SERVRECTRANSID"));
				servrectransMboSet.setQbeExactMatch(true);
				
				MboRemote servrectransMbo = (MboRemote)servrectransMboSet.moveFirst();
				
				setValue(servrectransMbo, jsonOfflineEntity, "INVOICENUM");
				setValue(servrectransMbo, jsonOfflineEntity, "ITEMNUM");
				setValue(servrectransMbo, jsonOfflineEntity, "QUANTITY");
				setValue(servrectransMbo, jsonOfflineEntity, "UNITOST");
				setValue(servrectransMbo, jsonOfflineEntity, "LOADEDCOST");
				setValue(servrectransMbo, jsonOfflineEntity, "UNITCOST");
				setValue(servrectransMbo, jsonOfflineEntity, "PLUSTHASWARRANTY");
				setValue(servrectransMbo, jsonOfflineEntity, "DESCRIPTION");
				setValue(servrectransMbo, jsonOfflineEntity, "REQUIREDATE", Date.class);
				// Save the MBO Set
				servrectransMboSet.save();
				mboSetRemote.save();	
			} else {
				// Need to throw exception, otherwise this will be considered a successful transaction
				throw new Exception("Cannot edit services, record not found");				
			}

		} catch (MXException e) {
			String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
			log.error("editservices:", new Exception(e));
			throw new OfflineException(msg, e);
		} catch (RemoteException e) {
			log.error("editservices:", e);
			throw new OfflineException(e.getMessage(), e);
		} catch (Exception e) {
			log.error("editservices:", e);
			throw new OfflineException(e.getMessage(), e);
		}
	}	

	
	private void futureDateExceptionHandler(JSONObject jsonOfflineEntity, String attribute) throws ParseException{
		if (attribute == null || attribute.length() == 0)
			return;
		
		// Future Date Exception Handler
		// Get Regular Hours and Premium Hours
		NumberFormat nf = NumberFormat.getInstance(this.user.getSession().getUserInfo().getLocale());

		float floatRegHrs = 0;
		float floatPremiumHrs = 0; 
		
		if (isNull(jsonOfflineEntity.opt("REGULARHRS")) == false)
			floatRegHrs = nf.parse(jsonOfflineEntity.optString("REGULARHRS")).floatValue();
		if (isNull(jsonOfflineEntity.opt("PREMIUMPAYHOURS")) == false)
			floatPremiumHrs =  nf.parse(jsonOfflineEntity.optString("PREMIUMPAYHOURS")).floatValue();
		
		Date startDateTime = DateTimeParser.parseDateTime(jsonOfflineEntity.optString(attribute));
		Date dateCurrent = this.user.getLastLoginTime();
		long msec = dateCurrent.getTime();
		long totalHoursMsec = (long) (floatRegHrs*1000*60*60L + floatPremiumHrs*1000*60*60L);
		if(startDateTime.getTime() + totalHoursMsec > dateCurrent.getTime()){
			long modStartTimeMsec = msec - totalHoursMsec;
			startDateTime.setTime(modStartTimeMsec);
			
			// Put back to the JSON object the fixed "future" date with the correct date time format
			jsonOfflineEntity.put(attribute, DateTimeFormatter.formatToTimeZone(startDateTime));
		}		
	}
	
	// public void updateInspResultStatus() throws Exception {
	// 	try {
	// 		// Get the Offline Entity that was posted here to be processed
	// 		String offlineEntityName = "INSPECTIONRESULT";
	// 		JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
	// 		MboSetRemote mboSetRemote = this.user.getSession().getMboSet("INSPECTIONRESULT");
	// 		// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
	// 		// If a field is using an autokey, then we need to get the mapped value
	// 		mboSetRemote.setQbe("INSPECTIONRESULTID", getAutoKeyMap(jsonOfflineEntity, "INSPECTIONRESULTID"));
	// 		mboSetRemote.setQbeExactMatch(true);
	// 		InspectionResultRemote irRemote = (InspectionResultRemote)mboSetRemote.moveFirst();
			
	// 		if (irRemote != null) {
	// 			if (!irRemote.getString("STATUS").equalsIgnoreCase(jsonOfflineEntity.optString("STATUS"))) {
	// 				((InspectionResultRemote)irRemote).changeResultStatus(jsonOfflineEntity.optString("STATUS"));
	// 				irRemote.getThisMboSet().save();
					
	// 				if (jsonOfflineEntity.optString("STATUS").equals("INPROG")) {
	// 					addFUInspFieldResult(irRemote);
	// 				}
	// 			}
	// 		} else {
	// 			// Need to throw exception, otherwise this will be considered a successful transaction
	// 			throw new Exception("Cannot change inspectionresult status, record not found");				
	// 		}
	// 	} catch (MXException e) {
	// 		String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
	// 		log.error("updateInspResultStatus:", new Exception(e));
	// 		throw new OfflineException(msg, e);
	// 	} catch (RemoteException e) {
	// 		log.error("updateInspResultStatus:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	} catch (Exception e) {
	// 		log.error("updateInspResultStatus:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	}
	// }
	
	// public void editInspFieldResult() throws Exception {
	// 	try {
	// 		String offlineEntityName = "INSPFIELDRESULT";
	// 		JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
	// 		MboSetRemote mboSetRemote = this.user.getSession().getMboSet("INSPFIELDRESULT");
	// 		mboSetRemote.setQbe("INSPFIELDRESULTID", getAutoKeyMap(jsonOfflineEntity, "INSPFIELDRESULTID"));
	// 		mboSetRemote.setQbeExactMatch(true);
	// 		MboRemote ifrRemote = mboSetRemote.moveFirst();
			
	// 		if (ifrRemote != null) {
	// 			ifrRemote.setValue("ENTEREDBY", this.user.getUserId());
	// 			setValue(ifrRemote, jsonOfflineEntity, "ENTEREDDATE", Date.class);
				
	// 			if(!isNull(jsonOfflineEntity.opt("TXTRESPONSE"))) {
	// 				setValue(ifrRemote, jsonOfflineEntity, "TXTRESPONSE");
	// 			} else {
	// 				ifrRemote.setValueNull("TXTRESPONSE"); 
	// 			}
				
	// 			if(!isNull(jsonOfflineEntity.opt("NUMRESPONSE"))) {
	// 				setValue(ifrRemote, jsonOfflineEntity, "NUMRESPONSE");
	// 			} else {
	// 				ifrRemote.setValueNull("NUMRESPONSE"); 
	// 			}
						
	// 			if(!isNull(jsonOfflineEntity.opt("ROLLOVERFLAG"))) {
	// 				setValue(ifrRemote, jsonOfflineEntity, "ROLLOVERFLAG"); 
	// 			}
	// 			if(!isNull(jsonOfflineEntity.opt("DATERESPONSE"))) {
	// 				setValue(ifrRemote, jsonOfflineEntity, "DATERESPONSE", Date.class, MboConstants.DELAYVALIDATION);
	// 			}
	// 			if(!isNull(jsonOfflineEntity.opt("TIMERESPONSE"))) {
	// 				setValue(ifrRemote, jsonOfflineEntity, "TIMERESPONSE", Date.class, MboConstants.DELAYVALIDATION);
	// 			}
				
	// 			ifrRemote.getThisMboSet().save();
	// 		} else {
	// 			// Need to throw exception, otherwise this will be considered a successful transaction
	// 			throw new Exception("Cannot edit inspfieldresult, record not found");				
	// 		}
	// 	} catch (MXException e) {
	// 		String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
	// 		log.error("editInspFieldResult:", new Exception(e));
	// 		throw new OfflineException(msg, e);
	// 	} catch (RemoteException e) {
	// 		log.error("editInspFieldResult:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	} catch (Exception e) {
	// 		log.error("editInspFieldResult:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	}
	// }
	
	// public void addInspFieldResult() throws Exception {
	// 	try {
	// 		String offlineEntityName = "INSPFIELDRESULT";
	// 		JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
	// 		MboRemote ifrRemote = user.getSession().getMboSet("INSPFIELDRESULT").addAtEnd();
	// 		setValue(ifrRemote, jsonOfflineEntity, "INSPFIELDNUM");
	// 		setValue(ifrRemote, jsonOfflineEntity, "INSPQUESTIONNUM");
	// 		setValue(ifrRemote, jsonOfflineEntity, "INSPFORMNUM");
	// 		setValue(ifrRemote, jsonOfflineEntity, "RESULTNUM");
	// 		setValue(ifrRemote, jsonOfflineEntity, "REVISION");
	// 		setValue(ifrRemote, jsonOfflineEntity, "ORGID");
	// 		setValue(ifrRemote, jsonOfflineEntity, "SITEID");
	// 		setValue(ifrRemote, jsonOfflineEntity, "ENTEREDDATE", Date.class);
	// 		ifrRemote.setValue("ENTEREDBY", this.user.getUserId());
			
	// 		if(!isNull(jsonOfflineEntity.opt("TXTRESPONSE"))) {
	// 			setValue(ifrRemote, jsonOfflineEntity, "TXTRESPONSE"); 
	// 		}
	// 		if(!isNull(jsonOfflineEntity.opt("NUMRESPONSE"))) {
	// 			setValue(ifrRemote, jsonOfflineEntity, "NUMRESPONSE");
	// 		}
	// 		if(!isNull(jsonOfflineEntity.opt("METERNAME"))) {
	// 			setValue(ifrRemote, jsonOfflineEntity, "METERNAME");
	// 		}
	// 		if(!isNull(jsonOfflineEntity.opt("ROLLOVERFLAG"))) {
	// 			setValue(ifrRemote, jsonOfflineEntity, "ROLLOVERFLAG"); 
	// 		}
	// 		if(!isNull(jsonOfflineEntity.opt("DATERESPONSE"))) {
	// 			setValue(ifrRemote, jsonOfflineEntity, "DATERESPONSE", Date.class, MboConstants.DELAYVALIDATION);
	// 		}
	// 		if(!isNull(jsonOfflineEntity.opt("TIMERESPONSE"))) {
	// 			setValue(ifrRemote, jsonOfflineEntity, "TIMERESPONSE", Date.class, MboConstants.DELAYVALIDATION);
	// 		}
		
	// 		ifrRemote.getThisMboSet().save();
	// 		this.saveAutoKeyMap(offlineEntityName, jsonOfflineEntity, ifrRemote);
	// 	} catch (MXException e) {
	// 		String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
	// 		log.error("addInspFieldResult:", new Exception(e));
	// 		throw new OfflineException(msg, e);
	// 	} catch (RemoteException e) {
	// 		log.error("addInspFieldResult:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	} catch (Exception e) {
	// 		log.error("addInspFieldResult:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	}
	// }
	
	// public void completeInspection() throws Exception {
	// 	try {
	// 		// Get the Offline Entity that was posted here to be processed
	// 		String offlineEntityName = "INSPECTIONRESULT";
	// 		JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
	// 		MboSetRemote mboSetRemote = this.user.getSession().getMboSet("INSPECTIONRESULT");
	// 		// To prevent referencing the local generated IDs (i.e.: LOCAL_1 or OFFLN_1)
	// 		// If a field is using an autokey, then we need to get the mapped value
	// 		mboSetRemote.setQbe("INSPECTIONRESULTID", getAutoKeyMap(jsonOfflineEntity, "INSPECTIONRESULTID"));
	// 		mboSetRemote.setQbeExactMatch(true);
	// 		MboRemote irRemote = mboSetRemote.moveFirst();
			
	// 		if (irRemote != null) {
	// 			irRemote.getThisMboSet().save();
	// 			irRemote.getThisMboSet().reset();
	// 			updateMeterReading(irRemote);

	// 			Long id = irRemote.getUniqueIDValue();
				
	// 			MboSetRemote fieldresults = this.user.getSession().getMboSet("INSPFIELDRESULT");
	// 			String where = "siteid= '" + irRemote.getString("SITEID") + "' and orgid= '"
	// 							+ irRemote.getString("ORGID") + "' and inspformnum= '" 
	// 							+ irRemote.getString("INSPFORMNUM") + "' and resultnum= '"
	// 							+ irRemote.getString("RESULTNUM") + "' and METERNAME IS NOT NULL "
	// 							+ "AND (TXTRESPONSE IS NOT NULL OR NUMRESPONSE IS NOT NULL) AND (ERRORFLAG IS NULL OR ERRORFLAG < 2)";
	// 			fieldresults.setWhere(where);
	// 			fieldresults.reset();
				
	// 			if (fieldresults == null || fieldresults.count() == 0) {
	// 				String newStatus = "COMPLETED";
	// 				mboSetRemote = this.user.getSession().getMboSet("INSPECTIONRESULT");
	// 				irRemote = mboSetRemote.getMboForUniqueId(id);
	
	// 				String currentStatus = irRemote.getString("STATUS");
	// 				if (!currentStatus.equalsIgnoreCase(newStatus)) {
	// 					Date newStatusDate = DateTimeParser.parseDateTime(jsonOfflineEntity.optString("ENTEREDDATE"));
	// 					((StatefulMboRemote) irRemote).changeStatus(newStatus, newStatusDate, "");
	// 					irRemote.getThisMboSet().save();
	// 				}
	// 			}
	// 		} else {
	// 			// Need to throw exception, otherwise this will be considered a successful transaction
	// 			throw new Exception("Cannot change inspectionresult status, record not found");				
	// 		}
	// 	} catch (MXException e) {
	// 		String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
	// 		log.error("completeInspection:", new Exception(e));
	// 		throw new OfflineException(msg, e);
	// 	} catch (RemoteException e) {
	// 		log.error("completeInspection:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	} catch (Exception e) {
	// 		log.error("completeInspection:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	}
	// }
	
	
	// public void updateMeterReading(MboRemote inspResultMbo) throws RemoteException, MXException {
	// 	String referenceObj = null;
	// 	String asset = null;
	// 	String location = null;
	// 	String siteid = inspResultMbo.getString("SITEID");
	// 	String orgid = inspResultMbo.getString("ORGID");
	// 	String inspformnum = inspResultMbo.getString("INSPFORMNUM");
	// 	String inspresultnum = inspResultMbo.getString("RESULTNUM");
	
	// 	 if(!inspResultMbo.getString("ASSET").equals("")){
	// 		 referenceObj = "ASSET";  
	// 		 asset = inspResultMbo.getString("ASSET");
	// 	 }
	// 	 else if(!inspResultMbo.getString("LOCATION").equals("")){
	// 		 referenceObj = "LOCATION"; 
	// 		 location = inspResultMbo.getString("LOCATION");
	// 	 } 
		
	// 	((InspectionResultRemote)inspResultMbo).updateAssetLocMeter(referenceObj, null, asset, location, siteid, orgid, inspformnum, inspresultnum);
	// 	 inspResultMbo.getThisMboSet().save();
	// 	 inspResultMbo.getThisMboSet().reset();
	// }	
	
	// public void createInspWorkOrder() throws Exception {
	// 	try{
	// 		// Get the Offline Entity that was posted here to be processed
	// 		String offlineEntityName = "INSPECTIONRESULT";
	// 		JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
	// 		String inspectionresultid = jsonOfflineEntity.optString("INSPECTIONRESULTID");
	// 		String inspDeficiencyList = jsonOfflineEntity.optString("DEFICIENCYLIST");
			
	// 		MboSetRemote inspectionResultRemote = this.user.getSession().getMboSet("INSPECTIONRESULT");
	// 		inspectionResultRemote.setQbe("INSPECTIONRESULTID", inspectionresultid);
	// 		inspectionResultRemote.setQbeExactMatch(true);
	// 		MboRemote irRemote = inspectionResultRemote.moveFirst();
			
	// 		if (irRemote != null && irRemote.getString("STATUS").equals("COMPLETED") && inspDeficiencyList != null) {
	// 			JSONArray selectedList  = JSONArray.fromObject(inspDeficiencyList);
	// 			if (irRemote.getString("REFERENCEOBJECT").equalsIgnoreCase("WORKORDER") ||  irRemote.getString("REFERENCEOBJECT").equalsIgnoreCase("WOACTIVITY"))
	// 			{	
	// 				createdeficiencyfollowups(irRemote, selectedList);
	// 			} else {
	// 				createfollowupwithtasks(irRemote, selectedList);
	// 			}
				
	// 		} else {
	// 			throw new Exception("Cannot create workorder for inspectionresult, status not completed or no deficiencies selected");	
	// 		}
		
	// 	} catch (MXException e) {
	// 		String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
	// 		log.error("createWOInspection:", new Exception(e));
	// 		throw new OfflineException(msg, e);
	// 	} catch (RemoteException e) {
	// 		log.error("createWOInspection:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	} catch (Exception e) {
	// 		log.error("createWOInspection:", e);
	// 		throw new OfflineException(e.getMessage(), e);
	// 	}
	// }
	
	public void createdeficiencyfollowups(MboRemote mbo, JSONArray selectedList) throws RemoteException, MXException {	
		MboSetRemote woSet = null;
		if (!mbo.getString("PARENT").isEmpty())
			woSet = mbo.getMboSet("PARENTWO");
	    else
	    	woSet = mbo.getMboSet("WORKORDER");
		
		MboRemote wo = woSet.getMbo(0);
		MboSetRemote resultSet = mbo.getMboSet("INSPFIELDRESULT");
				for(int i = 0; i < selectedList.size(); i++){
			JSONObject deficiency = (JSONObject) selectedList.get(i);
			MboRemote newWO = ((WORemote) wo).createWorkorder();

			String desc = deficiency.getString("INSPQUESTION") + " = " + deficiency.getString("RESPONSE");
			MboSetRemote newWOSet = mbo.getMboSet("$NewWO", "WORKORDER" ,"wonum='" + newWO.getString("WONUM") + "' and siteid= '" + newWO.getString("SITEID") + "'");
			int fieldLength = newWOSet.getMbo(0).getMboValueData("DESCRIPTION").getLength();
			if (desc.length() > fieldLength) {
				newWOSet.getMbo(0).setValue("DESCRIPTION_LONGDESCRIPTION", desc.substring(fieldLength));
				desc = desc.substring(0, fieldLength);
			}
			newWOSet.getMbo(0).setValue("DESCRIPTION", desc);
			newWOSet.getMbo(0).setValue("LOCATION", mbo.getString("LOCATION"));
			newWOSet.getMbo(0).setValue("ASSETNUM", mbo.getString("ASSET"));
			
			resultSet.setQbe("INSPFIELDRESULTID", deficiency.getString("INSPFIELDRESULTID"));
			resultSet.setQbeExactMatch(true);
			MboRemote currentResult = resultSet.getMbo(0);
			if (currentResult != null) {
				currentResult.setValue("FUPOBJECT", "WORKORDER");
				currentResult.setValue("FUPOBJECTID", newWO.getString("WONUM"));
				currentResult.setValue("DISPLAYMESSAGE", "Workorder " + newWO.getString("WONUM") + " created");
			}
			  
			newWOSet.save();   
		}

	}
		   
	public void createfollowupwithtasks(MboRemote mbo, JSONArray selectedList) throws RemoteException, MXException, BaseMaximoException {
		MboSetRemote woSet = mbo.getMboSet("WORKORDER");
		MboRemote newWO = null;
		MboSetRemote resultSet = mbo.getMboSet("INSPFIELDRESULT");
		
		if (mbo.getString("FUPOBJECT").isEmpty()) {
		    newWO = woSet.add();
		    newWO.setValue("DESCRIPTION", "Follow Up Work Order for Inspection " + mbo.getString("RESULTNUM"));
		    newWO.setValue("LOCATION", mbo.getString("LOCATION"));
		    newWO.setValue("ASSETNUM", mbo.getString("ASSET"));
		    mbo.setValue("FUPOBJECT", "WORKORDER");
		    mbo.setValue("FUPOBJECTID", newWO.getString("WONUM"));
		    mbo.setValue("DISPLAYMESSAGE", "Workorder " + newWO.getString("WONUM") + " created");
		    System.out.println("Created WO " + newWO.getString("WONUM"));
		    woSet.save();
		}

	   woSet = mbo.getMboSet("FUPWORKORDER");
	   if (woSet.getMbo(0) != null) {
		   id = woSet.getMbo(0).getUniqueIDValue();
		   for(int i = 0; i < selectedList.size(); i++){
			   JSONObject deficiency = (JSONObject) selectedList.get(i);
			   String desc = deficiency.getString("INSPQUESTION") + " = " + deficiency.getString("RESPONSE");
			   
			   MboRemote newTask = woSet.getMbo(0).getMboSet("WOACTIVITY").add();
			   newTask.setValue("PARENT", mbo.getString("FUPOBJECTID"));
			   int fieldLength = newTask.getMboValueData("DESCRIPTION").getLength();
			   if (desc.length() > fieldLength) {
				   newTask.setValue("DESCRIPTION_LONGDESCRIPTION", desc.substring(fieldLength));
				   desc = desc.substring(0, fieldLength);
			   } 
			   newTask.setValue("DESCRIPTION", desc);

			   MboRemote currentResult = resultSet.getMboForUniqueId(deficiency.getLong("INSPFIELDRESULTID"));
			   if (currentResult != null) {
				   currentResult.setValue("FUPOBJECT","WORKORDER");
				   currentResult.setValue("FUPOBJECTID", newTask.getString("WONUM"));
				   currentResult.setValue("DISPLAYMESSAGE","Work Order " + mbo.getString("FUPOBJECTID") + " Task " + newTask.getString("TASKID") + " created"); 
			   }
			   woSet.save();
		   }
	   }
	}
	
	public void addInspFieldResultSignature() throws Exception{
        try {
              // Get the Offline Entity that was posted here to be processed     
          	String offlineEntityName = "INSPFIELDRESULT";
			JSONObject jsonOfflineEntity = getUploadedEntityJson(offlineEntityName);
			
			MboSetRemote mboSetRemote = this.user.getSession().getMboSet("INSPFIELDRESULT");
			mboSetRemote.setQbe("INSPFIELDRESULTID", jsonOfflineEntity.getString("INSPFIELDRESULTID"));
            mboSetRemote.setQbeExactMatch(true);
            MboRemote ifrRemote = (WORemote) mboSetRemote.moveFirst();

            if (ifrRemote == null) {                  	
            	ifrRemote = user.getSession().getMboSet("INSPFIELDRESULT").addAtEnd();
    			setValue(ifrRemote, jsonOfflineEntity, "INSPFIELDNUM");
    			setValue(ifrRemote, jsonOfflineEntity, "INSPQUESTIONNUM");
    			setValue(ifrRemote, jsonOfflineEntity, "INSPFORMNUM");
    			setValue(ifrRemote, jsonOfflineEntity, "RESULTNUM");
    			setValue(ifrRemote, jsonOfflineEntity, "REVISION");
    			setValue(ifrRemote, jsonOfflineEntity, "ORGID");
    			setValue(ifrRemote, jsonOfflineEntity, "SITEID");
    			setValue(ifrRemote, jsonOfflineEntity, "ENTEREDDATE", Date.class);
    			ifrRemote.setValue("ENTEREDBY", this.user.getUserId());
            }

            String signature = jsonOfflineEntity.getString("SIGNATURE");
            signature = signature.replaceFirst("^data:image/[^;]*;base64,?","");
            saveImageToLibrary(ifrRemote, Base64.decode(signature), jsonOfflineEntity);                    
            
			ifrRemote.getThisMboSet().save();
              
        } catch (MXException e) {
              String msg = MaximoExceptionUtil.getMessage(this.user.getSession(), e);
              log.error("addSignature:", e);
              throw new OfflineException(msg, e);
        } catch (RemoteException e) {
              log.error("addSignature:", e);
              throw new OfflineException(e.getMessage(), e);
        } catch (Exception e) {
              log.error("addSignature:", e);
              throw new OfflineException(e.getMessage(), e);
        }
	}
	
	private void saveImageToLibrary(MboRemote mbo, byte[] encodedfile, JSONObject jsonOfflineEntity) throws MXException, RemoteException, ParseException {
		Date signedDateTime = DateTimeParser.parseDateTime(jsonOfflineEntity.optString("SIGNEDDATE"));		
        
		if(mbo != null) {
			MboSetRemote imglibSet = (MboSetRemote)mbo.getMboSet("$EMMIMGLIB", "IMGLIB", "REFOBJECT = \'INSPFIELDRESULT\' AND REFOBJECTID = :INSPFIELDRESULTID");
			MboRemote imglib = (MboRemote)imglibSet.add();
			imglib.setValue("imagename", signedDateTime.toString(), MboConstants.NOACCESSCHECK);
			imglib.setValue("image", encodedfile, MboConstants.NOACCESSCHECK);
			imglib.setValue("mimetype", "image/png", MboConstants.NOACCESSCHECK);
			// Update the ID in inspfieldresult  
			mbo.setValue("TXTRESPONSE", String.valueOf(imglib.getUniqueIDValue()));
       }
	}
	
	public void addFUInspFieldResult(MboRemote mbo) throws RemoteException, DatabaseException, MXException {
		//Check if any attachment field, then create the inspfieldresult for the field
		MboSetRemote fields = this.user.getSession().getMboSet("INSPFIELD");
		fields.setQbe("INSPFORMNUM", mbo.getString("INSPFORMNUM"));
		fields.setQbe("ORGID", mbo.getString("ORGID"));
		fields.setQbe("REVISION", mbo.getString("REVISION"));
		fields.setQbe("FIELDTYPE", "FU");
		fields.reset();
		
		if (fields != null) {
			MboSetRemote fieldresults = this.user.getSession().getMboSet("INSPFIELDRESULT");
			for (MboRemote field=fields.moveFirst(); field!= null; field=fields.moveNext()) {
				MboSetRemote relatedresults = field.getMboSet("INSPFIELDRESULT");
				relatedresults.setQbe("RESULTNUM", mbo.getString("RESULTNUM"));
				relatedresults.setQbeExactMatch(true);
				relatedresults.reset();
				
				if (relatedresults == null || relatedresults.count() == 0) {
					MboRemote resultMbo = fieldresults.add();
					resultMbo.setValue("INSPFIELDNUM", field.getString("INSPFIELDNUM"));
					resultMbo.setValue("INSPQUESTIONNUM",  field.getString("INSPQUESTIONNUM"));
					resultMbo.setValue("INSPFORMNUM", field.getString("INSPFORMNUM"));
					resultMbo.setValue("RESULTNUM", mbo.getString("RESULTNUM"));
					resultMbo.setValue("REVISION", mbo.getString("REVISION"));
					resultMbo.setValue("ORGID",  mbo.getString("ORGID"));
					resultMbo.setValue("SITEID",  mbo.getString("SITEID"));
					resultMbo.setValue("ENTEREDBY", this.user.getUserId());
					resultMbo.setValue("ENTEREDDATE", this.user.getSession().getMXServerRemote().getDate());
				}
			}
			fieldresults.save();
		}
		
	}
	
	private long getUserTimeZoneDiff(String subtractServerTZ) {
		if (subtractServerTZ == null || subtractServerTZ.length() == 0)
			subtractServerTZ = MXSession.getSession().getTimeZone().getID();
		
        // Check if this user is got time zone set in Maximo
		String userTZ = subtractServerTZ;
		if (this.user.getTimezone() != null && this.user.getTimezone().length() > 0) {
            userTZ = this.user.getTimezone();
        }
        
		// Check the difference of server and user time zones
		long now = System.currentTimeMillis();
		long timeZoneDiff = TimeZone.getTimeZone(userTZ).getOffset(now) - TimeZone.getTimeZone(subtractServerTZ).getOffset(now); 

		return timeZoneDiff;
	}
	
	
}
