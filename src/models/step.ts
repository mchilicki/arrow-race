import { Point } from './point';

export interface Step {
    startPoint: Point,
    endPoint: Point,
    difference: {
        x: number,
        y: number,
    }
}
