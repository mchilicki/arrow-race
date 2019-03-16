$(document).ready(function(){    
    var c = document.getElementById("gridCanvas");
    var ctx = c.getContext("2d");
    drawGrid(ctx, 800, 600);
    drawGridArrow(ctx, 20, 20, 35, 35);
});