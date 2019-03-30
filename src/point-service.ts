import { Point } from "./models/point";

export default class PointService {
    constructor() {

    }

    arePointsEqual(firstPoint: Point, secondPoint: Point) : boolean {
        return firstPoint.x === secondPoint.x && firstPoint.y === secondPoint.y;
    }
}