import { TileType } from './models/tile-type.enum';
import { Settings } from './models/settings';
import { Point } from './models/point';
import { Map } from './models/map';

export default class TileTypeResolver {

    private _roadTileNumber: TileType;
    private _offRoadTileNumber: TileType;
    private _finishLineTileNumber: TileType;
    private _minimumStep: number;

    constructor(settings: Settings) {
        this._roadTileNumber = settings.roadTileNumber;
        this._offRoadTileNumber = settings.offRoadTileNumber;
        this._finishLineTileNumber = settings.finishLineTileNumber;
        this._minimumStep = settings.minimumStep;
    }

    isRoad(map: Map, endPoint: Point) : boolean {
        return this.getTileType(map, endPoint) === this._roadTileNumber;
    }

    isOffRoad(map: Map, endPoint: Point) : boolean {
        return this.getTileType(map, endPoint) === this._offRoadTileNumber;
    }

    isBeyondFinishLine(map: Map, endPoint: Point) : boolean {
        return this.getTileType(map, endPoint) === this._finishLineTileNumber;
    }

    getTileType(map: Map, endPoint: Point) : TileType {
        return map.level[endPoint.y / this._minimumStep][endPoint.x / this._minimumStep];
    }
}