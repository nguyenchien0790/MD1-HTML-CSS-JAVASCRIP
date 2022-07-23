let cav =document.getElementById('pong');
let ctx = cav.getContext('2d');

let user = {
    x : 0,
    y : (cav.height -200)/2,
    width: 20,
    height: 200,
    color : 'red',
    score : 0
}

let com = {
    x : cav.width -20,
    y : (cav.height -200)/2,
    width: 20,
    height: 200,
    color : 'blue',
    score : 0
}

let ball = {
    x : cav.width/2,
    y : cav.height/2,
    radius : 10,
    speed : 7,
    vtX : 5,
    vtY : 5,
    color : 'yellow'
}

const luoi = {
    x : (cav.width-2) /2,
    y : 0,
    width : 2,
    height : 10,
    color : 'white'
}

function veKhungChoi(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);

}

function veLuoi() {
    for(let i = 0; i < cav.height; i+=15) {
        veKhungChoi(luoi.x,luoi.y+i,luoi.width,luoi.height,luoi.color);
    }

}

function veBong(x,y,r,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}


function veDiemSo(text,x,y,color) {
    ctx.fillStyle=color;
    ctx.font=' 30px center'
    ctx.fillText(text,x,y)
}

function hienThi() {
    veKhungChoi(0,0,cav.width,cav.height,'darkcyan');

    veLuoi();

    veDiemSo('User : '+user.score,cav.width/5,cav.height/3,"white");
    veDiemSo('Com : '+com.score,3*cav.width/5,cav.height/3,"white");

    veKhungChoi(user.x,user.y,user.width,user.height,user.color);
    veKhungChoi(com.x,com.y,com.width,com.height,com.color);

    veBong(ball.x,ball.y,ball.radius,ball.color);
}


// su kien di chuyen chuot cho thanh cua ng choi
cav.addEventListener('mousemove',diChuyenThanh);
function diChuyenThanh(evt) {
    let rect = cav.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
    
}

function vaCham(b,p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top< p.bottom;

}

function datBong() {
    ball.x = cav.width/2;
    ball.y = cav.height/2;
    ball.vtX = -ball.vtX;
    ball.speed = 3;



}

function capNhat() {
    ball.x+=ball.vtX;
    ball.y+=ball.vtY;

    //dieu khien tu dong cho may
    let mayChay = 0.1
    com.y += (ball.y - (com.y + com.height/2)) * mayChay;

    if (ball.y + ball.radius > cav.height || ball.y - ball.radius<0 ){
        ball.vtY= -ball.vtY;
    }
    let player = (ball.x < cav.width/2) ? user :com;

    if (vaCham(ball,player)){
        // ball.vtX = -ball.vtX; bong chi chay theo 1 chieu khi va cham =>>> cach khac

        let diemVaCham = ball.y - (player.y + player.height/2); // tao khac biet giua diem va cham tai vi tri Y cua bong va trung tam cua thanh
        diemVaCham = diemVaCham/(player.height/2);

        let gocR = diemVaCham * Math.PI/4; //tao goc 45 do
        let huongDi = (ball.x < cav.width/2) ? 1 : -1;

        ball.vtX = huongDi * ball.speed * Math.cos(gocR); //Thay doi van toc cua x va y
        ball.vtY =          ball.speed * Math.sin(gocR);

        ball.speed +=5; // thay doi toc do moi khi bong cham vao thanh
    }
    // diem so
    if(ball.x - ball.radius <0){
        // com win
        com.score++
        datBong();
    }else if(ball.x + ball.radius > cav.width){
        //user win
        user.score++
        datBong();
    }
    
}

function game() {
    capNhat();  // di chuyen , va cham d, diem so
    hienThi();
}game();
//
// const framePerSecond =100;
// setInterval(game,500/framePerSecond);
// Gọi hàm game() ;  50 lần mỗi 1000ms = 1s

// function stop() {
//     document.getElementById('stop').value.
//     clearInterval(setInterval(game,500/framePerSecond));
//
// }stop();


