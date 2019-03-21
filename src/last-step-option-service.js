class LastStepOptionService {
    constructor(minimumStep) {
        this._minimumStep = minimumStep;
    }

    getBottomPoint(endPoint, lastStep) {
        return { x: endPoint.x + lastStep.x, y: endPoint.y - lastStep.y + this._minimumStep };
    }

    getBottomLeftPoint(endPoint, lastStep) {
        return { x: endPoint.x + lastStep.x - this._minimumStep, y: endPoint.y - lastStep.y + this._minimumStep };
    }

    getLeftPoint(endPoint, lastStep) {
        return { x: endPoint.x + lastStep.x - this._minimumStep, y: endPoint.y - lastStep.y };
    }

    getTopLeftPoint(endPoint, lastStep) {
        return { x: endPoint.x + lastStep.x - this._minimumStep, y: endPoint.y - lastStep.y - this._minimumStep }
    }

    getTopPoint(endPoint, lastStep) {
        return { x: endPoint.x + lastStep.x, y: endPoint.y - lastStep.y - this._minimumStep }
    }

    getTopRightPoint(endPoint, lastStep) {
        return { x: endPoint.x + lastStep.x + this._minimumStep, y: endPoint.y - lastStep.y - this._minimumStep }
    }

    getRightPoint(endPoint, lastStep) {
        return { x: endPoint.x + lastStep.x + this._minimumStep, y: endPoint.y - lastStep.y }
    }

    getBottomRightPoint(endPoint, lastStep) {
        return { x: endPoint.x + lastStep.x + this._minimumStep, y: endPoint.y - lastStep.y + this._minimumStep }
    }

    getAllPossiblePoints(endPoint, lastStep) {
        return [
            this.getBottomPoint(endPoint, lastStep),
            this.getBottomLeftPoint(endPoint, lastStep),
            this.getLeftPoint(endPoint, lastStep),
            this.getTopLeftPoint(endPoint, lastStep),
            this.getTopPoint(endPoint, lastStep),
            this.getTopRightPoint(endPoint, lastStep),
            this.getRightPoint(endPoint, lastStep),
            this.getBottomRightPoint(endPoint, lastStep),
        ];
    }

    getByChosenOption(endPoint, lastStep, chosenOption, firstStepHandler) {
        switch (chosenOption) {
			case 1:
				if (!firstStepHandler.isFirst)
					return this.getBottomPoint(endPoint, lastStep);
			case 2:
				return this.getBottomLeftPoint(endPoint, lastStep);
			case 3:
				return this.getLeftPoint(endPoint, lastStep);				
			case 4:
				return this.getTopLeftPoint(endPoint, lastStep);				
			case 5:
				return this.getTopPoint(endPoint, lastStep);				
			case 6:
				return this.getTopRightPoint(endPoint, lastStep);				
			case 7:
				return this.getRightPoint(endPoint, lastStep);				
			case 8:
				return this.getBottomRightPoint(endPoint, lastStep);				
        }
        return null;
    }
}