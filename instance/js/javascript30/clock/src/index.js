var i = 0;

function setClock() {
    const now = new Date();
    const second = now.getSeconds();
    const minute = now.getMinutes();
    const hour = now.getHours();

    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    const sec = second * 6;

    if (sec === 0) {
        i++;
    }

    const secondDeg = i * 360 + sec + 90;
    const minuteDeg = minute * 6 + second * 0.1 + 90;
    const hourDeg = hour * 30 + minute * 0.1 + 90;

    secondHand.style.transform = `rotate(${secondDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(setClock, 1000);