function drawGrid(ctx, w, h) {
    ctx.canvas.width  = w;
    ctx.canvas.height = h;
    
    var data = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse"> \
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"> \
                <rect width="100" height="100" fill="url(#smallGrid)" /> \
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
    </svg>';

    var DOMURL = window.URL || window.webkitURL || window;
    
    var img = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svg);
    
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    }
    img.src = url;
}

function drawGridArrow(context, startX, startY, endX, endY){
    var headLenght = 10;
    var angle = Math.atan2(endY - startY, endX - startX);
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.lineTo(endX - headLenght * Math.cos(angle - Math.PI/6), endY - headLenght * Math.sin(angle - Math.PI/6));
    context.moveTo(endX, endY);
    context.lineTo(endX - headLenght * Math.cos(angle + Math.PI/6), endY - headLenght * Math.sin(angle + Math.PI/6));
    context.stroke();
}