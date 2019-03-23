class GameManager {
    constructor () {
        this._canvasDrawer = new CanvasDrawer();
    }

    startGame(map, context, stepsHistory, settings) {
        const firstStep = countNextStep(map.arrowStartPoint, map.arrowEndPoint);
        stepsHistory.length = 0;   
        this._canvasDrawer.drawGrid(context, settings);
        this._canvasDrawer.drawRoads(context, map, settings);
        this._canvasDrawer.drawArrow(context, firstStep.startPoint, firstStep.endPoint);
        stepsHistory.push(firstStep);
        const currentPossibleSteps = getPossibleEndPoints(map, firstStep);
        this._canvasDrawer.drawPoints(context, currentPossibleSteps, settings.possibleMoveDotSize, settings.possibleMoveDotColor);
    }
    
    makeMove(map, context, stepsHistory, chosenOption, settings) {
        if (this._isChosenOptionValid(chosenOption)) {
            var nextStep = makeNextStep(map, chosenOption, stepsHistory[stepsHistory.length - 1], settings);
            if (this._isNextStepValid(nextStep, settings)) {
                stepsHistory.push(nextStep);
                this._canvasDrawer.drawArrow(context, nextStep.startPoint, nextStep.endPoint);
                const currentPossibleSteps = getPossibleEndPoints(map, nextStep);
                this._canvasDrawer.drawPoints(context, currentPossibleSteps, settings.possibleMoveDotSize, settings.possibleMoveDotColor);
            }            
        }
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