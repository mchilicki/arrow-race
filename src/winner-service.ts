import { Settings } from './models/settings';
import { Point } from './models/point';
import { Map } from './models/map';
import TileTypeResolver from "./tile-type-resolver";

export default class WinnerService {

    private _isPlayerWinner: boolean;
    private _tileTypeResolver: TileTypeResolver;

    constructor(settings: Settings) {
        this._isPlayerWinner = false;
        this._tileTypeResolver = new TileTypeResolver(settings);
    }
    
    get isPlayerWinner() : boolean {
        return this._isPlayerWinner;
    }

    shouldPlayerWin(map: Map, endPoint: Point) : boolean {
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