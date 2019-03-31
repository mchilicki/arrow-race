import { Settings } from './models/settings';
import { Point } from './models/point';
import { Map } from './models/map';

export default class TileTypeResolver {

    _roadTileNumber: number;
    _offRoadTileNumber: number;
    _finishLineTileNumber: number;
    _minimumStep: number;

    constructor(settings: Settings) {
        this._roadTileNumber = settings.roadTileNumber;
        this._offRoadTileNumber = settings.offRoadTileNumber;
        this._finishLineTileNumber = settings.finishLineTileNumber;
        this._minimumStep = settings.minimumStep;
    }

    _getPointValue(map: Map, endPoint: Point) : number {
        return map.level[endPoint.y / this._minimumStep][endPoint.x / this._minimumStep];
    }

    isRoad(map: Map, endPoint: Point) : boolean {
        return this._getPointValue(map, endPoint) === this._roadTileNumber;
    }

    isOffRoad(map: Map, endPoint: Point) : boolean {
        return this._getPointValue(map, endPoint) === this._offRoadTileNumber;
    }

    isBeyondFinishLine(map: Map, endPoint: Point) : boolean {
        return this._getPointValue(map, endPoint) === this._finishLineTileNumber;
    }
}