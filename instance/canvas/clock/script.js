$(function () {
    init();
});
function init() {
    clock();
    setInterval(clock, 1000);//每一秒钟重新绘制一次
}
function clock() {
    var now = new Date();
    var ctx = document.getElementById('canvas').getContext('2d');

    ctx.save();//记录旋转画布之前初始状态
    ctx.clearRect(0, 0, 600, 600);//清空给定矩形内的指定像素
    ctx.translate(300, 300);//重新设置画布的坐标源点
    ctx.scale(1.9, 1.9);//缩放当前绘图，更大或更小
    ctx.rotate(-Math.PI / 2);//弧度
    ctx.strokeStyle = 'black';//要绘制的线条的颜色
    ctx.fillStyle = 'white';//填充颜色
    ctx.lineWidth = 8;//线段的宽度
    ctx.lineCap = "round";

    //绘制小时刻度
    ctx.save();
    for (var i = 0; i < 12; i++) {
        ctx.beginPath();
        // var rad = Math.PI / 6;   //Math.PI/6 弧度制，大刻度，总共分为12刻度，每刻度为：2π/12 → π/6
        // ctx.rotate(rad); //旋转画布绘制刻度
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    ctx.restore();//恢复初始状态

    //绘制分钟刻度
    ctx.save();
    ctx.lineWidth = 5;
    for (var i = 0; i < 60; i++) {
        if (i % 5 != 0) {
            ctx.beginPath();
            ctx.moveTo(117, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    //获取当前时间的毫秒、秒、分钟、小时数值
    var ms = now.getMilliseconds();
    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr = now.getHours();
    hr = hr >= 12 ? hr - 12 : hr;
    ctx.fillStyle = 'black';

    //绘制时针
    ctx.save();
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec);//计算时针角度并绘制图形
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(86, 0);
    ctx.stroke();
    ctx.restore();

    //绘制分针
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);//计算分针角度并绘制图形
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(110, 0);
    ctx.stroke();
    ctx.restore();

    //绘制秒针
    ctx.save();
    ctx.rotate((sec + ms / 1000) * Math.PI / 30);
    ctx.strokeStyle = "#D40000";
    ctx.fillStyle = "#D40000";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#888";
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    // 绘制时钟圆形外框
    ctx.beginPath();
    ctx.lineWidth = 24;
    ctx.strokeStyle = '#325FA2';
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.restore();
}

