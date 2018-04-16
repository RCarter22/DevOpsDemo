package com.interprosoft.ezmaxmobile.offline.action;

import com.interprosoft.ezmaxmobile.db.SelectQuery;

public class SQLTests {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String dbType = "SQLSERVER";
		String dbSchema = "dbo";
		
		System.out.println("\n\n----- WORKORDERS -----\n\n");
		System.out.println(new SelectQuery(dbType, dbSchema)
			.distinct()
			.column("W.WONUM", "W.WORKORDERID", "W.PARENT", "W.DESCRIPTION")
			.column("W.STATUS", "W.LOCATION", "W.ASSETNUM", "W.PERSONGROUP")
			.column("W.CREWID", "W.SUPERVISOR", "W.LEAD", "W.PHONE")
			.column("W.REPORTEDBY", "W.WOPRIORITY", "W.REPORTDATE", "W.SCHEDSTART")
			.column("W.SCHEDFINISH", "W.STATUSDATE", "W.ESTDUR", "W.WORKTYPE")
			.column("W.FAILURECODE", "W.PROBLEMCODE", "W.ISTASK", "W.ORIGRECORDID")
			.column("W.SITEID", "W.ORGID")
			.columnAsString("LD.LDTEXT AS LONGDESCRIPTION") // IMPORTANT TO USE .columnAsString FOR LONGDESCRIPTION TABLE
			.from("WORKORDER AS W")
			.leftJoin("LONGDESCRIPTION LD", "W.WORKORDERID = LD.LDKEY AND LD.LDOWNERTABLE='WORKORDER' AND LD.LDOWNERCOL='DESCRIPTION'")
			.where("W.WOCLASS = 'WORKORDER'")
			.and("W.ISTASK = 0")
			.and("W.HISTORYFLAG = 0")
			.and("W.STATUS NOT IN ('CLOSE','COMP','CAN')")
			.orderBy("W.WORKORDERID")
			.toString(true));
		
		System.out.println("\n\n----- WOTRACK WF ASSIGNMENT -----\n\n");
		System.out.println(new SelectQuery(dbType, dbSchema)
			.distinct()
			.column("WFA.OWNERID")
			.from("WFASSIGNMENT WFA")
			.innerJoin("WORKORDER WO1", "WO1.WORKORDERID = WFA.OWNERID")
			.where("WO1.WOCLASS = 'WORKORDER' AND WO1.ISTASK = 0 AND WO1.HISTORYFLAG = 0 AND WO1.STATUS NOT IN ('CLOSE','COMP','CAN')")
			.and("WFA.ASSIGNSTATUS = 'ACTIVE'")
			.and("WFA.OWNERTABLE = 'WORKORDER'")
			.and("WFA.ASSIGNCODE = '" + "JLEE" + "'")
			.and("WFA.APP = '" + "WOTRACK" + "'")
			.toString(true));
		
		System.out.println("\n\n----- SR LEAD -----\n\n");
		System.out.println(new SelectQuery(dbType, dbSchema)
			.distinct()
			.column("TICKETUID")
			.from("TICKET")
			.where("CLASS = 'SR' AND HISTORYFLAG = 0 AND STATUS NOT IN ('CAN','CLOSED','RESOLVED')")
			.and("(OWNERGROUP IN (SELECT PERSONGROUP FROM PERSONGROUPTEAM WHERE RESPPARTYGROUP = '" + "JLEE" + "') OR OWNER = '" + "JLEE" + "')")
			.toString(true));
	
		System.out.println("\n\n----- SR WF ASSIGNMENT -----\n\n");
		System.out.println(new SelectQuery(dbType, dbSchema)
			.distinct()
			.column("WFA.OWNERID")
			.from("WFASSIGNMENT WFA")
			.innerJoin("TICKET SR1", "SR1.TICKETUID = WFA.OWNERID")
			.where("SR1.CLASS = 'SR' AND SR1.HISTORYFLAG = 0")
			.and("WFA.ASSIGNSTATUS = 'ACTIVE'")
			.and("WFA.OWNERTABLE = 'SR'")
			.and("WFA.ASSIGNCODE = '" + "JLEE" + "'")
			.and("WFA.APP = '" + "SR" + "'")
			.toString(true));	
		
		System.out.println("\n\n----- PERSON -----\n\n");
		System.out.println(new SelectQuery(dbType, dbSchema)
			.distinct()
			.column("PERSONID", "DISPLAYNAME", "FIRSTNAME", "LASTNAME", "SUPERVISOR", "STATUS")
			.from("PERSON")
			.where("STATUS = 'ACTIVE'")
			.and("PERSONID IN (SELECT PERSONID FROM LABOR WHERE STATUS = 'ACTIVE' AND ORGID = '" + "JLEE" + "')")
			.orderBy("DISPLAYNAME", "PERSONID")
			.toString(true));
	
		System.out.println("\n\n----- WO FAILURECODE -----\n\n");
		System.out.println(new SelectQuery(dbType, dbSchema)
			.distinct()
			.column("W.WORKORDERID", "W.WORKORDERID", "W.WONUM", "W.SITEID"," W.ORGID", "W.FAILURECODE")
			// PROBLEM CODE
			.column("(" +
					new SelectQuery(dbType, dbSchema)
						.top(1)
						.column("FR.FAILURECODE")
						.from("FAILUREREPORT AS FR")
						.where("FR.TYPE = 'PROBLEM' AND FR.WONUM = W.WONUM AND FR.SITEID = W.SITEID")
						.toString()
					+ ") AS PROBLEMCODE"
			)
			// CAUSE CODE
			.column("(" +
					new SelectQuery(dbType, dbSchema)
						.top(1)
						.column("FR.FAILURECODE")
						.from("FAILUREREPORT AS FR")
						.where("FR.TYPE = 'CAUSE' AND FR.WONUM = W.WONUM AND FR.SITEID = W.SITEID")
						.toString()
					+ ") AS CAUSECODE"
			)		
			// REMEDY CODE
			.column("(" +
					new SelectQuery(dbType, dbSchema)
						.top(1)
						.column("FR.FAILURECODE")
						.from("FAILUREREPORT AS FR")
						.where("FR.TYPE = 'REMEDY' AND FR.WONUM = W.WONUM AND FR.SITEID = W.SITEID")
						.toString()
					+ ") AS REMEDYCODE"
			)		 
			.from("WORKORDER AS W")
			.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
			.and("W.STATUS NOT IN ('CLOSE','COMP','CAN')")
			.orderBy("W.WORKORDERID", "W.FAILURECODE")
			.toString(true));
		
		System.out.println("\n\n----- INVBALANCE DELTA -----\n\n");
		System.out.println(new SelectQuery(dbType, dbSchema)
			.distinct()
			.column("INVB.INVBALANCESID", "ITEM.ITEMNUM", "ITEM.ITEMSETID", "ITEM.DESCRIPTION", "ITEM.LOTTYPE", "ITEM.ITEMTYPE", "ITEM.STATUS")
			.column("INVB.LOCATION", "INVB.BINNUM", "INVB.LOTNUM", "INVB.CURBAL", "INVB.PHYSCNT", "INVB.PHYSCNTDATE")
			.column("INVB.RECONCILED", "INVB.ORGID", "INVB.SITEID")
			.from("INVBALANCES AS INVB")
			.innerJoin("ITEM", "INVB.ITEMNUM = ITEM.ITEMNUM AND INVB.ITEMSETID = ITEM.ITEMSETID AND ITEM.ITEMTYPE = 'ITEM'")
			.where("ITEM.STATUS != 'OBSOLETE'")
			.and("ITEM.ITEMNUM IN ("
					+ " SELECT DISTINCT INVT.ITEMNUM FROM INVTRANS INVT WHERE INVB.ITEMSETID = INVT.ITEMSETID AND INVB.SITEID = INVT.SITEID AND INVB.LOCATION = INVT.STORELOC AND INVT.TRANSDATE > '1/1/2013'"
					+ " UNION " 
					+ " SELECT DISTINCT INV.ITEMNUM FROM INVENTORY INV WHERE INVB.ITEMSETID = INV.ITEMSETID AND INVB.SITEID = INV.SITEID AND INV.STATUS IN ('ACTIVE', 'PENDOBS') AND (INV.STATUSDATE > '1/1/2013' OR INV.LASTISSUEDATE > '1/1/2013'"
					+ "))"
			)
			.orderBy("ITEM.ITEMNUM")
			.toString(true));		
		
		System.out.println("\n\n----- INVENTORY DELTA -----\n\n");
		System.out.println(new SelectQuery(dbType, dbSchema)
    		.distinct()
			.column("INV.INVENTORYID", "INV.ITEMNUM", "INV.ITEMSETID", "INV.LOCATION", "ITEM.DESCRIPTION", "INV.CATEGORY", "INV.MANUFACTURER")
			.column("INV.MODELNUM", "INV.SITEID", "INV.STATUS", "INV.STATUSDATE")
			.column("INV.BINNUM", "INV.ISSUEUNIT", "INV.ISSUEYTD", "INV.ISSUE1YRAGO", "INV.LASTISSUEDATE")
    		.from("INVENTORY AS INV")
    		.innerJoin("ITEM", "INV.ITEMNUM = ITEM.ITEMNUM AND INV.ITEMSETID = ITEM.ITEMSETID AND ITEM.ITEMTYPE = 'ITEM'")
    		.where("INV.STATUS != 'OBSOLETE'")
    		.and("(INV.STATUSDATE > '1/1/2013' OR INV.LASTISSUEDATE > '1/1/2013')")
    		.orderBy("INV.SITEID", "INV.ITEMNUM")
    		.toString(true));	
		
		System.out.println("\n\n----- INV BALANCES DELTA -----\n\n");
		System.out.println(new SelectQuery(dbType, dbSchema)
    		.distinct()
			.column("INVB.INVBALANCESID")
    		.from("INVBALANCES AS INVB")
    		.innerJoin("ITEM", "INVB.ITEMNUM = ITEM.ITEMNUM AND INVB.ITEMSETID = ITEM.ITEMSETID AND ITEM.ITEMTYPE = 'ITEM'")
    		.where("(ITEM.STATUS = 'OBSOLETE' AND ITEM.STATUSDATE > '1/1/2013')")
    		.or("ITEM.ITEMNUM IN (SELECT INV.ITEMNUM FROM INVENTORY INV WHERE INVB.ITEMSETID = INV.ITEMSETID AND INVB.SITEID = INV.SITEID AND INV.STATUS NOT IN ('ACTIVE', 'PENDOBS') AND INV.STATUSDATE > '1/1/2013')")
    		.toString(true));	  
		
		
		System.out.println("\n\n----- DOMAIN -----\n\n");
    	String alnDomain = new SelectQuery(dbType, dbSchema)
			.column("DOMAINID")
			.column("NULL AS MAXVALUE")
			.column("VALUE")
			.column("DESCRIPTION")
			.from("ALNDOMAIN")
			.where("DOMAINID IN ('CREWID')")
			.toString(true);
		
		String synonymDomain = new SelectQuery(dbType, dbSchema)
			.column("DOMAINID")
			.column("MAXVALUE")
			.column("VALUE")
			.column("DESCRIPTION")
			.from("SYNONYMDOMAIN")
			.where("DOMAINID IN ('WOSTATUS', 'ITEMSTATUS', 'LOGTYPE', 'CATEGORY')")
			.toString(true);
	    	
		String numericDomain = new SelectQuery(dbType, dbSchema)
			.column("DOMAINID")
			.column("NULL AS MAXVALUE")
			.columnAsString("VALUE")
			.column("DESCRIPTION")
			.from("NUMERICDOMAIN")
			.where("DOMAINID IN ('TICKETPRIORITY')")
			.toString(true);
	
		String sql = alnDomain + " UNION " + synonymDomain + " UNION " + numericDomain;
		
		System.out.println(sql);
		
		
		System.out.println("\n\n----- WORKLOG -----\n\n");
		System.out.println(new SelectQuery(dbType, dbSchema)
			.distinct()
			.column("W.WONUM", "W.WORKORDERID")
			.column("WL.WORKLOGID", "WL.RECORDKEY", "WL.DESCRIPTION", "WL.CLASS", "WL.CREATEBY")
			.column("WL.LOGTYPE", "WL.CREATEDATE", "WL.SITEID", "WL.ORGID")
			// IMPORTANT TO USE .columnAsString FOR LONGDESCRIPTION TABLE
			.columnAsString("LD.LDTEXT AS LONGDESCRIPTION") 
			.from("WORKORDER AS W")
			.innerJoin("WORKLOG AS WL", "W.WONUM = WL.RECORDKEY AND W.WOCLASS = WL.CLASS")
			.leftJoin("LONGDESCRIPTION LD", "WL.WORKLOGID = LD.LDKEY AND LD.LDOWNERTABLE='WORKLOG' AND LD.LDOWNERCOL='DESCRIPTION'")
			.where("W.WOCLASS = 'WORKORDER' AND W.ISTASK = 0 AND W.HISTORYFLAG = 0")
			.and("W.STATUS NOT IN ('CLOSE','COMP','CAN')")
			.orderBy("W.WORKORDERID", "WL.WORKLOGID")
			.toString(true));		
		
	}	
}
