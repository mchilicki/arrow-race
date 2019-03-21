class FirstStepHandler {
	constructor() {
	  	this._isFirstStep = true;
	}
	
	get isFirst() {
	  	return this._isFirstStep;
	}
  
	setFirstStepAsMade() {
	  	this._isFirstStep = false;
	}
}