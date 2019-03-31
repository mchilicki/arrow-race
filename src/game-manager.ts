import { Point } from './models/point';
import { Settings } from './models/settings';
import { ChosenOption } from './models/chosen-option.enum';
import { Step } from './models/step';
import { Map } from './models/map';
import SETTINGS from './settings';
import CanvasDrawer from './canvas-drawer';
import StepMaker from './step-maker';
import MathHelper from './utilities/math-helper';
import StepsHistory from './models/steps-history';
import WinnerService from './winner-service';

export default class GameManager {

    private _canvasDrawer: CanvasDrawer;
    private _stepMaker: StepMaker;
    private _mathHelper: MathHelper;
    private _winnerService: WinnerService;

    constructor () {
        this._canvasDrawer = new CanvasDrawer();
        this._stepMaker = new StepMaker(SETTINGS);
        this._mathHelper = new MathHelper();
        this._winnerService = new WinnerService(SETTINGS);
    }

    startGame(map: Map, context: CanvasRenderingContext2D, stepsHistory: StepsHistory, settings: Settings) {
        const firstStep: Step = this._stepMaker.countNextStep(map.arrowStartPoint, map.arrowEndPoint);
        this._canvasDrawer.clearCanvas(context, settings);
        this._winnerService.hidePlayerWinInfo();
        stepsHistory.clear();  
        this._canvasDrawer.drawGrid(context, settings);
        this._canvasDrawer.drawRoads(context, map, settings);
        this._canvasDrawer.drawArrow(context, firstStep.startPoint, firstStep.endPoint);
        stepsHistory.insertNewStep(firstStep);
        this._drawPossibleOptions(map, context, firstStep, settings);
    }
    
    makeMove(map: Map, context: CanvasRenderingContext2D, stepsHistory: StepsHistory, chosenOption: ChosenOption, settings: Settings) {
        if (this._isChosenOptionValid(chosenOption)) {
            var nextStep: Step = this._stepMaker.makeNextStep(map, chosenOption, stepsHistory.getLastStep());
            if (this._isNextStepValid(nextStep, settings)) {
                stepsHistory.insertNewStep(nextStep);
                this._canvasDrawer.drawArrow(context, nextStep.startPoint, nextStep.endPoint);
                this._drawPossibleOptions(map, context, nextStep, settings);
            }            
        }
    }

    private _drawPossibleOptions(map: Map, context: CanvasRenderingContext2D, step: Step, settings: Settings) {
        const currentPossiblePoints: Array<Point> = this._stepMaker.getPossibleEndPoints(map, step);
        this._canvasDrawer.drawPoints(context, currentPossiblePoints, settings.possibleMoveDotSize, settings.possibleMoveDotColor);
    }

    private _isChosenOptionValid(chosenOption: ChosenOption) {
        return chosenOption !== null;
    }
    
    private _isNextStepValid(nextStep: Step, settings: Settings) {
        return nextStep !== null && 
            this._mathHelper.isNumberBetweenRange(nextStep.endPoint.x, 0, settings.canvasWidth) &&
            this._mathHelper.isNumberBetweenRange(nextStep.endPoint.y, 0, settings.canvasHeight);
    }
}