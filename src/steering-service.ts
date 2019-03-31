import { ChosenOption } from './models/chosen-option.enum';
import { Settings } from './models/settings';
import { Map } from './models/map';
import ChosenOptionService from './chosen-option-service';
import GameManager from './game-manager';
import StepsHistory from './models/steps-history';

export default class SteeringService {
    constructor() {
        
    }

    onKeyboardInput(map: Map, context: CanvasRenderingContext2D, stepsHistory: StepsHistory, settings: Settings) {
        return function innerOnKeyboardInput(keyboardInput: KeyboardEvent) {
            const chosenOptionService = new ChosenOptionService();
            const gameManager = new GameManager();
            const chosenOption: ChosenOption = chosenOptionService.getChoosenOption(keyboardInput);
            gameManager.makeMove(map, context, stepsHistory, chosenOption, settings);
        }
    }    
}