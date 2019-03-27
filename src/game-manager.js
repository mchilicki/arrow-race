class GameManager {
    constructor () {
        this._canvasDrawer = new CanvasDrawer();
        this._stepMaker = new StepMaker(SETTINGS);
    }

    startGame(map, context, stepsHistory, settings) {
        const firstStep = this._stepMaker.countNextStep(map.arrowStartPoint, map.arrowEndPoint);
        stepsHistory.length = 0;   
        this._canvasDrawer.drawGrid(context, settings);
        this._canvasDrawer.drawRoads(context, map, settings);
        this._canvasDrawer.drawArrow(context, firstStep.startPoint, firstStep.endPoint);
        stepsHistory.push(firstStep);
        this._drawPossibleOptions(map, context, firstStep, settings);
    }
    
    makeMove(map, context, stepsHistory, chosenOption, settings) {
        if (this._isChosenOptionValid(chosenOption)) {
            var nextStep = this._stepMaker.makeNextStep(map, chosenOption, stepsHistory[stepsHistory.length - 1], settings);
            if (this._isNextStepValid(nextStep, settings)) {
                stepsHistory.push(nextStep);
                this._canvasDrawer.drawArrow(context, nextStep.startPoint, nextStep.endPoint);
                this._drawPossibleOptions(map, context, nextStep, settings);
            }            
        }
    }

    _drawPossibleOptions(map, context, step, settings) {
        const currentPossibleSteps = this._stepMaker.getPossibleEndPoints(map, step);
        this._canvasDrawer.drawPoints(context, currentPossibleSteps, settings.possibleMoveDotSize, settings.possibleMoveDotColor);
    }

    _isChosenOptionValid(chosenOption) {
        return chosenOption !== null;
    }
    
    _isNextStepValid(nextStep, settings) {
        return nextStep !== null && 
            isNumberBetweenRange(nextStep.endPoint.x, 0, settings.canvasWidth) &&
            isNumberBetweenRange(nextStep.endPoint.y, 0, settings.canvasHeight);
    }
}