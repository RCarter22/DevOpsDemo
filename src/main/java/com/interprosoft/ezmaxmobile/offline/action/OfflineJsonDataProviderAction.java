package com.interprosoft.ezmaxmobile.offline.action;

import java.sql.SQLException;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.interprosoft.ezmaxmobile.common.db.DBException;
import com.interprosoft.ezmaxmobile.offline.OfflineException;

@Component
@Scope("prototype")
@Namespace("/offline")
@ResultPath(value="/")
@ParentPackage(value="mydefault")
public class OfflineJsonDataProviderAction extends BaseOfflineInitAction {
	
	private static final long serialVersionUID = 1L;
	
	private static Log log = LogFactory.getLog(OfflineJsonDataProviderAction.class);
	
	
	/** 	############################################################ 	//
	 * 		Use JSON Data to populate your Offline Tables
	 * 		Below are some exmaples you can follow
	 * 		You can utilize other api's to query information
	 * 		Please follow the example below for guidelines to follow:
	 * 			1. Create a JSONArray object
	 * 			2. Create a String object representing a comma separated list of columns
	 * 				2a. Remember the columns you provide will determine your tables column structure.
	 * 					If you fail to add columns, the information will not be inserted into the cells.
	 * 			3. Create a JSONObject for each record in your database
	 * 				3a. Json attribute names must correspond to the exact name in your columns string.
	 * 			4. Add the JSONObject to the JSONArray
	 * 			5. Repeat steps 2-4
	 * 			6. Call addJsonArrayToDatabase parameters go as follows:
	 * 				1. Table Name
	 * 				2. JSONArray
	 * 				3. String of columns
	 * 
	 * 		If you are using this for an existing table, any new columns will be
	 * 		added to the existing table. But they will still be new rows!
	 * 
	 * 		############################################################		//
	 */
	
	
//	@Action(value="getDummyDataJson",
//			results={
//				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
//			}
//		)
//	public void getDummyDataJson() throws OfflineException, DBException, SQLException{
//		//Create a blank JSON array to store data to
//		JSONArray jsonArray = new JSONArray();
//		
//		//Each json object represents 1 row in your database
//		JSONObject json = new JSONObject();
//		
//		//Each attribute of your json represents as 1 column and the value in the cell of that row/column
//		json.put("COLUMN1", "1");
//		json.put("COLUMN2", "1");
//		json.put("COLUMN3", "1");
//		
//		//Remember to add your json to the array
//		jsonArray.add(json);
//		
//		//comma separated list of the tables columns
//		String columns = "COLUMN1,COLUMN2,COLUMN3";
//		
//		//executes the request to add to the database
//		this.addJsonArrayToDatabase("DUMMY", jsonArray, columns);
//	}
//	
//	@Action(value="getDummyDataJson2",
//			results={
//				@Result(name="success", type="stream", params={"inputName", "jsonResult"})
//			}
//		)
//	public void getDummyDataJson2() throws OfflineException, DBException, SQLException{
//		//Create a blank JSON array to store data to
//		JSONArray jsonArray = new JSONArray();
//		
//		//Each json object represents 1 row in your database
//		JSONObject json = new JSONObject();
//		
//		//Each attribute of your json represents as 1 column and the value in the cell of that row/column
//		json.put("COLUMN1", "1");
//		json.put("COLUMN2", "1");
//		json.put("COLUMN4", "2");
//		
//		//Remember to add your json to the array
//		jsonArray.add(json);
//		
//		//comma separated list of the tables columns
//		String columns = "COLUMN1,COLUMN2,COLUMN4";
//		
//		//executes the request to add to the database
//		this.addJsonArrayToDatabase("DUMMY", jsonArray, columns);
//	}
}