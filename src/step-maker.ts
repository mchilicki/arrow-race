import { PossiblePoint } from './models/possible-point';
import { ChosenOption } from './models/chosen-option.enum';
import { Settings } from './models/settings';
import { Point } from './models/point';
import { Step } from './models/step';
import { Map } from "./models/map";
import LastStepOptionService from "./last-step-option-service";
import OptionService from "./option-service";
import WinnerService from "./winner-service";
import TileTypeResolver from "./tile-type-resolver";

export default class StepMaker {

	private _winnerService: WinnerService;
	private _lastStepOptionService: LastStepOptionService;
	private _optionService: OptionService;
	private _tileTypeResolver: TileTypeResolver;

	constructor(settings: Settings) {
		this._winnerService = new WinnerService(settings);
		this._lastStepOptionService = new LastStepOptionService(settings.minimumStep);
		this._optionService = new OptionService(settings.minimumStep);
		this._tileTypeResolver = new TileTypeResolver(settings);
	}

	makeNextStep(map: Map, chosenOption: ChosenOption, lastStep: Step) : Step {
		var newEndPoint = this._countEndPointByTileType(map, lastStep, chosenOption);
		if (newEndPoint === null) {
			return null;
		}
		var newStartPoint = lastStep.endPoint;
		lastStep = this.countNextStep(newStartPoint, newEndPoint);
		if (this._winnerService.shouldPlayerWin(map, newEndPoint)) {
			this._winnerService.handlePlayerWin();
		}
		return lastStep;
	}

	getPossibleEndPoints(map: Map, lastStep: Step) : Array<PossiblePoint> {
		if (this._tileTypeResolver.isRoad(map, lastStep.endPoint)) {
			return this._lastStepOptionService.getAllPossiblePoints(map, lastStep, lastStep.difference);
		}
		return this._optionService.getAllPossiblePoints(map, lastStep);
	}

	countNextStep(startPoint: Point, endPoint: Point) : Step {
		return { 
			startPoint: startPoint,
			endPoint: endPoint,
			difference: {
				x: endPoint.x - startPoint.x, 
				y: startPoint.y - endPoint.y
			}		 
		};
	}
	
	private _countEndPointByTileType(map: Map, lastStep: Step, chosenOption: ChosenOption) : Point {
		if (this._tileTypeResolver.isRoad(map, lastStep.endPoint)) 
			return this._countNextEndPoint(lastStep, chosenOption);
		else if (this._tileTypeResolver.isOffRoad(map, lastStep.endPoint))
			return this._countNewOutEndPoint(lastStep, chosenOption);
		return null;
	}
	
	private _countNewOutEndPoint(lastStep: Step, chosenOption: ChosenOption) : Point {
		return this._optionService.getByChosenOption(lastStep, chosenOption);
	}
	
	private _countNextEndPoint(lastStep: Step, chosenOption: ChosenOption) : Point {
		return this._lastStepOptionService.getByChosenOption(lastStep, lastStep.difference, chosenOption);
	}	
}