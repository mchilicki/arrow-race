const numpadKeyboardKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

function getChoosenOption(keyboardInput) {
    var choosenOption = null;
    if (keyboardInput.keyCode === numpadKeyboardKeys[2]) {
        choosenOption = 1;
    }
    else if (keyboardInput.keyCode === numpadKeyboardKeys[1]) {
        choosenOption = 2;
    }
    else if (keyboardInput.keyCode === numpadKeyboardKeys[4]) {
        choosenOption = 3;
    }
    else if (keyboardInput.keyCode === numpadKeyboardKeys[7]) {
        choosenOption = 4;
    }
    else if (keyboardInput.keyCode === numpadKeyboardKeys[8]) {
        choosenOption = 5;
    }
    else if (keyboardInput.keyCode === numpadKeyboardKeys[9]) {
        choosenOption = 6;
    }
    else if (keyboardInput.keyCode === numpadKeyboardKeys[6]) {
        choosenOption = 7;
    }
    else if (keyboardInput.keyCode === numpadKeyboardKeys[3]) {
        choosenOption = 8;
    }
    return choosenOption;
}

function onKeyboardInput(map, context, stepsHistory) {
    return function innerOnKeyboardInput(keyboardInput) {
        const choosenOption = getChoosenOption(keyboardInput);
        if (choosenOption != null) {
            var fromToWhere = makeStep(map, choosenOption);
            stepsHistory.push(fromToWhere);
            drawArrow(context, fromToWhere.startPoint.x, fromToWhere.startPoint.y,
                fromToWhere.endPoint.x, fromToWhere.endPoint.y);
            drawAllPoints(map, context, stepsHistory);
        }
    }
}