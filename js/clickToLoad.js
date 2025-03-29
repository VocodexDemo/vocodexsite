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

    const fliesSound = document.getElementById("muchyAudio");
    if (fliesSound != null){
        fliesSound.play();
    }

    if (localStorage.getItem("pcOn") == "true" && window.location.pathname.split("/").pop() == "voidpage3.html"){
        const aPcLoop = new Audio("sounds/pcLoop.ogg");
        aPcLoop.loop = true;
        aPcLoop.volume = 0.05;
        aPcLoop.play();

        var currentLocation = 0; // 0 = obyvak, 1 = zachod, 2 = kuchyn, 3 = pocitac, 4 = sklad
        // back button
        document.getElementById("backbtn").addEventListener("click", ()=>{
            setTimeout(function () {
                if (currentLocation == 1) {
                    currentLocation = 0;
                    aPcLoop.volume = 0.05;
                } else if (currentLocation == 2) {
                    currentLocation = 0;
                    aPcLoop.volume = 0.05;
                } else if (currentLocation == 3) {
                    currentLocation = 0;
                    aPcLoop.volume = 0.05;
                } else if (currentLocation == 4) {
                    currentLocation = 2;
                    aPcLoop.volume = 0;
                }
            }, 1000);
        });
        // pocitac button
        document.getElementById("button1").addEventListener("click", ()=>{
            currentLocation = 3;
            setTimeout(function () {
                aPcLoop.volume = 0.15;
            }, 1000);
        });
        // kuchyn button
        document.getElementById("button2").addEventListener("click", ()=>{
            currentLocation = 2;
            setTimeout(function () {
                aPcLoop.volume = 0;
            }, 1000);
        });
        // zachod button
        document.getElementById("button3").addEventListener("click", ()=>{
            currentLocation = 1;
            setTimeout(function () {
                aPcLoop.volume = 0;
            }, 1000);
        });
    }
});
