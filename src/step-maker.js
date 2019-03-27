class StepMaker {
	constructor(settings) {
		this._winnerService = new WinnerService(settings);
		this._lastStepOptionService = new LastStepOptionService(settings.minimumStep);
		this._optionService = new OptionService(settings.minimumStep);
		this._tileTypeResolver = new TileTypeResolver(settings);
	}

	makeNextStep(map, chosenOption, lastStep) {
		var newEndPoint = this._countEndPointByTileType(map, lastStep, chosenOption);
		if (newEndPoint === null) {
			return null;
		}
		var newStartPoint = lastStep.endPoint;
		lastStep = this.countNextStep(newStartPoint, newEndPoint);
		if (this._winnerService.shouldPlayerWin(map, newEndPoint)) {
			this._winnerService.handlePlayerWin();
		}
		return lastStep;
	}

	getPossibleEndPoints(map, lastStep) {
		if (this._tileTypeResolver.isRoad(map, lastStep.endPoint)) {
			return this._lastStepOptionService.getAllPossiblePoints(lastStep, lastStep.difference);
		}
		return this._optionService.getAllPossiblePoints(lastStep);
	}

	countNextStep(startPoint, endPoint) {
		return { 
			startPoint: startPoint,
			endPoint: endPoint,
			difference: {
				x: endPoint.x - startPoint.x, 
				y: startPoint.y - endPoint.y
			}		 
		};
	}
	
	_countEndPointByTileType(map, lastStep, chosenOption) {
		if (this._tileTypeResolver.isRoad(map, lastStep.endPoint)) 
			return this._countNextEndPoint(lastStep, chosenOption);
		else if (this._tileTypeResolver.isOffRoad(map, lastStep.endPoint))
			return this._countNewOutEndPoint(lastStep, chosenOption);
		return null;
	}
	
	_countNewOutEndPoint(lastStep, chosenOption) {
		return this._optionService.getByChosenOption(lastStep, chosenOption);
	}
	
	_countNextEndPoint(lastStep, chosenOption) {
		return this._lastStepOptionService.getByChosenOption(lastStep, lastStep.difference, chosenOption);
	}	
}