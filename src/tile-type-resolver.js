class TileTypeResolver {
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
        return this._getPointValue(map, endPoint, this._minimumStep) === this._roadTileNumber;
    }

    isOffRoad(map, endPoint) {
        return this._getPointValue(map, endPoint, this._minimumStep) === this._offRoadTileNumber;
    }

    isBeyondFinishLine(map, endPoint) {
        return this._getPointValue(map, endPoint, this._minimumStep) === this._finishLineTileNumber;
    }
}