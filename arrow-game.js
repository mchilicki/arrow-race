const arrowStartPoint = {
    x: 300,
    y: 300
}

const arrowEndPoint = {
    x: 300,
    y: 280,
}

const minimumStep = 20;
const importantDotColor = "red";

var controller;
var choosenOption;

var stepsHistory = [];

var previousChoosenOption;
var timesPreviousChoosenOptionWasChoosen = 0;

var minimumTimesPreviousChoosenOptionNeedToBeChoosen = 50;

function getChoosenOption(valueFromLuna)
{
    if (isBetweenLeftClosed(valueFromLuna, -1, -0.875))
            choosenOption = 1;
    else if (isBetweenLeftClosed(valueFromLuna, -0.875, -0.625))
        choosenOption = 2;
    else if (isBetweenLeftClosed(valueFromLuna, -0.625, -0.375))
        choosenOption = 3;
    else if(isBetweenLeftClosed(valueFromLuna, -0.375, -0.125))
        choosenOption = 4;
    else if (isBetweenLeftClosed(valueFromLuna, -0.125, 0.125))
        choosenOption = 5;
    else if (isBetweenLeftClosed(valueFromLuna, 0.125, 0.375))
        choosenOption = 6;
    else if (isBetweenLeftClosed(valueFromLuna, 0.375, 0.625))
        choosenOption = 7;
    else if (isBetweenLeftClosed(valueFromLuna, 0.625, 0.875))
        choosenOption = 8;
    else
        choosenOption = 1;
    return choosenOption;
}

function drawAllPoints(ctx){
    const lastFromToWhere = stepsHistory[stepsHistory.length - 1];
    const lastStepTemp = {
        x:lastFromToWhere.endPoint.x-lastFromToWhere.startPoint.x, 
        y:lastFromToWhere.startPoint.y-lastFromToWhere.endPoint.y
    }; 
    var currentPossibleSteps = getPossibleSteps(lastFromToWhere.endPoint, lastStepTemp);
    drawPoints(ctx, currentPossibleSteps, dotSize);
    var currentChoosenStep = step(lastFromToWhere.endPoint, choosenOption, lastStepTemp);
    drawImportantPoint(ctx, currentChoosenStep.x, currentChoosenStep.y, importantDotColor); 
}

$(document).ready(function() {    
    var c = document.getElementById("gridCanvas");
    var ctx = c.getContext("2d");
    drawGrid(ctx, 800, 600);
    drawRoads(ctx, mapa);
    drawGridArrow(ctx, arrowStartPoint.x, arrowStartPoint.y, arrowEndPoint.x, arrowEndPoint.y);
    stepsHistory.push({startPoint: arrowStartPoint, endPoint: arrowEndPoint});
    controller = new EGZOController();
    controller.onvalue = function(valueFromLuna)
    {        
        choosenOption = getChoosenOption(valueFromLuna);
        drawAllPoints(ctx);
        if (previousChoosenOption == choosenOption) {
            timesPreviousChoosenOptionWasChoosen++;
        } else {
            previousChoosenOption = choosenOption;
            timesPreviousChoosenOptionWasChoosen = 0;
        }        
        if (timesPreviousChoosenOptionWasChoosen >= minimumTimesPreviousChoosenOptionNeedToBeChoosen) {
            timesPreviousChoosenOptionWasChoosen = 0;
            var fromToWhere = makeStep(choosenOption);
            stepsHistory.push(fromToWhere);
            drawGridArrow(ctx, fromToWhere.startPoint.x, fromToWhere.startPoint.y, 
                fromToWhere.endPoint.x, fromToWhere.endPoint.y);
        }
    };
});