let canvas = document.getElementById("pong");
let ctx = canvas.getContext('2d');

// Âm thanh
let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
comScore.src = "sounds/comScore.mp3";
userScore.src = "sounds/userScore.mp3";

// Đối tượng bóng
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 3,
    velocityY: 3,
    speed: 5,
    color: "yellow"
}

// Đối tượng thanh đánh bóng của người (user)
const user = {
    x: 0,
    y: (canvas.height - 150) / 2, //vị trí giữa của top canvas trừ đi 1 nửa chiều cao
    width: 20,
    height: 100,
    score: 0,
    color: "red"
}

// Đối tương thanh đánh bóng của máy
const com = {
    x: canvas.width - 20, // - width of paddle
    y: (canvas.height - 100) / 2, // -100 the height of paddle
    width: 20,
    height: 100,
    score: 0,
    color: "blue"
}

// Đối tượng lưới
const net = {
    x: (canvas.width - 2) / 2, // tâm nằm giữa khung canvas
    y: 0,
    height: 10,
    width: 2,
    color: "WHITE"
}

// Hàm vẽ vạch lưới
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// Hàm vẽ hình chữ nhật dùng làm thanh đánh bóng
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// Hàm vẽ hình tròn để làm quả bóng
function drawArc(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

// Điều khiển chuột cho thanh đánh bóng của người chơi
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height / 2;
}

// Hàm đặt lại bóng mỗi khi 1 trong 2 ghi bàn
function resetBall() {
    ball.velocityX = 5;
    ball.velocityY = 5;
    ball.speed = 3;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    stop();
    isStop = true;
}

// Hàm vẽ điểm số
function drawText(text, x, y) {
    ctx.fillStyle = "#FFF";
    ctx.font = "30px fantasy";
    ctx.fillText(text, x, y);
}

// Hàm phát hiện va chạm của bóng với thanh đánh bóng có 2 tham số b (cho bóng) và p (cho người chơi)
function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// Hàm cập nhật : các hoạt động của bóng , chuyển động ,điểm số
function update() {

    // cập nhật điểm thẹo tọa độ left (ball.x) của bóng
    if (ball.x - ball.radius < 0) {
        com.score++;
        comScore.play();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        userScore.play();
        resetBall();
    }

    // Vân tốc của bóng
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Điều khiển tự động cho máy
    com.y += ((ball.y - (com.y + com.height / 2))) * 2;

    // Bóng va chạm vào 2 thành trên dưới thì nghịch đảo vận tốc
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
        wall.play(); // nhạc phát khi cham thành
    }

    // tạo biến kiểm tra bóng chạm váo thanh của người hay máy
    let player = (ball.x + ball.radius < canvas.width / 2) ? user : com;

    // Nếu bóng cham vào thanh
    if (collision(ball, player)) {
        // nhạc chạm
        hit.play();
        // kiểm tra vị trí chạm bóng trên thanh
        let collidePoint = (ball.y - (player.y + player.height / 2));
        // Chuẩn hóa gí trị của collidePoint để lấy giá trị từ -1 đến 11
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height / 2);

        /// khi quả bóng chạm đỉnh thanh, chúng ta muốn quả bóng có góc -45 độ
        // khi quả bóng chạm vào tâm của thanh, chúng ta muốn quả bóng có một góc 0degrees
        // khi bóng chạm đáy mái thanh, chúng ta muốn bóng bay 45 độ
        let angleRad = (Math.PI / 4) * collidePoint;

        // Thay đổi hướng của vận tốc X và Y
        let direction = (ball.x + ball.radius < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        // Tăng tốc độ bóng sau mỗi lần bóng chạm thanh chơi
        ball.speed += 1;
    }
}

// Tạo hàm hiển thị cho trò chơi
function render() {

    // Gọi lại khung vẽ bam đầu
    drawRect(0, 0, canvas.width, canvas.height, 'darkcyan');
    // Vẽ lưới
    drawNet();
    // Vẽ điểm cho người chơi bên trái
    drawText('User : ' + user.score, canvas.width / 4, canvas.height / 4);
    // Vẽ điểm cho máy
    drawText('Com : ' + com.score, 3 * canvas.width / 5, canvas.height / 4);
    // Vẽ thanh chơi của người
    drawRect(user.x, user.y, user.width, user.height, user.color);
    // Vẽ thanh chơi của máy
    drawRect(com.x, com.y, com.width, com.height, com.color);
    // Vẽ bóng
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

// Hàm game() để tổng hợp chức năng của trò chơi
function game() {
    update();
    render();
}

let framePerSecond = 80;
// // Goi hàm game() với mỗi 1 giây 80 lần
let loop = setInterval(game, 1000 / framePerSecond);

// nut stop va reset
let tempVTX;
let tempVTY;
let isStop = false;

function stop() {
    if (isStop) {
        isStop = false;
        document.getElementById('stop').innerHTML = 'Stop'
        ball.velocityX = tempVTX;
        ball.velocityY = tempVTY;

    } else {
        isStop = true;
        document.getElementById('stop').innerHTML = 'Play'
        tempVTX = ball.velocityX;
        tempVTY = ball.velocityY;
        ball.velocityX = 0;
        ball.velocityY = 0;
    }
}

function reset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 3;
    user.score = 0;
    com.score = 0;

}


