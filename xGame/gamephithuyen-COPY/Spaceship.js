class SpaceShip {
    constructor(canvas, y, width, height, src) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.image = new Image();
        this.x = canvas.width * .5;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image.src = src;
        this.score = 0;
    }

    drawImage() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    moveUp() {
        this.y -= 5;
    }

    moveDown() {
        this.y += 5;
    }

    moveRight() {
        this.x += 5;
    }

    moveLeft() {
        this.x -= 5;
    }

    hasPlayerScoredAPoint() {
        if (this.y + this.height <= 0) {
            audioScore.play();
            ship.x = canvas.width * .5;
            ship.y = 350;
            this.score++;
        }
    }

}

function moveShip() {
    if (ship.y > 350) {
        ship.x = canvas.width * .5;
        ship.y = 350;
    } else {
        switch (event.keyCode) {
            case 38:
                ship.moveUp();
                break;
            case 40:
                ship.moveDown();
                break;
            case 37:
                ship.moveLeft();
                break;
            case 39:
                ship.moveRight();
                break;
                clearCanvas();
                ship.drawImage();
        }
    }
}

addEventListener('keydown', moveShip);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}