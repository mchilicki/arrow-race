export default class ChosenOptionService {

    _numpadKeyboardKeys: Array<number>;

    constructor () {
        this._numpadKeyboardKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    }

    getChoosenOption(keyboardInput: KeyboardEvent) {
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[2]) {
            return 1;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[1]) {
            return 2;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[4]) {
            return 3;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[7]) {
            return 4;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[8]) {
            return 5;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[9]) {
            return 6;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[6]) {
            return 7;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[3]) {
            return 8;
        }
        return null;
    }
}