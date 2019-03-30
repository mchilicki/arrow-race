import { Settings } from './models/settings';
import { Map } from './models/map';
import { Point } from './models/point';

export default class CanvasDrawer {
    constructor () {

    }

    drawGrid(context: CanvasRenderingContext2D, settings: Settings) {
        context.canvas.width = settings.canvasWidth;
        context.canvas.height = settings.canvasHeight;
    
        const gridPattern = this._getGridPattern(settings);
    
        var DOMURL = window.URL || (window as any).webkitURL || window;
    
        var image = new Image();
        var svg = new Blob([gridPattern], { type: 'image/svg+xml;charset=utf-8' });
        var url = DOMURL.createObjectURL(svg);
    
        image.onload = function () {
            context.drawImage(image, 0, 0);
            DOMURL.revokeObjectURL(url);
        }
        image.src = url;
    }
    
    drawArrow(context: CanvasRenderingContext2D, startPoint: Point, endPoint: Point) {
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
    
    drawRoads(context: CanvasRenderingContext2D, map: Map, settings: Settings) {
        var pointListToDraw = [];
        for (var row = 0; row < map.level.length; row++) {
            for (var column = 0; column < map.level[0].length; column++) {
                if (map.level[row][column] == 0) {
                    pointListToDraw.push({ x: column * settings.minimumStep, y: row * settings.minimumStep });
                }
            }
        }
        this.drawPoints(context, pointListToDraw, settings.offroadDotSize, settings.offroadDotColor);
    }

    drawPoints(context: CanvasRenderingContext2D, pointList: Array<Point>, pointSize: number, pointColor: string) {
        context.fillStyle = pointColor;
        for (var i = 0; i < pointList.length; i++) {         
            this._drawPoint(context, pointList[i], pointSize, pointColor);
        }
    }
    
    _drawPoint(context: CanvasRenderingContext2D, pointCoordinates: Point, pointSize: number, pointColor: string) {
        context.fillStyle = pointColor;
        context.fillRect(pointCoordinates.x - pointSize / 2, pointCoordinates.y - pointSize / 2, pointSize, pointSize);
    }
    
    _getGridPattern(settings: Settings) {
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
}