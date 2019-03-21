class FirstStep {
	constructor() {
	  	this._isFirstStep = true;
	}
	
	get isFirst() {
	  	return this._isFirstStep;
	}
  
	makeFirstStep() {
	  	this._isFirstStep = false;
	}
}