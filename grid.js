const dotSize = 4.3;
const offroadDotSize = 2;

function drawGrid(context, width, height) {
    context.canvas.width = width;
    context.canvas.height = height;

    var grid = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse"> \
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"> \
                <rect width="100" height="100" fill="url(#smallGrid)" /> \
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
    </svg>';

    var DOMURL = window.URL || window.webkitURL || window;

    var image = new Image();
    var svg = new Blob([grid], { type: 'image/svg+xml;charset=utf-8' });
    var url = DOMURL.createObjectURL(svg);

    image.onload = function () {
        context.drawImage(image, 0, 0);
        DOMURL.revokeObjectURL(url);
    }
    image.src = url;
}

function drawArrow(context, startX, startY, endX, endY) {
    var headLenght = 8;
    var angle = Math.atan2(endY - startY, endX - startX);
    context.beginPath();
    context.lineWidth = 2.7;
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.lineTo(endX - headLenght * Math.cos(angle - Math.PI / 6), endY - headLenght * Math.sin(angle - Math.PI / 6));
    context.moveTo(endX, endY);
    context.lineTo(endX - headLenght * Math.cos(angle + Math.PI / 6), endY - headLenght * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

function drawPoint(context, x, y, size) {
    context.fillStyle = "black";
    context.fillRect(x - size / 2, y - size / 2, size, size);
}

function drawPoints(context, pointList, size) {
    context.fillStyle = "black";
    for (var i = 0; i < pointList.length; i++) {
        drawPoint(context, pointList[i].x, pointList[i].y, size);
    }
}

function drawRoads(context, allMapPoints) {
    var pointListToDraw = [];
    for (var row = 0; row < allMapPoints.length; row++) {
        for (var column = 0; column < allMapPoints[0].length; column++) {
            if (allMapPoints[row][column] == 0) {
                pointListToDraw.push({ x: column * minimumStep, y: row * minimumStep });
            }
        }
    }
    context.fillStyle = "grey";
    drawPoints(context, pointListToDraw, offroadDotSize);
}