function drawGrid(context, settings) {
    context.canvas.width = settings.canvasWidth;
    context.canvas.height = settings.canvasHeight;

    const gridPattern = getGridPattern(settings);

    var DOMURL = window.URL || window.webkitURL || window;

    var image = new Image();
    var svg = new Blob([gridPattern], { type: 'image/svg+xml;charset=utf-8' });
    var url = DOMURL.createObjectURL(svg);

    image.onload = function () {
        context.drawImage(image, 0, 0);
        DOMURL.revokeObjectURL(url);
    }
    image.src = url;
}

function drawArrow(context, startPoint, endPoint) {
    const headLenght = 8;
    const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
    context.beginPath();
    context.lineWidth = 2.7;
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.lineTo(endPoint.x - headLenght * Math.cos(angle - Math.PI / 6), 
                   endPoint.y - headLenght * Math.sin(angle - Math.PI / 6));
    context.moveTo(endPoint.x, endPoint.y);
    context.lineTo(endPoint.x - headLenght * Math.cos(angle + Math.PI / 6), 
                   endPoint.y - headLenght * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

function drawPossiblePoints(map, ctx, stepsHistory, settings) {
    const lastFromToWhere = stepsHistory[stepsHistory.length - 1];
    const lastStepTemp = {
        x: lastFromToWhere.endPoint.x - lastFromToWhere.startPoint.x,
        y: lastFromToWhere.startPoint.y - lastFromToWhere.endPoint.y
    };
    var currentPossibleSteps = getPossibleSteps(map, lastFromToWhere.endPoint, lastStepTemp, settings);
    drawPoints(ctx, currentPossibleSteps, settings.possibleMoveDotSize, settings.possibleMoveDotColor);
}

function drawRoads(context, map, settings) {
    var pointListToDraw = [];
    for (var row = 0; row < map.level.length; row++) {
        for (var column = 0; column < map.level[0].length; column++) {
            if (map.level[row][column] == 0) {
                pointListToDraw.push({ x: column * settings.minimumStep, y: row * settings.minimumStep });
            }
        }
    }
    drawPoints(context, pointListToDraw, settings.offroadDotSize, settings.offroadDotColor);
}

function drawPoint(context, pointCoordinates, pointSize, pointColor) {
    context.fillStyle = pointColor;
    context.fillRect(pointCoordinates.x - pointSize / 2, pointCoordinates.y - pointSize / 2, pointSize, pointSize);
}

function drawPoints(context, pointList, pointSize, pointColor) {
    context.fillStyle = pointColor;
    for (var i = 0; i < pointList.length; i++) {
        drawPoint(context, pointList[i], pointSize);
    }
}

function getGridPattern(settings) {
    return '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="' + settings.minimumStep + '" height="' + settings.minimumStep + '" patternUnits="userSpaceOnUse"> \
                <path d="M ' + settings.minimumStep + ' 0 L 0 0 0 ' + settings.minimumStep + '" fill="none" stroke="gray" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"> \
                <rect width="100" height="100" fill="url(#smallGrid)" /> \
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
    </svg>';
}