document.getElementById("background-audio").volume = 0.4;
document.getElementById("muchyAudio").volume = 0.05;

const dopisButton = document.getElementById("dopis");

const closeMainDoorAudio = new Audio("sounds/closedoor.ogg");
const paperAudio = new Audio("sounds/letter.ogg");
paperAudio.volume = 0.6;

// back button
document.getElementById("backbtn").addEventListener("click", ()=>{
    closeMainDoorAudio.play();

    const fadeOverlay = document.getElementById('fade-inout');
    fadeOverlay.style.pointerEvents = 'auto';
    fadeOverlay.style.opacity = '1';
    
    setTimeout(function () {
        window.location.href = "doors-void.html";
    }, 1000);

    const img = document.getElementById("doorimg"); 
    img.src = 'img/closed-door-void.webp'; 
});

dopis.addEventListener('mouseenter', () => {
    paperAudio.currentTime = 0;
    paperAudio.play();
});