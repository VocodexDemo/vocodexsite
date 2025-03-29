document.getElementById("background-audio").volume = 0.5;

const obyvak = document.getElementById("obyvak");
const zachod = document.getElementById("zachod");
const kuchyn = document.getElementById("kuchyn");
const pocitac = document.getElementById("pocitac");
const sklad = document.getElementById("sklad");

const closeMainDoorAudio = new Audio("sounds/closedoor.ogg");
const openDoorAudio = new Audio("sounds/door.ogg")
const closeDoorAudio = new Audio("sounds/close.ogg");
const lockedDoorAudio = new Audio("sounds/lock.ogg");
const walkAudio = new Audio("sounds/walk.ogg");

lockedDoorAudio.volume = 0.5;

var currentLocation = 0; // 0 = obyvak, 1 = zachod, 2 = kuchyn, 3 = pocitac, 4 = sklad

const fadeOverlay = document.getElementById('fade-inout');

// back button
document.getElementById("backbtn").addEventListener("click", ()=>{
    if (currentLocation == 0) closeMainDoorAudio.play();
    else if (currentLocation == 3) walkAudio.play();
    else closeDoorAudio.play();

    fadeOverlay.style.pointerEvents = 'auto';
    fadeOverlay.style.opacity = '1';

    setTimeout(function () {
        if (currentLocation == 0) window.location.href = "doors-void.html";
        else if (currentLocation == 1) {
            obyvak.style.removeProperty("display");
            zachod.style.display = "none";
            currentLocation = 0;
            aPcLoop.volume = 0.05;
        } else if (currentLocation == 2) {
            obyvak.style.removeProperty("display");
            kuchyn.style.display = "none";
            currentLocation = 0;
            aPcLoop.volume = 0.05;
        } else if (currentLocation == 3) {
            obyvak.style.removeProperty("display");
            pocitac.style.display = "none";
            currentLocation = 0;
            aPcLoop.volume = 0.05;
        } else if (currentLocation == 4) {
            kuchyn.style.removeProperty("display");
            sklad.style.display = "none";
            currentLocation = 2;
            aPcLoop.volume = 0;
        }
        fadeOverlay.style.opacity = '0';
        setTimeout(() => {
            fadeOverlay.style.pointerEvents = 'none';
        }, 1000);
    }, 1000);
});
// pocitac button
document.getElementById("button1").addEventListener("click", ()=>{
    currentLocation = 3;
    walkAudio.play();

    fadeOverlay.style.pointerEvents = 'auto';
    fadeOverlay.style.opacity = '1';

    setTimeout(function () {
        pocitac.style.removeProperty("display");
        obyvak.style.display = "none";
        fadeOverlay.style.opacity = '0';
        setTimeout(() => {
            fadeOverlay.style.pointerEvents = 'none';
        }, 1000);
        aPcLoop.volume = 0.15;
    }, 1000);
});
// kuchyn button
document.getElementById("button2").addEventListener("click", ()=>{
    currentLocation = 2;
    openDoorAudio.play();

    fadeOverlay.style.pointerEvents = 'auto';
    fadeOverlay.style.opacity = '1';

    setTimeout(function () {
        kuchyn.style.removeProperty("display");
        obyvak.style.display = "none";
        fadeOverlay.style.opacity = '0';
        setTimeout(() => {
            fadeOverlay.style.pointerEvents = 'none';
        }, 1000);
        aPcLoop.volume = 0;
    }, 1000);
});
// zachod button
document.getElementById("button3").addEventListener("click", ()=>{
    currentLocation = 1;
    openDoorAudio.play();

    fadeOverlay.style.pointerEvents = 'auto';
    fadeOverlay.style.opacity = '1';

    setTimeout(function () {
        zachod.style.removeProperty("display");
        obyvak.style.display = "none";
        fadeOverlay.style.opacity = '0';
        setTimeout(() => {
            fadeOverlay.style.pointerEvents = 'none';
        }, 1000);
        aPcLoop.volume = 0;
    }, 1000);
});
// sklad
document.getElementById("button4").addEventListener("click", ()=>{
    if (localStorage.getItem("skladUnlocked") == "true"){
        currentLocation = 4;
        openDoorAudio.play();

        fadeOverlay.style.pointerEvents = 'auto';
        fadeOverlay.style.opacity = '1';

        setTimeout(function () {
            sklad.style.removeProperty("display");
            kuchyn.style.display = "none";
            fadeOverlay.style.opacity = '0';
            setTimeout(() => {
                fadeOverlay.style.pointerEvents = 'none';
            }, 1000);
            aPcLoop.volume = 0;
        }, 1000);
    } else{
        lockedDoorAudio.play();
    }
});
const paperAudio = new Audio("sounds/letter.ogg");
paperAudio.volume = 0.6;
document.getElementById("proc").addEventListener('mouseenter', () => { paperAudio.currentTime = 0; paperAudio.play(); });

// PC turn on button
const aPcOn = new Audio("sounds/pcOn.ogg");
const aPcLoop = new Audio("sounds/pcLoop.ogg");
const aPcStart = new Audio("sounds/pcStartup.ogg");
aPcLoop.loop = true;

aPcOn.volume = 0.15;
aPcLoop.volume = 0.05;
aPcStart.volume = 0.3;

aPcOn.addEventListener('ended', () => {
    aPcLoop.play();
});

const displayImg = document.getElementById("pcDisplay");
let pcOn = false;
let pcReady = false;
pcDisplay.classList.add('no-hover');
if (localStorage.getItem("pcOn") == "true") {
    pcOn = true;
    pcReady = true;
    pcDisplay.classList.remove('no-hover');
    displayImg.src = "img/pc2.webp";
    displayImg.style.opacity = 1;
}
displayImg.addEventListener("click", () =>{
    if (!pcOn){
        localStorage.setItem("pcOn", "true");
        pcOn = true;
        aPcOn.play();
        setTimeout(() => {
            displayImg.style.opacity = 1;
            setTimeout(() => {
                displayImg.style.opacity = 0;
                setTimeout(() => {
                    displayImg.src = "img/pc1.webp";
                    setTimeout(() => {
                        displayImg.style.opacity = 1;
                        setTimeout(() => {
                            aPcStart.play();
                        }, 1000);
                        setTimeout(() => {
                            pcReady = true;
                            displayImg.src = "img/pc2.webp";
                            setTimeout(() => {
                                pcDisplay.classList.remove('no-hover');
                            }, 1000);
                        }, 7000);
                    }, 3000);
                }, 1000);
            }, 3000);
        }, 4000);
    }
});

// floppy disk
const pcFloppy = document.getElementById("pcFloppy");
const aFloppyInsert = new Audio("sounds/floppyInsert.ogg");
const aFloppyProblem = new Audio("sounds/floppyProblem.ogg");
const aPcError = new Audio("sounds/pcErr.ogg");
aFloppyInsert.volume = 0.5;
aFloppyProblem.volume = 0.1;
aPcError.volume = 0.5;
pcFloppy.addEventListener("click", ()=>{
    if (pcReady){
        aFloppyInsert.play();
        pcFloppy.style.display = "none";
        setTimeout(() => {
            aFloppyProblem.play();
            setTimeout(() => {
                displayImg.src = "img/pc3.webp";
                aPcError.play();
                setTimeout(() => {
                    pcFloppy.style.display = "block";
                    setTimeout(() => {
                        displayImg.src = "img/pc2.webp";
                    }, 1000);
                }, 7000);
            }, 3000);
        }, 700);
    }
});
