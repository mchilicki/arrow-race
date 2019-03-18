const minimumStep = 20;

function drawAllPoints(map, ctx, stepsHistory) {
    const lastFromToWhere = stepsHistory[stepsHistory.length - 1];
    const lastStepTemp = {
        x: lastFromToWhere.endPoint.x - lastFromToWhere.startPoint.x,
        y: lastFromToWhere.startPoint.y - lastFromToWhere.endPoint.y
    };
    var currentPossibleSteps = getPossibleSteps(map, lastFromToWhere.endPoint, lastStepTemp);
    drawPoints(ctx, currentPossibleSteps, dotSize);
}

$(document).ready(function () {
    var canvas = document.getElementById("gridCanvas");
    var context = canvas.getContext("2d");
    var stepsHistory = [];
    var map = mapFirstLevel;
    startGame(map, context, stepsHistory);
    document.addEventListener("keypress", (onKeyboardInput)(map, context, stepsHistory));
});

function startGame(map, context, stepsHistory) {    
    stepsHistory.length = 0;   
    drawGrid(context, 800, 600);
    drawRoads(context, map);
    drawArrow(context, map.arrowStartPoint.x, map.arrowStartPoint.y, map.arrowEndPoint.x, map.arrowEndPoint.y);
    stepsHistory.push({ startPoint: map.arrowStartPoint, endPoint: map.arrowEndPoint });
    drawAllPoints(map, context, stepsHistory);
}