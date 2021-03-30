function Inspection(data){

	// Class inheritance
    Mbo.apply(this, arguments);    

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
				var ifrSet = this.INSPFIELDRESULT;
			
				$.each(this.INSPFIELDRESULT, function(i, j){
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
	}

	isFieldComplete = function (ifr) {
		return (!String.isNullOrEmpty(ifr.TXTRESPONSE) || !String.isNullOrEmpty(ifr.NUMRESPONSE) ||
			(!String.isNullOrEmpty(ifr.DATERESPONSE) && ifr.FIELDTYPE == 'DO') ||
			(!String.isNullOrEmpty(ifr.TIMERESPONSE) && ifr.FIELDTYPE == 'TO') ||
			(!String.isNullOrEmpty(ifr.DATERESPONSE) && !String.isNullOrEmpty(ifr.TIMERESPONSE) && ifr.FIELDTYPE == 'DT') ||
			(ifr.DOCLINK && ifr.FIELDTYPE == 'FU'));
	}
	
	isFieldVisible = function (ifr) {
		var visible = 1;
		if (ifr.hasOwnProperty('VISIBLE') && ifr.VISIBLE != null) {
			visible = (ifr.conditionOn) ? ifr.TGTVISIBLE : ifr.VISIBLE;
		}
		return (visible == '1') ? true : false;
	}
	
	isFieldRequired = function (ifr) {
		var required = (ifr.conditionOn) ? ifr.TGTREQUIRED : ifr.REQUIRED;
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
	ifr.conditionOn = false;
	if (ifr.hasOwnProperty('SRCFIELD') && ifr.SRCFIELD != null) {
		$.each(ifrSet, function(f,r){
			if (this.INSPFIELDNUM != ifr.INSPFIELDNUM 
				&& this.INSPFIELDNUM == ifr.SRCFIELD 
				&& this.TXTRESPONSE == ifr.SRCTXTRESPONSE) {
				ifr.conditionOn = true;
			}
		});	
	}
}

Inspection.prototype.isVisible = function(ifr, ifrSet){
	var visible = 1;
	if (ifr.hasOwnProperty('VISIBLE') && ifr.VISIBLE != null) {
		Inspection.prototype.checkFieldCondition(ifr, ifrSet);
		visible = (ifr.conditionOn) ? ifr.TGTVISIBLE : ifr.VISIBLE;
	}
	return (visible == '1') ? true : false;
}

Inspection.prototype.isRequired = function(ifr, ifrSet){
	Inspection.prototype.checkFieldCondition(ifr, ifrSet);
	var required = (ifr.conditionOn) ? ifr.TGTREQUIRED : ifr.REQUIRED;
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

  
