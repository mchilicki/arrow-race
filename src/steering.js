const numpadKeyboardKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

function getChoosenOption(keyboardInput) {
    if (keyboardInput.keyCode === numpadKeyboardKeys[2]) {
        return 1;
    }
    if (keyboardInput.keyCode === numpadKeyboardKeys[1]) {
        return 2;
    }
    if (keyboardInput.keyCode === numpadKeyboardKeys[4]) {
        return 3;
    }
    if (keyboardInput.keyCode === numpadKeyboardKeys[7]) {
        return 4;
    }
    if (keyboardInput.keyCode === numpadKeyboardKeys[8]) {
        return 5;
    }
    if (keyboardInput.keyCode === numpadKeyboardKeys[9]) {
        return 6;
    }
    if (keyboardInput.keyCode === numpadKeyboardKeys[6]) {
        return 7;
    }
    if (keyboardInput.keyCode === numpadKeyboardKeys[3]) {
        return 8;
    }
    return null;
}

function isChosenOptionValid(chosenOption) {
    return chosenOption !== null;
}

function isNextStepValid(nextStep, settings) {
    return nextStep !== null && 
        isNumberBetweenRange(nextStep.endPoint.x, 0, settings.canvasWidth) &&
        isNumberBetweenRange(nextStep.endPoint.y, 0, settings.canvasHeight);
}

function makeMove(map, context, stepsHistory, settings) {
    return function innerOnKeyboardInput(keyboardInput) {
        const chosenOption = getChoosenOption(keyboardInput);
        if (isChosenOptionValid(chosenOption)) {
            var nextStep = makeNextStep(map, chosenOption, settings);
            if (isNextStepValid(nextStep, settings)) {
                stepsHistory.push(nextStep);
                drawArrow(context, nextStep.startPoint, nextStep.endPoint);
                drawPossiblePoints(map, context, stepsHistory, settings);
            }            
        }
    }
}