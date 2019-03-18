$(document).ready(function () {
    var canvas = document.getElementById("gridCanvas");
    var context = canvas.getContext("2d");
    var stepsHistory = [];
    var map = mapFirstLevel;
    var settings = SETTINGS;
    startGame(map, context, stepsHistory, settings);
    document.addEventListener("keypress", (onKeyboardInput)(map, context, stepsHistory, settings));
});

function startGame(map, context, stepsHistory, settings) {  
    stepsHistory.length = 0;   
    drawGrid(context, settings);
    drawRoads(context, map, settings);
    drawArrow(context, map.arrowStartPoint, map.arrowEndPoint);
    stepsHistory.push({ startPoint: map.arrowStartPoint, endPoint: map.arrowEndPoint });
    drawPossiblePoints(map, context, stepsHistory, settings);
}