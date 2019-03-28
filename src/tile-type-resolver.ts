class TileTypeResolver {

    _roadTileNumber: number;
    _offRoadTileNumber: number;
    _finishLineTileNumber: number;
    _minimumStep: number;

    constructor(settings) {
        this._roadTileNumber = settings.roadTileNumber;
        this._offRoadTileNumber = settings.offRoadTileNumber;
        this._finishLineTileNumber = settings.finishLineTileNumber;
        this._minimumStep = settings.minimumStep;
    }

    _getPointValue(map, endPoint) {
        return map.level[endPoint.y / this._minimumStep][endPoint.x / this._minimumStep];
    }

    isRoad(map, endPoint) {
        return this._getPointValue(map, endPoint) === this._roadTileNumber;
    }

    isOffRoad(map, endPoint) {
        return this._getPointValue(map, endPoint) === this._offRoadTileNumber;
    }

    isBeyondFinishLine(map, endPoint) {
        return this._getPointValue(map, endPoint) === this._finishLineTileNumber;
    }
}

export default TileTypeResolver;