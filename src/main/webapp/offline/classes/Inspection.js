function Inspection(){

	// Class inheritance
    Mbo.apply(this, arguments);    
    
    // Set unique identifier column for this class
    // This attribute should match the uniquekey="Y" in the offlineconfig.xml for this entity
    this.setUniqueIdentifier('INSPECTIONRESULTID');
    
    this.mbo.extend({
    	_reqCount : null,
		_reqCompleteCount : null,
		_totalCount : null,
		_totalCompleteCount : null
    });  
    
	
	var self = this;
	
	self.init = function(){
		var mainQuestion = null;
		initInspCount(self);
		
		$.each(self.INSPQUESTION, function(k, v){
			if (this.SEQUENCE != 0 || !this.GROUPID){
				if (!this.GROUPID) {
					mainQuestion = this;
					mainQuestion.TOTALCOUNT = 0;
					mainQuestion.COMPLETECOUNT = 0;
				}
				
				var completeFields = 0;	
				var isQuestionVisible = false, isQuestionRequired = false, isRequiredFieldIncomplete = false;
				var ifrSet = this.FIELDRESULT;			
				
				$.each(this.FIELDRESULT, function(i, j){
					self.checkFieldCondition(this, ifrSet);
					if (isFieldVisible(this)) {						
						isQuestionVisible = true;
						if (isFieldRequired(this))
							isQuestionRequired = true;
						if (isFieldComplete(this))
							completeFields++;
						else if (isFieldRequired(this))
							isRequiredFieldIncomplete = true;
					}	
				});

				// Get each question related stats
				if (isQuestionVisible) {
					mainQuestion.TOTALCOUNT++;
					self.mbo._totalCount++;
					
					if (isQuestionRequired)
						self.mbo._reqCount++;
					if (isQuestionRequired && !isRequiredFieldIncomplete) {
						self.mbo._reqCompleteCount++;									
						self.mbo._totalCompleteCount++;
						mainQuestion.COMPLETECOUNT++;
					}
					if (!isQuestionRequired && completeFields > 0) {
						mainQuestion.COMPLETECOUNT++;
						self.mbo._totalCompleteCount++; 
					}
				}
			} else {
				mainQuestion = this;
				mainQuestion.TOTALCOUNT = 0;
				mainQuestion.COMPLETECOUNT = 0;
			}
		});
	}
	
	initInspCount = function (insp) {
		insp.mbo._reqCount = 0;
		insp.mbo._reqCompleteCount = 0;
		insp.mbo._totalCount = 0;
		insp.mbo._totalCompleteCount = 0; 
		self.mbo._toBeSaved = false;
	}
		
	isFieldComplete = function (ifr) {
		return (!String.isNullOrEmpty(ifr.INSPFIELDRESULT.TXTRESPONSE) || !String.isNullOrEmpty(ifr.INSPFIELDRESULT.NUMRESPONSE) ||
				(!String.isNullOrEmpty(ifr.INSPFIELDRESULT.DATERESPONSE) && ifr.INSPFIELD.FIELDTYPE == 'DO') ||
				(!String.isNullOrEmpty(ifr.INSPFIELDRESULT.TIMERESPONSE) && ifr.INSPFIELD.FIELDTYPE == 'TO') ||
				(!String.isNullOrEmpty(ifr.INSPFIELDRESULT.DATERESPONSE) && !String.isNullOrEmpty(ifr.INSPFIELDRESULT.TIMERESPONSE) && ifr.INSPFIELD.FIELDTYPE == 'DT') ||
				(ifr.DOCLINK.length > 0 && ifr.INSPFIELD.FIELDTYPE == 'FU') || !String.isNullOrEmpty(ifr.INSPFIELDRESULT.SIGNATURE));
	}
	
	isFieldVisible = function (ifr) {
		var visible = 1;
		if (ifr.INSPFIELD.hasOwnProperty('VISIBLE') && ifr.INSPFIELD.VISIBLE != null) {
			visible = (ifr.INSPFIELD.conditionOn) ? ifr.INSPFIELD.TGTVISIBLE : ifr.INSPFIELD.VISIBLE;
		}
		return (visible == '1') ? true : false;
	}
	
	isFieldRequired = function (ifr) {
		var required = (ifr.INSPFIELD.conditionOn) ? ifr.INSPFIELD.TGTREQUIRED : ifr.INSPFIELD.REQUIRED;
		return (required == '1') ? true : false;
	}
	
	self.init();
	
    // Automatically add 'watch' to current object
    var scope = angular.element(document.querySelector('[ng-app]')).scope();
    scope.$watch(function() {
    	var selfCopy = angular.copy(self);
    	return selfCopy;
    }, function(n, o) {
    	if (!emm.util.compareObjects(n, o)){
    		self.init();
    	}
    }, true);
}


Inspection.prototype.getTopLevelQuestions = function(){
	if (this.INSPQUESTION){
		return $.grep(this.INSPQUESTION, function(q){
			return (q.SEQUENCE == 0 || !q.GROUPID);
		});					
	}
}

Inspection.prototype.isStatusComplete = function(){
	return this.STATUS === 'COMPLETED';
}

Inspection.prototype.isComplete = function(){
	return this.mbo._reqCompleteCount == this.mbo._reqCount;
}

Inspection.prototype.getRequiredCount = function(){
	return this.mbo._reqCount;
}

Inspection.prototype.getRequiredCompleteCount = function(){
	return this.mbo._reqCompleteCount;				
}

Inspection.prototype.getTotalCount = function(){
	return this.mbo._totalCount;				
}

Inspection.prototype.getTotalCompleteCount = function(){
	return this.mbo._totalCompleteCount;				
}

Inspection.prototype.checkFieldCondition = function(ifr, ifrSet){
	ifr.INSPFIELD.conditionOn = false;
	// Check if there is any condition
	if (ifr.INSPFIELD.hasOwnProperty('SRCFIELD') && ifr.INSPFIELD.SRCFIELD != null) {
		$.each(ifrSet, function(f,r){
			if (this.INSPFIELD.INSPFIELDNUM != ifr.INSPFIELD.INSPFIELDNUM 
				&& this.INSPFIELD.INSPFIELDNUM == ifr.INSPFIELD.SRCFIELD 
				&& this.INSPFIELDRESULT.TXTRESPONSE == ifr.INSPFIELD.SRCTXTRESPONSE) {
				ifr.INSPFIELD.conditionOn = true;
			}
		});	
	}
}

Inspection.prototype.isVisible = function(ifr, ifrSet){
	var visible = 1;
	if (ifr.INSPFIELD.hasOwnProperty('VISIBLE') && ifr.INSPFIELD.VISIBLE != null) {
		Inspection.prototype.checkFieldCondition(ifr, ifrSet);
		visible = (ifr.INSPFIELD.conditionOn) ? ifr.INSPFIELD.TGTVISIBLE : ifr.INSPFIELD.VISIBLE;
	}
	return (visible == '1') ? true : false;
}

Inspection.prototype.isRequired = function(ifr, ifrSet){
	Inspection.prototype.checkFieldCondition(ifr, ifrSet);
	var required = (ifr.INSPFIELD.conditionOn) ? ifr.INSPFIELD.TGTREQUIRED : ifr.INSPFIELD.REQUIRED;
	return (required == '1') ? true : false;
}

Inspection.prototype.isQuestionRequired = function(ifrSet){
	var questionRequired = false;
	$.grep(ifrSet, function(fr){
		var required = (fr.conditionOn) ? fr.TGTREQUIRED : fr.REQUIRED;
		if (required == '1')
			questionRequired=true;
	});	
	return questionRequired;
}

Inspection.prototype.isDirty = function(){
	var isDirty = false;
	$.each(this.INSPQUESTION, function(k, v){
		$.each(this.FIELDRESULT, function(i, j){
			if (this.INSPFIELDRESULT.mbo && this.INSPFIELDRESULT.mbo.isDirty()) {
				isDirty = true;
			}
		});
	});
	return isDirty;
}


/* Validate */
Inspection.prototype.validate = function(){
	var self = this, validated = true;
	
	$.each(this.INSPQUESTION, function(k, v){	
		$.each(this.FIELDRESULT, function(i, j){
			if (this.INSPFIELDRESULT && this.INSPFIELD.FIELDTYPE === 'MM') {
				if (this.INSPFIELD.METERTYPE != 'CHARACTERISTIC') {
					if (typeof this.INSPFIELDRESULT.NUMRESPONSE === 'undefined' 
						||	(!String.isNullOrEmpty(this.INSPFIELDRESULT.NUMRESPONSE) && !Number.isNumber(this.INSPFIELDRESULT.NUMRESPONSE))){
						validated = false;
						alert(getText('EMMOF1004W', [v.DESCRIPTION],  v.DESCRIPTION + ' must be a number'));
						return validated;
					} 
					
					if (!String.isNullOrEmpty(this.INSPFIELDRESULT.NUMRESPONSE) 
							&&  this.INSPFIELDRESULT.NUMRESPONSE <= 0 
							&& this.INSPFIELD.METERTYPE === 'CONTINUOUS') {
						validated = false;
						alert(getText('EMMOF1010W', [v.DESCRIPTION],  v.DESCRIPTION + ' must be greater than zero'));
						return validated;
					}
				}
			}
			
			if (this.INSPFIELDRESULT && this.INSPFIELD.FIELDTYPE === 'SE') {
				if (typeof this.INSPFIELDRESULT.NUMRESPONSE === 'undefined' 
					|| (!String.isNullOrEmpty(this.INSPFIELDRESULT.NUMRESPONSE) && !Number.isNumber(this.INSPFIELDRESULT.NUMRESPONSE))){
					validated = false;
					alert(getText('EMMOF1004W', [v.DESCRIPTION],  v.DESCRIPTION + ' must be a number'));
					//self.mbo.message(getText('EMMOF1004W', [v.DESCRIPTION],  v.DESCRIPTION + ' must be a number'));
					return validated;
				} 
			}
		});
	});
	
	// Return true if the object is valid
	return validated;
}