let audioPlayed = false;

function openDoor(element, page) {
    if (!audioPlayed) {
        let doorSound = new Audio('sounds/door.ogg');

        doorSound.play();
        audioPlayed = true;
        
        let img = element.children[0]; // obrázek uvnitř divu
        img.src = 'img/open-door.webp'; 

        setTimeout(function() {
            window.location.href = page;
        }, 500);
    }
}

function submitCode() {
    const codeInput = document.getElementById('codeInput');
    const enteredCode = codeInput.value.trim();
    const correctCode = '19263'; // Správný kód
    const secretCode = '8153'; // Secret kód

    if (enteredCode === correctCode) {
        const correctSound = new Audio('sounds/correct.ogg');
        correctSound.play();

        // přesměrování na rrecenzator.html
        setTimeout(() => {
            window.location.href = 'rrecenzator.html';
        }, 1050);
    } else if (enteredCode === secretCode) {
        const secretSound = new Audio('sounds/correct2.ogg');
        secretSound.play();

        // přesměrování na voiddoors.html
        const fadeOverlay = document.getElementById('fade-inout');
        fadeOverlay.style.pointerEvents = 'auto';
        fadeOverlay.style.opacity = '1';
        setTimeout(() => {
            window.location.href = 'doors-void.html';
        }, 2050);
    } else {
        if (enteredCode !== '') {
            const wrongSound = new Audio('sounds/wrong.ogg');
            wrongSound.play();
        }

        codeInput.value = '';

        const errorMark = document.getElementById('errorMark');
        errorMark.classList.remove('hidden');

        codeInput.disabled = true;

        setTimeout(() => {
            errorMark.classList.add('hidden');
            codeInput.disabled = false;
        }, 2000);
    }
}

function clearCode() {
    const codeInput = document.getElementById('codeInput');
    codeInput.value = '';
    const errorMark = document.getElementById('errorMark');
    errorMark.classList.add('hidden');
    codeInput.disabled = false;
}
