import { TileType } from './models/tile-type.enum';
import { Map } from './models/map';
import { PossiblePoint } from './models/possible-point';
import { ChosenOption } from './models/chosen-option.enum';
import { Step } from './models/step';
import { PointDifference } from './models/point-difference';
import { Point } from './models/point';
import PointService from "./point-service";
import TileTypeResolver from './tile-type-resolver';
import SETTINGS from './settings';

export default class LastStepOptionService {

    private _minimumStep: number;
    private _tileTypeResolver: TileTypeResolver;

    constructor(minimumStep: number) {
        this._minimumStep = minimumStep;
        this._tileTypeResolver = new TileTypeResolver(SETTINGS);
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

    getAllPossiblePoints(map: Map, lastStep: Step, difference: PointDifference) : Array<PossiblePoint> {
        const possiblePoints: Array<PossiblePoint> = [
            { point: this.getBottomPoint(lastStep, difference), tileType: null },
            { point: this.getBottomLeftPoint(lastStep, difference), tileType: null },
            { point: this.getLeftPoint(lastStep, difference), tileType: null },
            { point: this.getTopLeftPoint(lastStep, difference), tileType: null },
            { point: this.getTopPoint(lastStep, difference), tileType: null },
            { point: this.getTopRightPoint(lastStep, difference), tileType: null },
            { point: this.getRightPoint(lastStep, difference), tileType: null },
            { point: this.getBottomRightPoint(lastStep, difference), tileType: null },
        ];
        possiblePoints.forEach(possiblePoint => {
            possiblePoint.tileType = this._tileTypeResolver.getTileType(map, possiblePoint.point);
        });
        return possiblePoints;
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