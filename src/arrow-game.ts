import SETTINGS from './settings'
import GameManager from './game-manager';
import SteeringService from './steering-service';
import MAP_FIRST_LEVEL from './maps/level1';

$(document).ready(function () {
    const canvas: HTMLCanvasElement = document.getElementById("gridCanvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");    
    const map = MAP_FIRST_LEVEL;
    const settings = SETTINGS;
    var stepsHistory = [];
    const gameManager = new GameManager();
    const steeringService = new SteeringService();
    gameManager.startGame(map, context, stepsHistory, settings);
    document.addEventListener("keypress", (steeringService.onKeyboardInput)(map, context, stepsHistory, settings));
});

