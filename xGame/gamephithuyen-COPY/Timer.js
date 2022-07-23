class Timer {
    constructor() {
        this.x = canvas.width*.2;
        this.y = 0;
        this.color = '#fff';
    }

    displayTimer() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 5, canvas.height);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    countDown() {
        this.y += 0.05;
    }

}