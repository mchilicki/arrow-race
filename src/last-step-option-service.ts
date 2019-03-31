import { ChosenOption } from './models/chosen-option.enum';
import { Step } from './models/step';
import { PointDifference } from './models/point-difference';
import { Point } from './models/point';
import PointService from "./point-service";

export default class LastStepOptionService {

    private _minimumStep: number;

    constructor(minimumStep: number) {
        this._minimumStep = minimumStep;
    }

    getBottomPoint(lastStep: Step, difference: PointDifference) : Point {
        return { 
            x: lastStep.endPoint.x + difference.x, 
            y: lastStep.endPoint.y - difference.y + this._minimumStep 
        };
    }

    getBottomLeftPoint(lastStep: Step, difference: PointDifference) : Point {
        return { 
            x: lastStep.endPoint.x + difference.x - this._minimumStep, 
            y: lastStep.endPoint.y - difference.y + this._minimumStep 
        };
    }

    getLeftPoint(lastStep: Step, difference: PointDifference) : Point {
        return { 
            x: lastStep.endPoint.x + difference.x - this._minimumStep, 
            y: lastStep.endPoint.y - difference.y
        };
    }

    getTopLeftPoint(lastStep: Step, difference: PointDifference) : Point {
        return { 
            x: lastStep.endPoint.x + difference.x - this._minimumStep, 
            y: lastStep.endPoint.y - difference.y - this._minimumStep 
        };
    }

    getTopPoint(lastStep: Step, difference: PointDifference) : Point {
        return { 
            x: lastStep.endPoint.x + difference.x, 
            y: lastStep.endPoint.y - difference.y - this._minimumStep 
        };
    }

    getTopRightPoint(lastStep: Step, difference: PointDifference) : Point {
        return { 
            x: lastStep.endPoint.x + difference.x + this._minimumStep, 
            y: lastStep.endPoint.y - difference.y - this._minimumStep 
        };
    }

    getRightPoint(lastStep: Step, difference: PointDifference) : Point {
        return { 
            x: lastStep.endPoint.x + difference.x + this._minimumStep, 
            y: lastStep.endPoint.y - difference.y 
        };
    }

    getBottomRightPoint(lastStep: Step, difference: PointDifference) : Point {
        return { 
            x: lastStep.endPoint.x + difference.x + this._minimumStep, 
            y: lastStep.endPoint.y - difference.y + this._minimumStep 
        };
    }

    getAllPossiblePoints(lastStep: Step, difference: PointDifference) : Array<Point> {
        return [
            this.getBottomPoint(lastStep, difference),
            this.getBottomLeftPoint(lastStep, difference),
            this.getLeftPoint(lastStep, difference),
            this.getTopLeftPoint(lastStep, difference),
            this.getTopPoint(lastStep, difference),
            this.getTopRightPoint(lastStep, difference),
            this.getRightPoint(lastStep, difference),
            this.getBottomRightPoint(lastStep, difference),
        ];
    }

    getByChosenOption(lastStep: Step, difference: PointDifference, chosenOption: ChosenOption) : Point {
        var returnedEndPoint: Point;
        const pointService = new PointService();
        switch (chosenOption) {
			case ChosenOption.Bottom:
                returnedEndPoint = this.getBottomPoint(lastStep, difference);
                break;
			case ChosenOption.BottomLeft:
                returnedEndPoint = this.getBottomLeftPoint(lastStep, difference);
                break;
			case ChosenOption.Left:
                returnedEndPoint = this.getLeftPoint(lastStep, difference);	
                break;			
			case ChosenOption.TopLeft:
                returnedEndPoint = this.getTopLeftPoint(lastStep, difference);
                break;				
			case ChosenOption.Top:
                returnedEndPoint = this.getTopPoint(lastStep, difference);	
                break;			
			case ChosenOption.TopRight:
                returnedEndPoint = this.getTopRightPoint(lastStep, difference);
                break;				
			case ChosenOption.Right:
                returnedEndPoint = this.getRightPoint(lastStep, difference);	
                break;			
			case ChosenOption.BottomRight:
                returnedEndPoint = this.getBottomRightPoint(lastStep, difference);	
                break;			
        }
        if (pointService.arePointsEqual(lastStep.endPoint, returnedEndPoint))
            return null;
        return returnedEndPoint;
    }
}