import { PointDifference } from './models/point-difference';
import { Point } from './models/point';
import { Step } from './models/step';
import LastStepOptionService from './last-step-option-service';

export default class OptionService {

    _zeroDifference: PointDifference; 
    _lastStepOptionService: LastStepOptionService;

    constructor(minimumStep: number) {
        this._zeroDifference = { x: 0, y: 0 };
        this._lastStepOptionService = new LastStepOptionService(minimumStep);
    }

    getBottomPoint(lastStep: Step) : Point {
        return this._lastStepOptionService.getBottomPoint(lastStep, this._zeroDifference);
    }

    getBottomLeftPoint(lastStep: Step) : Point {
        return this._lastStepOptionService.getBottomLeftPoint(lastStep, this._zeroDifference);
    }

    getLeftPoint(lastStep: Step) : Point {
        return this._lastStepOptionService.getLeftPoint(lastStep, this._zeroDifference);
    }

    getTopLeftPoint(lastStep: Step) : Point {
        return this._lastStepOptionService.getTopLeftPoint(lastStep, this._zeroDifference);
    }

    getTopPoint(lastStep: Step) : Point {
        return this._lastStepOptionService.getTopPoint(lastStep, this._zeroDifference);
    }

    getTopRightPoint(lastStep: Step) : Point {
        return this._lastStepOptionService.getTopRightPoint(lastStep, this._zeroDifference);
    }

    getRightPoint(lastStep: Step) : Point {
        return this._lastStepOptionService.getRightPoint(lastStep, this._zeroDifference);
    }

    getBottomRightPoint(lastStep: Step) : Point {
        return this._lastStepOptionService.getBottomRightPoint(lastStep, this._zeroDifference);
    }

    getAllPossiblePoints(lastStep: Step) : Array<Point> {
        return this._lastStepOptionService.getAllPossiblePoints(lastStep, this._zeroDifference);
    }

    getByChosenOption(lastStep: Step, chosenOption) : Point {
        return this._lastStepOptionService.getByChosenOption(lastStep, this._zeroDifference, chosenOption);
    }
}