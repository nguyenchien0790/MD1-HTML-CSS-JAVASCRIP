class Score {
    constructor() {
    this.x = canvas.width * .8;
    this.y = canvas.height - 20;
    }

    displayScore(score){
        ctx.font ='50px Arial';
        ctx.fillText(score,this.x,this.y);
    }
}