import { Map } from './models/map';
import SETTINGS from './settings'
import MAP_FIRST_LEVEL from './maps/level1';
import GameManager from './game-manager';
import SteeringService from './steering-service';
import './scss/styles.scss';
import 'uikit';
import StepsHistory from './models/steps-history';

document.addEventListener('DOMContentLoaded', function() {
    const canvas: HTMLCanvasElement = document.getElementById("gridCanvas") as HTMLCanvasElement;
    const context: CanvasRenderingContext2D = canvas.getContext("2d");    
    const map: Map = MAP_FIRST_LEVEL;
    const settings = SETTINGS;
    let stepsHistory = new StepsHistory();
    const gameManager = new GameManager();
    const steeringService = new SteeringService();
    gameManager.startGame(map, context, stepsHistory, settings);
    document.getElementById("reloadButton").onclick = () => gameManager.startGame(map, context, stepsHistory, settings);
    document.addEventListener("keypress", (steeringService.onKeyboardInput)(map, context, stepsHistory, settings)); 
});