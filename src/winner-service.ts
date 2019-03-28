import TileTypeResolver from "./tile-type-resolver";

class WinnerService {

    _isPlayerWinner: boolean;
    _tileTypeResolver: TileTypeResolver;

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
        return this._tileTypeResolver.isBeyondFinishLine(map, endPoint);
    }

    handlePlayerWin() {
        this._isPlayerWinner = true;
        document.getElementById("winInfo").classList.remove('hidden');
        document.getElementById("winInfo").classList.add('visible');
    }
}

export default WinnerService;