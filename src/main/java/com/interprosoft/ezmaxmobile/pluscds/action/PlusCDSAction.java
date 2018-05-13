package com.interprosoft.ezmaxmobile.pluscds.action;

import java.util.Iterator;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import psdi.mbo.MboRemote;
import psdi.mbo.MboSetRemote;

import com.interprosoft.ezmaxmobile.common.EMMConstants;
import com.interprosoft.ezmaxmobile.common.action.BaseAction;
import com.interprosoft.ezmaxmobile.common.model.EZMessage;

@Component
@Scope("prototype")
@Namespace("/pluscds")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
@Results({@Result(name="error", location="/error/error.jsp")})
public class PlusCDSAction  extends BaseAction {

	private static final long serialVersionUID = 1L;
	public static final String OWNERMBO = "PLUSCWODS";
	
	private List<MboRemote> assetFunctionsList;
	private List<MboRemote> calibrationPointsList;
	private MboRemote assetFunction;
	
	@Action(value="main",
			results={
				@Result(name="success", location="main.jsp"),
				@Result(name="error", location="main.jsp")
			}
		)
	public String execute() {
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			else if(currentMbo.equalsIgnoreCase(OWNERMBO)){
				currentMbo = "WORKORDER";
			}
			// Get the data sheets			
			mbo = (MboRemote)this.getSessionObject(currentMbo);
			pagination.setPageSize(5);
			populateMbo(currentMbo, this.getSessionValueByName(EMMConstants.CURRENTAPPNAME));
			populateMboListByRelationship(currentMbo, OWNERMBO);		
			
			this.setSessionValue("ASSETFUNCTIONID", null);
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Action(value="view",
			results={
				@Result(name="success", location="pluscds.jsp"),
				@Result(name="error", location="main.jsp")
			}
		)
	public String view() {
		try {
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			mbo = (MboRemote)this.getSessionObject(currentMbo);
			this.setSessionObject("WORKORDER", mbo);
			
			if (mbo!=null && !mbo.getName().equalsIgnoreCase(OWNERMBO)){
				mbo = this.simpleService.findById(mbo.getMboSet(OWNERMBO),id);
				setMboSession(OWNERMBO,this.mbo);
			}
			if (mbo!=null && mbo.getUniqueIDValue() != id){
				mbo = this.simpleService.findById(mbo.getThisMboSet(),id);
				setMboSession(OWNERMBO,this.mbo);				
			}
			if(this.mbo == null && id>0){
				mbo = this.simpleService.findById(OWNERMBO,id);
				setMboSession(OWNERMBO,this.mbo);
			}
			
			// Get the Asset functions
			if (mbo != null){
				MboRemote dataSheetRemote = mbo;
				this.setSessionObject(OWNERMBO, dataSheetRemote);
				MboSetRemote assetFunctionSetRemote = dataSheetRemote.getMboSet("PLUSCWODSINSTR");
				assetFunctionSetRemote.reset();
				this.assetFunctionsList = this.simpleService.paginateMboSet(assetFunctionSetRemote, pagination);
			}

			// Get the Calibration Points
			if (this.assetFunctionsList != null && !this.assetFunctionsList.isEmpty()){
				MboRemote assetFunctionRemote = null;
				String assetFunctionId = this.getSessionValueByName("ASSETFUNCTIONID");
				this.setSessionValue("ASSETFUNCTIONID", null);
				if(assetFunctionId != null && !assetFunctionId.equalsIgnoreCase(""))
				{				
					long selectedAssetFunctionId = Long.valueOf(assetFunctionId);
					Iterator<MboRemote> assetFunctionIter = assetFunctionsList.iterator();
					while(assetFunctionIter.hasNext()){
						MboRemote temp = assetFunctionIter.next();
						if(temp.getUniqueIDValue() == selectedAssetFunctionId){
							assetFunctionRemote = temp;
							break;
						}
					}
					assetFunctionRemote.select();
				}
				else{
					assetFunctionRemote = (MboRemote)assetFunctionsList.get(0);
					assetFunctionRemote.select();
				}
				this.setSessionObject("PLUSCWODSINSTR", assetFunctionRemote);
				this.assetFunction = assetFunctionRemote;
				MboSetRemote calibrationPointsSetRemote = assetFunctionRemote.getMboSet("PLUSCWODSINSTRPOINTS");
				this.setSessionObject("PLUSCWODSINSTRPOINTS", calibrationPointsSetRemote);
				this.calibrationPointsList = this.simpleService.paginateMboSet(calibrationPointsSetRemote, pagination);
			}			
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}	
	
	@Action(value="selectassetfunction",
			results={
				@Result(name="success", location="view.action", type="redirect", params={"id","${id}"}),
				@Result(name="error", location="view.action", type="redirect", params={"id","${id}"})
			}
		)
	public String selectAssetFunction(){
		try {
			this.setSessionValue("ASSETFUNCTIONID", String.valueOf(id));
			
			String currentMbo = this.getSessionValueByName(EMMConstants.CURRENTMBONAME);
			if(currentMbo == null || currentMbo.equalsIgnoreCase(""))
				return EMMConstants.HOME;
			
			MboRemote datasheetMbo = (MboRemote)this.getSessionObject(OWNERMBO);
			id = datasheetMbo.getUniqueIDValue();
		} catch (Exception e){
			this.setMessage(new EZMessage(e.getMessage(), EMMConstants.ERROR));
			this.addActionError(e.getMessage());
			return ERROR;
		}
		this.setSessionObject("WORKORDER", mbo);
		return SUCCESS;
	}	
	
	public MboRemote getAssetFunction(){
		return assetFunction;
	}
	
	public void setAssetFunction(MboRemote assetFunction){
		this.assetFunction = assetFunction;
	}

	public List<MboRemote> getAssetFunctionsList() {
		return assetFunctionsList;
	}

	public void setAssetFunctionsList(List<MboRemote> assetFunctionsList) {
		this.assetFunctionsList = assetFunctionsList;
	}

	public List<MboRemote> getCalibrationPointsList() {
		return calibrationPointsList;
	}

	public void setCalibrationPointsList(List<MboRemote> calibrationPointsList) {
		this.calibrationPointsList = calibrationPointsList;
	}
}