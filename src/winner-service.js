class WinnerService {
    constructor() {
        this._isPlayerWinner = false;
    }
    
    get isPlayerWinner() {
        return this._isPlayerWinner;
    }

    shouldPlayerWin(map, endPoint, minimumStep) {
        if (this._isPlayerWinner)
            return false;
        return map.level[endPoint.y / minimumStep][endPoint.x / minimumStep] == 2;
    }

    handlePlayerWin() {
        this._isPlayerWinner = true;
        $("#winInfoLabel").show();
        $("#winButton").show();
    }
}