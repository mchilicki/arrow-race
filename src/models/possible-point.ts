import { Point } from './point';
import { TileType } from './tile-type.enum';

export interface PossiblePoint {
    point: Point,
    tileType: TileType,
}
