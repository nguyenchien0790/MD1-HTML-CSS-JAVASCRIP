class Car {
    constructor(image, x, y) {
        this.image = image
        this.x = x
        this.y = y
    }

    init() {
        c.drawImage(this.image, this.x, this.y);
        this.y += 8;
        if (this.y > canvas.height) enemyArray.shift();
    }
}


class Player extends Car {
    constructor(image, x, y) {
        super(image, x, y);
        this.speed = 1;
        this.moveable = {
            right: true,
            left: true,
            up: true,
            down: true,
        }
        this.width = 83;
        this.height = 219;
        this.index = 0;
        this.timeOut = 0;
        this.score = 0;
    }

    init() {
        c.drawImage(this.image[this.index], this.x, this.y);
        this.timeOut++;
        if (this.timeOut % 10 == 0) {
            this.index++;
            this.timeOut = 0;
        }
        if (this.index > 1) this.index = 0;
        this.move();
    }

    move() {
        if (keys.control) this.speed = 2;
        else this.speed = 1;

        if (this.x + this.width >= canvas.width + 10) this.moveable.right = false
        else this.moveable.right = true
        if (this.x <= -10) this.moveable.left = false
        else this.moveable.left = true
        if (this.y + this.height >= canvas.height + 10) this.moveable.down = false
        else this.moveable.down = true
        if (this.y <= -10) this.moveable.up = false
        else this.moveable.up = true

        if (keys.up) this.moveUp();
        if (keys.down) this.moveDown();
        if (keys.left) this.moveLeft();
        if (keys.right) this.moveRight();
    }

    moveRight() {
        if (this.moveable.right)
            this.x += 3 * this.speed;
    }

    moveLeft() {
        if (this.moveable.left)
            this.x -= 3 * this.speed;
    }

    moveUp() {
        if (this.moveable.up)
            this.y -= 3 * this.speed;
    }

    moveDown() {
        if (this.moveable.down)
            this.y += 3 * this.speed;
    }

    checkCollision(item) {
        return item.x <= this.x + this.width - 10 &&
            item.x + item.image.width - 10 >= this.x &&
            item.y <= this.y + this.height &&
            item.y + item.image.height - 100 >= this.y
    }
}