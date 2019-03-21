const _firstStepHandler = new FirstStepHandler();
const _winnerService = new WinnerService(SETTINGS);
const _lastStepOptionService = new LastStepOptionService(SETTINGS.minimumStep);
const _optionService = new OptionService(SETTINGS.minimumStep);
const _tileTypeResolver = new TileTypeResolver(SETTINGS);

function makeNextStep(map, chosenOption, lastStep, settings) {
	var startPoint;
	var newEndPoint;
	var endPoint = lastStep.endPoint;
	// TODO Error in lastStep, its whole step, not point as earlier
	if (_firstStepHandler.isFirst) {
		startPoint = map.arrowStartPoint;
		endPoint = map.arrowEndPoint;
		lastStep = countNextStep(map.arrowStartPoint, map.arrowEndPoint);
		newEndPoint = countNextEndPoint(map, endPoint, chosenOption, lastStep, settings);
		if (newEndPoint === null) {
			return null;
		} 
		else {
			_firstStepHandler.setFirstStepAsMade();
			startPoint = endPoint;
			endPoint = newEndPoint;
			lastStep = countNextStep(startPoint, endPoint);
		}
	}
	else {		
		if (_tileTypeResolver.isOffRoad(map, endPoint)) {
			newEndPoint = countNewOutEndPoint(endPoint, chosenOption, settings);
			startPoint = endPoint;
			endPoint = newEndPoint;
			lastStep = countNextStep(startPoint, endPoint);
		} 
		else {
			newEndPoint = countNextEndPoint(map, endPoint, chosenOption, lastStep, settings);
			if (newEndPoint === null || (newEndPoint.x == endPoint.x && newEndPoint.y == endPoint.y)) {

			}
			else if (newEndPoint.x > (map.level[0].length - 1) * settings.minimumStep) {
				newEndPoint.y = map.level[0].length * settings.minimumStep - 1;
			}
			else {
				startPoint = endPoint;
				endPoint = newEndPoint;
				lastStep = countNextStep(startPoint, endPoint);
			}
		}
	}
	if (_winnerService.shouldPlayerWin(map, endPoint)) {
		_winnerService.handlePlayerWin();
	}
	return { startPoint: startPoint, endPoint: endPoint };
}

function countNewOutEndPoint(endPoint, chosenOption) {
	return _optionService.getByChosenOption(endPoint, chosenOption, _firstStepHandler);
};

function getPossibleEndPoints(map, endPoint, lastStep) {
	if (_tileTypeResolver.isRoad(map, endPoint)) {
		return _lastStepOptionService.getAllPossiblePoints(endPoint, lastStep);
	}
	return _optionService.getAllPossiblePoints(endPoint);
}

function countNextEndPoint(map, endPoint, chosenOption, lastStep, settings) {	
	if (map.level[endPoint.y / settings.minimumStep][endPoint.x / settings.minimumStep] != 0) {
		return _lastStepOptionService.getByChosenOption(endPoint, lastStep, chosenOption, _firstStepHandler);
	} 
	return _optionService.getByChosenOption(endPoint, chosenOption, _firstStepHandler);
};

function countNextStep(startPoint, endPoint) {
	return { x: endPoint.x - startPoint.x, y: startPoint.y - endPoint.y };
}