import { Point } from "./point";

export interface Map {
    level: Array<Array<number>>,
    arrowStartPoint : Point,
    arrowEndPoint: Point
}
