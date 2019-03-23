$(document).ready(function () {
    const canvas = document.getElementById("gridCanvas");
    const context = canvas.getContext("2d");    
    const map = mapFirstLevel;
    const settings = SETTINGS;
    var stepsHistory = [];
    startGame(map, context, stepsHistory, settings);
    document.addEventListener("keypress", (makeMove)(map, context, stepsHistory, settings));
});

function startGame(map, context, stepsHistory, settings) {
    const firstStep = countNextStep(map.arrowStartPoint, map.arrowEndPoint);
    stepsHistory.length = 0;   
    drawGrid(context, settings);
    drawRoads(context, map, settings);
    drawArrow(context, firstStep.startPoint, firstStep.endPoint);
    stepsHistory.push(firstStep);
    const currentPossibleSteps = getPossibleEndPoints(map, firstStep);
    drawPoints(context, currentPossibleSteps, settings.possibleMoveDotSize, settings.possibleMoveDotColor);
}