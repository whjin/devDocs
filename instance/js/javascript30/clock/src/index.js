function setClock() {
    let i = 0;

    let now = new Date();
    let second = now.getSeconds();
    let minute = now.getMinutes();
    let hour = now.getHours();

    let secondHand = document.querySelector('.second-hand');
    let minuteHand = document.querySelector('.min-hand');
    let hourHand = document.querySelector('.hour-hand');

    let sec = second * 6;

    if (sec === 0) {
        i++;
    }

    let secondDeg = i * 360 + sec + 90;
    let minuteDeg = minute * 6 + second * 0.1 + 90;
    let hourDeg = hour * 30 + minute * 0.1 + 90;

    secondHand.style.transform = `rotate(${secondDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(setClock, 1000);