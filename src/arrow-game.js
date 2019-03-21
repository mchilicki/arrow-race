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
    stepsHistory.length = 0;   
    drawGrid(context, settings);
    drawRoads(context, map, settings);
    drawArrow(context, map.arrowStartPoint, map.arrowEndPoint);
    stepsHistory.push({ startPoint: map.arrowStartPoint, endPoint: map.arrowEndPoint });
    drawPossiblePoints(map, context, stepsHistory, settings);
}