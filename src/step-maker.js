const _winnerService = new WinnerService(SETTINGS);
const _lastStepOptionService = new LastStepOptionService(SETTINGS.minimumStep);
const _optionService = new OptionService(SETTINGS.minimumStep);
const _tileTypeResolver = new TileTypeResolver(SETTINGS);

function makeNextStep(map, chosenOption, lastStep) {
	var newEndPoint = countEndPointByTileType(map, lastStep, chosenOption);
	if (newEndPoint === null) {
		return null;
	}
	var newStartPoint = lastStep.endPoint;
	lastStep = countNextStep(newStartPoint, newEndPoint);
	if (_winnerService.shouldPlayerWin(map, newEndPoint)) {
		_winnerService.handlePlayerWin();
	}
	return lastStep;
}

function countEndPointByTileType(map, lastStep, chosenOption) {
	if (_tileTypeResolver.isRoad(map, lastStep.endPoint)) 
		return countNextEndPoint(map, lastStep, chosenOption);
	else if (_tileTypeResolver.isOffRoad(map, lastStep.endPoint))
		return countNewOutEndPoint(lastStep, chosenOption);
	return null;
}

function countNewOutEndPoint(lastStep, chosenOption) {
	return _optionService.getByChosenOption(lastStep, chosenOption);
}

function countNextEndPoint(map, lastStep, chosenOption) {
	return _lastStepOptionService.getByChosenOption(lastStep, lastStep.difference, chosenOption);
}

function getPossibleEndPoints(map, lastStep) {
	if (_tileTypeResolver.isRoad(map, lastStep.endPoint)) {
		return _lastStepOptionService.getAllPossiblePoints(lastStep, lastStep.difference);
	}
	return _optionService.getAllPossiblePoints(lastStep);
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