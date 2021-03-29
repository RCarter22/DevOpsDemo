/**
 * Domain - Used to construct a generic domain lookup for use with the '/common/domain.htm' file
**/
function Domain (opt){
	this.source = null;
	this.field = null;
	this.table = null;
	this.scanValue = "";
	this.searchFields = "";
	this.where = "1=1";
	this.crossovers = "";
	this.customList = null;
	this.orderby = null;
	this.aliascolumns = null;
	this.isDistinct = false;
	$.extend(this, opt);
	
	// Do not override
	this.display = '*';
}

Domain.prototype.addCustomItem = function(values, aliases){
	if (Object.prototype.toString.call(values) !== '[object Array]' || Object.prototype.toString.call(aliases) !== '[object Array]'){
		throw new Error("Both values and aliases needs to be an array");
	}
	if (values.length !== aliases.length){
		throw new Error("Both values and aliases needs to be an array with matching lengths");
	}
	
	var columnList = [];
	for(i=0; i<values.length; i++){
		columnList.push({
			value : values[i],
			alias : aliases[i]
		});
	}
	
	if (!this.customList)
		this.customList = [];		
	this.customList.push(columnList);
};

Domain.prototype.getSearchFilters = function(){
	var obj = [], self = this;
	if (this.searchFields.length > 0){
		var fields = this.searchFields.replace(/\s+/g, '').split(',');
		$.each(fields, function(k,v){
			if (self.hasOwnProperty(v) && self[v]){
				obj.push({
					name: v,
					value: self[v]
				});
			}
		});
	}
	return obj;
};

Domain.prototype.resetSearchFilter = function(){
	var self = this;
	if (this.searchFields.length > 0){
		var fields = this.searchFields.replace(/\s+/g, '').split(',');
		$.each(fields, function(k,v){
			delete self[v];
		});
	}
};

Domain.prototype.setSql = function(sql){
	this.sql = sql;
};

Domain.prototype.getSql = function(){
	// If this is manually set, return it
	if (this.sql)
		return this.sql;
	
	var self = this;
	if (!this.display || !this.source || !this.field || !this.table){
		alert('One of the required fields is empty');
		return null;
	}
	if (this.customList !== null){			
		var fromClause = [];
		for(i=0; i<this.customList.length; i++){
			var columns = this.customList[i];
			var select = [];
			for(j=0; j<columns.length; j++){
				var item = columns[j];
				select.push("'" + item.value + "' AS " + item.alias.toUpperCase());
			}
			fromClause.push("SELECT " + select.join(", "));
		}
		this.table = "(" + fromClause.join(" UNION ") + ")" + this.table;
	}
	if (this.crossovers !== ""){
		this.crossovers = this.crossovers.replace(/\s+/g, '');
	}
	if (this.scanValue) {
		if(this.searchFields.length > 0){
			var fields = this.searchFields.replace(/\s+/g, '').split(',');
			$.each(fields, function(k,v){
				if(k <= 0)
					self.where += " AND (" + v + " like '%" + self.scanValue + "%' ";
				else
					self.where += " OR " + v + " like '%" + self.scanValue + "%' ";
			});
			self.where += " )";
		}
		else if(this.field){
			self.where += " AND (" + this.field + " like '%" + self.scanValue + "%') ";
		}
	} else if (this.searchFields.length > 0){
		var fields = this.searchFields.replace(/\s+/g, '').split(',');
		$.each(fields, function(k,v){
			if (self.hasOwnProperty(v)){
				self.where += " AND " + v + " like '%" + self[v] + "%' ";
			}
		});
	}
	if (this.aliascolumns != null){
		var aliascolumns = this.aliascolumns.replace(/\s+/g, '').split(',');
		var c = [];
		$.each(aliascolumns, function(k,v){
			c.push(v + " AS '" + v + "'");
		});
		this.display += ", " + c.join(','); 
	}
	
	var sql = "SELECT " + (this.isDistinct ? " DISTINCT " : "") + this.display + ", " + this.source + " AS RETURNVALUE, '" + this.field + "' AS OBJECTKEY, '" + this.crossovers + "' AS CROSSOVERS FROM " + this.table + " WHERE " + this.where;
	if (this.orderby && this.orderby !== '')
		sql += " ORDER BY " + this.orderby;
	
	return sql;
};