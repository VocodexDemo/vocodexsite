import { startEverything1, startEverything2 } from './voidpage1.js';

const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.background = "black";
overlay.style.zIndex = "9999";
overlay.style.display = "flex";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "end";
overlay.style.color = "white";
overlay.style.fontSize = "20px";
overlay.style.cursor = "pointer";
overlay.innerText = "Klikněte pro pokračování...";

document.body.appendChild(overlay);

overlay.addEventListener("click", function () {
    overlay.remove();

    const audio = document.getElementById("background-audio");
    if (audio != null) audio.play();

    const fadeOverlay = document.getElementById('fade-inout');
    if (fadeOverlay != null){
        fadeOverlay.style.opacity = '0';
        setTimeout(() => {
            fadeOverlay.style.pointerEvents = 'none';
        }, 1000);
    }

    if (localStorage.getItem("vybouchl") == "true"){
        startEverything1()
    } else {
        startEverything2();
    }
});
