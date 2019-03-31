import { ChosenOption } from './models/chosen-option.enum';

export default class ChosenOptionService {

    private _numpadKeyboardKeys: Array<number>;

    constructor () {
        this._numpadKeyboardKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    }

    getChoosenOption(keyboardInput: KeyboardEvent) : ChosenOption {
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[2]) {
            return ChosenOption.Bottom;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[1]) {
            return ChosenOption.BottomLeft;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[4]) {
            return ChosenOption.Left;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[7]) {
            return ChosenOption.TopLeft;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[8]) {
            return ChosenOption.Top;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[9]) {
            return ChosenOption.TopRight;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[6]) {
            return ChosenOption.Right;
        }
        if (keyboardInput.keyCode === this._numpadKeyboardKeys[3]) {
            return ChosenOption.BottomRight;
        }
        return null;
    }
}