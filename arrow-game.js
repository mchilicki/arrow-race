const arrowStartPoint = {
    x: 100,
    y: 600
}

const arrowEndPoint = {
    x: 100,
    y: 580,
}

const numpadKeyboardKeys = [ 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

const minimumStep = 20;
const importantDotColor = "red";

function getChoosenOption(keyboardInput)
{
    var choosenOption = null;
    if (keyboardInput.keyCode === numpadKeyboardKeys[2]) {
        choosenOption = 1;
    }
    else if (keyboardInput.keyCode === numpadKeyboardKeys[1]) {
        choosenOption = 2;
    }
    else if (keyboardInput.keyCode == numpadKeyboardKeys[4]) {
        choosenOption = 3;
    }
    else if (keyboardInput.keyCode == numpadKeyboardKeys[7]) {
        choosenOption = 4;
    }
    else if (keyboardInput.keyCode == numpadKeyboardKeys[8]) {
        choosenOption = 5;
    }
    else if (keyboardInput.keyCode == numpadKeyboardKeys[9]) {
        choosenOption = 6;
    }
    else if (keyboardInput.keyCode == numpadKeyboardKeys[6]) {
        choosenOption = 7;
    }
    else if (keyboardInput.keyCode == numpadKeyboardKeys[3]) {
        choosenOption = 8;
    }
    return choosenOption;
}

function drawAllPoints(map, ctx, stepsHistory){
    const lastFromToWhere = stepsHistory[stepsHistory.length - 1];
    const lastStepTemp = {
        x:lastFromToWhere.endPoint.x-lastFromToWhere.startPoint.x, 
        y:lastFromToWhere.startPoint.y-lastFromToWhere.endPoint.y
    }; 
    var currentPossibleSteps = getPossibleSteps(map, lastFromToWhere.endPoint, lastStepTemp);
    drawPoints(ctx, currentPossibleSteps, dotSize);
}

function onKeyboardInput (map, context, stepsHistory) {
    return function innerOnKeyboardInput (keyboardInput) {
        const choosenOption = getChoosenOption(keyboardInput);
        if (choosenOption != null){            
            var fromToWhere = makeStep(map, choosenOption);
            stepsHistory.push(fromToWhere);
            drawGridArrow(context, fromToWhere.startPoint.x, fromToWhere.startPoint.y, 
                fromToWhere.endPoint.x, fromToWhere.endPoint.y);
            drawAllPoints(map, context, stepsHistory);
        }        
    }
}

$(document).ready(function() {    
    var c = document.getElementById("gridCanvas");
    var ctx = c.getContext("2d");
    var stepsHistory = [];
    var map = mapFirstLevel;
    drawGrid(ctx, 800, 600);
    drawRoads(ctx, mapFirstLevel);
    drawGridArrow(ctx, arrowStartPoint.x, arrowStartPoint.y, arrowEndPoint.x, arrowEndPoint.y);
    stepsHistory.push({startPoint: arrowStartPoint, endPoint: arrowEndPoint});
    drawAllPoints(map, ctx, stepsHistory);    
    document.addEventListener("keypress", (onKeyboardInput)(map, ctx, stepsHistory));
});