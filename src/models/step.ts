import { PointDifference } from './point-difference';
import { Point } from './point';

export interface Step {
    startPoint: Point,
    endPoint: Point,
    difference: PointDifference,
}
