window.addEventListener("load",function() {

    var Q = window.Q =  Quintus().include("Sprites, Scenes, Input").setup(
        { 
            width: 1000, 
            height: 1000,
            scaleToFit: true
        });

    Q.Sprite.extend("Arrow",{
        init:function(p) {
            this._super(p,{
                asset: "arrow.png",
                x: 50, 
                y: 50,
                scale: 0.1,
            }); 
        }
    });

    Q.load("arrow.png",function() {
        var arrow = new Q.Arrow();
        Q.gameLoop(function(dt) {
            arrow.update(dt);
            Q.clear();
            arrow.render(Q.ctx);
        });
    });
});
  