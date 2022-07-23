class Debris {
    constructor(x,y) {
        this.radius = 3;
        this.y = y;
        this.x = x;
        this.color = '#fff';
        this.speed = 1;
    }

    drawDebris() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x -= this.speed;
        this.drawDebris();
    }
}

