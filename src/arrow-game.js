$(document).ready(function () {
    const canvas = document.getElementById("gridCanvas");
    const context = canvas.getContext("2d");    
    const map = mapFirstLevel;
    const settings = SETTINGS;
    var stepsHistory = [];
    const gameManager = new GameManager();
    gameManager.startGame(map, context, stepsHistory, settings);
    document.addEventListener("keypress", (onKeyboardInput)(map, context, stepsHistory, settings));
});

