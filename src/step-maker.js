const _firstStepHandler = new FirstStepHandler();
const _winnerService = new WinnerService(SETTINGS);
const _lastStepOptionService = new LastStepOptionService(SETTINGS.minimumStep);
const _optionService = new OptionService(SETTINGS.minimumStep);
const _tileTypeResolver = new TileTypeResolver(SETTINGS);

function makeNextStep(map, chosenOption, lastStep, settings) {
	var startPoint;
	var newEndPoint;
	var endPoint = lastStep.endPoint;
	if (_firstStepHandler.isFirst) {
		newEndPoint = countNextEndPoint(map, chosenOption, lastStep);
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
			newEndPoint = countNewOutEndPoint(lastStep, chosenOption, settings);
			startPoint = endPoint;
			endPoint = newEndPoint;
			lastStep = countNextStep(startPoint, endPoint);
		}
		else {
			newEndPoint = countNextEndPoint(map, chosenOption, lastStep);
			if (newEndPoint === null) {
				return null;
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
	return lastStep;
}

function countNewOutEndPoint(lastStep, chosenOption) {
	return _optionService.getByChosenOption(lastStep, chosenOption);
}

function getPossibleEndPoints(map, lastStep) {
	if (_tileTypeResolver.isRoad(map, lastStep.endPoint)) {
		return _lastStepOptionService.getAllPossiblePoints(lastStep, lastStep.difference);
	}
	return _optionService.getAllPossiblePoints(lastStep);
}

function countNextEndPoint(map, chosenOption, lastStep) {
	if (!_tileTypeResolver.isOffRoad(map, lastStep.endPoint)) {
		return _lastStepOptionService.getByChosenOption(lastStep, lastStep.difference, chosenOption);
	} 
	return _optionService.getByChosenOption(lastStep, chosenOption);
}

function countNextStep(startPoint, endPoint) {
	return { 
		startPoint: startPoint,
		endPoint: endPoint,
		difference: {
			x: endPoint.x - startPoint.x, 
			y: startPoint.y - endPoint.y
		}		 
	};
}