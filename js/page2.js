let audioPlayed = false; 
function goToDoors(element) {
    if (!audioPlayed) {
        const audio = new Audio('sounds/close.ogg');
        audio.play();
        audioPlayed = true; 
        let img = element.querySelector('img');
        img.src = 'img/closed-door.webp';

        audio.onended = function () {
            setTimeout(function () {
                window.location.href = 'doors.html';
            }, 1);
        };
    }
}

const word = ['V', 'O', 'C', 'O', 'D', 'E', 'X'];
const czAlphabet = 'AÁBCČDĎEFGHIJKLMNŇOPQRŘSŠTŤUVWXYÝZŽ'.split('');
let gameBoard = document.getElementById('game-board');
let squares = [];
let selected = [];

const rotateSound = new Audio('sounds/rotate.ogg'); 
const ripSound = new Audio('sounds/rip.ogg'); 
const winSound = new Audio('sounds/win.ogg'); 
const puzzleSound = new Audio('sounds/puzzle.ogg'); 

function initGame() {
    let letters = czAlphabet.slice();
    word.forEach(letter => {
        const index = letters.indexOf(letter);
        if (index !== -1) letters.splice(index, 1); 
    });
    letters = letters.concat(word); 

    letters.sort(() => Math.random() - 0.5);

    gameBoard.innerHTML = ''; 
    letters.forEach((letter, index) => {
        let square = document.createElement('div');
        square.classList.add('square');
        square.dataset.letter = letter;

        let front = document.createElement('div');
        front.classList.add('front');
        front.textContent = ''; 

        let back = document.createElement('div');
        back.classList.add('back');
        back.textContent = letter; 

        square.appendChild(front);
        square.appendChild(back);
        square.dataset.index = index;
        square.addEventListener('click', handleSquareClick);
        squares.push(square);
        gameBoard.appendChild(square);
    });

    selected = []; 
}

function handleSquareClick(event) {
    let square = event.target.closest('.square');
    let letter = square.dataset.letter;

    if (square.classList.contains('revealed')) {
        return;
    }

    if (puzzleSound.paused) {
        puzzleSound.loop = true; 
        puzzleSound.volume = 0.4;
        puzzleSound.play(); 
    }

    square.classList.add('revealed');
    rotateSound.currentTime = 0; 
    rotateSound.play(); 

    if (word.includes(letter)) {
        square.classList.add('correct'); 
        selected.push(letter);

        checkProgress();
    } else {
        square.classList.add('incorrect'); 
        ripSound.currentTime = 0; 
        ripSound.play(); 

        setTimeout(() => {
            squares.forEach(sq => {
                if (sq.classList.contains('revealed')) {
                    sq.classList.remove('revealed'); 
                    sq.classList.remove('correct'); 
                    sq.classList.remove('incorrect'); 
                }
            });
            selected = []; 
        }, 600); 
    }
}

function checkProgress() {
    if (selected.length === word.length) {
        document.getElementById('win-message').style.display = 'block'; 
        winSound.currentTime = 0; 
        winSound.play(); 
        createConfetti(); 
        resetGame(); 
    }
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.animationDelay = Math.random() * 2 + 's'; 
        document.body.appendChild(confetti);
    }
}

function resetGame() {
    squares.forEach(square => {
        square.classList.remove('revealed', 'correct', 'incorrect');
    });
    initGame(); 
}

initGame();
