class PointService {
    constructor() {

    }

    arePointsEqual(firstPoint, secondPoint) {
        return firstPoint.x === secondPoint.x && firstPoint.y === secondPoint.y;
    }
}