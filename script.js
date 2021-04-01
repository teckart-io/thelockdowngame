const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

daysLeft = 60;
gameOverNumber = 50;
loopPlay = false;

function start() {
    count = 0;
    getFaster = 6000;
    daysRemaining = daysLeft;

    canvas.innerHTML = '';
    score.innerHTML = count;
    days.innerHTML = daysRemaining;

// make sure to not play loop several times
    loopPlay ? '' : game();
    loopPlay = true;

    function game() {
        let randomTime = Math.round(Math.random() * getFaster);
        getFaster > 700 ? getFaster = (getFaster * 0.90) : '';

        setTimeout(() => {
            if (daysRemaining === 0) {
                youWin();
            } else if (canvas.childElementCount < gameOverNumber) {
                virusPop();
                game();
            } else {
                gameOver();
            }

        }, randomTime);

    };

    const gameOver = () => {
        endScreen.innerHTML = `<div class="gameOver">Game Over<br/>score : ${count}</div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1';
        loopPlay = false;
    };

    const youWin = () => {
        let accuracy = Math.round(count / daysLeft * 100);
        endScreen.innerHTML = `<div class="youWin">You Win !<br/><span>Précision : ${accuracy}%</span></div>`;
        endScreen.style.visibility = 'visible';
        endScreen.style.opacity = '1';
        loopPlay = false;
    }


}

function virusPop() {
    let virus = new Image();

    virus.src = "./media/basic-pics/pngegg.png";

    virus.classList.add('virus');
    virus.style.top = Math.random() * 500 + 'px';
    virus.style.left = Math.random() * 500 + 'px';

    let x, y;
    x = y = (Math.random() * 45) + 30;
    virus.style.setProperty ('--x', `${x}px`);
    virus.style.setProperty ('--y', `${y}px`);

    let plusMinus = Math.random() < 0.5 ? -1 : 1;
    let trX = Math.random() * 500 * plusMinus;
    let trY = Math.random() * 500 * plusMinus;
    virus.style.setProperty('--trX', `${trX}%`);
    virus.style.setProperty('--trY', `${trY}%`);

    canvas.appendChild(virus);


}

// remove element clicked
document.addEventListener('click', (e) => {
    let targetElement = e.target;

    if(targetElement.classList.contains('virus')) {
        targetElement.remove();
        count++;
        score.innerHTML = count;
    };
});

// Countdown click
canvas.addEventListener('click', () => {
    if (daysRemaining > 0) {
        daysRemaining--;
        days.innerHTML = daysRemaining;
    }
});

// Hide screen on click
endScreen.addEventListener('click', () => {
    setTimeout(() => {
        // start();
        endScreen.style.opacity = '0';
        endScreen.style.visibility = 'hidden';
    }, 3500)

})