const questions = [
    {
        question: "Co je nejlepší plugin?",
        answers: [
            { text: "Vocodex", correct: true },
            { text: "Compresor", correct: false },
            { text: "Reverb", correct: false },
            { text: "Vocoder", correct: false }
        ]
    },
    {
        question: "Koho představuje mužík v zelené bundě?",
        answers: [
            { text: "Peserise", correct: false },
            { text: "Playaruse", correct: true },
            { text: "Zoltyho", correct: false },
            { text: "Jaromíra Nohavicu", correct: false }
        ]
    },
    {
        question: "Kdy byla úplně první zmínka o vocodex demu?",
        answers: [
            { text: "2023", correct: true },
            { text: "2022", correct: false },
            { text: "2024", correct: false },
            { text: "2025", correct: false }
        ]
    },
    {
        question: "Kolik bylo celkem aprílových vydání?",
        answers: [
            { text: "1", correct: false },
            { text: "4", correct: false },
            { text: "2", correct: false },
            { text: "3", correct: true }
        ]
    },
    {
        question: "Odkud se vzaly lyrics z Dusty Machine?",
        answers: [
            { text: "Playarus schválně nahrál smyšlený příběh", correct: false },
            { text: "Stáhlo se z YouTube", correct: false },
            { text: "Reálný příběh z Playarusovi praxe", correct: true },
            { text: "Vygenerováno od AI", correct: false }
        ]
    },
    {
        question: "Co se původně zamýšlelo ve Vocodex E.E.?",
        answers: [
            { text: "Jen asi 5 písniček", correct: false },
            { text: "Celá webová stránka, sample pack, 8 písniček", correct: false },
            { text: "Sample pack a 7 písniček", correct: false },
            { text: "Původně vůbec neměl vzniknout", correct: true }
        ]
    },
    {
        question: "O co jde pánovi ve druhé písničce o změně času?",
        answers: [
            { text: "Chce prosadit to, že čas je irelevantní", correct: false },
            { text: "Říká to, že nejlepší věc je změna času", correct: false },
            { text: "Vadí mu, že se měni čas z letního na zimní", correct: false },
            { text: "Vadí mu, že se mění čas ze zimního na letní", correct: true }
        ]
    },
    {
        question: "Z čeho vlastně vzniklo vocodex demo?",
        answers: [
            { text: "FLP, které se náhodou objevilo", correct: true },
            { text: "Z vtipného shortu z YouTube", correct: false },
            { text: "Inside joke, který se sformoval do shitpostu", correct: false },
            { text: "Z knockoff pluginu (vocodex) který měl trial verzi", correct: false }
        ]
    },
    {
        question: "Známá hlaška z reklamy?",
        answers: [
            { text: "Vocodex sampler pack", correct: false },
            { text: "Sigma", correct: false },
            { text: "Fanum tax", correct: false },
            { text: "Skibidi pravda", correct: true }
        ]
    },
    {
        question: "Kolik songů se nachází v celém albu Vocodex E.E.?",
        answers: [
            { text: "4", correct: false },
            { text: "8", correct: true },
            { text: "9", correct: false },
            { text: "7", correct: false }
        ]
    }
];

const audios = [
    new Audio('sounds/answer.ogg'),
    new Audio('sounds/hover.ogg'),
    new Audio('sounds/victory.ogg'),
    new Audio('sounds/gameover.ogg'),
    new Audio('sounds/music.ogg')
];
audios[1].volume = 0.2;
audios[4].volume = 0.1;


let currentQuestionIndex = 0;
let score = 0;
let isComplete = false;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');

function startQuiz() {
    audios[4].play();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.addEventListener('mouseenter', () => { audios[1].currentTime = 0; audios[1].play(); });
    nextButton.innerHTML = "Další otázka";
    showQuestion();
}

function showQuestion() {
    audios[4].play();
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        button.addEventListener('mouseenter', () => { audios[1].currentTime = 0; audios[1].play(); });
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    resultElement.innerHTML = '';

    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }

    questionElement.classList.remove('question');
    answerButtonsElement.classList.remove('answer-buttons');

    setTimeout(() => {
        questionElement.classList.add('question');
        answerButtonsElement.classList.add('answer-buttons');
    });
}

function selectAnswer(button, correct) {
    audios[0].play();
    if (correct) {
        score++;
        button.style.backgroundColor = '#00ff00';
    } else {
        button.style.backgroundColor = '#ff0000';
    }
    Array.from(answerButtonsElement.children).forEach(btn => {
        btn.disabled = true;
    });
    nextButton.style.display = '';
    console.log("Skore: " + score);
}

nextButton.addEventListener('click', () => {
    if (!isComplete){
        nextButton.innerHTML = 'Další otázka';
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }
    else{
        localStorage.setItem("kvizCompleted", "true");
        window.location.href = 'download.html';
    }
});

function showResult() {
    resetState();
    audios[4].pause();
    questionElement.innerHTML = "Dokončili jste kvíz!";
    if (score >= questions.length - 2){
        isComplete = true;
        audios[2].play();
        resultElement.style.color = '#91f59e';
        resultElement.innerHTML = `Vaše skóre je ${score} / ${questions.length}. Prošli jste ověřením!`;
        nextButton.innerHTML = 'Získat (konečně) sample pack!';
        nextButton.style.display = '';
        currentQuestionIndex = -1;
    }
    else{
        audios[3].play();
        resultElement.style.color = '#f29494';
        resultElement.innerHTML = `Vaše skóre je ${score} / ${questions.length}. Neprošli jste ověřením, zkuste to prosím znovu.`;
        nextButton.innerHTML = 'Restart';
        nextButton.style.display = '';
        currentQuestionIndex = -1;
    }
    score = 0;
}
startQuiz();
