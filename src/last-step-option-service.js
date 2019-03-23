class LastStepOptionService {
    constructor(minimumStep) {
        this._minimumStep = minimumStep;
    }

    getBottomPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x, 
            y: lastStep.endPoint.y - difference.y + this._minimumStep 
        };
    }

    getBottomLeftPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x - this._minimumStep, 
            y: lastStep.endPoint.y - difference.y + this._minimumStep 
        };
    }

    getLeftPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x - this._minimumStep, 
            y: lastStep.endPoint.y - difference.y
        };
    }

    getTopLeftPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x - this._minimumStep, 
            y: lastStep.endPoint.y - difference.y - this._minimumStep 
        };
    }

    getTopPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x, 
            y: lastStep.endPoint.y - difference.y - this._minimumStep 
        };
    }

    getTopRightPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x + this._minimumStep, 
            y: lastStep.endPoint.y - difference.y - this._minimumStep 
        };
    }

    getRightPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x + this._minimumStep, 
            y: lastStep.endPoint.y - difference.y 
        };
    }

    getBottomRightPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x + this._minimumStep, 
            y: lastStep.endPoint.y - difference.y + this._minimumStep 
        };
    }

    getAllPossiblePoints(lastStep, difference) {
        return [
            this.getBottomPoint(lastStep, difference),
            this.getBottomLeftPoint(lastStep, difference),
            this.getLeftPoint(lastStep, difference),
            this.getTopLeftPoint(lastStep, difference),
            this.getTopPoint(lastStep, difference),
            this.getTopRightPoint(lastStep, difference),
            this.getRightPoint(lastStep, difference),
            this.getBottomRightPoint(lastStep, difference),
        ];
    }

    getByChosenOption(lastStep, difference, chosenOption, firstStepHandler) {
        switch (chosenOption) {
			case 1:
				if (!firstStepHandler.isFirst)
					return this.getBottomPoint(lastStep, difference);
			case 2:
				return this.getBottomLeftPoint(lastStep, difference);
			case 3:
				return this.getLeftPoint(lastStep, difference);				
			case 4:
				return this.getTopLeftPoint(lastStep, difference);				
			case 5:
				return this.getTopPoint(lastStep, difference);				
			case 6:
				return this.getTopRightPoint(lastStep, difference);				
			case 7:
				return this.getRightPoint(lastStep, difference);				
			case 8:
				return this.getBottomRightPoint(lastStep, difference);				
        }
        return null;
    }
}