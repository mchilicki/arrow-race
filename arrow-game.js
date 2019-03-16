var arrowStartPoint = {
    x: 50,
    y: 400,
}

var arrowEndPoint = {
    x: 50,
    y: 390,
}

var controller;
var choosenOption;

$(document).ready(function() {    
    var c = document.getElementById("gridCanvas");
    var ctx = c.getContext("2d");
    drawGrid(ctx, 800, 600);
    drawGridArrow(ctx, arrowStartPoint.x, arrowStartPoint.y, arrowEndPoint.x, arrowEndPoint.y);
    controller = new EGZOController();
    controller.onvalue = function(value)
    {        
        if (isBetweenLeftClosed(value, -1, -0.875))
            choosenOption = 1;
        else if (isBetweenLeftClosed(value, -0.875, -0.625))
            choosenOption = 2;
        else if (isBetweenLeftClosed(value, -0.625, -0.375))
            choosenOption = 3;
        else if(isBetweenLeftClosed(value, -0.375, -0.125))
            choosenOption = 4;
        else if (isBetweenLeftClosed(value, -0.125, 0.125))
            choosenOption = 5;
        else if (isBetweenLeftClosed(value, 0.125, 0.375))
            choosenOption = 6;
        else if (isBetweenLeftClosed(value, 0.375, 0.625))
            choosenOption = 7;
        else if (isBetweenLeftClosed(value, 0.625, 0.875))
            choosenOption = 8;
        else
            choosenOption = 1;
    };
});