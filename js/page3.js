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

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("click", () => {
        setTimeout(playVideo, 1000);
    });
});

const video = document.getElementById("video");
function playVideo(){
    const blackScr = document.getElementById("blackScreen");
    blackScr.remove();
    video.play();
}
video.addEventListener("ended", function() {
    video.style.display = "none";
    console.log("Konec videa!");
});