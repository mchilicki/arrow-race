const _firstStepHandler = new FirstStep();
const _winnerService = new WinnerService();

function makeNextStep(map, chosenOption, settings) {
	const minimumStep = settings.minimumStep;
	if (_firstStepHandler.isFirst) {
		startPoint = map.arrowStartPoint;
		endPoint = map.arrowEndPoint;
		lastStep = countStep(map.arrowStartPoint, map.arrowEndPoint);
		newStep = countNextStep(map, endPoint, chosenOption, lastStep, settings);
		if (newStep === null) {
			return null;
		} 
		else {
			_firstStepHandler.makeFirstStep();
			startPoint = endPoint;
			endPoint = newStep;
			lastStep = countStep(startPoint, endPoint);
		}
	}
	else {		
		if (map.level[endPoint.y / minimumStep][endPoint.x / minimumStep] == 0) {
			newStep = countStepOut(endPoint, chosenOption, settings);
			startPoint = endPoint;
			endPoint = newStep;
			lastStep = countStep(startPoint, endPoint);
		} 
		else {
			newStep = countNextStep(map, endPoint, chosenOption, lastStep, settings);
			if (newStep === null || (newStep.x == endPoint.x && newStep.y == endPoint.y)) {

			}
			else if (newStep.x > (map.level[0].length - 1) * minimumStep) {
				newStep.y = map.level[0].length * minimumStep - 1;
			}
			else {
				startPoint = endPoint;
				endPoint = newStep;
				lastStep = countStep(startPoint, endPoint);
			}
		}
	}
	if (_winnerService.shouldPlayerWin(map, endPoint, minimumStep)) {
		_winnerService.handlePlayerWin();
	}
	return { startPoint: startPoint, endPoint: endPoint };
}

function countStepOut(endPoint, chosenOption, settings) {
	var optionService = new OptionService(settings.minimumStep);
	switch (chosenOption) {
		case 1:
			return optionService.getBottomPoint(endPoint);			 
		case 2:
			return optionService.getBottomLeftPoint(endPoint);			 
		case 3:
			return optionService.getLeftPoint(endPoint);			 
		case 4:
			return optionService.getTopLeftPoint(endPoint);			 
		case 5:
			return optionService.getTopPoint(endPoint);			 
		case 6:
			return optionService.getTopRightPoint(endPoint);			 
		case 7:
			return optionService.getRightPoint(endPoint);			 
		case 8:
			return optionService.getBottomRightPoint(endPoint);			 
	}
	return null;
};

function getPossibleSteps(map, endPoint, lastStep, settings) {
	const minimumStep = settings.minimumStep;
	var optionService = new OptionService(settings.minimumStep);
	var lastStepOptionService = new LastStepOptionService(settings.minimumStep);
	if (map.level[endPoint.y / minimumStep][endPoint.x / minimumStep] != 0) {
		return lastStepOptionService.getAllPossiblePoints(endPoint, lastStep);
	}
	return optionService.getAllPossiblePoints(endPoint);
}

function countNextStep(map, endPoint, chosenOption, lastStep, settings) {
	const lastStepOptionService = new LastStepOptionService(settings.minimumStep);
	const optionService = new OptionService(settings.minimumStep);
	if (map.level[endPoint.y / settings.minimumStep][endPoint.x / settings.minimumStep] != 0) {
		switch (chosenOption) {
			case 1:
				if (!_firstStepHandler.isFirst) {
					return lastStepOptionService.getBottomPoint(endPoint, lastStep);
				}
				else {
					return null;
				}
			case 2:
				return lastStepOptionService.getBottomLeftPoint(endPoint, lastStep);
			case 3:
				return lastStepOptionService.getLeftPoint(endPoint, lastStep);				
			case 4:
				return lastStepOptionService.getTopLeftPoint(endPoint, lastStep);				
			case 5:
				return lastStepOptionService.getTopPoint(endPoint, lastStep);				
			case 6:
				return lastStepOptionService.getTopRightPoint(endPoint, lastStep);				
			case 7:
				return lastStepOptionService.getRightPoint(endPoint, lastStep);				
			case 8:
				return lastStepOptionService.getBottomRightPoint(endPoint, lastStep);				
		}
	} else {
		switch (chosenOption) {
			case 1:
				if (!_firstStepHandler.isFirst) {
					return optionService.getBottomPoint(endPoint);
				}
				else {
					return null;
				}				
			case 2:
				return optionService.getBottomLeftPoint(endPoint);				
			case 3:
				return optionService.getLeftPoint(endPoint);				
			case 4:
				return optionService.getTopLeftPoint(endPoint);				
			case 5:
				return optionService.getTopPoint(endPoint);				
			case 6:
				return optionService.getTopRightPoint(endPoint);				
			case 7:
				return optionService.getRightPoint(endPoint);				
			case 8:
				return optionService.getBottomRightPoint(endPoint);				
		}
	}
	return null;
};

function countStep(startPoint, endPoint) {
	return { x: endPoint.x - startPoint.x, y: startPoint.y - endPoint.y };
}