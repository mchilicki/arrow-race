const arrowStartPoint = {
    x: 50,
    y: 400,
}

const arrowEndPoint = {
    x: 50,
    y: 390,
}

const minimumStep = 10;

var controller;
var choosenOption;

var stepsHistory = [];
stepsHistory.push({  })

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
$(document).ready(function() {    
    var c = document.getElementById("gridCanvas");
    var ctx = c.getContext("2d");
    drawGrid(ctx, 800, 600);
    drawGridArrow(ctx, arrowStartPoint.x, arrowStartPoint.y, arrowEndPoint.x, arrowEndPoint.y);
    controller = new EGZOController();
    controller.onvalue = function(valueFromLuna)
    {        
        choosenOption = getChoosenOption(valueFromLuna);
        // const lastStepTemp = {
        //     x:fromToWhere.endPoint.x-fromToWhere.startPoint.x, 
        //     y:fromToWhere.startPoint.y-fromToWhere.endPoint.y
        // }; 
        // var currentPossibleSteps = getPossibleSteps(fromToWhere[fromToWhere.length - 1], lastStepTemp);
        // drawPoints(ctx, currentPossibleSteps);
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