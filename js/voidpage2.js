let hasPlayed = false;

function goToDoors(element) {
    if (!hasPlayed) {
        const audio = new Audio('sounds/closedoor.ogg');
        audio.play();
        hasPlayed = true;

        const fadeOverlay = document.getElementById('fade-inout');
        fadeOverlay.style.pointerEvents = 'auto';
        fadeOverlay.style.opacity = '1';

        audio.onended = function() {
            setTimeout(function() {
                window.location.href = 'doors-void.html';
            }, 1);
        };
    }

    const img = element.querySelector('img'); 

    img.src = 'img/closed-door-void.webp'; 
}

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    var videoEnded = false;
    
    window.addEventListener("click", () => {
        setTimeout(playVideo, 1300);
    });

    function playVideo() {
        const blackScr = document.getElementById("blackScreen");
        if (blackScr) {
            blackScr.remove();
        }
        if (video && !videoEnded) {
            video.play();
        }
    }

    if (video) {
        video.addEventListener("ended", function() {
            video.style.display = "none";
            videoEnded = true;
        });
    }

});

window.addEventListener('load', () => {
    const fadeOverlay = document.getElementById('fade-inout');
    fadeOverlay.style.opacity = '0';
    setTimeout(() => {
        fadeOverlay.style.pointerEvents = 'none';
    }, 1000);
});