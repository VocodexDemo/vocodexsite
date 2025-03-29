let hasSpoken = false;
let hasChosen = false;
let chosenOptions = [];

let completed = localStorage.getItem("page1completed");

function playAudio() {
    const audio = document.getElementById('background-audio');
    audio.volume = 0.5;
    audio.play().catch(function (error) {
        console.log('Audio playback failed: ', error);
    });
}

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

const audio = new Audio('sounds/avatar1.ogg');
audio.load();
function avatarSpeak() {
    if (hasSpoken) return;
    hasSpoken = true;
    if (completed != "true") {
        audio.play().catch(function (error) {
            console.log('Audio playback failed: ', error);
        });
    }

    const speechBubble = document.getElementById('speech-bubble');
    speechBubble.style.display = 'block';

    const avatar = document.querySelector('.avatar');
    const avatarRect = avatar.getBoundingClientRect();

    speechBubble.style.top = `${avatarRect.top - 160}px`;
    speechBubble.style.left = `${avatarRect.left + (avatarRect.width / 2) - 160}px`;

    let text = "Ahoj, doufám že sis oblíbil dveře, no to je jedno. Vítej tady někde - já nevim kde jsem. Víš...mě vyhnali, já jsem Ableton vocoder, ale v existenci člověka. Tak tu stojím na kraji města a pomáhám ostatním se přes tyto bludné dveře dostat pryč.";
    if (completed == "true") text = "Už ti nemám co říct. Začátek kódu je 19, pokud jsi zapomněl.";

    const characters = text.split('');
    let index = 0;

    speechBubble.innerHTML = '';

    const totalDuration = (completed == "true") ? 3000 : 18250;

    const timePerCharacter = totalDuration / characters.length;

    function type() {
        if (index < characters.length) {
            speechBubble.innerHTML += characters[index];
            index++;
            setTimeout(type, timePerCharacter);
        } else {
            setTimeout(() => {
                speechBubble.style.display = 'none';
                if (completed != "true") showOptions();
            }, 1200);
        }
    }
    type();
}

function showOptions() {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'block';

    const optionButton1 = document.querySelector('.option-button');
    const optionButton2 = document.querySelectorAll('.option-button')[1];

    if (!hasChosen) {
        optionButton1.style.display = 'block';
        optionButton2.style.display = 'block';
    }
}

let hasChosenFirstOption = false;
let hasChosenSecondOption = false;

function showOptions() {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'block';
}

function selectOption(option) {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'none';

    let text, audioFile, duration;

    if (option === 'avatar2.ogg') {
        text = "Všechny dveře? Jak mám doprdele vědět co jsou všechny dveře? Musel jsem si to zjišťovat sám. No, ty druhý - nějaká debilní skládačka. Musíš poskládat \"vocodex\". Ty třetí, ty nevim, ty se tu objevili předevčírem.";
        audioFile = 'sounds/avatar2.ogg';
        duration = 12900;
        hasChosenFirstOption = true;
    } else if (option === 'avatar3.ogg') {
        text = "Kód k mé části ano, ale k těm ostatním už těžko. Jsem ti říkal, že jsem je neznal a pořád skoro neznám. Najít ten kód je teď tvoje věc. Jó ten kód k mojí části je 19!";
        audioFile = 'sounds/avatar3.ogg';
        duration = 10000;
        hasChosenSecondOption = true;
    }

    const audio = new Audio(audioFile);
    audio.load();
    audio.play().catch(function (error) {
        console.log('Audio playback failed: ', error);
    });

    const speechBubble = document.getElementById('speech-bubble');
    speechBubble.style.display = 'block';

    const avatar = document.querySelector('.avatar');
    const avatarRect = avatar.getBoundingClientRect();

    speechBubble.style.top = `${avatarRect.top - 160}px`;
    speechBubble.style.left = `${avatarRect.left + (avatarRect.width / 2) - 160}px`;

    const characters = text.split('');
    let index = 0;

    speechBubble.innerHTML = '';

    const timePerCharacter = duration / characters.length;

    function type() {
        if (index < characters.length) {
            speechBubble.innerHTML += characters[index];
            index++;
            setTimeout(type, timePerCharacter);
        } else {
            setTimeout(() => {
                speechBubble.style.display = 'none';
                optionsDiv.style.display = 'block';

                // zobrazit pouze moznost, která nebyla vybrana
                if (hasChosenFirstOption && !hasChosenSecondOption) {
                    optionsDiv.innerHTML = `
                        <button class="option-button" onclick="selectOption('avatar3.ogg')">Dáš mi kód?</button>
                    `;
                } else if (hasChosenSecondOption && !hasChosenFirstOption) {
                    optionsDiv.innerHTML = `
                        <button class="option-button" onclick="selectOption('avatar2.ogg')">Co jsou všechny dveře?</button>
                    `;
                } else if (hasChosenFirstOption && hasChosenSecondOption) {
                    showNextOptions();
                }
            }, 1200);
        }
    }

    type();
}

function showNextOptions() {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'block';

    optionsDiv.innerHTML = `
        <button class="option-button" onclick="selectNextOption('avatar5.ogg')">Co máš v plánu dělat?</button>
        <button class="option-button" onclick="selectNextOption('avatar6.ogg')">Ty znáš vocodex sampler pack?</button>
    `;
}

function selectNextOption(option) {
    const optionsDiv = document.getElementById('options');
    optionsDiv.style.display = 'none';

    let text, audioFile, duration;

    if (option === 'avatar5.ogg') {
        text = "V plánu mám to co obvykle. Stát tady, a jak jsem říkal, pomáhat lidem se z těchto dveří dostat pryč. V tomto světě jako ableton vocoder moc nezmůžu, právo mám tak možná na to upravovat zvuk.";
        audioFile = 'sounds/avatar5.ogg';
        duration = 8455;
    } else if (option === 'avatar6.ogg') {
        text = "Jasně, že ho znám. Předtím to používali jako mučící taktiku, ale teď se to lidi snaží dostat a používat.. Nechápu kdo by to používal, ale volba je na nich.";
        audioFile = 'sounds/avatar6.ogg';
        duration = 7070;
    }

    const audio = new Audio(audioFile);
    audio.play().catch(function (error) {
        console.log('Audio playback failed: ', error);
    });

    const speechBubble = document.getElementById('speech-bubble');
    speechBubble.style.display = 'block';

    const avatar = document.querySelector('.avatar');
    const avatarRect = avatar.getBoundingClientRect();

    speechBubble.style.top = `${avatarRect.top - 160}px`;
    speechBubble.style.left = `${avatarRect.left + (avatarRect.width / 2) - 160}px`;

    const characters = text.split('');
    let index = 0;

    speechBubble.innerHTML = '';

    const timePerCharacter = duration / characters.length;

    function type() {
        if (index < characters.length) {
            speechBubble.innerHTML += characters[index];
            index++;
            setTimeout(type, timePerCharacter);
        } else {
            setTimeout(() => {
                speechBubble.style.display = 'none';
                playAvatar4();
            }, 1200);
        }
    }

    type();
}

function playAvatar4() {
    localStorage.setItem("page1completed", "true")
    const audioFile = 'sounds/avatar4.ogg';
    const text = "Hele, víc ti toho říct nemůžu, tahle FL Studio Vocodex civilizace má všude kamery, ještě chvíli se tady budeme bavit a rozseká nás Rezonator. Takže běž otevírat dveře a pomocí mých rad se odsud dostaň, protože já přesně vím co hledáš!";

    const audio = new Audio(audioFile);
    audio.play().catch(function (error) {
        console.log('Audio playback failed: ', error);
    });

    const speechBubble = document.getElementById('speech-bubble');
    speechBubble.style.display = 'block';

    const avatar = document.querySelector('.avatar');
    const avatarRect = avatar.getBoundingClientRect();

    speechBubble.style.top = `${avatarRect.top - 160}px`;
    speechBubble.style.left = `${avatarRect.left + (avatarRect.width / 2) - 160}px`;

    const characters = text.split('');
    let index = 0;

    speechBubble.innerHTML = '';

    const totalDuration = 11200;
    const timePerCharacter = totalDuration / characters.length;

    function type() {
        if (index < characters.length) {
            speechBubble.innerHTML += characters[index];
            index++;
            setTimeout(type, timePerCharacter);
        } else {
            setTimeout(() => {
                speechBubble.style.display = 'none';
            }, 2000);
        }
    }

    type();
}
