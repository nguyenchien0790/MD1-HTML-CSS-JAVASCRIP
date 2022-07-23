let canvas = document.getElementById('canvas');
let ctx= canvas.getContext('2d')

function veKhungChoi(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);

}

function veBong(x,y,r,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}
// veBong(200,400,30,'yellow');


let rextX =30;
function chuyenDong() {

    veKhungChoi(0,0,600,400,'darkcyan');

    veBong(rextX,100,30,'yellow');
    rextX = rextX + 60;
}
setInterval(chuyenDong,200);
