const button = document.getElementById("randomButton");
let hoverCount = 0;
const maxHovers = 20;
let hasInteracted = false;
let finalPlayed = false;
let currentTalkSound;

const wooshSound = new Audio('sounds/woosh.ogg');
const finalSound = new Audio('sounds/final.ogg');
const talkSounds = Array.from({ length: 8 }, (_, i) => new Audio(`sounds/talk${i + 1}.ogg`));

const preloadSounds = () => {
    wooshSound.load();
    finalSound.load();
    talkSounds.forEach(sound => sound.load());
};


window.onload = () => {
    preloadSounds();
};


button.addEventListener("click", () => {
    hasInteracted = true;
    utikani();
});

button.addEventListener("mouseover", () => {
    utikani();
});

function utikani(){
    if (hasInteracted && hoverCount < maxHovers) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;
        
        const randomX = Math.random() * (windowWidth - buttonWidth);
        const randomY = Math.random() * (windowHeight - buttonHeight);
        
        button.style.position = 'absolute'; 
        button.style.left = `${randomX}px`; 
        button.style.top = `${randomY}px`;  

        
        wooshSound.currentTime = 0;
        wooshSound.play().catch((error) => console.log("Woosh sound play error:", error));

        if (currentTalkSound) {
            currentTalkSound.pause();
            currentTalkSound.currentTime = 0;
        }

        currentTalkSound = talkSounds[Math.floor(Math.random() * talkSounds.length)];
        currentTalkSound.currentTime = 0;
        currentTalkSound.play().catch((error) => console.log("Talk sound play error:", error));

        hoverCount++;

        if (hoverCount >= maxHovers && !finalPlayed) {
            if (currentTalkSound) {
                currentTalkSound.pause();
                currentTalkSound.currentTime = 0;
            }

            finalSound.currentTime = 0;
            finalSound.play().catch((error) => console.log("Final sound play error:", error));
            finalPlayed = true;

            setTimeout(() => {
                button.style.display = 'none'; 
                setTimeout(() => {
                    window.location.href = 'doors.html';
                }, 10000);
            }, 100);
        }
    }
}