class Background {
    constructor(image, speed) {
        this.image = image;
        this.speed = speed;
        this.count = 0;
    }

    draw() {
        c.drawImage(this.image, 0, this.count);
        c.drawImage(this.image, 0, this.count - this.image.height)
        this.count += this.speed;
        if (this.count >= this.image.height) this.count = 0;
    }
}