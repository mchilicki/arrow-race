class OptionService {
    constructor(minimumStep) {
        this._minimumStep = minimumStep;
        this._zeroLastStep = { x: 0, y: 0 };
        this._lastStepOptionService = new LastStepOptionService(minimumStep);
    }

    getBottomPoint(endPoint) {
        return this._lastStepOptionService.getBottomPoint(endPoint, this._zeroLastStep);
    }

    getBottomLeftPoint(endPoint) {
        return this._lastStepOptionService.getBottomLeftPoint(endPoint, this._zeroLastStep);
    }

    getLeftPoint(endPoint) {
        return this._lastStepOptionService.getLeftPoint(endPoint, this._zeroLastStep);
    }

    getTopLeftPoint(endPoint) {
        return this._lastStepOptionService.getTopLeftPoint(endPoint, this._zeroLastStep);
    }

    getTopPoint(endPoint) {
        return this._lastStepOptionService.getTopPoint(endPoint, this._zeroLastStep);
    }

    getTopRightPoint(endPoint) {
        return this._lastStepOptionService.getTopRightPoint(endPoint, this._zeroLastStep);
    }

    getRightPoint(endPoint) {
        return this._lastStepOptionService.getRightPoint(endPoint, this._zeroLastStep);
    }

    getBottomRightPoint(endPoint) {
        return this._lastStepOptionService.getBottomRightPoint(endPoint, this._zeroLastStep);
    }

    getAllPossiblePoints(endPoint) {
        return this._lastStepOptionService.getAllPossiblePoints(endPoint, this._zeroLastStep);
    }

    getByChosenOption(endPoint, chosenOption, firstStepHandler) {
        switch (chosenOption) {
            case 1:
                if (!firstStepHandler.isFirst) 
                    return this.getBottomPoint(endPoint);
                break;
            case 2:
                return this.getBottomLeftPoint(endPoint);			 
            case 3:
                return this.getLeftPoint(endPoint);			 
            case 4:
                return this.getTopLeftPoint(endPoint);			 
            case 5:
                return this.getTopPoint(endPoint);			 
            case 6:
                return this.getTopRightPoint(endPoint);			 
            case 7:
                return this.getRightPoint(endPoint);			 
            case 8:
                return this.getBottomRightPoint(endPoint);			 
        }
        return null;
    }
}