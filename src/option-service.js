class OptionService {
    constructor(minimumStep) {
        this._minimumStep = minimumStep;
        this._zeroDifference = { x: 0, y: 0 };
        this._lastStepOptionService = new LastStepOptionService(minimumStep);
    }

    getBottomPoint(lastStep) {
        return this._lastStepOptionService.getBottomPoint(lastStep, this._zeroDifference);
    }

    getBottomLeftPoint(lastStep) {
        return this._lastStepOptionService.getBottomLeftPoint(lastStep, this._zeroDifference);
    }

    getLeftPoint(lastStep) {
        return this._lastStepOptionService.getLeftPoint(lastStep, this._zeroDifference);
    }

    getTopLeftPoint(lastStep) {
        return this._lastStepOptionService.getTopLeftPoint(lastStep, this._zeroDifference);
    }

    getTopPoint(lastStep) {
        return this._lastStepOptionService.getTopPoint(lastStep, this._zeroDifference);
    }

    getTopRightPoint(lastStep) {
        return this._lastStepOptionService.getTopRightPoint(lastStep, this._zeroDifference);
    }

    getRightPoint(lastStep) {
        return this._lastStepOptionService.getRightPoint(lastStep, this._zeroDifference);
    }

    getBottomRightPoint(lastStep) {
        return this._lastStepOptionService.getBottomRightPoint(lastStep, this._zeroDifference);
    }

    getAllPossiblePoints(lastStep) {
        return this._lastStepOptionService.getAllPossiblePoints(lastStep, this._zeroDifference);
    }

    getByChosenOption(lastStep, chosenOption, firstStepHandler) {
        return this._lastStepOptionService.getByChosenOption(lastStep, this._zeroDifference, chosenOption, firstStepHandler);
    }
}