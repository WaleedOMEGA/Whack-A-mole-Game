const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left')
let lastHole;
let timeUp = false;
let score = 0;
let currentTime = timeLeft.textContent;

const randomTime=(min, max)=> {
return Math.round(Math.random() * (max - min) + min);
}

const randomHole=(holes)=> {
const idx = Math.floor(Math.random() * holes.length);
const hole = holes[idx];
if (hole === lastHole) {
    console.log('Ah nah thats the same one bud');
    return randomHole(holes);
}
lastHole = hole;
return hole;
}

const peep=()=> {
const time = randomTime(200, 1000);
const hole = randomHole(holes);
hole.classList.add('up');
setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
}, time);
}

const startGame=()=> {
    scoreBoard.textContent = 0;
    
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 30000);
    const countDown=()=> {
    currentTime--;
        timeLeft.textContent = currentTime;

  if(currentTime === 0 ) {
    clearInterval(timerId)
    alert('GAME OVER! Your final score is' + score)
  }
    }
    let timerId = setInterval(countDown, 1000);
}

const bonk=(e)=> {
if(!e.isTrusted) return; // cheater!
score++;
e.currentTarget.parentNode.classList.remove('up');
scoreBoard.textContent = score.toString();
}




moles.forEach(mole => mole.addEventListener('click', bonk));