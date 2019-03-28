import PointService from "./point-service";

class LastStepOptionService {

    _minimumStep: number;

    constructor(minimumStep) {
        this._minimumStep = minimumStep;
    }

    getBottomPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x, 
            y: lastStep.endPoint.y - difference.y + this._minimumStep 
        };
    }

    getBottomLeftPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x - this._minimumStep, 
            y: lastStep.endPoint.y - difference.y + this._minimumStep 
        };
    }

    getLeftPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x - this._minimumStep, 
            y: lastStep.endPoint.y - difference.y
        };
    }

    getTopLeftPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x - this._minimumStep, 
            y: lastStep.endPoint.y - difference.y - this._minimumStep 
        };
    }

    getTopPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x, 
            y: lastStep.endPoint.y - difference.y - this._minimumStep 
        };
    }

    getTopRightPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x + this._minimumStep, 
            y: lastStep.endPoint.y - difference.y - this._minimumStep 
        };
    }

    getRightPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x + this._minimumStep, 
            y: lastStep.endPoint.y - difference.y 
        };
    }

    getBottomRightPoint(lastStep, difference) {
        return { 
            x: lastStep.endPoint.x + difference.x + this._minimumStep, 
            y: lastStep.endPoint.y - difference.y + this._minimumStep 
        };
    }

    getAllPossiblePoints(lastStep, difference) {
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

    getByChosenOption(lastStep, difference, chosenOption) {
        var returnedEndPoint;
        const pointService = new PointService();
        switch (chosenOption) {
			case 1:
                returnedEndPoint = this.getBottomPoint(lastStep, difference);
                break;
			case 2:
                returnedEndPoint = this.getBottomLeftPoint(lastStep, difference);
                break;
			case 3:
                returnedEndPoint = this.getLeftPoint(lastStep, difference);	
                break;			
			case 4:
                returnedEndPoint = this.getTopLeftPoint(lastStep, difference);
                break;				
			case 5:
                returnedEndPoint = this.getTopPoint(lastStep, difference);	
                break;			
			case 6:
                returnedEndPoint = this.getTopRightPoint(lastStep, difference);
                break;				
			case 7:
                returnedEndPoint = this.getRightPoint(lastStep, difference);	
                break;			
			case 8:
                returnedEndPoint = this.getBottomRightPoint(lastStep, difference);	
                break;			
        }
        if (pointService.arePointsEqual(lastStep.endPoint, returnedEndPoint))
            return null;
        return returnedEndPoint;
    }
}

export default LastStepOptionService;