var Q;

window.addEventListener("load",function() {

    Q = window.Q =  Quintus().include("Sprites, Scenes, Input").setup(
        { 
            width: 1000, 
            height: 1000,
            scaleToFit: true
        });

    Q.Sprite.extend("Arrow",{
        init:function(p) {
            this._super(p, {
                asset: "arrow.png",
                x: 100, 
                y: 50,
                scale: 0.1,
                angle: 0,
            }); 
        }
    });

    Q.scene("level", function(stage) {
        var width = 1;
        for (var height = 0; height < 3; height++){
            var tanOfAngle = (height + 1) / width;
            var arrow = new Q.Arrow();
            arrow.p.angle = toDegrees(Math.atan(tanOfAngle));
            stage.insert(arrow);  
            arrows.push(arrow);
        }            
    });    

    Q.load("arrow.png",function() {
        Q.stageScene("level");
        Q.gameLoop(function(dt) {
            Q.clear();   
            for (var i = 0; i < arrows.length; i++){
                arrows[i].update(dt);
                arrows[i].render(Q.ctx);
            }                     
        });
    });
});
  