class WinnerService {
    constructor(settings) {
        this._isPlayerWinner = false;
        this._tileTypeResolver = new TileTypeResolver(settings);
    }
    
    get isPlayerWinner() {
        return this._isPlayerWinner;
    }

    shouldPlayerWin(map, endPoint) {
        if (this._isPlayerWinner)
            return false;
        return _tileTypeResolver.isBeyondFinishLine(map, endPoint);
    }

    handlePlayerWin() {
        this._isPlayerWinner = true;
        $("#winInfoLabel").show();
        $("#winButton").show();
    }
}