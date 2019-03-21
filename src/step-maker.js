const _firstStepHandler = new FirstStep();
const _winnerService = new WinnerService();
const _lastStepOptionService = new LastStepOptionService(SETTINGS.minimumStep);
const _optionService = new OptionService(SETTINGS.minimumStep);

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

function countStepOut(endPoint, chosenOption) {
	return _optionService.getByChosenOption(endPoint, chosenOption, _firstStepHandler);
};

function getPossibleSteps(map, endPoint, lastStep, settings) {
	if (map.level[endPoint.y / settings.minimumStep][endPoint.x / settings.minimumStep] != 0) {
		return _lastStepOptionService.getAllPossiblePoints(endPoint, lastStep);
	}
	return _optionService.getAllPossiblePoints(endPoint);
}

function countNextStep(map, endPoint, chosenOption, lastStep, settings) {	
	if (map.level[endPoint.y / settings.minimumStep][endPoint.x / settings.minimumStep] != 0) {
		return _lastStepOptionService.getByChosenOption(endPoint, lastStep, chosenOption, _firstStepHandler);
	} 
	return _optionService.getByChosenOption(endPoint, chosenOption, _firstStepHandler);
};

function countStep(startPoint, endPoint) {
	return { x: endPoint.x - startPoint.x, y: startPoint.y - endPoint.y };
}