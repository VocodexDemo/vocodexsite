const allowedWords = ['vocodex', 'pisen kapr', 'adult sneeze', 'flip it', 'louky hriste', 'ableton vocoder'];

window.onload = function() {
    document.getElementById('reviewText').value = '';
    document.getElementById('errorOverlay').style.display = 'none';
};

document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('reviewText').value.toLowerCase().trim();

    if (reviewText !== "" && !allowedWords.some(word => reviewText.includes(word))) {
        showError();
    } else if (reviewText.includes("vocodex")) {
        playJumpSound();
        showVocodexImage();
        document.getElementById('reviewText').value = "";
    } else if (reviewText.includes("pisen kapr")) {
        playKaprSound();
        showKaprImage();
        document.getElementById('reviewText').value = "";
    } else if (reviewText.includes("adult sneeze")) {
        playSneezeSound();
        setTimeout(() => {
            shakePage();
        }, 400);
        document.getElementById('reviewText').value = "";
    } else if (reviewText.includes("flip it")) {
        flipPage();
        document.getElementById('reviewText').value = "";
    } else if (reviewText.includes("louky hriste")) {
        showTrainAnimation();
        document.getElementById('reviewText').value = "";
    } else if (reviewText.includes("ableton vocoder")) {
        darkenPageAndPlayAbletonVocoder();
        document.getElementById('reviewText').value = "";
    }
});

document.getElementById('skipBtn').addEventListener('click', function() {
    window.location.href = 'download.html';
});

function showError() {
    document.getElementById('errorOverlay').style.display = 'flex';
    const errorSound = new Audio('sounds/error.ogg');
    errorSound.play();
    setTimeout(function() {
        window.location.href = 'download.html';
    }, 2950);
}

function playJumpSound() {
    const audio = new Audio('sounds/jump.ogg');
    audio.play();
}

function playKaprSound() {
    const audio = new Audio('sounds/kapr.ogg');
    audio.play();
}

function playSneezeSound() {
    const audio = new Audio('sounds/sneeze.ogg');
    audio.play();
}

function showKaprImage() {
    const kaprImage = document.createElement('img');
    kaprImage.src = 'img/kapr.webp';
    kaprImage.id = 'kaprImage';
    kaprImage.style.position = 'fixed';
    kaprImage.style.top = '0';
    kaprImage.style.left = '0';
    kaprImage.style.width = '100%';
    kaprImage.style.height = '100%';
    kaprImage.style.opacity = '0';
    kaprImage.style.transition = 'opacity 0.3s';
    document.body.appendChild(kaprImage);

    setTimeout(() => {
        kaprImage.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        kaprImage.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(kaprImage);
        }, 300);
    }, 1500);
}

function shakePage() {
    const body = document.body;
    body.style.transition = 'transform 0.1s';
    body.style.transform = 'translate(0px, 0px)';
    setTimeout(() => {
        body.style.transform = 'translate(-5px, 0)';
    }, 50);
    setTimeout(() => {
        body.style.transform = 'translate(5px, 0)';
    }, 100);
    setTimeout(() => {
        body.style.transform = 'translate(-5px, 0)';
    }, 150);
    setTimeout(() => {
        body.style.transform = 'translate(5px, 0)';
    }, 200);
    setTimeout(() => {
        body.style.transform = 'translate(0px, 0)';
    }, 250);
}

function showVocodexImage() {
    const vocodexImage = document.createElement('img');
    vocodexImage.src = 'img/vocodex.webp';
    vocodexImage.id = 'vocodexImage';
    vocodexImage.style.position = 'fixed';
    vocodexImage.style.top = '0';
    vocodexImage.style.left = '0';
    vocodexImage.style.width = '100%';
    vocodexImage.style.height = '100%';
    vocodexImage.style.opacity = '1';
    vocodexImage.style.transition = 'opacity 0.3s';
    document.body.appendChild(vocodexImage);

    setTimeout(() => {
        vocodexImage.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(vocodexImage);
        }, 300);
    }, 1050);
}

function showTrainAnimation() {
    const reviewBox = document.querySelector('.review-box');
    const trainImage = document.createElement('img');
    trainImage.src = 'img/vlak.webp';
    trainImage.id = 'trainImage';
    trainImage.style.position = 'fixed';
    trainImage.style.left = '100%';
    trainImage.style.top = '50%';
    trainImage.style.transform = 'translateY(-50%)';
    trainImage.style.width = '350px';
    document.body.appendChild(trainImage);

    const trainSound = new Audio('sounds/train.ogg');
    trainSound.play();

    const moveTrain = setInterval(() => {
        const trainRect = trainImage.getBoundingClientRect();
        const boxRect = reviewBox.getBoundingClientRect();

        trainImage.style.left = (trainRect.left - 10) + 'px';

        if (trainRect.right > boxRect.left && trainRect.left < boxRect.right) {
            const crashSound = new Audio('sounds/crashing.ogg');
            crashSound.play();

            const explosionEffect = document.createElement('div');
            explosionEffect.style.position = 'absolute';
            explosionEffect.style.left = boxRect.left + 'px';
            explosionEffect.style.top = boxRect.top + 'px';
            explosionEffect.style.width = '500px';
            explosionEffect.style.height = '500px';
            explosionEffect.style.backgroundImage = 'url("img/explosion.webp")';
            explosionEffect.style.backgroundSize = 'cover';
            explosionEffect.style.pointerEvents = 'none';
            document.body.appendChild(explosionEffect);

            setTimeout(() => {
                explosionEffect.style.transform = 'scale(8)';
                explosionEffect.style.opacity = '0';
            }, 1000);

            setTimeout(() => {
                reviewBox.style.display = 'none';
                document.body.removeChild(explosionEffect);
            }, 1000);

            clearInterval(moveTrain);
        }
    }, 20);

    setTimeout(() => {
        const moveTrainContinuous = setInterval(() => {
            const trainRect = trainImage.getBoundingClientRect();
            trainImage.style.left = (trainRect.left - 10) + 'px';

            if (trainRect.left < -100) {
                clearInterval(moveTrainContinuous);
                document.body.removeChild(trainImage);

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }, 20);
    }, 1500);
}

function flipPage() {
    const body = document.body;
    body.style.transition = 'transform 0.5s';
    body.style.transform = 'rotateX(180deg)';

    setTimeout(() => {
        body.style.transform = 'rotateX(0deg)';
    }, 2000);
}

function darkenPageAndPlayAbletonVocoder() {
    const reviewBox = document.querySelector('.review-box');
    const errorOverlay = document.getElementById('errorOverlay');

    document.body.style.cursor = 'none';

    if (reviewBox) reviewBox.style.display = 'none';
    if (errorOverlay) errorOverlay.style.display = 'none';

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 1)'; 
    overlay.style.zIndex = '1'; 
    document.body.appendChild(overlay);

    document.title = "ZASE SE VIDÍME";

    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = 'icons/eye.ico';
    document.head.appendChild(link);

    const lightOffSound = new Audio('sounds/lightsoff.ogg');
    lightOffSound.play();

    lightOffSound.onended = () => {
        setTimeout(() => {
            const vocoderSound = new Audio('sounds/abletonvoco.ogg');
            vocoderSound.play();
            showEyesImage(); 
        }, 1000); 
    };
}

function showEyesImage() {
    const imgElement = document.createElement('img');
    imgElement.src = 'img/eyes.webp'; 
    imgElement.style.position = 'fixed';
    imgElement.style.top = '50%';
    imgElement.style.left = '50%';
    imgElement.style.transform = 'translate(-50%, -50%) scale(0.2)'; 
    imgElement.style.transition = 'opacity 15s cubic-bezier(0.2, 0, 0.8, 1), transform 12s ease-in-out';
    imgElement.style.opacity = '0'; 
    imgElement.style.zIndex = '10000';
    document.body.appendChild(imgElement);

    imgElement.onload = () => {
        setTimeout(() => {
            imgElement.style.opacity = '1';
            imgElement.style.transform = 'translate(-50%, -50%) scale(0.7)';
        }, 100); 
    };

    imgElement.onerror = () => {
        console.error("Nepodařilo se načíst obrázek.");
    };

    setTimeout(() => {
        restartPage();
    }, 7000); 
}

function restartPage() {
    window.location.reload();
}