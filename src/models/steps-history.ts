import { Step } from './step';

export default class StepsHistory {
    
    private _history = new Array<Step>();

    constructor () {

    }

    getHistory() {
        return this._history;
    }

    insertNewStep(newStep: Step) {
        this._history.push(newStep);
    }

    getLastStep() : Step {
        return this._history[this._history.length - 1];
    }

    clear() {
        this._history.length = 0;
    }
}
