import ChosenOptionService from './chosen-option-service';
import GameManager from './game-manager';

class SteeringService {
    constructor() {
        
    }

    onKeyboardInput(map, context, stepsHistory, settings) {
        return function innerOnKeyboardInput(keyboardInput) {
            const chosenOptionService = new ChosenOptionService();
            const gameManager = new GameManager();
            const chosenOption = chosenOptionService.getChoosenOption(keyboardInput);
            gameManager.makeMove(map, context, stepsHistory, chosenOption, settings);
        }
    }    
}

export default SteeringService;