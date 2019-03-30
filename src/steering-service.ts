import { Map } from './models/map';
import ChosenOptionService from './chosen-option-service';
import GameManager from './game-manager';

export default class SteeringService {
    constructor() {
        
    }

    onKeyboardInput(map: Map, context: CanvasRenderingContext2D, stepsHistory, settings) {
        return function innerOnKeyboardInput(keyboardInput) {
            const chosenOptionService = new ChosenOptionService();
            const gameManager = new GameManager();
            const chosenOption = chosenOptionService.getChoosenOption(keyboardInput);
            gameManager.makeMove(map, context, stepsHistory, chosenOption, settings);
        }
    }    
}